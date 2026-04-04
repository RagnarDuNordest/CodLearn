import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'repositorios-remotos',
  moduleId: 'git',
  title: 'Repositorios Remotos',
  description:
    'Aprenda a trabalhar com repositorios remotos usando git remote, git push, git pull, git clone e git fetch para sincronizar seu codigo com a nuvem.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Um repositorio remoto e como uma copia de seguranca na nuvem: todos da equipe podem acessar e contribuir!\n\n## O que e um Repositorio Remoto?\n\nAte agora, trabalhamos com repositorios **locais** -- que existem apenas no seu computador. Um repositorio **remoto** e uma versao do seu projeto hospedada em um servidor na internet (como GitHub, GitLab ou Bitbucket).\n\nRepositorios remotos permitem:\n\n- **Backup na nuvem**: se seu computador quebrar, o codigo esta seguro\n- **Colaboracao**: outras pessoas podem acessar, clonar e contribuir\n- **Sincronizacao**: trabalhe em diferentes computadores com o mesmo projeto\n- **Deploy**: muitos servicos de hospedagem fazem deploy direto do repositorio remoto\n\nO nome padrao para o repositorio remoto principal e **origin**. Quando voce clona um repositorio do GitHub, o Git automaticamente configura o "origin" apontando para a URL do GitHub.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# CONFIGURANDO UM REMOTO\n# ====================================\n\n# Ver os remotos configurados\ngit remote\n# (vazio se voce criou o repo com git init)\n\n# Adicionar um remoto chamado "origin"\ngit remote add origin https://github.com/seu-usuario/meu-projeto.git\n\n# Ver os remotos com as URLs\ngit remote -v\n# origin  https://github.com/seu-usuario/meu-projeto.git (fetch)\n# origin  https://github.com/seu-usuario/meu-projeto.git (push)\n\n# Renomear um remoto\ngit remote rename origin upstream\n\n# Remover um remoto\ngit remote remove upstream\n\n# ====================================\n# CLONANDO UM REPOSITORIO\n# ====================================\n\n# Clonar um repositorio existente do GitHub\ngit clone https://github.com/usuario/projeto.git\n# Isso cria a pasta "projeto" com todo o historico\n\n# Clonar em uma pasta com nome diferente\ngit clone https://github.com/usuario/projeto.git minha-pasta\n\n# Clonar apenas a branch main (mais rapido)\ngit clone --single-branch https://github.com/usuario/projeto.git',
        filename: 'remotos-config.sh',
        description:
          'Configurando e gerenciando repositorios remotos. O git clone ja configura o origin automaticamente.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# PUSH - ENVIAR COMMITS PARA O REMOTO\n# ====================================\n\n# Enviar a branch main para o origin\ngit push origin main\n\n# Primeiro push: usar -u para configurar o upstream tracking\ngit push -u origin main\n# Depois disso, basta usar:\ngit push\n# (o Git ja sabe para onde enviar)\n\n# Enviar uma branch especifica\ngit push origin feature-login\n\n# ====================================\n# PULL - BAIXAR E APLICAR MUDANCAS\n# ====================================\n\n# Baixar e aplicar mudancas da main remota\ngit pull origin main\n\n# Se o upstream ja esta configurado (-u), basta:\ngit pull\n\n# O git pull e equivalente a:\n# git fetch origin    (baixa as mudancas)\n# git merge origin/main  (aplica as mudancas)\n\n# ====================================\n# FETCH - APENAS BAIXAR (SEM APLICAR)\n# ====================================\n\n# Baixar mudancas sem aplicar (mais seguro)\ngit fetch origin\n\n# Ver o que mudou no remoto\ngit log main..origin/main --oneline\n\n# Aplicar manualmente quando estiver pronto\ngit merge origin/main',
        filename: 'push-pull-fetch.sh',
        description:
          'Push envia seus commits para o remoto, pull baixa e aplica mudancas, e fetch apenas baixa sem aplicar -- util para revisar antes de integrar.',
      },
    },
    {
      type: 'text',
      content:
        '## Entendendo origin/main\n\nQuando voce usa `git fetch`, o Git baixa as mudancas e as coloca em **branches de rastreamento remoto** (remote tracking branches). Elas seguem o formato `origin/nome-da-branch`.\n\n- **main**: sua branch local\n- **origin/main**: a copia local do estado da main no servidor remoto\n\nEssas branches de rastreamento sao atualizadas automaticamente com `git fetch` ou `git pull`. Voce nao faz commits diretamente nelas -- elas sao apenas referencias para o que existe no remoto.\n\n```\nSeu computador              GitHub (origin)\n\nmain (local)                main (remoto)\n  |                           |\n  A --- B --- C               A --- B --- C --- D\n\nApos git fetch:\n\nmain (local)                main (remoto)\n  |                           |\n  A --- B --- C               A --- B --- C --- D\n                |\n           origin/main -> D\n```\n\nApos o fetch, voce pode inspecionar `origin/main` e decidir se quer fazer merge.',
    },
    {
      type: 'callout',
      content:
        'Prefira "git fetch" seguido de "git merge" em vez de "git pull" direto quando estiver trabalhando em algo importante. O fetch permite que voce veja o que mudou no remoto antes de integrar, evitando surpresas. O pull e mais pratico para o dia a dia quando voce so quer atualizar rapidamente.',
      calloutType: 'tip',
    },
    {
      type: 'callout',
      content:
        'Git parece complicado no inicio, mas depois que voce pega o jeito, nao consegue mais viver sem!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## git pull --rebase: Historico Mais Limpo\n\nO `git pull` padrao faz um **merge** das mudancas remotas com suas locais, criando um commit de merge no historico. Uma alternativa mais elegante e o **`git pull --rebase`**, que reaplica seus commits locais **em cima** das mudancas remotas, resultando em um historico linear e mais limpo.\n\n```\n# Antes do pull:\nLocal:  A --- B --- C (seus commits)\nRemoto: A --- B --- D --- E (commits de outros)\n\n# git pull (merge):\n         A --- B --- C ------- M (merge commit)\n                  \\         /\n                   D --- E\n\n# git pull --rebase:\n         A --- B --- D --- E --- C\' (historico linear!)\n```\n\nVoce pode configurar isso como padrao: `git config --global pull.rebase true`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'pull-rebase.sh',
        code: '# Pull com rebase (historico mais limpo)\ngit pull --rebase origin main\n\n# Configurar pull --rebase como padrao global\ngit config --global pull.rebase true\n\n# Se houver conflito durante o pull --rebase:\n# 1. Resolva o conflito no arquivo\ngit add arquivo-resolvido.js\n# 2. Continue o rebase\ngit rebase --continue\n# ou cancele e volte ao estado anterior:\ngit rebase --abort\n\n# Ver o estado do repositorio em relacao ao remoto\ngit status\n# "Your branch is up to date with origin/main"\n# "Your branch is 2 commits ahead of origin/main"\n# "Your branch is 1 commit behind origin/main"',
        description:
          'git pull --rebase mantem o historico linear, evitando commits de merge desnecessarios.',
      },
    },
  ],
  challenges: [
    {
      id: 'git4-c1',
      title: 'Conectando e enviando para o remoto',
      description:
        'Escreva os comandos para: (1) adicionar um remoto chamado origin apontando para https://github.com/user/app.git, (2) verificar o remoto configurado, (3) enviar a branch main com upstream tracking, (4) enviar uma branch feature-api para o remoto.',
      language: 'bash',
      starterCode: '# Passo 1: Adicionar o remoto origin\n\n\n# Passo 2: Verificar o remoto\n\n\n# Passo 3: Enviar main com upstream tracking\n\n\n# Passo 4: Enviar branch feature-api\n',
      solution: '# Passo 1: Adicionar o remoto origin\ngit remote add origin https://github.com/user/app.git\n\n# Passo 2: Verificar o remoto\ngit remote -v\n\n# Passo 3: Enviar main com upstream tracking\ngit push -u origin main\n\n# Passo 4: Enviar branch feature-api\ngit push origin feature-api',
      hints: [
        'Use "git remote add nome url" para adicionar um remoto.',
        'A flag -v mostra as URLs do remoto (fetch e push).',
        'Use "git push -u origin main" no primeiro push para configurar tracking.',
      ],
    },
    {
      id: 'git4-c2',
      title: 'Sincronizando com o remoto',
      description:
        'Escreva os comandos para: (1) clonar um repositorio do GitHub, (2) entrar na pasta clonada, (3) buscar as atualizacoes sem aplicar (fetch), (4) ver o que mudou no remoto, (5) aplicar as mudancas na sua branch local.',
      language: 'bash',
      starterCode: '# Passo 1: Clonar o repositorio\n\n\n# Passo 2: Entrar na pasta\n\n\n# Passo 3: Buscar atualizacoes (sem aplicar)\n\n\n# Passo 4: Ver o que mudou\n\n\n# Passo 5: Aplicar as mudancas\n',
      solution: '# Passo 1: Clonar o repositorio\ngit clone https://github.com/equipe/projeto-web.git\n\n# Passo 2: Entrar na pasta\ncd projeto-web\n\n# Passo 3: Buscar atualizacoes (sem aplicar)\ngit fetch origin\n\n# Passo 4: Ver o que mudou\ngit log main..origin/main --oneline\n\n# Passo 5: Aplicar as mudancas\ngit merge origin/main',
      hints: [
        'O git clone cria uma pasta com o nome do repositorio automaticamente.',
        'Use "git fetch origin" para baixar mudancas sem aplicar.',
        'Use "git log main..origin/main" para ver commits que existem no remoto mas nao no local.',
      ],
    },
  ],
};
