import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-sql',
  moduleId: 'sql',
  title: 'Projeto Livre: Relatório de Vendas',
  description:
    'Modele um banco de vendas, popule com dados reais e gere relatórios com GROUP BY, ORDER BY e JOINs.',
  order: 8,
  estimatedMinutes: 35,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-sql',
    title: 'Sistema de Relatório de Vendas',
    language: 'sql',
    scenario:
      'Uma loja precisa de relatórios semanais de vendas por produto e por vendedor. Você vai criar o banco, inserir dados e escrever as consultas para o relatório.',
    objective:
      'Criar tabelas de produtos, vendedores e vendas; inserir dados; e gerar relatórios de total vendido por produto e por vendedor.',
    requirements: [
      'Criar tabela produtos (id, nome, preco) e vendedores (id, nome)',
      'Criar tabela vendas (id, produto_id, vendedor_id, quantidade, data)',
      'Inserir pelo menos 3 produtos, 2 vendedores e 5 vendas',
      'Consulta 1: total vendido (quantidade × preco) por produto, ordenado decrescente',
      'Consulta 2: total de vendas por vendedor',
    ],
    starterCode:
      '-- Projeto: Relatorio de Vendas\n\n-- Crie as tabelas\n\n-- Insira os dados\n\n-- Consulta 1: Total vendido por produto\n\n-- Consulta 2: Total de vendas por vendedor\n',
    solution:
      'CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL);\nCREATE TABLE vendedores (id INTEGER PRIMARY KEY, nome TEXT);\nCREATE TABLE vendas (id INTEGER PRIMARY KEY, produto_id INTEGER, vendedor_id INTEGER, quantidade INTEGER, data TEXT);\n\nINSERT INTO produtos VALUES (1, "Notebook", 3500.00);\nINSERT INTO produtos VALUES (2, "Mouse", 120.00);\nINSERT INTO produtos VALUES (3, "Teclado", 200.00);\nINSERT INTO vendedores VALUES (1, "Rafael");\nINSERT INTO vendedores VALUES (2, "Julia");\nINSERT INTO vendas VALUES (1, 1, 1, 2, "2024-01-10");\nINSERT INTO vendas VALUES (2, 2, 2, 5, "2024-01-11");\nINSERT INTO vendas VALUES (3, 3, 1, 3, "2024-01-12");\nINSERT INTO vendas VALUES (4, 1, 2, 1, "2024-01-13");\nINSERT INTO vendas VALUES (5, 2, 1, 4, "2024-01-14");\n\nSELECT p.nome, SUM(v.quantidade * p.preco) AS total_vendido\nFROM vendas v JOIN produtos p ON v.produto_id = p.id\nGROUP BY p.id ORDER BY total_vendido DESC;\n\nSELECT vd.nome, SUM(v.quantidade) AS total_vendas\nFROM vendas v JOIN vendedores vd ON v.vendedor_id = vd.id\nGROUP BY vd.id;',
    hints: [
      'SUM(v.quantidade * p.preco) calcula o valor total por produto.',
      'GROUP BY p.id agrupa os resultados por produto.',
      'ORDER BY total_vendido DESC ordena do maior para o menor.',
    ],
    testCases: [
      { description: 'Consultas devem retornar totais corretos por produto e por vendedor', inputs: [], expectedOutput: '' },
    ],
  },
};
