import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'rotas-e-parametros',
  moduleId: 'backend',
  title: 'Rotas e Parametros',
  description:
    'Aprenda a usar parametros de rota, query strings, metodos de requisicao e receber dados JSON no corpo da requisicao.',
  order: 3,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Rotas sao como enderecos dentro do seu servidor: /usuarios leva para os dados de usuarios, /produtos leva para os produtos!\n\n## Parametros de Rota\n\nParametros de rota permitem criar URLs dinamicas. Em vez de criar uma rota para cada usuario (`/usuario/1`, `/usuario/2`...), voce cria uma rota generica que aceita um **parametro variavel**.\n\nNo Flask, parametros de rota sao definidos com `<nome_do_parametro>` na URL. O valor e passado automaticamente como argumento da funcao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, jsonify\n\napp = Flask(__name__)\n\nusuarios = {\n    1: {"nome": "Ana", "email": "ana@email.com"},\n    2: {"nome": "Bruno", "email": "bruno@email.com"},\n    3: {"nome": "Carla", "email": "carla@email.com"},\n}\n\n# Parametro de rota: <int:id>\n@app.route("/api/usuarios/<int:id>")\ndef buscar_usuario(id):\n    usuario = usuarios.get(id)\n    if usuario:\n        return jsonify(usuario)\n    return jsonify({"erro": "Usuario nao encontrado"}), 404\n\n# Parametro string\n@app.route("/saudacao/<nome>")\ndef saudacao(nome):\n    return f"<h1>Ola, {nome}!</h1>"\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'parametros_rota.py',
        description: 'Usando parametros de rota para criar URLs dinamicas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Voce pode especificar o tipo do parametro: `<int:id>` aceita apenas inteiros, `<string:nome>` aceita strings (padrao), `<float:preco>` aceita decimais. Isso evita erros e ja faz a conversao automaticamente!',
    },
    {
      type: 'text',
      content:
        '## Query Strings\n\nQuery strings sao parametros passados na URL apos o sinal `?`. Sao usados para **filtrar, ordenar ou paginar** resultados.\n\nExemplo: `/api/produtos?categoria=eletronicos&ordenar=preco`\n\nNo Flask, acessamos query strings com `request.args`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nprodutos = [\n    {"id": 1, "nome": "Notebook", "categoria": "eletronicos", "preco": 2500},\n    {"id": 2, "nome": "Camisa", "categoria": "roupas", "preco": 89},\n    {"id": 3, "nome": "Fone", "categoria": "eletronicos", "preco": 150},\n    {"id": 4, "nome": "Calca", "categoria": "roupas", "preco": 120},\n]\n\n@app.route("/api/produtos")\ndef listar_produtos():\n    categoria = request.args.get("categoria")\n    preco_max = request.args.get("preco_max", type=int)\n    \n    resultado = produtos\n    \n    if categoria:\n        resultado = [p for p in resultado if p["categoria"] == categoria]\n    \n    if preco_max:\n        resultado = [p for p in resultado if p["preco"] <= preco_max]\n    \n    return jsonify(resultado)\n\n# Acesse: /api/produtos?categoria=eletronicos\n# Ou: /api/produtos?preco_max=100\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'query_strings.py',
        description: 'Filtrando dados usando query strings.',
      },
    },
    {
      type: 'text',
      content:
        '## Recebendo JSON no Body (request.json)\n\nQuando o cliente envia dados no corpo da requisicao (POST, PUT), usamos `request.get_json()` para ler o conteudo JSON e converte-lo automaticamente em um dicionario Python.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\ntarefas = []\nproximo_id = 1\n\n# GET - listar todas\n@app.route("/api/tarefas", methods=["GET"])\ndef listar():\n    return jsonify(tarefas)\n\n# POST - criar nova (recebe JSON no body)\n@app.route("/api/tarefas", methods=["POST"])\ndef criar():\n    global proximo_id\n    dados = request.get_json()\n    \n    nova_tarefa = {\n        "id": proximo_id,\n        "titulo": dados["titulo"],\n        "concluida": False\n    }\n    tarefas.append(nova_tarefa)\n    proximo_id += 1\n    \n    return jsonify(nova_tarefa), 201\n\n# PUT - atualizar\n@app.route("/api/tarefas/<int:id>", methods=["PUT"])\ndef atualizar(id):\n    dados = request.get_json()\n    for tarefa in tarefas:\n        if tarefa["id"] == id:\n            tarefa["titulo"] = dados.get("titulo", tarefa["titulo"])\n            tarefa["concluida"] = dados.get("concluida", tarefa["concluida"])\n            return jsonify(tarefa)\n    return jsonify({"erro": "Tarefa nao encontrada"}), 404\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'crud_metodos.py',
        description: 'API com metodos GET, POST e PUT recebendo JSON.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'A funcao `request.get_json()` le o corpo da requisicao como JSON. Para funcionar, o cliente precisa enviar o header `Content-Type: application/json`. Se o JSON for invalido, `get_json()` retorna `None`.',
    },
    {
      type: 'text',
      content:
        '## Combinando Tudo: Rotas com Metodos\n\nPor padrao, rotas Flask so aceitam requisicoes **GET**. Para aceitar outros metodos (POST, PUT, DELETE), voce precisa especifica-los com o parametro `methods` no decorador `@app.route()`.\n\nVoce pode testar suas rotas usando ferramentas como **curl** no terminal, **Postman** ou **Insomnia**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Testando com curl no terminal:\n\n# GET - Listar tarefas\n# curl http://localhost:5000/api/tarefas\n\n# POST - Criar tarefa\n# curl -X POST http://localhost:5000/api/tarefas \\\n#   -H "Content-Type: application/json" \\\n#   -d \'{"titulo": "Estudar Flask"}\'\n\n# PUT - Atualizar tarefa\n# curl -X PUT http://localhost:5000/api/tarefas/1 \\\n#   -H "Content-Type: application/json" \\\n#   -d \'{"concluida": true}\'\n\n# Voce tambem pode testar com Python usando requests:\nimport requests\n\n# Criando uma tarefa\nresposta = requests.post(\n    "http://localhost:5000/api/tarefas",\n    json={"titulo": "Minha tarefa"}\n)\nprint(f"Criada: {resposta.json()}")\n\n# Listando tarefas\nresposta = requests.get("http://localhost:5000/api/tarefas")\nprint(f"Todas: {resposta.json()}")',
        filename: 'testar_api.py',
        description: 'Testando a API com curl e com a biblioteca requests.',
      },
    },
    {
      type: 'callout',
      content:
        'Backend pode parecer misterioso, mas e so codigo que roda no servidor. Voce ja sabe programar — agora vai aplicar de um jeito novo!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Recebendo JSON no corpo da requisicao\n\nAlem de parametros na URL, APIs recebem dados no CORPO da requisicao (request body) — especialmente em POST, PUT e PATCH. O formato padrao e JSON:\n\n- **`request.get_json()`** — le o corpo JSON da requisicao\n- **`request.args.get("nome")`** — le parametros de query string (`?nome=valor`)\n- **`request.form.get("campo")`** — le dados de formulario HTML\n- **`request.files`** — arquivos enviados',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'crud_api.py',
        code: `from flask import Flask, request, jsonify

app = Flask(__name__)

# Banco de dados simulado em memoria
tarefas = []
proximo_id = 1

# CREATE — POST /tarefas
@app.route('/tarefas', methods=['POST'])
def criar_tarefa():
    global proximo_id
    dados = request.get_json()
    if not dados or 'titulo' not in dados:
        return jsonify({'erro': 'Titulo obrigatorio'}), 400
    tarefa = {
        'id': proximo_id,
        'titulo': dados['titulo'],
        'concluida': False
    }
    tarefas.append(tarefa)
    proximo_id += 1
    return jsonify(tarefa), 201

# READ — GET /tarefas
@app.route('/tarefas', methods=['GET'])
def listar_tarefas():
    return jsonify(tarefas)

# UPDATE — PUT /tarefas/<id>
@app.route('/tarefas/<int:id>', methods=['PUT'])
def atualizar_tarefa(id):
    tarefa = next((t for t in tarefas if t['id'] == id), None)
    if not tarefa:
        return jsonify({'erro': 'Tarefa nao encontrada'}), 404
    dados = request.get_json()
    tarefa.update(dados)
    return jsonify(tarefa)

# DELETE — DELETE /tarefas/<id>
@app.route('/tarefas/<int:id>', methods=['DELETE'])
def deletar_tarefa(id):
    global tarefas
    tarefas = [t for t in tarefas if t['id'] != id]
    return jsonify({'mensagem': 'Tarefa removida'})`,
        description: 'CRUD completo: POST cria (201), GET lista, PUT atualiza, DELETE remove. request.get_json() le o corpo JSON.',
      },
    },
  ],
  challenges: [
    {
      id: 'be4-c1',
      title: 'API de Contatos com Filtro',
      description:
        'Crie uma API Flask com rota GET /api/contatos que aceita query string "nome" para filtrar contatos. Se nenhum filtro for passado, retorne todos os contatos.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\ncontatos = [\n    {"id": 1, "nome": "Ana Silva", "telefone": "11999991111"},\n    {"id": 2, "nome": "Bruno Costa", "telefone": "11999992222"},\n    {"id": 3, "nome": "Ana Costa", "telefone": "11999993333"},\n]\n\n# Crie a rota GET /api/contatos com filtro por nome\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\ncontatos = [\n    {"id": 1, "nome": "Ana Silva", "telefone": "11999991111"},\n    {"id": 2, "nome": "Bruno Costa", "telefone": "11999992222"},\n    {"id": 3, "nome": "Ana Costa", "telefone": "11999993333"},\n]\n\n@app.route("/api/contatos", methods=["GET"])\ndef listar_contatos():\n    nome_filtro = request.args.get("nome")\n    \n    if nome_filtro:\n        resultado = [c for c in contatos if nome_filtro.lower() in c["nome"].lower()]\n        return jsonify(resultado)\n    \n    return jsonify(contatos)\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Use request.args.get("nome") para ler a query string',
        'Use list comprehension para filtrar contatos',
        'Use .lower() para busca case-insensitive',
      ],
    },
    {
      id: 'be4-c2',
      title: 'CRUD de Livros',
      description:
        'Crie uma API completa com as 4 operacoes CRUD para livros (titulo e autor). Implemente GET (listar), POST (criar), PUT (atualizar) e DELETE (remover) no endpoint /api/livros.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nlivros = []\nproximo_id = 1\n\n# GET /api/livros - listar todos\n\n# POST /api/livros - criar novo\n\n# PUT /api/livros/<id> - atualizar\n\n# DELETE /api/livros/<id> - remover\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nlivros = []\nproximo_id = 1\n\n@app.route("/api/livros", methods=["GET"])\ndef listar():\n    return jsonify(livros)\n\n@app.route("/api/livros", methods=["POST"])\ndef criar():\n    global proximo_id\n    dados = request.get_json()\n    livro = {\n        "id": proximo_id,\n        "titulo": dados["titulo"],\n        "autor": dados["autor"]\n    }\n    livros.append(livro)\n    proximo_id += 1\n    return jsonify(livro), 201\n\n@app.route("/api/livros/<int:id>", methods=["PUT"])\ndef atualizar(id):\n    dados = request.get_json()\n    for livro in livros:\n        if livro["id"] == id:\n            livro["titulo"] = dados.get("titulo", livro["titulo"])\n            livro["autor"] = dados.get("autor", livro["autor"])\n            return jsonify(livro)\n    return jsonify({"erro": "Livro nao encontrado"}), 404\n\n@app.route("/api/livros/<int:id>", methods=["DELETE"])\ndef deletar(id):\n    global livros\n    livros = [l for l in livros if l["id"] != id]\n    return jsonify({"mensagem": "Livro removido"})\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Use methods=["POST"] no decorador da rota',
        'Use request.get_json() para ler dados JSON do corpo',
        'Retorne status 201 ao criar: return jsonify(dado), 201',
      ],
    },
    {
      id: 'be4-c3',
      title: 'Busca com Parametros Combinados',
      description:
        'Crie uma rota GET /api/usuarios/<int:id>/posts que retorna os posts de um usuario especifico. Use parametro de rota para o id do usuario e query string "limite" para limitar quantos posts retornar.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nposts = [\n    {"id": 1, "usuario_id": 1, "titulo": "Meu primeiro post"},\n    {"id": 2, "usuario_id": 1, "titulo": "Aprendendo Flask"},\n    {"id": 3, "usuario_id": 2, "titulo": "Dicas de Python"},\n    {"id": 4, "usuario_id": 1, "titulo": "APIs REST"},\n    {"id": 5, "usuario_id": 2, "titulo": "Banco de dados"},\n]\n\n# Crie a rota /api/usuarios/<int:id>/posts\n# com query string "limite" opcional\n\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify, request\n\napp = Flask(__name__)\n\nposts = [\n    {"id": 1, "usuario_id": 1, "titulo": "Meu primeiro post"},\n    {"id": 2, "usuario_id": 1, "titulo": "Aprendendo Flask"},\n    {"id": 3, "usuario_id": 2, "titulo": "Dicas de Python"},\n    {"id": 4, "usuario_id": 1, "titulo": "APIs REST"},\n    {"id": 5, "usuario_id": 2, "titulo": "Banco de dados"},\n]\n\n@app.route("/api/usuarios/<int:id>/posts", methods=["GET"])\ndef posts_do_usuario(id):\n    posts_usuario = [p for p in posts if p["usuario_id"] == id]\n    \n    limite = request.args.get("limite", type=int)\n    if limite:\n        posts_usuario = posts_usuario[:limite]\n    \n    return jsonify(posts_usuario)\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Combine <int:id> na rota com request.args.get("limite")',
        'Filtre os posts pelo usuario_id usando list comprehension',
        'Use fatiamento de lista [:limite] para limitar resultados',
      ],
    },
  ],
};
