import { pricingData } from '../data/pricingData.js';
import { normalizeToolRow } from '../utils/normalize.js';

function getExpectedSpend(toolName, planName, seats) {
  const config = pricingData[toolName];
  const plan = config?.plans?.[planName];
  if (!plan) return 0;
  return (plan.pricePerSeat || 0) * Math.max(seats, 1);
}

function buildReason({ toolName, selectedPlan, recommendedPlan, seats, teamSize, alternative }) {
  const parts = [];

  if (selectedPlan && recommendedPlan && selectedPlan !== recommendedPlan) {
    parts.push(`${selectedPlan} looks expensive for ${seats} active seat${seats === 1 ? '' : 's'}`);
  }
  if (teamSize > 0 && seats > teamSize) {
    parts.push('seat count exceeds stated team size');
  }
  if (alternative) {
    parts.push(`consider ${alternative.tool} to reduce overlap`);
  }

  return parts.join('; ') || `${toolName} appears aligned with the current team and workflow.`;
}

function recommendForTool(toolRow, teamSize, primaryUseCase) {
  const tool = normalizeToolRow(toolRow);
  const config = pricingData[tool.tool];

  if (!config) {
    return {
      ...tool,
      recommendedPlan: tool.selectedPlan,
      monthlySavings: 0,
      yearlySavings: 0,
      action: 'Review manually',
      reason: 'No pricing rule exists for this tool yet.',
      alternative: ''
    };
  }

  const enteredSpend = tool.monthlySpend;
  const seats = tool.seats || 1;
  const selectedPlan = tool.selectedPlan || Object.keys(config.plans)[0];
  const currentExpected = getExpectedSpend(tool.tool, selectedPlan, seats);
  let recommendedPlan = selectedPlan;
  let alternative = '';
  let action = 'Keep current plan';

  const hasSeatMismatch = seats > teamSize && teamSize > 0;
  const usageImpliesOverlap =
    ['engineering productivity', 'general assistant', 'coding', 'developer tools'].includes(
      String(primaryUseCase || '').toLowerCase()
    ) && ['Cursor', 'GitHub Copilot', 'Windsurf'].includes(tool.tool);

  if (selectedPlan in config.plans && config.cheaperPlanForLightUse && selectedPlan !== config.cheaperPlanForLightUse) {
    recommendedPlan = config.cheaperPlanForLightUse;
  }

  if (usageImpliesOverlap && config.alternative) {
    alternative = config.alternative.tool;
  }

  const optimizedSeatCount = Math.min(seats, teamSize || seats || 1);
  const recommendedSpend = getExpectedSpend(tool.tool, recommendedPlan, optimizedSeatCount);
  let monthlySavings = Math.max(enteredSpend - recommendedSpend, 0);

  if (monthlySavings > 0) {
    action = recommendedPlan !== selectedPlan ? 'Downgrade plan' : hasSeatMismatch ? 'Reduce seats' : 'Consolidate tools';
  }

  if (monthlySavings === 0 && alternative) {
    action = 'Consider alternative';
  }

  return {
    ...tool,
    recommendedPlan,
    monthlySavings,
    yearlySavings: monthlySavings * 12,
    action,
    reason: buildReason({
      toolName: tool.tool,
      selectedPlan,
      recommendedPlan,
      seats,
      teamSize,
      alternative: alternative ? config.alternative : null
    }),
    alternative
  };
}

export function runAuditEngine(input) {
  const tools = (input.tools || [])
    .map((row) => normalizeToolRow(row))
    .filter((row) => row.monthlySpend > 0 || row.selectedPlan);
  const teamSize = Number(input.teamSize || 0);
  const primaryUseCase = input.primaryUseCase || 'General productivity';
  const recommendations = tools.map((tool) => recommendForTool(tool, teamSize, primaryUseCase));
  const totalMonthlySpend = recommendations.reduce((sum, item) => sum + item.monthlySpend, 0);
  const monthlySavings = recommendations.reduce((sum, item) => sum + item.monthlySavings, 0);
  const yearlySavings = monthlySavings * 12;
  const verdict =
    monthlySavings > 0
      ? `The current stack has ${monthlySavings.toFixed(0)} USD in estimated monthly savings from plan downgrades, seat cleanup, or vendor consolidation.`
      : 'The current stack appears reasonably optimized for the provided team size and use case.';

  return {
    input: {
      teamSize,
      primaryUseCase,
      tools
    },
    summary: {
      totalMonthlySpend,
      monthlySavings,
      yearlySavings,
      verdict
    },
    recommendations
  };
}
