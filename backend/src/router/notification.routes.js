import { Router } from "express";
import { authorized, isLoggedIn } from "../middleware/auth.middleware.js";

import {getNotifications,markNotificationAsRead} from '../controllers/notification.controller.js'

const router = Router()
router.get('/',isLoggedIn,getNotifications)
router.put('/:id', isLoggedIn, markNotificationAsRead);

export default router