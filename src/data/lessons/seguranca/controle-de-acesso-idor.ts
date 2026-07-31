import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'controle-de-acesso-idor',
  moduleId: 'seguranca',
  title: 'Controle de Acesso e IDOR',
  description: 'Como funciona Broken Access Control (OWASP #1), o que e IDOR, como atacantes acessam dados de outros usuarios, e como implementar autorizacao correta em APIs',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Controle de Acesso — OWASP #1\n\n**Broken Access Control** e a vulnerabilidade mais encontrada em aplicacoes web segundo o OWASP. Ocorre quando um usuario consegue agir fora das suas permissoes — acessando dados de outros usuarios, executando acoes de administrador ou acessando recursos que nao foram comprados.\n\n### A diferenca entre Autenticacao e Autorizacao\n\n**Autenticacao**: confirma *quem voce e* — login com email e senha, JWT, OAuth.\n\n**Autorizacao**: determina *o que voce pode fazer* — verificar se o usuario logado tem permissao para acessar um recurso especifico.\n\nMuitos sistemas implementam autenticacao corretamente mas esquecem de verificar autorizacao nas rotas.\n\n### IDOR — Insecure Direct Object Reference\n\nIDOR e o tipo mais comum de Broken Access Control. Acontece quando um sistema usa identificadores previstos (IDs numericos, nomes de arquivo) e nao verifica se o usuario logado tem direito de acessar aquele objeto especifico.\n\n**Exemplo classico:**\n```\nGET /api/pedidos/1234   → usuario logado ve o pedido 1234 (dele)\nGET /api/pedidos/1235   → mesmo usuario ve o pedido 1235 (de outro usuario!)\n```\n\nO usuario so mudou o numero na URL. Se o sistema nao verifica se o pedido pertence ao usuario logado, qualquer um pode ver os dados de qualquer pessoa.',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'IDOR foi a vulnerabilidade usada no vazamento de fotos de celebridades do iCloud em 2014, no vazamento de dados do Detran-SP em 2021 (dados de 100 milhoes de CNHs), e em dezenas de plataformas brasileiras. A correcao e simples — a falha e sempre a mesma: falta de verificacao de autorizacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# API Flask vulneravel a IDOR — sem verificacao de autorizacao\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\n# Banco simulado: pedidos de varios usuarios\npedidos_db = {\n    1: {"id": 1, "usuario_id": 10, "produto": "Notebook", "valor": 3500.0},\n    2: {"id": 2, "usuario_id": 20, "produto": "Mouse", "valor": 89.90},\n    3: {"id": 3, "usuario_id": 10, "produto": "Teclado", "valor": 250.0},\n}\n\ndef get_usuario_logado():\n    """Simula pegar o usuario do JWT — em producao usaria jwt.decode()"""\n    return {"id": 10, "email": "joao@email.com"}  # usuario 10 esta logado\n\n# VULNERAVEL: so verifica se o pedido existe, nao se pertence ao usuario\n@app.route(\'/api/pedidos/<int:pedido_id>\')\ndef ver_pedido_vulneravel(pedido_id):\n    pedido = pedidos_db.get(pedido_id)\n    if not pedido:\n        return jsonify({"erro": "Pedido nao encontrado"}), 404\n    # FALTA: verificar se pedido["usuario_id"] == usuario_logado["id"]\n    return jsonify(pedido)  # retorna qualquer pedido!\n\n# Ataque:\n# Usuario 10 (Joao) esta logado\n# GET /api/pedidos/1 -> OK (pedido de Joao) ✓\n# GET /api/pedidos/2 -> OK (pedido de outro usuario!) ✗  <- IDOR!\n# GET /api/pedidos/3 -> OK (pedido de Joao) ✓\n\n# Exemplo com arquivos — tambem vulneravel\nuploads_db = {\n    "fatura_joao_jan.pdf":   {"dono_id": 10, "path": "/uploads/fatura_joao_jan.pdf"},\n    "fatura_maria_jan.pdf":  {"dono_id": 20, "path": "/uploads/fatura_maria_jan.pdf"},\n}\n\n@app.route(\'/api/download/<nome_arquivo>\')\ndef download_vulneravel(nome_arquivo):\n    arquivo = uploads_db.get(nome_arquivo)\n    if not arquivo:\n        return jsonify({"erro": "Arquivo nao encontrado"}), 404\n    # FALTA: verificar se arquivo["dono_id"] == usuario_logado["id"]\n    return jsonify({"url": arquivo["path"]})  # qualquer arquivo!\n\n# Ataque:\n# GET /api/download/fatura_maria_jan.pdf\n# -> o atacante baixa a fatura de outra pessoa!',
        filename: 'idor_vulneravel.py',
        description:
          'Dois exemplos de IDOR: acesso a pedidos por ID numerico sem verificar o dono, e download de arquivos por nome sem verificar o dono. Em ambos, o sistema verifica autenticacao (o usuario esta logado) mas nao autorizacao (o usuario tem direito a ESTE recurso).',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# API Flask segura — com verificacao de autorizacao correta\nfrom flask import Flask, request, jsonify, abort\nfrom functools import wraps\nimport jwt\nimport os\n\napp = Flask(__name__)\nSECRET = os.environ.get("JWT_SECRET", "dev-secret")\n\n# Banco simulado\npedidos_db = {\n    1: {"id": 1, "usuario_id": 10, "produto": "Notebook", "valor": 3500.0},\n    2: {"id": 2, "usuario_id": 20, "produto": "Mouse", "valor": 89.90},\n    3: {"id": 3, "usuario_id": 10, "produto": "Teclado", "valor": 250.0},\n}\n\ndef requer_autenticacao(func):\n    """Decorator: valida JWT e injeta usuario_logado no contexto."""\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        token = request.headers.get("Authorization", "").replace("Bearer ", "")\n        if not token:\n            abort(401)  # nao autenticado\n        try:\n            payload = jwt.decode(token, SECRET, algorithms=["HS256"])\n            request.usuario_logado = payload  # {"user_id": 10, "email": "..."}\n        except jwt.InvalidTokenError:\n            abort(401)\n        return func(*args, **kwargs)\n    return wrapper\n\n# SEGURO: verifica autorizacao — o pedido pertence ao usuario logado?\n@app.route(\'/api/pedidos/<int:pedido_id>\')\n@requer_autenticacao\ndef ver_pedido_seguro(pedido_id):\n    pedido = pedidos_db.get(pedido_id)\n\n    if not pedido:\n        return jsonify({"erro": "Pedido nao encontrado"}), 404\n\n    # VERIFICACAO DE AUTORIZACAO: o pedido e deste usuario?\n    if pedido["usuario_id"] != request.usuario_logado["user_id"]:\n        # Retornamos 404, nao 403, para nao confirmar que o pedido existe\n        return jsonify({"erro": "Pedido nao encontrado"}), 404\n\n    return jsonify(pedido)  # so retorna se for do usuario logado\n\n# SEGURO: lista so os pedidos do proprio usuario (nunca usa ID da URL)\n@app.route(\'/api/pedidos\')\n@requer_autenticacao\ndef listar_meus_pedidos():\n    usuario_id = request.usuario_logado["user_id"]\n    # Filtra no banco — o usuario_id vem do JWT, nao da URL\n    meus_pedidos = [\n        p for p in pedidos_db.values()\n        if p["usuario_id"] == usuario_id\n    ]\n    return jsonify(meus_pedidos)\n\n# SEGURO: arquivos com IDs opacos em vez de nomes previstos\nimport uuid\nuploads_db = {}  # uuid -> {"dono_id": ..., "path": ..., "nome_original": ...}\n\n@app.route(\'/api/upload\', methods=[\'POST\'])\n@requer_autenticacao\ndef upload_arquivo():\n    # Gera ID opaco — impossivel de adivinhar\n    arquivo_id = str(uuid.uuid4())  # ex: "550e8400-e29b-41d4-a716-446655440000"\n    uploads_db[arquivo_id] = {\n        "dono_id": request.usuario_logado["user_id"],\n        "path": f"/uploads/{arquivo_id}",\n        "nome_original": request.files.get("arquivo", {}).filename,\n    }\n    return jsonify({"arquivo_id": arquivo_id})\n\n@app.route(\'/api/download/<arquivo_id>\')\n@requer_autenticacao\ndef download_seguro(arquivo_id):\n    arquivo = uploads_db.get(arquivo_id)\n    if not arquivo:\n        return jsonify({"erro": "Arquivo nao encontrado"}), 404\n    # Verificacao de autorizacao\n    if arquivo["dono_id"] != request.usuario_logado["user_id"]:\n        return jsonify({"erro": "Arquivo nao encontrado"}), 404\n    return jsonify({"url": arquivo["path"]})',
        filename: 'idor_seguro.py',
        description:
          'Tres tecnicas para prevenir IDOR: (1) sempre verificar se o objeto pertence ao usuario logado antes de retornar, (2) usar IDs do JWT (nao da URL) para filtrar dados do usuario, (3) usar UUIDs aleatorios em vez de IDs sequenciais para tornar o brute-force impossivel. Retornar 404 em vez de 403 evita confirmar que o recurso existe.',
      },
    },
    {
      type: 'text',
      content:
        '## Controle de Acesso Baseado em Papeis (RBAC)\n\nAlem de verificar se o objeto pertence ao usuario, muitos sistemas precisam verificar o *papel* do usuario: administrador, gerente, usuario comum.\n\n### Regras fundamentais de RBAC\n\n- **Principio do menor privilegio**: cada usuario tem apenas as permissoes que precisa\n- **Nunca confie no cliente**: o frontend pode esconder botoes, mas o backend DEVE verificar permissoes em toda requisicao\n- **Verifique no servidor**: nao basta verificar no JavaScript — um atacante pode chamar a API diretamente\n\n### Erros comuns\n\n```\n❌ Esconder o botao "Admin" no frontend mas nao verificar no backend\n❌ Verificar apenas se o usuario esta logado, nao se tem o papel correto\n❌ Colocar o papel do usuario no JWT sem verificar no banco (usuario pode forjar)\n❌ Usar IDs sequenciais em recursos sensiveis\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# RBAC — controle de acesso baseado em papeis\nfrom flask import Flask, request, jsonify, abort\nfrom functools import wraps\nfrom enum import Enum\n\napp = Flask(__name__)\n\nclass Role(str, Enum):\n    ADMIN = "admin"\n    GERENTE = "gerente"\n    USUARIO = "usuario"\n\n# Hierarquia de permissoes\nPERMISSOES = {\n    Role.ADMIN:   {"ver_relatorios", "deletar_usuario", "editar_usuario", "ver_pedidos"},\n    Role.GERENTE: {"ver_relatorios", "editar_usuario", "ver_pedidos"},\n    Role.USUARIO: {"ver_pedidos"},\n}\n\ndef requer_permissao(permissao: str):\n    """Decorator: verifica se o usuario tem a permissao necessaria."""\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            # usuario_logado ja foi injetado pelo decorator de autenticacao\n            role = request.usuario_logado.get("role", Role.USUARIO)\n            if permissao not in PERMISSOES.get(role, set()):\n                abort(403)  # Forbidden — autenticado mas sem permissao\n            return func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@app.route(\'/api/admin/relatorio\')\n@requer_autenticacao          # 1. verifica se esta logado\n@requer_permissao("ver_relatorios")  # 2. verifica se tem permissao\ndef ver_relatorio_financeiro():\n    # So chega aqui se logado E com permissao\n    return jsonify({"receita": 150000, "despesas": 80000})\n\n@app.route(\'/api/admin/usuarios/<int:usuario_id>\', methods=[\'DELETE\'])\n@requer_autenticacao\n@requer_permissao("deletar_usuario")\ndef deletar_usuario(usuario_id):\n    # So admins chegam aqui\n    # Ainda precisamos verificar: admin nao pode deletar a si mesmo\n    if usuario_id == request.usuario_logado["user_id"]:\n        return jsonify({"erro": "Nao e possivel deletar sua propria conta"}), 400\n    return jsonify({"mensagem": f"Usuario {usuario_id} deletado"})\n\n# Requer_autenticacao definido anteriormente (importar ou copiar)\ndef requer_autenticacao(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs):\n        # ... validacao do JWT ...\n        request.usuario_logado = {"user_id": 10, "role": "admin"}  # simulado\n        return func(*args, **kwargs)\n    return wrapper',
        filename: 'rbac_seguro.py',
        description:
          'RBAC com hierarquia de permissoes: cada papel tem um conjunto de permissoes, e o decorator verifica automaticamente. A autenticacao (quem e voce?) e a autorizacao (o que pode fazer?) sao separadas em dois decorators distintos e sempre aplicadas em conjunto.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Checklist de Controle de Acesso: (1) Toda rota que retorna dados de usuario verifica se o objeto pertence ao usuario logado? (2) Rotas administrativas verificam o papel, nao so o login? (3) IDs de recursos sensiveis sao UUIDs, nao sequenciais? (4) O frontend esconde elementos mas o backend SEMPRE verifica? (5) Erros de autorizacao retornam 404 (nao 403) para nao confirmar que o recurso existe?',
    },
  ],
  challenges: [
    {
      id: 'idor-c1',
      title: 'Corrija o IDOR na API de Documentos',
      description:
        'A API abaixo permite que qualquer usuario leia e delete documentos de qualquer outro usuario. Corrija as duas rotas para verificar autorizacao corretamente. Dica: o usuario logado esta em request.usuario_logado["user_id"].',
      language: 'python',
      starterCode:
        '# API de documentos — corrija o IDOR nas duas rotas\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\ndocumentos_db = {\n    "doc-001": {"id": "doc-001", "dono_id": 1, "titulo": "Contrato NDA", "conteudo": "Confidencial..."},\n    "doc-002": {"id": "doc-002", "dono_id": 2, "titulo": "Proposta Comercial", "conteudo": "Valores..."},\n    "doc-003": {"id": "doc-003", "dono_id": 1, "titulo": "Relatorio Mensal", "conteudo": "Dados..."},\n}\n\n# Simula usuario logado (em producao viria do JWT)\ndef get_usuario_logado():\n    return {"user_id": 1, "email": "alice@empresa.com"}\n\n# VULNERAVEL: qualquer usuario logado le qualquer documento\n@app.route(\'/api/documentos/<doc_id>\')\ndef ver_documento(doc_id):\n    usuario = get_usuario_logado()\n    doc = documentos_db.get(doc_id)\n    if not doc:\n        return jsonify({"erro": "Nao encontrado"}), 404\n    # TODO: verificar se doc pertence ao usuario logado\n    return jsonify(doc)\n\n# VULNERAVEL: qualquer usuario logado deleta qualquer documento\n@app.route(\'/api/documentos/<doc_id>\', methods=[\'DELETE\'])\ndef deletar_documento(doc_id):\n    usuario = get_usuario_logado()\n    doc = documentos_db.get(doc_id)\n    if not doc:\n        return jsonify({"erro": "Nao encontrado"}), 404\n    # TODO: verificar se doc pertence ao usuario logado\n    del documentos_db[doc_id]\n    return jsonify({"mensagem": "Deletado"})\n',
      solution:
        '# API de documentos — IDOR corrigido\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\ndocumentos_db = {\n    "doc-001": {"id": "doc-001", "dono_id": 1, "titulo": "Contrato NDA", "conteudo": "Confidencial..."},\n    "doc-002": {"id": "doc-002", "dono_id": 2, "titulo": "Proposta Comercial", "conteudo": "Valores..."},\n    "doc-003": {"id": "doc-003", "dono_id": 1, "titulo": "Relatorio Mensal", "conteudo": "Dados..."},\n}\n\ndef get_usuario_logado():\n    return {"user_id": 1, "email": "alice@empresa.com"}\n\n@app.route(\'/api/documentos/<doc_id>\')\ndef ver_documento(doc_id):\n    usuario = get_usuario_logado()\n    doc = documentos_db.get(doc_id)\n\n    if not doc:\n        return jsonify({"erro": "Nao encontrado"}), 404\n\n    # CORRECAO: verificar se o documento pertence ao usuario logado\n    if doc["dono_id"] != usuario["user_id"]:\n        # 404 em vez de 403: nao confirma que o documento existe\n        return jsonify({"erro": "Nao encontrado"}), 404\n\n    return jsonify(doc)\n\n@app.route(\'/api/documentos/<doc_id>\', methods=[\'DELETE\'])\ndef deletar_documento(doc_id):\n    usuario = get_usuario_logado()\n    doc = documentos_db.get(doc_id)\n\n    if not doc:\n        return jsonify({"erro": "Nao encontrado"}), 404\n\n    # CORRECAO: verificar autorizacao antes de deletar\n    if doc["dono_id"] != usuario["user_id"]:\n        return jsonify({"erro": "Nao encontrado"}), 404\n\n    del documentos_db[doc_id]\n    return jsonify({"mensagem": "Deletado"})\n',
      hints: [
        'Apos encontrar o documento no banco, compare doc["dono_id"] com usuario["user_id"].',
        'Se os IDs nao coincidirem, retorne 404 (nao 403) — assim o atacante nao sabe se o documento existe ou se ele nao tem permissao.',
        'Aplique a mesma logica em ambas as rotas: GET e DELETE precisam da mesma verificacao.',
      ],
    },
  ],
};
