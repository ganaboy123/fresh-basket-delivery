require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const seedProducts = [
  {
    name: 'Premium Palm Oil',
    slug: 'premium-palm-oil',
    category: 'palm-oil',
    price: 25,
    image:
      'https://images.unsplash.com/photo-1615485291234-5f758f2f6f7f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Freshly processed palm oil with rich aroma and natural color. Ideal for stews, soups, and traditional meals.',
    stock: 240,
    sizes: [
      { label: '1L', priceModifier: 0, stock: 80 },
      { label: '5L', priceModifier: 85, stock: 110 },
      { label: '10L', priceModifier: 180, stock: 50 },
    ],
  },
  {
    name: 'Virgin Coconut Oil',
    slug: 'virgin-coconut-oil',
    category: 'coconut-oil',
    price: 30,
    image:
      'https://images.unsplash.com/photo-1576186726115-4d51596775d1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Cold-pressed virgin coconut oil, excellent for healthy cooking and multipurpose daily use.',
    stock: 150,
    sizes: [
      { label: '500ml', priceModifier: 0, stock: 50 },
      { label: '1L', priceModifier: 20, stock: 70 },
      { label: '5L', priceModifier: 120, stock: 30 },
    ],
  },
  {
    name: 'Ijebu White Gari',
    slug: 'ijebu-white-gari',
    category: 'gari',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1615485737651-e17a7f9f7f84?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?auto=format&fit=crop&w=1200&q=80',
    ],
    description:
      'Crunchy and clean white gari from selected cassava. Perfect for eba, soakings, and local recipes.',
    stock: 500,
    sizes: [
      { label: '1kg', priceModifier: 0, stock: 180 },
      { label: '5kg', priceModifier: 62, stock: 220 },
      { label: '10kg', priceModifier: 130, stock: 100 },
    ],
  },
];

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    console.log('Seeded products successfully');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

run();
