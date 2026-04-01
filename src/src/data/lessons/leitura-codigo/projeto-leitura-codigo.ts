import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-leitura-codigo',
  moduleId: 'leitura-codigo',
  title: 'Projeto: Auditoria de Codigo',
  description: 'Leia, analise e documente um modulo completo como um desenvolvedor senior',
  order: 5,
  estimatedMinutes: 45,
  sections: [
    {
      type: 'text',
      content:
        '## Bem-vindo ao mundo real\n\nEm empresas reais, desenvolvedores passam entre 60% e 80% do tempo **lendo** codigo, nao escrevendo. Voce le o codigo existente para entender o que ja foi feito antes de adicionar algo novo. Voce le para encontrar bugs. Voce le para fazer code review dos seus colegas.\n\nEste projeto simula exatamente o que acontece quando voce entra em um time: voce recebe um modulo sem documentacao e precisa:\n\n1. **Entender** o que o modulo faz\n2. **Documentar** cada funcao e classe\n3. **Encontrar** possiveis bugs ou problemas\n4. **Propor** melhorias\n\nIsso se chama **auditoria de codigo** — e e uma habilidade que vai diferenciar voce no mercado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'ROLES = {"admin": 3, "editor": 2, "viewer": 1}\n\nRESOURCE_PERMS = {\n    "post": {"create": 2, "read": 1, "update": 2, "delete": 3},\n    "user": {"create": 3, "read": 2, "update": 3, "delete": 3},\n    "comment": {"create": 1, "read": 1, "update": 2, "delete": 2},\n}\n\nclass PermissaoNegada(Exception):\n    pass\n\nclass GerenciadorPermissoes:\n    def __init__(self):\n        self.usuarios = {}\n\n    def registrar(self, uid, role):\n        if role not in ROLES:\n            raise ValueError(f"role invalida: {role}")\n        self.usuarios[uid] = role\n\n    def nivel(self, uid):\n        role = self.usuarios.get(uid)\n        if role is None:\n            return 0\n        return ROLES[role]\n\n    def pode(self, uid, recurso, acao):\n        if recurso not in RESOURCE_PERMS:\n            return False\n        if acao not in RESOURCE_PERMS[recurso]:\n            return False\n        nivel_req = RESOURCE_PERMS[recurso][acao]\n        return self.nivel(uid) >= nivel_req\n\n    def exigir(self, uid, recurso, acao):\n        if not self.pode(uid, recurso, acao):\n            raise PermissaoNegada(\n                f"usuario {uid} nao pode {acao} em {recurso}"\n            )\n\n    def promover(self, admin_uid, target_uid, nova_role):\n        if self.nivel(admin_uid) < ROLES["admin"]:\n            raise PermissaoNegada("apenas admins podem promover")\n        if nova_role not in ROLES:\n            raise ValueError(f"role invalida: {nova_role}")\n        if target_uid not in self.usuarios:\n            raise KeyError(f"usuario {target_uid} nao encontrado")\n        self.usuarios[target_uid] = nova_role\n\n    def listar_com_acesso(self, recurso, acao):\n        if recurso not in RESOURCE_PERMS:\n            return []\n        nivel_req = RESOURCE_PERMS[recurso].get(acao, 999)\n        return [\n            uid for uid, role in self.usuarios.items()\n            if ROLES[role] >= nivel_req\n        ]',
        filename: 'permissoes.py',
        description:
          'Modulo de permissoes sem documentacao. Aplique a estrategia de auditoria: (1) liste todas as classes e funcoes, (2) entenda entradas e saidas de cada uma, (3) procure bugs ou casos nao tratados, (4) documente antes de ver a solucao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Estrategia de auditoria em 4 etapas: (1) liste todas as funcoes/classes sem ler os corpos, (2) entenda os dados de entrada e saida de cada uma, (3) procure por bugs ou casos nao tratados, (4) escreva sua documentacao antes de ver a solucao. A documentacao que voce escreve ANTES de ver a resposta e mais valiosa — ela revela o que voce realmente entendeu.',
    },
    {
      type: 'text',
      content:
        '## Como auditar uma funcao sistematicamente\n\nVamos auditar a primeira funcao do modulo como exemplo:\n\n```python\ndef registrar(self, uid, role):\n    if role not in ROLES:\n        raise ValueError(f"role invalida: {role}")\n    self.usuarios[uid] = role\n```\n\n**O que faz:** Registra um usuario com uma role no sistema de permissoes.\n\n**Parametros:**\n- `uid`: identificador unico do usuario (qualquer valor hashavel)\n- `role`: string com o nome da role ("admin", "editor" ou "viewer")\n\n**Retorno:** None (modifica o estado interno)\n\n**Casos extremos:**\n- Role invalida: levanta ValueError com mensagem descritiva ✓\n- UID ja existente: sobrescreve silenciosamente (comportamento intencional? pode ser bug)\n- UID None ou vazio: aceita sem erro (pode ser problema)\n\n**Possiveis problemas:**\n- Nao valida o tipo ou formato do uid — qualquer valor e aceito\n- Sobrescrita silenciosa: registrar o mesmo uid duas vezes nao da aviso',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'ROLES = {"admin": 3, "editor": 2, "viewer": 1}\n\nRESOURCE_PERMS = {\n    "post": {"create": 2, "read": 1, "update": 2, "delete": 3},\n    "user": {"create": 3, "read": 2, "update": 3, "delete": 3},\n    "comment": {"create": 1, "read": 1, "update": 2, "delete": 2},\n}\n\nclass PermissaoNegada(Exception):\n    """Levantada quando um usuario tenta uma acao sem permissao suficiente."""\n    pass\n\nclass GerenciadorPermissoes:\n    """Gerencia roles e permissoes de usuarios sobre recursos do sistema."""\n\n    def __init__(self):\n        self.usuarios = {}  # uid -> role_name\n\n    def registrar(self, uid, role):\n        """Registra um usuario com uma role. Levanta ValueError se a role for invalida."""\n        if role not in ROLES:\n            raise ValueError(f"role invalida: {role}")\n        self.usuarios[uid] = role\n\n    def nivel(self, uid):\n        """Retorna o nivel numerico do usuario (0 se nao registrado, 1-3 se registrado)."""\n        role = self.usuarios.get(uid)\n        if role is None:\n            return 0\n        return ROLES[role]\n\n    def pode(self, uid, recurso, acao):\n        """Retorna True se o usuario tem nivel suficiente para a acao no recurso."""\n        if recurso not in RESOURCE_PERMS:\n            return False\n        if acao not in RESOURCE_PERMS[recurso]:\n            return False\n        nivel_req = RESOURCE_PERMS[recurso][acao]\n        return self.nivel(uid) >= nivel_req\n        # BUG IDENTIFICADO: usuarios nao registrados tem nivel 0 e podem\n        # ser verificados sem erro -- pode ser intencional (anonimos sao viewers)\n        # mas deveria ser documentado explicitamente\n\n    def exigir(self, uid, recurso, acao):\n        """Levanta PermissaoNegada se o usuario nao tiver acesso. Uso em APIs."""\n        if not self.pode(uid, recurso, acao):\n            raise PermissaoNegada(\n                f"usuario {uid} nao pode {acao} em {recurso}"\n            )\n\n    def promover(self, admin_uid, target_uid, nova_role):\n        """Permite que um admin altere a role de outro usuario."""\n        if self.nivel(admin_uid) < ROLES["admin"]:\n            raise PermissaoNegada("apenas admins podem promover")\n        if nova_role not in ROLES:\n            raise ValueError(f"role invalida: {nova_role}")\n        if target_uid not in self.usuarios:\n            raise KeyError(f"usuario {target_uid} nao encontrado")\n        self.usuarios[target_uid] = nova_role\n        # BUG IDENTIFICADO: um admin pode rebaixar a si mesmo para "viewer"\n        # perdendo acesso de admin -- provavelmente nao intencional\n\n    def listar_com_acesso(self, recurso, acao):\n        """Retorna lista de UIDs que tem permissao para a acao no recurso."""\n        if recurso not in RESOURCE_PERMS:\n            return []\n        nivel_req = RESOURCE_PERMS[recurso].get(acao, 999)\n        return [\n            uid for uid, role in self.usuarios.items()\n            if ROLES[role] >= nivel_req\n        ]',
        filename: 'permissoes_documentado.py',
        description:
          'O mesmo modulo completamente documentado, com dois bugs identificados: (1) usuarios nao registrados tem nivel 0 e podem ser verificados silenciosamente, (2) um admin pode rebaixar a si mesmo.',
      },
    },
  ],
  challenges: [
    {
      id: 'projeto-c1',
      title: 'Documente Este Modulo',
      description:
        'Adicione uma docstring a cada funcao do modulo de eventos abaixo, explicando o que ela faz, seus parametros e seu retorno.',
      language: 'python',
      starterCode:
        'class SistemaEventos:\n    def __init__(self):\n        self._handlers = {}\n\n    def on(self, evento, callback):\n        if evento not in self._handlers:\n            self._handlers[evento] = []\n        self._handlers[evento].append(callback)\n\n    def off(self, evento, callback):\n        if evento in self._handlers:\n            try:\n                self._handlers[evento].remove(callback)\n            except ValueError:\n                pass\n\n    def emit(self, evento, *args, **kwargs):\n        if evento not in self._handlers:\n            return\n        for handler in list(self._handlers[evento]):\n            handler(*args, **kwargs)\n\n    def once(self, evento, callback):\n        def wrapper(*args, **kwargs):\n            self.off(evento, wrapper)\n            callback(*args, **kwargs)\n        self.on(evento, wrapper)\n\n    def listeners(self, evento):\n        return list(self._handlers.get(evento, []))\n',
      solution:
        'class SistemaEventos:\n    """Sistema de eventos pub/sub (publicador/assinante).\n    Permite registrar callbacks para eventos nomeados e dispara-los quando necessario.\n    """\n\n    def __init__(self):\n        self._handlers = {}  # evento -> lista de callbacks\n\n    def on(self, evento, callback):\n        """Registra um callback para ser chamado sempre que o evento for emitido.\n\n        Args:\n            evento: nome do evento (string)\n            callback: funcao a ser chamada quando o evento ocorrer\n        """\n        if evento not in self._handlers:\n            self._handlers[evento] = []\n        self._handlers[evento].append(callback)\n\n    def off(self, evento, callback):\n        """Remove um callback registrado para um evento.\n        Nao levanta erro se o callback nao estava registrado.\n\n        Args:\n            evento: nome do evento\n            callback: funcao a ser removida\n        """\n        if evento in self._handlers:\n            try:\n                self._handlers[evento].remove(callback)\n            except ValueError:\n                pass  # callback nao estava registrado, ignora silenciosamente\n\n    def emit(self, evento, *args, **kwargs):\n        """Dispara um evento, chamando todos os callbacks registrados.\n        Passa args e kwargs para cada callback.\n        Usa copia da lista para permitir que callbacks se removam durante emissao.\n\n        Args:\n            evento: nome do evento a ser disparado\n            *args, **kwargs: argumentos repassados para os callbacks\n        """\n        if evento not in self._handlers:\n            return\n        for handler in list(self._handlers[evento]):  # copia para evitar mutacao\n            handler(*args, **kwargs)\n\n    def once(self, evento, callback):\n        """Registra um callback que sera chamado apenas uma vez.\n        Apos o primeiro disparo, o callback e automaticamente removido.\n\n        Args:\n            evento: nome do evento\n            callback: funcao a ser chamada uma unica vez\n        """\n        def wrapper(*args, **kwargs):\n            self.off(evento, wrapper)  # se remove antes de chamar o callback\n            callback(*args, **kwargs)\n        self.on(evento, wrapper)\n\n    def listeners(self, evento):\n        """Retorna lista de callbacks registrados para um evento.\n        Retorna lista vazia se o evento nao existe.\n        Retorna copia para proteger o estado interno.\n\n        Args:\n            evento: nome do evento\n\n        Returns:\n            Lista de callbacks registrados\n        """\n        return list(self._handlers.get(evento, []))\n',
      hints: [
        'Comece pelos nomes: on (registrar), off (remover), emit (disparar), once (registrar uma vez), listeners (listar). Os nomes sao pistas claras.',
        'No metodo once(), o truque e o wrapper: ele se auto-remove antes de chamar o callback original. Isso garante que execute apenas uma vez.',
        'Docstrings em Python seguem o padrao: primeira linha resume, depois uma linha em branco, depois Args: e Returns: se necessario.',
      ],
    },
    {
      id: 'projeto-c2',
      title: 'Relatorio de Code Review',
      description:
        'A funcao abaixo tem 3 problemas: um de seguranca, um de performance e um de legibilidade. Escreva um comentario de code review para cada problema encontrado.',
      language: 'python',
      starterCode:
        'def buscar_usuario_por_token(token, db_connection):\n    query = "SELECT * FROM users WHERE token = \'" + token + "\'"\n    cursor = db_connection.cursor()\n    cursor.execute(query)\n    resultado = cursor.fetchall()\n    for r in resultado:\n        if r[5] == True:\n            return r\n    return None\n\n# CODE REVIEW:\n#\n# Problema 1 (Seguranca):\n# Localizacao: linha ???\n# Descricao: ???\n# Sugestao de correcao: ???\n#\n# Problema 2 (Performance):\n# Localizacao: linha ???\n# Descricao: ???\n# Sugestao de correcao: ???\n#\n# Problema 3 (Legibilidade):\n# Localizacao: linha ???\n# Descricao: ???\n# Sugestao de correcao: ???\n',
      solution:
        'def buscar_usuario_por_token(token, db_connection):\n    query = "SELECT * FROM users WHERE token = \'" + token + "\'"\n    cursor = db_connection.cursor()\n    cursor.execute(query)\n    resultado = cursor.fetchall()\n    for r in resultado:\n        if r[5] == True:\n            return r\n    return None\n\n# CODE REVIEW:\n#\n# Problema 1 (Seguranca - CRITICO):\n# Localizacao: linha 2 - concatenacao de string na query SQL\n# Descricao: SQL Injection. Se token conter \'" OR \'1\'=\'1\', a query retornara\n#   todos os usuarios. Um atacante pode acessar qualquer conta ou extrair o banco.\n# Sugestao de correcao:\n#   Use parametros preparados:\n#   query = "SELECT * FROM users WHERE token = ?"\n#   cursor.execute(query, (token,))\n#\n# Problema 2 (Performance):\n# Localizacao: linha 4 - fetchall() e loop para filtrar\n# Descricao: a query busca TODOS os usuarios com aquele token no banco,\n#   traz todos para memoria Python, e filtra em Python. Para tokens unicos\n#   isso traz no maximo 1 registro, mas o filtro deveria estar no SQL.\n# Sugestao de correcao:\n#   query = "SELECT * FROM users WHERE token = ? AND active = 1"\n#   cursor.execute(query, (token,))\n#   return cursor.fetchone()  # retorna apenas 1 registro\n#\n# Problema 3 (Legibilidade):\n# Localizacao: linha 6 - r[5] acessa coluna por indice numerico\n# Descricao: r[5] nao da nenhuma informacao sobre o que e a coluna 5.\n#   Se o schema do banco mudar (nova coluna inserida antes), o indice 5\n#   passara a apontar para outra coluna silenciosamente.\n# Sugestao de correcao:\n#   Use cursor com dict_factory ou acesse por nome:\n#   if r["active"] == True:  ou  if r["active"]:\n',
      hints: [
        'Problema de seguranca: observe como a query SQL e construida. O que acontece se token for: \' OR \'1\'=\'1?',
        'Problema de performance: cursor.fetchall() traz TODOS os registros para a memoria. Existe uma forma de trazer apenas o necessario direto no SQL?',
        'Problema de legibilidade: r[5] — o que e o indice 5? Se o banco mudar, esse codigo quebra silenciosamente.',
      ],
    },
  ],
};
