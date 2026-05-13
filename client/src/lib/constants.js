export const TOOL_OPTIONS = [
  'Cursor',
  'GitHub Copilot',
  'Claude',
  'ChatGPT',
  'Anthropic API',
  'OpenAI API',
  'Gemini',
  'Windsurf'
];

export const DEFAULT_FORM = {
  teamSize: 5,
  primaryUseCase: 'Engineering productivity',
  tools: TOOL_OPTIONS.map((tool) => ({
    tool,
    selectedPlan: '',
    monthlySpend: '',
    seats: ''
  }))
};
