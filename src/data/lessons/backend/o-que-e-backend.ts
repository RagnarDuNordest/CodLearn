import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-backend',
  moduleId: 'backend',
  title: 'O Que e Backend?',
  description:
    'Entenda o modelo cliente-servidor, o protocolo HTTP, como funcionam requisicoes e respostas, status codes e URLs.',
  order: 0,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Se o frontend e o balcao do restaurante, o backend e a cozinha: voce nao ve, mas e la que tudo e preparado!\n\n## O Modelo Cliente-Servidor\n\nQuando voce acessa um site ou aplicativo, existe uma comunicacao invisivel acontecendo nos bastidores. O **cliente** (seu navegador ou app) envia uma **requisicao** para um **servidor**, que processa essa requisicao e devolve uma **resposta**.\n\nO **backend** e justamente o lado do servidor -- o codigo que roda "por tras das cortinas", processando dados, acessando bancos de dados e gerando as respostas que o cliente precisa.\n\nPense assim: quando voce pede uma pizza por telefone, **voce e o cliente**, o **atendente e o servidor** que recebe seu pedido, e a **pizza pronta** e a resposta que volta para voce.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo conceitual do fluxo cliente-servidor\n\n# 1. Cliente envia uma requisicao\nrequisicao = {\n    "metodo": "GET",\n    "url": "/api/pizzas",\n    "headers": {"Accept": "application/json"}\n}\n\n# 2. Servidor processa e retorna uma resposta\nresposta = {\n    "status": 200,\n    "body": [\n        {"nome": "Margherita", "preco": 35.90},\n        {"nome": "Calabresa", "preco": 32.90}\n    ]\n}\n\nprint("Requisicao:", requisicao["metodo"], requisicao["url"])\nprint("Resposta:", resposta["status"])\nfor pizza in resposta["body"]:\n    print(f"  - {pizza[\'nome\']}: R${pizza[\'preco\']}")',
        filename: 'cliente_servidor.py',
        description: 'Representacao simplificada do fluxo de requisicao e resposta.',
      },
    },
    {
      type: 'text',
      content:
        '## O Protocolo HTTP\n\nO **HTTP** (HyperText Transfer Protocol) e o protocolo que define como cliente e servidor se comunicam na web. Toda vez que voce digita uma URL no navegador, ele envia uma **requisicao HTTP** para o servidor.\n\nUma requisicao HTTP possui:\n- **Metodo** (verbo): indica a acao desejada (GET, POST, PUT, DELETE)\n- **URL**: o endereco do recurso\n- **Headers**: informacoes extras (tipo de conteudo aceito, autenticacao, etc.)\n- **Body** (corpo): dados enviados (usado em POST e PUT)\n\nA resposta HTTP possui:\n- **Status Code**: codigo numerico indicando o resultado\n- **Headers**: informacoes sobre a resposta\n- **Body**: o conteudo retornado (HTML, JSON, etc.)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Simulando uma requisicao HTTP com a biblioteca requests\nimport requests\n\n# Requisicao GET - buscar dados\nresposta = requests.get("https://api.exemplo.com/usuarios")\n\nprint(f"Status Code: {resposta.status_code}")\nprint(f"Content-Type: {resposta.headers[\'Content-Type\']}")\nprint(f"Dados: {resposta.json()}")\n\n# Requisicao POST - enviar dados\nnovo_usuario = {"nome": "Maria", "email": "maria@email.com"}\nresposta = requests.post(\n    "https://api.exemplo.com/usuarios",\n    json=novo_usuario\n)\nprint(f"Status: {resposta.status_code}")  # 201 = Criado com sucesso',
        filename: 'http_exemplo.py',
        description: 'Exemplo de requisicoes GET e POST usando a biblioteca requests.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'O protocolo HTTP e **stateless** (sem estado), ou seja, cada requisicao e independente. O servidor nao "lembra" de requisicoes anteriores automaticamente. Para manter o estado (como login), usamos cookies, sessoes ou tokens.',
    },
    {
      type: 'text',
      content:
        '## Codigos de Status HTTP\n\nOs codigos de status informam ao cliente o que aconteceu com sua requisicao. Eles sao divididos em faixas:\n\n| Faixa | Significado | Exemplos |\n|-------|-----------|----------|\n| **1xx** | Informativo | 100 Continue |\n| **2xx** | Sucesso | 200 OK, 201 Created |\n| **3xx** | Redirecionamento | 301 Moved, 304 Not Modified |\n| **4xx** | Erro do cliente | 400 Bad Request, 404 Not Found |\n| **5xx** | Erro do servidor | 500 Internal Server Error |\n\nOs mais comuns no dia a dia:\n- **200** -- Tudo certo, requisicao processada com sucesso\n- **201** -- Recurso criado com sucesso\n- **400** -- Requisicao mal formada (dados invalidos)\n- **401** -- Nao autenticado (precisa fazer login)\n- **403** -- Proibido (sem permissao)\n- **404** -- Recurso nao encontrado\n- **500** -- Erro interno do servidor',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Funcao que simula o tratamento de status HTTP\ndef tratar_resposta(status_code):\n    if status_code == 200:\n        print("Sucesso! Dados recebidos.")\n    elif status_code == 201:\n        print("Recurso criado com sucesso!")\n    elif status_code == 400:\n        print("Erro: requisicao invalida. Verifique os dados.")\n    elif status_code == 401:\n        print("Erro: voce precisa fazer login.")\n    elif status_code == 404:\n        print("Erro: recurso nao encontrado.")\n    elif status_code == 500:\n        print("Erro: problema interno no servidor.")\n    else:\n        print(f"Status desconhecido: {status_code}")\n\n# Testando diferentes codigos\ntratar_resposta(200)\ntratar_resposta(404)\ntratar_resposta(500)',
        filename: 'status_codes.py',
        description: 'Funcao que interpreta os principais codigos de status HTTP.',
      },
    },
    {
      type: 'text',
      content:
        '## Estrutura de URLs\n\nUma URL (Uniform Resource Locator) e o endereco completo de um recurso na web. Ela possui varias partes:\n\n```\nhttps://api.exemplo.com:8080/api/v1/usuarios?idade=25&ativo=true\n```\n\n- **Protocolo**: `https://` (HTTP seguro)\n- **Dominio**: `api.exemplo.com` (endereco do servidor)\n- **Porta**: `:8080` (porta do servico, opcional)\n- **Caminho**: `/api/v1/usuarios` (identifica o recurso)\n- **Query String**: `?idade=25&ativo=true` (parametros de filtro)\n\nNo backend, voce define quais **caminhos** (rotas) o servidor responde e como cada um e processado.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Uma dica para memorizar: **2xx = deu certo**, **4xx = erro seu** (cliente), **5xx = erro do servidor**. O famoso erro 404 significa que a pagina ou recurso que voce tentou acessar nao existe!',
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
      id: 'be1-c1',
      title: 'Classificador de Status HTTP',
      description:
        'Crie uma funcao chamada classificar_status que recebe um codigo de status HTTP e retorna a categoria: "Sucesso", "Redirecionamento", "Erro do Cliente" ou "Erro do Servidor".',
      language: 'python',
      starterCode: 'def classificar_status(codigo):\n    # Implemente aqui\n    # 2xx = "Sucesso"\n    # 3xx = "Redirecionamento"\n    # 4xx = "Erro do Cliente"\n    # 5xx = "Erro do Servidor"\n    pass\n\n# Teste sua funcao\nprint(classificar_status(200))  # Sucesso\nprint(classificar_status(404))  # Erro do Cliente\nprint(classificar_status(500))  # Erro do Servidor',
      solution: 'def classificar_status(codigo):\n    if 200 <= codigo < 300:\n        return "Sucesso"\n    elif 300 <= codigo < 400:\n        return "Redirecionamento"\n    elif 400 <= codigo < 500:\n        return "Erro do Cliente"\n    elif 500 <= codigo < 600:\n        return "Erro do Servidor"\n    else:\n        return "Codigo desconhecido"\n\nprint(classificar_status(200))  # Sucesso\nprint(classificar_status(404))  # Erro do Cliente\nprint(classificar_status(500))  # Erro do Servidor',
      hints: [
        'Use comparacoes com intervalos: 200 <= codigo < 300',
        'Lembre-se que cada faixa de 100 codigos tem um significado diferente',
      ],
    },
    {
      id: 'be1-c2',
      title: 'Simulador de Requisicao',
      description:
        'Crie um dicionario representando uma requisicao HTTP com metodo, url e headers. Depois crie outro dicionario representando a resposta com status, headers e body. Imprima ambos formatados.',
      language: 'python',
      starterCode: '# Crie um dicionario para a requisicao\nrequisicao = {\n    # metodo, url, headers\n}\n\n# Crie um dicionario para a resposta\nresposta = {\n    # status, headers, body\n}\n\n# Imprima formatado\nprint("=== REQUISICAO ===")\n# imprima os dados da requisicao\n\nprint("=== RESPOSTA ===")\n# imprima os dados da resposta',
      solution: 'requisicao = {\n    "metodo": "GET",\n    "url": "/api/produtos",\n    "headers": {"Accept": "application/json", "Authorization": "Bearer token123"}\n}\n\nresposta = {\n    "status": 200,\n    "headers": {"Content-Type": "application/json"},\n    "body": [{"id": 1, "nome": "Notebook", "preco": 2500.00}]\n}\n\nprint("=== REQUISICAO ===")\nprint(f"Metodo: {requisicao[\'metodo\']}")\nprint(f"URL: {requisicao[\'url\']}")\nprint(f"Headers: {requisicao[\'headers\']}")\n\nprint("=== RESPOSTA ===")\nprint(f"Status: {resposta[\'status\']}")\nprint(f"Headers: {resposta[\'headers\']}")\nprint(f"Body: {resposta[\'body\']}")',
      hints: [
        'Dicionarios em Python usam chaves: {"chave": "valor"}',
        'Use f-strings para formatar a saida: f"Texto {variavel}"',
      ],
    },
  ],
};
