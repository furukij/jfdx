import { Smartphone, Laptop, Printer, Wifi, BookOpen } from 'lucide-react';

const services = [
  {
    icon: Smartphone,
    title: 'スマートフォンの設定',
    description: '初期設定からアカウント作成、各種設定まで、お客様のスマートフォンを使いやすく設定いたします。',
  },
  {
    icon: BookOpen,
    title: 'スマートフォンアプリの使い方',
    description: 'LINE、メール、カメラなど、日常で使うアプリの操作方法を丁寧にお教えします。',
  },
  {
    icon: Laptop,
    title: 'パソコンの設定',
    description: 'Windows、Macの初期設定、ソフトウェアのインストール、使い方まで幅広くサポートします。',
  },
  {
    icon: Printer,
    title: 'プリンタの設定',
    description: 'プリンタの接続設定、印刷設定、スキャン機能など、プリンタの使い方を丁寧にサポートします。',
  },
  {
    icon: Wifi,
    title: 'WiFiの設定',
    description: 'ルーターの設置、WiFi接続設定、セキュリティ設定まで、インターネット環境を整えます。',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="mb-4">私たちのサービス</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ご自宅や職場に訪問し、デジタル機器の設定や使い方を丁寧にサポートいたします。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4" aria-hidden="true">
                  <Icon className="text-blue-600" size={24} />
                </div>
                <h3 className="mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}