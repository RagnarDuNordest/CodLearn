import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'github-actions-primeiros-passos',
  moduleId: 'cicd',
  title: 'GitHub Actions: Primeiros Passos',
  description: 'Aprenda a estrutura de workflows YAML: eventos on, jobs, steps e actions como checkout e setup-python',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## GitHub Actions\n\nGitHub Actions e a plataforma de CI/CD integrada ao GitHub. Ela permite automatizar qualquer fluxo de trabalho diretamente no repositorio, sem precisar configurar servidores externos.\n\n### Como funciona\n\nVoce cria arquivos YAML dentro da pasta `.github/workflows/` do repositorio. O GitHub le esses arquivos e executa os workflows automaticamente quando os eventos configurados acontecem.\n\n### Estrutura de pastas\n\n```\nmeu-projeto/\n  .github/\n    workflows/\n      ci.yml          # workflow de integracao continua\n      deploy.yml      # workflow de deploy\n      code-review.yml # workflow de revisao de codigo\n  src/\n  tests/\n  README.md\n```\n\nCada arquivo `.yml` dentro de `workflows/` e um workflow independente. Voce pode ter quantos quiser.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/ci.yml\n# Este e o workflow mais simples possivel\n\n# Nome do workflow — aparece na aba "Actions" do GitHub\nname: CI\n\n# "on" define QUANDO o workflow roda\non:\n  push:                    # roda em todo git push\n    branches: [ main ]     # mas so na branch main\n  pull_request:            # roda em pull requests\n    branches: [ main ]     # direcionados para main\n\n# "jobs" define os trabalhos a executar\njobs:\n  build:                   # nome do job (voce escolhe)\n    runs-on: ubuntu-latest # maquina virtual que executa o job\n\n    # "steps" sao os passos dentro do job\n    steps:\n      # Passo 1: fazer checkout do codigo\n      - name: Checkout do codigo\n        uses: actions/checkout@v4\n\n      # Passo 2: configurar Python\n      - name: Configurar Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      # Passo 3: instalar dependencias\n      - name: Instalar dependencias\n        run: pip install -r requirements.txt\n\n      # Passo 4: rodar testes\n      - name: Rodar testes\n        run: pytest',
        filename: '.github/workflows/ci.yml',
        description:
          'Workflow basico de CI: roda em push e pull_request para a branch main. Faz checkout, configura Python 3.11, instala dependencias e executa pytest.',
      },
    },
    {
      type: 'text',
      content:
        '## Anatomia do workflow YAML\n\n### Campo "on" — eventos que disparam o workflow\n\nO campo `on` aceita dezenas de eventos do GitHub:\n\n```yaml\non:\n  push:                        # qualquer push\n  pull_request:                # abertura ou atualizacao de PR\n  schedule:\n    - cron: "0 8 * * 1"        # toda segunda-feira as 8h\n  workflow_dispatch:           # disparo manual pelo usuario\n  release:\n    types: [published]         # quando uma release e publicada\n```\n\n### Campo "jobs" — unidades de trabalho paralelas\n\nCada job roda em uma maquina virtual isolada. Jobs diferentes rodam em paralelo por padrao. Voce pode fazer um job depender de outro com `needs`:\n\n```yaml\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps: [...]\n\n  deploy:\n    runs-on: ubuntu-latest\n    needs: testes        # so roda se "testes" passar\n    steps: [...]\n```\n\n### Campo "steps" — passos dentro de um job\n\nCada step pode usar `run` (comando shell) ou `uses` (action pre-construida):\n\n```yaml\nsteps:\n  - name: Passo com comando shell\n    run: echo "Hello World"\n\n  - name: Passo com action\n    uses: actions/checkout@v4\n\n  - name: Passo com action e parametros\n    uses: actions/setup-python@v5\n    with:\n      python-version: "3.12"\n```\n\n### Actions mais comuns\n\n| Action | O que faz |\n|---|---|\n| `actions/checkout@v4` | Clona o repositorio na maquina virtual |\n| `actions/setup-python@v5` | Instala e configura uma versao do Python |\n| `actions/setup-node@v4` | Instala e configura Node.js |\n| `actions/upload-artifact@v4` | Salva arquivos para download apos o workflow |\n| `actions/cache@v4` | Cacheia dependencias para acelerar o workflow |',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O "@v4" no final de "actions/checkout@v4" e a versao da action. Sempre especifique uma versao — nunca use "@main" ou "@latest" em producao, pois a action pode mudar e quebrar seu workflow sem aviso.',
    },
  ],
  challenges: [
    {
      id: 'cicd-c2-primeiro-workflow',
      title: 'Complete o Workflow',
      description:
        'O workflow abaixo esta incompleto. Complete os campos marcados com "TODO" para criar um workflow que: (1) rode em push para qualquer branch, (2) use Ubuntu como runner, (3) faca checkout do codigo, (4) configure Python 3.10 e (5) instale as dependencias com pip.',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/ci.yml\n# Complete os campos marcados com TODO\n\nname: Meu Primeiro CI\n\non:\n  push:\n    # TODO: configure para rodar em TODAS as branches\n    # Dica: use "branches: [ \'**\' ]" ou remova o filtro de branches\n\njobs:\n  build:\n    # TODO: defina o runner como ubuntu-latest\n\n    steps:\n      - name: Checkout\n        # TODO: use a action de checkout (actions/checkout@v4)\n\n      - name: Setup Python\n        # TODO: use a action actions/setup-python@v5\n        # TODO: configure python-version como "3.10"\n\n      - name: Instalar dependencias\n        # TODO: use "run" para executar: pip install -r requirements.txt\n',
      solution:
        '# Arquivo: .github/workflows/ci.yml\n\nname: Meu Primeiro CI\n\non:\n  push:\n    branches: [ "**" ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: "3.10"\n\n      - name: Instalar dependencias\n        run: pip install -r requirements.txt\n',
      hints: [
        'Para rodar em todas as branches, use "branches: [ \'**\' ]" — o "**" e um glob que casa com qualquer nome de branch',
        'O campo "runs-on" fica no nivel do job, nao dentro de steps. O valor e "ubuntu-latest"',
        'Actions pre-construidas usam "uses: nome/action@versao". Parametros da action vao dentro de "with:" com indentacao de 2 espacos',
      ],
    },
    {
      id: 'cicd-c2-jobs-dependentes',
      title: 'Crie Jobs Dependentes',
      description:
        'Modifique o workflow para ter dois jobs: "testes" e "deploy". O job "deploy" so deve executar se o job "testes" passar com sucesso. Ambos usam ubuntu-latest. O job "testes" roda "pytest" e o job "deploy" roda "echo Deploy realizado com sucesso!".',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/ci-deploy.yml\n# Adicione um segundo job "deploy" que depende de "testes"\n\nname: CI e Deploy\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest\n      - run: pytest\n\n  # TODO: adicione o job "deploy" aqui\n  # Ele deve:\n  # - rodar em ubuntu-latest\n  # - depender do job "testes" (usar "needs")\n  # - ter um step que executa: echo "Deploy realizado com sucesso!"\n',
      solution:
        '# Arquivo: .github/workflows/ci-deploy.yml\n\nname: CI e Deploy\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n      - run: pip install pytest\n      - run: pytest\n\n  deploy:\n    runs-on: ubuntu-latest\n    needs: testes\n    steps:\n      - name: Realizar deploy\n        run: echo "Deploy realizado com sucesso!"\n',
      hints: [
        'O campo "needs" fica no nivel do job (mesmo nivel de "runs-on"), nao dentro de steps. Valor e o nome do job do qual depende: needs: testes',
        'Um job com "needs: testes" so comeca quando o job "testes" terminar com status "success". Se "testes" falhar, "deploy" e cancelado automaticamente',
        'O step de deploy e simples: apenas um "run" com o comando echo. Nao precisa de checkout nem setup-python pois nao executa codigo Python',
      ],
    },
  ],
};
