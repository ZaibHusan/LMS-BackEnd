import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: { type: Number, default: 1 },
  title: { type: String, default: "React JS" },
  description: {
    type: Object,
    default: {
      Title: "Learn React from scratch",
      features: {
        dec: "Understand the fundamentals of React.js and build dynamic web applications.",
        points: [
          "Component-based architecture",
          "Virtual DOM",
          "State management",
          "Event handling",
          "Lifecycle methods",
        ],
      },
    },
  },
  image: {
      type: String,
  },
  author: { type: String, default: "John Doe" },
  rating: { type: Number, default: 4.8 },
  stars: { type: Number, default: 5 },
  reviews: { type: Number, default: 340 },
  price: { type: Number, default: 79.99 },
  discount: { type: Number, default: 30 },
  discount_days: { type: Number, default: 4 },
  courseStructure: {
    type: Array,
    default: [
      {
        sectionTitle: "1. Getting Started with React",
        lectures: [
          {
            lectureTitle: "Introduction to React",
            duration_minutes: 8,
            isFree: true,
            videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
          },
          {
            lectureTitle: "React Installation Guide",
            duration_minutes: 12,
            isFree: false,
            videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
          },
          {
            lectureTitle: "JSX and Rendering",
            duration_minutes: 15,
            isFree: true,
            videoUrl: "https://www.youtube.com/watch?v=9D1x7-2FmTA",
          },
        ],
      },
    ],
  },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
