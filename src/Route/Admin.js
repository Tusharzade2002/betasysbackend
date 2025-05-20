import express from 'express'
import {adminregister,adminlogin ,adminlogout} from '../Controller/Admin.js'
const router =express.Router();
router.post("/register",adminregister);
router.post("/login",adminlogin);
router.get("/logout",adminlogout);

export default router