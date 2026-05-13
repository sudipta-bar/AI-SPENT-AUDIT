export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">{eyebrow}</p> : null}
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 text-lg leading-8 text-slate-300">{description}</p> : null}
    </div>
  );
}
