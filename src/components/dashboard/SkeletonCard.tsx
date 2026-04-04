// FILE: components/dashboard/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-white p-5 flex flex-col gap-4 animate-pulse shadow-sm">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-blue-100 rounded-xl" />
        <div className="w-16 h-6 bg-blue-100 rounded-full" />
      </div>
      <div>
        <div className="w-2/3 h-4 bg-blue-100 rounded-lg" />
        <div className="w-1/3 h-3 bg-blue-50 rounded-lg mt-2" />
        <div className="w-1/2 h-3 bg-blue-50 rounded-lg mt-1" />
      </div>
      <div className="w-full h-8 bg-blue-50 rounded-xl mt-2" />
    </div>
  );
}
