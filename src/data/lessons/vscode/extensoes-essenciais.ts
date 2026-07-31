import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'extensoes-essenciais',
  moduleId: 'vscode',
  title: 'Extensoes Essenciais',
  description: 'As extensoes mais importantes do VS Code organizadas por categoria: Python, qualidade de codigo, Git, API, Docker, React e produtividade. Como instalar e usar cada uma.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que sao extensoes?**\n\nO VS Code e intencionalmente minimalista por padrao. As extensoes adicionam suporte a linguagens, ferramentas, temas e integracao com servicos externos. Com as extensoes certas, o VS Code vira uma IDE completa — mais leve e rapida que o IntelliJ, Eclipse ou PyCharm.',
    },
    {
      type: 'text',
      content: '## Como instalar extensoes\n\nVoce tem tres formas de instalar:\n\n**Pelo painel do VS Code:**\n1. Pressione `Ctrl+Shift+X` para abrir o painel de Extensions\n2. Digite o nome da extensao na caixa de busca\n3. Clique em **Install** no resultado correto (verifique o publisher/autor)\n\n**Pelo terminal (mais rapido para instalar varias de uma vez):**\n```bash\ncode --install-extension publisher.nome-da-extensao\n```\n\n**Pelo Marketplace:** Abra `extensions.marketplace.visualstudio.com`, encontre a extensao e clique em "Install" — o VS Code abre automaticamente.\n\n> **Dica:** Cada extensao tem um ID unico no formato `publisher.nome`. Use o ID para encontrar a extensao certa sem confundir com homonimas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Instalar todas as extensoes desta licao de uma vez\n# Cole este bloco no terminal e execute\n\n# Python e qualidade de codigo\ncode --install-extension ms-python.python\ncode --install-extension usernamehw.errorlens\ncode --install-extension dbaeumer.vscode-eslint\ncode --install-extension esbenp.prettier-vscode\n\n# Git\ncode --install-extension eamodio.gitlens\n\n# APIs e backend\ncode --install-extension rangav.vscode-thunder-client\n\n# Docker\ncode --install-extension ms-azuretools.vscode-docker\n\n# React e JavaScript\ncode --install-extension dsznajder.es7-react-js-snippets\ncode --install-extension formulahendry.auto-rename-tag\n\n# Produtividade\ncode --install-extension ms-vscode-remote.remote-ssh\n\n# Ver tudo que esta instalado\ncode --list-extensions --show-versions',
        filename: 'instalar_todas.sh',
        description: 'Script para instalar todas as extensoes desta licao de uma vez. Execute no terminal com o VS Code fechado ou aberto — funciona nos dois casos.',
      },
    },
    {
      type: 'text',
      content: '## Categoria 1: Python\n\n### Python — `ms-python.python` (Microsoft)\n\nA extensao oficial do Python. Sem ela, o VS Code nao entende nada de Python.\n\n**O que ela ativa:**\n- **IntelliSense:** autocomplete enquanto voce digita — sugere nomes de variaveis, funcoes e modulos\n- **Pylance (incluido):** analise de tipos em tempo real — sublinha erros de tipo antes de voce rodar\n- **Hover com informacoes:** passe o mouse em qualquer variavel ou funcao para ver o tipo e a documentacao\n- **Rodar arquivos:** botao ▶ no canto superior direito para executar o arquivo atual\n- **Selecionar interpretador:** `Ctrl+Shift+P` → "Python: Select Interpreter" — escolha o Python do ambiente virtual ou o global\n\n**Como usar o IntelliSense:**\nDigite o nome de qualquer objeto e pressione `.` (ponto). Uma lista aparece com todos os metodos e atributos disponiveis. Use as setas para navegar e Enter para completar.\n\n**Verificacao de tipos com Pylance:**\nSe voce declarar `nome = "Maria"` e depois tentar `nome + 10`, o Pylance sublinha a linha com vermelho imediatamente — sem precisar rodar o codigo. Passe o mouse para ver a explicacao do erro.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# O Pylance detecta erros de tipo antes de rodar\nnome = "Maria"\nidade = 30\n\n# ERRO detectado pelo Pylance (linha sublinhada em vermelho):\n# resultado = nome + idade\n# Operador "+" nao suportado para tipos "str" e "int"\n\n# CORRETO:\nresultado = f"{nome} tem {idade} anos"\n\n# Hover em qualquer variavel mostra o tipo inferido:\n# (variable) nome: str\n# (variable) idade: int\n# (variable) resultado: str',
        filename: 'pylance_tipos.py',
        description: 'O Pylance analisa os tipos e detecta incompatibilidades antes de voce rodar. O sublinhado aparece em tempo real conforme voce digita.',
      },
    },
    {
      type: 'text',
      content: '## Categoria 2: Qualidade de Codigo\n\n### Error Lens — `usernamehw.errorlens`\n\nSem esta extensao, os erros aparecem como um sublinhado discreto — voce precisa passar o mouse para ver a mensagem. Com o Error Lens, a mensagem aparece **diretamente na linha** em texto colorido.\n\n**Antes do Error Lens:**\n```\ncalculo = 10 / 0   ← linha com sublinhado vermelho\n```\n*(voce precisa passar o mouse para ver o que e o erro)*\n\n**Com Error Lens:**\n```\ncalculo = 10 / 0   ← ZeroDivisionError: division by zero\n```\n*(a mensagem aparece ao lado da linha automaticamente)*\n\n**Configuracao recomendada:**\nPara mostrar apenas erros (e nao todos os avisos):\n`Ctrl+,` → busque "errorlens" → em "Enabled Diagnostic Levels" remova "warning" e "info".',
    },
    {
      type: 'text',
      content: '### Prettier — `esbenp.prettier-vscode`\n\nPrettier e um formatador de codigo automatico. Ele nao analisa logica — so garante que o codigo fique visualmente organizado: indentacao, espacamentos, aspas, virgulas no lugar certo.\n\n**Linguagens suportadas:** JavaScript, TypeScript, HTML, CSS, JSON, Markdown e mais.\n\n**Como ativar a formatacao automatica ao salvar:**\n1. Pressione `Ctrl+,` para abrir as configuracoes\n2. Busque "format on save"\n3. Marque a caixa ✓\n\nOu adicione diretamente no `settings.json` (`Ctrl+Shift+P` → "Open User Settings JSON") com `"editor.defaultFormatter": "esbenp.prettier-vscode"` e `"editor.formatOnSave": true`.\n\n**Resultado:** Todo arquivo salvo com `Ctrl+S` fica organizado automaticamente — voce nunca mais precisa alinhar indentacao ou decidir se usa aspas simples ou duplas.',
    },
    {
      type: 'text',
      content: '### ESLint — `dbaeumer.vscode-eslint`\n\nEnquanto o Prettier cuida da aparencia, o ESLint cuida da **logica e das boas praticas** do JavaScript/TypeScript.\n\n**O que o ESLint detecta:**\n- Variaveis declaradas mas nunca usadas\n- Uso de `==` em vez de `===` (comparacao sem tipo)\n- Funcoes async sem await (possivel bug)\n- Importacoes nao utilizadas\n- E dezenas de outros problemas\n\n**Como funciona no VS Code:**\nOs problemas aparecem sublinhados (amarelo = aviso, vermelho = erro). Passe o mouse sobre o sublinhado para ver a explicacao e, em muitos casos, um botao "Quick Fix" para corrigir automaticamente.\n\n**Painel de problemas:**\nPressione `Ctrl+Shift+M` para abrir o painel que lista todos os erros e avisos do projeto inteiro. Clique em qualquer item para ir direto a linha.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// O ESLint detecta estes problemas em tempo real:\n\n// AVISO: variavel declarada mas nunca usada\nconst nome = "Maria"\n\n// ERRO: == em vez de === (comparacao sem tipo)\nif (idade == "30") {  // ESLint sublinha: use ===\n  console.log("trinta")\n}\n\n// ERRO: await em funcao nao-async\nfunction buscarDados() {\n  const dados = await fetch("/api")  // Error: await nao permitido aqui\n  return dados\n}\n\n// CORRETO:\nasync function buscarDadosCorreto() {\n  const dados = await fetch("/api")\n  return dados\n}',
        filename: 'eslint_exemplos.js',
        description: 'O ESLint sublinha estes problemas em tempo real, antes de voce rodar o codigo. Clicar com botao direito na linha sugere correcoes automaticas.',
      },
    },
    {
      type: 'text',
      content: '## Categoria 3: Git\n\n### GitLens — `eamodio.gitlens`\n\nO VS Code ja tem integracao basica com Git (Source Control panel). O GitLens adiciona camadas extras de informacao diretamente no editor.\n\n**Funcionalidade principal — Inline Blame:**\nApois instalar o GitLens, cada linha do codigo mostra discretamente quem a escreveu e quando:\n```\nconst taxa = 0.15   ← Maria Silva, 3 dias atras: "ajusta taxa de desconto"\n```\nPasse o mouse sobre o texto cinza para ver a mensagem de commit completa, o autor e a data exata.\n\n**File History (historico do arquivo):**\nClique com o botao direito em qualquer arquivo no Explorer → "Open File History". Uma lista aparece com todos os commits que modificaram aquele arquivo — clique em qualquer um para ver como o arquivo estava naquele momento.\n\n**Comparar branches:**\nNa barra lateral do GitLens voce pode comparar qualquer duas branches lado a lado — util antes de fazer um merge.\n\n**Configuracao:** Se o blame inline distrair, desative em:\n`Ctrl+Shift+P` → "GitLens: Toggle Line Blame"',
    },
    {
      type: 'text',
      content: '## Categoria 4: APIs e Backend\n\n### Thunder Client — `rangav.vscode-thunder-client`\n\nO Thunder Client e um cliente HTTP dentro do VS Code — voce testa APIs REST sem precisar abrir o Postman ou o navegador.\n\n**Como usar passo a passo:**\n1. Apos instalar, clique no icone de raio (⚡) na barra lateral esquerda\n2. Clique em **New Request**\n3. Selecione o metodo: GET, POST, PUT, DELETE, PATCH\n4. Digite a URL: ex `http://localhost:5000/api/usuarios`\n5. Para requisicoes POST/PUT, va na aba **Body** → selecione **JSON** → escreva o payload\n6. Clique em **Send**\n7. A resposta aparece ao lado: status HTTP, tempo de resposta, JSON formatado\n\n**Adicionar headers:**\nAba **Headers** → adicione `Content-Type: application/json` ou tokens de autenticacao: `Authorization: Bearer SEU_TOKEN`\n\n**Salvar requests:**\nCrie uma Collection (pasta) para organizar suas requests por projeto — voce pode reusar sem redigitar.\n\n**Variaveis de ambiente:**\nCrie environments com variaveis (ex: `{{base_url}}`) para alternar facilmente entre desenvolvimento e producao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Exemplo de request POST que voce faria no Thunder Client:\n// Metodo: POST\n// URL: http://localhost:5000/api/usuarios\n// Aba Body > JSON:\n{\n  "nome": "Maria Silva",\n  "email": "maria@example.com",\n  "senha": "minhasenha123"\n}\n\n// Headers necessarios:\n// Content-Type: application/json\n\n// Resposta esperada do servidor:\n{\n  "id": 42,\n  "nome": "Maria Silva",\n  "email": "maria@example.com",\n  "criado_em": "2026-07-31T10:00:00Z"\n}',
        filename: 'thunder_client_exemplo.js',
        description: 'Exemplo de como testar uma rota POST de criacao de usuario. O Thunder Client mostra a resposta formatada com destaque de sintaxe e o tempo de resposta em milissegundos.',
      },
    },
    {
      type: 'text',
      content: '## Categoria 5: Docker\n\n### Docker — `ms-azuretools.vscode-docker`\n\nA extensao oficial do Docker integra o gerenciamento de containers diretamente na interface do VS Code.\n\n**O que aparece na barra lateral (icone da baleia):**\n- **Containers:** lista todos os containers (rodando e parados). Clique com o botao direito para iniciar, parar, reiniciar, remover ou abrir o terminal dentro do container\n- **Images:** todas as imagens baixadas localmente. Clique com o botao direito para rodar, inspecionar ou deletar\n- **Volumes:** dados persistentes dos containers\n- **Networks:** redes Docker\n\n**Funcionalidades no editor:**\n- **Dockerfile:** highlight de sintaxe e autocomplete para os comandos (`FROM`, `RUN`, `COPY`, `CMD`, `EXPOSE`, `ENV`)\n- **docker-compose.yml:** validacao e autocomplete\n- **Ver logs em tempo real:** botao direito em um container rodando → "View Logs"\n\n**Fluxo tipico de uso:**\n1. Abra o painel Docker (barra lateral)\n2. Ve que o container do banco de dados esta parado\n3. Botao direito → Start\n4. Botao direito → View Logs para confirmar que iniciou corretamente\n5. Sem digitar um unico comando no terminal',
    },
    {
      type: 'text',
      content: '## Categoria 6: React e JavaScript\n\n### ES7+ React Snippets — `dsznajder.es7-react-js-snippets`\n\nSnippets sao atalhos de teclado que expandem para blocos de codigo prontos. Esta extensao traz os atalhos mais usados em React.\n\n**Como funciona:**\nDigite o atalho e pressione `Tab`. O codigo completo aparece com o cursor posicionado onde voce precisa digitar primeiro.\n\n**Os atalhos mais importantes:**\n- `rafce` + Tab → componente funcional com export default\n- `useState` + Tab → `const [state, setState] = useState(initialState)`\n- `useEffect` + Tab → `useEffect(() => { }, [])` com estrutura de cleanup\n- `useRef` + Tab → `const ref = useRef(null)`\n- `imp` + Tab → `import ... from ...`\n- `imr` + Tab → `import React from "react"`\n- `clg` + Tab → `console.log()`\n\n**Dica:** O nome do arquivo vira o nome do componente automaticamente. Crie `Botao.jsx`, escreva `rafce` + Tab, e o componente ja se chama `Botao`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// O que o atalho "rafce" + Tab gera automaticamente:\nconst NomeDoComponente = () => {\n  return (\n    <div>\n      NomeDoComponente\n    </div>\n  );\n};\n\nexport default NomeDoComponente;\n\n// O que "useState" + Tab gera:\nconst [state, setState] = useState(initialState);\n\n// O que "useEffect" + Tab gera:\nuseEffect(() => {\n  // efeito aqui\n\n  return () => {\n    // cleanup aqui\n  };\n}, []);',
        filename: 'snippets_exemplo.jsx',
        description: 'Codigo gerado pelos principais atalhos da extensao ES7+ React Snippets. Voce digita o atalho, pressiona Tab, e o bloco completo aparece com o cursor ja posicionado para editar.',
      },
    },
    {
      type: 'text',
      content: '### Auto Rename Tag — `formulahendry.auto-rename-tag`\n\nUm problema classico no HTML e JSX: voce renomeia a tag de abertura e esquece de renomear a de fechamento.\n\n**Sem a extensao:**\n```html\n<section>         ← voce muda para <article>\n  <p>Conteudo</p>\n</section>        ← esqueceu de mudar — erro no HTML\n```\n\n**Com Auto Rename Tag:**\nQuando voce edita `<section>` para `<article>`, o `</section>` muda automaticamente para `</article>` ao mesmo tempo.\n\nFunciona com HTML, JSX, TSX, XML e qualquer formato com tags pareadas.',
    },
    {
      type: 'text',
      content: '## Categoria 7: Trabalho Remoto\n\n### Remote - SSH — `ms-vscode-remote.remote-ssh`\n\nPermite editar arquivos em um servidor remoto (VPS, AWS EC2, servidor da empresa) como se fossem arquivos locais.\n\n**Como conectar:**\n1. `Ctrl+Shift+P` → "Remote-SSH: Connect to Host"\n2. Digite o endereco: `usuario@ip-do-servidor`\n3. O VS Code abre uma nova janela conectada ao servidor\n4. Agora todas as extensoes, terminal e debugger funcionam no servidor\n\n**Por que isso e poderoso:**\n- Voce programa com toda a confortabilidade do seu VS Code local\n- O codigo roda no servidor — nao e preciso fazer upload de arquivos\n- O terminal integrado ja conecta direto ao servidor\n- Voce pode instalar extensoes "do lado do servidor" para ter IntelliSense do ambiente de producao\n\n**Requisito:** SSH configurado com chave publica/privada (ver modulo Linux).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Perfil de extensoes por area de atuacao:**\n\n**Desenvolvendo em Python:** Python + Error Lens + GitLens + Prettier + Thunder Client\n\n**Desenvolvendo em JavaScript/React:** ESLint + Prettier + ES7+ Snippets + Auto Rename Tag + GitLens\n\n**Trabalhando com Docker:** Docker + Thunder Client + GitLens\n\n**Trabalho em servidor remoto:** Remote SSH + Python/JS (instalados no servidor)\n\nNao e necessario instalar TODAS as extensoes. Instale o que faz sentido para o projeto atual — muitas extensoes pesam na inicializacao do VS Code.',
    },
    {
      type: 'text',
      content: '## Gerenciando extensoes\n\n**Desabilitar sem desinstalar:**\nAs vezes uma extensao e util em alguns projetos mas nao em outros. Clique com o botao direito na extensao → "Disable (Workspace)" para desabilitar apenas na pasta atual.\n\n**Sincronizar extensoes entre computadores:**\nVa em `Ctrl+Shift+P` → "Turn On Settings Sync" e faca login com sua conta do GitHub ou Microsoft. Extensoes, configuracoes e atalhos sincronizam automaticamente entre todos os seus computadores.\n\n**Atualizar extensoes:**\nO VS Code atualiza automaticamente por padrao. Para checar manualmente: `Ctrl+Shift+X` → clique nos tres pontinhos (...) → "Check for Extension Updates".\n\n**Ver o que esta consumindo recursos:**\n`Ctrl+Shift+P` → "Developer: Show Running Extensions" — mostra o tempo de ativacao de cada extensao. Se alguma estiver lenta, voce pode desabila-la.',
    },
  ],
  challenges: [
    {
      id: 'vscode-ext-c1',
      title: 'Script de Setup de Ambiente',
      description:
        'Crie um script bash completo que instala todas as extensoes desta licao, verifica se cada instalacao foi bem-sucedida e exibe um relatorio final organizado por categoria.\n\nO script deve:\n1. Definir um array com todas as extensoes (pelo menos 8)\n2. Tentar instalar cada uma e verificar se deu certo\n3. Contar quantas foram instaladas com sucesso e quantas falharam\n4. Exibir o relatorio final com a lista de extensoes instaladas',
      language: 'bash',
      starterCode:
        '#!/bin/bash\necho "=== Setup de Extensoes do VS Code ==="\necho ""\n\n# Define as extensoes por categoria\nPYTHON_EXTS=(\n  "ms-python.python"\n  "usernamehw.errorlens"\n)\n\nCODIGO_EXTS=(\n  # adicione ESLint e Prettier aqui\n)\n\nOUTRAS_EXTS=(\n  # adicione GitLens, Thunder Client, Docker, ES7+ Snippets, Auto Rename Tag\n)\n\n# Une todos os arrays\nTODAS=("${PYTHON_EXTS[@]}" "${CODIGO_EXTS[@]}" "${OUTRAS_EXTS[@]}")\n\nINSTALADAS=0\nFALHAS=0\n\nfor ext in "${TODAS[@]}"; do\n  echo "Instalando: $ext..."\n  # instale e verifique o resultado\ndone\n\necho ""\necho "=== Relatorio Final ==="\n# exiba o relatorio\n',
      solution:
        '#!/bin/bash\necho "=== Setup de Extensoes do VS Code ==="\necho ""\n\nPYTHON_EXTS=(\n  "ms-python.python"\n  "usernamehw.errorlens"\n)\n\nCODIGO_EXTS=(\n  "dbaeumer.vscode-eslint"\n  "esbenp.prettier-vscode"\n)\n\nOUTRAS_EXTS=(\n  "eamodio.gitlens"\n  "rangav.vscode-thunder-client"\n  "ms-azuretools.vscode-docker"\n  "dsznajder.es7-react-js-snippets"\n  "formulahendry.auto-rename-tag"\n)\n\nTODAS=("${PYTHON_EXTS[@]}" "${CODIGO_EXTS[@]}" "${OUTRAS_EXTS[@]}")\n\nINSTALADAS=0\nFALHAS=0\n\nfor ext in "${TODAS[@]}"; do\n  echo "Instalando: $ext..."\n  if code --install-extension "$ext" > /dev/null 2>&1; then\n    echo "  ✓ Instalada: $ext"\n    INSTALADAS=$((INSTALADAS + 1))\n  else\n    echo "  ✗ Falhou: $ext"\n    FALHAS=$((FALHAS + 1))\n  fi\ndone\n\necho ""\necho "=== Relatorio Final ==="\nprintf "Instaladas com sucesso: %d\\n" "$INSTALADAS"\nprintf "Falhas: %d\\n" "$FALHAS"\necho ""\necho "Extensoes instaladas:"\ncode --list-extensions | sort\n',
      hints: [
        'Use "${ARRAY[@]}" com aspas duplas para preservar elementos com espacos nos arrays bash.',
        'O comando "code --install-extension" retorna codigo de saida 0 em sucesso — use "if code ...; then" para checar.',
        'Redirecione stdout e stderr para /dev/null com "> /dev/null 2>&1" para exibir apenas suas proprias mensagens.',
        'Para unir dois arrays: TOTAL=("${ARRAY1[@]}" "${ARRAY2[@]}")',
      ],
    },
    {
      id: 'vscode-ext-c2',
      title: 'Configurar settings.json',
      description:
        'Escreva o conteudo de um arquivo settings.json do VS Code que configure:\n1. Prettier como formatador padrao para todos os arquivos\n2. Formatacao automatica ao salvar\n3. Python como formatador especifico para arquivos .py\n4. Tamanho de tab de 2 espacos\n5. Mostrar ruler (linha guia) na coluna 80 (limite comum de caracteres por linha)\n6. Error Lens mostrando apenas erros, sem warnings',
      language: 'javascript',
      starterCode: '// Escreva as configuracoes do settings.json\n// (este desafio usa JavaScript para simular o formato JSON)\nconst settings = {\n  // Configure o Prettier, formatOnSave, Python, tabSize, ruler e errorLens\n}',
      solution:
        'const settings = {\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "editor.formatOnSave": true,\n  "[python]": {\n    "editor.defaultFormatter": "ms-python.python"\n  },\n  "editor.tabSize": 2,\n  "editor.rulers": [80],\n  "errorLens.enabledDiagnosticLevels": ["error"]\n}',
      hints: [
        'O settings.json usa formato JSON — sem virgula no ultimo item de cada objeto.',
        'Para configurar um formatador especifico por linguagem, use a chave "[nome-da-linguagem]": { ... }',
        'O ruler e um array: "editor.rulers": [80] — voce pode adicionar mais colunas: [80, 120]',
        'A chave do Error Lens para filtrar niveis e "errorLens.enabledDiagnosticLevels" com um array de strings.',
      ],
    },
  ],
};
