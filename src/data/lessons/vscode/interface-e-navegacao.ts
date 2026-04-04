import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'interface-e-navegacao',
  moduleId: 'vscode',
  title: 'Interface e Navegacao',
  description: 'Conheca o layout do VS Code, a paleta de comandos, o explorador de arquivos, abas e split editor para navegar com eficiencia',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## A Interface do VS Code\n\nO Visual Studio Code e dividido em cinco areas principais que voce precisa dominar para trabalhar com produtividade:\n\n**(1) Activity Bar (barra lateral esquerda)**\nIcones para alternar entre Explorer, Search, Source Control, Run & Debug e Extensions. Voce pode clicar com o botao direito para ocultar itens e reorganizar a ordem.\n\n**(2) Side Bar**\nExibe o painel correspondente ao icone selecionado na Activity Bar. O Explorer mostra a arvore de arquivos do projeto.\n\n**(3) Editor Groups**\nArea central onde voce edita arquivos. Suporta multiplas abas e pode ser dividida verticalmente ou horizontalmente (split editor).\n\n**(4) Panel (parte inferior)**\nContem o Terminal integrado, Problems, Output e Debug Console. Pode ser movido para a lateral.\n\n**(5) Status Bar (rodape)**\nExibe informacoes contextuais: branch Git atual, erros e avisos, linguagem do arquivo, encoding, indentacao e acoes rapidas.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Paleta de Comandos (Ctrl+Shift+P no Windows/Linux, Cmd+Shift+P no Mac): e o atalho mais importante do VS Code. Com ela voce acessa QUALQUER funcionalidade sem memorizar menus — basta digitar parte do nome do comando.',
    },
    {
      type: 'text',
      content:
        '## Navegacao Essencial\n\n### Abertura rapida de arquivos\n`Ctrl+P` abre o Quick Open — comece a digitar o nome do arquivo e o VS Code filtra em tempo real. Suporta busca fuzzy: digitar "mnc" encontra "MeuNomeDeClasse.ts".\n\n### Navegacao pelo codigo\n- `Ctrl+G` — ir para linha especifica\n- `Ctrl+Shift+O` — listar e pular para simbolos (funcoes, classes) no arquivo atual\n- `Ctrl+T` — buscar simbolos em todo o workspace\n- `F12` — ir para definicao\n- `Alt+Left / Alt+Right` — navegar no historico de posicoes (como voltar/avancar no browser)\n\n### Split Editor\nDivida o editor para ver dois arquivos lado a lado:\n- `Ctrl+\\` — dividir editor verticalmente\n- Menu View > Editor Layout para layouts avancados (grade, linhas)\n- Arraste uma aba para a borda para criar um novo grupo\n\n### Explorer e atalhos de arquivo\n- `Ctrl+Shift+E` — focar no Explorer\n- No Explorer: `N` para novo arquivo, `Shift+N` para nova pasta\n- `Ctrl+W` — fechar aba atual\n- `Ctrl+Tab` — alternar entre abas abertas recentes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Abrindo o VS Code pelo terminal\ncode .                    # Abre o diretorio atual como workspace\ncode arquivo.py           # Abre um arquivo especifico\ncode -r .                 # Reutiliza a janela existente (reuse)\ncode --diff a.py b.py     # Abre diff entre dois arquivos\n\n# Atalhos de navegacao essenciais\n# Ctrl+P          — Quick Open (abrir arquivo por nome)\n# Ctrl+Shift+P    — Paleta de Comandos\n# Ctrl+`          — Abrir/focar terminal integrado\n# Ctrl+B          — Mostrar/ocultar Side Bar\n# Ctrl+J          — Mostrar/ocultar Panel inferior\n# Ctrl+Shift+F    — Busca em todos os arquivos\n# Ctrl+\\          — Dividir editor\n# Ctrl+1/2/3      — Focar no grupo de editor 1, 2 ou 3\n# Ctrl+K Z        — Zen Mode (tela cheia sem distractors)',
        filename: 'navegacao_vscode.sh',
        description:
          'Comandos de terminal para abrir o VS Code e os atalhos de teclado mais usados para navegacao. Memorize especialmente Ctrl+P e Ctrl+Shift+P — eles substituem a maioria dos cliques no menu.',
      },
    },
  ],
  challenges: [
    {
      id: 'vscode-nav-c1',
      title: 'Explorando a Paleta de Comandos',
      description:
        'Escreva um script bash que documenta os 10 atalhos de teclado mais importantes do VS Code para navegacao. O script deve imprimir cada atalho com sua descricao formatada de forma legivel. Inclua os atalhos para: abrir arquivo, paleta de comandos, terminal, split editor, busca global, ir para definicao, fechar aba, zen mode, side bar e panel.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# Script que lista os atalhos essenciais de navegacao do VS Code\n# Complete a lista com todos os 10 atalhos pedidos\n\necho "=== Atalhos de Navegacao do VS Code ==="\necho ""\n\n# Formato: printf "%-20s %s\\n" "ATALHO" "DESCRICAO"\n# Exemplo:\nprintf "%-20s %s\\n" "Ctrl+P" "Quick Open - abrir arquivo por nome"\n\n# Adicione os 9 atalhos restantes abaixo:\n',
      solution:
        '#!/bin/bash\n# Script que lista os atalhos essenciais de navegacao do VS Code\n\necho "=== Atalhos de Navegacao do VS Code ==="\necho ""\n\nprintf "%-25s %s\\n" "ATALHO" "DESCRICAO"\nprintf "%-25s %s\\n" "-------" "---------"\nprintf "%-25s %s\\n" "Ctrl+P" "Quick Open - abrir arquivo por nome"\nprintf "%-25s %s\\n" "Ctrl+Shift+P" "Paleta de Comandos - acesso a tudo"\nprintf "%-25s %s\\n" "Ctrl+backtick" "Abrir/focar terminal integrado"\nprintf "%-25s %s\\n" "Ctrl+backslash" "Dividir editor (split)"\nprintf "%-25s %s\\n" "Ctrl+Shift+F" "Busca global em todos os arquivos"\nprintf "%-25s %s\\n" "F12" "Ir para definicao do simbolo"\nprintf "%-25s %s\\n" "Ctrl+W" "Fechar aba atual"\nprintf "%-25s %s\\n" "Ctrl+K Z" "Zen Mode - foco total"\nprintf "%-25s %s\\n" "Ctrl+B" "Mostrar/ocultar Side Bar"\nprintf "%-25s %s\\n" "Ctrl+J" "Mostrar/ocultar Panel inferior"\n\necho ""\necho "Dica: Ctrl+Shift+P e o atalho mais importante!"\n',
      hints: [
        'Use printf com formatacao "%-25s %s\\n" para alinhar as colunas de atalho e descricao',
        'O backtick (`) e o caractere de acento grave — no bash use aspas simples para incluir ele no texto',
        'Adicione um cabecalho com echo e uma linha separadora com printf para deixar a saida mais legivel',
      ],
    },
  ],
};
