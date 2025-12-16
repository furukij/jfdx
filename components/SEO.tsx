import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export function SEO({
  title = 'J.F.デジタルトランスフォーメーション株式会社 | ビジネスの未来を共に創造',
  description = 'J.F.デジタルトランスフォーメーション株式会社は、革新的なソリューションでお客様のビジネスを次のステージへ導きます。24年の業界経験と専門的なコンサルティング、システム開発、マーケティング支援で、企業のデジタル変革をサポートします。',
  keywords = 'デジタルトランスフォーメーション, DX, コンサルティング, システム開発, マーケティング, ビジネスソリューション, 東京, 新宿, IT支援',
  ogImage = 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?w=1200&h=630&fit=crop',
  ogType = 'website',
}: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
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
    sameAs: [
      'https://www.facebook.com/yourcompany',
      'https://twitter.com/yourcompany',
      'https://www.linkedin.com/company/yourcompany',
      'https://www.instagram.com/yourcompany',
    ],
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
