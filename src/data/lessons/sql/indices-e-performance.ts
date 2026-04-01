import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'indices-e-performance',
  moduleId: 'sql',
  title: 'Indices e Performance',
  description:
    'Entenda como indices funcionam internamente (B-tree), como analisar o plano de execucao com EXPLAIN, quando criar (e quando nao criar) indices, e como evitar armadilhas comuns que tornam indices inuteis.',
  order: 9,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        'Imagine procurar uma palavra em um dicionario sem o indice alfabetico — voce leria pagina por pagina. Um indice em banco de dados faz exatamente o mesmo que um indice de livro: permite encontrar dados rapidamente sem varrer a tabela inteira.\n\n## O que e um Indice?\n\nUm **indice** e uma estrutura de dados separada que o banco mantem automaticamente atualizada. Ele armazena os valores de uma ou mais colunas em ordem, com ponteiros para as linhas reais da tabela.\n\nSem indice, uma busca por `WHERE email = "ana@email.com"` precisa verificar **todas as linhas** (Full Table Scan). Com indice, o banco encontra a linha em **O(log n)** — muito mais rapido para tabelas grandes.',
    },
    {
      type: 'text',
      content:
        '## Como Funciona Internamente: B-tree\n\nA maioria dos indices usa uma estrutura chamada **B-tree** (Balanced Tree — arvore balanceada):\n\n- Os dados sao organizados em uma arvore com nos raiz, nos internos e folhas\n- Cada nivel divide o espaco de busca ao meio\n- Para encontrar um valor, o banco navega da raiz ate a folha — apenas **log2(n)** comparacoes\n- O indice e mantido balanceado automaticamente a cada INSERT, UPDATE ou DELETE\n\nPor exemplo, em uma tabela com 1.000.000 de linhas:\n- **Sem indice (Full Scan):** ate 1.000.000 comparacoes\n- **Com indice B-tree:** apenas ~20 comparacoes (log2 de 1M)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'criando_indices.sql',
        description: 'Sintaxe para criar diferentes tipos de indices.',
        code: '-- Indice simples: acelera buscas por uma coluna\nCREATE INDEX idx_clientes_email ON clientes(email);\n\n-- Indice unico: garante valores unicos E acelera buscas\nCREATE UNIQUE INDEX idx_clientes_cpf ON clientes(cpf);\n\n-- Indice composto: acelera buscas que filtram por multiplas colunas\nCREATE INDEX idx_pedidos_cliente_data ON pedidos(cliente_id, data_pedido);\n\n-- Remover um indice\nDROP INDEX idx_clientes_email;\n\n-- Ver indices existentes (SQLite)\nSELECT name, tbl_name, sql FROM sqlite_master\nWHERE type = "index"\nORDER BY tbl_name;',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'PRIMARY KEY e UNIQUE ja criam indices automaticamente! Voce nao precisa criar um indice separado para colunas declaradas como PRIMARY KEY ou UNIQUE — o banco faz isso sozinho.',
    },
    {
      type: 'text',
      content:
        '## EXPLAIN: Entendendo o Plano de Execucao\n\nAntes de criar indices, use **EXPLAIN** para ver como o banco executa uma query. Isso revela se ele esta fazendo um Full Scan desnecessario ou usando um indice existente.\n\nNo SQLite, use `EXPLAIN QUERY PLAN`. No PostgreSQL, use `EXPLAIN ANALYZE` para ver o tempo real de execucao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'explain_plano.sql',
        description: 'Usando EXPLAIN para analisar o plano de execucao de queries.',
        code: '-- SQLite: ver plano de execucao\nEXPLAIN QUERY PLAN\nSELECT * FROM pedidos WHERE cliente_id = 42;\n-- Resultado sem indice:\n-- SCAN TABLE pedidos   <- ruim! le a tabela inteira\n\n-- Criar o indice\nCREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);\n\n-- Verificar novamente\nEXPLAIN QUERY PLAN\nSELECT * FROM pedidos WHERE cliente_id = 42;\n-- Resultado com indice:\n-- SEARCH TABLE pedidos USING INDEX idx_pedidos_cliente  <- muito melhor!\n\n-- PostgreSQL: EXPLAIN ANALYZE mostra tempo real\n-- EXPLAIN ANALYZE\n-- SELECT * FROM pedidos WHERE cliente_id = 42;\n-- Seq Scan on pedidos (cost=0.00..1540.00 rows=3 width=64)\n--               ^^ com indice: Index Scan on idx_pedidos_cliente',
      },
    },
    {
      type: 'text',
      content:
        '## Tipos de Indices\n\n### Indice Simples\nUm indice em uma unica coluna. Ideal para colunas usadas frequentemente em `WHERE`, `JOIN ON` ou `ORDER BY`.\n\n### Indice Composto\nUm indice em duas ou mais colunas. Util quando voce filtra por multiplas colunas juntas. **A ordem das colunas importa!** O indice `(cidade, bairro)` acelera buscas por `cidade` ou `cidade + bairro`, mas NAO acelera buscas apenas por `bairro`.\n\n### Indice Unico\nAlem de acelerar buscas, garante que nao existam duplicatas. Use para colunas como `email`, `cpf`, `codigo_produto`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'indices_compostos.sql',
        description: 'Indice composto e a regra do prefixo mais a esquerda.',
        code: '-- Criando indice composto\nCREATE INDEX idx_vendas_regiao_data ON vendas(regiao, data_venda);\n\n-- USA o indice (filtra pela primeira coluna)\nSELECT * FROM vendas WHERE regiao = "Sul";\n\n-- USA o indice (filtra pelas duas colunas)\nSELECT * FROM vendas WHERE regiao = "Sul" AND data_venda = "2024-01-15";\n\n-- NAO usa o indice eficientemente (pula a primeira coluna)\nSELECT * FROM vendas WHERE data_venda = "2024-01-15";\n-- Para este caso, crie um indice separado em data_venda!\n\n-- Caso real: busca de pedidos por cliente em periodo\nCREATE INDEX idx_pedidos_compostos ON pedidos(cliente_id, status, data_pedido);\n\nSELECT * FROM pedidos\nWHERE cliente_id = 100\n  AND status = "PENDENTE"\n  AND data_pedido >= "2024-01-01";',
      },
    },
    {
      type: 'text',
      content:
        '## Quando Criar e Quando NAO Criar Indices\n\n### CRIE indices para:\n- Colunas usadas em `WHERE` com alta seletividade (muitos valores distintos)\n- Colunas usadas em `JOIN ON`\n- Colunas usadas em `ORDER BY` em queries frequentes\n- Colunas de chave estrangeira\n\n### NAO crie indices para:\n- Tabelas muito pequenas (menos de ~1000 linhas) — o Full Scan e mais rapido\n- Colunas com baixa seletividade (ex: coluna `genero` com so "M" e "F" — o banco ignora o indice)\n- Tabelas que sofrem muitos INSERTs/UPDATEs/DELETEs por segundo — indices tem custo de manutencao\n- Colunas raramente usadas em filtros ou joins',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Indices tem custo! Cada INSERT, UPDATE ou DELETE precisa atualizar todos os indices da tabela. Uma tabela com 10 indices pode ter insercoes 10x mais lentas. Crie apenas os indices que voce realmente precisa.',
    },
    {
      type: 'text',
      content:
        '## Armadilhas: Indices que Nao Sao Usados\n\nMesmo com um indice criado, o banco pode ignorar em certas situacoes. Conhecer essas armadilhas evita muita frustracao:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'armadilhas_indices.sql',
        description: 'Situacoes comuns que impedem o uso de indices.',
        code: '-- ARMADILHA 1: Funcao na coluna indexada\nCREATE INDEX idx_usuarios_nome ON usuarios(nome);\n\n-- NAO usa o indice (funcao aplicada na coluna):\nSELECT * FROM usuarios WHERE UPPER(nome) = "ANA";\n-- USA o indice:\nSELECT * FROM usuarios WHERE nome = "Ana";\n\n-- ARMADILHA 2: Operacao aritmetica na coluna\n-- NAO usa o indice:\nSELECT * FROM produtos WHERE preco * 1.1 > 100;\n-- USA o indice:\nSELECT * FROM produtos WHERE preco > 100 / 1.1;\n\n-- ARMADILHA 3: LIKE com wildcard no inicio\n-- NAO usa o indice (busca qualquer posicao):\nSELECT * FROM clientes WHERE nome LIKE "%Silva";\n-- USA o indice (prefixo fixo):\nSELECT * FROM clientes WHERE nome LIKE "Silva%";\n\n-- ARMADILHA 4: OR com colunas diferentes\n-- Pode nao usar indices eficientemente:\nSELECT * FROM pedidos WHERE cliente_id = 1 OR status = "CANCELADO";\n-- Melhor: usar UNION\nSELECT * FROM pedidos WHERE cliente_id = 1\nUNION\nSELECT * FROM pedidos WHERE status = "CANCELADO";\n\n-- ARMADILHA 5: Comparacao com tipo errado\n-- Se id e INTEGER mas voce compara com string:\nSELECT * FROM usuarios WHERE id = "42"; -- pode ignorar indice\nSELECT * FROM usuarios WHERE id = 42;  -- usa o indice',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra de ouro: sempre use EXPLAIN QUERY PLAN antes e depois de criar um indice para confirmar que ele esta sendo usado. Nao assuma — verifique!',
    },
  ],
  challenges: [
    {
      id: 'sql9-c1',
      title: 'Diagnosticando Queries Lentas',
      description: 'Crie uma tabela "pedidos" com 1000 registros simulados. Use EXPLAIN QUERY PLAN para diagnosticar uma query lenta. Crie o(s) indice(s) correto(s) e verifique com EXPLAIN novamente que o plano mudou. A query alvo: buscar pedidos com status "PENDENTE" de um cliente especifico, ordenados por data.',
      language: 'sql',
      starterCode: 'import sqlite3\nimport random\nfrom datetime import date, timedelta\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE pedidos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        cliente_id INTEGER NOT NULL,\n        status TEXT NOT NULL,\n        data_pedido TEXT NOT NULL,\n        valor REAL NOT NULL\n    )\n""")\n\nstatus_opcoes = ["PENDENTE", "APROVADO", "CANCELADO", "ENTREGUE"]\ndata_base = date(2023, 1, 1)\npedidos = [\n    (random.randint(1, 100), random.choice(status_opcoes),\n     str(data_base + timedelta(days=random.randint(0, 365))),\n     round(random.uniform(10, 5000), 2))\n    for _ in range(1000)\n]\ncursor.executemany(\n    "INSERT INTO pedidos (cliente_id, status, data_pedido, valor) VALUES (?, ?, ?, ?)",\n    pedidos\n)\nconexao.commit()\n\nquery = """\n    SELECT id, cliente_id, status, data_pedido, valor\n    FROM pedidos\n    WHERE cliente_id = 42 AND status = \'PENDENTE\'\n    ORDER BY data_pedido ASC\n"""\n\n# 1. Use EXPLAIN QUERY PLAN para ver o plano ANTES do indice\nprint("=== Plano SEM indice ===")\n# cursor.execute("EXPLAIN QUERY PLAN " + query)\n# for row in cursor.fetchall(): print(" ", row)\n\n# 2. Crie o indice correto\n# cursor.execute("CREATE INDEX ... ON pedidos(...)")\n\n# 3. Verifique o plano COM o indice\nprint("\\n=== Plano COM indice ===")\n# cursor.execute("EXPLAIN QUERY PLAN " + query)\n# for row in cursor.fetchall(): print(" ", row)\n\n# 4. Execute a query\nprint("\\n=== Resultados ===")\ncursor.execute(query)\nfor r in cursor.fetchall():\n    print("  Pedido", r[0], "| Cliente", r[1], "| R$", round(r[4], 2))\n\nconexao.close()\n',
      solution: 'import sqlite3\nimport random\nfrom datetime import date, timedelta\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE pedidos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        cliente_id INTEGER NOT NULL,\n        status TEXT NOT NULL,\n        data_pedido TEXT NOT NULL,\n        valor REAL NOT NULL\n    )\n""")\n\nstatus_opcoes = ["PENDENTE", "APROVADO", "CANCELADO", "ENTREGUE"]\ndata_base = date(2023, 1, 1)\npedidos = [\n    (random.randint(1, 100), random.choice(status_opcoes),\n     str(data_base + timedelta(days=random.randint(0, 365))),\n     round(random.uniform(10, 5000), 2))\n    for _ in range(1000)\n]\ncursor.executemany(\n    "INSERT INTO pedidos (cliente_id, status, data_pedido, valor) VALUES (?, ?, ?, ?)",\n    pedidos\n)\nconexao.commit()\n\nquery = """\n    SELECT id, cliente_id, status, data_pedido, valor\n    FROM pedidos\n    WHERE cliente_id = 42 AND status = \'PENDENTE\'\n    ORDER BY data_pedido ASC\n"""\n\nprint("=== Plano SEM indice ===")\ncursor.execute("EXPLAIN QUERY PLAN " + query)\nfor row in cursor.fetchall():\n    print(" ", row)\n\ncursor.execute("CREATE INDEX idx_pedidos_cs_data ON pedidos(cliente_id, status, data_pedido)")\n\nprint("\\n=== Plano COM indice ===")\ncursor.execute("EXPLAIN QUERY PLAN " + query)\nfor row in cursor.fetchall():\n    print(" ", row)\n\nprint("\\n=== Resultados ===")\ncursor.execute(query)\nfor r in cursor.fetchall():\n    print("  Pedido", r[0], "| Cliente", r[1], "| R$", round(r[4], 2))\n\nconexao.close()\n',
      hints: [
        'Use cursor.execute("EXPLAIN QUERY PLAN " + query) e imprima cursor.fetchall()',
        'Um indice composto (cliente_id, status, data_pedido) cobre o filtro E o ORDER BY',
        'SCAN TABLE significa Full Scan; SEARCH TABLE USING INDEX significa que o indice foi usado',
        'A ordem das colunas no indice deve seguir a ordem dos filtros na query',
      ],
    },
    {
      id: 'sql9-c2',
      title: 'Indice Unico e Validacao',
      description: 'Crie uma tabela "usuarios" com id, nome, email e cpf. Crie indices unicos para email e cpf. Tente inserir dois usuarios com o mesmo email e capture o erro. Liste todos os indices criados na tabela.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela usuarios (id, nome, email, cpf)\n\n# Crie indice unico para email\n\n# Crie indice unico para cpf\n\n# Insira um usuario valido\n\n# Tente inserir um usuario com email duplicado e capture o erro\n# (use try/except sqlite3.IntegrityError)\n\nprint("=== Indices da tabela usuarios ===")\n# cursor.execute("SELECT name, sql FROM sqlite_master WHERE type=\'index\' AND tbl_name=\'usuarios\'")\n# for idx in cursor.fetchall(): print(idx)\n\nconexao.close()\n',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE usuarios (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        email TEXT NOT NULL,\n        cpf TEXT NOT NULL\n    )\n""")\n\ncursor.execute("CREATE UNIQUE INDEX idx_usuarios_email ON usuarios(email)")\ncursor.execute("CREATE UNIQUE INDEX idx_usuarios_cpf ON usuarios(cpf)")\n\ncursor.execute("INSERT INTO usuarios (nome, email, cpf) VALUES (?, ?, ?)",\n    ("Ana Silva", "ana@email.com", "111.222.333-44"))\nconexao.commit()\nprint("Usuario Ana inserido com sucesso.")\n\ntry:\n    cursor.execute("INSERT INTO usuarios (nome, email, cpf) VALUES (?, ?, ?)",\n        ("Ana Dup", "ana@email.com", "999.888.777-66"))\n    conexao.commit()\nexcept sqlite3.IntegrityError as e:\n    print("Erro email duplicado:", e)\n\ntry:\n    cursor.execute("INSERT INTO usuarios (nome, email, cpf) VALUES (?, ?, ?)",\n        ("Outro", "outro@email.com", "111.222.333-44"))\n    conexao.commit()\nexcept sqlite3.IntegrityError as e:\n    print("Erro CPF duplicado:", e)\n\nprint("\\n=== Indices da tabela usuarios ===")\ncursor.execute("SELECT name, sql FROM sqlite_master WHERE type=\'index\' AND tbl_name=\'usuarios\' ORDER BY name")\nfor idx in cursor.fetchall():\n    print(" Nome:", idx[0])\n    print(" SQL: ", idx[1])\n    print()\n\nconexao.close()\n',
      hints: [
        'Use CREATE UNIQUE INDEX idx_nome ON tabela(coluna)',
        'Envolva o INSERT em try/except sqlite3.IntegrityError para capturar a violacao',
        'Consulte sqlite_master WHERE type = "index" AND tbl_name = "usuarios" para listar indices',
      ],
    },
  ],
};
