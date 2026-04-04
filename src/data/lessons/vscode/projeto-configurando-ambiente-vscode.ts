import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-configurando-ambiente-vscode',
  moduleId: 'vscode',
  title: 'Projeto: Configurando um Ambiente Profissional',
  description: 'Configure um workspace profissional para Python com settings.json, extensoes recomendadas, snippets personalizados e debug configurado',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 45,
  sections: [
    {
      type: 'text',
      content:
        '## Projeto: Workspace Profissional para Python\n\nUm workspace bem configurado elimina distractors, padroniza o estilo de codigo automaticamente e acelera o desenvolvimento. Neste projeto voce vai configurar todos os arquivos da pasta `.vscode/` para um projeto Python profissional.\n\n### Estrutura que vamos criar\n```\nMeuProjeto/\n  .vscode/\n    settings.json          # Configuracoes do workspace\n    extensions.json        # Extensoes recomendadas para o time\n    launch.json            # Configuracoes de debug\n    tasks.json             # Tarefas automatizadas\n    python.code-snippets   # Snippets personalizados\n  src/\n    main.py\n  tests/\n    test_main.py\n  requirements.txt\n```\n\n### Por que configurar o workspace?\n- **Consistencia**: todo membro do time usa as mesmas configuracoes\n- **Automatizacao**: formata, lint e organiza imports ao salvar\n- **Velocidade**: snippets eliminam codigo boilerplate repetitivo\n- **Qualidade**: erros aparecem enquanto voce digita, nao depois\n\nAs configuracoes em `.vscode/settings.json` tem prioridade sobre as configuracoes globais do usuario — isso garante que o projeto sempre use as mesmas regras independente de quem estiver desenvolvendo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// .vscode/settings.json\n// Configuracoes especificas do workspace Python\n{\n  // Formatacao automatica\n  "editor.formatOnSave": true,\n  "editor.formatOnPaste": false,\n  "[python]": {\n    "editor.defaultFormatter": "ms-python.black-formatter",\n    "editor.formatOnSave": true,\n    "editor.codeActionsOnSave": {\n      "source.organizeImports": "explicit"\n    }\n  },\n\n  // Python: interpretador e linting\n  "python.defaultInterpreterPath": "${workspaceFolder}/.venv/bin/python",\n  "python.linting.enabled": true,\n  "python.linting.flake8Enabled": true,\n  "python.linting.flake8Args": [\n    "--max-line-length=100",\n    "--ignore=E203,W503"\n  ],\n\n  // Editor: conforto visual\n  "editor.rulers": [100],\n  "editor.tabSize": 4,\n  "editor.insertSpaces": true,\n  "editor.wordWrap": "off",\n  "editor.minimap.enabled": false,\n  "editor.renderWhitespace": "boundary",\n  "editor.bracketPairColorization.enabled": true,\n  "editor.guides.bracketPairs": true,\n\n  // Arquivos: excluir da arvore\n  "files.exclude": {\n    "**/__pycache__": true,\n    "**/*.pyc": true,\n    "**/.pytest_cache": true,\n    "**/node_modules": true\n  },\n\n  // Terminal integrado\n  "terminal.integrated.defaultProfile.linux": "bash",\n  "terminal.integrated.env.linux": {\n    "PYTHONPATH": "${workspaceFolder}/src"\n  },\n\n  // Git\n  "git.autofetch": true,\n  "diffEditor.ignoreTrimWhitespace": false\n}',
        filename: '.vscode/settings.json',
        description:
          'Configuracoes completas do workspace Python: formatacao automatica com Black ao salvar, organizacao de imports, linting com flake8, regua visual de 100 caracteres, exclusao de arquivos gerados da arvore de arquivos e configuracao do PYTHONPATH.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// .vscode/extensions.json\n// Extensoes recomendadas — o VS Code pergunta se quer instalar ao abrir o projeto\n{\n  "recommendations": [\n    "ms-python.python",\n    "ms-python.black-formatter",\n    "ms-python.isort",\n    "ms-python.flake8",\n    "eamodio.gitlens",\n    "usernamehw.errorlens",\n    "streetsidesoftware.code-spell-checker",\n    "streetsidesoftware.code-spell-checker-portuguese-brazilian"\n  ],\n  "unwantedRecommendations": [\n    "ms-python.pylint"\n  ]\n}\n\n// ============================================================\n// .vscode/python.code-snippets\n// Snippets personalizados para Python\n{\n  "Funcao com docstring": {\n    "prefix": "def",\n    "body": [\n      "def ${1:nome_da_funcao}(${2:parametros}):",\n      "    \\\"\\\"\\\"${3:Descricao da funcao.}",\n      "",\n      "    Args:",\n      "        ${4:param}: ${5:descricao}",\n      "",\n      "    Returns:",\n      "        ${6:tipo}: ${7:descricao}",\n      "    \\\"\\\"\\\"",\n      "    ${0:pass}"\n    ],\n    "description": "Funcao Python com docstring no formato Google"\n  },\n  "Classe Python": {\n    "prefix": "class",\n    "body": [\n      "class ${1:NomeDaClasse}:",\n      "    \\\"\\\"\\\"${2:Descricao da classe.}\\\"\\\"\\\"",\n      "",\n      "    def __init__(self, ${3:parametros}):",\n      "        \\\"\\\"\\\"Inicializa ${1:NomeDaClasse}.\\\"\\\"\\\"",\n      "        ${0:pass}"\n    ],\n    "description": "Classe Python com docstring"\n  },\n  "Main guard": {\n    "prefix": "main",\n    "body": [\n      "def main():",\n      "    ${1:pass}",\n      "",\n      "",\n      "if __name__ == \\"__main__\\":",\n      "    main()"\n    ],\n    "description": "Estrutura main() com guard"\n  }\n}',
        filename: '.vscode/extensions.json e python.code-snippets',
        description:
          'Dois arquivos em um: extensions.json define extensoes recomendadas para o time (o VS Code sugere instalar ao abrir o projeto), e python.code-snippets define 3 snippets: funcao com docstring completa, classe com docstring e estrutura main(). Use o prefixo "def", "class" ou "main" para expandir.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Commite a pasta .vscode/ no git do projeto (exceto settings pessoais como tema e tamanho de fonte). Isso garante que novos membros do time tenham o ambiente configurado automaticamente. Adicione ao .gitignore apenas o que for pessoal: .vscode/settings.json se contiver preferencias individuais.',
    },
  ],
  challenges: [
    {
      id: 'vscode-projeto-c1',
      title: 'Gerar o settings.json do Workspace',
      description:
        'Escreva uma funcao Python que gera um dicionario representando um settings.json completo para um workspace Python. A funcao deve aceitar parametros para customizar: o caminho do interpretador, o tamanho maximo de linha, se usa Black ou autopep8 como formatador, e se habilita minimap. Ao final, salve o arquivo em ".vscode/settings.json".',
      language: 'python',
      starterCode:
        '# Gerador de settings.json para workspace Python\nimport json\nimport os\n\ndef gerar_settings_workspace(\n    caminho_interpretador=".venv/bin/python",\n    max_linha=100,\n    formatador="black",\n    habilitar_minimap=False\n):\n    """\n    Gera um dicionario de configuracoes para o workspace VS Code.\n    \n    Args:\n        caminho_interpretador: path para o Python do venv\n        max_linha: numero maximo de caracteres por linha\n        formatador: "black" ou "autopep8"\n        habilitar_minimap: mostrar minimap no editor\n    \n    Returns:\n        dict: configuracoes prontas para serializar como JSON\n    """\n    # Complete a funcao\n    settings = {}\n    return settings\n\n\ndef salvar_settings(settings, caminho=".vscode/settings.json"):\n    """Salva o settings.json criando a pasta se necessario."""\n    # Complete: crie o diretorio e salve o arquivo JSON\n    pass\n\n\n# Teste\nconfig = gerar_settings_workspace(max_linha=120, habilitar_minimap=True)\nprint(json.dumps(config, indent=2))\n',
      solution:
        '# Gerador de settings.json para workspace Python\nimport json\nimport os\n\ndef gerar_settings_workspace(\n    caminho_interpretador=".venv/bin/python",\n    max_linha=100,\n    formatador="black",\n    habilitar_minimap=False\n):\n    """\n    Gera um dicionario de configuracoes para o workspace VS Code.\n\n    Args:\n        caminho_interpretador: path para o Python do venv\n        max_linha: numero maximo de caracteres por linha\n        formatador: "black" ou "autopep8"\n        habilitar_minimap: mostrar minimap no editor\n\n    Returns:\n        dict: configuracoes prontas para serializar como JSON\n    """\n    if formatador == "black":\n        id_formatador = "ms-python.black-formatter"\n    else:\n        id_formatador = "ms-python.autopep8"\n\n    settings = {\n        "editor.formatOnSave": True,\n        "[python]": {\n            "editor.defaultFormatter": id_formatador,\n            "editor.formatOnSave": True,\n            "editor.codeActionsOnSave": {\n                "source.organizeImports": "explicit"\n            }\n        },\n        "python.defaultInterpreterPath": "${workspaceFolder}/" + caminho_interpretador,\n        "python.linting.enabled": True,\n        "python.linting.flake8Enabled": True,\n        "python.linting.flake8Args": [\n            f"--max-line-length={max_linha}",\n            "--ignore=E203,W503"\n        ],\n        "editor.rulers": [max_linha],\n        "editor.tabSize": 4,\n        "editor.insertSpaces": True,\n        "editor.minimap.enabled": habilitar_minimap,\n        "editor.bracketPairColorization.enabled": True,\n        "editor.guides.bracketPairs": True,\n        "files.exclude": {\n            "**/__pycache__": True,\n            "**/*.pyc": True,\n            "**/.pytest_cache": True\n        },\n        "git.autofetch": True\n    }\n    return settings\n\n\ndef salvar_settings(settings, caminho=".vscode/settings.json"):\n    """Salva o settings.json criando a pasta se necessario."""\n    pasta = os.path.dirname(caminho)\n    if pasta and not os.path.exists(pasta):\n        os.makedirs(pasta)\n    with open(caminho, "w", encoding="utf-8") as arquivo:\n        json.dump(settings, arquivo, indent=2, ensure_ascii=False)\n    print(f"Settings salvo em: {caminho}")\n\n\n# Teste\nconfig = gerar_settings_workspace(max_linha=120, habilitar_minimap=True)\nprint(json.dumps(config, indent=2))\nsalvar_settings(config)\n',
      hints: [
        'Use uma estrutura de dicionario Python com os mesmos campos do settings.json — True/False Python se converte em true/false JSON automaticamente com json.dump',
        'Para a chave "[python]" com colchetes, use a string como chave normal do dicionario: settings["[python]"] = {...}',
        'Para criar diretorios use os.makedirs(pasta) e para salvar o JSON use json.dump(settings, arquivo, indent=2)',
      ],
    },
    {
      id: 'vscode-projeto-c2',
      title: 'Gerador de Snippets Personalizados',
      description:
        'Crie uma funcao Python que gera um arquivo de snippets VS Code (.code-snippets) para Python. O arquivo deve conter 3 snippets: um para funcao com docstring, um para classe com __init__ e um para bloco try/except com logging. A funcao deve receber o nome do arquivo de saida e salvar o JSON corretamente.',
      language: 'python',
      starterCode:
        '# Gerador de snippets personalizados para VS Code\nimport json\n\ndef gerar_snippets_python():\n    """\n    Retorna um dicionario com snippets Python para VS Code.\n    Inclui: funcao com docstring, classe com __init__, try/except com logging.\n    \n    Returns:\n        dict: snippets no formato aceito pelo VS Code\n    """\n    snippets = {\n        # Snippet 1: funcao com docstring\n        # Snippet 2: classe com __init__\n        # Snippet 3: try/except com logging\n    }\n    return snippets\n\n\ndef salvar_snippets(snippets, nome_arquivo="python.code-snippets"):\n    """Salva os snippets no arquivo especificado."""\n    pass\n\n\nsnippets = gerar_snippets_python()\nsalvar_snippets(snippets)\nprint("Snippets gerados com sucesso!")\nprint(f"Total de snippets: {len(snippets)}")\n',
      solution:
        '# Gerador de snippets personalizados para VS Code\nimport json\nimport os\n\ndef gerar_snippets_python():\n    """\n    Retorna um dicionario com snippets Python para VS Code.\n    Inclui: funcao com docstring, classe com __init__, try/except com logging.\n\n    Returns:\n        dict: snippets no formato aceito pelo VS Code\n    """\n    snippets = {\n        "Funcao com docstring": {\n            "prefix": "defdo",\n            "body": [\n                "def ${1:nome_funcao}(${2:params}):",\n                \'    """${3:Descricao da funcao.}\'\n                \'    """\',\n                "    ${0:pass}"\n            ],\n            "description": "Funcao Python com docstring"\n        },\n        "Classe com __init__": {\n            "prefix": "classi",\n            "body": [\n                "class ${1:NomeClasse}:",\n                \'    """${2:Descricao da classe.}"""\',\n                "",\n                "    def __init__(self, ${3:params}):",\n                \'        """Inicializa ${1:NomeClasse}."""\',\n                "        ${0:pass}"\n            ],\n            "description": "Classe Python com __init__ e docstring"\n        },\n        "Try except com logging": {\n            "prefix": "trylog",\n            "body": [\n                "try:",\n                "    ${1:pass}",\n                "except ${2:Exception} as erro:",\n                "    import logging",\n                \'    logging.error("Erro em ${3:contexto}: %s", erro)\',\n                "    ${0:raise}"\n            ],\n            "description": "Bloco try/except com logging de erro"\n        }\n    }\n    return snippets\n\n\ndef salvar_snippets(snippets, nome_arquivo="python.code-snippets"):\n    """Salva os snippets no arquivo especificado."""\n    pasta = ".vscode"\n    if not os.path.exists(pasta):\n        os.makedirs(pasta)\n    caminho = os.path.join(pasta, nome_arquivo)\n    with open(caminho, "w", encoding="utf-8") as arquivo:\n        json.dump(snippets, arquivo, indent=2, ensure_ascii=False)\n    print(f"Snippets salvos em: {caminho}")\n\n\nsnippets = gerar_snippets_python()\nsalvar_snippets(snippets)\nprint("Snippets gerados com sucesso!")\nprint(f"Total de snippets: {len(snippets)}")\n',
      hints: [
        'Cada snippet precisa de: "prefix" (o texto que dispara o snippet), "body" (lista de strings, cada string e uma linha), e "description"',
        'Use ${1:placeholder} para campos editaveis — o numero indica a ordem de navegacao com Tab, e o texto apos os dois pontos e o placeholder padrao',
        'O corpo do snippet e uma lista de strings Python — use os.path.join() para construir o caminho do arquivo e json.dump() para salvar',
      ],
    },
  ],
};
