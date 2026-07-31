import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'cors-e-politica-de-origem',
  moduleId: 'seguranca',
  title: 'CORS e Politica de Origem',
  description: 'O que e Same-Origin Policy, por que CORS existe, como configurar corretamente em APIs e por que usar Access-Control-Allow-Origin: * em producao e perigoso',
  order: 8,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Same-Origin Policy — A Regra de Origem\n\nO navegador tem uma regra de seguranca fundamental: **scripts de um site nao podem ler respostas de outro site**. Isso e chamado de Same-Origin Policy (politica de mesma origem).\n\n### O que e "origem"?\n\nUma origem e a combinacao de: **protocolo + dominio + porta**.\n\n```\nOrigens iguais (permitido):\nhttps://meusite.com/pagina1   ←→   https://meusite.com/api\n\nOrigens diferentes (bloqueado por padrao):\nhttps://meusite.com           ←→   https://api.meusite.com   (subdominio diferente)\nhttps://meusite.com           ←→   http://meusite.com         (protocolo diferente)\nhttps://meusite.com           ←→   https://meusite.com:8080   (porta diferente)\nhttps://meusite.com           ←→   https://outrosite.com      (dominio diferente)\n```\n\n### Por que isso existe?\n\nSem essa regra, um site malicioso poderia fazer seu navegador enviar requisicoes ao seu banco (onde voce esta logado) e ler a resposta — roubando dados ou executando acoes.\n\n### O que e CORS?\n\nCORS (Cross-Origin Resource Sharing) e o mecanismo que permite que um servidor *opcionalmente autorise* que origens especificas acessem seus recursos. O servidor indica isso via headers HTTP na resposta.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Simulando o problema de CORS\n\n# Cenario: frontend em https://app.meusite.com tenta acessar\n# API em https://api.meusite.com\n\n# No navegador, o JavaScript faz:\n# fetch("https://api.meusite.com/dados")\n#   .then(r => r.json())\n#   .then(dados => console.log(dados))\n\n# O que acontece SEM CORS configurado na API:\n# 1. O navegador envia a requisicao\n# 2. O servidor responde com os dados\n# 3. O navegador BLOQUEIA a leitura da resposta\n# 4. Console mostra: "Access to fetch at \'api.meusite.com\' from origin\n#    \'app.meusite.com\' has been blocked by CORS policy"\n\n# Importante: a requisicao CHEGOU ao servidor!\n# O bloqueio e no navegador, nao no servidor.\n# Isso significa que CORS NAO protege APIs acessadas fora do navegador\n# (curl, Postman, servidores back-end ainda conseguem acessar)\n\n# O servidor precisa enviar headers CORS para autorizar o acesso:\n# Access-Control-Allow-Origin: https://app.meusite.com\n# O navegador ve esse header e permite que o JS leia a resposta\n\n# API Flask SEM configuracao CORS — bloqueada pelo navegador\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route(\'/api/dados\')\ndef dados():\n    # Servidor responde normalmente, mas sem header CORS\n    # O navegador bloqueia a leitura pelo frontend\n    return jsonify({"usuario": "Joao", "saldo": 1000})\n    # Falta: Access-Control-Allow-Origin no header da resposta',
        filename: 'cors_problema.py',
        description:
          'O erro de CORS e confuso porque a requisicao CHEGA ao servidor — o bloqueio acontece no navegador quando ele tenta ler a resposta. O servidor precisa incluir o header Access-Control-Allow-Origin para autorizar a leitura.',
      },
    },
    {
      type: 'text',
      content:
        '## Configurando CORS Corretamente\n\n### O header mais importante\n\n```\nAccess-Control-Allow-Origin: https://meuapp.com\n```\n\nEste header diz ao navegador: "eu autorizo a origem https://meuapp.com a ler minhas respostas".\n\n### O erro mais comum: `*` em producao\n\n```\nAccess-Control-Allow-Origin: *\n```\n\nO `*` significa "qualquer origem pode acessar". Isso e aceitavel para APIs publicas (ex.: API de CEP, previsao do tempo) mas e **perigoso para APIs com autenticacao**:\n\n- Qualquer site pode fazer requisicoes a sua API em nome do usuario\n- Combinado com `Access-Control-Allow-Credentials: true` (que permite cookies), vira um vetor de ataque\n- Browsers modernos bloqueiam `*` com `credentials: true` — mas e melhor nao usar `*` em producao\n\n### Preflight requests\n\nPara requisicoes nao-simples (POST com JSON, PUT, DELETE, headers customizados), o navegador envia primeiro uma requisicao `OPTIONS` — chamada de preflight. O servidor deve responder a esse OPTIONS com os headers CORS corretos antes de o navegador enviar a requisicao real.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# CORS configurado corretamente com Flask-CORS\n# pip install flask-cors\nfrom flask import Flask, jsonify, request\nfrom flask_cors import CORS\nimport os\n\napp = Flask(__name__)\n\n# Origens permitidas — sempre especificas, nunca * em producao\nORIGENS_PERMITIDAS = os.environ.get(\n    "CORS_ORIGINS",\n    "http://localhost:3000,http://localhost:5173"  # dev local\n).split(",")\n\n# Configuracao segura do CORS\nCORS(app, resources={\n    r"/api/*": {\n        "origins": ORIGENS_PERMITIDAS,  # lista especifica, nao *\n        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],\n        "allow_headers": ["Content-Type", "Authorization"],\n        "supports_credentials": True,   # necessario para cookies/JWT\n        "max_age": 600,                 # cache do preflight por 10 min\n    }\n})\n\n@app.route(\'/api/dados\')\ndef dados():\n    return jsonify({"usuario": "Joao", "saldo": 1000})\n    # Agora o header Access-Control-Allow-Origin e adicionado automaticamente\n    # apenas para origens na lista ORIGENS_PERMITIDAS\n\n\n# Implementacao manual (sem Flask-CORS, para entender o mecanismo)\n@app.after_request\ndef adicionar_cors_manual(response):\n    origem = request.headers.get("Origin", "")\n\n    # So adiciona o header se a origem for permitida\n    if origem in ORIGENS_PERMITIDAS:\n        response.headers["Access-Control-Allow-Origin"] = origem\n        response.headers["Access-Control-Allow-Credentials"] = "true"\n        response.headers["Vary"] = "Origin"  # importante para cache\n\n    return response\n\n@app.route(\'/api/dados\', methods=[\'OPTIONS\'])\ndef preflight_dados():\n    """Responde ao preflight request do navegador."""\n    origem = request.headers.get("Origin", "")\n    if origem not in ORIGENS_PERMITIDAS:\n        return "", 403\n\n    response = app.make_response("")\n    response.headers["Access-Control-Allow-Origin"] = origem\n    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"\n    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"\n    response.headers["Access-Control-Max-Age"] = "600"\n    return response, 204',
        filename: 'cors_correto.py',
        description:
          'Flask-CORS e a forma mais pratica de configurar CORS. A lista de origens vem de variavel de ambiente para ser diferente entre dev e producao. O header Vary: Origin e essencial para que proxies e CDNs nao sirvam a mesma resposta CORS para origens diferentes.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// No frontend: como fazer requisicoes cross-origin corretamente\n\n// Requisicao simples (sem credentials)\nconst response = await fetch("https://api.meusite.com/dados");\nconst dados = await response.json();\n\n// Com credenciais (cookies, Authorization header)\nconst responseAuth = await fetch("https://api.meusite.com/perfil", {\n  credentials: "include",  // envia cookies e headers de auth\n  headers: {\n    "Authorization": `Bearer ${token}`,\n    "Content-Type": "application/json",\n  },\n});\n\n// O erro mais comum no frontend: CORS + credentials sem configuracao correta\n// Erro: "Response to preflight request doesn\'t pass access control check"\n// Causa: credentials: "include" mas o servidor usa Access-Control-Allow-Origin: *\n// Solucao: o servidor deve especificar a origem exata, nao *\n\n// Com Axios\nimport axios from \'axios\';\n\nconst api = axios.create({\n  baseURL: "https://api.meusite.com",\n  withCredentials: true,  // equivalente a credentials: "include"\n});\n\n// Interceptor para adicionar token em toda requisicao\napi.interceptors.request.use(config => {\n  const token = localStorage.getItem("token");\n  if (token) {\n    config.headers.Authorization = `Bearer ${token}`;\n  }\n  return config;\n});\n\n// Uso\nconst { data } = await api.get("/perfil");\nconsole.log(data.nome);',
        filename: 'fetch_cors.js',
        description:
          'No frontend, credentials: "include" e necessario para enviar cookies em requisicoes cross-origin. Mas requer que o servidor especifique a origem exata no Access-Control-Allow-Origin — o * nao funciona com credentials. Use Axios com withCredentials: true para a mesma funcionalidade com API mais simples.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'CORS nao e uma protecao de seguranca do servidor — e uma politica do navegador. Um atacante com curl ou Postman ignora completamente o CORS. Por isso, CORS deve ser usado junto com autenticacao real (JWT, session), nao no lugar dela. Se sua API so pode ser acessada por um frontend especifico, use CORS para restringir o navegador E autenticacao para proteger o servidor.',
    },
  ],
  challenges: [
    {
      id: 'cors-c1',
      title: 'Configure CORS para API em Producao',
      description:
        'A API abaixo tem CORS configurado errado: usa * (qualquer origem) e nao verifica se a origem e permitida. Corrija para: (1) aceitar apenas as origens da lista ORIGENS_PERMITIDAS, (2) retornar 403 para origens nao autorizadas, (3) incluir o header Vary: Origin para cache correto.',
      language: 'python',
      starterCode:
        '# API com CORS mal configurado — corrija\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\nORIGENS_PERMITIDAS = [\n    "https://app.minhaempresa.com",\n    "https://admin.minhaempresa.com",\n    "http://localhost:3000",  # desenvolvimento\n]\n\n@app.after_request\ndef adicionar_cors(response):\n    # ERRADO: permite qualquer origem\n    response.headers["Access-Control-Allow-Origin"] = "*"\n    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"\n    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"\n    # TODO: adicionar Vary: Origin\n    return response\n\n@app.route(\'/api/produtos\')\ndef listar_produtos():\n    return jsonify([\n        {"id": 1, "nome": "Produto A", "preco": 99.90},\n        {"id": 2, "nome": "Produto B", "preco": 149.90},\n    ])\n\n@app.route(\'/api/produtos\', methods=[\'OPTIONS\'])\ndef preflight():\n    # ERRADO: aceita qualquer origem no preflight\n    response = app.make_response("")\n    response.headers["Access-Control-Allow-Origin"] = "*"\n    response.headers["Access-Control-Allow-Methods"] = "GET, POST"\n    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"\n    return response, 204\n',
      solution:
        '# API com CORS corretamente configurado\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\nORIGENS_PERMITIDAS = [\n    "https://app.minhaempresa.com",\n    "https://admin.minhaempresa.com",\n    "http://localhost:3000",\n]\n\n@app.after_request\ndef adicionar_cors(response):\n    origem = request.headers.get("Origin", "")\n\n    if origem in ORIGENS_PERMITIDAS:\n        # Especifica a origem exata, nao *\n        response.headers["Access-Control-Allow-Origin"] = origem\n        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE"\n        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"\n        response.headers["Access-Control-Allow-Credentials"] = "true"\n        # Vary: Origin indica que a resposta muda conforme a origem\n        # Sem isso, um proxy/CDN pode servir a resposta de uma origem para outra\n        response.headers["Vary"] = "Origin"\n    # Se a origem nao e permitida, nenhum header CORS e adicionado\n    # O navegador bloqueara a leitura da resposta\n\n    return response\n\n@app.route(\'/api/produtos\')\ndef listar_produtos():\n    return jsonify([\n        {"id": 1, "nome": "Produto A", "preco": 99.90},\n        {"id": 2, "nome": "Produto B", "preco": 149.90},\n    ])\n\n@app.route(\'/api/produtos\', methods=[\'OPTIONS\'])\ndef preflight():\n    origem = request.headers.get("Origin", "")\n\n    if origem not in ORIGENS_PERMITIDAS:\n        return "", 403  # origem nao autorizada\n\n    response = app.make_response("")\n    response.headers["Access-Control-Allow-Origin"] = origem  # especifico\n    response.headers["Access-Control-Allow-Methods"] = "GET, POST"\n    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"\n    response.headers["Access-Control-Allow-Credentials"] = "true"\n    response.headers["Access-Control-Max-Age"] = "600"\n    response.headers["Vary"] = "Origin"\n    return response, 204\n',
      hints: [
        'Pega a origem da requisicao com: origem = request.headers.get("Origin", ""). Depois verifique se ela esta em ORIGENS_PERMITIDAS.',
        'Em vez de response.headers["Access-Control-Allow-Origin"] = "*", use o valor especifico: response.headers["Access-Control-Allow-Origin"] = origem — mas so se origem estiver na lista.',
        'Adicione response.headers["Vary"] = "Origin" sempre que incluir o header CORS. Sem isso, um CDN pode fazer cache da resposta de uma origem e servir para outra.',
      ],
    },
  ],
};
