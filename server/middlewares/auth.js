module.exports = function (req, res, next) {
  if (
    ["/login", "/api/login", "/register", "/api/register"].includes(req.url) ||
    req.isAuthenticated()
  ) {
    return next();
  }
  res.redirect("/login");
};
