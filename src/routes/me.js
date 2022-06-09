const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/me/checkout', meController.cart)
router.get('/', meController.show)


module.exports = router;