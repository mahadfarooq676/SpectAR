const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/model_user'); 
const { check, validationResult } = require('express-validator');

router.post('/',[ 
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try{
        
    let user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    res.status(200).send('User Logged In');
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
})

module.exports = router;