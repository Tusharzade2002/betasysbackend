import express from 'express'
import {adminregister,adminlogin ,changepassword,GetCurrentAdmin} from '../Controller/Admin.js'
import {addprojects, getProjects} from '../Controller/projects.js'
import {verifysuperadmintoken} from '../Middleware/jwttokenAdmin.js'
import {getalltasks, Asigntasks} from "../Controller/tasks.js"
const router =express.Router();
router.post("/register",adminregister);
router.post("/login",adminlogin);
router.post("/changepassword",verifysuperadmintoken,changepassword);
router.get("/getcurrent",GetCurrentAdmin)




router.post("/create-project",addprojects)
router.post("/asign-task",Asigntasks)
router.get('/allproject', getProjects)

export default router