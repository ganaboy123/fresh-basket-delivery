const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true, trim: true },
    productImage: { type: String, required: true, trim: true },
    sizeLabel: { type: String, required: true, trim: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'],
      required: true,
    },
    changedAt: { type: Date, default: Date.now },
    note: { type: String, trim: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [orderItemSchema],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'],
      default: 'Pending',
    },
    statusHistory: { type: [statusHistorySchema], default: [{ status: 'Pending' }] },
    address: {
      fullName: { type: String, required: true, trim: true },
      street: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, trim: true },
      country: { type: String, default: 'Ghana', trim: true },
      postalCode: { type: String, trim: true },
    },
    phone: { type: String, required: true, trim: true },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'MTN', 'AirtelTigo', 'Telecel'],
      required: true,
    },
    paymentStatus: { type: String, enum: ['pending', 'confirmed', 'failed'], default: 'pending' },
    paymentReference: { type: String, trim: true },
    paymentConfirmedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
