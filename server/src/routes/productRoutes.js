const express = require('express');
const {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const { productValidator, productQueryValidator } = require('../validators/productValidators');

const router = express.Router();

router.get('/', productQueryValidator, validateRequest, listProducts);
router.get('/:id', getProductById);

router.post('/', protect, authorize('admin'), productValidator, validateRequest, createProduct);
router.put('/:id', protect, authorize('admin'), productValidator, validateRequest, updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;
