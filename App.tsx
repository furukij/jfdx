import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';
import { AdminDashboard } from './components/AdminDashboard';
import { AIServiceHome } from './components/ai/AIServiceHome';
import { APIGuide } from './components/guide/APIGuide';
import { HelmetProvider } from 'react-helmet-async';
import { useAccessLogger } from './hooks/useAccessLogger';
import { useState, useEffect } from 'react';

function MainPage() {
  // メインページでのみアクセスログを記録
  useAccessLogger();

  return (
    <>
      <SEO />
      <div className="min-h-screen">
        <main>
          <Hero />
          <Services />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // パスの変更を監視
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ルーティング処理
  const renderPage = () => {
    if (currentPath === '/admin') {
      return <AdminDashboard />;
    } else if (currentPath === '/ai' || currentPath === '/ai/') {
      return <AIServiceHome />;
    } else if (currentPath === '/api-guide' || currentPath === '/api-guide/') {
      return <APIGuide />;
    } else {
      return <MainPage />;
    }
  };

  return (
    <HelmetProvider>
      {renderPage()}
    </HelmetProvider>
  );
}