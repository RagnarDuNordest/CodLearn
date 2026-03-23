import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'atualizando-e-deletando',
  moduleId: 'sql',
  title: 'Atualizando e Deletando',
  description:
    'Aprenda a modificar dados com UPDATE, remover com DELETE, alterar tabelas com ALTER TABLE e garantir seguranca com transacoes (BEGIN, COMMIT, ROLLBACK).',
  order: 6,
  estimatedMinutes: 22,
  sections: [
    {
      type: 'text',
      content:
        'UPDATE e como usar borracha e lapis para corrigir uma informacao. DELETE e como arrancar a pagina do caderno. Cuidado: essas operacoes sao poderosas!\n\n## UPDATE -- Atualizando Dados\n\nO comando **UPDATE** modifica registros existentes em uma tabela. A sintaxe basica e:\n\n```\nUPDATE tabela\nSET coluna1 = novo_valor, coluna2 = novo_valor\nWHERE condicao;\n```\n\nVoce pode atualizar uma ou mais colunas ao mesmo tempo. O **WHERE** define quais registros serao afetados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Atualizar um campo de um registro especifico\nUPDATE funcionarios\nSET salario = 6500.00\nWHERE id = 1;\n\n-- Atualizar multiplos campos\nUPDATE funcionarios\nSET salario = 5000.00, cargo = "Desenvolvedor Senior"\nWHERE nome = "Ana Silva";\n\n-- Atualizar com calculo (aumento de 10%)\nUPDATE funcionarios\nSET salario = salario * 1.10\nWHERE departamento = "TI";\n\n-- Atualizar varios registros de uma vez\nUPDATE produtos\nSET disponivel = 0\nWHERE estoque = 0;',
        filename: 'update.sql',
        description: 'Diferentes formas de atualizar dados com UPDATE.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '**CUIDADO!** Um UPDATE sem WHERE atualiza **TODOS** os registros da tabela! Exemplo perigoso: `UPDATE funcionarios SET salario = 0;` -- isso zeraria o salario de TODOS. Sempre use WHERE para especificar quais registros alterar.',
    },
    {
      type: 'text',
      content:
        '## DELETE -- Removendo Dados\n\nO comando **DELETE** remove registros de uma tabela. Assim como o UPDATE, **sempre use WHERE** para especificar quais registros devem ser removidos.\n\n```\nDELETE FROM tabela\nWHERE condicao;\n```\n\nA mesma regra se aplica: um DELETE sem WHERE remove **TODOS** os registros!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Deletar um registro especifico\nDELETE FROM funcionarios\nWHERE id = 5;\n\n-- Deletar por condicao\nDELETE FROM produtos\nWHERE estoque = 0 AND disponivel = 0;\n\n-- Deletar registros antigos\nDELETE FROM logs\nWHERE data < "2024-01-01";\n\n-- PERIGO! Isso apaga TUDO da tabela:\n-- DELETE FROM funcionarios;\n-- Use com extremo cuidado!',
        filename: 'delete.sql',
        description: 'Removendo dados com DELETE e a importancia do WHERE.',
      },
    },
    {
      type: 'text',
      content:
        '## ALTER TABLE -- Modificando a Estrutura\n\nApos criar uma tabela, voce pode precisar modificar sua estrutura. O **ALTER TABLE** permite:\n\n- **Adicionar coluna**: `ALTER TABLE tabela ADD COLUMN coluna TIPO;`\n- **Renomear tabela**: `ALTER TABLE tabela RENAME TO novo_nome;`\n- **Renomear coluna**: `ALTER TABLE tabela RENAME COLUMN antiga TO nova;`\n\nO SQLite tem limitacoes no ALTER TABLE -- nao permite remover colunas diretamente (em versoes mais antigas) nem modificar o tipo de uma coluna.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Adicionar uma nova coluna\nALTER TABLE funcionarios\nADD COLUMN email TEXT;\n\n-- Renomear uma tabela\nALTER TABLE clientes\nRENAME TO consumidores;\n\n-- Renomear uma coluna (SQLite 3.25+)\nALTER TABLE funcionarios\nRENAME COLUMN nome TO nome_completo;\n\n-- Remover coluna (SQLite 3.35+)\nALTER TABLE funcionarios\nDROP COLUMN telefone;',
        filename: 'alter_table.sql',
        description: 'Modificando a estrutura da tabela com ALTER TABLE.',
      },
    },
    {
      type: 'text',
      content:
        '## Transacoes -- Seguranca nas Operacoes\n\nUma **transacao** agrupa varias operacoes SQL em uma unidade atomica. Ou **todas** as operacoes sao aplicadas, ou **nenhuma** e aplicada. Isso garante a consistencia dos dados.\n\n- **BEGIN** -- Inicia uma transacao\n- **COMMIT** -- Confirma todas as operacoes (salva definitivamente)\n- **ROLLBACK** -- Cancela todas as operacoes (desfaz tudo)\n\nTransacoes sao essenciais em operacoes criticas, como transferencias bancarias: o debito e o credito devem acontecer juntos ou nenhum dos dois.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Exemplo: transferencia bancaria segura\nBEGIN;\n\n-- Debitar da conta de origem\nUPDATE contas SET saldo = saldo - 500\nWHERE id = 1;\n\n-- Creditar na conta de destino\nUPDATE contas SET saldo = saldo + 500\nWHERE id = 2;\n\n-- Se tudo deu certo, confirma\nCOMMIT;\n\n-- Se algo deu errado, desfaz tudo\n-- ROLLBACK;',
        filename: 'transacoes.sql',
        description: 'Usando transacoes para garantir operacoes atomicas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Em Python com SQLite, o `conexao.commit()` que usamos e justamente o COMMIT de uma transacao. Se ocorrer um erro antes do commit, voce pode chamar `conexao.rollback()` para desfazer. Isso protege seus dados contra operacoes incompletas!',
    },
    {
      type: 'callout',
      content:
        'SQL e uma das linguagens mais uteis que voce vai aprender! Praticamente todo sistema que armazena dados usa SQL.',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'sql6-c1',
      title: 'Atualizacao de Cadastro',
      description:
        'Crie uma tabela "clientes" com id, nome, email e cidade. Insira 4 clientes. Atualize o email de um cliente especifico, mude a cidade de todos os clientes de "Sao Paulo" para "SP" e exiba o resultado final.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela clientes\n\n# Insira 4 clientes (pelo menos 2 de Sao Paulo)\n\n# Atualize o email do cliente com id = 1\n\n# Mude a cidade de "Sao Paulo" para "SP"\n\n# Exiba todos os clientes atualizados\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE clientes (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        email TEXT,\n        cidade TEXT\n    )\n""")\n\nclientes = [\n    ("Ana", "ana@antigo.com", "Sao Paulo"),\n    ("Bruno", "bruno@email.com", "Rio de Janeiro"),\n    ("Carla", "carla@email.com", "Sao Paulo"),\n    ("Daniel", "daniel@email.com", "Curitiba"),\n]\ncursor.executemany("INSERT INTO clientes (nome, email, cidade) VALUES (?, ?, ?)", clientes)\nconexao.commit()\n\ncursor.execute("UPDATE clientes SET email = ? WHERE id = ?", ("ana@novo.com", 1))\ncursor.execute("UPDATE clientes SET cidade = ? WHERE cidade = ?", ("SP", "Sao Paulo"))\nconexao.commit()\n\nprint("=== Clientes Atualizados ===")\ncursor.execute("SELECT * FROM clientes")\nfor c in cursor.fetchall():\n    print(f"  {c[0]}. {c[1]} - {c[2]} - {c[3]}")\n\nconexao.close()',
      hints: [
        'Use UPDATE clientes SET email = "novo" WHERE id = 1',
        'Para atualizar todos de Sao Paulo: WHERE cidade = "Sao Paulo"',
        'Nao esqueca de chamar conexao.commit() apos as atualizacoes',
      ],
    },
    {
      id: 'sql6-c2',
      title: 'Limpeza de Dados',
      description:
        'Crie uma tabela "tarefas" com id, titulo, concluida (INTEGER 0/1) e prioridade. Insira 6 tarefas. Delete todas as tarefas concluidas (concluida = 1). Depois use ALTER TABLE para adicionar uma coluna "data_limite" do tipo TEXT.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela tarefas (id, titulo, concluida, prioridade)\n\n# Insira 6 tarefas (algumas concluidas, outras nao)\n\n# Exiba todas antes da limpeza\n\n# Delete as tarefas concluidas\n\n# Adicione a coluna data_limite com ALTER TABLE\n\n# Exiba as tarefas restantes\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE tarefas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titulo TEXT NOT NULL,\n        concluida INTEGER DEFAULT 0,\n        prioridade TEXT DEFAULT "media"\n    )\n""")\n\ntarefas = [\n    ("Estudar SQL", 1, "alta"),\n    ("Fazer exercicios", 0, "alta"),\n    ("Ler documentacao", 1, "media"),\n    ("Criar projeto", 0, "alta"),\n    ("Revisar codigo", 1, "baixa"),\n    ("Preparar apresentacao", 0, "media"),\n]\ncursor.executemany("INSERT INTO tarefas (titulo, concluida, prioridade) VALUES (?, ?, ?)", tarefas)\nconexao.commit()\n\nprint("=== Antes da limpeza ===")\ncursor.execute("SELECT * FROM tarefas")\nfor t in cursor.fetchall():\n    status = "Concluida" if t[2] == 1 else "Pendente"\n    print(f"  {t[1]} [{status}] - {t[3]}")\n\ncursor.execute("DELETE FROM tarefas WHERE concluida = 1")\nprint(f"\\n{cursor.rowcount} tarefa(s) concluida(s) removida(s)")\n\ncursor.execute("ALTER TABLE tarefas ADD COLUMN data_limite TEXT")\nconexao.commit()\n\nprint("\\n=== Apos limpeza ===")\ncursor.execute("SELECT * FROM tarefas")\nfor t in cursor.fetchall():\n    print(f"  {t[1]} - Prioridade: {t[3]} - Limite: {t[4]}")\n\nconexao.close()',
      hints: [
        'DELETE FROM tarefas WHERE concluida = 1 remove todas as concluidas',
        'ALTER TABLE tarefas ADD COLUMN data_limite TEXT adiciona a nova coluna',
        'cursor.rowcount mostra quantos registros foram afetados',
      ],
    },
    {
      id: 'sql6-c3',
      title: 'Transferencia Bancaria Segura',
      description:
        'Crie uma tabela "contas" com id, titular e saldo. Insira 2 contas com saldos iniciais. Implemente uma transferencia de R$300 da conta 1 para a conta 2 usando transacao (try/except com commit e rollback). Exiba saldos antes e depois.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela contas (id, titular, saldo)\n\n# Insira 2 contas\n\n# Exiba saldos antes da transferencia\n\n# Faca a transferencia de R$300 com transacao segura\n# Use try/except com commit/rollback\n\n# Exiba saldos depois da transferencia\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE contas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titular TEXT NOT NULL,\n        saldo REAL NOT NULL CHECK(saldo >= 0)\n    )\n""")\n\ncursor.execute("INSERT INTO contas (titular, saldo) VALUES (?, ?)", ("Maria", 1000.00))\ncursor.execute("INSERT INTO contas (titular, saldo) VALUES (?, ?)", ("Joao", 500.00))\nconexao.commit()\n\nprint("=== Saldos antes ===")\ncursor.execute("SELECT * FROM contas")\nfor c in cursor.fetchall():\n    print(f"  {c[1]}: R${c[2]:.2f}")\n\nvalor = 300.00\ntry:\n    cursor.execute("UPDATE contas SET saldo = saldo - ? WHERE id = ?", (valor, 1))\n    cursor.execute("UPDATE contas SET saldo = saldo + ? WHERE id = ?", (valor, 2))\n    conexao.commit()\n    print(f"\\nTransferencia de R${valor:.2f} realizada com sucesso!")\nexcept Exception as e:\n    conexao.rollback()\n    print(f"\\nErro na transferencia: {e}")\n    print("Transacao revertida!")\n\nprint("\\n=== Saldos depois ===")\ncursor.execute("SELECT * FROM contas")\nfor c in cursor.fetchall():\n    print(f"  {c[1]}: R${c[2]:.2f}")\n\nconexao.close()',
      hints: [
        'Use try/except para capturar erros durante a transferencia',
        'No try: faca o debito e credito, depois commit',
        'No except: faca rollback para desfazer tudo se algo falhar',
      ],
    },
  ],
};
