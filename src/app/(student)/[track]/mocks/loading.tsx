import { AppBody } from "@/components/app/page-header";

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink/8 ${className ?? ""}`} />;
}

export default function MocksLoading() {
  return (
    <>
      <div className="border-b border-line bg-paper/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Bone className="h-3 w-16" />
          <Bone className="mt-3 h-8 w-40 max-w-full" />
          <Bone className="mt-3 h-4 w-full max-w-xl" />
          <Bone className="mt-2 h-4 w-3/4 max-w-lg" />
        </div>
      </div>
      <AppBody>
        <Bone className="h-3 w-24" />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bone key={i} className="h-8 w-28 rounded-full" />
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Bone key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <Bone className="mt-4 h-10 w-full rounded-xl" />
        <div className="mt-6 space-y-8">
          {Array.from({ length: 2 }).map((_, s) => (
            <div key={s}>
              <Bone className="h-6 w-40" />
              <Bone className="mt-1 h-3 w-48" />
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl border border-line bg-paper px-4 py-3">
                    <Bone className="h-4 w-24 rounded-full" />
                    <Bone className="mt-2 h-4 w-40 max-w-full" />
                    <Bone className="mt-2 h-3 w-28" />
                    <div className="mt-2.5 flex gap-2">
                      <Bone className="h-8 w-20 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AppBody>
    </>
  );
}
