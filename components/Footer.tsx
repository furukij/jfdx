import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white mb-4">J.F.デジタルトランスフォーメーション株式会社</h3>
            <p className="text-gray-400">
              革新的なソリューションで、お客様のビジネスを次のステージへ。
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">サービス</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  コンサルティング
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  システム開発
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  マーケティング
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  サポート
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">会社情報</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  会社概要
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  採用情報
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  ニュース
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">フォローする</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            &copy; 2025 J.F.デジタルトランスフォーメーション株式会社. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              利用規約
            </a>
            <a 
              href="/admin" 
              className="text-gray-400 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/admin');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              管理画面
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}