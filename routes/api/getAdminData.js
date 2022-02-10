const express = require('express');
const router = express.Router();
const config = require('config');
const Admin = require('../../models/model_admin'); 

router.get('/', async (req, res) => {
    try{
        const admin = await Admin.find({status: "Active"});
        res.json(admin);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;