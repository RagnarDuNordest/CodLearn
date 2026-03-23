'use client';

import { useBadges } from '@/hooks/useBadges';
import { Lock } from 'lucide-react';

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function BadgesPanel() {
  const { badges, earnedCount, totalCount } = useBadges();

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Conquistas</h2>
        <span className="text-sm text-muted-foreground font-medium">
          {earnedCount}/{totalCount} conquistas
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative rounded-xl border p-4 transition-all ${
              badge.earned
                ? 'border-primary/40 bg-primary/5 shadow-sm'
                : 'border-border bg-muted/30 opacity-50'
            }`}
          >
            {!badge.earned && (
              <div className="absolute top-2 right-2">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
            <div className="text-3xl mb-2 leading-none">
              {badge.earned ? badge.emoji : '❓'}
            </div>
            <p className={`text-sm font-semibold leading-tight mb-1 ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
              {badge.title}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {badge.description}
            </p>
            {badge.earned && badge.earnedAt && (
              <p className="text-[10px] text-primary mt-2 font-medium">
                Conquistado em {formatDate(badge.earnedAt)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
