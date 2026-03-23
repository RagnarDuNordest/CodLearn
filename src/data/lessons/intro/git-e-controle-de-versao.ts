import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'git-e-controle-de-versao',
  moduleId: 'intro',
  title: 'Git e Controle de Versao',
  description:
    'Aprenda o que e controle de versao, como usar o Git para rastrear mudancas no seu codigo, trabalhar com branches, e como usar o GitHub para colaborar com outros programadores.',
  order: 4,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine salvar versoes de um trabalho para poder voltar atras se algo der errado. Controle de versao faz isso com seu codigo!\n\n## O que e controle de versao?\n\nImagine que voce esta escrevendo um trabalho importante no computador. Voce salva o arquivo como "trabalho_final.doc". Depois faz alteracoes e salva como "trabalho_final_v2.doc". Mais mudancas: "trabalho_final_v3_corrigido.doc", "trabalho_FINAL_DEFINITIVO.doc"... Ja passou por isso?\n\nO **controle de versao** resolve esse problema de forma elegante. E um sistema que registra todas as mudancas feitas em arquivos ao longo do tempo, permitindo que voce:\n\n- **Volte no tempo**: recupere qualquer versao anterior do seu codigo\n- **Saiba o que mudou**: veja exatamente quais linhas foram alteradas, quando e por quem\n- **Trabalhe em equipe**: varias pessoas podem modificar os mesmos arquivos sem conflitos\n- **Experimente sem medo**: crie versoes experimentais sem risco de perder o codigo que funciona\n\nPara programadores, controle de versao nao e opcional — e uma ferramenta essencial usada em praticamente todo projeto de software profissional.',
    },
    {
      type: 'text',
      content:
        '## O que e o Git?\n\nO **Git** e o sistema de controle de versao mais usado no mundo. Ele foi criado em 2005 por Linus Torvalds (o mesmo criador do Linux) porque ele precisava de uma ferramenta rapida e confiavel para gerenciar o codigo do Linux, que tinha milhares de colaboradores.\n\nO Git funciona como uma **maquina do tempo para o seu codigo**. Cada vez que voce salva uma versao (chamamos isso de "commit"), o Git tira uma "foto" do estado atual de todos os seus arquivos. Voce pode navegar entre essas fotos a qualquer momento.\n\nConceitos fundamentais do Git:\n\n- **Repositorio (repo)**: e a pasta do seu projeto que esta sendo rastreada pelo Git. Contem todo o historico de mudancas.\n- **Commit**: e um "ponto de salvamento" — uma foto do estado dos seus arquivos em um momento especifico, acompanhada de uma mensagem descrevendo o que mudou.\n- **Staging area (area de preparacao)**: e uma area intermediaria onde voce escolhe quais mudancas vao entrar no proximo commit.\n- **Branch (ramo)**: e uma linha independente de desenvolvimento, permitindo trabalhar em funcionalidades separadas sem interferir no codigo principal.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ====================================\n# COMANDOS BASICOS DO GIT\n# ====================================\n\n# 1. Iniciar um repositorio Git em uma pasta\n# $ git init\n# Isso cria uma pasta oculta .git que guarda todo o historico\n\n# 2. Verificar o estado atual dos arquivos\n# $ git status\n# Mostra quais arquivos foram modificados, adicionados ou removidos\n\n# 3. Adicionar arquivos a area de preparacao (staging)\n# $ git add nome_do_arquivo.py\n# $ git add .                    (adiciona todos os arquivos modificados)\n\n# 4. Criar um commit (salvar a versao atual)\n# $ git commit -m "Mensagem descrevendo o que foi feito"\n\n# 5. Ver o historico de commits\n# $ git log\n# $ git log --oneline            (versao resumida, uma linha por commit)\n\n# ====================================\n# EXEMPLO DE FLUXO COMPLETO:\n# ====================================\n# $ git init\n# $ git add meu_programa.py\n# $ git commit -m "Primeiro commit: programa inicial"\n# (faz alteracoes no arquivo...)\n# $ git add meu_programa.py\n# $ git commit -m "Adiciona funcao de calculo de media"',
        filename: 'comandos_git_basicos.py',
        description:
          'Os comandos basicos do Git seguem um fluxo simples: git init para criar o repositorio, git add para preparar arquivos, git commit para salvar a versao, e git log para ver o historico. Esses comandos sao executados no terminal (linha de comando).',
      },
    },
    {
      type: 'callout',
      content:
        'A mensagem de commit e muito importante! Ela deve descrever de forma clara o que foi alterado. Boas mensagens: "Corrige bug no calculo de desconto", "Adiciona pagina de login". Mensagens ruins: "alteracoes", "fix", "aaa". Boas mensagens facilitam entender o historico do projeto.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Branches: trabalhando em paralelo\n\nUma **branch** (ramo) e uma copia independente do seu codigo onde voce pode fazer mudancas sem afetar a versao principal. Pense em branches como linhas do tempo alternativas do seu projeto.\n\nPor padrao, todo repositorio Git comeca com uma branch chamada **main** (ou master). Quando voce quer adicionar uma funcionalidade nova ou corrigir um bug, voce cria uma nova branch, trabalha nela, e depois junta (merge) as mudancas de volta na main.\n\n```\n        main:     A --- B --- C --------- F (merge)\n                               \\         /\n        feature:                D --- E\n```\n\nNeste diagrama:\n- **A, B, C** sao commits na branch main\n- No ponto C, criamos uma branch "feature"\n- **D, E** sao commits feitos na branch feature (sem afetar a main)\n- **F** e o merge: as mudancas da feature foram incorporadas na main\n\nIsso permite que voce trabalhe em coisas novas sem risco de quebrar o que ja funciona!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ====================================\n# COMANDOS DE BRANCHES NO GIT\n# ====================================\n\n# 1. Criar uma nova branch\n# $ git branch nome-da-branch\n\n# 2. Mudar para outra branch\n# $ git checkout nome-da-branch\n# Ou o comando mais moderno:\n# $ git switch nome-da-branch\n\n# 3. Criar e ja mudar para a nova branch (atalho)\n# $ git checkout -b nome-da-branch\n\n# 4. Listar todas as branches\n# $ git branch\n# O asterisco (*) indica a branch atual\n\n# 5. Juntar (merge) uma branch na branch atual\n# $ git checkout main\n# $ git merge nome-da-branch\n\n# ====================================\n# EXEMPLO DE FLUXO COM BRANCHES:\n# ====================================\n# $ git checkout -b feature-login\n# (faz alteracoes nos arquivos...)\n# $ git add .\n# $ git commit -m "Adiciona formulario de login"\n# (faz mais alteracoes...)\n# $ git add .\n# $ git commit -m "Adiciona validacao de senha"\n# $ git checkout main\n# $ git merge feature-login\n# Pronto! As mudancas da feature-login agora estao na main.',
        filename: 'comandos_git_branches.py',
        description:
          'Branches permitem trabalhar em funcionalidades separadas sem afetar o codigo principal. O fluxo tipico e: criar branch, fazer commits, voltar para main e fazer merge.',
      },
    },
    {
      type: 'text',
      content: '## GitHub: colaborando na nuvem\n\nO **GitHub** e uma plataforma online que hospeda repositorios Git e adiciona ferramentas de colaboracao. Com ele, voce pode guardar seu codigo na nuvem, compartilhar com outras pessoas e contribuir para projetos de codigo aberto.\n\nOs principais comandos para trabalhar com repositorios remotos sao:\n\n- **`git remote add origin URL`** — Conecta seu repositorio local a um repositorio remoto (o apelido "origin" e a convencao para o repositorio principal)\n- **`git push origin branch`** — Envia seus commits locais para o repositorio remoto\n- **`git pull origin branch`** — Baixa e aplica as mudancas mais recentes do repositorio remoto\n- **`git clone URL`** — Baixa uma copia completa de um repositorio remoto, incluindo todo o historico',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ====================================\n# GITHUB: REPOSITORIOS REMOTOS\n# ====================================\n\n# O GitHub e uma plataforma online que hospeda repositorios Git.\n# Ele permite que voce guarde seu codigo na nuvem e colabore\n# com outros programadores.\n\n# 1. Conectar seu repositorio local a um repositorio no GitHub\n# $ git remote add origin https://github.com/seu-usuario/seu-repo.git\n\n# 2. Enviar seus commits para o GitHub\n# $ git push origin main\n# (envia a branch main para o repositorio remoto)\n\n# 3. Baixar mudancas do GitHub para seu computador\n# $ git pull origin main\n# (baixa e aplica as mudancas mais recentes)\n\n# 4. Clonar um repositorio existente do GitHub\n# $ git clone https://github.com/usuario/repositorio.git\n# (baixa uma copia completa do repositorio com todo o historico)\n\n# ====================================\n# FLUXO TIPICO COM GITHUB:\n# ====================================\n# $ git clone https://github.com/equipe/projeto.git\n# $ cd projeto\n# $ git checkout -b minha-feature\n# (faz alteracoes...)\n# $ git add .\n# $ git commit -m "Implementa nova funcionalidade"\n# $ git push origin minha-feature\n# (depois, no GitHub, cria um Pull Request para revisar o codigo)',
        filename: 'comandos_github.py',
        description:
          'O GitHub e a plataforma mais popular para hospedar repositorios Git. Os comandos remote, push, pull e clone permitem sincronizar seu codigo local com a nuvem e colaborar com outros desenvolvedores.',
      },
    },
    {
      type: 'callout',
      content:
        'Git e GitHub sao coisas diferentes! O **Git** e a ferramenta de controle de versao que roda no seu computador. O **GitHub** e um servico online que hospeda repositorios Git na nuvem. Existem outras plataformas similares ao GitHub, como GitLab e Bitbucket, mas todas usam o Git por baixo.',
      calloutType: 'warning',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa entender tudo de uma vez! Esses conceitos ficam mais claros conforme voce avanca.',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'gcv-c1',
      title: 'Inicializando um repositorio e fazendo o primeiro commit',
      description:
        'Escreva, em ordem, a sequencia de comandos Git necessarios para: criar um novo repositorio, adicionar um arquivo chamado "app.py" a area de preparacao, e fazer o primeiro commit com a mensagem "Primeiro commit: estrutura inicial do projeto". Use comentarios em Python para escrever cada comando.',
      language: 'python',
      starterCode: '# Escreva os comandos Git na ordem correta.\n# Use print() para exibir cada comando que seria executado no terminal.\n\n# Passo 1: Inicializar o repositorio Git\nprint("Comando 1:")\n\n# Passo 2: Adicionar o arquivo app.py a area de preparacao\nprint("Comando 2:")\n\n# Passo 3: Fazer o primeiro commit com a mensagem adequada\nprint("Comando 3:")\n\n# Passo 4: Verificar o historico de commits\nprint("Comando 4:")\n',
      solution:
        'print("Comando 1: git init")\nprint("Comando 2: git add app.py")\nprint("Comando 3: git commit -m \\"Primeiro commit: estrutura inicial do projeto\\"")\nprint("Comando 4: git log")',
      hints: [
        'Para criar um repositorio Git, usamos "git init" dentro da pasta do projeto.',
        'Para adicionar um arquivo especifico a staging area, usamos "git add nome_do_arquivo".',
        'Para criar um commit, usamos git commit -m seguido da mensagem entre aspas.',
      ],
    },
    {
      id: 'gcv-c2',
      title: 'Trabalhando com branches',
      description:
        'Escreva a sequencia de comandos Git para: criar uma nova branch chamada "feature-cadastro", mudar para ela, fazer um commit, voltar para a branch main e fazer o merge da feature-cadastro na main. Exiba cada comando usando print().',
      language: 'python',
      starterCode: '# Simule o fluxo de trabalho com branches.\n# Use print() para exibir cada comando Git.\n\n# Passo 1: Criar uma nova branch chamada "feature-cadastro"\nprint("Comando 1:")\n\n# Passo 2: Mudar para a nova branch\nprint("Comando 2:")\n\n# Passo 3: (Imagine que voce fez alteracoes) Adicionar e commitar\nprint("Comando 3:")\nprint("Comando 4:")\n\n# Passo 5: Voltar para a branch main\nprint("Comando 5:")\n\n# Passo 6: Fazer merge da feature-cadastro na main\nprint("Comando 6:")\n',
      solution:
        'print("Comando 1: git branch feature-cadastro")\nprint("Comando 2: git checkout feature-cadastro")\nprint("Comando 3: git add .")\nprint("Comando 4: git commit -m \\"Implementa sistema de cadastro\\"")\nprint("Comando 5: git checkout main")\nprint("Comando 6: git merge feature-cadastro")',
      hints: [
        'Para criar uma branch, use "git branch nome". Para mudar para ela, use "git checkout nome".',
        'Um atalho para criar e ja mudar e "git checkout -b nome", mas aqui pedimos os dois passos separados.',
        'Para fazer merge, primeiro va para a branch de destino (main) e depois use "git merge nome-da-branch".',
      ],
    },
    {
      id: 'gcv-c3',
      title: 'Simulando resolucao de conflito de merge',
      description:
        'Quando duas branches alteram a mesma parte de um arquivo, ocorre um conflito de merge. O Git marca o arquivo com indicadores especiais. Crie um programa que simula como ficaria um arquivo com conflito e mostra a versao resolvida. O programa deve exibir: (1) como o conflito aparece no arquivo, (2) a versao resolvida escolhendo uma das opcoes.',
      language: 'python',
      starterCode: '# Simulacao de conflito de merge no Git\n\n# O Git marca conflitos assim:\n# <<<<<<< HEAD\n# (codigo da sua branch atual)\n# =======\n# (codigo da branch que voce esta fazendo merge)\n# >>>>>>> nome-da-branch\n\n# Parte 1: Exiba como um conflito aparece no arquivo\nprint("=== ARQUIVO COM CONFLITO ===")\nprint("def calcular_desconto(preco):")\n# Exiba as linhas de conflito aqui\n\n\n# Parte 2: Exiba a versao resolvida (escolha a versao da feature)\nprint("\\n=== ARQUIVO RESOLVIDO ===")\nprint("def calcular_desconto(preco):")\n# Exiba a versao final sem os marcadores de conflito\n',
      solution:
        'print("=== ARQUIVO COM CONFLITO ===")\nprint("def calcular_desconto(preco):")\nprint("<<<<<<< HEAD")\nprint("    return preco * 0.10")\nprint("=======")\nprint("    return preco * 0.15")\nprint(">>>>>>> feature-novo-desconto")\nprint()\nprint("=== ARQUIVO RESOLVIDO ===")\nprint("def calcular_desconto(preco):")\nprint("    return preco * 0.15")\nprint()\nprint("=== COMANDOS PARA FINALIZAR ===")\nprint("git add calcular_desconto.py")\nprint("git commit -m \\"Resolve conflito: usa desconto de 15%\\"")',
      hints: [
        'O conflito e marcado por <<<<<<< HEAD, =======, e >>>>>>> nome-da-branch. Tudo entre <<<<<<< e ======= e a versao da sua branch atual.',
        'Para resolver, voce remove os marcadores (<<<, ===, >>>) e escolhe qual versao manter (ou combina as duas).',
        'Apos resolver o conflito no arquivo, voce precisa fazer git add e git commit para finalizar o merge.',
      ],
    },
  ],
};
