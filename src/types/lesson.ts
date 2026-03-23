export interface CodeExample {
  language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash';
  code: string;
  filename?: string;
  description?: string;
}

export interface LessonSection {
  type: 'text' | 'code' | 'callout' | 'comparison';
  content?: string;
  codeExample?: CodeExample;
  calloutType?: 'tip' | 'warning' | 'info';
  comparison?: {
    python: CodeExample;
    c: CodeExample;
    explanation: string;
  };
}

export interface TestCase {
  description: string;
  inputs?: string[];
  expectedOutput: string;
}

export interface CodeChallenge {
  id: string;
  title: string;
  description: string;
  language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash';
  starterCode: string;
  solution: string;
  hints: string[];
  testCases?: TestCase[];
}

// ─── Guided Project (step-by-step) ───────────────────────────────────────────

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
}

export interface GuidedProjectData {
  id: string;
  title: string;
  scenario: string;       // Real-world context: "You were hired by a school to..."
  objective: string;      // What will be built
  language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash';
  steps: ProjectStep[];
}

// ─── Free Project (brief + tests, no step-by-step) ───────────────────────────

export interface FreeProjectData {
  id: string;
  title: string;
  scenario: string;       // Real-world context
  objective: string;
  requirements: string[]; // Bullet-point list of what must work
  language: 'python' | 'c' | 'java' | 'html' | 'css' | 'javascript' | 'sql' | 'bash';
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
}

// ─── Lesson (supports regular lessons and both project types) ────────────────

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  type?: 'lesson' | 'guided-project' | 'free-project';
  // Regular lesson
  sections: LessonSection[];
  challenges?: CodeChallenge[];
  // Guided project
  guidedProject?: GuidedProjectData;
  // Free project
  freeProject?: FreeProjectData;
}
