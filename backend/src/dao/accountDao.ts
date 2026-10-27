import mongoose from "mongoose";
import { userAuth } from "../middlewares/userAuth.js";
import { accountModel } from "../schemas/account.js";
import { AppError } from "../utils/AppError.js";

export const addAccount = async(userId : string , balance : number)=>{
        const account = {
            userId : userId ,
            balance : balance ,
            transfered : 0 ,
            received : 0
        }
        try{
            await accountModel.create(account);
        }
        catch(e){
            if (e instanceof AppError) {
                throw e;
            }
            throw new AppError("some error while adding bank account",500);
        }
}

export const checkBalance = async(userId :string)=>{
    try{
        const account = await accountModel.findOne({userId : userId});
        if(!account)throw new AppError("account not found",404);
        return account.balance;
    }
    catch(e){
        throw new AppError("some error occured while fetching balance",500);
    }
}

export const transferAmount = async(userId : string , to : string , amount : number)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const fromUser = await accountModel.findOne({userId : userId}).session(session);

        if(!fromUser){
            await session.abortTransaction();
            throw new AppError("could not found your account",404);
        }

        if(fromUser.balance < amount){
            await session.abortTransaction();
            throw new AppError("insufficient balance",400);  
        }

        const toUser = await accountModel.findOne({userId : to}).session(session);

        if(!toUser){
            await session.abortTransaction();
            throw new AppError("could not found the account to transfer",404);
        }

        await accountModel.updateOne({userId},{$inc : { balance: -amount, transfered: amount }}).session(session);
        await accountModel.updateOne({userId : to},{$inc : { balance: amount, received: amount }}).session(session);

        await session.commitTransaction();
    }
    catch (e) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        if (e instanceof AppError) {
            throw e;
        }
        throw new AppError("Transfer failed due to a server error", 500);
    } finally {
        session.endSession();
    }
}