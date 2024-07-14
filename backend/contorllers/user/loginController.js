import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();

import jwt from "jsonwebtoken"
import env from "dotenv";

env.config();
const SECRET = process.env.SECRETS;

import prisma from "../../db/prismaExport.js";

export async function login(req ,res){
    const email = req.body.email;
    const password = req.body.password;
        try 
        {
            // const result = await db.query("SELECT * FROM users_real WHERE user_id = $1" , [email]);
            const user = await prisma.user.findUnique({
                where: {email: email}
            })
            console.log("after result")
            if(!user)
            {
                return res.json({Api_Response : 302 , message : "Email not found"});
            }
            bcrypt.compare(password , user.password , (err , same)=>{
                if(err){
                    // return cb(err,false)
                    return res.json({Api_Response : 303 , message : "No such password"})
                }
                else{
                    if(same){
                        console.log("same password")
                        console.log(typeof user.user_id)
                        // return cb(null , user);
                        const string = user.user_id;
                        const token = jwt.sign( string, SECRET);    
                        return res.json({user_id : user.user_id , token :token});

                    }
                    else{
                        console.log("password is not same")
                        // return cb(null , {message : "incorrect password"})
                        return res.json({Api_Response : 303 , message : "No such password"})
                    }
                }
            })
        } catch (error) 
        {
           console.log("error in verify")
           return  res.json({Api_Response : 304 , message : "Error in login backend"})
           
        }
        
}

