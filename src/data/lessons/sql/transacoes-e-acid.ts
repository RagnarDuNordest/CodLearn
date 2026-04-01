import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'transacoes-e-acid',
  moduleId: 'sql',
  title: 'Transacoes e ACID',
  description:
    'Entenda o que sao transacoes, as propriedades ACID que garantem a integridade dos dados, como usar BEGIN/COMMIT/ROLLBACK, os niveis de isolamento e como evitar deadlocks.',
  order: 10,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        'Imagine transferir R$1000 da sua conta para outra: o banco debita de voce e credita no destinatario. Se a luz cair entre as duas operacoes, o dinheiro some? **Nao** — porque bancos de dados usam **transacoes** para garantir que as duas operacoes acontecam juntas ou nenhuma acontece.\n\n## O que e uma Transacao?\n\nUma **transacao** e um grupo de operacoes SQL que sao tratadas como uma unidade atomica: ou **todas** sao executadas com sucesso, ou **nenhuma** e aplicada ao banco de dados.\n\nSem transacoes, uma falha no meio de uma operacao composta (como uma transferencia bancaria) poderia deixar o banco de dados em estado inconsistente.',
    },
    {
      type: 'text',
      content:
        '## ACID: As 4 Propriedades Fundamentais\n\n**A — Atomicidade:** A transacao e um atomo — ou executa tudo ou nao executa nada. Se qualquer operacao falhar, todas as mudancas sao desfeitas (rollback).\n\n**C — Consistencia:** A transacao leva o banco de um estado valido para outro estado valido. Restricoes (NOT NULL, FOREIGN KEY, CHECK) sao sempre respeitadas.\n\n**I — Isolamento:** Transacoes concorrentes nao interferem entre si. O resultado deve ser o mesmo que se fossem executadas em serie, uma por vez.\n\n**D — Durabilidade:** Uma vez que a transacao foi confirmada (COMMIT), os dados persistem mesmo em caso de falha de hardware, queda de energia ou crash do servidor.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'begin_commit_rollback.sql',
        description: 'Usando BEGIN, COMMIT e ROLLBACK para controlar transacoes.',
        code: '-- Inicio de uma transacao explicita\nBEGIN;\n    UPDATE contas SET saldo = saldo - 1000 WHERE id = 1; -- debita\n    UPDATE contas SET saldo = saldo + 1000 WHERE id = 2; -- credita\nCOMMIT; -- confirma ambas as operacoes\n\n-- Rollback: desfaz tudo em caso de erro\nBEGIN;\n    UPDATE estoque SET quantidade = quantidade - 5 WHERE produto_id = 10;\n    INSERT INTO pedidos (produto_id, quantidade) VALUES (10, 5);\n    -- Se algo der errado...\nROLLBACK; -- desfaz as duas operacoes\n\n-- Sem BEGIN explicito: cada statement e sua propria transacao\nUPDATE contas SET saldo = saldo - 1000 WHERE id = 1;\n-- Se cair aqui, o dinheiro sumiu! Sem transacao, sem protecao.\nUPDATE contas SET saldo = saldo + 1000 WHERE id = 2;',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'No Python com sqlite3, a biblioteca gerencia transacoes automaticamente mas de forma confusa. Use `conexao.isolation_level = None` para modo autocommit, ou chame explicitamente `conexao.commit()` e `conexao.rollback()`. Em producao, prefira sempre transacoes explicitas.',
    },
    {
      type: 'text',
      content:
        '## Niveis de Isolamento\n\nQuando multiplas transacoes rodam ao mesmo tempo, podem ocorrer fenomenos indesejaveis. Os **niveis de isolamento** controlam o equilibrio entre performance e consistencia:\n\n### Fenomenos que podem ocorrer:\n- **Dirty Read:** Ler dados de uma transacao que ainda nao foi commitada (e pode ser desfeita)\n- **Non-Repeatable Read:** Ler o mesmo dado duas vezes e obter resultados diferentes (outra transacao modificou entre as leituras)\n- **Phantom Read:** Uma segunda leitura retorna linhas que nao existiam na primeira (outra transacao inseriu dados)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'niveis_isolamento.sql',
        description: 'Os 4 niveis de isolamento e o que cada um previne.',
        code: '-- READ UNCOMMITTED (mais permissivo, menos seguro)\n-- Permite: Dirty Read, Non-Repeatable Read, Phantom Read\n-- Uso: relatorios onde pequenas inconsistencias sao aceitaveis\nSET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\n\n-- READ COMMITTED (padrao no PostgreSQL)\n-- Previne: Dirty Read\n-- Permite: Non-Repeatable Read, Phantom Read\n-- Uso: maioria das aplicacoes OLTP\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n\n-- REPEATABLE READ (padrao no MySQL/InnoDB)\n-- Previne: Dirty Read, Non-Repeatable Read\n-- Permite: Phantom Read\n-- Uso: relatorios que precisam de consistencia ao longo da transacao\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\n-- SERIALIZABLE (mais restritivo, mais seguro)\n-- Previne: Dirty Read, Non-Repeatable Read, Phantom Read\n-- Uso: transacoes financeiras criticas\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n\n-- Nota: SQLite usa SERIALIZABLE por padrao para writes\n-- e DEFERRED para reads (comportamento unico)',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'No SQLite, o isolamento funciona de forma diferente: apenas UMA transacao de escrita pode ocorrer por vez (lock exclusivo). Isso simplifica o modelo mas limita a concorrencia. Para sistemas com alta concorrencia, PostgreSQL ou MySQL sao mais adequados.',
    },
    {
      type: 'text',
      content:
        '## Savepoints: Rollback Parcial\n\nAlgumas vezes voce quer desfazer apenas parte de uma transacao. **SAVEPOINTS** permitem criar pontos de restauracao dentro de uma transacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'savepoints.sql',
        description: 'Usando SAVEPOINT para rollback parcial dentro de uma transacao.',
        code: 'BEGIN;\n\nINSERT INTO pedidos (cliente_id, total) VALUES (1, 500);\n\nSAVEPOINT antes_itens; -- ponto de restauracao\n\nINSERT INTO itens_pedido (pedido_id, produto_id, qtd) VALUES (1, 10, 2);\nINSERT INTO itens_pedido (pedido_id, produto_id, qtd) VALUES (1, 20, 1);\n\n-- Ops, produto 20 esta fora de estoque...\nROLLBACK TO antes_itens; -- desfaz apenas os itens, mantem o pedido\n\n-- Inserir apenas o item que tem estoque\nINSERT INTO itens_pedido (pedido_id, produto_id, qtd) VALUES (1, 10, 2);\n\nCOMMIT; -- confirma pedido + item valido',
      },
    },
    {
      type: 'text',
      content:
        '## Deadlocks: Quando Transacoes se Bloqueiam Mutuamente\n\nUm **deadlock** ocorre quando duas transacoes ficam esperando uma pela outra, formando um ciclo de espera:\n\n- Transacao A bloqueia a linha 1 e espera a linha 2\n- Transacao B bloqueia a linha 2 e espera a linha 1\n- Nenhuma pode continuar!\n\nO banco de dados detecta deadlocks automaticamente e cancela uma das transacoes (a "vitima"). A aplicacao precisa tratar esse erro e tentar novamente.\n\n**Como evitar deadlocks:**\n- Sempre acesse recursos na mesma ordem em todas as transacoes\n- Mantenha transacoes curtas\n- Use `SELECT ... FOR UPDATE` para bloquear linhas que voce vai modificar',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'evitando_deadlocks.sql',
        description: 'Padroes para evitar deadlocks em transacoes concorrentes.',
        code: '-- PROBLEMA: ordem diferente cria risco de deadlock\n-- Transacao A:\nBEGIN;\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1; -- bloqueia conta 1\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2; -- espera conta 2\nCOMMIT;\n\n-- Transacao B (simultanea):\nBEGIN;\nUPDATE contas SET saldo = saldo - 50 WHERE id = 2;  -- bloqueia conta 2\nUPDATE contas SET saldo = saldo + 50 WHERE id = 1;  -- espera conta 1\nCOMMIT;\n-- DEADLOCK! A espera B que espera A\n\n-- SOLUCAO: sempre acessar contas em ordem crescente de id\n-- Transacao A:\nBEGIN;\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1; -- menor id primeiro\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT;\n\n-- Transacao B:\nBEGIN;\nUPDATE contas SET saldo = saldo + 50 WHERE id = 1;  -- menor id primeiro\nUPDATE contas SET saldo = saldo - 50 WHERE id = 2;\nCOMMIT;\n-- Sem deadlock: ambas acessam na mesma ordem',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Mantenha transacoes o mais curtas possivel! Quanto mais tempo uma transacao fica aberta, mais ela bloqueia outros usuarios. Evite fazer chamadas de rede, operacoes de I/O ou calculos demorados dentro de uma transacao.',
    },
  ],
  challenges: [
    {
      id: 'sql10-c1',
      title: 'Transferencia Bancaria com Transacao',
      description:
        'Implemente uma funcao de transferencia bancaria usando transacoes. A funcao deve: verificar se o saldo e suficiente, debitar da conta de origem, creditar na conta de destino, registrar na tabela "historico_transferencias". Se o saldo for insuficiente ou qualquer erro ocorrer, a transacao deve ser desfeita com ROLLBACK.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\nconexao.isolation_level = None\ncursor = conexao.cursor()\n\ncursor.executescript("""\n    CREATE TABLE contas (\n        id INTEGER PRIMARY KEY,\n        titular TEXT NOT NULL,\n        saldo REAL NOT NULL CHECK (saldo >= 0)\n    );\n    CREATE TABLE historico_transferencias (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        conta_origem INTEGER NOT NULL,\n        conta_destino INTEGER NOT NULL,\n        valor REAL NOT NULL\n    );\n    INSERT INTO contas VALUES (1, \'Alice\', 1500.00);\n    INSERT INTO contas VALUES (2, \'Bruno\', 300.00);\n    INSERT INTO contas VALUES (3, \'Carla\', 800.00);\n""")\n\ndef transferir(cursor, origem_id, destino_id, valor):\n    # 1. BEGIN\n    # 2. Verifique saldo da conta de origem\n    # 3. Se insuficiente: ROLLBACK e retorne False\n    # 4. Debite da origem\n    # 5. Credite no destino\n    # 6. Registre em historico_transferencias\n    # 7. COMMIT e retorne True\n    pass\n\nprint("=== Teste 1: Alice -> Bruno 500 ===")\n# sucesso = transferir(cursor, 1, 2, 500)\n# print("Resultado:", "Sucesso" if sucesso else "Falhou")\n\nprint("\\n=== Teste 2: Bruno -> Carla 1000 (saldo insuficiente) ===")\n# sucesso = transferir(cursor, 2, 3, 1000)\n# print("Resultado:", "Sucesso" if sucesso else "Falhou")\n\nprint("\\n=== Saldos Finais ===")\ncursor.execute("SELECT id, titular, saldo FROM contas ORDER BY id")\nfor c in cursor.fetchall():\n    print("  Conta", c[0], "-", c[1], ":", round(c[2], 2))\n\nconexao.close()\n',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\nconexao.isolation_level = None\ncursor = conexao.cursor()\n\ncursor.executescript("""\n    CREATE TABLE contas (\n        id INTEGER PRIMARY KEY,\n        titular TEXT NOT NULL,\n        saldo REAL NOT NULL CHECK (saldo >= 0)\n    );\n    CREATE TABLE historico_transferencias (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        conta_origem INTEGER NOT NULL,\n        conta_destino INTEGER NOT NULL,\n        valor REAL NOT NULL\n    );\n    INSERT INTO contas VALUES (1, \'Alice\', 1500.00);\n    INSERT INTO contas VALUES (2, \'Bruno\', 300.00);\n    INSERT INTO contas VALUES (3, \'Carla\', 800.00);\n""")\n\ndef transferir(cursor, origem_id, destino_id, valor):\n    try:\n        cursor.execute("BEGIN")\n        cursor.execute("SELECT saldo FROM contas WHERE id = ?", (origem_id,))\n        row = cursor.fetchone()\n        if row is None:\n            print("  Conta", origem_id, "nao encontrada.")\n            cursor.execute("ROLLBACK")\n            return False\n        saldo_origem = row[0]\n        if saldo_origem < valor:\n            print("  Saldo insuficiente:", saldo_origem, "disponivel,", valor, "solicitado")\n            cursor.execute("ROLLBACK")\n            return False\n        cursor.execute("UPDATE contas SET saldo = saldo - ? WHERE id = ?", (valor, origem_id))\n        cursor.execute("UPDATE contas SET saldo = saldo + ? WHERE id = ?", (valor, destino_id))\n        cursor.execute("INSERT INTO historico_transferencias (conta_origem, conta_destino, valor) VALUES (?, ?, ?)", (origem_id, destino_id, valor))\n        cursor.execute("COMMIT")\n        return True\n    except sqlite3.Error as e:\n        cursor.execute("ROLLBACK")\n        print("  Erro na transacao:", e)\n        return False\n\nprint("=== Teste 1: Alice -> Bruno 500 ===")\nprint("Resultado:", "Sucesso" if transferir(cursor, 1, 2, 500) else "Falhou")\nprint("\\n=== Teste 2: Bruno -> Carla 1000 (insuficiente) ===")\nprint("Resultado:", "Sucesso" if transferir(cursor, 2, 3, 1000) else "Falhou")\nprint("\\n=== Teste 3: Alice -> Carla 200 ===")\nprint("Resultado:", "Sucesso" if transferir(cursor, 1, 3, 200) else "Falhou")\n\nprint("\\n=== Saldos Finais ===")\ncursor.execute("SELECT id, titular, saldo FROM contas ORDER BY id")\nfor c in cursor.fetchall():\n    print("  Conta", c[0], "-", c[1], ":", round(c[2], 2))\n\nprint("\\n=== Historico ===")\ncursor.execute("SELECT h.id, c1.titular, c2.titular, h.valor FROM historico_transferencias h JOIN contas c1 ON h.conta_origem=c1.id JOIN contas c2 ON h.conta_destino=c2.id")\nfor h in cursor.fetchall():\n    print(" ", h[0], "|", h[1], "->", h[2], "|", round(h[3], 2))\n\nconexao.close()\n',
      hints: [
        'Use cursor.execute("BEGIN") para iniciar a transacao manualmente quando isolation_level=None',
        'Verifique o saldo ANTES de fazer UPDATE — se insuficiente, chame ROLLBACK e retorne False',
        'Envolva tudo em try/except sqlite3.Error para capturar erros inesperados',
        'A restricao CHECK (saldo >= 0) na tabela e uma segunda linha de defesa contra saldo negativo',
      ],
    },
    {
      id: 'sql10-c2',
      title: 'Atomicidade em Pedidos de E-commerce',
      description: 'Implemente a funcao "criar_pedido" que: insere o pedido, desconta o estoque de cada produto, e registra os itens do pedido. Se qualquer produto estiver sem estoque, cancela TODA a operacao.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\nconexao.isolation_level = None\ncursor = conexao.cursor()\n\ncursor.executescript("""\n    CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL, estoque INTEGER CHECK(estoque>=0));\n    CREATE TABLE pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT, total REAL);\n    CREATE TABLE itens_pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, pedido_id INTEGER, produto_id INTEGER, quantidade INTEGER, preco_unitario REAL);\n    INSERT INTO produtos VALUES (1, \'Teclado\', 150.00, 5);\n    INSERT INTO produtos VALUES (2, \'Mouse\', 80.00, 3);\n    INSERT INTO produtos VALUES (3, \'Monitor\', 900.00, 1);\n""")\n\ndef criar_pedido(cursor, cliente, itens):\n    # itens = lista de (produto_id, quantidade)\n    # TODO: BEGIN, checar estoque, inserir pedido, inserir itens, descontar estoque, COMMIT\n    # Se qualquer produto sem estoque: ROLLBACK e retorne False\n    pass\n\nprint("=== Pedido 1: Teclado x2 + Mouse x1 ===")\n# criar_pedido(cursor, "Cliente A", [(1, 2), (2, 1)])\n\nprint("\\n=== Pedido 2: Monitor x2 (sem estoque) ===")\n# criar_pedido(cursor, "Cliente B", [(3, 2)])\n\ncursor.execute("SELECT nome, estoque FROM produtos")\nfor p in cursor.fetchall():\n    print("  Estoque", p[0], ":", p[1])\n\nconexao.close()\n',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\nconexao.isolation_level = None\ncursor = conexao.cursor()\n\ncursor.executescript("""\n    CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, preco REAL, estoque INTEGER CHECK(estoque>=0));\n    CREATE TABLE pedidos (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT, total REAL);\n    CREATE TABLE itens_pedido (id INTEGER PRIMARY KEY AUTOINCREMENT, pedido_id INTEGER, produto_id INTEGER, quantidade INTEGER, preco_unitario REAL);\n    INSERT INTO produtos VALUES (1, \'Teclado\', 150.00, 5);\n    INSERT INTO produtos VALUES (2, \'Mouse\', 80.00, 3);\n    INSERT INTO produtos VALUES (3, \'Monitor\', 900.00, 1);\n""")\n\ndef criar_pedido(cursor, cliente, itens):\n    try:\n        cursor.execute("BEGIN")\n        total = 0.0\n        itens_det = []\n        for produto_id, qtd in itens:\n            cursor.execute("SELECT nome, preco, estoque FROM produtos WHERE id = ?", (produto_id,))\n            row = cursor.fetchone()\n            if not row:\n                print("  Produto", produto_id, "nao encontrado!")\n                cursor.execute("ROLLBACK")\n                return False\n            nome, preco, estoque = row\n            if estoque < qtd:\n                print("  Estoque insuficiente para", nome, ": tem", estoque, "pediu", qtd)\n                cursor.execute("ROLLBACK")\n                return False\n            total += preco * qtd\n            itens_det.append((produto_id, qtd, preco))\n        cursor.execute("INSERT INTO pedidos (cliente, total) VALUES (?, ?)", (cliente, total))\n        pedido_id = cursor.lastrowid\n        for produto_id, qtd, preco in itens_det:\n            cursor.execute("UPDATE produtos SET estoque = estoque - ? WHERE id = ?", (qtd, produto_id))\n            cursor.execute("INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)", (pedido_id, produto_id, qtd, preco))\n        cursor.execute("COMMIT")\n        print("  Pedido", pedido_id, "criado para", cliente, ". Total:", round(total, 2))\n        return True\n    except sqlite3.Error as e:\n        cursor.execute("ROLLBACK")\n        print("  Erro:", e)\n        return False\n\nprint("=== Pedido 1: Teclado x2 + Mouse x1 ===")\ncriado = criar_pedido(cursor, "Cliente A", [(1, 2), (2, 1)])\nprint("Resultado:", "Sucesso" if criado else "Falhou")\n\nprint("\\n=== Pedido 2: Monitor x2 (sem estoque) ===")\ncriado = criar_pedido(cursor, "Cliente B", [(3, 2)])\nprint("Resultado:", "Sucesso" if criado else "Falhou")\n\nprint("\\n=== Estoque Final ===")\ncursor.execute("SELECT nome, estoque FROM produtos ORDER BY id")\nfor p in cursor.fetchall():\n    print("  ", p[0], ":", p[1], "em estoque")\n\nconexao.close()\n',
      hints: [
        'Verifique o estoque de TODOS os itens antes de fazer qualquer UPDATE',
        'Se um item falhar, chame ROLLBACK imediatamente',
        'Use cursor.lastrowid para obter o id do pedido recem-inserido',
        'Calcule o total somando preco * quantidade de cada item',
      ],
    },
  ],
};
