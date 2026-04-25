import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { logoutRequest } from '../../auth/store/authSlice';

export function DashboardScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8 flex flex-col">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <h1 className="text-3xl font-semibold">Panel Central de Rifio</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-2xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
        >
          Cerrar Sesion
        </button>
      </div>
    </main>
  );
}
