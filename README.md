# J.F.デジタルトランスフォーメーション株式会社

デジタル機器の訪問サポートサービス

## 🌟 概要

J.F.デジタルトランスフォーメーション株式会社の公式ランディングページです。スマートフォン、パソコン、プリンタ、WiFiなどのデジタル機器の設定や使い方を、ご自宅や職場に訪問してサポートするサービスを提供しています。

## 🚀 主な機能

### フロントエンド
- **レスポンシブデザイン**: デスクトップ、タブレット、モバイルに対応
- **ヒーローセクション**: サービスの特徴を伝える魅力的なファーストビュー
- **サービス紹介**: 5つの主要サポートサービスの紹介
  - スマートフォンの設定
  - スマートフォンアプリの使い方
  - パソコンの設定
  - プリンタの設定
  - WiFiの設定
- **統計情報**: 会社の実績を視覚的に表示
- **お問い合わせフォーム**: 訪問サポートのご予約・ご相談受付
- **SEO対策**: メタタグ、構造化データ（JSON-LD）、セマンティックHTML
- **アクセシビリティ**: ARIA属性、キーボードナビゲーション対応

### バックエンド（Supabase）
- **アクセスログ記録**: 訪問者の基本情報を自動記録
- **統計分析**: 総訪問数、ページビュー、日次訪問数などの集計
- **管理画面**: ビジュアルなダッシュボードでデータを確認

## 📋 技術スタック

- **フレームワーク**: React 18
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **UIコンポーネント**: shadcn/ui
- **チャート**: Recharts
- **アイコン**: Lucide React
- **SEO**: React Helmet Async
- **バックエンド**: Supabase (Edge Functions, KV Store)
- **サーバー**: Hono (Deno runtime)

## 🏗️ プロジェクト構造

```
/
├── App.tsx                          # メインアプリケーション
├── package.json                     # 依存関係
├── styles/
│   └── globals.css                  # グローバルスタイル
├── components/
│   ├── Hero.tsx                     # ヒーローセクション
│   ├── Services.tsx                 # サービス紹介セクション
│   ├── Stats.tsx                    # 統計セクション
│   ├── Contact.tsx                  # お問い合わせセクション
│   ├── Footer.tsx                   # フッター
│   ├── SEO.tsx                      # SEOコンポーネント
│   ├── AdminDashboard.tsx           # アクセスログ管理画面
│   └── ui/                          # shadcn/ui コンポーネント
├── hooks/
│   └── useAccessLogger.tsx          # アクセスログ記録フック
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx            # Honoサーバー（エンドポイント定義）
│           └── kv_store.tsx         # KVストアユーティリティ
└── utils/
    └── supabase/
        └── info.tsx                 # Supabase接続情報
```

## 🔧 セットアップ

### 前提条件
- Node.js 18以上
- Supabaseアカウント

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/jf-digital-transformation.git
cd jf-digital-transformation

# 依存関係のインストール
npm install
```

### 環境変数の設定

Supabaseプロジェクトの情報を `/utils/supabase/info.tsx` に設定してください：

```typescript
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## 📊 管理画面

アクセスログ管理画面には `/admin` パスでアクセスできます。

### 管理画面の機能
- **統計カード**: 総訪問数、ページビュー数、7日間の訪問数、最新アクセス時刻
- **日次訪問数グラフ**: 過去7日間のアクセス推移を棒グラフで表示
- **ページ別訪問数グラフ**: 最もアクセスされたページのランキング
- **詳細ログテーブル**: 日時、ページ、リファラー、デバイス、ブラウザ情報
- **自動更新**: 30秒ごとにデータを自動更新

## 🏢 会社情報

- **会社名**: J.F.デジタルトランスフォーメーション株式会社
- **所在地**: 〒160-0023 東京都新宿区西新宿3丁目3−12 西新宿水間ビル2階
- **電話**: 090-2810-3716
- **メール**: g.chatnoir@gmail.com

## 📈 統計情報

- 専門スタッフ: 1人
- 業界経験: 24年
- プロジェクト実績: 19件

## 🔒 プライバシー

アクセスログには以下の匿名化された情報のみを記録します：
- アクセス日時
- ページURL
- リファラー（参照元）
- ユーザーエージェント（デバイス・ブラウザ情報）

IPアドレスなどの個人を特定できる情報は収集していません。

## 🚀 デプロイ

### Vercelへのデプロイ

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

### Netlifyへのデプロイ

```bash
# Netlify CLIのインストール
npm i -g netlify-cli

# デプロイ
netlify deploy --prod
```

## 📝 ライセンス

© 2025 J.F.デジタルトランスフォーメーション株式会社. All rights reserved.

## 🤝 サポート

お問い合わせは以下までご連絡ください：
- メール: g.chatnoir@gmail.com
- 電話: 090-2810-3716