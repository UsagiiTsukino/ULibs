const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/checkout', meController.cart)
router.get('/', meController.show)
router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;