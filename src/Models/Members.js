import mongoose from "mongoose"
const memberschema = new mongoose.Schema({
 name:{
    type:String,
    required:true,
    unique:true
 },
 email:{
    type:String,
required:true,
 },
 address:{
     type:String,
required:true,
 }
})
const Members = mongoose.model("Members",memberschema)
export default Members