'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, X, Send, Minimize2, Maximize2, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIHelperProps {
  context?: string; // e.g. "Estudando: Funções em Python — aula 3"
}

/* Very small markdown renderer: bold, inline code, code blocks */
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      result.push(
        <pre key={i} className="my-2 rounded-lg bg-[#011627] p-3 overflow-x-auto">
          {lang && <span className="text-[10px] text-white/30 uppercase mb-1 block">{lang}</span>}
          <code className="text-[12px] font-mono text-emerald-300 leading-relaxed">
            {codeLines.join('\n')}
          </code>
        </pre>
      );
      i++;
      continue;
    }

    // Normal line — inline formatting
    result.push(
      <p key={i} className="leading-relaxed mb-1 last:mb-0">
        {parseInline(line)}
      </p>
    );
    i++;
  }
  return result;
}

function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const raw = match[0];
    if (raw.startsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1 py-0.5 rounded bg-white/10 font-mono text-[11px] text-emerald-300">
          {raw.slice(1, -1)}
        </code>
      );
    } else {
      parts.push(<strong key={match.index} className="font-semibold text-white">{raw.slice(2, -2)}</strong>);
    }
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function AIHelper({ context }: AIHelperProps) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open && !minimized) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [messages, open, minimized]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setStreaming(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMsg]);

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch('/api/ai-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abort.signal,
        body: JSON.stringify({ messages: updatedMessages, context }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') break;
          try {
            const { text } = JSON.parse(data);
            setMessages(prev => {
              const next = [...prev];
              next[next.length - 1] = {
                ...next[next.length - 1],
                content: next[next.length - 1].content + text,
              };
              return next;
            });
            if (minimized || !open) setHasUnread(true);
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== 'AbortError') {
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = {
            ...next[next.length - 1],
            content: 'Ops, houve um erro ao conectar. Tente novamente.',
          };
          return next;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, messages, streaming, context, minimized, open]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setStreaming(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setHasUnread(false); }}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          title="Precisa de ajuda? Fale com o CodBot"
        >
          <Bot className="w-5 h-5" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`fixed right-4 z-50 flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117] transition-all duration-200 ${
            minimized ? 'bottom-6 w-72 h-12' : 'bottom-6 w-80 sm:w-96 h-[520px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#161b22] border-b border-white/10 shrink-0">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white leading-none">CodBot</p>
              <p className="text-[10px] text-white/40 mt-0.5 truncate">
                {streaming ? 'Digitando...' : 'Tutor socrático · nunca entrega a resposta 😄'}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {!minimized && messages.length > 0 && (
                <button onClick={clearChat} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors" title="Limpar conversa">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button onClick={() => setMinimized(v => !v)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                {minimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => { abortRef.current?.abort(); setOpen(false); }} className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-white/5 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-3 px-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80">Oi! Sou o CodBot 👋</p>
                      <p className="text-xs text-white/40 mt-1 leading-relaxed">
                        Estou aqui para te ajudar a pensar — mas <span className="text-amber-400">nunca</span> vou dar a resposta direto. Vamos descobrir juntos!
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5 w-full mt-1">
                      {['Não entendi esse conceito', 'Por que meu código não funciona?', 'Como pensar nesse exercício?'].map(q => (
                        <button
                          key={q}
                          onClick={() => { setInput(q); inputRef.current?.focus(); }}
                          className="text-left text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors border border-white/5"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-2 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-[#1e2530] text-white/85 rounded-bl-sm border border-white/5'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="space-y-0.5">
                          {msg.content ? renderMarkdown(msg.content) : (
                            <span className="inline-flex gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
                            </span>
                          )}
                        </div>
                      ) : msg.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/10 bg-[#0d1117] shrink-0">
                {context && (
                  <p className="text-[10px] text-white/25 mb-2 truncate px-1">📍 {context}</p>
                )}
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Qual é a sua dúvida?"
                    rows={1}
                    style={{ resize: 'none' }}
                    className="flex-1 bg-[#161b22] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/50 transition-colors min-h-[40px] max-h-[100px] overflow-y-auto leading-relaxed"
                    onInput={e => {
                      const t = e.currentTarget;
                      t.style.height = 'auto';
                      t.style.height = Math.min(t.scrollHeight, 100) + 'px';
                    }}
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim() || streaming}
                    className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 disabled:opacity-30 transition-opacity shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-white/20 mt-1.5 text-center">Enter para enviar · Shift+Enter para nova linha</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
