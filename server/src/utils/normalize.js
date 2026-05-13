export function clampNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) && num >= 0 ? num : fallback;
}

export function normalizeToolRow(tool) {
  return {
    tool: tool.tool,
    selectedPlan: String(tool.selectedPlan || '').trim(),
    monthlySpend: clampNumber(tool.monthlySpend),
    seats: clampNumber(tool.seats)
  };
}
