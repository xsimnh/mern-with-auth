const mongoose = require("mongoose");
const config = require("../config");

module.exports = function initDB() {
  const DB_URL = process.env.DB_URL || config.DB_URL;
  mongoose
    .connect(DB_URL)
    .then(() => console.info(`Connected to ${DB_URL}...`))
    .catch((error) => console.error(error));
};
