import express from "express";
import Course from "../Schema/schema.js";
const getout = express.Router();

getout.get("/", async (req, res) => {
    try {
        const courses = await Course.find().lean().maxTimeMS(10000);
        
        if (!courses) {
            return res.status(404).json({ message: "No courses found" });
        }
        
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ 
            message: "Failed to fetch courses",
            error: error.message 
        });
    }
});

export default getout