import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'github-na-pratica',
  moduleId: 'git',
  title: 'GitHub na Pratica',
  description:
    'Aprenda a usar o GitHub para colaborar em projetos: fork, pull requests, issues, README.md, colaboracao em equipe e GitHub Pages.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'GitHub e como uma rede social para codigo: voce publica projetos, colabora com outros e mostra seu trabalho para o mundo!\n\n## GitHub: Muito Mais que Hospedagem de Codigo\n\nO **GitHub** e a maior plataforma de hospedagem de repositorios Git do mundo, com mais de 100 milhoes de desenvolvedores. Mas ele vai muito alem de apenas armazenar codigo -- e uma plataforma completa de colaboracao.\n\nRecursos principais do GitHub:\n\n- **Repositorios**: hospedar seu codigo com controle de versao completo\n- **Fork**: copiar o repositorio de outra pessoa para sua conta\n- **Pull Requests**: propor mudancas e revisar codigo antes de integrar\n- **Issues**: rastrear bugs, tarefas e melhorias\n- **README.md**: documentacao do projeto exibida na pagina inicial\n- **GitHub Pages**: hospedagem gratuita de sites estaticos\n- **Actions**: automacao de CI/CD (testes, deploy automatico)\n\nPara comecar, crie uma conta gratuita em github.com. Depois, voce pode criar repositorios, contribuir para projetos open source e construir seu portfolio de desenvolvedor.',
    },
    {
      type: 'text',
      content:
        '## Fork e Pull Request\n\nO **fork** e uma copia de um repositorio de outra pessoa para a sua conta no GitHub. Voce pode fazer mudancas no seu fork sem afetar o projeto original.\n\nO **pull request (PR)** e uma proposta de mudanca. Depois de fazer alteracoes no seu fork (ou em uma branch), voce cria um PR pedindo para o dono do projeto integrar suas mudancas.\n\nFluxo de contribuicao em projetos open source:\n\n1. **Fork** o repositorio no GitHub (botao "Fork")\n2. **Clone** o fork para seu computador\n3. Crie uma **branch** para suas mudancas\n4. Faca os **commits** com suas alteracoes\n5. **Push** para o seu fork no GitHub\n6. Abra um **Pull Request** do seu fork para o repositorio original\n7. Aguarde a **revisao** e possivel merge pelo mantenedor\n\nO PR permite que o mantenedor do projeto revise seu codigo, sugira mudancas e discuta a implementacao antes de aceitar. Isso garante a qualidade do codigo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# FLUXO DE CONTRIBUICAO COM FORK E PR\n# ====================================\n\n# 1. Clonar o SEU fork (nao o original)\ngit clone https://github.com/SEU-USER/projeto-open-source.git\ncd projeto-open-source\n\n# 2. Adicionar o repositorio original como "upstream"\ngit remote add upstream https://github.com/DONO/projeto-open-source.git\n\n# 3. Verificar os remotos\ngit remote -v\n# origin    https://github.com/SEU-USER/projeto-open-source.git\n# upstream  https://github.com/DONO/projeto-open-source.git\n\n# 4. Criar branch para sua contribuicao\ngit switch -c fix-typo-readme\n\n# 5. Fazer alteracoes e commitar\ngit add README.md\ngit commit -m "Corrige erro de digitacao no README"\n\n# 6. Enviar para o SEU fork\ngit push origin fix-typo-readme\n\n# 7. Agora va ao GitHub e crie o Pull Request!\n# GitHub mostrara um botao "Compare & pull request"\n\n# ====================================\n# MANTER SEU FORK ATUALIZADO\n# ====================================\ngit switch main\ngit fetch upstream\ngit merge upstream/main\ngit push origin main',
        filename: 'fork-e-pr.sh',
        description:
          'O fluxo completo para contribuir com projetos open source: fork, clone, branch, commit, push e pull request.',
      },
    },
    {
      type: 'text',
      content: '## Issues, README e GitHub Pages\n\nAlm do fluxo de fork e PR, o GitHub oferece outros recursos essenciais:\n\n- **Issues** — Sistema de rastreamento de tarefas. Ao escrever `fixes #42` na mensagem de um commit, o GitHub fecha automaticamente a issue #42 quando o PR for mergeado\n- **README.md** — Arquivo Markdown exibido na pagina inicial do repositorio. E a vitrine do projeto, descrevendo o que ele faz, como instalar e como usar\n- **GitHub Pages** — Hospedagem gratuita de sites estaticos. Basta criar um repositorio com o nome `seu-usuario.github.io` e adicionar os arquivos HTML/CSS/JS',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# ====================================\n# ISSUES E README.md\n# ====================================\n\n# Issues sao usadas para:\n# - Reportar bugs\n# - Sugerir novas funcionalidades\n# - Discutir melhorias\n# - Rastrear tarefas do projeto\n\n# Voce pode referenciar issues nos commits:\ngit commit -m "Corrige calculo de frete - fixes #42"\n# O "fixes #42" automaticamente fecha a issue #42 no merge!\n\n# Palavras-chave que fecham issues automaticamente:\n# fixes #N, closes #N, resolves #N\n\n# ====================================\n# README.md - A VITRINE DO SEU PROJETO\n# ====================================\n\n# O README.md e escrito em Markdown e exibido na pagina do repo\n# Estrutura recomendada:\n#\n# # Nome do Projeto\n# Descricao breve do que o projeto faz\n#\n# ## Instalacao\n# Passos para instalar\n#\n# ## Como Usar\n# Exemplos de uso\n#\n# ## Tecnologias\n# Lista de tecnologias usadas\n#\n# ## Contribuicao\n# Como contribuir\n#\n# ## Licenca\n# Tipo de licenca\n\n# ====================================\n# GITHUB PAGES - HOSPEDAR SITE GRATIS\n# ====================================\n\n# 1. Crie um repositorio chamado "seu-user.github.io"\n# 2. Adicione seus arquivos HTML, CSS e JS\ngit add .\ngit commit -m "Adiciona site pessoal"\ngit push origin main\n# 3. Acesse: https://seu-user.github.io',
        filename: 'github-recursos.sh',
        description:
          'Issues rastreiam tarefas e bugs, o README.md documenta o projeto, e GitHub Pages permite hospedar sites estaticos gratuitamente.',
      },
    },
    {
      type: 'callout',
      content:
        'Seu perfil no GitHub e seu portfolio como desenvolvedor! Mantenha seus repositorios organizados com bons READMEs, faca commits com mensagens claras e contribua para projetos open source. Recrutadores e empresas frequentemente olham o GitHub de candidatos.',
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
        '## GitHub Actions: Automacao de CI/CD\n\nO **GitHub Actions** permite automatizar tarefas sempre que algo acontece no seu repositorio (um push, um PR aberto, etc.). E a ferramenta de **CI/CD** (Continuous Integration / Continuous Deployment) integrada ao GitHub.\n\nCasos de uso comuns:\n- Rodar os **testes automaticamente** em cada push\n- Fazer **lint** (verificacao de qualidade) do codigo\n- Fazer **deploy** automatico para producao quando o PR e mergeado\n- Enviar **notificacoes** no Slack ou Discord\n\nOs workflows sao configurados em arquivos **YAML** dentro da pasta `.github/workflows/`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'github-actions.yml',
        code: '# Arquivo: .github/workflows/ci.yml\n# Este workflow roda os testes em cada push ou pull request\n\nname: CI - Testes Automaticos\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    steps:\n    - name: Clonar repositorio\n      uses: actions/checkout@v4\n\n    - name: Configurar Node.js\n      uses: actions/setup-node@v4\n      with:\n        node-version: \'20\'\n\n    - name: Instalar dependencias\n      run: npm install\n\n    - name: Rodar testes\n      run: npm test\n\n    - name: Verificar qualidade do codigo\n      run: npm run lint',
        description:
          'Exemplo de GitHub Actions para rodar testes automaticamente em cada push ou pull request.',
      },
    },
  ],
  challenges: [
    {
      id: 'git5-c1',
      title: 'Fluxo de contribuicao open source',
      description:
        'Escreva os comandos para contribuir com um projeto open source: (1) clonar seu fork, (2) adicionar o repositorio original como upstream, (3) criar uma branch "fix-bug-login", (4) fazer um commit que referencia a issue #15, (5) enviar para o seu fork.',
      language: 'bash',
      starterCode: '# Passo 1: Clonar seu fork\n\n\n# Passo 2: Entrar na pasta e adicionar upstream\n\n\n# Passo 3: Criar branch para a correcao\n\n\n# Passo 4: Fazer alteracoes e commitar referenciando issue #15\n\n\n# Passo 5: Enviar para seu fork\n',
      solution: '# Passo 1: Clonar seu fork\ngit clone https://github.com/meu-user/projeto.git\n\n# Passo 2: Entrar na pasta e adicionar upstream\ncd projeto\ngit remote add upstream https://github.com/original/projeto.git\n\n# Passo 3: Criar branch para a correcao\ngit switch -c fix-bug-login\n\n# Passo 4: Fazer alteracoes e commitar referenciando issue #15\ngit add .\ngit commit -m "Corrige validacao de login - fixes #15"\n\n# Passo 5: Enviar para seu fork\ngit push origin fix-bug-login',
      hints: [
        'Clone o SEU fork (origin), nao o repositorio original.',
        'O upstream aponta para o repositorio original do dono do projeto.',
        'Use "fixes #N" na mensagem de commit para fechar issues automaticamente.',
      ],
    },
    {
      id: 'git5-c2',
      title: 'Mantendo o fork atualizado',
      description:
        'Seu fork esta desatualizado em relacao ao repositorio original. Escreva os comandos para: (1) trocar para a branch main, (2) buscar atualizacoes do upstream, (3) aplicar as mudancas na sua main local, (4) enviar a main atualizada para o seu fork no GitHub.',
      language: 'bash',
      starterCode: '# Passo 1: Trocar para main\n\n\n# Passo 2: Buscar atualizacoes do upstream\n\n\n# Passo 3: Aplicar mudancas na main local\n\n\n# Passo 4: Atualizar o fork no GitHub\n',
      solution: '# Passo 1: Trocar para main\ngit switch main\n\n# Passo 2: Buscar atualizacoes do upstream\ngit fetch upstream\n\n# Passo 3: Aplicar mudancas na main local\ngit merge upstream/main\n\n# Passo 4: Atualizar o fork no GitHub\ngit push origin main',
      hints: [
        'Sempre atualize a main local antes de criar novas branches.',
        'Use "git fetch upstream" para baixar mudancas do repo original.',
        'Apos o merge, faca push para origin para atualizar o fork.',
      ],
    },
  ],
};
