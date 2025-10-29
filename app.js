import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import getout from "./routes/getout.js";
import mongoose from "mongoose";
import dotenv from "dotenv";


const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());


// connecting to mongoDb 


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connect();



app.use("/getin", getin);
app.use("/getout", getout);
app.get("/", (req, res) => {
    res.send("Hello World");
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});