import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
import { registerRequest } from '../store/authSlice';
import type { RegisterRequestDto } from '../types/authTypes';

const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nombre: '', email: '', password: '' },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
      toast.success('Cuenta creada exitosamente');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (values: RegisterSchema) => {
    const payload: RegisterRequestDto = {
      nombre: values.nombre,
      email: values.email,
      password: values.password,
    };
    dispatch(registerRequest(payload));
  };

  return (
    <div className="w-full max-w-md space-y-7">
      <div className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
          <UserPlus className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50">Crear cuenta</h2>
          <p className="text-sm text-slate-300">Comienza con el Plan Free, sin costo.</p>
        </div>
      </div>
      <form
        className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-2.5">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            type="text"
            placeholder="Tu nombre completo"
            className="h-11 border-slate-700 bg-slate-950/80 focus:border-rose-500"
            {...form.register('nombre')}
          />
          {form.formState.errors.nombre && (
            <p className="text-xs text-rose-400">{form.formState.errors.nombre.message}</p>
          )}
        </div>
        <div className="space-y-2.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
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
          <UserPlus className="h-4 w-4" />
          {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
        </Button>
        <p className="text-center text-xs text-slate-400">
          Ya tienes cuenta?{' '}
          <Link to="/login" className="text-rose-400 hover:underline">
            Inicia sesion
          </Link>
        </p>
      </form>
    </div>
  );
}
