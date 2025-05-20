import mongoose from 'mongoose';
const AdminSchema = new mongoose.Schema({
name:{
  type:String,
  required:true
},
username:{
  type:String,
  required:true
},
  age:{
    type:Number,
    required:true
  },
  email:{
  type:String,
  required:true,
  unique:true
  },
  Address:{
    type:String,
  required:true
  },
  Password:{
    type:String,
  required:true
  },

},{timestamps:true});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
