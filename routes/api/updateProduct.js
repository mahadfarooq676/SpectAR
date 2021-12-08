const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Product = require('../../models/model_product'); 

// @route POST api/product
// @desc Add Product 
// @access Public
router.put('/',[
    check('productId', 'Product Id is required').not().isEmpty(),
    check('productName', 'Product Name is required').not().isEmpty(),
    check('productPrice', 'Product Price is required').not().isEmpty(),
    check('productCategory', 'Product Category is required').not().isEmpty(),
    check('productQuantity', 'Product Quantity is required').not().isEmpty(),
    check('frameLength', 'Frame Length is required').not().isEmpty(),
    check('frameWeight', 'Frame Weight is required').not().isEmpty(),
    check('lensWidth', 'Lens Width is required').not().isEmpty(),
    check('lensHeight', 'Lens Height Code is required').not().isEmpty(),
    check('templeLength', 'Temple Length is required').not().isEmpty(),
    check('bridgeWidth', 'Bridge Width is required').not().isEmpty(),
    check('productImage', 'Product Image is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { productId, productName, brandName, productPrice, salesPrice, sku, productCategory, productQuantity,
         shortDescription, highlights, detailedDescription, materialType, frameLength, frameWeight, lensWidth,
          lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate } = req.body;
    
    try{

        var updateProduct = {
            productName: productName,
            brandName: brandName,
            productPrice: productPrice,
            salesPrice: salesPrice,
            sku: sku,
            productCategory: productCategory,
            productQuantity: productQuantity,
            shortDescription: shortDescription,
            detailedDescription: detailedDescription,
            materialType: materialType,
            highlights: highlights,
            frameLength: frameLength,
            frameWeight: frameWeight,
            lensWidth: lensWidth,
            lensHeight: lensHeight,
            templeLength: templeLength,
            bridgeWidth: bridgeWidth,
            productImage: productImage,
            status: status,
            addedBy: addedBy,
            addedDate: addedDate
        }
        

        await Product.findByIdAndUpdate( productId, { $set: updateProduct } );
        return res.status(200).json([{ msg: 'Product Updated successfully' }] );
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;