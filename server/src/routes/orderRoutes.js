const express = require('express');
const {
  createOrderFromCart,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const {
  checkoutValidator,
  updateOrderStatusValidator,
  adminOrderQueryValidator,
} = require('../validators/orderValidators');

const router = express.Router();

router.use(protect);

router.post('/', checkoutValidator, validateRequest, createOrderFromCart);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.get('/', authorize('admin'), adminOrderQueryValidator, validateRequest, getAllOrders);
router.patch('/:id/status', authorize('admin'), updateOrderStatusValidator, validateRequest, updateOrderStatus);

module.exports = router;
