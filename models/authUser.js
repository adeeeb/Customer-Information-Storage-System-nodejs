const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const authUserSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profileImage: String,
    customerInfo: [
      {
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        age: Number,
        country: String,
        gender: String,
        createdAt: Date,
        updatedAt: { type: Date, default: Date.now },
      },
    ],
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
