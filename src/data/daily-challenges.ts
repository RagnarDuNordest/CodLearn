export interface DailyChallenge {
  id: string;
  title: string;
  difficulty: 'iniciante' | 'intermediario' | 'avancado';
  language: 'python' | 'javascript';
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  hint?: string;
  tags: string[];
  starter: string;
}

const dailyChallenges: DailyChallenge[] = [
  {
    id: 'dc-new-01',
    title: 'FizzBuzz Reverso',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Dado um número inteiro N, imprima todos os números de 1 até N. Para múltiplos de 3, imprima "Fizz". Para múltiplos de 5, imprima "Buzz". Para múltiplos de ambos, imprima "FizzBuzz".',
    examples: [
      { input: 'N = 5', output: '1\n2\nFizz\n4\nBuzz', explanation: '3 é múltiplo de 3, 5 é múltiplo de 5.' },
      { input: 'N = 15', output: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
    ],
    hint: 'Use o operador % para verificar divisibilidade. Verifique FizzBuzz antes de Fizz e Buzz.',
    tags: ['loops', 'condicionais', 'matemática'],
    starter: `def fizzbuzz(n):
    # Seu código aqui
    pass

fizzbuzz(15)`,
  },
  {
    id: 'dc-new-02',
    title: 'Palíndromo',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Escreva uma função que verifica se uma string é um palíndromo (lida igual de trás para frente). Ignore maiúsculas, minúsculas e espaços.',
    examples: [
      { input: '"racecar"', output: 'True' },
      { input: '"A man a plan a canal Panama"', output: 'True', explanation: 'Após remover espaços e normalizar: "amanaplanacanalpanama".' },
      { input: '"hello"', output: 'False' },
    ],
    hint: 'Converta para minúsculas, remova espaços e compare a string com seu reverso.',
    tags: ['strings', 'manipulação'],
    starter: `def palindromo(s):
    # Seu código aqui
    pass

print(palindromo("racecar"))
print(palindromo("A man a plan a canal Panama"))
print(palindromo("hello"))`,
  },
  {
    id: 'dc-new-03',
    title: 'Fibonacci',
    difficulty: 'iniciante',
    language: 'javascript',
    description:
      'Implemente uma função que retorna o N-ésimo número da sequência de Fibonacci (0-indexada). A sequência começa: 0, 1, 1, 2, 3, 5, 8, 13...',
    examples: [
      { input: 'n = 0', output: '0' },
      { input: 'n = 6', output: '8', explanation: 'A sequência: 0,1,1,2,3,5,8 — índice 6 é 8.' },
      { input: 'n = 10', output: '55' },
    ],
    hint: 'Use um loop simples com duas variáveis para guardar os dois últimos valores.',
    tags: ['matemática', 'loops', 'sequências'],
    starter: `function fibonacci(n) {
  // Seu código aqui
}

console.log(fibonacci(0));
console.log(fibonacci(6));
console.log(fibonacci(10));`,
  },
  {
    id: 'dc-new-04',
    title: 'Anagrama',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Verifique se duas strings são anagramas uma da outra. Dois textos são anagramas se possuem as mesmas letras na mesma quantidade, independente da ordem. Ignore maiúsculas e espaços.',
    examples: [
      { input: '"listen", "silent"', output: 'True' },
      { input: '"Astronomer", "Moon starer"', output: 'True' },
      { input: '"hello", "world"', output: 'False' },
    ],
    hint: 'Ordene os caracteres de cada string (sem espaços, em minúsculas) e compare.',
    tags: ['strings', 'ordenação', 'dicionários'],
    starter: `def anagrama(a, b):
    # Seu código aqui
    pass

print(anagrama("listen", "silent"))
print(anagrama("Astronomer", "Moon starer"))
print(anagrama("hello", "world"))`,
  },
  {
    id: 'dc-new-05',
    title: 'Maior Sequência Consecutiva',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado um array de inteiros, encontre o comprimento da maior subsequência de números consecutivos. Os números não precisam estar em ordem no array.',
    examples: [
      { input: '[100, 4, 200, 1, 3, 2]', output: '4', explanation: 'A sequência 1,2,3,4 tem comprimento 4.' },
      { input: '[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]', output: '9' },
    ],
    hint: 'Converta o array em um Set para busca O(1). Para cada número, verifique se é o início de uma sequência (num-1 não está no Set).',
    tags: ['arrays', 'sets', 'algoritmos'],
    starter: `function maiorSequencia(nums) {
  // Seu código aqui
}

console.log(maiorSequencia([100, 4, 200, 1, 3, 2]));
console.log(maiorSequencia([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));`,
  },
  {
    id: 'dc-new-06',
    title: 'Contagem de Palavras',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Dado um texto, retorne um dicionário com a frequência de cada palavra. Ignore maiúsculas e pontuação (vírgulas, pontos, exclamações).',
    examples: [
      {
        input: '"o gato e o rato"',
        output: "{'o': 2, 'gato': 1, 'e': 1, 'rato': 1}",
      },
      { input: '"Olá, olá! Tudo bem?"', output: "{'olá': 2, 'tudo': 1, 'bem': 1}" },
    ],
    hint: 'Use str.lower() e str.replace() para limpar a string antes de dividir em palavras.',
    tags: ['strings', 'dicionários', 'contagem'],
    starter: `def contar_palavras(texto):
    # Seu código aqui
    pass

print(contar_palavras("o gato e o rato"))
print(contar_palavras("Olá, olá! Tudo bem?"))`,
  },
  {
    id: 'dc-new-07',
    title: 'Dois Somas',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado um array de inteiros e um número alvo, retorne os índices de dois números que somam o alvo. Assuma que existe exatamente uma solução e não use o mesmo elemento duas vezes.',
    examples: [
      { input: 'nums=[2,7,11,15], target=9', output: '[0, 1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { input: 'nums=[3,2,4], target=6', output: '[1, 2]' },
    ],
    hint: 'Use um Map para guardar os valores já vistos. Para cada número, verifique se (target - numero) já está no Map.',
    tags: ['arrays', 'hash map', 'algoritmos'],
    starter: `function doisSomas(nums, target) {
  // Seu código aqui
}

console.log(doisSomas([2, 7, 11, 15], 9));
console.log(doisSomas([3, 2, 4], 6));`,
  },
  {
    id: 'dc-new-08',
    title: 'Inverter String',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Inverta uma string sem usar o fatiamento reverso [::-1] nem a função reversed(). Implemente o algoritmo manualmente.',
    examples: [
      { input: '"hello"', output: '"olleh"' },
      { input: '"Python"', output: '"nohtyP"' },
      { input: '"abcde"', output: '"edcba"' },
    ],
    hint: 'Use dois ponteiros: um no início e outro no final. Troque os caracteres e mova ambos para o centro.',
    tags: ['strings', 'dois ponteiros', 'algoritmos'],
    starter: `def inverter_string(s):
    # Implemente sem usar [::-1] ou reversed()
    s = list(s)  # converta para lista pois strings são imutáveis
    # Seu código aqui
    return ''.join(s)

print(inverter_string("hello"))
print(inverter_string("Python"))`,
  },
  {
    id: 'dc-new-09',
    title: 'Número Primo',
    difficulty: 'iniciante',
    language: 'javascript',
    description:
      'Verifique se um número N é primo. Um número primo é maior que 1 e divisível apenas por 1 e por ele mesmo.',
    examples: [
      { input: '7', output: 'true' },
      { input: '12', output: 'false' },
      { input: '2', output: 'true', explanation: '2 é o menor número primo.' },
    ],
    hint: 'Você só precisa verificar divisores até a raiz quadrada de N para otimizar.',
    tags: ['matemática', 'loops', 'condicionais'],
    starter: `function ehPrimo(n) {
  // Seu código aqui
}

console.log(ehPrimo(7));
console.log(ehPrimo(12));
console.log(ehPrimo(2));
console.log(ehPrimo(1));`,
  },
  {
    id: 'dc-new-10',
    title: 'Pilha com Mínimo',
    difficulty: 'intermediario',
    language: 'python',
    description:
      'Implemente uma pilha (Stack) que, além das operações push e pop, suporte uma operação get_min() que retorna o menor elemento em O(1) — sem percorrer a pilha.',
    examples: [
      {
        input: 'push(5), push(3), push(7), get_min(), pop(), get_min()',
        output: 'get_min()=3, depois get_min()=3',
        explanation: 'Após remover o 7, o mínimo ainda é 3.',
      },
    ],
    hint: 'Use uma pilha auxiliar de mínimos: sempre que um valor menor ou igual ao mínimo atual for inserido, adicione-o também na pilha auxiliar.',
    tags: ['pilha', 'estrutura de dados', 'algoritmos'],
    starter: `class MinStack:
    def __init__(self):
        # Seu código aqui
        pass

    def push(self, val):
        # Seu código aqui
        pass

    def pop(self):
        # Seu código aqui
        pass

    def get_min(self):
        # Seu código aqui
        pass

s = MinStack()
s.push(5)
s.push(3)
s.push(7)
print(s.get_min())  # 3
s.pop()
print(s.get_min())  # 3`,
  },
  {
    id: 'dc-new-11',
    title: 'Achatar Array Aninhado',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado um array com possível aninhamento arbitrário, retorne um array plano com todos os elementos. Implemente sem usar Array.flat().',
    examples: [
      { input: '[1, [2, 3], [4, [5, 6]]]', output: '[1, 2, 3, 4, 5, 6]' },
      { input: '[1, [2, [3, [4, [5]]]]]', output: '[1, 2, 3, 4, 5]' },
    ],
    hint: 'Use recursão: para cada elemento, se for um array, chame a função novamente; senão, adicione ao resultado.',
    tags: ['arrays', 'recursão', 'algoritmos'],
    starter: `function achatar(arr) {
  // Implemente sem Array.flat()
  // Seu código aqui
}

console.log(achatar([1, [2, 3], [4, [5, 6]]]));
console.log(achatar([1, [2, [3, [4, [5]]]]]));`,
  },
  {
    id: 'dc-new-12',
    title: 'Soma dos Dígitos',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Dado um número inteiro positivo, retorne a soma de seus dígitos. Se a soma tiver mais de um dígito, continue somando até obter um único dígito.',
    examples: [
      { input: '493', output: '7', explanation: '4+9+3=16, depois 1+6=7.' },
      { input: '9875', output: '2', explanation: '9+8+7+5=29, depois 2+9=11, depois 1+1=2.' },
      { input: '0', output: '0' },
    ],
    hint: 'Continue aplicando a soma de dígitos enquanto o número for maior que 9. Você pode converter para string para iterar os dígitos.',
    tags: ['matemática', 'loops', 'recursão'],
    starter: `def soma_digitos(n):
    # Seu código aqui
    pass

print(soma_digitos(493))
print(soma_digitos(9875))
print(soma_digitos(0))`,
  },
  {
    id: 'dc-new-13',
    title: 'Comprimir String',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Implemente compressão básica de string: substitua sequências repetidas de caracteres por caractere+contagem. Se a string comprimida não for menor, retorne a original.',
    examples: [
      { input: '"aabcccdddd"', output: '"a2bc3d4"', explanation: 'a aparece 2x, b 1x, c 3x, d 4x. b1 vira apenas b.' },
      { input: '"abcd"', output: '"abcd"', explanation: 'Comprimido seria a1b1c1d1 — maior que o original.' },
    ],
    hint: 'Use um ponteiro e um contador. Quando o caractere mudar, adicione ao resultado. Só inclua o número se for maior que 1.',
    tags: ['strings', 'algoritmos', 'compressão'],
    starter: `function comprimirString(s) {
  // Seu código aqui
}

console.log(comprimirString("aabcccdddd"));
console.log(comprimirString("abcd"));
console.log(comprimirString("aaabbbccc"));`,
  },
  {
    id: 'dc-new-14',
    title: 'Menor Janela Deslizante',
    difficulty: 'avancado',
    language: 'python',
    description:
      'Dado um array de inteiros e um número K, encontre a soma máxima de qualquer subarray de tamanho K.',
    examples: [
      { input: 'arr=[2,1,5,1,3,2], k=3', output: '9', explanation: 'O subarray [5,1,3] tem soma 9.' },
      { input: 'arr=[2,3,4,1,5], k=2', output: '7', explanation: 'O subarray [3,4] tem soma 7.' },
    ],
    hint: 'Calcule a soma dos primeiros K elementos. Depois, deslize a janela adicionando o novo elemento e removendo o mais antigo.',
    tags: ['arrays', 'janela deslizante', 'algoritmos'],
    starter: `def soma_maxima_janela(arr, k):
    # Seu código aqui
    pass

print(soma_maxima_janela([2, 1, 5, 1, 3, 2], 3))
print(soma_maxima_janela([2, 3, 4, 1, 5], 2))`,
  },
  {
    id: 'dc-new-15',
    title: 'Verificar Parênteses',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado uma string com parênteses, colchetes e chaves, verifique se o balanceamento está correto. Cada abre deve ter um fecha correspondente na ordem certa.',
    examples: [
      { input: '"({[]})"', output: 'true' },
      { input: '"([)]"', output: 'false' },
      { input: '"{[]}"', output: 'true' },
    ],
    hint: 'Use uma pilha. Para cada abre, empilhe. Para cada fecha, desempilhe e verifique se corresponde.',
    tags: ['pilha', 'strings', 'estrutura de dados'],
    starter: `function verificarParenteses(s) {
  // Seu código aqui
}

console.log(verificarParenteses("({[]})"));
console.log(verificarParenteses("([)]"));
console.log(verificarParenteses("{[]}"));`,
  },
  {
    id: 'dc-new-16',
    title: 'Remover Duplicatas',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Dado uma lista de inteiros, remova os elementos duplicados mantendo apenas a primeira ocorrência de cada elemento e preservando a ordem original.',
    examples: [
      { input: '[1, 2, 3, 2, 1, 4]', output: '[1, 2, 3, 4]' },
      { input: '[5, 5, 5, 5]', output: '[5]' },
      { input: '[1, 2, 3]', output: '[1, 2, 3]' },
    ],
    hint: 'Use um conjunto (set) para rastrear os elementos já vistos e adicione ao resultado apenas o que ainda não foi visto.',
    tags: ['listas', 'conjuntos', 'algoritmos'],
    starter: `def remover_duplicatas(lst):
    # Seu código aqui (não use list(set(lst)), pois não preserva ordem)
    pass

print(remover_duplicatas([1, 2, 3, 2, 1, 4]))
print(remover_duplicatas([5, 5, 5, 5]))`,
  },
  {
    id: 'dc-new-17',
    title: 'Rotacionar Array',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Rotacione um array K posições para a direita. Elementos que saem pelo final voltam pelo início. Faça in-place (sem criar novos arrays).',
    examples: [
      { input: 'arr=[1,2,3,4,5], k=2', output: '[4,5,1,2,3]' },
      { input: 'arr=[1,2,3], k=4', output: '[3,1,2]', explanation: 'k=4 é equivalente a k=1 para array de tamanho 3.' },
    ],
    hint: 'Inverta o array inteiro, depois inverta os primeiros k%n elementos, depois inverta o restante.',
    tags: ['arrays', 'algoritmos', 'in-place'],
    starter: `function rotacionarArray(arr, k) {
  // Faça a modificação in-place e retorne arr
  // Seu código aqui
  return arr;
}

console.log(rotacionarArray([1, 2, 3, 4, 5], 2));
console.log(rotacionarArray([1, 2, 3], 4));`,
  },
  {
    id: 'dc-new-18',
    title: 'Potência de Número',
    difficulty: 'intermediario',
    language: 'python',
    description:
      'Implemente a função potencia(base, exp) que calcula base elevado ao expoente sem usar o operador ** ou math.pow(). Suporte expoentes negativos e zero.',
    examples: [
      { input: 'base=2, exp=10', output: '1024' },
      { input: 'base=2, exp=-2', output: '0.25' },
      { input: 'base=3, exp=0', output: '1' },
    ],
    hint: 'Use exponenciação por quadratura (fast power): se exp é par, potencia(base, exp) = potencia(base*base, exp/2).',
    tags: ['matemática', 'recursão', 'algoritmos'],
    starter: `def potencia(base, exp):
    # Sem usar ** ou math.pow()
    # Seu código aqui
    pass

print(potencia(2, 10))
print(potencia(2, -2))
print(potencia(3, 0))`,
  },
  {
    id: 'dc-new-19',
    title: 'Maior Substring Sem Repetição',
    difficulty: 'avancado',
    language: 'javascript',
    description:
      'Dado uma string, encontre o comprimento da maior substring sem caracteres repetidos.',
    examples: [
      { input: '"abcabcbb"', output: '3', explanation: 'A substring "abc" tem tamanho 3.' },
      { input: '"bbbbb"', output: '1', explanation: 'Apenas "b".' },
      { input: '"pwwkew"', output: '3', explanation: '"wke" tem tamanho 3.' },
    ],
    hint: 'Use uma janela deslizante com um Map que guarda o índice de cada caractere. Quando encontrar repetição, mova o início da janela.',
    tags: ['strings', 'janela deslizante', 'hash map'],
    starter: `function maiorSubstringUnica(s) {
  // Seu código aqui
}

console.log(maiorSubstringUnica("abcabcbb"));
console.log(maiorSubstringUnica("bbbbb"));
console.log(maiorSubstringUnica("pwwkew"));`,
  },
  {
    id: 'dc-new-20',
    title: 'Ordenação por Bolha',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Implemente o algoritmo Bubble Sort para ordenar uma lista de inteiros em ordem crescente. Não use funções built-in de ordenação.',
    examples: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]' },
      { input: '[5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]' },
    ],
    hint: 'Compare pares adjacentes e troque-os se estiverem fora de ordem. Repita N-1 vezes. Otimize parando cedo se nenhuma troca ocorreu.',
    tags: ['ordenação', 'algoritmos', 'listas'],
    starter: `def bubble_sort(arr):
    arr = arr.copy()  # não modifique o original
    # Seu código aqui
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
print(bubble_sort([5, 1, 4, 2, 8]))`,
  },
  {
    id: 'dc-new-21',
    title: 'Validar Sudoku',
    difficulty: 'avancado',
    language: 'javascript',
    description:
      'Dado um tabuleiro de Sudoku 9x9 (com "." para células vazias), verifique se o estado atual é válido. Não precisa verificar se tem solução — apenas se as regras são respeitadas nas células preenchidas.',
    examples: [
      {
        input: 'board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],...  (tabuleiro válido)',
        output: 'true',
      },
    ],
    hint: 'Verifique cada linha, coluna e sub-box 3x3 usando Sets para detectar duplicatas.',
    tags: ['matrizes', 'hash set', 'algoritmos'],
    starter: `function validarSudoku(board) {
  // Seu código aqui
}

const board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
];
console.log(validarSudoku(board));`,
  },
  {
    id: 'dc-new-22',
    title: 'Contar Ilhas',
    difficulty: 'avancado',
    language: 'python',
    description:
      'Dado um grid 2D com "1" (terra) e "0" (água), conte o número de ilhas. Uma ilha é um grupo de "1"s conectados horizontalmente ou verticalmente.',
    examples: [
      {
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3',
      },
    ],
    hint: 'Percorra o grid. Quando encontrar um "1", incremente o contador e use BFS ou DFS para marcar toda a ilha como visitada (troque para "0").',
    tags: ['grafos', 'DFS', 'BFS', 'matrizes'],
    starter: `def contar_ilhas(grid):
    # Seu código aqui
    pass

grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
print(contar_ilhas(grid))`,
  },
  {
    id: 'dc-new-23',
    title: 'Merge de Listas Ordenadas',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dados dois arrays ordenados, mescle-os em um único array ordenado sem usar sort(). Faça em O(n+m).',
    examples: [
      { input: 'a=[1,3,5], b=[2,4,6]', output: '[1,2,3,4,5,6]' },
      { input: 'a=[1,2,3], b=[4,5,6]', output: '[1,2,3,4,5,6]' },
      { input: 'a=[], b=[1,2]', output: '[1,2]' },
    ],
    hint: 'Use dois ponteiros, um para cada array. Compare os elementos apontados e adicione o menor ao resultado, avançando o ponteiro correspondente.',
    tags: ['arrays', 'ordenação', 'dois ponteiros'],
    starter: `function mergeSortedArrays(a, b) {
  // Sem usar sort()
  // Seu código aqui
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
console.log(mergeSortedArrays([1, 2, 3], [4, 5, 6]));`,
  },
  {
    id: 'dc-new-24',
    title: 'Mochila 0/1 Simplificada',
    difficulty: 'avancado',
    language: 'python',
    description:
      'Dado um conjunto de itens com pesos e valores, e uma capacidade máxima de mochila, encontre o valor máximo que pode ser carregado. Cada item pode ser usado no máximo uma vez.',
    examples: [
      {
        input: 'pesos=[1,3,4,5], valores=[1,4,5,7], capacidade=7',
        output: '9',
        explanation: 'Pegar itens de peso 3 (valor 4) e peso 4 (valor 5) = peso 7, valor 9.',
      },
    ],
    hint: 'Use programação dinâmica: crie uma tabela dp onde dp[i][w] = valor máximo usando os primeiros i itens com capacidade w.',
    tags: ['programação dinâmica', 'algoritmos', 'otimização'],
    starter: `def mochila(pesos, valores, capacidade):
    n = len(pesos)
    # Seu código aqui - use programação dinâmica
    pass

print(mochila([1, 3, 4, 5], [1, 4, 5, 7], 7))`,
  },
  {
    id: 'dc-new-25',
    title: 'Gerar Combinações',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado um array de elementos únicos, retorne todas as combinações possíveis de tamanho K. A ordem dentro de cada combinação não importa, e a ordem das combinações no resultado também não importa.',
    examples: [
      { input: 'arr=[1,2,3], k=2', output: '[[1,2],[1,3],[2,3]]' },
      { input: 'arr=[1,2,3,4], k=3', output: '[[1,2,3],[1,2,4],[1,3,4],[2,3,4]]' },
    ],
    hint: 'Use backtracking: para cada elemento, decida incluí-lo ou não, e continue a partir do próximo índice.',
    tags: ['recursão', 'backtracking', 'combinatória'],
    starter: `function combinacoes(arr, k) {
  const resultado = [];
  // Seu código aqui (use backtracking)
  return resultado;
}

console.log(combinacoes([1, 2, 3], 2));
console.log(combinacoes([1, 2, 3, 4], 3));`,
  },
  {
    id: 'dc-new-26',
    title: 'Calculadora com Pilha',
    difficulty: 'intermediario',
    language: 'python',
    description:
      'Implemente uma calculadora simples que avalie expressões com +, -, * e / (inteiros). A expressão é passada como string. Respeite a precedência dos operadores.',
    examples: [
      { input: '"3+2*2"', output: '7' },
      { input: '" 3/2 "', output: '1', explanation: 'Divisão inteira.' },
      { input: '" 3+5 / 2 "', output: '5' },
    ],
    hint: 'Use uma pilha. Processe o número e guarde de acordo com o operador anterior. + e - guardam direto (com sinal). * e / operam com o topo da pilha.',
    tags: ['pilha', 'strings', 'matemática'],
    starter: `def calcular(s):
    # Seu código aqui
    pass

print(calcular("3+2*2"))
print(calcular(" 3/2 "))
print(calcular(" 3+5 / 2 "))`,
  },
  {
    id: 'dc-new-27',
    title: 'Menor Caminho em Grid',
    difficulty: 'avancado',
    language: 'javascript',
    description:
      'Dado um grid m x n com inteiros não negativos, encontre o caminho do canto superior esquerdo ao canto inferior direito que minimiza a soma dos valores. Só pode mover para direita ou para baixo.',
    examples: [
      { input: '[[1,3,1],[1,5,1],[4,2,1]]', output: '7', explanation: 'Caminho 1→3→1→1→1 = 7.' },
      { input: '[[1,2,3],[4,5,6]]', output: '12' },
    ],
    hint: 'Use programação dinâmica. dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]).',
    tags: ['programação dinâmica', 'matrizes', 'algoritmos'],
    starter: `function menorCaminhoGrid(grid) {
  // Seu código aqui
}

console.log(menorCaminhoGrid([[1,3,1],[1,5,1],[4,2,1]]));
console.log(menorCaminhoGrid([[1,2,3],[4,5,6]]));`,
  },
  {
    id: 'dc-new-28',
    title: 'Formatador de Número de Telefone',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Dado uma string com apenas dígitos, formate-a como número de telefone brasileiro: (XX) XXXXX-XXXX para celular (11 dígitos) ou (XX) XXXX-XXXX para fixo (10 dígitos). Remova tudo que não for dígito antes de formatar.',
    examples: [
      { input: '"11987654321"', output: '"(11) 98765-4321"' },
      { input: '"(11) 3333-4444"', output: '"(11) 3333-4444"' },
      { input: '"011987654321"', output: '"(11) 98765-4321"', explanation: 'Remove o 0 inicial.' },
    ],
    hint: 'Extraia apenas os dígitos primeiro. Se começar com 0, remova. Aplique a máscara de acordo com o tamanho.',
    tags: ['strings', 'regex', 'formatação'],
    starter: `import re

def formatar_telefone(telefone):
    # Seu código aqui
    pass

print(formatar_telefone("11987654321"))
print(formatar_telefone("(11) 3333-4444"))
print(formatar_telefone("011987654321"))`,
  },
  {
    id: 'dc-new-29',
    title: 'Subconjuntos de uma Lista',
    difficulty: 'intermediario',
    language: 'javascript',
    description:
      'Dado um array de elementos únicos, retorne todos os subconjuntos possíveis (conjunto potência). Inclua o subconjunto vazio.',
    examples: [
      { input: '[1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: '[0]', output: '[[], [0]]' },
    ],
    hint: 'Comece com [[]] e, para cada elemento, duplique os subconjuntos existentes adicionando o elemento novo a cada um.',
    tags: ['arrays', 'recursão', 'combinatória'],
    starter: `function subconjuntos(nums) {
  // Seu código aqui
}

console.log(subconjuntos([1, 2, 3]));
console.log(subconjuntos([0]));`,
  },
  {
    id: 'dc-new-30',
    title: 'Busca Binária',
    difficulty: 'iniciante',
    language: 'python',
    description:
      'Implemente busca binária em um array ordenado. Retorne o índice do elemento alvo ou -1 se não encontrado. Sua solução deve ter complexidade O(log n).',
    examples: [
      { input: 'arr=[-1,0,3,5,9,12], target=9', output: '4' },
      { input: 'arr=[-1,0,3,5,9,12], target=2', output: '-1' },
      { input: 'arr=[5], target=5', output: '0' },
    ],
    hint: 'Mantenha ponteiros esquerdo e direito. Calcule o meio. Se arr[meio] == target, retorne meio. Ajuste os ponteiros conforme necessário.',
    tags: ['busca', 'algoritmos', 'arrays'],
    starter: `def busca_binaria(arr, target):
    # Seu código aqui - O(log n) obrigatório
    pass

print(busca_binaria([-1, 0, 3, 5, 9, 12], 9))
print(busca_binaria([-1, 0, 3, 5, 9, 12], 2))
print(busca_binaria([5], 5))`,
  },
];

export default dailyChallenges;
