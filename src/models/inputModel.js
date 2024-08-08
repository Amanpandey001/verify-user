"use server"
import mongoose, { Schema } from "mongoose";
const newInput=new Schema({
    username:{
        type:String,
        required:[true,"please enter name"],
        unique : [true,"name already exist"]
    },
    email:{
        type:String, 
        required:[true,"please enter email"],
    },
    password: {
        type: String,
        required: [true, "please enter password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})
const Input=mongoose.models.Input||mongoose.model("Input",newInput);
export default Input