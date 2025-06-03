import bcrypt from "bcrypt";
import Admin from "../Models/AdminRegistration.js";
import jwt, { decode } from "jsonwebtoken";
export const adminregister = async (req, res) => {
  try {
    const { name, email, age, username, Address, Password } = req.body;

    const Existing = await Admin.findOne({ email });
    if (Existing) {
      return res.status(409).json({
        success: false,
        message: "Email Already exist",
      });
    }
    const Salt = 10;
    const hashpassword = await bcrypt.hash(Password, Salt);
    const newAdmin = new Admin({
      name,
      email,
      age,
      username,
      Address,
      Password: hashpassword,
    });
    const SavedAdmin = await newAdmin.save();
    res.status(201).json({
      success: true,
      message: "Admin Registration successfulyy.....",
      data: SavedAdmin,
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

export const adminlogin = async (req, res) => {
  const { email, Password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        data: false,
        message: "Invalid email or Password.",
      });
    }
    const ispasswordmatch = await bcrypt.compare(Password, user.Password,);
    if (!ispasswordmatch) {
      return res.status(400).json({
        data: false,
        message: "Invalid email or Password.",
      });
    }

    const token = jwt.sign(
      {name: user.name,username:user.username, email: user.email,id:user._id},
      process.env.JWT_SIGNATURE,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "login successfully...",
      token,
      data: {
        
        name: user.name,
        email: user.email,
        age: user.age,
        Address: user.Address,
      },
    });
  } catch (err) {
    console.log("error while login :", err);
  }
};

export const changepassword = async (req, res) => {

  console.log("user", req.user)
  const { email, CurrentPassword, NewPassword, ConfirmPassword } = req.body;
  try {
    if (NewPassword !== ConfirmPassword) {
      return res.json({
        success: false,
        message: "New password and Confirm password does not match",
      });
    }


    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: true,
        message: "Invalid email...",
      });
    }
    console.log("pass", CurrentPassword, user.Password)
    const ispasswordmatch = await bcrypt.compare(CurrentPassword, user.Password)
    console.log("ispassword", ispasswordmatch)

    if (ispasswordmatch) {
      const salt = 10;
      const hashpassword = await bcrypt.hash(ConfirmPassword, salt);
      const updatePassword = await Admin.updateOne(
        { email: email },
        { $set: { Password: hashpassword } }
      );
      if(updatePassword){
        return res.status(200).json({
        success: true,
        message: "Password Changed Successfully...",
      });
      }
    }
    // return res.json({message:"hrllo"})
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const GetCurrentAdmin =async(req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
      return res.status(400).json({
        success:false,
        message:"Token not found"
      })
    }
    const token = authHeader.split(" ")[1];
    const decode= jwt.verify(token,process.env.JWT_SIGNATURE)
    return res.status(200).json({
      success:true,
      message:"Decoded token..",
      data:decode
    })
}