import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
// import { loginRequest } from '../store/authSlice';
import { loginRequest, loginSuccess } from '../store/authSlice';
import type { LoginRequestDto } from '../types/authTypes';

const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
      toast.success('Sesion iniciada');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // const onSubmit = (values: LoginSchema) => {
  //   const payload: LoginRequestDto = {
  //     email: values.email,
  //     password: values.password,
  //   };
  //   dispatch(loginRequest(payload));
  // };
const onSubmit = (values: LoginSchema) => {
    // 🔥 MOCK DE LOGIN: Comentamos la llamada real a la saga/API
    /*
    const payload: LoginRequestDto = {
      email: values.email,
      password: values.password,
    };
    dispatch(loginRequest(payload));
    */

    // Simulamos que el backend respondió con éxito instantáneamente
    dispatch(loginSuccess({
      user: { 
        id: '1', 
        email: values.email, 
        name: 'Admin Rifio' 
      },
      token: 'fake-jwt-token-123456789'
    }));
  };
  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Iniciar sesion</h2>
          <p className="text-sm text-slate-300">Ingresa tus credenciales para continuar.</p>
        </div>
      </div>
      <form className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@rifio.com"
            className="h-11 border-slate-700 bg-slate-950/80 focus:border-rose-500"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-rose-400">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="password">Contrasena</Label>
          <Input
            id="password"
            type="password"
            placeholder="******"
            className="h-11 border-slate-700 bg-slate-950/80 focus:border-rose-500"
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-rose-400">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="h-11 w-full gap-2 text-sm" disabled={loading}>
          <LogIn className="h-4 w-4" />
          {loading ? 'Ingresando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}
