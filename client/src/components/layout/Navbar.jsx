import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-300 text-sm font-bold text-slate-950">
            CA
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-slate-100">Credex Audit</div>
            <div className="text-xs text-slate-400">AI spend intelligence</div>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className="button-secondary !px-4 !py-2 text-xs sm:text-sm">
            Audit
          </NavLink>
          <NavLink to="/admin/login" className="button-secondary !px-4 !py-2 text-xs sm:text-sm">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
