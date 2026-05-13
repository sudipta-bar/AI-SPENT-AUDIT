import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectToDatabase } from './config/db.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { aiSummaryRoutes } from './routes/aiSummaryRoutes.js';
import { auditRoutes } from './routes/auditRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { leadRoutes } from './routes/leadRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: false
  })
);
app.use(express.json());

app.get('/api/health', (_request, response) => {
  const database = connectToDatabase();
  const connected = database.connection?.readyState === 1;

  response.json({
    success: true,
    data: {
      status: 'ok',
      database: connected ? 'connected' : 'disconnected'
    }
  });
});

app.use('/api/audits', auditRoutes);
app.use('/api/ai-summary', aiSummaryRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use(errorHandler);
