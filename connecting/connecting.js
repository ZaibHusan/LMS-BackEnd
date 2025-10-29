import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

// Reusable connection function
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mom:mom12345@mom.djubrn7.mongodb.net/course');
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop app if connection fails
  }
};

export default connectDB;
