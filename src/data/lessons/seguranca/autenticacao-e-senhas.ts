import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'autenticacao-e-senhas',
  moduleId: 'seguranca',
  title: 'Autenticacao e Senhas',
  description: 'Por que nunca armazenar senhas em texto puro, como funciona hashing com bcrypt e como implementar autenticacao segura com JWT',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Autenticacao e Senhas\n\nArmazenar senhas em texto puro e um dos erros mais graves em segurança. Quando um banco de dados e vazado (e isso acontece com frequencia), todas as senhas ficam expostas imediatamente.\n\n### Hashing vs Criptografia\n\n**Criptografia** e reversivel: voce pode descriptografar. Nunca use para senhas.\n\n**Hashing** e irreversivel: dado um hash, nao e possivel recuperar a senha original. E o que deve ser usado para senhas.\n\n### Por que hashes simples (MD5, SHA1) nao sao suficientes\n\n- Sao rapidos demais — um atacante pode testar bilhoes de senhas por segundo\n- Sao deterministicos — a mesma senha sempre gera o mesmo hash\n- Sao vulneraveis a rainbow tables (tabelas pre-calculadas de hashes)\n\n### bcrypt: o padrao para senhas\n\nbcrypt resolve esses problemas com:\n1. **Salt automatico**: adiciona aleatoriedade, mesmo senhas iguais geram hashes diferentes\n2. **Fator de custo**: quanto mais alto, mais lento (e mais seguro contra brute force)\n3. **Projetado para ser lento**: 100ms por verificacao e aceitavel para usuario, impossivel para ataque em massa',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# pip install bcrypt\nimport bcrypt\n\n# NUNCA faca isso\nsenha_texto_puro = "minhasenha123"\nprint(senha_texto_puro)  # "minhasenha123" — qualquer um que acessar o banco ve\n\n# Forma correta com bcrypt\ndef criar_hash_senha(senha: str) -> bytes:\n    """Gera hash seguro com salt automatico."""\n    salt = bcrypt.gensalt(rounds=12)  # rounds=12 e o padrao seguro\n    return bcrypt.hashpw(senha.encode(), salt)\n\ndef verificar_senha(senha: str, hash_armazenado: bytes) -> bool:\n    """Verifica se a senha confere com o hash."""\n    return bcrypt.checkpw(senha.encode(), hash_armazenado)\n\n# Cadastro\nsenha = "minhasenha123"\nhash_salvo = criar_hash_senha(senha)\nprint(hash_salvo)  # $2b$12$... — algo como 60 caracteres\n\n# Mesmo senha, hash diferente a cada vez (por causa do salt)\nhash2 = criar_hash_senha(senha)\nprint(hash_salvo == hash2)  # False — mesmo assim ambos verificam corretamente!\n\n# Login\nprint(verificar_senha("minhasenha123", hash_salvo))  # True\nprint(verificar_senha("senhaerrada", hash_salvo))    # False\nprint(verificar_senha("minhasenha123", hash2))       # True — salt diferente, mesmo resultado',
        filename: 'bcrypt_exemplo.py',
        description: 'bcrypt gera um salt diferente a cada chamada, por isso dois hashes da mesma senha sao diferentes. A funcao checkpw extrai o salt do hash armazenado para comparar corretamente.',
      },
    },
    {
      type: 'text',
      content: '## JWT: JSON Web Tokens\n\nJWT e um formato de token para transmitir informacoes verificaveis entre partes.\n\n**Estrutura**: header.payload.signature\n- **Header**: algoritmo usado (ex: HS256)\n- **Payload**: dados (user_id, email, expiracao)\n- **Signature**: HMAC do header+payload com chave secreta\n\n```\neyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMjN9.abc123\n     header              payload             signature\n```\n\n### Como funciona\n1. Usuario faz login com email+senha\n2. Servidor valida credenciais, gera JWT assinado com chave secreta\n3. Cliente armazena o JWT (localStorage ou cookie)\n4. Cada requisicao envia o JWT no header: `Authorization: Bearer <token>`\n5. Servidor verifica a assinatura — se valida, o usuario esta autenticado\n\n### Vulnerabilidades comuns com JWT\n- **Chave fraca**: use chaves aleatorias longas (32+ bytes)\n- **Sem expiracao**: sempre defina `exp`\n- **Algoritmo "none"**: sempre valide o algoritmo esperado\n- **Dados sensiveis no payload**: o payload e apenas codificado em base64, nao criptografado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# pip install pyjwt bcrypt\nimport jwt\nimport bcrypt\nimport os\nfrom datetime import datetime, timedelta\n\nSECRET_KEY = os.environ.get("JWT_SECRET")  # nunca hardcode!\nALGORITHM = "HS256"\n\ndef fazer_login(email: str, senha: str, usuarios_db: dict) -> str | None:\n    """Retorna JWT se credenciais validas, None caso contrario."""\n    usuario = usuarios_db.get(email)\n    if not usuario:\n        return None\n    \n    if not bcrypt.checkpw(senha.encode(), usuario["senha_hash"]):\n        return None\n    \n    payload = {\n        "user_id": usuario["id"],\n        "email": email,\n        "exp": datetime.utcnow() + timedelta(hours=24),  # expira em 24h\n    }\n    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)\n\ndef verificar_token(token: str) -> dict | None:\n    """Retorna payload se token valido, None se invalido ou expirado."""\n    try:\n        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])\n        return payload\n    except jwt.ExpiredSignatureError:\n        return None  # token expirado\n    except jwt.InvalidTokenError:\n        return None  # token invalido ou adulterado',
        filename: 'jwt_seguro.py',
        description: 'Fluxo completo: bcrypt para senhas, JWT para sessoes. A chave secreta vem de variavel de ambiente. O token expira em 24h. Erros sao tratados silenciosamente para nao vazar informacao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Nunca armazene a chave secreta do JWT no codigo. Use variaveis de ambiente. Se a chave vazar, qualquer pessoa pode gerar tokens validos para qualquer usuario.',
    },
  ],
  challenges: [
    {
      id: 'auth-c1',
      title: 'Implemente o Sistema de Autenticacao',
      description: 'Implemente um sistema completo de cadastro e login com senhas hasheadas com bcrypt. O sistema deve: (1) cadastrar usuario com senha hasheada, (2) fazer login validando a senha, (3) rejeitar senha incorreta, (4) nunca armazenar senha em texto puro.',
      language: 'python',
      starterCode: '# pip install bcrypt\nimport bcrypt\n\n# Banco de dados simulado\nusuarios = {}  # email -> {"id": int, "email": str, "senha_hash": bytes}\nproximo_id = 1\n\ndef cadastrar_usuario(email: str, senha: str) -> bool:\n    """Cadastra usuario com senha hasheada. Retorna False se email ja existe."""\n    # TODO: verificar se email ja existe\n    # TODO: hashear a senha com bcrypt\n    # TODO: salvar no dicionario usuarios\n    pass\n\ndef fazer_login(email: str, senha: str) -> dict | None:\n    """Retorna dados do usuario se credenciais validas, None caso contrario."""\n    # TODO: buscar usuario pelo email\n    # TODO: verificar senha com bcrypt.checkpw\n    # TODO: retornar dados (sem a senha_hash!)\n    pass\n\n# Testes\ncadastrar_usuario("ana@email.com", "senha123")\ncadastrar_usuario("bruno@email.com", "outrasenha")\n\nresultado = fazer_login("ana@email.com", "senha123")\nprint(resultado)  # {"id": 1, "email": "ana@email.com"}\n\nresultado = fazer_login("ana@email.com", "senhaerrada")\nprint(resultado)  # None\n\nresultado = fazer_login("inexistente@email.com", "senha")\nprint(resultado)  # None\n',
      solution: 'import bcrypt\n\nusuarios = {}\nproximo_id = 1\n\ndef cadastrar_usuario(email: str, senha: str) -> bool:\n    global proximo_id\n    if email in usuarios:\n        return False\n    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt(rounds=12))\n    usuarios[email] = {"id": proximo_id, "email": email, "senha_hash": senha_hash}\n    proximo_id += 1\n    return True\n\ndef fazer_login(email: str, senha: str) -> dict | None:\n    usuario = usuarios.get(email)\n    if not usuario:\n        return None\n    if not bcrypt.checkpw(senha.encode(), usuario["senha_hash"]):\n        return None\n    return {"id": usuario["id"], "email": usuario["email"]}\n\ncadastrar_usuario("ana@email.com", "senha123")\ncadastrar_usuario("bruno@email.com", "outrasenha")\n\nprint(fazer_login("ana@email.com", "senha123"))       # {"id": 1, "email": ...}\nprint(fazer_login("ana@email.com", "senhaerrada"))    # None\nprint(fazer_login("inexistente@email.com", "senha"))  # None\n',
      hints: [
        'Use bcrypt.hashpw(senha.encode(), bcrypt.gensalt()) para criar o hash',
        'Use bcrypt.checkpw(senha.encode(), hash_armazenado) para verificar — retorna True ou False',
        'Ao retornar dados do usuario no login, nao inclua senha_hash na resposta',
      ],
    },
  ],
};
