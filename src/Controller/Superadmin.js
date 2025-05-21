import SuperAdmin from "../Models/SuperAdmin.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const superadminregister = async (req, res) => {
  const { name, email, age, username, Address, Password } = req.body;
  try {
    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      age,
      username,
      Address,
      Password,
    });
    const checkuser = await SuperAdmin.findOne({ email });
    if (checkuser) {
      return res.status(409).json({
        success: false,
        message: "Email Already Exist",
      });
    }
    const salt = 10;
    const hashpassword = await bcrypt.hash(Password, salt);
    const NewSuperAdmin = new SuperAdmin({
      name,
      email,
      age,
      username,
      Address,
      Password: hashpassword,
    });
    const SavedSuperadmin = await NewSuperAdmin.save();
    res.json({
      success: true,
      message: "Super admin register successfully...",
      data: SavedSuperadmin,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Registration Failed...",
    });
  }
};
export const superadminlogin = async (req, res) => {
  const {email,Password}=req.body;
  try{
            const superAdmin = await SuperAdmin.findOne({email})
            if(!superAdmin){
                return res.json({
                    success:false,
                    message:"Invalid Email........"
                })
            }
            const ispasswordmatch = await bcrypt.compare(Password,superAdmin.Password);
            if(!ispasswordmatch){
                return res.status(400).json({
                    success:false,
                    message:"Invalid Email or Password"
                })
            }
            const token =jwt.sign(
                {name:superAdmin.name,email:superAdmin.email},
                process.env.JWT_SIGNATURE,
                {expiresIn:process.env.JWT_EXPIRES_IN}
            )
       res.status(200).json({
         success:true,
         message:"Login Successfully...",
         token,
         data:{
              name:superAdmin.name,
              email:superAdmin.email
         }
       })

  }catch(err){
       res.json({
        success:false,
        message:"Login Failed"
       })
  }
};
export const superadminlogout = async (req, res) => {
  res.send("update client data sucessfully.........");
};
