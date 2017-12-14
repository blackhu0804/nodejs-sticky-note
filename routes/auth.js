var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});

router.get('/github',function(req, res, next) {

});

module.exports = router;