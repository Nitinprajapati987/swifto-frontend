const jwt      = require('jsonwebtoken');
const Booking  = require('../models/Booking');
const Tracking = require('../models/Tracking');
const twilio   = require('twilio');
const { sendBookingConfirmation, sendAdminAlert } = require('../utils/emailService');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendWhatsApp(to, message) {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to:   to,
      body: message,
    });
    console.log('WhatsApp sent to:', to);
  } catch (err) {
    console.error('WhatsApp error:', err.message);
  }
}

exports.createBooking = async (req, res) => {
  try {
    const { name, phone, email, pickup, drop, vehicle, date, goods, weight, userType } = req.body;

    if (!name || !phone || !pickup || !drop || !vehicle || !date)
      return res.status(400).json({ message: 'Please fill all required fields.' });

    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')))
      return res.status(400).json({ message: 'Enter a valid 10-digit Indian phone number.' });

    let userId = null;
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (e) {}
    }

    const booking = await Booking.create({
      userId,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      pickup: pickup.trim(),
      drop: drop.trim(),
      vehicle, date,
      goods: goods || '',
      weight: weight || '',
      userType: userType || 'company',
    });

    const trackingId = booking.trackingId;

    try {
      await Tracking.create({
        bookingId:  booking._id,
        trackingId: trackingId,
        status:     'confirmed',
        timeline: [{
          status:  'confirmed',
          message: 'Booking confirmed! Our team will contact you within 30 minutes.',
          time:    new Date(),
        }],
      });
    } catch (trackErr) {
      console.error('Tracking error:', trackErr.message);
    }

    // ✅ Customer ko Email
    if (email) {
      try {
        await sendBookingConfirmation(email, {
          name, trackingId, pickup, drop, vehicle, date,
        });
        console.log('Customer email sent to:', email);
      } catch (emailErr) {
        console.error('Customer email error:', emailErr.message);
      }
    }

    // ✅ Admin ko Email Alert
    try {
      await sendAdminAlert({
        name, phone, trackingId,
        pickup, drop, vehicle, date,
        goods, weight,
      });
      console.log('Admin alert email sent!');
    } catch (emailErr) {
      console.error('Admin email error:', emailErr.message);
    }

    // ✅ Customer ko WhatsApp
    const customerMsg = `Hello ${name}! 🚚

*SWIFTO Booking Confirmed!*

📋 Tracking ID: *${trackingId}*
📍 Pickup: ${pickup}
📦 Drop: ${drop}
🚛 Vehicle: ${vehicle}
📅 Date: ${date}

Hamari team 30 minute mein aapse contact karegi!

Track karein: http://localhost:3007/tracking
SWIFTO Logistics 🙏`;

    try {
      await sendWhatsApp(`whatsapp:+91${phone.replace(/\s/g, '')}`, customerMsg);
    } catch (waErr) {
      console.error('Customer WhatsApp error:', waErr.message);
    }

    // ✅ Admin ko WhatsApp Alert
    const adminMsg = `🔔 *NEW BOOKING ALERT!*

👤 Customer: ${name}
📞 Phone: ${phone}
📍 Pickup: ${pickup}
📦 Drop: ${drop}
🚛 Vehicle: ${vehicle}
📅 Date: ${date}
📋 Tracking: ${trackingId}
${goods ? `📝 Goods: ${goods}` : ''}
${weight ? `⚖️ Weight: ${weight}` : ''}

Jaldi contact karo! 🚀`;

    try {
      await sendWhatsApp(process.env.ADMIN_WHATSAPP, adminMsg);
    } catch (waErr) {
      console.error('Admin WhatsApp error:', waErr.message);
    }

    res.status(201).json({
      message:    'Booking confirmed! Our team will contact you within 30 minutes.',
      trackingId: trackingId,
      bookingId:  booking._id,
    });

  } catch (err) {
    console.error('Booking error:', err.message);
    res.status(500).json({ message: err.message || 'Booking failed. Please try again.' });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('trackingId name pickup drop vehicle date status createdAt');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings.' });
  }
};

exports.trackBooking = async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase().trim();

    let tracking = await Tracking.findOne({ trackingId })
      .populate('bookingId', 'pickup drop vehicle date name phone');

    if (!tracking) {
      const booking = await Booking.findOne({ trackingId });
      if (!booking)
        return res.status(404).json({ message: 'Tracking ID not found. Please check and try again.' });

      return res.json({
        tracking: {
          trackingId:        booking.trackingId,
          status:            booking.status,
          driverName:        booking.driverName || '',
          driverPhone:       booking.driverPhone || '',
          currentLocation:   null,
          estimatedDelivery: null,
          timeline:          booking.timeline || [],
          bookingId: {
            pickup:  booking.pickup,
            drop:    booking.drop,
            vehicle: booking.vehicle,
            date:    booking.date,
            name:    booking.name,
          },
        },
      });
    }

    const booking = tracking.bookingId;

    res.json({
      tracking: {
        trackingId:        tracking.trackingId,
        status:            tracking.status,
        driverName:        tracking.driverName || '',
        driverPhone:       tracking.driverPhone || '',
        currentLocation:   tracking.currentLocation || null,
        estimatedDelivery: tracking.estimatedDelivery || null,
        timeline:          tracking.timeline || [],
        bookingId: {
          pickup:  booking?.pickup,
          drop:    booking?.drop,
          vehicle: booking?.vehicle,
          date:    booking?.date,
          name:    booking?.name,
        },
      },
    });

  } catch (err) {
    console.error('Track error:', err.message);
    res.status(500).json({ message: 'Tracking failed. Please try again.' });
  }
};