const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    readWrite: {
      type: Boolean,
    },
  },
  { timestamps: true, versionKey: false }
);

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
