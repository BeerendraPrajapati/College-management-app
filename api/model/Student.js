
 const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
    
    fullName:{type:String,require:true},
    phone:{type:String,require:true},
    email:{type:String,require:true},
    address:{type:String,require:true},
    imageId:{type:String,require:true},
    imageUrl:{type:String,require:true},
    courseId:{type:String,require:true},
    uId:{type:String,require:true},
 

},{timestamps:true})

module.exports = mongoose.model("Student", StudentSchema);