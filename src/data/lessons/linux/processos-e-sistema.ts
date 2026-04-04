import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'processos-e-sistema',
  moduleId: 'linux',
  title: 'Processos e Sistema',
  description:
    'Aprenda a monitorar processos em execucao, gerenciar tarefas em segundo plano e verificar o uso de recursos do sistema.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Cada programa rodando no seu computador e como um funcionario trabalhando em uma empresa. O sistema operacional e o gerente que controla quem trabalha, quem descansa e quem precisa ser demitido. Vamos aprender a ser esse gerente!\n\nTudo que esta rodando no seu computador e um **processo**. Quando voce abre o navegador, executa um script ou ate mesmo digita um comando no terminal, um processo e criado. Cada processo tem um identificador unico chamado **PID** (Process ID).\n\nSaber gerenciar processos e fundamental para qualquer pessoa que trabalha com Linux, especialmente quando um programa trava, consome muita memoria ou voce precisa executar tarefas em segundo plano.\n\nOs principais comandos para gerenciar processos sao:\n\n- **ps** — Lista processos em execucao\n- **top** / **htop** — Monitor de processos em tempo real\n- **kill** — Encerra um processo pelo PID\n- **killall** — Encerra processos pelo nome',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Listar seus processos\nps\n\n# Listar TODOS os processos do sistema com detalhes\nps aux\n\n# Filtrar processos por nome (combinando com grep)\nps aux | grep firefox\n\n# Monitor interativo de processos (saia com q)\ntop\n\n# Versao melhorada do top (precisa instalar: sudo apt install htop)\nhtop\n\n# Encerrar um processo pelo PID\nkill 1234\n\n# Forcar o encerramento (quando o processo nao responde)\nkill -9 1234\n\n# Encerrar todos os processos com um determinado nome\nkillall firefox',
        filename: 'processos.sh',
        description:
          'Comandos para listar, monitorar e encerrar processos no Linux.',
      },
    },
    {
      type: 'text',
      content:
        '## Tarefas em Segundo Plano\n\nAs vezes voce quer executar um comando demorado sem travar o terminal. O Linux permite rodar processos em **segundo plano** (background) e traze-los de volta ao **primeiro plano** (foreground) quando necessario.\n\n- **&** — Adicione no final do comando para executar em segundo plano\n- **jobs** — Lista as tarefas em segundo plano do terminal atual\n- **bg** — Retoma uma tarefa pausada em segundo plano\n- **fg** — Traz uma tarefa de segundo plano para o primeiro plano\n- **Ctrl+Z** — Pausa (suspende) o processo atual',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Executar um comando em segundo plano\nsleep 60 &\n\n# Listar tarefas em segundo plano\njobs\n\n# Trazer a tarefa 1 para o primeiro plano\nfg %1\n\n# Enviar a tarefa 1 de volta para segundo plano\nbg %1\n\n# Pausar o processo atual: pressione Ctrl+Z\n# Depois use bg para continuar em segundo plano ou fg para primeiro plano',
        filename: 'background.sh',
        description:
          'Gerenciamento de tarefas em primeiro e segundo plano no terminal.',
      },
    },
    {
      type: 'text',
      content:
        '## Informacoes do Sistema\n\nAlem de processos, e importante saber verificar os recursos do seu sistema — como espaco em disco, memoria disponivel e informacoes do kernel.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Ver uso do disco em formato legivel\ndf -h\n\n# Ver uso da memoria RAM e swap\nfree -h\n\n# Informacoes sobre o kernel e sistema\nuname\n\n# Informacoes completas do sistema\nuname -a\n\n# Ver quanto tempo o sistema esta ligado\nuptime',
        filename: 'sistema.sh',
        description:
          'Comandos para verificar disco, memoria e informacoes gerais do sistema.',
      },
    },
    {
      type: 'callout',
      content:
        'O comando kill -9 forca o encerramento imediato de um processo sem dar chance para ele salvar dados. Use apenas quando o kill normal (sem -9) nao funcionar. Sempre tente o kill simples primeiro.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Gerenciando processos\n\nAlguns processos podem travar ou consumir muitos recursos. Voce precisa saber como gerencia-los:\n\n**Sinais de controle:**\n- **`kill PID`** — envia sinal TERM (pede para o processo terminar graciosamente)\n- **`kill -9 PID`** — envia sinal KILL (forca encerramento imediato, use como ultimo recurso)\n- **`killall nome`** — mata todos os processos com aquele nome\n- **`Ctrl+C`** — interrompe o processo em primeiro plano\n- **`Ctrl+Z`** — suspende o processo (manda para background)\n\n**Processos em background:**\n- **`comando &`** — roda em background desde o inicio\n- **`bg`** — continua processo suspenso em background\n- **`fg`** — traz processo do background para primeiro plano\n- **`jobs`** — lista processos em background',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        filename: 'gerenciar_processos.sh',
        code: `# Ver processos em tempo real (interativo)
top
# htop e mais bonito: sudo apt install htop && htop

# Listar todos os processos com detalhes
ps aux
# USER  PID  %CPU  %MEM  COMMAND
# root    1   0.0   0.1  /sbin/init

# Encontrar o PID de um processo pelo nome
pidof firefox
pgrep python3

# Matar um processo pelo PID
kill 1234          # Gracioso (SIGTERM)
kill -9 1234       # Forcado (SIGKILL) — use se kill nao funcionar

# Matar por nome
killall firefox
pkill -f "python meu_script.py"

# Rodar em background
python3 servidor.py &
# [1] 5678  (job 1, PID 5678)

# Ver jobs em background
jobs
# [1]+  Running  python3 servidor.py &

# Trazer de volta para primeiro plano
fg 1

# Verificar uso de disco
df -h          # Espaco livre em cada particao
du -sh *       # Tamanho de cada arquivo/pasta no diretorio atual
free -h        # Uso de RAM`,
        description: 'kill encerra processos. & roda em background. top/htop monitoram em tempo real. ps aux lista todos os processos.',
      },
    },
  ],
  challenges: [
    {
      id: 'ps-c1',
      title: 'Encontrando um processo',
      description:
        'Voce suspeita que o processo "node" esta consumindo muita memoria. Escreva os comandos para: listar todos os processos do sistema e filtrar apenas os que contem "node" no nome.',
      language: 'bash',
      starterCode: '# Liste todos os processos e filtre pelos que contem "node"\n# Dica: combine ps aux com grep\n',
      solution: 'ps aux | grep node',
      hints: [
        'Use ps aux para listar todos os processos com detalhes.',
        'Use o pipe | para enviar a saida para outro comando.',
        'O grep filtra linhas que contem o texto especificado: grep node.',
      ],
    },
    {
      id: 'ps-c2',
      title: 'Verificando recursos do sistema',
      description:
        'Escreva os comandos para verificar: o espaco disponivel em disco (formato legivel), a memoria RAM disponivel (formato legivel) e as informacoes completas do sistema operacional.',
      language: 'bash',
      starterCode: '# 1. Verifique o espaco em disco (formato legivel)\n\n# 2. Verifique a memoria RAM (formato legivel)\n\n# 3. Veja informacoes completas do sistema\n',
      solution: 'df -h\nfree -h\nuname -a',
      hints: [
        'Use df -h para disco. O -h significa "human-readable" (formato legivel).',
        'Use free -h para memoria RAM e swap.',
        'Use uname -a para informacoes completas do kernel e sistema.',
      ],
    },
    {
      id: 'ps-c3',
      title: 'Gerenciando tarefas em segundo plano',
      description:
        'Execute o comando "sleep 120" em segundo plano, depois liste as tarefas ativas, e por fim traga a tarefa de volta para o primeiro plano.',
      language: 'bash',
      starterCode: '# 1. Execute sleep 120 em segundo plano\n\n# 2. Liste as tarefas em segundo plano\n\n# 3. Traga a tarefa para o primeiro plano\n',
      solution: 'sleep 120 &\njobs\nfg %1',
      hints: [
        'Adicione & no final do comando para rodar em segundo plano.',
        'O comando jobs lista as tarefas do terminal atual.',
        'Use fg %1 para trazer a tarefa numero 1 para o primeiro plano.',
      ],
    },
  ],
};
