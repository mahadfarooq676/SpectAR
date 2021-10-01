const express = require('express');
const router = express.Router();
const config = require('config');
const Category = require('../../models/model_category'); 
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try{
        const category = await Category.find();
        res.json(category);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;