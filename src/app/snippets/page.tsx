'use client';

import { useState, useEffect } from 'react';
import { Code2, Plus, Trash2, Copy, Check, Search, Tag } from 'lucide-react';

interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string;
  createdAt: number;
}

const STORAGE_KEY = 'codlearn_snippets';

const defaultSnippets: Snippet[] = [
  {
    id: 'default-1',
    title: 'Hello World Python',
    code: 'print("Hello, World!")',
    language: 'python',
    tags: 'python,basico',
    createdAt: Date.now() - 86400000,
  },
  {
    id: 'default-2',
    title: 'Ler input do usuário',
    code: 'nome = input("Qual seu nome? ")\nprint(f"Olá, {nome}!")',
    language: 'python',
    tags: 'python,input',
    createdAt: Date.now() - 72000000,
  },
  {
    id: 'default-3',
    title: 'Loop com enumerate',
    code: 'frutas = ["maçã", "banana", "uva"]\nfor i, fruta in enumerate(frutas):\n    print(f"{i}: {fruta}")',
    language: 'python',
    tags: 'python,loops,listas',
    createdAt: Date.now() - 36000000,
  },
];

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', code: '', language: 'python', tags: '' });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSnippets(JSON.parse(stored));
      } catch {
        setSnippets(defaultSnippets);
      }
    } else {
      setSnippets(defaultSnippets);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSnippets));
    }
  }, []);

  const save = (updated: Snippet[]) => {
    setSnippets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addSnippet = () => {
    if (!form.title.trim() || !form.code.trim()) return;
    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title: form.title.trim(),
      code: form.code.trim(),
      language: form.language,
      tags: form.tags.trim(),
      createdAt: Date.now(),
    };
    save([newSnippet, ...snippets]);
    setForm({ title: '', code: '', language: 'python', tags: '' });
    setShowForm(false);
  };

  const deleteSnippet = (id: string) => {
    save(snippets.filter((s) => s.id !== id));
  };

  const copyToClipboard = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const filtered = snippets.filter(
    (s) =>
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Code2 className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Biblioteca de Snippets</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Salve trechos de código úteis para reusar depois.
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Novo snippet
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-card border border-primary/30 rounded-2xl">
          <h3 className="font-semibold mb-3">Novo snippet</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título do snippet"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full px-3 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <textarea
              placeholder="Cole seu código aqui..."
              value={form.code}
              onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
              rows={6}
              className="w-full px-3 py-2 text-sm font-mono bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              spellCheck={false}
            />
            <div className="flex gap-3">
              <select
                value={form.language}
                onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
                className="px-3 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none"
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="sql">SQL</option>
                <option value="bash">Bash</option>
              </select>
              <input
                type="text"
                placeholder="Tags (ex: loops,listas)"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="flex-1 px-3 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:bg-accent rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={addSnippet}
                disabled={!form.title.trim() || !form.code.trim()}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                Salvar snippet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar snippets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Snippets list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-4xl mb-3">📋</p>
            <p>{search ? 'Nenhum snippet encontrado' : 'Adicione seu primeiro snippet!'}</p>
          </div>
        )}

        {filtered.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-2 min-w-0">
                <Code2 className="w-4 h-4 text-primary shrink-0" />
                <span className="font-medium text-sm truncate">{snippet.title}</span>
                <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded shrink-0">
                  {snippet.language}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => copyToClipboard(snippet.id, snippet.code)}
                  className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Copiar"
                >
                  {copiedId === snippet.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => deleteSnippet(snippet.id)}
                  className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors text-muted-foreground hover:text-red-400"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <pre className="p-3 text-xs font-mono overflow-x-auto text-foreground/80 max-h-32">
              {snippet.code}
            </pre>
            {snippet.tags && (
              <div className="flex gap-1.5 px-3 pb-2.5 flex-wrap">
                {snippet.tags.split(',').map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
