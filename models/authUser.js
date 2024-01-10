const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const authUserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

authUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create a model based on that schema
const AuthUser = mongoose.model("User", authUserSchema);

//export the model
module.exports = AuthUser;
