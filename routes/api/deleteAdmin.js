const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const Admin = require('../../models/model_admin'); 

// @route POST api/admin
// @desc Add Admin 
// @access Public
router.put('/',async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { _id } = req.body;
    
    try{

        var deleteAdmin = {
            status: "Deleted"
        }
        

        await Admin.findByIdAndUpdate( _id, { $set: deleteAdmin } );
        return res.status(200).json([{ msg: 'Admin Deleted successfully' }] );
    
    }catch(err){
        console.log(err.message);
        return res.status(500).send('server error');
    }
        
    
});
module.exports = router;