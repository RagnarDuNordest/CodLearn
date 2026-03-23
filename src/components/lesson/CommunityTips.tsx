'use client';

import { useState, useEffect } from 'react';
import { Users, ThumbsUp, RefreshCw } from 'lucide-react';
import { getTipsForTags } from '@/data/communityTips';
import type { CommunityTip } from '@/data/communityTips';

interface CommunityTipsProps {
  tags?: string[];
}

export default function CommunityTips({ tags = ['geral'] }: CommunityTipsProps) {
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTips(getTipsForTags(tags));
    const stored = localStorage.getItem('codlearn_liked_tips');
    if (stored) {
      setLikedIds(new Set(JSON.parse(stored)));
    }
  }, []);

  const handleLike = (tipId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(tipId)) {
        next.delete(tipId);
      } else {
        next.add(tipId);
      }
      localStorage.setItem('codlearn_liked_tips', JSON.stringify([...next]));
      return next;
    });
  };

  const refresh = () => {
    setTips(getTipsForTags(tags));
  };

  if (tips.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Dicas da Comunidade
          </h3>
        </div>
        <button
          onClick={refresh}
          className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          title="Ver outras dicas"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {tips.map((tip) => {
          const liked = likedIds.has(tip.id);
          return (
            <div
              key={tip.id}
              className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">{tip.avatarEmoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{tip.text}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">{tip.author}</span>
                    <button
                      onClick={() => handleLike(tip.id)}
                      className={`flex items-center gap-1 text-xs transition-colors ${
                        liked
                          ? 'text-blue-400'
                          : 'text-muted-foreground hover:text-blue-400'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{tip.likes + (liked ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
