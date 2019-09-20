const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);
router.get('/getUser', isAuthenticated, authController.getUser);

module.exports = router;