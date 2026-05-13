import { useState } from 'react';
import { createLead } from '../../api/leads';

export function LeadCaptureForm({ auditId, monthlySavings }) {
  const [form, setForm] = useState({
    email: '',
    companyName: '',
    role: '',
    website: ''
  });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      await createLead({
        ...form,
        auditId,
        estimatedMonthlySavings: monthlySavings
      });
      setStatus('success');
      setMessage('Lead captured and confirmation email queued.');
      setForm({ email: '', companyName: '', role: '', website: '' });
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  }

  return (
    <form className="panel p-6" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Request a Credex review</h2>
          <p className="mt-2 text-sm text-slate-400">Store the lead in MongoDB and send a confirmation email.</p>
        </div>
        <div className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-slate-300">Honeypot protected</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="companyName">
            Company name
          </label>
          <input
            id="companyName"
            className="input"
            value={form.companyName}
            onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="role">
            Role
          </label>
          <input
            id="role"
            className="input"
            value={form.role}
            onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            required
          />
        </div>
        <div className="hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>
      </div>

      {message ? <p className={`mt-4 text-sm ${status === 'success' ? 'text-mint' : 'text-rose-300'}`}>{message}</p> : null}

      <button className="button-primary mt-6" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Capture lead'}
      </button>
    </form>
  );
}
