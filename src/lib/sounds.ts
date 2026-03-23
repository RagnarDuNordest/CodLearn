/**
 * Web Audio API sound utilities — zero external dependencies.
 */

function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('codlearn_experience');
    if (!raw) return true; // default is enabled
    const settings = JSON.parse(raw);
    return settings.soundEnabled !== false;
  } catch {
    return true;
  }
}

type NoteSpec = { freq: number; duration: number; startOffset: number };

function playNotes(notes: NoteSpec[], gainValue = 0.3): void {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    notes.forEach(({ freq, duration, startOffset }) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + startOffset);

      gainNode.gain.setValueAtTime(gainValue, ctx.currentTime + startOffset);
      gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + startOffset + duration
      );

      oscillator.start(ctx.currentTime + startOffset);
      oscillator.stop(ctx.currentTime + startOffset + duration);
    });

    // Close context after all notes finish
    const totalDuration = Math.max(...notes.map((n) => n.startOffset + n.duration));
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, (totalDuration + 0.2) * 1000);
  } catch {
    // AudioContext may be blocked or unavailable — silently ignore
  }
}

export function playSound(type: 'success' | 'badge' | 'click' | 'error'): void {
  if (!isSoundEnabled()) return;
  if (typeof window === 'undefined') return;

  switch (type) {
    case 'success': {
      // Ascending 3-note chime: C5-E5-G5, 150ms each
      playNotes([
        { freq: 523.25, duration: 0.15, startOffset: 0 },
        { freq: 659.25, duration: 0.15, startOffset: 0.15 },
        { freq: 783.99, duration: 0.15, startOffset: 0.30 },
      ], 0.3);
      break;
    }
    case 'badge': {
      // Ascending 4-note fanfare: C5-E5-G5-C6, 100ms each, louder
      playNotes([
        { freq: 523.25, duration: 0.1, startOffset: 0 },
        { freq: 659.25, duration: 0.1, startOffset: 0.1 },
        { freq: 783.99, duration: 0.1, startOffset: 0.2 },
        { freq: 1046.50, duration: 0.1, startOffset: 0.3 },
      ], 0.5);
      break;
    }
    case 'click': {
      // Short tick: single oscillator, 50ms
      playNotes([
        { freq: 800, duration: 0.05, startOffset: 0 },
      ], 0.2);
      break;
    }
    case 'error': {
      // Descending 2-note: E5-C5, 150ms each
      playNotes([
        { freq: 659.25, duration: 0.15, startOffset: 0 },
        { freq: 523.25, duration: 0.15, startOffset: 0.15 },
      ], 0.3);
      break;
    }
  }
}
