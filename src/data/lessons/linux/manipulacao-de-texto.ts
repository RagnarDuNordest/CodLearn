import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'manipulacao-de-texto',
  moduleId: 'linux',
  title: 'Manipulacao de Texto',
  description:
    'Domine os comandos para ler, buscar, contar e transformar conteudo de arquivos de texto diretamente no terminal.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Imagine ter um assistente que consegue ler, filtrar e modificar qualquer documento de texto em segundos. E isso que os comandos de texto do Linux fazem! Nao se preocupe em decorar tudo de uma vez — com a pratica, esses comandos ficam naturais.\n\nUma das grandes forcas do Linux e a capacidade de manipular texto diretamente no terminal. Seja para ler arquivos de configuracao, analisar logs ou processar dados, voce usara esses comandos o tempo todo.\n\nVamos comecar pelos comandos de leitura. Cada um tem uma funcao especifica:\n\n- **cat** — Exibe o conteudo completo de um arquivo\n- **head** — Mostra as primeiras linhas (por padrao, 10)\n- **tail** — Mostra as ultimas linhas (por padrao, 10)\n- **less** — Abre o arquivo para leitura interativa (navegue com setas, saia com `q`)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Exibir o conteudo completo de um arquivo\ncat arquivo.txt\n\n# Exibir com numeros de linha\ncat -n arquivo.txt\n\n# Ver as primeiras 5 linhas\nhead -n 5 arquivo.txt\n\n# Ver as ultimas 20 linhas\ntail -n 20 arquivo.txt\n\n# Acompanhar um arquivo em tempo real (otimo para logs)\ntail -f /var/log/syslog\n\n# Abrir arquivo para leitura interativa\nless arquivo.txt',
        filename: 'leitura.sh',
        description:
          'Comandos para ler o conteudo de arquivos. O tail -f e especialmente util para monitorar logs em tempo real.',
      },
    },
    {
      type: 'text',
      content:
        '## Buscando Texto com grep\n\nO **grep** e um dos comandos mais poderosos do Linux. Ele busca padroes de texto dentro de arquivos e retorna as linhas que contem o padrao encontrado. Voce pode usar grep para encontrar uma palavra em um arquivo, buscar erros em logs ou filtrar resultados de outros comandos.\n\nOpcoes mais usadas:\n- **-i** — Ignora maiusculas/minusculas\n- **-n** — Mostra o numero da linha\n- **-r** — Busca recursivamente em todos os arquivos de um diretorio\n- **-c** — Conta o numero de ocorrencias\n- **-v** — Inverte a busca (mostra linhas que NAO contem o padrao)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Buscar a palavra "erro" em um arquivo\ngrep "erro" log.txt\n\n# Buscar ignorando maiusculas/minusculas\ngrep -i "erro" log.txt\n\n# Mostrar o numero da linha onde aparece\ngrep -n "erro" log.txt\n\n# Buscar recursivamente em todos os arquivos de uma pasta\ngrep -r "TODO" ./src/\n\n# Contar quantas vezes a palavra aparece\ngrep -c "erro" log.txt\n\n# Mostrar linhas que NAO contem a palavra\ngrep -v "debug" log.txt',
        filename: 'grep.sh',
        description:
          'O grep e essencial para buscar padroes em arquivos. Combinado com outras opcoes, se torna extremamente versatil.',
      },
    },
    {
      type: 'text',
      content:
        '## Contando, Ordenando e Comparando\n\nAlem de ler e buscar, o Linux oferece comandos para analisar e transformar texto:\n\n- **wc** — Conta linhas, palavras e caracteres\n- **sort** — Ordena as linhas de um arquivo\n- **uniq** — Remove linhas duplicadas consecutivas (geralmente usado com sort)\n- **diff** — Compara dois arquivos e mostra as diferencas',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Contar linhas, palavras e caracteres\nwc arquivo.txt\n\n# Contar apenas linhas\nwc -l arquivo.txt\n\n# Contar apenas palavras\nwc -w arquivo.txt\n\n# Contar apenas caracteres (bytes)\nwc -c arquivo.txt\n\n# Ordenar linhas em ordem alfabetica\nsort nomes.txt\n\n# Ordenar em ordem reversa\nsort -r nomes.txt\n\n# Ordenar numericamente\nsort -n numeros.txt\n\n# Remover duplicatas (o arquivo deve estar ordenado)\nsort nomes.txt | uniq\n\n# Comparar dois arquivos\ndiff arquivo1.txt arquivo2.txt',
        filename: 'analise.sh',
        description:
          'Comandos para contar, ordenar, remover duplicatas e comparar arquivos de texto.',
      },
    },
  ],
  challenges: [
    {
      id: 'mt-c1',
      title: 'Analisando um arquivo de log',
      description:
        'Voce tem um arquivo chamado "servidor.log". Escreva os comandos para: ver as ultimas 15 linhas do arquivo, buscar todas as linhas que contem a palavra "ERROR" (ignorando maiusculas/minusculas) e contar quantas linhas o arquivo tem.',
      language: 'bash',
      starterCode: '# 1. Veja as ultimas 15 linhas de servidor.log\n\n# 2. Busque linhas com "ERROR" (ignorando maiusculas/minusculas)\n\n# 3. Conte quantas linhas o arquivo tem\n',
      solution: 'tail -n 15 servidor.log\ngrep -i "ERROR" servidor.log\nwc -l servidor.log',
      hints: [
        'Use tail -n 15 para ver as ultimas 15 linhas.',
        'Use grep -i para ignorar a diferenca entre maiusculas e minusculas.',
        'Use wc -l para contar apenas o numero de linhas.',
      ],
    },
    {
      id: 'mt-c2',
      title: 'Organizando uma lista de nomes',
      description:
        'Voce tem um arquivo "alunos.txt" com nomes (possivelmente duplicados e fora de ordem). Escreva um comando que ordene os nomes em ordem alfabetica e remova as duplicatas, exibindo o resultado no terminal.',
      language: 'bash',
      starterCode: '# Ordene o arquivo alunos.txt e remova duplicatas\n# Dica: combine sort e uniq usando pipe (|)\n',
      solution: 'sort alunos.txt | uniq',
      hints: [
        'O comando sort ordena as linhas em ordem alfabetica.',
        'O comando uniq remove duplicatas consecutivas, por isso precisa que o arquivo esteja ordenado.',
        'Use o pipe | para passar a saida de um comando como entrada de outro: sort arquivo | uniq.',
      ],
    },
    {
      id: 'mt-c3',
      title: 'Busca recursiva em projeto',
      description:
        'Voce quer encontrar todos os arquivos dentro do diretorio "src" que contem a palavra "function", mostrando o numero da linha de cada ocorrencia. Escreva o comando grep adequado.',
      language: 'bash',
      starterCode: '# Busque "function" recursivamente em src/ mostrando numeros de linha\n',
      solution: 'grep -rn "function" ./src/',
      hints: [
        'Use -r para busca recursiva em diretorios.',
        'Use -n para exibir o numero da linha.',
        'Voce pode combinar opcoes: grep -rn "padrao" diretorio/.',
      ],
    },
  ],
};
