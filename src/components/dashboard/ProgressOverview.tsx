'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { modules } from '@/data/modules';

const MODULE_COLORS: Record<string, string> = {
  intro: '#0891B2', logica: '#7C3AED', linux: '#4B5563', git: '#F05032',
  python: '#3572A5', c: '#555555', java: '#B07219', estruturas: '#059669',
  algoritmos: '#D97706', sql: '#336791', 'html-css': '#E44D26',
  frontend: '#c9a800', backend: '#1D4ED8',
};

interface Stats {
  completed: number;
  total: number;
  percentage: number;
}

interface ModuleStats {
  completed: number;
  total: number;
}

interface ProgressOverviewProps {
  overall: Stats;
  dailyStreak: number;
  getModuleStats: (moduleId: string, lessonIds: string[]) => ModuleStats;
}

export default function ProgressOverview({ overall, dailyStreak, getModuleStats }: ProgressOverviewProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <span className="text-base">📈</span> Visão Geral do Progresso
        </h2>
        <Link href="/progresso" className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          Ver detalhes <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="flex flex-col items-center justify-center bg-primary/5 border border-primary/20 rounded-xl py-3">
          <p className="text-2xl font-bold text-primary">{overall.percentage}%</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Concluído</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-emerald-500/5 border border-emerald-500/20 rounded-xl py-3">
          <p className="text-2xl font-bold text-emerald-400">{overall.completed}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Lições</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-orange-500/5 border border-orange-500/20 rounded-xl py-3">
          <p className="text-2xl font-bold text-orange-400">{dailyStreak}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">🔥 Streak</p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
          <span>Progresso total</span>
          <span>{overall.completed}/{overall.total} lições</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${overall.percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {[...modules].sort((a, b) => a.order - b.order).map((mod) => {
          const stats = getModuleStats(mod.id, mod.lessons);
          const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const color = MODULE_COLORS[mod.id] ?? '#6366f1';
          if (pct === 0) return null;
          return (
            <div key={mod.id}>
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span className="truncate">{mod.title}</span>
                <span className="shrink-0 ml-2 font-medium" style={{ color }}>{pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
        {overall.completed === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            Complete sua primeira lição para ver o progresso aqui!
          </p>
        )}
      </div>
    </div>
  );
}
