const Driver = require('../models/Driver');

exports.registerDriver = async (req, res) => {
  try {
    const { name, phone, city, vehicle, source } = req.body;

    if (!name || !phone || !city || !vehicle)
      return res.status(400).json({ message: 'Name, phone, city and vehicle are required.' });

    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, '')))
      return res.status(400).json({ message: 'Enter a valid 10-digit Indian phone number.' });

    const existing = await Driver.findOne({ phone: phone.trim() });
    if (existing)
      return res.status(409).json({ message: 'This phone number is already registered with us.' });

    const driver = await Driver.create({
      name: name.trim(), phone: phone.trim(),
      city, vehicle, source: source || '',
    });

    res.status(201).json({
      message:  'Registration successful! Our team will contact you within 24 hours.',
      driverId: driver._id,
    });
  } catch (err) {
    console.error('Driver register error:', err.message);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};