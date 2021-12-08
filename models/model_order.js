const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const order = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productList: [{
        type: Array,
        required: true
    }],
    totalPrice: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdTimestamp: {
        type: String ,
        required: true,
    }
    
})

const Order = mongoose.model('Order',order);
module.exports = Order;

// userid, product IDs, product_descs, status, count, 