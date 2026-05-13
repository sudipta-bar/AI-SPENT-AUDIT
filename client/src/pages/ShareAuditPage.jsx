import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getSharedAudit } from '../api/audits';
import { ResultsDashboard } from '../components/audit/ResultsDashboard';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';

export function ShareAuditPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, data: null, error: '' });

  useEffect(() => {
    async function loadAudit() {
      try {
        const response = await getSharedAudit(slug);
        setState({ loading: false, data: response.data, error: '' });
      } catch (error) {
        setState({ loading: false, data: null, error: error.message });
      }
    }

    loadAudit();
  }, [slug]);

  if (state.loading) return <LoadingSkeleton lines={8} />;
  if (state.error) return <div className="panel p-8 text-rose-300">{state.error}</div>;

  const { data } = state;
  const shareTitle = `AI Spend Audit: ${data.summary.monthlySavings > 0 ? 'Savings found' : 'Stack already optimized'}`;
  const shareDescription = `Potential monthly savings: $${data.summary.monthlySavings}. Yearly savings: $${data.summary.yearlySavings}.`;

  return (
    <>
      <Helmet>
        <title>{shareTitle}</title>
        <meta name="description" content={shareDescription} />
        <meta property="og:title" content={shareTitle} />
        <meta property="og:description" content={shareDescription} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareTitle} />
        <meta name="twitter:description" content={shareDescription} />
      </Helmet>
      <div className="space-y-6">
        <div className="panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">Public report</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Shared AI spend audit</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            This view excludes sensitive lead details and only displays audit-safe spend inputs, recommendations, and savings estimates.
          </p>
        </div>
        <ResultsDashboard result={data} aiSummary={data.summary.fallbackSummary} aiState="success" />
      </div>
    </>
  );
}
