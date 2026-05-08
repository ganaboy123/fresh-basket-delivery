const { body, query } = require('express-validator');

const checkoutValidator = [
  body('address.fullName').trim().notEmpty().withMessage('Full name is required'),
  body('address.street').trim().notEmpty().withMessage('Street is required'),
  body('address.city').trim().notEmpty().withMessage('City is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('paymentMethod')
    .isIn(['Cash on Delivery', 'MTN', 'AirtelTigo', 'Telecel'])
    .withMessage('Invalid payment method'),
];

const updateOrderStatusValidator = [
  body('status')
    .isIn(['Pending', 'Processing', 'Out for Delivery', 'Delivered'])
    .withMessage('Invalid order status'),
  body('note').optional().trim().isLength({ max: 300 }).withMessage('Note must be under 300 chars'),
];

const adminOrderQueryValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be 1-100'),
  query('status')
    .optional()
    .isIn(['all', 'Pending', 'Processing', 'Out for Delivery', 'Delivered'])
    .withMessage('Invalid status filter'),
  query('paymentMethod')
    .optional()
    .isIn(['all', 'Cash on Delivery', 'MTN', 'AirtelTigo', 'Telecel'])
    .withMessage('Invalid payment method filter'),
  query('search').optional().trim().isLength({ max: 120 }).withMessage('Search too long'),
  query('dateFrom').optional().isISO8601().withMessage('dateFrom must be a valid date'),
  query('dateTo').optional().isISO8601().withMessage('dateTo must be a valid date'),
  query('sort')
    .optional()
    .isIn(['newest', 'oldest', 'price_desc', 'price_asc'])
    .withMessage('Invalid sort option'),
];

module.exports = { checkoutValidator, updateOrderStatusValidator, adminOrderQueryValidator };
