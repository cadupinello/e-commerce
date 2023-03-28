import express from 'express';

const router = express.Router();

import { requireSignin } from '../middlewares/authMiddleware.js';
import { payment } from '../controllers/PaymentController.js';

router.post("/payment", payment);

export default router;