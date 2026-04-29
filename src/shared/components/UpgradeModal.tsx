import { ArrowUpRight, ShieldAlert, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { closeUpgradeModal } from '../../app/uiSlice';

export function UpgradeModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isUpgradeModalOpen, upgradeModalMessage } = useAppSelector((s) => s.ui);

  if (!isUpgradeModalOpen) return null;

  const handleUpgrade = () => {
    dispatch(closeUpgradeModal());
    navigate('/pricing');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => dispatch(closeUpgradeModal())}
      />
      <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">
        <button
          type="button"
          onClick={() => dispatch(closeUpgradeModal())}
          className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-slate-50">
            Limite del plan alcanzado
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{upgradeModalMessage}</p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleUpgrade}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
          >
            Ver Planes
            <ArrowUpRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => dispatch(closeUpgradeModal())}
            className="w-full rounded-2xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            Quizas mas tarde
          </button>
        </div>
      </div>
    </div>
  );
}
