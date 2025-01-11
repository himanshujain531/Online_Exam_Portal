import express from "express";
import { 
    studentDetails, 
    studentLogIn, 
    studentLogout, 
    studentRegister, 
    updateStudent 
} from "../controllers/student.controller.js";

const router = express.Router();

router.post('/register', studentRegister);
router.post('/login', studentLogIn);
router.get('/logout', studentLogout);

router.get('/details/:id', studentDetails); 
router.put('/update/:id', updateStudent);

export default router;
