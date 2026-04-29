import { LayoutDashboard, Settings, Ticket, Users } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../../app/store';
import { logoutRequest } from '../../../features/auth/store/authSlice';
import { Navbar } from './Navbar';
import { UpgradeModal } from '../UpgradeModal';

const navigationItems = [
  { to: '/', label: 'Inicio', icon: LayoutDashboard, end: true },
  { to: '/rifas', label: 'Rifas', icon: Ticket, end: false },
  { to: '/clientes', label: 'Clientes', icon: Users, end: false },
];

export function DashboardLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white md:grid md:grid-cols-[260px,1fr]">
      <aside className="hidden border-r border-slate-800 bg-slate-900 p-5 md:flex md:flex-col">
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
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-rose-500 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            <Settings className="h-4 w-4" />
            <span>Configuración</span>
          </NavLink>
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          Cerrar Sesión
        </button>
      </aside>

      <div className="flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <UpgradeModal />
    </div>
  );
}
