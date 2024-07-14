import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const router = express.Router();

import prisma from "./db/prismaExport.js";

import routerAPI from "./routes/index.js"

app.get("/" , (req , res)=>{
    console.log("everything working properly")
    res.send("everything good")
})




app.use("/api" , routerAPI);


app.listen(3000 , ()=>{
    console.log("server started on port 3000");
})


