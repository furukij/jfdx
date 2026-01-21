import { useState, useEffect } from 'react';
import { Login } from '../auth/Login';
import { Signup } from '../auth/Signup';
import { ChatInterface } from '../chat/ChatInterface';
import { getSupabaseClient } from '../../utils/supabase/client';

export function AIServiceHome() {
  const [view, setView] = useState<'login' | 'signup' | 'chat'>('login');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // セッションチェック
    const checkSession = async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (data.session?.access_token) {
        setAccessToken(data.session.access_token);
        setView('chat');
      }
    };

    checkSession();
  }, []);

  const handleLoginSuccess = (token: string) => {
    setAccessToken(token);
    setView('chat');
  };

  const handleSignupSuccess = () => {
    setView('login');
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setAccessToken(null);
    setView('login');
  };

  if (view === 'chat' && accessToken) {
    return <ChatInterface accessToken={accessToken} onLogout={handleLogout} />;
  }

  if (view === 'signup') {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setView('login')}
      />
    );
  }

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onSwitchToSignup={() => setView('signup')}
    />
  );
}