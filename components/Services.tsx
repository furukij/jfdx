import { Lightbulb, Target, Users, Zap } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: 'イノベーション',
    description: '最新技術とクリエイティブな発想で、革新的なソリューションを提供します。',
  },
  {
    icon: Target,
    title: '戦略的コンサルティング',
    description: 'ビジネス目標の達成に向けて、データドリブンな戦略を立案します。',
  },
  {
    icon: Users,
    title: 'チームサポート',
    description: '専門チームが、プロジェクトの開始から完了まで一貫してサポートします。',
  },
  {
    icon: Zap,
    title: 'スピーディな対応',
    description: '迅速な意思決定と実行力で、ビジネスチャンスを逃しません。',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="services-heading" className="mb-4">私たちのサービス</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            お客様のニーズに合わせた包括的なソリューションを提供し、ビジネスの成長を加速させます。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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