const express = require('express');
const router = express.Router();
const config = require('config');
const Order = require('../../models/model_order');
const Product = require('../../models/model_product');
const User = require('../../models/model_user'); 


router.get('/:id', async (req, res) => {
    try{

        const _id  = req.params.id;
        

        const order = await Order.findById(_id);

        const userDetails = await User.findById(order.userId, 'firstName lastName email phone address city postalCode');
        // userDetails = JSON.parse(userDetails);

        const iid = order.productList.map((o) => o[0].productId);

        var productDetails = [];

        for (let i = 0; i < iid.length; i++) {
        productDetails[i] = await Product.findById(iid[i]);
        }

        var orderDetails = [];
        orderDetails[0] = userDetails;
        orderDetails[1] = order._id;
        orderDetails[2] = productDetails;

        res.status(200).send(orderDetails);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;