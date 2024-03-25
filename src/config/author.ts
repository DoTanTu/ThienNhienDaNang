import { resolve } from "path";
import { config } from "dotenv";
var GoogleStrategy = require('passport-google-oauth20').Strategy;

config({ path: resolve(__dirname, "../../.env.config") })

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://thiennhiendanang.tantu.site//auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log('login success');
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      }
    ));
}