import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'relacionamentos-e-join',
  moduleId: 'sql',
  title: 'Relacionamentos e JOIN',
  description:
    'Entenda chaves estrangeiras, relacionamentos entre tabelas (1:N e N:N) e como combinar dados com INNER JOIN, LEFT JOIN e RIGHT JOIN.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine duas planilhas: uma com alunos e outra com notas. JOIN cruza as duas usando o campo em comum para ver tudo junto!\n\n## Relacionamentos entre Tabelas\n\nEm bancos relacionais, os dados sao distribuidos em varias tabelas que se conectam entre si. Isso evita **duplicacao** de dados e facilita a **manutencao**.\n\nPor exemplo, em vez de repetir o nome do departamento em cada funcionario, criamos uma tabela separada de departamentos e referenciamos pelo id.\n\nExistem tres tipos de relacionamento:\n\n- **1:1 (Um para Um)** -- Cada registro se relaciona com exatamente um da outra tabela\n- **1:N (Um para Muitos)** -- Um registro se relaciona com varios da outra tabela (ex: um departamento tem muitos funcionarios)\n- **N:N (Muitos para Muitos)** -- Varios registros se relacionam com varios da outra tabela (ex: alunos e disciplinas)',
    },
    {
      type: 'text',
      content:
        '## Chaves Estrangeiras (FOREIGN KEY)\n\nUma **chave estrangeira** e uma coluna que referencia a chave primaria de outra tabela. Ela cria o vinculo entre as tabelas e garante a **integridade referencial** -- voce nao pode inserir um valor que nao exista na tabela referenciada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Tabela de departamentos\nCREATE TABLE departamentos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL UNIQUE\n);\n\n-- Tabela de funcionarios com chave estrangeira\nCREATE TABLE funcionarios (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL,\n    salario REAL,\n    departamento_id INTEGER,\n    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)\n);\n\n-- Inserindo dados\nINSERT INTO departamentos (nome) VALUES ("TI"), ("RH"), ("Marketing");\n\nINSERT INTO funcionarios (nome, salario, departamento_id) VALUES\n    ("Ana", 5500, 1),\n    ("Bruno", 4200, 2),\n    ("Carla", 6000, 1),\n    ("Daniel", 3800, 3);',
        filename: 'chave_estrangeira.sql',
        description: 'Criando tabelas relacionadas com FOREIGN KEY.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'No SQLite, chaves estrangeiras sao **desabilitadas por padrao**! Para ativa-las, execute `PRAGMA foreign_keys = ON;` no inicio de cada conexao. Sem isso, o banco permite inserir valores invalidos.',
    },
    {
      type: 'text',
      content:
        '## JOIN -- Combinando Tabelas\n\nO **JOIN** combina dados de duas ou mais tabelas com base em uma condicao de relacionamento. Os tres tipos mais comuns sao:\n\n- **INNER JOIN** -- Retorna apenas registros que tem correspondencia em **ambas** as tabelas\n- **LEFT JOIN** -- Retorna **todos** os registros da tabela da esquerda, mesmo sem correspondencia na direita (preenche com NULL)\n- **RIGHT JOIN** -- Retorna **todos** os registros da tabela da direita, mesmo sem correspondencia na esquerda',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- INNER JOIN: apenas registros com correspondencia\nSELECT f.nome, f.salario, d.nome AS departamento\nFROM funcionarios f\nINNER JOIN departamentos d ON f.departamento_id = d.id;\n-- Retorna apenas funcionarios que TEM departamento\n\n-- LEFT JOIN: todos da esquerda + correspondencias da direita\nSELECT f.nome, d.nome AS departamento\nFROM funcionarios f\nLEFT JOIN departamentos d ON f.departamento_id = d.id;\n-- Retorna TODOS os funcionarios, mesmo sem departamento\n-- Departamento aparece como NULL se nao houver correspondencia\n\n-- LEFT JOIN para encontrar "orfaos"\nSELECT d.nome AS departamento\nFROM departamentos d\nLEFT JOIN funcionarios f ON d.id = f.departamento_id\nWHERE f.id IS NULL;\n-- Departamentos que NAO tem nenhum funcionario',
        filename: 'joins.sql',
        description: 'Usando INNER JOIN e LEFT JOIN para combinar dados de tabelas relacionadas.',
      },
    },
    {
      type: 'text',
      content:
        '## Relacionamento N:N (Muitos para Muitos)\n\nQuando dois registros podem se relacionar mutuamente de forma multipla (como alunos e disciplinas), usamos uma **tabela intermediaria** (ou tabela de juncao) que armazena os pares de ids.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- Tabelas principais\nCREATE TABLE alunos (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL\n);\n\nCREATE TABLE disciplinas (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    nome TEXT NOT NULL\n);\n\n-- Tabela intermediaria (juncao)\nCREATE TABLE matriculas (\n    aluno_id INTEGER,\n    disciplina_id INTEGER,\n    PRIMARY KEY (aluno_id, disciplina_id),\n    FOREIGN KEY (aluno_id) REFERENCES alunos(id),\n    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)\n);\n\n-- Consultando alunos e suas disciplinas\nSELECT a.nome AS aluno, d.nome AS disciplina\nFROM matriculas m\nINNER JOIN alunos a ON m.aluno_id = a.id\nINNER JOIN disciplinas d ON m.disciplina_id = d.id;',
        filename: 'muitos_para_muitos.sql',
        description: 'Relacionamento N:N usando tabela intermediaria.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use alias curtos para tabelas em JOINs para deixar o codigo mais legivel: `FROM funcionarios f INNER JOIN departamentos d`. O alias `f` substitui `funcionarios` no restante da query.',
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
        '## LEFT JOIN e RIGHT JOIN\n\n**INNER JOIN** retorna apenas registros que existem em AMBAS as tabelas. Mas e quando voce quer todos os registros de uma tabela, mesmo sem correspondencia na outra?\n\n**LEFT JOIN** — retorna TODOS os registros da tabela da esquerda, e os correspondentes da direita. Onde nao ha correspondencia, os campos da direita ficam NULL.\n\n**RIGHT JOIN** — o oposto: todos da direita, correspondentes da esquerda. Na pratica, RIGHT JOIN e raro — voce pode sempre reescrever como LEFT JOIN trocando a ordem das tabelas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'left_join.sql',
        code: `-- Tabelas de exemplo
-- alunos: id, nome
-- matriculas: aluno_id, curso

-- INNER JOIN: apenas alunos COM matricula
SELECT alunos.nome, matriculas.curso
FROM alunos
INNER JOIN matriculas ON alunos.id = matriculas.aluno_id;
-- Ana  | Python
-- Bruno| SQL

-- LEFT JOIN: TODOS os alunos, com ou sem matricula
SELECT alunos.nome, matriculas.curso
FROM alunos
LEFT JOIN matriculas ON alunos.id = matriculas.aluno_id;
-- Ana   | Python
-- Bruno | SQL
-- Carla | NULL  <- Carla nao tem matricula, mas aparece!

-- Filtrar apenas quem NAO tem matricula
SELECT alunos.nome
FROM alunos
LEFT JOIN matriculas ON alunos.id = matriculas.aluno_id
WHERE matriculas.aluno_id IS NULL;
-- Carla`,
        description: 'LEFT JOIN inclui todos da tabela esquerda. WHERE campo IS NULL filtra quem nao tem correspondencia.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Dica pratica: comece sempre com LEFT JOIN quando nao tem certeza. Se voce quer "todos os clientes e seus pedidos (se existirem)", use LEFT JOIN. Se voce quer "apenas clientes que fizeram pedidos", use INNER JOIN. O LEFT JOIN e mais seguro — voce nunca perde dados da tabela principal.',
    },
  ],
  challenges: [
    {
      id: 'sql5-c1',
      title: 'Funcionarios e Departamentos',
      description:
        'Crie tabelas "departamentos" e "funcionarios" com chave estrangeira. Insira 3 departamentos e 5 funcionarios. Use INNER JOIN para listar cada funcionario com o nome do seu departamento.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\ncursor.execute("PRAGMA foreign_keys = ON")\n\n# Crie a tabela departamentos (id, nome)\n\n# Crie a tabela funcionarios (id, nome, salario, departamento_id)\n\n# Insira 3 departamentos\n\n# Insira 5 funcionarios vinculados aos departamentos\n\n# Use INNER JOIN para listar funcionarios com nome do departamento\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\ncursor.execute("PRAGMA foreign_keys = ON")\n\ncursor.execute("""\n    CREATE TABLE departamentos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL UNIQUE\n    )\n""")\n\ncursor.execute("""\n    CREATE TABLE funcionarios (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        salario REAL,\n        departamento_id INTEGER,\n        FOREIGN KEY (departamento_id) REFERENCES departamentos(id)\n    )\n""")\n\ncursor.executemany("INSERT INTO departamentos (nome) VALUES (?)", [("TI",), ("RH",), ("Vendas",)])\n\nfuncionarios = [\n    ("Ana", 5500.00, 1),\n    ("Bruno", 4200.00, 2),\n    ("Carla", 6000.00, 1),\n    ("Daniel", 3800.00, 3),\n    ("Eva", 4800.00, 3),\n]\ncursor.executemany("INSERT INTO funcionarios (nome, salario, departamento_id) VALUES (?, ?, ?)", funcionarios)\nconexao.commit()\n\ncursor.execute("""\n    SELECT f.nome, f.salario, d.nome AS departamento\n    FROM funcionarios f\n    INNER JOIN departamentos d ON f.departamento_id = d.id\n    ORDER BY d.nome, f.nome\n""")\nfor r in cursor.fetchall():\n    print(f"{r[0]} - R${r[1]:.2f} - Depto: {r[2]}")\n\nconexao.close()',
      hints: [
        'Use FOREIGN KEY (departamento_id) REFERENCES departamentos(id)',
        'INNER JOIN conecta as tabelas pela condicao ON f.departamento_id = d.id',
        'Use alias como f e d para facilitar a leitura da query',
      ],
    },
    {
      id: 'sql5-c2',
      title: 'LEFT JOIN e Departamentos Vazios',
      description:
        'Adicione um departamento sem funcionarios. Use LEFT JOIN para listar todos os departamentos e contar quantos funcionarios cada um tem (inclusive os com zero). Use GROUP BY e COUNT.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\ncursor.execute("PRAGMA foreign_keys = ON")\n\n# Crie as tabelas\ncursor.execute("CREATE TABLE departamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)")\ncursor.execute("CREATE TABLE funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, departamento_id INTEGER, FOREIGN KEY (departamento_id) REFERENCES departamentos(id))")\n\n# Insira 4 departamentos (o 4o sem funcionarios)\n\n# Insira funcionarios nos 3 primeiros departamentos\n\n# Use LEFT JOIN + GROUP BY + COUNT para contar funcionarios por departamento\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\ncursor.execute("PRAGMA foreign_keys = ON")\n\ncursor.execute("CREATE TABLE departamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)")\ncursor.execute("CREATE TABLE funcionarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, departamento_id INTEGER, FOREIGN KEY (departamento_id) REFERENCES departamentos(id))")\n\ncursor.executemany("INSERT INTO departamentos (nome) VALUES (?)", [("TI",), ("RH",), ("Vendas",), ("Juridico",)])\n\nfuncionarios = [\n    ("Ana", 1), ("Bruno", 1), ("Carla", 2),\n    ("Daniel", 3), ("Eva", 3), ("Fabio", 1),\n]\ncursor.executemany("INSERT INTO funcionarios (nome, departamento_id) VALUES (?, ?)", funcionarios)\nconexao.commit()\n\ncursor.execute("""\n    SELECT d.nome AS departamento, COUNT(f.id) AS total_funcionarios\n    FROM departamentos d\n    LEFT JOIN funcionarios f ON d.id = f.departamento_id\n    GROUP BY d.id, d.nome\n    ORDER BY total_funcionarios DESC\n""")\nfor r in cursor.fetchall():\n    print(f"{r[0]}: {r[1]} funcionario(s)")\n\nconexao.close()',
      hints: [
        'LEFT JOIN retorna todos os departamentos, mesmo sem funcionarios',
        'Use COUNT(f.id) em vez de COUNT(*) para contar apenas funcionarios reais',
        'COUNT(f.id) retorna 0 para departamentos sem funcionarios, COUNT(*) retornaria 1',
      ],
    },
    {
      id: 'sql5-c3',
      title: 'Alunos e Disciplinas (N:N)',
      description:
        'Crie um relacionamento muitos-para-muitos entre "alunos" e "disciplinas" usando uma tabela "matriculas". Insira 3 alunos, 3 disciplinas e 5 matriculas. Liste todos os alunos com suas disciplinas usando JOIN duplo.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie as 3 tabelas: alunos, disciplinas, matriculas\n\n# Insira 3 alunos e 3 disciplinas\n\n# Insira 5 matriculas (pares aluno-disciplina)\n\n# Liste alunos com suas disciplinas usando JOIN\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("CREATE TABLE alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)")\ncursor.execute("CREATE TABLE disciplinas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL)")\ncursor.execute("""\n    CREATE TABLE matriculas (\n        aluno_id INTEGER,\n        disciplina_id INTEGER,\n        PRIMARY KEY (aluno_id, disciplina_id),\n        FOREIGN KEY (aluno_id) REFERENCES alunos(id),\n        FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)\n    )\n""")\n\ncursor.executemany("INSERT INTO alunos (nome) VALUES (?)", [("Maria",), ("Joao",), ("Ana",)])\ncursor.executemany("INSERT INTO disciplinas (nome) VALUES (?)", [("Banco de Dados",), ("Algoritmos",), ("Redes",)])\n\nmatriculas = [(1, 1), (1, 2), (2, 1), (2, 3), (3, 2)]\ncursor.executemany("INSERT INTO matriculas (aluno_id, disciplina_id) VALUES (?, ?)", matriculas)\nconexao.commit()\n\ncursor.execute("""\n    SELECT a.nome AS aluno, d.nome AS disciplina\n    FROM matriculas m\n    INNER JOIN alunos a ON m.aluno_id = a.id\n    INNER JOIN disciplinas d ON m.disciplina_id = d.id\n    ORDER BY a.nome, d.nome\n""")\nfor r in cursor.fetchall():\n    print(f"{r[0]} -> {r[1]}")\n\nconexao.close()',
      hints: [
        'A tabela matriculas tem PRIMARY KEY composta: (aluno_id, disciplina_id)',
        'Use dois INNER JOINs: um para alunos e outro para disciplinas',
        'A tabela intermediaria conecta as duas tabelas principais pelo id',
      ],
    },
  ],
};
