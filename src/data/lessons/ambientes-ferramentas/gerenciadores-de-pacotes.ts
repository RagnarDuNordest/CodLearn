import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'gerenciadores-de-pacotes',
  moduleId: 'ambientes-ferramentas',
  title: 'Gerenciadores de Pacotes',
  description: 'Domine pip para Python e npm/yarn para JavaScript: instale, remova e gerencie dependencias como um profissional',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O que sao gerenciadores de pacotes?\n\nUm gerenciador de pacotes e uma ferramenta que automatiza o processo de instalar, atualizar, configurar e remover bibliotecas (pacotes) de software.\n\nSem eles, voce teria que:\n1. Encontrar a biblioteca no site oficial\n2. Baixar o arquivo .zip manualmente\n3. Extrair na pasta certa\n4. Resolver dependencias (a biblioteca X depende da Y que depende da Z...)\n5. Repetir para cada atualizacao\n\nCom um gerenciador, tudo isso vira um comando: `pip install requests`.\n\n### Os principais por ecossistema\n- **Python:** `pip` (padrao) e `poetry` (moderno)\n- **JavaScript/Node.js:** `npm` (padrao) e `yarn` (alternativa rapida)\n- **Java:** `Maven` e `Gradle`\n- **Rust:** `cargo`\n- **Go:** `go get`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ── pip (Python) ────────────────────────────────────────────\n\n# Instalar pacote\npip install requests\n\n# Instalar versao especifica\npip install requests==2.31.0\n\n# Instalar versao minima\npip install "requests>=2.28.0"\n\n# Atualizar pacote\npip install --upgrade requests\n\n# Remover pacote\npip uninstall requests\n\n# Listar instalados\npip list\n\n# Buscar informacoes de um pacote\npip show requests\n\n# Verificar dependencias desatualizadas\npip list --outdated\n\n# Instalar de requirements.txt\npip install -r requirements.txt\n\n# Salvar estado atual\npip freeze > requirements.txt',
        filename: 'pip-comandos.sh',
        description:
          'Referencia completa dos comandos pip mais usados. O "pip show" e muito util para ver a versao, autor e dependencias de um pacote especifico.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ── npm (Node.js/JavaScript) ─────────────────────────────────\n\n# Inicializar projeto (cria package.json)\nnpm init -y\n\n# Instalar pacote como dependencia de producao\nnpm install express\n\n# Instalar como dependencia de desenvolvimento\nnpm install --save-dev jest\n\n# Instalar versao especifica\nnpm install express@4.18.2\n\n# Instalar globalmente (ferramentas CLI)\nnpm install -g typescript\n\n# Remover pacote\nnpm uninstall express\n\n# Instalar tudo do package.json\nnpm install\n\n# Atualizar pacotes\nnpm update\n\n# Executar script definido no package.json\nnpm run test\nnpm run build\nnpm start\n\n# ── yarn (alternativa ao npm) ─────────────────────────────────\nyarn add express              # equivale a: npm install express\nyarn add --dev jest           # equivale a: npm install --save-dev jest\nyarn remove express           # equivale a: npm uninstall express\nyarn                          # equivale a: npm install',
        filename: 'npm-yarn-comandos.sh',
        description:
          'Comandos npm e yarn lado a lado. npm vem com o Node.js. yarn e uma alternativa criada pelo Facebook, geralmente mais rapida e com saida mais legivel.',
      },
    },
    {
      type: 'text',
      content:
        '## package.json e lock files\n\nO `package.json` (npm/yarn) e o equivalente JavaScript do `requirements.txt` do Python, mas com superpoderes:\n\n```json\n{\n  "name": "meu-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node src/index.js",\n    "test": "jest",\n    "build": "tsc",\n    "lint": "eslint src/"\n  },\n  "dependencies": {\n    "express": "^4.18.2"\n  },\n  "devDependencies": {\n    "jest": "^29.0.0",\n    "eslint": "^8.0.0"\n  }\n}\n```\n\n### Lock files — garantia de reproducibilidade\n| Ferramenta | Lock file |\n|---|---|\n| npm | `package-lock.json` |\n| yarn | `yarn.lock` |\n| pip + pip-tools | `requirements.lock` |\n\n**Lock files registram as versoes EXATAS** de todas as dependencias (incluindo as dependencias das dependencias). Sempre comite o lock file junto com o package.json.\n\n### Scripts no package.json\nO campo "scripts" permite criar atalhos de comandos. `npm run test` vai executar exatamente o comando definido — isso padroniza o projeto para toda a equipe.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra de ouro para lock files: comite o lock file, ignore a pasta de pacotes. Para npm/yarn, a pasta node_modules/ deve estar no .gitignore. Para Python, a pasta venv/ deve estar no .gitignore. O lock file garante reproducibilidade; a pasta e regenerada com um unico comando.',
    },
  ],
  challenges: [
    {
      id: 'gerenciadores-pacotes-c1',
      title: 'Configure um package.json com Scripts',
      description:
        'Crie um projeto Node.js com npm init, instale o pacote "axios" como dependencia de producao e "jest" como dependencia de desenvolvimento. Depois adicione um script "test" que executa "jest" no package.json.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# Configure o projeto Node.js com npm\n\n# 1. Criar diretorio e entrar\nmkdir meu-app-js\ncd meu-app-js\n\n# 2. Inicializar o package.json\n\n# 3. Instalar axios como dependencia de producao\n\n# 4. Instalar jest como dependencia de desenvolvimento\n\n# 5. Adicionar script "test": "jest" ao package.json\n# Dica: use npm pkg set scripts.test="jest"\n\n# 6. Verificar o resultado\ncat package.json\n',
      solution:
        '#!/bin/bash\n# Configure o projeto Node.js com npm\n\n# 1. Criar diretorio e entrar\nmkdir meu-app-js\ncd meu-app-js\n\n# 2. Inicializar o package.json\nnpm init -y\n\n# 3. Instalar axios como dependencia de producao\nnpm install axios\n\n# 4. Instalar jest como dependencia de desenvolvimento\nnpm install --save-dev jest\n\n# 5. Adicionar script "test": "jest" ao package.json\nnpm pkg set scripts.test="jest"\n\n# 6. Verificar o resultado\ncat package.json\n',
      hints: [
        '"npm init -y" cria o package.json automaticamente aceitando todos os padroes (sem perguntas)',
        'Use "--save-dev" ou "-D" para dependencias que so existem em desenvolvimento, como jest, eslint, typescript',
        '"npm pkg set scripts.test=jest" e um atalho moderno para editar o package.json pela linha de comando',
      ],
    },
    {
      id: 'gerenciadores-pacotes-c2',
      title: 'Comparacao pip vs npm',
      description:
        'Escreva os comandos equivalentes: para cada operacao listada, escreva o comando pip (Python) e o comando npm (JavaScript) que fazem a mesma coisa. Use comentarios para organizar.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# Comandos equivalentes: pip (Python) vs npm (JavaScript)\n\n# Operacao 1: Instalar o pacote "requests" / "axios"\n# pip:\n# npm:\n\n# Operacao 2: Instalar versao especifica 2.0.0\n# pip:\n# npm:\n\n# Operacao 3: Remover um pacote\n# pip:\n# npm:\n\n# Operacao 4: Listar pacotes instalados\n# pip:\n# npm:\n\n# Operacao 5: Instalar todas as dependencias do projeto\n# pip:\n# npm:\n',
      solution:
        '#!/bin/bash\n# Comandos equivalentes: pip (Python) vs npm (JavaScript)\n\n# Operacao 1: Instalar o pacote "requests" / "axios"\n# pip:  pip install requests\n# npm:  npm install axios\n\n# Operacao 2: Instalar versao especifica 2.0.0\n# pip:  pip install requests==2.0.0\n# npm:  npm install axios@2.0.0\n\n# Operacao 3: Remover um pacote\n# pip:  pip uninstall requests\n# npm:  npm uninstall axios\n\n# Operacao 4: Listar pacotes instalados\n# pip:  pip list\n# npm:  npm list\n\n# Operacao 5: Instalar todas as dependencias do projeto\n# pip:  pip install -r requirements.txt\n# npm:  npm install\n',
      hints: [
        'pip usa "==" para versao especifica; npm usa "@" — ex: requests==2.0.0 vs axios@2.0.0',
        'pip usa "uninstall"; npm usa "uninstall" tambem — essa e uma das poucas que coincide',
        'npm install sem argumentos le o package.json; pip usa "-r requirements.txt" explicitamente',
      ],
    },
  ],
};
