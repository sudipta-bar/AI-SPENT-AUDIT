const stats = [
  { label: "Average review time", value: "4 mins" },
  { label: "Typical savings surfaced", value: "$200-$1.8k/mo" },
  { label: "Public report", value: "Shareable link" },
];

function StatValue({ value }) {
  if (!value) return null;

  const perSuffix = "/mo";
  const hasPer = value.endsWith(perSuffix);
  const raw = hasPer ? value.slice(0, -perSuffix.length) : value;
  const main = raw.replace("-", "–");

  return (
    <div className="text-2xl font-semibold text-white">
      <span>{main}</span>
      {hasPer ? (
        <span className="ml-2 text-sm font-normal text-slate-400">
          {perSuffix}
        </span>
      ) : null}
    </div>
  );
}

export function HeroStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="panel p-5">
          <StatValue value={stat.value} />
          <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
