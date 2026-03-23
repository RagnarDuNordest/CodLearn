'use client';

import { useState, useEffect, useRef } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { avatars } from '@/data/avatars';

const QUICK_TAGS = [
  '🦾 Hacker em formação',
  '🎓 Estudante',
  '💼 Dev Júnior',
  '🚀 Em transição de carreira',
  '🎮 Desenvolvedor de jogos',
  '🌐 Web Developer',
];

export default function ProfileSetup() {
  const { profile, setName, setAvatarId, setTag } = useProfile();
  const [localName, setLocalName] = useState('');
  const [localTag, setLocalTag] = useState('');
  const hydrated = useRef(false);

  // Sync local state once after profile hydrates from localStorage
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      setLocalName(profile.name);
      setLocalTag(profile.tag);
    }
  }, [profile.name, profile.tag]);

  function handleNameBlur() {
    setName(localName.trim());
  }

  function handleTagBlur() {
    setTag(localTag);
  }

  function handleTagChange(value: string) {
    if (value.length <= 30) {
      setLocalTag(value);
    }
  }

  function handleQuickTag(tag: string) {
    setLocalTag(tag);
    setTag(tag);
  }

  return (
    <div className="space-y-4">
      {/* Name input */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          Seu nome
        </label>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleNameBlur}
          placeholder="Ex: Rafael"
          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Avatar grid */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          Avatar
        </label>
        <div className="grid grid-cols-4 gap-2">
          {avatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => setAvatarId(avatar.id)}
              title={avatar.label}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border-2 transition-all ${
                profile.avatarId === avatar.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-muted-foreground/50 hover:bg-accent'
              }`}
            >
              <div
                className="w-10 h-10"
                dangerouslySetInnerHTML={{ __html: avatar.svg }}
              />
              <span className="text-[9px] text-muted-foreground leading-none truncate w-full text-center">
                {avatar.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tag input */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
          Sua tag
          <span className="ml-1 opacity-60">({localTag.length}/30)</span>
        </label>
        <input
          type="text"
          value={localTag}
          onChange={(e) => handleTagChange(e.target.value)}
          onBlur={handleTagBlur}
          placeholder="Ex: 🦾 Hacker em formação"
          maxLength={30}
          className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Quick-select tags */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleQuickTag(tag)}
            className={`text-[11px] px-2 py-1 rounded-lg border transition-all leading-none ${
              localTag === tag
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-muted-foreground/50 hover:bg-accent'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
