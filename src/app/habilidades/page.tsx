'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { modules } from '@/data/modules';
import { getLessonsByModule } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';
import { useProfile } from '@/hooks/useProfile';
import { useStreak } from '@/hooks/useStreak';
import { useLevel } from '@/hooks/useLevel';
import { getAvatarById } from '@/data/avatars';
import { getTotalStudyMinutes } from '@/hooks/useLessonTimer';

// ─── Module emoji map ────────────────────────────────────────────────────────
const MODULE_EMOJI: Record<string, string> = {
  intro: '💡',
  logica: '🧠',
  linux: '🐧',
  git: '🌿',
  python: '🐍',
  c: '⚙️',
  java: '☕',
  estruturas: '📦',
  algoritmos: '🔀',
  sql: '🗄️',
  'html-css': '🌐',
  frontend: '🖥️',
  backend: '🔧',
};

// ─── Career paths ────────────────────────────────────────────────────────────
const careerPaths = [
  {
    title: 'Frontend Developer',
    emoji: '🌐',
    requiredModules: ['intro', 'html-css', 'frontend', 'git'],
    description: 'Cria interfaces web bonitas e interativas',
    salary: 'R$ 4.000 – R$ 12.000/mês',
    color: 'from-yellow-500/20 to-orange-500/10',
    border: 'border-yellow-500/30',
  },
  {
    title: 'Backend Developer',
    emoji: '⚙️',
    requiredModules: ['intro', 'python', 'backend', 'sql', 'git'],
    description: 'Constrói servidores, APIs e bancos de dados',
    salary: 'R$ 5.000 – R$ 15.000/mês',
    color: 'from-teal-500/20 to-cyan-500/10',
    border: 'border-teal-500/30',
  },
  {
    title: 'Desenvolvedor de Sistemas',
    emoji: '💻',
    requiredModules: ['intro', 'logica', 'c', 'algoritmos', 'estruturas'],
    description: 'Desenvolve software de baixo nível e sistemas',
    salary: 'R$ 6.000 – R$ 18.000/mês',
    color: 'from-purple-500/20 to-indigo-500/10',
    border: 'border-purple-500/30',
  },
  {
    title: 'Desenvolvedor Full Stack',
    emoji: '🏆',
    requiredModules: ['intro', 'html-css', 'frontend', 'python', 'backend', 'sql', 'git'],
    description: 'Domina frontend e backend completos',
    salary: 'R$ 8.000 – R$ 20.000/mês',
    color: 'from-primary/20 to-blue-500/10',
    border: 'border-primary/30',
  },
  {
    title: 'DevOps / SRE',
    emoji: '🛠️',
    requiredModules: ['linux', 'git', 'backend', 'sql'],
    description: 'Automatiza deploys, infraestrutura e garante disponibilidade',
    salary: 'R$ 7.000 – R$ 18.000/mês',
    color: 'from-orange-500/20 to-red-500/10',
    border: 'border-orange-500/30',
  },
  {
    title: 'Cientista de Dados',
    emoji: '📊',
    requiredModules: ['python', 'sql', 'algoritmos', 'estruturas'],
    description: 'Analisa dados e cria modelos de machine learning',
    salary: 'R$ 6.000 – R$ 18.000/mês',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/30',
  },
  {
    title: 'Segurança da Informação',
    emoji: '🔐',
    requiredModules: ['linux', 'c', 'algoritmos', 'git'],
    description: 'Protege sistemas contra ataques e vulnerabilidades',
    salary: 'R$ 7.000 – R$ 20.000/mês',
    color: 'from-red-500/20 to-orange-500/10',
    border: 'border-red-500/30',
  },
  {
    title: 'Engenheiro Java',
    emoji: '☕',
    requiredModules: ['java', 'algoritmos', 'estruturas', 'sql', 'git'],
    description: 'Desenvolve sistemas corporativos robustos com Java',
    salary: 'R$ 6.000 – R$ 16.000/mês',
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/30',
  },
];

// ─── Skill tree layout ───────────────────────────────────────────────────────
// Each node: { id, x, y } — coordinates in a virtual 1000×600 grid
const TREE_NODES = [
  { id: 'intro',      x: 60,  y: 60  },
  { id: 'logica',     x: 260, y: 60  },
  { id: 'python',     x: 460, y: 60  },
  { id: 'algoritmos', x: 660, y: 60  },
  { id: 'estruturas', x: 860, y: 60  },
  { id: 'html-css',   x: 260, y: 240 },
  { id: 'frontend',   x: 460, y: 240 },
  { id: 'backend',    x: 660, y: 240 },
  { id: 'c',          x: 60,  y: 420 },
  { id: 'java',       x: 260, y: 420 },
  { id: 'sql',        x: 460, y: 420 },
  { id: 'git',        x: 660, y: 420 },
  { id: 'linux',      x: 860, y: 420 },
];

// Edges: [from, to]
const TREE_EDGES: [string, string][] = [
  ['intro', 'logica'],
  ['logica', 'python'],
  ['python', 'algoritmos'],
  ['algoritmos', 'estruturas'],
  ['logica', 'html-css'],
  ['html-css', 'frontend'],
  ['algoritmos', 'backend'],
  ['frontend', 'backend'],
  ['c', 'java'],
  ['git', 'linux'],
];

const NODE_W = 140;
const NODE_H = 100;
const VIEWBOX_W = 1000;
const VIEWBOX_H = 540;

// ─── Circular progress ring ──────────────────────────────────────────────────
function CircleRing({ pct, color }: { pct: number; color: string }) {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="44" height="44" className="shrink-0">
      <circle cx="22" cy="22" r={r} fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
      <circle
        cx="22" cy="22" r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

// ─── Skill node ───────────────────────────────────────────────────────────────
interface NodeData {
  id: string;
  x: number;
  y: number;
  title: string;
  emoji: string;
  completed: number;
  total: number;
  pct: number;
  status: 'locked' | 'started' | 'done';
  color: string;
}

function SkillNode({ node, onClick }: { node: NodeData; onClick: () => void }) {
  const ringColor =
    node.status === 'done'
      ? '#10b981'
      : node.status === 'started'
      ? '#6366f1'
      : '#6b7280';

  const statusIcon =
    node.status === 'done' ? '✅' : node.status === 'started' ? '🔓' : '🔒';

  return (
    <foreignObject
      x={node.x - NODE_W / 2}
      y={node.y - NODE_H / 2}
      width={NODE_W}
      height={NODE_H}
    >
      <div
        onClick={onClick}
        className={`w-full h-full flex flex-col items-center justify-center gap-0.5 rounded-xl border cursor-pointer transition-all hover:scale-105 select-none px-1
          ${node.status === 'done'
            ? 'bg-emerald-500/10 border-emerald-500/40'
            : node.status === 'started'
            ? 'bg-primary/10 border-primary/40'
            : 'bg-card border-border opacity-70'}
        `}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-lg leading-none">{node.emoji}</span>
          <CircleRing pct={node.pct} color={ringColor} />
        </div>
        <p className="text-[10px] font-semibold text-center leading-tight truncate w-full text-center px-1">
          {node.title.length > 18 ? node.title.slice(0, 16) + '…' : node.title}
        </p>
        <p className="text-[9px] text-muted-foreground">
          {node.completed}/{node.total} lições
        </p>
        <span className="text-[9px]">{statusIcon}</span>
      </div>
    </foreignObject>
  );
}

// ─── Resume modal ─────────────────────────────────────────────────────────────
function ResumeModal({ onClose, nodeData }: { onClose: () => void; nodeData: NodeData[] }) {
  const { profile } = useProfile();
  const { streakDays } = useStreak();
  const { level, totalXP } = useLevel();
  const [studyMinutes, setStudyMinutes] = useState(0);
  const avatar = getAvatarById(profile.avatarId);

  useEffect(() => {
    setStudyMinutes(getTotalStudyMinutes());
  }, []);

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  const skillNodes = nodeData.filter((n) => n.completed > 0);
  const totalCompleted = nodeData.reduce((s, n) => s + n.completed, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <style>{`
        @media print {
          body > * { display: none !important; }
          .resume-print-area { display: block !important; position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
      <div
        className="resume-print-area bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-full border-2 border-primary/40 overflow-hidden bg-muted flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: avatar.svg }}
            />
            <div>
              <h2 className="text-lg font-bold">
                {profile.name || 'Estudante CodLearn'}
              </h2>
              <p className="text-sm text-muted-foreground">
                🦾 {profile.tag || 'Hacker em formação'}
              </p>
              <p className="text-xs text-muted-foreground">
                CodLearn · {today}
              </p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="p-6 border-b border-border">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">
            Habilidades Técnicas
          </h3>
          <div className="space-y-1.5">
            {nodeData.map((n) => (
              <div key={n.id} className="flex items-center gap-2 text-sm">
                <span>{n.status === 'done' ? '✅' : n.status === 'started' ? '🔄' : '⬜'}</span>
                <span className={n.status === 'locked' ? 'text-muted-foreground/50' : ''}>
                  {n.emoji} {n.title}
                  {n.status === 'started' && (
                    <span className="text-xs text-muted-foreground ml-1">
                      ({n.completed}/{n.total} lições)
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="p-6">
          <h3 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">
            Estatísticas
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5">📚 <span>{totalCompleted} lições concluídas</span></div>
            <div className="flex items-center gap-1.5">🔥 <span>{streakDays} dias de streak</span></div>
            <div className="flex items-center gap-1.5">⏱ <span>{studyMinutes} minutos estudados</span></div>
            <div className="flex items-center gap-1.5">🏆 <span>Nível {level} · {totalXP} XP</span></div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors text-sm"
          >
            🖨️ Imprimir / Salvar PDF
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 border border-border rounded-xl hover:bg-accent transition-colors text-sm font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HabilidadesPage() {
  const allLessonIds = useMemo(() => modules.flatMap((m) => m.lessons), []);
  const { getModuleStats } = useProgress(allLessonIds);
  const [showResume, setShowResume] = useState(false);
  const [highlightNode, setHighlightNode] = useState<string | null>(null);

  // Build node data
  const nodeData: NodeData[] = useMemo(() => {
    return TREE_NODES.map((n) => {
      const mod = modules.find((m) => m.id === n.id);
      if (!mod) return null;
      const lessons = getLessonsByModule(mod.id);
      const stats = getModuleStats(mod.id, mod.lessons);
      const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
      const status =
        pct === 100 ? 'done' : pct > 0 ? 'started' : 'locked';

      // Pick a ring color class from module color
      const colorMap: Record<string, string> = {
        'text-amber-500': '#f59e0b',
        'text-pink-500': '#ec4899',
        'text-green-500': '#22c55e',
        'text-orange-500': '#f97316',
        'text-python': '#3b82f6',
        'text-clang': '#8b5cf6',
        'text-red-500': '#ef4444',
        'text-emerald-500': '#10b981',
        'text-purple-500': '#a855f7',
        'text-cyan-500': '#06b6d4',
        'text-yellow-500': '#eab308',
        'text-teal-500': '#14b8a6',
      };

      return {
        id: n.id,
        x: n.x,
        y: n.y,
        title: mod.title,
        emoji: MODULE_EMOJI[mod.id] ?? '📌',
        completed: stats.completed,
        total: stats.total,
        pct,
        status: status as 'locked' | 'started' | 'done',
        color: colorMap[mod.color] ?? '#6366f1',
      };
    }).filter(Boolean) as NodeData[];
  }, [getModuleStats]);

  // Unlocked skills (tag cloud)
  const unlockedModules = useMemo(
    () => nodeData.filter((n) => n.completed > 0),
    [nodeData]
  );

  // Career path progress
  const careerProgress = useMemo(() => {
    return careerPaths.map((cp) => {
      const required = cp.requiredModules;
      const completedCount = required.filter((modId) => {
        const node = nodeData.find((n) => n.id === modId);
        return node && node.status === 'done';
      }).length;
      return {
        ...cp,
        completedModules: completedCount,
        totalModules: required.length,
        pct: Math.round((completedCount / required.length) * 100),
        moduleStatuses: required.map((modId) => {
          const node = nodeData.find((n) => n.id === modId);
          const mod = modules.find((m) => m.id === modId);
          return {
            id: modId,
            title: mod?.title ?? modId,
            emoji: MODULE_EMOJI[modId] ?? '📌',
            done: node?.status === 'done',
          };
        }),
      };
    });
  }, [nodeData]);

  // Build SVG edges
  const nodeMap = useMemo(() => {
    const m: Record<string, NodeData> = {};
    nodeData.forEach((n) => { m[n.id] = n; });
    return m;
  }, [nodeData]);

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Suas Habilidades 🌳</h1>
        <p className="text-muted-foreground">
          Veja o que você já domina e o que ainda pode aprender
        </p>
      </div>

      {/* Export button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowResume(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors text-sm shadow"
        >
          📄 Exportar Currículo
        </button>
      </div>

      {/* Skill Tree */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-8 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 px-2">Árvore de Habilidades</h2>
        <div className="min-w-[600px]">
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            className="w-full"
            style={{ height: 'auto', maxHeight: '560px' }}
          >
            {/* Edges */}
            {TREE_EDGES.map(([fromId, toId]) => {
              const from = nodeMap[fromId];
              const to = nodeMap[toId];
              if (!from || !to) return null;
              const completed =
                from.status === 'done' && to.status === 'done';
              const started =
                from.status !== 'locked' && to.status !== 'locked';

              // Arrow from edge of node to edge of node
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / dist;
              const uy = dy / dist;
              const x1 = from.x + ux * (NODE_W / 2 + 4);
              const y1 = from.y + uy * (NODE_H / 2 + 4);
              const x2 = to.x - ux * (NODE_W / 2 + 10);
              const y2 = to.y - uy * (NODE_H / 2 + 10);

              return (
                <g key={`${fromId}-${toId}`}>
                  <defs>
                    <marker
                      id={`arrow-${fromId}-${toId}`}
                      markerWidth="8" markerHeight="8"
                      refX="4" refY="3"
                      orient="auto"
                    >
                      <path
                        d="M0,0 L0,6 L8,3 z"
                        fill={completed ? '#6366f1' : started ? '#6b7280' : '#374151'}
                      />
                    </marker>
                  </defs>
                  <line
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke={completed ? '#6366f1' : '#4b5563'}
                    strokeWidth={completed ? 2.5 : 1.5}
                    strokeDasharray={completed ? 'none' : '6 4'}
                    markerEnd={`url(#arrow-${fromId}-${toId})`}
                    opacity={started ? 1 : 0.4}
                    style={completed ? { filter: 'drop-shadow(0 0 4px rgba(99,102,241,0.6))' } : undefined}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {nodeData.map((node) => (
              <SkillNode
                key={node.id}
                node={node}
                onClick={() => setHighlightNode(node.id === highlightNode ? null : node.id)}
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 px-2 pt-4 border-t border-border mt-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-emerald-500/60 border border-emerald-500" />
            Concluído ✅
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-primary/40 border border-primary" />
            Em andamento 🔓
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full bg-muted border border-border" />
            Bloqueado 🔒
          </div>
        </div>
      </div>

      {/* Unlocked Skills Tag Cloud */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Habilidades desbloqueadas</h2>
        {unlockedModules.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground text-sm">
            Complete sua primeira lição para desbloquear habilidades!
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {unlockedModules.map((n) => {
              const colorClass =
                n.status === 'done'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-primary/10 border-primary/30 text-primary';
              return (
                <span
                  key={n.id}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-sm font-medium ${colorClass}`}
                >
                  <span>{n.emoji}</span>
                  <span>{n.title}</span>
                  {n.status === 'done' && <span className="text-xs">✅</span>}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Career Roadmap */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">Roadmap de Carreira 🚀</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Descubra qual trilha de carreira você está pronto para seguir
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {careerProgress.map((cp) => (
            <div
              key={cp.title}
              className={`bg-gradient-to-br ${cp.color} border ${cp.border} rounded-2xl p-5`}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{cp.emoji}</span>
                    <h3 className="font-bold text-base">{cp.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{cp.description}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">💰 {cp.salary}</p>
                </div>
              </div>

              {/* Ready badge */}
              {cp.pct === 100 && (
                <div className="mb-3 px-3 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-sm font-bold text-emerald-400">
                  🎉 Pronto para o mercado!
                </div>
              )}

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{cp.completedModules}/{cp.totalModules} módulos necessários</span>
                  <span>{cp.pct}%</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all"
                    style={{ width: `${cp.pct}%` }}
                  />
                </div>
              </div>

              {/* Module checklist */}
              <div className="space-y-1">
                {cp.moduleStatuses.map((ms) => (
                  <div key={ms.id} className="flex items-center gap-2 text-xs">
                    <span>{ms.done ? '✅' : '⬜'}</span>
                    <span className={ms.done ? 'text-foreground' : 'text-muted-foreground'}>
                      {ms.emoji} {ms.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <ResumeModal onClose={() => setShowResume(false)} nodeData={nodeData} />
      )}
    </div>
  );
}
