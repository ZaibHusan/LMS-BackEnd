import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// Reusable connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop app if connection fails
  }
};

export default connectDB;
