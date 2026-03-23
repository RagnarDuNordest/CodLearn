import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'filtros-e-ordenacao',
  moduleId: 'sql',
  title: 'Filtros e Ordenacao',
  description:
    'Domine os filtros avancados com WHERE (AND, OR, NOT, IN, BETWEEN, LIKE), ordene resultados com ORDER BY, limite com LIMIT e elimine duplicatas com DISTINCT.',
  order: 3,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'WHERE e como um filtro para dados: so mostra o que voce quer ver. ORDER BY organiza os resultados como voce preferir!\n\n## WHERE Avancado -- Combinando Condicoes\n\nNa licao anterior, usamos WHERE com condicoes simples. Agora vamos combinar varias condicoes usando **operadores logicos**:\n\n- **AND** -- Ambas as condicoes devem ser verdadeiras\n- **OR** -- Pelo menos uma condicao deve ser verdadeira\n- **NOT** -- Inverte a condicao (nega o resultado)\n\nVoce pode combinar quantas condicoes quiser e usar parenteses para controlar a prioridade.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- AND: ambas as condicoes devem ser verdadeiras\nSELECT * FROM produtos\nWHERE categoria = "Eletronicos" AND preco < 500;\n\n-- OR: pelo menos uma condicao verdadeira\nSELECT * FROM produtos\nWHERE categoria = "Eletronicos" OR categoria = "Informatica";\n\n-- NOT: inverte a condicao\nSELECT * FROM produtos\nWHERE NOT categoria = "Roupas";\n\n-- Combinando com parenteses\nSELECT * FROM produtos\nWHERE (categoria = "Eletronicos" OR categoria = "Informatica")\n  AND preco BETWEEN 100 AND 1000;',
        filename: 'where_avancado.sql',
        description: 'Combinando condicoes com AND, OR e NOT.',
      },
    },
    {
      type: 'text',
      content:
        '## IN, BETWEEN e LIKE\n\nAlem dos operadores basicos, SQL oferece operadores especiais para filtros mais expressivos:\n\n- **IN (valor1, valor2, ...)** -- Verifica se o valor esta em uma lista\n- **BETWEEN valor1 AND valor2** -- Verifica se o valor esta em um intervalo (inclusivo)\n- **LIKE padrao** -- Busca por padroes em textos\n  - `%` -- Qualquer sequencia de caracteres\n  - `_` -- Exatamente um caractere',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- IN: verificar se esta em uma lista\nSELECT * FROM funcionarios\nWHERE departamento IN ("TI", "Marketing", "Vendas");\n\n-- BETWEEN: verificar intervalo (inclusivo)\nSELECT * FROM produtos\nWHERE preco BETWEEN 50 AND 200;\n-- Equivale a: preco >= 50 AND preco <= 200\n\n-- LIKE: buscar padroes em texto\nSELECT * FROM clientes WHERE nome LIKE "Ana%";\n-- Nomes que comecam com "Ana"\n\nSELECT * FROM clientes WHERE email LIKE "%@gmail.com";\n-- Emails que terminam com @gmail.com\n\nSELECT * FROM clientes WHERE nome LIKE "%Silva%";\n-- Nomes que contem "Silva" em qualquer posicao\n\nSELECT * FROM clientes WHERE nome LIKE "_arla";\n-- Nomes com 5 letras terminando em "arla" (Carla, Marla...)',
        filename: 'in_between_like.sql',
        description: 'Usando IN, BETWEEN e LIKE para filtros avancados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        '**LIKE** e case-insensitive no SQLite por padrao para caracteres ASCII. Para busca case-sensitive, use o operador **GLOB** (que usa `*` no lugar de `%` e `?` no lugar de `_`).',
    },
    {
      type: 'text',
      content:
        '## ORDER BY, LIMIT e DISTINCT\n\nPara organizar e limitar os resultados:\n\n- **ORDER BY coluna** -- Ordena os resultados (ASC = crescente, DESC = decrescente)\n- **LIMIT n** -- Retorna apenas os primeiros n registros\n- **LIMIT n OFFSET m** -- Pula m registros e retorna n (paginacao)\n- **DISTINCT** -- Remove linhas duplicadas do resultado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        code: '-- ORDER BY: ordenar resultados\nSELECT * FROM produtos ORDER BY preco ASC;\n-- Do mais barato ao mais caro\n\nSELECT * FROM produtos ORDER BY preco DESC;\n-- Do mais caro ao mais barato\n\n-- Ordenar por multiplas colunas\nSELECT * FROM funcionarios\nORDER BY departamento ASC, salario DESC;\n\n-- LIMIT: limitar quantidade de resultados\nSELECT * FROM produtos ORDER BY preco DESC LIMIT 5;\n-- Top 5 mais caros\n\n-- LIMIT com OFFSET: paginacao\nSELECT * FROM produtos ORDER BY nome LIMIT 10 OFFSET 20;\n-- Pula 20 registros, retorna os proximos 10\n\n-- DISTINCT: remover duplicatas\nSELECT DISTINCT categoria FROM produtos;\n-- Lista cada categoria uma unica vez\n\nSELECT DISTINCT departamento, cargo FROM funcionarios;\n-- Combinacoes unicas de departamento e cargo',
        filename: 'orderby_limit_distinct.sql',
        description: 'Ordenando, limitando e removendo duplicatas dos resultados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'A ordem dos comandos em uma query SQL segue uma sequencia fixa: **SELECT** > **FROM** > **WHERE** > **ORDER BY** > **LIMIT**. Alterar essa ordem causa erro de sintaxe!',
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
        '## Tratando Valores Nulos: IS NULL e IS NOT NULL\n\nNo SQL, **NULL** representa a ausencia de valor (nao e zero, nao e string vazia — e literalmente "nenhum valor"). Para filtrar registros com ou sem valor:\n\n- **`IS NULL`** — Verdadeiro quando o campo nao tem valor\n- **`IS NOT NULL`** — Verdadeiro quando o campo tem algum valor\n\nNota importante: voce **nao pode** usar `= NULL` ou `!= NULL` — esses comparadores nao funcionam com NULL. Sempre use `IS NULL` e `IS NOT NULL`.\n\nTambem e util a funcao **`COALESCE(coluna, valor_padrao)`** que retorna o primeiro valor nao-nulo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'sql',
        filename: 'null_coalesce.sql',
        code: '-- Buscar clientes sem telefone cadastrado\nSELECT nome, email FROM clientes\nWHERE telefone IS NULL;\n\n-- Buscar apenas clientes com telefone\nSELECT nome, telefone FROM clientes\nWHERE telefone IS NOT NULL;\n\n-- ERRADO (nao funciona com NULL):\n-- WHERE telefone = NULL      (nunca retorna nada!)\n-- WHERE telefone != NULL     (tambem nao funciona!)\n\n-- COALESCE: usar valor padrao quando e NULL\nSELECT\n    nome,\n    COALESCE(telefone, "Nao informado") AS telefone_exibido,\n    COALESCE(cidade, "Cidade desconhecida") AS cidade_exibida\nFROM clientes;\n\n-- Ordenar com NULLs por ultimo\nSELECT nome, telefone FROM clientes\nORDER BY\n    CASE WHEN telefone IS NULL THEN 1 ELSE 0 END,\n    nome ASC;',
        description:
          'IS NULL e IS NOT NULL para filtrar valores ausentes. COALESCE para valores padrao.',
      },
    },
  ],
  challenges: [
    {
      id: 'sql3-c1',
      title: 'Loja de Eletronicos',
      description:
        'Crie uma tabela "produtos" com id, nome, preco, categoria e estoque. Insira 6 produtos variados. Use WHERE com AND para listar produtos da categoria "Eletronicos" com preco abaixo de 500, ordenados por preco crescente.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela produtos\n\n# Insira 6 produtos (inclua pelo menos 3 eletronicos)\n\n# Consulte: eletronicos com preco < 500, ordenados por preco\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE produtos (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        preco REAL NOT NULL,\n        categoria TEXT NOT NULL,\n        estoque INTEGER DEFAULT 0\n    )\n""")\n\nprodutos = [\n    ("Fone Bluetooth", 89.90, "Eletronicos", 50),\n    ("Notebook", 3500.00, "Eletronicos", 10),\n    ("Mouse Gamer", 150.00, "Eletronicos", 30),\n    ("Camiseta", 49.90, "Roupas", 100),\n    ("Teclado Mecanico", 350.00, "Eletronicos", 25),\n    ("Mochila", 120.00, "Acessorios", 40),\n]\ncursor.executemany("INSERT INTO produtos (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)", produtos)\nconexao.commit()\n\nprint("Eletronicos com preco abaixo de R$500:")\ncursor.execute("SELECT nome, preco FROM produtos WHERE categoria = \'Eletronicos\' AND preco < 500 ORDER BY preco ASC")\nfor p in cursor.fetchall():\n    print(f"  {p[0]}: R${p[1]:.2f}")\n\nconexao.close()',
      hints: [
        'Combine WHERE categoria = "Eletronicos" AND preco < 500',
        'Use ORDER BY preco ASC para ordenar do menor para o maior',
        'Insira produtos de diferentes categorias para testar o filtro',
      ],
    },
    {
      id: 'sql3-c2',
      title: 'Busca e Paginacao',
      description:
        'Crie uma tabela "clientes" com id, nome, cidade e idade. Insira 8 clientes. Faca 3 consultas: use LIKE para buscar nomes que comecam com "M", use BETWEEN para idades entre 20 e 30, e use LIMIT para pegar os 3 primeiros por ordem alfabetica.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela clientes\n\n# Insira 8 clientes\n\n# Consulta 1: Nomes que comecam com "M" (LIKE)\n\n# Consulta 2: Idades entre 20 e 30 (BETWEEN)\n\n# Consulta 3: Primeiros 3 por ordem alfabetica (ORDER BY + LIMIT)\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE clientes (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        nome TEXT NOT NULL,\n        cidade TEXT,\n        idade INTEGER\n    )\n""")\n\nclientes = [\n    ("Maria", "Sao Paulo", 28),\n    ("Bruno", "Rio de Janeiro", 35),\n    ("Marcos", "Belo Horizonte", 22),\n    ("Ana", "Curitiba", 19),\n    ("Marina", "Salvador", 31),\n    ("Pedro", "Brasilia", 25),\n    ("Julia", "Fortaleza", 27),\n    ("Miguel", "Recife", 20),\n]\ncursor.executemany("INSERT INTO clientes (nome, cidade, idade) VALUES (?, ?, ?)", clientes)\nconexao.commit()\n\nprint("=== Nomes que comecam com M ===")\ncursor.execute("SELECT nome, cidade FROM clientes WHERE nome LIKE \'M%\'")\nfor c in cursor.fetchall():\n    print(f"  {c[0]} - {c[1]}")\n\nprint("\\n=== Idades entre 20 e 30 ===")\ncursor.execute("SELECT nome, idade FROM clientes WHERE idade BETWEEN 20 AND 30")\nfor c in cursor.fetchall():\n    print(f"  {c[0]}: {c[1]} anos")\n\nprint("\\n=== Top 3 por ordem alfabetica ===")\ncursor.execute("SELECT nome FROM clientes ORDER BY nome ASC LIMIT 3")\nfor c in cursor.fetchall():\n    print(f"  {c[0]}")\n\nconexao.close()',
      hints: [
        'Use LIKE "M%" para nomes que comecam com M (% = qualquer coisa depois)',
        'BETWEEN 20 AND 30 inclui tanto 20 quanto 30',
        'ORDER BY nome ASC LIMIT 3 ordena e pega os 3 primeiros',
      ],
    },
    {
      id: 'sql3-c3',
      title: 'Categorias Unicas',
      description:
        'Crie uma tabela "livros" com id, titulo, autor, genero e ano. Insira 6 livros de generos variados (alguns repetidos). Use DISTINCT para listar os generos unicos, depois liste livros do genero "Ficcao" ordenados por ano decrescente.',
      language: 'sql',
      starterCode: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\n# Crie a tabela livros\n\n# Insira 6 livros (com generos repetidos)\n\n# Consulta 1: Generos unicos (DISTINCT)\n\n# Consulta 2: Livros de "Ficcao" ordenados por ano DESC\n\nconexao.close()',
      solution: 'import sqlite3\n\nconexao = sqlite3.connect(":memory:")\ncursor = conexao.cursor()\n\ncursor.execute("""\n    CREATE TABLE livros (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        titulo TEXT NOT NULL,\n        autor TEXT NOT NULL,\n        genero TEXT,\n        ano INTEGER\n    )\n""")\n\nlivros = [\n    ("Duna", "Frank Herbert", "Ficcao", 1965),\n    ("1984", "George Orwell", "Ficcao", 1949),\n    ("O Hobbit", "Tolkien", "Fantasia", 1937),\n    ("Neuromancer", "William Gibson", "Ficcao", 1984),\n    ("Sapiens", "Yuval Harari", "Historia", 2011),\n    ("O Senhor dos Aneis", "Tolkien", "Fantasia", 1954),\n]\ncursor.executemany("INSERT INTO livros (titulo, autor, genero, ano) VALUES (?, ?, ?, ?)", livros)\nconexao.commit()\n\nprint("=== Generos disponiveis ===")\ncursor.execute("SELECT DISTINCT genero FROM livros ORDER BY genero")\nfor g in cursor.fetchall():\n    print(f"  {g[0]}")\n\nprint("\\n=== Ficcao (mais recentes primeiro) ===")\ncursor.execute("SELECT titulo, autor, ano FROM livros WHERE genero = \'Ficcao\' ORDER BY ano DESC")\nfor l in cursor.fetchall():\n    print(f"  {l[0]} ({l[2]}) - {l[1]}")\n\nconexao.close()',
      hints: [
        'Use SELECT DISTINCT genero FROM livros para listar generos unicos',
        'Combine WHERE genero = "Ficcao" com ORDER BY ano DESC',
        'DESC significa decrescente (do mais recente ao mais antigo)',
      ],
    },
  ],
};
