import express from 'express'
import { superadminregister,superadminlogin,changepassword ,GetCurrentSuperAdmin} from '../Controller/Superadmin.js';
const router =express.Router();
router.post("/register",superadminregister);
router.post("/login",superadminlogin);
router.post("/changepassword",changepassword);
router.get("/getcurrent",GetCurrentSuperAdmin)
export default router