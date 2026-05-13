import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    auditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
    estimatedMonthlySavings: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
