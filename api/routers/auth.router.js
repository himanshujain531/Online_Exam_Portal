import express from "express";
import {  signin, signout, signup } from "../controllers/auth.controller.js";

const router=express.Router();

router.post('/signup', signup) // use student create account
router.post('/signin', signin)
router.get('/signout', signout)



export default router;