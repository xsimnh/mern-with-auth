const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const config = require("../config");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 100 },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateJWT = function (callback) {
  return jwt.sign(
    { email: this.email, id: this._id },
    config.secretOrKey,
    { expiresIn: config.expires },
    callback
  );
};

module.exports = mongoose.model("User", UserSchema);
