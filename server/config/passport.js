const bcrypt = require("bcrypt");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function initPassport(passport) {
  passport.use(
    "local",
    new LocalStrategy({ usernameField: "email" }, async function (email, password, done) {
      try {
        const user = await User.findOne({ email }, null, {
          collation: { locale: "en", strength: 2 },
        });
        if (user && user.active) {
          const pass = bcrypt.compareSync(password, user.password);
          if (pass) {
            return done(null, user);
          }
          return done(null, false, {
            message: "The email or password is incorrect, please check and try it again.",
          });
        }
        return done(null, false, {
          message: `Cannot find email: ${email}, you should register first.`,
        });
      } catch (error) {
        return done(error);
      }
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
