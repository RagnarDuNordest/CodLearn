import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-de-ambiente-segredos',
  moduleId: 'seguranca',
  title: 'Variaveis de Ambiente e Segredos',
  description: 'Por que nunca colocar senhas e chaves no codigo, como usar variaveis de ambiente, gitignore e como gerenciar segredos em projetos reais',
  order: 7,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O Problema: Segredos no Codigo\n\nUm dos erros mais comuns — e mais perigosos — e colocar senhas, chaves de API e outros segredos diretamente no codigo-fonte.\n\n```python\n# Nunca faca isso\nDB_PASSWORD = "minha_senha_123"\nAPI_KEY = "sk-1234567890abcdef"\nJWT_SECRET = "segredo_super_secreto"\n```\n\n### Por que e perigoso?\n\n**O codigo vai para o git.** Uma vez commitado, o segredo fica no historico para sempre — mesmo que voce delete a linha depois, ele ainda aparece em `git log`. Repositorios publicos no GitHub sao escaneados automaticamente por bots que coletam chaves expostas em segundos.\n\n**Casos reais:**\n- Em 2019, um desenvolvedor da Samsung acidentalmente publicou codigos-fonte internos com credenciais AWS no GitHub. Atacantes detectaram em minutos e acumularam $100.000 em custos antes de ser bloqueado.\n- Em 2022, o Uber sofreu vazamento: um contratado commitu credenciais no GitHub interno que davam acesso a sistemas criticos.\n- Scripts automaticos varrem o GitHub publico em tempo real procurando por padroes como `api_key =`, `password =`, `SECRET_KEY =`.\n\n### O que sao segredos?\n\n- Senhas de banco de dados\n- Chaves de API (AWS, Stripe, SendGrid, OpenAI...)\n- Chave secreta do JWT\n- Tokens de autenticacao\n- Certificados e chaves privadas (.pem, .key)\n- Credenciais de servicos externos (Twilio, Sendgrid)\n- Strings de conexao com banco (contém usuario e senha)',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Ferramentas como GitGuardian, TruffleHog e o proprio GitHub Secret Scanning monitoram repositorios publicos e privados automaticamente. Se voce commitar uma chave da AWS, a Amazon ja recebe uma notificacao e pode revogar a chave — mas os bots maliciosos sao ainda mais rapidos.',
    },
    {
      type: 'text',
      content:
        '## A Solucao: Variaveis de Ambiente\n\nVariaveis de ambiente sao valores configurados no sistema operacional ou no ambiente de execucao, fora do codigo. Cada ambiente (desenvolvimento, staging, producao) tem seus proprios valores.\n\n### Como funciona\n\n1. No **desenvolvimento local**: voce cria um arquivo `.env` com os segredos — que fica NO `.gitignore` e nunca e commitado\n2. Em **producao**: as variaveis sao configuradas diretamente no servidor, plataforma de deploy (Vercel, Heroku, Railway) ou cofre de segredos\n3. O **codigo** le as variaveis do ambiente em tempo de execucao — sem segredos no codigo\n\n### O arquivo `.env`\n\n```bash\n# .env — NUNCA commite este arquivo!\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=minha_app\nDB_USER=postgres\nDB_PASSWORD=senha_local_desenvolvimento\nJWT_SECRET=chave_muito_longa_e_aleatoria_para_dev\nSTRIPE_SECRET_KEY=sk_test_123abc\nOPENAI_API_KEY=sk-proj-xyz\n```\n\nE o `.gitignore` deve ter:\n```\n.env\n.env.local\n.env.production\n*.pem\n*.key\nsecrets/\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Como usar variaveis de ambiente em Python\nimport os\nfrom dotenv import load_dotenv  # pip install python-dotenv\n\n# Carrega o .env automaticamente em desenvolvimento\n# Em producao as variaveis ja estao no ambiente, load_dotenv nao faz nada\nload_dotenv()\n\n# ❌ ERRADO: segredo no codigo\nDB_PASSWORD_ERRADO = "minha_senha_123"\n\n# ✅ CORRETO: ler do ambiente\nDB_HOST     = os.environ.get("DB_HOST", "localhost")  # localhost como fallback de dev\nDB_PORT     = int(os.environ.get("DB_PORT", "5432"))\nDB_NAME     = os.environ.get("DB_NAME")\nDB_PASSWORD = os.environ.get("DB_PASSWORD")  # sem fallback — obrigatorio em prod\nJWT_SECRET  = os.environ.get("JWT_SECRET")\nAPI_KEY     = os.environ.get("OPENAI_API_KEY")\n\n# Validar na inicializacao — falhar rapido se segredo essencial estiver faltando\ndef validar_configuracao():\n    obrigatorios = ["DB_PASSWORD", "JWT_SECRET"]\n    faltando = [k for k in obrigatorios if not os.environ.get(k)]\n    if faltando:\n        raise RuntimeError(\n            f"Variaveis de ambiente obrigatorias nao definidas: {faltando}\\n"\n            f"Crie um arquivo .env baseado no .env.example"\n        )\n\nvalidar_configuracao()  # chama no startup da aplicacao\n\n\n# Uso na conexao com banco — string de conexao nunca aparece no codigo\nfrom urllib.parse import quote_plus\n\ndef get_database_url() -> str:\n    """Monta a URL de conexao a partir das variaveis de ambiente."""\n    usuario = os.environ["DB_USER"]\n    senha   = quote_plus(os.environ["DB_PASSWORD"])  # escapa caracteres especiais\n    host    = os.environ.get("DB_HOST", "localhost")\n    porta   = os.environ.get("DB_PORT", "5432")\n    nome    = os.environ["DB_NAME"]\n    return f"postgresql://{usuario}:{senha}@{host}:{porta}/{nome}"\n\n# ✅ A URL e construida em tempo de execucao, nunca aparece no codigo',
        filename: 'env_correto.py',
        description:
          'python-dotenv carrega o .env automaticamente em desenvolvimento. Em producao as variaveis ja estao no ambiente. A funcao validar_configuracao() garante que a aplicacao nao sobe sem os segredos essenciais — falha rapido e com mensagem clara.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo .env.example — commitado no git, sem valores reais\n# Serve como documentacao do que precisa ser configurado\n\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=nome_do_banco\nDB_USER=usuario_do_banco\nDB_PASSWORD=          # preencha com sua senha local\n\nJWT_SECRET=           # gere com: python -c "import secrets; print(secrets.token_hex(32))"\n\n# API keys externas\nSTRIPE_SECRET_KEY=    # encontre em: dashboard.stripe.com/apikeys\nOPENAI_API_KEY=       # encontre em: platform.openai.com/api-keys\n\n# Configuracoes opcionais\nDEBUG=false\nLOG_LEVEL=INFO\nFRONTEND_URL=http://localhost:3000\n\n# -------------------------------------------------------\n# Para usar:\n# 1. cp .env.example .env\n# 2. Edite o .env com seus valores locais\n# 3. NUNCA commite o .env\n# -------------------------------------------------------\n\n# .gitignore — adicione estas linhas\n.env\n.env.local\n.env.*.local\n*.pem\n*.key\n*.p12\nsecrets/',
        filename: '.env.example',
        description:
          'O .env.example e o unico arquivo relacionado a configuracao que deve ir para o git. Ele documenta quais variaveis existem sem revelar os valores reais. Novos desenvolvedores copiam o exemplo e preenchem seus proprios valores.',
      },
    },
    {
      type: 'text',
      content:
        '## E Se Eu Ja Commitei um Segredo?\n\nNao entre em panico. Mas aja rapido:\n\n### Passo 1: Revogar imediatamente\nAntes de qualquer outra coisa, invalide o segredo. Acesse o painel da AWS, Stripe, OpenAI ou qualquer servico e revogue/regenere a chave. Assuma que ela ja foi comprometida.\n\n### Passo 2: Limpar o historico git\n\n```bash\n# Opção 1: git-filter-repo (recomendado)\npip install git-filter-repo\ngit filter-repo --replace-text <(echo "chave_real==>REMOVIDO")\n\n# Opcao 2: BFG Repo Cleaner\nbfg --replace-text passwords.txt\n```\n\n### Passo 3: Force push\n```bash\ngit push --force-with-lease origin main\n```\n\n### Passo 4: Notificar colaboradores\nTodos os clones locais do repositorio ainda tem a versao antiga. Cada colaborador precisa fazer `git fetch --all` e resetar para a versao remota.\n\n**Aviso**: mesmo apos limpar o historico, se o repositorio era publico, considere a chave comprometida para sempre — bots podem ter capturado antes da limpeza.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use git-secrets ou pre-commit hooks para bloquear commits com segredos antes que acontecam. O GitHub Secret Scanning ja avisa automaticamente em repositorios publicos. Para equipes, use um cofre de segredos como HashiCorp Vault, AWS Secrets Manager ou Doppler — eles centralizam, auditam e rotacionam segredos automaticamente.',
    },
  ],
  challenges: [
    {
      id: 'secrets-c1',
      title: 'Mova os Segredos para Variaveis de Ambiente',
      description:
        'O codigo abaixo tem 4 segredos hardcoded. Corrija-o para ler todos do ambiente. Implemente tambem a funcao validar_config() que verifica se os segredos obrigatorios estao presentes e lanca RuntimeError se algum estiver faltando.',
      language: 'python',
      starterCode:
        '# Configuracao com segredos expostos — corrija usando variaveis de ambiente\nimport os\n\n# PROBLEMAS: 4 segredos hardcoded\nDB_URL      = "postgresql://admin:senha_prod_123@db.empresa.com:5432/producao"\nJWT_SECRET  = "meu_jwt_super_secreto_2024"\nSTRIPE_KEY  = "sk_live_AbCdEf123456789"\nSMTP_PASS   = "email_senha_producao"\n\n# Emails de notificacao (nao e segredo — pode ficar aqui)\nADMIN_EMAIL = "admin@empresa.com"\n\ndef validar_config():\n    """Verifica se todos os segredos obrigatorios estao definidos."""\n    # TODO: verificar DB_URL, JWT_SECRET, STRIPE_KEY, SMTP_PASS\n    # Se algum estiver faltando, lançar RuntimeError com lista dos faltantes\n    pass\n\ndef get_stripe_client():\n    """Retorna cliente Stripe configurado."""\n    import stripe\n    stripe.api_key = STRIPE_KEY  # deve vir do ambiente\n    return stripe\n\n# Chamada no startup\nvalidar_config()\n',
      solution:
        '# Configuracao corrigida — todos os segredos vem do ambiente\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()  # carrega .env em desenvolvimento\n\n# Segredos: sempre do ambiente, sem valores padrao\nDB_URL     = os.environ.get("DB_URL")\nJWT_SECRET = os.environ.get("JWT_SECRET")\nSTRIPE_KEY = os.environ.get("STRIPE_SECRET_KEY")\nSMTP_PASS  = os.environ.get("SMTP_PASSWORD")\n\n# Nao-segredo: pode ter valor padrao\nADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@empresa.com")\n\ndef validar_config():\n    """Verifica se todos os segredos obrigatorios estao definidos."""\n    obrigatorios = {\n        "DB_URL":            DB_URL,\n        "JWT_SECRET":        JWT_SECRET,\n        "STRIPE_SECRET_KEY": STRIPE_KEY,\n        "SMTP_PASSWORD":     SMTP_PASS,\n    }\n    faltando = [nome for nome, valor in obrigatorios.items() if not valor]\n    if faltando:\n        raise RuntimeError(\n            f"Variaveis de ambiente obrigatorias nao configuradas: {faltando}\\n"\n            "Copie .env.example para .env e preencha os valores."\n        )\n\ndef get_stripe_client():\n    """Retorna cliente Stripe configurado."""\n    import stripe\n    stripe.api_key = STRIPE_KEY  # ja vem do ambiente\n    return stripe\n\nvalidar_config()\n',
      hints: [
        'Use os.environ.get("NOME_DA_VARIAVEL") para ler do ambiente. Segredos obrigatorios nao devem ter valor padrao — se estiverem faltando, a aplicacao deve falhar.',
        'Em validar_config(), crie um dicionario com nome -> valor de cada segredo. Filtre os que sao None ou string vazia: [nome for nome, val in dict.items() if not val].',
        'Lembre de importar os no inicio e chamar load_dotenv() antes de ler as variaveis (para funcionar com o arquivo .env em desenvolvimento).',
      ],
    },
  ],
};
