const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  addAddress,
  setDefaultAddress,
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const {
  registerValidator,
  loginValidator,
  updateProfileValidator,
  addressValidator,
} = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/me', protect, getProfile);
router.patch('/profile', protect, updateProfileValidator, validateRequest, updateProfile);
router.post('/addresses', protect, addressValidator, validateRequest, addAddress);
router.patch('/addresses/:addressId/default', protect, setDefaultAddress);

module.exports = router;
