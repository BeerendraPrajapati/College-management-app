
 const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
    
    fullName:{type:String,require:true},
    phone:{type:String,require:true},
    email:{type:String,require:true},
    courseId:{type:String,require:true},
    uId:{type:String,require:true},
    amount:{type:Number,require:true},
     remark:{type:String,require:true}
 
},{timestamps:true})

module.exports = mongoose.model("Fee", feeSchema);