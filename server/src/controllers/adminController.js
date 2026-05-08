const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
  return res.status(200).json({ users });
});

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [totalOrders, totalUsers, totalProducts, revenueResult, recentOrders, ordersByStatus, dailyOrders] =
    await Promise.all([
      Order.countDocuments(),
      User.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
          },
        },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(10).populate('userId', 'name email').lean(),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sevenDaysAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            orders: { $sum: 1 },
            revenue: { $sum: '$totalPrice' },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 },
        },
      ]),
    ]);

  const orderTrend = [];
  for (let i = 0; i < 7; i += 1) {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + i);

    const dayData = dailyOrders.find(
      (entry) =>
        entry._id.year === date.getFullYear() &&
        entry._id.month === date.getMonth() + 1 &&
        entry._id.day === date.getDate()
    );

    orderTrend.push({
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      orders: dayData?.orders || 0,
      revenue: Number((dayData?.revenue || 0).toFixed(2)),
    });
  }

  return res.status(200).json({
    analytics: {
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue: revenueResult[0]?.totalRevenue || 0,
      ordersByStatus,
      recentOrders,
      orderTrend,
    },
  });
});

module.exports = {
  getUsers,
  getDashboardAnalytics,
};
