import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { addExam, addSubject, deleteExam, deleteSubject, getAllExam, getAllSubjects, updateAdmin } from "../controllers/admin.controller.js";

const router=express.Router();

router.post('/update/:id', verifyToken, updateAdmin)

router.post('/add/subject' ,addSubject)
router.get('/all/subject',getAllSubjects)
router.delete('/subject/:id', deleteSubject);

router.post('/add/exam', addExam);
router.get('/all/exam',getAllExam)
router.delete('/exam/:id', deleteExam);






export default router;