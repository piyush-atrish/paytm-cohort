import { response } from "express";
import { userModel } from "../schemas/user.js";
import bcrypt from "bcrypt"; 

export const createUser = async(email:string,password:string,firstName:string,lastName:string,phone:string)=>{
    const hashedPassword = await bcrypt.hash(password,7);
    await userModel.create({
        email : email,
        password : hashedPassword,
        firstName :firstName,
        lastName :lastName,
        phone : parseInt(phone)
    });
}
