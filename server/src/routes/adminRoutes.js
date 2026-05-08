const express = require('express');
const { getUsers, getDashboardAnalytics } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.get('/analytics', getDashboardAnalytics);

module.exports = router;
