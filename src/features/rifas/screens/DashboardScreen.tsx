export function DashboardScreen() {
  const stats = [
    { title: 'Rifas Activas', value: '12' },
    { title: 'Tickets Vendidos', value: '8,240' },
    { title: 'Ingresos Totales', value: '$24,500,000' },
  ];

  return (
    <section className="min-h-full bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Bienvenido a Rifio</h1>
          <p className="text-sm text-slate-300">Resumen general de tu operacion diaria.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.title} className="rounded-2xl bg-slate-900 p-6">
              <p className="text-sm text-slate-300">{stat.title}</p>
              <p className="mt-3 text-3xl font-semibold text-rose-500">{stat.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
