const express = require('express');
const router = express.Router();

const LoginController = require('../app/controllers/LoginController.js');
const siteController = require('../app/controllers/SiteController');

router.get('/', LoginController.checkAuth,siteController.index);

module.exports = router;