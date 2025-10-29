import mongoose from "mongoose";


const connect = async () => {
  try {
    console.log("connecing start....")
    await mongoose.connect(process.env.MONGO_URI);
    console.log("👊Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect