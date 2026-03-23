'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from 'lucide-react';

const LOFI_STATIONS = [
  { id: 'jfKfPfyJRdk', title: 'Lofi Hip Hop ☕' },
  { id: 'rUxyKA_-grg', title: 'Lofi Chill 🌙' },
  { id: '4xDzrJKXOOY', title: 'Synthwave 🌆' },
  { id: 'HuFYqnbVbzY', title: 'Jazz Lofi 🎷' },
  { id: 'WPni755-Krg', title: 'Foco 40Hz 🧠' },
];

const STORAGE_KEY = 'codlearn_lofi';

interface LofiState {
  currentStation: number;
  volume: number;
}

export default function LofiPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState(0);
  const [volume, setVolume] = useState(50);
  const [mounted, setMounted] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: LofiState = JSON.parse(saved);
        if (typeof parsed.currentStation === 'number') {
          setCurrentStation(Math.min(parsed.currentStation, LOFI_STATIONS.length - 1));
        }
        if (typeof parsed.volume === 'number') {
          setVolume(parsed.volume);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save preferences
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ currentStation, volume }));
    } catch {
      // ignore
    }
  }, [currentStation, volume, mounted]);

  // Send command to the YouTube iframe
  const sendCommand = useCallback((func: string, args: unknown[] = []) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*'
    );
  }, []);

  // Handle iframe load — fires reliably because key forces full remount on station change
  function handleIframeLoad() {
    setIframeReady(true);
    // Give the YouTube player time to finish initialising before sending commands
    setTimeout(() => {
      sendCommand('setVolume', [volume]);
      if (isPlaying) sendCommand('playVideo');
    }, 800);
  }

  // Play/pause
  function togglePlay() {
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      sendCommand('setVolume', [volume]);
      sendCommand('playVideo');
    } else {
      sendCommand('pauseVideo');
    }
  }

  // Volume change
  function handleVolumeChange(newVolume: number) {
    setVolume(newVolume);
    sendCommand('setVolume', [newVolume]);
  }

  // Station change
  function changeStation(newStation: number) {
    setIframeReady(false);
    setCurrentStation(newStation);
    // key={station.id} on the iframe forces React to fully unmount + remount it,
    // which guarantees onLoad fires and commands reach the new player.
  }

  function prevStation() {
    changeStation(currentStation === 0 ? LOFI_STATIONS.length - 1 : currentStation - 1);
  }

  function nextStation() {
    changeStation(currentStation === LOFI_STATIONS.length - 1 ? 0 : currentStation + 1);
  }

  const station = LOFI_STATIONS[currentStation];

  // Always keep iframe mounted with enablejsapi=1. Start paused (autoplay=0).
  // When user clicks play, send postMessage command.
  const iframeSrc = `https://www.youtube.com/embed/${station.id}?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=${station.id}&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  if (!mounted) return null;

  return (
    <div className="fixed bottom-[168px] right-6 z-50">
      {/* Collapsed button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="Abrir player de música"
          title="Música Lofi"
        >
          <span className={`text-xl ${isPlaying ? 'animate-pulse' : ''}`}>🎵</span>
        </button>
      )}

      {/* key={station.id} forces full unmount+remount when station changes,
          ensuring onLoad fires and YouTube player initialises fresh */}
      <iframe
        key={station.id}
        ref={iframeRef}
        src={iframeSrc}
        allow="autoplay; encrypted-media"
        onLoad={handleIframeLoad}
        style={{
          width: 0,
          height: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          border: 'none',
          opacity: 0,
          pointerEvents: 'none',
        }}
        title="Lofi Music Stream"
        tabIndex={-1}
      />

      {/* Expanded panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden" style={{ width: 280 }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              🎵 Música Lofi
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-accent transition-colors"
              aria-label="Fechar player"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Station selector */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={prevStation}
                className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                aria-label="Estação anterior"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-medium text-center flex-1 truncate">
                {station.title}
              </span>
              <button
                onClick={nextStation}
                className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                aria-label="Próxima estação"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Play/Pause button */}
            <div className="flex justify-center">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
                aria-label={isPlaying ? 'Pausar' : 'Tocar'}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Playing indicator */}
            {isPlaying && (
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-primary ml-1">tocando agora</span>
              </div>
            )}

            {/* Volume slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                  <span className="text-xs text-muted-foreground">Volume</span>
                </div>
                <span className="text-xs font-medium text-foreground">{volume}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Volume"
              />
            </div>

            {/* Station dots */}
            <div className="flex justify-center gap-1.5">
              {LOFI_STATIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeStation(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentStation ? 'bg-primary w-3' : 'bg-muted-foreground/40 hover:bg-muted-foreground/70 w-1.5'
                  }`}
                  aria-label={`Estação ${i + 1}`}
                />
              ))}
            </div>

            {/* Hint */}
            <p className="text-[10px] text-center text-muted-foreground/60">
              Streams do YouTube. Requer conexão com a internet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
