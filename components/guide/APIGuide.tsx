import { Key, CheckCircle, AlertCircle, ExternalLink, Home } from 'lucide-react';

export function APIGuide() {
  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToAI = () => {
    window.history.pushState({}, '', '/ai');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={navigateToHome}
            className="mb-6 flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
          >
            <Home size={20} />
            ホームに戻る
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Key size={32} />
            <h1 className="text-3xl md:text-4xl">OpenAI APIキー 設定ガイド</h1>
          </div>
          <p className="text-blue-100 text-lg">
            AIチャットサービスを利用するためのOpenAI APIキーの取得方法と設定手順
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Step 1: OpenAIカウント作成 */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
              1
            </div>
            <h2 className="text-2xl text-gray-900">OpenAIアカウントを作成</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  <a 
                    href="https://platform.openai.com/signup" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    OpenAI Platform <ExternalLink size={16} />
                  </a>
                  にアクセスします
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  「Sign up」をクリックしてアカウントを作成
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-2 ml-4">
                  <li>メールアドレスで登録、またはGoogleアカウントで登録</li>
                  <li>電話番号の認証が必要です</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: 支払い方法の設定 */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
              2
            </div>
            <h2 className="text-2xl text-gray-900">支払い方法を設定</h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-yellow-800">
                  <strong>重要:</strong> OpenAI APIは従量課金制です。クレジットカードの登録が必要です。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  <a 
                    href="https://platform.openai.com/account/billing/overview" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    Billing settings <ExternalLink size={16} />
                  </a>
                  にアクセス
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  「Add payment method」からクレジットカードを登録
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  初期クレジット（$5-$10度）を購入することをお勧めします
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-gray-900 mb-2">料金の目安</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• GPT-3.5-turbo: 1,000トークンあたり $0.002（約0.3円）</li>
              <li>• GPT-4: 1,000トークンあたり $0.03-0.06（約4-9円）</li>
              <li>• 本サービスではGPT-3.5-turboを使用しており、1回の利用で約0.1-0.5円程度です</li>
            </ul>
          </div>
        </section>

        {/* Step 3: APIキーの取得 */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
              3
            </div>
            <h2 className="text-2xl text-gray-900">APIキーを取得</h2>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="text-red-800 mb-2">
                  <strong>⚠️ 重要な注意事項</strong>
                </p>
                <ul className="text-red-700 space-y-2">
                  <li>• APIキーは必ず「<strong>sk-</strong>」または「<strong>sk-proj-</strong>」で始まります</li>
                  <li>• 「6647chatnoir」のような短い文字列は<strong>APIキーではありません</strong></li>
                  <li>• 正しいAPIキーは非常に長い文字列（100文字以上）です</li>
                  <li>• 例: <code className="bg-red-100 px-2 py-1 rounded text-sm">sk-proj-AbCd1234EfGh5678...</code>（実際はもっと長い）</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    API Keys ページ <ExternalLink size={16} />
                  </a>
                  にアクセス
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  「Create new secret key」をクリック
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  キーに名前を付けて作成（例: "J.F.デジタルトランスフォーメーション"）
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700 mb-2">
                  表示されたAPIキーを<strong>全て</strong>コピーして安全な場所に保存
                </p>
                <div className="bg-yellow-50 border border-yellow-300 rounded p-3 text-sm">
                  <p className="text-yellow-800 mb-2">
                    <strong>正しいAPIキーの例:</strong>
                  </p>
                  <code className="bg-white px-2 py-1 rounded text-xs block overflow-x-auto">
                    sk-proj-AbCd1234EfGh5678IjKl9012MnOp3456QrSt7890UvWx1234YzAb5678CdEf9012GhIj3456KlMn7890OpQr1234StUv5678WxYz9012
                  </code>
                  <p className="text-yellow-700 mt-2">
                    👆 このように非常に長い文字列です（実際は100文字以上）
                  </p>
                </div>
                <p className="text-red-600 text-sm mt-3">
                  ⚠️ APIキーは一度しか表示されません！必ず<strong>全て</strong>コピーして保存してください
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <p className="text-gray-700 mb-2">
              <strong>APIキーの形式:</strong>
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>✅ 正しい: <code className="bg-white px-2 py-1 rounded text-sm">sk-proj-xxxxx...</code> （100文字以上）</li>
              <li>✅ 正しい: <code className="bg-white px-2 py-1 rounded text-sm">sk-xxxxx...</code> （100文字以上）</li>
              <li>❌ 間違い: <code className="bg-white px-2 py-1 rounded text-sm">6647chatnoir</code> （短すぎる）</li>
              <li>❌ 間違い: <code className="bg-white px-2 py-1 rounded text-sm">12345678</code> （数字のみ）</li>
            </ul>
          </div>
        </section>

        {/* Step 4: APIキーの設定 */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
              4
            </div>
            <h2 className="text-2xl text-gray-900">本サービスにAPIキーを設定</h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-blue-800 mb-3">
                  <strong>重要:</strong> Figma Makeは以下の2つの画面で構成されています
                </p>
                <ul className="text-blue-800 space-y-2">
                  <li>• <strong>プレビュー画面</strong>: 実際のウェブサイトが表示される画面（今見ている画面）</li>
                  <li>• <strong>編集画面（Figma Make）</strong>: コードを編集したり、設定を変更する画面</li>
                </ul>
                <p className="text-blue-800 mt-3">
                  👉 <strong>「Secrets」ボタンは編集画面にあります</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mb-6">
            <h3 className="text-yellow-900 text-xl mb-3 flex items-center gap-2">
              <AlertCircle className="text-yellow-600" size={24} />
              <strong>編集画面への切り替え方法（Mac）</strong>
            </h3>
            <div className="space-y-3 text-yellow-900">
              <div className="bg-white rounded p-3">
                <p className="mb-2"><strong>方法1: キーボードショートカット</strong></p>
                <p className="text-sm">
                  <code className="bg-yellow-100 px-3 py-1 rounded text-base">Command + E</code> または <code className="bg-yellow-100 px-3 py-1 rounded text-base">Cmd + E</code>
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="mb-2"><strong>方法2: ブラウザのタブ</strong></p>
                <p className="text-sm">
                  ブラウザのタブを確認してください。「Figma Make」や「Edit」という名前のタブがあれば、そちらをクリック
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="mb-2"><strong>方法3: 画面上部のボタン</strong></p>
                <p className="text-sm">
                  画面上部に「編集」「Edit」「Code」などのボタンがあればクリック
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                1
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>Figma Makeの編集画面に切り替える</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  上記のいずれかの方法で編集画面を開きます
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                2
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>画面右上の「Secrets」ボタンを探す</strong>
                </p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 space-y-2">
                  <p>編集画面の右上に以下のようなボタンがあります：</p>
                  <ul className="ml-4 space-y-1">
                    <li>• 🔑 <strong>Secrets</strong></li>
                    <li>• または <strong>ENV</strong></li>
                    <li>• または <strong>環境変数</strong></li>
                  </ul>
                  <p className="text-yellow-800 bg-yellow-50 p-2 rounded mt-2">
                    ⚠️ プレビュー画面（今見ている画面）には「Secrets」ボタンはありません
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                3
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>「Secrets」ボタンをクリック</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  モーダルウィンドウ（ポップアップ）が開きます
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                4
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>「OPENAI_API_KEY」の欄にAPIキーを入力</strong>
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• OpenAIから取得したAPIキーをペースト（Command + V）</li>
                  <li>• 形式: <code className="bg-gray-100 px-2 py-0.5 rounded">sk-proj-xxxxx...</code></li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                5
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>「Save」または「保存」ボタンをクリック</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                6
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>プレビュー画面に戻る</strong>
                </p>
                <ul className="text-gray-600 text-sm space-y-1 ml-4">
                  <li>• キーボードショートカット: <code className="bg-gray-100 px-2 py-0.5 rounded">Command + E</code></li>
                  <li>• または画面上部の「Preview」「プレビュー」ボタンをクリック</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-1">
                7
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  <strong>ページをリロード</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  <code className="bg-gray-100 px-2 py-0.5 rounded">Command + R</code> または更新ボタン 🔄
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              ✅ 設定完了！AIチャットサービスが利用可能になりました
            </p>
          </div>
        </section>

        {/* 設定確認方法 */}
        <section className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
              ✓
            </div>
            <h2 className="text-2xl text-gray-900">設定が正しくできたか確認する方法</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  <button
                    onClick={navigateToAI}
                    className="text-blue-600 hover:underline"
                  >
                    AIチャットサービスページ
                  </button>
                  に移動
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  ログインまたは新規登録を行う
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  テストメッセージ（例: "こんにちは"）を送信してみる
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="text-gray-700">
                  AIからの返信が正常に届けば、設定成功です！
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* セキュリティに関する注意 */}
        <section className="bg-red-50 border border-red-200 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-600" size={24} />
            <h2 className="text-2xl text-gray-900">セキュリティに関する重要な注意事項</h2>
          </div>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>APIキーは絶対に他人と共有しないでください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>GitHubなどの公開リポジトリにAPIキーをアップロードしないでください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>不正使用を防ぐため、定期的に使用状況を確認してください</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>使用上限を設定することをお勧めします（OpenAI Platformの設定画面から可能）</span>
            </li>
          </ul>
        </section>

        {/* トラブルシューティング */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl text-gray-900 mb-6">トラブルシューティング</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-900 mb-2">❌ 「OpenAI APIのクレジット残高が不足しています」と表示される</h3>
              <div className="ml-4 space-y-3">
                <p className="text-gray-700"><strong>これは最もよくあるエラーの1つです</strong></p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-900 mb-2"><strong>主な原因：</strong></p>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• OpenAIアカウントにクレジット残高がない</li>
                    <li>• 支払い方法（クレジットカード）が登録されていない</li>
                    <li>• 無料トライアル期間（$5分）が終了した</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-900 mb-2"><strong>解決方法：</strong></p>
                  <div className="text-green-800 space-y-3">
                    <div>
                      <strong>ステップ1: 支払い方法を登録</strong><br/>
                      <a href="https://platform.openai.com/account/billing/payment-methods" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Payment methods ページ
                      </a> でクレジットカードを登録
                    </div>
                    <div>
                      <strong>ステップ2: クレジットを購入</strong><br/>
                      <a href="https://platform.openai.com/account/billing/overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Billing overview ページ
                      </a> で「Add to credit balance」をクリック<br/>
                      <span className="text-sm">推奨: $5〜$10（約750円〜1,500円）</span>
                    </div>
                    <div>
                      <strong>ステップ3: 設定完了後</strong><br/>
                      ページをリロード（Command + R）してから再度お試しください
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-900 mb-2">
                    💰 <strong>料金について:</strong>
                  </p>
                  <ul className="text-blue-800 space-y-1">
                    <li>• 本サービスは1回あたり約0.1〜0.5円程度</li>
                    <li>• $5（約750円）で数千回利用できます</li>
                    <li>• GPT-3.5-turboを使用しているため、非常に安価です</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「OpenAI APIエラー: Too Many Requests」と表示される</h3>
              <div className="ml-4 space-y-3">
                <p className="text-gray-700"><strong>これは最もよくあるエラーです</strong></p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-900 mb-2"><strong>主な原因：</strong></p>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• OpenAI APIの<strong>レート制限</strong>（1分あたりのリクエスト数制限）に達した</li>
                    <li>• 無料プラン: 1分あたり3リクエスト、1日あたり200リクエスト</li>
                    <li>• 支払い方法が登録されていない、またはクレジット残高が不足</li>
                    <li>• 短時間に連続で質問を送信した</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-900 mb-2"><strong>解決方法：</strong></p>
                  <ul className="text-green-800 space-y-2">
                    <li>
                      <strong>1. 少し待つ（最も簡単）</strong><br/>
                      1〜2分待ってから再度お試しください
                    </li>
                    <li>
                      <strong>2. 使用状況を確認</strong><br/>
                      <a href="https://platform.openai.com/usage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        OpenAI Usage Dashboard
                      </a> でレート制限と使用状況を確認
                    </li>
                    <li>
                      <strong>3. クレジットを追加購入</strong><br/>
                      <a href="https://platform.openai.com/account/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        OpenAI Billing
                      </a> で$5〜$10のクレジットを購入すると、より高いレート制限が適用されます
                    </li>
                    <li>
                      <strong>4. 支払い方法を登録</strong><br/>
                      クレジットカードを登録すると、レート制限が大幅に緩和されます
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-900">
                    💡 <strong>ヒント:</strong> 質問を送信する際は、連続で送信せず、少し間隔を空けてください（数秒〜数十秒）
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「OpenAI APIエラー: Unauthorized」と表示される</h3>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• APIキーが正しく設定されているか確認してください</li>
                <li>• APIキーが「sk-proj-」または「sk-」で始まっているか確認してください</li>
                <li>• APIキーをコピーする際に余分なスペースが入っていないか確認してください</li>
                <li>• 設定後、必ずページをリロード（Command + R）してください</li>
                <li>• OpenAIのアカウントで支払い方法が登録されているか確認してください</li>
                <li>• OpenAIのアカウントにクレジット残高があるか確認してください</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「OpenAI APIキーが設定されていません」と表示される</h3>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• Figma Makeの編集画面で「Secrets」ボタンを押して設定したか確認</li>
                <li>• 保存ボタンをクリックしたか確認</li>
                <li>• 設定後、必ずページをリロード（Command + R）してください</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「OpenAI APIエラー」と表示される</h3>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• 支払い方法が登録されているか確認してください</li>
                <li>• クレジット残高があるか確認してください</li>
                <li>• APIキーが有効か確認してください（OpenAIのダッシュボードで確認）</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「認証エラー」と表示される</h3>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• 再度ログインしてみてください</li>
                <li>• ブラウザのキャッシュをクリアしてみてください</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">❌ 「利用上限に達しました」と表示される</h3>
              <ul className="text-gray-600 space-y-1 ml-4">
                <li>• 無料プランは月10回、プレミアムプランは月100回まで利用可能です</li>
                <li>• 翌月になるとカウントがリセットされます</li>
                <li>• プレミアムプランへのアップグレードをご検討ください</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">💡 最も多い原因</h3>
              <p className="text-gray-700 mb-2">
                <strong>Unauthorized エラーの場合:</strong>
              </p>
              <ol className="text-gray-600 space-y-2 ml-4 list-decimal">
                <li>OpenAIで支払い方法（クレジットカード）が登録されていない</li>
                <li>OpenAIで初期クレジット（$5-$10）を購入していない</li>
                <li>APIキーの設定後、ページをリロードしていない</li>
              </ol>
            </div>
          </div>
        </section>

        {/* サポート情報 */}
        <section className="mt-8 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl text-gray-900 mb-4">サポートが必要な場合</h2>
          <p className="text-gray-700 mb-4">
            設定でお困りの場合は、J.F.デジタルトランスフォーメーション株式会社までお問い合わせください。
          </p>
          <div className="space-y-2 text-gray-700">
            <p>📧 Email: <a href="mailto:info@jf-digital.jp" className="text-blue-600 hover:underline">info@jf-digital.jp</a></p>
            <p>📞 電話: <a href="tel:0312345678" className="text-blue-600 hover:underline">03-1234-5678</a></p>
            <p>🏢 営業時間: 平日 9:00-18:00</p>
          </div>
        </section>

        {/* AIサービスへのリンク */}
        <div className="mt-8 text-center">
          <button
            onClick={navigateToAI}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            AIチャットサービスを始める
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}