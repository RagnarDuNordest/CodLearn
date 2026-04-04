import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'branches',
  moduleId: 'git',
  title: 'Branches (Ramificacoes)',
  description:
    'Aprenda o que sao branches, como criar, trocar, listar e deletar ramificacoes no Git, e entenda o conceito de HEAD.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Imagine escrever um livro e querer testar um final alternativo sem perder o original. Uma branch e exatamente isso: uma copia paralela onde voce experimenta sem medo!\n\n## O que sao Branches?\n\nUma **branch** (ramificacao) e uma linha independente de desenvolvimento no Git. Pense em branches como linhas do tempo alternativas do seu projeto: voce pode criar uma nova linha, trabalhar nela sem afetar a principal, e depois juntar tudo.\n\nPor padrao, todo repositorio Git comeca com uma branch chamada **main** (ou master em repositorios mais antigos). Essa e a branch principal, que geralmente contem o codigo estavel e funcionando.\n\nPor que usar branches?\n\n- **Isolar funcionalidades**: trabalhe em uma nova feature sem quebrar o que ja funciona\n- **Corrigir bugs**: crie uma branch para o fix sem interferir no desenvolvimento de novas features\n- **Experimentar**: teste ideias livremente sabendo que pode descartar a branch se nao funcionar\n- **Trabalhar em equipe**: cada pessoa trabalha na sua branch sem conflitos\n\nBranches sao extremamente leves no Git -- criar uma branch e quase instantaneo porque o Git apenas cria um novo ponteiro, nao copia todos os arquivos.',
    },
    {
      type: 'text',
      content:
        '## O que e HEAD?\n\nO **HEAD** e um ponteiro especial do Git que indica **onde voce esta agora**. Ele aponta para o ultimo commit da branch atual.\n\nQuando voce troca de branch, o HEAD se move para apontar para a nova branch. Quando voce faz um commit, o HEAD avanca para o novo commit.\n\n```\nmain:     A --- B --- C  <-- HEAD (voce esta aqui)\n```\n\nSe voce criar uma branch "feature" a partir de C e trocar para ela:\n\n```\nmain:     A --- B --- C\n                       \\\nfeature:                D --- E  <-- HEAD (agora voce esta aqui)\n```\n\nO HEAD sempre responde a pergunta: "Em qual branch e em qual commit eu estou trabalhando agora?"',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# CRIANDO E GERENCIANDO BRANCHES\n# ====================================\n\n# Listar todas as branches locais\n# O asterisco (*) indica a branch atual\ngit branch\n# * main\n\n# Criar uma nova branch\ngit branch feature-login\n\n# Listar novamente -- a branch foi criada mas voce ainda esta na main\ngit branch\n# * main\n#   feature-login\n\n# Trocar para a nova branch (metodo classico)\ngit checkout feature-login\n# Switched to branch \'feature-login\'\n\n# Trocar para outra branch (metodo moderno, Git 2.23+)\ngit switch feature-login\n# Switched to branch \'feature-login\'\n\n# ATALHO: Criar e trocar ao mesmo tempo\ngit checkout -b feature-cadastro\n# Equivalente moderno:\ngit switch -c feature-cadastro\n\n# Ver em qual branch voce esta\ngit branch\n# * feature-cadastro\n#   feature-login\n#   main',
        filename: 'branches-basico.sh',
        description:
          'Comandos para criar, listar e trocar entre branches. O git switch e o metodo mais moderno, mas git checkout ainda e amplamente usado.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# TRABALHANDO COM BRANCHES\n# ====================================\n\n# Fluxo completo de trabalho com branch\n\n# 1. Criar e trocar para nova branch\ngit switch -c feature-navbar\n\n# 2. Fazer alteracoes e commits\necho "<nav>Menu</nav>" > navbar.html\ngit add navbar.html\ngit commit -m "Adiciona componente de navbar"\n\necho "nav { background: #333; }" > navbar.css\ngit add navbar.css\ngit commit -m "Adiciona estilos da navbar"\n\n# 3. Ver historico da branch\ngit log --oneline\n# f5d6e7a Adiciona estilos da navbar\n# c3b4a5d Adiciona componente de navbar\n# a1b2c3d Commit inicial (da main)\n\n# 4. Voltar para main\ngit switch main\n# Nota: navbar.html e navbar.css NAO existem na main!\n\n# ====================================\n# DELETAR BRANCHES\n# ====================================\n\n# Deletar uma branch ja mergeada (seguro)\ngit branch -d feature-antiga\n\n# Deletar uma branch NAO mergeada (forca a exclusao)\ngit branch -D feature-experimental\n\n# Listar branches com ultimo commit de cada uma\ngit branch -v',
        filename: 'branches-fluxo.sh',
        description:
          'Fluxo completo de trabalho com branches: criar, commitar, voltar para main e deletar branches quando nao forem mais necessarias.',
      },
    },
    {
      type: 'callout',
      content:
        'Sempre faca commit ou stash das suas mudancas antes de trocar de branch! Se voce tiver mudancas nao commitadas no working directory, o Git pode impedir a troca de branch para proteger seu trabalho. Use "git stash" para guardar temporariamente ou faca um commit antes de trocar.',
      calloutType: 'warning',
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
        '## Estrategias de branch\n\nEm projetos reais, equipes seguem convencoes para nomear branches. A estrategia mais comum e **Git Flow**:\n\n- **`main`** — codigo em producao, sempre estavel\n- **`develop`** — integracao das features, base para testes\n- **`feature/nome`** — nova funcionalidade (ex: `feature/login`)\n- **`fix/nome`** — correcao de bug (ex: `fix/botao-quebrado`)\n- **`hotfix/nome`** — correcao urgente em producao\n\nPara projetos pequenos ou pessoais, basta: `main` para producao e branches de `feature/` para cada funcionalidade nova.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'workflow_branches.sh',
        code: `# Fluxo tipico de desenvolvimento com branches

# 1. Criar branch para nova funcionalidade
git checkout -b feature/sistema-de-login
# Equivalente a: git branch feature/sistema-de-login && git checkout feature/sistema-de-login

# 2. Desenvolver e commitar normalmente
git add login.py
git commit -m "feat: adiciona autenticacao com JWT"
git add tests/test_login.py
git commit -m "test: adiciona testes de login"

# 3. Atualizar com as mudancas do main (boa pratica antes de mergear)
git checkout main
git pull origin main
git checkout feature/sistema-de-login
git merge main  # Traz atualizacoes do main para sua branch

# 4. Mergear na main quando a feature estiver pronta
git checkout main
git merge feature/sistema-de-login
git push origin main

# 5. Deletar a branch apos o merge
git branch -d feature/sistema-de-login         # local
git push origin --delete feature/sistema-de-login  # remota

# Ver todas as branches
git branch -a  # -a mostra locais e remotas`,
        description: 'Fluxo: cria branch -> desenvolve -> merge na main -> deleta branch. Sempre atualize com main antes de mergear!',
      },
    },
  ],
  challenges: [
    {
      id: 'git2-c1',
      title: 'Criando e navegando entre branches',
      description:
        'Escreva a sequencia de comandos para: (1) listar as branches existentes, (2) criar uma branch chamada "feature-dark-mode", (3) trocar para ela, (4) criar um arquivo theme.css e commitar, (5) voltar para main e listar as branches.',
      language: 'bash',
      starterCode: '# Passo 1: Listar branches existentes\n\n\n# Passo 2: Criar a branch feature-dark-mode\n\n\n# Passo 3: Trocar para a nova branch\n\n\n# Passo 4: Criar arquivo e commitar\n\n\n# Passo 5: Voltar para main e listar branches\n',
      solution: '# Passo 1: Listar branches existentes\ngit branch\n\n# Passo 2: Criar a branch feature-dark-mode\ngit branch feature-dark-mode\n\n# Passo 3: Trocar para a nova branch\ngit switch feature-dark-mode\n\n# Passo 4: Criar arquivo e commitar\necho "body { background: #1a1a1a; color: #fff; }" > theme.css\ngit add theme.css\ngit commit -m "Adiciona tema dark mode"\n\n# Passo 5: Voltar para main e listar branches\ngit switch main\ngit branch',
      hints: [
        'Use "git branch" para listar e "git branch nome" para criar.',
        'Use "git switch nome" para trocar de branch.',
        'Lembre de adicionar (git add) e commitar (git commit) antes de voltar para main.',
      ],
    },
    {
      id: 'git2-c2',
      title: 'Atalho para criar e trocar de branch',
      description:
        'Escreva comandos que usem o atalho para criar e trocar de branch ao mesmo tempo. Crie "hotfix-bug-123", faca um commit de correcao, volte para main, e delete a branch hotfix apos o trabalho.',
      language: 'bash',
      starterCode: '# Passo 1: Criar e trocar para hotfix-bug-123 (um unico comando)\n\n\n# Passo 2: Fazer a correcao e commitar\n\n\n# Passo 3: Voltar para main\n\n\n# Passo 4: Deletar a branch hotfix (considere que ja foi mergeada)\n',
      solution: '# Passo 1: Criar e trocar para hotfix-bug-123\ngit switch -c hotfix-bug-123\n\n# Passo 2: Fazer a correcao e commitar\necho "fix applied" > bugfix.txt\ngit add bugfix.txt\ngit commit -m "Corrige bug #123: ajusta calculo de preco"\n\n# Passo 3: Voltar para main\ngit switch main\n\n# Passo 4: Deletar a branch hotfix\ngit branch -d hotfix-bug-123',
      hints: [
        'Use "git switch -c nome" ou "git checkout -b nome" para criar e trocar ao mesmo tempo.',
        'Use "git branch -d nome" para deletar uma branch ja mergeada.',
        'A flag -d so deleta branches mergeadas. Use -D para forcar exclusao.',
      ],
    },
  ],
};
