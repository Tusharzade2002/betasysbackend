import express from 'express'
import {userregister,userlogin,changepassword,GetCurrentUser} from '../Controller/User.js'
const router=express.Router();
router.post("/register",userregister);
router.post("/login",userlogin);
router.post("/changepassword",changepassword)
router.get("/getdata",GetCurrentUser)
export default router