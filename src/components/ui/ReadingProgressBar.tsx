'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Only show on lesson pages
  const isLesson = pathname.startsWith('/licao/');

  useEffect(() => {
    if (!isLesson) {
      setProgress(0);
      setVisible(false);
      return;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      setVisible(scrollTop > 50);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [isLesson, pathname]);

  if (!isLesson) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] h-1 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full bg-gradient-to-r from-primary to-blue-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
