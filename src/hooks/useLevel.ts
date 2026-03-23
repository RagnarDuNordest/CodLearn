'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProgress } from '@/lib/progress';
import { getAllLessons } from '@/data/lessons';

// ─── XP values ─────────────────────────────────────────────────────────────
const XP_LESSON = 10;
const XP_GUIDED_PROJECT = 25;
const XP_FREE_PROJECT = 30;

// ─── Level table ────────────────────────────────────────────────────────────
export interface LevelInfo {
  level: number;
  name: string;
  minXP: number;   // XP needed to reach this level
  maxXP: number;   // XP needed to reach the NEXT level (or Infinity for max)
  emoji: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1,  name: 'Iniciante',    minXP: 0,    maxXP: 60,   emoji: '🌱' },
  { level: 2,  name: 'Curioso',      minXP: 60,   maxXP: 160,  emoji: '🔍' },
  { level: 3,  name: 'Aprendiz',     minXP: 160,  maxXP: 320,  emoji: '📖' },
  { level: 4,  name: 'Explorador',   minXP: 320,  maxXP: 540,  emoji: '🧭' },
  { level: 5,  name: 'Programador',  minXP: 540,  maxXP: 820,  emoji: '💻' },
  { level: 6,  name: 'Desenvolvedor',minXP: 820,  maxXP: 1160, emoji: '⚡' },
  { level: 7,  name: 'Engenheiro',   minXP: 1160, maxXP: 1560, emoji: '🔧' },
  { level: 8,  name: 'Arquiteto',    minXP: 1560, maxXP: 2020, emoji: '🏗️' },
  { level: 9,  name: 'Mestre',       minXP: 2020, maxXP: 2550, emoji: '🎓' },
  { level: 10, name: 'Lenda',        minXP: 2550, maxXP: Infinity, emoji: '🏆' },
];

export interface LevelState {
  totalXP: number;
  level: number;
  levelInfo: LevelInfo;
  /** XP earned within the current level (0 .. xpForThisLevel-1) */
  xpInLevel: number;
  /** Total XP span of the current level */
  xpForLevel: number;
  /** Progress percentage inside the current level (0–100) */
  progressPct: number;
  /** XP still needed to reach next level (0 when at max level) */
  xpToNext: number;
}

// ─── Calculation helpers ─────────────────────────────────────────────────────

function computeTotalXP(): number {
  const progress = getProgress();
  const lessons = getAllLessons();
  const lessonMap = new Map(lessons.map((l) => [l.id, l]));

  let xp = 0;
  for (const [id, lp] of Object.entries(progress.lessons)) {
    if (!lp.completed) continue;
    const lesson = lessonMap.get(id);
    if (!lesson) {
      xp += XP_LESSON;
    } else if (lesson.type === 'guided-project') {
      xp += XP_GUIDED_PROJECT;
    } else if (lesson.type === 'free-project') {
      xp += XP_FREE_PROJECT;
    } else {
      xp += XP_LESSON;
    }
  }
  return xp;
}

function buildLevelState(totalXP: number): LevelState {
  // Find current level
  let levelInfo = LEVELS[LEVELS.length - 1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVELS[i].minXP) {
      levelInfo = LEVELS[i];
      break;
    }
  }

  const xpInLevel = totalXP - levelInfo.minXP;
  const xpForLevel =
    levelInfo.maxXP === Infinity
      ? 1 // max level — always show full bar
      : levelInfo.maxXP - levelInfo.minXP;

  const progressPct =
    levelInfo.maxXP === Infinity
      ? 100
      : Math.min(100, Math.round((xpInLevel / xpForLevel) * 100));

  const xpToNext =
    levelInfo.maxXP === Infinity ? 0 : levelInfo.maxXP - totalXP;

  return {
    totalXP,
    level: levelInfo.level,
    levelInfo,
    xpInLevel,
    xpForLevel,
    progressPct,
    xpToNext,
  };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useLevel(): LevelState {
  const [state, setState] = useState<LevelState>(() =>
    buildLevelState(0)
  );

  const refresh = useCallback(() => {
    const xp = computeTotalXP();
    setState(buildLevelState(xp));
  }, []);

  // Load on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Listen for progress updates dispatched by saveProgress()
  useEffect(() => {
    window.addEventListener('codlearn:progress-updated', refresh);
    return () => window.removeEventListener('codlearn:progress-updated', refresh);
  }, [refresh]);

  return state;
}
