module.exports = function (req, res, next) {
  if (["/login", "/api/login", "/register", "/api/register"].includes(req.url)) {
    return next();
  }
  return req.passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    return next();
  })(req, res, next);
};
