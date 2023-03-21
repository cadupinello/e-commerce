import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createCategory, updateCategory, getCategories, singleCategory, deleteCategory } from '../controllers/CategoryController.js';

const router = express.Router();

// router
router.post('/create-category', requireSignin, isAdmin, createCategory)
router.put('/update-category/:id', requireSignin, isAdmin, updateCategory)
router.get('/get-categories', getCategories)
router.get('/single-category/:slug', singleCategory)
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategory)
export default router;