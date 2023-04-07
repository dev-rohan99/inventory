import express from "express";
import { login, register, profileUpdate } from "../../controllers/user-controller/userController.js";
import { userAuthenticate } from "../../middlewares/auth/authMiddleware.js";
const router = express.Router();


// user router 
router.post("/register", register);
router.post("/login", login);
router.post("/profile-update/:id", userAuthenticate, profileUpdate);


export default router;
