const mongoose = require('mongoose');

async function generateTrackingId() {
  try {
    const count = await mongoose.model('Booking').countDocuments();
    return 'SWT' + String(count + 1).padStart(6, '0');
  } catch (e) {
    // Fallback — random ID
    return 'SWT' + Date.now().toString().slice(-6);
  }
}

const BookingSchema = new mongoose.Schema({
  trackingId: { type: String, unique: true },
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  name:       { type: String, required: true, trim: true },
  phone:      { type: String, required: true, trim: true },
  email:      { type: String, trim: true, default: '' },
  userType:   { type: String, enum: ['company', 'individual'], default: 'company' },
  pickup:     { type: String, required: true, trim: true },
  drop:       { type: String, required: true, trim: true },
  vehicle:    { type: String, required: true },
  date:       { type: String, required: true },
  goods:      { type: String, default: '' },
  weight:     { type: String, default: '' },
  status: {
    type: String,
    enum: ['confirmed', 'driver_assigned', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  driverName:  { type: String, default: '' },
  driverPhone: { type: String, default: '' },
  timeline: [{
    status:  { type: String },
    message: { type: String },
    time:    { type: Date, default: Date.now },
  }],
}, { timestamps: true });

BookingSchema.pre('save', async function (next) {
  if (!this.trackingId) {
    this.trackingId = await generateTrackingId();
    this.timeline.push({
      status:  'confirmed',
      message: 'Booking confirmed. Our team will contact you shortly.',
      time:    new Date(),
    });
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);