const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const { User, Group, Merchant } = require('../models');

exports.login = async (req, res) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    if ( user ) {
        if (bcrypt.compareSync(password, user.password)) {
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                group_id: user.group_id,
                merchant_id: user.merchant_id,
                created_at: user.created_at,
                updated_at: user.updated_at
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_LIFE_TIME * 1
            });
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '7d'
            });
            res.send({
                status: 'success',
                token: token,
                refreshToken: refreshToken
            });
        } else {
            res.status(400).send({
                status: 'error',
                message: 'Password incorrect'
            });
        }
    } else {
        res.status(400).send({
            status: 'error',
            message: 'Email not found'
        });
    }
};

exports.refreshToken = async (req, res) => {
    const payload = req.authUser;
    delete payload.exp;
    delete payload.iat;
    console.log(process.env.TOKEN_LIFE_TIME);
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_LIFE_TIME * 1
    });

    res.send({
        status: 'success',
        token: token
    });
};

exports.me = (req, res) => {
    res.send({
        status: 'success',
        data: req.authUser
    });
};

exports.register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        group_id: Joi.number().required(),
        merchant_id: Joi.number().required()
    });

    const {error} = schema.validate(req.body);

    if (error) {
        return res.status(400)
            .send({
                status: 'error',
                message: error.message
            });
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const group_id = req.body.group_id;
    const merchant_id = req.body.merchant_id;

    // check if email exists
    const countEmail = await User.count({
        where: {
            email
        }
    });

    if (countEmail > 0) {
        return res.status(400)
            .send({
                status: 'error',
                message: 'Email is used'
            });
    }

    // check group id
    const group = await Group.findByPk(group_id);

    if (!group) {
        return res.status(400)
            .send({
                status: 'error',
                message: 'Invalid group id'
            });
    }

    // check merchant id
    const merchant = await Merchant.findByPk(merchant_id);

    if (!merchant) {
        return res.status(400)
            .send({
                status: 'error',
                message: 'Invalid merchant id'
            });
    }

    const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 8),
        group_id,
        merchant_id
    });

    res.send({
        status: 'success',
        data: {
            name: user.name,
            email: user.email,
            group_id: user.group_id,
            merchant_id: user.merchant_id,
        },
    });
}