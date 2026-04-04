import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'concorrencia-vs-paralelismo',
  moduleId: 'concorrencia',
  title: 'Concorrencia vs Paralelismo',
  description: 'Entenda a diferenca fundamental entre concorrencia e paralelismo, processos vs threads vs coroutines, e quando usar cada abordagem',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## Concorrencia vs Paralelismo\n\nEsses dois termos sao frequentemente confundidos, mas representam ideias distintas.\n\n**Concorrencia** e sobre *lidar* com muitas coisas ao mesmo tempo — estruturar o programa para que multiplas tarefas possam progredir, mesmo que em um unico nucleo de CPU. O sistema alterna rapidamente entre tarefas, dando a ilusao de simultaneidade.\n\n**Paralelismo** e sobre *fazer* muitas coisas ao mesmo tempo — executar multiplas tarefas literalmente ao mesmo tempo em nucleos de CPU diferentes.\n\n> Analogia: um chef de cozinha que corta legumes enquanto espera a agua ferver e **concorrente** (uma pessoa, multiplas tarefas). Dois chefs cozinhando ao mesmo tempo sao **paralelos** (duas pessoas, duas tarefas simultaneas).\n\n### Por que a distincao importa?\n\nA escolha errada pode resultar em codigo mais lento, mais complexo e com bugs dificeis de rastrear. Entender a diferenca e o primeiro passo para escrever codigo eficiente.',
    },
    {
      type: 'text',
      content:
        '## Processos, Threads e Coroutines\n\n### Processo\n- Unidade de execucao independente com sua propria memoria\n- Isolado: um processo nao compartilha memoria com outro\n- Comunicacao entre processos (IPC) requer mecanismos especiais\n- Custo alto para criar e trocar contexto\n\n### Thread\n- Unidade de execucao dentro de um processo\n- Compartilha memoria com outras threads do mesmo processo\n- Troca de contexto mais barata que entre processos\n- Risco: condicoes de corrida por memoria compartilhada\n\n### Coroutine\n- Funcao que pode pausar e retomar sua execucao\n- Execucao cooperativa: a propria coroutine decide quando ceder controle\n- Muito leve: milhares podem coexistir sem problema\n- Nao paralela por natureza — ideal para I/O bound',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Visualizando a diferenca entre os tres modelos\n\n# --- PROCESSO ---\n# Cada processo tem seu proprio espaco de memoria\nimport multiprocessing\n\ndef tarefa_processo(nome):\n    print(f"Processo {nome} rodando com PID: {multiprocessing.current_process().pid}")\n\np1 = multiprocessing.Process(target=tarefa_processo, args=("A",))\np2 = multiprocessing.Process(target=tarefa_processo, args=("B",))\np1.start(); p2.start()\np1.join(); p2.join()\n# Saida: dois PIDs diferentes — processos completamente isolados\n\n\n# --- THREAD ---\n# Threads compartilham memoria dentro do mesmo processo\nimport threading\n\ncontador_compartilhado = 0  # variavel COMPARTILHADA entre threads\n\ndef tarefa_thread(nome):\n    global contador_compartilhado\n    print(f"Thread {nome} — PID compartilhado: {threading.current_thread().name}")\n    contador_compartilhado += 1  # PERIGO: race condition possivel aqui\n\nt1 = threading.Thread(target=tarefa_thread, args=("A",))\nt2 = threading.Thread(target=tarefa_thread, args=("B",))\nt1.start(); t2.start()\nt1.join(); t2.join()\nprint(f"Contador final: {contador_compartilhado}")  # pode ser 1 ou 2!\n\n\n# --- COROUTINE ---\n# Coroutines cedem controle voluntariamente com "await"\nimport asyncio\n\nasync def tarefa_coroutine(nome, segundos):\n    print(f"Coroutine {nome} iniciando")\n    await asyncio.sleep(segundos)  # cede controle aqui\n    print(f"Coroutine {nome} finalizando apos {segundos}s")\n\nasync def main():\n    # Roda as duas "ao mesmo tempo" em um unico thread\n    await asyncio.gather(\n        tarefa_coroutine("A", 2),\n        tarefa_coroutine("B", 1),\n    )\n\nasyncio.run(main())\n# Saida: A inicia, B inicia, B finaliza, A finaliza — intercaladas!',
        filename: 'processos_threads_coroutines.py',
        description:
          'Tres modelos de concorrencia em Python. Processos sao isolados, threads compartilham memoria, coroutines cedem controle cooperativamente.',
      },
    },
    {
      type: 'text',
      content:
        '## O GIL do Python: Global Interpreter Lock\n\nO Python (CPython) possui o **GIL** — um mutex que garante que apenas uma thread execute bytecode Python por vez.\n\n### O que isso significa na pratica?\n\n- **Threads em Python nao sao verdadeiramente paralelas** para codigo Python puro\n- O GIL e liberado durante operacoes de I/O (rede, disco) — por isso threads ainda ajudam em I/O bound\n- Para paralelismo real em CPU, use `multiprocessing` — cada processo tem seu proprio GIL\n\n### Por que o GIL existe?\n\nO GIL simplifica o gerenciamento de memoria do CPython (contagem de referencias). Remover o GIL e tecnicamente complexo e poderia desacelerar programas single-thread. O Python 3.13 introduziu suporte experimental para desabilitar o GIL.\n\n```\nSem GIL (multiprocessing):\nCPU 1: [processo A ||||||||||||]\nCPU 2: [processo B ||||||||||||]\n\nCom GIL (threading, CPU-bound):\nCPU 1: [A|||][B|||][A|||][B|||]  <- apenas uma thread por vez\n```',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'O GIL e uma armadilha comum: muitos desenvolvedores usam threads esperando acelerar calculos pesados e ficam surpresos ao ver que o programa nao ficou mais rapido. Para CPU-bound, sempre use multiprocessing ou extensoes C sem GIL (numpy, por exemplo).',
    },
    {
      type: 'text',
      content:
        '## Quando usar cada abordagem\n\n### I/O Bound vs CPU Bound\n\n**I/O Bound**: o programa passa a maior parte do tempo esperando operacoes de entrada/saida — requisicoes de rede, leitura de disco, consultas a banco de dados.\n\n**CPU Bound**: o programa passa a maior parte do tempo executando calculos — processamento de imagens, machine learning, compressao, criptografia.\n\n| Situacao | Melhor abordagem | Motivo |\n|---|---|---|\n| Muitas requisicoes HTTP | `asyncio` | Leve, escalavel, I/O bound |\n| Download de arquivos | `threading` ou `asyncio` | I/O bound, GIL liberado |\n| Processamento de imagens | `multiprocessing` | CPU bound, contorna GIL |\n| Servidor web simples | `asyncio` | Alta concorrencia com baixo custo |\n| Calculos matematicos | `multiprocessing` | Paralelismo real em multiplos nucleos |\n| Tarefas mistas | `concurrent.futures` | Abstrai threads e processos |\n\n### Regra pratica\n- **async/await**: I/O bound com alta concorrencia (centenas a milhares de tarefas)\n- **threading**: I/O bound com bibliotecas que nao suportam async\n- **multiprocessing**: CPU bound, aproveitamento real de multiplos nucleos',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Comparando o impacto do GIL: I/O bound vs CPU bound\nimport threading\nimport multiprocessing\nimport time\n\n# --- TAREFA I/O BOUND ---\n# Simula espera de rede (GIL e LIBERADO durante sleep/I/O)\ndef tarefa_io(duracao):\n    time.sleep(duracao)  # GIL liberado aqui — threads realmente concorrem\n\n# Sequencial: 3 tarefas de 1s = ~3s\nstart = time.time()\nfor _ in range(3):\n    tarefa_io(1)\nprint(f"I/O sequencial: {time.time() - start:.1f}s")  # ~3.0s\n\n# Com threads: ~1s (GIL liberado durante sleep)\nstart = time.time()\nthreads = [threading.Thread(target=tarefa_io, args=(1,)) for _ in range(3)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(f"I/O com threads: {time.time() - start:.1f}s")  # ~1.0s\n\n\n# --- TAREFA CPU BOUND ---\n# Calculo intensivo (GIL NAO e liberado — threads nao ajudam)\ndef tarefa_cpu(n):\n    total = 0\n    for i in range(n):\n        total += i * i\n    return total\n\n# Sequencial vs threads: tempo similar por causa do GIL\nstart = time.time()\nfor _ in range(3):\n    tarefa_cpu(5_000_000)\nprint(f"CPU sequencial: {time.time() - start:.1f}s")\n\nstart = time.time()\nthreads = [threading.Thread(target=tarefa_cpu, args=(5_000_000,)) for _ in range(3)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint(f"CPU com threads: {time.time() - start:.1f}s")  # nao melhorou!\n\n# Multiprocessing: cada processo tem seu GIL — paralelismo real\nstart = time.time()\nwith multiprocessing.Pool(3) as pool:\n    pool.map(tarefa_cpu, [5_000_000, 5_000_000, 5_000_000])\nprint(f"CPU com multiprocessing: {time.time() - start:.1f}s")  # ~3x mais rapido!',
        filename: 'io_vs_cpu_bound.py',
        description:
          'Demonstracao pratica do impacto do GIL. Threads aceleram I/O bound mas nao CPU bound. Multiprocessing acelera CPU bound ao usar multiplos nucleos.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Duvida sobre qual abordagem usar? Faca o teste: adicione um time.sleep() na tarefa. Se o sleep representa a maior parte do tempo real, e I/O bound — use async ou threads. Se mesmo sem o sleep o programa e lento, e CPU bound — use multiprocessing.',
    },
  ],
  challenges: [
    {
      id: 'concorrencia-c1',
      title: 'Classificar Cenarios de Concorrencia',
      description:
        'Para cada cenario descrito nos comentarios, escolha a abordagem mais adequada: "threading", "multiprocessing" ou "asyncio". Escreva sua resposta como string na variavel correspondente e adicione uma justificativa de uma linha.',
      language: 'python',
      starterCode:
        '# Para cada cenario, atribua: "threading", "multiprocessing" ou "asyncio"\n# Adicione um comentario justificando sua escolha\n\n# Cenario 1: Servidor que precisa atender 10.000 conexoes simultaneas de clientes web\ncenario_1 = ""\n# Justificativa: \n\n# Cenario 2: Aplicacao que precisa redimensionar 500 imagens usando algoritmo de compressao pesado\ncenario_2 = ""\n# Justificativa:\n\n# Cenario 3: Script que precisa baixar 200 arquivos de URLs diferentes o mais rapido possivel\ncenario_3 = ""\n# Justificativa:\n\n# Cenario 4: Pipeline que consulta 50 APIs externas e agrega os resultados\ncenario_4 = ""\n# Justificativa:\n\n# Cenario 5: Treinamento de modelo de machine learning que usa todos os nucleos da CPU\ncenario_5 = ""\n# Justificativa:\n\nprint(f"1: {cenario_1}")\nprint(f"2: {cenario_2}")\nprint(f"3: {cenario_3}")\nprint(f"4: {cenario_4}")\nprint(f"5: {cenario_5}")\n',
      solution:
        '# Para cada cenario, atribua: "threading", "multiprocessing" ou "asyncio"\n\n# Cenario 1: Servidor que precisa atender 10.000 conexoes simultaneas de clientes web\ncenario_1 = "asyncio"\n# Justificativa: alta concorrencia de I/O — asyncio lida com milhares de conexoes com custo minimo\n\n# Cenario 2: Aplicacao que precisa redimensionar 500 imagens usando algoritmo de compressao pesado\ncenario_2 = "multiprocessing"\n# Justificativa: CPU bound puro — multiprocessing usa todos os nucleos contornando o GIL\n\n# Cenario 3: Script que precisa baixar 200 arquivos de URLs diferentes o mais rapido possivel\ncenario_3 = "asyncio"\n# Justificativa: I/O bound de rede — asyncio com aiohttp e mais leve e rapido que threads\n\n# Cenario 4: Pipeline que consulta 50 APIs externas e agrega os resultados\ncenario_4 = "asyncio"\n# Justificativa: aguardar respostas de rede e tipicamente I/O bound — asyncio.gather ideal\n\n# Cenario 5: Treinamento de modelo de machine learning que usa todos os nucleos da CPU\ncenario_5 = "multiprocessing"\n# Justificativa: CPU bound intensivo — multiprocessing distribui o trabalho entre nucleos fisicos\n\nprint(f"1: {cenario_1}")\nprint(f"2: {cenario_2}")\nprint(f"3: {cenario_3}")\nprint(f"4: {cenario_4}")\nprint(f"5: {cenario_5}")\n',
      hints: [
        'A pergunta-chave: o programa passa mais tempo ESPERANDO (I/O) ou CALCULANDO (CPU)?',
        'asyncio brilha quando voce tem muitas tarefas I/O concorrentes — pense em centenas ou milhares',
        'Se o GIL e um problema (CPU bound), a solucao e sair do mesmo processo — multiprocessing',
      ],
    },
  ],
};
