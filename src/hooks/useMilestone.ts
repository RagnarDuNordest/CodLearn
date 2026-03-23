'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProgress } from '@/lib/progress';

const SEEN_KEY = 'codlearn_seen_milestones';

export interface MilestoneConfig {
  lessons: number;
  title: string;
  message: string;
  color: string;
}

export const MILESTONES: MilestoneConfig[] = [
  { lessons: 1,   title: 'Primeira Lição! 🐣',   message: 'Você deu o primeiro passo. A jornada começa agora!', color: '#22c55e' },
  { lessons: 10,  title: '10 Lições! 🔥',         message: 'Você está pegando o jeito. Continue assim!', color: '#f97316' },
  { lessons: 25,  title: '25 Lições! ⭐',         message: 'Um quarto do caminho percorrido. Impressionante!', color: '#eab308' },
  { lessons: 50,  title: '50 Lições! 🏆',         message: 'Metade do caminho! Você é incrível!', color: '#6366f1' },
  { lessons: 100, title: '100 Lições! 🚀',        message: 'Você completou 100 lições! Lendário!', color: '#ec4899' },
  { lessons: 123, title: 'Curso Completo! 🎓',    message: 'PARABÉNS! Você completou TODO o CodLearn!', color: '#fbbf24' },
];

function getSeenMilestones(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as number[];
  } catch {
    return [];
  }
}

function saveSeenMilestones(seen: number[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
}

function countCompletedLessons(): number {
  const progress = getProgress();
  return Object.values(progress.lessons).filter((l) => l.completed).length;
}

export function useMilestone() {
  const [showMilestone, setShowMilestone] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<MilestoneConfig | null>(null);

  const check = useCallback(() => {
    const completed = countCompletedLessons();
    const seen = getSeenMilestones();

    // Find the highest milestone that has been reached but not yet seen
    for (let i = MILESTONES.length - 1; i >= 0; i--) {
      const m = MILESTONES[i];
      if (completed >= m.lessons && !seen.includes(m.lessons)) {
        // Mark as seen immediately
        const updated = [...seen, m.lessons];
        saveSeenMilestones(updated);
        setCurrentMilestone(m);
        setShowMilestone(true);
        break;
      }
    }
  }, []);

  useEffect(() => {
    check();
  }, [check]);

  useEffect(() => {
    const handler = () => check();
    window.addEventListener('codlearn:progress-updated', handler);
    window.addEventListener('codlearn:lesson-completed', handler);
    return () => {
      window.removeEventListener('codlearn:progress-updated', handler);
      window.removeEventListener('codlearn:lesson-completed', handler);
    };
  }, [check]);

  const dismiss = useCallback(() => {
    setShowMilestone(false);
    setCurrentMilestone(null);
  }, []);

  return { showMilestone, currentMilestone, dismiss };
}
