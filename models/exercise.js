const { Int32 } = require("bson");
const mongoose = require("mongoose");

const exerciseScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter exercies name!"],
      trim: true,
    },
    desc: {
      type: String,
      required: false
    },
    point: {
        type: Number,
        required: false
    },
    classroom: {
        type: String,
        required: false
    },
    studentPoint: {
      type: Object,
      required:false
    },
    grade: {
      type: Array,
      required: false
    },
    markDone: {
      type: Boolean,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exercises", exerciseScheme);
