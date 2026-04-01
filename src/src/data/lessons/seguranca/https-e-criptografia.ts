import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'https-e-criptografia',
  moduleId: 'seguranca',
  title: 'HTTPS e Criptografia',
  description: 'Entenda o que TLS protege, a diferenca entre criptografia simetrica e assimetrica, e como configurar headers de segurança corretamente',
  order: 4,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## HTTP vs HTTPS\n\nHTTP transmite dados em texto puro. Qualquer pessoa na mesma rede pode ler: senhas, tokens, dados pessoais.\n\nHTTPS = HTTP + TLS (Transport Layer Security). O TLS protege:\n- **Confidencialidade**: dados sao criptografados em transito\n- **Integridade**: nao e possivel modificar os dados sem detectar\n- **Autenticidade**: o certificado prova que voce esta falando com o servidor correto\n\n### Criptografia Simetrica vs Assimetrica\n\n**Simetrica**: mesma chave para criptografar e descriptografar\n- Rapida, eficiente\n- Problema: como compartilhar a chave com segurança pela internet?\n- Algoritmos: AES, ChaCha20\n\n**Assimetrica (chave publica/privada)**:\n- Chave publica: qualquer um pode usar para criptografar\n- Chave privada: so o dono pode usar para descriptografar\n- Lenta, mas resolve o problema de troca de chaves\n- Algoritmos: RSA, ECDSA\n\n**TLS combina os dois**: usa criptografia assimetrica para trocar uma chave simetrica de sessao, depois usa essa chave simetrica (mais rapida) para o resto da comunicacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Headers de segurança essenciais para uma aplicacao web\n# Exemplo com Flask, mas os conceitos se aplicam a qualquer framework\n\nfrom flask import Flask, Response\n\napp = Flask(__name__)\n\n@app.after_request\ndef adicionar_headers_seguranca(response: Response) -> Response:\n    # Forcа HTTPS por 1 ano (incluindo subdomains)\n    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"\n    \n    # Evita clickjacking (nao permite iframe por outros dominios)\n    response.headers["X-Frame-Options"] = "DENY"\n    \n    # Evita MIME type sniffing\n    response.headers["X-Content-Type-Options"] = "nosniff"\n    \n    # Politica de recursos: so carrega de fontes explicitas\n    response.headers["Content-Security-Policy"] = (\n        "default-src \'self\'; "\n        "script-src \'self\'; "\n        "style-src \'self\' \'unsafe-inline\'; "\n        "img-src \'self\' data: https:; "\n    )\n    \n    # Remove informacao sobre o servidor\n    response.headers.pop("Server", None)\n    response.headers.pop("X-Powered-By", None)\n    \n    # Cookies seguros\n    # Defina ao criar cookies: httponly=True, secure=True, samesite="Strict"\n    \n    return response',
        filename: 'headers_seguranca.py',
        description: 'Headers de segurança sao a primeira linha de defesa de uma aplicacao web. HSTS forcа HTTPS, X-Frame-Options evita clickjacking, CSP restringe de onde recursos podem ser carregados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Verifique os headers de segurança do seu site em securityheaders.com — ele da uma nota e mostra o que esta faltando.',
    },
    {
      type: 'text',
      content: '## Boas Praticas de Criptografia\n\n**Use bibliotecas, nao implemente voce mesmo**\nCriptografia e extremamente dificil de implementar corretamente. Use bibliotecas auditadas como `cryptography` (Python), `crypto` (Node.js).\n\n**Dados em repouso**\nBanco de dados com dados sensiveis (CPF, cartao) devem ser criptografados. Use criptografia a nivel de campo para dados especialmente sensiveis.\n\n**Segredos e configuracoes**\n- Nunca commite chaves, senhas ou certificados no git\n- Use variaveis de ambiente ou cofres de segredos (AWS Secrets Manager, HashiCorp Vault)\n- Adicione `.env` e `*.pem` ao `.gitignore`\n\n**Geracao de numeros aleatorios**\nPara criptografia, use `secrets` (Python) ou `crypto.randomBytes` (Node.js), nunca `random` — que e previsivel.',
    },
  ],
  challenges: [
    {
      id: 'https-c1',
      title: 'Gere Tokens Seguros',
      description: 'O codigo abaixo usa o modulo `random` para gerar tokens de redefinicao de senha. Isso e inseguro pois `random` e previsivel. Corrija usando o modulo `secrets` e implemente a funcao de verificacao.',
      language: 'python',
      starterCode: 'import random\nimport string\nimport time\n\n# INSEGURO: random e previsivel\ndef gerar_token_inseguro() -> str:\n    chars = string.ascii_letters + string.digits\n    return "".join(random.choices(chars, k=32))\n\n# Banco de dados simulado de tokens\ntokens_db = {}  # token -> {"email": str, "expira_em": float}\n\ndef solicitar_redefinicao(email: str) -> str:\n    """Gera token de redefinicao de senha para o email."""\n    # TODO: use secrets.token_urlsafe() em vez de random\n    # TODO: armazene o token com expiracao de 1 hora\n    token = gerar_token_inseguro()  # substituir por seguro\n    return token\n\ndef verificar_token(token: str, email: str) -> bool:\n    """Verifica se o token e valido e nao expirou para o email."""\n    # TODO: buscar token no banco\n    # TODO: verificar se nao expirou (time.time() > expira_em)\n    # TODO: verificar se pertence ao email correto\n    # TODO: invalidar o token apos uso (single use)\n    pass\n\n# Teste\ntoken = solicitar_redefinicao("ana@email.com")\nprint(f"Token gerado: {token}")\nprint(verificar_token(token, "ana@email.com"))   # True\nprint(verificar_token(token, "ana@email.com"))   # False (single use)\nprint(verificar_token("tokenfalso", "ana@email.com"))  # False\n',
      solution: 'import secrets\nimport time\n\ntokens_db = {}\n\ndef solicitar_redefinicao(email: str) -> str:\n    token = secrets.token_urlsafe(32)  # criptograficamente seguro\n    tokens_db[token] = {\n        "email": email,\n        "expira_em": time.time() + 3600  # 1 hora\n    }\n    return token\n\ndef verificar_token(token: str, email: str) -> bool:\n    dados = tokens_db.get(token)\n    if not dados:\n        return False\n    if time.time() > dados["expira_em"]:\n        del tokens_db[token]  # limpa token expirado\n        return False\n    if dados["email"] != email:\n        return False\n    del tokens_db[token]  # single use: invalida apos uso\n    return True\n\ntoken = solicitar_redefinicao("ana@email.com")\nprint(f"Token: {token}")\nprint(verificar_token(token, "ana@email.com"))        # True\nprint(verificar_token(token, "ana@email.com"))        # False (ja usado)\nprint(verificar_token("tokenfalso", "ana@email.com")) # False\n',
      hints: [
        'Use secrets.token_urlsafe(32) para gerar tokens criptograficamente seguros',
        'Armazene junto ao token o timestamp de expiracao: time.time() + 3600 (1 hora)',
        'Apos verificar com sucesso, remova o token do banco (del tokens_db[token]) para uso unico',
      ],
    },
  ],
};
