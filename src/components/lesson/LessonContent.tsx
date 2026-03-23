import { Lightbulb, AlertTriangle, Info } from 'lucide-react';
import CodeBlock from './CodeBlock';
import type { LessonSection } from '@/types/lesson';

interface LessonContentProps {
  sections: LessonSection[];
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    borderColor: 'border-green-500',
    bgColor: 'bg-green-500/5',
    iconColor: 'text-green-500',
    titleColor: 'text-green-600 dark:text-green-400',
    title: 'Dica',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500/5',
    iconColor: 'text-amber-500',
    titleColor: 'text-amber-600 dark:text-amber-400',
    title: 'Atenção',
  },
  info: {
    icon: Info,
    borderColor: 'border-blue-500',
    bgColor: 'bg-blue-500/5',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-600 dark:text-blue-400',
    title: 'Informação',
  },
};

function formatText(text: string): string {
  let result = text;
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  result = result.replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>');
  return result;
}

function TextSection({ content }: { content: string }) {
  const paragraphs = content.split('\n\n');

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const trimmed = paragraph.trim();
        // Handle ## headers
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-xl font-bold text-foreground mt-6 mb-3"
              dangerouslySetInnerHTML={{ __html: formatText(trimmed.slice(3)) }}
            />
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="text-lg font-semibold text-foreground mt-4 mb-2"
              dangerouslySetInnerHTML={{ __html: formatText(trimmed.slice(4)) }}
            />
          );
        }
        return (
          <p
            key={index}
            className="text-foreground leading-relaxed mb-4"
            style={{ fontSize: 'var(--content-font-size, 1rem)' }}
            dangerouslySetInnerHTML={{ __html: formatText(trimmed) }}
          />
        );
      })}
    </>
  );
}

function CalloutSection({ content, calloutType }: { content: string; calloutType: 'tip' | 'warning' | 'info' }) {
  const config = calloutConfig[calloutType];
  const Icon = config.icon;

  return (
    <div className={`border-l-4 ${config.borderColor} ${config.bgColor} rounded-r-lg p-4 my-4`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconColor}`} />
        <div>
          <p className={`font-semibold text-sm mb-1 ${config.titleColor}`}>
            {config.title}
          </p>
          <div
            className="text-sm text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatText(content) }}
          />
        </div>
      </div>
    </div>
  );
}

function ComparisonSection({ comparison }: {
  comparison: {
    python: { language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash'; code: string; filename?: string; description?: string };
    c: { language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash'; code: string; filename?: string; description?: string };
    explanation: string;
  };
}) {
  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <CodeBlock
            code={comparison.python.code}
            language="python"
            filename={comparison.python.filename}
            description={comparison.python.description}
          />
        </div>
        <div>
          <CodeBlock
            code={comparison.c.code}
            language="c"
            filename={comparison.c.filename}
            description={comparison.c.description}
          />
        </div>
      </div>
      {comparison.explanation && (
        <p
          className="mt-3 text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(comparison.explanation) }}
        />
      )}
    </div>
  );
}

export default function LessonContent({ sections }: LessonContentProps) {
  return (
    <div className="prose-custom">
      {sections.map((section, index) => {
        switch (section.type) {
          case 'text':
            return section.content ? (
              <TextSection key={index} content={section.content} />
            ) : null;

          case 'code':
            return section.codeExample ? (
              <CodeBlock
                key={index}
                code={section.codeExample.code}
                language={section.codeExample.language}
                filename={section.codeExample.filename}
                description={section.codeExample.description}
              />
            ) : null;

          case 'callout':
            return section.content && section.calloutType ? (
              <CalloutSection
                key={index}
                content={section.content}
                calloutType={section.calloutType}
              />
            ) : null;

          case 'comparison':
            return section.comparison ? (
              <ComparisonSection
                key={index}
                comparison={section.comparison}
              />
            ) : null;

          default:
            return null;
        }
      })}
    </div>
  );
}
