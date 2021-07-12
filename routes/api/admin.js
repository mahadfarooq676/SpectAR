const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../../models/model_admin'); 

// @route POST api/admin
// @desc Register Admin 
// @access Public
router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password should be6 or more characters').isLength({ min:6 })
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, addedBy, addedDate, deleteStatus } = req.body;

    try{
        
    let admin = await Admin.findOne({ email });

    if(admin){
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }else{

       admin = new Admin({
            name,
            email,
            password,
            addedBy,
            addedDate,
            deleteStatus
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    }
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
});
module.exports = router;