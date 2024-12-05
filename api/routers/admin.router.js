import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { updateAdmin } from "../controllers/admin.controller.js";

const router=express.Router();

router.post('/update/:id', verifyToken, updateAdmin)



export default router;