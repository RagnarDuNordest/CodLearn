import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'fundamentos-do-git',
  moduleId: 'git',
  title: 'Fundamentos do Git',
  description:
    'Entenda o que e Git, como funciona o controle de versao, e aprenda os comandos essenciais: git init, git add, git commit, git status, git log e .gitignore.',
  order: 0,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine salvar versoes de um trabalho como \"trabalho-v1\", \"trabalho-v2-final\", \"trabalho-AGORA-VAI\". O Git faz isso de forma organizada e profissional!\n\n## O que e Git e Controle de Versao?\n\nO **Git** e o sistema de controle de versao mais utilizado no mundo, criado em 2005 por Linus Torvalds para gerenciar o desenvolvimento do kernel Linux. Mas o que exatamente e controle de versao?\n\nImagine que voce esta escrevendo um projeto e salva como "projeto_v1", "projeto_v2", "projeto_final", "projeto_final_de_verdade"... O controle de versao resolve esse caos. Ele registra **cada mudanca** feita nos seus arquivos ao longo do tempo, permitindo:\n\n- **Voltar a qualquer versao anterior** do codigo\n- **Saber exatamente o que mudou**, quando e por quem\n- **Trabalhar em equipe** sem sobrescrever o trabalho dos outros\n- **Experimentar sem medo**, criando versoes paralelas do projeto\n\nO Git e um sistema **distribuido**, ou seja, cada desenvolvedor tem uma copia completa do historico do projeto no seu computador. Isso torna o Git extremamente rapido e confiavel.',
    },
    {
      type: 'text',
      content:
        '## As Tres Areas do Git\n\nPara entender o Git, voce precisa conhecer as tres areas principais onde seus arquivos vivem:\n\n1. **Working Directory (Diretorio de Trabalho)**: e a pasta do seu projeto no computador. Aqui voce edita, cria e deleta arquivos normalmente. O Git observa essas mudancas mas ainda nao as registrou.\n\n2. **Staging Area (Area de Preparacao)**: e uma area intermediaria onde voce seleciona quais mudancas vao entrar no proximo "ponto de salvamento". Funciona como uma bandeja onde voce coloca os itens antes de guardar na estante.\n\n3. **Repository (Repositorio)**: e o banco de dados do Git (pasta oculta `.git`) onde ficam todos os commits -- os pontos de salvamento permanentes do seu projeto.\n\nO fluxo basico e:\n```\nWorking Directory  -->  Staging Area  -->  Repository\n   (git add)              (git commit)\n```\n\nVoce edita arquivos no Working Directory, usa `git add` para mover para a Staging Area, e `git commit` para salvar permanentemente no Repository.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# INICIANDO UM REPOSITORIO GIT\n# ====================================\n\n# Criar uma pasta para o projeto\nmkdir meu-projeto\ncd meu-projeto\n\n# Inicializar o repositorio Git\ngit init\n# Saida: Initialized empty Git repository in /home/user/meu-projeto/.git/\n\n# Verificar o estado atual\ngit status\n# Saida: On branch main\n#        No commits yet\n#        nothing to commit\n\n# ====================================\n# PRIMEIRO COMMIT\n# ====================================\n\n# Criar um arquivo\necho "# Meu Projeto" > README.md\n\n# Ver o estado -- arquivo aparece como "untracked"\ngit status\n# Saida: Untracked files: README.md\n\n# Adicionar a staging area\ngit add README.md\n\n# Ver o estado -- arquivo agora esta na staging area\ngit status\n# Saida: Changes to be committed: new file: README.md\n\n# Criar o commit\ngit commit -m "Primeiro commit: adiciona README"\n# Saida: [main (root-commit) a1b2c3d] Primeiro commit: adiciona README',
        filename: 'fundamentos.sh',
        description:
          'O fluxo basico do Git: inicializar repositorio, adicionar arquivos a staging area e criar o primeiro commit.',
      },
    },
    {
      type: 'text',
      content: 'Com o repositorio iniciado, estes sao os comandos que voce usara no dia a dia:\n\n- **`git add`** — Move arquivos do working directory para a staging area. Use `.` para adicionar tudo\n- **`git commit -m "mensagem"`** — Cria um ponto de salvamento permanente com uma descricao\n- **`git status`** — Mostra quais arquivos foram modificados, adicionados ou removidos\n- **`git log`** — Exibe o historico de commits. A flag `--oneline` mostra um resumo compacto\n- **`git diff`** — Mostra as diferencas entre o que foi modificado e o ultimo commit',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# COMANDOS ESSENCIAIS DO DIA A DIA\n# ====================================\n\n# git add -- adicionar arquivos a staging area\ngit add arquivo.txt          # adiciona um arquivo especifico\ngit add pasta/               # adiciona todos os arquivos de uma pasta\ngit add .                    # adiciona todos os arquivos modificados\ngit add -A                   # adiciona tudo (novos, modificados e deletados)\n\n# git commit -- salvar as mudancas\ngit commit -m "Mensagem descrevendo a mudanca"\n\n# git status -- ver o estado atual\ngit status                   # versao completa\ngit status -s                # versao curta (resumida)\n\n# git log -- ver o historico de commits\ngit log                      # historico completo\ngit log --oneline            # uma linha por commit\ngit log --oneline -5         # ultimos 5 commits\ngit log --graph              # mostra grafico das branches\n\n# git diff -- ver mudancas feitas\ngit diff                     # mudancas no working directory\ngit diff --staged            # mudancas na staging area',
        filename: 'comandos-essenciais.sh',
        description:
          'Os comandos git add, git commit, git status, git log e git diff sao usados constantemente no fluxo de trabalho com Git.',
      },
    },
    {
      type: 'text',
      content: '## O arquivo .gitignore\n\nNem todos os arquivos do projeto devem ser rastreados pelo Git. O arquivo **`.gitignore`** lista os arquivos e pastas que o Git deve **ignorar completamente**.\n\nArquivos tipicamente ignorados incluem: dependencias instaladas (`node_modules/`, `venv/`), arquivos de credenciais (`.env`, `*.key`), arquivos de build (`dist/`, `*.exe`) e arquivos gerados pelo sistema operacional. Use curingas: `*` casa com qualquer sequencia de caracteres (ex: `*.log`) e `!` nega uma regra de exclusao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# ARQUIVO .gitignore\n# ====================================\n\n# O .gitignore diz ao Git quais arquivos/pastas IGNORAR\n# Crie um arquivo chamado .gitignore na raiz do projeto\n\n# Exemplo de .gitignore:\n\n# Arquivos de ambiente e segredos\n.env\n.env.local\n*.key\n\n# Dependencias (sao reinstaladas com npm install ou pip install)\nnode_modules/\nvenv/\n__pycache__/\n\n# Arquivos de build/compilacao\ndist/\nbuild/\n*.o\n*.exe\n\n# Arquivos de sistema operacional\n.DS_Store\nThumbs.db\n\n# Arquivos de IDEs e editores\n.vscode/\n.idea/\n*.swp\n\n# Logs\n*.log\nlogs/\n\n# ====================================\n# DICA: Use curingas (wildcards)\n# ====================================\n# *       = qualquer sequencia de caracteres\n# ?       = um unico caractere\n# **      = qualquer diretorio/subdiretorio\n# !       = negar (nao ignorar)\n# Exemplo: *.log ignora todos os arquivos .log',
        filename: '.gitignore',
        description:
          'O .gitignore e essencial para manter seu repositorio limpo, evitando que arquivos desnecessarios ou sensiveis sejam rastreados pelo Git.',
      },
    },
    {
      type: 'callout',
      content:
        'Nunca faca commit de senhas, chaves de API ou arquivos .env! Sempre adicione esses arquivos ao .gitignore antes do primeiro commit. Se um segredo ja foi commitado, ele fica no historico do Git e pode ser acessado mesmo depois de removido.',
      calloutType: 'warning',
    },
    {
      type: 'callout',
      content:
        'Git parece complicado no inicio, mas depois que voce pega o jeito, nao consegue mais viver sem!',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'git1-c1',
      title: 'Primeiro fluxo completo com Git',
      description:
        'Escreva a sequencia de comandos para: (1) inicializar um repositorio Git, (2) criar um arquivo index.html com conteudo, (3) verificar o status, (4) adicionar o arquivo a staging area, (5) fazer o commit com mensagem "Cria pagina inicial", (6) ver o historico.',
      language: 'bash',
      starterCode: '# Passo 1: Inicializar o repositorio\n\n\n# Passo 2: Criar um arquivo (use echo)\n\n\n# Passo 3: Verificar o status\n\n\n# Passo 4: Adicionar a staging area\n\n\n# Passo 5: Fazer o commit\n\n\n# Passo 6: Ver o historico de commits\n',
      solution: '# Passo 1: Inicializar o repositorio\ngit init\n\n# Passo 2: Criar um arquivo\necho "<h1>Bem-vindo</h1>" > index.html\n\n# Passo 3: Verificar o status\ngit status\n\n# Passo 4: Adicionar a staging area\ngit add index.html\n\n# Passo 5: Fazer o commit\ngit commit -m "Cria pagina inicial"\n\n# Passo 6: Ver o historico de commits\ngit log --oneline',
      hints: [
        'Use "git init" para inicializar o repositorio na pasta atual.',
        'Use "echo conteudo > arquivo" para criar um arquivo com conteudo.',
        'O git add move arquivos do working directory para a staging area.',
      ],
    },
    {
      id: 'git1-c2',
      title: 'Criando um .gitignore completo',
      description:
        'Escreva comandos para criar um arquivo .gitignore que ignore: arquivos .env, a pasta node_modules/, arquivos .log e a pasta dist/. Depois adicione e faca commit do .gitignore.',
      language: 'bash',
      starterCode: '# Crie o arquivo .gitignore com as regras de exclusao\n# Use echo e >> para adicionar linhas ao arquivo\n\n\n# Adicione o .gitignore a staging area e faca commit\n',
      solution: '# Criar o .gitignore com as regras\necho ".env" > .gitignore\necho "node_modules/" >> .gitignore\necho "*.log" >> .gitignore\necho "dist/" >> .gitignore\n\n# Adicionar e commitar\ngit add .gitignore\ngit commit -m "Adiciona .gitignore com regras de exclusao"',
      hints: [
        'Use "echo texto > arquivo" para criar o arquivo e "echo texto >> arquivo" para adicionar linhas.',
        'Pastas no .gitignore terminam com / (ex: node_modules/).',
        'Use * como curinga para ignorar por extensao (ex: *.log).',
      ],
    },
    {
      id: 'git1-c3',
      title: 'Investigando o estado do repositorio',
      description:
        'Voce tem um repositorio com mudancas em 3 arquivos: app.js (modificado), style.css (modificado) e test.js (novo). Escreva comandos para: (1) ver o status, (2) ver as diferencas em app.js, (3) adicionar apenas app.js e style.css a staging, (4) fazer commit somente desses dois, (5) verificar que test.js continua fora do commit.',
      language: 'bash',
      starterCode: '# Passo 1: Ver o status geral\n\n\n# Passo 2: Ver as diferencas no app.js\n\n\n# Passo 3: Adicionar apenas app.js e style.css\n\n\n# Passo 4: Fazer commit dos dois arquivos\n\n\n# Passo 5: Verificar que test.js ainda aparece como untracked\n',
      solution: '# Passo 1: Ver o status geral\ngit status\n\n# Passo 2: Ver as diferencas no app.js\ngit diff app.js\n\n# Passo 3: Adicionar apenas app.js e style.css\ngit add app.js style.css\n\n# Passo 4: Fazer commit dos dois arquivos\ngit commit -m "Atualiza app.js e style.css"\n\n# Passo 5: Verificar que test.js ainda aparece como untracked\ngit status',
      hints: [
        'Use "git diff nome-do-arquivo" para ver mudancas em um arquivo especifico.',
        'Voce pode passar varios arquivos para git add separados por espaco.',
        'Apos o commit, git status mostrara que test.js ainda nao foi adicionado.',
      ],
    },
  ],
};
