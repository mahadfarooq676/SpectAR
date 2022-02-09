const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = require('config');
const Admin = require('../../models/model_admin'); 
const { check, validationResult } = require('express-validator');

router.get('/', auth, async (req, res) => {
    try{
        const admin = await Admin.findById(req.admin.id).select('-password');
        res.json(admin);
    }catch(err){
       console.log(err.message);
       res.status(500).send('Server error');
    }
});

router.post('/',[ 
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try{
        
    let admin = await Admin.findOne({ email });
   
    if(!admin){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if(admin.status != "Active"){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }else if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    
        const payload = {
            admin: {
                id:  admin.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        )
    
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
        
    
})

module.exports = router;