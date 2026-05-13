import { request } from './http';

export function createAudit(payload) {
  return request('/audits', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function getSharedAudit(slug) {
  return request(`/audits/share/${slug}`);
}

export function generateAiSummary(payload) {
  return request('/ai-summary', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
