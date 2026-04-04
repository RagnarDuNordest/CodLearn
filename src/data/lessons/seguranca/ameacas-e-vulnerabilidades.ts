import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'ameacas-e-vulnerabilidades',
  moduleId: 'seguranca',
  title: 'Ameacas e Vulnerabilidades',
  description: 'Entenda o modelo CIA, as 10 vulnerabilidades mais criticas do OWASP e como pensar como um atacante para proteger seus sistemas',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O que e Seguranca de Software\n\nSeguranca de software e a pratica de proteger sistemas, dados e usuarios contra acessos nao autorizados, alteracoes indevidas e interrupcoes de servico.\n\nO modelo fundamental da seguranca e chamado de **CIA Triad** (Tríade CIA):\n\n### Confidencialidade (Confidentiality)\nSomente pessoas autorizadas podem acessar determinados dados. Exemplos de violacao: um atacante le o banco de dados de senhas, um funcionario acessa registros medicos sem permissao.\n\n### Integridade (Integrity)\nOs dados so podem ser modificados por quem tem permissao, e as modificacoes devem ser rastreadas. Exemplos de violacao: um atacante altera o saldo de uma conta bancaria, um arquivo de log e apagado para ocultar um ataque.\n\n### Disponibilidade (Availability)\nO sistema deve estar acessivel quando os usuarios legitimos precisarem. Exemplos de violacao: ataque DDoS derruba um servico, ransomware criptografa arquivos e impede acesso.\n\n**Por que isso importa para desenvolvedores?** Cada linha de codigo que voce escreve pode introduzir uma vulnerabilidade em qualquer um desses tres pilares. Seguranca nao e algo que se adiciona depois — ela deve ser pensada desde o inicio do desenvolvimento.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'OWASP (Open Web Application Security Project) e uma fundacao sem fins lucrativos que publica anualmente as 10 vulnerabilidades mais criticas em aplicacoes web. O OWASP Top 10 e a referencia mais usada no mundo para seguranca de software.',
    },
    {
      type: 'text',
      content:
        '## OWASP Top 10 — As Vulnerabilidades Mais Criticas\n\n### A01 — Controle de Acesso Quebrado\nUsuarios conseguem agir fora das suas permissoes. Ex.: um usuario comum acessa a pagina de administracao apenas mudando a URL de `/usuario/123` para `/admin/123`.\n\n### A02 — Falhas Criptograficas\nDados sensiveis transmitidos ou armazenados sem criptografia adequada. Ex.: senhas salvas em texto puro, conexoes HTTP sem TLS, uso de algoritmos fracos como MD5.\n\n### A03 — Injecao (Injection)\nDados nao confiados sao enviados a um interpretador como parte de um comando. Inclui SQL Injection, Command Injection, LDAP Injection. E uma das mais devastadoras.\n\n### A04 — Design Inseguro\nFalhas de arquitetura que nao podem ser corrigidas apenas com implementacao correta. Ex.: nao ter limite de tentativas de login permite ataque de forca bruta.\n\n### A05 — Configuracao de Seguranca Incorreta\nConfiguracoes padrao inseguras, mensagens de erro que revelam detalhes do sistema, permissoes excessivas em arquivos e diretorios.\n\n### A06 — Componentes Vulneraveis e Desatualizados\nUsar bibliotecas, frameworks ou sistemas operacionais com vulnerabilidades conhecidas. Ex.: usar uma versao antiga do Django com CVE publicado.\n\n### A07 — Falhas de Identificacao e Autenticacao\nSenhas fracas, sessoes que nao expiram, falta de autenticacao multifator, tokens previstos.\n\n### A08 — Falhas de Integridade de Software e Dados\nPipelines de CI/CD sem verificacao de integridade, deserializacao insegura, atualizacoes automaticas sem assinatura digital.\n\n### A09 — Falhas de Log e Monitoramento\nSem logs adequados, ataques passam despercebidos por meses. Sem alertas, a resposta a incidentes e lenta e ineficaz.\n\n### A10 — Server-Side Request Forgery (SSRF)\nO servidor e enganado para fazer requisicoes a recursos internos que nao deveriam ser acessiveis externamente.',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Estudos mostram que a maioria das violacoes de dados explora vulnerabilidades conhecidas para as quais ja existia patch disponivel. O problema nao e so descobrir vulnerabilidades — e corrigi-las antes que os atacantes as explorem.',
    },
    {
      type: 'text',
      content:
        '## Mentalidade do Atacante\n\nPara defender um sistema eficientemente, voce precisa pensar como quem quer invadi-lo. Esse conceito e chamado de **threat modeling** (modelagem de ameacas).\n\n### Perguntas que um atacante faz\n\n**(1) Quais sao os ativos valiosos?**\nDados de usuarios, informacoes financeiras, propriedade intelectual, acesso a infraestrutura.\n\n**(2) Quais sao os pontos de entrada?**\nFormularios web, APIs, arquivos de upload, parametros de URL, headers HTTP, cookies.\n\n**(3) Quais sao as suposicoes do sistema?**\nO sistema assume que o usuario e autenticado? Que os dados de entrada sao validos? Que o arquivo enviado e uma imagem? Cada suposicao e uma oportunidade.\n\n**(4) O que acontece se eu enviar dados inesperados?**\nStrings muito longas, caracteres especiais, valores negativos, arquivos com extensoes alteradas, JSON malformado.\n\n**(5) Ha informacoes vazando?**\nMensagens de erro detalhadas, headers de resposta, comentarios no HTML, endpoints nao documentados.\n\n### A regra de ouro\n**Nunca confie em dados que vieram de fora do seu controle.** Isso inclui: inputs de formularios, parametros de URL, headers HTTP, cookies, dados de APIs externas, arquivos enviados por usuarios, e ate dados do proprio banco de dados se ele puder ser comprometido.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo: codigo com 3 vulnerabilidades criticas\n# Tente identificar cada uma antes de ver a resposta\n\nimport sqlite3\nimport subprocess\n\ndef buscar_usuario(nome_usuario):\n    # VULNERABILIDADE 1: SQL Injection\n    # O nome_usuario e inserido diretamente na query sem sanitizacao\n    conn = sqlite3.connect("banco.db")\n    cursor = conn.cursor()\n    query = "SELECT * FROM usuarios WHERE nome = \'" + nome_usuario + "\'"\n    cursor.execute(query)\n    return cursor.fetchone()\n\ndef processar_arquivo(nome_arquivo):\n    # VULNERABILIDADE 2: Command Injection\n    # O nome_arquivo e passado diretamente para o shell\n    resultado = subprocess.run(\n        "cat /uploads/" + nome_arquivo,\n        shell=True,\n        capture_output=True\n    )\n    return resultado.stdout\n\ndef salvar_senha(usuario_id, senha):\n    # VULNERABILIDADE 3: Armazenamento de senha em texto puro\n    # Senhas NUNCA devem ser salvas sem hashing\n    conn = sqlite3.connect("banco.db")\n    cursor = conn.cursor()\n    cursor.execute(\n        "INSERT INTO senhas (usuario_id, senha) VALUES (?, ?)",\n        (usuario_id, senha)  # senha em texto puro!\n    )\n    conn.commit()',
        filename: 'codigo_vulneravel.py',
        description:
          'Tres vulnerabilidades criticas em um unico modulo: SQL Injection na construcao da query, Command Injection na execucao do shell, e armazenamento de senha em texto puro. Cada uma pode comprometer completamente o sistema.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Ao revisar codigo, sempre procure por: (1) concatenacao de strings em queries ou comandos de sistema, (2) dados de entrada usados sem validacao, (3) segredos e senhas em texto puro, (4) permissoes mais amplas do que o necessario (principio do menor privilegio).',
    },
  ],
  challenges: [
    {
      id: 'seguranca-c1',
      title: 'Identifique as Vulnerabilidades',
      description:
        'O codigo abaixo tem exatamente 3 vulnerabilidades de seguranca criticas. Para cada uma, adicione um comentario com: (1) o nome da vulnerabilidade, (2) como um atacante poderia explora-la, (3) como corrigir. Use o formato: # VULN-N: [nome] | Ataque: [como] | Correcao: [como]',
      language: 'python',
      starterCode:
        '# Sistema de gerenciamento de arquivos — encontre as 3 vulnerabilidades\nimport os\nimport sqlite3\n\ndef login(username, password):\n    conn = sqlite3.connect("app.db")\n    cur = conn.cursor()\n    # VULN-1: ?\n    query = f"SELECT id FROM users WHERE username=\'{username}\' AND password=\'{password}\'"\n    cur.execute(query)\n    return cur.fetchone() is not None\n\ndef listar_arquivos(diretorio):\n    # VULN-2: ?\n    caminho = "/var/app/uploads/" + diretorio\n    return os.listdir(caminho)\n\ndef registrar_erro(mensagem_erro):\n    # VULN-3: ?\n    print(f"Erro no sistema: {mensagem_erro}")\n    # Retorna detalhes tecnicos para o usuario\n    return {\n        "erro": mensagem_erro,\n        "stack_trace": str(mensagem_erro),\n        "banco_de_dados": "sqlite3://app.db",\n        "servidor": "Ubuntu 20.04, Python 3.9"\n    }\n',
      solution:
        '# Sistema de gerenciamento de arquivos — vulnerabilidades identificadas e corrigidas\nimport os\nimport sqlite3\nimport hashlib\n\ndef login(username, password):\n    conn = sqlite3.connect("app.db")\n    cur = conn.cursor()\n    # VULN-1: SQL Injection | Ataque: username=\' OR \'1\'=\'1 ignora a senha | Correcao: usar prepared statements com ?\n    senha_hash = hashlib.sha256(password.encode()).hexdigest()  # minimo — use bcrypt na pratica\n    cur.execute("SELECT id FROM users WHERE username=? AND password=?", (username, senha_hash))\n    return cur.fetchone() is not None\n\ndef listar_arquivos(diretorio):\n    # VULN-2: Path Traversal | Ataque: diretorio=\'../../etc\' acessa arquivos do sistema | Correcao: validar e normalizar o caminho\n    base = "/var/app/uploads/"\n    caminho = os.path.normpath(os.path.join(base, diretorio))\n    if not caminho.startswith(base):  # garante que ficamos dentro do diretorio base\n        raise ValueError("Acesso negado: caminho fora do diretorio permitido")\n    return os.listdir(caminho)\n\ndef registrar_erro(mensagem_erro):\n    # VULN-3: Information Disclosure | Ataque: erros revelam tecnologias, versoes e estrutura interna | Correcao: log interno, mensagem generica ao usuario\n    import logging\n    logging.error(f"Erro interno: {mensagem_erro}")  # log so para o servidor\n    return {\n        "erro": "Ocorreu um erro interno. Por favor, tente novamente."\n        # NUNCA retorne stack trace, versoes de software ou detalhes de infraestrutura\n    }\n',
      hints: [
        'Na funcao login(), como o username e usado na query? O que acontece se voce enviar username = \' OR \'1\'=\'1\'--?',
        'Na funcao listar_arquivos(), o que acontece se diretorio for igual a "../../etc/passwd"? Pesquise "path traversal attack".',
        'Na funcao registrar_erro(), que informacoes estao sendo retornadas ao usuario? Por que revelar a versao do OS e do banco de dados e perigoso?',
      ],
    },
  ],
};
