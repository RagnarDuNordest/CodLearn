import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'problemas-classicos-concorrencia',
  moduleId: 'concorrencia',
  title: 'Problemas Classicos de Concorrencia',
  description: 'Deadlock, starvation, producer-consumer e semaforos — os problemas classicos que todo dev precisa conhecer',
  order: 4,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Problemas Classicos de Concorrencia\n\n### Deadlock\n\nDeadlock ocorre quando dois ou mais processos/threads ficam esperando um pelo outro indefinidamente.\n\n**Exemplo classico**: Thread A tem o recurso 1 e espera o recurso 2. Thread B tem o recurso 2 e espera o recurso 1. Nenhuma consegue progredir.\n\nQuatro condicoes para deadlock (todas precisam ser verdadeiras):\n1. **Exclusao mutua**: recurso so pode ser usado por um de cada vez\n2. **Hold and wait**: processo segura um recurso enquanto espera outro\n3. **Sem preempcao**: recurso nao pode ser retirado a forca\n4. **Espera circular**: A espera B, B espera C, C espera A\n\n**Prevencao**: adquira locks sempre na mesma ordem em todas as threads.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport time\n\nlock_a = threading.Lock()\nlock_b = threading.Lock()\n\n# DEADLOCK: Thread 1 pega A, Thread 2 pega B, ambas esperam a outra\ndef thread_deadlock_1():\n    with lock_a:\n        time.sleep(0.1)  # simula trabalho\n        with lock_b:     # espera lock_b (que thread_2 tem)\n            print("Thread 1 terminou")\n\ndef thread_deadlock_2():\n    with lock_b:\n        time.sleep(0.1)\n        with lock_a:     # espera lock_a (que thread_1 tem)\n            print("Thread 2 terminou")\n\n# SOLUCAO: sempre adquirir locks na mesma ordem (A antes de B)\ndef thread_segura_1():\n    with lock_a:        # ordem: A primeiro\n        with lock_b:\n            print("Thread 1 terminou com segurança")\n\ndef thread_segura_2():\n    with lock_a:        # mesma ordem: A primeiro\n        with lock_b:\n            print("Thread 2 terminou com segurança")\n\n# Alternativa: usar timeout para detectar deadlock\ndef adquirir_com_timeout(lock, timeout=1.0) -> bool:\n    acquired = lock.acquire(timeout=timeout)\n    if not acquired:\n        print("Possivel deadlock detectado! Abortando.")\n    return acquired',
        filename: 'deadlock.py',
        description: 'A solucao mais simples para deadlock: adquira locks sempre na mesma ordem. Se toda thread pega A antes de B, nunca havera espera circular.',
      },
    },
    {
      type: 'text',
      content: '## Producer-Consumer\n\nUm dos padroes mais comuns em concorrencia: um ou mais producers geram dados, um ou mais consumers processam.\n\nO desafio: o buffer entre eles precisa ser thread-safe e lidar com:\n- Buffer cheio: producer deve esperar\n- Buffer vazio: consumer deve esperar\n\n`queue.Queue` resolve isso automaticamente.\n\n## Semaforos\n\nSemaforo controla acesso a um recurso com capacidade limitada.\n\n```python\nsemaforo = threading.Semaphore(3)  # maximo 3 threads simultaneas\n\ndef acessar_recurso_limitado():\n    with semaforo:  # bloqueia se ja tiver 3 dentro\n        # usa o recurso\n        pass\n```\n\nUtil para: limitar conexoes de banco, limitar chamadas a API com rate limit, controlar pool de workers.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import threading\nimport queue\nimport time\nimport random\n\ndef producer(q: queue.Queue, nome: str, quantidade: int):\n    """Gera itens e coloca na fila."""\n    for i in range(quantidade):\n        item = f"{nome}-item-{i}"\n        q.put(item)  # bloqueia se fila cheia (maxsize)\n        print(f"[PROD] {nome} produziu: {item}")\n        time.sleep(random.uniform(0.1, 0.3))\n    q.put(None)  # sinal de fim para este producer\n\ndef consumer(q: queue.Queue, nome: str, num_producers: int):\n    """Consome itens da fila ate receber todos os sinais de fim."""\n    fins_recebidos = 0\n    while fins_recebidos < num_producers:\n        item = q.get()  # bloqueia se fila vazia\n        if item is None:\n            fins_recebidos += 1\n            continue\n        print(f"[CONS] {nome} processou: {item}")\n        time.sleep(random.uniform(0.2, 0.5))\n        q.task_done()\n\nif __name__ == "__main__":\n    fila = queue.Queue(maxsize=5)  # buffer de 5 itens\n    \n    producers = [\n        threading.Thread(target=producer, args=(fila, f"P{i}", 3))\n        for i in range(2)\n    ]\n    consumer_thread = threading.Thread(\n        target=consumer, args=(fila, "C1", 2)\n    )\n    \n    consumer_thread.start()\n    for p in producers: p.start()\n    for p in producers: p.join()\n    consumer_thread.join()',
        filename: 'producer_consumer.py',
        description: 'queue.Queue e thread-safe por design. O sinal None marca o fim de cada producer. O consumer conta quantos Nones recebeu para saber quando todos os producers terminaram.',
      },
    },
  ],
  challenges: [
    {
      id: 'classicos-c1',
      title: 'Implemente o Semaforo de Conexoes',
      description: 'Implemente um pool de conexoes simulado usando Semaphore. O banco de dados so aceita 3 conexoes simultaneas. Se uma 4a thread tentar conectar, deve esperar ate uma conexao ser liberada.',
      language: 'python',
      starterCode: 'import threading\nimport time\nimport random\n\nMAX_CONEXOES = 3\n\n# TODO: crie um semaforo com limite de MAX_CONEXOES\n# semaforo = ?\n\ndef acessar_banco(thread_id: int):\n    """Simula acesso ao banco — limitado a MAX_CONEXOES simultaneas."""\n    print(f"Thread {thread_id}: esperando conexao...")\n    # TODO: use o semaforo para limitar acesso\n    print(f"Thread {thread_id}: CONECTADO ao banco")\n    time.sleep(random.uniform(0.5, 1.5))  # simula query\n    print(f"Thread {thread_id}: conexao liberada")\n    # TODO: libere a conexao (sai do semaforo)\n\n# Cria 8 threads tentando acessar o banco ao mesmo tempo\nthreads = [threading.Thread(target=acessar_banco, args=(i,)) for i in range(8)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint("Todas as threads terminaram")\n',
      solution: 'import threading\nimport time\nimport random\n\nMAX_CONEXOES = 3\nsemaforo = threading.Semaphore(MAX_CONEXOES)\n\ndef acessar_banco(thread_id: int):\n    print(f"Thread {thread_id}: esperando conexao...")\n    with semaforo:  # bloqueia se ja tiver MAX_CONEXOES dentro\n        print(f"Thread {thread_id}: CONECTADO ao banco")\n        time.sleep(random.uniform(0.5, 1.5))\n        print(f"Thread {thread_id}: conexao liberada")\n\nthreads = [threading.Thread(target=acessar_banco, args=(i,)) for i in range(8)]\nfor t in threads: t.start()\nfor t in threads: t.join()\nprint("Todas as threads terminaram")\n# Voce vera que no maximo 3 threads estao "CONECTADO" ao mesmo tempo\n',
      hints: [
        'Crie o semaforo com threading.Semaphore(MAX_CONEXOES)',
        'Use "with semaforo:" para adquirir e liberar automaticamente',
        'Observe a saida: nunca mais de 3 threads devem estar "CONECTADO" simultaneamente',
      ],
    },
  ],
};
