const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const banner = new mongoose.Schema({
    bannerName: {
        type: String,
        required: true
    },
    productGallery: {
        type: Array
    }
})
const Banner = mongoose.model('Banner',banner);
module.exports = Banner;