const mongoose = require("mongoose");

const userScheme = new mongoose.Schema(
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
    fullname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    classes: {
      type: Array,
      required: true,
      unique: false,
    },
    teacher: {
      type: Array,
      required: true,
      unique: false,
    },
    studentID: {
      type: String,
      required: false
    },
    status: {
      type: Number,
      default: 1, //'0 - inactive\n1 - active\n2 - locked'
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

module.exports = mongoose.model("Users", userScheme);
