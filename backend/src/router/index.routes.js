import { Router } from 'express';
import authRoutes from '../router/auth.routes.js';
import issueRoutes from '../router/issue.routes.js';
import productRoutes from '../router/product.routes.js';
import notificationRoutes from '../router/notification.routes.js';
import billRoutes from '../router/bill.routes.js';
import payRoutes from '../router/payment.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/issues', issueRoutes);
router.use('/products', productRoutes);
router.use('/notifications', notificationRoutes);
router.use('/bills', billRoutes);
router.use('/payment', payRoutes); 

export default router;
