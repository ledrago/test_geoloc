//Server


// modules ===========================================
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var express = require("express");
var app = express();


// configuration =====================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/projet_runningheroes');

app.use(express.static(__dirname + '/../client'));
require('./routes')(app);

app.listen(process.env.PORT || 3700);
console.log("Server listenning on port ", process.env.PORT || 3700);