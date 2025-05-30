import express from 'express'
import {adminregister,adminlogin ,changepassword,GetCurrentAdmin} from '../Controller/Admin.js'
import {addprojects, getProjects} from '../Controller/projects.js'
import {verifysuperadmintoken} from '../Middleware/jwttokenAdmin.js'
import {CreateMember,getallMembers,DeleteMember} from '../Controller/Member.js'
import { Asigntasks,getalltasks} from "../Controller/tasks.js"
const router =express.Router();
router.post("/register",adminregister);
router.post("/login",adminlogin);
router.post("/changepassword",verifysuperadmintoken,changepassword);
router.get("/getcurrent",GetCurrentAdmin)




router.post("/create-project",verifysuperadmintoken,addprojects)
router.post("/asign-task",verifysuperadmintoken,Asigntasks)
router.get('/allproject', getProjects)
router.get("/alltasks",getalltasks)
router.post("/create-member",CreateMember)
router.get("/getmembers",getallMembers)
router.delete("/deletemember/:id",DeleteMember)

export default router