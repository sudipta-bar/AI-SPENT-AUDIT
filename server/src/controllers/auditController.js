import { Audit } from '../models/Audit.js';
import { buildFallbackSummary } from '../services/aiSummaryService.js';
import { runAuditEngine } from '../services/auditEngine.js';
import { httpError } from '../lib/httpError.js';
import { generateSlug } from '../utils/slug.js';

export async function createAudit(request, response) {
  if (!Array.isArray(request.body.tools) || request.body.tools.length === 0) {
    throw httpError(400, 'At least one tool entry is required');
  }

  const result = runAuditEngine(request.body);
  const metadata = { createdAtIso: new Date().toISOString() };
  const fallbackSummary = buildFallbackSummary({
    summary: result.summary,
    recommendations: result.recommendations,
    metadata
  });

  const shareSlug = generateSlug();

  let persistedId = null;
  try {
    const audit = await Audit.create({
      shareSlug,
      input: result.input,
      summary: {
        ...result.summary,
        fallbackSummary
      },
      recommendations: result.recommendations,
      metadata
    });

    persistedId = audit._id;
  } catch (err) {
    console.warn('Audit persistence failed (DB may be unavailable):', err?.message || err);
  }

  response.status(201).json({
    success: true,
    data: {
      id: persistedId || String(Date.now()),
      share: {
        slug: shareSlug,
        url: `/share/${shareSlug}`
      },
      ...result,
      summary: {
        ...result.summary,
        fallbackSummary
      },
      metadata
    }
  });
}

export async function getSharedAudit(request, response) {
  const audit = await Audit.findOne({ shareSlug: request.params.slug }).lean();

  if (!audit) {
    throw httpError(404, 'Shared audit not found');
  }

  response.json({
    success: true,
    data: {
      id: audit._id,
      share: {
        slug: audit.shareSlug,
        url: `/share/${audit.shareSlug}`
      },
      input: audit.input,
      summary: audit.summary,
      recommendations: audit.recommendations,
      metadata: audit.metadata
    }
  });
}
