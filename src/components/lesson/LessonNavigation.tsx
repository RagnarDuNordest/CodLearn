import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonLink {
  id: string;
  moduleId: string;
  title: string;
}

interface LessonNavigationProps {
  prevLesson?: LessonLink | null;
  nextLesson?: LessonLink | null;
}

export default function LessonNavigation({ prevLesson, nextLesson }: LessonNavigationProps) {
  return (
    <nav className="flex items-center justify-between mt-12 pt-6 border-t border-border">
      <div className="flex-1">
        {prevLesson && (
          <Link
            href={`/licao/${prevLesson.moduleId}/${prevLesson.id}`}
            className="group inline-flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide">Anterior</span>
              <span className="text-sm font-medium text-foreground">
                {prevLesson.title}
              </span>
            </div>
          </Link>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {nextLesson && (
          <Link
            href={`/licao/${nextLesson.moduleId}/${nextLesson.id}`}
            className="group inline-flex items-center gap-2 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-right"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs uppercase tracking-wide">Proxima</span>
              <span className="text-sm font-medium text-foreground">
                {nextLesson.title}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </nav>
  );
}
