const { default: mongoose } = require("mongoose");
const { type } = require("os");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
});

let user = mongoose.model("User", userSchema);

module.exports = user;
