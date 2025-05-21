import SuperAdmin from "../Models/SuperAdmin.js";
import bcrypt from "bcrypt";
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
  res.send("add client data sucessfully......");
};
export const superadminlogout = async (req, res) => {
  res.send("update client data sucessfully.........");
};
