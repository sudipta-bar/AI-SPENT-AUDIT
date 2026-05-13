import { formatCurrency } from '../../lib/formatters';

export function ResultsDashboard({ result, aiSummary, aiState }) {
  const optimized = result.summary.monthlySavings <= 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="panel p-6">
          <p className="text-sm text-slate-400">Current monthly spend</p>
          <p className="mt-3 text-4xl font-semibold text-white">{formatCurrency(result.summary.totalMonthlySpend)}</p>
        </div>
        <div className="panel p-6">
          <p className="text-sm text-slate-400">Monthly savings</p>
          <p className="mt-3 text-4xl font-semibold text-mint">{formatCurrency(result.summary.monthlySavings)}</p>
        </div>
        <div className="panel p-6">
          <p className="text-sm text-slate-400">Yearly savings</p>
          <p className="mt-3 text-4xl font-semibold text-sky-200">{formatCurrency(result.summary.yearlySavings)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-white">Per-tool recommendations</h2>
          <div className="mt-6 space-y-4">
            {result.recommendations.map((recommendation) => (
              <article key={recommendation.tool} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{recommendation.tool}</p>
                    <p className="mt-2 text-sm text-slate-400">Action: {recommendation.action}</p>
                    <p className="mt-2 text-sm text-slate-300">{recommendation.reason}</p>
                    {recommendation.recommendedPlan ? (
                      <p className="mt-2 text-sm text-sky-200">Recommended plan: {recommendation.recommendedPlan}</p>
                    ) : null}
                    {recommendation.alternative ? (
                      <p className="mt-1 text-sm text-mint">Alternative: {recommendation.alternative}</p>
                    ) : null}
                  </div>
                  <div className="rounded-2xl border border-mint/20 bg-mint/10 px-4 py-3 text-sm font-semibold text-mint">
                    {formatCurrency(recommendation.monthlySavings)}/mo
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">AI summary</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {aiState === 'loading' ? 'Generating a personalized summary...' : aiSummary || result.summary.fallbackSummary}
            </p>
            {aiState === 'error' ? <p className="mt-3 text-xs text-amber-300">Fallback summary shown after AI retry failure.</p> : null}
          </div>

          <div className="panel p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Verdict</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              {optimized ? 'Your current stack is already fairly optimized.' : 'You have concrete savings to unlock.'}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{result.summary.verdict}</p>
          </div>

          {result.summary.monthlySavings > 500 ? (
            <div className="rounded-3xl border border-sky-300/20 bg-sky-300/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Credex consultation</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">This stack likely merits a guided savings review.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Savings exceed {formatCurrency(500)} per month. Capture the lead below and route the team to a Credex follow-up.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
