'use client';

import { motion } from 'framer-motion';
import { BookOpen, Flame, Clock, Zap, GripVertical } from 'lucide-react';

interface Stats {
  completed: number;
  total: number;
  percentage: number;
}

interface StatsCardsProps {
  cardOrder: string[];
  draggingId: string | null;
  overall: Stats;
  streakDays: number;
  studyMinutes: number;
  modulesStarted: number;
  modulesCompleted: number;
  onDragStart: (id: string) => void;
  onDragOver: (e: React.DragEvent, overId: string) => void;
  onDrop: () => void;
}

function formatStudyTime(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes} min`;
}

const cardConfigs = {
  licoes: {
    accent: 'hover:shadow-primary/20 hover:border-primary/40',
    iconBg: 'bg-primary/10',
    icon: BookOpen,
    iconClass: 'text-primary',
    barColor: 'bg-primary',
  },
  streak: {
    accent: 'hover:shadow-orange-500/20 hover:border-orange-500/30',
    iconBg: 'bg-orange-500/10',
    icon: Flame,
    iconClass: 'text-orange-500',
    barColor: 'bg-orange-500',
  },
  tempo: {
    accent: 'hover:shadow-amber-500/20 hover:border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    icon: Clock,
    iconClass: 'text-amber-500',
    barColor: '',
  },
  progresso: {
    accent: 'hover:shadow-emerald-500/20 hover:border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    icon: Zap,
    iconClass: 'text-emerald-500',
    barColor: 'bg-emerald-500',
  },
};

export default function StatsCards({
  cardOrder, draggingId, overall, streakDays, studyMinutes,
  modulesStarted, modulesCompleted, onDragStart, onDragOver, onDrop,
}: StatsCardsProps) {

  const baseClass = (id: string) => {
    const cfg = cardConfigs[id as keyof typeof cardConfigs];
    return `bg-card border border-border rounded-xl p-4 cursor-grab active:cursor-grabbing select-none transition-all group relative flex flex-col gap-3 hover:shadow-lg ${cfg?.accent ?? ''} ${
      draggingId === id ? 'opacity-50 scale-95' : 'opacity-100'
    }`;
  };

  const dragProps = (id: string) => ({
    draggable: true,
    onDragStart: () => onDragStart(id),
    onDragOver: (e: React.DragEvent) => onDragOver(e, id),
    onDrop,
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {cardOrder.map((id, idx) => {
        const cfg = cardConfigs[id as keyof typeof cardConfigs];
        if (!cfg) return null;
        const Icon = cfg.icon;

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.07, ease: 'easeOut' }}
          >
            <div className={baseClass(id)} {...dragProps(id)}>
              <GripVertical className="w-3 h-3 text-muted-foreground/40 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />

              {id === 'licoes' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 ${cfg.iconBg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${cfg.iconClass}`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Lições</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none">{overall.completed}<span className="text-sm font-normal text-muted-foreground">/{overall.total}</span></p>
                    <p className="text-[11px] text-muted-foreground mt-1">{modulesStarted} módulo{modulesStarted !== 1 ? 's' : ''} iniciado{modulesStarted !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cfg.barColor} transition-all`} style={{ width: `${overall.percentage}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 text-right">{overall.percentage}%</p>
                  </div>
                </>
              )}

              {id === 'streak' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 ${cfg.iconBg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${cfg.iconClass}`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Sequência</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none">{streakDays} <span className="text-sm font-normal text-muted-foreground">{streakDays === 1 ? 'dia' : 'dias'}</span></p>
                    <p className="text-[11px] text-muted-foreground mt-1">{streakDays > 0 ? '🔥 Continue assim!' : 'Comece hoje!'}</p>
                  </div>
                  <div className="flex gap-1 mt-auto">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i >= 7 - streakDays ? cfg.barColor : 'bg-muted'}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground -mt-2">Últimos 7 dias</p>
                </>
              )}

              {id === 'tempo' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 ${cfg.iconBg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${cfg.iconClass}`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Tempo</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold leading-none">{formatStudyTime(studyMinutes)}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">total estudado</p>
                  </div>
                  <div className="mt-auto pt-2 border-t border-border/40 flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">Média/sessão</span>
                    <span className={`text-[10px] font-semibold ${cfg.iconClass}`}>
                      {overall.completed > 0 ? formatStudyTime(Math.round(studyMinutes / overall.completed)) : '—'}
                    </span>
                  </div>
                </>
              )}

              {id === 'progresso' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 ${cfg.iconBg} rounded-lg`}>
                      <Icon className={`w-4 h-4 ${cfg.iconClass}`} />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Progresso</span>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold leading-none ${cfg.iconClass}`}>{overall.percentage}<span className="text-sm font-normal text-muted-foreground">%</span></p>
                    <p className="text-[11px] text-muted-foreground mt-1">{modulesCompleted} módulo{modulesCompleted !== 1 ? 's' : ''} completo{modulesCompleted !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${cfg.barColor} transition-all`} style={{ width: `${overall.percentage}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>{overall.completed} feitas</span>
                      <span>{overall.total - overall.completed} restantes</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
