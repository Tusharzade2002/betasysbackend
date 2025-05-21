import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Adminroute from "./Route/Admin.js";
import Userroute from "./Route/User.js";
import superadminroute from "./Route/Superadmin.js";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = 5000;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

app.get("/", (req, res) => {
  res.send("Helooo Developer...!");
});
app.use("/admin", Adminroute);
app.use("/user", Userroute);
app.use("/superadmin", superadminroute);

// app.use("/user",UserRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
