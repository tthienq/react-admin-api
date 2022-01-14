const mongoose = require("mongoose");

const classroomScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter classroom name!"],
      trim: true,
    },
    desc: {
      type: String,
      required: false
    },
    topic: {
        type: String,
        required: false
    },
    room: {
      type: String,
      required: false,
    },
    students: {
      type: Array,
      required: true
    },
    studentCode: { //~studentId
      type: Array,
      required: true
    },
    studentGrade: {
      type: Array,
      required: true
    },
    teachers:{
      type: Array,
      required:true
    },
    meterial: {
      type: Array,
      required: false
    },
    exercise: {
      type: Array,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Classrooms", classroomScheme);
