import { verifyToken } from '../services/tokenService.js';
import { httpError } from '../lib/httpError.js';

export function requireAuth(request, _response, next) {
  const authHeader = request.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return next(httpError(401, 'Authentication required'));
  }

  try {
    request.user = verifyToken(token);
    return next();
  } catch {
    return next(httpError(401, 'Invalid token'));
  }
}
