function buildFallbackSummary({ summary = {}, recommendations = [], metadata = {} } = {}) {
  const topRecommendation = Array.isArray(recommendations)
    ? recommendations.find((item) => Number(item?.monthlySavings) > 0)
    : undefined;

  const monthlySavings = Number(summary?.monthlySavings || 0);
  const yearlySavings = Number(summary?.yearlySavings || 0);
  const date = metadata?.createdAtIso ? new Date(metadata.createdAtIso).toLocaleDateString('en-US') : 'today';

  if (!topRecommendation || monthlySavings <= 0) {
    return `As of ${date}, your AI stack looks reasonably optimized. The current mix appears aligned with team size and use case, so the best next step is periodic pricing review rather than immediate vendor changes.`;
  }

  return `As of ${date}, the biggest savings opportunity is ${topRecommendation.tool}. Your stack could save about $${monthlySavings} per month and $${yearlySavings} per year by consolidating overlapping plans and moving underused seats to cheaper tiers.`;
}

export async function generateSummary(payload) {
  const fallbackSummary = buildFallbackSummary(payload);
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return { summary: fallbackSummary, source: 'fallback' };
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.CLIENT_URL || 'http://localhost:5173',
      'X-Title': 'AI Spend Audit'
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a finance-aware SaaS advisor. Write a concise personalized summary in under 100 words. Be direct and honest.'
        },
        {
          role: 'user',
          content: JSON.stringify(payload)
        }
      ],
      temperature: 0.4,
      max_tokens: 180
    })
  });

  if (!response.ok) {
    throw new Error('OpenRouter request failed');
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('OpenRouter returned an empty summary');
  }

  return { summary: content.slice(0, 650), source: 'openrouter' };
}

export { buildFallbackSummary };
