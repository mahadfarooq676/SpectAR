const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const Order = require('../../models/model_order'); 

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

    const { userId, productList, totalPrice } = req.body;

    var status = "Pending";


    var addedDate = new Date();
    var dd = String(addedDate.getDate()).padStart(2, '0');
    var mm = String(addedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = addedDate.getFullYear();
    let hours = addedDate.getHours();
    let minutes = addedDate.getMinutes();
    let seconds = addedDate.getSeconds();

    var createdTimestamp = mm + '/' + dd + '/' + yyyy + ' - ' + hours + ':' + minutes + ':' + seconds;



    
    try{
        
       order = new Order({
            userId,
            productList,
            totalPrice,
            status,
            createdTimestamp
        });

        

        await order.save();
        return res.status(200).json([{ msg: 'Order added successfully' }] );
        
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;