'use client';

import { useDashboardBackground, BackgroundPatternType } from '@/hooks/useDashboardBackground';

// Generate 50 fixed star positions deterministically
const STARS = Array.from({ length: 50 }, (_, i) => {
  const x = ((i * 173 + 37) % 97) / 97 * 100;
  const y = ((i * 97 + 13) % 89) / 89 * 100;
  const r = 0.8 + ((i * 31) % 10) / 10 * 1.2;
  return { x, y, r };
});

// Matrix characters columns
const MATRIX_COLS = Array.from({ length: 20 }, (_, i) => ({
  x: i * 5 + 2.5,
  delay: (i * 0.37) % 3,
  duration: 2 + ((i * 0.7) % 2),
}));

function PatternContent({ pattern }: { pattern: BackgroundPatternType }) {
  if (pattern === 'none') return null;

  if (pattern === 'dots') {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    );
  }

  if (pattern === 'grid') {
    return (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          backgroundImage:
            'linear-gradient(rgba(128,128,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    );
  }

  if (pattern === 'gradient') {
    return (
      <>
        <style>{`
          @keyframes codlearn-bg-gradient {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: -1,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08), rgba(6,182,212,0.08), rgba(34,197,94,0.06))',
            backgroundSize: '400% 400%',
            animation: 'codlearn-bg-gradient 15s ease infinite',
          }}
        />
      </>
    );
  }

  if (pattern === 'stars') {
    return (
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.r * 0.3}
            fill="currentColor"
            className="text-foreground"
            opacity={0.15 + ((i * 7) % 10) / 10 * 0.2}
          />
        ))}
      </svg>
    );
  }

  if (pattern === 'matrix') {
    return (
      <>
        <style>{`
          @keyframes codlearn-matrix-fall {
            0%   { transform: translateY(-100%); opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}</style>
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -1, opacity: 0.06 }}
        >
          {MATRIX_COLS.map((col, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${col.x}%`,
                top: 0,
                color: '#22c55e',
                fontSize: '10px',
                fontFamily: 'monospace',
                lineHeight: '1.4',
                writingMode: 'vertical-rl',
                animation: `codlearn-matrix-fall ${col.duration}s ${col.delay}s linear infinite`,
                userSelect: 'none',
              }}
            >
              {Array.from({ length: 15 }, (_, j) =>
                String.fromCharCode(0x30A0 + ((i * 7 + j * 3) % 96))
              ).join('')}
            </div>
          ))}
        </div>
      </>
    );
  }

  return null;
}

export default function BackgroundPattern() {
  const { pattern } = useDashboardBackground();
  return <PatternContent pattern={pattern} />;
}

// Export a mini preview component for use in settings
export function PatternPreview({ pattern }: { pattern: BackgroundPatternType }) {
  if (pattern === 'none') {
    return (
      <div className="w-full h-full rounded flex items-center justify-center">
        <span className="text-[8px] text-muted-foreground">nenhum</span>
      </div>
    );
  }

  if (pattern === 'dots') {
    return (
      <div
        className="w-full h-full rounded"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(128,128,128,0.4) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
        }}
      />
    );
  }

  if (pattern === 'grid') {
    return (
      <div
        className="w-full h-full rounded"
        style={{
          backgroundImage:
            'linear-gradient(rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.3) 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />
    );
  }

  if (pattern === 'gradient') {
    return (
      <div
        className="w-full h-full rounded"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(6,182,212,0.4), rgba(34,197,94,0.3))',
        }}
      />
    );
  }

  if (pattern === 'stars') {
    return (
      <div className="w-full h-full rounded relative overflow-hidden">
        {STARS.slice(0, 15).map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: 2,
              height: 2,
              opacity: 0.4,
            }}
          />
        ))}
      </div>
    );
  }

  if (pattern === 'matrix') {
    return (
      <div
        className="w-full h-full rounded overflow-hidden flex gap-px p-0.5"
        style={{ background: 'transparent' }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="flex-1 text-[4px] leading-[1.3] overflow-hidden"
            style={{ color: '#22c55e', opacity: 0.6, fontFamily: 'monospace' }}
          >
            {Array.from({ length: 8 }, (_, j) =>
              String.fromCharCode(0x30A0 + ((i * 7 + j * 3) % 96))
            ).join('\n')}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
