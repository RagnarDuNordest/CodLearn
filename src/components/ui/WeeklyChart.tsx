'use client';

import { useWeeklyActivity } from '@/hooks/useWeeklyActivity';

interface WeeklyChartProps {
  className?: string;
}

export default function WeeklyChart({ className = '' }: WeeklyChartProps) {
  const { weekData } = useWeeklyActivity();

  const maxCount = Math.max(...weekData.map((d) => d.count), 1);
  const bestDay = weekData.reduce((best, d) => (d.count > best.count ? d : best), weekData[0] ?? { count: 0, label: '' });

  const todayKey = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })();

  return (
    <div className={`bg-card border border-border rounded-xl p-5 ${className}`}>
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <span>📊</span>
        Atividade semanal
      </h3>

      {/* Bars */}
      <div className="flex items-end justify-between gap-1 h-24 mb-2">
        {weekData.map((day) => {
          const isToday = day.date === todayKey;
          const heightPct = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
          const minHeight = day.count > 0 ? 8 : 2;

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
              {/* Count above bar */}
              <span
                className={`text-[10px] font-medium transition-opacity ${
                  day.count > 0 ? 'opacity-100 text-foreground' : 'opacity-0'
                }`}
              >
                {day.count}
              </span>

              {/* Bar */}
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`w-full rounded-t-sm transition-all duration-500 ${
                    isToday ? 'bg-primary' : 'bg-primary/30'
                  }`}
                  style={{
                    height: day.count > 0
                      ? `${Math.max(minHeight, heightPct)}%`
                      : `${minHeight}px`,
                    minHeight: `${minHeight}px`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Day labels */}
      <div className="flex justify-between gap-1">
        {weekData.map((day) => {
          const isToday = day.date === todayKey;
          return (
            <div key={day.date} className="flex-1 text-center">
              <span
                className={`text-[10px] font-medium ${
                  isToday ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {day.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Caption */}
      {bestDay && bestDay.count > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Melhor dia: <span className="font-semibold text-foreground">{bestDay.count} {bestDay.count === 1 ? 'lição' : 'lições'}</span>
        </p>
      )}
    </div>
  );
}
