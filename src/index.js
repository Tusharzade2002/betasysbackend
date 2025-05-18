import express from 'express'
import dotenv from 'dotenv'
import  mongoose from "mongoose"
import Adminroute from './Route/Admin.js'
import Userroute from './Route/User.js'
import clientroute from './Route/Client.js'
import  punycode from 'punycode'
import User from './Models/Adddata.js'
const app = express();
dotenv.config();
const PORT =5000

const connectDB = async () => {
  try {
     mongoose.set('strictQuery', true);
    await mongoose.connect("");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};


app.get("/",(req,res)=>{
    res.send("Helooo Developer...!")
})
app.use("/admin",Adminroute);
app.use("/user",Userroute)
app.use("/client",clientroute)
app.post("/adddata",async(req,res)=>{
      try{
                   const {name,email,age}=req.body;
                   const user = new User({name,email,age});
                   const Saveduser =await user.save()
                   res.json(Saveduser)
      }catch(err){
 console.log(err);
 
      }
})
// app.use("/user",UserRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);  
    
})