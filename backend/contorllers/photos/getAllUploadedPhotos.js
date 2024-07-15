import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function getAllUploadedPhotos(req ,res){
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(req.user_id)
            }
        });
        if(!user)
        {
            return res.json({Api_Response : 316 , message  : "No such User"})
        }
        const photosArray = await prisma.photo.findMany({
            where : {
                authorId : parseInt(req.user_id)
            }
        });
        const photos = photosArray.map((photo)=>{
            return {
                photoId : photo.photoId,
                title : photo.title,
                photo_url : photo.photo_url,
                description : photo.description,
                category : photo.category,
                likes : photo.likes
            }
        })
        return res.json({photos : photos});
    } catch (error) {
        console.log(error);
        return res.json({Api_Response: 318 , message : "Error in the getAlluploadedPhotos backend"})
    }
}