'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Hammer } from 'lucide-react';
import { getAllLessons } from '@/data/lessons';
import { getModuleById } from '@/data/modules';
import { Lesson } from '@/types/lesson';
import Fuse from 'fuse.js';

interface FuseItem {
  lesson: Lesson;
  moduleName: string;
  moduleDescription: string;
}

interface SearchResult {
  lesson: Lesson;
  moduleName: string;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fuse = useMemo(() => {
    const items: FuseItem[] = getAllLessons().map((lesson) => {
      const mod = getModuleById(lesson.moduleId);
      return {
        lesson,
        moduleName: mod?.title ?? lesson.moduleId,
        moduleDescription: mod?.description ?? '',
      };
    });
    return new Fuse(items, {
      keys: [
        { name: 'lesson.title', weight: 3 },
        { name: 'lesson.description', weight: 2 },
        { name: 'moduleName', weight: 1 },
        { name: 'moduleDescription', weight: 0.5 },
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, []);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const fuseResults = fuse.search(q, { limit: 12 });
      setResults(
        fuseResults.map((r) => ({
          lesson: r.item.lesson,
          moduleName: r.item.moduleName,
        }))
      );
    },
    [fuse]
  );

  useEffect(() => {
    search(query);
    setSelectedIndex(-1);
  }, [query, search]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
      return;
    }
    if (e.key === 'Enter' && selectedIndex >= 0 && results[selectedIndex]) {
      navigateTo(results[selectedIndex]);
    }
  };

  const navigateTo = (result: SearchResult) => {
    router.push(`/licao/${result.lesson.moduleId}/${result.lesson.id}`);
    setIsOpen(false);
    setQuery('');
  };

  const isProject =
    (lesson: Lesson) => lesson.type === 'guided-project' || lesson.type === 'free-project';

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Buscar lições... ⌘K"
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-9 pr-9 py-2 text-sm bg-accent/50 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-0.5 rounded hover:bg-accent transition-colors"
            aria-label="Limpar busca"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              Nenhuma lição encontrada para &quot;{query}&quot;
            </div>
          ) : (
            <ul>
              {results.map((result, i) => (
                <li key={result.lesson.id}>
                  <button
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-accent transition-colors ${
                      i === selectedIndex ? 'bg-accent' : ''
                    } ${i < results.length - 1 ? 'border-b border-border/50' : ''}`}
                    onClick={() => navigateTo(result)}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10">
                      {isProject(result.lesson) ? (
                        <Hammer className="w-4 h-4 text-primary" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{result.lesson.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.moduleName}</p>
                    </div>
                    <span
                      className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                        isProject(result.lesson)
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}
                    >
                      {isProject(result.lesson) ? 'Projeto' : 'Lição'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
