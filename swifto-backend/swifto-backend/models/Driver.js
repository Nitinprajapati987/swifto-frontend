const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  phone:   { type: String, required: true, trim: true },
  city:    { type: String, required: true },
  vehicle: { type: String, required: true },
  source:  { type: String, default: '' },
  status:  { type: String, enum: ['pending', 'verified', 'active', 'inactive'], default: 'pending' },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Driver', DriverSchema);