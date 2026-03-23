import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-sao-algoritmos',
  moduleId: 'algoritmos',
  title: 'O que sao Algoritmos?',
  description: 'Entenda o conceito de algoritmos e como analisar sua eficiencia.',
  order: 0,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Um **algoritmo** e uma sequencia finita de passos bem definidos para resolver um problema. Voce ja usa algoritmos no dia a dia sem perceber!\n\nUma receita de bolo e um algoritmo: tem ingredientes (entrada), passos a seguir (processamento) e o bolo pronto (saida).',
    },
    {
      type: 'text',
      content: 'Mas nem todo algoritmo e igual. Alguns sao **rapidos**, outros sao **lentos**. Para medir isso, usamos a **notacao Big O**:\n\n**O(1)** — Tempo constante (instantaneo)\n\n**O(n)** — Tempo linear (proporcional ao tamanho da entrada)\n\n**O(n^2)** — Tempo quadratico (fica lento rapidamente)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'complexidade.py',
        code: `# O(1) - Tempo constante
def acessar_primeiro(lista):
    return lista[0]  # Sempre instantaneo

# O(n) - Tempo linear
def buscar(lista, alvo):
    for item in lista:  # Percorre toda a lista
        if item == alvo:
            return True
    return False

# O(n^2) - Tempo quadratico
def tem_duplicatas(lista):
    for i in range(len(lista)):
        for j in range(i + 1, len(lista)):
            if lista[i] == lista[j]:
                return True
    return False`,
        description: 'A complexidade indica como o tempo cresce conforme a entrada aumenta.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Para 1000 elementos: O(1) faz 1 operacao, O(n) faz 1.000, O(n^2) faz 1.000.000! Por isso a eficiencia do algoritmo importa tanto.',
    },
  ],
  challenges: [
    {
      id: 'algoritmos-challenge-1',
      title: 'Encontrar o Maior Valor de uma Lista',
      description:
        'Escreva uma funcao que encontra o maior valor em uma lista de numeros, sem usar a funcao max() do Python. Pense nos passos do algoritmo: inicialize um candidato, percorra a lista e compare.',
      language: 'python',
      starterCode: `def encontrar_maior(lista):
    # Encontre o maior valor da lista sem usar max()
    # Retorne o maior valor
    pass

# Testes
print(encontrar_maior([3, 7, 2, 9, 1]))     # 9
print(encontrar_maior([10]))                  # 10
print(encontrar_maior([-5, -2, -8, -1]))     # -1`,
      solution: `def encontrar_maior(lista):
    maior = lista[0]  # Comeca assumindo que o primeiro e o maior

    for numero in lista:
        if numero > maior:
            maior = numero

    return maior

# Testes
print(encontrar_maior([3, 7, 2, 9, 1]))     # 9
print(encontrar_maior([10]))                  # 10
print(encontrar_maior([-5, -2, -8, -1]))     # -1`,
      hints: [
        'Comece assumindo que o primeiro elemento e o maior.',
        'Percorra a lista comparando cada elemento com o maior atual.',
        'Se encontrar um valor maior, atualize a variavel "maior".',
      ],
    },
    {
      id: 'algoritmos-challenge-2',
      title: 'Contar Pares e Impares',
      description:
        'Escreva uma funcao que recebe uma lista de numeros inteiros e retorna um dicionario com a contagem de numeros pares e impares. Qual a complexidade do seu algoritmo?',
      language: 'python',
      starterCode: `def contar_pares_impares(lista):
    # Retorne um dicionario com as chaves "pares" e "impares"
    # contendo a quantidade de cada tipo
    pass

# Testes
print(contar_pares_impares([1, 2, 3, 4, 5, 6]))   # {"pares": 3, "impares": 3}
print(contar_pares_impares([2, 4, 6]))              # {"pares": 3, "impares": 0}
print(contar_pares_impares([1, 3, 5]))              # {"pares": 0, "impares": 3}`,
      solution: `def contar_pares_impares(lista):
    contagem = {"pares": 0, "impares": 0}

    for numero in lista:
        if numero % 2 == 0:
            contagem["pares"] += 1
        else:
            contagem["impares"] += 1

    return contagem
    # Complexidade: O(n) - percorremos a lista uma unica vez

# Testes
print(contar_pares_impares([1, 2, 3, 4, 5, 6]))   # {"pares": 3, "impares": 3}
print(contar_pares_impares([2, 4, 6]))              # {"pares": 3, "impares": 0}
print(contar_pares_impares([1, 3, 5]))              # {"pares": 0, "impares": 3}`,
      hints: [
        'Use o operador modulo (%) para verificar se um numero e par: numero % 2 == 0.',
        'Crie um dicionario com contadores para pares e impares, ambos comecando em 0.',
        'Percorra a lista uma vez incrementando o contador correto. Isso e O(n)!',
      ],
    },
    {
      id: 'algoritmos-challenge-3',
      title: 'Verificar se a Lista esta Ordenada',
      description:
        'Escreva uma funcao que verifica se uma lista esta ordenada em ordem crescente. Retorne True se estiver ordenada, False caso contrario. Tente fazer com complexidade O(n).',
      language: 'python',
      starterCode: `def esta_ordenada(lista):
    # Verifique se a lista esta em ordem crescente
    # Retorne True ou False
    pass

# Testes
print(esta_ordenada([1, 2, 3, 4, 5]))       # True
print(esta_ordenada([1, 3, 2, 4, 5]))       # False
print(esta_ordenada([5, 4, 3, 2, 1]))       # False
print(esta_ordenada([1]))                     # True
print(esta_ordenada([]))                      # True`,
      solution: `def esta_ordenada(lista):
    for i in range(len(lista) - 1):
        if lista[i] > lista[i + 1]:
            return False
    return True

# Testes
print(esta_ordenada([1, 2, 3, 4, 5]))       # True
print(esta_ordenada([1, 3, 2, 4, 5]))       # False
print(esta_ordenada([5, 4, 3, 2, 1]))       # False
print(esta_ordenada([1]))                     # True
print(esta_ordenada([]))                      # True`,
      hints: [
        'Compare cada elemento com o proximo: lista[i] com lista[i + 1].',
        'Se em algum momento lista[i] > lista[i + 1], a lista NAO esta ordenada.',
        'Cuidado com o indice: percorra ate len(lista) - 1 para nao ultrapassar o limite.',
      ],
    },
  ],
};
