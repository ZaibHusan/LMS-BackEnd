import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import connectDB from "./connecting/connecting.js";
import getout from "./routes/getout.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB for each request
app.use(async (req, res, next) => {
    const MAX_RETRIES = 3;
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Database connection timeout')), 5000);
            });

            await Promise.race([connectDB(), timeoutPromise]);
            return next();
        } catch (error) {
            attempts++;
            console.error(`Database connection attempt ${attempts} failed:`, error);
            
            if (attempts === MAX_RETRIES) {
                return res.status(503).json({
                    error: "Database connection failed",
                    message: "Service temporarily unavailable. Please try again later.",
                    retries: attempts
                });
            }
            // Wait 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
});

// Routes
app.use("/getin", getin);
app.use("/getout", getout);
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Export the Express API
export default app;