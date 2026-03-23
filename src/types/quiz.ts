export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  passingScore: number;
}

// Lesson quiz types (simple index-based)
export interface LessonQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonQuiz {
  lessonId: string;
  questions: LessonQuizQuestion[];
}
