const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const banner = new mongoose.Schema({
    bannerName: {
        type: String,
        required: true
    },
    bannerProduct: {
        type: String,
        required: true
    },
    bannerImage: {
        type: String,
        required: true
    }
})
const Banner = mongoose.model('Banner',banner);
module.exports = Banner;