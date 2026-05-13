import crypto from 'crypto';

export function generateSlug() {
  return crypto.randomBytes(6).toString('hex');
}
