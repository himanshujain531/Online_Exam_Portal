import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { addSubject, deleteSubject, getAllSubjects, updateAdmin } from "../controllers/admin.controller.js";

const router=express.Router();

router.post('/update/:id', verifyToken, updateAdmin)
router.post('/add/subject' ,addSubject)
router.get('/all/subject',getAllSubjects)
router.delete('/subject/:id', deleteSubject);





export default router;