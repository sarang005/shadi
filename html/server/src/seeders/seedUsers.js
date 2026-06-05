import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { ROLES } from '../constants/roles.js';
import logger from '../config/logger.js';

dotenv.config();

const users = [
  {
    name: 'Demo User',
    email: 'user@example.com',
    password: 'Password@123',
    role: ROLES.USER,
    avatar: '👩',
    membership: 'Premium',
  },
  {
    name: 'Demo Admin',
    email: 'admin@example.com',
    password: 'Password@123',
    role: ROLES.ADMIN,
    avatar: '👨‍💼',
    membership: 'Admin',
  },
  {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'Password@123',
    role: ROLES.SUPERADMIN,
    avatar: '👑',
    membership: 'Superadmin',
  },
];

const seed = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shadi_sampanna';
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB for seeding');

    await User.deleteMany({
      email: { $in: users.map((u) => u.email) },
    });

    for (const userData of users) {
      const user = await User.create(userData);
      if (user.role === ROLES.USER) {
        await Profile.create({
          user: user._id,
          gender: 'female',
          city: 'Chennai',
          occupation: 'CA',
          religion: 'Hindu',
          isPublished: true,
          isVerified: true,
        });
      }
      logger.info(`Seeded ${user.role}: ${user.email}`);
    }

    logger.info('Seed completed successfully');
    logger.info('Credentials:');
    logger.info('  user@example.com / Password@123');
    logger.info('  admin@example.com / Password@123');
    logger.info('  superadmin@example.com / Password@123');
    process.exit(0);
  } catch (error) {
    logger.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seed();
