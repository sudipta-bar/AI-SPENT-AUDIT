import { request } from './http';

export function loginAdmin(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function getLeads(token) {
  return request('/admin/leads', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
