const express = require('express');
const router = express.Router();
const config = require('config');
const Order = require('../../models/model_order'); 


router.get('/:id', async (req, res) => {
    try{

        const _id  = req.params.id;

        const order = await Order.findById(_id);
        res.json(order);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;