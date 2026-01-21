import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface SignupProps {
  onSignupSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function Signup({ onSignupSuccess, onSwitchToLogin }: SignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.error || '登録に失敗しました');
        return;
      }

      alert('会員登録が完了しました！ログインしてください。');
      onSignupSuccess();
    } catch (err) {
      setError(`エラーが発生しました: ${err}`);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-gray-900 mb-2">新規会員登録</h1>
          <p className="text-gray-600">AI チャットサービスへ登録</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              お名前
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            />
          </div>

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
              minLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? '登録中...' : '登録する'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            既にアカウントをお持ちの方は{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              ログイン
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