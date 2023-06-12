const path = require('path');
const { mongooseToObject } = require('../../util/mongoose');
const users = require('../models/User');

class AdminController {
  show(req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/index.html'));
  }
  showProductListView (req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/product-manager.html'));
  }
  showUserListView (req, res, next) {
    res.sendFile(path.join(__dirname, '../../views/admin/user-manager.html'));
  }
  showAllUser (req, res, next) {
    users.find().sort([['createdAt', 'descending']])
          .then(function (users) {
            return res.json({
              success : true,
              users
            });
          })
          .catch(function (err) {
            console.log(err);
          })
  }
}
   
module.exports = new AdminController();