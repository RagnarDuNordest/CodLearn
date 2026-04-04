import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'rodando-testes-no-ci',
  moduleId: 'cicd',
  title: 'Rodando Testes no CI',
  description: 'Configure um workflow para instalar dependencias e rodar pytest automaticamente a cada push, incluindo matrix de versoes Python',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Rodando Testes Automaticamente no CI\n\nO principal beneficio do CI e garantir que os testes rodem em cada commit, em um ambiente limpo e reproduzivel — independentemente da maquina do desenvolvedor.\n\n### Por que rodar testes no CI e nao so localmente?\n\n- **Ambiente isolado:** a maquina virtual do CI nao tem as configuracoes especificas do seu computador. Se o teste passa no CI, funciona em qualquer lugar.\n- **Obrigatoriedade:** ninguem consegue fazer merge de um PR com testes falhando — o CI bloqueia automaticamente.\n- **Historico:** voce ve exatamente em qual commit os testes comecaram a falhar.\n- **Paralelismo:** diferentes versoes da linguagem podem ser testadas ao mesmo tempo.\n\n### Estrutura de um projeto Python com testes\n\n```\nmeu-projeto/\n  src/\n    calculadora.py\n  tests/\n    test_calculadora.py\n  requirements.txt\n  requirements-dev.txt   # dependencias so de desenvolvimento\n  .github/\n    workflows/\n      ci.yml\n```\n\nO arquivo `requirements-dev.txt` normalmente contem:\n```\npytest\npytest-cov\nflake8\nmypy\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/testes.yml\n# Workflow completo para rodar pytest a cada push\n\nname: Testes\n\non:\n  push:\n    branches: [ "**" ]   # qualquer branch\n  pull_request:\n    branches: [ main ]   # PRs direcionados a main\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    steps:\n      # 1. Obter o codigo do repositorio\n      - name: Checkout do codigo\n        uses: actions/checkout@v4\n\n      # 2. Instalar Python\n      - name: Configurar Python 3.11\n        uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      # 3. Cache do pip para acelerar builds futuros\n      - name: Cache de dependencias pip\n        uses: actions/cache@v4\n        with:\n          path: ~/.cache/pip\n          key: ${{ runner.os }}-pip-${{ hashFiles(\'requirements*.txt\') }}\n          restore-keys: |\n            ${{ runner.os }}-pip-\n\n      # 4. Instalar dependencias\n      - name: Instalar dependencias\n        run: |\n          python -m pip install --upgrade pip\n          pip install -r requirements.txt\n          pip install pytest pytest-cov\n\n      # 5. Rodar os testes com relatorio de cobertura\n      - name: Rodar pytest\n        run: |\n          pytest tests/ -v --cov=src --cov-report=term-missing\n\n      # 6. Verificar cobertura minima (falha se menor que 80%)\n      - name: Verificar cobertura minima\n        run: pytest tests/ --cov=src --cov-fail-under=80',
        filename: '.github/workflows/testes.yml',
        description:
          'Workflow que roda pytest com relatorio de cobertura. Usa cache do pip para acelerar builds. Falha se a cobertura de testes for menor que 80%.',
      },
    },
    {
      type: 'text',
      content:
        '## Matrix de versoes: testando em multiplos ambientes\n\nA **matrix strategy** e um dos recursos mais poderosos do GitHub Actions. Ela permite executar o mesmo job com diferentes combinacoes de parametros — por exemplo, testar em Python 3.9, 3.10, 3.11 e 3.12 simultaneamente.\n\n### Como funciona\n\nVoce define uma matrix de valores, e o GitHub Actions cria um job separado para cada combinacao automaticamente:\n\n```yaml\nstrategy:\n  matrix:\n    python-version: ["3.9", "3.10", "3.11", "3.12"]\n```\n\nIsso cria 4 jobs rodando em paralelo. Voce referencia o valor atual com `${{ matrix.python-version }}`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Arquivo: .github/workflows/testes-matrix.yml\n# Testa em Python 3.9, 3.10, 3.11 e 3.12 simultaneamente\n\nname: Testes (Matrix)\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    # Define a matrix de versoes\n    strategy:\n      matrix:\n        python-version: ["3.9", "3.10", "3.11", "3.12"]\n      # fail-fast: false faz todos os jobs rodarem mesmo se um falhar\n      # util para ver quais versoes falham e quais passam\n      fail-fast: false\n\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      # Usa o valor da matrix para configurar a versao do Python\n      - name: Configurar Python ${{ matrix.python-version }}\n        uses: actions/setup-python@v5\n        with:\n          python-version: ${{ matrix.python-version }}\n\n      - name: Instalar dependencias\n        run: |\n          pip install --upgrade pip\n          pip install -r requirements.txt pytest\n\n      - name: Rodar testes - Python ${{ matrix.python-version }}\n        run: pytest tests/ -v\n\n# Resultado: 4 jobs rodam em paralelo na aba Actions:\n# testes (3.9)  | testes (3.10) | testes (3.11) | testes (3.12)\n# Cada um com seu proprio status de sucesso ou falha',
        filename: '.github/workflows/testes-matrix.yml',
        description:
          'Matrix strategy: 4 jobs rodam em paralelo, cada um testando uma versao diferente do Python. fail-fast: false garante que todos os jobs completem mesmo se um falhar.',
      },
    },
  ],
  challenges: [
    {
      id: 'cicd-c3-workflow-testes',
      title: 'Configure o Workflow de Testes',
      description:
        'Complete o workflow abaixo para rodar pytest com cobertura de codigo. O workflow deve: instalar pytest e pytest-cov, rodar os testes do diretorio "tests/" com flag verbose (-v) e gerar relatorio de cobertura para o diretorio "src/" com "--cov=src --cov-report=term-missing".',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/testes.yml\n# Complete os steps de instalacao e execucao dos testes\n\nname: Testes com Cobertura\n\non:\n  push:\n  pull_request:\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      - name: Instalar dependencias\n        # TODO: use "run" com comando multiline (pipe "|")\n        # Linha 1: pip install --upgrade pip\n        # Linha 2: pip install pytest pytest-cov\n\n      - name: Rodar testes\n        # TODO: use "run" para executar:\n        # pytest tests/ -v --cov=src --cov-report=term-missing\n',
      solution:
        '# Arquivo: .github/workflows/testes.yml\n\nname: Testes com Cobertura\n\non:\n  push:\n  pull_request:\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout\n        uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: "3.11"\n\n      - name: Instalar dependencias\n        run: |\n          pip install --upgrade pip\n          pip install pytest pytest-cov\n\n      - name: Rodar testes\n        run: pytest tests/ -v --cov=src --cov-report=term-missing\n',
      hints: [
        'Para executar multiplos comandos em um "run", use o pipe "|" apos "run:" e coloque cada comando em uma linha indentada',
        'O "pip install --upgrade pip" garante que voce tem a versao mais recente do pip antes de instalar as dependencias',
        'As flags do pytest: "-v" e verbose (mostra nome de cada teste), "--cov=src" mede cobertura do diretorio src, "--cov-report=term-missing" mostra as linhas nao cobertas',
      ],
    },
    {
      id: 'cicd-c3-matrix',
      title: 'Adicione Matrix de Versoes',
      description:
        'O workflow abaixo testa apenas em Python 3.11. Modifique-o para testar nas versoes 3.9, 3.10, 3.11 e 3.12 usando matrix strategy. O nome do job deve incluir a versao atual, e o setup-python deve usar o valor da matrix.',
      language: 'bash',
      starterCode:
        '# Arquivo: .github/workflows/testes-matrix.yml\n# Modifique para usar matrix strategy com Python 3.9, 3.10, 3.11, 3.12\n\nname: Testes Matrix\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    # TODO: adicione a strategy com matrix de python-version\n    # Versoes: "3.9", "3.10", "3.11", "3.12"\n    # Adicione fail-fast: false\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          # TODO: substitua "3.11" pelo valor da matrix\n          python-version: "3.11"\n\n      - run: pip install pytest\n      - run: pytest tests/ -v\n',
      solution:
        '# Arquivo: .github/workflows/testes-matrix.yml\n\nname: Testes Matrix\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  testes:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix:\n        python-version: ["3.9", "3.10", "3.11", "3.12"]\n      fail-fast: false\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - name: Setup Python ${{ matrix.python-version }}\n        uses: actions/setup-python@v5\n        with:\n          python-version: ${{ matrix.python-version }}\n\n      - run: pip install pytest\n      - run: pytest tests/ -v\n',
      hints: [
        'O bloco "strategy:" fica no nivel do job, antes de "steps:". Dentro dele, "matrix:" define as variaveis, e "fail-fast: false" e opcional mas recomendado',
        'Para acessar o valor da matrix em qualquer campo, use a sintaxe ${{ matrix.nome-da-variavel }}. Aqui seria ${{ matrix.python-version }}',
        'O "fail-fast: false" e importante: sem ele, se Python 3.9 falhar, os jobs das outras versoes sao cancelados automaticamente — impedindo voce de ver quais versoes funcionam',
      ],
    },
  ],
};
