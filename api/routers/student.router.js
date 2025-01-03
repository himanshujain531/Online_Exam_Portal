import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { studentLogIn, studentLogout, studentRegister } from "../controllers/student.controller,.js";

const router=express.Router();

router.post('/register', studentRegister);
router.post('/login', studentLogIn)
router.get('/logout',studentLogout)

export default router;