import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'navegacao-e-arquivos',
  moduleId: 'linux',
  title: 'Navegacao e Arquivos',
  description:
    'Aprenda a navegar pelo sistema de arquivos, criar pastas e arquivos, copiar, mover e remover itens usando o terminal.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'O sistema de arquivos do Linux e como um armario gigante com pastas dentro de pastas. Para encontrar o que voce precisa, e so saber o caminho certo — e vamos aprender exatamente isso agora!\n\nNo Linux, tudo e organizado em uma arvore de diretorios (pastas) que comeca na raiz, representada por `/`. Diferente do Windows, que usa letras como `C:\\`, no Linux existe um unico ponto de partida para todo o sistema de arquivos.\n\nAntes de comecar a navegar, e importante entender dois conceitos:\n\n- **Caminho absoluto**: comeca sempre com `/` e descreve o caminho completo desde a raiz. Exemplo: `/home/usuario/documentos`\n- **Caminho relativo**: parte do diretorio onde voce esta atualmente. Exemplo: se voce esta em `/home/usuario`, pode acessar `documentos` diretamente.\n\nAlguns atalhos uteis:\n- `~` (til) — Representa o diretorio home do usuario atual\n- `..` (dois pontos) — Diretorio pai (um nivel acima)\n- `.` (um ponto) — Diretorio atual',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Saber em qual diretorio voce esta (Print Working Directory)\npwd\n\n# Listar arquivos e pastas do diretorio atual\nls\n\n# Listar com detalhes (permissoes, tamanho, data)\nls -l\n\n# Listar incluindo arquivos ocultos (comecam com .)\nls -a\n\n# Combinar opcoes: detalhes + ocultos\nls -la\n\n# Navegar para outro diretorio\ncd /home\ncd documentos      # caminho relativo\ncd ~               # ir para o home\ncd ..              # voltar um nivel\ncd ../..           # voltar dois niveis',
        filename: 'navegacao.sh',
        description:
          'Comandos fundamentais para navegar: pwd mostra onde voce esta, ls lista o conteudo e cd muda de diretorio.',
      },
    },
    {
      type: 'text',
      content:
        '## Criando e Organizando Arquivos\n\nAgora que voce sabe navegar, vamos aprender a criar e organizar arquivos e pastas. Esses sao comandos que voce usara diariamente:\n\n- **mkdir** — Cria um novo diretorio (pasta)\n- **touch** — Cria um arquivo vazio ou atualiza a data de modificacao de um existente\n- **cp** — Copia arquivos ou diretorios\n- **mv** — Move ou renomeia arquivos e diretorios\n- **rm** — Remove (apaga) arquivos\n- **rmdir** — Remove diretorios vazios',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Criar um diretorio\nmkdir meu-projeto\n\n# Criar diretorios aninhados de uma vez\nmkdir -p meu-projeto/src/components\n\n# Criar um arquivo vazio\ntouch arquivo.txt\ntouch meu-projeto/README.md\n\n# Copiar um arquivo\ncp arquivo.txt copia.txt\n\n# Copiar um diretorio inteiro (precisa do -r de recursivo)\ncp -r meu-projeto meu-projeto-backup\n\n# Mover um arquivo para outra pasta\nmv arquivo.txt meu-projeto/\n\n# Renomear um arquivo (mover para o mesmo lugar com nome diferente)\nmv copia.txt arquivo-renomeado.txt\n\n# Remover um arquivo\nrm arquivo-renomeado.txt\n\n# Remover um diretorio e todo seu conteudo\nrm -r meu-projeto-backup\n\n# Remover forcadamente (sem pedir confirmacao)\nrm -rf pasta-temporaria',
        filename: 'arquivos.sh',
        description:
          'Comandos para criar, copiar, mover e remover arquivos e diretorios no terminal.',
      },
    },
    {
      type: 'callout',
      content:
        'Cuidado com o comando rm -rf! Ele apaga tudo sem pedir confirmacao e sem enviar para a lixeira. Diferente da interface grafica, no terminal nao existe "desfazer". Sempre confira o caminho antes de executar o comando.',
      calloutType: 'warning',
    },
    {
      type: 'text',
      content:
        '## Lendo e Inspecionando Arquivos\n\nAlm de criar e mover arquivos, voce frequentemente precisa **ler** o conteudo deles. Os principais comandos sao:\n\n- **`cat arquivo`** — Exibe todo o conteudo de uma vez\n- **`head -n N arquivo`** — Exibe as primeiras N linhas (padrao: 10)\n- **`tail -n N arquivo`** — Exibe as ultimas N linhas\n- **`less arquivo`** — Abre o arquivo paginado (use `/termo` para buscar, `q` para sair)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'ler-inspecionar.sh',
        code: '# Ver conteudo de um arquivo\ncat README.md\n\n# Ver com numeros de linha\ncat -n script.py\n\n# Ver apenas as primeiras 10 linhas\nhead README.md\n\n# Ver as primeiras 3 linhas\nhead -n 3 README.md\n\n# Ver as ultimas 5 linhas\ntail -n 5 log.txt\n\n# Acompanhar arquivo de log em tempo real\ntail -f /var/log/syslog\n\n# Abrir paginado (q para sair, /termo para buscar)\nless README.md\n\n# Contar linhas de um arquivo\nwc -l script.py',
        description:
          'Comandos para ler arquivos: cat exibe tudo, head/tail mostram extremidades, less pagina.',
      },
    },
    {
      type: 'text',
      content:
        '## Buscando Arquivos e Conteudo\n\nDois comandos essenciais para encontrar coisas no terminal:\n\n- **`find diretorio -name "padrao"`** — Busca arquivos por nome (aceita wildcards como `*.py`)\n- **`grep "padrao" arquivo`** — Busca linhas que contem o padrao dentro de um arquivo\n  - **`grep -r "padrao" pasta/`** — Busca recursivamente dentro de uma pasta\n  - **`grep -i "padrao" arquivo`** — Busca ignorando maiusculas/minusculas\n  - **`grep -n "padrao" arquivo`** — Mostra o numero da linha de cada resultado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'buscar.sh',
        code: '# Encontrar todos os arquivos .py no diretorio atual\nfind . -name "*.py"\n\n# Encontrar um arquivo especifico\nfind /home -name "notas.txt"\n\n# Encontrar apenas diretorios\nfind . -type d -name "src"\n\n# Buscar texto dentro de um arquivo\ngrep "erro" log.txt\n\n# Buscar ignorando maiusculas\ngrep -i "erro" log.txt\n\n# Buscar com numero de linha\ngrep -n "def " meu_script.py\n\n# Buscar recursivamente em toda a pasta\ngrep -r "import" ./src/\n\n# Combinar find com grep (encontrar arquivos que contem um texto)\ngrep -r "TODO" ./src/ --include="*.js"',
        description:
          'find busca arquivos por nome, grep busca texto dentro de arquivos.',
      },
    },
  ],
  challenges: [
    {
      id: 'na-c1',
      title: 'Criando a estrutura de um projeto',
      description:
        'Crie a seguinte estrutura de pastas: um diretorio chamado "projeto" com dois subdiretorios dentro dele: "src" e "docs". Depois, crie um arquivo chamado "index.html" dentro de "src" e um arquivo "notas.txt" dentro de "docs".',
      language: 'bash',
      starterCode: '# Crie o diretorio "projeto" com subdiretorios "src" e "docs"\n\n# Crie o arquivo "index.html" dentro de "src"\n\n# Crie o arquivo "notas.txt" dentro de "docs"\n',
      solution: 'mkdir -p projeto/src projeto/docs\ntouch projeto/src/index.html\ntouch projeto/docs/notas.txt',
      hints: [
        'Use mkdir -p para criar diretorios aninhados de uma vez.',
        'Voce pode criar multiplos diretorios em um unico comando: mkdir -p projeto/src projeto/docs.',
        'Use touch com o caminho completo para criar arquivos dentro de pastas: touch projeto/src/index.html.',
      ],
    },
    {
      id: 'na-c2',
      title: 'Organizando arquivos',
      description:
        'Voce tem um arquivo chamado "foto.jpg" no diretorio atual. Crie uma pasta chamada "imagens", mova o arquivo para dentro dela, e depois faca uma copia chamada "foto-backup.jpg" dentro da mesma pasta.',
      language: 'bash',
      starterCode: '# Suponha que "foto.jpg" ja existe no diretorio atual\n\n# 1. Crie a pasta "imagens"\n\n# 2. Mova "foto.jpg" para dentro de "imagens"\n\n# 3. Faca uma copia chamada "foto-backup.jpg" dentro de "imagens"\n',
      solution: 'mkdir imagens\nmv foto.jpg imagens/\ncp imagens/foto.jpg imagens/foto-backup.jpg',
      hints: [
        'Use mkdir para criar a pasta.',
        'Use mv arquivo destino/ para mover o arquivo.',
        'Use cp origem destino para copiar. O arquivo agora esta em imagens/foto.jpg.',
      ],
    },
    {
      id: 'na-c3',
      title: 'Navegacao com caminhos',
      description:
        'Partindo do diretorio /home/usuario/projetos/web, escreva os comandos para: voltar ao diretorio "projetos", listar seu conteudo com detalhes, e depois ir para o diretorio home usando o atalho ~.',
      language: 'bash',
      starterCode: '# Voce esta em /home/usuario/projetos/web\n\n# 1. Volte para o diretorio "projetos" (um nivel acima)\n\n# 2. Liste o conteudo com detalhes\n\n# 3. Va para o diretorio home\n',
      solution: 'cd ..\nls -l\ncd ~',
      hints: [
        'Use cd .. para voltar um nivel no diretorio.',
        'Use ls -l para listar com detalhes (permissoes, tamanho, data).',
        'O atalho ~ representa o diretorio home do usuario.',
      ],
    },
  ],
};
