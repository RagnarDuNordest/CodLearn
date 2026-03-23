'use client';

import { useEffect, useRef } from 'react';
import { X, Share2, Download } from 'lucide-react';

interface Props {
  moduleTitle: string;
  onClose: () => void;
}

export default function ModuleCertificate({ moduleTitle, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleShareLinkedIn = () => {
    const text = encodeURIComponent(
      `Acabei de concluir o módulo "${moduleTitle}" na plataforma CodLearn! 🎓 #CodLearn #Programação #Aprendizado`
    );
    const url = encodeURIComponent('https://codlearn.app');
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Fechar certificado"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate content */}
        <div className="p-8 md:p-12">
          {/* Header decoration */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>

          {/* Certificate frame */}
          <div className="border-2 border-primary/20 rounded-xl p-6 md:p-8 bg-gradient-to-b from-primary/5 to-transparent relative">
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

            <div className="text-center">
              {/* Issuer */}
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
                CodLearn
              </p>

              {/* Certificate title */}
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Certificado de Conclusão
              </h2>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
                <div className="w-2 h-2 rounded-full bg-primary/60" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              {/* Congratulation message */}
              <p className="text-muted-foreground text-sm mb-4">
                Parabéns por completar este módulo!
              </p>

              {/* Module name */}
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                {moduleTitle}
              </p>

              {/* Completion date */}
              <p className="text-sm text-muted-foreground mt-4">
                Concluído em{' '}
                <span className="font-medium text-foreground">{today}</span>
              </p>
            </div>
          </div>

          {/* Signature area */}
          <div className="flex justify-center mt-6 mb-2">
            <div className="text-center">
              <div className="h-px w-32 bg-border mb-1" />
              <p className="text-xs text-muted-foreground">Plataforma CodLearn</p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="border-t border-border px-8 py-4 flex flex-col sm:flex-row gap-3 justify-end bg-accent/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Download className="w-4 h-4" />
            Baixar como imagem
          </button>
          <button
            onClick={handleShareLinkedIn}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar no LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
