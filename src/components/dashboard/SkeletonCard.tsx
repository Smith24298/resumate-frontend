// FILE: components/dashboard/SkeletonCard.tsx
export function SkeletonCard() {
  return (
    <div className="bg-[#121826] border border-white/[0.04] rounded-2xl p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-white/[0.06] rounded-xl" />
        <div className="w-16 h-6 bg-white/[0.06] rounded-full" />
      </div>
      <div>
        <div className="w-2/3 h-4 bg-white/[0.06] rounded-lg" />
        <div className="w-1/3 h-3 bg-white/[0.04] rounded-lg mt-2" />
        <div className="w-1/2 h-3 bg-white/[0.04] rounded-lg mt-1" />
      </div>
      <div className="w-full h-8 bg-white/[0.04] rounded-xl mt-2" />
    </div>
  );
}
