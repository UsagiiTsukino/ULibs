const express = require('express');
const router = express.Router();

const UserController = require('../app/controllers/UserController.js');

router.get('/user/register', UserController.register);

router.put('/:username/changePassword', UserController.changePassword)
// router.delete('/:id', UserController.delete)
router.get('/:username', UserController.show);


module.exports = router;
