import test from 'node:test';
import assert from 'node:assert/strict';
import { buildFallbackSummary } from '../services/aiSummaryService.js';
import { runAuditEngine } from '../services/auditEngine.js';

test('downgrades expensive Claude Max plan to cheaper plan with savings', () => {
  const result = runAuditEngine({
    teamSize: 4,
    primaryUseCase: 'General assistant',
    tools: [{ tool: 'Claude', selectedPlan: 'Max', monthlySpend: 400, seats: 4 }]
  });

  assert.equal(result.recommendations[0].recommendedPlan, 'Pro');
  assert.equal(result.recommendations[0].monthlySavings, 320);
});

test('detects seat mismatch against team size', () => {
  const result = runAuditEngine({
    teamSize: 3,
    primaryUseCase: 'Engineering productivity',
    tools: [{ tool: 'Cursor', selectedPlan: 'Business', monthlySpend: 240, seats: 6 }]
  });

  assert.equal(result.recommendations[0].action, 'Downgrade plan');
  assert.ok(result.recommendations[0].reason.includes('seat count exceeds stated team size'));
  assert.equal(result.summary.monthlySavings, 180);
});

test('suggests alternative for overlapping engineering tools', () => {
  const result = runAuditEngine({
    teamSize: 5,
    primaryUseCase: 'Engineering productivity',
    tools: [{ tool: 'Windsurf', selectedPlan: 'Teams', monthlySpend: 150, seats: 5 }]
  });

  assert.equal(result.recommendations[0].alternative, 'Cursor');
});

test('returns honest optimized verdict when no savings exist', () => {
  const result = runAuditEngine({
    teamSize: 2,
    primaryUseCase: 'Research',
    tools: [{ tool: 'ChatGPT', selectedPlan: 'Plus', monthlySpend: 40, seats: 2 }]
  });

  assert.equal(result.summary.monthlySavings, 0);
  assert.match(result.summary.verdict, /reasonably optimized/i);
});

test('aggregates yearly savings across multiple tools', () => {
  const result = runAuditEngine({
    teamSize: 5,
    primaryUseCase: 'Engineering productivity',
    tools: [
      { tool: 'Claude', selectedPlan: 'Team', monthlySpend: 150, seats: 5 },
      { tool: 'Cursor', selectedPlan: 'Business', monthlySpend: 200, seats: 5 }
    ]
  });

  assert.equal(result.summary.monthlySavings, 150);
  assert.equal(result.summary.yearlySavings, 1800);
});

test('fallback summary stays usable without AI', () => {
  const summary = buildFallbackSummary({
    summary: { monthlySavings: 300, yearlySavings: 3600 },
    recommendations: [{ tool: 'Cursor', monthlySavings: 300 }],
    metadata: { createdAtIso: '2026-05-12T00:00:00.000Z' }
  });

  assert.match(summary, /Cursor/i);
  assert.match(summary, /3600/i);
});
