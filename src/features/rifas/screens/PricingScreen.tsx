import { Check, Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/button';
import { cn } from '../../../shared/lib/utils';

interface Plan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: { label: string; to: string };
}

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Para empezar a organizar rifas pequenas.',
    price: '$0',
    period: 'para siempre',
    features: [
      '1 rifa activa',
      '100 tickets por rifa',
      'Roles RBAC (Organizador + Vendedor)',
      'Verificacion de tickets por QR',
      'Dashboard basico',
    ],
    highlighted: false,
    cta: { label: 'Comenzar gratis', to: '/register' },
  },
  {
    name: 'Pro',
    description: 'Para operadores con multiples rifas.',
    price: '$10.000',
    period: '/mes (CLP)',
    features: [
      '100 rifas activas',
      '1.000 tickets por rifa',
      'Grupos jerarquicos ilimitados',
      'Sorteos con hash de auditoria',
      'Soporte por email',
    ],
    highlighted: true,
    cta: { label: 'Hablar con ventas', to: '/register' },
  },
  {
    name: 'Premium',
    description: 'Para grandes operadores y colegios.',
    price: 'Personalizado',
    period: '',
    features: [
      'Rifas ilimitadas',
      'Tickets ilimitados',
      'Multiples organizadores por cuenta',
      'API de integracion',
      'Soporte dedicado 24/7',
      'Dominio personalizado',
    ],
    highlighted: false,
    cta: { label: 'Contactar', to: '/register' },
  },
];

export function PricingScreen() {
  return (
    <section className="min-h-screen bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-rose-400">Planes</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-50 sm:text-5xl">
          Elige el plan perfecto para tu rifa
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Todos los planes incluyen RBAC, verificacion de tickets y dashboard. Empieza con Free y
          haz upgrade cuando necesites.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'flex flex-col rounded-2xl border p-8',
              plan.highlighted
                ? 'border-rose-500/40 bg-rose-500/5 ring-1 ring-rose-500/20'
                : 'border-slate-800 bg-slate-900/70'
            )}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex h-8 w-8 items-center justify-center rounded-xl',
                    plan.highlighted ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                  )}
                >
                  {plan.name === 'Free' ? (
                    <Zap className="h-4 w-4" />
                  ) : plan.name === 'Pro' ? (
                    <Building2 className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </span>
                <h3 className="text-lg font-semibold text-slate-50">{plan.name}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-slate-50">{plan.price}</span>
                {plan.period && (
                  <span className="ml-1 text-sm text-slate-400">{plan.period}</span>
                )}
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Link to={plan.cta.to} className="mt-8 block">
              <Button
                className={cn(
                  'h-11 w-full text-sm',
                  plan.highlighted ? '' : 'bg-slate-800 hover:bg-slate-700'
                )}
              >
                {plan.cta.label}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
