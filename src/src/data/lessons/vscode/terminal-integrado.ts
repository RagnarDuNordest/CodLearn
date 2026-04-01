import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'terminal-integrado',
  moduleId: 'vscode',
  title: 'Terminal Integrado',
  description: 'Domine o terminal integrado do VS Code: multiplos terminais, dividir terminal, tarefas com tasks.json, painel de problemas e output',
  order: 4,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## Terminal Integrado: seu workspace centralizado\n\nO terminal integrado do VS Code elimina a necessidade de alternar entre editor e terminal externo. Ele abre automaticamente na raiz do workspace e suporta multiplas instancias simultaneas.\n\n### Atalhos essenciais do terminal\n\n- `` Ctrl+` `` — abrir/focar o terminal\n- `Ctrl+Shift+` `` ` `` — criar novo terminal\n- `Ctrl+Shift+5` — dividir terminal (split) horizontalmente\n- `Alt+Left/Right` — navegar entre terminais divididos\n- `Ctrl+Shift+[` / `]` — navegar entre terminais na lista\n- `Ctrl+C` — interromper processo em execucao\n- `Ctrl+L` — limpar terminal (ou execute `clear`)\n\n### Gerenciamento de multiplos terminais\nVoce pode ter varios terminais abertos simultaneamente — um para o servidor, um para testes, um para git. Na dropdown no topo do painel Terminal voce ve e alterna entre eles. Renomeie terminais clicando com o botao direito > Rename para organizar.\n\n### Selecionar shell\nVS Code usa o shell padrao do sistema operacional, mas voce pode trocar: clique na seta ao lado do "+" no terminal > selecione o shell (bash, zsh, PowerShell, Command Prompt). Para definir permanentemente: Settings > "terminal.integrated.defaultProfile".\n\n### Dividir terminal\nUse o icone de split (ou Ctrl+Shift+5) para ver dois terminais lado a lado no mesmo painel. Util para rodar um servidor em um lado e executar comandos no outro.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Arquivo: .vscode/tasks.json\n// Define tarefas automatizadas que podem ser executadas com Ctrl+Shift+B\n{\n  "version": "2.0.0",\n  "tasks": [\n    {\n      "label": "Executar Python",\n      "type": "shell",\n      "command": "python",\n      "args": ["${file}"],\n      "group": {\n        "kind": "build",\n        "isDefault": true\n      },\n      "presentation": {\n        "reveal": "always",\n        "panel": "new"\n      }\n    },\n    {\n      "label": "Rodar Testes",\n      "type": "shell",\n      "command": "python",\n      "args": ["-m", "pytest", "-v", "--tb=short"],\n      "group": "test",\n      "presentation": {\n        "reveal": "always",\n        "panel": "shared"\n      }\n    },\n    {\n      "label": "Instalar Dependencias",\n      "type": "shell",\n      "command": "pip",\n      "args": ["install", "-r", "requirements.txt"],\n      "presentation": {\n        "reveal": "always",\n        "panel": "shared"\n      }\n    },\n    {\n      "label": "Lint com Flake8",\n      "type": "shell",\n      "command": "flake8",\n      "args": [".", "--max-line-length=100"],\n      "problemMatcher": "$flake8",\n      "group": "build"\n    }\n  ]\n}',
        filename: '.vscode/tasks.json',
        description:
          'Arquivo tasks.json com 4 tarefas: executar o arquivo Python atual, rodar testes com pytest, instalar dependencias e lint com flake8. A tarefa marcada como "isDefault": true e executada com Ctrl+Shift+B. Use Ctrl+Shift+P > "Tasks: Run Task" para ver todas as tarefas.',
      },
    },
    {
      type: 'text',
      content:
        '## Paineis: Problems, Output e Debug Console\n\n### Painel Problems\nLista todos os erros e avisos do projeto em um lugar so. Clique em qualquer item para ir diretamente a linha com o problema. Filtros permitem ver apenas erros, apenas avisos, ou filtrar por arquivo.\n\nO painel Problems e alimentado por:\n- Extensoes de linting (ESLint, Pylint, flake8)\n- TypeScript language server\n- Qualquer extensao que usa a API de diagnostics do VS Code\n\n### Painel Output\nMostra logs internos das extensoes. Util para diagnosticar problemas com extensoes que nao estao funcionando — selecione a extensao na dropdown e veja o log.\n\n### Painel Terminal vs Debug Console\n- **Terminal**: execucao normal de comandos e programas\n- **Debug Console**: disponivel apenas durante uma sessao de debug, permite executar expressoes no contexto do programa pausado\n\n### Variaveis de ambiente no terminal\nO terminal integrado herda as variaveis de ambiente do processo do VS Code. Para adicionar variaveis especificas ao workspace: `terminal.integrated.env.linux/osx/windows` no settings.json:\n```json\n{\n  "terminal.integrated.env.linux": {\n    "PYTHONPATH": "${workspaceFolder}/src",\n    "DATABASE_URL": "sqlite:///dev.db"\n  }\n}\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Clique em um nome de arquivo no output do terminal (ex: um traceback do Python) com Ctrl+Click para abrir o arquivo diretamente na linha correta. O VS Code detecta automaticamente referencias a arquivos e linhas no formato "arquivo.py:42".',
    },
  ],
  challenges: [
    {
      id: 'vscode-terminal-c1',
      title: 'Criando um tasks.json Completo',
      description:
        'Escreva o conteudo de um arquivo tasks.json para um projeto Python que inclui 4 tarefas: (1) executar o arquivo atual, (2) rodar todos os testes com pytest, (3) formatar o codigo com black e (4) verificar tipos com mypy. O arquivo deve ser JSON valido. Use uma string Python para representar o conteudo do arquivo.',
      language: 'python',
      starterCode:
        '# Gere o conteudo do arquivo .vscode/tasks.json para um projeto Python\n# com as 4 tarefas descritas\n\nimport json\n\ndef criar_tasks_json():\n    """Retorna o dicionario que representa o tasks.json."""\n    tasks_config = {\n        "version": "2.0.0",\n        "tasks": [\n            # Tarefa 1: executar arquivo Python atual\n            # Tarefa 2: rodar testes com pytest\n            # Tarefa 3: formatar com black\n            # Tarefa 4: verificar tipos com mypy\n        ]\n    }\n    return tasks_config\n\nconfig = criar_tasks_json()\nprint(json.dumps(config, indent=2, ensure_ascii=False))\n',
      solution:
        '# Gera o conteudo do arquivo .vscode/tasks.json para um projeto Python\n\nimport json\n\ndef criar_tasks_json():\n    """Retorna o dicionario que representa o tasks.json."""\n    tasks_config = {\n        "version": "2.0.0",\n        "tasks": [\n            {\n                "label": "Python: Executar arquivo atual",\n                "type": "shell",\n                "command": "python",\n                "args": ["${file}"],\n                "group": {\n                    "kind": "build",\n                    "isDefault": True\n                },\n                "presentation": {\n                    "reveal": "always",\n                    "panel": "new"\n                }\n            },\n            {\n                "label": "Python: Rodar testes (pytest)",\n                "type": "shell",\n                "command": "python",\n                "args": ["-m", "pytest", "-v", "--tb=short"],\n                "group": "test",\n                "presentation": {\n                    "reveal": "always",\n                    "panel": "shared"\n                }\n            },\n            {\n                "label": "Python: Formatar com Black",\n                "type": "shell",\n                "command": "black",\n                "args": ["."],\n                "presentation": {\n                    "reveal": "always",\n                    "panel": "shared"\n                }\n            },\n            {\n                "label": "Python: Verificar tipos (mypy)",\n                "type": "shell",\n                "command": "mypy",\n                "args": [".", "--ignore-missing-imports"],\n                "presentation": {\n                    "reveal": "always",\n                    "panel": "shared"\n                }\n            }\n        ]\n    }\n    return tasks_config\n\nconfig = criar_tasks_json()\nprint(json.dumps(config, indent=2, ensure_ascii=False))\n',
      hints: [
        'Cada tarefa precisa de pelo menos: "label" (nome), "type" ("shell"), "command" (executavel) e "args" (lista de argumentos)',
        'Para executar o arquivo atual do editor use "${file}" nos args — o VS Code substitui pela path do arquivo aberto',
        'A tarefa padrao do Ctrl+Shift+B precisa de "group": {"kind": "build", "isDefault": true} — as outras podem usar apenas "group": "test"',
      ],
    },
  ],
};
