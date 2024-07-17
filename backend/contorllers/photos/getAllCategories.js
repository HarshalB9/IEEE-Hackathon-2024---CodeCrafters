import express from "express";
import bcrypt from "bcrypt"
const saltRounds = 10;
const router = express.Router();
import jwt from "jsonwebtoken"
import env from "dotenv";
import prisma from "../../db/prismaExport.js";
env.config();
const SECRET = process.env.SECRETS;

export default async function getAllCategories(req , res){
    try {
        const photosArray = await prisma.photo.findMany({});
        const photos = photosArray.map((photo)=>{
            return {
                category : photo.category,
            }
        });
        let myMap = new Map();
        let p = []
        for(var i = 0 ;i<photos.length ;i++)
        {
            if(myMap.has(photos[i].category))
            {

            }else{
                p.push(photos[i].category);
                myMap.set(photos[i].category , true);
            }
        }
        return res.json({categories : p});

    } catch (error) {
        console.log(error);
        return res.json({Api_Response : 325 , message : "Error In get Photos by category"});
    }
}