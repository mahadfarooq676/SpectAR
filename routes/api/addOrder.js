const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const Order = require('../../models/model_order');
const User = require('../../models/model_user');

// @route POST api/admin
// @desc Register Admin 
// @access Public
router.post('/',[
    check('userId', 'User Id is required').not().isEmpty()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { userId, productList, totalPrice, address, city, postalCode } = req.body;

    var status = "Active";


    var addedDate = new Date();
    var dd = String(addedDate.getDate()).padStart(2, '0');
    var mm = String(addedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = addedDate.getFullYear();

    var createdTimestamp = mm + '/' + dd + '/' + yyyy;

    // const iid = productList.map((o) => o[0][0].productId);
    // console.log("iid = "+iid)

    // for (let i = 0; i < iid.length; i++) {
    //     productDetails[i] = await Product.findById(iid[i]);
    // }
    
    try{
        
       order = new Order({
            userId,
            productList,
            totalPrice,
            status,
            createdTimestamp
        });

        var updateUser = {
            address: address,
            city: city,
            postalCode: postalCode
        }

        
        await User.findByIdAndUpdate( userId, { $set: updateUser } );
        await order.save();
        return res.status(200).json([{ msg: 'Order added successfully' }] );
        
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;