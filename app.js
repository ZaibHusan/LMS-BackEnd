import express from "express";
import getin from "./routes/getin.js";
import cors from "cors"
import connect from "./connecting/connecting.js";
import dotenv from "dotenv";
import getout from "./routes/getout.js";
import registeruser from "./routes/adduser.js";
import checkuse from "./routes/checkuser.js";

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());


connect().then(()=>{
    console.log("Mongoos are connected")
}).catch(()=>{
    console.log("error occure in connecting data base")
})



app.use("/getin", getin);
app.use("/getout", getout);
app.use("/registeruser", registeruser);
app.use("/checkuser",checkuse)
app.get("/", (req, res) => {
    res.send("Hello World");
})




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});