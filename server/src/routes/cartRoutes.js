const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { addCartItemValidator, updateCartItemValidator } = require('../validators/cartValidators');

const router = express.Router();

router.use(protect);

router.get('/', getCart);
router.post('/items', addCartItemValidator, validateRequest, addToCart);
router.patch('/items/:itemId', updateCartItemValidator, validateRequest, updateCartItem);
router.delete('/items/:itemId', removeCartItem);
router.delete('/', clearCart);

module.exports = router;
