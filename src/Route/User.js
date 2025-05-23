import express from 'express'
import {userregister,userlogin,changepassword} from '../Controller/User.js'
const router=express.Router();
router.post("/register",userregister);
router.post("/login",userlogin);
router.post("/changepassword",changepassword)
export default router