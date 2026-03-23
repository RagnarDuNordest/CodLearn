'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { playSound } from '@/lib/sounds';
import quizzes from '@/data/quizzes/index';
import type { LessonQuizQuestion } from '@/types/quiz';

// ── Build question pool ────────────────────────────────────────────────────────
function buildPool(): LessonQuizQuestion[] {
  const all: LessonQuizQuestion[] = [];
  for (const quiz of quizzes) {
    for (const q of quiz.questions) all.push(q);
  }
  return all;
}

// ── Canvas constants ───────────────────────────────────────────────────────────
const CW          = 600;
const CH          = 220;
const GROUND      = 178;
const CHAR_X      = 80;
const CHAR_H      = 46;
const BASE_SPD    = 3.8;
const SPD_INC     = 0.0004;
const BEST_KEY    = 'codlearn_runner_best';
const Q_TRIGGER_X = 240;   // obstacle X that freezes the game
const Q_BONUS     = 50;    // pts for correct answer
const Q_SECONDS   = 8;     // seconds to answer

let _obsId = 0;

// ── Types ──────────────────────────────────────────────────────────────────────
interface Obs {
  id: number;
  x: number;
  w: number;
  h: number;
  kind: 0 | 1 | 2;
  questioned: boolean;
}

interface BgLine { text: string; x: number; y: number; spd: number; }

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  color: string;
  size: number;
}

interface GS {
  phase: 'idle' | 'running' | 'question' | 'dead';
  speed: number;
  score: number;
  frame: number;
  deadTimer: number;
  obs: Obs[];
  nextObs: number;
  walkCycle: number;
  walkTimer: number;
  bgOff: number;
  particles: Particle[];
  correctFlash: number;
  questionObsId: number | null;
  idleAnim: number;
}

// ── Background texts ───────────────────────────────────────────────────────────
const BG_TEXTS = [
  'for i in range(n):', 'def main():', 'print("bug!")', 'x = undefined',
  'while True:', 'NullPointerException', 'TypeError:', 'import sys',
  '{ syntax: error }', 'segfault', '404 not found', 'git merge conflict',
  'off-by-one error', 'infinite loop', 'stack overflow',
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function spawnObs(sf: number): Obs {
  const r = Math.random();
  let kind: 0 | 1 | 2;
  if (sf < 1.3)      kind = r < 0.65 ? 0 : 1;
  else if (sf < 1.7) kind = r < 0.35 ? 0 : r < 0.75 ? 1 : 2;
  else               kind = r < 0.2  ? 0 : r < 0.55 ? 1 : 2;
  const dims: [number, number][] = [[26, 28], [22, 42], [18, 54]];
  const [w, h] = dims[kind];
  return { id: ++_obsId, x: CW + 30, w, h, kind, questioned: false };
}

function makeBgLines(): BgLine[] {
  return BG_TEXTS.map((text, i) => ({
    text,
    x:   (i * 139 + 20) % CW,
    y:   22 + ((i * 47) % (GROUND - 50)),
    spd: 0.25 + (i * 0.11) % 0.55,
  }));
}

// ── drawRobot ──────────────────────────────────────────────────────────────────
function drawRobot(
  ctx: CanvasRenderingContext2D,
  dead: boolean,
  walk: number,
  qMode: boolean,
  anim: number,
) {
  const cx    = CHAR_X;
  const bob   = qMode ? Math.sin(anim * 0.06) * 1.5 : 0;
  const bott  = GROUND + bob;
  const ytop  = bott - CHAR_H;

  const col1 = dead ? '#ef4444' : qMode ? '#f59e0b' : '#6366f1';
  const col2 = dead ? '#dc2626' : qMode ? '#d97706' : '#4f46e5';
  const col3 = dead ? '#b91c1c' : qMode ? '#b45309' : '#3730a3';
  const eyeC = dead ? '#fca5a5' : qMode ? '#fef3c7' : '#67e8f9';

  // Antenna
  ctx.fillStyle = '#c7d2fe';
  ctx.fillRect(cx - 1, ytop - 6, 2, 7);
  ctx.fillRect(cx - 5, ytop - 8, 10, 3);
  ctx.fillStyle = col1;
  ctx.fillRect(cx - 4, ytop - 11, 8, 3);

  // Head
  ctx.fillStyle = col1;
  ctx.fillRect(cx - 13, ytop, 26, 19);

  // Visor
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(cx - 11, ytop + 5, 22, 10);

  // Eyes
  ctx.fillStyle = eyeC;
  ctx.fillRect(cx - 9, ytop + 7, 5, 6);
  ctx.fillRect(cx + 4,  ytop + 7, 5, 6);
  ctx.fillStyle = '#e0f2fe';
  ctx.fillRect(cx - 8, ytop + 8, 2, 2);
  ctx.fillRect(cx + 5,  ytop + 8, 2, 2);

  // Body
  ctx.fillStyle = col1;
  ctx.fillRect(cx - 12, ytop + 19, 24, 21);

  // Chest panel
  ctx.fillStyle = col3;
  ctx.fillRect(cx - 7, ytop + 23, 14, 13);
  ctx.fillStyle = eyeC;
  ctx.fillRect(cx - 5, ytop + 25, 10, 3);
  ctx.fillStyle = '#a5b4fc';
  ctx.fillRect(cx - 5, ytop + 30, 7, 2);

  // Arms
  ctx.fillStyle = col2;
  ctx.fillRect(cx - 18, ytop + 20, 6, 16);
  ctx.fillRect(cx + 12,  ytop + 20, 6, 16);
  ctx.fillStyle = col3;
  ctx.fillRect(cx - 19, ytop + 35, 8, 5);
  ctx.fillRect(cx + 11,  ytop + 35, 8, 5);

  // Legs
  ctx.fillStyle = col2;
  if (qMode || dead) {
    ctx.fillRect(cx - 12, ytop + 40, 10, 8);
    ctx.fillRect(cx + 2,   ytop + 40, 10, 8);
    ctx.fillStyle = col3;
    ctx.fillRect(cx - 14, ytop + 48, 13, 4);
    ctx.fillRect(cx + 1,   ytop + 48, 13, 4);
  } else {
    const lft = (walk % 2) === 0;
    const ll = lft ? 12 : 7;
    const rl = lft ? 7  : 12;
    ctx.fillRect(cx - 12, ytop + 40, 10, ll);
    ctx.fillRect(cx + 2,   ytop + 40, 10, rl);
    ctx.fillStyle = col3;
    ctx.fillRect(cx - 14, ytop + 40 + ll, 13, 4);
    ctx.fillRect(cx + 1,   ytop + 40 + rl, 13, 4);
  }

  // Question mark bubble when in question mode
  if (qMode) {
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fef3c7';
    ctx.fillText('?', cx, ytop - 16 + bob);
    ctx.textAlign = 'left';
  }
}

// ── drawBug ────────────────────────────────────────────────────────────────────
function drawBug(ctx: CanvasRenderingContext2D, obs: Obs, frame: number, glowing: boolean) {
  const bx  = obs.x;
  const by  = GROUND - obs.h;
  const legSwing = Math.sin(frame * 0.18) * 4;

  if (glowing) {
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur  = 14 + Math.sin(frame * 0.1) * 6;
  }

  if (obs.kind === 0) {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(bx, by, obs.w, obs.h);
    ctx.fillStyle = '#b91c1c';
    ctx.fillRect(bx + obs.w / 2 - 1, by + 2, 2, obs.h - 4);
    ctx.fillStyle = '#fca5a5';
    ctx.fillRect(bx + 4, by + obs.h * 0.4, 4, 4);
    ctx.fillRect(bx + obs.w - 8, by + obs.h * 0.4, 4, 4);
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx + 3, by + 3, 5, 5);
    ctx.fillRect(bx + obs.w - 8, by + 3, 5, 5);
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(bx + 5, by + 5, 2, 2);
    ctx.fillRect(bx + obs.w - 6, by + 5, 2, 2);
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 5, by); ctx.lineTo(bx + 2, by - 8);
    ctx.moveTo(bx + obs.w - 5, by); ctx.lineTo(bx + obs.w - 2, by - 8);
    ctx.stroke();
    ctx.strokeStyle = '#dc2626';
    for (let i = 0; i < 2; i++) {
      const ly = by + obs.h * (0.4 + i * 0.25);
      ctx.beginPath(); ctx.moveTo(bx, ly); ctx.lineTo(bx - 7, ly + legSwing); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + obs.w, ly); ctx.lineTo(bx + obs.w + 7, ly + legSwing); ctx.stroke();
    }
  } else if (obs.kind === 1) {
    ctx.fillStyle = '#f97316';
    ctx.fillRect(bx, by, obs.w, obs.h);
    ctx.fillStyle = '#ea580c';
    for (let s = 1; s < 3; s++) ctx.fillRect(bx + 2, by + obs.h * s / 3 - 1, obs.w - 4, 3);
    ctx.fillStyle = '#fff7ed';
    ctx.fillRect(bx + 2, by + 4, 5, 5);
    ctx.fillRect(bx + obs.w - 7, by + 4, 5, 5);
    ctx.fillStyle = '#431407';
    ctx.fillRect(bx + 4, by + 6, 2, 2);
    ctx.fillRect(bx + obs.w - 5, by + 6, 2, 2);
    ctx.strokeStyle = '#f97316'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 4, by); ctx.lineTo(bx + 0, by - 11);
    ctx.moveTo(bx + obs.w - 4, by); ctx.lineTo(bx + obs.w, by - 11);
    ctx.stroke();
    ctx.strokeStyle = '#c2410c';
    for (let i = 0; i < 3; i++) {
      const ly = by + obs.h * (0.2 + i * 0.25);
      ctx.beginPath(); ctx.moveTo(bx, ly); ctx.lineTo(bx - 8, ly + legSwing); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + obs.w, ly); ctx.lineTo(bx + obs.w + 8, ly + legSwing); ctx.stroke();
    }
  } else {
    ctx.fillStyle = '#8b5cf6';
    ctx.fillRect(bx, by, obs.w, obs.h);
    ctx.fillStyle = '#7c3aed';
    for (let s = 1; s < 4; s++) ctx.fillRect(bx + 1, by + obs.h * s / 4 - 1, obs.w - 2, 2);
    ctx.fillStyle = '#ede9fe';
    ctx.fillRect(bx + 1, by + 5, 7, 8);
    ctx.fillRect(bx + obs.w - 8, by + 5, 7, 8);
    ctx.fillStyle = '#2e1065';
    ctx.fillRect(bx + 3, by + 7, 3, 4);
    ctx.fillRect(bx + obs.w - 6, by + 7, 3, 4);
    ctx.fillStyle = '#ddd6fe';
    ctx.fillRect(bx + 3, by + 7, 1, 1);
    ctx.fillRect(bx + obs.w - 6, by + 7, 1, 1);
    ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + 3, by); ctx.lineTo(bx - 3, by - 15);
    ctx.moveTo(bx + obs.w - 3, by); ctx.lineTo(bx + obs.w + 3, by - 15);
    ctx.stroke();
    ctx.strokeStyle = '#6d28d9'; ctx.lineWidth = 1.2;
    for (let i = 0; i < 4; i++) {
      const ly = by + obs.h * (0.12 + i * 0.22);
      ctx.beginPath(); ctx.moveTo(bx, ly); ctx.lineTo(bx - 9, ly + legSwing); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + obs.w, ly); ctx.lineTo(bx + obs.w + 9, ly + legSwing); ctx.stroke();
    }
  }

  ctx.shadowBlur = 0;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function CodeRunnerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gsRef = useRef<GS>({
    phase: 'idle', speed: BASE_SPD, score: 0, frame: 0, deadTimer: 0,
    obs: [], nextObs: 80, walkCycle: 0, walkTimer: 0, bgOff: 0,
    particles: [], correctFlash: 0, questionObsId: null, idleAnim: 0,
  });

  const bgRef       = useRef<BgLine[]>(makeBgLines());
  const rafRef      = useRef<number>(0);
  const bestRef     = useRef(0);
  const poolRef     = useRef<LessonQuizQuestion[]>(buildPool());
  const usedIdsRef  = useRef<Set<string>>(new Set());

  // React UI state
  const [uiPhase, setUiPhase]         = useState<GS['phase']>('idle');
  const [uiScore, setUiScore]         = useState(0);
  const [uiBest,  setUiBest]          = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  // Question UI state
  const [currentQ,  setCurrentQ]  = useState<LessonQuizQuestion | null>(null);
  const [qTimeLeft, setQTimeLeft] = useState(Q_SECONDS);
  const [qAnswered, setQAnswered] = useState<number | null>(null);
  const [qFlash,    setQFlash]    = useState<'correct' | 'wrong' | null>(null);

  // Stable refs for timer callback
  const currentQRef    = useRef<LessonQuizQuestion | null>(null);
  const qAnsweredRef   = useRef<number | null>(null);
  const triggerDeathCb = useRef<() => void>(() => {});

  useEffect(() => { currentQRef.current  = currentQ;  }, [currentQ]);
  useEffect(() => { qAnsweredRef.current = qAnswered; }, [qAnswered]);

  // ── Load best ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const v = parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10) || 0;
    bestRef.current = v;
    setUiBest(v);
  }, []);

  // ── Pick next question (cycle through pool) ──────────────────────────────────
  const pickQuestion = useCallback((): LessonQuizQuestion => {
    const pool = poolRef.current;
    // Reset when all have been used
    if (usedIdsRef.current.size >= pool.length) usedIdsRef.current.clear();
    const available = pool.filter(q => !usedIdsRef.current.has(q.id));
    const q = available[Math.floor(Math.random() * available.length)];
    usedIdsRef.current.add(q.id);
    return q;
  }, []);

  // ── Trigger death (stable, reads refs) ───────────────────────────────────────
  const triggerDeath = useCallback(() => {
    const gs = gsRef.current;
    if (gs.phase !== 'running' && gs.phase !== 'question') return;
    gs.phase     = 'dead';
    gs.deadTimer = 0;
    playSound('error');
    const COLORS = ['#ef4444', '#f97316', '#facc15', '#a78bfa', '#67e8f9', '#4ade80'];
    for (let i = 0; i < 14; i++) {
      gs.particles.push({
        x: CHAR_X, y: GROUND - CHAR_H / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 7 - 2,
        life: 1,
        color: COLORS[i % COLORS.length],
        size: 4 + Math.random() * 5,
      });
    }
    const finalScore = Math.floor(gs.score);
    if (finalScore > bestRef.current) {
      localStorage.setItem(BEST_KEY, String(finalScore));
      bestRef.current = finalScore;
      setUiBest(finalScore);
      setIsNewRecord(true);
    } else {
      setIsNewRecord(false);
    }
    setUiScore(finalScore);
    setUiPhase('dead');
    setCurrentQ(null);
    setQAnswered(null);
    setQFlash(null);
  }, []);

  useEffect(() => { triggerDeathCb.current = triggerDeath; }, [triggerDeath]);

  // ── Question countdown timer ──────────────────────────────────────────────────
  useEffect(() => {
    if (!currentQ) return;
    setQTimeLeft(Q_SECONDS);
    const id = setInterval(() => {
      setQTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          triggerDeathCb.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [currentQ]);

  // ── Handle answer ─────────────────────────────────────────────────────────────
  const handleAnswer = useCallback((idx: number, q: LessonQuizQuestion) => {
    if (qAnsweredRef.current !== null) return;
    const gs = gsRef.current;
    if (gs.phase !== 'question') return;

    setQAnswered(idx);
    const correct = idx === q.correctIndex;

    if (correct) {
      setQFlash('correct');
      playSound('success');
      setTimeout(() => {
        // Explode obstacle particles at its position
        const target = gs.obs.find(o => o.id === gs.questionObsId);
        if (target) {
          const px = target.x + target.w / 2;
          const py = GROUND - target.h / 2;
          const COLORS = ['#facc15', '#4ade80', '#67e8f9', '#a78bfa', '#f59e0b', '#34d399'];
          for (let i = 0; i < 16; i++) {
            gs.particles.push({
              x: px, y: py,
              vx: (Math.random() - 0.5) * 10,
              vy: -Math.random() * 9 - 1,
              life: 1,
              color: COLORS[i % COLORS.length],
              size: 4 + Math.random() * 7,
            });
          }
        }
        gs.obs          = gs.obs.filter(o => o.id !== gs.questionObsId);
        gs.score        += Q_BONUS;
        gs.correctFlash = 35;
        gs.phase        = 'running';
        gs.questionObsId = null;
        setCurrentQ(null);
        setQAnswered(null);
        setQFlash(null);
        setUiScore(Math.floor(gs.score));
      }, 650);
    } else {
      setQFlash('wrong');
      setTimeout(() => triggerDeathCb.current(), 750);
    }
  }, []);

  // ── draw ──────────────────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const gs = gsRef.current;

    // Sky
    ctx.fillStyle = '#0a0a16';
    ctx.fillRect(0, 0, CW, CH);

    // Correct-answer green flash
    if (gs.correctFlash > 0) {
      ctx.fillStyle = `rgba(34,197,94,${(gs.correctFlash / 35) * 0.18})`;
      ctx.fillRect(0, 0, CW, CH);
    }

    // Stars
    ctx.fillStyle = 'rgba(165,180,252,0.25)';
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 197 + gs.bgOff * 0.05) % CW + CW) % CW;
      const sy = 5 + ((i * 53) % (GROUND - 60));
      ctx.fillRect(sx, sy, 1, 1);
    }

    // Scrolling bg code text
    ctx.font = '11px monospace';
    for (const bl of bgRef.current) {
      ctx.fillStyle = `rgba(99,102,241,${bl.spd > 0.5 ? 0.1 : 0.06})`;
      ctx.fillText(bl.text, bl.x, bl.y);
    }

    // Speed lines (only while running)
    if (gs.phase === 'running') {
      ctx.strokeStyle = 'rgba(99,102,241,0.07)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const lx = ((gs.bgOff * 0.4 + i * 145) % (CW + 120)) - 60;
        const ly = 30 + i * 28;
        ctx.beginPath();
        ctx.moveTo(CW - lx, ly);
        ctx.lineTo(CW - lx - 50 - gs.speed * 4, ly);
        ctx.stroke();
      }
    }

    // Ground
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(0, GROUND, CW, 2);
    ctx.fillStyle = 'rgba(34,197,94,0.18)';
    for (let gx = (gs.bgOff % 20 + CW) % 20; gx < CW; gx += 20) {
      ctx.fillRect(gx, GROUND + 5, 3, 3);
    }

    // Obstacles
    for (const obs of gs.obs) {
      drawBug(ctx, obs, gs.frame, obs.id === gs.questionObsId);
    }

    // Particles
    for (const p of gs.particles) {
      ctx.globalAlpha = p.life;
      ctx.fillStyle   = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;

    // Character
    const dead  = gs.phase === 'dead';
    const qMode = gs.phase === 'question';
    const flash = dead && (gs.deadTimer % 6 < 3);
    if (!flash) drawRobot(ctx, dead, gs.walkCycle, qMode, gs.idleAnim);

    // HUD score
    ctx.font      = 'bold 15px monospace';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(165,180,252,0.8)';
    ctx.fillText(String(Math.floor(gs.score)), CW - 12, 22);
    if (bestRef.current > 0) {
      ctx.font      = '10px monospace';
      ctx.fillStyle = 'rgba(165,180,252,0.4)';
      ctx.fillText(`HI ${bestRef.current}`, CW - 12, 36);
    }
    ctx.textAlign = 'left';

    // Idle overlay
    if (gs.phase === 'idle') {
      ctx.fillStyle = 'rgba(10,10,22,0.7)';
      ctx.fillRect(0, 0, CW, CH);
      ctx.textAlign = 'center';
      ctx.font      = 'bold 24px monospace';
      ctx.fillStyle = '#a5b4fc';
      ctx.fillText('CODE RUNNER', CW / 2, CH / 2 - 32);
      ctx.font      = '13px monospace';
      ctx.fillStyle = 'rgba(165,180,252,0.7)';
      ctx.fillText('Responda perguntas de programação', CW / 2, CH / 2 + 2);
      ctx.fillText('para destruir os bugs!', CW / 2, CH / 2 + 20);
      ctx.font      = '11px monospace';
      ctx.fillStyle = 'rgba(165,180,252,0.4)';
      ctx.fillText('Clique para começar', CW / 2, CH / 2 + 42);
      ctx.textAlign = 'left';
    }

    // Dead overlay
    if (dead && gs.deadTimer > 18) {
      ctx.fillStyle = 'rgba(10,10,22,0.8)';
      ctx.fillRect(CW / 2 - 140, CH / 2 - 54, 280, 96);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth   = 1;
      ctx.strokeRect(CW / 2 - 140, CH / 2 - 54, 280, 96);
      ctx.textAlign = 'center';
      ctx.font      = 'bold 24px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.fillText('GAME OVER', CW / 2, CH / 2 - 22);
      ctx.font      = '13px monospace';
      ctx.fillStyle = '#a5b4fc';
      ctx.fillText(`Pontuação: ${Math.floor(gs.score)}`, CW / 2, CH / 2 + 6);
      ctx.font      = '11px monospace';
      ctx.fillStyle = 'rgba(165,180,252,0.55)';
      ctx.fillText('Clique para jogar de novo', CW / 2, CH / 2 + 28);
      ctx.textAlign = 'left';
    }
  }, []);

  // ── tick (game loop) ──────────────────────────────────────────────────────────
  const tick = useCallback(() => {
    const gs = gsRef.current;

    // Non-running phases: animate particles + idle anim, then draw
    if (gs.phase !== 'running') {
      if (gs.phase === 'dead') gs.deadTimer++;
      if (gs.phase === 'question' || gs.phase === 'idle' || gs.phase === 'dead') {
        gs.idleAnim++;
        gs.particles = gs.particles
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.15, life: p.life - 0.025 }))
          .filter(p => p.life > 0);
      }
      draw();
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    // Running ──────────────────────────────────────────────────────────────────
    gs.frame++;
    gs.idleAnim++;
    gs.speed  = BASE_SPD + gs.frame * SPD_INC;
    gs.score += gs.speed * 0.018;
    if (gs.correctFlash > 0) gs.correctFlash--;

    // Scroll background
    gs.bgOff += gs.speed;
    for (const bl of bgRef.current) {
      bl.x -= bl.spd;
      if (bl.x < -150) {
        bl.x   = CW + 10;
        bl.y   = 22 + Math.random() * (GROUND - 55);
        bl.spd = 0.25 + Math.random() * 0.5;
      }
    }

    // Walk animation
    gs.walkTimer++;
    const wSpd = Math.max(2, 7 - Math.floor(gs.speed / 2));
    if (gs.walkTimer >= wSpd) { gs.walkCycle++; gs.walkTimer = 0; }

    // Spawn obstacles (longer intervals so questions have room)
    gs.nextObs--;
    if (gs.nextObs <= 0) {
      gs.obs.push(spawnObs(gs.speed / BASE_SPD));
      const base  = Math.max(130, 210 - gs.frame * 0.04);
      gs.nextObs  = base + Math.random() * 70;
    }

    // Move & cull
    for (const o of gs.obs) o.x -= gs.speed;
    gs.obs = gs.obs.filter(o => o.x + o.w > -20);

    // Particles
    gs.particles = gs.particles
      .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.15, life: p.life - 0.025 }))
      .filter(p => p.life > 0);

    // Question trigger: first unasked obstacle that reaches the trigger zone
    for (const o of gs.obs) {
      if (!o.questioned && o.x <= Q_TRIGGER_X) {
        o.questioned      = true;
        gs.phase          = 'question';
        gs.questionObsId  = o.id;
        const q = pickQuestion();
        setCurrentQ(q);
        setQAnswered(null);
        setQFlash(null);
        break;
      }
    }

    // Update UI score every 20 frames
    if (gs.frame % 20 === 0) setUiScore(Math.floor(gs.score));

    draw();
    rafRef.current = requestAnimationFrame(tick);
  }, [draw, pickQuestion]);

  // ── Start RAF once ────────────────────────────────────────────────────────────
  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // ── Start / restart ───────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const gs = gsRef.current;
    Object.assign(gs, {
      phase: 'running', speed: BASE_SPD, score: 0, frame: 0, deadTimer: 0,
      obs: [], nextObs: 80, walkCycle: 0, walkTimer: 0, bgOff: 0,
      particles: [], correctFlash: 0, questionObsId: null, idleAnim: 0,
    } satisfies GS);
    bgRef.current = makeBgLines();
    usedIdsRef.current.clear();
    setCurrentQ(null);
    setQAnswered(null);
    setQFlash(null);
    setIsNewRecord(false);
    setUiScore(0);
    setUiPhase('running');
  }, []);

  const handleCanvasClick = useCallback(() => {
    const gs = gsRef.current;
    if (gs.phase === 'idle') startGame();
    else if (gs.phase === 'dead' && gs.deadTimer > 20) startGame();
  }, [startGame]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const gs = gsRef.current;
      // Start / restart
      if (gs.phase === 'idle' || (gs.phase === 'dead' && gs.deadTimer > 20)) {
        if (e.code === 'Enter' || e.code === 'Space') { e.preventDefault(); startGame(); }
        return;
      }
      // Answer shortcuts: A/B/C/D or 1/2/3/4
      if (gs.phase === 'question' && currentQRef.current && qAnsweredRef.current === null) {
        const map: Record<string, number> = {
          KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3,
          Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3,
        };
        const idx = map[e.code];
        const q   = currentQRef.current;
        if (idx !== undefined && idx < q.options.length) {
          e.preventDefault();
          handleAnswer(idx, q);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startGame, handleAnswer]);

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[640px] mx-auto">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
          <div>
            <h1 className="font-bold text-lg">🏃 Code Runner</h1>
            <p className="text-xs text-muted-foreground">
              Responda perguntas de programação para destruir os bugs!
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono text-primary tabular-nums">{uiScore}</p>
            {uiBest > 0 && (
              <p className="text-xs font-mono text-muted-foreground">BEST {uiBest}</p>
            )}
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleCanvasClick}
          className="w-full block cursor-pointer"
          style={{ imageRendering: 'pixelated', background: '#0a0a16' }}
        />

        {/* ── Question panel ── */}
        {currentQ && (
          <div className="border-t border-amber-500/30 bg-amber-950/20 p-5">
            {/* Timer row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-amber-400">
                🔐 Bug bloqueando o caminho — responda para destruí-lo!
              </span>
              <span
                className={`font-mono font-bold text-xl tabular-nums transition-colors ${
                  qTimeLeft <= 3
                    ? 'text-red-500 animate-pulse'
                    : qTimeLeft <= 5
                    ? 'text-amber-400'
                    : 'text-foreground'
                }`}
              >
                {qTimeLeft}s
              </span>
            </div>

            {/* Timer bar */}
            <div className="w-full bg-muted/30 rounded-full h-1.5 mb-4 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  qTimeLeft <= 3 ? 'bg-red-500' : 'bg-amber-400'
                }`}
                style={{ width: `${(qTimeLeft / Q_SECONDS) * 100}%` }}
              />
            </div>

            {/* Question text */}
            <p className="font-semibold text-base mb-4 leading-snug">
              {currentQ.question}
            </p>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-2">
              {currentQ.options.map((opt, idx) => {
                let cls =
                  'text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ';
                if (qAnswered !== null) {
                  if (idx === currentQ.correctIndex)
                    cls += 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                  else if (idx === qAnswered)
                    cls += 'bg-red-500/20 border-red-500 text-red-400';
                  else
                    cls += 'bg-muted/10 border-border/20 text-muted-foreground/40';
                } else {
                  cls +=
                    'bg-muted/30 border-border hover:bg-amber-500/10 hover:border-amber-500/50 text-foreground cursor-pointer active:scale-[0.98]';
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx, currentQ)}
                    disabled={qAnswered !== null}
                    className={cls}
                  >
                    <span className="font-bold mr-1.5 text-muted-foreground/60">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {qFlash === 'correct' && (
              <p className="mt-3 text-center text-sm font-semibold text-emerald-400">
                ✅ Correto! +{Q_BONUS} pontos — bug destruído! 💥
              </p>
            )}
            {qFlash === 'wrong' && (
              <p className="mt-3 text-center text-sm font-semibold text-red-400">
                ❌ Errado! O bug vai te pegar...
              </p>
            )}

            {/* Keyboard hint */}
            {qAnswered === null && (
              <p className="mt-3 text-center text-xs text-muted-foreground/40">
                Teclas rápidas: A · B · C · D &nbsp;ou&nbsp; 1 · 2 · 3 · 4
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-border/50 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>🖱️ clique para começar / reiniciar</span>
            <span className="text-amber-400/80">+{Q_BONUS} pts por resposta certa</span>
          </div>
          {isNewRecord && uiPhase === 'dead' && (
            <span className="text-xs font-semibold text-emerald-400 animate-pulse">
              🎉 Novo recorde!
            </span>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        🟥 fácil &nbsp;·&nbsp; 🟧 médio &nbsp;·&nbsp; 🟣 difícil
        &nbsp;—&nbsp; cada bug traz uma pergunta de programação!
      </p>

      <div className="flex justify-center mt-4">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Voltar ao início
        </Link>
      </div>
    </div>
  );
}
