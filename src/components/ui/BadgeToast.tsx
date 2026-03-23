'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/hooks/useBadges';
import { playSound } from '@/lib/sounds';

interface ToastItem {
  id: number;
  badge: Badge;
}

export default function BadgeToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const badge = (e as CustomEvent<Badge>).detail;
      const id = Date.now() + Math.random();
      setCounter((c) => c + 1);
      setToasts((prev) => [...prev, { id, badge }]);
      playSound('badge');

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener('codlearn:badge-earned', handler);
    return () => window.removeEventListener('codlearn:badge-earned', handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto badge-toast-enter flex items-center gap-3 bg-card border border-primary/40 rounded-xl shadow-xl px-4 py-3 min-w-[260px] max-w-xs"
        >
          <span className="text-3xl leading-none flex-shrink-0">{t.badge.emoji}</span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-0.5">
              Nova conquista desbloqueada!
            </p>
            <p className="text-sm font-semibold text-foreground truncate">{t.badge.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{t.badge.description}</p>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes badge-slide-in {
          from { opacity: 0; transform: translateX(110%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .badge-toast-enter {
          animation: badge-slide-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
      `}</style>
    </div>
  );
}
