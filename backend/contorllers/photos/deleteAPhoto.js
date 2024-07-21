import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();

export default async function deletePhoto(req ,res){
    try {
        console.log("save a photo route hit");
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
        await prisma.photo.delete({
            where: {
                photoId: photo_id_provided
            }
        });
        const users = await prisma.user.findMany({
            where: {
                saved: {
                    has: photo_id_provided,
                },
            },
        });

        // For each user, remove the photoId from their saved array
        const updatePromises = users.map(user =>
            prisma.user.update({
                where: {
                    user_id: user.user_id,
                },
                data: {
                    saved: {
                        set: user.saved.filter(id => id !== photo_id_provided),
                    },
                },
            })
        );

        // Execute all update operations
        await Promise.all(updatePromises);
        return res.json({Api_Response : 321 , message : "The Photo is deleted" , deleted : true});
    } catch (error) {
        console.log(error);
        return res.json({Api_Response : 319 , message : "error in the save A Photo backend"})
    }
}