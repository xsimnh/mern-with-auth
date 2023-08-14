const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
});

UserSchema.virtual("login_name")
  .get(function () {
    return this.first_name + "." + this.last_name;
  })
  .set(function (name) {
    const [first, last] = name.split(".");
    this.first_name = first ?? "";
    this.last_name = last ?? "";
  });

module.exports = mongoose.model("User", UserSchema);
