const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../../models/model_user'); 
const { check, validationResult } = require('express-validator');
const Category = require('../../models/model_category'); 

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
        return res.status(400).json([{ status:'400', description:'Invalid Credentials', User: {
            "_id": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "gender": "",
            "address": "",
            "city": "",
            "country": "",
            "postalCode": "",
            "phone": "",
            "__v": 0
        }, Category: [{
            "_id": "",
                "name": ""
        }] }] );
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json([{ status:'400', description:'Invalid Credentials', User: {
            "_id": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "gender": "",
            "address": "",
            "city": "",
            "country": "",
            "postalCode": "",
            "phone": "",
            "__v": 0
        }, Category: [{
            "_id": "",
                "name": ""
        }] }] );
    }
    const category = await Category.find();
    const loggedInUser = await User.findOne({email})
    
    return res.status(200).json([{ status:'200', description:'Success', User: loggedInUser, Category: category }] );
    
    }catch(err){
        return res.status(500).json([{ status:'500', description:'Internal Server Error', User: {
            "_id": "",
            "firstName": "",
            "lastName": "",
            "email": "",
            "password": "",
            "gender": "",
            "address": "",
            "city": "",
            "country": "",
            "postalCode": "",
            "phone": "",
            "__v": 0
        }, Category: [{
            "_id": "",
                "name": ""
        }] }] );
    }
        
    
})

module.exports = router;