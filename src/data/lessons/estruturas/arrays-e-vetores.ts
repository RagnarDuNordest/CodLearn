import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arrays-e-vetores',
  moduleId: 'estruturas',
  title: 'Arrays e Vetores',
  description: 'Entenda a estrutura de dados mais fundamental: arrays.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Um **array** (ou vetor) e uma colecao de elementos do mesmo tipo armazenados em posicoes consecutivas na memoria. E a estrutura de dados mais basica e fundamental!\n\nVoce ja usou arrays em Python (listas) e em C. Agora vamos entender como eles funcionam por dentro.',
    },
    {
      type: 'comparison',
      comparison: {
        python: {
          language: 'python',
          filename: 'array.py',
          code: `# Listas em Python sao dinamicas
notas = [8.0, 7.5, 9.0]
notas.append(6.5)  # Cresce automaticamente
print(notas[0])    # 8.0
print(len(notas))  # 4`,
        },
        c: {
          language: 'c',
          filename: 'array.c',
          code: `#include <stdio.h>

int main() {
    // Arrays em C tem tamanho FIXO
    float notas[3] = {8.0, 7.5, 9.0};
    printf("%.1f\\n", notas[0]); // 8.0

    // Nao pode crescer!
    // notas[3] = 6.5; // PERIGO!
    return 0;
}`,
        },
        explanation: 'Em Python, listas crescem automaticamente. Em C, arrays tem tamanho fixo definido na criacao.',
      },
    },
    {
      type: 'text',
      content: 'Caracteristicas dos arrays:\n\n**Acesso direto** — Acessar qualquer posicao e instantaneo: O(1)\n\n**Tamanho fixo** (em C) — Definido na criacao\n\n**Memoria contígua** — Elementos ficam lado a lado na memoria\n\n**Insercao/remocao** — Lenta no meio, pois precisa mover elementos: O(n)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'percorrer_array.c',
        code: `#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int tamanho = sizeof(numeros) / sizeof(numeros[0]);

    // Percorrendo o array
    for (int i = 0; i < tamanho; i++) {
        printf("numeros[%d] = %d\\n", i, numeros[i]);
    }

    // Buscando um valor
    int busca = 30;
    for (int i = 0; i < tamanho; i++) {
        if (numeros[i] == busca) {
            printf("Encontrado na posicao %d\\n", i);
            break;
        }
    }

    return 0;
}`,
        description: 'sizeof(array) / sizeof(array[0]) calcula o tamanho do array em C.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Arrays sao a base de quase todas as outras estruturas de dados! Pilhas, filas e ate tabelas hash podem ser implementadas usando arrays.',
    },
  ],
  challenges: [
    {
      id: 'arrays-challenge-1',
      title: 'Maior e Menor Elemento',
      description:
        'Escreva uma funcao que recebe uma lista de numeros e retorna uma tupla com o maior e o menor elemento. NAO use as funcoes max() ou min().',
      language: 'python',
      starterCode: `def maior_e_menor(lista):
    # Encontre o maior e o menor elemento da lista
    # NAO use max() ou min()
    # Retorne uma tupla: (maior, menor)
    pass

# Testes
print(maior_e_menor([3, 1, 7, 2, 9, 4]))  # (9, 1)
print(maior_e_menor([5]))                  # (5, 5)
print(maior_e_menor([10, 10, 10]))         # (10, 10)
print(maior_e_menor([-3, -1, -7, -2]))    # (-1, -7)`,
      solution: `def maior_e_menor(lista):
    maior = lista[0]
    menor = lista[0]

    for numero in lista:
        if numero > maior:
            maior = numero
        if numero < menor:
            menor = numero

    return (maior, menor)

# Testes
print(maior_e_menor([3, 1, 7, 2, 9, 4]))  # (9, 1)
print(maior_e_menor([5]))                  # (5, 5)
print(maior_e_menor([10, 10, 10]))         # (10, 10)
print(maior_e_menor([-3, -1, -7, -2]))    # (-1, -7)`,
      hints: [
        'Comece com maior = lista[0] e menor = lista[0] (o primeiro elemento).',
        'Percorra a lista com for. Se o elemento atual for maior que "maior", atualize "maior". Se for menor que "menor", atualize "menor".',
        'No final, retorne os dois valores como uma tupla: return (maior, menor).',
      ],
    },
    {
      id: 'arrays-challenge-2',
      title: 'Contar Aprovados e Reprovados',
      description:
        'Escreva uma funcao que recebe uma lista de notas (0 a 10) e retorna quantos alunos foram aprovados (nota >= 6) e quantos foram reprovados (nota < 6).',
      language: 'python',
      starterCode: `def contar_resultado(notas):
    # Conte quantos aprovados (>= 6) e reprovados (< 6)
    # Retorne uma tupla: (aprovados, reprovados)
    pass

# Testes
print(contar_resultado([7, 4, 8, 5, 9, 3, 6]))  # (4, 3)
print(contar_resultado([10, 9, 8, 7]))            # (4, 0)
print(contar_resultado([0, 1, 2, 3]))             # (0, 4)
print(contar_resultado([6, 5.9]))                 # (1, 1)`,
      solution: `def contar_resultado(notas):
    aprovados = 0
    reprovados = 0

    for nota in notas:
        if nota >= 6:
            aprovados += 1
        else:
            reprovados += 1

    return (aprovados, reprovados)

# Testes
print(contar_resultado([7, 4, 8, 5, 9, 3, 6]))  # (4, 3)
print(contar_resultado([10, 9, 8, 7]))            # (4, 0)
print(contar_resultado([0, 1, 2, 3]))             # (0, 4)
print(contar_resultado([6, 5.9]))                 # (1, 1)`,
      hints: [
        'Crie dois contadores: aprovados = 0 e reprovados = 0.',
        'Para cada nota na lista, use if nota >= 6 para incrementar o contador certo.',
        'No final, retorne os dois contadores como tupla: return (aprovados, reprovados).',
      ],
    },
    {
      id: 'arrays-challenge-3',
      title: 'Calcular a Media',
      description:
        'Escreva uma funcao que calcula a media de uma lista de numeros. Depois, escreva outra funcao que conta quantos numeros estao acima da media. NAO use a funcao sum().',
      language: 'python',
      starterCode: `def calcular_media(lista):
    # Some todos os numeros e divida pelo total
    # NAO use sum()
    pass

def contar_acima_da_media(lista):
    # Use calcular_media() para obter a media
    # Conte quantos numeros sao maiores que a media
    pass

# Testes
print(calcular_media([2, 4, 6, 8, 10]))          # 6.0
print(calcular_media([1, 1, 1, 1]))               # 1.0
print(contar_acima_da_media([2, 4, 6, 8, 10]))   # 2
print(contar_acima_da_media([1, 5, 3, 7, 2]))    # 2`,
      solution: `def calcular_media(lista):
    total = 0
    for numero in lista:
        total += numero
    return total / len(lista)

def contar_acima_da_media(lista):
    media = calcular_media(lista)
    contador = 0
    for numero in lista:
        if numero > media:
            contador += 1
    return contador

# Testes
print(calcular_media([2, 4, 6, 8, 10]))          # 6.0
print(calcular_media([1, 1, 1, 1]))               # 1.0
print(contar_acima_da_media([2, 4, 6, 8, 10]))   # 2
print(contar_acima_da_media([1, 5, 3, 7, 2]))    # 2`,
      hints: [
        'Para a media: some todos os elementos com um for loop, depois divida pelo len(lista).',
        'Para contar acima da media: primeiro chame calcular_media(lista) para obter a media.',
        'Percorra a lista e incremente o contador sempre que numero > media.',
      ],
    },
  ],
};
