const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
// const bcrypt = require('bcrypt');

// Routes
router.get('/users', userController.view);
router.post('/users', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:id', userController.edit);
router.post('/edituser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id', userController.delete);

module.exports = router;
