import express from "express";
import { verifyToken } from "../utils/verifiyUser.js";
import { addExam, addQuestion, addSubject, deleteExam, deleteQuestion, deleteSubject, editQuestion, getAllExam, getAllSubjects, getQuestionsByExamName, updateAdmin } from "../controllers/admin.controller.js";

const router=express.Router();

router.post('/update/:id', verifyToken, updateAdmin)

router.post('/add/subject' ,addSubject)
router.get('/all/subject',getAllSubjects)
router.delete('/subject/:id', deleteSubject);

router.post('/add/exam', addExam);
router.get('/all/exam',getAllExam)
router.delete('/exam/:id', deleteExam);

router.post('/add/question', addQuestion);
router.get('/view/question/:examName', getQuestionsByExamName)
router.delete('/question/:id', deleteQuestion)
router.put('/editquestion/:id', editQuestion); 







export default router;