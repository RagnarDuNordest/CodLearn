'use client';

import { motion } from 'framer-motion';
import { getAvatarById } from '@/data/avatars';
import { Sparkles } from 'lucide-react';

interface Profile {
  name?: string;
  tag?: string;
  avatarId: string;
}

interface WelcomeSectionProps {
  profile: Profile;
  hasStarted: boolean;
}

export default function WelcomeSection({ profile, hasStarted }: WelcomeSectionProps) {
  const avatar = getAvatarById(profile.avatarId);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent p-6"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        {profile.name && (
          <div
            className="flex-shrink-0 w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20"
            dangerouslySetInnerHTML={{ __html: avatar.svg }}
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-xs font-medium text-primary uppercase tracking-widest">
              {hasStarted ? 'Continue sua jornada' : 'Comece sua jornada'}
            </p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
            {profile.name ? (
              <>
                Olá, <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">{profile.name}</span>! 👋
              </>
            ) : hasStarted ? (
              <>
                {'Bem-vindo de volta ao '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">CodLearn</span>
              </>
            ) : (
              <>
                {'Bem-vindo ao '}
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">CodLearn</span>
              </>
            )}
          </h1>
          {profile.tag && (
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mt-1">
              {profile.tag}
            </span>
          )}
          <p className="text-muted-foreground mt-1">
            {hasStarted
              ? 'Continue de onde parou e mantenha o ritmo!'
              : 'Sua jornada na programação começa aqui. Aprenda no seu ritmo!'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
