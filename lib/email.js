// lib/email.js - Resend を使用したメール送信
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'info@orinasu-lab.com';

// 受信確認メール（ユーザーへ）
async function sendConfirmationEmail(contact) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: contact.email,
      subject: '✓ お問い合わせを受け付けました｜おりなす.Lab',
      html: `
        <h2>お問い合わせありがとうございます</h2>
        <p>${contact.name} 様</p>
        <p>お問い合わせを受け付けました。</p>
        <p>内容確認後、担当者よりご連絡させていただきます。</p>
        <hr>
        <p><strong>お問い合わせ内容:</strong></p>
        <p>${contact.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>おりなす.Lab</p>
        <p>神戸市北区 | 全国対応</p>
      `,
    });

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }

    console.log(`✓ Confirmation email sent to ${contact.email}`);
    return true;
  } catch (error) {
    console.error('✗ Failed to send confirmation email:', error.message);
    throw error;
  }
}

// 管理者への通知メール
async function sendAdminNotification(contact) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `[新規お問い合わせ] ${contact.name} 様から`,
      html: `
        <h2>新規お問い合わせ通知</h2>
        <p><strong>名前:</strong> ${contact.name}</p>
        <p><strong>メール:</strong> ${contact.email}</p>
        <p><strong>電話:</strong> ${contact.phone || '未記入'}</p>
        <p><strong>メッセージ:</strong></p>
        <pre>${contact.message}</pre>
        <p><strong>受付日時:</strong> ${new Date(contact.createdAt).toLocaleString('ja-JP')}</p>
      `,
    });

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }

    console.log(`✓ Admin notification sent to ${process.env.ADMIN_EMAIL}`);
    return true;
  } catch (error) {
    console.error('✗ Failed to send admin notification:', error.message);
    throw error;
  }
}

module.exports = { sendConfirmationEmail, sendAdminNotification };
