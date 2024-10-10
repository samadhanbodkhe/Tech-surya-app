const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    subject:{type:String, required:true},
    mobile:{type:Number,required:true},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    otp:{type:String}
}, { timestamps: true })

module.exports = mongoose.model("teacher", teacherSchema)