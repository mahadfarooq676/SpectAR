const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const product = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productQuantity: {
        type: String,
        required: true
    },
    frameLength: {
        type: String,
        required: true
    },
    frameWeight: {
        type: String,
        required: true
    },
    lensWidth: {
        type: String,
        required: true
    },
    lensHeight: {
        type: String,
        required: true
    },
    templeLength: {
        type: String,
        required: true
    },
    bridgeWidth: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        required: true
    },
    addedDate: {
        type: String,
        required: true
    }
    
    
})
const Product = mongoose.model('Product',product);
module.exports = Product;