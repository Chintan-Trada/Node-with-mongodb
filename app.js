var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var http = require('http');

const config= require('./middlerware/config');

const url = config.MongoURL;
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
connect .then(() => {
  console.log('Database Connection Successfull...!');
}).catch((err) => {
  console.log("Database Connetion Fali...!");
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/route'))

var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})