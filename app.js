import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import getout from "./routes/getout.js";
import mongoose from "mongoose";
import Course from "./Schema/schema.js";


const app = express();
app.use(cors())
app.use(express.json());


// connecting to mongoDb 


const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://mom:mom12345@mom.djubrn7.mongodb.net/course");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// lets create a middle ware to fist connect to mongoose

app.use(async(req, res, next) => {
    await connect();
    next();
});



app.use("/getin", getin);
app.use("/getout", getout);
app.get("/", (req, res) => {
    res.send("Hello World");
})
app.post("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)

    } catch (error) {
        res.json({ message: error.message })
    }
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});