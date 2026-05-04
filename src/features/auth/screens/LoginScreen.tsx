import { GridBackground } from '../../../shared/components/GridBackground';
import { LoginForm } from '../components/LoginForm';
import { SocialDivider } from '../components/SocialDivider';
import { GoogleLoginButton } from '../components/GoogleLoginButton';

export function LoginScreen() {
  return (
    <GridBackground>
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="grid min-h-[620px] md:grid-cols-2">
          <aside className="hidden border-r border-slate-800 bg-slate-900/80 p-10 md:flex md:flex-col md:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-rose-400">Rifio</p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-50">
                Gestiona rifas y ventas desde un solo panel.
              </h1>
              <p className="text-sm text-slate-300">
                Acceso seguro para administrar sorteos, disponibilidad de tickets y operaciones del
                equipo.
              </p>
            </div>
            <p className="text-xs text-slate-400">Plataforma interna de administracion</p>
          </aside>
          <div className="flex items-center justify-center bg-slate-950/80 p-6 sm:p-10">
            <div className="w-full max-w-md space-y-7">
              <LoginForm />
              <SocialDivider />
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </GridBackground>
  );
}
