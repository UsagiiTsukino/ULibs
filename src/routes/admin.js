const express = require('express');
const AdminController = require('../app/controllers/AdminController');
const BookController = require('../app/controllers/BookController');
const router = express.Router();


router.get('/', AdminController.show);

router.get('/products', AdminController.showProductListView);
router.post('/products', BookController.showAll);

router.get('/users', AdminController.showUserListView);
router.post('/users', AdminController.showAllUser);

router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;