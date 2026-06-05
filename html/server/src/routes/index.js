import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import superadminRoutes from './superadminRoutes.js';
import matrimonyRoutes from './matrimonyRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Shadi Sampanna API is running' });
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);
router.use('/superadmin', superadminRoutes);
router.use('/', matrimonyRoutes);

export default router;
