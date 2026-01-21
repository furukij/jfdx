import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { getSupabaseClient } from '../../utils/supabase/client';

interface LoginProps {
  onLoginSuccess: (accessToken: string) => void;
  onSwitchToSignup: () => void;
}

export function Login({ onLoginSuccess, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(`ログインエラー: ${error.message}`);
        return;
      }

      if (data.session?.access_token) {
        onLoginSuccess(data.session.access_token);
      }
    } catch (err) {
      setError(`エラーが発生しました: ${err}`);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-gray-900 mb-2">ログイン</h1>
          <p className="text-gray-600">AI チャットサービスへようこそ</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            アカウントをお持ちでない方は{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              新規登録
            </button>
          </p>
          <p className="text-gray-600 mt-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/api-guide');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              APIキー設定ガイドを見る
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}