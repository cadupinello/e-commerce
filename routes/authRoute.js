import express from 'express';
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js';

//middlewares
import validate from '../middlewares/handleValidations.js';
import { createUserValidator, loginValidator } from '../middlewares/userValidations.js';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

// forgot password
router.post('/forgot-password', forgotPasswordController);

//routing
router.post('/auth/register', createUserValidator(), validate, registerController);
router.post('/auth/login', loginValidator(), validate, loginController);

router.get('/user-auth', requireSignin, (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Usuário autenticado com sucesso!",
  });
} );

router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Administrador autenticado com sucesso!",
  });
});

export default router;