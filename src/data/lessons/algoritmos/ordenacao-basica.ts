import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'ordenacao-basica',
  moduleId: 'algoritmos',
  title: 'Ordenacao: Bubble Sort e Selection Sort',
  description: 'Aprenda dois algoritmos classicos de ordenacao.',
  order: 2,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Imagine que voce esta organizando cartas de baralho na mao. Voce pega uma carta e vai comparando com as outras, colocando cada uma na posicao certa. Isso e exatamente o que os algoritmos de ordenacao fazem!\n\nOrdenar dados e um dos problemas mais estudados em ciencia da computacao. Vamos comecar pelos dois algoritmos mais simples de entender.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao se preocupe se os algoritmos parecerem lentos. Eles sao otimos para aprender a logica de ordenacao! Na pratica, voce vai usar o sort() do Python, que e muito mais rapido. O importante aqui e entender COMO a ordenacao funciona por baixo dos panos.',
    },
    {
      type: 'text',
      content: '**Bubble Sort (Ordenacao por Bolha)** — Compara pares de elementos vizinhos e troca se estiverem fora de ordem. Repete ate a lista estar ordenada.\n\nPor que "bolha"? Porque os maiores valores vao "flutuando" para o final da lista, como bolhas subindo na agua. A cada passada, o maior valor que ainda nao esta no lugar certo vai para sua posicao final.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bubble_sort.py',
        code: 'def bubble_sort(lista):\n    n = len(lista)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                # Troca os elementos (swap)\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n    return lista\n\nnumeros = [64, 34, 25, 12, 22, 11, 90]\nprint(bubble_sort(numeros))\n# [11, 12, 22, 25, 34, 64, 90]',
        description: 'Bubble Sort: compara vizinhos e troca se estiverem fora de ordem. Complexidade: O(n^2) — dois lacos aninhados.',
      },
    },
    {
      type: 'text',
      content: '**Selection Sort (Ordenacao por Selecao)** — Encontra o menor elemento e coloca na primeira posicao. Depois encontra o segundo menor e coloca na segunda posicao. E assim por diante.\n\nE como organizar cartas na mesa: voce procura a menor, coloca no inicio, procura a proxima menor, e vai montando a sequencia.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'selection_sort.py',
        code: 'def selection_sort(lista):\n    n = len(lista)\n    for i in range(n):\n        menor_idx = i\n        for j in range(i + 1, n):\n            if lista[j] < lista[menor_idx]:\n                menor_idx = j\n        # Troca o menor com a posicao atual\n        lista[i], lista[menor_idx] = lista[menor_idx], lista[i]\n    return lista\n\nnumeros = [64, 25, 12, 22, 11]\nprint(selection_sort(numeros))\n# [11, 12, 22, 25, 64]',
        description: 'Selection Sort: encontra o menor e posiciona. Tambem O(n^2), mas faz menos trocas que o Bubble Sort.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Bubble Sort e Selection Sort sao **O(n^2)** — isso significa que se a lista dobrar de tamanho, o tempo quadruplica! Sao bons para aprender, mas lentos para dados grandes. Na pratica, usamos algoritmos mais eficientes como Merge Sort — O(n log n) — ou o sort() do Python.',
    },
  ],
  challenges: [
    {
      id: 'ordenacao-challenge-1',
      title: 'Implementar Bubble Sort com Otimizacao',
      description:
        'Implemente o Bubble Sort com uma otimizacao: se em uma passada completa nenhuma troca for feita, a lista ja esta ordenada e podemos parar. Retorne a lista ordenada e o numero de trocas realizadas.',
      language: 'python',
      starterCode: 'def bubble_sort_otimizado(lista):\n    # Implemente o Bubble Sort com otimizacao\n    # Se nenhuma troca for feita em uma passada, pare\n    # Retorne uma tupla: (lista_ordenada, numero_de_trocas)\n    pass\n\n# Testes\nprint(bubble_sort_otimizado([64, 34, 25, 12, 22, 11, 90]))\n# ([11, 12, 22, 25, 34, 64, 90], ...)\n\nprint(bubble_sort_otimizado([1, 2, 3, 4, 5]))\n# ([1, 2, 3, 4, 5], 0)  # Ja esta ordenada!\n\nprint(bubble_sort_otimizado([5, 1, 4, 2, 8]))\n# ([1, 2, 4, 5, 8], ...)',
      solution: 'def bubble_sort_otimizado(lista):\n    lista = lista.copy()  # Nao modifica a original\n    n = len(lista)\n    trocas = 0\n\n    for i in range(n):\n        houve_troca = False\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n                trocas += 1\n                houve_troca = True\n        if not houve_troca:\n            break  # Lista ja esta ordenada!\n\n    return (lista, trocas)\n\n# Testes\nprint(bubble_sort_otimizado([64, 34, 25, 12, 22, 11, 90]))\n# ([11, 12, 22, 25, 34, 64, 90], ...)\n\nprint(bubble_sort_otimizado([1, 2, 3, 4, 5]))\n# ([1, 2, 3, 4, 5], 0)  # Ja esta ordenada!\n\nprint(bubble_sort_otimizado([5, 1, 4, 2, 8]))\n# ([1, 2, 4, 5, 8], ...)',
      hints: [
        'Use uma variavel booleana "houve_troca" que comeca como False em cada passada.',
        'Mude para True quando fizer uma troca. Se ao final da passada ainda for False, pare.',
        'Conte cada troca incrementando uma variavel "trocas" a cada vez que trocar elementos.',
      ],
    },
    {
      id: 'ordenacao-challenge-2',
      title: 'Implementar Selection Sort',
      description:
        'Implemente o Selection Sort do zero. A funcao deve ordenar a lista encontrando o menor elemento e colocando-o na posicao correta a cada iteracao. Retorne a lista ordenada.',
      language: 'python',
      starterCode: 'def selection_sort(lista):\n    # Implemente o Selection Sort\n    # Para cada posicao i, encontre o menor elemento\n    # da posicao i ate o final e coloque-o na posicao i\n    pass\n\n# Testes\nprint(selection_sort([64, 25, 12, 22, 11]))    # [11, 12, 22, 25, 64]\nprint(selection_sort([5, 3, 8, 1, 2]))          # [1, 2, 3, 5, 8]\nprint(selection_sort([1]))                       # [1]\nprint(selection_sort([3, 1]))                    # [1, 3]',
      solution: 'def selection_sort(lista):\n    lista = lista.copy()  # Nao modifica a original\n    n = len(lista)\n\n    for i in range(n):\n        menor_idx = i\n        for j in range(i + 1, n):\n            if lista[j] < lista[menor_idx]:\n                menor_idx = j\n        # Troca o menor com a posicao atual\n        lista[i], lista[menor_idx] = lista[menor_idx], lista[i]\n\n    return lista\n\n# Testes\nprint(selection_sort([64, 25, 12, 22, 11]))    # [11, 12, 22, 25, 64]\nprint(selection_sort([5, 3, 8, 1, 2]))          # [1, 2, 3, 5, 8]\nprint(selection_sort([1]))                       # [1]\nprint(selection_sort([3, 1]))                    # [1, 3]',
      hints: [
        'O laco externo percorre cada posicao i da lista.',
        'O laco interno encontra o indice do MENOR elemento de i+1 ate o fim.',
        'Depois de encontrar o menor, troque lista[i] com lista[menor_idx].',
      ],
    },
    {
      id: 'ordenacao-challenge-3',
      title: 'Ordenar e Encontrar a Mediana',
      description:
        'Escreva uma funcao que ordena uma lista usando qualquer algoritmo de ordenacao (Bubble Sort ou Selection Sort) e depois retorna a mediana. A mediana e o valor do meio. Se a lista tiver numero par de elementos, retorne a media dos dois valores centrais.',
      language: 'python',
      starterCode: 'def mediana(lista):\n    # 1. Ordene a lista (implemente Bubble Sort ou Selection Sort)\n    # 2. Encontre a mediana:\n    #    - Se a lista tem tamanho impar: retorne o elemento do meio\n    #    - Se a lista tem tamanho par: retorne a media dos dois do meio\n    pass\n\n# Testes\nprint(mediana([3, 1, 4, 1, 5]))          # 3\nprint(mediana([7, 2, 9, 4]))              # 5.5  (media de 4 e 7)\nprint(mediana([10]))                       # 10\nprint(mediana([5, 2, 8, 1, 9, 3]))       # 4.0  (media de 3 e 5)',
      solution: 'def mediana(lista):\n    # Passo 1: Ordenar com Bubble Sort\n    lista = lista.copy()\n    n = len(lista)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if lista[j] > lista[j + 1]:\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n\n    # Passo 2: Encontrar a mediana\n    meio = n // 2\n    if n % 2 == 1:\n        return lista[meio]\n    else:\n        return (lista[meio - 1] + lista[meio]) / 2\n\n# Testes\nprint(mediana([3, 1, 4, 1, 5]))          # 3\nprint(mediana([7, 2, 9, 4]))              # 5.5  (media de 4 e 7)\nprint(mediana([10]))                       # 10\nprint(mediana([5, 2, 8, 1, 9, 3]))       # 4.0  (media de 3 e 5)',
      hints: [
        'Primeiro ordene a lista usando Bubble Sort ou Selection Sort.',
        'Para a mediana: calcule meio = len(lista) // 2. Se tamanho impar, retorne lista[meio].',
        'Se tamanho par, retorne (lista[meio - 1] + lista[meio]) / 2.',
      ],
    },
  ],
};
