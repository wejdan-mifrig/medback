import mongoose from "mongoose";
import { types } from "pg";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "trader"],
        default: "user"
    },
    productsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User