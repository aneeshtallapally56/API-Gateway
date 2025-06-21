const express = require('express');

const { InfoController } = require('../../controllers');
const UserRoutes = require('./user-routes');
const router = express.Router();

router.get('/info', InfoController.info);
router.use('/', UserRoutes);

module.exports = router;