import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutRequest } from '../../../features/auth/store/authSlice';
import { cn } from '../../lib/utils';

export function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((s) => s.auth.user);
  const claims = useAppSelector((s) => s.auth.claims);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpen(false);
    dispatch(logoutRequest());
    navigate('/login');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur">
      <span className="text-sm font-medium text-slate-300">
        {user?.name ?? 'Usuario'}
      </span>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm transition-colors hover:border-slate-600"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
            <UserCircle className="h-4 w-4" />
          </div>
          <div className="hidden flex-col items-start sm:flex">
            <span className="text-xs font-medium text-slate-200">
              {user?.email ?? ''}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 text-slate-400 transition-transform',
              open && 'rotate-180'
            )}
          />
        </button>

        {open && (
          <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl">
            <div className="space-y-1 border-b border-slate-800 px-3 pb-3 pt-2">
              <p className="text-xs text-slate-400">{user?.email}</p>
              <div className="mt-2 flex items-center gap-2">
                {claims?.plan && (
                  <span className="inline-flex items-center gap-1 rounded-xl bg-rose-500/15 px-2.5 py-0.5 text-xs font-semibold text-rose-400">
                    {claims.plan}
                  </span>
                )}
                {claims?.role && (
                  <span className="inline-flex items-center gap-1 rounded-xl bg-slate-800 px-2.5 py-0.5 text-xs text-slate-300">
                    {claims.role}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  navigate('/settings');
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-slate-800"
              >
                <Settings className="h-4 w-4" />
                Configuración
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
