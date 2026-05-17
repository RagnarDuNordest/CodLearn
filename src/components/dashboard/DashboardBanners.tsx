'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, PlayCircle, Zap } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
}

interface Module {
  id: string;
  title: string;
}

interface DashboardBannersProps {
  nextLesson: { lesson: Lesson; mod: Module } | null;
  hasStarted: boolean;
}

export default function DashboardBanners({ nextLesson, hasStarted }: DashboardBannersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col gap-3 mb-8"
    >
      {/* Daily challenge banner */}
      <Link
        href="/desafio"
        className="group relative overflow-hidden block p-5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
      >
        <div className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 transition-all" />
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Novo desafio disponível</p>
              </div>
              <p className="font-semibold text-foreground">Desafio do Dia 🗓️</p>
              <p className="text-sm text-muted-foreground">Resolva um desafio Python diário e mantenha o ritmo!</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Continue / start banner */}
      {nextLesson && (
        <Link
          href={`/licao/${nextLesson.mod.id}/${nextLesson.lesson.id}`}
          className="group relative overflow-hidden block p-5 bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/30 rounded-2xl hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">
                  {hasStarted ? 'Continue estudando' : 'Comece agora'}
                </p>
                <p className="font-semibold text-foreground truncate">{nextLesson.lesson.title}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {nextLesson.mod.title} · {nextLesson.lesson.estimatedMinutes} min
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      )}
    </motion.div>
  );
}
