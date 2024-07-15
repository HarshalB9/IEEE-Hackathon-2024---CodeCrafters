import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function saveAPhoto(req , res){
    try {
        const user_id = parseInt(req.user_id);
        let photo_id_provided = req.headers.photo_id;
        if(!photo_id_provided)
        {
            return res.json({Api_Response: 322 , message : "Provide the photoid to save"})
        }
        photo_id_provided = parseInt(photo_id_provided)
        const userObject = await prisma.user.findUnique({
            where  : {
                user_id : user_id
            }
        })
        if(!userObject)
        {
            return res.json({Api_Response : 320 , message : "The user does not exits"})
        }
        const photoObject = await prisma.photo.findUnique({where : {
            photoId : photo_id_provided
        }});
        if(!photoObject)
        {
            return res.json({Api_Response : 322 , message : "No such photo uploaded"})
        }
        const savedImages = userObject.saved;
        for( var i = 0 ;i<savedImages.length;i++)
        {
            if(savedImages[i]==photo_id_provided)
            {
                return res.json({Api_Response : 323, message : "Photo already saved"});
            }
        }
        const array = [photo_id_provided];
        const updateUser = await prisma.user.update({
            data :{
                saved : savedImages ? [...savedImages , photo_id_provided] :  array
            },
            where : {
                user_id : user_id
            }
        })
        return res.json({Api_Response : 321 , message : "The Photo is saved" , saved : true});
    } catch (error) {
        console.log(error);
        return res.json({Api_Response : 319 , message : "error in the save A Photo backend"})
    }

}