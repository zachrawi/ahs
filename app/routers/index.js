const express = require('express');

const masterRouter = require('./master');
const authRouter = require('./auth');
const merchantRouter = require('./merchant');
const userRouter = require('./user');
const productRouter = require('./product');

const router = express.Router();

router.use('/api/v1/master', masterRouter);
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/merchants', merchantRouter);
router.use('/api/v1/users', userRouter);
router.use('/api/v1/products', productRouter);

module.exports = router;