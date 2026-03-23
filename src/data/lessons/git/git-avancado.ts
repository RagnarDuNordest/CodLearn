import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'git-avancado',
  moduleId: 'git',
  title: 'Git Avancado',
  description:
    'Domine tecnicas avancadas: git rebase, git stash, git cherry-pick, git reset, git revert, git tag e boas praticas com conventional commits.',
  order: 5,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        'Agora que voce domina o basico do Git, vamos aprender tecnicas avancadas que os profissionais usam no dia a dia!\n\n## Git Rebase vs Merge\n\nO **rebase** e uma alternativa ao merge para integrar mudancas entre branches. Enquanto o merge cria um commit de merge preservando o historico completo, o rebase **reescreve o historico** movendo seus commits para o topo da branch de destino.\n\nMerge:\n```\nmain:     A --- B --- E --- F (merge commit)\n                 \\         /\nfeature:          C --- D\n```\n\nRebase:\n```\nmain:     A --- B --- E\n                       \\\nfeature:                C\' --- D\'\n```\n\nO rebase cria um historico **linear** e mais limpo. Porem, ele reescreve commits (C e D viram C\' e D\'), o que pode causar problemas se outras pessoas ja estavam trabalhando com os commits originais.\n\n**Regra de ouro**: nunca faca rebase de branches que ja foram compartilhadas com outros (pushed). Use rebase apenas em branches locais que so voce esta usando.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# GIT REBASE\n# ====================================\n\n# Atualizar sua feature branch com as mudancas da main\ngit switch feature-login\ngit rebase main\n# Seus commits sao reaplicados no topo da main\n\n# Se houver conflitos durante o rebase:\n# 1. Resolva o conflito no arquivo\n# 2. Adicione o arquivo resolvido\ngit add arquivo-resolvido.js\n# 3. Continue o rebase\ngit rebase --continue\n\n# Cancelar o rebase se algo der errado\ngit rebase --abort\n\n# ====================================\n# GIT STASH - GUARDAR MUDANCAS TEMPORARIAS\n# ====================================\n\n# Guardar mudancas nao commitadas (salvar para depois)\ngit stash\n# Saida: Saved working directory and index state\n\n# Guardar com uma mensagem descritiva\ngit stash push -m "WIP: formulario de contato"\n\n# Listar stashes salvos\ngit stash list\n# stash@{0}: On main: WIP: formulario de contato\n# stash@{1}: WIP on feature: abc1234 outro trabalho\n\n# Recuperar o ultimo stash (e remove da lista)\ngit stash pop\n\n# Recuperar sem remover da lista\ngit stash apply\n\n# Recuperar um stash especifico\ngit stash apply stash@{1}\n\n# Remover um stash\ngit stash drop stash@{0}\n\n# Limpar todos os stashes\ngit stash clear',
        filename: 'rebase-e-stash.sh',
        description:
          'Rebase reescreve o historico para criar uma linha reta de commits. Stash guarda mudancas temporarias quando voce precisa trocar de contexto.',
      },
    },
    {
      type: 'text',
      content: '## cherry-pick, reset e revert\n\nTres comandos poderosos para manipular o historico de commits:\n\n- **`git cherry-pick <hash>`** — Copia um commit especifico de outra branch e aplica na branch atual\n- **`git reset --soft HEAD~1`** — Desfaz o ultimo commit mas mantém as mudancas na staging area\n- **`git reset --hard HEAD~1`** — Desfaz o commit E descarta as mudancas permanentemente. Use com cuidado!\n- **`git revert <hash>`** — Cria um novo commit que desfaz as mudancas de um commit anterior sem reescrever o historico. E seguro para branches ja compartilhadas\n- **`HEAD~1`** — Referencia ao commit imediatamente anterior ao atual (`HEAD~3` volta 3 commits)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# GIT CHERRY-PICK\n# ====================================\n\n# Aplicar um commit especifico de outra branch na branch atual\n# Util quando voce quer apenas UM commit, nao a branch inteira\n\n# Encontrar o hash do commit desejado\ngit log --oneline feature-login\n# a1b2c3d Adiciona validacao de email\n# e4f5g6h Cria formulario de login\n# i7j8k9l Adiciona pagina de login\n\n# Aplicar apenas o commit de validacao na main\ngit switch main\ngit cherry-pick a1b2c3d\n# Saida: [main xyz1234] Adiciona validacao de email\n\n# ====================================\n# GIT RESET - DESFAZER COMMITS\n# ====================================\n\n# --soft: desfaz o commit, mantem mudancas na staging area\ngit reset --soft HEAD~1\n# O commit sumiu, mas as mudancas estao prontas para commitar novamente\n\n# --mixed (padrao): desfaz o commit, mantem mudancas no working directory\ngit reset HEAD~1\n# O commit sumiu e as mudancas voltaram para "modificadas"\n\n# --hard: desfaz TUDO (commit + mudancas) -- CUIDADO!\ngit reset --hard HEAD~1\n# O commit E as mudancas foram perdidos!\n\n# Voltar 3 commits\ngit reset --soft HEAD~3\n\n# ====================================\n# GIT REVERT - DESFAZER DE FORMA SEGURA\n# ====================================\n\n# Criar um NOVO commit que desfaz as mudancas de um commit anterior\n# Nao reescreve o historico -- seguro para branches compartilhadas\ngit revert a1b2c3d\n# Cria: "Revert: Adiciona validacao de email"',
        filename: 'cherry-pick-reset-revert.sh',
        description:
          'Cherry-pick copia commits especificos, reset desfaz commits (com diferentes niveis), e revert cria um commit que desfaz outro de forma segura.',
      },
    },
    {
      type: 'text',
      content: '## Tags e Conventional Commits\n\n**Tags** sao marcadores que apontam para commits especificos, muito usados para marcar versoes de software (ex: `v1.0.0`, `v2.3.1`).\n\n- **`git tag -a v1.0.0 -m "mensagem"`** — Cria uma tag anotada (recomendada) com metadados\n- **`git push origin --tags`** — Envia todas as tags para o repositorio remoto\n\n**Conventional Commits** e um padrao de mensagens com o formato `tipo(escopo): descricao`. Os tipos mais usados sao `feat` (nova funcionalidade), `fix` (correcao de bug), `docs`, `refactor` e `test`. Esse padrao facilita gerar changelogs automaticamente e entender o historico do projeto.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# GIT TAG - MARCAR VERSOES\n# ====================================\n\n# Tags sao usadas para marcar pontos importantes (versoes/releases)\n\n# Criar tag simples (lightweight)\ngit tag v1.0.0\n\n# Criar tag anotada (recomendado -- tem mensagem e metadados)\ngit tag -a v1.0.0 -m "Primeira versao estavel"\n\n# Listar tags\ngit tag\n# v0.1.0\n# v0.2.0\n# v1.0.0\n\n# Ver detalhes de uma tag\ngit show v1.0.0\n\n# Criar tag em um commit especifico\ngit tag -a v0.9.0 -m "Beta release" a1b2c3d\n\n# Enviar tags para o remoto\ngit push origin v1.0.0        # uma tag especifica\ngit push origin --tags        # todas as tags\n\n# ====================================\n# CONVENTIONAL COMMITS\n# ====================================\n\n# Padrao para mensagens de commit organizadas:\n# tipo(escopo): descricao\n\n# Tipos mais comuns:\n# feat:     nova funcionalidade\n# fix:      correcao de bug\n# docs:     alteracao em documentacao\n# style:    formatacao (sem mudanca de logica)\n# refactor: refatoracao de codigo\n# test:     adicao/correcao de testes\n# chore:    tarefas de manutencao\n\n# Exemplos:\ngit commit -m "feat(auth): adiciona login com Google"\ngit commit -m "fix(cart): corrige calculo de frete para SP"\ngit commit -m "docs: atualiza README com instrucoes de deploy"\ngit commit -m "refactor(api): simplifica middleware de autenticacao"\ngit commit -m "test(user): adiciona testes para cadastro"',
        filename: 'tags-e-convencoes.sh',
        description:
          'Tags marcam versoes importantes do projeto. Conventional Commits padronizam mensagens para manter um historico claro e gerar changelogs automaticamente.',
      },
    },
    {
      type: 'callout',
      content:
        'Cuidado com git reset --hard! Ele apaga mudancas permanentemente. Prefira git revert quando as mudancas ja foram enviadas (pushed) para o remoto, pois o revert nao reescreve o historico. O reset e seguro para desfazer commits que existem apenas no seu computador.',
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
        '## Git Bisect — Encontrando o Bug com Busca Binaria\n\nO **`git bisect`** e uma ferramenta poderosa que usa busca binaria para encontrar exatamente qual commit introduziu um bug. Em vez de checar commit por commit, ele vai pela metade do historico, reduzindo muito o tempo de investigacao.\n\n1. `git bisect start` — Inicia o processo\n2. `git bisect bad` — Marca o commit atual como "ruim" (tem o bug)\n3. `git bisect good <hash>` — Marca um commit antigo como "bom" (sem o bug)\n4. O Git vai para um commit no meio e voce testa\n5. Repita `git bisect good` ou `git bisect bad` ate encontrar o culpado\n6. `git bisect reset` — Volta ao estado original',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'bisect-log.sh',
        code: '# ====================================\n# GIT BISECT - ENCONTRAR O COMMIT DO BUG\n# ====================================\n\n# Iniciar investigacao\ngit bisect start\n\n# Marcar estado atual como ruim (tem o bug)\ngit bisect bad\n\n# Marcar um commit antigo que estava funcionando\ngit bisect good v1.0.0      # usando uma tag\ngit bisect good a1b2c3d     # ou usando um hash\n\n# O Git vai para o meio do historico automaticamente\n# Teste o programa e informe o resultado:\ngit bisect good   # se esta funcionando aqui\ngit bisect bad    # se o bug ja existe aqui\n\n# Repita ate o Git mostrar o commit culpado:\n# "a1b2c3d is the first bad commit"\n\n# Voltar ao estado original\ngit bisect reset\n\n# ====================================\n# GIT LOG AVANCADO - VISUALIZANDO HISTORICO\n# ====================================\n\n# Historico em uma linha com grafico\ngit log --oneline --graph --all\n\n# Ver commits de um autor especifico\ngit log --author="Raphael"\n\n# Ver commits de uma data especifica\ngit log --since="2024-01-01" --until="2024-12-31"\n\n# Ver quais arquivos foram alterados em cada commit\ngit log --stat\n\n# Buscar commits pela mensagem\ngit log --grep="feat:"\n\n# Ver mudancas de uma linha especifica de um arquivo\ngit log -L 10,20:src/app.js',
        description:
          'git bisect para cacar bugs, git log avancado para explorar o historico de forma poderosa.',
      },
    },
    {
      type: 'callout',
      content:
        'O comando `git log --oneline --graph --all` e um dos mais uteis do dia a dia! Ele mostra o historico de todas as branches em formato de arvore, facilitando visualizar merges e divergencias. Muitos devs criam um alias: `git config --global alias.lg "log --oneline --graph --all"` para chamar com apenas `git lg`.',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'git6-c1',
      title: 'Usando stash para trocar de contexto',
      description:
        'Voce esta trabalhando em uma feature mas precisa corrigir um bug urgente na main. Escreva os comandos para: (1) guardar suas mudancas atuais no stash com uma mensagem, (2) trocar para main, (3) criar branch hotfix, fazer commit da correcao, (4) voltar para sua branch de feature, (5) recuperar as mudancas do stash.',
      language: 'bash',
      starterCode: '# Passo 1: Guardar mudancas no stash\n\n\n# Passo 2: Trocar para main\n\n\n# Passo 3: Criar hotfix, corrigir e commitar\n\n\n# Passo 4: Voltar para a branch de feature\n\n\n# Passo 5: Recuperar mudancas do stash\n',
      solution: '# Passo 1: Guardar mudancas no stash\ngit stash push -m "WIP: feature de notificacoes"\n\n# Passo 2: Trocar para main\ngit switch main\n\n# Passo 3: Criar hotfix, corrigir e commitar\ngit switch -c hotfix-bug-critico\necho "fix applied" > bugfix.js\ngit add bugfix.js\ngit commit -m "fix(core): corrige erro critico no processamento"\n\n# Passo 4: Voltar para a branch de feature\ngit switch feature-notificacoes\n\n# Passo 5: Recuperar mudancas do stash\ngit stash pop',
      hints: [
        'Use "git stash push -m mensagem" para salvar com descricao.',
        'O stash funciona como uma pilha: o ultimo salvo e o primeiro a sair.',
        'Use "git stash pop" para recuperar e remover, ou "git stash apply" para recuperar sem remover.',
      ],
    },
    {
      id: 'git6-c2',
      title: 'Desfazendo commits com reset e revert',
      description:
        'Escreva os comandos para: (1) desfazer o ultimo commit mantendo as mudancas na staging (soft reset), (2) em outro cenario, desfazer um commit que ja foi enviado para o remoto usando revert, (3) criar uma tag v2.0.0 anotada no commit atual.',
      language: 'bash',
      starterCode: '# Cenario 1: Desfazer ultimo commit (ainda nao foi pushed)\n# Manter mudancas na staging area\n\n\n# Cenario 2: Desfazer um commit ja pushado (hash: abc1234)\n# Usar metodo seguro que nao reescreve historico\n\n\n# Cenario 3: Criar tag de versao\n',
      solution: '# Cenario 1: Desfazer ultimo commit (soft reset)\ngit reset --soft HEAD~1\n\n# Cenario 2: Desfazer commit ja pushado (revert)\ngit revert abc1234\n\n# Cenario 3: Criar tag de versao\ngit tag -a v2.0.0 -m "Versao 2.0.0 - redesign completo"',
      hints: [
        'O --soft mantem suas mudancas na staging area, pronto para um novo commit.',
        'O git revert e seguro para branches compartilhadas pois cria um novo commit.',
        'Use "git tag -a" para criar tags anotadas com mensagem.',
      ],
    },
    {
      id: 'git6-c3',
      title: 'Conventional Commits na pratica',
      description:
        'Escreva 5 comandos git commit com mensagens seguindo o padrao Conventional Commits para: (1) nova funcionalidade de busca, (2) correcao de bug no carrinho, (3) atualizacao do README, (4) refatoracao do servico de email, (5) adicao de testes unitarios.',
      language: 'bash',
      starterCode: '# 1. Nova funcionalidade de busca\n\n\n# 2. Correcao de bug no carrinho\n\n\n# 3. Atualizacao do README\n\n\n# 4. Refatoracao do servico de email\n\n\n# 5. Adicao de testes unitarios\n',
      solution: '# 1. Nova funcionalidade de busca\ngit commit -m "feat(search): adiciona busca por filtros avancados"\n\n# 2. Correcao de bug no carrinho\ngit commit -m "fix(cart): corrige total quando cupom e aplicado"\n\n# 3. Atualizacao do README\ngit commit -m "docs: atualiza README com guia de contribuicao"\n\n# 4. Refatoracao do servico de email\ngit commit -m "refactor(email): simplifica template de notificacao"\n\n# 5. Adicao de testes unitarios\ngit commit -m "test(auth): adiciona testes para fluxo de cadastro"',
      hints: [
        'O formato e: tipo(escopo): descricao. O escopo e opcional.',
        'Use feat para funcionalidades novas e fix para correcoes.',
        'docs, refactor, test, style e chore sao outros tipos comuns.',
      ],
    },
  ],
};
