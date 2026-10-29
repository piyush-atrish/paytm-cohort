import { Router} from "express";
import type {NextFunction, Request , Response } from "express";
import { credSchema , updateCredSchema } from "../validator/auth.validator.js";
import { createUser , userSignin , updateUser ,getUsers , getData} from "../dao/userDao.js";
import { createToken } from "../utils/jwt.utils.js";
import {userAuth} from "../middlewares/userAuth.js"

export const userRouter : Router = Router();

userRouter.post('/signup' , async(req : Request , res : Response , next : NextFunction) => {
    const {email , password , firstName , lastName , phone} = req.body;
    try{
        const response = credSchema.safeParse({
            email:email,
            password :password,
            firstName :firstName,
            lastName :lastName,
            phone : phone
        });

        if(!response.success){
            console.log(response.error.issues.map(issue => issue.message));
            res.status(401).json({
                message:"provide proper creds"
            });
        }

        await createUser(email,password,firstName,lastName,phone);

        res.json({
            message : "you are signed up!"
        });

    }
    catch(e){
        next(e);
    }

});

userRouter.post('/signin' , async(req : Request , res : Response , next : NextFunction) => {
    const {phone , password} = req.body;
    try{
        const id : string = await userSignin(phone,password);
        const jwtKey : string|undefined = process.env.JWT_USER;
        if(!jwtKey)throw new Error("missing jwt key");
        const token = createToken(id,jwtKey);
        res.cookie("token", token, {
            httpOnly: true,  
            secure: false,  
            maxAge: 3600000
        });
        res.status(200).json({
            message : "you have signed in"
        })
    }
    catch(e){
        next(e);
    }
});

userRouter.use(userAuth);

userRouter.patch('/update-profile' , async(req : Request , res : Response , next : NextFunction) => {
    const response = updateCredSchema.safeParse(req.body);
    if(!response.success){
        console.log(response.error.issues.map(issue => issue.message));
        return res.json({
            message : "provide proper credentials"
        });
    }
    try{
        await updateUser(req.userId!,req.body);
        res.status(200).json({
            message : "updated credentials"
        });
    }
    catch(e){
        next(e);
    }
});

userRouter.get('/bulk' , async(req : Request , res : Response , next : NextFunction)=>{
    const filter = typeof req.query.filter === 'string' ? req.query.filter : "";
    try{
        const users = await getUsers(filter);
        res.status(200).json(users);
    }
    catch(e){
        next(e);
    }
});

userRouter.get('/data' , async(req : Request , res : Response , next : NextFunction)=>{
    const userId = req.userId;
    try{
        const data = await getData(userId!);
        res.status(200).json(data);
    }
    catch(e){
        next(e);
    }
});

userRouter.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,  
            secure: false    
        });
        
        res.status(200).json({
            message: "You have been logged out successfully"
        });
    }
    catch (e) {
        next(e);
    }
});