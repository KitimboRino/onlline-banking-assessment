const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes
router.get('/addrecipient', userController.form);
router.post('/addrecipient', userController.create);

module.exports = router;