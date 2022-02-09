const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Product = require('../../models/model_product'); 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/public/uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage
});

// @route POST api/product
// @desc Add Product 
// @access Public
router.put('/',upload.fields([{ name: 'productImage', maxCount: 1 }, { name: 'product3dFile', maxCount: 1 }, { name: 'productGallery', maxCount: 10 }, { name: 'productMTLFile', maxCount: 1 }]),async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const productImage = req.files.productImage[0].filename;
    const product3dFile = req.files.product3dFile[0].filename;
    const productMTLFile = req.files.productMTLFile[0].filename;
    const reqFiles = [];
    for (var i = 0; i < req.files.productGallery.length; i++) {
        reqFiles.push(req.files.productGallery[i].filename)
    }
    const {productId} = req.body;
    
    try{

        var updateProduct = new Product({
            productName: req.body.productName,
            brandName: req.body.brandName,
            productPrice: req.body.productPrice,
            salesPrice: req.body.salesPrice,
            sku: req.body.sku,
            productCategory: req.body.productCategory,
            productQuantity: req.body.productQuantity,
            shortDescription: req.body.shortDescription,
            highlights: req.body.highlights,
            detailedDescription: req.body.detailedDescription,
            materialType: req.body.materialType,
            frameLength: req.body.frameLength,
            frameWeight: req.body.frameWeight,
            lensWidth: req.body.lensWidth,
            lensHeight: req.body.lensHeight,
            templeLength: req.body.templeLength,
            bridgeWidth: req.body.bridgeWidth,
            productImage: productImage,
            productGallery: reqFiles,
            product3dFile: product3dFile,
            productMTLFile: productMTLFile,
            status: req.body.status,
            addedBy: req.body.addedBy, 
            addedDate: req.body.addedDate,
        });
        

        await Product.findByIdAndUpdate( productId, { $set: updateProductzz } );
        return res.status(200).json([{ msg: 'Product Updated successfully' }] );
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;