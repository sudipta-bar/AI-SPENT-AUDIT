import { request } from './http';

export function createLead(payload) {
  return request('/leads', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
