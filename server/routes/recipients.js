const express = require('express');

const router = express.Router();
const recipientController = require('../controllers/recipientController');

// Routes
router.get('/recipients', recipientController.view);
router.post('/recipient', recipientController.find);
router.get('/addrecipient', recipientController.form);
router.post('/addrecipient', recipientController.create);
router.get('/viewrecipient/:id', recipientController.viewall);

module.exports = router;
