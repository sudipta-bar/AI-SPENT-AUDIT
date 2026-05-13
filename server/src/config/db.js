import mongoose from 'mongoose';

let cachedConnection = null;

export function connectToDatabase() {
  if (cachedConnection) return cachedConnection;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI is not configured. Database-backed features will fail until it is set.');
    return mongoose;
  }

  cachedConnection = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });

  return cachedConnection;
}
