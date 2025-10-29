import express from "express";
import Course from "../Schema/schema.js";
const getout = express.Router();

getout.get("/", async (req, res) => {
    try {
        // Set a timeout for the query
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Query timeout')), 5000);
        });

        // Execute query with timeout
        const queryPromise = Course.find()
            .select('-__v')  // Exclude version field
            .lean()          // Return plain objects
            .maxTimeMS(5000) // Set MongoDB query timeout
            .exec();        

        const courses = await Promise.race([queryPromise, timeoutPromise]);
        
        if (!courses || courses.length === 0) {
            return res.status(404).json({ 
                success: false,
                message: "No courses found" 
            });
        }
        
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(error.message === 'Query timeout' ? 504 : 500).json({ 
            success: false,
            message: "Failed to fetch courses",
            error: error.message 
        });
    }
});

export default getout