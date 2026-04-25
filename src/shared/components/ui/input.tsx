import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 text-sm text-slate-50 placeholder:text-slate-400 outline-none transition-colors focus:border-rose-500',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
