import { httpError } from '../lib/httpError.js';
import { signToken } from '../services/tokenService.js';

export async function login(request, response) {
  const { email, password } = request.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    throw httpError(401, 'Invalid admin credentials');
  }

  const token = signToken({
    email,
    role: 'admin'
  });

  response.json({
    success: true,
    data: { token }
  });
}
