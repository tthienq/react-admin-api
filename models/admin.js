const mongoose = require("mongoose");

const adminScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/ericnguyen-cop/image/upload/v1625668136/avatar/avatar-1577909_640_nrt1sc.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admins", adminScheme);