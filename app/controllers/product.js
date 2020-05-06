const Joi = require('@hapi/joi');

const {Product, Op} = require('../models');

exports.fetch = async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let dbWhere = {
        name: {
            [Op.iLike]: `%${search}%`,
        },
    };

    if (req.authUser.merchant_id) {
        dbWhere.merchant_id = req.authUser.merchant_id;
    }

    const count = await Product.count({
        where: dbWhere,
    });
    const products = await Product.findAll({
        where: dbWhere,
        limit: limit,
        offset: offset,
    });

    res.send({
        status: 'success',
        totalData: count,
        totalPage: Math.ceil(count / limit),
        page: page,
        data: products
    });
}

exports.add = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required()
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
    const price = req.body.price;

    const product = await Product.create({
        name: name,
        price: price,
        merchant_id: req.authUser.merchant_id
    });

    res.send({
        status: 'success',
        data: product
    });
}