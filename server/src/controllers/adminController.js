import { Lead } from '../models/Lead.js';

export async function getLeads(_request, response) {
  const leads = await Lead.find().sort({ createdAt: -1 }).lean();
  response.json({
    success: true,
    data: leads
  });
}
