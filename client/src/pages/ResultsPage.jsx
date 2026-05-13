import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { generateAiSummary } from '../api/audits';
import { LeadCaptureForm } from '../components/audit/LeadCaptureForm';
import { ResultsDashboard } from '../components/audit/ResultsDashboard';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { useAuditStore } from '../store/useAuditStore';

export function ResultsPage() {
  const result = useAuditStore((state) => state.latestResult);
  const [aiSummary, setAiSummary] = useState('');
  const [aiState, setAiState] = useState('idle');

  useEffect(() => {
    if (!result) return;

    let cancelled = false;

    async function runSummary() {
      setAiState('loading');

      try {
        const response = await generateAiSummary({
          summary: result.summary,
          recommendations: result.recommendations,
          metadata: result.metadata
        });
        if (!cancelled) {
          setAiSummary(response.data.summary);
          setAiState('success');
        }
      } catch {
        try {
          const response = await generateAiSummary({
            summary: result.summary,
            recommendations: result.recommendations,
            metadata: result.metadata,
            retry: true
          });
          if (!cancelled) {
            setAiSummary(response.data.summary);
            setAiState('success');
          }
        } catch {
          if (!cancelled) {
            setAiState('error');
          }
        }
      }
    }

    runSummary();

    return () => {
      cancelled = true;
    };
  }, [result]);

  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Audit Results | AI Spend Audit</title>
        <meta name="description" content="Review monthly and yearly AI spend savings opportunities." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Audit results</h1>
            <p className="mt-3 text-slate-400">Review savings, recommendations, and the public share link.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="button-secondary" to="/">
              New audit
            </Link>
            <a className="button-primary" href={`/share/${result.share.slug}`} target="_blank" rel="noreferrer">
              Open share page
            </a>
          </div>
        </div>

        {aiState === 'loading' ? <LoadingSkeleton lines={5} /> : null}
        <ResultsDashboard result={result} aiSummary={aiSummary} aiState={aiState} />
        <LeadCaptureForm auditId={result.id} monthlySavings={result.summary.monthlySavings} />
      </div>
    </>
  );
}
