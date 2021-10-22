const express = require('express');
const router = express.Router();
const Product = require('../../models/model_product'); 
const multer = require('multer');

const datenow = Date.now();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./client/public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, datenow + '-' + file.originalname );
    }
});

const upload = multer({ storage: storage });


// @route POST api/product
// @desc Add Product 
// @access Public
// router.post('/', upload.single("productImage"), async (req,res) => {
router.post('/', upload.fields([{ name: 'productImage', maxCount: 1 },{ name: 'product3dFile', maxCount: 1 }]), async (req,res) => {
    // const url = req.protocol + '://' + req.get('host')

    // const { productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, 
    //     lensWidth, lensHeight, templeLength, bridgeWidth, status, addedBy, addedDate } = req.body;
    
    // const { productImage }= url + '/images/' + req.file.filename;
    const productImage = req.files.productImage[0];
    const product3dFile = req.files.product3dFile[0];

    try{

      const product = new Product({
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
            productImage: datenow + '-' + productImage.originalname,
            product3dFile: datenow + '-' + product3dFile.originalname,
            status: req.body.status,
            addedBy: req.body.addedBy, 
            addedDate: req.body.addedDate,
        });

        await product.save();
        return res.status(200).json([{ msg: 'Product added successfully' }] );
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;