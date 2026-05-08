const Product = require('../models/Product');
const config = require('../config/env');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const toSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const parsePositiveInt = (value, fallback) => {
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : fallback;
};

const parsePrice = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const listProducts = asyncHandler(async (req, res) => {
  const page = parsePositiveInt(req.query.page, 1);
  const requestedLimit = parsePositiveInt(req.query.limit, config.defaultPageLimit);
  const limit = Math.min(requestedLimit, config.maxPageLimit);
  const skip = (page - 1) * limit;

  const minPrice = parsePrice(req.query.minPrice);
  const maxPrice = parsePrice(req.query.maxPrice);
  if (minPrice === null || maxPrice === null) {
    throw new AppError('minPrice and maxPrice must be non-negative numbers', 400);
  }
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new AppError('minPrice cannot be greater than maxPrice', 400);
  }

  const query = { isActive: true };

  if (req.query.category && req.query.category !== 'all') {
    query.category = req.query.category;
  }

  if (req.query.search) {
    query.$text = { $search: String(req.query.search).trim() };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  const sortMap = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    price_asc: { price: 1, createdAt: -1 },
    price_desc: { price: -1, createdAt: -1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
  };
  const sort = sortMap[req.query.sort] || sortMap.newest;

  const [products, totalItems] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('name slug category price image description sizes stock createdAt')
      .lean(),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return res.status(200).json({
    products,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    filters: {
      category: req.query.category || 'all',
      search: req.query.search || '',
      minPrice,
      maxPrice,
      sort: req.query.sort || 'newest',
    },
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).lean();

  if (!product || !product.isActive) {
    throw new AppError('Product not found', 404);
  }

  return res.status(200).json({ product });
});

const createProduct = asyncHandler(async (req, res) => {
  const payload = req.body;
  const baseSlug = payload.slug ? toSlug(payload.slug) : toSlug(payload.name);

  let slug = baseSlug;
  let counter = 1;
  while (await Product.findOne({ slug }).lean()) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const product = await Product.create({ ...payload, slug });

  return res.status(201).json({
    message: 'Product created',
    product,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const payload = req.body;
  if (payload.name && !payload.slug) {
    payload.slug = toSlug(payload.name);
  }

  Object.assign(product, payload);
  await product.save();

  return res.status(200).json({
    message: 'Product updated',
    product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  product.isActive = false;
  await product.save();

  return res.status(200).json({ message: 'Product removed successfully' });
});

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
