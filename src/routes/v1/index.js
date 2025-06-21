const express = require('express');

const { InfoController } = require('../../controllers');
const UserRoutes = require('./user-routes');
const{ AuthMiddleware } = require('../../middlewares');
const router = express.Router();

router.get('/info',AuthMiddleware.checkAuth, InfoController.info);
router.use('/', UserRoutes);

module.exports = router;