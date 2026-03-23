import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'criando-tabelas',
  moduleId: 'sql',
  title: 'Criando Tabelas',
  description:
    'Aprenda a criar tabelas com CREATE TABLE, os tipos de dados do SQL, restricoes como PRIMARY KEY e NOT NULL, e como remover tabelas com DROP TABLE.',
  order: 1,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content:
        '## CREATE TABLE -- Criando Tabelas\n\nCriar uma tabela e como desenhar um formulario em branco: voce define os campos (colunas) e o tipo de informacao que cada um aceita. Assim como um formulario tem campos para "Nome", "Email" e "Idade", uma tabela tem colunas para cada tipo de dado que voce quer armazenar.\n\nEm bancos de dados relacionais, os dados sao organizados em **tabelas**. Cada tabela tem **colunas** (os campos) e **linhas** (os registros). Para criar uma tabela, usamos o comando **CREATE TABLE**.\n\nA sintaxe basica e:\n\n```\nCREATE TABLE nome_tabela (\n    coluna1 TIPO RESTRICOES,\n    coluna2 TIPO RESTRICOES,\n    ...\n);\n```\n\nCada coluna precisa de um **nome**, um **tipo de dado** (que diz se o campo aceita texto, numeros, etc.) e, opcionalmente, **restricoes** (regras que definem o que pode ou nao ser inserido).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Nao se preocupe em decorar todos os tipos e restricoes de uma vez! Com a pratica, voce vai lembrar naturalmente. O importante agora e entender o conceito: cada coluna tem um nome, um tipo e regras opcionais. Voce esta indo muito bem!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Criando uma tabela de estudantes\nCREATE TABLE estudantes (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    email TEXT UNIQUE NOT NULL,\n    idade INTEGER,\n    nota_media REAL DEFAULT 0.0\n);\n\n-- Verificando se a tabela ja existe antes de criar\nCREATE TABLE IF NOT EXISTS cursos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    carga_horaria INTEGER NOT NULL,\n    descricao TEXT\n);',
        filename: 'criar_tabelas.sql',
        description: 'Criando tabelas com diferentes tipos e restricoes.',
      },
    },
    {
      type: 'text',
      content:
        '## Tipos de Dados no SQL\n\nAssim como em Python temos int, float e str, no SQL tambem existem tipos de dados. Os tipos mais comuns no SQLite sao:\n\n- **INTEGER** -- Numeros inteiros: `1`, `42`, `-10`\n- **TEXT** -- Textos e strings: `"Ana"`, `"Rua das Flores, 123"`\n- **REAL** -- Numeros decimais (ponto flutuante): `3.14`, `99.90`\n- **BLOB** -- Dados binarios (imagens, arquivos)\n- **NULL** -- Ausencia de valor (quando o campo esta vazio)\n\nDiferente de outros SGBDs, o SQLite usa **tipagem dinamica** -- o tipo e associado ao valor, nao a coluna. Porem, e boa pratica sempre declarar os tipos para manter o codigo claro e compativel com outros bancos.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Em outros bancos como MySQL e PostgreSQL, existem tipos mais especificos: **VARCHAR(100)** para texto limitado, **DATE** para datas, **BOOLEAN** para verdadeiro/falso, **DECIMAL(10,2)** para valores monetarios. O SQLite aceita esses nomes mas converte internamente para seus 5 tipos basicos.',
    },
    {
      type: 'text',
      content:
        '## Restricoes (Constraints)\n\nRestricoes sao regras aplicadas as colunas para garantir a **integridade dos dados** -- ou seja, para garantir que ninguem insira dados invalidos ou inconsistentes. Pense nelas como as "regras de validacao" do seu formulario:\n\n- **PRIMARY KEY** -- Identifica cada registro de forma unica. Geralmente e um campo `id`. E como o CPF: nenhuma pessoa tem o mesmo.\n- **AUTOINCREMENT** -- O valor e gerado automaticamente, incrementando a cada novo registro. Voce nao precisa se preocupar em definir o id.\n- **NOT NULL** -- A coluna nao pode ter valor vazio. E como um campo obrigatorio de um formulario.\n- **UNIQUE** -- Nao permite valores duplicados na coluna. Exemplo: dois usuarios nao podem ter o mesmo email.\n- **DEFAULT valor** -- Define um valor padrao caso nenhum seja fornecido.\n- **CHECK(condicao)** -- Valida o valor com uma condicao personalizada. Exemplo: salario deve ser maior que zero.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Tabela com varias restricoes\nCREATE TABLE funcionarios (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    cpf TEXT UNIQUE NOT NULL,\n    salario REAL CHECK(salario > 0),\n    departamento TEXT DEFAULT "Geral",\n    ativo INTEGER DEFAULT 1\n);\n\n-- DROP TABLE -- Removendo uma tabela\nDROP TABLE IF EXISTS funcionarios;\n\n-- Isso remove a tabela e TODOS os dados!\n-- Use com muito cuidado!',
        filename: 'restricoes.sql',
        description: 'Usando restricoes para garantir integridade e removendo tabelas com DROP TABLE.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '**DROP TABLE** remove a tabela e todos os seus dados permanentemente! Sempre use **IF EXISTS** para evitar erros caso a tabela nao exista. Em producao, tenha sempre um backup antes de executar DROP.',
    },
    {
      type: 'text',
      content:
        '## UPDATE e DELETE -- Modificando e Removendo Registros\n\nApos inserir dados em uma tabela, e comum precisar atualiza-los ou remove-los. Para isso, o SQL oferece dois comandos fundamentais:\n\n**UPDATE** -- Modifica registros existentes. A clausula **SET** define as colunas e novos valores. A clausula **WHERE** filtra quais linhas serao afetadas.\n\n**DELETE** -- Remove registros da tabela. A clausula **WHERE** define quais linhas serao removidas.\n\nA sintaxe basica e:\n\n```\nUPDATE tabela SET coluna = valor WHERE condicao;\nDELETE FROM tabela WHERE condicao;\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- UPDATE: atualizando o salario de um funcionario\nUPDATE funcionarios\nSET salario = 5000.00\nWHERE id = 1;\n\n-- UPDATE: alterando multiplas colunas ao mesmo tempo\nUPDATE funcionarios\nSET salario = 6000.00, departamento = "TI"\nWHERE nome = "Ana Silva";\n\n-- DELETE: removendo um registro especifico\nDELETE FROM funcionarios\nWHERE id = 3;\n\n-- DELETE: removendo todos os inativos\nDELETE FROM funcionarios\nWHERE ativo = 0;',
        filename: 'update-delete.sql',
        description: 'Exemplos de UPDATE para modificar registros e DELETE para remover. A clausula WHERE e essencial em ambos os comandos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        '**NUNCA execute DELETE ou UPDATE sem WHERE** a menos que queira afetar TODOS os registros da tabela! Um simples `DELETE FROM funcionarios;` apaga todos os dados sem possibilidade de recuperacao. Sempre teste sua condicao WHERE com um SELECT antes de executar o DELETE ou UPDATE.',
    },
    {
      type: 'text',
      content:
        '## Constraints Adicionais: DEFAULT e UNIQUE\n\nAlem de PRIMARY KEY, NOT NULL e CHECK, duas outras constraints muito usadas sao:\n\n### DEFAULT\nDefine um valor padrao para a coluna caso nenhum valor seja fornecido no INSERT. E util para campos opcionais que devem ter um valor inicial padrao, como status, datas de criacao ou contadores.\n\n### UNIQUE\nGarante que nao existam dois registros com o mesmo valor em uma coluna. Diferente da PRIMARY KEY, uma coluna UNIQUE pode ter valores NULL (mas apenas um NULL em algumas implementacoes). Voce pode ter multiplas colunas UNIQUE em uma tabela.\n\nVoce tambem pode criar uma constraint UNIQUE sobre **multiplas colunas** para garantir a combinacao seja unica.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Tabela com DEFAULT e UNIQUE demonstrados\nCREATE TABLE usuarios (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    username TEXT UNIQUE NOT NULL,\n    email TEXT UNIQUE NOT NULL,\n    senha TEXT NOT NULL,\n    -- DEFAULT com texto\n    perfil TEXT DEFAULT "visitante",\n    -- DEFAULT com numero\n    pontos INTEGER DEFAULT 0,\n    -- DEFAULT com data (SQLite)\n    criado_em TEXT DEFAULT (datetime("now"))\n);\n\n-- UNIQUE em multiplas colunas: combinacao deve ser unica\nCREATE TABLE matriculas (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    aluno_id INTEGER NOT NULL,\n    curso_id INTEGER NOT NULL,\n    -- Garante que o aluno nao se matricule duas vezes no mesmo curso\n    UNIQUE(aluno_id, curso_id)\n);',
        filename: 'default-unique.sql',
        description: 'Uso de DEFAULT para valores padrao automaticos e UNIQUE para garantir unicidade. O UNIQUE composto impede duplicatas na combinacao de duas colunas.',
      },
    },
  ],
  challenges: [
    {
      id: 'sql1-c1',
      title: 'Tabela de Filmes',
      description:
        'Crie uma tabela chamada "filmes" com as colunas: id (INTEGER PRIMARY KEY AUTOINCREMENT), titulo (TEXT NOT NULL), ano (INTEGER), nota (REAL DEFAULT 0.0) e genero (TEXT). Depois insira 2 filmes e liste todos.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela filmes\n\n# Insira 2 filmes\n\n# Liste todos os filmes\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE filmes (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titulo TEXT NOT NULL,\n        ano INTEGER,\n        nota REAL DEFAULT 0.0,\n        genero TEXT\n    )\n""")\n\ncursor.execute("INSERT INTO filmes (titulo, ano, nota, genero) VALUES (?, ?, ?, ?)", ("Matrix", 1999, 8.7, "Ficcao Cientifica"))\ncursor.execute("INSERT INTO filmes (titulo, ano, nota, genero) VALUES (?, ?, ?, ?)", ("Interestelar", 2014, 8.6, "Ficcao Cientifica"))\nconexao.commit()\n\ncursor.execute("SELECT * FROM filmes")\nfor f in cursor.fetchall():\n    print("ID:", f[0], "| Titulo:", f[1], "| Ano:", f[2], "| Nota:", f[3], "| Genero:", f[4])\n\nconexao.close()',
      hints: [
        'Use AUTOINCREMENT para que o id seja gerado automaticamente',
        'Use DEFAULT 0.0 para a nota ter um valor padrao',
        'Nao esqueca de listar as colunas no INSERT se nao for inserir todas',
      ],
    },
    {
      id: 'sql1-c2',
      title: 'Tabela com Restricoes',
      description:
        'Crie uma tabela "contas_bancarias" com: id (PRIMARY KEY), titular (TEXT NOT NULL), cpf (TEXT UNIQUE NOT NULL), saldo (REAL CHECK maior que zero) e tipo (TEXT DEFAULT "corrente"). Insira 2 contas e liste-as.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela contas_bancarias com as restricoes\n\n# Insira 2 contas\n\n# Liste todas as contas\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE contas_bancarias (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titular TEXT NOT NULL,\n        cpf TEXT UNIQUE NOT NULL,\n        saldo REAL CHECK(saldo >= 0),\n        tipo TEXT DEFAULT "corrente"\n    )\n""")\n\ncursor.execute("INSERT INTO contas_bancarias (titular, cpf, saldo) VALUES (?, ?, ?)", ("Maria Silva", "111.222.333-44", 1500.00))\ncursor.execute("INSERT INTO contas_bancarias (titular, cpf, saldo, tipo) VALUES (?, ?, ?, ?)", ("Joao Santos", "555.666.777-88", 3200.50, "poupanca"))\nconexao.commit()\n\ncursor.execute("SELECT * FROM contas_bancarias")\nfor c in cursor.fetchall():\n    print("Titular:", c[1], "| CPF:", c[2], "| Saldo: R$", c[3], "| Tipo:", c[4])\n\nconexao.close()',
      hints: [
        'Use CHECK(saldo >= 0) para garantir que o saldo nao seja negativo',
        'Use UNIQUE para impedir CPFs duplicados',
        'Se nao informar o tipo, o DEFAULT "corrente" sera usado',
      ],
    },
    {
      id: 'sql1-c3',
      title: 'Criar e Destruir',
      description:
        'Crie uma tabela "temporaria" com id e nome, insira 1 registro, exiba-o, depois use DROP TABLE para remover a tabela. Tente consultar a tabela removida e capture o erro.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela temporaria\n\n# Insira 1 registro\n\n# Exiba o registro\n\n# Remova a tabela com DROP TABLE\n\n# Tente consultar a tabela removida e capture o erro\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE temporaria (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL\n    )\n""")\n\ncursor.execute("INSERT INTO temporaria (nome) VALUES (?)", ("Teste",))\nconexao.commit()\n\ncursor.execute("SELECT * FROM temporaria")\nfor r in cursor.fetchall():\n    print("ID:", r[0], "| Nome:", r[1])\n\ncursor.execute("DROP TABLE temporaria")\nprint("Tabela removida com sucesso!")\n\ntry:\n    cursor.execute("SELECT * FROM temporaria")\nexcept Exception as e:\n    print("Erro esperado:", e)\n\nconexao.close()',
      hints: [
        'Use DROP TABLE nome_tabela para remover a tabela',
        'Use try/except para capturar o erro ao consultar tabela inexistente',
        'Apos DROP TABLE, todos os dados sao perdidos permanentemente',
      ],
    },
  ],
};
