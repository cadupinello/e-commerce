import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import {
  createProduct,
  getProducts,
  getSingleProducts,
  getProductPhoto,
  deleteProduct,
  updateProduct,
  productFiltersController,
  productCountController,
  productListController,
  productSearchController,
  realtedProductController,
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
router.post('/create-product', requireSignin, isAdmin, createProduct)

router.get('/get-products', getProducts)
router.get('/get-product/:slug', getSingleProducts)
router.get('/product-photo/:pid', getProductPhoto)
router.delete('/delete-product/:pid', deleteProduct)
router.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProduct)
router.post('/product-filters', productFiltersController)
router.get('/product-count', productCountController)
router.get('/product-list/:page', productListController)
router.get('/search', productSearchController)
router.get('/related-products/:pid/:cid', realtedProductController)

export default router;