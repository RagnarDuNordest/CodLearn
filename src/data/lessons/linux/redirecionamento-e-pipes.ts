import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'redirecionamento-e-pipes',
  moduleId: 'linux',
  title: 'Redirecionamento e Pipes',
  description:
    'Domine o redirecionamento de entrada e saida, pipes para encadear comandos, e operadores logicos para criar fluxos poderosos no terminal.',
  order: 5,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Imagine uma linha de montagem em uma fabrica: uma maquina corta, passa para a proxima que pinta, e a ultima embala. Pipes no Linux funcionam exatamente assim — voce conecta comandos como pecas de uma linha de montagem, onde a saida de um vira a entrada do proximo!\n\nCada comando no Linux tem tres canais de comunicacao (pense neles como portas de entrada e saida):\n\n- **stdin** (entrada padrao) — De onde o comando recebe dados (normalmente, o teclado)\n- **stdout** (saida padrao) — Para onde o comando envia o resultado (normalmente, a tela)\n- **stderr** (saida de erro) — Para onde o comando envia mensagens de erro (normalmente, a tela)\n\nCom os operadores de redirecionamento, voce pode mudar para onde esses dados vao. Isso permite salvar resultados em arquivos, usar arquivos como entrada e ate descartar saidas que nao interessam.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Redirecionar saida para um arquivo (sobrescreve o conteudo)\necho "Primeira linha" > arquivo.txt\n\n# Redirecionar saida adicionando ao final do arquivo\necho "Segunda linha" >> arquivo.txt\n\n# Usar um arquivo como entrada para um comando\nsort < nomes-desordenados.txt\n\n# Redirecionar apenas erros para um arquivo\nls /pasta-que-nao-existe 2> erros.txt\n\n# Redirecionar saida normal e erros para arquivos diferentes\nls /home /pasta-invalida > saida.txt 2> erros.txt\n\n# Redirecionar saida e erros para o mesmo arquivo\nls /home /pasta-invalida > tudo.txt 2>&1\n\n# Descartar a saida completamente (enviar para o "buraco negro")\nls /pasta-qualquer 2> /dev/null',
        filename: 'redirecionamento.sh',
        description:
          'Operadores de redirecionamento: > sobrescreve, >> adiciona, < le entrada, 2> redireciona erros e /dev/null descarta saida.',
      },
    },
    {
      type: 'text',
      content:
        '## Pipes: Conectando Comandos\n\nO **pipe** (representado por `|`) e o operador que transforma o Linux em uma ferramenta incrivelmente poderosa. Ele pega a saida de um comando e usa como entrada do proximo comando. Isso permite criar \"pipelines\" — sequencias de comandos que processam dados passo a passo.\n\nPense no pipe como uma esteira de fabrica: cada comando faz uma operacao e passa o resultado para o proximo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Listar arquivos e filtrar por um nome\nls -la | grep ".txt"\n\n# Contar quantos arquivos .txt existem\nls | grep ".txt" | wc -l\n\n# Ver os 5 maiores arquivos de um diretorio\nls -lS | head -n 6\n\n# Listar processos, filtrar por nome e contar\nps aux | grep python | wc -l\n\n# Ordenar um arquivo, remover duplicatas e salvar o resultado\nsort dados.txt | uniq > dados-limpos.txt\n\n# Ver as 10 palavras mais frequentes de um arquivo\ncat livro.txt | tr " " "\\n" | sort | uniq -c | sort -rn | head -n 10',
        filename: 'pipes.sh',
        description:
          'O pipe | permite encadear comandos, passando a saida de um como entrada do proximo.',
      },
    },
    {
      type: 'text',
      content:
        '## Operadores Logicos e Comandos Uteis\n\nAlem do pipe, existem operadores logicos que controlam a execucao dos comandos:\n\n- **&&** (E logico) — Executa o segundo comando **somente se** o primeiro tiver sucesso\n- **||** (OU logico) — Executa o segundo comando **somente se** o primeiro falhar\n- **;** — Executa os comandos em sequencia, independente do resultado\n\nE dois comandos uteis que complementam os pipes:\n\n- **tee** — Le da entrada padrao e escreve tanto na tela quanto em um arquivo ao mesmo tempo\n- **xargs** — Converte a entrada padrao em argumentos para outro comando',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# && — Segundo comando so executa se o primeiro der certo\nmkdir novo-projeto && cd novo-projeto\n\n# || — Segundo comando so executa se o primeiro falhar\ncd /pasta-invalida || echo "Erro: pasta nao encontrada"\n\n# Combinar && e || para simular um if/else\ntest -f config.txt && echo "Arquivo existe" || echo "Arquivo nao existe"\n\n# tee — Exibe na tela E salva em arquivo ao mesmo tempo\nls -la | tee listagem.txt\n\n# tee com append (adicionar ao arquivo)\ndate | tee -a log.txt\n\n# xargs — Transformar saida em argumentos\n# Encontrar arquivos .tmp e remove-los\nfind . -name "*.tmp" | xargs rm\n\n# Combinar pipes, redirecionamento e operadores\nps aux | grep python | tee processos-python.txt | wc -l',
        filename: 'operadores-avancados.sh',
        description:
          'Operadores logicos &&, || e os comandos tee e xargs para criar fluxos avancados no terminal.',
      },
    },
    {
      type: 'callout',
      content:
        'O pipe e o redirecionamento sao a essencia da filosofia Unix: "Faca uma coisa e faca bem feito". Cada comando faz uma tarefa simples, e ao conecta-los com pipes, voce cria solucoes complexas a partir de pecas simples.',
      calloutType: 'info',
    },
    {
      type: 'text',
      content:
        '## Combinacoes uteis de pipes\n\nPipes sao mais poderosos quando voce combina varios comandos. Cada pipe pega a saida do anterior e passa para o proximo. Alguns comandos essenciais para usar com pipes:\n\n- **`grep "texto"`** — filtra linhas que contam o texto\n- **`sort`** — ordena linhas (sort -n para numerico, sort -r para reverso)\n- **`uniq`** — remove linhas duplicadas consecutivas (use apos sort)\n- **`wc -l`** — conta o numero de linhas\n- **`head -n 10`** — mostra apenas as 10 primeiras linhas\n- **`tail -n 10`** — mostra apenas as 10 ultimas linhas\n- **`cut -d: -f1`** — corta colunas (delimitador e coluna)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'pipes_uteis.sh',
        code: `# Contar quantas vezes "erro" aparece no log
grep -i "erro" /var/log/syslog | wc -l

# Listar os 5 arquivos mais pesados
du -sh * | sort -rh | head -5

# Processos que mais consomem CPU (top 3)
ps aux | sort -k3 -rn | head -3

# Encontrar usuarios unicos em um arquivo de log
cut -d' ' -f1 access.log | sort | uniq -c | sort -rn | head -10
# uniq -c conta as ocorrencias
# sort -rn ordena do maior para o menor

# Buscar arquivos .py modificados hoje e listar
find . -name "*.py" -newer /tmp/ref | xargs ls -la

# Concatenar arquivos de log e filtrar erros criticos
cat app.log server.log | grep -i "critical\\|fatal" | tee erros_criticos.txt
# tee: mostra na tela E salva no arquivo ao mesmo tempo`,
        description: 'Pipes encadeiam comandos. A saida de um e a entrada do proximo. Combine grep, sort, uniq, wc para analisar dados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Redirecionamento de erros: use 2> para redirecionar stderr (erros) e &> para redirecionar stdout E stderr. Exemplo: comando 2>/dev/null ignora erros, comando &> saida.txt salva tudo. /dev/null e o "lixo" do Linux — tudo que vai para la e descartado.',
    },
  ],
  challenges: [
    {
      id: 'rp-c1',
      title: 'Salvando a listagem de arquivos',
      description:
        'Liste todos os arquivos do diretorio atual com detalhes (ls -la), salve o resultado em um arquivo chamado "listagem.txt" e depois exiba as primeiras 5 linhas desse arquivo.',
      language: 'bash',
      starterCode: '# 1. Liste os arquivos com detalhes e salve em listagem.txt\n\n# 2. Exiba as primeiras 5 linhas do arquivo\n',
      solution: 'ls -la > listagem.txt\nhead -n 5 listagem.txt',
      hints: [
        'Use > para redirecionar a saida de ls -la para um arquivo.',
        'Use head -n 5 para exibir as primeiras 5 linhas.',
      ],
    },
    {
      id: 'rp-c2',
      title: 'Pipeline de processamento',
      description:
        'Crie um pipeline que: liste todos os processos (ps aux), filtre os que contem "node", conte quantos sao, e exiba o resultado na tela e salve no arquivo "contagem.txt" ao mesmo tempo.',
      language: 'bash',
      starterCode: '# Crie um pipeline: ps aux -> filtrar "node" -> contar -> exibir e salvar\n# Dica: use |, grep, wc -l e tee\n',
      solution: 'ps aux | grep node | wc -l | tee contagem.txt',
      hints: [
        'Comece com ps aux para listar todos os processos.',
        'Use | grep node para filtrar os processos do node.',
        'Use | wc -l para contar as linhas resultantes.',
        'Use | tee contagem.txt para exibir na tela e salvar no arquivo.',
      ],
    },
    {
      id: 'rp-c3',
      title: 'Criacao condicional de diretorio',
      description:
        'Escreva um comando que tente criar o diretorio "backups". Se a criacao for bem-sucedida, exiba "Diretorio criado com sucesso!". Se falhar (porque ja existe, por exemplo), exiba "Diretorio ja existe.".',
      language: 'bash',
      starterCode: '# Tente criar "backups" e exiba mensagem de sucesso ou falha\n# Dica: use mkdir, && e ||\n',
      solution: 'mkdir backups && echo "Diretorio criado com sucesso!" || echo "Diretorio ja existe."',
      hints: [
        'Use && para executar o echo de sucesso se o mkdir funcionar.',
        'Use || para executar o echo de falha se o mkdir der erro.',
        'A estrutura e: comando && sucesso || falha.',
      ],
    },
  ],
};
