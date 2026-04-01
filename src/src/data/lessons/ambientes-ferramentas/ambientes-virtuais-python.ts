import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'ambientes-virtuais-python',
  moduleId: 'ambientes-ferramentas',
  title: 'Ambientes Virtuais Python',
  description: 'Crie e gerencie ambientes virtuais com venv, instale dependencias com pip e mantenha projetos isolados e reproduziveis',
  order: 0,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Por que isolar dependencias?\n\nImagine dois projetos no mesmo computador: o Projeto A precisa do Django 3.2 e o Projeto B precisa do Django 4.2. Se voce instalar os dois globalmente, um vai quebrar o outro.\n\nAmbientes virtuais resolvem isso criando uma pasta isolada com o Python e os pacotes de cada projeto. Cada projeto tem seu proprio "mundo" de dependencias.\n\n### Problemas do ambiente global\n- **Conflito de versoes:** pacote X na versao 1.0 para um projeto e 2.0 para outro\n- **Poluicao global:** dezenas de pacotes instalados que voce nao sabe mais de onde vem\n- **Nao reproduzivel:** funciona na sua maquina, mas nao na do colega ou no servidor\n- **Dificil de limpar:** desinstalar pacotes globais pode quebrar outras coisas\n\n### A solucao: `venv`\nO modulo `venv` esta embutido no Python 3 — nao precisa instalar nada. Ele cria uma pasta com uma copia do Python e um `pip` isolado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# 1. Criar o ambiente virtual (cria a pasta "venv" no diretorio atual)\npython -m venv venv\n\n# 2. Ativar o ambiente\n# No Linux/Mac:\nsource venv/bin/activate\n\n# No Windows (Command Prompt):\nvenv\\Scripts\\activate.bat\n\n# No Windows (PowerShell):\nvenv\\Scripts\\Activate.ps1\n\n# 3. Verificar que o ambiente esta ativo (aparece "(venv)" no prompt)\n# (venv) $ which python\n# /meu-projeto/venv/bin/python\n\n# 4. Desativar quando terminar\ndeactivate',
        filename: 'criar-e-ativar-venv.sh',
        description:
          'Fluxo completo de criacao e ativacao do ambiente virtual. Apos ativar, todo comando "pip install" vai para dentro da pasta venv, sem afetar o sistema.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Com o ambiente ativado:\n\n# Instalar um pacote\npip install requests\n\n# Instalar versao especifica\npip install requests==2.31.0\n\n# Instalar multiplos pacotes\npip install flask sqlalchemy python-dotenv\n\n# Ver todos os pacotes instalados no ambiente\npip list\n\n# Gerar o arquivo requirements.txt (snapshot das dependencias)\npip freeze > requirements.txt\n\n# Ver o conteudo gerado\ncat requirements.txt\n# certifi==2024.2.2\n# charset-normalizer==3.3.2\n# idna==3.6\n# requests==2.31.0\n# urllib3==2.2.1\n\n# Instalar tudo de um requirements.txt (para replicar o ambiente)\npip install -r requirements.txt',
        filename: 'pip-comandos-essenciais.sh',
        description:
          'Comandos pip essenciais dentro de um ambiente virtual. O "pip freeze" captura versoes exatas — isso garante que o projeto funcione igual em qualquer maquina.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nunca comite a pasta "venv/" no git. Ela e grande, especifica da sua maquina e completamente regeneravel com "pip install -r requirements.txt". Adicione "venv/" ao seu .gitignore. O que voce DEVE comitar e o requirements.txt.',
    },
    {
      type: 'text',
      content:
        '## Estrutura recomendada de projeto\n\nUm projeto Python profissional com ambiente virtual bem organizado:\n\n```\nmeu-projeto/\n├── venv/                  # NAO comitar — gerado localmente\n├── src/\n│   └── main.py\n├── tests/\n│   └── test_main.py\n├── requirements.txt       # Dependencias de producao\n├── requirements-dev.txt   # Dependencias so de desenvolvimento (pytest, black...)\n├── .gitignore             # Inclui "venv/"\n└── README.md\n```\n\n### requirements-dev.txt\nE boa pratica separar dependencias de producao das de desenvolvimento:\n\n```\n# requirements-dev.txt\n-r requirements.txt      # inclui tudo do requirements.txt\npytest==7.4.0\nblack==23.12.0\nflake8==7.0.0\n```\n\nNo servidor de producao: `pip install -r requirements.txt`\nNa maquina de desenvolvedor: `pip install -r requirements-dev.txt`',
    },
  ],
  challenges: [
    {
      id: 'ambientes-virtuais-c1',
      title: 'Configure um Ambiente Virtual',
      description:
        'Escreva o script bash completo para configurar um novo projeto Python chamado "meu-app": criar o diretorio, criar o ambiente virtual, ativar, instalar os pacotes "flask" e "python-dotenv", e gerar o requirements.txt.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# Configure o ambiente virtual para o projeto "meu-app"\n\n# 1. Criar e entrar no diretorio do projeto\n\n# 2. Criar o ambiente virtual\n\n# 3. Ativar o ambiente virtual\n\n# 4. Instalar flask e python-dotenv\n\n# 5. Gerar requirements.txt\n\necho "Ambiente configurado com sucesso!"\n',
      solution:
        '#!/bin/bash\n# Configure o ambiente virtual para o projeto "meu-app"\n\n# 1. Criar e entrar no diretorio do projeto\nmkdir meu-app\ncd meu-app\n\n# 2. Criar o ambiente virtual\npython -m venv venv\n\n# 3. Ativar o ambiente virtual\nsource venv/bin/activate\n\n# 4. Instalar flask e python-dotenv\npip install flask python-dotenv\n\n# 5. Gerar requirements.txt\npip freeze > requirements.txt\n\necho "Ambiente configurado com sucesso!"\n',
      hints: [
        'Use "python -m venv venv" para criar o ambiente — o segundo "venv" e o nome da pasta',
        'No Linux/Mac o comando de ativacao e "source venv/bin/activate", no Windows e diferente',
        '"pip freeze > requirements.txt" captura as versoes exatas de todos os pacotes instalados',
      ],
    },
    {
      id: 'ambientes-virtuais-c2',
      title: 'Escreva o .gitignore correto',
      description:
        'Crie um arquivo .gitignore adequado para um projeto Python com ambiente virtual. Ele deve ignorar a pasta venv, arquivos de cache Python, arquivos de ambiente (.env), e diretorio de build.',
      language: 'bash',
      starterCode:
        '# Crie o .gitignore com o conteudo correto\n# Use: cat > .gitignore << EOF\n# ... conteudo ...\n# EOF\n\n# O arquivo deve ignorar pelo menos:\n# - pasta do ambiente virtual\n# - cache do Python (__pycache__, .pyc)\n# - arquivo .env com segredos\n# - diretorio dist/ de build\n',
      solution:
        'cat > .gitignore << EOF\n# Ambiente virtual\nvenv/\n.venv/\nenv/\n\n# Cache do Python\n__pycache__/\n*.py[cod]\n*.pyo\n\n# Variaveis de ambiente e segredos\n.env\n.env.local\n.env.*.local\n\n# Build e distribuicao\ndist/\nbuild/\n*.egg-info/\n\n# IDEs\n.vscode/\n.idea/\n*.swp\nEOF\n\necho "Arquivo .gitignore criado!"\ncat .gitignore\n',
      hints: [
        'A pasta do venv pode ter varios nomes: venv/, .venv/, env/ — ignore todos',
        'Arquivos .pyc sao gerados automaticamente pelo Python e nao devem ser commitados',
        'O arquivo .env contem segredos como senhas e chaves de API — NUNCA deve ir para o git',
      ],
    },
  ],
};
