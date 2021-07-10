const express = require('express');
const router = express.Router();
const config = require('config');
const Admin = require('../../models/model_admin'); 
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try{
        const admin = await Admin.find(req.admin);
        res.json(admin);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;