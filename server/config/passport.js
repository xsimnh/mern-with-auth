const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require("../models/user");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies["x-access-token"]]),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = function initPassport(passport) {
  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, function (payload, done) {
      User.findById(payload.id)
        .then((user) => done(null, user ?? false))
        .catch((error) => done(error));
    })
  );
  passport.serializeUser(function (user, done) {
    // save user
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    // delete user
    done(null, user);
  });
};
