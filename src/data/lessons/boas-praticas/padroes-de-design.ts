import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'padroes-de-design',
  moduleId: 'boas-praticas',
  title: 'Padroes de Design na Pratica',
  description: 'Os padroes mais usados no dia a dia com exemplos reais e quando (nao) usar cada um',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 40,
  sections: [
    {
      type: 'text',
      content:
        '## Padroes de Design na Pratica\n\nDesign patterns sao solucoes reutilizaveis para problemas recorrentes. Nao sao receitas — sao vocabulario. Quando voce conhece os padroes, pode comunicar solucoes complexas com uma palavra.\n\nOs mais usados no dia a dia: **Singleton**, **Factory**, **Repository**, **Observer**, **Strategy**, **Decorator**.\n\nNeste modulo vamos ver os 4 com maior impacto no trabalho cotidiano, com exemplos reais — nao brinquedos academicos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# SINGLETON — configuracao que deve existir uma unica vez\nclass Config:\n    _instance = None\n\n    def __new__(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n            cls._instance.database_url = "sqlite:///app.db"\n            cls._instance.debug = False\n        return cls._instance\n\n# Sempre retorna o mesmo objeto\nconfig1 = Config()\nconfig2 = Config()\nassert config1 is config2  # True\nconfig1.debug = True\nprint(config2.debug)  # True — sao o mesmo objeto\n\n\n# FACTORY — criar objetos sem expor a logica de criacao\ndef criar_notificacao(tipo: str, mensagem: str):\n    tipos = {\n        "email": EmailNotificacao,\n        "sms": SmsNotificacao,\n        "push": PushNotificacao,\n    }\n    if tipo not in tipos:\n        raise ValueError(f"Tipo desconhecido: {tipo}")\n    return tipos[tipo](mensagem)\n\n# O chamador nao precisa saber qual classe usar\nnotif = criar_notificacao("email", "Seu pedido chegou!")\nnotif.enviar()\n\n\n# STRATEGY — trocar algoritmo em tempo de execucao\nclass Ordenador:\n    def __init__(self, estrategia):\n        self.estrategia = estrategia\n\n    def ordenar(self, lista):\n        return self.estrategia(lista)\n\n# Troca o algoritmo sem mudar o codigo do Ordenador\nord_crescente = Ordenador(sorted)\nord_reverso = Ordenador(lambda l: sorted(l, reverse=True))\nprint(ord_crescente.ordenar([3, 1, 4, 1, 5]))  # [1, 1, 3, 4, 5]\nprint(ord_reverso.ordenar([3, 1, 4, 1, 5]))    # [5, 4, 3, 1, 1]',
        filename: 'padroes_singleton_factory_strategy.py',
        description:
          'Tres padroes fundamentais com exemplos reais. Singleton garante instancia unica (configuracoes, conexoes). Factory centraliza a criacao de objetos (notificacoes, conectores de banco). Strategy permite trocar algoritmos sem mudar o codigo que os usa (ordenacao, calculo de frete).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Anti-padrao: usar Design Pattern so para parecer sofisticado. Se o padrao torna o codigo mais complexo sem beneficio claro, nao use. O codigo mais simples que resolve o problema e sempre o melhor.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import sqlite3\n\n# SEM Repository: logica de banco espalhada pelo codigo\ndef listar_usuarios_ativos():\n    conn = sqlite3.connect("app.db")\n    return conn.execute("SELECT * FROM usuarios WHERE ativo = 1").fetchall()\n\ndef buscar_usuario_por_email(email):\n    conn = sqlite3.connect("app.db")  # query copiada em outro arquivo\n    return conn.execute(\n        "SELECT * FROM usuarios WHERE email = ?", (email,)\n    ).fetchone()\n\n\n# COM Repository: banco isolado, facil de trocar ou testar\nclass UsuarioRepository:\n    def __init__(self, conn):\n        self.conn = conn\n\n    def listar_ativos(self):\n        return self.conn.execute(\n            "SELECT * FROM usuarios WHERE ativo = 1"\n        ).fetchall()\n\n    def buscar_por_email(self, email: str):\n        return self.conn.execute(\n            "SELECT * FROM usuarios WHERE email = ?", (email,)\n        ).fetchone()\n\n    def salvar(self, usuario: dict) -> int:\n        cursor = self.conn.execute(\n            "INSERT INTO usuarios (nome, email, ativo) VALUES (?,?,?)",\n            (usuario["nome"], usuario["email"], True)\n        )\n        self.conn.commit()\n        return cursor.lastrowid\n\n\n# Uso: o service nao importa sqlite3, nao sabe como o banco funciona\nconn = sqlite3.connect("app.db")\nrepo = UsuarioRepository(conn)\nusuarios = repo.listar_ativos()\nnovo_id = repo.salvar({"nome": "Ana", "email": "ana@email.com"})',
        filename: 'repository_pattern.py',
        description:
          'O Repository e o padrao mais impactante para backend. Sem ele, queries SQL ficam espalhadas pelo codigo — trocar de SQLite para PostgreSQL exige mudar dezenas de arquivos. Com Repository, voce so reescreve a classe de repositorio.',
      },
    },
    {
      type: 'text',
      content:
        '## Quando NAO usar padroes\n\nOver-engineering e um problema real. Sinais de que voce esta exagerando:\n\n**(1) Factory que cria so um tipo**\nSe sua Factory so cria `EmailNotificacao`, e um `if` que pode ser uma linha simples.\n\n**(2) Singleton que e so uma variavel global disfarfada**\nSe voce pode resolver com `CONFIG = {"debug": False}`, nao precisa de Singleton.\n\n**(3) Classe com nome `AbstractFactoryBuilderStrategy`**\nSe o nome da classe tem mais de dois substantivos, algo esta errado.\n\n**(4) Voce esta aplicando o padrao antes de sentir a dor**\nA regra de ouro: aplique um padrao apenas quando voce sente a dor que ele resolve. Factory faz sentido quando voce tem 3+ tipos de objetos sendo criados em 5+ lugares diferentes.',
    },
  ],
  challenges: [
    {
      id: 'padroes-c1',
      title: 'Identifique o Padrao',
      description:
        'Os 4 trechos de codigo abaixo usam, cada um, um dos padroes ensinados (Singleton, Factory, Strategy, Repository). Para cada trecho, identifique o padrao e escreva em comentario por que ele esta sendo usado aqui.',
      language: 'python',
      starterCode:
        '# Trecho 1: qual padrao e esse? Por que foi usado?\nclass Logger:\n    _unica_instancia = None\n    def __new__(cls):\n        if cls._unica_instancia is None:\n            cls._unica_instancia = super().__new__(cls)\n            cls._unica_instancia.logs = []\n        return cls._unica_instancia\n# Padrao: ___\n# Por que: ___\n\n# Trecho 2: qual padrao e esse? Por que foi usado?\ndef criar_conector_de_banco(tipo):\n    conectores = {"sqlite": SqliteConector, "postgres": PostgresConector, "mysql": MySQLConector}\n    return conectores[tipo]()\n# Padrao: ___\n# Por que: ___\n\n# Trecho 3: qual padrao e esse? Por que foi usado?\nclass Exportador:\n    def __init__(self, formato):\n        self.formato = formato\n    def exportar(self, dados):\n        return self.formato(dados)\npdf = Exportador(exportar_como_pdf)\nexcel = Exportador(exportar_como_excel)\n# Padrao: ___\n# Por que: ___\n\n# Trecho 4: qual padrao e esse? Por que foi usado?\nclass PedidoRepository:\n    def __init__(self, conn): self.conn = conn\n    def buscar_por_id(self, id): return self.conn.execute("SELECT * FROM pedidos WHERE id=?", (id,)).fetchone()\n    def listar_pendentes(self): return self.conn.execute("SELECT * FROM pedidos WHERE status=\'pendente\'").fetchall()\n    def salvar(self, pedido): self.conn.execute("INSERT INTO pedidos...", (pedido["total"], pedido["status"]))\n# Padrao: ___\n# Por que: ___\n',
      solution:
        '# Trecho 1:\n# Padrao: Singleton\n# Por que: Logger deve ser unico — se cada parte do sistema criasse seu proprio Logger,\n# os logs ficariam fragmentados em objetos diferentes. Com Singleton, todos\n# escrevem no mesmo objeto e o historico e completo.\n\n# Trecho 2:\n# Padrao: Factory\n# Por que: o tipo de banco pode variar por ambiente (SQLite em dev, Postgres em prod).\n# A Factory centraliza essa logica: quem chama so passa o tipo e recebe o conector\n# correto, sem saber qual classe instanciar.\n\n# Trecho 3:\n# Padrao: Strategy\n# Por que: exportar dados pode ser feito em varios formatos (PDF, Excel, CSV).\n# O Strategy permite trocar o algoritmo de exportacao sem mudar a classe Exportador.\n# Adicionar um novo formato e so criar uma nova funcao e passa-la como estrategia.\n\n# Trecho 4:\n# Padrao: Repository\n# Por que: as queries SQL ficam isoladas nesta classe. O restante do sistema\n# (services, routes) nao precisa conhecer SQL nem importar sqlite3.\n# Trocar o banco de dados exige reescrever apenas esta classe.\n',
      hints: [
        'Singleton: procure por um atributo de classe que armazena "a unica instancia" e um __new__ que verifica se ela existe',
        'Factory: procure por uma funcao ou metodo que recebe um "tipo" e retorna um objeto diferente dependendo desse tipo',
        'Strategy: procure por uma classe que recebe uma funcao/objeto no construtor e a usa para executar uma tarefa',
      ],
    },
    {
      id: 'padroes-c2',
      title: 'Implemente o Repository',
      description:
        'A rota Flask abaixo tem 3 queries SQL diretamente no codigo da rota. Extraia um ProdutoRepository que encapsule todo o acesso ao banco, e reescreva a rota para usar o repositorio — sem importar sqlite3 diretamente na rota.',
      language: 'python',
      starterCode:
        '# Rota com queries SQL inline — extraia um ProdutoRepository\nimport sqlite3\nfrom flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\n@app.route("/produtos", methods=["GET"])\ndef listar_produtos():\n    conn = sqlite3.connect("loja.db")\n    # Query 1: listar todos os produtos ativos\n    produtos = conn.execute(\n        "SELECT id, nome, preco, estoque FROM produtos WHERE ativo = 1"\n    ).fetchall()\n    conn.close()\n    return jsonify([dict(p) for p in produtos])\n\n@app.route("/produtos/<int:produto_id>", methods=["GET"])\ndef buscar_produto(produto_id):\n    conn = sqlite3.connect("loja.db")\n    # Query 2: buscar produto por ID\n    produto = conn.execute(\n        "SELECT id, nome, preco, estoque FROM produtos WHERE id = ?",\n        (produto_id,)\n    ).fetchone()\n    conn.close()\n    if produto is None:\n        return jsonify({"erro": "Produto nao encontrado"}), 404\n    return jsonify(dict(produto))\n\n@app.route("/produtos", methods=["POST"])\ndef criar_produto():\n    dados = request.json\n    conn = sqlite3.connect("loja.db")\n    # Query 3: inserir novo produto\n    cursor = conn.execute(\n        "INSERT INTO produtos (nome, preco, estoque, ativo) VALUES (?, ?, ?, 1)",\n        (dados["nome"], dados["preco"], dados["estoque"])\n    )\n    conn.commit()\n    novo_id = cursor.lastrowid\n    conn.close()\n    return jsonify({"id": novo_id, "mensagem": "Produto criado"}), 201\n',
      solution:
        'import sqlite3\nfrom flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\n\nclass ProdutoRepository:\n    def __init__(self, conn):\n        self.conn = conn\n\n    def listar_ativos(self):\n        return self.conn.execute(\n            "SELECT id, nome, preco, estoque FROM produtos WHERE ativo = 1"\n        ).fetchall()\n\n    def buscar_por_id(self, produto_id: int):\n        return self.conn.execute(\n            "SELECT id, nome, preco, estoque FROM produtos WHERE id = ?",\n            (produto_id,)\n        ).fetchone()\n\n    def criar(self, nome: str, preco: float, estoque: int) -> int:\n        cursor = self.conn.execute(\n            "INSERT INTO produtos (nome, preco, estoque, ativo) VALUES (?, ?, ?, 1)",\n            (nome, preco, estoque)\n        )\n        self.conn.commit()\n        return cursor.lastrowid\n\n\ndef get_repo():\n    conn = sqlite3.connect("loja.db")\n    return ProdutoRepository(conn)\n\n\n@app.route("/produtos", methods=["GET"])\ndef listar_produtos():\n    repo = get_repo()\n    produtos = repo.listar_ativos()\n    return jsonify([dict(p) for p in produtos])\n\n@app.route("/produtos/<int:produto_id>", methods=["GET"])\ndef buscar_produto(produto_id):\n    repo = get_repo()\n    produto = repo.buscar_por_id(produto_id)\n    if produto is None:\n        return jsonify({"erro": "Produto nao encontrado"}), 404\n    return jsonify(dict(produto))\n\n@app.route("/produtos", methods=["POST"])\ndef criar_produto():\n    dados = request.json\n    repo = get_repo()\n    novo_id = repo.criar(dados["nome"], dados["preco"], dados["estoque"])\n    return jsonify({"id": novo_id, "mensagem": "Produto criado"}), 201\n',
      hints: [
        'O Repository so deve conter queries SQL — cada query vira um metodo com nome descritivo',
        'A rota nao deve importar sqlite3 diretamente — a conexao fica dentro do Repository ou e injetada',
        'Cada operacao de banco vira um metodo do Repository: listar_ativos(), buscar_por_id(), criar()',
      ],
    },
  ],
};
