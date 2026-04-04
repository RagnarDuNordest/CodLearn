import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'sql-avancado-pratica',
  moduleId: 'sql',
  title: 'Projeto: SQL Avancado na Pratica',
  description: 'Resolva problemas reais combinando CTEs recursivas, window functions, indices e analise de performance',
  order: 12,
  type: 'lesson',
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content: '## SQL Avancado: Combinando Tudo\n\nProblemas reais raramente se resolvem com um unico recurso. Este projeto combina:\n\n- **CTEs recursivas** para hierarquias (categorias, org charts)\n- **Window functions** para analytics\n- **Indices compostos** para performance\n- **EXPLAIN** para diagnosticar queries lentas\n\n### O Cenario\n\nSistema de e-commerce com:\n- `categorias(id, nome, pai_id)` — arvore de categorias\n- `produtos(id, nome, categoria_id, preco, estoque)`\n- `pedidos(id, usuario_id, data, status)`\n- `itens_pedido(pedido_id, produto_id, quantidade, preco_unitario)`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- PARTE 1: CTE Recursiva — arvore de categorias\n-- Navegar hierarquia: Eletronicos > Computadores > Notebooks\nWITH RECURSIVE arvore_categorias AS (\n  -- Caso base: raiz (sem pai)\n  SELECT id, nome, pai_id, nome AS caminho, 0 AS nivel\n  FROM categorias\n  WHERE pai_id IS NULL\n\n  UNION ALL\n\n  -- Caso recursivo: filhos\n  SELECT c.id, c.nome, c.pai_id,\n         CONCAT(a.caminho, \' > \', c.nome) AS caminho,\n         a.nivel + 1\n  FROM categorias c\n  INNER JOIN arvore_categorias a ON c.pai_id = a.id\n)\nSELECT id, nome, caminho, nivel\nFROM arvore_categorias\nORDER BY caminho;\n\n-- PARTE 2: Analytics — desempenho de categorias com todos os niveis\nWITH RECURSIVE arvore AS (\n  SELECT id, nome, pai_id\n  FROM categorias\n  UNION ALL\n  SELECT c.id, c.nome, c.pai_id\n  FROM categorias c\n  INNER JOIN arvore a ON c.pai_id = a.id\n),\nvendas_por_categoria AS (\n  SELECT\n    p.categoria_id,\n    SUM(ip.quantidade * ip.preco_unitario) AS receita,\n    COUNT(DISTINCT ip.pedido_id) AS num_pedidos\n  FROM itens_pedido ip\n  INNER JOIN produtos p ON ip.produto_id = p.id\n  INNER JOIN pedidos pe ON ip.pedido_id = pe.id\n  WHERE pe.status = \'entregue\'\n  GROUP BY p.categoria_id\n)\nSELECT\n  c.nome,\n  COALESCE(v.receita, 0) AS receita,\n  COALESCE(v.num_pedidos, 0) AS num_pedidos,\n  RANK() OVER (ORDER BY COALESCE(v.receita, 0) DESC) AS ranking,\n  SUM(COALESCE(v.receita, 0)) OVER () AS receita_total,\n  ROUND(\n    COALESCE(v.receita, 0) / SUM(COALESCE(v.receita, 0)) OVER () * 100, 2\n  ) AS pct_receita\nFROM categorias c\nLEFT JOIN vendas_por_categoria v ON c.id = v.categoria_id\nORDER BY receita DESC;\n\n-- PARTE 3: Cohort Analysis — retencao de usuarios\n-- Usuarios agrupados por mes de cadastro, quantos compraram nos meses seguintes\nWITH cohorts AS (\n  SELECT\n    usuario_id,\n    DATE_FORMAT(MIN(data), \'%Y-%m\') AS mes_cadastro\n  FROM pedidos\n  GROUP BY usuario_id\n),\natividade AS (\n  SELECT\n    p.usuario_id,\n    c.mes_cadastro,\n    DATE_FORMAT(p.data, \'%Y-%m\') AS mes_ativo,\n    TIMESTAMPDIFF(\n      MONTH,\n      STR_TO_DATE(CONCAT(c.mes_cadastro, \'-01\'), \'%Y-%m-%d\'),\n      STR_TO_DATE(CONCAT(DATE_FORMAT(p.data, \'%Y-%m\'), \'-01\'), \'%Y-%m-%d\')\n    ) AS meses_desde_cadastro\n  FROM pedidos p\n  INNER JOIN cohorts c ON p.usuario_id = c.usuario_id\n)\nSELECT\n  mes_cadastro,\n  COUNT(DISTINCT CASE WHEN meses_desde_cadastro = 0 THEN usuario_id END) AS mes_0,\n  COUNT(DISTINCT CASE WHEN meses_desde_cadastro = 1 THEN usuario_id END) AS mes_1,\n  COUNT(DISTINCT CASE WHEN meses_desde_cadastro = 2 THEN usuario_id END) AS mes_2,\n  COUNT(DISTINCT CASE WHEN meses_desde_cadastro = 3 THEN usuario_id END) AS mes_3\nFROM atividade\nGROUP BY mes_cadastro\nORDER BY mes_cadastro;\n\n-- PARTE 4: Indices para as queries acima\nCREATE INDEX idx_pedidos_usuario_data ON pedidos(usuario_id, data);\nCREATE INDEX idx_pedidos_status_data  ON pedidos(status, data);\nCREATE INDEX idx_itens_pedido         ON itens_pedido(pedido_id, produto_id);\nCREATE INDEX idx_produtos_categoria   ON produtos(categoria_id, preco);\n\n-- EXPLAIN para diagnosticar\nEXPLAIN SELECT p.nome, SUM(ip.quantidade) AS total_vendido\nFROM produtos p\nINNER JOIN itens_pedido ip ON p.id = ip.produto_id\nINNER JOIN pedidos pe ON ip.pedido_id = pe.id\nWHERE pe.status = \'entregue\'\n  AND pe.data >= \'2024-01-01\'\nGROUP BY p.id, p.nome\nORDER BY total_vendido DESC\nLIMIT 10;',
        filename: 'sql_avancado.sql',
        description: 'CTE recursiva para arvore de categorias, analytics com window functions e CTEs multiplas, cohort analysis de retencao, indices compostos para as queries, e EXPLAIN para diagnostico.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Em CTEs recursivas, sempre tenha uma condicao de parada ou o banco entrara em loop infinito. No MySQL, o limite padrao e de 1000 iteracoes (max_sp_recursion_depth). Use EXPLAIN antes de colocar uma query em producao — se aparecer "Full Table Scan" numa tabela grande, adicione um indice.',
    },
  ],
  challenges: [
    {
      id: 'sql-avancado-c1',
      title: 'Produtos Frequentemente Comprados Juntos',
      description: 'Escreva uma query que encontra pares de produtos frequentemente comprados no mesmo pedido. Para cada par (produto_a, produto_b), calcule quantos pedidos contem ambos. Retorne os 10 pares mais frequentes. Isso e a base de um sistema de recomendacao "quem comprou X tambem comprou Y".',
      language: 'sql',
      starterCode: '-- Tabela: itens_pedido(pedido_id, produto_id, quantidade, preco_unitario)\n-- Tabela: produtos(id, nome, preco)\n\n-- Objetivo: encontrar pares de produtos comprados juntos\n-- Par (A, B) e (B, A) sao o mesmo par — use produto_a < produto_b para evitar duplicatas\n\n-- Dica: faca um self-join em itens_pedido pelo pedido_id\n-- Exemplo: ip1.produto_id = 1, ip2.produto_id = 3 (mesmo pedido)\n\nSELECT\n  p1.nome AS produto_a,\n  p2.nome AS produto_b,\n  COUNT(*) AS vezes_juntos\nFROM itens_pedido ip1\n-- TODO: join com outra instancia de itens_pedido pelo mesmo pedido\n-- TODO: join com produtos para pegar os nomes\n-- TODO: WHERE para evitar par (A,A) e duplicatas (A,B) = (B,A)\nGROUP BY p1.nome, p2.nome\nORDER BY vezes_juntos DESC\nLIMIT 10;\n',
      solution: 'SELECT\n  p1.nome AS produto_a,\n  p2.nome AS produto_b,\n  COUNT(*) AS vezes_juntos\nFROM itens_pedido ip1\nINNER JOIN itens_pedido ip2\n  ON ip1.pedido_id = ip2.pedido_id  -- mesmo pedido\n  AND ip1.produto_id < ip2.produto_id  -- evita (A,A) e (B,A) duplicado\nINNER JOIN produtos p1 ON ip1.produto_id = p1.id\nINNER JOIN produtos p2 ON ip2.produto_id = p2.id\nGROUP BY p1.id, p1.nome, p2.id, p2.nome\nORDER BY vezes_juntos DESC\nLIMIT 10;\n\n-- Para melhorar performance desta query, crie:\nCREATE INDEX idx_itens_produto ON itens_pedido(produto_id, pedido_id);\n\n-- EXPLAIN vai mostrar que o self-join usa o indice\nEXPLAIN SELECT p1.nome, p2.nome, COUNT(*)\nFROM itens_pedido ip1\nINNER JOIN itens_pedido ip2 ON ip1.pedido_id = ip2.pedido_id AND ip1.produto_id < ip2.produto_id\nINNER JOIN produtos p1 ON ip1.produto_id = p1.id\nINNER JOIN produtos p2 ON ip2.produto_id = p2.id\nGROUP BY p1.id, p2.id\nORDER BY COUNT(*) DESC\nLIMIT 10;\n',
      hints: [
        'Self-join: FROM itens_pedido ip1 INNER JOIN itens_pedido ip2 ON ip1.pedido_id = ip2.pedido_id',
        'Para evitar (A,A): adicione AND ip1.produto_id != ip2.produto_id',
        'Para evitar (A,B) e (B,A) ao mesmo tempo: AND ip1.produto_id < ip2.produto_id',
        'Para pegar os nomes: INNER JOIN produtos p1 ON ip1.produto_id = p1.id e outro para ip2',
      ],
    },
  ],
};
