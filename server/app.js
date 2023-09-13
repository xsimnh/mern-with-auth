const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const proxy = require("express-http-proxy");
const https = require("https");
const fs = require("fs");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const appPath = require("../scripts/path");
const authController = require("./controllers/auth");

const app = express();
require("./config/db")();
app.use(passport.initialize());
app.use((req, res, next) => {
  req.passport = passport;
  next();
});
require("./config/passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [`https://${process.env.HOST}`, `http://${process.env.HOST}`, `${process.env.HOST}`],
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
    credentials: true,
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(compression());
}
app.use(
  express.static(appPath.wwwroot, {
    dotfiles: "ignore",
    etag: true,
    extensions: ["html"],
    index: false,
    maxAge: 1000 * 60 * 1,
    expires: 1000 * 60 * 1,
    setHeaders: function (res, path, stat) {
      res.set("x-timestamp", Date.now());
      res.set("expires", new Date(Date.now() + 1000 * 60 * 1).toGMTString());
    },
  })
);
app.use(auth);
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.use(errorHandler);
app.use("/api", proxy("http://localhost:9000"));
app.get("*", function (req, res, next) {
  res.sendFile("index.html", { root: appPath.wwwroot });
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
