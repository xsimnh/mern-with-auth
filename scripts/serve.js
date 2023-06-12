const express = require("express");
const compression = require("compression");
const proxy = require("express-http-proxy");
const https = require("https");
const fs = require("fs");

const appPath = require("./path");
const app = express();

app.use(compression());
app.use(express.static(appPath.wwwroot));
app.use("/api", proxy("http://localhost:9000"));
app.get("*", function (req, res) {
  res.sendFile("index.html", { root: appPath.wwwroot });
});

// app.listen(7100);

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
  // const { address: host, port } = server.address();

  console.log("server url is: https://%s:%s", host, port);
});
