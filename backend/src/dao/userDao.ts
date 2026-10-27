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

export const userSignin = async(phone:string , password: string)=>{
    const response = await userModel.findOne({phone : parseInt(phone)});
    if(!response) throw new Error("User not found with this phone number");
    const isPasswordValid = await bcrypt.compare(password,response.password!);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
}