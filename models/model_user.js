const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    postalCode: {
        type: String
    },
    phone: {
        type: String,
        required: true
    }
    
})
const User = mongoose.model('User',user);
module.exports = User;