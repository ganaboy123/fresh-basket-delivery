const { body } = require('express-validator');

const addCartItemValidator = [
  body('productId').isMongoId().withMessage('Valid productId is required'),
  body('sizeLabel').trim().notEmpty().withMessage('sizeLabel is required'),
  body('quantity').isInt({ min: 1, max: 100 }).withMessage('quantity must be between 1 and 100'),
];

const updateCartItemValidator = [
  body('quantity').isInt({ min: 1, max: 100 }).withMessage('quantity must be between 1 and 100'),
];

module.exports = { addCartItemValidator, updateCartItemValidator };
