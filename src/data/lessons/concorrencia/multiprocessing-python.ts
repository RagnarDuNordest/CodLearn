import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'multiprocessing-python',
  moduleId: 'concorrencia',
  title: 'Multiprocessing',
  description: 'Aprenda a usar multiplos processos para paralelismo real em Python, contornando o GIL para tarefas intensivas de CPU',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Multiprocessing: Paralelismo Real\n\nO GIL (Global Interpreter Lock) do Python impede que threads executem codigo Python em paralelo verdadeiro. Para tarefas CPU-bound, a solucao e usar multiplos processos — cada processo tem seu proprio interpretador Python e GIL.\n\n### Quando usar multiprocessing\n\n- Calculos matematicos intensivos\n- Processamento de imagens ou video\n- Analise de dados em lotes\n- Qualquer tarefa que satura 100% de um nucleo de CPU\n\n### multiprocessing.Process: controle manual\n\n```python\nfrom multiprocessing import Process\n\ndef tarefa(nome):\n    print(f"Processo {nome} rodando")\n\np1 = Process(target=tarefa, args=("A",))\np2 = Process(target=tarefa, args=("B",))\n\np1.start()\np2.start()\n\np1.join()  # aguarda p1 terminar\np2.join()  # aguarda p2 terminar\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from multiprocessing import Pool\nimport time\n\ndef calcular_primo(n: int) -> bool:\n    """Verifica se n e primo — tarefa CPU-bound."""\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nnumeros = list(range(1_000_000, 1_001_000))  # 1000 numeros grandes\n\n# Versao sequencial\nt0 = time.time()\nresultados_seq = [calcular_primo(n) for n in numeros]\nt1 = time.time()\nprint(f"Sequencial: {t1-t0:.2f}s")\n\n# Versao paralela com Pool\nif __name__ == "__main__":  # obrigatorio em Windows!\n    t0 = time.time()\n    with Pool(processes=4) as pool:  # 4 processos = 4 nucleos\n        resultados_par = pool.map(calcular_primo, numeros)\n    t1 = time.time()\n    print(f"Paralelo (4 nucleos): {t1-t0:.2f}s")\n    # Geralmente 3-4x mais rapido em maquina com 4 nucleos\n\n    primos = [n for n, e_primo in zip(numeros, resultados_par) if e_primo]\n    print(f"Primos encontrados: {len(primos)}")',
        filename: 'pool_map.py',
        description: 'Pool.map distribui a lista de entradas entre os processos do pool. O if __name__ == "__main__" e obrigatorio no Windows para evitar recursao infinita na criacao de processos.',
      },
    },
    {
      type: 'text',
      content: '## Comunicacao Entre Processos\n\nProcessos nao compartilham memoria — cada um tem seu proprio espaco. Para comunicar, use:\n\n**Queue**: fila thread-safe e process-safe\n```python\nfrom multiprocessing import Process, Queue\n\ndef produtor(q):\n    for i in range(5):\n        q.put(i)\n    q.put(None)  # sinal de fim\n\ndef consumidor(q):\n    while True:\n        item = q.get()\n        if item is None:\n            break\n        print(f"Processando: {item}")\n\nif __name__ == "__main__":\n    q = Queue()\n    p1 = Process(target=produtor, args=(q,))\n    p2 = Process(target=consumidor, args=(q,))\n    p1.start(); p2.start()\n    p1.join(); p2.join()\n```\n\n**Value e Array**: memoria compartilhada simples\n```python\nfrom multiprocessing import Value\ncontador = Value("i", 0)  # inteiro compartilhado\nwith contador.get_lock():\n    contador.value += 1\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Use Pool.map() para paralelismo simples de dados (cada item independente). Use Process + Queue para pipelines onde um processo produz e outro consome. Para IO-bound, prefira threads ou async.',
    },
  ],
  challenges: [
    {
      id: 'multiproc-c1',
      title: 'Paralelize o Processamento',
      description: 'A funcao processar_arquivo abaixo simula processamento pesado de CPU. Reescreva usando Pool para processar todos os arquivos em paralelo e compare o tempo.',
      language: 'python',
      starterCode: 'import time\nfrom multiprocessing import Pool\n\ndef processar_arquivo(nome: str) -> dict:\n    """Simula processamento pesado (0.5s por arquivo)."""\n    time.sleep(0.5)  # simula CPU-bound\n    return {"arquivo": nome, "linhas": len(nome) * 100, "status": "ok"}\n\narquivos = [f"arquivo_{i}.txt" for i in range(8)]\n\n# Versao sequencial (ja implementada)\nt0 = time.time()\nresultados_seq = [processar_arquivo(a) for a in arquivos]\nt1 = time.time()\nprint(f"Sequencial: {t1-t0:.1f}s ({len(resultados_seq)} arquivos)")\n\n# TODO: implemente versao paralela com Pool\n# Use if __name__ == "__main__" para compatibilidade com Windows\n# Deve processar os 8 arquivos em paralelo e printar o tempo\n',
      solution: 'import time\nfrom multiprocessing import Pool\n\ndef processar_arquivo(nome: str) -> dict:\n    time.sleep(0.5)\n    return {"arquivo": nome, "linhas": len(nome) * 100, "status": "ok"}\n\narquivos = [f"arquivo_{i}.txt" for i in range(8)]\n\nt0 = time.time()\nresultados_seq = [processar_arquivo(a) for a in arquivos]\nt1 = time.time()\nprint(f"Sequencial: {t1-t0:.1f}s")\n\nif __name__ == "__main__":\n    t0 = time.time()\n    with Pool(processes=4) as pool:\n        resultados_par = pool.map(processar_arquivo, arquivos)\n    t1 = time.time()\n    print(f"Paralelo (4 processos): {t1-t0:.1f}s")\n    # Sequencial: ~4.0s | Paralelo: ~1.0s\n    print(f"Resultados: {len(resultados_par)} arquivos processados")\n',
      hints: [
        'Use "with Pool(processes=4) as pool:" para criar o pool e garante fechamento automatico',
        'pool.map(funcao, lista) aplica a funcao a cada elemento da lista em paralelo',
        'O bloco "if __name__ == "__main__":" e obrigatorio no Windows para evitar bugs na criacao de processos',
      ],
    },
  ],
};
