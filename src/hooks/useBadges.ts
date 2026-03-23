'use client';

import { useState, useEffect, useCallback } from 'react';
import { getProgress } from '@/lib/progress';
import { getAllLessons } from '@/data/lessons';
import { modules } from '@/data/modules';

const BADGES_KEY = 'codlearn_badges';

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedAt?: string;
}

interface StoredBadge {
  id: string;
  earnedAt: string;
}

function loadStoredBadges(): StoredBadge[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredBadge[];
  } catch {
    return [];
  }
}

function saveStoredBadges(badges: StoredBadge[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
}

function getTodayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function computeEarnedBadgeIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();

  const progress = getProgress();
  const lessons = getAllLessons();
  const lessonMap = new Map(lessons.map((l) => [l.id, l]));

  const completedLessons = Object.values(progress.lessons).filter((lp) => lp.completed);
  const completedIds = new Set(completedLessons.map((lp) => lp.lessonId));

  const earned = new Set<string>();

  // "Primeiro Passo" — completou a 1ª lição
  if (completedLessons.length >= 1) earned.add('primeiro-passo');

  // "Meia Centena" — 50 lições concluídas
  if (completedLessons.length >= 50) earned.add('meia-centena');

  // "Centenário" — 100 lições concluídas
  if (completedLessons.length >= 100) earned.add('centenario');

  // "Maratonista" — 7 dias seguidos (read from streak storage)
  try {
    const streakRaw = localStorage.getItem('codlearn_streak');
    if (streakRaw) {
      const streak = JSON.parse(streakRaw) as { lastDate: string; count: number };
      if (streak.count >= 7) earned.add('maratonista');
    }
  } catch { /* ignore */ }

  // "Primeiro Projeto" — completou 1 projeto guiado
  const hasGuidedProject = completedLessons.some((lp) => {
    const lesson = lessonMap.get(lp.lessonId);
    return lesson?.type === 'guided-project';
  });
  if (hasGuidedProject) earned.add('primeiro-projeto');

  // "Programador Livre" — completou 1 projeto livre
  const hasFreeProject = completedLessons.some((lp) => {
    const lesson = lessonMap.get(lp.lessonId);
    return lesson?.type === 'free-project';
  });
  if (hasFreeProject) earned.add('programador-livre');

  // "Módulo Completo" — completou um módulo inteiro
  const hasFullModule = modules.some((mod) =>
    mod.lessons.length > 0 && mod.lessons.every((id) => completedIds.has(id))
  );
  if (hasFullModule) earned.add('modulo-completo');

  // "Explorador" — abriu 5 módulos diferentes
  const openedModules = new Set(completedLessons.map((lp) => lp.moduleId));
  if (openedModules.size >= 5) earned.add('explorador');

  // "Speedrun" — completou 3 lições em 1 dia
  const today = getTodayString();
  const todayCompletions = completedLessons.filter((lp) => {
    if (!lp.completedAt) return false;
    return lp.completedAt.slice(0, 10) === today;
  });
  if (todayCompletions.length >= 3) earned.add('speedrun');

  // "Lenda" — atingiu nível 10 (XP >= 2550)
  // Compute XP inline to avoid hook dependency
  const XP_LESSON = 10;
  const XP_GUIDED = 25;
  const XP_FREE = 30;
  let totalXP = 0;
  for (const lp of completedLessons) {
    const lesson = lessonMap.get(lp.lessonId);
    if (!lesson) totalXP += XP_LESSON;
    else if (lesson.type === 'guided-project') totalXP += XP_GUIDED;
    else if (lesson.type === 'free-project') totalXP += XP_FREE;
    else totalXP += XP_LESSON;
  }
  if (totalXP >= 2550) earned.add('lenda');

  return earned;
}

const BADGE_DEFINITIONS: Omit<Badge, 'earned' | 'earnedAt'>[] = [
  { id: 'primeiro-passo',   title: 'Primeiro Passo',   description: 'Completou a primeira lição da plataforma.',     emoji: '🐣' },
  { id: 'maratonista',      title: 'Maratonista',       description: 'Manteve uma sequência de 7 dias seguidos.',      emoji: '🔥' },
  { id: 'meia-centena',     title: 'Meia Centena',      description: 'Concluiu 50 lições no total.',                   emoji: '📚' },
  { id: 'centenario',       title: 'Centenário',        description: 'Concluiu 100 lições no total.',                  emoji: '💯' },
  { id: 'primeiro-projeto', title: 'Primeiro Projeto',  description: 'Completou seu primeiro projeto guiado.',         emoji: '🏗️' },
  { id: 'programador-livre',title: 'Programador Livre', description: 'Completou seu primeiro projeto livre.',          emoji: '⚡' },
  { id: 'modulo-completo',  title: 'Módulo Completo',   description: 'Completou todas as lições de um módulo inteiro.', emoji: '🎓' },
  { id: 'explorador',       title: 'Explorador',        description: 'Abriu lições em 5 módulos diferentes.',          emoji: '🧭' },
  { id: 'speedrun',         title: 'Speedrun',          description: 'Completou 3 lições em um único dia.',            emoji: '⏱️' },
  { id: 'lenda',            title: 'Lenda',             description: 'Atingiu o nível máximo — Nível 10!',             emoji: '🏆' },
];

export function useBadges() {
  const [badges, setBadges] = useState<Badge[]>(() =>
    BADGE_DEFINITIONS.map((def) => ({ ...def, earned: false }))
  );

  const refresh = useCallback(() => {
    if (typeof window === 'undefined') return;

    const earnedNow = computeEarnedBadgeIds();
    const stored = loadStoredBadges();
    const storedMap = new Map(stored.map((s) => [s.id, s.earnedAt]));

    const newStored: StoredBadge[] = [...stored];
    const newlyEarned: Omit<Badge, 'earned'>[] = [];

    for (const id of earnedNow) {
      if (!storedMap.has(id)) {
        const def = BADGE_DEFINITIONS.find((d) => d.id === id);
        if (def) {
          const earnedAt = new Date().toISOString();
          newStored.push({ id, earnedAt });
          storedMap.set(id, earnedAt);
          newlyEarned.push({ ...def, earnedAt });
        }
      }
    }

    if (newlyEarned.length > 0) {
      saveStoredBadges(newStored);
      for (const badge of newlyEarned) {
        window.dispatchEvent(
          new CustomEvent('codlearn:badge-earned', {
            detail: { ...badge, earned: true },
          })
        );
      }
    }

    const result: Badge[] = BADGE_DEFINITIONS.map((def) => {
      const earnedAt = storedMap.get(def.id);
      return {
        ...def,
        earned: !!earnedAt,
        earnedAt,
      };
    });

    setBadges(result);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    window.addEventListener('codlearn:progress-updated', refresh);
    return () => window.removeEventListener('codlearn:progress-updated', refresh);
  }, [refresh]);

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalCount = badges.length;

  return { badges, earnedCount, totalCount };
}
