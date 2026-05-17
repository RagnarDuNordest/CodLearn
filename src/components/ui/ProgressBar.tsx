'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: string;
}

function getDynamicColor(value: number, customColor?: string): string {
  if (customColor) return customColor;
  if (value === 100) return 'bg-emerald-500';
  if (value >= 60) return 'bg-primary';
  if (value >= 20) return 'bg-blue-400';
  return 'bg-muted-foreground/40';
}

export default function ProgressBar({ value, className = '', color }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const barColor = getDynamicColor(clampedValue, color);

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}>
      <motion.div
        className={`h-full rounded-full ${barColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
