import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LoaderCircle, MailCheck, ShieldAlert } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { verifyEmailRequest } from '../store/authSlice';

export function VerifyEmailScreen() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const email = searchParams.get('email') ?? '';
  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    if (email && token) {
      dispatch(verifyEmailRequest({ email, token }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!email || !token) {
    return (
      <section className="grid min-h-screen place-items-center bg-slate-950 px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-semibold text-slate-50">Enlace inválido</h1>
          <p className="text-sm text-slate-300">
            Faltan los parámetros de verificación en la URL.
          </p>
          <Link
            to="/login"
            className="inline-block rounded-2xl bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </section>
    );
  }

  if (isAuthenticated) {
    return (
      <section className="grid min-h-screen place-items-center bg-slate-950 px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <MailCheck className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-semibold text-slate-50">Cuenta verificada</h1>
          <p className="text-sm text-slate-300">
            Tu email ha sido verificado exitosamente. Serás redirigido al dashboard.
          </p>
          <Link
            to="/"
            className="inline-block rounded-2xl bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Ir al dashboard
          </Link>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="grid min-h-screen place-items-center bg-slate-950 px-4">
        <div className="text-center space-y-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-semibold text-slate-50">Error al verificar</h1>
          <p className="text-sm text-slate-300">{error}</p>
          <Link
            to="/login"
            className="inline-block rounded-2xl bg-rose-500 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Ir al inicio de sesión
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="grid min-h-screen place-items-center bg-slate-950 px-4">
      <div className="text-center space-y-4">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
          <LoaderCircle className="h-7 w-7 animate-spin" />
        </div>
        <h1 className="text-xl font-semibold text-slate-50">Verificando tu cuenta</h1>
        <p className="text-sm text-slate-300">
          {loading ? 'Estamos validando tu correo en Rifio...' : 'Procesando...'}
        </p>
      </div>
    </section>
  );
}
