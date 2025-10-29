import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect('mongodb+srv://mom:mom12345@mom.djubrn7.mongodb.net/course', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    cachedConnection = connection;
    console.log("✅ MongoDB connected successfully!");
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // Let the error be handled by the middleware
  }
};

export default connectDB;
