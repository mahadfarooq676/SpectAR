const express = require('express');
const router = express.Router();
const config = require('config');
const Product = require('../../models/model_product'); 


router.get('/:id', async (req, res) => {
    try{

        const _id  = req.params.id;

        const product = await Product.findById(_id);
        res.json(product);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;