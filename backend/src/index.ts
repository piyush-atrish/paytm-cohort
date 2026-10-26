import express from "express";
import type { Request, Response, Application } from 'express'; 
import { connectDb } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";

const app : Application = express();
const PORT : number = 3000;

app.use(express.json());

app.use('/user' , userRouter);

const main = async()=>{
    try{
        await connectDb()
    }
    catch(e){
        console.log("error connecting to database");
        console.log(e);
    }
    app.listen(3000,()=>{
        console.log("server running at port 3000");
    });
}

main();

