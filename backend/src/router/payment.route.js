import { Router } from 'express';
import { createOrder } from '../controllers/payment.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', isLoggedIn, createOrder);

export default router;
 