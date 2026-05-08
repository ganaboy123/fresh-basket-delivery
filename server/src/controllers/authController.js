const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  addresses: user.addresses,
  createdAt: user.createdAt,
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new AppError('Email already exists', 409);
  }

  const user = await User.create({ name, email, password });
  const token = signToken({ id: user._id, role: user.role });

  return res.status(201).json({
    message: 'Registration successful',
    token,
    user: sanitizeUser(user),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken({ id: user._id, role: user.role });

  return res.status(200).json({
    message: 'Login successful',
    token,
    user: sanitizeUser(user),
  });
});

const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({ user: sanitizeUser(req.user) });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;

  await user.save();

  return res.status(200).json({
    message: 'Profile updated',
    user: sanitizeUser(user),
  });
});

const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const incomingAddress = req.body;

  if (incomingAddress.isDefault) {
    user.addresses = user.addresses.map((address) => ({
      ...address.toObject(),
      isDefault: false,
    }));
  }

  if (user.addresses.length === 0) {
    incomingAddress.isDefault = true;
  }

  user.addresses.push(incomingAddress);
  await user.save();

  return res.status(201).json({
    message: 'Address added',
    addresses: user.addresses,
  });
});

const setDefaultAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  let found = false;
  user.addresses = user.addresses.map((address) => {
    const isDefault = String(address._id) === addressId;
    if (isDefault) found = true;
    return { ...address.toObject(), isDefault };
  });

  if (!found) {
    throw new AppError('Address not found', 404);
  }

  await user.save();

  return res.status(200).json({
    message: 'Default address updated',
    addresses: user.addresses,
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  addAddress,
  setDefaultAddress,
};
