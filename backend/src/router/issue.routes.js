import { Router } from "express";
import { authorized, isLoggedIn } from "../middleware/auth.middleware.js";
import { createIssue, getALLIssues, updateIssue, updateStatus, delIssue, deleteIssueAdmin,getALLPrivateIssues } from '../controllers/issue.controller.js'


const router = Router()

router.post('/', isLoggedIn, createIssue)
router.get('/', isLoggedIn, getALLIssues)
router.get('/pissue', isLoggedIn, authorized('admin'),getALLPrivateIssues)
router.put('/:id', isLoggedIn, updateIssue)
router.put('/updateissue/:id/admin', isLoggedIn, authorized('admin'), updateStatus)
router.delete('/:id', isLoggedIn, delIssue)
router.delete('/deleteissue/:id/admin', isLoggedIn, authorized('admin'), deleteIssueAdmin)


export default router