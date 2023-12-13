const mongoose = require("mongoose");

module.exports = function initDB() {
  const MONGODB_URI = process.env.MONGODB_URI;
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.info(`Connected to ${MONGODB_URI}...`))
    .catch((error) => console.error(error));
};
