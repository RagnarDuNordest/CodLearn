import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'complexidade',
  moduleId: 'algoritmos',
  title: 'Complexidade de Algoritmos e Notacao Big O',
  description: 'Aprenda a analisar a eficiencia de algoritmos usando a notacao Big O e entenda por que isso importa.',
  order: 4,
  estimatedMinutes: 22,
  sections: [
    {
      type: 'text',
      content: '**Complexidade de algoritmos** e a forma de medir o quao eficiente um algoritmo e. Quando temos dois algoritmos que resolvem o mesmo problema, como saber qual e melhor?\n\nNao basta medir o tempo em segundos — isso depende do computador. Precisamos de uma forma **matematica e universal** de comparar algoritmos. E ai que entra a **notacao Big O**.\n\nA notacao Big O descreve como o tempo de execucao (ou uso de memoria) cresce conforme o tamanho da entrada aumenta.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'o_1_constante.py',
        code: `# O(1) - Tempo constante
# Nao importa o tamanho da lista, sempre faz UMA operacao

def acessar_primeiro(lista):
    return lista[0]

def verificar_par(n):
    return n % 2 == 0

# Ambas as funcoes executam em O(1)
# Mesmo com 1 milhao de elementos, e instantaneo
numeros = list(range(1_000_000))
print(acessar_primeiro(numeros))  # 0
print(verificar_par(42))          # True`,
        description: 'O(1) - Tempo constante: o tempo nao depende do tamanho da entrada.',
      },
    },
    {
      type: 'text',
      content: '**O(n) — Tempo linear**: o tempo de execucao cresce **proporcionalmente** ao tamanho da entrada. Um laco que percorre todos os `n` elementos e O(n). Se a entrada dobrar, o tempo dobra.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'o_n_linear.py',
        code: `# O(n) - Tempo linear
# O tempo cresce proporcionalmente ao tamanho da entrada

def busca_linear(lista, alvo):
    for i in range(len(lista)):
        if lista[i] == alvo:
            return i
    return -1

def soma_lista(lista):
    total = 0
    for num in lista:  # Percorre todos os n elementos
        total += num
    return total

# Se a lista dobra de tamanho, o tempo dobra tambem
print(busca_linear([10, 20, 30, 40, 50], 30))  # 2
print(soma_lista([1, 2, 3, 4, 5]))              # 15`,
        description: 'O(n) - Tempo linear: um laco percorrendo todos os elementos.',
      },
    },
    {
      type: 'text',
      content: '**O(n^2) — Tempo quadratico**: surge tipicamente quando ha **dois lacos aninhados**, cada um percorrendo os `n` elementos. Se a entrada dobrar, o tempo quadruplica. Para entradas grandes, pode se tornar proibitivamente lento.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'o_n2_quadratico.py',
        code: `# O(n^2) - Tempo quadratico
# Dois lacos aninhados percorrendo a entrada

def tem_duplicata(lista):
    n = len(lista)
    for i in range(n):           # n vezes
        for j in range(i + 1, n):  # n vezes (no pior caso)
            if lista[i] == lista[j]:
                return True
    return False

# Se n = 10: ~100 operacoes
# Se n = 1000: ~1.000.000 de operacoes
# Se n = 1.000.000: ~1.000.000.000.000 de operacoes (MUITO lento!)
print(tem_duplicata([1, 2, 3, 4, 5]))     # False
print(tem_duplicata([1, 2, 3, 2, 5]))     # True`,
        description: 'O(n^2) - Tempo quadratico: lacos aninhados. Cuidado com entradas grandes!',
      },
    },
    {
      type: 'text',
      content: '**O(log n) — Tempo logaritmico**: o problema e **dividido pela metade** a cada passo. Com 1 bilhao de elementos, sao necessarios apenas ~30 passos. A busca binaria e o exemplo classico. **O(n log n)** surge em algoritmos de ordenacao eficientes como o Merge Sort e o Tim Sort (usado pelo `.sort()` do Python).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'o_log_n.py',
        code: `# O(log n) - Tempo logaritmico
# A cada passo, o problema e dividido pela metade

def busca_binaria(lista, alvo):
    inicio = 0
    fim = len(lista) - 1

    while inicio <= fim:
        meio = (inicio + fim) // 2
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            inicio = meio + 1
        else:
            fim = meio - 1
    return -1

# Lista com 1 bilhao de elementos: apenas ~30 passos!
# Isso e o poder de O(log n)
lista = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(busca_binaria(lista, 23))  # 5

# O(n log n) - Tempo linearitmico
# Algoritmos eficientes de ordenacao como Merge Sort e Tim Sort
# O sort() do Python usa Tim Sort que e O(n log n)
numeros = [64, 34, 25, 12, 22, 11, 90]
numeros.sort()  # O(n log n) internamente
print(numeros)  # [11, 12, 22, 25, 34, 64, 90]`,
        description: 'O(log n) e O(n log n): dividir o problema pela metade e muito eficiente!',
      },
    },
    {
      type: 'text',
      content: '**Como analisar a complexidade do seu codigo:**\n\n1. **Conte os lacos**: Um laco simples = O(n). Dois lacos aninhados = O(n^2). Tres = O(n^3).\n2. **Divisao pela metade**: Se o problema e dividido por 2 a cada passo = O(log n).\n3. **Ignore constantes**: O(2n) e O(3n) sao ambos O(n). O(n^2 + n) e O(n^2).\n4. **Considere o pior caso**: Big O mede o pior cenario possivel.\n\n**Tabela de comparacao (para n = 1.000.000):**\n\n| Complexidade | Operacoes | Tempo estimado |\n|---|---|---|\n| O(1) | 1 | Instantaneo |\n| O(log n) | ~20 | Instantaneo |\n| O(n) | 1.000.000 | Milissegundos |\n| O(n log n) | ~20.000.000 | Segundos |\n| O(n^2) | 1.000.000.000.000 | Dias/Anos |\n\n**Complexidade de espaco (memoria)** tambem importa! Um algoritmo pode ser rapido mas usar muita memoria. Por exemplo, guardar uma copia da lista inteira usa O(n) de espaco.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'comparacao_eficiencia.py',
        code: `import time

# Comparando O(n^2) vs O(n) para encontrar duplicatas

def duplicata_lenta(lista):
    """O(n^2) - Compara todos os pares"""
    n = len(lista)
    for i in range(n):
        for j in range(i + 1, n):
            if lista[i] == lista[j]:
                return True
    return False

def duplicata_rapida(lista):
    """O(n) - Usa um conjunto (set) para verificar"""
    vistos = set()          # Espaco extra: O(n)
    for num in lista:
        if num in vistos:   # Verificar em set e O(1)
            return True
        vistos.add(num)
    return False

# Teste com lista grande
grande = list(range(20000)) + [0]  # Duplicata no final

inicio = time.time()
duplicata_lenta(grande)
tempo_lento = time.time() - inicio

inicio = time.time()
duplicata_rapida(grande)
tempo_rapido = time.time() - inicio

print(f"O(n^2): {tempo_lento:.4f} segundos")
print(f"O(n):   {tempo_rapido:.6f} segundos")
print(f"A versao O(n) foi {tempo_lento/tempo_rapido:.0f}x mais rapida!")`,
        description: 'Comparacao pratica: trocar tempo por espaco pode ser muito vantajoso.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Na pratica, a maioria dos problemas pode ser resolvida em O(n) ou O(n log n). Se seu algoritmo e O(n^2) ou pior, provavelmente existe uma solucao melhor! Usar estruturas como dicionarios (hash maps) e conjuntos (sets) ajuda a reduzir a complexidade.',
    },
  ],
  challenges: [
    {
      id: 'complexidade-challenge-1',
      title: 'Identificar a Complexidade',
      description:
        'Analise a funcao misteriosa abaixo e determine sua complexidade. Complete a funcao identificar_complexidade que recebe um numero n e retorna quantas operacoes a funcao misteriosa executaria. Dica: conte quantas vezes o laco interno executa no total.',
      language: 'python',
      starterCode: `def funcao_misteriosa(n):
    """Qual e a complexidade desta funcao?"""
    contador = 0
    for i in range(n):
        for j in range(n):
            contador += 1
    return contador

def identificar_complexidade(n):
    # Retorne quantas operacoes a funcao_misteriosa faz para entrada n
    # Pense: quantas vezes o laco interno executa no total?
    pass

# Testes
print(identificar_complexidade(5))    # 25
print(identificar_complexidade(10))   # 100
print(identificar_complexidade(100))  # 10000
print(identificar_complexidade(1000)) # 1000000`,
      solution: `def funcao_misteriosa(n):
    """Qual e a complexidade desta funcao?"""
    contador = 0
    for i in range(n):
        for j in range(n):
            contador += 1
    return contador

def identificar_complexidade(n):
    # Dois lacos aninhados, cada um de 0 a n
    # Total de operacoes: n * n = n^2
    # Complexidade: O(n^2)
    return n * n

# Testes
print(identificar_complexidade(5))    # 25
print(identificar_complexidade(10))   # 100
print(identificar_complexidade(100))  # 10000
print(identificar_complexidade(1000)) # 1000000`,
      hints: [
        'O laco externo executa n vezes.',
        'Para cada iteracao do laco externo, o laco interno tambem executa n vezes.',
        'Total: n * n = n^2. A complexidade e O(n^2).',
      ],
    },
    {
      id: 'complexidade-challenge-2',
      title: 'Otimizar de O(n^2) para O(n)',
      description:
        'A funcao soma_pares_lenta encontra todos os pares de numeros na lista que somam um valor alvo, mas e O(n^2). Reescreva-a como soma_pares_rapida usando um conjunto (set) para que seja O(n). A funcao deve retornar True se existir pelo menos um par que soma ao alvo.',
      language: 'python',
      starterCode: `def soma_pares_lenta(lista, alvo):
    """O(n^2) - verifica todos os pares"""
    n = len(lista)
    for i in range(n):
        for j in range(i + 1, n):
            if lista[i] + lista[j] == alvo:
                return True
    return False

def soma_pares_rapida(lista, alvo):
    # Reescreva usando um set para ser O(n)
    # Dica: para cada numero, verifique se (alvo - numero) ja foi visto
    pass

# Testes
print(soma_pares_rapida([2, 7, 11, 15], 9))        # True (2 + 7 = 9)
print(soma_pares_rapida([1, 2, 3, 4, 5], 10))      # False
print(soma_pares_rapida([3, 5, -4, 8, 11, 1], 6))  # True (5 + 1 = 6)
print(soma_pares_rapida([1, 1], 2))                 # True (1 + 1 = 2)`,
      solution: `def soma_pares_lenta(lista, alvo):
    """O(n^2) - verifica todos os pares"""
    n = len(lista)
    for i in range(n):
        for j in range(i + 1, n):
            if lista[i] + lista[j] == alvo:
                return True
    return False

def soma_pares_rapida(lista, alvo):
    """O(n) - usa um set para verificar complementos"""
    vistos = set()
    for num in lista:
        complemento = alvo - num
        if complemento in vistos:
            return True
        vistos.add(num)
    return False

# Testes
print(soma_pares_rapida([2, 7, 11, 15], 9))        # True (2 + 7 = 9)
print(soma_pares_rapida([1, 2, 3, 4, 5], 10))      # False
print(soma_pares_rapida([3, 5, -4, 8, 11, 1], 6))  # True (5 + 1 = 6)
print(soma_pares_rapida([1, 1], 2))                 # True (1 + 1 = 2)`,
      hints: [
        'Crie um set chamado "vistos" para guardar os numeros ja processados.',
        'Para cada numero, calcule o complemento: alvo - numero.',
        'Se o complemento ja esta no set "vistos", encontramos um par! Senao, adicione o numero ao set.',
      ],
    },
    {
      id: 'complexidade-challenge-3',
      title: 'Comparar Duas Abordagens',
      description:
        'Implemente duas funcoes que verificam se todos os elementos de uma lista sao unicos: uma usando forca bruta O(n^2) e outra usando set O(n). Ambas devem retornar True se todos forem unicos, False se houver duplicata.',
      language: 'python',
      starterCode: `def unicos_forca_bruta(lista):
    # O(n^2): Compare cada par de elementos
    pass

def unicos_com_set(lista):
    # O(n): Use um set para verificar duplicatas
    pass

# Testes
print(unicos_forca_bruta([1, 2, 3, 4, 5]))    # True
print(unicos_forca_bruta([1, 2, 3, 2, 5]))    # False

print(unicos_com_set([1, 2, 3, 4, 5]))        # True
print(unicos_com_set([1, 2, 3, 2, 5]))        # False

# Ambas devem dar o mesmo resultado, mas a segunda e muito mais rapida!
print(unicos_com_set(list(range(10000))))      # True (rapido!)`,
      solution: `def unicos_forca_bruta(lista):
    # O(n^2): Compare cada par de elementos
    n = len(lista)
    for i in range(n):
        for j in range(i + 1, n):
            if lista[i] == lista[j]:
                return False
    return True

def unicos_com_set(lista):
    # O(n): Use um set para verificar duplicatas
    # Se o tamanho do set for igual ao da lista, todos sao unicos
    return len(set(lista)) == len(lista)

# Testes
print(unicos_forca_bruta([1, 2, 3, 4, 5]))    # True
print(unicos_forca_bruta([1, 2, 3, 2, 5]))    # False

print(unicos_com_set([1, 2, 3, 4, 5]))        # True
print(unicos_com_set([1, 2, 3, 2, 5]))        # False

# Ambas devem dar o mesmo resultado, mas a segunda e muito mais rapida!
print(unicos_com_set(list(range(10000))))      # True (rapido!)`,
      hints: [
        'Na forca bruta, use dois lacos aninhados para comparar cada par. Se encontrar iguais, retorne False.',
        'Com set, lembre que um set nao permite duplicatas. Se len(set(lista)) < len(lista), ha duplicatas.',
        'A forma mais simples com set: return len(set(lista)) == len(lista).',
      ],
    },
  ],
};
