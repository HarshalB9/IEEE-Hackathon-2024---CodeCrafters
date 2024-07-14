import { Router } from "express";
import tokenVerify from "../../middleware/token_verification.js";
import uploadPhoto from "../../contorllers/photos/uploadPhoto.js";
const router = Router();

router.get("/photos" , (req ,res)=>{
    return res.json({message : "This is photos router"})
})

router.post("/upload-photo" , tokenVerify , uploadPhoto);
export default router;