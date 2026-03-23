'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, X } from 'lucide-react';

interface LessonRatingProps {
  lessonId: string;
}

type Rating = 'up' | 'down' | null;

export default function LessonRating({ lessonId }: LessonRatingProps) {
  const storageKey = `codlearn_rating_${lessonId}`;
  const feedbackKey = `codlearn_feedback_${lessonId}`;

  const [rating, setRating] = useState<Rating>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Rating;
    if (stored) {
      setRating(stored);
      setSubmitted(true);
    }
  }, [storageKey]);

  const handleRating = (r: Rating) => {
    if (submitted) return;
    setRating(r);
    if (r === 'down') {
      setShowFeedback(true);
    } else {
      localStorage.setItem(storageKey, r!);
      setSubmitted(true);
    }
  };

  const handleSubmitFeedback = () => {
    if (rating) {
      localStorage.setItem(storageKey, rating);
      if (feedback.trim()) {
        localStorage.setItem(feedbackKey, feedback.trim());
      }
    }
    setShowFeedback(false);
    setSubmitted(true);
  };

  return (
    <div className="mt-8 p-4 bg-muted/20 border border-border rounded-xl">
      <div className="flex items-center gap-3 flex-wrap">
        <MessageSquare className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {submitted
            ? rating === 'up'
              ? '✅ Obrigado pelo feedback!'
              : '🙏 Feedback enviado! Vamos melhorar.'
            : 'Esta lição foi útil?'}
        </span>

        {!submitted && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRating('up')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                rating === 'up'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'hover:bg-accent border-border text-muted-foreground'
              }`}
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Sim</span>
            </button>
            <button
              onClick={() => handleRating('down')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                rating === 'down'
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'hover:bg-accent border-border text-muted-foreground'
              }`}
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Não</span>
            </button>
          </div>
        )}
      </div>

      {/* Negative feedback form */}
      {showFeedback && (
        <div className="mt-3 p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">O que poderia melhorar?</p>
            <button
              onClick={() => setShowFeedback(false)}
              className="p-1 hover:bg-accent rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2">
            {['Explicação confusa', 'Muito rápido', 'Precisa de mais exemplos', 'Erros no conteúdo', 'Outro'].map(
              (opt) => (
                <button
                  key={opt}
                  onClick={() => setFeedback(opt)}
                  className={`block w-full text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                    feedback === opt
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-accent text-muted-foreground'
                  }`}
                >
                  {opt}
                </button>
              )
            )}
          </div>
          <button
            onClick={handleSubmitFeedback}
            className="mt-3 w-full py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Enviar feedback
          </button>
        </div>
      )}
    </div>
  );
}
