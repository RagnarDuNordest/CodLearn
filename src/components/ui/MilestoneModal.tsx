'use client';

import { useEffect, useState, useCallback } from 'react';
import { useMilestone, MILESTONES } from '@/hooks/useMilestone';

const AUTO_DISMISS_SECONDS = 10;

export default function MilestoneModal() {
  const { showMilestone, currentMilestone, dismiss } = useMilestone();
  const [countdown, setCountdown] = useState(AUTO_DISMISS_SECONDS);

  // Reset countdown when modal opens
  useEffect(() => {
    if (!showMilestone) return;
    setCountdown(AUTO_DISMISS_SECONDS);

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          dismiss();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showMilestone, dismiss]);

  if (!showMilestone || !currentMilestone) return null;

  const currentIdx = MILESTONES.findIndex((m) => m.lessons === currentMilestone.lessons);
  const nextMilestone = currentIdx < MILESTONES.length - 1 ? MILESTONES[currentIdx + 1] : null;

  // Extract emoji from title (first non-letter/space chars near end)
  const emojiMatch = currentMilestone.title.match(/[\u{1F300}-\u{1FFFF}]|[\u{2600}-\u{26FF}]|[🐣🔥⭐🏆🚀🎓]/u);
  const bigEmoji = emojiMatch ? emojiMatch[0] : '🎉';

  // Progress ring for countdown
  const ringRadius = 20;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringProgress = (countdown / AUTO_DISMISS_SECONDS) * ringCircumference;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Card */}
      <div
        className="relative bg-card border-2 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300"
        style={{ borderColor: currentMilestone.color + '80' }}
      >
        {/* Countdown ring top-right */}
        <div className="absolute top-4 right-4">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={ringRadius}
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/30"
            />
            <circle
              cx="24"
              cy="24"
              r={ringRadius}
              fill="none"
              stroke={currentMilestone.color}
              strokeWidth="3"
              strokeDasharray={`${ringCircumference}`}
              strokeDashoffset={`${ringCircumference - ringProgress}`}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
            <text
              x="24"
              y="28"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="currentColor"
              className="text-foreground"
            >
              {countdown}
            </text>
          </svg>
        </div>

        {/* Big emoji */}
        <div className="text-[96px] leading-none mb-4 select-none">{bigEmoji}</div>

        {/* Confetti burst decoration */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                background: i % 3 === 0 ? currentMilestone.color : i % 3 === 1 ? '#fff' : '#fbbf24',
                left: `${8 + (i * 7.5)}%`,
                top: `${10 + (i % 4) * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.8 + (i % 3) * 0.3}s`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: currentMilestone.color }}
        >
          {currentMilestone.title}
        </h2>

        {/* Message */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {currentMilestone.message}
        </p>

        {/* Progress to next milestone */}
        {nextMilestone && (
          <div className="bg-muted/30 rounded-xl p-3 mb-6 text-sm text-muted-foreground">
            Próximo marco:{' '}
            <span className="font-semibold text-foreground">{nextMilestone.lessons} lições</span>
            {' '}(faltam{' '}
            <span className="font-semibold text-foreground">
              {nextMilestone.lessons - currentMilestone.lessons}
            </span>{' '}
            lições)
          </div>
        )}

        <button
          onClick={dismiss}
          className="w-full py-3 px-6 text-white font-bold rounded-xl transition-opacity hover:opacity-90"
          style={{ background: currentMilestone.color }}
        >
          Continuar estudando 🚀
        </button>
      </div>
    </div>
  );
}
