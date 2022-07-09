const express = require('express');
const router = express.Router();

const LoginController = require('../app/controllers/LoginController.js');


router.get('/', LoginController.show)
router.post('/', LoginController.authenticate)
// router.get('/home', LoginController.checkAuth,LoginController.accepted)

router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;