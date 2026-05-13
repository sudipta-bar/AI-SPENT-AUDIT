import { Router } from 'express';
import { getLeads } from '../controllers/adminController.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';

export const adminRoutes = Router();

adminRoutes.get('/leads', requireAuth, asyncHandler(getLeads));
