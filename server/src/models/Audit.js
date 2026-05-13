import mongoose from 'mongoose';

const ToolAuditSchema = new mongoose.Schema(
  {
    tool: { type: String, required: true },
    selectedPlan: { type: String, default: '' },
    recommendedPlan: { type: String, default: '' },
    monthlySpend: { type: Number, default: 0 },
    seats: { type: Number, default: 0 },
    monthlySavings: { type: Number, default: 0 },
    yearlySavings: { type: Number, default: 0 },
    action: { type: String, default: '' },
    reason: { type: String, default: '' },
    alternative: { type: String, default: '' }
  },
  { _id: false }
);

const AuditSchema = new mongoose.Schema(
  {
    shareSlug: { type: String, unique: true, index: true, required: true },
    input: {
      teamSize: { type: Number, required: true },
      primaryUseCase: { type: String, required: true },
      tools: { type: [ToolAuditSchema], default: [] }
    },
    summary: {
      totalMonthlySpend: { type: Number, required: true },
      monthlySavings: { type: Number, required: true },
      yearlySavings: { type: Number, required: true },
      verdict: { type: String, required: true },
      fallbackSummary: { type: String, required: true }
    },
    recommendations: { type: [ToolAuditSchema], default: [] },
    metadata: {
      createdAtIso: { type: String, required: true }
    }
  },
  {
    timestamps: true
  }
);

export const Audit = mongoose.models.Audit || mongoose.model('Audit', AuditSchema);
