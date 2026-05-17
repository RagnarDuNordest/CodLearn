'use client';

import { useState } from 'react';
import { Menu, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import GlobalSearch from '@/components/ui/GlobalSearch';
import LevelWidget from '@/components/ui/LevelWidget';
import SettingsMenu from '@/components/ui/SettingsMenu';
import Logo from '@/components/ui/Logo';
import AuthModal from '@/components/auth/AuthModal';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user, loading, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border px-4 py-2 flex items-center justify-between gap-4 min-h-16">
        {/* Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Logo size={28} />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              CodLearn
            </span>
          </Link>
        </div>

        {/* Center */}
        <div className="flex-1 flex justify-center max-w-sm mx-auto w-full">
          <GlobalSearch />
        </div>

        {/* Right */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <LevelWidget />
          <SettingsMenu />

          {!loading && (
            user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu((v) => !v)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl border border-border hover:border-primary/40 hover:bg-accent transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
                    {userInitial}
                  </div>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 w-52 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
                      <div className="px-3 py-2.5 border-b border-border">
                        <p className="text-xs text-muted-foreground">Logado como</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/progresso"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors w-full text-left"
                        >
                          <User className="w-4 h-4 text-muted-foreground" />
                          Meu progresso
                        </Link>
                        <button
                          onClick={() => { signOut(); setShowUserMenu(false); }}
                          className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sair
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </button>
            )
          )}
        </div>
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
