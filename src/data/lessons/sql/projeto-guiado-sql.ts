import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-sql',
  moduleId: 'sql',
  title: 'Projeto: Banco de Dados de Biblioteca',
  description:
    'Modele e popule o banco de dados de uma biblioteca real usando CREATE TABLE, INSERT, SELECT e JOIN.',
  order: 7,
  estimatedMinutes: 40,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-sql',
    title: 'Sistema de Biblioteca com SQL',
    language: 'sql',
    scenario:
      'Uma biblioteca municipal contratou você para criar o banco de dados do sistema de empréstimo de livros. O sistema precisa cadastrar livros, membros e registrar os empréstimos.',
    objective:
      'Criar o esquema do banco de dados da biblioteca, inserir dados de teste e escrever consultas para gerar relatórios.',
    steps: [
      {
        id: 'gp-sql-s1',
        title: 'Criar as tabelas',
        description:
          'Crie as tabelas livros (id, titulo, autor, ano) e membros (id, nome, email). Use tipos adequados e chaves primárias.',
        starterCode:
          '-- Etapa 1: Criar tabelas\nCREATE TABLE livros (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL,\n    autor TEXT NOT NULL,\n    ano INTEGER\n);\n\n-- Crie a tabela membros\n-- Campos: id (PK), nome (NOT NULL), email (UNIQUE)\n',
        solution:
          'CREATE TABLE livros (\n    id INTEGER PRIMARY KEY,\n    titulo TEXT NOT NULL,\n    autor TEXT NOT NULL,\n    ano INTEGER\n);\n\nCREATE TABLE membros (\n    id INTEGER PRIMARY KEY,\n    nome TEXT NOT NULL,\n    email TEXT UNIQUE\n);',
        hints: [
          'INTEGER PRIMARY KEY cria a chave primária.',
          'NOT NULL garante que o campo seja preenchido.',
          'TEXT UNIQUE garante que não haverá dois e-mails iguais.',
        ],
        testCases: [
          { description: 'As duas tabelas devem ser criadas sem erros de sintaxe', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-sql-s2',
        title: 'Criar tabela de empréstimos e inserir dados',
        description:
          'Crie a tabela emprestimos (id, livro_id, membro_id, data_emprestimo, devolvido). Depois insira 3 livros, 3 membros e 4 empréstimos.',
        starterCode:
          '-- Etapa 2: Emprestimos e dados\n-- (As tabelas livros e membros ja existem)\nCREATE TABLE emprestimos (\n    id INTEGER PRIMARY KEY,\n    livro_id INTEGER,\n    membro_id INTEGER,\n    data_emprestimo TEXT,\n    devolvido INTEGER DEFAULT 0\n);\n\n-- Insira 3 livros\nINSERT INTO livros VALUES (1, "O Senhor dos Aneis", "Tolkien", 1954);\nINSERT INTO livros VALUES (2, "1984", "George Orwell", 1949);\nINSERT INTO livros VALUES (3, "Clean Code", "Robert Martin", 2008);\n\n-- Insira 3 membros e 4 emprestimos\n',
        solution:
          'CREATE TABLE emprestimos (\n    id INTEGER PRIMARY KEY,\n    livro_id INTEGER,\n    membro_id INTEGER,\n    data_emprestimo TEXT,\n    devolvido INTEGER DEFAULT 0\n);\nINSERT INTO livros VALUES (1, "O Senhor dos Aneis", "Tolkien", 1954);\nINSERT INTO livros VALUES (2, "1984", "George Orwell", 1949);\nINSERT INTO livros VALUES (3, "Clean Code", "Robert Martin", 2008);\nINSERT INTO membros VALUES (1, "Ana Silva", "ana@email.com");\nINSERT INTO membros VALUES (2, "Carlos Lima", "carlos@email.com");\nINSERT INTO membros VALUES (3, "Maria Costa", "maria@email.com");\nINSERT INTO emprestimos VALUES (1, 1, 1, "2024-01-10", 1);\nINSERT INTO emprestimos VALUES (2, 2, 2, "2024-01-15", 0);\nINSERT INTO emprestimos VALUES (3, 3, 1, "2024-01-20", 0);\nINSERT INTO emprestimos VALUES (4, 1, 3, "2024-01-25", 0);',
        hints: [
          'INSERT INTO membros VALUES (id, nome, email);',
          'Para empréstimos: devolvido = 1 significa devolvido, 0 = pendente.',
        ],
        testCases: [
          { description: 'Todos os INSERTs devem funcionar sem erros de integridade', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-sql-s3',
        title: 'Consultas com JOIN e filtros',
        description:
          'Escreva 3 consultas: (1) todos os empréstimos pendentes com nome do livro e do membro; (2) número de empréstimos por membro; (3) livros nunca emprestados.',
        starterCode:
          '-- Etapa 3: Consultas\n\n-- 1. Emprestimos pendentes (devolvido = 0) com nome do livro e membro\nSELECT l.titulo, m.nome, e.data_emprestimo\nFROM emprestimos e\nJOIN livros l ON e.livro_id = l.id\nJOIN membros m ON e.membro_id = m.id\nWHERE e.devolvido = 0;\n\n-- 2. Numero de emprestimos por membro\n-- (SELECT m.nome, COUNT(e.id) AS total ...)\n\n-- 3. Livros nunca emprestados\n-- (SELECT l.titulo FROM livros l WHERE l.id NOT IN (SELECT livro_id FROM emprestimos))\n',
        solution:
          'SELECT l.titulo, m.nome, e.data_emprestimo\nFROM emprestimos e\nJOIN livros l ON e.livro_id = l.id\nJOIN membros m ON e.membro_id = m.id\nWHERE e.devolvido = 0;\n\nSELECT m.nome, COUNT(e.id) AS total\nFROM membros m\nLEFT JOIN emprestimos e ON m.id = e.membro_id\nGROUP BY m.id, m.nome\nORDER BY total DESC;\n\nSELECT l.titulo\nFROM livros l\nWHERE l.id NOT IN (SELECT livro_id FROM emprestimos);',
        hints: [
          'Use JOIN ... ON para ligar tabelas pela chave estrangeira.',
          'COUNT(e.id) com GROUP BY conta por grupo.',
          'NOT IN (subquery) encontra registros sem correspondência.',
        ],
        testCases: [
          { description: 'Consulta 1 deve retornar 3 empréstimos pendentes', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
