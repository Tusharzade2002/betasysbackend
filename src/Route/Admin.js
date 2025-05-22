import express from 'express'
import {adminregister,adminlogin ,changepassword,GetCurrentAdmin} from '../Controller/Admin.js'
const router =express.Router();
router.post("/register",adminregister);
router.post("/login",adminlogin);
router.post("/changepassword",changepassword);
router.get("/getcurrent",GetCurrentAdmin)

export default router