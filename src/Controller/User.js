import User from "../Models/UserRegistration.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
export const userregister = async (req, res) => {
  const { name, email, age, username, Address, Password } = req.body;
  try {
    const newUser = new User({ name, email, age, username, Address, Password });
    const Existing = await User.findOne({ email });
    if (Existing) {
      return res.status(409).json({
        success: false,
        message: "Email already axist",
      });
    }

    const salt = 10;
    const hashpassword = await bcrypt.hash(Password, salt);
    const NewUser = new User({
      name,
      email,
      age,
      username,
      Address,
      Password: hashpassword,
    });
    const SaveUser = await NewUser.save();
    res.status(201).json({
      success: true,
      message: "User Registration successfully..",
      data: SaveUser,
    });
  } catch (err) {
    console.log("error:", err);
  }
};

export const userlogin = async (req, res) => {
  const { email, Password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invaild email or password",
      });
    }
    const ispasswordmatch = await bcrypt.compare(Password, user.Password);
    if (!ispasswordmatch) {
      return res.status(400).json({
        success: false,
        message: "Invaild email or Password",
      });
    }

    const token = jwt.sign(
      { name: user.name, email: user.email }, //payload action
      process.env.JWT_SIGNATURE, //signature or Secrate code
      { expiresIn: process.env.JWT_EXPIRES_IN } // expire time
    );

    res.json({
      success: true,
      message: "Login Successfully..",
      token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error",
    });
  }
};

export const changepassword = async (req, res) => {
  const { email, CurrentPassword, Newpassword, ConfirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email) {
      return res.status(400).json({
        success: true,
        message: " Invalid email...",
      });
    }
    if (Newpassword !== ConfirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password does not match",
      });
    }
    const ispasswordmatch = await bcrypt.compare(
      CurrentPassword,
      user.Password
    );
    if (ispasswordmatch) {
 const hashpassword =await bcrypt.hash(ConfirmPassword,10)
      
        const updatePassword = await User.updateOne(
          { email: email },
          { $set: { Password: hashpassword } }
        );

        return res.json({
          success: true,
          message: "Password changed Successfulyy...",
          data:updatePassword
        });
      
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
