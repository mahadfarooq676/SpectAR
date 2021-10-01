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
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password, gender, phone } = req.body;

    try{
        
    let user = await User.findOne({ email });

    if(user){
        return res.status(400).json([{ status:'400', description:'User already exists', msg: 'User already exists' }] );
    }else{

       user = new User({
        firstName,
        lastName,
        email,
        password,
        gender,
        phone
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        return res.status(200).json([{ status:'200', description:'Success', msg: 'Sign Up successfully' }] );
    }
    }catch(err){
        return res.status(500).json([{ status:'500', description:'Internal Server Error', msg:'Internal Server Error' }] );
    }
        
    
});
module.exports = router;