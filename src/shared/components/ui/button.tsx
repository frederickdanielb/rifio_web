import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClassMap: Record<ButtonVariant, string> = {
  default: 'bg-rose-500 text-white hover:bg-rose-400',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-100 hover:bg-slate-800/80',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

export function Button({
  className,
  variant = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        variantClassMap[variant],
        className
      )}
      {...props}
    />
  );
}
