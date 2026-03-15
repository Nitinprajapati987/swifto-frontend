const Tracking = require('../models/Tracking');
const Booking  = require('../models/Booking');

exports.getTracking = async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase().trim();

    const tracking = await Tracking.findOne({ trackingId })
      .populate('bookingId', 'pickup drop vehicle date name phone');

    if (!tracking)
      return res.status(404).json({ message: 'Tracking ID not found.' });

    const booking = tracking.bookingId;

    res.json({
      tracking: {
        trackingId:        tracking.trackingId,
        status:            tracking.status,
        driverName:        tracking.driverName,
        driverPhone:       tracking.driverPhone,
        currentLocation:   tracking.currentLocation,
        estimatedDelivery: tracking.estimatedDelivery,
        timeline:          tracking.timeline,
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
    res.status(500).json({ message: 'Tracking failed.' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, message, driverName, driverPhone, location } = req.body;
    const trackingId = req.params.trackingId.toUpperCase().trim();

    const validStatuses = ['confirmed','driver_assigned','picked_up','in_transit','out_for_delivery','delivered','cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: 'Invalid status.' });

    const tracking = await Tracking.findOne({ trackingId });
    if (!tracking)
      return res.status(404).json({ message: 'Tracking not found.' });

    tracking.status = status;
    if (driverName)  tracking.driverName  = driverName;
    if (driverPhone) tracking.driverPhone = driverPhone;

    tracking.timeline.push({
      status,
      message: message || getDefaultMessage(status),
      location: location || '',
      time: new Date(),
    });

    await tracking.save();

    await Booking.findOneAndUpdate(
      { trackingId },
      { status, driverName: driverName || '', driverPhone: driverPhone || '' }
    );

    res.json({ message: 'Status updated successfully.', tracking });
  } catch (err) {
    res.status(500).json({ message: 'Update failed.' });
  }
};

function getDefaultMessage(status) {
  const map = {
    confirmed:        'Booking confirmed.',
    driver_assigned:  'Driver has been assigned.',
    picked_up:        'Goods picked up from pickup location.',
    in_transit:       'Your shipment is on the way.',
    out_for_delivery: 'Driver is out for delivery.',
    delivered:        'Delivered successfully. Thank you for choosing SWIFTO!',
    cancelled:        'Booking has been cancelled.',
  };
  return map[status] || '';
}