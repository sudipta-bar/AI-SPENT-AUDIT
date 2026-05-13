import { useEffect, useState } from 'react';
import { getLeads } from '../api/auth';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { formatCurrency } from '../lib/formatters';
import { useAuditStore } from '../store/useAuditStore';

export function AdminLeadsPage() {
  const token = useAuditStore((state) => state.adminToken);
  const logoutAdmin = useAuditStore((state) => state.logoutAdmin);
  const [state, setState] = useState({ loading: true, leads: [], error: '' });

  useEffect(() => {
    async function loadLeads() {
      try {
        const response = await getLeads(token);
        setState({ loading: false, leads: response.data, error: '' });
      } catch (error) {
        setState({ loading: false, leads: [], error: error.message });
      }
    }

    loadLeads();
  }, [token]);

  if (state.loading) return <LoadingSkeleton lines={8} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Captured leads</h1>
          <p className="mt-2 text-sm text-slate-400">Protected dashboard for Credex follow-up.</p>
        </div>
        <button className="button-secondary" onClick={logoutAdmin} type="button">
          Logout
        </button>
      </div>

      {state.error ? <div className="panel p-6 text-rose-300">{state.error}</div> : null}

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Company</th>
                <th className="px-4 py-4">Role</th>
                <th className="px-4 py-4">Estimated savings</th>
                <th className="px-4 py-4">Created</th>
              </tr>
            </thead>
            <tbody>
              {state.leads.map((lead) => (
                <tr key={lead._id} className="border-t border-white/10">
                  <td className="px-4 py-4 text-slate-200">{lead.email}</td>
                  <td className="px-4 py-4 text-slate-200">{lead.companyName}</td>
                  <td className="px-4 py-4 text-slate-300">{lead.role}</td>
                  <td className="px-4 py-4 text-mint">{formatCurrency(lead.estimatedMonthlySavings)}</td>
                  <td className="px-4 py-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
