/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Expose-Headers", "Content-Disposition");
  next();
});

app.get("/json", function (req, res) {
  const random = Math.random();
  if (random > 0.5) {
    res.json({
      code: 200,
      message: null,
      data: true,
    });
  }
  res.status(502).send({ message: "custom error" });
});

app.post("/file", function (req, res) {
  setTimeout(() => {
    res.download(path.resolve(__dirname, "./download.txt"));
  }, 3000);
});

app.listen("9000", function () {
  console.log("start mock api");
});
