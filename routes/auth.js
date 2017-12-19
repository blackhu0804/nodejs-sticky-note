var express = require('express');
var router = express.Router();
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---');
  console.log(obj);
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: '64bccbc422247855a20e',
  clientSecret: 'cf5725fd37449c83ec231d81da4a78ba49ae1b97',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile);
}
));

router.get('/logout', function(req, res){
  req.session.destroy();
  res.redirect('/');
})

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  req.session.user = {
    id: req.user.id,
    username: req.user.displayName || req.user.username,
    avatar: req.user._json.avatar_url,
    provider: req.user.provider
  };
  res.redirect('/');
});

module.exports = router;