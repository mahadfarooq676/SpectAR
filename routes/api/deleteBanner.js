const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Banner = require('../../models/model_banner'); 

// @route POST api/banner
// @desc Add Banner 
// @access Public
router.post('/',async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.body;
    
    try{

        var deleteBanner = {
            status: "Deleted"
        }
        

        await Banner.deleteOne({ _id: _id });
        return res.status(200).json([{ msg: 'Banner Deleted successfully' }] );
    
    }catch(err){
        console.log(err.message);
        return res.status(500).send('server error');
    }
        
    
});
module.exports = router;