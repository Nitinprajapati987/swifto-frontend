const express = require('express');
const router  = express.Router();
const { createBooking, getMyBookings, trackBooking } = require('../controllers/bookingController');
const protect = require('../middleware/auth');

router.post('/',                     createBooking);
router.get('/my',        protect,    getMyBookings);
router.get('/track/:trackingId',     trackBooking);

module.exports = router;