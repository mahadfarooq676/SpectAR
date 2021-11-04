const express = require('express');
const router = express.Router();
const config = require('config');
const Product = require('../../models/model_product'); 


router.get('/', async (req, res) => {
    try{
        const product = await Product.find();
        return res.json([{ status:'200', description:'Success', Products: product }] );
    }catch(err){
       console.log(err.message);
       return res.json([{ status:'500', description:'Internal Server Error', "Products": [
        {
            "productGallery": [
                ""
            ],
            "_id": "",
            "productName": "",
            "brandName": "",
            "productPrice": "",
            "salesPrice": "",
            "sku": "",
            "productCategory": "",
            "productQuantity": "",
            "shortDescription": "",
            "highlights": "",
            "detailedDescription": "",
            "materialType": "",
            "frameLength": "",
            "frameWeight": "",
            "lensWidth": "",
            "lensHeight": "",
            "templeLength": "",
            "bridgeWidth": "",
            "productImage": "",
            "product3dFile": "",
            "status": "",
            "addedBy": "",
            "addedDate": "",
            "__v": 0
        }] }] );
    }
});


module.exports = router;

