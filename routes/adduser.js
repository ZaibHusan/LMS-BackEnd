import express from "express"
import adduser from "../Schema/adduser.js";
const registeruser = express.Router();
import Course from "../Schema/schema.js";

registeruser.post("/", async (req, res) => {
   try {
      let data = req.body;
      const Newadduser = new adduser(data);
      console.log(data)

      const savedUser = await Newadduser.save();
      res.json({ islogin: true, data: data })
      console.log("User saved successfully:", savedUser);
   } catch (error) {
      console.log("Error saving user:", error);
      let keyValue = Object.keys(error.keyValue);
      let key = keyValue[0];
      let value = error.keyValue[key]
      console.log(key)
      console.log(value)
      if (key == "email") {
         res.json({ islogin: false, data: "Email ID already exist" })
      }
      if (key == "username") {
         res.json({ islogin: false, data: "Username already exist" })
      }
      if (key == "password") {
         res.json({ islogin: false, data: "Password already exist" })
      }


   }
})


export default registeruser