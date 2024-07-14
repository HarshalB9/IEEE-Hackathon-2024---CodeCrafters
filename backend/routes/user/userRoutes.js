import { Router } from "express";
import initUserLogin from "../../middleware/zod_verification.js";
import {login} from "../../contorllers/user/loginController.js";
import { initUserSignup } from "../../middleware/zod_verification.js";
import tokenVerify from "../../middleware/token_verification.js";
import me from "../../contorllers/user/meController.js";
import { changePassword, forgotPassword  , verifyOtp} from "../../contorllers/user/forgotPassword.js";
import signup from "../../contorllers/user/signupController.js";
const router = Router();

router.post("/login", initUserLogin,login);
router.post("/signup",initUserSignup , signup);
router.get("/me",tokenVerify,me);
router.post("/forgotPassword",forgotPassword);
router.post("/verifyOTP" , verifyOtp);
router.post("/changePassword",changePassword);
export default router;