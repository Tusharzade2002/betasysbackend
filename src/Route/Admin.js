import express from 'express'
import {adminregister,adminlogin ,changepassword} from '../Controller/Admin.js'
const router =express.Router();
router.post("/register",adminregister);
router.post("/login",adminlogin);
router.post("/changepassword",changepassword);

export default router