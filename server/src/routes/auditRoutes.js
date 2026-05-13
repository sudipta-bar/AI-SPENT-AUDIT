import { Router } from 'express';
import { createAudit, getSharedAudit } from '../controllers/auditController.js';
import { asyncHandler } from '../lib/asyncHandler.js';

export const auditRoutes = Router();

auditRoutes.post('/', asyncHandler(createAudit));
auditRoutes.get('/share/:slug', asyncHandler(getSharedAudit));
