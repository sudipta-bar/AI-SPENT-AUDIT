import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="panel p-8 text-center">
        <h1 className="text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-slate-400">The route does not exist or the shared report was removed.</p>
        <Link className="button-primary mt-6" to="/">
          Go back home
        </Link>
      </div>
    </div>
  );
}
