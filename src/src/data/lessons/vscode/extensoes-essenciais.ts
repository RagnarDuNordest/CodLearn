import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'extensoes-essenciais',
  moduleId: 'vscode',
  title: 'Extensoes Essenciais',
  description: 'As extensoes mais importantes do VS Code: Python, GitLens, Prettier, ESLint, Thunder Client, Remote SSH e Error Lens. Como instalar e configurar cada uma',
  order: 1,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## Por que extensoes importam\n\nO VS Code e intencionalmente minimalista por padrao — a potencia vem das extensoes. Com as extensoes certas, ele se transforma em uma IDE completa para qualquer linguagem ou fluxo de trabalho.\n\n### Como instalar extensoes\n- `Ctrl+Shift+X` abre o painel de Extensions\n- Busque pelo nome ou pelo ID (formato `publisher.extensionname`)\n- Clique em Install\n- Pelo terminal: `code --install-extension publisher.extensionname`\n\n### As 7 extensoes essenciais\n\n**(1) Python** — `ms-python.python`\nSuporte completo para Python: IntelliSense, linting, formatacao, debugging, Jupyter notebooks e ambientes virtuais. Indispensavel para qualquer projeto Python.\n\n**(2) GitLens** — `eamodio.gitlens`\nSuperalimenta o Git integrado: mostra quem escreveu cada linha (inline blame), historico de arquivos, comparacao de branches e muito mais. Transforma o VS Code em uma ferramenta de revisao de codigo.\n\n**(3) Prettier** — `esbenp.prettier-vscode`\nFormatador de codigo opinativo para JavaScript, TypeScript, HTML, CSS, JSON e mais. Elimina debates sobre estilo de codigo — o Prettier decide e aplica automaticamente ao salvar.\n\n**(4) ESLint** — `dbaeumer.vscode-eslint`\nIntegra o linter ESLint diretamente no editor. Sublinha erros e avisos em tempo real enquanto voce digita, com sugestoes de correcao rapida.\n\n**(5) Thunder Client** — `rangav.vscode-thunder-client`\nCliente REST/GraphQL leve diretamente no VS Code — alternativa ao Postman. Teste APIs sem sair do editor.\n\n**(6) Remote - SSH** — `ms-vscode-remote.remote-ssh`\nEdite arquivos em servidores remotos como se fossem locais. Toda a extensibilidade do VS Code funciona sobre SSH.\n\n**(7) Error Lens** — `usernamehw.errorlens`\nExibe mensagens de erro e aviso inline, diretamente na linha onde ocorrem — sem precisar passar o mouse sobre o sublinhado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Instalar todas as extensoes essenciais de uma vez\ncode --install-extension ms-python.python\ncode --install-extension eamodio.gitlens\ncode --install-extension esbenp.prettier-vscode\ncode --install-extension dbaeumer.vscode-eslint\ncode --install-extension rangav.vscode-thunder-client\ncode --install-extension ms-vscode-remote.remote-ssh\ncode --install-extension usernamehw.errorlens\n\n# Ver extensoes instaladas\ncode --list-extensions\n\n# Ver extensoes instaladas com versao\ncode --list-extensions --show-versions\n\n# Desinstalar uma extensao\ncode --uninstall-extension publisher.extensionname',
        filename: 'instalar_extensoes.sh',
        description:
          'Script para instalar todas as extensoes essenciais de uma vez pelo terminal. Util para configurar um novo ambiente rapidamente ou para incluir em scripts de setup de ambiente de desenvolvimento.',
      },
    },
    {
      type: 'text',
      content:
        '## Configurando as extensoes\n\n### Prettier — formato ao salvar\nAdicione no seu `settings.json` (Ctrl+Shift+P > "Open User Settings JSON"):\n```json\n{\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.formatOnSave": true,\n  "[python]": {\n    "editor.defaultFormatter": "ms-python.python"\n  }\n}\n```\n\n### Python — ambiente virtual\nQuando voce abre um projeto Python, o VS Code detecta automaticamente o ambiente virtual (`.venv`, `venv`, `env`). Para selecionar manualmente: `Ctrl+Shift+P` > "Python: Select Interpreter".\n\n### GitLens — configuracoes recomendadas\nO GitLens tem muitas funcionalidades que podem deixar o editor carregado. Recomenda-se desabilitar o blame inline se ele distrair: Settings > GitLens > Views > Line Blame > desabilitar.\n\n### Error Lens — controle de verbosidade\nPor padrao o Error Lens mostra tudo. Para mostrar apenas erros (nao warnings): Settings > Error Lens > Enabled Diagnostic Levels > remova "warning" e "info".',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Extensions Packs: algumas extensoes sao pacotes que instalam multiplas extensoes de uma vez. Por exemplo, "Python Extension Pack" instala Python, Pylance, Python Indent e isort juntos. Procure por packs especificos para sua stack.',
    },
  ],
  challenges: [
    {
      id: 'vscode-ext-c1',
      title: 'Script de Setup de Ambiente',
      description:
        'Crie um script bash de setup que instala as 7 extensoes essenciais, verifica se cada instalacao foi bem-sucedida e exibe um relatorio final. O script deve usar o comando "code --list-extensions" para verificar quais extensoes estao instaladas apos o processo.',
      language: 'bash',
      starterCode:
        '#!/bin/bash\n# Script de setup: instala extensoes essenciais do VS Code\n# e verifica se foram instaladas corretamente\n\necho "=== Setup de Extensoes do VS Code ==="\necho ""\n\n# Lista de extensoes para instalar\n# Complete o array com todas as 7 extensoes\nEXTENSOES=(\n  "ms-python.python"\n  # adicione as outras 6 extensoes aqui\n)\n\n# Instale cada extensao e verifique\nfor extensao in "${EXTENSOES[@]}"; do\n  # Complete: instale a extensao e verifique se funcionou\n  echo "Instalando: $extensao"\ndone\n\necho ""\necho "=== Relatorio Final ==="\n# Complete: liste as extensoes instaladas\n',
      solution:
        '#!/bin/bash\n# Script de setup: instala extensoes essenciais do VS Code\n# e verifica se foram instaladas corretamente\n\necho "=== Setup de Extensoes do VS Code ==="\necho ""\n\n# Lista de extensoes para instalar\nEXTENSOES=(\n  "ms-python.python"\n  "eamodio.gitlens"\n  "esbenp.prettier-vscode"\n  "dbaeumer.vscode-eslint"\n  "rangav.vscode-thunder-client"\n  "ms-vscode-remote.remote-ssh"\n  "usernamehw.errorlens"\n)\n\nINSTALADAS=0\nFALHAS=0\n\n# Instale cada extensao e verifique\nfor extensao in "${EXTENSOES[@]}"; do\n  echo "Instalando: $extensao..."\n  if code --install-extension "$extensao" > /dev/null 2>&1; then\n    echo "  OK: $extensao instalada com sucesso"\n    INSTALADAS=$((INSTALADAS + 1))\n  else\n    echo "  ERRO: falha ao instalar $extensao"\n    FALHAS=$((FALHAS + 1))\n  fi\ndone\n\necho ""\necho "=== Relatorio Final ==="\nprintf "Instaladas com sucesso: %d\\n" "$INSTALADAS"\nprintf "Falhas: %d\\n" "$FALHAS"\necho ""\necho "Extensoes atualmente instaladas:"\ncode --list-extensions | sort\n',
      hints: [
        'Use um array bash com parenteses: EXTENSOES=("ext1" "ext2") e itere com for ext in "${EXTENSOES[@]}"',
        'O comando "code --install-extension" retorna codigo de saida 0 em sucesso — use "if command; then" para verificar',
        'Redirecione a saida do install para /dev/null com "> /dev/null 2>&1" para nao poluir o output e exibir sua propria mensagem',
      ],
    },
  ],
};
