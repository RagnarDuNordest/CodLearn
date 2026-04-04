import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lendo-codigo-de-producao',
  moduleId: 'leitura-codigo',
  title: 'Lendo Codigo de Producao Real',
  description: 'Como navegar em bases de codigo grandes sem se perder',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## Codigo de producao e diferente do codigo de tutorial\n\nO codigo que voce ve em tutoriais e limpo, bem comentado, focado em um conceito. O codigo de producao e diferente:\n\n- E **mais longo** — arquivos com centenas de linhas sao comuns\n- Tem **mais casos extremos** — trata erros que voce nunca pensaria\n- Usa **abreviacoes** — nomes curtos que fazem sentido apenas com contexto\n- Tem **partes legadas** — codigo antigo que ninguem quer mexer\n- **Trata erros em todo lugar** — try/except, validacoes, logs\n\nA estrategia para nao se perder: **camadas de entendimento**.\n\n### As 3 camadas de entendimento\n\n**Camada 1 — O que este arquivo/modulo FAZ?** (30 segundos)\nLeia o nome do arquivo, os imports, as classes e funcoes no topo. Forme uma hipotese: "esse arquivo parece lidar com autenticacao de usuarios".\n\n**Camada 2 — Quais sao as funcoes/classes principais?** (2 minutos)\nLeia apenas as assinaturas (nomes e parametros). Nao entre nos corpos ainda. Construa o mapa.\n\n**Camada 3 — Como uma funcionalidade especifica funciona?** (tempo variavel)\nSo entao va fundo em UMA funcao especifica que voce precisa entender. Ignore o resto.\n\nA tentacao e pular direto para a Camada 3. Resista.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, request, jsonify\nfrom functools import wraps\nimport hashlib\nimport time\n\napp = Flask(__name__)\nusers_db = {}\nsessions = {}\n\ndef require_auth(f):\n    @wraps(f)\n    def decorated(*args, **kwargs):\n        token = request.headers.get("Authorization", "").replace("Bearer ", "")\n        if token not in sessions:\n            return jsonify({"error": "nao autorizado"}), 401\n        if sessions[token]["expires"] < time.time():\n            del sessions[token]\n            return jsonify({"error": "sessao expirada"}), 401\n        return f(*args, **kwargs)\n    return decorated\n\n@app.route("/register", methods=["POST"])\ndef register():\n    data = request.get_json()\n    if not data or "email" not in data or "password" not in data:\n        return jsonify({"error": "dados invalidos"}), 400\n    email = data["email"].lower().strip()\n    if email in users_db:\n        return jsonify({"error": "email ja cadastrado"}), 409\n    pwd_hash = hashlib.sha256(data["password"].encode()).hexdigest()\n    users_db[email] = {"email": email, "password": pwd_hash, "created": time.time()}\n    return jsonify({"message": "usuario criado"}), 201\n\n@app.route("/login", methods=["POST"])\ndef login():\n    data = request.get_json()\n    if not data:\n        return jsonify({"error": "dados invalidos"}), 400\n    email = data.get("email", "").lower()\n    user = users_db.get(email)\n    if not user:\n        return jsonify({"error": "credenciais invalidas"}), 401\n    pwd_hash = hashlib.sha256(data.get("password", "").encode()).hexdigest()\n    if pwd_hash != user["password"]:\n        return jsonify({"error": "credenciais invalidas"}), 401\n    token = hashlib.sha256(f"{email}{time.time()}".encode()).hexdigest()\n    sessions[token] = {"email": email, "expires": time.time() + 3600}\n    return jsonify({"token": token})\n\n@app.route("/profile", methods=["GET"])\n@require_auth\ndef profile():\n    token = request.headers.get("Authorization", "").replace("Bearer ", "")\n    email = sessions[token]["email"]\n    user = users_db[email]\n    return jsonify({"email": user["email"], "created": user["created"]})',
        filename: 'auth_api.py',
        description:
          'Camada 1 (30s): arquivo de autenticacao com Flask. Camada 2 (2min): 4 funcoes — require_auth (decorator), register, login, profile. Camada 3 (se necessario): escolha UMA e leia em detalhe. Perceba como cada rota trata erros antes da logica principal.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Em projetos reais, use Ctrl+F (buscar). Se voce quer entender onde uma variavel e usada, busque seu nome no projeto inteiro. IDEs como VSCode mostram todas as referencias com "Find All References" (Alt+Shift+F12). Isso e muito mais eficiente do que ler cada arquivo linearmente.',
    },
    {
      type: 'text',
      content:
        '## 4 estrategias para ler codigo que voce nao escreveu\n\n**1. Execute primeiro**\nAntes de ler o codigo, execute-o. Veja o que ele faz do ponto de vista do usuario. Isso cria contexto para o que voce vai ler.\n\n**2. Leia os testes**\nArquivos de teste (test_*.py, *.test.js) documentam o comportamento esperado em exemplos concretos. Muitas vezes sao mais claros que o codigo em si.\n\n**3. Leia o historico do git**\n`git log --oneline` mostra as mudancas recentes. `git blame arquivo.py` mostra quem escreveu cada linha e quando. As mensagens de commit explicam o MOTIVO das mudancas.\n\n**4. Procure o README e comentarios inline**\nDocumentacao ruim e melhor que nenhuma. Mesmo READMEs desatualizados dao contexto sobre as intencoes originais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import time\n\nclass CacheLRU:\n    def __init__(self, capacidade):\n        self.capacidade = capacidade\n        self.cache = {}          # chave -> valor\n        self.ordem = []          # lista de chaves em ordem de acesso\n\n    def get(self, chave):\n        if chave not in self.cache:\n            return None\n        # Atualiza ordem: move para o final (mais recentemente usado)\n        self.ordem.remove(chave)\n        self.ordem.append(chave)\n        return self.cache[chave]\n\n    def set(self, chave, valor):\n        if chave in self.cache:\n            # Atualiza existente: remove da ordem atual\n            self.ordem.remove(chave)\n        elif len(self.cache) >= self.capacidade:\n            # Cache cheio: remove o menos recentemente usado (primeiro da lista)\n            mais_antigo = self.ordem.pop(0)\n            del self.cache[mais_antigo]\n        self.cache[chave] = valor\n        self.ordem.append(chave)  # adiciona como mais recente\n\n    def tamanho(self):\n        return len(self.cache)\n\n# Como abordar este codigo:\n# 1. Execute: CacheLRU(2), set("a",1), set("b",2), get("a"), set("c",3)\n#    -> "b" foi o menos usado, entao "b" e removido quando "c" entra\n# 2. Entenda as estruturas: cache (dados) + ordem (rastreia uso)\n# 3. So entao leia o algoritmo de eviction no metodo set()',
        filename: 'cache_lru.py',
        description:
          'Um cache LRU (Least Recently Used) — algoritmo classico de producao. A estrategia: primeiro entenda PARA QUE serve (cache que descarta o item menos usado), depois como funciona (duas estruturas em sincronia).',
      },
    },
  ],
  challenges: [
    {
      id: 'producao-c1',
      title: 'Analise de Modulo Real',
      description:
        'Leia o modulo de rate limiter abaixo e responda nos comentarios: o que esse modulo faz? Quais sao as entradas e saidas de cada funcao? Quando voce usaria isso em um projeto real?',
      language: 'python',
      starterCode:
        'import time\nfrom collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests, window_seconds):\n        self.max_requests = max_requests\n        self.window = window_seconds\n        self.requests = defaultdict(list)\n\n    def is_allowed(self, client_id):\n        now = time.time()\n        historico = self.requests[client_id]\n        recentes = [t for t in historico if now - t < self.window]\n        self.requests[client_id] = recentes\n        if len(recentes) >= self.max_requests:\n            return False\n        self.requests[client_id].append(now)\n        return True\n\n    def reset(self, client_id):\n        if client_id in self.requests:\n            del self.requests[client_id]\n\n    def status(self, client_id):\n        now = time.time()\n        recentes = [t for t in self.requests[client_id] if now - t < self.window]\n        return {\n            "usado": len(recentes),\n            "limite": self.max_requests,\n            "restante": max(0, self.max_requests - len(recentes))\n        }\n\n# ANALISE:\n#\n# O que este modulo faz:\n# ???\n#\n# is_allowed(client_id):\n#   - Entrada: ???\n#   - Saida: ???\n#   - Logica: ???\n#\n# reset(client_id):\n#   - Entrada: ???\n#   - Saida: ???\n#\n# status(client_id):\n#   - Entrada: ???\n#   - Saida: ???\n#\n# Quando usar em producao:\n# ???\n',
      solution:
        'import time\nfrom collections import defaultdict\n\nclass RateLimiter:\n    def __init__(self, max_requests, window_seconds):\n        self.max_requests = max_requests\n        self.window = window_seconds\n        self.requests = defaultdict(list)\n\n    def is_allowed(self, client_id):\n        now = time.time()\n        historico = self.requests[client_id]\n        recentes = [t for t in historico if now - t < self.window]\n        self.requests[client_id] = recentes\n        if len(recentes) >= self.max_requests:\n            return False\n        self.requests[client_id].append(now)\n        return True\n\n    def reset(self, client_id):\n        if client_id in self.requests:\n            del self.requests[client_id]\n\n    def status(self, client_id):\n        now = time.time()\n        recentes = [t for t in self.requests[client_id] if now - t < self.window]\n        return {\n            "usado": len(recentes),\n            "limite": self.max_requests,\n            "restante": max(0, self.max_requests - len(recentes))\n        }\n\n# ANALISE:\n#\n# O que este modulo faz:\n# Limita quantas requisicoes um cliente pode fazer em uma janela de tempo.\n# Ex: max 100 requisicoes por minuto por cliente.\n#\n# is_allowed(client_id):\n#   - Entrada: identificador do cliente (string, ex: IP ou user ID)\n#   - Saida: True se a requisicao e permitida, False se o limite foi atingido\n#   - Logica: filtra apenas requisicoes dentro da janela de tempo,\n#             limpa as antigas, verifica se ainda ha espaco, registra a nova\n#\n# reset(client_id):\n#   - Entrada: identificador do cliente\n#   - Saida: None (modifica estado interno)\n#   - Funcao: limpa o historico de um cliente, como se ele nunca tivesse feito requisicoes\n#\n# status(client_id):\n#   - Entrada: identificador do cliente\n#   - Saida: dicionario com usado, limite e restante\n#   - Util para mostrar ao cliente quantas requisicoes ainda tem disponivel\n#\n# Quando usar em producao:\n# Em APIs publicas para prevenir abuso, em sistemas de login para bloquear\n# brute force, em qualquer endpoint que precise de controle de acesso por frequencia.\n',
      hints: [
        'Comece pelo __init__: quais sao os parametros de configuracao? max_requests e window_seconds dizem tudo sobre o proposito.',
        'Em is_allowed, a linha "recentes = [t for t in historico if now - t < self.window]" e um filter loop — filtra requisicoes dentro da janela de tempo.',
        'defaultdict(list) cria automaticamente uma lista vazia para qualquer chave nova — isso evita KeyError quando um cliente acessa pela primeira vez.',
      ],
    },
    {
      id: 'producao-c2',
      title: 'Encontre o Bug Lendo o Codigo',
      description:
        'A funcao abaixo tem um bug sutil. Encontre-o apenas lendo o codigo, sem executar. Explique qual e o bug e por que ele causa problemas.',
      language: 'python',
      starterCode:
        'def paginar_resultados(itens, pagina, itens_por_pagina):\n    """\n    Retorna uma pagina de resultados.\n    pagina: numero da pagina (comeca em 1)\n    itens_por_pagina: quantos itens por pagina\n    """\n    if not itens:\n        return []\n    if pagina < 1:\n        pagina = 1\n\n    inicio = (pagina - 1) * itens_por_pagina\n    fim = inicio + itens_por_pagina\n\n    if inicio > len(itens):\n        return []\n\n    return itens[inicio:fim]\n\n# Teste mental:\n# itens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n# paginar_resultados(itens, 1, 3) deveria retornar [1, 2, 3] -> retorna ???\n# paginar_resultados(itens, 2, 3) deveria retornar [4, 5, 6] -> retorna ???\n# paginar_resultados(itens, 4, 3) deveria retornar [10]      -> retorna ???\n#\n# BUG ENCONTRADO:\n# ???\n#\n# POR QUE E UM BUG:\n# ???\n',
      solution:
        'def paginar_resultados(itens, pagina, itens_por_pagina):\n    """\n    Retorna uma pagina de resultados.\n    pagina: numero da pagina (comeca em 1)\n    itens_por_pagina: quantos itens por pagina\n    """\n    if not itens:\n        return []\n    if pagina < 1:\n        pagina = 1\n\n    inicio = (pagina - 1) * itens_por_pagina\n    fim = inicio + itens_por_pagina\n\n    if inicio > len(itens):\n        return []\n\n    return itens[inicio:fim]\n\n# Teste mental:\n# itens = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  (10 elementos)\n# paginar_resultados(itens, 1, 3) -> inicio=0, fim=3 -> [1, 2, 3]  CORRETO\n# paginar_resultados(itens, 2, 3) -> inicio=3, fim=6 -> [4, 5, 6]  CORRETO\n# paginar_resultados(itens, 4, 3) -> inicio=9, fim=12 -> [10]       CORRETO\n#\n# BUG ENCONTRADO:\n# A condicao de guarda usa "inicio > len(itens)" com > estrito.\n# Quando inicio == len(itens) (ex: pagina 5 com 3 itens: inicio=12, len=10),\n# a condicao e falsa e itens[12:15] retorna [] de qualquer forma.\n# MAS: se inicio == len(itens) exatamente, como em itens com 9 elementos e pagina=4\n# (inicio=9, len=9), a condicao falha e tenta fatiar itens[9:12] = [] -- ok nesse caso.\n#\n# O bug real: a condicao deveria ser "inicio >= len(itens)" para ser explicita\n# e mais legivel. Com ">", o codigo funciona por acidente (Python retorna [])\n# para slices fora do range, mas a intencao do guard nao esta clara.\n# Em linguagens como C/Java, isso seria um off-by-one critico.\n',
      hints: [
        'Trace mentalmente com itens=[1..10], pagina=4, itens_por_pagina=3: qual e o valor de inicio? Qual e o len(itens)?',
        'A condicao de guarda usa > (maior que). Considere o caso onde inicio == len(itens). O que acontece?',
        'Em Python, itens[10:13] onde len(itens)==10 retorna [] silenciosamente. Em outras linguagens isso seria um erro. A guard deveria usar >= para ser explicita.',
      ],
    },
  ],
};
