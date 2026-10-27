import { Router} from "express";
import type {Request , Response } from "express";
import { credSchema } from "../validator/auth.validator.js";
import { createUser , userSignin } from "../dao/userDao.js";


export const userRouter : Router = Router();

userRouter.post('/signup' , async(req : Request , res : Response) => {
    const {email , password , firstName , lastName , phone} = req.body;
    const response = credSchema.safeParse({
        email:email,
        password :password,
        firstName :firstName,
        lastName :lastName,
        phone : phone
    });

    if(!response.success){
        console.log(response.error.issues.map(issue => issue.message));
        return res.json({
            message : "provide proper credentials"
        })
    }

    try{
        await createUser(email,password,firstName,lastName,phone);

        res.json({
            message : "you are signed up!"
        });

    }
    catch(e){
        console.log(e);
        return res.status(403).json({
            message: "some error occured while singning up!"
        });
    }

});

userRouter.post('/signin' , async(req : Request , res : Response) => {
    const {phone , password} = req.body;
    try{
        await userSignin(phone,password);
        
        res.status(200).json({
            message : "you have signed in"
        })
    }
    catch(e){
        console.log(e);
        res.status(401).json({
            message:"incorrect phone or password"
        });
    }
});

userRouter.patch('/update-profile' , (req : Request , res : Response) => {

});
