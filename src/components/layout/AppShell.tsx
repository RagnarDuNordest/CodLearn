'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
      <Header onMenuToggle={handleMenuToggle} />
      <div className="md:ml-64">
        <main className="w-full max-w-[1600px] mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
