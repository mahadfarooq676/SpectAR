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

app.use('/public', express.static('client/public'));

app.use('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next(); 
  });
  
  //enable pre-flight
  app.options('*', cors());

// app.get('/', (res,req) => res.send('API RUNNING'));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/getAdmin', require('./routes/api/getAdminById'));
app.use('/api/updateAdmin', require('./routes/api/updateAdmin'));
app.use('/api/deleteAdmin', require('./routes/api/deleteAdmin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/getAdminData', require('./routes/api/getAdminData'));
app.use('/api/getProductData', require('./routes/api/getProductData'));
app.use('/api/getProduct', require('./routes/api/getProductById'));
app.use('/api/getCategories', require('./routes/api/getCategories'));
app.use('/api/getBanners', require('./routes/api/getBanners'));
app.use('/api/userSignup', require('./routes/AppApi/userSignup'));
app.use('/api/userLogin', require('./routes/AppApi/userLogin'));
app.use('/api/getProducts', require('./routes/AppApi/getProducts'));
app.use('/api/addProduct', require('./routes/api/addProduct'));
app.use('/api/updateProduct', require('./routes/api/updateProduct'));
app.use('/api/deleteProduct', require('./routes/api/deleteProduct'));
app.use('/api/addBanner', require('./routes/api/addBanner'));
app.use('/api/getBanner', require('./routes/AppApi/getBanners'));
app.use('/api/deleteBanner', require('./routes/api/deleteBanner'));
app.use('/api/addOrder', require('./routes/api/addOrder'));
app.use('/api/getOrders', require('./routes/api/getOrders'));
app.use('/api/getOrder', require('./routes/api/getOrderById'));
app.use('/api/getReport', require('./routes/api/getReports'));


app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('App listening at '+port);
})