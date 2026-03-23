'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import GlobalSearch from '@/components/ui/GlobalSearch';
import LevelWidget from '@/components/ui/LevelWidget';
import SettingsMenu from '@/components/ui/SettingsMenu';
import Logo from '@/components/ui/Logo';
import { useProfile } from '@/hooks/useProfile';
import { getAvatarById } from '@/data/avatars';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { profile } = useProfile();
  const avatar = getAvatarById(profile.avatarId);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 py-2 flex items-center justify-between gap-4 min-h-16">
      {/* Left: menu toggle + logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Logo size={28} />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            CodLearn
          </span>
          {profile.name && (
            <div
              className="w-6 h-6 rounded-full overflow-hidden border border-border flex-shrink-0"
              title={profile.name}
              dangerouslySetInnerHTML={{ __html: avatar.svg }}
            />
          )}
        </Link>
      </div>

      {/* Center: global search */}
      <div className="flex-1 flex justify-center max-w-sm mx-auto w-full">
        <GlobalSearch />
      </div>

      {/* Right: level widget + settings menu */}
      <div className="flex-shrink-0 flex flex-row items-center gap-2">
        <LevelWidget />
        <SettingsMenu />
      </div>
    </header>
  );
}
