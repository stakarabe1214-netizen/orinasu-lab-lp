# おりなす.Lab LP プロジェクト 作業記録

## サイト基本情報
- 本番URL: https://www.orinasu-lab.com/
- リポジトリ: GitHub master ブランチ
- ホスティング: Vercel
- ドメイン: ConoHa（orinasu-lab.com）
- メール送信: Resend（無料プラン 月3,000通まで）
- 問い合わせ受信先: orinasu.lab@gmail.com
- 自動返信送信元: info@orinasu-lab.com
- 公開予定日: 2026年6月6日

## 環境変数（Vercel）
- RESEND_API_KEY（センシティブ）
- ADMIN_EMAIL = orinasu.lab@gmail.com

## 本日（2026-06-01）完了した修正

### Pain セクション（お悩みカード）
- 背景画像差し替え: `01.jpg` → `01-1.jpg` など（4枚）
- No.01～No.04 番号フォント変更
  - 修正前: `№`（モノスペースフォント）
  - 修正後: `No.`（Noto Sans JP Bold）
  - コミットID: `dda79f1`, `961ad56`

### Contact セクション（お問い合わせフォーム見出し）
- 「お問い合わせフォーム」の見出しスタイル統一
  - 「フォーム」部分の文字色: `var(--gold)`（薄いゴールド） → `#ffffff`（白） → `inherit`（黒系に統一）
  - フォント・太さ・サイズを「お問い合わせ」と完全統一
  - コミットID: `d9382ad`, `28afb12`

### Diagnosis Wizard（診断ウィザード）
- 撮影＋メニューブック制作セット価格: ¥80,000〜 → ¥120,000〜
  - 整合性チェック済み（単体価格との比較・セット商品バランス・サービスカード統一性）
  - コミットID: `5392a59`

## 以前に完了した修正（参考記録）

### お悩みカード（Pain セクション）
- ジグザグ配置を横一列に修正（margin-top: 2.5rem 削除）
- No.02 の縦長問題を修正

### サービスカード修正
- 01 POSTER: 「ポスターデータ制作」に名称変更、ラフ案提案、A1/B2対応 ※B1以上要相談、納品形式 PDF/PNG
- 02 FLYER: ラフ案提案、納品形式：PDF / JPEG など
- 04 LANDING PAGE: 価格 ¥70,000〜 → ¥150,000〜
- 05 BRANDING: 「ロゴ・名刺・会社案内 デザイン」¥100,000〜 → ¥150,000〜、内容全面更新、データ納品のみ（印刷は顧客発注）
- 06 PHOTOGRAPHY: 出張3時間以内、Web用サイズ書き出し、納品形式：JPEG
- 07 MENU BOOK: A4 サイズ 4〜8ページ、「デジタルメニュー版（PDF）も対応」削除
- 08 AI SUPPORT: 月次オンライン定例 60分 → 40分
- PRINTING（大判ポスター印刷）: 
  - サイズタグ並び順: B2 → A1 → B1（外注）→ A0（外注）→ 1枚〜 OK
  - 説明文: A1・B1サイズ → A1・B2サイズ
  - セクションラベルを他セクションと統一（● small-lot printing for local shops）
  - 画像差し替え（poster_4koma2.jpg）、外枠線削除

### FAQ
- 「打ち合わせは、お店まで来てもらえますか？」の回答を丁寧な文言に修正

### 制作の流れ（FLOW）
- 画像差し替え（flow_manga2.1.jpg）、外枠線削除

### SEO メタデータ
- canonical URL、og:url、og:image、twitter:url、twitter:image を https://www.orinasu-lab.com に統一

### Diagnosis Wizard（診断ウィザード）
- LP制作価格: ¥70,000〜 → ¥150,000〜
- 撮影＋メニューブック制作セット: 「デジタルメニュー版（PDF）も対応」削除
- ポスター対応サイズ表記: A2 / B2 / A1 → A1 / B2

## 次回以降の残タスク（優先度順）

### 公開前必須（6月6日まで）
1. OGP画像作成・配置（public/images/ogp.jpg）
2. ファビコン作成・配置
3. 2段階認証の有効化（Vercel、Resend、ConoHa、Gmail）
4. Google Search Console 登録
5. Google Analytics 4 設定

### 公開後対応
6. Google ビジネスプロフィール（MEO）
7. プライバシーポリシーページ追加
8. reCAPTCHA 導入（スパム対策）
9. セキュリティヘッダー追加

## 作業ルール
- 修正前に必ずコード差分を提示
- 確認後に実装・コミット・デプロイ
- デプロイコマンド: `cd "C:\Users\po-st\ClaudeCode\active\lp-project" && git push origin master && npx vercel --prod --yes`
- 動作確認は PC・スマホ両方で実施
- ブラウザキャッシュに注意（Ctrl+Shift+R でハードリロード）

## 重要な技術スタック
- フロントエンド: HTML + CSS + JavaScript（静的サイト）
- API: Vercel Serverless Functions（api/contact.js）
- メール送信ライブラリ: Resend（lib/email.js）
- MongoDB は使用していない（削除済み）
