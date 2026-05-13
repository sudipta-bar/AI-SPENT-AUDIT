import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { asyncHandler } from '../lib/asyncHandler.js';
import { validate } from '../middleware/validate.js';

export const authRoutes = Router();

authRoutes.post('/login', validate(['email', 'password']), asyncHandler(login));
