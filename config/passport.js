const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = require('../models/User');

// In order for Google to identify which application's Passport interacts with their API
// you will need to obtain clientID and clientSecret in Google Developers Console.
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        async(accessToken, refreshToken, profile, done) => {
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            }

            try {
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // if we have a record with the given profile.id
                    done(null, user);
                } else {
                    // if not, create a new user
                    user = await User.create(newUser);
                    done(null, user);
                }
            } catch (err) {
                console.log(err);
            }
        }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    })

    // Used to decode the received cookie and persist session
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}