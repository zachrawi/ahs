const express = require('express');

const {jwtAuth} = require('../middlewares/jwt-auth');
const {canAdd, canView} = require('../permissions/product');
const productController = require('../controllers/product');

const router = express.Router();

router.use(jwtAuth);

// make sure user can access
const middlewareCanAdd = (req, res, next) => {
    if (!canAdd(req.authUser)) {
        res.status(403);
        return res.send('Forbidden');
    }

    next();
};

const middlewareCanView = (req, res, next) => {
    if (!canView(req.authUser)) {
        res.status(403);
        return res.send('Forbidden');
    }

    next();
};

router.get('/', middlewareCanView, productController.fetch);
router.post('/', middlewareCanAdd, productController.add);

module.exports = router