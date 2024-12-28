import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { studentLogIn, studentRegister } from "../controllers/student.controller,.js";

const router=express.Router();

router.post('/register', studentRegister);
router.post('/login', studentLogIn)

export default router;