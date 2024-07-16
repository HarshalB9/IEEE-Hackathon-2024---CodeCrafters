import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function getPhotosByCategory(req , res){
    try {
        const category = req.headers.category;
        if(!category)
        {
            return res.json({Api_Response : 326 , message : "No category provided"});
        }

        const photosArray = await prisma.photo.findMany({
            where : {
                category : category
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
        return res.json({Api_Response : 325 , message : "Error In get Photos by category"});
    }
}