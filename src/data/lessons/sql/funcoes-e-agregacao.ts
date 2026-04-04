import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes-e-agregacao',
  moduleId: 'sql',
  title: 'Funcoes e Agregacao',
  description:
    'Aprenda a usar funcoes de agregacao (COUNT, SUM, AVG, MIN, MAX), agrupar dados com GROUP BY, filtrar grupos com HAVING e criar alias com AS.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Funcoes de agregacao sao como o resumo de uma prova: em vez de ver nota por nota, voce ve a media, a maior e a menor!\n\n## Funcoes de Agregacao\n\nFuncoes de agregacao fazem calculos sobre um conjunto de registros e retornam um unico valor. Sao essenciais para relatorios e analises de dados.\n\nAs 5 funcoes de agregacao mais usadas:\n\n- **COUNT(coluna)** -- Conta o numero de registros (COUNT(*) conta todos, incluindo NULLs)\n- **SUM(coluna)** -- Soma todos os valores numericos\n- **AVG(coluna)** -- Calcula a media aritmetica\n- **MIN(coluna)** -- Retorna o menor valor\n- **MAX(coluna)** -- Retorna o maior valor',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- COUNT: contar registros\nSELECT COUNT(*) FROM vendas;\n-- Total de vendas registradas\n\nSELECT COUNT(email) FROM clientes;\n-- Conta apenas clientes que tem email (ignora NULL)\n\n-- SUM: somar valores\nSELECT SUM(valor) FROM vendas;\n-- Valor total de todas as vendas\n\n-- AVG: media dos valores\nSELECT AVG(nota) FROM alunos;\n-- Media das notas dos alunos\n\n-- MIN e MAX: menor e maior valor\nSELECT MIN(preco), MAX(preco) FROM produtos;\n-- Produto mais barato e mais caro\n\n-- Combinando varias funcoes\nSELECT\n    COUNT(*) AS total_vendas,\n    SUM(valor) AS receita_total,\n    AVG(valor) AS ticket_medio,\n    MIN(valor) AS menor_venda,\n    MAX(valor) AS maior_venda\nFROM vendas;',
        filename: 'funcoes_agregacao.sql',
        description: 'As 5 funcoes de agregacao fundamentais do SQL.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        '**AS** cria um **alias** (apelido) para colunas ou tabelas no resultado. Nao altera a tabela original -- apenas renomeia a coluna na saida da consulta. Exemplo: `SELECT COUNT(*) AS total` exibe a contagem com o nome "total".',
    },
    {
      type: 'text',
      content:
        '## GROUP BY -- Agrupando Dados\n\n**GROUP BY** divide os registros em grupos baseados em uma ou mais colunas e aplica funcoes de agregacao a cada grupo separadamente.\n\nSem GROUP BY, as funcoes de agregacao consideram todos os registros como um unico grupo. Com GROUP BY, voce pode calcular totais, medias etc. por categoria, departamento, mes e muito mais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Contar produtos por categoria\nSELECT categoria, COUNT(*) AS quantidade\nFROM produtos\nGROUP BY categoria;\n\n-- Total de vendas por vendedor\nSELECT vendedor, SUM(valor) AS total_vendas\nFROM vendas\nGROUP BY vendedor;\n\n-- Media de salario por departamento\nSELECT departamento, AVG(salario) AS media_salarial\nFROM funcionarios\nGROUP BY departamento\nORDER BY media_salarial DESC;\n\n-- Agrupar por multiplas colunas\nSELECT departamento, cargo, COUNT(*) AS quantidade\nFROM funcionarios\nGROUP BY departamento, cargo;',
        filename: 'group_by.sql',
        description: 'Agrupando dados com GROUP BY para calculos por categoria.',
      },
    },
    {
      type: 'text',
      content:
        '## HAVING -- Filtrando Grupos\n\n**HAVING** e como um WHERE, mas para grupos. Enquanto WHERE filtra **registros individuais** antes do agrupamento, HAVING filtra **grupos** depois do agrupamento.\n\nRegra simples:\n- Use **WHERE** para filtrar linhas antes do GROUP BY\n- Use **HAVING** para filtrar grupos depois do GROUP BY',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- HAVING: filtrar grupos\nSELECT categoria, COUNT(*) AS quantidade\nFROM produtos\nGROUP BY categoria\nHAVING quantidade > 5;\n-- Apenas categorias com mais de 5 produtos\n\n-- WHERE + GROUP BY + HAVING juntos\nSELECT departamento, AVG(salario) AS media\nFROM funcionarios\nWHERE ativo = 1\nGROUP BY departamento\nHAVING media > 5000\nORDER BY media DESC;\n-- 1. WHERE filtra apenas funcionarios ativos\n-- 2. GROUP BY agrupa por departamento\n-- 3. HAVING filtra departamentos com media > 5000\n-- 4. ORDER BY ordena o resultado',
        filename: 'having.sql',
        description: 'Usando HAVING para filtrar grupos apos a agregacao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A ordem completa de uma query SQL e: **SELECT** > **FROM** > **WHERE** > **GROUP BY** > **HAVING** > **ORDER BY** > **LIMIT**. O banco executa nessa sequencia, por isso WHERE vem antes de GROUP BY e HAVING vem depois.',
    },
    {
      type: 'callout',
      content:
        'SQL e uma das linguagens mais uteis que voce vai aprender! Praticamente todo sistema que armazena dados usa SQL.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## HAVING — Filtrar grupos\n\n`WHERE` filtra LINHAS antes do agrupamento. `HAVING` filtra GRUPOS depois do `GROUP BY`. Use `HAVING` quando quiser filtrar por resultado de funcao de agregacao:\n\n- `WHERE nota > 6` — filtra linhas antes de agrupar\n- `HAVING AVG(nota) > 7` — filtra grupos pela media calculada\n\n**Subqueries** — Voce pode usar o resultado de uma consulta dentro de outra:\n```\nSELECT nome FROM alunos\nWHERE id IN (SELECT aluno_id FROM matriculas);\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'having_subquery.sql',
        code: `-- HAVING: filtra grupos (use com GROUP BY)
SELECT departamento, COUNT(*) as total, AVG(salario) as media
FROM funcionarios
GROUP BY departamento
HAVING AVG(salario) > 5000;
-- Mostra apenas departamentos com salario medio acima de 5000

-- WHERE filtra ANTES do agrupamento
-- HAVING filtra DEPOIS do agrupamento
SELECT departamento, COUNT(*) as total
FROM funcionarios
WHERE ativo = 1            -- Filtra apenas funcionarios ativos
GROUP BY departamento
HAVING COUNT(*) >= 3;      -- Departamentos com 3+ funcionarios ativos

-- Subquery: consulta dentro de consulta
SELECT nome, salario
FROM funcionarios
WHERE salario > (SELECT AVG(salario) FROM funcionarios);
-- Funcionarios que ganham acima da media geral`,
        description: 'HAVING filtra grupos (pos GROUP BY). WHERE filtra linhas (pre GROUP BY). Subqueries usam o resultado de uma SELECT dentro de outra.',
      },
    },
  ],
  challenges: [
    {
      id: 'sql4-c1',
      title: 'Relatorio de Vendas',
      description:
        'Crie uma tabela "vendas" com id, produto, categoria, quantidade e valor. Insira 8 vendas. Use funcoes de agregacao para calcular: total de vendas, receita total (SUM), valor medio (AVG), menor e maior venda (MIN/MAX).',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela vendas\n\n# Insira 8 vendas\n\n# Calcule: total de vendas, receita total, ticket medio, menor e maior venda\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE vendas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        produto TEXT NOT NULL,\n        categoria TEXT NOT NULL,\n        quantidade INTEGER NOT NULL,\n        valor REAL NOT NULL\n    )\n""")\n\nvendas = [\n    ("Notebook", "Eletronicos", 1, 3500.00),\n    ("Mouse", "Eletronicos", 3, 150.00),\n    ("Camiseta", "Roupas", 5, 200.00),\n    ("Tenis", "Calcados", 2, 400.00),\n    ("Fone", "Eletronicos", 4, 320.00),\n    ("Calca", "Roupas", 2, 180.00),\n    ("Monitor", "Eletronicos", 1, 1200.00),\n    ("Sandalia", "Calcados", 3, 120.00),\n]\ncursor.executemany("INSERT INTO vendas (produto, categoria, quantidade, valor) VALUES (?, ?, ?, ?)", vendas)\nconexao.commit()\n\ncursor.execute("""\n    SELECT\n        COUNT(*) AS total_vendas,\n        SUM(valor) AS receita_total,\n        AVG(valor) AS ticket_medio,\n        MIN(valor) AS menor_venda,\n        MAX(valor) AS maior_venda\n    FROM vendas\n""")\nr = cursor.fetchone()\nprint(f"Total de vendas: {r[0]}")\nprint(f"Receita total: R${r[1]:.2f}")\nprint(f"Ticket medio: R${r[2]:.2f}")\nprint(f"Menor venda: R${r[3]:.2f}")\nprint(f"Maior venda: R${r[4]:.2f}")\n\nconexao.close()',
      hints: [
        'Use COUNT(*) para contar todas as vendas',
        'SUM(valor) soma todos os valores, AVG(valor) calcula a media',
        'Combine todas as funcoes em um unico SELECT usando AS para nomear cada resultado',
      ],
    },
    {
      id: 'sql4-c2',
      title: 'Vendas por Categoria',
      description:
        'Usando a mesma tabela "vendas", agrupe as vendas por categoria com GROUP BY. Mostre a categoria, quantidade de vendas e receita total de cada uma. Use HAVING para mostrar apenas categorias com receita acima de 300.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela e insira dados\ncursor.execute("""\n    CREATE TABLE vendas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        produto TEXT NOT NULL,\n        categoria TEXT NOT NULL,\n        quantidade INTEGER NOT NULL,\n        valor REAL NOT NULL\n    )\n""")\nvendas = [\n    ("Notebook", "Eletronicos", 1, 3500.00),\n    ("Mouse", "Eletronicos", 3, 150.00),\n    ("Camiseta", "Roupas", 5, 200.00),\n    ("Tenis", "Calcados", 2, 400.00),\n    ("Fone", "Eletronicos", 4, 320.00),\n    ("Calca", "Roupas", 2, 180.00),\n    ("Monitor", "Eletronicos", 1, 1200.00),\n    ("Sandalia", "Calcados", 3, 120.00),\n]\ncursor.executemany("INSERT INTO vendas (produto, categoria, quantidade, valor) VALUES (?, ?, ?, ?)", vendas)\nconexao.commit()\n\n# Agrupe por categoria: quantidade de vendas e receita total\n\n# Filtre apenas categorias com receita > 300 usando HAVING\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE vendas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        produto TEXT NOT NULL,\n        categoria TEXT NOT NULL,\n        quantidade INTEGER NOT NULL,\n        valor REAL NOT NULL\n    )\n""")\nvendas = [\n    ("Notebook", "Eletronicos", 1, 3500.00),\n    ("Mouse", "Eletronicos", 3, 150.00),\n    ("Camiseta", "Roupas", 5, 200.00),\n    ("Tenis", "Calcados", 2, 400.00),\n    ("Fone", "Eletronicos", 4, 320.00),\n    ("Calca", "Roupas", 2, 180.00),\n    ("Monitor", "Eletronicos", 1, 1200.00),\n    ("Sandalia", "Calcados", 3, 120.00),\n]\ncursor.executemany("INSERT INTO vendas (produto, categoria, quantidade, valor) VALUES (?, ?, ?, ?)", vendas)\nconexao.commit()\n\nprint("=== Vendas por Categoria ===")\ncursor.execute("""\n    SELECT categoria, COUNT(*) AS qtd_vendas, SUM(valor) AS receita\n    FROM vendas\n    GROUP BY categoria\n    ORDER BY receita DESC\n""")\nfor r in cursor.fetchall():\n    print(f"  {r[0]}: {r[1]} vendas, Receita: R${r[2]:.2f}")\n\nprint("\\n=== Categorias com receita > R$300 ===")\ncursor.execute("""\n    SELECT categoria, SUM(valor) AS receita\n    FROM vendas\n    GROUP BY categoria\n    HAVING receita > 300\n    ORDER BY receita DESC\n""")\nfor r in cursor.fetchall():\n    print(f"  {r[0]}: R${r[1]:.2f}")\n\nconexao.close()',
      hints: [
        'GROUP BY categoria agrupa todas as vendas de mesma categoria',
        'Use SUM(valor) AS receita para dar um nome ao resultado',
        'HAVING receita > 300 filtra os grupos apos a agregacao',
      ],
    },
  ],
};
