import { Router } from "express";
import { authorized, isLoggedIn } from "../middleware/auth.middleware.js";
import {createBill, getALLBills,update} from '../controllers/bill.controller.js'
const router=Router()

router.post('/',isLoggedIn,authorized('admin'),createBill)
router.put('/update',isLoggedIn,update)

router.get('/:userId',isLoggedIn,getALLBills)

export default router