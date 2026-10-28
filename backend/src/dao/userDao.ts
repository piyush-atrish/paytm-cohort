import { userModel } from "../schemas/user.js";
import bcrypt from "bcrypt"; 
import { AppError } from "../utils/AppError.js";

export const createUser = async(email:string,password:string,firstName:string,lastName:string,phone:string)=>{
    const user = await userModel.findOne({phone : parseInt(phone)});
    if(user)throw new AppError("user already exists", 409);
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
    if(!response) throw new AppError("User not found with this phone number", 404);
    const isPasswordValid = await bcrypt.compare(password,response.password!);
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401);
    }
    return response._id.toString();
}

export const updateUser = async(userId:string , cred : any)=>{
    try{
        const password = cred.password;
        if(password != undefined){
            cred.password =  await bcrypt.hash(password,7);
        }
        await userModel.updateOne({_id : userId},cred);
    }
    catch(e){
        throw new AppError("some error while updating database",500);
    }
}

export const getUsers = async(filter:string)=>{
    try{
        return await userModel.find({
            $or : [
                {firstName : {
                    "$regex" : filter , $options: "i"
                } },
                { lastName : {
                    "$regex" : filter , $options: "i"
                }
                }
            ] 
        }).select('-password -__v -email').limit(15).lean();
    }
    catch(e){
        throw new AppError("error while loading users" , 500);
    }
}

export const getData = async(userId : string)=>{
    try{
        return await userModel.findOne({
            _id: userId
        }).select('-password -__v').lean();
    }
    catch(e){
        throw new AppError("error while fetching data" , 500);
    }
}