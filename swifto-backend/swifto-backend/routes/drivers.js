const express = require('express');
const router  = express.Router();
const { registerDriver } = require('../controllers/driverController');

router.post('/register', registerDriver);

module.exports = router;