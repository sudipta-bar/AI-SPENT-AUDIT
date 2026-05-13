import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/auth';
import { useAuditStore } from '../store/useAuditStore';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAdminToken = useAuditStore((state) => state.setAdminToken);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginAdmin(form);
      setAdminToken(response.data.token);
      navigate(location.state?.from || '/admin/leads', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <form className="panel p-8" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold text-white">Admin login</h1>
        <p className="mt-3 text-sm text-slate-400">Authenticate with the configured admin credentials.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="admin-email">
              Email
            </label>
            <input
              id="admin-email"
              className="input"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </div>
          <div>
            <label className="label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className="input"
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        <button className="button-primary mt-6 w-full" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
