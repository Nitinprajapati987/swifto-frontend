const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const signToken  = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const formatUser = (user) => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role });

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password)
      return res.status(400).json({ message: 'Please fill all required fields.' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing)
      return res.status(409).json({ message: 'Email already registered. Please login.' });

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: role === 'driver' ? 'driver' : 'user',
    });

    res.status(201).json({
      message: 'Registration successful!',
      token:   signToken(user._id),
      user:    formatUser(user),
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid email or password.' });

    if (!user.isActive)
      return res.status(403).json({ message: 'Account deactivated. Contact support.' });

    res.json({
      message: 'Login successful!',
      token:   signToken(user._id),
      user:    formatUser(user),
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

exports.getMe = async (req, res) => {
  res.json({ user: formatUser(req.user) });
};