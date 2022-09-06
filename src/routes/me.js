const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/checkout', meController.cart)
router.get('/checkout/payment', meController.payment)
router.get('/', meController.show)
router.post('/', meController.update)
router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;