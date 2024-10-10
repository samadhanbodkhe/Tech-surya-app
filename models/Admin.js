const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number},
    gender:{type:String},
    address:{type:String},
    otp:{type:String}
},{timestamps:true})

module.exports = mongoose.model("admin", adminSchema)