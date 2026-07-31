import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'rate-limiting-brute-force',
  moduleId: 'seguranca',
  title: 'Rate Limiting e Brute Force',
  description: 'Como atacantes testam milhoes de senhas automaticamente, como rate limiting bloqueia isso, e como implementar protecao contra brute force em APIs e login',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O que e Brute Force\n\nAtaque de forca bruta e quando um atacante tenta sistematicamente todas as combinacoes possiveis ate encontrar a certa. Em software, os alvos mais comuns sao:\n\n- **Senhas de login**: testar listas de senhas comuns ("123456", "senha123", "admin")\n- **Tokens de sessao ou reset de senha**: adivinhar tokens curtos ou previstos\n- **Codigos de verificacao** (OTP via SMS): testar todos os 6 digitos de 000000 a 999999\n- **IDs de recursos**: enumerar IDs para encontrar dados de outros usuarios (IDOR)\n\n### Por que funciona?\n\nUm computador pode fazer centenas ou milhares de requisicoes por segundo. Sem limitacao, um formulario de login e apenas uma funcao que o atacante chama em loop.\n\n**Exemplo de velocidade:**\n```\nSem rate limiting:\n  1.000 tentativas/segundo\n  Senha de 4 digitos (10.000 combinacoes): 10 segundos\n  Lista de 10.000 senhas comuns: 10 segundos\n\nCom rate limiting de 5 tentativas/minuto:\n  10.000 combinacoes: 33 horas\n  10.000 senhas comuns: 33 horas\n```\n\n### Credential Stuffing\n\nVariante do brute force: o atacante usa listas de emails e senhas vazados de outros sites (compras em mercados ilegais ou downloads de dumps publicos) e testa nos seus sistemas. Como muitas pessoas reutilizam senhas, a taxa de sucesso e alta.',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Em 2022, a plataforma de streaming Shopee sofreu credential stuffing: atacantes usaram 1.9 bilhao de pares email/senha vazados de outros sites para tentar logar em contas Shopee. Usuarios que reutilizaram senhas tiveram suas contas comprometidas. Rate limiting e deteccao de anomalias sao a primeira linha de defesa.',
    },
    {
      type: 'text',
      content:
        '## Rate Limiting — Limitacao de Taxa\n\nRate limiting restringe quantas requisicoes um cliente pode fazer em um periodo de tempo. E a principal defesa contra brute force.\n\n### Estrategias de limitacao\n\n**Por IP**: conta requisicoes do mesmo endereco de rede\n- Simples de implementar\n- Atacantes com multiplos IPs podem contornar\n\n**Por usuario/email**: conta tentativas para o mesmo email\n- Mais eficaz: impede testar uma senha em uma conta mesmo com IPs diferentes\n- Cuidado: pode ser usado para bloquear usuarios legitimos (DoS)\n\n**Por combinacao**: IP + usuario/email\n- Mais robusto\n\n### Janelas de tempo\n\n**Janela fixa**: conta requisicoes em intervalos fixos (ex.: max 10 por minuto, o contador zera a cada minuto)\n- Simples\n- Vulneravel: atacante pode fazer 10 no final de um minuto e 10 no inicio do proximo (20 em 2 segundos)\n\n**Janela deslizante**: conta requisicoes nos ultimos N segundos a partir do momento atual\n- Mais justo e preciso\n- Um pouco mais complexo de implementar com Redis',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Rate limiting manual com dicionario em memoria\n# Para producao, use Redis para funcionar com multiplos servidores\nimport time\nfrom collections import defaultdict\nfrom flask import Flask, request, jsonify\n\napp = Flask(__name__)\n\n# Armazena: ip -> [timestamps das requisicoes]\ntentativas_por_ip: dict[str, list[float]] = defaultdict(list)\ntentativas_por_email: dict[str, list[float]] = defaultdict(list)\n\nLIMITE_POR_IP = 20       # max 20 tentativas por IP\nLIMITE_POR_EMAIL = 5     # max 5 tentativas por email\nJANELA_SEGUNDOS = 60     # janela de 1 minuto\nBLOQUEIO_SEGUNDOS = 300  # bloqueio de 5 minutos apos exceder\n\ndef verificar_rate_limit(chave: str, armazenamento: dict, limite: int) -> bool:\n    """Retorna True se permitido, False se limite excedido."""\n    agora = time.time()\n    janela_inicio = agora - JANELA_SEGUNDOS\n\n    # Remove tentativas antigas (fora da janela)\n    armazenamento[chave] = [\n        t for t in armazenamento[chave]\n        if t > janela_inicio\n    ]\n\n    if len(armazenamento[chave]) >= limite:\n        return False  # limite excedido\n\n    # Registra esta tentativa\n    armazenamento[chave].append(agora)\n    return True  # permitido\n\n@app.route(\'/api/login\', methods=[\'POST\'])\ndef login():\n    ip = request.remote_addr\n    dados = request.get_json()\n    email = dados.get("email", "").lower()\n\n    # Verifica rate limit por IP\n    if not verificar_rate_limit(ip, tentativas_por_ip, LIMITE_POR_IP):\n        return jsonify({\n            "erro": "Muitas tentativas. Tente novamente em 1 minuto.",\n        }), 429  # 429 Too Many Requests\n\n    # Verifica rate limit por email (mais restritivo)\n    if not verificar_rate_limit(email, tentativas_por_email, LIMITE_POR_EMAIL):\n        return jsonify({\n            "erro": "Conta temporariamente bloqueada. Tente em 1 minuto.",\n        }), 429\n\n    # Validar credenciais (simulado)\n    if email == "admin@site.com" and dados.get("senha") == "senha_correta":\n        return jsonify({"token": "jwt_aqui"})\n\n    # IMPORTANTE: mesmo tempo de resposta para email invalido e senha errada\n    # para nao revelar quais emails existem no sistema\n    return jsonify({"erro": "Email ou senha incorretos"}), 401\n\n\n# Com Flask-Limiter (biblioteca — muito mais simples em producao)\n# pip install Flask-Limiter\nfrom flask_limiter import Limiter\nfrom flask_limiter.util import get_remote_address\n\nlimiter = Limiter(\n    app=app,\n    key_func=get_remote_address,\n    default_limits=["200 per day", "50 per hour"],\n    storage_uri="memory://",  # use "redis://localhost" em producao\n)\n\n@app.route(\'/api/login-com-limiter\', methods=[\'POST\'])\n@limiter.limit("5 per minute")  # max 5 tentativas de login por minuto por IP\ndef login_com_limiter():\n    # Logica de login aqui\n    return jsonify({"status": "ok"})',
        filename: 'rate_limiting.py',
        description:
          'Dois niveis de rate limiting: por IP (20 tentativas/min) e por email (5 tentativas/min). A janela deslizante remove tentativas antigas a cada verificacao. O Flask-Limiter e a solucao mais pratica para producao. O codigo retorna o mesmo erro para email inexistente e senha errada para nao revelar quais contas existem.',
      },
    },
    {
      type: 'text',
      content:
        '## Outras Defesas Complementares\n\n### Bloqueio Progressivo\nApos N tentativas falhas, aumenta o tempo de espera exponencialmente:\n- 1a falha: sem bloqueio\n- 3 falhas: espere 1 minuto\n- 5 falhas: espere 15 minutos\n- 10 falhas: conta bloqueada, envie email de desbloqueio\n\n### Captcha\nApos algumas tentativas falhas, exige resolver um captcha. Dificulta automacao sem bloquear usuarios legitimos. Use reCAPTCHA v3 (invisivel) para melhor experiencia.\n\n### Deteccao de Anomalias\nMonitore padrao de uso:\n- Login de IP diferente do habitual? Exija 2FA\n- Muitos logins em horario incomum? Alerte\n- Aumento repentino de requisicoes? Bloqueie automaticamente\n\n### Autenticacao Multifator (MFA/2FA)\nMesmo que o atacante descubra a senha, ainda precisa do segundo fator. Torna brute force de senha quase inutil.\n\n### Respostas em Tempo Constante\nFuncoes de login devem demorar o mesmo tempo seja qual for o erro — para nao revelar se o email existe:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Resposta em tempo constante — evita timing attacks e enumeracao de usuarios\nimport bcrypt\nimport time\n\nHASH_DUMMY = bcrypt.hashpw(b"dummy", bcrypt.gensalt())\n# Hash gerado uma vez na inicializacao, usado quando o email nao existe\n\ndef login_seguro(email: str, senha: str, usuarios_db: dict) -> dict | None:\n    usuario = usuarios_db.get(email)\n\n    if usuario:\n        # Email existe: verifica senha real\n        senha_correta = bcrypt.checkpw(senha.encode(), usuario["senha_hash"])\n    else:\n        # Email NAO existe: executa checkpw de qualquer forma\n        # Isso gasta o mesmo tempo que se o email existisse\n        # Sem isso, o atacante mede o tempo de resposta e descobre emails validos\n        bcrypt.checkpw(senha.encode(), HASH_DUMMY)\n        senha_correta = False  # sempre falha\n\n    if not senha_correta:\n        # SEMPRE a mesma mensagem, independente do motivo\n        return None  # "Email ou senha incorretos"\n\n    return {"id": usuario["id"], "email": email}\n\n\n# Bloqueio progressivo com Redis (simulado)\nbloqueios = {}  # email -> {"tentativas": int, "bloqueado_ate": float}\n\ndef calcular_bloqueio(tentativas: int) -> int:\n    """Retorna segundos de bloqueio baseado no numero de tentativas."""\n    if tentativas < 3:  return 0\n    if tentativas < 5:  return 60      # 1 minuto\n    if tentativas < 10: return 900     # 15 minutos\n    return 86400                       # 24 horas (conta bloqueada)\n\ndef registrar_falha_login(email: str) -> int:\n    """Registra falha e retorna segundos de bloqueio atual."""\n    dados = bloqueios.setdefault(email, {"tentativas": 0, "bloqueado_ate": 0})\n    dados["tentativas"] += 1\n    segundos = calcular_bloqueio(dados["tentativas"])\n    if segundos > 0:\n        dados["bloqueado_ate"] = time.time() + segundos\n    return segundos\n\ndef esta_bloqueado(email: str) -> bool:\n    """Verifica se o email esta em periodo de bloqueio."""\n    dados = bloqueios.get(email)\n    if not dados:\n        return False\n    return time.time() < dados["bloqueado_ate"]',
        filename: 'timing_e_bloqueio.py',
        description:
          'Duas tecnicas avancadas: (1) Tempo constante — executa bcrypt mesmo quando o email nao existe, para nao revelar via timing attack quais emails sao validos. (2) Bloqueio progressivo — aumenta o tempo de bloqueio exponencialmente a cada falha, tornando o brute force pratico impossivel.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regras minimas para qualquer sistema de login: (1) Rate limiting de no maximo 5-10 tentativas por minuto por IP e por email. (2) Bloqueio temporario apos 5-10 falhas consecutivas. (3) Mesma mensagem de erro para email inexistente e senha errada. (4) Logs de todas as tentativas falhas com IP e timestamp para detectar ataques.',
    },
  ],
  challenges: [
    {
      id: 'brute-c1',
      title: 'Implemente Rate Limiting no Login',
      description:
        'A funcao de login abaixo nao tem protecao contra brute force — um atacante pode tentar infinitas senhas. Implemente rate limiting por email: maximo 5 tentativas por minuto. Apos exceder, retorne {"bloqueado": True, "segundos_restantes": N}.',
      language: 'python',
      starterCode:
        '# Sistema de login sem protecao — adicione rate limiting por email\nimport time\nfrom collections import defaultdict\nimport bcrypt\n\n# Banco simulado\nusuarios_db = {\n    "ana@email.com": {\n        "id": 1,\n        "senha_hash": bcrypt.hashpw(b"senha123", bcrypt.gensalt())\n    }\n}\n\n# TODO: estrutura para armazenar tentativas por email\ntentativas: dict = {}\n\nLIMITE = 5        # max tentativas\nJANELA = 60       # segundos\n\ndef verificar_rate_limit(email: str) -> tuple[bool, int]:\n    """Retorna (permitido: bool, segundos_bloqueio: int)."""\n    # TODO: implementar janela deslizante\n    # 1. Remover tentativas antigas (fora da janela)\n    # 2. Verificar se atingiu o limite\n    # 3. Registrar esta tentativa\n    # 4. Retornar (True, 0) se permitido ou (False, segundos_restantes) se bloqueado\n    return True, 0  # placeholder\n\ndef login(email: str, senha: str) -> dict:\n    # TODO: verificar rate limit antes de validar credenciais\n    # Se bloqueado, retornar {"bloqueado": True, "segundos_restantes": N}\n\n    usuario = usuarios_db.get(email)\n    if not usuario:\n        return {"erro": "Email ou senha incorretos"}\n\n    if bcrypt.checkpw(senha.encode(), usuario["senha_hash"]):\n        return {"sucesso": True, "user_id": usuario["id"]}\n\n    return {"erro": "Email ou senha incorretos"}\n\n# Testes\nprint(login("ana@email.com", "senha_errada"))   # erro\nprint(login("ana@email.com", "senha_errada"))   # erro\nprint(login("ana@email.com", "senha_errada"))   # erro\nprint(login("ana@email.com", "senha_errada"))   # erro\nprint(login("ana@email.com", "senha_errada"))   # erro\nprint(login("ana@email.com", "senha_errada"))   # deve bloquear!\nprint(login("ana@email.com", "senha123"))       # ainda bloqueado\n',
      solution:
        'import time\nfrom collections import defaultdict\nimport bcrypt\n\nusuarios_db = {\n    "ana@email.com": {\n        "id": 1,\n        "senha_hash": bcrypt.hashpw(b"senha123", bcrypt.gensalt())\n    }\n}\n\ntentativas: dict[str, list[float]] = defaultdict(list)\n\nLIMITE = 5\nJANELA = 60\n\ndef verificar_rate_limit(email: str) -> tuple[bool, int]:\n    agora = time.time()\n    janela_inicio = agora - JANELA\n\n    # Remove tentativas fora da janela\n    tentativas[email] = [t for t in tentativas[email] if t > janela_inicio]\n\n    if len(tentativas[email]) >= LIMITE:\n        # Calcula quanto tempo falta ate a tentativa mais antiga sair da janela\n        mais_antiga = tentativas[email][0]\n        segundos_restantes = int(mais_antiga + JANELA - agora) + 1\n        return False, segundos_restantes\n\n    tentativas[email].append(agora)\n    return True, 0\n\ndef login(email: str, senha: str) -> dict:\n    permitido, segundos = verificar_rate_limit(email)\n    if not permitido:\n        return {"bloqueado": True, "segundos_restantes": segundos}\n\n    usuario = usuarios_db.get(email)\n    if not usuario:\n        return {"erro": "Email ou senha incorretos"}\n\n    if bcrypt.checkpw(senha.encode(), usuario["senha_hash"]):\n        return {"sucesso": True, "user_id": usuario["id"]}\n\n    return {"erro": "Email ou senha incorretos"}\n',
      hints: [
        'Use uma lista de timestamps: tentativas[email].append(time.time()) para registrar cada tentativa.',
        'Para a janela deslizante, filtre a lista mantendo apenas os timestamps mais recentes que (agora - JANELA): [t for t in lista if t > agora - JANELA].',
        'Para calcular segundos restantes: a tentativa mais antiga (tentativas[email][0]) vai "expirar" em mais_antiga + JANELA. Subtraia o tempo atual para saber quanto falta.',
      ],
    },
  ],
};
