import express from 'express'
import { getclientdata,postclientdata,updateclientdata } from '../Controller/Client.js';
const router =express.Router();
router.get("/getdata",getclientdata);
router.get("/postdata",postclientdata);
router.get("/updatedata",updateclientdata)
export default router