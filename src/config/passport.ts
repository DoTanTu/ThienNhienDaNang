import { resolve } from "path";
import { Container } from "typedi";
import { config } from "dotenv";
import controllers from '../controllers/customSiteController';
import CustomerService from "../services/customer";
var GoogleStrategy = require('passport-google-oauth20').Strategy;
config({ path: resolve(__dirname, "../../.env.config") });
const Customer = require('../models/customer');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.URL_HOST,
      },
      async function(accessToken, refreshToken, profile, done) {
            try {
              const email = profile.emails[0].value;
              const serviceInstance = Container.get(CustomerService);
              let user = await serviceInstance.findCustomerByEmail(email);
              if (user) {
                  console.log("User exists");
                  done(null, user);
              } else {
                  const email = profile.emails[0].value;
                  const fullname = profile.displayName;
                  const avatar = profile.photos[0].value;
        
                  user = await serviceInstance.addCustomerWithGoogle(email , fullname, avatar);
                  console.log("Creating new user");
                  done(null, user);
              }
            } catch (err) {
                console.error(err);
            }
          }
    ));

    passport.serializeUser(function (user, done) {
        done(null, {
            avatar : user.avatar,
            email : user.email,
            customerId : user._id,
            fullname : user.fullname,
            role : user.role,
        });
    });

    passport.deserializeUser(function (user, done) {
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
        done(null, user);
    });
}