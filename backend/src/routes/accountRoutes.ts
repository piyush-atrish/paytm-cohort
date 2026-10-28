import { Router } from "express";
import { userAuth } from "../middlewares/userAuth.js";
import type {NextFunction, Request , Response } from "express";
import { addAccount , checkDetails , transferAmount } from "../dao/accountDao.js";

export const accountRouter = Router();

accountRouter.use(userAuth);

accountRouter.post('/add-account' , async(req : Request , res : Response , next : NextFunction)=>{
    const balance = parseInt(req.body.balance);
    try{
        await addAccount(req.userId!,balance);
        res.status(200).json({
            message : "bank account added!",
        })
    }
    catch(e){
        next(e);
    }
});

accountRouter.get('/details', async(req : Request , res : Response , next : NextFunction)=>{
    try{
        const details = await checkDetails(req.userId!);
        res.status(200).json(details);
    }
    catch(e){
        next(e);
    }
});

accountRouter.post('/transfer' , async(req : Request , res : Response , next : NextFunction)=>{
    const {to , amount} = req.body;
    try{
        await transferAmount(req.userId! , to , parseInt(amount));
        res.status(200).json({
            message : "money transfered successfully"
        })
    }
    catch(e){
        next(e);
    }
})