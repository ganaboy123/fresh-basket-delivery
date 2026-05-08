const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    priceModifier: { type: Number, default: 0 },
    stock: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, enum: ['palm-oil', 'coconut-oil', 'gari'], required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    gallery: [{ type: String, trim: true }],
    description: { type: String, required: true, trim: true },
    sizes: [sizeSchema],
    stock: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, price: 1, isActive: 1, createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
