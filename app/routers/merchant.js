const express = require('express');

const {jwtAuth} = require('../middlewares/jwt-auth');
const {canAccess} = require('../permissions/merchant');
const merchantController = require('../controllers/merchant');

const router = express.Router();

router.use(jwtAuth);

// make sure user can access
router.use((req, res, next) => {
    if (!canAccess(req.authUser)) {
        res.status(403);
        return res.send('Forbidden');
    }

    next();
});

router.get('/', merchantController.fetch);
router.post('/', merchantController.add);

module.exports = router