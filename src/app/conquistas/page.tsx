'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BadgesPanel from '@/components/ui/BadgesPanel';

export default function ConquistasPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao início
      </Link>

      <BadgesPanel />
    </div>
  );
}
