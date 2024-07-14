import { Router } from "express";
const router = Router();

import userRouter from "./user/userRoutes.js";

import photoRouter from "./photo/photoRouter.js";

router.use("/user",userRouter);

router.use("/photo" , photoRouter);

export default router;