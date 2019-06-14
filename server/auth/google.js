/**
 * ### Провайдер авторизации google
 *
 * @module google
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {google} = require('../../config/auth.settings');

passport.use(new GoogleStrategy(
  google,
  function(request, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    return done(null, profile, {accessToken, refreshToken});
  }
));

module.exports = function (req, res, opts, next) {
  passport.authenticate('google', opts, next)(req, res);
}
