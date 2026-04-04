import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'inserindo-e-consultando',
  moduleId: 'sql',
  title: 'Inserindo e Consultando Dados',
  description:
    'Aprenda a inserir dados com INSERT INTO, consultar com SELECT, filtrar com WHERE e selecionar todas as colunas com SELECT *.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content:
        '## INSERT INTO -- Inserindo Dados\n\nInserir dados e como preencher uma ficha: voce escolhe quais campos quer preencher e informa os valores. O comando **INSERT INTO** adiciona novos registros (linhas) a uma tabela.\n\nExistem duas formas principais:\n\n1. **Especificando as colunas** (recomendado): voce lista quais colunas vai preencher\n2. **Sem especificar colunas**: voce precisa fornecer valores para TODAS as colunas na ordem correta\n\nSempre prefira a primeira forma -- ela e mais clara e nao quebra se a tabela mudar.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Pense no INSERT como "preencher uma nova linha da planilha". Cada vez que voce executa um INSERT, uma nova linha e adicionada a tabela com os valores que voce informou. Simples assim!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Forma 1: Especificando as colunas (recomendado)\nINSERT INTO estudantes (nome, email, idade)\nVALUES ("Ana Silva", "ana@email.com", 22);\n\n-- Forma 2: Sem especificar colunas (precisa de todas)\nINSERT INTO estudantes\nVALUES (NULL, "Bruno Costa", "bruno@email.com", 25, 0.0);\n-- NULL no id porque e AUTOINCREMENT\n\n-- Inserindo varios registros de uma vez\nINSERT INTO estudantes (nome, email, idade) VALUES\n    ("Carla Lima", "carla@email.com", 20),\n    ("Daniel Souza", "daniel@email.com", 23),\n    ("Eva Santos", "eva@email.com", 21);',
        filename: 'insert.sql',
        description: 'Diferentes formas de inserir dados com INSERT INTO.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Ao usar Python com SQLite, **NUNCA** concatene valores diretamente na string SQL. Sempre use placeholders `?` para evitar **SQL Injection** -- um tipo de ataque onde alguem mal-intencionado envia comandos SQL escondidos nos dados para destruir ou roubar informacoes do seu banco.',
    },
    {
      type: 'text',
      content:
        '## SELECT -- Consultando Dados\n\nConsultar dados e como pedir ao computador: "me mostre todas as fichas de alunos com nota acima de 7". O comando **SELECT** e o mais usado em SQL -- ele busca dados de uma ou mais tabelas.\n\nVoce pode selecionar colunas especificas ou usar `*` para trazer todas:\n\n- **SELECT *** -- Seleciona todas as colunas (o asterisco significa "tudo")\n- **SELECT coluna1, coluna2** -- Seleciona apenas as colunas listadas\n- **SELECT coluna AS apelido** -- Renomeia a coluna no resultado (nao altera a tabela, so muda o nome na exibicao)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Selecionar TODAS as colunas\nSELECT * FROM estudantes;\n\n-- Selecionar colunas especificas\nSELECT nome, email FROM estudantes;\n\n-- Usar alias (apelido) para renomear colunas\nSELECT nome AS "Nome Completo", idade AS "Idade (anos)"\nFROM estudantes;',
        filename: 'select.sql',
        description: 'Consultando dados com SELECT de diferentes formas.',
      },
    },
    {
      type: 'text',
      content:
        '## WHERE -- Filtrando Resultados\n\nO **WHERE** permite filtrar quais registros voce quer retornar. Voce define uma condicao, e apenas as linhas que satisfazem essa condicao sao retornadas. E como aplicar um filtro: so aparece o que voce quer ver.\n\nOperadores de comparacao:\n- `=` -- Igual\n- `!=` ou `<>` -- Diferente\n- `>`, `<`, `>=`, `<=` -- Maior, menor, etc.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Filtrar por condicao exata\nSELECT * FROM estudantes WHERE idade = 22;\n\n-- Filtrar por comparacao\nSELECT nome, idade FROM estudantes WHERE idade > 21;\n\n-- Filtrar por texto\nSELECT * FROM estudantes WHERE nome = "Ana Silva";\n\n-- Filtrar por diferente\nSELECT * FROM estudantes WHERE departamento != "TI";',
        filename: 'where.sql',
        description: 'Filtrando dados com WHERE e operadores de comparacao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Em SQL, strings sao delimitadas por aspas simples ou duplas: `"texto"` ou `\'texto\'`. O padrao SQL usa aspas simples, mas o SQLite aceita ambas. Ja os nomes de colunas e tabelas nao precisam de aspas (a menos que contenham espacos ou caracteres especiais).',
    },
  ],
  challenges: [
    {
      id: 'sql2-c1',
      title: 'Cadastro de Alunos',
      description:
        'Crie uma tabela "alunos" com id, nome, email e nota. Insira 4 alunos com notas variadas e depois consulte apenas o nome e a nota de todos os alunos.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela alunos (id, nome, email, nota)\n\n# Insira 4 alunos\n\n# Consulte apenas nome e nota de todos\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE alunos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        email TEXT UNIQUE NOT NULL,\n        nota REAL DEFAULT 0.0\n    )\n""")\n\nalunos = [\n    ("Maria", "maria@email.com", 9.5),\n    ("Joao", "joao@email.com", 7.0),\n    ("Ana", "ana@email.com", 8.3),\n    ("Pedro", "pedro@email.com", 6.5),\n]\ncursor.executemany("INSERT INTO alunos (nome, email, nota) VALUES (?, ?, ?)", alunos)\nconexao.commit()\n\ncursor.execute("SELECT nome, nota FROM alunos")\nfor a in cursor.fetchall():\n    print("Nome:", a[0], "| Nota:", a[1])\n\nconexao.close()',
      hints: [
        'Use SELECT nome, nota FROM alunos para selecionar apenas essas colunas',
        'Use executemany() para inserir varios registros de uma vez',
        'A nota pode ser do tipo REAL para aceitar decimais',
      ],
    },
    {
      id: 'sql2-c2',
      title: 'Filtrando com WHERE',
      description:
        'Crie uma tabela "produtos" com id, nome, preco e categoria. Insira 5 produtos de categorias diferentes. Use WHERE para listar apenas os produtos com preco maior que 50 reais.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela produtos (id, nome, preco, categoria)\n\n# Insira 5 produtos de categorias variadas\n\n# Liste produtos com preco > 50\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE produtos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        preco REAL NOT NULL,\n        categoria TEXT\n    )\n""")\n\nprodutos = [\n    ("Caneta", 3.50, "Papelaria"),\n    ("Caderno", 25.90, "Papelaria"),\n    ("Mochila", 89.90, "Acessorios"),\n    ("Fone de Ouvido", 150.00, "Eletronicos"),\n    ("Garrafa", 35.00, "Utilidades"),\n]\ncursor.executemany("INSERT INTO produtos (nome, preco, categoria) VALUES (?, ?, ?)", produtos)\nconexao.commit()\n\nprint("Produtos com preco acima de R$50:")\ncursor.execute("SELECT nome, preco, categoria FROM produtos WHERE preco > 50")\nfor p in cursor.fetchall():\n    print("  ", p[0], "- R$", p[1], "(", p[2], ")")\n\nconexao.close()',
      hints: [
        'Use WHERE preco > 50 para filtrar pelo valor',
        'Voce pode selecionar colunas especificas no SELECT',
        'Lembre-se de usar conexao.commit() apos inserir dados',
      ],
    },
    {
      id: 'sql2-c3',
      title: 'SELECT Completo',
      description:
        'Crie uma tabela "funcionarios" com id, nome, cargo e salario. Insira 4 funcionarios. Faca 3 consultas: todos os campos, apenas nomes e cargos, e apenas os que ganham acima de 3000.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela funcionarios\n\n# Insira 4 funcionarios\n\n# Consulta 1: Todos os campos (SELECT *)\n\n# Consulta 2: Apenas nome e cargo\n\n# Consulta 3: Funcionarios com salario > 3000\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE funcionarios (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        cargo TEXT NOT NULL,\n        salario REAL NOT NULL\n    )\n""")\n\nfuncionarios = [\n    ("Ana", "Desenvolvedora", 5500.00),\n    ("Bruno", "Designer", 3200.00),\n    ("Carla", "Gerente", 7800.00),\n    ("Daniel", "Estagiario", 1500.00),\n]\ncursor.executemany("INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)", funcionarios)\nconexao.commit()\n\nprint("=== Todos os funcionarios ===")\ncursor.execute("SELECT * FROM funcionarios")\nfor f in cursor.fetchall():\n    print("  ", f[0], ".", f[1], "-", f[2], "- R$", f[3])\n\nprint("\\n=== Nome e Cargo ===")\ncursor.execute("SELECT nome, cargo FROM funcionarios")\nfor f in cursor.fetchall():\n    print("  ", f[0], ":", f[1])\n\nprint("\\n=== Salario acima de R$3000 ===")\ncursor.execute("SELECT nome, salario FROM funcionarios WHERE salario > 3000")\nfor f in cursor.fetchall():\n    print("  ", f[0], "- R$", f[1])\n\nconexao.close()',
      hints: [
        'Use SELECT * para todas as colunas e SELECT nome, cargo para especificas',
        'Use WHERE salario > 3000 para filtrar por salario',
        'Faca tres chamadas separadas de cursor.execute() para as tres consultas',
      ],
    },
  ],
};
