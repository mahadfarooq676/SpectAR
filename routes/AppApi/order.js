const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/model_user'); 

// @route POST api/user
// @desc Register User 
// @access Public
router.post('/',async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({ errors: errors.array() })
    }

    const {  } = req.body;

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
        phone
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