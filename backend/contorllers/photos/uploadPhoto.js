import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function uploadPhoto(req ,res){
    try {
        /* 
        req.body -> content , description , image url all are string
        req.user_id is also there
        so we need to create , photos for that user 
        whose user_id is 
        req.user_id and it will have the photo as provided photo
        */
       const user_id = req.user_id;
       const user = prisma.user.findUnique({where : {
        user_id : user_id
       }});
       if(!user)
       {
        return res.json({Api_Response : 317 , message : "No such user"});
       }
       const {category , description , imageUrl , title} = req.body;
       await prisma.photo.create({
        data:{
            category:category,
            description:description,
            photo_url:imageUrl,
            title,
            saved : [],
            authorId : parseInt(user_id)
        }
       });
       return res.json({message : "Photo added successfuly" , verified : true})
    } catch (error) {
        console.log(error);
        return res.json({Api_Response : 316 , message : "Error putting photo details in the url"});
    }
}