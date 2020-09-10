const crypto = require('crypto')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    set: (value) => crypto.createHash("md5").update(value).digest("hex"),
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
