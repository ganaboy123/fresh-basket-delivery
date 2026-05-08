require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  try {
    await connectDB();

    const email = 'admin@freshbasket.com';
    const password = 'Admin@12345';

    let admin = await User.findOne({ email });
    if (!admin) {
      admin = await User.create({
        name: 'Fresh Basket Admin',
        email,
        password,
        role: 'admin',
      });
    } else {
      admin.role = 'admin';
      admin.password = password;
      await admin.save();
    }

    console.log('Admin ready');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Admin seeding failed:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

run();
