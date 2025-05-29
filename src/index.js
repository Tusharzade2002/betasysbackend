import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Adminroute from "./Route/Admin.js";
import Userroute from "./Route/User.js";
import superadminroute from "./Route/Superadmin.js";
import Projects from "./Models/Projects.js";
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
// Ensure indexing if not already created
(async () => {
  try {
    // Get all current indexes
    const existingIndexes = await Projects.collection.getIndexes();
    
    // Check if CollegeTaskname index exists
    if (!('projectName_1' in existingIndexes)) {
      console.log("Index on CollegeTaskname not found. Creating...");

      // Create the index manually
      await Projects.collection.createIndex({ projectName: 1 }, { unique: true });

      console.log("Index on projectName created successfully.");
    } else {
      console.log("Index on projectName already exists.");
    }

    // Optional: check and create other indexes
    if (!('projectName_1' in existingIndexes)) {
      console.log("Index on projectName not found. Creating...");
      await Projects.collection.createIndex({ tasks: 1 });
    }

  } catch (err) {
    console.error("Index check or creation error:",err);
}
})();

app.get("/", (req, res) => {
  res.send("Helooo Developer...!");
});
app.use("/admin", Adminroute);
app.use("/user", Userroute);
app.use("/superadmin", superadminroute);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();

});
