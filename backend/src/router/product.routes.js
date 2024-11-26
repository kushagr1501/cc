import { Router } from "express";
import { authorized, isLoggedIn } from "../middleware/auth.middleware.js";
import { createProduct,getAllProducts, expressInterest,cancelInterest } from "../controllers/product.controller.js";



const router = Router()

router.post('/', isLoggedIn, createProduct)
router.post('/:productId', isLoggedIn, expressInterest);
router.delete('/:productId', isLoggedIn, cancelInterest);
// router.get('/:productId', isLoggedIn, getProductDetails);
router.get('/', getAllProducts)

export default router