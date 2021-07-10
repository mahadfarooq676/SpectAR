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
    check('address', 'Address is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty(),
    check('postalCode', 'Postal Code is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { firstName, lastName, email, password, gender, address, city, country, postalCode, phone } = req.body;

    try{
        
    let user = await User.findOne({ email });

    if(user){
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }else{

       user = new User({
        firstName,
        lastName,
        email,
        password,
        gender,
        address,
        city,
        country,
        postalCode,
        phone
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(200).send('User created successfully');
    }
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;