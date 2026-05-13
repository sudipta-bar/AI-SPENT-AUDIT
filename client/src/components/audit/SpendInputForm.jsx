import { useState } from 'react';
import { createAudit } from '../../api/audits';
import { TOOL_OPTIONS } from '../../lib/constants';
import { useAuditStore } from '../../store/useAuditStore';

export function SpendInputForm({ onSuccess }) {
  const draft = useAuditStore((state) => state.draft);
  const setDraft = useAuditStore((state) => state.setDraft);
  const setLatestResult = useAuditStore((state) => state.setLatestResult);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function updateTool(index, field, value) {
    setDraft((current) => ({
      ...current,
      tools: current.tools.map((tool, toolIndex) => (toolIndex === index ? { ...tool, [field]: value } : tool))
    }));
  }

  function updateRoot(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const payload = {
        ...draft,
        teamSize: Number(draft.teamSize),
        tools: draft.tools
          .filter((tool) => tool.selectedPlan || tool.monthlySpend || tool.seats)
          .map((tool) => ({
            tool: tool.tool,
            selectedPlan: tool.selectedPlan,
            monthlySpend: Number(tool.monthlySpend || 0),
            seats: Number(tool.seats || 0)
          }))
      };

      const data = await createAudit(payload);
      setLatestResult(data.data);
      onSuccess(data.data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="panel p-6 sm:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="text-2xl font-semibold text-white">Spend inputs</h2>
          <p className="mt-2 text-sm text-slate-400">
            Capture active AI subscriptions, plan tier, seat count, and actual spend. Drafts persist locally.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div>
              <label className="label" htmlFor="teamSize">
                Team size
              </label>
              <input
                id="teamSize"
                className="input"
                type="number"
                min="1"
                value={draft.teamSize}
                onChange={(event) => updateRoot('teamSize', event.target.value)}
              />
            </div>
            <div>
              <label className="label" htmlFor="primaryUseCase">
                Primary use case
              </label>
              <input
                id="primaryUseCase"
                className="input"
                value={draft.primaryUseCase}
                onChange={(event) => updateRoot('primaryUseCase', event.target.value)}
                placeholder="Engineering productivity"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-sky-300/15 bg-sky-300/10 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">Covered tools</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOOL_OPTIONS.map((tool) => (
              <span key={tool} className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {draft.tools.map((tool, index) => (
          <div key={tool.tool} className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/30 p-4 md:grid-cols-4">
            <div>
              <label className="label">{tool.tool}</label>
              <input className="input" value={tool.tool} disabled />
            </div>
            <div>
              <label className="label">Selected plan</label>
              <input
                className="input"
                value={tool.selectedPlan}
                onChange={(event) => updateTool(index, 'selectedPlan', event.target.value)}
                placeholder="Pro, Teams, Max..."
              />
            </div>
            <div>
              <label className="label">Monthly spend</label>
              <input
                className="input"
                type="number"
                min="0"
                step="1"
                value={tool.monthlySpend}
                onChange={(event) => updateTool(index, 'monthlySpend', event.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="label">Seats / users</label>
              <input
                className="input"
                type="number"
                min="0"
                step="1"
                value={tool.seats}
                onChange={(event) => updateTool(index, 'seats', event.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button className="button-primary" type="submit" disabled={submitting}>
          {submitting ? 'Running audit...' : 'Generate audit'}
        </button>
        <button className="button-secondary" type="button" onClick={() => setDraft(draft)}>
          Draft saved locally
        </button>
      </div>
    </form>
  );
}
