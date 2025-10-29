import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import connectDB from "./connecting/connecting.js";
import getout from "./routes/getout.js";

const app = express();


app.use(cors())
app.use(express.json());

// connecting to mongoDb 

await connectDB();

app.use("/getin", getin);
app.use("/getout", getout);
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, () => {
    console.log("✅ Server started on port 3000");
});