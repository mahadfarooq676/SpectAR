let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

const DIR = 'client/public/banner/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// User model
let Banner = require('../../models/model_banner');

router.post('/', upload.single("bannerImage"), (req, res, next) => {
    const bannerImage = req.file.filename;
try{
    const banner = new Banner({
        bannerImage: bannerImage,
        bannerName: req.body.bannerName,
        bannerProduct: req.body.bannerProduct
    });

     banner.save();
        return res.status(200).json([{ msg: 'Banner added successfully' }]);
    
    }catch(err){
        console.log(err.message);
        return res.status(500).send('server error');
    }

});
module.exports = router;