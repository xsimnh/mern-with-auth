const express = require("express");
const mongoose = require("mongoose");
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
const config = require("./config");
const User = require("./models/user");
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

const DB_URL = process.env.DB_URL || config.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.info(`Connected to ${DB_URL}...`))
  .catch((error) => console.error(error));

app.use(
  express.static(appPath.wwwroot, {
    dotfiles: "ignore",
    etag: true,
    extensions: ["htm", "html", "js", "css"],
    index: false,
    maxAge: 1000 * 60,
    expires: 2000,
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set("x-timestamp", Date.now());
      res.set("Expires", new Date(Date.now() + 1000 * 60 * 2).toGMTString());
    },
  })
);
app.use("*", isLoggedIn);
app.use("/api", proxy("http://localhost:9000"));
app.use(errorHandler);
app.get("*", function (req, res, next) {
  res.sendFile("index.html", { root: appPath.wwwroot });
});

passport.use(
  "local",
  new LocalStrategy(function (username, password, done) {
    const user = new User({ login_name: username });
    User.findOne({ first_name: user.first_name, last_name: user.last_name }, null, {
      collation: { locale: "en", strength: 2 },
    })
      .then((result) => {
        if (result && result.active) {
          if (result.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect username or password" });
          }
        } else {
          return done(null, false, { message: `Username ${username} not found` });
        }
      })
      .catch((err) => {
        return done(err);
      });
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
app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info, status) {
    if (err) {
      return next(err);
    }
    if (!user) {
      if (info.message) {
        return res.json({
          code: 200,
          data: info.message,
        });
      }
      return res.redirect("/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  })(req, res, next);
});

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
