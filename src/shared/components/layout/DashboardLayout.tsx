import { LayoutDashboard, LogOut, Ticket, Users } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import type { AppDispatch } from '../../../app/store';
import { logoutRequest } from '../../../features/auth/store/authSlice';

const navigationItems = [
  { to: '/', label: 'Inicio', icon: LayoutDashboard, end: true },
  { to: '/rifas', label: 'Rifas', icon: Ticket, end: false },
  { to: '/clientes', label: 'Clientes', icon: Users, end: false },
];

export function DashboardLayout() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white md:grid md:grid-cols-[260px,1fr]">
      <aside className="flex h-full flex-col border-r border-slate-800 bg-slate-900 p-5">
        <div className="mb-8 text-2xl font-bold text-rose-500">Rifio.</div>
        <nav className="flex flex-1 flex-col gap-2">
          {navigationItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesion
        </button>
      </aside>

      <main className="p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
