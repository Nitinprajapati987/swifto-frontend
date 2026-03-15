const mongoose = require('mongoose');

const TrackingSchema = new mongoose.Schema({
  bookingId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  trackingId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['confirmed', 'driver_assigned', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  driverName:  { type: String, default: '' },
  driverPhone: { type: String, default: '' },
  driverId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  currentLocation: {
    lat:     { type: Number, default: null },
    lng:     { type: Number, default: null },
    address: { type: String, default: '' },
  },
  timeline: [{
    status:   { type: String, required: true },
    message:  { type: String, default: '' },
    location: { type: String, default: '' },
    time:     { type: Date, default: Date.now },
  }],
  estimatedDelivery: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Tracking', TrackingSchema);