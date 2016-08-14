app.get('/HDSP/login', function(req, res) {
  res.sendfile('HDSP/login/login.html');
});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// passport middleware
app.use(app.router)
app.use(passport.initialize());
app.use(passport.session());


// define login handler routes
app.post('/HDSP/calendar',
  passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
  })
);

app.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

app.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});


// serialize & deserialize users
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// connect to MongoDB
var mongoose = require('mongoose/');

mongoose.connect('mongodb://helpdesk2:password@ds025802.mlab.com:25802/schedulerdb');


// set up template for resources
var Schema = mongoose.Schema;
var UserDetail = new Schema({
      firstName: String,
      lastName: String,
      email: String,
      username: String,
      password: String,
      directoryID: String,
      studentLead: Boolean,
      admin: Boolean
    }, {
      collection: 'user'
    });
var UserDetails = mongoose.model('user', UserDetail);



passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    UserDetails.findOne({
      'username': username, 
    }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));