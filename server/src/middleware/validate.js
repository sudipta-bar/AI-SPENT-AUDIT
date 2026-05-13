import { httpError } from '../lib/httpError.js';

export function validate(requiredFields = []) {
  return (request, _response, next) => {
    const missing = requiredFields.filter((field) => {
      const value = request.body[field];
      return value === undefined || value === null || value === '';
    });

    if (missing.length) {
      return next(httpError(400, `Missing required fields: ${missing.join(', ')}`));
    }

    return next();
  };
}
