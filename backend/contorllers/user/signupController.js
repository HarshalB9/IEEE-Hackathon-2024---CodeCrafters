import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();


import jwt from "jsonwebtoken"
import env from "dotenv";

import prisma from "../../db/prismaExport.js";

env.config();
const SECRET = process.env.SECRETS;
export default async function signup( req , res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
        try 
        {
            // const result = await db.query("SELECT * FROM users_real WHERE user_id = $1" , [email]);
            const user = await prisma.user.findUnique({
                where: {email: email}
            })
            console.log("after result")
            if(user)
            {
                return res.json({Api_Response : 302 , message : "Email already exits"});
            }
            const hashedPassword = await bcrypt.hash(password , saltRounds);
            const userCreated = await prisma.user.create({
                data : {
                    email : email,
                    password : hashedPassword,
                    name  : name
                }
            });
            // return res.json({created_user  : userCreated});
            const string = userCreated.user_id;
            const token = jwt.sign( string, SECRET);    
            return res.json({user_id : userCreated.user_id , token :token});
        } catch (error) 
        {
           console.log("error in verify");
           console.log(error);
           return  res.json({Api_Response : 304 , message : "Error in signup backend"})
           
        }
        
}