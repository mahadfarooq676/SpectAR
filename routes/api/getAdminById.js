const express = require('express');
const router = express.Router();
const config = require('config');
const Admin = require('../../models/model_admin'); 


router.get('/:id', async (req, res) => {
    try{

        const _id  = req.params.id;

        const admin = await Admin.findById(_id);
        res.json(admin);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});


module.exports = router;