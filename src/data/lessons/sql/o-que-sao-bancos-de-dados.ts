import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-sao-bancos-de-dados',
  moduleId: 'sql',
  title: 'O que sao Bancos de Dados',
  description:
    'Entenda o conceito de banco de dados, os tipos existentes (relacional vs NoSQL), o que e SQL e os principais SGBDs do mercado.',
  order: 0,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Um banco de dados e como uma planilha do Excel turbinada: organiza informacoes em tabelas com linhas e colunas, mas com muito mais poder!\n\n## O que e um Banco de Dados?\n\nUm **banco de dados** e como uma planilha do Excel turbinada: organiza informacoes em tabelas com linhas e colunas, mas com muito mais poder. Enquanto uma planilha funciona bem para poucas centenas de linhas, um banco de dados consegue armazenar milhoes de registros e encontrar qualquer informacao em fracao de segundos.\n\nImagine uma biblioteca: os livros sao os dados, as prateleiras sao as tabelas e o catalogo e o sistema que permite encontrar qualquer livro rapidamente. Um banco de dados funciona da mesma forma -- organiza informacoes para que possam ser acessadas de forma rapida e confiavel.\n\nSem bancos de dados, aplicacoes perderiam todos os dados ao serem reiniciadas, pois tudo ficaria apenas na memoria temporaria (a RAM do computador).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Voce ja usa bancos de dados o tempo todo sem perceber! Quando faz uma busca no Google, posta no Instagram ou confere seu saldo no app do banco, tudo isso depende de bancos de dados nos bastidores. Aprender SQL e o primeiro passo para entender como o mundo digital funciona por dentro.',
    },
    {
      type: 'text',
      content:
        '## Tipos de Bancos de Dados\n\nExistem dois grandes grupos de bancos de dados:\n\n### Bancos Relacionais (SQL)\nOrganizam dados em **tabelas** com linhas e colunas, como uma planilha. Usam a linguagem **SQL** (que voce vai aprender neste modulo!) para manipular os dados. Exemplos: **MySQL**, **PostgreSQL**, **SQLite**, **SQL Server**, **Oracle**.\n\n### Bancos Nao-Relacionais (NoSQL)\nArmazenam dados em formatos flexiveis como documentos JSON, grafos ou pares chave-valor. Exemplos: **MongoDB**, **Redis**, **Firebase**, **Cassandra**.\n\nNeste modulo, vamos focar nos **bancos relacionais** e na linguagem **SQL**, que e o padrao da industria e base para a maioria das aplicacoes.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        '**SQL** significa *Structured Query Language* (Linguagem de Consulta Estruturada). E a linguagem padrao para interagir com bancos de dados relacionais. Aprender SQL e essencial para qualquer desenvolvedor -- e a boa noticia e que a sintaxe e bem parecida com ingles!',
    },
    {
      type: 'text',
      content:
        '## O que e um SGBD?\n\nUm **SGBD** (Sistema Gerenciador de Banco de Dados) e o software responsavel por gerenciar o banco de dados. Pense nele como o "bibliotecario digital" que cuida de armazenamento, seguranca e organizacao dos dados.\n\nOs principais SGBDs do mercado sao:\n\n- **SQLite** -- Leve, embutido, sem servidor. Ideal para aprendizado e apps pequenos.\n- **MySQL** -- Popular, gratuito, usado em WordPress e muitos sites.\n- **PostgreSQL** -- Robusto, avancado, muito usado em startups e grandes empresas.\n- **SQL Server** -- Da Microsoft, muito usado em ambientes corporativos.\n\nVamos usar o **SQLite** neste modulo porque ele ja vem embutido no Python e nao precisa de instalacao!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\n# Conectando a um banco em memoria (temporario)\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Criando uma tabela simples\ncursor.execute("""\n    CREATE TABLE alunos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        curso TEXT\n    )\n""")\n\n# Inserindo dados\ncursor.execute("INSERT INTO alunos (nome, curso) VALUES (?, ?)", ("Ana", "Computacao"))\ncursor.execute("INSERT INTO alunos (nome, curso) VALUES (?, ?)", ("Bruno", "Engenharia"))\nconexao.commit()\n\n# Consultando dados\ncursor.execute("SELECT * FROM alunos")\nfor aluno in cursor.fetchall():\n    print("ID:", aluno[0], "| Nome:", aluno[1], "| Curso:", aluno[2])\n\nconexao.close()',
        filename: 'primeiro_banco.py',
        description: 'Primeiro contato com SQLite usando Python -- criando, inserindo e consultando dados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O `:memory:` cria o banco na memoria RAM, perfeito para testes. Para salvar em disco, use um nome de arquivo como `"meu_banco.db"`. O arquivo sera criado automaticamente se nao existir.',
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
        '## As 4 Operacoes Fundamentais: CRUD\n\nToda aplicacao que usa banco de dados realiza quatro tipos basicos de operacoes, conhecidas pela sigla **CRUD**:\n\n| Operacao | SQL | O que faz |\n|----------|-----|----------|\n| **C**reate (Criar) | `INSERT INTO` | Adiciona novos registros |\n| **R**ead (Ler) | `SELECT` | Busca e exibe registros |\n| **U**pdate (Atualizar) | `UPDATE` | Modifica registros existentes |\n| **D**elete (Remover) | `DELETE` | Remove registros |\n\nVoce ja viu o `SELECT` e o `INSERT`. Nos proximos modulos vai aprender todos os quatro em detalhes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'crud_completo.py',
        code: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Criar tabela\ncursor.execute("""\n    CREATE TABLE alunos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        nota REAL\n    )\n""")\n\n# CREATE: inserir registros\ncursor.execute("INSERT INTO alunos (nome, nota) VALUES (?, ?)", ("Ana", 9.5))\ncursor.execute("INSERT INTO alunos (nome, nota) VALUES (?, ?)", ("Bruno", 7.0))\nconexao.commit()\n\n# READ: buscar registros\nprint("=== Todos os alunos ===")\ncursor.execute("SELECT * FROM alunos")\nfor aluno in cursor.fetchall():\n    print(f"  {aluno[1]}: {aluno[2]}")\n\n# UPDATE: atualizar registro\ncursor.execute("UPDATE alunos SET nota = 8.5 WHERE nome = \'Bruno\'")\nconexao.commit()\nprint("\\nBruno apos atualizacao:")\ncursor.execute("SELECT nota FROM alunos WHERE nome = \'Bruno\'")\nprint(" ", cursor.fetchone()[0])  # 8.5\n\n# DELETE: remover registro\ncursor.execute("DELETE FROM alunos WHERE nota < 8.0")\nconexao.commit()\nprint("\\nApos remover notas baixas:")\ncursor.execute("SELECT nome FROM alunos")\nfor a in cursor.fetchall():\n    print(" ", a[0])\n\nconexao.close()',
        description:
          'CRUD completo em SQLite: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE).',
      },
    },
    {
      type: 'callout',
      content:
        'IMPORTANTE: Sempre use `conexao.commit()` apos INSERT, UPDATE e DELETE para salvar as mudancas no banco! O SELECT nao precisa de commit pois nao modifica dados. Esquece o commit e as mudancas nao sao salvas!',
      calloutType: 'warning',
    },
  ],
  challenges: [
    {
      id: 'sql0-c1',
      title: 'Meu Primeiro Banco de Dados',
      description:
        'Crie um banco de dados SQLite em memoria, crie uma tabela chamada "livros" com id (INTEGER PRIMARY KEY AUTOINCREMENT), titulo (TEXT NOT NULL) e autor (TEXT). Insira 2 livros e liste todos com SELECT.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela livros\n\n# Insira 2 livros\n\n# Liste todos os livros\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE livros (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titulo TEXT NOT NULL,\n        autor TEXT\n    )\n""")\n\ncursor.execute("INSERT INTO livros (titulo, autor) VALUES (?, ?)", ("Dom Casmurro", "Machado de Assis"))\ncursor.execute("INSERT INTO livros (titulo, autor) VALUES (?, ?)", ("O Alquimista", "Paulo Coelho"))\nconexao.commit()\n\ncursor.execute("SELECT * FROM livros")\nfor livro in cursor.fetchall():\n    print("ID:", livro[0], "| Titulo:", livro[1], "| Autor:", livro[2])\n\nconexao.close()',
      hints: [
        'Use CREATE TABLE para criar a tabela com as colunas especificadas',
        'Use INSERT INTO livros (titulo, autor) VALUES (?, ?) para inserir',
        'Use SELECT * FROM livros para listar todos os registros',
      ],
    },
    {
      id: 'sql0-c2',
      title: 'Explorando Tipos de Dados',
      description:
        'Crie uma tabela "produtos" com id (INTEGER), nome (TEXT), preco (REAL) e disponivel (INTEGER para simular booleano). Insira 3 produtos com precos e disponibilidade diferentes, depois liste apenas os disponiveis.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela produtos\n\n# Insira 3 produtos (use 1 para disponivel, 0 para indisponivel)\n\n# Liste apenas os produtos disponiveis (WHERE disponivel = 1)\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE produtos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        preco REAL NOT NULL,\n        disponivel INTEGER DEFAULT 1\n    )\n""")\n\nprodutos = [\n    ("Notebook", 2500.00, 1),\n    ("Mouse", 49.90, 1),\n    ("Teclado", 129.90, 0),\n]\ncursor.executemany("INSERT INTO produtos (nome, preco, disponivel) VALUES (?, ?, ?)", produtos)\nconexao.commit()\n\ncursor.execute("SELECT * FROM produtos WHERE disponivel = 1")\nfor p in cursor.fetchall():\n    print(p[1], "- R$", p[2])\n\nconexao.close()',
      hints: [
        'SQLite nao tem tipo BOOLEAN nativo, use INTEGER com 0 (falso) e 1 (verdadeiro)',
        'Use REAL para valores decimais como precos',
        'Use WHERE disponivel = 1 para filtrar apenas os disponiveis',
      ],
    },
  ],
};
