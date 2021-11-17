const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Product = require('../../models/model_product'); 

// @route POST api/product
// @desc Add Product 
// @access Public
router.put('/',async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.body;
    
    try{

        var deleteProduct = {
            status: "Deleted"
        }
        

        await Product.findByIdAndUpdate( _id, { $set: deleteProduct } );
        return res.status(200).json([{ msg: 'Product Deleted successfully' }] );
    
    }catch(err){
        console.log(err.message);
        return res.status(500).send('server error');
    }
        
    
});
module.exports = router;