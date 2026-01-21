import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信のロジックをここに追加
    alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
    setFormData({ name: '', email: '', phone: '', address: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="mb-4">お問い合わせ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            デジタル機器の設定や使い方でお困りのことがありましたら、お気軽にご相談ください。訪問サポートのご予約も承っております。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="お問い合わせフォーム">
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-gray-700">
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-2 text-gray-700">
                  住所
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-gray-700">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                送信する
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="mb-6">会社情報</h3>
              <address className="space-y-4 not-italic">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">本社所在地</div>
                    <div className="text-gray-600">
                      〒160-0023<br />
                      東京都新宿区西新宿3丁目3−12<br />
                      西新宿水間ビル2階
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">電話番号</div>
                    <a href="tel:+819028103716" className="text-gray-600 hover:text-blue-600 transition-colors">
                      090-2810-3716
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">メールアドレス</div>
                    <a href="mailto:g.chatnoir@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                      g.chatnoir@gmail.com
                    </a>
                  </div>
                </div>
              </address>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="mb-4">
                <h4 className="mb-2">営業時間</h4>
                <p className="text-gray-700">
                  平日 9:00〜18:00<br />
                  土日祝日も対応可（要予約）
                </p>
              </div>
              <div>
                <h4 className="mb-2">対応エリア</h4>
                <p className="text-gray-700">
                  東京、神奈川、千葉、埼玉<br />
                  その他のエリアはご相談ください
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}