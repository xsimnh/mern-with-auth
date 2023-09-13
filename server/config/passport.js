const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require("../models/user");
const config = require("../config");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies["authorization"],
    ExtractJwt.fromUrlQueryParameter("access_token"),
    ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  ]),
  secretOrKey: config.secretOrKey,
};

module.exports = function initPassport(passport) {
  passport.use(
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
