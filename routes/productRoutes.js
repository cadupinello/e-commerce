import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createProduct, getProducts, getSingleProducts, getProductPhoto, deleteProduct, updateProduct } from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
router.post('/create-product', requireSignin, isAdmin, formidable(), createProduct )

router.get('/get-products', getProducts)
router.get('/get-product/:slug', getSingleProducts)
router.get('/product-photo/:pid', getProductPhoto)
router.delete('/delete-product/:pid', deleteProduct)
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProduct)

export default router;