const express = require('express');
const router = express.Router();

const RegisterController = require('../app/controllers/RegisterController.js');


router.get('/', RegisterController.show)
router.post('/', RegisterController.register)
// router.get('/home', LoginController.checkAuth,LoginController.accepted)

router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;