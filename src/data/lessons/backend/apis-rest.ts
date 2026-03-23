import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'apis-rest',
  moduleId: 'backend',
  title: 'APIs REST',
  description:
    'Aprenda os conceitos de APIs REST, os verbos HTTP (GET, POST, PUT, DELETE), o formato JSON e como projetar endpoints.',
  order: 1,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Uma API e como o garcom do restaurante: leva seu pedido (request) para a cozinha (servidor) e traz a resposta (response) de volta!\n\n## O Que e uma API?\n\nAPI significa **Application Programming Interface** (Interface de Programacao de Aplicacoes). E um conjunto de regras que permite que diferentes programas se comuniquem entre si.\n\nPense em uma API como o **cardapio de um restaurante**: ele define o que voce pode pedir (endpoints), como pedir (metodos HTTP) e o que vai receber de volta (respostas em JSON).\n\nUma **API REST** (Representational State Transfer) segue um conjunto de principios para organizar essa comunicacao de forma padronizada e eficiente.',
    },
    {
      type: 'text',
      content:
        '## Os Verbos HTTP\n\nCada operacao em uma API REST usa um **verbo HTTP** especifico que indica a acao desejada:\n\n| Verbo | Acao | Exemplo |\n|-------|------|---------|\n| **GET** | Buscar dados | Listar todos os usuarios |\n| **POST** | Criar um novo recurso | Cadastrar um usuario |\n| **PUT** | Atualizar um recurso existente | Editar dados do usuario |\n| **DELETE** | Remover um recurso | Excluir um usuario |\n\nEsses quatro verbos formam o famoso **CRUD**: **C**reate (POST), **R**ead (GET), **U**pdate (PUT), **D**elete (DELETE).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplos de endpoints REST para um sistema de tarefas\n# Cada linha mostra: VERBO  /endpoint  ->  acao\n\nendpoints = [\n    ("GET",    "/api/tarefas",      "Listar todas as tarefas"),\n    ("GET",    "/api/tarefas/1",    "Buscar tarefa com id 1"),\n    ("POST",   "/api/tarefas",      "Criar uma nova tarefa"),\n    ("PUT",    "/api/tarefas/1",    "Atualizar tarefa com id 1"),\n    ("DELETE", "/api/tarefas/1",    "Deletar tarefa com id 1"),\n]\n\nprint("=== Endpoints da API de Tarefas ===")\nfor metodo, url, descricao in endpoints:\n    print(f"  {metodo:8s} {url:25s} -> {descricao}")',
        filename: 'endpoints_rest.py',
        description: 'Estrutura de endpoints REST seguindo o padrao CRUD.',
      },
    },
    {
      type: 'text',
      content:
        '## O Formato JSON\n\n**JSON** (JavaScript Object Notation) e o formato padrao para trocar dados em APIs REST. Ele e leve, legivel e facil de trabalhar tanto para humanos quanto para maquinas.\n\nEm Python, JSON se parece muito com dicionarios e listas:\n\n- **Objetos** usam `{}` com pares chave-valor\n- **Arrays** usam `[]` com listas de valores\n- Tipos suportados: strings, numeros, booleanos, null, objetos e arrays',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import json\n\n# Dicionario Python -> JSON\ntarefa = {\n    "id": 1,\n    "titulo": "Estudar Python",\n    "concluida": False,\n    "tags": ["estudo", "programacao"],\n    "prioridade": 3\n}\n\n# Converter para JSON (string formatada)\njson_string = json.dumps(tarefa, indent=2, ensure_ascii=False)\nprint("Python -> JSON:")\nprint(json_string)\n\n# JSON (string) -> Dicionario Python\njson_texto = \'{"nome": "Maria", "idade": 25, "ativo": true}\'\ndados = json.loads(json_texto)\nprint("\\nJSON -> Python:")\nprint(f"Nome: {dados[\'nome\']}, Idade: {dados[\'idade\']}")',
        filename: 'json_exemplo.py',
        description: 'Convertendo entre dicionarios Python e JSON.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cuidado com as diferencas entre Python e JSON: em Python, booleanos sao `True`/`False` e nulo e `None`. Em JSON, sao `true`/`false` e `null`. A funcao `json.dumps()` faz a conversao automaticamente!',
    },
    {
      type: 'text',
      content:
        '## Boas Praticas de Design de APIs REST\n\nPara criar APIs bem organizadas, siga estas convencoes:\n\n1. **Use substantivos no plural** para endpoints: `/api/usuarios` (nao `/api/getUsuarios`)\n2. **Use os verbos HTTP** para indicar a acao (nao coloque a acao na URL)\n3. **Use codigos de status** apropriados nas respostas\n4. **Retorne JSON** com estrutura consistente\n5. **Versionamento**: prefixe com a versao `/api/v1/usuarios`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Funcao auxiliar para padronizar respostas da API\ndef criar_resposta(sucesso, dados=None, mensagem="OK", status=200):\n    return {\n        "status": status,\n        "body": {\n            "sucesso": sucesso,\n            "dados": dados,\n            "mensagem": mensagem\n        }\n    }\n\n# Exemplos de respostas padronizadas\nprint("GET /api/tarefas -> Sucesso:")\nresp = criar_resposta(True, dados=[{"id": 1, "titulo": "Estudar"}])\nprint(f"  Status: {resp[\'status\']}")\nprint(f"  Body: {resp[\'body\']}")\n\nprint("\\nPOST /api/tarefas -> Criado:")\nresp = criar_resposta(True, dados={"id": 2}, mensagem="Tarefa criada", status=201)\nprint(f"  Status: {resp[\'status\']}")\nprint(f"  Body: {resp[\'body\']}")\n\nprint("\\nGET /api/tarefas/99 -> Nao encontrado:")\nresp = criar_resposta(False, mensagem="Tarefa nao encontrada", status=404)\nprint(f"  Status: {resp[\'status\']}")\nprint(f"  Body: {resp[\'body\']}")',
        filename: 'respostas_api.py',
        description: 'Funcao para padronizar respostas de uma API REST.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Uma boa API REST deve ser **previsivel**. Se alguem ja usou uma API REST antes, deve conseguir adivinhar como a sua funciona. Por isso, siga os padroes e convencoes!',
    },
    {
      type: 'callout',
      content:
        'Backend pode parecer misterioso, mas e so codigo que roda no servidor. Voce ja sabe programar — agora vai aplicar de um jeito novo!',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'be2-c1',
      title: 'Conversor JSON',
      description:
        'Crie um dicionario representando um produto (com id, nome, preco e disponivel). Converta para JSON formatado e imprima. Depois converta de volta para dicionario e acesse o nome.',
      language: 'python',
      starterCode: 'import json\n\n# Crie um dicionario de produto\nproduto = {\n    # id, nome, preco, disponivel\n}\n\n# Converta para JSON formatado\n\n# Converta de volta para dicionario e imprima o nome',
      solution: 'import json\n\nproduto = {\n    "id": 1,\n    "nome": "Teclado Mecanico",\n    "preco": 299.90,\n    "disponivel": True\n}\n\njson_string = json.dumps(produto, indent=2, ensure_ascii=False)\nprint("JSON formatado:")\nprint(json_string)\n\nde_volta = json.loads(json_string)\nprint(f"\\nNome do produto: {de_volta[\'nome\']}")',
      hints: [
        'Use json.dumps() com indent=2 para formatar bonito',
        'Use json.loads() para converter JSON string de volta para dicionario',
        'Booleanos em Python: True/False (com letra maiuscula)',
      ],
    },
    {
      id: 'be2-c2',
      title: 'Roteador de API Simulado',
      description:
        'Crie uma funcao rotear(metodo, endpoint) que recebe um verbo HTTP e um endpoint, e retorna uma string descrevendo a acao. Ex: rotear("GET", "/tarefas") -> "Listando todas as tarefas".',
      language: 'python',
      starterCode: 'def rotear(metodo, endpoint):\n    # Implemente a logica de roteamento\n    # GET /tarefas -> "Listando todas as tarefas"\n    # POST /tarefas -> "Criando nova tarefa"\n    # PUT /tarefas -> "Atualizando tarefa"\n    # DELETE /tarefas -> "Deletando tarefa"\n    pass\n\n# Teste\nprint(rotear("GET", "/tarefas"))\nprint(rotear("POST", "/tarefas"))\nprint(rotear("PUT", "/tarefas"))\nprint(rotear("DELETE", "/tarefas"))',
      solution: 'def rotear(metodo, endpoint):\n    recurso = endpoint.strip("/").split("/")[-1]\n    \n    if metodo == "GET":\n        return f"Listando todas as {recurso}"\n    elif metodo == "POST":\n        return f"Criando nova entrada em {recurso}"\n    elif metodo == "PUT":\n        return f"Atualizando {recurso}"\n    elif metodo == "DELETE":\n        return f"Deletando {recurso}"\n    else:\n        return f"Metodo {metodo} nao reconhecido"\n\nprint(rotear("GET", "/tarefas"))\nprint(rotear("POST", "/tarefas"))\nprint(rotear("PUT", "/tarefas"))\nprint(rotear("DELETE", "/tarefas"))',
      hints: [
        'Use if/elif para verificar o metodo HTTP',
        'Voce pode extrair o nome do recurso da URL usando split("/")',
        'Use f-strings para montar a mensagem de retorno',
      ],
    },
  ],
};
