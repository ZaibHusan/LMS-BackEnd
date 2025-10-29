import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Track connection state
let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRIES = 3;

const connectDB = async () => {
  try {
    if (isConnected) {
      console.log('Using existing database connection');
      return mongoose.connection;
    }

    // Configure Mongoose
    mongoose.set('bufferCommands', false);
    mongoose.set('strictQuery', true);

    if (connectionAttempts >= MAX_RETRIES) {
      throw new Error('Maximum connection attempts reached');
    }

    connectionAttempts++;

    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      maxPoolSize: 5,
      maxIdleTimeMS: 10000,
      connectTimeoutMS: 5000,
      heartbeatFrequencyMS: 2000,
      retryWrites: true,
    };

    // Connect with shorter timeout
    const conn = await mongoose.connect('mongodb+srv://mom:mom12345@mom.djubrn7.mongodb.net/course?retryWrites=true&w=majority', opts);

    isConnected = true;
    connectionAttempts = 0;
    console.log("✅ MongoDB connected successfully!");
    
    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection attempt ${connectionAttempts} failed:`, error.message);
    isConnected = false;
    throw error;
  }
};

export default connectDB;
