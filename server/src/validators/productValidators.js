const { body, query } = require('express-validator');

const productValidator = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('category')
    .isIn(['palm-oil', 'coconut-oil', 'gari'])
    .withMessage('Category must be palm-oil, coconut-oil, or gari'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('image').trim().notEmpty().withMessage('Image URL is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('sizes').isArray({ min: 1 }).withMessage('At least one size is required'),
  body('sizes.*.label').trim().notEmpty().withMessage('Size label is required'),
  body('sizes.*.priceModifier')
    .optional()
    .isFloat({ min: -100000, max: 100000 })
    .withMessage('Size priceModifier must be a number'),
  body('sizes.*.stock').optional().isInt({ min: 0 }).withMessage('Size stock must be >= 0'),
];

const productQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('category')
    .optional()
    .isIn(['all', 'palm-oil', 'coconut-oil', 'gari'])
    .withMessage('Invalid category filter'),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('minPrice must be >= 0'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('maxPrice must be >= 0'),
  query('sort')
    .optional()
    .isIn(['newest', 'oldest', 'price_asc', 'price_desc', 'name_asc', 'name_desc'])
    .withMessage('Invalid sort value'),
];

module.exports = { productValidator, productQueryValidator };
