import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-auditoria-de-seguranca',
  moduleId: 'seguranca',
  title: 'Projeto: Auditoria de Seguranca',
  description: 'Audite um sistema web completo com multiplas vulnerabilidades, identifique cada falha, explique o risco e corrija tudo',
  order: 5,
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content: '## Projeto: Auditoria de Seguranca\n\nVoce foi contratado para auditar o sistema de usuarios de uma startup. O CTO admite que o codigo foi escrito rapido e pode ter problemas de segurança.\n\nSua missao:\n1. Ler o codigo e identificar todas as vulnerabilidades\n2. Classificar cada vulnerabilidade por severidade (critica, alta, media)\n3. Explicar o risco de cada uma\n4. Corrigir o codigo\n\nO sistema tem ao menos **5 vulnerabilidades conhecidas** — tente encontrar todas antes de ver a solucao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# sistema_usuarios.py — codigo para auditar\nimport sqlite3\nimport hashlib\nimport random\nimport string\n\nDB = "usuarios.db"\n\ndef inicializar_banco():\n    conn = sqlite3.connect(DB)\n    conn.execute("""\n        CREATE TABLE IF NOT EXISTS usuarios (\n            id INTEGER PRIMARY KEY,\n            email TEXT UNIQUE,\n            senha TEXT,\n            role TEXT DEFAULT \'user\'\n        )\n    """)\n    conn.commit()\n    conn.close()\n\ndef cadastrar(email: str, senha: str) -> bool:\n    # VULNERABILIDADE 1: senha armazenada em texto puro\n    conn = sqlite3.connect(DB)\n    try:\n        conn.execute(\n            f"INSERT INTO usuarios (email, senha) VALUES (\'{email}\', \'{senha}\')",\n            # VULNERABILIDADE 2: SQL injection via f-string\n        )\n        conn.commit()\n        return True\n    except:\n        return False\n    finally:\n        conn.close()\n\ndef login(email: str, senha: str) -> dict | None:\n    conn = sqlite3.connect(DB)\n    # VULNERABILIDADE 3: SQL injection no login (permite bypass)\n    resultado = conn.execute(\n        f"SELECT * FROM usuarios WHERE email=\'{email}\' AND senha=\'{senha}\'\"\n    ).fetchone()\n    conn.close()\n    if resultado:\n        return {"id": resultado[0], "email": resultado[1], "role": resultado[3]}\n    return None\n\ndef gerar_token_sessao() -> str:\n    # VULNERABILIDADE 4: token previsivel com random\n    chars = string.ascii_letters + string.digits\n    return "".join(random.choices(chars, k=16))  # 16 chars e curto demais\n\ndef redefinir_senha(email: str, nova_senha: str) -> bool:\n    # VULNERABILIDADE 5: nao valida se o usuario tem direito de redefinir\n    # qualquer um pode redefinir a senha de qualquer email\n    conn = sqlite3.connect(DB)\n    conn.execute(\n        f"UPDATE usuarios SET senha=\'{nova_senha}\' WHERE email=\'{email}\'"\n    )\n    conn.commit()\n    conn.close()\n    return True',
        filename: 'sistema_vulneravel.py',
        description: 'Sistema com 5 vulnerabilidades: senha em texto puro, SQL injection no cadastro, SQL injection no login (permite bypass de autenticacao), token inseguro e redefinicao de senha sem autenticacao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'No login, a vulnerabilidade 3 permite autenticar como qualquer usuario com o email: admin@empresa.com\'-- (o -- comenta o resto da query, ignorando a verificacao de senha).',
    },
  ],
  challenges: [
    {
      id: 'auditoria-c1',
      title: 'Corrija as 5 Vulnerabilidades',
      description: 'Corrija o sistema abaixo eliminando todas as 5 vulnerabilidades. Para cada correcao, adicione um comentario explicando qual vulnerabilidade foi corrigida e como.',
      language: 'python',
      starterCode: '# pip install bcrypt\nimport sqlite3\nimport hashlib\nimport random\nimport string\nimport bcrypt\nimport secrets\n\nDB = "usuarios.db"\n\ndef inicializar_banco():\n    conn = sqlite3.connect(DB)\n    conn.execute("""\n        CREATE TABLE IF NOT EXISTS usuarios (\n            id INTEGER PRIMARY KEY,\n            email TEXT UNIQUE,\n            senha TEXT,\n            role TEXT DEFAULT \'user\'\n        )\n    """)\n    conn.commit()\n    conn.close()\n\n# CORRIGIR: senha em texto puro + SQL injection\ndef cadastrar(email: str, senha: str) -> bool:\n    conn = sqlite3.connect(DB)\n    try:\n        conn.execute(\n            f"INSERT INTO usuarios (email, senha) VALUES (\'{email}\', \'{senha}\')",\n        )\n        conn.commit()\n        return True\n    except:\n        return False\n    finally:\n        conn.close()\n\n# CORRIGIR: SQL injection que permite bypass\ndef login(email: str, senha: str) -> dict | None:\n    conn = sqlite3.connect(DB)\n    resultado = conn.execute(\n        f"SELECT * FROM usuarios WHERE email=\'{email}\' AND senha=\'{senha}\'"\n    ).fetchone()\n    conn.close()\n    if resultado:\n        return {"id": resultado[0], "email": resultado[1], "role": resultado[3]}\n    return None\n\n# CORRIGIR: token previsivel\ndef gerar_token_sessao() -> str:\n    chars = string.ascii_letters + string.digits\n    return "".join(random.choices(chars, k=16))\n\n# CORRIGIR: sem autenticacao + SQL injection\ndef redefinir_senha(email: str, nova_senha: str) -> bool:\n    conn = sqlite3.connect(DB)\n    conn.execute(\n        f"UPDATE usuarios SET senha=\'{nova_senha}\' WHERE email=\'{email}\'"\n    )\n    conn.commit()\n    conn.close()\n    return True\n',
      solution: 'import sqlite3\nimport bcrypt\nimport secrets\n\nDB = "usuarios.db"\n\ndef inicializar_banco():\n    conn = sqlite3.connect(DB)\n    conn.execute("""\n        CREATE TABLE IF NOT EXISTS usuarios (\n            id INTEGER PRIMARY KEY,\n            email TEXT UNIQUE,\n            senha_hash TEXT,\n            role TEXT DEFAULT \'user\'\n        )\n    """)\n    conn.commit()\n    conn.close()\n\n# CORRECAO 1: bcrypt para senha | CORRECAO 2: parametros em vez de f-string\ndef cadastrar(email: str, senha: str) -> bool:\n    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt(rounds=12)).decode()\n    conn = sqlite3.connect(DB)\n    try:\n        conn.execute(\n            "INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)",\n            (email, senha_hash)  # parametros evitam SQL injection\n        )\n        conn.commit()\n        return True\n    except Exception:\n        return False\n    finally:\n        conn.close()\n\n# CORRECAO 3: buscar por email, verificar senha com bcrypt (nao via SQL)\ndef login(email: str, senha: str) -> dict | None:\n    conn = sqlite3.connect(DB)\n    resultado = conn.execute(\n        "SELECT id, email, senha_hash, role FROM usuarios WHERE email = ?",\n        (email,)  # parametro seguro\n    ).fetchone()\n    conn.close()\n    if not resultado:\n        return None\n    id_, email_, hash_, role = resultado\n    if not bcrypt.checkpw(senha.encode(), hash_.encode()):\n        return None\n    return {"id": id_, "email": email_, "role": role}\n\n# CORRECAO 4: secrets para token criptograficamente seguro\ndef gerar_token_sessao() -> str:\n    return secrets.token_urlsafe(32)  # 32 bytes = 256 bits de entropia\n\n# CORRECAO 5: exige token de verificacao antes de redefinir\ntokens_redefinicao = {}  # token -> email\n\ndef solicitar_redefinicao(email: str) -> str:\n    """Gera token de redefinicao — deve ser enviado por email."""\n    token = secrets.token_urlsafe(32)\n    tokens_redefinicao[token] = email\n    return token\n\ndef redefinir_senha(token: str, nova_senha: str) -> bool:\n    """Redefine senha apenas com token valido."""\n    email = tokens_redefinicao.pop(token, None)  # single use\n    if not email:\n        return False\n    nova_hash = bcrypt.hashpw(nova_senha.encode(), bcrypt.gensalt()).decode()\n    conn = sqlite3.connect(DB)\n    conn.execute(\n        "UPDATE usuarios SET senha_hash = ? WHERE email = ?",\n        (nova_hash, email)\n    )\n    conn.commit()\n    conn.close()\n    return True\n',
      hints: [
        'Vulnerabilidade 1 e 2: use bcrypt.hashpw() para a senha E troque f-strings por parametros (?) no execute()',
        'Vulnerabilidade 3: busque o usuario pelo email com parametro, depois use bcrypt.checkpw() para verificar a senha — nao inclua a senha na query SQL',
        'Vulnerabilidade 4: use secrets.token_urlsafe(32). Vulnerabilidade 5: crie um fluxo de dois passos — solicitar_redefinicao() gera token, redefinir_senha() exige o token',
      ],
    },
  ],
};
