const express = require('express');
const router = express.Router();
const config = require('config');
const Banner = require('../../models/model_banner'); 
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try{
        const banner = await Banner.find();
        res.json(banner);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;