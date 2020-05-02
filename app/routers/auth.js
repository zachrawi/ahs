const express = require('express');

const authController = require('../controllers/auth');
const jwtAuth = require('../middlewares/jwt-auth');

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', jwtAuth, authController.me);

module.exports = router;
