const mongoose = require('mongoose')

//Post, share material from teacher or student
const materialSchema = new mongoose.Schema({
  title:{
    type :String,
    required : true
  },
  content:{
      type :String,
      required : true
  },
  images: {
    type: Array,
    default: []
  },
  Sender:{
    type:String,
    required:true
  },
  SenderId:{
      type:String,
      required:true
  },
  comments: { type : Array},
  user: { type: mongoose.Types.ObjectId, ref: 'user'},
}, {
   timestamps: true 
})

module.exports = mongoose.model("Material", materialSchema);