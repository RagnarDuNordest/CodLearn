'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  lessonId: string;
}

export default function FavoriteButton({ lessonId }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const favorited = isFavorite(lessonId);

  const handleClick = () => {
    setIsAnimating(true);
    toggleFavorite(lessonId);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors text-sm font-medium ${
          favorited
            ? 'border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/15'
            : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80'
        }`}
        title={favorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
        aria-pressed={favorited}
      >
        <Heart
          className={`w-4 h-4 transition-transform ${
            isAnimating ? 'scale-125' : 'scale-100'
          } ${favorited ? 'fill-red-400' : ''}`}
          style={{ transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
        <span className="hidden sm:inline">
          {favorited ? 'Favoritado' : 'Favoritar'}
        </span>
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap pointer-events-none z-10">
          {favorited ? 'Remover dos favoritos' : 'Salvo nos favoritos'}
        </div>
      )}
    </div>
  );
}
