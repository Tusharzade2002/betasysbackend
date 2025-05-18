import express from 'express'
import {admindata,adminlogin ,adminlogout} from '../Controller/Admin.js'
const router =express.Router();
router.get("/register",admindata);
router.get("/login",adminlogin);
router.get("/logout",adminlogout);
export default router