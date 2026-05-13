import { useNavigate } from 'react-router-dom';
import { HeroStats } from '../components/audit/HeroStats';
import { SpendInputForm } from '../components/audit/SpendInputForm';
import { SectionHeading } from '../components/ui/SectionHeading';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <SectionHeading
          eyebrow="AI spend audit"
          title="Find wasted AI spend before it compounds into the annual budget."
          description="Model overlapping subscriptions, flag expensive plans, and generate a shareable savings report your team can act on."
        />
        <HeroStats />
      </section>

      <SpendInputForm onSuccess={() => navigate('/results')} />
    </div>
  );
}
