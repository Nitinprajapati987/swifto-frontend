const Booking  = require('../models/Booking');
const Tracking = require('../models/Tracking');
const User     = require('../models/User');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalBookings, totalUsers, activeBookings, deliveredBookings] = await Promise.all([
      Booking.countDocuments(),
      User.countDocuments(),
      Booking.countDocuments({ status: { $in: ['confirmed','driver_assigned','picked_up','in_transit','out_for_delivery'] } }),
      Booking.countDocuments({ status: 'delivered' }),
    ]);
    res.json({ totalBookings, totalUsers, activeBookings, deliveredBookings });
  } catch (err) {
    res.status(500).json({ message: 'Stats fetch failed.' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Bookings fetch failed.' });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status, message } = req.body;
    const validStatuses = ['confirmed','driver_assigned','picked_up','in_transit','out_for_delivery','delivered','cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: 'Invalid status.' });

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    await Tracking.findOneAndUpdate(
      { trackingId: booking.trackingId },
      {
        status,
        $push: { timeline: {
          status,
          message: message || getDefaultMessage(status),
          time: new Date(),
        }},
      }
    );

    res.json({ message: 'Status updated!', booking });
  } catch (err) {
    res.status(500).json({ message: 'Update failed.' });
  }
};

exports.assignDriver = async (req, res) => {
  try {
    const { driverName, driverPhone } = req.body;
    if (!driverName || !driverPhone)
      return res.status(400).json({ message: 'Driver name and phone required.' });

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { driverName, driverPhone, status: 'driver_assigned' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    await Tracking.findOneAndUpdate(
      { trackingId: booking.trackingId },
      {
        status: 'driver_assigned',
        driverName, driverPhone,
        $push: { timeline: {
          status:  'driver_assigned',
          message: `Driver ${driverName} assigned. Contact: ${driverPhone}`,
          time: new Date(),
        }},
      }
    );

    res.json({ message: 'Driver assigned!', booking });
  } catch (err) {
    res.status(500).json({ message: 'Assign failed.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Users fetch failed.' });
  }
};

function getDefaultMessage(status) {
  const map = {
    confirmed:        'Booking confirmed.',
    driver_assigned:  'Driver assigned.',
    picked_up:        'Goods picked up.',
    in_transit:       'Shipment in transit.',
    out_for_delivery: 'Out for delivery.',
    delivered:        'Delivered successfully!',
    cancelled:        'Booking cancelled.',
  };
  return map[status] || '';
}