const express = require('express');
var cors  = require('cors');
const Admin = require('./models/model_admin');
const User = require('./models/model_user');
const path = require("path");
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
if(mongoose.connect("mongodb+srv://Mahad:a1b2c3d4e5@spectar.pkicm.mongodb.net/SpectAR?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true})){
    console.log('MongoDB Connected');
}

const app = express();

app.use(express.json({ extended: false }));

// app.get('/', (res,req) => res.send('API RUNNING'));

app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/getAdminData', require('./routes/api/getAdminData'));
app.use('/api/userSignup', require('./routes/api/userSignup'));
app.use('/api/userLogin', require('./routes/api/userLogin'));

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