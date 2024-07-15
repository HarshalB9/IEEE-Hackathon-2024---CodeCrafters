import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function getAllPhotosUnprotected(req ,res){
    try {
        const photosArray = await prisma.photo.findMany()
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
        return res.json({photos : photos})
    } catch (error) {
        return res.json({Api_Response: 315 , message : "Message in getting all photos" })
    }
}