const express = require('express');
const router = express.Router();
const config = require('config');
const Order = require('../../models/model_order'); 


router.get('/', async (req, res) => {
    try{
        const order = await Order.find();
        res.json(order);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;