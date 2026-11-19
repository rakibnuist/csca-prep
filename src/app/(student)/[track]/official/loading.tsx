import { AppBody } from "@/components/app/page-header";

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink/8 ${className ?? ""}`} />;
}

export default function OfficialLoading() {
  return (
    <>
      <div className="border-b border-line bg-paper/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Bone className="h-3 w-24" />
          <Bone className="mt-3 h-8 w-64 max-w-full" />
          <Bone className="mt-3 h-4 w-full max-w-xl" />
          <Bone className="mt-2 h-4 w-3/4 max-w-lg" />
        </div>
      </div>
      <AppBody>
        <div className="flex flex-wrap gap-1.5">
          <Bone className="h-8 w-28 rounded-full" />
          <Bone className="h-8 w-28 rounded-full" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Bone key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Bone className="h-8 w-16 rounded-full" />
          <Bone className="h-8 w-16 rounded-full" />
          <Bone className="h-8 w-16 rounded-full" />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-line bg-paper px-4 py-3.5">
              <Bone className="h-4 w-52 max-w-full" />
              <Bone className="mt-2 h-3 w-40" />
              <Bone className="mt-3 h-3 w-32" />
              <div className="mt-3 flex gap-2">
                <Bone className="h-8 w-16 rounded-md" />
                <Bone className="h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </AppBody>
    </>
  );
}
