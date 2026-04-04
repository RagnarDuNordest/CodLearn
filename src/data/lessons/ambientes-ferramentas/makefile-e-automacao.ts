import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'makefile-e-automacao',
  moduleId: 'ambientes-ferramentas',
  title: 'Makefile e Automacao',
  description: 'Automatize tarefas repetitivas com Makefile: crie targets para testes, build, lint e limpeza com um unico comando',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O que e um Makefile?\n\nMakefile e um arquivo de automacao que define "targets" (alvos) — tarefas que podem ser executadas com o comando `make <target>`. Originalmente criado para compilar codigo C, hoje e amplamente usado para automatizar qualquer tarefa de desenvolvimento.\n\n### Por que usar Makefile?\n\nSem Makefile, cada desenvolvedor precisa lembrar (e digitar) comandos longos:\n```\npython -m pytest tests/ --cov=src --cov-report=term-missing -v\nflake8 src/ --max-line-length=88 --exclude=venv\nblack src/ tests/ --check\n```\n\nCom Makefile, tudo isso vira:\n```\nmake test\nmake lint\n```\n\n### Beneficios\n- **Padronizacao:** todos na equipe usam os mesmos comandos\n- **Documentacao viva:** o Makefile serve como referencia dos comandos do projeto\n- **Automacao de CI/CD:** pipelines de deploy podem chamar os mesmos `make` targets\n- **Dependencias entre tarefas:** `make deploy` pode exigir que `make test` passe primeiro',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Estrutura basica de um Makefile\n# ATENCAO: linhas de comando DEVEM usar TAB (nao espacos)\n\n# Sintaxe:\n# target: dependencias\n# <TAB> comando\n\n# Exemplo minimo:\ncat > Makefile << \'EOF\'\n# Variaveis\nPYTHON = python\nPIP = pip\nSRC = src\nTESTS = tests\n\n# Target padrao (executado com "make" sem argumentos)\nall: install lint test\n\n# Instalar dependencias\ninstall:\n\t$(PIP) install -r requirements.txt\n\n# Executar testes\ntest:\n\t$(PYTHON) -m pytest $(TESTS)/ -v\n\n# Verificar estilo de codigo\nlint:\n\tflake8 $(SRC)/\n\n# Formatar codigo automaticamente\nformat:\n\tblack $(SRC)/ $(TESTS)/\n\n# Limpar arquivos temporarios\nclean:\n\tfind . -type f -name "*.pyc" -delete\n\tfind . -type d -name "__pycache__" -exec rm -rf {} +\n\trm -rf .pytest_cache/ .coverage htmlcov/\nEOF\n\necho "Makefile criado!"\n\n# Usar os targets:\n# make install\n# make test\n# make lint\n# make clean\n# make           # executa o target "all"',
        filename: 'criar-makefile-basico.sh',
        description:
          'Criacao de um Makefile basico com os targets mais comuns. Atencao critica: as linhas de comando DEVEM comecar com um caractere TAB (nao espacos) — este e o erro mais comum ao escrever Makefiles.',
      },
    },
    {
      type: 'text',
      content:
        '## Phony targets — targets que nao sao arquivos\n\nPor padrao, Make assume que um target e o nome de um arquivo que sera gerado. Se existir um arquivo chamado "test" no diretorio, `make test` vai dizer "test esta atualizado" e nao rodar nada.\n\nA solucao e declarar targets como `.PHONY` — isso diz ao Make que o target e sempre uma acao, nunca um arquivo:\n\n```makefile\n.PHONY: all install test lint format clean help\n```\n\n### Targets com dependencias\n\n```makefile\n# "deploy" so roda se "test" e "lint" passarem\ndeploy: test lint\n    echo "Testes passaram, fazendo deploy..."\n    ./scripts/deploy.sh\n\n# "test-coverage" depende de "test"\ntest-coverage: test\n    python -m pytest tests/ --cov=src --cov-report=html\n    echo "Relatorio em htmlcov/index.html"\n```\n\n### Target help — autodocumentacao\n\n```makefile\nhelp:  ## Mostra esta ajuda\n    @grep -E \'^[a-zA-Z_-]+:.*?## .*$$\' $(MAKEFILE_LIST) \\\n        | awk \'BEGIN {FS = ":.*?## "}; {printf "  \\033[36m%-20s\\033[0m %s\\n", $$1, $$2}\'\n\ninstall:  ## Instala as dependencias do projeto\n    pip install -r requirements.txt\n\ntest:  ## Executa a suite de testes\n    pytest tests/ -v\n```\n\nCom esse padrao, `make help` lista todos os targets com suas descricoes automaticamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Makefile completo e profissional para projeto Python\ncat > Makefile << \'EOF\'\n.PHONY: all install install-dev test test-coverage lint format clean run help\n\nPYTHON = python\nPIP = pip\nSRC = src\nTESTS = tests\n\nall: install lint test  ## Setup completo: instala, verifica e testa\n\ninstall:  ## Instala dependencias de producao\n\t$(PIP) install -r requirements.txt\n\ninstall-dev:  ## Instala dependencias de desenvolvimento\n\t$(PIP) install -r requirements-dev.txt\n\ntest:  ## Executa os testes\n\t$(PYTHON) -m pytest $(TESTS)/ -v\n\ntest-coverage:  ## Executa testes com relatorio de cobertura\n\t$(PYTHON) -m pytest $(TESTS)/ --cov=$(SRC) --cov-report=term-missing --cov-report=html\n\nlint:  ## Verifica o estilo do codigo\n\tflake8 $(SRC)/ --max-line-length=88\n\nformat:  ## Formata o codigo com black\n\tblack $(SRC)/ $(TESTS)/\n\nclean:  ## Remove arquivos temporarios e cache\n\tfind . -type f -name "*.pyc" -delete\n\tfind . -type d -name "__pycache__" -exec rm -rf {} +\n\trm -rf .pytest_cache/ .coverage htmlcov/ dist/ build/ *.egg-info\n\nrun:  ## Inicia a aplicacao\n\t$(PYTHON) $(SRC)/main.py\n\nhelp:  ## Mostra todos os comandos disponiveis\n\t@echo "Comandos disponiveis:"\n\t@grep -E \'^[a-zA-Z_-]+:.*?## .*$$\' $(MAKEFILE_LIST) | \\\n\t\tawk \'BEGIN {FS = ":.*?## "}; {printf "  make %-20s %s\\n", $$1, $$2}\'\nEOF\n\necho "Makefile profissional criado!"\necho "Teste com: make help"',
        filename: 'makefile-profissional.sh',
        description:
          'Makefile completo com .PHONY, variaveis, dependencias e target help com autodocumentacao. Este template pode ser reutilizado em qualquer projeto Python.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Make esta disponivel por padrao no Linux e Mac. No Windows, voce pode instalar via "choco install make" (Chocolatey), "scoop install make", ou usar o WSL (Windows Subsystem for Linux). Alternativas ao Make incluem: "just" (mais moderno, sem a regra do TAB), "taskfile" (em YAML) e "scripts npm" para projetos JavaScript.',
    },
  ],
  challenges: [
    {
      id: 'makefile-automacao-c1',
      title: 'Crie um Makefile para Projeto Python',
      description:
        'Crie um Makefile com os targets: "install" (pip install -r requirements.txt), "test" (pytest tests/), "lint" (flake8 src/), "clean" (remove __pycache__ e .pyc) e "all" que executa install, lint e test nessa ordem. Declare todos como .PHONY.',
      language: 'bash',
      starterCode:
        '# Crie o Makefile completo\n# Lembre: linhas de comando usam TAB, nao espacos\n\ncat > Makefile << \'EOF\'\n# Declare todos os targets como phony\n\n# Variaveis\nPYTHON = python\nPIP = pip\n\n# Target all: executa install, lint e test\nall:\n\n# Instalar dependencias\ninstall:\n\n# Executar testes\ntest:\n\n# Verificar lint\nlint:\n\n# Limpar arquivos temporarios\nclean:\n\nEOF\n\necho "Makefile criado:"\ncat Makefile\n',
      solution:
        'cat > Makefile << \'EOF\'\n.PHONY: all install test lint clean\n\nPYTHON = python\nPIP = pip\n\nall: install lint test\n\ninstall:\n\t$(PIP) install -r requirements.txt\n\ntest:\n\t$(PYTHON) -m pytest tests/ -v\n\nlint:\n\tflake8 src/\n\nclean:\n\tfind . -type f -name "*.pyc" -delete\n\tfind . -type d -name "__pycache__" -exec rm -rf {} +\nEOF\n\necho "Makefile criado:"\ncat Makefile\n',
      hints: [
        'A linha .PHONY deve listar todos os targets separados por espaco: .PHONY: all install test lint clean',
        'O target "all: install lint test" faz o Make executar os tres em ordem antes de concluir "all"',
        'ATENCAO: cada linha de comando no Make deve comecar com um TAB real, nao espacos — este e o erro mais comum',
      ],
    },
    {
      id: 'makefile-automacao-c2',
      title: 'Adicione Dependencias entre Targets',
      description:
        'Modifique o Makefile para adicionar um target "deploy" que so pode ser executado se "test" e "lint" passarem, e um target "test-coverage" que executa pytest com cobertura de codigo. Use dependencias entre targets.',
      language: 'bash',
      starterCode:
        '# Adicione ao Makefile existente os novos targets\n# O target "deploy" deve depender de "test" e "lint"\n# O target "test-coverage" deve depender de "test"\n\ncat >> Makefile << \'EOF\'\n\n# Target test-coverage: depende de test, adiciona relatorio HTML\ntest-coverage:\n\n# Target deploy: so roda se test e lint passarem\ndeploy:\n\nEOF\n\n# Atualize o .PHONY para incluir os novos targets\n# Dica: use sed para atualizar a linha .PHONY existente\n',
      solution:
        'cat >> Makefile << \'EOF\'\n\ntest-coverage: test\n\t$(PYTHON) -m pytest tests/ --cov=src --cov-report=term-missing --cov-report=html\n\tdeploy: test lint\n\techo "Todos os checks passaram. Iniciando deploy..."\n\t$(PYTHON) scripts/deploy.py\nEOF\n\n# Atualizar o .PHONY\nsed -i "s/.PHONY: all install test lint clean/.PHONY: all install test lint clean test-coverage deploy/" Makefile\n\necho "Makefile atualizado:"\ncat Makefile\n',
      hints: [
        'Dependencias ficam apos os dois pontos: "deploy: test lint" significa que test e lint rodam antes de deploy',
        'Se "test" falhar, Make para e nao executa "deploy" — isso e exatamente o comportamento desejado',
        'Adicione os novos targets ao .PHONY para evitar conflitos com arquivos de mesmo nome',
      ],
    },
  ],
};
