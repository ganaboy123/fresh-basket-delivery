const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6, max: 64 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const updateProfileValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 chars'),
  body('phone').optional().trim().isLength({ min: 6, max: 20 }).withMessage('Phone must be 6-20 chars'),
];

const addressValidator = [
  body('label').optional().trim().isLength({ min: 1, max: 40 }).withMessage('Label must be under 40 chars'),
  body('street').trim().notEmpty().withMessage('Street is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('state').optional().trim().isLength({ max: 80 }).withMessage('State too long'),
  body('country').optional().trim().isLength({ min: 2, max: 80 }).withMessage('Invalid country'),
  body('postalCode').optional().trim().isLength({ max: 20 }).withMessage('Invalid postal code'),
  body('phone').optional().trim().isLength({ min: 6, max: 20 }).withMessage('Invalid phone'),
  body('isDefault').optional().isBoolean().withMessage('isDefault must be true or false'),
];

module.exports = {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  addressValidator,
};
