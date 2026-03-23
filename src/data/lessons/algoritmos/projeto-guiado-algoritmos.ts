import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-algoritmos',
  moduleId: 'algoritmos',
  title: 'Projeto: Busca e Ordenação',
  description:
    'Implemente busca linear, busca binária e ordenação por bolha do zero — os algoritmos mais cobrados em entrevistas de emprego.',
  order: 8,
  estimatedMinutes: 40,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-algoritmos',
    title: 'Motor de Busca e Ordenação',
    language: 'python',
    scenario:
      'Uma empresa de tecnologia está testando candidatos a desenvolvedor com um desafio prático: implementar algoritmos clássicos sem usar funções prontas do Python (sem sort(), sem in). Você precisa construir tudo do zero.',
    objective:
      'Implementar busca linear, ordenação por bolha (bubble sort) e busca binária usando apenas loops e condicionais básicos.',
    steps: [
      {
        id: 'gp-alg-s1',
        title: 'Implementar busca linear',
        description:
          'Implemente uma função `busca_linear(lista, alvo)` que percorre a lista e retorna o índice do alvo, ou -1 se não encontrar. Não use o operador `in`.',
        starterCode:
          '# Etapa 1: Busca Linear\ndef busca_linear(lista, alvo):\n    # Percorra cada elemento com for\n    # Se elemento == alvo, retorne o indice\n    # Se terminar sem encontrar, retorne -1\n    pass\n\nnumeros = [5, 3, 8, 1, 9, 2, 7]\nresultado = busca_linear(numeros, 9)\nprint("Indice encontrado:", resultado)\nresultado2 = busca_linear(numeros, 4)\nprint("Indice encontrado:", resultado2)\n',
        solution:
          'def busca_linear(lista, alvo):\n    for i in range(len(lista)):\n        if lista[i] == alvo:\n            return i\n    return -1\n\nnumeros = [5, 3, 8, 1, 9, 2, 7]\nresultado = busca_linear(numeros, 9)\nprint("Indice encontrado:", resultado)\nresultado2 = busca_linear(numeros, 4)\nprint("Indice encontrado:", resultado2)',
        hints: [
          'Use for i in range(len(lista)): para iterar com índice.',
          'Dentro do loop: if lista[i] == alvo: return i',
          'Após o loop (sem encontrar): return -1',
        ],
        testCases: [
          {
            description: 'Encontra o 9 no índice 4; não encontra o 4 → -1',
            inputs: [],
            expectedOutput: 'Indice encontrado: 4\nIndice encontrado: -1',
          },
        ],
      },
      {
        id: 'gp-alg-s2',
        title: 'Implementar Bubble Sort',
        description:
          'Implemente `bubble_sort(lista)` que ordena a lista usando o algoritmo de bolha (compara pares adjacentes e troca). Retorne a lista ordenada.',
        starterCode:
          '# Etapa 2: Bubble Sort\ndef bubble_sort(lista):\n    n = len(lista)\n    # Use dois for aninhados\n    # Loop externo: i de 0 ate n-1\n    # Loop interno: j de 0 ate n-i-1\n    # Se lista[j] > lista[j+1], troque\n    return lista\n\nnumeros = [5, 3, 8, 1, 9, 2, 7]\nprint("Original:", numeros)\nordenado = bubble_sort(numeros)\nprint("Ordenado:", ordenado)\n',
        solution:
          'def bubble_sort(lista):\n    n = len(lista)\n    for i in range(n):\n        for j in range(n - i - 1):\n            if lista[j] > lista[j + 1]:\n                lista[j], lista[j + 1] = lista[j + 1], lista[j]\n    return lista\n\nnumeros = [5, 3, 8, 1, 9, 2, 7]\nprint("Original:", numeros)\nordenado = bubble_sort(numeros)\nprint("Ordenado:", ordenado)',
        hints: [
          'for i in range(n): — loop externo (n passagens)',
          'for j in range(n - i - 1): — loop interno (menos comparações a cada passagem)',
          'Troca Python: lista[j], lista[j+1] = lista[j+1], lista[j]',
        ],
        testCases: [
          {
            description: 'Ordena [5,3,8,1,9,2,7] → [1,2,3,5,7,8,9]',
            inputs: [],
            expectedOutput: 'Original: [5, 3, 8, 1, 9, 2, 7]\nOrdenado: [1, 2, 3, 5, 7, 8, 9]',
          },
        ],
      },
      {
        id: 'gp-alg-s3',
        title: 'Implementar busca binária',
        description:
          'Implemente `busca_binaria(lista, alvo)` em uma lista JÁ ORDENADA. Divida ao meio a cada passo: se o meio for o alvo, retorne o índice; se alvo for menor, busque à esquerda; se maior, à direita. Se não encontrar, retorne -1.',
        starterCode:
          '# Etapa 3: Busca Binaria (lista ja ordenada)\ndef busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        # Se lista[meio] == alvo, retorne meio\n        # Se alvo < lista[meio], ajuste fim\n        # Se alvo > lista[meio], ajuste inicio\n    return -1\n\nordenado = [1, 2, 3, 5, 7, 8, 9]\nprint("Busca 7:", busca_binaria(ordenado, 7))\nprint("Busca 4:", busca_binaria(ordenado, 4))\n',
        solution:
          'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif alvo < lista[meio]:\n            fim = meio - 1\n        else:\n            inicio = meio + 1\n    return -1\n\nordenado = [1, 2, 3, 5, 7, 8, 9]\nprint("Busca 7:", busca_binaria(ordenado, 7))\nprint("Busca 4:", busca_binaria(ordenado, 4))',
        hints: [
          'meio = (inicio + fim) // 2 — divisão inteira para encontrar o meio',
          'Se lista[meio] == alvo: return meio',
          'Se alvo < lista[meio]: fim = meio - 1 (descarta metade direita)',
          'Se alvo > lista[meio]: inicio = meio + 1 (descarta metade esquerda)',
        ],
        testCases: [
          {
            description: 'Encontra 7 no índice 4; não encontra 4 → -1',
            inputs: [],
            expectedOutput: 'Busca 7: 4\nBusca 4: -1',
          },
        ],
      },
    ],
  },
};
