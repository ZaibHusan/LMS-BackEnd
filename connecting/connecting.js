import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    mongoose.set('bufferCommands', false);
    
    const connection = await mongoose.connect('mongodb+srv://mom:mom12345@mom.djubrn7.mongodb.net/course', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 15000,
    });
    
    cachedConnection = connection;
    console.log("✅ MongoDB connected successfully!");
    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    cachedConnection = null;
    throw error;
  }
};

export default connectDB;
