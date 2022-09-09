const express = require('express');
const router = express.Router();

const ForgotPasswordController = require('../app/controllers/ForgotPasswordController.js');


router.get('/', ForgotPasswordController.show)
router.post('/', ForgotPasswordController.find)
router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;