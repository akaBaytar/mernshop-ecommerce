import mongoose from 'mongoose';
import dotenv from 'dotenv';

import users from './users.js';
import products from './products.js';

import connectDatabase from '../config/database.js';

import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

connectDatabase();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const mockUsers = await User.insertMany(users);
    const adminUser = mockUsers[0]._id;
    const mockProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(mockProducts);

    console.log('Mock data imported to database.');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Destroyed all mock data in database.');

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

process.argv[2] === '-destroy' ? destroyData() : importData();
