import { generateSummary, buildFallbackSummary } from '../services/aiSummaryService.js';

export async function createAiSummary(request, response) {
  try {
    const result = await generateSummary(request.body);

    return response.json({
      success: true,
      data: result
    });
  } catch (err) {
    const fallback = buildFallbackSummary(request.body);

    return response.json({
      success: true,
      data: { summary: fallback, source: 'fallback' }
    });
  }
}
