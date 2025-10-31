import mongoose from "mongoose";

const adduserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
            unique: true,

        },

        email: {
            type: String,
            required: [true, "email is required"],
            unique: true

        },

        password: {
            type: String,
            required: [true, "password is required"],
            unique: true
        },
    }
)


const adduser = mongoose.model("adduser", adduserSchema);
export default adduser;