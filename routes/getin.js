import express, { Router } from "express";
import Course from "../Schema/schema.js";

const getin = express.Router();
getin.post("/", async (req, res) => {
  try {
    const data = req.body;

    // Create new course
    const course = new Course({
      id: Math.floor(Math.random() * 100000),
      title: data.title,
      description: data.description,
      image: data.image,
      author: data.author,
      rating: data.rating || 4.8,
      stars: data.stars || 5,
      reviews: data.reviews || 0,
      price: data.price,
      discount: data.discount,
      discount_days: data.discount_days,
      courseStructure: data.courseStructure,
    });

    // Save to MongoDB
    await course.save();

    res.status(201).json({ message: "✅ Course saved successfully", course });
  } catch (error) {
    console.error("❌ Error saving course:", error);
    res.status(500).json({ error: "Server error while saving course" });
  }
});


export default getin;
