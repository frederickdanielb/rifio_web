import { ArrowUpRight, Crown, User, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/button';
import { Card } from '../../../shared/components/ui/card';

export function SettingsScreen() {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const claims = useAppSelector((s) => s.auth.claims);

  return (
    <section className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-slate-50">Configuración</h1>
        <p className="mt-1 text-sm text-slate-400">Gestiona tu perfil y suscripción.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Perfil */}
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">Perfil</h3>
              <p className="text-xs text-slate-400">Información de tu cuenta</p>
            </div>
          </div>
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Nombre</span>
              <span className="font-medium text-slate-200">{user?.name ?? '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Email</span>
              <span className="font-medium text-slate-200">{user?.email ?? '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Rol</span>
              <span className="font-medium text-slate-200">{claims?.role ?? '—'}</span>
            </div>
          </div>
        </Card>

        {/* Suscripción */}
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-50">Mi Suscripción</h3>
              <p className="text-xs text-slate-400">Plan y límites actuales</p>
            </div>
          </div>
          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Account ID</span>
              <span className="font-mono text-xs text-slate-300">
                {claims?.accountId ? `${claims.accountId.slice(0, 8)}...` : '—'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Plan actual</span>
              {claims?.plan ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold ${
                    claims.plan === 'Free'
                      ? 'bg-slate-800 text-slate-200'
                      : claims.plan === 'Pro'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {claims.plan === 'Free' && <Zap className="h-3 w-3" />}
                  {claims.plan}
                </span>
              ) : (
                <span className="text-xs text-slate-500">Desconocido</span>
              )}
            </div>
            {claims?.plan === 'Free' && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
                <p className="text-xs text-slate-300">
                  El Plan Free te permite <strong>1 rifa</strong> con hasta{' '}
                  <strong>100 tickets</strong>. Mejora a Pro para obtener 100 rifas y 1.000 tickets
                  por rifa.
                </p>
                <Button
                  className="mt-3 h-9 w-full gap-1.5 text-xs"
                  onClick={() => navigate('/pricing')}
                >
                  Mejorar Plan
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
