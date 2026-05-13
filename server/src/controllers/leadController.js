import { Lead } from '../models/Lead.js';
import { httpError } from '../lib/httpError.js';
import { sendLeadConfirmation } from '../services/emailService.js';

export async function createLead(request, response) {
  const { email, companyName, role, auditId, estimatedMonthlySavings, website } = request.body;

  if (website) {
    throw httpError(400, 'Spam detected');
  }
  let leadId = null;

  try {
    const lead = await Lead.create({
      email,
      companyName,
      role,
      auditId,
      estimatedMonthlySavings: Number(estimatedMonthlySavings || 0)
    });

    leadId = lead._id;
  } catch (err) {
    console.warn('Lead create failed (DB might be unavailable):', err?.message || err);
  }

  try {
    await sendLeadConfirmation({
      email,
      companyName,
      estimatedMonthlySavings: Number(estimatedMonthlySavings || 0)
    });
  } catch (err) {
    console.warn('sendLeadConfirmation failed:', err?.message || err);
  }

  response.status(201).json({
    success: true,
    data: {
      id: leadId || String(Date.now())
    }
  });
}
