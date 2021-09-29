const express = require('express');
const router = express.Router();
const Product = require('../../models/model_product'); 
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });

const upload = multer({ storage: storage })


// @route POST api/product
// @desc Add Product 
// @access Public
router.post('/', upload.single('productImage'), async (req,res) => {
    const url = req.protocol + '://' + req.get('host')

    // const { productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, 
    //     lensWidth, lensHeight, templeLength, bridgeWidth, status, addedBy, addedDate } = req.body;
    
    // const { productImage }= url + '/images/' + req.file.filename;

    try{

      const product = new Product({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            productQuantity: req.body.productQuantity,
            frameLength: req.body.frameLength,
            frameWeight: req.body.frameWeight,
            lensWidth: req.body.lensWidth,
            lensHeight: req.body.lensHeight,
            templeLength: req.body.templeLength,
            bridgeWidth: req.body.bridgeWidth,
            productImage: req.file.originalname, 
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