export const pricingData = {
  Cursor: {
    plans: {
      Hobby: { pricePerSeat: 0, maxSeats: 1 },
      Pro: { pricePerSeat: 20 },
      Business: { pricePerSeat: 40 }
    },
    cheaperPlanForLightUse: 'Pro',
    alternative: { tool: 'GitHub Copilot', reason: 'Lower seat cost for straightforward coding assistance.' }
  },
  'GitHub Copilot': {
    plans: {
      Free: { pricePerSeat: 0 },
      Individual: { pricePerSeat: 10 },
      Business: { pricePerSeat: 19 },
      Enterprise: { pricePerSeat: 39 }
    },
    cheaperPlanForLightUse: 'Business',
    alternative: { tool: 'Cursor', reason: 'Bundled editor plus AI can replace separate coding assistant spend.' }
  },
  Claude: {
    plans: {
      Free: { pricePerSeat: 0 },
      Pro: { pricePerSeat: 20 },
      Team: { pricePerSeat: 30 },
      Max: { pricePerSeat: 100 }
    },
    cheaperPlanForLightUse: 'Pro',
    alternative: { tool: 'ChatGPT', reason: 'Comparable general-purpose assistant coverage at lower common seat cost.' }
  },
  ChatGPT: {
    plans: {
      Free: { pricePerSeat: 0 },
      Plus: { pricePerSeat: 20 },
      Team: { pricePerSeat: 30 },
      Enterprise: { pricePerSeat: 60 }
    },
    cheaperPlanForLightUse: 'Plus',
    alternative: { tool: 'Claude', reason: 'Useful when writing-heavy workflows do not need overlapping ChatGPT seats.' }
  },
  'Anthropic API': {
    plans: {
      Starter: { pricePerSeat: 50 },
      Growth: { pricePerSeat: 200 },
      Scale: { pricePerSeat: 500 }
    },
    cheaperPlanForLightUse: 'Starter',
    alternative: { tool: 'OpenAI API', reason: 'Broader model coverage can reduce duplicated API subscriptions.' }
  },
  'OpenAI API': {
    plans: {
      Starter: { pricePerSeat: 50 },
      Growth: { pricePerSeat: 250 },
      Scale: { pricePerSeat: 600 }
    },
    cheaperPlanForLightUse: 'Starter',
    alternative: { tool: 'Anthropic API', reason: 'Teams with narrow model needs may not need overlapping API vendors.' }
  },
  Gemini: {
    plans: {
      Free: { pricePerSeat: 0 },
      Advanced: { pricePerSeat: 20 },
      Business: { pricePerSeat: 30 }
    },
    cheaperPlanForLightUse: 'Advanced',
    alternative: { tool: 'ChatGPT', reason: 'Often replaces parallel general-purpose chat subscriptions.' }
  },
  Windsurf: {
    plans: {
      Free: { pricePerSeat: 0 },
      Pro: { pricePerSeat: 15 },
      Teams: { pricePerSeat: 30 }
    },
    cheaperPlanForLightUse: 'Pro',
    alternative: { tool: 'Cursor', reason: 'Consolidating editor spend can remove duplicate AI IDE licenses.' }
  }
};
