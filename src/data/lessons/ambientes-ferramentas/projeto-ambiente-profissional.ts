import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-ambiente-profissional',
  moduleId: 'ambientes-ferramentas',
  title: 'Projeto: Ambiente Python Profissional',
  description: 'Configure do zero um projeto Python completo: venv, requirements, variaveis de ambiente, .gitignore e Makefile integrado',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 45,
  sections: [
    {
      type: 'text',
      content:
        '## O que vamos construir\n\nNeste projeto voce vai configurar um ambiente Python profissional completo do zero. Ao final, o projeto tera:\n\n- Ambiente virtual isolado com `venv`\n- Dependencias de producao e desenvolvimento separadas\n- Variaveis de ambiente com `.env` e `python-dotenv`\n- `.gitignore` completo\n- `Makefile` com targets para test, lint, run e clean\n- Modulo de configuracao que valida as variaveis obrigatorias\n\n### Estrutura final do projeto\n\n```\nminha-api/\n├── src/\n│   ├── __init__.py\n│   ├── config.py          # Carrega variaveis de ambiente\n│   └── app.py             # Aplicacao principal\n├── tests/\n│   ├── __init__.py\n│   └── test_config.py\n├── venv/                  # Gerado localmente, no .gitignore\n├── .env                   # Segredos, no .gitignore\n├── .env.example           # Template sem valores, no git\n├── .gitignore\n├── requirements.txt\n├── requirements-dev.txt\n├── Makefile\n└── README.md\n```\n\nEste e o padrao usado em projetos Python profissionais, APIs Flask/FastAPI, servicos Django e scripts de automacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '#!/bin/bash\n# Passo 1: Criar a estrutura de diretorios e arquivos base\n\nmkdir minha-api\ncd minha-api\n\n# Criar estrutura de pastas\nmkdir -p src tests\n\n# Criar __init__.py (marca os diretorios como pacotes Python)\ntouch src/__init__.py\ntouch tests/__init__.py\n\n# Criar ambiente virtual\npython -m venv venv\n\n# Ativar o ambiente virtual\nsource venv/bin/activate\n\n# Verificar que o ambiente esta ativo\nwhich python  # deve apontar para minha-api/venv/bin/python\n\necho "Estrutura criada e ambiente ativo!"',
        filename: 'passo-1-estrutura.sh',
        description:
          'Primeiro passo: criar a estrutura de diretorios e ativar o ambiente virtual. O "touch" cria arquivos vazios — os __init__.py sao necessarios para o Python reconhecer as pastas como modulos.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '#!/bin/bash\n# Passo 2: Configurar dependencias\n\n# Com o venv ativo, instalar pacotes de producao\npip install flask python-dotenv\n\n# Salvar dependencias de producao\npip freeze > requirements.txt\n\n# Instalar dependencias de desenvolvimento\npip install pytest flake8 black pytest-cov\n\n# Salvar requirements-dev.txt\ncat > requirements-dev.txt << EOF\n-r requirements.txt\npytest==7.4.3\npytest-cov==4.1.0\nflake8==7.0.0\nblack==23.12.1\nEOF\n\n# Criar o .gitignore\ncat > .gitignore << EOF\n# Ambiente virtual\nvenv/\n.venv/\n\n# Variaveis de ambiente e segredos\n.env\n.env.local\n.env.*.local\n\n# Cache Python\n__pycache__/\n*.py[cod]\n*.pyo\n\n# Testes e cobertura\n.pytest_cache/\n.coverage\nhtmlcov/\n\n# Build\ndist/\nbuild/\n*.egg-info/\n\n# IDEs\n.vscode/\n.idea/\nEOF\n\necho "Dependencias configuradas!"',
        filename: 'passo-2-dependencias.sh',
        description:
          'Instalacao das dependencias e criacao dos arquivos de controle. O requirements-dev.txt usa "-r requirements.txt" para incluir tudo do producao — assim o desenvolvedor instala tudo com um comando.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Passo 3: src/config.py — modulo de configuracao central\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\ndef _get_obrigatorio(nome: str) -> str:\n    """Retorna a variavel de ambiente ou lanca erro com mensagem clara."""\n    valor = os.getenv(nome)\n    if valor is None:\n        raise EnvironmentError(\n            f"Variavel de ambiente obrigatoria \'{nome}\' nao encontrada.\\n"\n            f"Copie .env.example para .env e preencha os valores."\n        )\n    return valor\n\n\n# Configuracoes da aplicacao\nDEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"\nSECRET_KEY: str = _get_obrigatorio("SECRET_KEY")\nALLOWED_HOSTS: list = os.getenv("ALLOWED_HOSTS", "localhost").split(",")\n\n# Configuracoes do banco de dados\nDB_URL: str = os.getenv("DB_URL", "sqlite:///desenvolvimento.db")\n\n# APIs externas\nSTRIPE_KEY: str = os.getenv("STRIPE_API_KEY", "")  # opcional em dev\n\n\n# src/app.py — aplicacao principal\nfrom flask import Flask, jsonify\nfrom src.config import DEBUG, ALLOWED_HOSTS\n\napp = Flask(__name__)\n\n@app.route("/health")\ndef health_check():\n    return jsonify({"status": "ok", "debug": DEBUG})\n\nif __name__ == "__main__":\n    app.run(debug=DEBUG, host="0.0.0.0", port=5000)',
        filename: 'src/config.py',
        description:
          'Modulo de configuracao com validacao de variaveis obrigatorias e tipos corretos. Centralizando aqui, toda a aplicacao importa de config.py — nunca usa os.getenv() espalhado pelo codigo.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Passo 4: Criar os arquivos .env, .env.example e Makefile\n\n# .env — com valores reais (no .gitignore)\ncat > .env << EOF\nDEBUG=true\nSECRET_KEY=chave-secreta-para-desenvolvimento-123\nALLOWED_HOSTS=localhost,127.0.0.1\nDB_URL=sqlite:///desenvolvimento.db\nSTRIPE_API_KEY=sk_test_sua_chave_aqui\nEOF\n\n# .env.example — template sem valores (vai para o git)\ncat > .env.example << EOF\nDEBUG=\nSECRET_KEY=\nALLOWED_HOSTS=\nDB_URL=\nSTRIPE_API_KEY=\nEOF\n\n# Makefile completo\ncat > Makefile << \'EOF\'\n.PHONY: all install install-dev test lint format clean run help\n\nPYTHON = python\nPIP = pip\n\nhelp:  ## Mostra os comandos disponiveis\n\t@grep -E \'^[a-zA-Z_-]+:.*?## .*$$\' $(MAKEFILE_LIST) | \\\n\t\tawk \'BEGIN {FS = ":.*?## "}; {printf "  make %-18s %s\\n", $$1, $$2}\'\n\ninstall:  ## Instala dependencias de producao\n\t$(PIP) install -r requirements.txt\n\ninstall-dev:  ## Instala dependencias de desenvolvimento\n\t$(PIP) install -r requirements-dev.txt\n\ntest:  ## Executa os testes\n\t$(PYTHON) -m pytest tests/ -v\n\ntest-cov:  ## Executa testes com cobertura\n\t$(PYTHON) -m pytest tests/ --cov=src --cov-report=term-missing\n\nlint:  ## Verifica o estilo com flake8\n\tflake8 src/ tests/ --max-line-length=88\n\nformat:  ## Formata o codigo com black\n\tblack src/ tests/\n\nclean:  ## Remove arquivos temporarios\n\tfind . -type f -name "*.pyc" -delete\n\tfind . -type d -name "__pycache__" -exec rm -rf {} +\n\trm -rf .pytest_cache/ .coverage htmlcov/\n\nrun:  ## Inicia a aplicacao Flask\n\t$(PYTHON) src/app.py\n\nall: install-dev lint test  ## Setup completo e verificacao\nEOF\n\necho "Projeto configurado! Use \'make help\' para ver os comandos."',
        filename: 'passo-4-env-makefile.sh',
        description:
          'Criacao dos arquivos finais: .env com valores de desenvolvimento, .env.example como template para o time, e o Makefile completo com autodocumentacao via "make help".',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Checklist do projeto profissional: (1) venv/ esta no .gitignore? (2) .env esta no .gitignore? (3) .env.example esta no git? (4) requirements.txt tem versoes fixas (pip freeze)? (5) Makefile tem target "test" e "lint"? (6) README explica como configurar o ambiente? Se tudo marcado, seu projeto esta pronto para trabalho em equipe e deploy.',
    },
  ],
  challenges: [
    {
      id: 'projeto-profissional-c1',
      title: 'Script de Setup Automatico',
      description:
        'Escreva um script bash "setup.sh" que automatiza toda a configuracao inicial de um novo desenvolvedor: verificar se Python 3 esta instalado, criar o venv, ativar, instalar requirements-dev.txt, copiar .env.example para .env se .env nao existir, e mostrar mensagem de sucesso com os proximos passos.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# setup.sh — Script de configuracao inicial do projeto\nset -e  # Para na primeira falha\n\necho "Configurando o projeto..."\n\n# 1. Verificar se Python 3 esta disponivel\n# Use: command -v python3 || command -v python\n# Se nao encontrar, mostre mensagem de erro e saia com codigo 1\n\n# 2. Criar o ambiente virtual (pasta "venv")\n# Nao recriar se ja existir\n\n# 3. Ativar o ambiente virtual\n\n# 4. Instalar dependencias de desenvolvimento\n\n# 5. Copiar .env.example para .env somente se .env nao existir\n# Use: if [ ! -f .env ]; then ... fi\n\n# 6. Mensagem de sucesso\necho ""\necho "Setup concluido! Proximos passos:"\necho "  1. Edite o arquivo .env com seus valores"\necho "  2. Execute: source venv/bin/activate"\necho "  3. Execute: make test"\n',
      solution:
        '#!/bin/bash\n# setup.sh — Script de configuracao inicial do projeto\nset -e  # Para na primeira falha\n\necho "Configurando o projeto..."\n\n# 1. Verificar se Python 3 esta disponivel\nif command -v python3 &>/dev/null; then\n    PYTHON=python3\nelif command -v python &>/dev/null; then\n    PYTHON=python\nelse\n    echo "ERRO: Python 3 nao encontrado. Instale em https://python.org"\n    exit 1\nfi\necho "Python encontrado: $($PYTHON --version)"\n\n# 2. Criar o ambiente virtual (nao recriar se ja existir)\nif [ ! -d "venv" ]; then\n    echo "Criando ambiente virtual..."\n    $PYTHON -m venv venv\nelse\n    echo "Ambiente virtual ja existe, pulando criacao."\nfi\n\n# 3. Ativar o ambiente virtual\nsource venv/bin/activate\necho "Ambiente virtual ativado."\n\n# 4. Instalar dependencias de desenvolvimento\necho "Instalando dependencias..."\npip install --upgrade pip -q\npip install -r requirements-dev.txt\n\n# 5. Copiar .env.example para .env somente se .env nao existir\nif [ ! -f .env ]; then\n    if [ -f .env.example ]; then\n        cp .env.example .env\n        echo "Arquivo .env criado a partir do .env.example."\n    else\n        echo "AVISO: .env.example nao encontrado. Crie o .env manualmente."\n    fi\nelse\n    echo "Arquivo .env ja existe, mantendo o existente."\nfi\n\n# 6. Mensagem de sucesso\necho ""\necho "Setup concluido! Proximos passos:"\necho "  1. Edite o arquivo .env com seus valores"\necho "  2. Execute: source venv/bin/activate"\necho "  3. Execute: make test"\n',
      hints: [
        'Use "command -v python3 &>/dev/null" para verificar se um programa existe sem mostrar output',
        'Para verificar se diretorio existe: "if [ ! -d venv ]" — o "!" inverte a condicao (se NAO existe)',
        'Para copiar apenas se o destino nao existe: "if [ ! -f .env ]; then cp .env.example .env; fi"',
      ],
    },
    {
      id: 'projeto-profissional-c2',
      title: 'Modulo de Config com Validacao Completa',
      description:
        'Escreva o modulo config.py completo com: carregamento do .env, variaveis DEBUG (bool), SECRET_KEY (obrigatoria), PORT (int, padrao 5000), ALLOWED_HOSTS (list de strings), DB_URL (str). Adicione uma funcao "validar_config()" que verifica todas as obrigatorias e retorna lista de erros.',
      language: 'python',
      starterCode:
        '# src/config.py\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\n# DEBUG: booleano, padrao False\nDEBUG = \n\n# SECRET_KEY: string obrigatoria\nSECRET_KEY = \n\n# PORT: inteiro, padrao 5000\nPORT = \n\n# ALLOWED_HOSTS: lista de strings separadas por virgula\n# Exemplo no .env: ALLOWED_HOSTS=localhost,127.0.0.1,meusite.com\nALLOWED_HOSTS = \n\n# DB_URL: string, padrao sqlite de desenvolvimento\nDB_URL = \n\n\ndef validar_config() -> list:\n    """Retorna lista de erros de configuracao. Lista vazia = tudo ok."""\n    erros = []\n    # Verifique SECRET_KEY\n    # Verifique se PORT e um numero valido\n    # Verifique se DEBUG e um valor reconhecido\n    return erros\n',
      solution:
        '# src/config.py\nfrom dotenv import load_dotenv\nimport os\n\nload_dotenv()\n\n# DEBUG: booleano, padrao False\nDEBUG = os.getenv("DEBUG", "false").lower() == "true"\n\n# SECRET_KEY: string obrigatoria\nSECRET_KEY = os.getenv("SECRET_KEY", "")\n\n# PORT: inteiro, padrao 5000\ntry:\n    PORT = int(os.getenv("PORT", "5000"))\nexcept ValueError:\n    PORT = 5000\n\n# ALLOWED_HOSTS: lista de strings separadas por virgula\nALLOWED_HOSTS = [\n    host.strip()\n    for host in os.getenv("ALLOWED_HOSTS", "localhost").split(",")\n    if host.strip()\n]\n\n# DB_URL: string, padrao sqlite de desenvolvimento\nDB_URL = os.getenv("DB_URL", "sqlite:///desenvolvimento.db")\n\n\ndef validar_config() -> list:\n    """Retorna lista de erros de configuracao. Lista vazia = tudo ok."""\n    erros = []\n\n    if not SECRET_KEY:\n        erros.append("SECRET_KEY e obrigatoria e nao pode estar vazia")\n    elif len(SECRET_KEY) < 16:\n        erros.append("SECRET_KEY deve ter pelo menos 16 caracteres para ser segura")\n\n    _port_str = os.getenv("PORT", "5000")\n    try:\n        _port_val = int(_port_str)\n        if _port_val < 1 or _port_val > 65535:\n            erros.append(f"PORT deve estar entre 1 e 65535, recebido: {_port_val}")\n    except ValueError:\n        erros.append(f"PORT deve ser um numero inteiro, recebido: \'{_port_str}\'")\n\n    _debug_str = os.getenv("DEBUG", "false").lower()\n    if _debug_str not in ("true", "false", "1", "0", "yes", "no"):\n        erros.append(f"DEBUG deve ser true/false, recebido: \'{_debug_str}\'")\n\n    return erros\n',
      hints: [
        'Para converter lista com list comprehension: [h.strip() for h in os.getenv("ALLOWED_HOSTS","localhost").split(",")]',
        'Para converter PORT com tratamento de erro: use try/except ValueError ao redor do int()',
        'A funcao validar_config deve APENAS coletar erros em uma lista e retornar — nao deve lancar excecoes',
      ],
    },
  ],
};
