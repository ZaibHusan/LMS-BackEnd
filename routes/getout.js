import express from "express";
import Course from "../Schema/schema.js";
import fs from "fs"
const getout = express.Router();

getout.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses)

    } catch (error) {
        res.json({ message: error.message })
    }
})

export default getout