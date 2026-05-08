const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { getSizePrice, calculateCartTotals } = require('../services/cartService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const cartPopulate = {
  path: 'items.product',
  select: 'name image price category slug isActive sizes',
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate(cartPopulate);
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
    cart = await cart.populate(cartPopulate);
  }
  return cart;
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  return res.status(200).json({ cart });
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, sizeLabel, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  const unitPrice = getSizePrice(product, sizeLabel);
  if (unitPrice === null) {
    throw new AppError('Invalid product size selected', 400);
  }

  const cart = await getOrCreateCart(req.user._id);

  const existing = cart.items.find(
    (item) => String(item.product._id || item.product) === productId && item.sizeLabel === sizeLabel
  );

  if (existing) {
    existing.quantity += quantity;
    existing.unitPrice = unitPrice;
    existing.subtotal = Number((existing.quantity * unitPrice).toFixed(2));
  } else {
    cart.items.push({
      product: product._id,
      sizeLabel,
      quantity,
      unitPrice,
      subtotal: Number((quantity * unitPrice).toFixed(2)),
    });
  }

  const totals = calculateCartTotals(cart.items);
  cart.totalPrice = totals.totalPrice;
  await cart.save();

  const refreshed = await Cart.findById(cart._id).populate(cartPopulate);
  return res.status(200).json({ message: 'Added to cart', cart: refreshed });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.id(itemId);

  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  item.quantity = quantity;
  item.subtotal = Number((item.quantity * item.unitPrice).toFixed(2));

  const totals = calculateCartTotals(cart.items);
  cart.totalPrice = totals.totalPrice;
  await cart.save();

  const refreshed = await Cart.findById(cart._id).populate(cartPopulate);
  return res.status(200).json({ message: 'Cart updated', cart: refreshed });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  const cart = await getOrCreateCart(req.user._id);

  const item = cart.items.id(itemId);
  if (!item) {
    throw new AppError('Cart item not found', 404);
  }

  item.deleteOne();

  const totals = calculateCartTotals(cart.items);
  cart.totalPrice = totals.totalPrice;
  await cart.save();

  const refreshed = await Cart.findById(cart._id).populate(cartPopulate);
  return res.status(200).json({ message: 'Item removed', cart: refreshed });
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  return res.status(200).json({ message: 'Cart cleared', cart });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
