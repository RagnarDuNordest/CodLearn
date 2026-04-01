import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'sql-injection',
  moduleId: 'seguranca',
  title: 'SQL Injection',
  description: 'Como funciona o ataque de SQL Injection, por que e tao devastador, e como prevenir completamente com prepared statements e queries parametrizadas',
  order: 1,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O que e SQL Injection\n\nSQL Injection (SQLi) e um ataque onde o invasor insere codigo SQL malicioso em campos de entrada que sao concatenados diretamente em queries. O banco de dados executa o codigo malicioso como se fosse parte legitima da query.\n\n### Por que funciona?\n\nO ataque funciona porque muitos desenvolvedores tratam a construcao de queries SQL como simples concatenacao de strings. Quando dados do usuario sao inseridos diretamente na query, o interpretador SQL nao consegue distinguir entre dados e comandos.\n\n**Imagine a query:**\n```\nSELECT * FROM usuarios WHERE email = \'{email}\' AND senha = \'{senha}\'\n```\n\nSe o usuario digitar como email: `admin@site.com\' --`\n\nA query se torna:\n```\nSELECT * FROM usuarios WHERE email = \'admin@site.com\' --\' AND senha = \'qualquer_coisa\'\n```\n\nO `--` e um comentario em SQL. Tudo depois dele e ignorado. O atacante fez login sem saber a senha.\n\n### Impacto real\nSQL Injection e responsavel por bilhoes de dolares em prejuizos. Ataques famosos: CardSystems (2005, 40 milhoes de cartoes), Heartland Payment Systems (2008, 130 milhoes de cartoes), Sony PlayStation Network (2011).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# CODIGO VULNERAVEL — nunca faca isso\nimport sqlite3\n\ndef login_vulneravel(email, senha):\n    conn = sqlite3.connect("banco.db")\n    cursor = conn.cursor()\n\n    # Concatenacao direta = SQL Injection\n    query = f"""\n        SELECT id, nome FROM usuarios\n        WHERE email = \'{email}\'\n        AND senha = \'{senha}\'\n    """\n\n    print(f"Query executada: {query}")  # para demonstracao\n    cursor.execute(query)\n    usuario = cursor.fetchone()\n    conn.close()\n    return usuario\n\n# Cenario 1: login normal\nresult = login_vulneravel("joao@email.com", "minha_senha123")\n# Query: WHERE email = \'joao@email.com\' AND senha = \'minha_senha123\'\n\n# Cenario 2: ataque basico — ignora a senha\nresult = login_vulneravel("admin@site.com\' --", "qualquer_coisa")\n# Query: WHERE email = \'admin@site.com\' --\' AND senha = \'qualquer_coisa\'\n# O -- comenta o resto: a senha nunca e verificada!\n\n# Cenario 3: ataque sem saber o email\nresult = login_vulneravel("qualquer\' OR \'1\'=\'1\' --", "qualquer")\n# Query: WHERE email = \'qualquer\' OR \'1\'=\'1\' --\' AND senha = ...\n# \'1\'=\'1\' e sempre verdadeiro: retorna TODOS os usuarios!\n\n# Cenario 4: destruicao total\nresult = login_vulneravel("x\'; DROP TABLE usuarios; --", "y")\n# Executa DROP TABLE — a tabela de usuarios e destruida!',
        filename: 'sql_injection_demo.py',
        description:
          'Quatro cenarios de ataque SQL Injection em progressao de severidade: login sem senha, acesso a qualquer conta, retorno de todos os registros, e destruicao completa da tabela. Todos exploram a mesma vulnerabilidade: concatenacao de strings em queries SQL.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Alem de SELECT e DROP, SQL Injection pode ser usado para: ler arquivos do sistema (LOAD_FILE), escrever arquivos no servidor (INTO OUTFILE), executar comandos do sistema operacional (em alguns bancos), e exfiltrar dados via UNION SELECT para combinar resultados de outras tabelas.',
    },
    {
      type: 'text',
      content:
        '## Como Prevenir: Prepared Statements\n\nA solucao definitiva para SQL Injection e separar o codigo SQL dos dados. Isso e feito com **prepared statements** (instrucoes preparadas) e **parameterized queries** (queries parametrizadas).\n\n### Como funciona\n\n1. Voce envia a estrutura da query para o banco de dados PRIMEIRO, com `?` ou `:nome` como marcadores\n2. O banco de dados COMPILA a query e entende sua estrutura\n3. Depois, voce envia os dados separadamente\n4. O banco de dados trata os dados como DADOS, nunca como codigo\n\nMesmo que o usuario envie `\' OR \'1\'=\'1`, o banco de dados vai procurar literalmente por um usuario com esse valor no campo email — nao vai interpretar como SQL.\n\n### Regras fundamentais\n- **Sempre** use prepared statements para qualquer query que inclua dados externos\n- **Nunca** use concatenacao ou formatacao de strings em queries SQL\n- **Nunca** use `f-strings`, `%` ou `.format()` para montar queries\n- Use ORMs (SQLAlchemy, Django ORM) que fazem isso automaticamente, mas entenda o que acontece por baixo',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# CODIGO SEGURO — prepared statements com sqlite3\nimport sqlite3\nimport hashlib\n\ndef login_seguro(email, senha):\n    conn = sqlite3.connect("banco.db")\n    cursor = conn.cursor()\n\n    # Prepared statement: ? sao marcadores para os dados\n    # O banco de dados trata os valores como dados, nunca como codigo SQL\n    cursor.execute(\n        "SELECT id, nome FROM usuarios WHERE email = ? AND senha_hash = ?",\n        (email, hashlib.sha256(senha.encode()).hexdigest())\n        # Na pratica use bcrypt, nao sha256\n    )\n\n    usuario = cursor.fetchone()\n    conn.close()\n    return usuario\n\n# Agora os ataques nao funcionam mais:\n\n# Ataque 1: tentativa de bypass com --\nusuario = login_seguro("admin@site.com\' --", "qualquer")\n# O banco procura literalmente por email = "admin@site.com\' --"\n# Nao existe esse email, retorna None. Seguro!\n\n# Ataque 2: tentativa com OR \'1\'=\'1\'\nusuario = login_seguro("x\' OR \'1\'=\'1\' --", "qualquer")\n# O banco procura por email = "x\' OR \'1\'=\'1\' --"\n# Nao existe esse email. Seguro!\n\n\n# Exemplo mais completo: sistema de busca seguro\ndef buscar_produtos(categoria, preco_maximo, ordenar_por="nome"):\n    conn = sqlite3.connect("banco.db")\n    cursor = conn.cursor()\n\n    # Parametros de dados: use ?\n    # Nomes de colunas NAO podem ser parametrizados — valide manualmente\n    colunas_permitidas = {"nome", "preco", "data_cadastro"}\n    if ordenar_por not in colunas_permitidas:\n        raise ValueError(f"Coluna de ordenacao invalida: {ordenar_por}")\n\n    cursor.execute(\n        f"SELECT * FROM produtos WHERE categoria = ? AND preco <= ? ORDER BY {ordenar_por}",\n        (categoria, preco_maximo)\n    )\n    return cursor.fetchall()\n\n\n# Com SQLAlchemy (ORM — mais comum em projetos reais)\nfrom sqlalchemy import text\n\ndef buscar_usuario_sqlalchemy(session, email):\n    # Usando parametros nomeados com SQLAlchemy\n    resultado = session.execute(\n        text("SELECT id, nome FROM usuarios WHERE email = :email"),\n        {"email": email}\n    )\n    return resultado.fetchone()\n    # OU usando o ORM diretamente (ainda mais seguro):\n    # return session.query(Usuario).filter(Usuario.email == email).first()',
        filename: 'sql_injection_seguro.py',
        description:
          'Tres formas de prevenir SQL Injection: prepared statements com sqlite3 nativo, validacao manual de nomes de colunas (que nao podem ser parametrizados), e uso do SQLAlchemy com parametros nomeados. Em todos os casos, dados do usuario nunca sao interpretados como codigo SQL.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Uma regra pratica: se voce esta usando f-string, .format() ou concatenacao (+ ou %) para montar uma query SQL, voce esta fazendo errado. Sem excecoes. Mesmo que o dado "pareca seguro" — um ID numerico, um booleano — use sempre prepared statements para criar o habito correto.',
    },
    {
      type: 'text',
      content:
        '## Defesa em Profundidade\n\nPrepared statements sao a defesa principal, mas uma boa estrategia usa multiplas camadas:\n\n### Principio do menor privilegio no banco de dados\nO usuario do banco de dados que a aplicacao usa nao deve ter permissao para DROP TABLE, CREATE TABLE ou acessar outros bancos. Crie um usuario com apenas SELECT, INSERT, UPDATE e DELETE nas tabelas necessarias.\n\n### Validacao de entrada\nValidar o formato dos dados de entrada nao substitui prepared statements, mas ajuda a detectar ataques cedo e reduz a superficie de ataque.\n\n### WAF (Web Application Firewall)\nUm WAF pode detectar e bloquear payloads conhecidos de SQL Injection, mas nao deve ser a unica linha de defesa.\n\n### Monitoramento e alertas\nConfigure alertas para queries que retornam resultados anormais (ex.: uma query de login que retorna centenas de registros) ou que causam erros de sintaxe SQL — podem ser tentativas de injecao.',
    },
  ],
  challenges: [
    {
      id: 'seguranca-c2',
      title: 'Corrija o Sistema de Login',
      description:
        'A funcao de login abaixo e vulneravel a SQL Injection. Corrija-a usando prepared statements. Alem disso, a funcao de busca de pedidos tambem e vulneravel. Corrija as duas funcoes sem alterar o comportamento esperado.',
      language: 'python',
      starterCode:
        '# Sistema de login e busca — corrija as vulnerabilidades de SQL Injection\nimport sqlite3\n\ndef fazer_login(email, senha):\n    """Retorna o id do usuario se as credenciais estiverem corretas, None caso contrario."""\n    conn = sqlite3.connect("loja.db")\n    cursor = conn.cursor()\n\n    # VULNERAVEL: SQL Injection aqui\n    query = "SELECT id FROM usuarios WHERE email = \'" + email + "\' AND senha = \'" + senha + "\'"\n    cursor.execute(query)\n    resultado = cursor.fetchone()\n    conn.close()\n\n    if resultado:\n        return resultado[0]  # retorna o id do usuario\n    return None\n\ndef buscar_pedidos(usuario_id, status):\n    """Retorna pedidos do usuario com determinado status."""\n    conn = sqlite3.connect("loja.db")\n    cursor = conn.cursor()\n\n    # VULNERAVEL: SQL Injection aqui tambem\n    query = f"SELECT * FROM pedidos WHERE usuario_id = {usuario_id} AND status = \'{status}\'"\n    cursor.execute(query)\n    pedidos = cursor.fetchall()\n    conn.close()\n    return pedidos\n\n# Testes — o comportamento deve permanecer igual apos a correcao:\n# fazer_login("joao@email.com", "senha123") -> retorna id ou None\n# buscar_pedidos(42, "entregue") -> lista de pedidos\n',
      solution:
        '# Sistema de login e busca — vulnerabilidades corrigidas com prepared statements\nimport sqlite3\n\ndef fazer_login(email, senha):\n    """Retorna o id do usuario se as credenciais estiverem corretas, None caso contrario."""\n    conn = sqlite3.connect("loja.db")\n    cursor = conn.cursor()\n\n    # CORRIGIDO: prepared statement com ? — dados nunca sao interpretados como SQL\n    cursor.execute(\n        "SELECT id FROM usuarios WHERE email = ? AND senha = ?",\n        (email, senha)\n        # Na pratica: armazene senha_hash = bcrypt.hash(senha) e compare com bcrypt.check\n    )\n    resultado = cursor.fetchone()\n    conn.close()\n\n    if resultado:\n        return resultado[0]\n    return None\n\ndef buscar_pedidos(usuario_id, status):\n    """Retorna pedidos do usuario com determinado status."""\n    conn = sqlite3.connect("loja.db")\n    cursor = conn.cursor()\n\n    # CORRIGIDO: ambos os valores sao parametrizados\n    # usuario_id pode ser inteiro, mas parametrizar e sempre mais seguro\n    cursor.execute(\n        "SELECT * FROM pedidos WHERE usuario_id = ? AND status = ?",\n        (usuario_id, status)\n    )\n    pedidos = cursor.fetchall()\n    conn.close()\n    return pedidos\n\n# Bonus: validacao adicional para usuario_id\ndef buscar_pedidos_seguro(usuario_id, status):\n    """Versao com validacao extra de tipos."""\n    if not isinstance(usuario_id, int) or usuario_id <= 0:\n        raise ValueError("usuario_id deve ser um inteiro positivo")\n\n    status_validos = {"pendente", "processando", "enviado", "entregue", "cancelado"}\n    if status not in status_validos:\n        raise ValueError(f"Status invalido: {status}")\n\n    conn = sqlite3.connect("loja.db")\n    cursor = conn.cursor()\n    cursor.execute(\n        "SELECT * FROM pedidos WHERE usuario_id = ? AND status = ?",\n        (usuario_id, status)\n    )\n    pedidos = cursor.fetchall()\n    conn.close()\n    return pedidos\n',
      hints: [
        'Substitua a concatenacao de strings por ? como marcadores de posicao. A query deve ficar assim: "SELECT ... WHERE campo = ?"',
        'Os valores dos parametros devem ser passados como uma tupla no segundo argumento do cursor.execute(). Nao esqueca a virgula: (valor,) para tupla de um elemento.',
        'Para usuario_id numerico, voce ainda deve usar parametros. Nunca insira valores diretamente, mesmo que sejam inteiros — o habito correto e sempre parametrizar.',
      ],
    },
  ],
};
