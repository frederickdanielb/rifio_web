import { RegisterForm } from '../components/RegisterForm';

export function RegisterScreen() {
  return (
    <section className="grid min-h-screen place-items-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="grid min-h-[620px] md:grid-cols-2">
          <aside className="hidden border-r border-slate-800 bg-slate-900 p-10 md:flex md:flex-col md:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-400">Rifio</p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-50">
                Empieza a gestionar rifas hoy.
              </h1>
              <p className="text-sm text-slate-300">
                Plan Free incluido: 1 rifa, 100 tickets. Sin tarjeta de credito.
              </p>
            </div>
            <p className="text-xs text-slate-400">Plataforma interna de administracion</p>
          </aside>
          <div className="flex items-center justify-center bg-slate-950 p-6 sm:p-10">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
