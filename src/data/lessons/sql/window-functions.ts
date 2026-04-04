import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'window-functions',
  moduleId: 'sql',
  title: 'Window Functions',
  description: 'Calcule rankings, acumulados e comparacoes entre linhas sem agrupar os dados com window functions',
  order: 11,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Window Functions: Calculos Sobre Conjuntos\n\nWindow functions (funcoes de janela) realizam calculos sobre um conjunto de linhas relacionadas a linha atual, sem colapsar as linhas como GROUP BY faz.\n\n**GROUP BY** agrupa e retorna uma linha por grupo:\n```sql\nSELECT departamento, AVG(salario) FROM funcionarios GROUP BY departamento;\n-- 3 linhas (uma por departamento)\n```\n\n**Window function** calcula mas mantem todas as linhas:\n```sql\nSELECT nome, departamento,\n       AVG(salario) OVER (PARTITION BY departamento) AS media_dept\nFROM funcionarios;\n-- Todas as linhas, com a media do departamento em cada uma\n```\n\n### Sintaxe\n```sql\nfuncao() OVER (\n  PARTITION BY coluna   -- divide em grupos (opcional)\n  ORDER BY coluna       -- ordena dentro do grupo\n  ROWS/RANGE BETWEEN .. -- define o frame (opcional)\n)\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Tabela: vendas(id, vendedor, mes, valor)\n-- Demonstrando as principais window functions\n\n-- 1. RANK e ROW_NUMBER: ranking dos vendedores por mes\nSELECT\n  vendedor,\n  mes,\n  valor,\n  ROW_NUMBER() OVER (PARTITION BY mes ORDER BY valor DESC) AS posicao_unica,\n  RANK()       OVER (PARTITION BY mes ORDER BY valor DESC) AS ranking,\n  DENSE_RANK() OVER (PARTITION BY mes ORDER BY valor DESC) AS ranking_denso\nFROM vendas;\n-- ROW_NUMBER: 1,2,3,4 (sempre unico)\n-- RANK:       1,2,2,4 (empate pula posicao)\n-- DENSE_RANK: 1,2,2,3 (empate nao pula posicao)\n\n-- 2. SUM acumulado e media movel\nSELECT\n  mes,\n  vendedor,\n  valor,\n  SUM(valor) OVER (\n    PARTITION BY vendedor\n    ORDER BY mes\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS total_acumulado,\n  AVG(valor) OVER (\n    PARTITION BY vendedor\n    ORDER BY mes\n    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n  ) AS media_3_meses\nFROM vendas;\n\n-- 3. LAG e LEAD: comparar com linha anterior/proxima\nSELECT\n  vendedor,\n  mes,\n  valor,\n  LAG(valor, 1)  OVER (PARTITION BY vendedor ORDER BY mes) AS valor_mes_anterior,\n  LEAD(valor, 1) OVER (PARTITION BY vendedor ORDER BY mes) AS valor_proximo_mes,\n  valor - LAG(valor, 1) OVER (PARTITION BY vendedor ORDER BY mes) AS variacao\nFROM vendas;\n\n-- 4. FIRST_VALUE e LAST_VALUE: primeiro e ultimo valor da particao\nSELECT\n  vendedor,\n  mes,\n  valor,\n  FIRST_VALUE(valor) OVER (\n    PARTITION BY vendedor ORDER BY mes\n    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\n  ) AS primeira_venda,\n  MAX(valor) OVER (PARTITION BY vendedor) AS melhor_mes\nFROM vendas;\n\n-- 5. NTILE: dividir em N grupos (quartis, decis)\nSELECT\n  vendedor,\n  valor,\n  NTILE(4) OVER (ORDER BY valor) AS quartil,\n  NTILE(10) OVER (ORDER BY valor) AS decil\nFROM vendas\nWHERE mes = \'2024-01\';',
        filename: 'window_functions.sql',
        description: 'ROW_NUMBER/RANK/DENSE_RANK para rankings, SUM acumulado e media movel com frame ROWS BETWEEN, LAG/LEAD para comparar com linhas adjacentes, FIRST_VALUE/MAX para extremos da particao, NTILE para percentis.',
      },
    },
    {
      type: 'text',
      content: '## Casos de Uso Praticos\n\n**Top N por grupo** (os 3 melhores vendedores por departamento):\n```sql\nWITH ranked AS (\n  SELECT *,\n    RANK() OVER (PARTITION BY departamento ORDER BY vendas DESC) AS pos\n  FROM funcionarios\n)\nSELECT * FROM ranked WHERE pos <= 3;\n```\n\n**Percentual do total**:\n```sql\nSELECT\n  produto,\n  valor,\n  valor / SUM(valor) OVER () * 100 AS pct_total,\n  valor / SUM(valor) OVER (PARTITION BY categoria) * 100 AS pct_categoria\nFROM vendas;\n```\n\n**Gaps e islands** (periodos consecutivos):\n```sql\nSELECT\n  usuario_id,\n  MIN(data) AS inicio,\n  MAX(data) AS fim\nFROM (\n  SELECT *,\n    data - INTERVAL (ROW_NUMBER() OVER (PARTITION BY usuario_id ORDER BY data) - 1) DAY AS grp\n  FROM acessos\n) t\nGROUP BY usuario_id, grp;\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Window functions sao executadas DEPOIS do WHERE, GROUP BY e HAVING mas ANTES do SELECT final. Por isso, nao pode usar alias de window function no WHERE — use uma CTE ou subquery. ROWS BETWEEN e mais previsivel que RANGE BETWEEN para frames.',
    },
  ],
  challenges: [
    {
      id: 'window-c1',
      title: 'Analise de Vendas por Periodo',
      description: 'Dada a tabela vendas(id, produto, categoria, data, valor), escreva queries para: (1) ranking de produtos por valor total, reiniciando por categoria; (2) variacao percentual de vendas mes a mes por produto; (3) produtos que estao no top 25% (quartil 4) de valor.',
      language: 'sql',
      starterCode: '-- Tabela: vendas(id, produto, categoria, data, valor)\n-- Dados de exemplo ja existem no banco\n\n-- PARTE 1: ranking por categoria\n-- Mostre: produto, categoria, total_vendas, ranking_na_categoria\nSELECT\n  produto,\n  categoria,\n  SUM(valor) AS total_vendas,\n  -- TODO: ranking dentro de cada categoria\n  ??? AS ranking_categoria\nFROM vendas\nGROUP BY produto, categoria;\n-- Nao funciona diretamente com GROUP BY + window function\n-- Use uma CTE!\n\n-- PARTE 2: variacao mes a mes (por produto)\n-- Mostre: produto, mes, valor_mensal, valor_mes_anterior, variacao_pct\nWITH mensais AS (\n  SELECT\n    produto,\n    DATE_FORMAT(data, \'%Y-%m\') AS mes,\n    SUM(valor) AS valor_mensal\n  FROM vendas\n  GROUP BY produto, mes\n)\nSELECT\n  produto,\n  mes,\n  valor_mensal,\n  -- TODO: valor do mes anterior\n  -- TODO: variacao percentual\nFROM mensais;\n\n-- PARTE 3: top 25% (quartil 4 de 4)\n-- Mostre apenas os produtos no quartil mais alto\nSELECT produto, valor\nFROM vendas\nWHERE ???;  -- use subquery ou CTE com NTILE\n',
      solution: '-- PARTE 1: ranking por categoria usando CTE\nWITH totais AS (\n  SELECT\n    produto,\n    categoria,\n    SUM(valor) AS total_vendas\n  FROM vendas\n  GROUP BY produto, categoria\n)\nSELECT\n  produto,\n  categoria,\n  total_vendas,\n  RANK() OVER (PARTITION BY categoria ORDER BY total_vendas DESC) AS ranking_categoria\nFROM totais;\n\n-- PARTE 2: variacao mes a mes\nWITH mensais AS (\n  SELECT\n    produto,\n    DATE_FORMAT(data, \'%Y-%m\') AS mes,\n    SUM(valor) AS valor_mensal\n  FROM vendas\n  GROUP BY produto, mes\n)\nSELECT\n  produto,\n  mes,\n  valor_mensal,\n  LAG(valor_mensal) OVER (PARTITION BY produto ORDER BY mes) AS valor_mes_anterior,\n  ROUND(\n    (valor_mensal - LAG(valor_mensal) OVER (PARTITION BY produto ORDER BY mes))\n    / LAG(valor_mensal) OVER (PARTITION BY produto ORDER BY mes) * 100,\n    2\n  ) AS variacao_pct\nFROM mensais;\n\n-- PARTE 3: top 25% com NTILE\nWITH quartis AS (\n  SELECT\n    produto,\n    valor,\n    NTILE(4) OVER (ORDER BY valor DESC) AS quartil\n  FROM vendas\n)\nSELECT produto, valor\nFROM quartis\nWHERE quartil = 1;  -- quartil 1 = top 25%\n',
      hints: [
        'Nao pode usar window function diretamente com GROUP BY — use uma CTE primeiro para agregar, depois aplique a window function',
        'LAG(valor_mensal) OVER (PARTITION BY produto ORDER BY mes) pega o valor do mes anterior para o mesmo produto',
        'NTILE(4) divide em 4 grupos onde quartil=1 e o 25% maior (pois ordenamos DESC)',
      ],
    },
  ],
};
