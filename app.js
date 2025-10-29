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
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ error: "Database connection failed" });
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