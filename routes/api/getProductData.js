const express = require('express');
const router = express.Router();
const config = require('config');
const Product = require('../../models/model_product'); 


router.get('/', async (req, res) => {
    try{
        const product = await Product.find();
        res.json(product);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;