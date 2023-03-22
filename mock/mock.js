/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.get("/json", function (req, res) {
  res.json({
    code: 200,
    message: null,
    data: true,
  });
});

app.post("/file", function (req, res) {
  res.download(path.resolve(__dirname, "./test.md"));
});

app.listen("9000", function () {
  console.log("start mock api");
});
