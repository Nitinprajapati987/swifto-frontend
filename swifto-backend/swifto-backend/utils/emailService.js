const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingConfirmation(to, data) {
  const { name, trackingId, pickup, drop, vehicle, date } = data;
  await transporter.sendMail({
    from: `"SWIFTO Logistics" <${process.env.EMAIL_USER}>`,
    to,
    subject: `✅ Booking Confirmed! Tracking ID: ${trackingId}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f7ff;padding:30px;border-radius:16px;">
        <div style="text-align:center;margin-bottom:24px;">
          <h1 style="color:#4361ee;font-size:2rem;margin:0;">SWIFTO 🚚</h1>
          <p style="color:#6b7280;margin:4px 0;">Aasaan Logistics, Pakki Delivery</p>
        </div>
        <div style="background:white;border-radius:12px;padding:24px;border:2px solid #4361ee;">
          <h2 style="color:#1a1a2e;margin-top:0;">Booking Confirmed! ✅</h2>
          <p style="color:#374151;">Namaste <strong>${name}</strong>! Aapki booking confirm ho gayi hai.</p>
          <div style="background:#eef0ff;border-radius:8px;padding:16px;margin:16px 0;text-align:center;">
            <p style="margin:0;color:#6b7280;font-size:0.85rem;">TRACKING ID</p>
            <h2 style="margin:4px 0;color:#4361ee;letter-spacing:2px;">${trackingId}</h2>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">📍 Pickup</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;border-bottom:1px solid #f3f4f6;">${pickup}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">📦 Drop</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;border-bottom:1px solid #f3f4f6;">${drop}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;border-bottom:1px solid #f3f4f6;">🚛 Vehicle</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;border-bottom:1px solid #f3f4f6;">${vehicle}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;">📅 Date</td><td style="padding:8px 0;font-weight:600;color:#1a1a2e;">${date}</td></tr>
          </table>
          <div style="margin-top:20px;text-align:center;">
            <a href="http://localhost:3007/tracking" style="background:#4361ee;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;">Track Your Order</a>
          </div>
        </div>
        <p style="text-align:center;color:#9ca3af;font-size:0.8rem;margin-top:20px;">SWIFTO Logistics Pvt. Ltd. | Pithampur, Indore | support@swifto.in</p>
      </div>
    `,
  });
}

async function sendAdminAlert(data) {
  const { name, phone, trackingId, pickup, drop, vehicle, date, goods, weight } = data;
  await transporter.sendMail({
    from: `"SWIFTO Booking Alert" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Booking! ${trackingId} — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff3cd;padding:30px;border-radius:16px;border:2px solid #fbbf24;">
        <h2 style="color:#1a1a2e;margin-top:0;">🔔 New Booking Alert!</h2>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;">
          <tr style="background:#4361ee;color:white;"><td colspan="2" style="padding:12px 16px;font-weight:700;">Booking Details — ${trackingId}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">👤 Customer</td><td style="padding:10px 16px;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">📞 Phone</td><td style="padding:10px 16px;font-weight:600;">${phone}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">📍 Pickup</td><td style="padding:10px 16px;font-weight:600;">${pickup}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">📦 Drop</td><td style="padding:10px 16px;font-weight:600;">${drop}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">🚛 Vehicle</td><td style="padding:10px 16px;font-weight:600;">${vehicle}</td></tr>
          <tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">📅 Date</td><td style="padding:10px 16px;font-weight:600;">${date}</td></tr>
          ${goods ? `<tr><td style="padding:10px 16px;color:#6b7280;border-bottom:1px solid #f3f4f6;">📝 Goods</td><td style="padding:10px 16px;font-weight:600;">${goods}</td></tr>` : ''}
          ${weight ? `<tr><td style="padding:10px 16px;color:#6b7280;">⚖️ Weight</td><td style="padding:10px 16px;font-weight:600;">${weight}</td></tr>` : ''}
        </table>
        <p style="color:#ef4444;font-weight:700;margin-top:16px;">⚡ Jaldi contact karo — 30 minute SLA!</p>
      </div>
    `,
  });
}

module.exports = { sendBookingConfirmation, sendAdminAlert };