import { Router } from 'express';
import { createLead } from '../controllers/leadController.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { leadLimiter } from '../middleware/rateLimiters.js';
import { validate } from '../middleware/validate.js';

export const leadRoutes = Router();

leadRoutes.post('/', leadLimiter, validate(['email', 'companyName', 'role']), asyncHandler(createLead));
