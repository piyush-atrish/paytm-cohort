import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : String,
    password : String,
    firstName : String,
    lastName : String,
    phone : {type : Number , unique : true},
});

export const userModel = mongoose.model("User",userSchema);