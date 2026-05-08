const Cart = require('../models/Cart');
const Order = require('../models/Order');
const config = require('../config/env');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { emitOrderCreated, emitOrderStatusUpdated } = require('../socket/socketServer');

const allowedTransitions = {
  Pending: ['Processing'],
  Processing: ['Out for Delivery'],
  'Out for Delivery': ['Delivered'],
  Delivered: [],
};

const parsePositiveInt = (value, fallback) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : fallback;
};

const buildPaymentDetails = (paymentMethod) => {
  if (paymentMethod === 'Cash on Delivery') {
    return {
      paymentStatus: 'pending',
      paymentReference: undefined,
      paymentConfirmedAt: undefined,
    };
  }

  return {
    paymentStatus: 'confirmed',
    paymentReference: `${paymentMethod.toUpperCase()}-${Date.now()}`,
    paymentConfirmedAt: new Date(),
  };
};

const createOrderFromCart = asyncHandler(async (req, res) => {
  const { address, phone, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name image isActive');
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  const products = cart.items.map((item) => ({
    productId: item.product._id,
    productName: item.product.name,
    productImage: item.product.image,
    sizeLabel: item.sizeLabel,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
    subtotal: item.subtotal,
  }));

  const payment = buildPaymentDetails(paymentMethod);

  const order = await Order.create({
    userId: req.user._id,
    products,
    totalPrice: cart.totalPrice,
    address,
    phone,
    paymentMethod,
    ...payment,
    statusHistory: [{ status: 'Pending', changedAt: new Date(), note: 'Order placed successfully' }],
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();
  emitOrderCreated(order);

  return res.status(201).json({
    message: 'Order placed successfully',
    order,
  });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();
  return res.status(200).json({ orders });
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('userId', 'name email').lean();

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  const isOwner = String(order.userId._id) === String(req.user._id);
  if (!isOwner && req.user.role !== 'admin') {
    throw new AppError('Not authorized to view this order', 403);
  }

  return res.status(200).json({ order });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const page = parsePositiveInt(req.query.page, 1);
  const requestedLimit = parsePositiveInt(req.query.limit, 20);
  const limit = Math.min(requestedLimit, config.maxPageLimit);
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.status && req.query.status !== 'all') {
    query.status = req.query.status;
  }

  if (req.query.paymentMethod && req.query.paymentMethod !== 'all') {
    query.paymentMethod = req.query.paymentMethod;
  }

  if (req.query.dateFrom || req.query.dateTo) {
    query.createdAt = {};
    if (req.query.dateFrom) {
      query.createdAt.$gte = new Date(req.query.dateFrom);
    }
    if (req.query.dateTo) {
      const endDate = new Date(req.query.dateTo);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endDate;
    }
  }

  if (req.query.search) {
    const regex = new RegExp(req.query.search.trim(), 'i');
    const matchedUsers = await Order.find(query)
      .populate({
        path: 'userId',
        select: '_id name email',
        match: { $or: [{ name: regex }, { email: regex }] },
      })
      .select('_id userId')
      .lean();

    const userOrderIds = matchedUsers.filter((item) => item.userId).map((item) => item._id);
    query._id = { $in: userOrderIds.length ? userOrderIds : [] };
  }

  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    price_desc: { totalPrice: -1, createdAt: -1 },
    price_asc: { totalPrice: 1, createdAt: -1 },
  };

  const sort = sortMap[req.query.sort] || sortMap.newest;

  const [orders, totalItems] = await Promise.all([
    Order.find(query)
      .populate('userId', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Order.countDocuments(query),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return res.status(200).json({
    orders,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  const allowedNext = allowedTransitions[order.status] || [];
  if (!allowedNext.includes(status)) {
    throw new AppError(`Invalid status transition from ${order.status} to ${status}`, 400);
  }

  order.status = status;
  order.statusHistory.push({
    status,
    changedAt: new Date(),
    note: note || `Status changed to ${status}`,
  });

  await order.save();
  emitOrderStatusUpdated(order);

  return res.status(200).json({
    message: 'Order status updated',
    order,
  });
});

module.exports = {
  createOrderFromCart,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
