import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId ,
        ref : "User",
        required : true
    },
    balance:{
        type:Number,
        required : true
    },
    transfered : Number ,
    received : Number
});

export const accountModel = mongoose.model("Account",accountSchema);