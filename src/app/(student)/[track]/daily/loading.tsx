import { AppBody } from "@/components/app/page-header";

function Bone({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink/8 ${className ?? ""}`} />;
}

export default function DailyLoading() {
  return (
    <>
      <div className="border-b border-line bg-paper/80 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Bone className="h-3 w-20" />
          <Bone className="mt-3 h-8 w-36" />
          <Bone className="mt-3 h-4 w-full max-w-lg" />
        </div>
      </div>
      <AppBody>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bone key={i} className="h-[68px] rounded-xl" />
          ))}
        </div>
        <Bone className="mt-6 h-14 w-full rounded-xl" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Bone key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      </AppBody>
    </>
  );
}
