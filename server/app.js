const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const proxy = require("express-http-proxy");
const https = require("https");
const fs = require("fs");
const errorHandler = require("./middlewares/errorHandler");
const appPath = require("../scripts/path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "auth", cookie: { maxAge: 60000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(compression());
}
app.use(express.static(appPath.wwwroot));
app.use("*", isLoggedIn);
app.use("/api", proxy("http://localhost:9000"));
app.use(errorHandler);
app.get("*", function (req, res, next) {
  res.sendFile("index.html", { root: appPath.wwwroot });
});

// TODO
passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    var user = {
      username: "admin",
      password: "pass",
    };

    if (username !== user.username) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (password !== user.password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
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
app.post(
  "/login",
  passport.authenticate("local", { successRedirect: "/", failureRedirect: "/login" })
);

const options = {
  key: fs.readFileSync(appPath.get("cert/localhost.key")),
  cert: fs.readFileSync(appPath.get("cert/localhost.cert")),
  requestCert: false,
  rejectUnauthorized: false,
};
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
const host = "localhost";
const port = normalizePort(process.env.PORT || "7100");
const server = https.createServer(options, app);
server.listen(port, host, function () {
  console.log("server url is: https://%s:%s", host, port);
});

function isLoggedIn(req, res, next) {
  if (["/login"].includes(req._parsedUrl.pathname) || req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
