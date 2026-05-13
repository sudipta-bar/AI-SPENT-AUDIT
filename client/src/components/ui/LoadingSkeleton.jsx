export function LoadingSkeleton({ lines = 4 }) {
  return (
    <div className="panel p-6">
      <div className="animate-pulse space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded-full bg-white/10 ${index === 0 ? 'w-2/3' : index % 2 === 0 ? 'w-full' : 'w-5/6'}`}
          />
        ))}
      </div>
    </div>
  );
}
