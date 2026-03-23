import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'programacao-dinamica',
  moduleId: 'algoritmos',
  title: 'Programacao Dinamica',
  description: 'Aprenda a tecnica de programacao dinamica para resolver problemas complexos dividindo-os em subproblemas menores.',
  order: 5,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '**Programacao Dinamica (PD)** e uma tecnica poderosa para resolver problemas que podem ser divididos em **subproblemas menores que se repetem**. Em vez de recalcular a mesma coisa varias vezes, guardamos os resultados ja calculados e os reutilizamos.\n\nPara usar PD, o problema precisa ter duas propriedades:\n1. **Subestrutura otima** — A solucao otima do problema contem solucoes otimas dos subproblemas.\n2. **Subproblemas sobrepostos** — Os mesmos subproblemas sao resolvidos varias vezes.\n\nExistem duas abordagens:\n- **Memoizacao (top-down)** — Comeca do problema grande e vai dividindo, guardando resultados em um cache.\n- **Tabulacao (bottom-up)** — Comeca dos casos menores e vai construindo ate o problema grande.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fibonacci_sem_pd.py',
        code: `# Fibonacci SEM programacao dinamica — O(2^n) MUITO LENTO!
def fib_lento(n):
    if n <= 1:
        return n
    return fib_lento(n - 1) + fib_lento(n - 2)

# fib_lento(5) chama fib_lento(3) DUAS vezes,
# fib_lento(2) TRES vezes... muita repeticao!
#
#                    fib(5)
#                   /      \\
#              fib(4)       fib(3)
#             /    \\        /    \\
#         fib(3)  fib(2) fib(2)  fib(1)
#        /    \\
#    fib(2)  fib(1)
#
# Para n=30, faz mais de 1 BILHAO de chamadas!
print(fib_lento(10))  # 55 (ainda rapido)
# fib_lento(50) demoraria HORAS!`,
        description: 'Fibonacci recursivo ingenue: recalcula os mesmos valores muitas vezes.',
      },
    },
    {
      type: 'text',
      content: '## Memoizacao (top-down)\n\nA **memoizacao** resolve o problema de recalculos adicionando um **cache** (dicionario) a funcao recursiva. Antes de calcular, verificamos se o resultado ja esta no cache. Se sim, retornamos direto sem recalcular.\n\n- **`cache={}`** como argumento padrao cria um dicionario compartilhado entre chamadas\n- **`@lru_cache(maxsize=None)`** — Decorador do modulo `functools` que aplica memoizacao automaticamente sem precisar gerenciar o cache manualmente',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fibonacci_memoizacao.py',
        code: `# Fibonacci com MEMOIZACAO (top-down) — O(n)
def fib_memo(n, cache={}):
    if n in cache:
        return cache[n]        # Ja calculamos! Retorna direto.
    if n <= 1:
        return n
    cache[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return cache[n]

# Agora cada valor e calculado UMA unica vez!
print(fib_memo(10))   # 55
print(fib_memo(50))   # 12586269025 (instantaneo!)
print(fib_memo(100))  # 354224848179261915075

# Usando o decorador @lru_cache do Python (forma elegante)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_cache(n):
    if n <= 1:
        return n
    return fib_cache(n - 1) + fib_cache(n - 2)

print(fib_cache(100))  # 354224848179261915075`,
        description: 'Memoizacao: guardamos resultados ja calculados em um dicionario (cache).',
      },
    },
    {
      type: 'text',
      content: '## Tabulacao (bottom-up)\n\nA **tabulacao** resolve o problema de forma iterativa, **construindo a solucao de baixo para cima**. Criamos uma tabela (lista) e preenchemos os casos menores primeiro, ate chegar ao resultado desejado. Nao usa recursao, portanto nao corre risco de estourar a pilha de chamadas do Python.\n\nA versao otimizada usa apenas duas variaveis (`anterior` e `atual`) em vez de uma lista inteira, reduzindo o uso de memoria de O(n) para O(1).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fibonacci_tabulacao.py',
        code: `# Fibonacci com TABULACAO (bottom-up) — O(n) tempo, O(n) espaco
def fib_tab(n):
    if n <= 1:
        return n
    tabela = [0] * (n + 1)
    tabela[0] = 0
    tabela[1] = 1
    for i in range(2, n + 1):
        tabela[i] = tabela[i - 1] + tabela[i - 2]
    return tabela[n]

print(fib_tab(10))   # 55
print(fib_tab(50))   # 12586269025

# Versao otimizada — O(n) tempo, O(1) espaco!
def fib_otimizado(n):
    if n <= 1:
        return n
    anterior = 0
    atual = 1
    for i in range(2, n + 1):
        anterior, atual = atual, anterior + atual
    return atual

print(fib_otimizado(100))  # 354224848179261915075`,
        description: 'Tabulacao: construimos a solucao de baixo para cima, preenchendo uma tabela.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Memoizacao (top-down) e mais intuitiva — voce escreve a recursao normal e adiciona um cache. Tabulacao (bottom-up) geralmente usa menos memoria e evita o limite de recursao do Python. Ambas tem a mesma complexidade de tempo.',
    },
    {
      type: 'text',
      content: 'Veja agora um segundo problema classico de PD: **subir escada**. Ele tem a mesma estrutura do Fibonacci — a solucao de `n` depende das solucoes de `n-1` e `n-2` — demonstrando como reconhecer o padrao de PD em diferentes enunciados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'subir_escada.py',
        code: `# Problema classico: Subir Escada
# Voce pode subir 1 ou 2 degraus por vez.
# De quantas formas pode subir uma escada de n degraus?

# Memoizacao (top-down)
def subir_escada_memo(n, cache={}):
    if n in cache:
        return cache[n]
    if n <= 2:
        return n  # 1 degrau = 1 forma, 2 degraus = 2 formas
    cache[n] = subir_escada_memo(n - 1) + subir_escada_memo(n - 2)
    return cache[n]

# Tabulacao (bottom-up)
def subir_escada_tab(n):
    if n <= 2:
        return n
    tabela = [0] * (n + 1)
    tabela[1] = 1
    tabela[2] = 2
    for i in range(3, n + 1):
        tabela[i] = tabela[i - 1] + tabela[i - 2]
    return tabela[n]

# n=1: 1 forma (1)
# n=2: 2 formas (1+1, 2)
# n=3: 3 formas (1+1+1, 1+2, 2+1)
# n=4: 5 formas (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)
print(subir_escada_memo(5))   # 8
print(subir_escada_tab(10))   # 89
print(subir_escada_tab(30))   # 1346269`,
        description: 'Subir escada: um classico de PD. Quantas formas de subir n degraus (1 ou 2 por vez)?',
      },
    },
    {
      type: 'text',
      content: '**Quando usar Programacao Dinamica?**\n\nPergunte-se:\n1. O problema pode ser dividido em subproblemas menores? (Subestrutura otima)\n2. Os mesmos subproblemas aparecem varias vezes? (Subproblemas sobrepostos)\n\nSe a resposta for **sim** para ambas, PD e uma boa abordagem!\n\n**Problemas classicos de PD:**\n- Fibonacci\n- Subir escada\n- Troco de moedas (minimo de moedas)\n- Mochila (Knapsack)\n- Maior subsequencia comum (LCS)\n- Distancia de edicao',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Programacao Dinamica e um dos topicos mais dificeis de algoritmos. Nao tente decorar — tente entender o PADRAO: (1) o problema pode ser dividido em subproblemas menores? (2) esses subproblemas se repetem? Se sim, use memoizacao ou tabulacao. Com pratica, voce vai reconhecer esses padroes naturalmente.',
    },
    {
      type: 'text',
      content: '## Quando usar Programacao Dinamica?\n\nReconhecer quando usar PD e mais importante do que implementar. Pergunte-se:\n\n- "Para calcular resultado(n), preciso de resultado(n-1) e resultado(n-2)?" → **PD!**\n- "Tenho um problema de otimizacao (maximo/minimo) que pode ser dividido?" → **PD!**\n- "Estou calculando a mesma coisa varias vezes em recursao?" → **Adicione memoizacao!**\n\nAlguns exemplos classicos: menor caminho em grade, troco de moedas com minimo de cedulas, maior subsequencia comum, mochila com capacidade limitada.\n\nNos desafios abaixo, cada um segue esse padrao. Leia o enunciado, pense: "qual e o subproblema?" antes de comecar a codar.',
    },
  ],
  challenges: [
    {
      id: 'pd-challenge-1',
      title: 'Fibonacci com Memoizacao',
      description:
        'Implemente a funcao fibonacci que usa memoizacao (dicionario como cache) para calcular o n-esimo numero de Fibonacci de forma eficiente. A funcao deve funcionar para valores grandes de n (ate 1000).',
      language: 'python',
      starterCode: `def fibonacci(n, cache={}):
    # Implemente Fibonacci com memoizacao
    # Use o dicionario cache para guardar resultados ja calculados
    # Casos base: fibonacci(0) = 0, fibonacci(1) = 1
    pass

# Testes
print(fibonacci(0))    # 0
print(fibonacci(1))    # 1
print(fibonacci(10))   # 55
print(fibonacci(30))   # 832040
print(fibonacci(50))   # 12586269025
print(fibonacci(100))  # 354224848179261915075`,
      solution: `def fibonacci(n, cache={}):
    # Verifica se ja calculamos este valor
    if n in cache:
        return cache[n]
    # Casos base
    if n <= 1:
        return n
    # Caso recursivo: calcula e guarda no cache
    cache[n] = fibonacci(n - 1) + fibonacci(n - 2)
    return cache[n]

# Testes
print(fibonacci(0))    # 0
print(fibonacci(1))    # 1
print(fibonacci(10))   # 55
print(fibonacci(30))   # 832040
print(fibonacci(50))   # 12586269025
print(fibonacci(100))  # 354224848179261915075`,
      hints: [
        'Primeiro verifique se n ja esta no cache. Se sim, retorne cache[n].',
        'Os casos base sao n == 0 (retorna 0) e n == 1 (retorna 1).',
        'No caso recursivo, calcule fibonacci(n-1) + fibonacci(n-2), guarde no cache[n] e retorne.',
      ],
    },
    {
      id: 'pd-challenge-2',
      title: 'Subir Escada de N Formas',
      description:
        'Voce esta subindo uma escada com n degraus. A cada passo, voce pode subir 1, 2 ou 3 degraus. Implemente uma funcao que retorna de quantas formas distintas voce pode subir a escada. Use tabulacao (bottom-up).',
      language: 'python',
      starterCode: `def subir_escada(n):
    # Use tabulacao (bottom-up)
    # Pode subir 1, 2 ou 3 degraus por vez
    # Quantas formas de chegar ao degrau n?
    # Dica: formas(n) = formas(n-1) + formas(n-2) + formas(n-3)
    pass

# Testes
print(subir_escada(1))   # 1  (1)
print(subir_escada(2))   # 2  (1+1, 2)
print(subir_escada(3))   # 4  (1+1+1, 1+2, 2+1, 3)
print(subir_escada(4))   # 7  (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1)
print(subir_escada(5))   # 13
print(subir_escada(10))  # 274`,
      solution: `def subir_escada(n):
    if n == 1:
        return 1
    if n == 2:
        return 2
    if n == 3:
        return 4

    tabela = [0] * (n + 1)
    tabela[1] = 1
    tabela[2] = 2
    tabela[3] = 4

    for i in range(4, n + 1):
        tabela[i] = tabela[i - 1] + tabela[i - 2] + tabela[i - 3]

    return tabela[n]

# Testes
print(subir_escada(1))   # 1  (1)
print(subir_escada(2))   # 2  (1+1, 2)
print(subir_escada(3))   # 4  (1+1+1, 1+2, 2+1, 3)
print(subir_escada(4))   # 7  (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1)
print(subir_escada(5))   # 13
print(subir_escada(10))  # 274`,
      hints: [
        'Casos base: 1 degrau = 1 forma, 2 degraus = 2 formas, 3 degraus = 4 formas.',
        'A relacao de recorrencia e: tabela[i] = tabela[i-1] + tabela[i-2] + tabela[i-3].',
        'Crie uma tabela de tamanho n+1 e preencha de 4 ate n usando a formula.',
      ],
    },
    {
      id: 'pd-challenge-3',
      title: 'Troco de Moedas',
      description:
        'Dado um valor alvo e uma lista de moedas disponiveis, encontre o numero minimo de moedas necessarias para atingir o valor. Se nao for possivel, retorne -1. Use tabulacao (bottom-up). Por exemplo, com moedas [1, 5, 10, 25] e valor 30: minimo = 2 moedas (25 + 5).',
      language: 'python',
      starterCode: `def troco_minimo(moedas, valor):
    # Use tabulacao (bottom-up)
    # tabela[i] = minimo de moedas para atingir o valor i
    # Para cada valor de 1 ate valor, tente usar cada moeda
    # Retorne -1 se nao for possivel
    pass

# Testes
print(troco_minimo([1, 5, 10, 25], 30))  # 2 (25 + 5)
print(troco_minimo([1, 5, 10, 25], 11))  # 2 (10 + 1)
print(troco_minimo([1, 5, 10], 7))       # 3 (5 + 1 + 1)
print(troco_minimo([2], 3))              # -1 (impossivel)
print(troco_minimo([1, 3, 4], 6))        # 2 (3 + 3)`,
      solution: `def troco_minimo(moedas, valor):
    # tabela[i] = minimo de moedas para atingir o valor i
    # Inicializa com infinito (impossivel)
    tabela = [float('inf')] * (valor + 1)
    tabela[0] = 0  # 0 moedas para valor 0

    for i in range(1, valor + 1):
        for moeda in moedas:
            if moeda <= i and tabela[i - moeda] + 1 < tabela[i]:
                tabela[i] = tabela[i - moeda] + 1

    return tabela[valor] if tabela[valor] != float('inf') else -1

# Testes
print(troco_minimo([1, 5, 10, 25], 30))  # 2 (25 + 5)
print(troco_minimo([1, 5, 10, 25], 11))  # 2 (10 + 1)
print(troco_minimo([1, 5, 10], 7))       # 3 (5 + 1 + 1)
print(troco_minimo([2], 3))              # -1 (impossivel)
print(troco_minimo([1, 3, 4], 6))        # 2 (3 + 3)`,
      hints: [
        'Crie uma tabela de tamanho valor+1, inicializada com infinito (float("inf")). tabela[0] = 0.',
        'Para cada valor i de 1 a valor, tente cada moeda: se moeda <= i, tabela[i] = min(tabela[i], tabela[i - moeda] + 1).',
        'No final, se tabela[valor] ainda for infinito, retorne -1. Caso contrario, retorne tabela[valor].',
      ],
    },
  ],
};
