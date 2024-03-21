import { verify } from "crypto";
import { mongoose } from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema= new mongoose.Schema({
    userName: { type: String, required: [ true, " please provide a username"] ,unique: true,},
    password: { type: String, required: true},
    email: { type: String, required: [ true, " please provide a email"], unique: true,},
    isVerified:{ type: Boolean, default: false},
    isAdmin: {    type: Boolean,    default: false, },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date


    
})
export  default User=mongoose.models.users || mongoose.model("user",userSchema);