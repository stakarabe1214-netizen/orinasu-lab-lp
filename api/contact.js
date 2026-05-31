// api/contact.js
require('dotenv').config();
const { sendConfirmationEmail, sendAdminNotification } = require('../lib/email');
const { validateContactForm } = require('../lib/validation');

module.exports = async (req, res) => {
  // CORS ヘッダ設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS リクエスト処理
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // POST メソッドのみ受け付け
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    // フォームデータを取得
    const { name, email, phone, message } = req.body;

    // 検証
    const validation = validateContactForm({ name, email, phone, message });
    if (!validation.isValid) {
      res.status(400).json({
        success: false,
        errors: validation.errors,
      });
      return;
    }

    // メール送信用のデータ構造を作成
    const contact = {
      name,
      email,
      phone: phone || '',
      message,
      createdAt: new Date(),
    };

    // メール送信（完了を待ってからレスポンスを返す）
    try {
      await Promise.all([
        sendConfirmationEmail(contact),
        sendAdminNotification(contact),
      ]);
      console.log('✓ Emails sent successfully');
    } catch (emailError) {
      console.error('✗ Email sending error:', emailError.message);
    }

    // クライアントに成功レスポンスを返す
    res.status(200).json({
      success: true,
      message: 'お問い合わせを受け付けました。',
    });
  } catch (error) {
    console.error('✗ API error:', error.message);
    res.status(500).json({
      success: false,
      error: 'サーバーエラーが発生しました。もう一度お試しください。',
    });
  }
};
