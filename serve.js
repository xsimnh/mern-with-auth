/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const compression = require("compression");
const proxy = require("express-http-proxy");
const path = require("path");
const https = require("https");
const fs = require("fs");

const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, "wwwroot")));
app.use("/api", proxy("http://localhost:9000"));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "wwwroot/index.html"));
});

const host = "localhost";
const options = {
  key: fs.readFileSync(path.resolve(__dirname, "cert/" + host + ".key")),
  cert: fs.readFileSync(path.resolve(__dirname, "cert/" + host + ".cert")),
  requestCert: false,
  rejectUnauthorized: false,
};

const server = https.createServer(options, app);
server.listen(7100, host, function () {
  const { address: host, port } = server.address();

  console.log("server url is: https://%s:%s", host, port);
});
