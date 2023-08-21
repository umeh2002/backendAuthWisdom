import express, { Router } from "express";
import { upload } from "../config/multer";
import { register, signin, view } from "../controller/authController";
const router = express.Router();
router.route("/register").post(upload, register);
router.route("/signin").post(signin);
router.route("/view").post(view);

export default router;
