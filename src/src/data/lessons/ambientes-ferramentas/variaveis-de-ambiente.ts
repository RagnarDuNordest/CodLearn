import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-de-ambiente',
  moduleId: 'ambientes-ferramentas',
  title: 'Variaveis de Ambiente',
  description: 'Proteja segredos e configure sua aplicacao com variaveis de ambiente, arquivos .env e python-dotenv',
  order: 2,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que sao variaveis de ambiente?\n\nVariaveis de ambiente sao pares chave=valor que existem fora do codigo, no sistema operacional ou em arquivos de configuracao. Sua aplicacao as le em tempo de execucao.\n\n### Por que usar variaveis de ambiente?\n\n**(1) Segredos nao devem ficar no codigo**\nSenha de banco de dados, chave de API da AWS, token do Stripe — qualquer segredo embutido no codigo pode vazar pelo git, logs ou pelo simples ato de compartilhar o arquivo.\n\n**(2) Configuracao muda por ambiente**\nO banco de dados de desenvolvimento e diferente do de producao. A URL da API de testes e diferente da real. Variaveis de ambiente permitem que o mesmo codigo funcione em qualquer ambiente sem modificacao.\n\n**(3) Principio 12-Factor App**\nA metodologia 12-Factor (padrao da industria para aplicacoes cloud-native) define que configuracao deve ser separada do codigo — armazenada em variaveis de ambiente.\n\n### Exemplos do que DEVE ser variavel de ambiente\n- Senhas e chaves de API\n- URLs de banco de dados\n- Chaves secretas de criptografia\n- Tokens de autenticacao\n- Flags de feature (DEBUG=true/false)\n- Enderecos de servicos externos',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Criar o arquivo .env na raiz do projeto\ncat > .env << EOF\n# Banco de dados\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=meu_banco\nDB_USER=admin\nDB_PASSWORD=senha_super_secreta_123\n\n# Chaves de API\nSTRIPE_API_KEY=sk_test_abcdef123456\nSENDGRID_API_KEY=SG.xxxxxxxxxxx\n\n# Configuracoes da aplicacao\nDEBUG=true\nSECRET_KEY=chave-aleatoria-longa-e-imprevisivel\nALLOWED_HOSTS=localhost,127.0.0.1\nEOF\n\n# IMEDIATAMENTE adicionar ao .gitignore\necho ".env" >> .gitignore\necho ".env.local" >> .gitignore\necho ".env.*.local" >> .gitignore\n\n# Criar um .env.example SEM os valores reais (este SIM vai para o git)\ncat > .env.example << EOF\nDB_HOST=\nDB_PORT=\nDB_NAME=\nDB_USER=\nDB_PASSWORD=\nSTRIPE_API_KEY=\nSENDGRID_API_KEY=\nDEBUG=\nSECRET_KEY=\nALLOWED_HOSTS=\nEOF',
        filename: 'criar-env.sh',
        description:
          'Criacao do arquivo .env e imediata protecao com .gitignore. O .env.example e o "template" sem valores — ele vai para o git para que outros desenvolvedores saibam quais variaveis precisam configurar.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Instalar python-dotenv\n# pip install python-dotenv\n\nfrom dotenv import load_dotenv\nimport os\n\n# Carrega as variaveis do .env para o ambiente\nload_dotenv()\n\n# Acessar variaveis de ambiente\ndb_host = os.getenv("DB_HOST")\ndb_password = os.getenv("DB_PASSWORD")\ndebug = os.getenv("DEBUG", "false")  # segundo parametro = valor padrao\n\nprint(f"Conectando em: {db_host}")\nprint(f"Debug ativo: {debug}")\n\n# Forma mais segura: lancar erro se variavel obrigatoria nao existir\ndef obter_variavel_obrigatoria(nome):\n    valor = os.getenv(nome)\n    if valor is None:\n        raise EnvironmentError(\n            f"Variavel de ambiente obrigatoria \'{nome}\' nao encontrada. "\n            f"Verifique o arquivo .env"\n        )\n    return valor\n\n# Uso\nstripe_key = obter_variavel_obrigatoria("STRIPE_API_KEY")\nsecret_key = obter_variavel_obrigatoria("SECRET_KEY")',
        filename: 'ler_env_python.py',
        description:
          'Uso do python-dotenv para carregar o .env e do modulo os para acessar as variaveis. A funcao "obter_variavel_obrigatoria" garante que o programa falhe rapido com mensagem clara se uma variavel essencial estiver faltando.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'NUNCA commite o arquivo .env. Se voce acidentalmente commitou um segredo, nao basta apagar no proximo commit — o historico do git guarda tudo. Voce precisa revogar a chave/senha imediatamente e usar ferramentas como "git filter-branch" ou "BFG Repo Cleaner" para remover do historico.',
    },
    {
      type: 'text',
      content:
        '## Variaveis de ambiente no terminal\n\nAlem do arquivo .env, voce pode definir variaveis diretamente no terminal:\n\n```bash\n# Definir no terminal (dura so na sessao atual)\nexport DB_HOST=localhost\nexport DEBUG=true\n\n# Definir apenas para um comando especifico\nDEBUG=true python src/app.py\n\n# Ver todas as variaveis de ambiente do sistema\nenv\n\n# Ver uma variavel especifica\necho $DB_HOST\n\n# Em producao (ex: Heroku, Railway, Render)\n# Voce configura as variaveis pelo painel do servico\n# — nunca em arquivos, nunca no codigo\n```\n\n### Hierarquia de configuracao (ordem de prioridade)\n1. Variaveis definidas diretamente no terminal (mais alta)\n2. Variaveis do arquivo .env\n3. Valores padrao no codigo (`os.getenv("DEBUG", "false")`)\n4. Nenhum valor — erro se obrigatoria (mais baixa)',
    },
  ],
  challenges: [
    {
      id: 'variaveis-ambiente-c1',
      title: 'Carregue Configuracoes do .env',
      description:
        'Escreva um modulo Python chamado "config.py" que carrega variaveis de ambiente usando python-dotenv. Ele deve expor constantes tipadas: DB_URL (str), DEBUG (bool), MAX_CONNECTIONS (int) e API_KEY (str). Se API_KEY nao existir, deve lancar um EnvironmentError.',
      language: 'python',
      starterCode:
        '# config.py — modulo de configuracao da aplicacao\nfrom dotenv import load_dotenv\nimport os\n\n# Carregue o .env\n\n# DB_URL: string, padrao "sqlite:///db.sqlite3"\nDB_URL = \n\n# DEBUG: booleano, padrao False\n# Dica: os.getenv retorna string, converta para bool\nDEBUG = \n\n# MAX_CONNECTIONS: inteiro, padrao 10\nMAX_CONNECTIONS = \n\n# API_KEY: obrigatoria, lanca EnvironmentError se nao existir\nAPI_KEY = \n',
      solution:
        '# config.py — modulo de configuracao da aplicacao\nfrom dotenv import load_dotenv\nimport os\n\n# Carregue o .env\nload_dotenv()\n\n# DB_URL: string, padrao "sqlite:///db.sqlite3"\nDB_URL = os.getenv("DB_URL", "sqlite:///db.sqlite3")\n\n# DEBUG: booleano, padrao False\n# os.getenv retorna string, converta para bool\nDEBUG = os.getenv("DEBUG", "false").lower() == "true"\n\n# MAX_CONNECTIONS: inteiro, padrao 10\nMAX_CONNECTIONS = int(os.getenv("MAX_CONNECTIONS", "10"))\n\n# API_KEY: obrigatoria, lanca EnvironmentError se nao existir\n_api_key = os.getenv("API_KEY")\nif _api_key is None:\n    raise EnvironmentError(\n        "Variavel de ambiente obrigatoria \'API_KEY\' nao encontrada. "\n        "Defina-a no arquivo .env"\n    )\nAPI_KEY = _api_key\n',
      hints: [
        'Para converter string para bool, compare a string: os.getenv("DEBUG", "false").lower() == "true"',
        'Para converter para int use int(): int(os.getenv("MAX_CONNECTIONS", "10"))',
        'Para verificar se e None e lancar erro: _val = os.getenv("API_KEY"); if _val is None: raise EnvironmentError("...")',
      ],
    },
  ],
};
