import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'threads-em-python',
  moduleId: 'concorrencia',
  title: 'Threads em Python',
  description: 'Aprenda a criar e gerenciar threads com threading.Thread, entenda race conditions e como preveni-las com Lock',
  order: 1,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Threads em Python com threading.Thread\n\nO modulo `threading` e a forma mais direta de trabalhar com threads em Python. Uma thread e criada passando uma funcao-alvo e seus argumentos.\n\n### Ciclo de vida de uma thread\n\n1. **Criacao**: `Thread(target=..., args=...)` — apenas instancia, nao executa\n2. **Inicio**: `.start()` — inicia a execucao em segundo plano\n3. **Espera**: `.join()` — bloqueia o chamador ate a thread terminar\n4. **Termino**: a thread finaliza quando a funcao-alvo retorna\n\n### Metodos e atributos importantes\n\n- `thread.start()` — inicia a thread\n- `thread.join(timeout=None)` — aguarda a thread terminar\n- `thread.is_alive()` — retorna True se a thread ainda esta rodando\n- `thread.name` — nome da thread (util para debugging)\n- `threading.current_thread()` — retorna a thread atual\n- `threading.active_count()` — numero de threads ativas',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport time\n\n# --- Criando threads com funcao simples ---\ndef baixar_arquivo(nome, tamanho_mb):\n    print(f"[{threading.current_thread().name}] Iniciando download: {nome}")\n    time.sleep(tamanho_mb * 0.5)  # simula tempo de download\n    print(f"[{threading.current_thread().name}] Concluido: {nome} ({tamanho_mb}MB)")\n\n# Criando e nomeando threads\nt1 = threading.Thread(target=baixar_arquivo, args=("relatorio.pdf", 2), name="Thread-Download-1")\nt2 = threading.Thread(target=baixar_arquivo, args=("backup.zip", 4), name="Thread-Download-2")\nt3 = threading.Thread(target=baixar_arquivo, args=("foto.jpg", 1), name="Thread-Download-3")\n\nstart = time.time()\n\n# Inicia todas as threads\nt1.start()\nt2.start()\nt3.start()\n\n# Aguarda todas terminarem\nt1.join()\nt2.join()\nt3.join()\n\nprint(f"Todos os downloads concluidos em {time.time() - start:.1f}s")\n# Sem threads: ~3.5s (0.5*2 + 0.5*4 + 0.5*1)\n# Com threads:  ~2.0s (dominado pelo maior: 0.5*4)\n\n\n# --- Criando threads com lista (padrao mais comum) ---\narquivos = [\n    ("dados_janeiro.csv", 1),\n    ("dados_fevereiro.csv", 2),\n    ("dados_marco.csv", 1.5),\n]\n\nthreads = []\nfor nome, tamanho in arquivos:\n    t = threading.Thread(target=baixar_arquivo, args=(nome, tamanho))\n    threads.append(t)\n    t.start()\n\nfor t in threads:\n    t.join()  # aguarda cada uma terminar\n\nprint(f"Threads ativas apos join: {threading.active_count()}")  # apenas a main thread',
        filename: 'threading_basico.py',
        description:
          'Criacao, inicio e sincronizacao de threads. O join() e fundamental — sem ele o programa principal pode terminar antes das threads filhas.',
      },
    },
    {
      type: 'text',
      content:
        '## Race Conditions: o maior perigo das threads\n\nUma **race condition** ocorre quando o resultado do programa depende da ordem em que as threads executam — e essa ordem e nao-deterministica.\n\n### Por que acontece?\n\nOperacoes aparentemente simples como `contador += 1` nao sao atomicas. Elas se decompoe em:\n1. Ler o valor atual de `contador`\n2. Somar 1\n3. Escrever o novo valor\n\nSe duas threads executam esses passos intercalados, uma sobrescreve o trabalho da outra.\n\n```\nThread A lê contador = 0\nThread B lê contador = 0   <- B le ANTES de A escrever!\nThread A escreve 1\nThread B escreve 1         <- deveria ser 2, mas e 1!\n```\n\nRace conditions sao especialmente traicoeiras porque:\n- O bug aparece esporadicamente, nao sempre\n- Depende do timing exato da CPU e do sistema operacional\n- Muito dificil de reproduzir e debugar',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport time\n\n# --- DEMONSTRANDO A RACE CONDITION ---\ncontador_inseguro = 0\n\ndef incrementar_sem_protecao():\n    global contador_inseguro\n    for _ in range(100_000):\n        contador_inseguro += 1  # NAO e atomico!\n\nthreads = [threading.Thread(target=incrementar_sem_protecao) for _ in range(5)]\nfor t in threads: t.start()\nfor t in threads: t.join()\n\nprint(f"Esperado: 500000")\nprint(f"Obtido:   {contador_inseguro}")  # provavelmente MENOS que 500000!\n# Execucao tipica: 347891, 412033, 489201 — resultado diferente a cada execucao!\n\n\n# --- SOLUCAO: usando Lock ---\ncontador_seguro = 0\ntravessa = threading.Lock()  # so uma thread pode segurar o Lock por vez\n\ndef incrementar_com_lock():\n    global contador_seguro\n    for _ in range(100_000):\n        with travessa:           # adquire o lock — bloqueia outras threads\n            contador_seguro += 1  # zona critica: executada por apenas uma thread\n        # lock e liberado automaticamente ao sair do bloco with\n\nthreads = [threading.Thread(target=incrementar_com_lock) for _ in range(5)]\nfor t in threads: t.start()\nfor t in threads: t.join()\n\nprint(f"Esperado: 500000")\nprint(f"Obtido:   {contador_seguro}")  # SEMPRE 500000!\n\n\n# --- Equivalente sem o with (mais verboso) ---\ndef incrementar_manual():\n    global contador_seguro\n    travessa.acquire()   # bloqueia se outra thread ja tem o lock\n    try:\n        contador_seguro += 1\n    finally:\n        travessa.release()  # SEMPRE libere o lock, mesmo se der excecao!',
        filename: 'race_condition_e_lock.py',
        description:
          'Race condition com contador compartilhado e a solucao com Lock. O bloco "with lock" e a forma pythonica — garante liberacao mesmo se ocorrer excecao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Sempre use "with lock:" ao inves de lock.acquire()/release() manualmente. Se ocorrer uma excecao entre acquire() e release(), o lock nunca sera liberado e todas as outras threads ficarao bloqueadas para sempre — um deadlock.',
    },
    {
      type: 'text',
      content:
        '## Tipos de Lock e boas praticas\n\n### threading.Lock vs threading.RLock\n\n**Lock** (non-reentrant): a mesma thread NAO pode adquirir o lock duas vezes sem liberar — causaria deadlock.\n\n**RLock** (reentrant): a mesma thread pode adquirir o lock multiplas vezes. Util em metodos recursivos ou quando um metodo chama outro que tambem usa o lock.\n\n### threading.Event: sincronizacao por sinal\n\nPermite que uma thread aguarde um evento sinalizado por outra.\n\n### threading.Semaphore: limitar concorrencia\n\nPermite que N threads (em vez de apenas 1) acessem um recurso simultaneamente. Util para limitar conexoes a um banco de dados ou requisicoes a uma API.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport time\n\n# --- RLock: reentrant lock ---\nrlock = threading.RLock()\n\ndef operacao_externa():\n    with rlock:\n        print("Operacao externa iniciada")\n        operacao_interna()  # chama outra funcao que tambem usa rlock\n        print("Operacao externa finalizada")\n\ndef operacao_interna():\n    with rlock:  # mesma thread pode adquirir RLock novamente\n        print("  Operacao interna executando")\n\nt = threading.Thread(target=operacao_externa)\nt.start(); t.join()\n\n\n# --- Event: coordenar inicio de threads ---\nprontos = threading.Event()\n\ndef trabalhador(id):\n    print(f"Trabalhador {id} aguardando sinal...")\n    prontos.wait()  # bloqueia ate o evento ser sinalizado\n    print(f"Trabalhador {id} comeou a trabalhar!")\n\nthreads = [threading.Thread(target=trabalhador, args=(i,)) for i in range(3)]\nfor t in threads: t.start()\n\ntime.sleep(1)\nprint("\\nSinal de inicio enviado!")\nprontos.set()  # acorda TODAS as threads aguardando\n\nfor t in threads: t.join()\n\n\n# --- Semaphore: limitar acesso concorrente ---\nSEMAFORO_DB = threading.Semaphore(2)  # maximo 2 conexoes simultaneas\n\ndef consultar_banco(id_consulta):\n    print(f"Consulta {id_consulta} aguardando conexao...")\n    with SEMAFORO_DB:  # bloqueia se 2 conexoes ja estao em uso\n        print(f"Consulta {id_consulta} conectada ao banco")\n        time.sleep(0.5)  # simula consulta\n        print(f"Consulta {id_consulta} finalizada")\n\nthreads = [threading.Thread(target=consultar_banco, args=(i,)) for i in range(5)]\nfor t in threads: t.start()\nfor t in threads: t.join()\n# Nunca mais de 2 threads dentro do semaforo simultaneamente',
        filename: 'rlock_event_semaphore.py',
        description:
          'RLock para locks reentrantes, Event para sincronizacao por sinal e Semaphore para limitar o numero de threads concorrentes em um recurso.',
      },
    },
    {
      type: 'text',
      content:
        '## Daemon Threads\n\nUma **daemon thread** e uma thread que e automaticamente encerrada quando o programa principal termina — sem esperar que ela conclua.\n\n### Quando usar\n\n- Tarefas de monitoramento em background (logs, metricas)\n- Threads de limpeza periodica\n- Qualquer tarefa que nao precisa ser concluida para o programa funcionar corretamente\n\n### Comparacao\n\n| | Thread normal | Daemon thread |\n|---|---|---|\n| `daemon` | `False` (padrao) | `True` |\n| Programa espera? | Sim | Nao |\n| Uso tipico | Tarefas essenciais | Background tasks |\n\nIMPORTANTE: daemon threads sao encerradas abruptamente — nao executam `finally` ou limpeza. Nao use para tarefas que precisam salvar dados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport time\n\n# --- Daemon thread: monitoramento em background ---\ndef monitor_sistema():\n    while True:\n        # Em producao: coletar metricas, verificar saude do sistema\n        print(f"[Monitor] Threads ativas: {threading.active_count()}")\n        time.sleep(2)\n\nmonitor = threading.Thread(target=monitor_sistema, name="Monitor")\nmonitor.daemon = True  # deve ser definido ANTES de start()\nmonitor.start()\n\n# Thread normal: programa aguarda ela terminar\ndef tarefa_principal():\n    print("Tarefa principal iniciando")\n    time.sleep(3)\n    print("Tarefa principal concluida")\n\nt = threading.Thread(target=tarefa_principal)\nt.start()\nt.join()  # aguarda a thread normal\n\nprint("Programa principal terminando")\n# O monitor sera encerrado automaticamente aqui\n# mesmo que ainda estivesse dormindo\n\n\n# --- Verificando daemon status ---\ndef verificar_daemon():\n    t_normal = threading.Thread(target=lambda: None)\n    t_daemon = threading.Thread(target=lambda: None, daemon=True)\n\n    print(f"Thread normal - daemon: {t_normal.daemon}")   # False\n    print(f"Thread daemon - daemon: {t_daemon.daemon}")   # True\n    print(f"Main thread  - daemon: {threading.main_thread().daemon}")  # False\n\nverificar_daemon()',
        filename: 'daemon_threads.py',
        description:
          'Daemon threads encerram automaticamente com o programa. O atributo daemon deve ser definido antes de start(). A thread principal nunca e daemon.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use threading.local() para criar variaveis que sao privadas de cada thread — cada thread tem sua propria copia independente. Util para conexoes de banco de dados por thread ou contextos de request em servidores web.',
    },
  ],
  challenges: [
    {
      id: 'threads-c1',
      title: 'Contador Thread-Safe com Lock',
      description:
        'Implemente a classe ContadorSeguro com os metodos incrementar(), decrementar() e valor(). O contador deve ser completamente thread-safe: multiplas threads podem chamar incrementar() e decrementar() simultaneamente sem race conditions. Use threading.Lock internamente.',
      language: 'python',
      starterCode:
        'import threading\n\nclass ContadorSeguro:\n    def __init__(self, valor_inicial=0):\n        # TODO: inicialize o contador e o Lock\n        pass\n\n    def incrementar(self, quantidade=1):\n        # TODO: incremente o contador de forma thread-safe\n        pass\n\n    def decrementar(self, quantidade=1):\n        # TODO: decremente o contador de forma thread-safe\n        pass\n\n    def valor(self):\n        # TODO: retorne o valor atual de forma thread-safe\n        pass\n\n\n# Teste: 10 threads incrementam 1000x e 5 threads decrementam 1000x\n# Resultado esperado: 10*1000 - 5*1000 = 5000\ncontador = ContadorSeguro()\n\ndef incrementar_muito():\n    for _ in range(1000):\n        contador.incrementar()\n\ndef decrementar_muito():\n    for _ in range(1000):\n        contador.decrementar()\n\nthreads = []\nfor _ in range(10):\n    threads.append(threading.Thread(target=incrementar_muito))\nfor _ in range(5):\n    threads.append(threading.Thread(target=decrementar_muito))\n\nfor t in threads: t.start()\nfor t in threads: t.join()\n\nprint(f"Valor final: {contador.valor()}")\nprint(f"Correto: {contador.valor() == 5000}")\n',
      solution:
        'import threading\n\nclass ContadorSeguro:\n    def __init__(self, valor_inicial=0):\n        self._valor = valor_inicial\n        self._lock = threading.Lock()\n\n    def incrementar(self, quantidade=1):\n        with self._lock:\n            self._valor += quantidade\n\n    def decrementar(self, quantidade=1):\n        with self._lock:\n            self._valor -= quantidade\n\n    def valor(self):\n        with self._lock:\n            return self._valor\n\n\n# Teste: 10 threads incrementam 1000x e 5 threads decrementam 1000x\n# Resultado esperado: 10*1000 - 5*1000 = 5000\ncontador = ContadorSeguro()\n\ndef incrementar_muito():\n    for _ in range(1000):\n        contador.incrementar()\n\ndef decrementar_muito():\n    for _ in range(1000):\n        contador.decrementar()\n\nthreads = []\nfor _ in range(10):\n    threads.append(threading.Thread(target=incrementar_muito))\nfor _ in range(5):\n    threads.append(threading.Thread(target=decrementar_muito))\n\nfor t in threads: t.start()\nfor t in threads: t.join()\n\nprint(f"Valor final: {contador.valor()}")\nprint(f"Correto: {contador.valor() == 5000}")\n',
      hints: [
        'O Lock deve ser criado no __init__ como atributo da instancia: self._lock = threading.Lock()',
        'Use "with self._lock:" em TODOS os metodos que acessam self._valor — inclusive o getter valor()',
        'O underscore em _valor e _lock indica que sao privados — protege contra acesso direto que bypassaria o lock',
      ],
    },
  ],
};
