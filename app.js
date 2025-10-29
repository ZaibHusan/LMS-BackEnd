import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import connectDB from "./connecting/connecting.js";
import getout from "./routes/getout.js";

const app = express();



// connecting to mongoDb 

connectDB();

app.use(cors())
app.use(express.json());
app.use("/getin", getin);
app.use("/getout", getout);


app.get("/", (req, res) => {
    res.send("Hello World");
})








app.listen(3000, () => {
    console.log('Server is running on port 3000');
});