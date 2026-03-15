const express = require('express');
const router  = express.Router();
const { getTracking, updateStatus } = require('../controllers/trackingController');
const protect = require('../middleware/auth');

router.get('/:trackingId',           getTracking);
router.patch('/:trackingId/status',  protect, updateStatus);

module.exports = router;