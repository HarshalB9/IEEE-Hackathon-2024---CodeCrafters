import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;


async function dostuff(saved){
    const photo = await prisma.photo.findUnique({
        where: {
            photoId: saved
        }
    });
    const object = {
        photoId : photo.photoId,
        title : photo.title,
        photo_url : photo.photo_url,
        description : photo.description,
        category : photo.category,
        likes : photo.likes,

    }
    return object;
}

export default async function getAllSavedPhoto(req ,res){
    try {
        const user_id = parseInt(req.user_id);
        const userObject = await prisma.user.findUnique({where : {
            user_id : user_id
        }});
        if(!userObject)
        {
            return res.json({Api_Response : 316 , message  : "No such User"});
        }
        const savedPhotos = userObject.saved;
        let photos = []
        for(var i = 0 ;i < savedPhotos.length ;i++)
        {
            const photo = await dostuff(savedPhotos[i]);
            photos.push(photo);
        }
        // return res.json({savedPhotos , userObject})
        
        return res.json({photos})
    } catch (error) {
        console.log(error)
        return res.json({Api_Response : 324 , message : "Error in getAllsavedPhoto"})
    }
}