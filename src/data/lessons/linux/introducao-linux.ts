import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'introducao-linux',
  moduleId: 'linux',
  title: 'Introducao ao Linux e Terminal',
  description:
    'Descubra o que e o Linux, suas principais distribuicoes, por que usa-lo e como dar seus primeiros passos no terminal.',
  order: 0,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'Se a interface grafica e como pedir comida apontando para as fotos no cardapio, o **terminal** e como dizer diretamente ao garcom o que voce quer. E mais rapido quando voce sabe o que pedir! O terminal vai se tornar seu melhor amigo na programacao.\n\nVoce ja deve ter ouvido falar em Linux, mas talvez nao saiba que ele esta em praticamente todos os lugares: servidores que mantem sites no ar, smartphones Android, smart TVs, roteadores e ate no supercomputador mais rapido do mundo. Linux e um **sistema operacional** (o programa que faz seu computador funcionar, como o Windows ou macOS) de codigo aberto, o que significa que qualquer pessoa pode ver, modificar e distribuir seu codigo fonte.\n\nO Linux foi criado em 1991 por Linus Torvalds, um estudante finlandes que queria um sistema operacional livre e gratuito. Diferente do Windows ou macOS, o Linux nao e controlado por uma unica empresa — ele pertence a comunidade.',
    },
    {
      type: 'text',
      content:
        '## Distribuicoes Linux\n\nUma das coisas mais legais do Linux e que ele vem em diversas \"versoes\" chamadas **distribuicoes** (ou \"distros\"). Cada distribuicao empacota o nucleo do Linux (chamado **kernel** — o cerebro do sistema que conversa com o hardware) com diferentes programas e interfaces.\n\nPara quem esta comecando, a melhor escolha e o **Ubuntu** ou o **Linux Mint** — ambos sao faceis de instalar e tem uma comunidade enorme de suporte. Existem outras opcoes como Fedora e Arch Linux, mas nao se preocupe com isso agora.',
    },
    {
      type: 'text',
      content:
        '## O que e o Terminal?\n\nO **terminal** (tambem chamado de **shell**, **console** ou **linha de comando**) e uma interface baseada em texto onde voce digita comandos para interagir com o sistema operacional. Em vez de clicar em icones e menus, voce escreve instrucoes que o computador executa.\n\nPor que usar o terminal se existe a interface grafica? Porque o terminal e **mais rapido**, **mais poderoso** e **mais flexivel**. Com um unico comando voce pode fazer coisas que levariam dezenas de cliques na interface grafica. Alem disso, quando voce trabalha com servidores (que geralmente nao tem interface grafica), o terminal e a unica opcao.\n\nPara abrir o terminal:\n- **Ubuntu/Linux Mint**: pressione `Ctrl + Alt + T`\n- **macOS**: abra o aplicativo \"Terminal\" (em Aplicativos > Utilitarios)\n- **Windows**: use o WSL (Windows Subsystem for Linux) ou o Git Bash',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Seu primeiro comando: exibir uma mensagem na tela\necho "Ola, mundo Linux!"\n\n# Descobrir qual usuario esta logado\nwhoami\n\n# Ver a data e hora atuais\ndate\n\n# Limpar a tela do terminal\nclear',
        filename: 'primeiros-comandos.sh',
        description:
          'Os primeiros comandos que todo iniciante deve conhecer. O echo exibe texto, whoami mostra seu usuario, date mostra a data e clear limpa a tela.',
      },
    },
    {
      type: 'callout',
      content:
        'No terminal, os comandos diferenciam maiusculas de minusculas (isso se chama "case-sensitive"). O comando "echo" funciona, mas "Echo" ou "ECHO" podem nao funcionar. Sempre digite os comandos em minusculas.',
      calloutType: 'warning',
    },
    {
      type: 'callout',
      content:
        'Errar no terminal e normal e faz parte do aprendizado! Os comandos que vamos aprender quase nunca fazem algo irreversivel. Nao precisa decorar tudo — com o tempo, os mais usados ficam automaticos!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Produtividade no Terminal\n\nO terminal tem recursos que tornam o trabalho muito mais rapido. Aprender esses atalhos vai transformar sua experiencia:\n\n- **Tab** — Autocompletar nomes de arquivos e comandos. Pressione duas vezes para ver todas as opcoes\n- **Seta cima/baixo** — Navegar pelo historico de comandos\n- **Ctrl + C** — Interromper o comando em execucao\n- **Ctrl + D** — Sair do terminal (ou do modo de entrada)\n- **Ctrl + L** — Limpar a tela (equivale ao `clear`)\n- **Ctrl + A** — Ir para o inicio da linha\n- **Ctrl + E** — Ir para o final da linha',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'produtividade.sh',
        code: '# Ver historico de comandos usados\nhistory\n\n# Executar o ultimo comando que comeca com "git"\n!git\n\n# Executar o ultimo comando executado\n!!\n\n# Buscar no historico (pressione Ctrl+R e comece a digitar)\n# Ctrl+R: reverse search interativo\n\n# Ajuda de qualquer comando\nman ls          # Manual completo do comando ls\nls --help       # Ajuda resumida (opcao --help)\nwhatis ls       # Descricao curta do comando\n\n# Ver o caminho completo de um comando\nwhich python3   # /usr/bin/python3\nwhich git       # /usr/bin/git',
        description:
          'Atalhos e comandos para trabalhar mais rapido no terminal: history, man e autocompletar.',
      },
    },
    {
      type: 'text',
      content:
        '## Lendo Arquivos no Terminal\n\nAntes de aprender a manipular arquivos, e util saber como **ler** o conteudo deles diretamente no terminal:\n\n- **`cat arquivo`** — Exibe todo o conteudo de um arquivo\n- **`head -n 10 arquivo`** — Exibe as primeiras 10 linhas\n- **`tail -n 10 arquivo`** — Exibe as ultimas 10 linhas\n- **`tail -f arquivo`** — Acompanha o arquivo em tempo real (util para logs!)\n- **`wc -l arquivo`** — Conta o numero de linhas do arquivo',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'ler-arquivos.sh',
        code: '# Exibir conteudo completo\ncat notas.txt\n\n# Exibir com numeros de linha\ncat -n notas.txt\n\n# Ver apenas as primeiras 5 linhas\nhead -n 5 notas.txt\n\n# Ver apenas as ultimas 5 linhas\ntail -n 5 notas.txt\n\n# Acompanhar log em tempo real (Ctrl+C para parar)\ntail -f /var/log/syslog\n\n# Contar linhas, palavras e caracteres\nwc -l notas.txt    # numero de linhas\nwc -w notas.txt    # numero de palavras\nwc -c notas.txt    # numero de caracteres',
        description:
          'Comandos para ler e inspecionar o conteudo de arquivos diretamente no terminal.',
      },
    },
  ],
  challenges: [
    {
      id: 'il-c1',
      title: 'Primeira mensagem no terminal',
      description:
        'Use o comando echo para exibir a mensagem "Estou aprendendo Linux!" no terminal.',
      language: 'bash',
      starterCode: '# Use o comando echo para exibir a mensagem abaixo:\n# "Estou aprendendo Linux!"\n',
      solution: 'echo "Estou aprendendo Linux!"',
      hints: [
        'O comando echo exibe texto no terminal.',
        'Coloque o texto entre aspas duplas: echo "seu texto aqui".',
      ],
    },
    {
      id: 'il-c2',
      title: 'Descobrindo informacoes do sistema',
      description:
        'Execute tres comandos em sequencia: primeiro descubra seu usuario com whoami, depois veja a data com date, e por fim exiba uma saudacao com echo dizendo "Bem-vindo ao Linux!".',
      language: 'bash',
      starterCode: '# 1. Descubra seu usuario\n\n# 2. Veja a data atual\n\n# 3. Exiba "Bem-vindo ao Linux!"\n',
      solution: 'whoami\ndate\necho "Bem-vindo ao Linux!"',
      hints: [
        'O comando whoami mostra o nome do usuario logado.',
        'O comando date exibe a data e hora atuais.',
        'Use echo "texto" para exibir mensagens.',
      ],
    },
  ],
};
