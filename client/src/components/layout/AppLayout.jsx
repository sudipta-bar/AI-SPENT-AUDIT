import { useHydrateStore } from '../../hooks/useHydrateStore';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function AppLayout({ children }) {
  useHydrateStore();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
