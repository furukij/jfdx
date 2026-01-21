import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateToAI = () => {
    window.history.pushState({}, '', '/ai');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToAPIGuide = () => {
    window.history.pushState({}, '', '/api-guide');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <header className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1639486398709-bb7b5d38e1f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwaGVscCUyMHN1cHBvcnR8ZW58MXx8fHwxNzY3NDE3OTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="ITサポートサービス - スマートフォンやパソコンのサポート"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="mb-6">
            デジタル機器の設定・操作を<br />
            訪問サポート
          </h1>
          <p className="mb-8 text-blue-100 text-lg md:text-xl max-w-2xl">
            スマートフォン、パソコン、プリンタ、WiFiなどの設定でお困りですか？<br />
            ご自宅や職場に訪問し、丁寧にサポートいたします。24年の豊富な経験でお客様の「困った」を解決します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={navigateToAI}
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg hover:bg-yellow-300 transition-colors inline-flex items-center justify-center gap-2"
              aria-label="AIチャットサービスへ移動"
            >
              AIチャットサービス
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={navigateToAPIGuide}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
              aria-label="APIキー設定ガイドへ移動"
            >
              APIキー設定ガイド
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
              aria-label="お問い合わせセクションへ移動"
            >
              お問い合わせ
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="サービス紹介セクションへ移動"
            >
              サービスを見る
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}