import express from "express";
import multer from "multer";
import path from 'path';
import { studentDetails, studentLogIn, studentLogout, studentRegister, updateStudent } from "../controllers/student.controller,.js";

const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage }); 


router.post('/register', studentRegister);
router.post('/login', studentLogIn)
router.get('/logout',studentLogout)

router.get('/details/:id', studentDetails); 
router.put('/update/:id',  upload.single('photo'), updateStudent); 

export default router;