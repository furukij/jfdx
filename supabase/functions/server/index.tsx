import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Supabaseクライアントの初期化
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b40dafad/health", (c) => {
  return c.json({ status: "ok" });
});

// アクセスログを記録するエンドポイント
app.post("/make-server-b40dafad/log-access", async (c) => {
  try {
    const body = await c.req.json();
    const { pathname, userAgent, referrer, timestamp } = body;

    // ログIDを生成（タイムスタンプベース）
    const logId = `access_log_${timestamp}_${Math.random().toString(36).substring(7)}`;

    // アクセスログをKVストアに保存
    await kv.set(logId, {
      pathname,
      userAgent,
      referrer,
      timestamp,
      date: new Date(timestamp).toISOString(),
    });

    return c.json({ success: true, logId });
  } catch (error) {
    console.error("Error logging access:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// アクセスログを取得するエンドポイント
app.get("/make-server-b40dafad/access-logs", async (c) => {
  try {
    // プレフィックスでアクセスログを取得
    const logs = await kv.getByPrefix("access_log_");

    // タイムスタンプでソート（新しい順）
    const sortedLogs = logs
      .map((log) => ({
        id: log.key,
        ...log.value,
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

    return c.json({ success: true, logs: sortedLogs });
  } catch (error) {
    console.error("Error fetching access logs:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// アクセスログの統計を取得するエンドポイント
app.get("/make-server-b40dafad/access-stats", async (c) => {
  try {
    const logs = await kv.getByPrefix("access_log_");
    
    const totalVisits = logs.length;
    
    // ページごとの訪問数
    const pageViews: Record<string, number> = {};
    logs.forEach((log) => {
      const pathname = log.value.pathname || "/";
      pageViews[pathname] = (pageViews[pathname] || 0) + 1;
    });

    // 日付ごとの訪問数（最近7日間）
    const dailyVisits: Record<string, number> = {};
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    
    logs.forEach((log) => {
      const timestamp = log.value.timestamp;
      if (timestamp >= sevenDaysAgo) {
        const date = new Date(timestamp).toISOString().split('T')[0];
        dailyVisits[date] = (dailyVisits[date] || 0) + 1;
      }
    });

    return c.json({
      success: true,
      stats: {
        totalVisits,
        pageViews,
        dailyVisits,
        recentVisits: logs.length > 0 ? logs[0].value.timestamp : null,
      },
    });
  } catch (error) {
    console.error("Error fetching access stats:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// 会員登録エンドポイント
app.post("/make-server-b40dafad/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ success: false, error: "メールアドレス、パスワード、名前は必須です" }, 400);
    }

    // Supabase Authでユーザーを作成
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.error("Error creating user:", error);
      return c.json({ success: false, error: `ユーザー作成エラー: ${error.message}` }, 400);
    }

    // KVストアにユーザー情報を保存
    await kv.set(`user_${data.user.id}`, {
      email,
      name,
      createdAt: new Date().toISOString(),
    });

    return c.json({ success: true, message: "会員登録が完了しました" });
  } catch (error) {
    console.error("Error during signup:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ChatGPTとのチャットエンドポイント
app.post("/make-server-b40dafad/chat", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "認証が必要です" }, 401);
    }

    // ユーザー認証
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ success: false, error: "認証エラー" }, 401);
    }

    const { message } = await c.req.json();
    if (!message) {
      return c.json({ success: false, error: "メッセージは必須です" }, 400);
    }

    // ユーザー情報を取得
    const userData = await kv.get(`user_${user.id}`);
    if (!userData) {
      return c.json({ success: false, error: "ユーザー情報が見つかりません" }, 404);
    }

    // OpenAI APIを呼び出し
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return c.json({ success: false, error: "OpenAI APIキーが設定されていません。管理者にお問い合わせください。" }, 500);
    }

    console.log('OpenAI API Key exists:', !!openaiApiKey);
    console.log('OpenAI API Key starts with:', openaiApiKey.substring(0, 10) + '...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API error:", errorData);
      console.error("Status:", response.status, response.statusText);
      
      let errorJson;
      try {
        errorJson = JSON.parse(errorData);
      } catch (e) {
        errorJson = null;
      }
      
      // クレジット不足エラー
      if (response.status === 429 && errorJson?.error?.code === 'insufficient_quota') {
        return c.json({ 
          success: false, 
          error: `OpenAI APIのクレジット残高が不足しています。支払い方法を登録するか、クレジットを追加購入してください。`, 
          errorType: 'insufficient_quota',
          details: errorData
        }, 429);
      }
      
      // レート制限エラー
      if (response.status === 429) {
        return c.json({ 
          success: false, 
          error: `OpenAI APIのレート制限に達しました。少し時間をおいてから再度お試しください。`, 
          errorType: 'rate_limit',
          details: errorData
        }, 429);
      }
      
      // 認証エラー
      if (response.status === 401) {
        return c.json({ 
          success: false, 
          error: `OpenAI APIキーが無効です: ${response.statusText}`, 
          errorType: 'auth_error',
          details: errorData
        }, 500);
      }
      
      // その他のエラー
      return c.json({ 
        success: false, 
        error: `OpenAI APIエラー: ${response.statusText}`,
        details: errorData
      }, 500);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "応答を取得できませんでした";

    // 今月の利用回数を更新（統計目的）
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const usageKey = `usage_${user.id}_${yearMonth}`;
    
    const usage = await kv.get(usageKey);
    const currentCount = usage?.count || 0;
    
    await kv.set(usageKey, {
      count: currentCount + 1,
      lastUsed: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      reply,
      usage: { current: currentCount + 1 }
    });
  } catch (error) {
    console.error("Error during chat:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// 利用状況取得エンドポイント
app.get("/make-server-b40dafad/usage", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "認証が必要です" }, 401);
    }

    // ユーザー認証
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user || authError) {
      return c.json({ success: false, error: "認証エラー" }, 401);
    }

    // 今月の利用回数を取得
    const now = new Date();
    const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const usageKey = `usage_${user.id}_${yearMonth}`;
    
    const usage = await kv.get(usageKey);
    const currentCount = usage?.count || 0;

    return c.json({
      success: true,
      usage: {
        current: currentCount,
      },
    });
  } catch (error) {
    console.error("Error fetching usage:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// プラン変更エンドポイント（削除）
// app.post("/make-server-b40dafad/upgrade", async (c) => {
//   このエンドポイントは無効化されました
// });

Deno.serve(app.fetch);