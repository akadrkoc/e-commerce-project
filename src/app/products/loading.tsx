export default function ProductsLoading() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-zinc-100" />
      <div className="mt-2 h-5 w-72 animate-pulse rounded bg-zinc-100" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-zinc-100 p-6">
            <div className="aspect-square w-full animate-pulse rounded-xl bg-zinc-100" />
            <div className="mt-4 h-5 w-32 animate-pulse rounded bg-zinc-100" />
            <div className="mt-2 h-4 w-20 animate-pulse rounded bg-zinc-100" />
            <div className="mt-2 h-5 w-16 animate-pulse rounded bg-zinc-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
