import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEO({
  title = 'J.F.デジタルトランスフォーメーション株式会社 | デジタル機器の訪問サポート',
  description = 'スマートフォン、パソコン、プリンタ、WiFiなどの設定や使い方を、ご自宅や職場に訪問して丁寧にサポート。24年の豊富な経験で、お客様の「困った」を解決します。東京都新宿区を拠点に、親切・丁寧なITサポートサービスを提供しています。',
  keywords = 'スマートフォン設定, パソコン設定, プリンタ設定, WiFi設定, 訪問サポート, ITサポート, デジタル機器, 使い方, 東京, 新宿, シニア向け, 初心者',
  ogImage = 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?w=1200&h=630&fit=crop',
  ogType = 'website',
}: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'J.F.デジタルトランスフォーメーション株式会社',
    url: typeof window !== 'undefined' ? window.location.origin : '',
    logo: ogImage,
    description: description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '西新宿3丁目3−12　西新宿水間ビル2階',
      addressLocality: '新宿区',
      addressRegion: '東京都',
      postalCode: '160-0023',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-90-2810-3716',
      email: 'g.chatnoir@gmail.com',
      contactType: 'Customer Service',
      areaServed: 'JP',
      availableLanguage: ['Japanese'],
    },
    priceRange: '$$',
    sameAs: [
      'https://www.facebook.com/yourcompany',
      'https://twitter.com/yourcompany',
      'https://www.linkedin.com/company/yourcompany',
      'https://www.instagram.com/yourcompany',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ITサポートサービス',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'スマートフォン設定サポート',
            description: '初期設定からアカウント作成、各種設定まで訪問サポート',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'パソコン設定サポート',
            description: 'Windows、Mac の初期設定と使い方サポート',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'プリンタ設定サポート',
            description: 'プリンタの接続設定と使い方サポート',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WiFi設定サポート',
            description: 'ルーター設置とWiFi接続設定サポート',
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      <html lang="ja" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="J.F.デジタルトランスフォーメーション株式会社" />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="author" content="J.F.デジタルトランスフォーメーション株式会社" />
      
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
}