const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcryptjs'); 
const Admin = require('../../models/model_admin'); 

// @route POST api/admin   
// @desc Add Admin 
// @access Public
router.put('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { adminId, name, email, password, role, addedBy, addedDate, status } = req.body;

    if(password.length < 40){
    const salt = await bcrypt.genSalt(10);
        hashedpassword = await bcrypt.hash(password, salt);
}else{
    hashedpassword = password;
}

    try{

        var updateAdmin = {
            name: name,
            email: email,
            password: hashedpassword,
            role: role,
            status: status,
            addedBy: addedBy,
            addedDate: addedDate
        }
        

        await Admin.findByIdAndUpdate( adminId, { $set: updateAdmin } );
        return res.status(200).json([{ msg: 'Admin Updated successfully' }] );
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;