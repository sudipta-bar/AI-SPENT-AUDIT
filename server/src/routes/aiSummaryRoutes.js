import { Router } from 'express';
import { createAiSummary } from '../controllers/aiSummaryController.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { aiLimiter } from '../middleware/rateLimiters.js';

export const aiSummaryRoutes = Router();

aiSummaryRoutes.post('/', aiLimiter, asyncHandler(createAiSummary));
