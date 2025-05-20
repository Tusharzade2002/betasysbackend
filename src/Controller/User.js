import User from "../Models/UserRegistration.js";
import bcrypt from "bcrypt";
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
    const user = await User.findOne({email});
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
      { name: user.name, email: user.email },
      process.env.JWT_SIGNATURE,
      { expiresIn:process.env.JWT_EXPIRES_IN}
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
        success:false,
        message:"error"
    })
  }
};

export const userlogout = async (req, res) => {
  res.send("user logout.......");
};
