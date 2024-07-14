import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import initUser from "../../middleware/zod_verification.js";

import jwt from "jsonwebtoken"
import env from "dotenv";
import tokenVerify from "../../middleware/token_verification.js";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async  function me(req ,res){
    {
        console.log("/me route hitted")
        const token = req.headers.token;
        try {
            const result = jwt.verify(token , SECRET);
            const userObject = await prisma.user.findUnique({
                where:{
                    user_id : parseInt(result)
                }
            });
            if(!userObject)
            {
                return res.json({Api_Response : 310,message : "No such user , wrong token"});

            }
            const object = {
                user_id : userObject.user_id,
                email : userObject.email,
                name : userObject.name,
            }
            return res.json({user:object});
        } catch (error) {
            return res.json({message : "incorrect token"})
        }
    }
}