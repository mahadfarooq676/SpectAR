const express = require('express');
const router = express.Router();
const config = require('config');
const Banner = require('../../models/model_banner'); 


router.get('/', async (req, res) => {
    try{
        const banner = await Banner.find();
        return res.json([{ status:'200', description:'Success', Banners: banner }] );
    }catch(err){
       console.log(err.message);
       return res.json([{ status:'500', description:'Internal Server Error', "Banners": [
        {
            "_id": "",
            "bannerImage": "",
            "bannerName": "",
            "__v": 0
        }] }] );
    }
});


module.exports = router;

