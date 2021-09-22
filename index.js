const express = require('express');
var cors  = require('cors');
const Admin = require('./models/model_admin');
const User = require('./models/model_user');
const path = require("path");
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');  
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json({ extended: false }));

// app.get('/', (res,req) => res.send('API RUNNING'));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/getAdminData', require('./routes/api/getAdminData'));
app.use('/api/getProductData', require('./routes/api/getProductData'));
app.use('/api/getProduct', require('./routes/api/getProductById'));
app.use('/api/getCategories', require('./routes/api/getCategories'));
app.use('/api/userSignup', require('./routes/api/userSignup'));
app.use('/api/userLogin', require('./routes/api/userLogin'));
app.use('/api/addProduct', require('./routes/api/addProduct'));
app.use('/api/updateProduct', require('./routes/api/updateProduct'));

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('App listening at http://localhost:'+port);
})