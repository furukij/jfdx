import { ImageWithFallback } from './figma/ImageWithFallback';

const stats = [
  { value: '19', label: 'プロジェクト実績' },
  { value: '98%', label: '顧客満足度' },
  { value: '24年', label: '業界経験' },
  { value: '1人', label: '専門スタッフ' },
];

export function Stats() {
  return (
    <section className="py-20 bg-white" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 id="stats-heading" className="mb-6">数字で見る私たちの実績</h2>
            <p className="text-gray-600 mb-8">
              長年の経験と確かな実績で、多くのお客様から信頼をいただいています。
              私たちは、品質とお客様満足度を最優先に、常に最高のサービスを提供し続けています。
            </p>
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NjUyNTY5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="J.F.デジタルトランスフォーメーション株式会社のチームコラボレーション風景"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}