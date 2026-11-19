export default function OfficialDetailLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-3 w-24 rounded bg-ink/8" />
        <div className="mt-3 h-8 w-96 max-w-full rounded bg-ink/8" />
        <div className="mt-3 h-4 w-full max-w-2xl rounded bg-ink/8" />
        <div className="mt-6 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-line bg-card p-4">
              <div className="h-4 w-3/4 rounded bg-ink/8" />
              <div className="mt-3 h-3 w-1/2 rounded bg-ink/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
