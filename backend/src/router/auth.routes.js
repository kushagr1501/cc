import { Router } from "express";
import { authorized, isLoggedIn } from "../middleware/auth.middleware.js";
import { Login, signUp ,Logout, getProfile,getAllProfile, updateAvatar} from "../controllers/auth.controller.js";
const router=Router()

router.post('/signup',signUp)
router.post('/login',Login)
router.get('/logout',Logout)
router.get('/profile', isLoggedIn,getProfile)
router.put('/avatarupload',updateAvatar)
router.get('/members', isLoggedIn,authorized('admin'),getAllProfile)

export default router