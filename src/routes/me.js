const express = require('express');
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const meController = require('../app/controllers/MeController');
const User = require('../app/models/User');


router.get('/checkout', meController.cart)
router.get('/checkout/payment', meController.payment)
router.get('/checkout/success', meController.payment_success)
router.get('/', meController.show)
router.post('/',fileUploader.single('avatar_img'),(req, res, next) =>{

        var displayName = req.body.displayName;
        var dob = req.body.dob;
        var gender = req.body.gender;
        var id = req.body.id;
        var address = req.body.address;
        var avatar_img = req?.file?.path;

        var dataUpdate = {
            displayName,
            dob,
            gender,
            id,
            address,
        }

        if (avatar_img){
            dataUpdate = {
                ...dataUpdate,
                avatar_img,
            }
        }
        User.updateOne(
            {
                _id : id
            },
            {
                ...dataUpdate
            })
            .then(() => {
                res.json({
                    success : true,
            })})
            .catch(err => {
                console.log(err);
            });
})
router.get('*', function(req, res){
    res.status(404).render('404');
  });

module.exports = router;