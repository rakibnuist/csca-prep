export default function MockBriefingLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-3 w-24 rounded bg-ink/8" />
        <div className="mt-3 h-8 w-80 max-w-full rounded bg-ink/8" />
        <div className="mt-3 h-4 w-full max-w-xl rounded bg-ink/8" />
        <div className="mt-6 rounded-xl border border-line bg-card p-5">
          <div className="h-4 w-32 rounded bg-ink/8" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-ink/5" />
            ))}
          </div>
          <div className="mt-5 h-11 w-full rounded-lg bg-ink/8" />
        </div>
      </div>
    </div>
  );
}
