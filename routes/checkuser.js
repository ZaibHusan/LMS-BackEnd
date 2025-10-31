import express from "express"
import adduser from "../Schema/adduser.js";

const checkuse = express.Router();


checkuse.post("/",async(req,res)=>{
    try {
        let email = req.body.email
        let password = req.body.password
        let data = await adduser.findOne({email:email,password:password})
        if(data){
            res.json({loginsuccess:true ,data:data})
        }
        else{
            res.json({loginsuccess:false,data:data})
            console.log("The user not exist")
        }
    } catch (error) {
        
    }
})

export default checkuse;