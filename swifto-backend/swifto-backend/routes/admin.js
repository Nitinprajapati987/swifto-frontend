const express = require('express');
const router  = express.Router();
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const {
  getAllBookings, updateBookingStatus,
  assignDriver, getAllUsers, getDashboardStats
} = require('../controllers/adminController');

router.use(protect, adminOnly);

router.get('/stats',              getDashboardStats);
router.get('/bookings',           getAllBookings);
router.patch('/bookings/:id',     updateBookingStatus);
router.patch('/bookings/:id/driver', assignDriver);
router.get('/users',              getAllUsers);

module.exports = router;