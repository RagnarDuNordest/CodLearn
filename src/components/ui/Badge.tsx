import { type ReactNode } from 'react';

type BadgeVariant =
  | 'python'
  | 'c'
  | 'intro'
  | 'estruturas'
  | 'algoritmos'
  | 'default';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  python: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  c: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  intro: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  estruturas:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  algoritmos:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  default: 'bg-muted text-foreground',
};

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
