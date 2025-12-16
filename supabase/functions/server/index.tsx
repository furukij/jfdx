import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

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

Deno.serve(app.fetch);