var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');

var db = require('./config/db');
var port = process.env.PORT || 8080; 

// connect to our mongoDB database 
mongoose.connect('mongodb://localhost/umdwebapp'); 

app.use(favicon());
app.use(bodyParser.json()); // parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(morgan('dev'));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
// Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// routes ==================================================
require('./routes/users_routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;     