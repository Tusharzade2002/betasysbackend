import express from 'express'
import { superadminregister,superadminlogin,superadminlogout } from '../Controller/Superadmin.js';
const router =express.Router();
router.post("/register",superadminregister);
router.post("/login",superadminlogin);
router.post("/logout",superadminlogout);
export default router