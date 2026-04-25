import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/button';
import { Card } from '../../../shared/components/ui/card';
import { RifaCard } from '../components/RifaCard';
import { fetchRifasRequest } from '../store/rifasSlice';

export function RifasScreen() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.rifas);

  useEffect(() => {
    dispatch(fetchRifasRequest());
  }, [dispatch]);

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-50">Gestion de Rifas</h1>
        <p className="text-sm text-slate-400">Administra rifas activas y su avance de ventas.</p>
      </header>

      {loading && <Card className="text-sm text-slate-300">Cargando rifas...</Card>}
      {error && (
        <Card className="space-y-4">
          <p className="text-sm text-rose-300">{error}</p>
          <Button onClick={() => dispatch(fetchRifasRequest())}>Reintentar</Button>
        </Card>
      )}
      {!loading && !error && items.length === 0 && (
        <Card className="text-sm text-slate-300">No hay rifas registradas.</Card>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((rifa) => (
          <RifaCard key={rifa.id} rifa={rifa} />
        ))}
      </div>
    </section>
  );
}
