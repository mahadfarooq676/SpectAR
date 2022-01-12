const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/model_user'); 

// @route POST api/user
// @desc Register User 
// @access Public
router.post('/',[
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter atleast 6 characters password').isLength({ min:6 }),
    check('gender', 'Gender is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password, gender, phone } = req.body;
    const address = "";
    const city = "";
    const postalCode = "";

    try{
        
    let user = await User.findOne({ email });

    if(user){
        return res.json([{ status:'400', description:'User already exists' }] );
    }else{

       user = new User({
        firstName,
        lastName,
        email,
        password,
        gender,
        phone,
        address,
        city,
        postalCode
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        return res.json([{ status:'200', description:'Signup Successfully' }] );
    }
    }catch(err){
        return res.json([{ status:'500', description:'Internal Server Error' }] );
    }
        
    
});
module.exports = router;