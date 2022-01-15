const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Admins = require('../models/admin');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const admin = await Admins.findById(payload.id);
        if (admin) {
          done(null, admin);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, null);
      }
    }),
  );
};
