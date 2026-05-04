import { type ReactNode, useCallback, useRef } from 'react';

interface GridBackgroundProps {
  children: ReactNode;
}

export function GridBackground({ children }: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-4 py-8"
      style={
        {
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      {/* Glow radial que sigue el mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(244,63,94,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
