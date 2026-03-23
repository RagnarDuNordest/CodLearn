import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'autenticacao',
  moduleId: 'backend',
  title: 'Autenticação e Segurança',
  description:
    'Aprenda conceitos de autenticação, sessões, tokens JWT, hash de senhas e como proteger rotas da sua API.',
  order: 5,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        'Autenticacao e como o seguranca de uma festa: ele verifica seu nome na lista (login) antes de deixar voce entrar!\n\n## Por Que Autenticação?\n\n**Autenticação** é o processo de verificar quem é o usuário — como mostrar um documento de identidade na portaria. Já a **autorização** define o que esse usuário pode fazer — como ter acesso a certas salas do prédio.\n\nSem autenticação, qualquer pessoa poderia acessar dados privados, modificar informações de outros usuários ou executar ações perigosas na sua aplicação.\n\nExistem várias formas de implementar autenticação. Vamos aprender as principais!',
    },
    {
      type: 'text',
      content:
        '## Hash de Senhas\n\nA regra número 1 de segurança: **NUNCA armazene senhas em texto puro!** Em vez disso, usamos um **hash** — uma função matemática que transforma a senha em um código irreversível.\n\nSe alguém invadir o banco de dados, verá apenas os hashes, não as senhas originais. A biblioteca **werkzeug** (que já vem com Flask) oferece funções prontas para isso.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from werkzeug.security import generate_password_hash, check_password_hash\n\n# Gerando hash de uma senha\nsenha = "minha_senha_secreta"\nhash_senha = generate_password_hash(senha)\nprint(f"Senha original: {senha}")\nprint(f"Hash gerado: {hash_senha}")\n\n# Verificando se uma senha corresponde ao hash\nsenha_correta = check_password_hash(hash_senha, "minha_senha_secreta")\nsenha_errada = check_password_hash(hash_senha, "senha_errada")\n\nprint(f"\\nSenha correta? {senha_correta}")   # True\nprint(f"Senha errada? {senha_errada}")     # False',
        filename: 'hash_senhas.py',
        description: 'Gerando e verificando hash de senhas com werkzeug.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'O hash é **irreversível** — não existe função para "des-hashear" uma senha. Para verificar, geramos o hash da senha fornecida e comparamos com o hash armazenado. Por isso usamos `check_password_hash()`.',
    },
    {
      type: 'text',
      content:
        '## Sessões vs Tokens\n\nExistem duas abordagens principais para manter o usuário autenticado:\n\n**Sessões (server-side):**\n- O servidor cria uma sessão e armazena os dados no servidor\n- Envia um cookie de sessão para o cliente\n- A cada requisição, o cliente envia o cookie e o servidor verifica\n\n**Tokens JWT (client-side):**\n- O servidor gera um token JWT com dados do usuário\n- O cliente armazena e envia o token em cada requisição\n- O servidor verifica o token sem precisar armazenar estado\n\nJWT é mais usado em APIs modernas porque é **stateless** — o servidor não precisa lembrar de nada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo simplificado de token (conceitual)\nimport hashlib\nimport json\nimport time\n\ndef criar_token_simples(usuario_id, segredo):\n    """Cria um token simples (nao use em producao!)"""\n    dados = {\n        "usuario_id": usuario_id,\n        "criado_em": time.time()\n    }\n    dados_json = json.dumps(dados)\n    assinatura = hashlib.sha256(\n        (dados_json + segredo).encode()\n    ).hexdigest()\n    \n    return {\n        "dados": dados,\n        "assinatura": assinatura\n    }\n\ndef verificar_token(token, segredo):\n    """Verifica se o token e valido"""\n    dados_json = json.dumps(token["dados"])\n    assinatura_esperada = hashlib.sha256(\n        (dados_json + segredo).encode()\n    ).hexdigest()\n    return token["assinatura"] == assinatura_esperada\n\n# Usando\nSEGREDO = "chave_super_secreta"\ntoken = criar_token_simples(42, SEGREDO)\nprint(f"Token: {token}")\nprint(f"Valido: {verificar_token(token, SEGREDO)}")',
        filename: 'token_simples.py',
        description: 'Exemplo conceitual de como tokens funcionam.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Em produção, use bibliotecas como **PyJWT** ou **Flask-JWT-Extended** para trabalhar com tokens JWT. Elas lidam com expiração, renovação e segurança automaticamente. O exemplo acima é apenas para entender o conceito!',
    },
    {
      type: 'text',
      content:
        '## Protegendo Rotas\n\nAgora vamos juntar tudo: cadastro de usuários com hash de senha, login que retorna um token e proteção de rotas que exigem autenticação.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from flask import Flask, jsonify, request\nfrom werkzeug.security import generate_password_hash, check_password_hash\nfrom functools import wraps\nimport hashlib\nimport json\nimport time\n\napp = Flask(__name__)\nSEGREDO = "meu_segredo_super_secreto"\n\n# Banco de dados simples em memoria\nusuarios = {}\n\ndef gerar_token(usuario_id):\n    dados = json.dumps({"id": usuario_id, "exp": time.time() + 3600})\n    assinatura = hashlib.sha256((dados + SEGREDO).encode()).hexdigest()\n    return dados + "." + assinatura\n\ndef verificar_token(token):\n    try:\n        partes = token.rsplit(".", 1)\n        dados_json, assinatura = partes[0], partes[1]\n        assinatura_esperada = hashlib.sha256(\n            (dados_json + SEGREDO).encode()\n        ).hexdigest()\n        if assinatura != assinatura_esperada:\n            return None\n        dados = json.loads(dados_json)\n        if dados["exp"] < time.time():\n            return None\n        return dados\n    except Exception:\n        return None\n\ndef login_necessario(f):\n    @wraps(f)\n    def decorador(*args, **kwargs):\n        token = request.headers.get("Authorization", "").replace("Bearer ", "")\n        dados = verificar_token(token)\n        if not dados:\n            return jsonify({"erro": "Token invalido ou expirado"}), 401\n        return f(dados["id"], *args, **kwargs)\n    return decorador\n\n@app.route("/api/cadastro", methods=["POST"])\ndef cadastro():\n    dados = request.get_json()\n    email = dados["email"]\n    if email in usuarios:\n        return jsonify({"erro": "Email ja cadastrado"}), 400\n    usuarios[email] = {\n        "nome": dados["nome"],\n        "senha_hash": generate_password_hash(dados["senha"])\n    }\n    return jsonify({"mensagem": "Cadastro realizado!"}), 201\n\n@app.route("/api/login", methods=["POST"])\ndef login():\n    dados = request.get_json()\n    usuario = usuarios.get(dados["email"])\n    if not usuario or not check_password_hash(usuario["senha_hash"], dados["senha"]):\n        return jsonify({"erro": "Email ou senha incorretos"}), 401\n    token = gerar_token(dados["email"])\n    return jsonify({"token": token})\n\n@app.route("/api/perfil", methods=["GET"])\n@login_necessario\ndef perfil(usuario_id):\n    usuario = usuarios.get(usuario_id)\n    return jsonify({"email": usuario_id, "nome": usuario["nome"]})\n\nif __name__ == "__main__":\n    app.run(debug=True)',
        filename: 'autenticacao_completa.py',
        description: 'Sistema completo de autenticação com Flask.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'O decorador `@login_necessario` funciona como um "guarda": ele intercepta a requisição, verifica o token no header Authorization e só permite que a função da rota execute se o token for válido.',
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
        '## JWT — Token de Autenticacao\n\n**JWT (JSON Web Token)** e o padrao moderno para autenticacao em APIs. Em vez de manter sessoes no servidor, o servidor gera um token assinado que o cliente guarda e envia em cada requisicao.\n\nUm JWT tem 3 partes separadas por pontos:\n- **Header** — algoritmo usado (ex: HS256)\n- **Payload** — dados do usuario (id, email, papel)\n- **Signature** — assinatura que garante a autenticidade\n\nO servidor assina com uma chave secreta. Qualquer alteracao no token invalida a assinatura — impossivel falsificar sem a chave!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'jwt_auth.py',
        code: `from flask import Flask, request, jsonify
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
SECRET_KEY = "sua_chave_super_secreta"  # Em producao: variavel de ambiente!

# Gerar token JWT
def gerar_token(usuario_id, email):
    payload = {
        'user_id': usuario_id,
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

# Decorator para proteger rotas
def requer_token(f):
    @wraps(f)
    def decorada(*args, **kwargs):
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        if not token:
            return jsonify({'erro': 'Token obrigatorio'}), 401
        try:
            dados = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            request.usuario = dados
        except jwt.ExpiredSignatureError:
            return jsonify({'erro': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'erro': 'Token invalido'}), 401
        return f(*args, **kwargs)
    return decorada

@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()
    # Em producao: verificar senha com bcrypt
    if dados.get('email') == 'admin@email.com' and dados.get('senha') == '123':
        token = gerar_token(1, dados['email'])
        return jsonify({'token': token})
    return jsonify({'erro': 'Credenciais invalidas'}), 401

@app.route('/perfil')
@requer_token  # Rota protegida!
def perfil():
    return jsonify({'usuario': request.usuario['email']})`,
        description: 'JWT: o servidor gera um token assinado. O cliente envia no header Authorization: Bearer <token>.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Seguranca essencial: NUNCA salve senhas em texto puro no banco. Use bcrypt (pip install bcrypt) para criar um hash da senha: bcrypt.hashpw(senha.encode(), bcrypt.gensalt()). Verifique com bcrypt.checkpw(). Tambem guarde a SECRET_KEY em variaveis de ambiente (.env), nao no codigo!',
    },
  ],
  challenges: [
    {
      id: 'be6-c1',
      title: 'Sistema de Cadastro Seguro',
      description:
        'Crie um sistema de cadastro que armazena usuários com senha hasheada. Implemente as funções cadastrar(nome, email, senha) e verificar_login(email, senha).',
      language: 'python',
      starterCode: 'from werkzeug.security import generate_password_hash, check_password_hash\n\nusuarios = {}\n\ndef cadastrar(nome, email, senha):\n    # Cadastre o usuario com senha hasheada\n    pass\n\ndef verificar_login(email, senha):\n    # Retorne True se email e senha estao corretos\n    pass\n\n# Teste\ncadastrar("Ana", "ana@email.com", "senha123")\nprint(verificar_login("ana@email.com", "senha123"))  # True\nprint(verificar_login("ana@email.com", "errada"))    # False\nprint(verificar_login("nao@existe.com", "senha"))    # False',
      solution: 'from werkzeug.security import generate_password_hash, check_password_hash\n\nusuarios = {}\n\ndef cadastrar(nome, email, senha):\n    if email in usuarios:\n        print("Email ja cadastrado!")\n        return False\n    usuarios[email] = {\n        "nome": nome,\n        "senha_hash": generate_password_hash(senha)\n    }\n    print(f"Usuario {nome} cadastrado com sucesso!")\n    return True\n\ndef verificar_login(email, senha):\n    usuario = usuarios.get(email)\n    if not usuario:\n        return False\n    return check_password_hash(usuario["senha_hash"], senha)\n\ncadastrar("Ana", "ana@email.com", "senha123")\nprint(verificar_login("ana@email.com", "senha123"))  # True\nprint(verificar_login("ana@email.com", "errada"))    # False\nprint(verificar_login("nao@existe.com", "senha"))    # False',
      hints: [
        'Use generate_password_hash(senha) para criar o hash',
        'Use check_password_hash(hash, senha) para verificar',
        'Verifique se o email já existe antes de cadastrar',
      ],
    },
    {
      id: 'be6-c2',
      title: 'Middleware de Autenticação',
      description:
        'Crie um decorador "requer_autenticacao" que verifica se um header "X-API-Key" está presente e é válido antes de executar a função da rota. Se inválido, retorne erro 401.',
      language: 'python',
      starterCode: 'from flask import Flask, jsonify, request\nfrom functools import wraps\n\napp = Flask(__name__)\n\nAPI_KEY_VALIDA = "chave-secreta-123"\n\n# Crie o decorador requer_autenticacao\ndef requer_autenticacao(f):\n    @wraps(f)\n    def decorador(*args, **kwargs):\n        # Verifique o header X-API-Key\n        pass\n    return decorador\n\n# Rota publica\n@app.route("/api/publico")\ndef publico():\n    return jsonify({"mensagem": "Acesso livre!"})\n\n# Rota protegida\n@app.route("/api/protegido")\n@requer_autenticacao\ndef protegido():\n    return jsonify({"mensagem": "Voce tem acesso!"})\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      solution: 'from flask import Flask, jsonify, request\nfrom functools import wraps\n\napp = Flask(__name__)\n\nAPI_KEY_VALIDA = "chave-secreta-123"\n\ndef requer_autenticacao(f):\n    @wraps(f)\n    def decorador(*args, **kwargs):\n        api_key = request.headers.get("X-API-Key")\n        if not api_key or api_key != API_KEY_VALIDA:\n            return jsonify({"erro": "API Key invalida ou ausente"}), 401\n        return f(*args, **kwargs)\n    return decorador\n\n@app.route("/api/publico")\ndef publico():\n    return jsonify({"mensagem": "Acesso livre!"})\n\n@app.route("/api/protegido")\n@requer_autenticacao\ndef protegido():\n    return jsonify({"mensagem": "Voce tem acesso!"})\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      hints: [
        'Use request.headers.get("X-API-Key") para ler o header',
        'Compare a chave recebida com a chave válida',
        'Retorne status 401 se a autenticação falhar',
      ],
    },
  ],
};
