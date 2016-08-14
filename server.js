var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var db = require('./config/db');
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
mongoose.connect('mongodb://localhost/umdwebapp'); 

app.use(bodyParser.json()); // parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(morgan('dev'));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// routes ==================================================
require('./routes/users_routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;     