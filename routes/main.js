const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const mainController = require('../controllers/main');

router.get('/add', mainController.addQ);
router.get('/arena/:questionLevel', isAuthenticated, mainController.getLevel);
// router.get('/levels', isAuthenticated, mainController.getLevels);
router.post('/arena', isAuthenticated, mainController.postLevel);
router.get('/users', isAuthenticated, mainController.getUsers);

module.exports = router;