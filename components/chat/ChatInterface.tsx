import { useState, useEffect, useRef } from 'react';
import { Send, LogOut, User } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatInterfaceProps {
  accessToken: string;
  onLogout: () => void;
}

export function ChatInterface({ accessToken, onLogout }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState({ current: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsage();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchUsage = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/usage`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setUsage(data.usage);
      }
    } catch (err) {
      console.error('Error fetching usage:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message: input }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        let errorContent = data.error || 'エラーが発生しました';
        
        // クレジット不足エラーの詳細な説明
        if (data.errorType === 'insufficient_quota' || errorContent.includes('クレジット残高が不足') || errorContent.includes('exceeded your current quota')) {
          errorContent = '💳 OpenAI APIのクレジット残高が不足しています\n\n' +
            '【原因】\n' +
            '• OpenAIアカウントにクレジット残高がありません\n' +
            '• 支払い方法（クレジットカード）が登録されていません\n' +
            '• 無料トライアル期間が終了しました\n\n' +
            '【解決方法】\n' +
            '1. OpenAIで支払い方法（クレジットカード）を登録\n' +
            '   👉 https://platform.openai.com/account/billing/payment-methods\n\n' +
            '2. クレジットを購入（$5〜$10で十分です）\n' +
            '   👉 https://platform.openai.com/account/billing/overview\n' +
            '   「Add to credit balance」から購入できます\n\n' +
            '3. 設定完了後、このページをリロード（Command + R）\n\n' +
            '💰 料金の目安:\n' +
            '• 本サービスは1回あたり約0.1〜0.5円程度です\n' +
            '• $5（約750円）で数千回利用できます\n\n' +
            '📚 詳しくはAPIキー設定ガイドをご覧ください';
        }
        // レート制限エラーの詳細な説明
        else if (data.errorType === 'rate_limit' || errorContent.includes('Too Many Requests') || errorContent.includes('レート制限')) {
          errorContent = '⏱️ OpenAI APIのレート制限に達しました\n\n' +
            '【原因】\n' +
            '• 短時間に多くのリクエストを送信しました\n' +
            '• OpenAIの無料プラン/従量課金プランのレート制限（1分あたり3リクエスト、1日あたり200リクエストなど）\n' +
            '• APIキーに割り当てられたクレジットが不足している可能性\n\n' +
            '【解決方法】\n' +
            '1. 少し時間をおいてから（1〜2分後）再度お試しください\n' +
            '2. OpenAIのダッシュボードで使用状況とレート制限を確認\n' +
            '   👉 https://platform.openai.com/usage\n' +
            '3. より高いレート制限が必要な場合は、OpenAIでクレジットを追加購入\n' +
            '4. 支払い方法（クレジットカード）が正しく登録されているか確認\n\n' +
            '💡 ヒント: 連続で質問を送信せず、少し間隔を空けてご利用ください';
        }
        // APIキーエラーの詳細な説明を追加
        else if (errorContent.includes('Unauthorized') || errorContent.includes('invalid_api_key') || errorContent.includes('Incorrect API key')) {
          errorContent = '❌ OpenAI APIキーが無効です。\n\n' +
            '【原因】\n' +
            '• APIキーが正しく設定されていません\n' +
            '• 設定されているAPIキーの形式が間違っています\n\n' +
            '【解決方法】\n' +
            '1. APIキーは「sk-」または「sk-proj-」で始まる100文字以上の長い文字列です\n' +
            '2. 「6647chatnoir」のような短い文字列は無効です\n' +
            '3. APIキー設定ガイドを参照して、正しいAPIキーを設定してください\n\n' +
            '👉 トップページの「APIキー設定ガイド」ボタンをクリック';
        } else if (errorContent.includes('APIキーが設定されていません')) {
          errorContent = '❌ OpenAI APIキーが設定されていません。\n\n' +
            '【解決方法】\n' +
            '1. Figma Makeの編集画面を開く（Command + E）\n' +
            '2. 右上の「Secrets」ボタンをクリック\n' +
            '3. OPENAI_API_KEYを入力して保存\n' +
            '4. ページをリロード（Command + R）\n\n' +
            '👉 詳しくは「APIキー設定ガイド」をご覧ください';
        }
        
        const errorMessage: Message = {
          role: 'assistant',
          content: errorContent,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        
        if (data.limitReached) {
          fetchUsage();
        }
        return;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      if (data.usage) {
        setUsage({
          current: data.usage.current,
        });
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'エラーが発生しました。もう一度お試しください。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    const newPlan = usage.plan === 'free' ? 'premium' : 'free';
    const confirmMessage = newPlan === 'premium' 
      ? 'プレミアムプランにアップグレードしますか？（月100回まで利用可能）'
      : '無料プランに変更しますか？（月10回まで利用可能）';

    if (!confirm(confirmMessage)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/upgrade`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ plan: newPlan }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        fetchUsage();
      } else {
        alert(data.error || 'プラン変更に失敗しました');
      }
    } catch (err) {
      console.error('Upgrade error:', err);
      alert('エラーが発生しました');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-1">AI チャットサービス</h1>
              <p className="text-blue-100 text-sm">J.F.デジタルトランスフォーメーション株式会社</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              ログアウト
            </button>
          </div>
        </div>
      </header>

      {/* Usage Stats */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={18} className="text-gray-600" />
              <span className="text-gray-700">会員</span>
            </div>
            <div className="text-gray-600">
              今月の利用回数: <span className="text-blue-600">{usage.current}</span> 回
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <Send className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-gray-900 mb-2">AIチャットを始めましょう</h2>
              <p className="text-gray-600">
                下のフォームから質問やメッセージを送信してください
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('ja-JP')}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={loading || !input.trim()}
            >
              <Send size={20} />
              {loading ? '送信中...' : '送信'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}