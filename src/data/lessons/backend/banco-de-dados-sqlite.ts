import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'banco-de-dados-sqlite',
  moduleId: 'backend',
  title: 'Banco de Dados com SQLite',
  description:
    'Aprenda os fundamentos de bancos de dados SQL: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE e integracao com Python sqlite3.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'SQLite e como ter um mini banco de dados dentro do seu programa, sem precisar instalar nada separado!\n\n## O Que e um Banco de Dados?\n\nAte agora, nossos dados ficavam armazenados em variaveis na memoria -- quando o servidor reiniciava, tudo se perdia. Um **banco de dados** resolve esse problema, armazenando dados de forma **persistente** no disco.\n\n**SQLite** e um banco de dados leve que vem embutido no Python. Nao precisa de instalacao nem configuracao -- perfeito para aprender e para projetos pequenos!\n\nBancos de dados SQL organizam dados em **tabelas**, que funcionam como planilhas: cada **coluna** e um campo e cada **linha** e um registro.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\n# Conectando ao banco (cria o arquivo se nao existir)\nconexao = sqlite3.connect("meu_banco.db")\ncursor = conexao.cursor()\n\n# Criando uma tabela\ncursor.execute("""\n    CREATE TABLE IF NOT EXISTS usuarios (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        email TEXT UNIQUE NOT NULL,\n        idade INTEGER\n    )\n""")\n\nconexao.commit()  # Salva as mudancas\nprint("Tabela criada com sucesso!")\n\nconexao.close()  # Fecha a conexao',
        filename: 'criar_tabela.py',
        description: 'Criando um banco de dados SQLite e uma tabela.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        '**PRIMARY KEY** identifica cada registro de forma unica. **AUTOINCREMENT** faz o id aumentar automaticamente. **NOT NULL** impede valores vazios. **UNIQUE** impede valores duplicados.',
    },
    {
      type: 'text',
      content:
        '## INSERT -- Inserindo Dados\n\nPara adicionar registros a tabela, usamos o comando **INSERT INTO**. Sempre use **placeholders** (`?`) em vez de concatenar valores diretamente na query, para evitar ataques de **SQL Injection**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\nconexao = sqlite3.connect("meu_banco.db")\ncursor = conexao.cursor()\n\n# Inserindo um registro\ncursor.execute(\n    "INSERT INTO usuarios (nome, email, idade) VALUES (?, ?, ?)",\n    ("Ana Silva", "ana@email.com", 25)\n)\n\n# Inserindo varios registros de uma vez\nusuarios = [\n    ("Bruno Costa", "bruno@email.com", 30),\n    ("Carla Lima", "carla@email.com", 22),\n    ("Daniel Souza", "daniel@email.com", 28),\n]\ncursor.executemany(\n    "INSERT INTO usuarios (nome, email, idade) VALUES (?, ?, ?)",\n    usuarios\n)\n\nconexao.commit()\nprint(f"Registros inseridos! Ultimo id: {cursor.lastrowid}")\nconexao.close()',
        filename: 'inserir_dados.py',
        description: 'Inserindo dados na tabela com seguranca usando placeholders.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '**NUNCA** concatene valores diretamente na query SQL! Isso permite ataques de SQL Injection. Sempre use placeholders `?` e passe os valores como tupla no segundo argumento.',
    },
    {
      type: 'text',
      content:
        '## SELECT -- Consultando Dados\n\nO comando **SELECT** busca dados do banco. Voce pode buscar todos os registros, filtrar com **WHERE**, ordenar com **ORDER BY** e limitar com **LIMIT**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\nconexao = sqlite3.connect("meu_banco.db")\nconexao.row_factory = sqlite3.Row  # Retorna dicionarios\ncursor = conexao.cursor()\n\n# Buscar todos\ncursor.execute("SELECT * FROM usuarios")\ntodos = cursor.fetchall()\nprint("Todos os usuarios:")\nfor u in todos:\n    print(f"  {u[\'id\']}. {u[\'nome\']} ({u[\'email\']}) - {u[\'idade\']} anos")\n\n# Filtrar com WHERE\ncursor.execute("SELECT * FROM usuarios WHERE idade > ?", (25,))\nadultos = cursor.fetchall()\nprint("\\nUsuarios com mais de 25 anos:")\nfor u in adultos:\n    print(f"  {u[\'nome\']}")\n\n# Buscar um registro especifico\ncursor.execute("SELECT * FROM usuarios WHERE id = ?", (1,))\nusuario = cursor.fetchone()\nif usuario:\n    print(f"\\nUsuario 1: {usuario[\'nome\']}")\n\nconexao.close()',
        filename: 'consultar_dados.py',
        description: 'Consultando dados com SELECT, WHERE e filtros.',
      },
    },
    {
      type: 'text',
      content:
        '## UPDATE e DELETE -- Modificando e Removendo\n\n**UPDATE** altera registros existentes e **DELETE** remove registros. Sempre use **WHERE** para especificar quais registros afetar -- sem WHERE, a operacao afeta **todos** os registros!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\nconexao = sqlite3.connect("meu_banco.db")\ncursor = conexao.cursor()\n\n# UPDATE - atualizar um registro\ncursor.execute(\n    "UPDATE usuarios SET idade = ? WHERE nome = ?",\n    (26, "Ana Silva")\n)\nprint(f"Registros atualizados: {cursor.rowcount}")\n\n# DELETE - remover um registro\ncursor.execute(\n    "DELETE FROM usuarios WHERE id = ?",\n    (4,)\n)\nprint(f"Registros removidos: {cursor.rowcount}")\n\nconexao.commit()\nconexao.close()',
        filename: 'atualizar_deletar.py',
        description: 'Atualizando e removendo dados com UPDATE e DELETE.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use `:memory:` no lugar do nome do arquivo para criar um banco de dados temporario na memoria. Perfeito para testes! Exemplo: `sqlite3.connect(":memory:")`.',
    },
  ],
  challenges: [
    {
      id: 'be5-c1',
      title: 'Tabela de Produtos',
      description:
        'Crie uma tabela "produtos" com id, nome, preco e estoque. Insira 3 produtos e depois faca um SELECT para listar apenas os produtos com preco menor que 50.',
      language: 'python',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")  # banco em memoria\ncursor = conexao.cursor()\n\n# Crie a tabela produtos\n\n# Insira 3 produtos\n\n# Consulte produtos com preco < 50\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE produtos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        preco REAL NOT NULL,\n        estoque INTEGER DEFAULT 0\n    )\n""")\n\nprodutos = [\n    ("Caneta", 2.50, 100),\n    ("Caderno", 15.90, 50),\n    ("Mochila", 89.90, 20),\n]\ncursor.executemany(\n    "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)",\n    produtos\n)\nconexao.commit()\n\ncursor.execute("SELECT * FROM produtos WHERE preco < 50")\nfor p in cursor.fetchall():\n    print(f"{p[1]}: R${p[2]:.2f} ({p[3]} em estoque)")\n\nconexao.close()',
      hints: [
        'Use REAL para o tipo de preco (numero decimal)',
        'Use executemany() para inserir varios registros de uma vez',
        'Use WHERE preco < 50 para filtrar',
      ],
    },
    {
      id: 'be5-c2',
      title: 'CRUD Completo no Banco',
      description:
        'Implemente todas as operacoes CRUD em uma tabela "alunos" (nome, nota). Crie a tabela, insira 3 alunos, atualize a nota de um deles e delete outro. Imprima o resultado final.',
      language: 'python',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# CREATE - criar tabela alunos (id, nome, nota)\n\n# INSERT - inserir 3 alunos\n\n# UPDATE - atualizar a nota do primeiro aluno para 10\n\n# DELETE - remover o ultimo aluno\n\n# SELECT - listar todos os alunos restantes\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE alunos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        nota REAL\n    )\n""")\n\nalunos = [\n    ("Maria", 8.5),\n    ("Joao", 7.0),\n    ("Ana", 9.2),\n]\ncursor.executemany("INSERT INTO alunos (nome, nota) VALUES (?, ?)", alunos)\nconexao.commit()\n\ncursor.execute("UPDATE alunos SET nota = ? WHERE id = ?", (10.0, 1))\nconexao.commit()\n\ncursor.execute("DELETE FROM alunos WHERE id = ?", (3,))\nconexao.commit()\n\ncursor.execute("SELECT * FROM alunos")\nfor a in cursor.fetchall():\n    print(f"ID: {a[0]}, Nome: {a[1]}, Nota: {a[2]}")\n\nconexao.close()',
      hints: [
        'Nao esqueca de chamar conexao.commit() apos cada modificacao',
        'Use :memory: para criar banco em memoria (para testes)',
        'Sempre use WHERE no UPDATE e DELETE para afetar registros especificos',
      ],
    },
    {
      id: 'be5-c3',
      title: 'Consultas Avancadas',
      description:
        'Crie uma tabela "vendas" com produto, quantidade e valor_total. Insira 5 vendas e faca consultas usando ORDER BY para ordenar por valor e LIMIT para pegar apenas as 3 maiores vendas.',
      language: 'python',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela vendas\n\n# Insira 5 vendas\n\n# Consulte as 3 maiores vendas (ORDER BY + LIMIT)\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE vendas (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        produto TEXT NOT NULL,\n        quantidade INTEGER NOT NULL,\n        valor_total REAL NOT NULL\n    )\n""")\n\nvendas = [\n    ("Notebook", 1, 2500.00),\n    ("Mouse", 5, 150.00),\n    ("Teclado", 3, 450.00),\n    ("Monitor", 2, 1800.00),\n    ("Webcam", 4, 320.00),\n]\ncursor.executemany(\n    "INSERT INTO vendas (produto, quantidade, valor_total) VALUES (?, ?, ?)",\n    vendas\n)\nconexao.commit()\n\nprint("Top 3 maiores vendas:")\ncursor.execute("SELECT * FROM vendas ORDER BY valor_total DESC LIMIT 3")\nfor v in cursor.fetchall():\n    print(f"  {v[1]}: {v[2]} unid. - R${v[3]:.2f}")\n\nconexao.close()',
      hints: [
        'Use ORDER BY valor_total DESC para ordenar do maior para o menor',
        'Use LIMIT 3 para pegar apenas 3 resultados',
        'DESC significa descendente (do maior para o menor)',
      ],
    },
  ],
};
