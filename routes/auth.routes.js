import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  adminLoggIn,
  adminRegister,
  userLoggIn,
  userRegister,
} from "../controllers/auth.controller.js";

const router = express.Router();

//user auth routes
router.post("/user/register",  upload.single("profilePicture"),userRegister);
router.post("/user/login", userLoggIn);
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLoggIn);

export default router;
