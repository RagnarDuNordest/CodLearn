'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: string;
}

export default function ProgressBar({
  value,
  className = '',
  color = 'bg-primary',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
    >
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
}
