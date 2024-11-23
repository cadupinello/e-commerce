import { body } from 'express-validator';

export const createUserValidator = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Nome é obrigatório!')
      .isLength({ min: 3 })
      .withMessage('Nome deve ter no mínimo 3 caracteres!'),
    body('email')
      .notEmpty()
      .withMessage('Email é obrigatório!')
      .isEmail()
      .withMessage('Email inválido!'),
    body('password')
      .isString()
      .withMessage('Senha deve ter carecteres!')
      .notEmpty()
      .withMessage('Senha é obrigatório!')
      .isLength({ min: 6 })
      .withMessage('Senha deve ter no mínimo 6 caracteres!'),    
    body('address')
      .notEmpty()
      .withMessage('Endereço é obrigatório!')
      .isLength({ min: 3 })
      .withMessage('Endereço deve ter no mínimo 3 caracteres!'),
  ];
};

export const loginValidator = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email é obrigatório!')
      .isEmail()
      .withMessage('Email inválido!'),
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatório!')
  ];
}