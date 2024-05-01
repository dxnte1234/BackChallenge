const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;
//Sadiel
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String, 
      required: true, 
      match: [/^[A-Za-z]+$/, "Only letters allowed."],
    },
    last_name: {
      type: String, 
      match: [/^[A-Za-z]+$/, "Only letters allowed."], 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid format"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      match: [/^[0-9]+$/, "Invalid character"],
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true, 
    statics: {
      encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(15);
        return await bcrypt.hash(password, salt);
      },
      isValidPassword: async (password, hash) => {
        return await bcrypt.compare(password, hash);
      },
      createToken: async (payload) => {
        const token = process.env.JWT_SIGN;
        return jwt.sign(payload, token, { expiresIn: "1h" });
      },
    },
  }
);

const userModel = mongoose.model("users", userSchema); 
module.exports = userModel;