const express = require('express');

const authController = require('../controllers/auth');
const {jwtAuth, jwtRefreshAuth} = require('../middlewares/jwt-auth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/refresh-token', jwtRefreshAuth, authController.refreshToken);

router.get('/me', jwtAuth, authController.me);

module.exports = router;
