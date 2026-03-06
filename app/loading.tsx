export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl animate-pulse space-y-8">
        <div className="h-16 rounded-full bg-white/70" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-[2.5rem] bg-white/70 p-8">
            <div className="h-4 w-32 rounded-full bg-slate-200" />
            <div className="h-14 w-4/5 rounded-3xl bg-slate-200" />
            <div className="h-5 w-full rounded-full bg-slate-200" />
            <div className="h-5 w-2/3 rounded-full bg-slate-200" />
            <div className="flex gap-4 pt-2">
              <div className="h-12 w-36 rounded-full bg-slate-200" />
              <div className="h-12 w-36 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="rounded-[2.5rem] bg-white/70 p-6">
            <div className="aspect-[4/3] rounded-[2rem] bg-slate-200" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-[2rem] bg-white/70 p-5">
              <div className="aspect-[4/3] rounded-[1.5rem] bg-slate-200" />
              <div className="mt-5 h-6 w-3/4 rounded-full bg-slate-200" />
              <div className="mt-3 h-4 w-full rounded-full bg-slate-200" />
              <div className="mt-2 h-4 w-2/3 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
