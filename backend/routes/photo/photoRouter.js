import { Router } from "express";
import tokenVerify from "../../middleware/token_verification.js";
import uploadPhoto from "../../contorllers/photos/uploadPhoto.js";
import getAllPhotosUnprotected from "../../contorllers/photos/getAllPhotosUnprotected.js";
import getAllUploadedPhotos from "../../contorllers/photos/getAllUploadedPhotos.js";
import saveAPhoto from "../../contorllers/photos/saveAPhoto.js";
import getAllSavedPhoto from "../../contorllers/photos/getAllSavedPhoto.js";
import getPhotosByCategory from "../../contorllers/photos/getPhotosByCategory.js";
const router = Router();

router.get("/photos" , (req ,res)=>{
    return res.json({message : "This is photos router"})
})

router.post("/upload-photo" , tokenVerify , uploadPhoto);
router.get("/getAllPhotosUnprotected" , getAllPhotosUnprotected);
router.get("/getAllUploadedPhotos" , tokenVerify , getAllUploadedPhotos);
router.post("/saveAPhoto" , tokenVerify , saveAPhoto);
router.get("/getAllSavedPhoto" , tokenVerify , getAllSavedPhoto);
router.get("/getPhotosByCategory", getPhotosByCategory);
export default router;