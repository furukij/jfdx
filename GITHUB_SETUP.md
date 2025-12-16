# Github連携セットアップガイド

このプロジェクトをGithubに保存するための手順です。

## 📋 前提条件

- Githubアカウントを持っていること
- Git がインストールされていること
- ターミナル（コマンドライン）の基本操作ができること

## 🚀 手順

### 1. Githubで新しいリポジトリを作成

1. [Github](https://github.com)にログイン
2. 右上の「+」アイコンをクリックし、「New repository」を選択
3. リポジトリ情報を入力：
   - **Repository name**: `jf-digital-transformation` (お好みの名前)
   - **Description**: `J.F.デジタルトランスフォーメーション株式会社 コーポレートサイト`
   - **Public/Private**: お好みで選択
   - **Initialize this repository with**: チェックを入れない（空のリポジトリを作成）
4. 「Create repository」をクリック

### 2. ローカルにプロジェクトディレクトリを作成

```bash
# プロジェクトディレクトリを作成
mkdir jf-digital-transformation
cd jf-digital-transformation

# Gitリポジトリを初期化
git init
```

### 3. プロジェクトファイルをコピー

Figma Makeから以下のファイルとフォルダをすべてコピーして、作成したディレクトリに配置してください：

#### ルートファイル
- `App.tsx`
- `main.tsx`
- `index.html`
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `.gitignore`
- `README.md`

#### フォルダとその中身
- `components/` （すべてのコンポーネントファイル）
- `hooks/` （useAccessLogger.tsx）
- `styles/` （globals.css）
- `supabase/` （サーバーファイル）
- `utils/` （Supabase設定）

### 4. Supabase設定ファイルの準備

`/utils/supabase/info.tsx` ファイルに、あなたのSupabaseプロジェクトの情報を設定してください：

```typescript
export const projectId = 'your-actual-project-id';
export const publicAnonKey = 'your-actual-anon-key';
```

⚠️ **重要**: 実際の値をハードコードする代わりに、環境変数を使用することを強く推奨します。

### 5. 環境変数ファイルの作成（推奨）

`.env.local` ファイルを作成し、Supabaseの情報を設定：

```env
VITE_SUPABASE_PROJECT_ID=your-project-id
VITE_SUPABASE_ANON_KEY=your-anon-key
```

そして、`/utils/supabase/info.tsx` を以下のように変更：

```typescript
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 6. Gitにコミット

```bash
# すべてのファイルをステージング
git add .

# コミット
git commit -m "Initial commit: J.F.デジタルトランスフォーメーション株式会社サイト"
```

### 7. Githubにプッシュ

Githubで作成したリポジトリのURLを使用します（手順1で作成したリポジトリのページに表示されています）：

```bash
# リモートリポジトリを追加（URLは自分のものに置き換えてください）
git remote add origin https://github.com/yourusername/jf-digital-transformation.git

# mainブランチにプッシュ
git branch -M main
git push -u origin main
```

### 8. 確認

Githubのリポジトリページをブラウザで開いて、すべてのファイルがアップロードされていることを確認してください。

## 🔄 今後の更新方法

ファイルを変更した後、以下のコマンドでGithubに反映できます：

```bash
# 変更をステージング
git add .

# コミット（メッセージは変更内容に応じて変更してください）
git commit -m "更新内容の説明"

# Githubにプッシュ
git push
```

## 🎯 次のステップ

### Github Pagesでの公開（オプション）

Githubリポジトリから直接ウェブサイトを公開することもできます：

1. リポジトリの「Settings」タブを開く
2. 左サイドバーの「Pages」をクリック
3. 「Source」で「Github Actions」を選択
4. Viteアプリ用のワークフローを設定

### Vercelでのデプロイ（推奨）

1. [Vercel](https://vercel.com)にログイン
2. 「New Project」をクリック
3. Githubリポジトリを選択
4. 環境変数を設定（Supabase情報）
5. 「Deploy」をクリック

### Netlifyでのデプロイ

1. [Netlify](https://netlify.com)にログイン
2. 「Add new site」→「Import an existing project」
3. Githubリポジトリを選択
4. ビルド設定を確認
5. 環境変数を設定
6. 「Deploy」をクリック

## ❓ トラブルシューティング

### 認証エラー

Githubへのプッシュ時に認証エラーが出る場合：

- **HTTPS使用時**: Personal Access Tokenを使用
  1. Github → Settings → Developer settings → Personal access tokens
  2. 「Generate new token」でトークンを作成
  3. パスワードの代わりにトークンを使用

- **SSH使用時**: SSH keyを設定
  ```bash
  # SSH keyの生成
  ssh-keygen -t ed25519 -C "your-email@example.com"
  
  # SSH keyをGithubに追加
  # ~/.ssh/id_ed25519.pub の内容をGithubのSSH keysに登録
  ```

### ファイルが大きすぎるエラー

node_modulesなど大きなファイルがある場合は、`.gitignore`に追加されていることを確認してください。

## 📞 サポート

問題が発生した場合は、Githubの[ヘルプドキュメント](https://docs.github.com)を参照するか、お問い合わせください。

---

作成日: 2025年12月16日
