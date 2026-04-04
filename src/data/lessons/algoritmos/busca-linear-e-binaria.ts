import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'busca-linear-e-binaria',
  moduleId: 'algoritmos',
  title: 'Busca Linear e Busca Binaria',
  description: 'Aprenda dois algoritmos fundamentais de busca.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Imagine procurar uma palavra no dicionario. Voce poderia ler pagina por pagina ate encontrar — isso e uma **busca linear**. Ou voce poderia abrir no meio, ver se a palavra esta antes ou depois, e ir dividindo — isso e uma **busca binaria**!\n\nEssas duas estrategias sao a base de muitos algoritmos que vamos ver. Vamos entender cada uma?',
    },
    {
      type: 'text',
      content: 'A **busca** e um dos problemas mais comuns em programacao: dado um conjunto de dados, encontrar um valor especifico. Existem duas abordagens principais, e entender a diferenca entre elas vai mudar a forma como voce pensa sobre eficiencia.',
    },
    {
      type: 'text',
      content: '**Busca Linear** — Verifica cada elemento, um por um, do inicio ao fim. E simples e funciona com qualquer lista (ordenada ou nao), mas pode ser lenta para listas grandes.\n\nA complexidade e **O(n)** — isso significa que, no pior caso, voce precisa olhar todos os "n" elementos da lista. Se a lista tem 1 milhao de itens, pode precisar de 1 milhao de comparacoes!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'busca_linear.py',
        code: 'def busca_linear(lista, alvo):\n    for i in range(len(lista)):\n        if lista[i] == alvo:\n            return i  # Encontrou! Retorna o indice\n    return -1  # Nao encontrou\n\nnumeros = [4, 2, 7, 1, 9, 3, 8]\nresultado = busca_linear(numeros, 9)\nprint("Encontrado no indice: " + str(resultado))  # 4',
        description: 'Busca linear: verifica um por um. Funciona com qualquer lista, mas e O(n).',
      },
    },
    {
      type: 'text',
      content: '**Busca Binaria** — Divide a lista ao meio repetidamente. Muito mais rapida, mas tem um requisito: a lista precisa estar **ordenada**!\n\nA complexidade e **O(log n)** — o que significa "logaritmo". Na pratica, isso quer dizer que a cada passo voce elimina METADE dos dados. E incrivelmente eficiente!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'busca_binaria.py',
        code: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n\n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n\n        if lista[meio] == alvo:\n            return meio           # Encontrou!\n        elif lista[meio] < alvo:\n            inicio = meio + 1     # Busca na metade direita\n        else:\n            fim = meio - 1        # Busca na metade esquerda\n\n    return -1  # Nao encontrou\n\n# A lista PRECISA estar ordenada!\nnumeros = [1, 2, 3, 4, 7, 8, 9]\nresultado = busca_binaria(numeros, 7)\nprint("Encontrado no indice: " + str(resultado))  # 4',
        description: 'Busca binaria: divide ao meio a cada passo. Muito mais rapida, mas a lista precisa estar ordenada!',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Em uma lista de 1.000.000 de elementos, a busca linear faz ate 1.000.000 de comparacoes. A busca binaria faz no maximo 20! Isso e o poder do O(log n).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao se preocupe em decorar os codigos agora. O mais importante e entender a IDEIA: busca linear olha um por um, busca binaria divide ao meio. Com pratica, a implementacao vai ficando natural!',
    },
  ],
  challenges: [
    {
      id: 'busca-challenge-1',
      title: 'Busca Linear com Contagem',
      description:
        'Implemente uma funcao de busca linear que retorna o indice da primeira ocorrencia do valor buscado e tambem conta quantas comparacoes foram feitas. Retorne uma tupla (indice, comparacoes). Se nao encontrar, retorne (-1, comparacoes).',
      language: 'python',
      starterCode: 'def busca_linear_contagem(lista, alvo):\n    # Faca busca linear e conte quantas comparacoes foram necessarias\n    # Retorne uma tupla: (indice, numero_de_comparacoes)\n    # Se nao encontrar: (-1, numero_de_comparacoes)\n    pass\n\n# Testes\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 7))    # (2, 3)\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 9))    # (4, 5)\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 5))    # (-1, 5)\nprint(busca_linear_contagem([10, 20, 30], 10))       # (0, 1)',
      solution: 'def busca_linear_contagem(lista, alvo):\n    comparacoes = 0\n\n    for i in range(len(lista)):\n        comparacoes += 1\n        if lista[i] == alvo:\n            return (i, comparacoes)\n\n    return (-1, comparacoes)\n\n# Testes\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 7))    # (2, 3)\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 9))    # (4, 5)\nprint(busca_linear_contagem([4, 2, 7, 1, 9], 5))    # (-1, 5)\nprint(busca_linear_contagem([10, 20, 30], 10))       # (0, 1)',
      hints: [
        'Crie uma variavel "comparacoes" iniciada em 0 e incremente a cada verificacao.',
        'Retorne uma tupla (indice, comparacoes) quando encontrar o valor.',
        'Se o laco terminar sem encontrar, retorne (-1, comparacoes).',
      ],
    },
    {
      id: 'busca-challenge-2',
      title: 'Busca Binaria Passo a Passo',
      description:
        'Implemente a busca binaria de forma iterativa (usando while, sem recursao). A funcao deve retornar o indice do elemento encontrado, ou -1 se nao existir. Lembre-se: a lista precisa estar ORDENADA!',
      language: 'python',
      starterCode: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    \n    while inicio <= fim:\n        # Calcule o indice do meio\n        # Compare lista[meio] com o alvo\n        # Ajuste inicio ou fim conforme necessario\n        pass\n    \n    return -1  # Nao encontrou\n\n# Testes\nnumeros = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(busca_binaria(numeros, 23))   # 5\nprint(busca_binaria(numeros, 2))    # 0\nprint(busca_binaria(numeros, 91))   # 9\nprint(busca_binaria(numeros, 10))   # -1\nprint(busca_binaria(numeros, 56))   # 7',
      solution: 'def busca_binaria(lista, alvo):\n    inicio = 0\n    fim = len(lista) - 1\n    \n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        \n        if lista[meio] == alvo:\n            return meio          # Encontrou!\n        elif lista[meio] < alvo:\n            inicio = meio + 1    # Busca na metade direita\n        else:\n            fim = meio - 1       # Busca na metade esquerda\n    \n    return -1  # Nao encontrou\n\n# Testes\nnumeros = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\nprint(busca_binaria(numeros, 23))   # 5\nprint(busca_binaria(numeros, 2))    # 0\nprint(busca_binaria(numeros, 91))   # 9\nprint(busca_binaria(numeros, 10))   # -1\nprint(busca_binaria(numeros, 56))   # 7',
      hints: [
        'Calcule o meio com: meio = (inicio + fim) // 2.',
        'Se lista[meio] == alvo, encontrou! Retorne meio.',
        'Se lista[meio] < alvo, o alvo esta na metade direita: faca inicio = meio + 1. Se lista[meio] > alvo, faca fim = meio - 1.',
      ],
    },
    {
      id: 'busca-challenge-3',
      title: 'Contar Ocorrencias com Busca',
      description:
        'Escreva uma funcao que conta quantas vezes um valor aparece em uma lista. Depois, escreva outra versao que faz o mesmo para uma lista ORDENADA usando busca binaria para encontrar o valor e expandir para os lados.',
      language: 'python',
      starterCode: 'def contar_ocorrencias_linear(lista, alvo):\n    # Conte quantas vezes o alvo aparece na lista (busca linear)\n    pass\n\ndef contar_ocorrencias_ordenada(lista, alvo):\n    # Conte quantas vezes o alvo aparece em uma lista ORDENADA\n    # Dica: use busca binaria para achar o alvo, depois expanda\n    pass\n\n# Testes - Busca Linear\nprint(contar_ocorrencias_linear([1, 3, 5, 3, 7, 3, 9], 3))   # 3\nprint(contar_ocorrencias_linear([1, 2, 3, 4, 5], 6))           # 0\n\n# Testes - Lista Ordenada\nprint(contar_ocorrencias_ordenada([1, 3, 3, 3, 5, 7, 9], 3))  # 3\nprint(contar_ocorrencias_ordenada([1, 2, 3, 4, 5], 6))         # 0',
      solution: 'def contar_ocorrencias_linear(lista, alvo):\n    contador = 0\n    for item in lista:\n        if item == alvo:\n            contador += 1\n    return contador\n\ndef contar_ocorrencias_ordenada(lista, alvo):\n    # Primeiro, encontra o alvo com busca binaria\n    inicio = 0\n    fim = len(lista) - 1\n    pos = -1\n\n    while inicio <= fim:\n        meio = (inicio + fim) // 2\n        if lista[meio] == alvo:\n            pos = meio\n            break\n        elif lista[meio] < alvo:\n            inicio = meio + 1\n        else:\n            fim = meio - 1\n\n    if pos == -1:\n        return 0\n\n    # Expande para a esquerda e direita\n    contador = 1\n    esq = pos - 1\n    while esq >= 0 and lista[esq] == alvo:\n        contador += 1\n        esq -= 1\n    dir = pos + 1\n    while dir < len(lista) and lista[dir] == alvo:\n        contador += 1\n        dir += 1\n\n    return contador\n\n# Testes - Busca Linear\nprint(contar_ocorrencias_linear([1, 3, 5, 3, 7, 3, 9], 3))   # 3\nprint(contar_ocorrencias_linear([1, 2, 3, 4, 5], 6))           # 0\n\n# Testes - Lista Ordenada\nprint(contar_ocorrencias_ordenada([1, 3, 3, 3, 5, 7, 9], 3))  # 3\nprint(contar_ocorrencias_ordenada([1, 2, 3, 4, 5], 6))         # 0',
      hints: [
        'Para a versao linear, basta percorrer a lista inteira contando cada ocorrencia.',
        'Para a versao ordenada, use busca binaria para encontrar UMA ocorrencia do valor.',
        'Apos encontrar, expanda para a esquerda e para a direita enquanto o valor for igual ao alvo.',
      ],
    },
  ],
};
