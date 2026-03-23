export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: { description: string; inputs: string[]; expectedOutput: string }[];
  difficulty: 'fácil' | 'médio' | 'difícil';
  topic: string;
}

export const dailyChallenges: DailyChallenge[] = [
  {
    id: 'dc-01',
    title: 'Soma de Lista',
    description: 'Escreva uma função `soma_lista(nums)` que recebe uma lista de números inteiros e retorna a soma de todos os elementos.',
    starterCode: `def soma_lista(nums):
    # Seu código aqui
    pass

# Teste
print(soma_lista([1, 2, 3, 4, 5]))`,
    solution: `def soma_lista(nums):
    return sum(nums)

print(soma_lista([1, 2, 3, 4, 5]))`,
    testCases: [
      { description: 'Soma de [1,2,3,4,5]', inputs: [], expectedOutput: '15' },
    ],
    difficulty: 'fácil',
    topic: 'Listas',
  },
  {
    id: 'dc-02',
    title: 'Contar Vogais',
    description: 'Escreva uma função `contar_vogais(texto)` que conta quantas vogais (a, e, i, o, u — maiúsculas e minúsculas) existem no texto.',
    starterCode: `def contar_vogais(texto):
    # Seu código aqui
    pass

print(contar_vogais("Hello World"))`,
    solution: `def contar_vogais(texto):
    vogais = "aeiouAEIOU"
    return sum(1 for c in texto if c in vogais)

print(contar_vogais("Hello World"))`,
    testCases: [
      { description: 'Vogais em "Hello World"', inputs: [], expectedOutput: '3' },
    ],
    difficulty: 'fácil',
    topic: 'Strings',
  },
  {
    id: 'dc-03',
    title: 'FizzBuzz',
    description: 'Imprima os números de 1 a 20. Para múltiplos de 3, imprima "Fizz"; de 5, imprima "Buzz"; de ambos, "FizzBuzz".',
    starterCode: `for i in range(1, 21):
    # Seu código aqui
    pass`,
    solution: `for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,
    testCases: [
      { description: 'FizzBuzz de 1 a 20', inputs: [], expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz' },
    ],
    difficulty: 'fácil',
    topic: 'Condicionais',
  },
  {
    id: 'dc-04',
    title: 'Palíndromo',
    description: 'Escreva uma função `palindromo(s)` que retorna True se a string (ignorando maiúsculas/minúsculas) for um palíndromo, False caso contrário.',
    starterCode: `def palindromo(s):
    # Seu código aqui
    pass

print(palindromo("racecar"))
print(palindromo("hello"))`,
    solution: `def palindromo(s):
    s = s.lower()
    return s == s[::-1]

print(palindromo("racecar"))
print(palindromo("hello"))`,
    testCases: [
      { description: 'Palíndromo: racecar e hello', inputs: [], expectedOutput: 'True\nFalse' },
    ],
    difficulty: 'fácil',
    topic: 'Strings',
  },
  {
    id: 'dc-05',
    title: 'Fatorial',
    description: 'Escreva uma função `fatorial(n)` que calcula o fatorial de um número inteiro não-negativo n (sem usar math.factorial).',
    starterCode: `def fatorial(n):
    # Seu código aqui
    pass

print(fatorial(5))
print(fatorial(0))`,
    solution: `def fatorial(n):
    if n == 0:
        return 1
    return n * fatorial(n - 1)

print(fatorial(5))
print(fatorial(0))`,
    testCases: [
      { description: 'Fatorial de 5 e 0', inputs: [], expectedOutput: '120\n1' },
    ],
    difficulty: 'fácil',
    topic: 'Recursão',
  },
  {
    id: 'dc-06',
    title: 'Fibonacci',
    description: 'Imprima os primeiros 10 termos da sequência de Fibonacci separados por espaço.',
    starterCode: `# Imprima os primeiros 10 termos de Fibonacci
# Seu código aqui`,
    solution: `a, b = 0, 1
termos = []
for _ in range(10):
    termos.append(a)
    a, b = b, a + b
print(" ".join(map(str, termos)))`,
    testCases: [
      { description: 'Primeiros 10 termos de Fibonacci', inputs: [], expectedOutput: '0 1 1 2 3 5 8 13 21 34' },
    ],
    difficulty: 'fácil',
    topic: 'Laços',
  },
  {
    id: 'dc-07',
    title: 'Maior e Menor',
    description: 'Escreva uma função `maior_menor(nums)` que retorna uma tupla (maior, menor) sem usar as funções max() ou min().',
    starterCode: `def maior_menor(nums):
    # Seu código aqui
    pass

maior, menor = maior_menor([3, 1, 4, 1, 5, 9, 2, 6])
print(maior, menor)`,
    solution: `def maior_menor(nums):
    maior = nums[0]
    menor = nums[0]
    for n in nums[1:]:
        if n > maior:
            maior = n
        if n < menor:
            menor = n
    return maior, menor

maior, menor = maior_menor([3, 1, 4, 1, 5, 9, 2, 6])
print(maior, menor)`,
    testCases: [
      { description: 'Maior e menor de [3,1,4,1,5,9,2,6]', inputs: [], expectedOutput: '9 1' },
    ],
    difficulty: 'fácil',
    topic: 'Listas',
  },
  {
    id: 'dc-08',
    title: 'Inverter String',
    description: 'Escreva uma função `inverter(s)` que retorna a string invertida sem usar o slice [::-1].',
    starterCode: `def inverter(s):
    # Seu código aqui
    pass

print(inverter("Python"))`,
    solution: `def inverter(s):
    resultado = ""
    for c in s:
        resultado = c + resultado
    return resultado

print(inverter("Python"))`,
    testCases: [
      { description: 'Inverter "Python"', inputs: [], expectedOutput: 'nohtyP' },
    ],
    difficulty: 'fácil',
    topic: 'Strings',
  },
  {
    id: 'dc-09',
    title: 'Números Pares',
    description: 'Escreva uma função `pares(n)` que retorna uma lista com todos os números pares de 0 até n (inclusive).',
    starterCode: `def pares(n):
    # Seu código aqui
    pass

print(pares(10))`,
    solution: `def pares(n):
    return [i for i in range(0, n + 1) if i % 2 == 0]

print(pares(10))`,
    testCases: [
      { description: 'Pares de 0 a 10', inputs: [], expectedOutput: '[0, 2, 4, 6, 8, 10]' },
    ],
    difficulty: 'fácil',
    topic: 'Listas',
  },
  {
    id: 'dc-10',
    title: 'Média de Notas',
    description: 'Escreva uma função `media(notas)` que calcula a média aritmética de uma lista de notas e retorna arredondada para 2 casas decimais.',
    starterCode: `def media(notas):
    # Seu código aqui
    pass

print(media([7.5, 8.0, 6.5, 9.0]))`,
    solution: `def media(notas):
    return round(sum(notas) / len(notas), 2)

print(media([7.5, 8.0, 6.5, 9.0]))`,
    testCases: [
      { description: 'Média de [7.5, 8.0, 6.5, 9.0]', inputs: [], expectedOutput: '7.75' },
    ],
    difficulty: 'fácil',
    topic: 'Listas',
  },
  {
    id: 'dc-11',
    title: 'Número Primo',
    description: 'Escreva uma função `eh_primo(n)` que retorna True se n for um número primo, False caso contrário.',
    starterCode: `def eh_primo(n):
    # Seu código aqui
    pass

print(eh_primo(7))
print(eh_primo(10))`,
    solution: `def eh_primo(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print(eh_primo(7))
print(eh_primo(10))`,
    testCases: [
      { description: 'Primo: 7=True, 10=False', inputs: [], expectedOutput: 'True\nFalse' },
    ],
    difficulty: 'médio',
    topic: 'Matemática',
  },
  {
    id: 'dc-12',
    title: 'Remover Duplicatas',
    description: 'Escreva uma função `remover_duplicatas(lista)` que remove elementos repetidos mantendo a ordem original.',
    starterCode: `def remover_duplicatas(lista):
    # Seu código aqui
    pass

print(remover_duplicatas([1, 2, 3, 2, 1, 4, 5, 4]))`,
    solution: `def remover_duplicatas(lista):
    vistos = set()
    resultado = []
    for item in lista:
        if item not in vistos:
            vistos.add(item)
            resultado.append(item)
    return resultado

print(remover_duplicatas([1, 2, 3, 2, 1, 4, 5, 4]))`,
    testCases: [
      { description: 'Remover duplicatas mantendo ordem', inputs: [], expectedOutput: '[1, 2, 3, 4, 5]' },
    ],
    difficulty: 'médio',
    topic: 'Listas',
  },
  {
    id: 'dc-13',
    title: 'Anagrama',
    description: 'Escreva uma função `anagrama(a, b)` que verifica se duas strings são anagramas (ignorando maiúsculas e espaços).',
    starterCode: `def anagrama(a, b):
    # Seu código aqui
    pass

print(anagrama("listen", "silent"))
print(anagrama("hello", "world"))`,
    solution: `def anagrama(a, b):
    a = a.replace(" ", "").lower()
    b = b.replace(" ", "").lower()
    return sorted(a) == sorted(b)

print(anagrama("listen", "silent"))
print(anagrama("hello", "world"))`,
    testCases: [
      { description: 'Anagramas: listen/silent e hello/world', inputs: [], expectedOutput: 'True\nFalse' },
    ],
    difficulty: 'médio',
    topic: 'Strings',
  },
  {
    id: 'dc-14',
    title: 'Conta Palavras',
    description: 'Escreva uma função `conta_palavras(texto)` que retorna um dicionário com a frequência de cada palavra (ignorando maiúsculas).',
    starterCode: `def conta_palavras(texto):
    # Seu código aqui
    pass

result = conta_palavras("o gato e o gato")
print(sorted(result.items()))`,
    solution: `def conta_palavras(texto):
    palavras = texto.lower().split()
    contagem = {}
    for p in palavras:
        contagem[p] = contagem.get(p, 0) + 1
    return contagem

result = conta_palavras("o gato e o gato")
print(sorted(result.items()))`,
    testCases: [
      { description: 'Frequência de palavras', inputs: [], expectedOutput: "[('e', 1), ('gato', 2), ('o', 2)]" },
    ],
    difficulty: 'médio',
    topic: 'Dicionários',
  },
  {
    id: 'dc-15',
    title: 'Ordenação Bolha',
    description: 'Implemente o algoritmo de ordenação por bolha (bubble sort) na função `bubble_sort(lista)`.',
    starterCode: `def bubble_sort(lista):
    # Implemente bubble sort aqui
    pass

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
    solution: `def bubble_sort(lista):
    n = len(lista)
    lista = lista[:]
    for i in range(n):
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
    return lista

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
    testCases: [
      { description: 'Bubble sort de lista desordenada', inputs: [], expectedOutput: '[11, 12, 22, 25, 34, 64, 90]' },
    ],
    difficulty: 'médio',
    topic: 'Algoritmos',
  },
  {
    id: 'dc-16',
    title: 'Números de Armstrong',
    description: 'Escreva uma função `armstrong(n)` que retorna True se n for um número de Armstrong (narcisista): a soma dos dígitos elevados à quantidade de dígitos é igual ao número.',
    starterCode: `def armstrong(n):
    # Seu código aqui
    pass

print(armstrong(153))
print(armstrong(370))
print(armstrong(100))`,
    solution: `def armstrong(n):
    digitos = str(n)
    potencia = len(digitos)
    return sum(int(d) ** potencia for d in digitos) == n

print(armstrong(153))
print(armstrong(370))
print(armstrong(100))`,
    testCases: [
      { description: 'Armstrong: 153, 370 (True), 100 (False)', inputs: [], expectedOutput: 'True\nTrue\nFalse' },
    ],
    difficulty: 'médio',
    topic: 'Matemática',
  },
  {
    id: 'dc-17',
    title: 'Busca Binária',
    description: 'Implemente a busca binária na função `busca_binaria(lista, alvo)` que retorna o índice do elemento ou -1 se não encontrado. A lista já está ordenada.',
    starterCode: `def busca_binaria(lista, alvo):
    # Seu código aqui
    pass

print(busca_binaria([1, 3, 5, 7, 9, 11, 13], 7))
print(busca_binaria([1, 3, 5, 7, 9, 11, 13], 4))`,
    solution: `def busca_binaria(lista, alvo):
    esq, dir = 0, len(lista) - 1
    while esq <= dir:
        meio = (esq + dir) // 2
        if lista[meio] == alvo:
            return meio
        elif lista[meio] < alvo:
            esq = meio + 1
        else:
            dir = meio - 1
    return -1

print(busca_binaria([1, 3, 5, 7, 9, 11, 13], 7))
print(busca_binaria([1, 3, 5, 7, 9, 11, 13], 4))`,
    testCases: [
      { description: 'Busca binária: encontra 7 (índice 3), 4 (-1)', inputs: [], expectedOutput: '3\n-1' },
    ],
    difficulty: 'médio',
    topic: 'Algoritmos',
  },
  {
    id: 'dc-18',
    title: 'Pilha com Lista',
    description: 'Implemente uma pilha (stack) usando lista Python com métodos push(item), pop() e peek(). Exiba os resultados conforme indicado.',
    starterCode: `class Pilha:
    def __init__(self):
        self.dados = []

    def push(self, item):
        # Seu código aqui
        pass

    def pop(self):
        # Seu código aqui
        pass

    def peek(self):
        # Seu código aqui
        pass

p = Pilha()
p.push(1)
p.push(2)
p.push(3)
print(p.peek())
print(p.pop())
print(p.peek())`,
    solution: `class Pilha:
    def __init__(self):
        self.dados = []

    def push(self, item):
        self.dados.append(item)

    def pop(self):
        return self.dados.pop()

    def peek(self):
        return self.dados[-1]

p = Pilha()
p.push(1)
p.push(2)
p.push(3)
print(p.peek())
print(p.pop())
print(p.peek())`,
    testCases: [
      { description: 'Pilha: peek=3, pop=3, peek=2', inputs: [], expectedOutput: '3\n3\n2' },
    ],
    difficulty: 'médio',
    topic: 'Estruturas de Dados',
  },
  {
    id: 'dc-19',
    title: 'Matriz Transposta',
    description: 'Escreva uma função `transpor(matriz)` que retorna a transposta de uma matriz (lista de listas).',
    starterCode: `def transpor(matriz):
    # Seu código aqui
    pass

m = [[1, 2, 3], [4, 5, 6]]
for linha in transpor(m):
    print(linha)`,
    solution: `def transpor(matriz):
    return [list(linha) for linha in zip(*matriz)]

m = [[1, 2, 3], [4, 5, 6]]
for linha in transpor(m):
    print(linha)`,
    testCases: [
      { description: 'Transposta de [[1,2,3],[4,5,6]]', inputs: [], expectedOutput: '[1, 4]\n[2, 5]\n[3, 6]' },
    ],
    difficulty: 'médio',
    topic: 'Matrizes',
  },
  {
    id: 'dc-20',
    title: 'Flatten de Lista',
    description: 'Escreva uma função `flatten(lista)` que transforma uma lista de listas em uma única lista com todos os elementos.',
    starterCode: `def flatten(lista):
    # Seu código aqui
    pass

print(flatten([[1, 2], [3, 4], [5, 6]]))`,
    solution: `def flatten(lista):
    return [item for sublista in lista for item in sublista]

print(flatten([[1, 2], [3, 4], [5, 6]]))`,
    testCases: [
      { description: 'Flatten de lista de listas', inputs: [], expectedOutput: '[1, 2, 3, 4, 5, 6]' },
    ],
    difficulty: 'fácil',
    topic: 'Listas',
  },
  {
    id: 'dc-21',
    title: 'Potência Recursiva',
    description: 'Escreva uma função recursiva `potencia(base, exp)` que calcula base elevado a exp sem usar o operador **.',
    starterCode: `def potencia(base, exp):
    # Seu código aqui
    pass

print(potencia(2, 10))
print(potencia(3, 4))`,
    solution: `def potencia(base, exp):
    if exp == 0:
        return 1
    return base * potencia(base, exp - 1)

print(potencia(2, 10))
print(potencia(3, 4))`,
    testCases: [
      { description: '2^10 e 3^4', inputs: [], expectedOutput: '1024\n81' },
    ],
    difficulty: 'médio',
    topic: 'Recursão',
  },
  {
    id: 'dc-22',
    title: 'Capitular Palavras',
    description: 'Escreva uma função `capitalizar(texto)` que coloca a primeira letra de cada palavra em maiúsculo sem usar str.title().',
    starterCode: `def capitalizar(texto):
    # Seu código aqui
    pass

print(capitalizar("bem vindo ao codlearn"))`,
    solution: `def capitalizar(texto):
    return " ".join(p[0].upper() + p[1:] if p else p for p in texto.split(" "))

print(capitalizar("bem vindo ao codlearn"))`,
    testCases: [
      { description: 'Capitalizar cada palavra', inputs: [], expectedOutput: 'Bem Vindo Ao Codlearn' },
    ],
    difficulty: 'fácil',
    topic: 'Strings',
  },
  {
    id: 'dc-23',
    title: 'Segundo Maior',
    description: 'Escreva uma função `segundo_maior(nums)` que retorna o segundo maior valor único de uma lista sem usar sort() nem sorted().',
    starterCode: `def segundo_maior(nums):
    # Seu código aqui
    pass

print(segundo_maior([3, 1, 4, 1, 5, 9, 2, 6]))`,
    solution: `def segundo_maior(nums):
    unicos = list(set(nums))
    maior = unicos[0]
    for n in unicos[1:]:
        if n > maior:
            maior = n
    segundo = None
    for n in unicos:
        if n == maior:
            continue
        if segundo is None or n > segundo:
            segundo = n
    return segundo

print(segundo_maior([3, 1, 4, 1, 5, 9, 2, 6]))`,
    testCases: [
      { description: 'Segundo maior de [3,1,4,1,5,9,2,6]', inputs: [], expectedOutput: '6' },
    ],
    difficulty: 'médio',
    topic: 'Listas',
  },
  {
    id: 'dc-24',
    title: 'Frequência de Caracteres',
    description: 'Escreva uma função `frequencia(texto)` que retorna o caractere mais frequente da string (ignorando espaços).',
    starterCode: `def frequencia(texto):
    # Seu código aqui
    pass

print(frequencia("programacao"))`,
    solution: `def frequencia(texto):
    texto = texto.replace(" ", "")
    contagem = {}
    for c in texto:
        contagem[c] = contagem.get(c, 0) + 1
    return max(contagem, key=contagem.get)

print(frequencia("programacao"))`,
    testCases: [
      { description: 'Caractere mais frequente em "programacao"', inputs: [], expectedOutput: 'a' },
    ],
    difficulty: 'médio',
    topic: 'Strings',
  },
  {
    id: 'dc-25',
    title: 'Soma de Dígitos',
    description: 'Escreva uma função `soma_digitos(n)` que retorna a soma dos dígitos de um número inteiro positivo.',
    starterCode: `def soma_digitos(n):
    # Seu código aqui
    pass

print(soma_digitos(12345))
print(soma_digitos(9999))`,
    solution: `def soma_digitos(n):
    return sum(int(d) for d in str(n))

print(soma_digitos(12345))
print(soma_digitos(9999))`,
    testCases: [
      { description: 'Soma dos dígitos de 12345 e 9999', inputs: [], expectedOutput: '15\n36' },
    ],
    difficulty: 'fácil',
    topic: 'Matemática',
  },
  {
    id: 'dc-26',
    title: 'Rotacionar Lista',
    description: 'Escreva uma função `rotacionar(lista, k)` que rotaciona a lista k posições para a direita.',
    starterCode: `def rotacionar(lista, k):
    # Seu código aqui
    pass

print(rotacionar([1, 2, 3, 4, 5], 2))`,
    solution: `def rotacionar(lista, k):
    n = len(lista)
    k = k % n
    return lista[-k:] + lista[:-k]

print(rotacionar([1, 2, 3, 4, 5], 2))`,
    testCases: [
      { description: 'Rotacionar [1,2,3,4,5] por 2', inputs: [], expectedOutput: '[4, 5, 1, 2, 3]' },
    ],
    difficulty: 'médio',
    topic: 'Listas',
  },
  {
    id: 'dc-27',
    title: 'Triângulo de Pascal',
    description: 'Imprima as primeiras 5 linhas do Triângulo de Pascal, cada linha como uma lista.',
    starterCode: `# Imprima as primeiras 5 linhas do Triângulo de Pascal
# Seu código aqui`,
    solution: `triangulo = [[1]]
for i in range(1, 5):
    linha_anterior = triangulo[-1]
    linha = [1]
    for j in range(1, len(linha_anterior)):
        linha.append(linha_anterior[j-1] + linha_anterior[j])
    linha.append(1)
    triangulo.append(linha)
for linha in triangulo:
    print(linha)`,
    testCases: [
      { description: 'Primeiras 5 linhas do Triângulo de Pascal', inputs: [], expectedOutput: '[1]\n[1, 1]\n[1, 2, 1]\n[1, 3, 3, 1]\n[1, 4, 6, 4, 1]' },
    ],
    difficulty: 'difícil',
    topic: 'Matemática',
  },
  {
    id: 'dc-28',
    title: 'Compressão RLE',
    description: 'Implemente a compressão Run-Length Encoding: converta uma string como "aaabbbcc" em "3a3b2c".',
    starterCode: `def rle(s):
    # Seu código aqui
    pass

print(rle("aaabbbcc"))
print(rle("abcd"))`,
    solution: `def rle(s):
    if not s:
        return ""
    resultado = ""
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            count += 1
        else:
            resultado += str(count) + s[i-1]
            count = 1
    resultado += str(count) + s[-1]
    return resultado

print(rle("aaabbbcc"))
print(rle("abcd"))`,
    testCases: [
      { description: 'RLE de "aaabbbcc" e "abcd"', inputs: [], expectedOutput: '3a3b2c\n1a1b1c1d' },
    ],
    difficulty: 'difícil',
    topic: 'Strings',
  },
  {
    id: 'dc-29',
    title: 'MDC e MMC',
    description: 'Escreva funções `mdc(a, b)` e `mmc(a, b)` que calculam o Máximo Divisor Comum e o Mínimo Múltiplo Comum de dois números.',
    starterCode: `def mdc(a, b):
    # Seu código aqui
    pass

def mmc(a, b):
    # Seu código aqui
    pass

print(mdc(48, 18))
print(mmc(4, 6))`,
    solution: `def mdc(a, b):
    while b:
        a, b = b, a % b
    return a

def mmc(a, b):
    return abs(a * b) // mdc(a, b)

print(mdc(48, 18))
print(mmc(4, 6))`,
    testCases: [
      { description: 'MDC(48,18)=6, MMC(4,6)=12', inputs: [], expectedOutput: '6\n12' },
    ],
    difficulty: 'médio',
    topic: 'Matemática',
  },
  {
    id: 'dc-30',
    title: 'Subconjuntos',
    description: 'Escreva uma função `subconjuntos(lista)` que retorna todos os subconjuntos (power set) de uma lista de inteiros.',
    starterCode: `def subconjuntos(lista):
    # Seu código aqui
    pass

resultado = subconjuntos([1, 2, 3])
for s in sorted(resultado, key=lambda x: (len(x), x)):
    print(s)`,
    solution: `def subconjuntos(lista):
    resultado = [[]]
    for item in lista:
        resultado = resultado + [s + [item] for s in resultado]
    return resultado

resultado = subconjuntos([1, 2, 3])
for s in sorted(resultado, key=lambda x: (len(x), x)):
    print(s)`,
    testCases: [
      { description: 'Todos os subconjuntos de [1,2,3]', inputs: [], expectedOutput: '[]\n[1]\n[2]\n[3]\n[1, 2]\n[1, 3]\n[2, 3]\n[1, 2, 3]' },
    ],
    difficulty: 'difícil',
    topic: 'Algoritmos',
  },
];

export function getTodayChallenge(): DailyChallenge {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % dailyChallenges.length;
  return dailyChallenges[index];
}
