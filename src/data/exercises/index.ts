export type Difficulty = 'iniciante' | 'intermediario' | 'avancado';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectLabel: string;
  subjectEmoji: string;
  difficulty: Difficulty;
  category: string;
  language: 'python' | 'javascript' | 'sql' | 'c' | 'java' | 'html' | 'css' | 'bash';
  starterCode: string;
  solution: string;
  hints: string[];
  testCases?: { inputs?: string[]; expectedOutput: string; description: string }[];
}

export const exercises: Exercise[] = [
  // ─── PYTHON – Iniciante ───────────────────────────────────────────────────
  {
    id: 'py-i-01',
    title: 'Calculadora de IMC',
    description:
      'Crie uma função que recebe o peso (kg) e a altura (m) de uma pessoa e retorna o seu IMC.\n\nA fórmula é: IMC = peso / (altura * altura)\n\nArredonde o resultado para 2 casas decimais.\n\nExemplo:\n  calcular_imc(70, 1.75) → 22.86\n  calcular_imc(90, 1.60) → 35.16',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'iniciante',
    category: 'Matemática',
    language: 'python',
    starterCode:
      'def calcular_imc(peso, altura):\n    """\n    Retorna o IMC arredondado para 2 casas decimais.\n    peso: float (kg)\n    altura: float (metros)\n    """\n    # Seu código aqui\n    pass\n\nprint(calcular_imc(70, 1.75))\n',
    solution:
      'def calcular_imc(peso, altura):\n    imc = peso / (altura ** 2)\n    return round(imc, 2)\n\nprint(calcular_imc(70, 1.75))\n',
    hints: [
      'Use o operador ** para elevar ao quadrado: altura ** 2.',
      'Divida o peso pela altura ao quadrado.',
      'Use round(valor, 2) para arredondar para 2 casas decimais.',
    ],
    testCases: [
      { inputs: [], expectedOutput: '22.86', description: 'IMC de 70kg e 1.75m' },
    ],
  },
  {
    id: 'py-i-02',
    title: 'Par ou Ímpar',
    description:
      'Crie uma função que recebe um número inteiro e retorna "Par" se for par ou "Ímpar" se for ímpar.\n\nExemplo:\n  par_ou_impar(4) → "Par"\n  par_ou_impar(7) → "Ímpar"\n  par_ou_impar(0) → "Par"',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'python',
    starterCode:
      'def par_ou_impar(numero):\n    """\n    Retorna "Par" ou "Ímpar" dependendo do número.\n    numero: int\n    """\n    # Seu código aqui\n    pass\n\nprint(par_ou_impar(4))\nprint(par_ou_impar(7))\n',
    solution:
      'def par_ou_impar(numero):\n    if numero % 2 == 0:\n        return "Par"\n    else:\n        return "Ímpar"\n\nprint(par_ou_impar(4))\nprint(par_ou_impar(7))\n',
    hints: [
      'Use o operador módulo (%) para verificar o resto da divisão por 2.',
      'Se numero % 2 == 0, o número é par.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'Par\nÍmpar', description: 'Verifica par=4 e ímpar=7' },
    ],
  },
  {
    id: 'py-i-03',
    title: 'Soma de Lista',
    description:
      'Crie uma função que recebe uma lista de números e retorna a soma de todos os elementos.\n\nNão use a função sum() embutida — faça o loop manualmente!\n\nExemplo:\n  soma_lista([1, 2, 3, 4, 5]) → 15\n  soma_lista([10, -3, 7]) → 14\n  soma_lista([]) → 0',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'iniciante',
    category: 'Loops',
    language: 'python',
    starterCode:
      'def soma_lista(numeros):\n    """\n    Retorna a soma de todos os elementos da lista.\n    numeros: list[int | float]\n    Não use sum()!\n    """\n    # Seu código aqui\n    pass\n\nprint(soma_lista([1, 2, 3, 4, 5]))\nprint(soma_lista([10, -3, 7]))\n',
    solution:
      'def soma_lista(numeros):\n    total = 0\n    for n in numeros:\n        total += n\n    return total\n\nprint(soma_lista([1, 2, 3, 4, 5]))\nprint(soma_lista([10, -3, 7]))\n',
    hints: [
      'Inicialize uma variável acumuladora com 0.',
      'Use um for loop para percorrer cada elemento da lista.',
      'Adicione cada elemento ao acumulador dentro do loop.',
    ],
    testCases: [
      { inputs: [], expectedOutput: '15\n14', description: 'Soma de [1..5] e [10,-3,7]' },
    ],
  },
  {
    id: 'py-i-04',
    title: 'Inverter String',
    description:
      'Crie uma função que recebe uma string e retorna ela invertida (de trás para frente).\n\nExemplo:\n  inverter("hello") → "olleh"\n  inverter("Python") → "nohtyP"\n  inverter("abcd") → "dcba"',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'iniciante',
    category: 'Strings',
    language: 'python',
    starterCode:
      'def inverter(texto):\n    """\n    Retorna a string invertida.\n    texto: str\n    """\n    # Seu código aqui\n    pass\n\nprint(inverter("hello"))\nprint(inverter("Python"))\n',
    solution:
      'def inverter(texto):\n    return texto[::-1]\n\nprint(inverter("hello"))\nprint(inverter("Python"))\n',
    hints: [
      'Em Python, você pode usar fatiamento (slicing) para inverter: texto[::-1].',
      'O slice [::-1] percorre a string de trás para frente.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'olleh\nnohtyP', description: 'Inverte "hello" e "Python"' },
    ],
  },
  {
    id: 'py-i-05',
    title: 'Maior de Três',
    description:
      'Crie uma função que recebe três números e retorna o maior deles.\n\nNão use a função max() embutida!\n\nExemplo:\n  maior_de_tres(3, 7, 5) → 7\n  maior_de_tres(10, 2, 8) → 10\n  maior_de_tres(-1, -5, -3) → -1',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'python',
    starterCode:
      'def maior_de_tres(a, b, c):\n    """\n    Retorna o maior entre os três números.\n    Não use max()!\n    """\n    # Seu código aqui\n    pass\n\nprint(maior_de_tres(3, 7, 5))\nprint(maior_de_tres(10, 2, 8))\n',
    solution:
      'def maior_de_tres(a, b, c):\n    if a >= b and a >= c:\n        return a\n    elif b >= a and b >= c:\n        return b\n    else:\n        return c\n\nprint(maior_de_tres(3, 7, 5))\nprint(maior_de_tres(10, 2, 8))\n',
    hints: [
      'Compare a com b e c usando if/elif/else.',
      'Use o operador and para combinar duas condições.',
    ],
    testCases: [
      { inputs: [], expectedOutput: '7\n10', description: 'Maior de (3,7,5) e (10,2,8)' },
    ],
  },

  // ─── PYTHON – Intermediário ───────────────────────────────────────────────
  {
    id: 'py-m-01',
    title: 'FizzBuzz',
    description:
      'Crie uma função que recebe um número N e imprime todos os números de 1 até N (inclusive) seguindo as regras:\n- Se divisível por 3: imprime "Fizz"\n- Se divisível por 5: imprime "Buzz"\n- Se divisível por 3 e 5: imprime "FizzBuzz"\n- Caso contrário: imprime o número\n\nExemplo para N=15:\n1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'intermediario',
    category: 'Loops',
    language: 'python',
    starterCode:
      'def fizzbuzz(n):\n    """\n    Imprime FizzBuzz de 1 até n.\n    Divisível por 3 → "Fizz"\n    Divisível por 5 → "Buzz"\n    Divisível por 3 e 5 → "FizzBuzz"\n    Caso contrário → o número\n    """\n    # Seu código aqui\n    pass\n\nfizzbuzz(15)\n',
    solution:
      'def fizzbuzz(n):\n    for i in range(1, n + 1):\n        if i % 3 == 0 and i % 5 == 0:\n            print("FizzBuzz")\n        elif i % 3 == 0:\n            print("Fizz")\n        elif i % 5 == 0:\n            print("Buzz")\n        else:\n            print(i)\n\nfizzbuzz(15)\n',
    hints: [
      'Verifique divisibilidade por 3 e 5 primeiro (usando and), antes de verificar cada um separadamente.',
      'Use range(1, n+1) para iterar de 1 até n inclusive.',
      'Lembre-se: use % para verificar divisibilidade.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz',
        description: 'FizzBuzz de 1 a 15',
      },
    ],
  },
  {
    id: 'py-m-02',
    title: 'Verificar Palíndromo',
    description:
      'Crie uma função que verifica se uma palavra é um palíndromo (lê-se igual de frente para trás). Ignore maiúsculas/minúsculas e espaços.\n\nExemplo:\n  palindromo("arara") → True\n  palindromo("Python") → False\n  palindromo("A man a plan a canal Panama") → True\n  palindromo("Ovo") → True',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'intermediario',
    category: 'Strings',
    language: 'python',
    starterCode:
      'def palindromo(texto):\n    """\n    Retorna True se o texto for palíndromo, False caso contrário.\n    Ignore maiúsculas e espaços.\n    texto: str\n    """\n    # Seu código aqui\n    pass\n\nprint(palindromo("arara"))\nprint(palindromo("Python"))\nprint(palindromo("A man a plan a canal Panama"))\n',
    solution:
      'def palindromo(texto):\n    limpo = texto.lower().replace(" ", "")\n    return limpo == limpo[::-1]\n\nprint(palindromo("arara"))\nprint(palindromo("Python"))\nprint(palindromo("A man a plan a canal Panama"))\n',
    hints: [
      'Converta tudo para minúsculas com .lower() e remova espaços com .replace(" ", "").',
      'Compare a string limpa com ela mesma invertida.',
      'Use fatiamento [::-1] para inverter a string.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'True\nFalse\nTrue', description: 'Testa palíndromos variados' },
    ],
  },
  {
    id: 'py-m-03',
    title: 'Contador de Palavras',
    description:
      'Crie uma função que recebe uma frase e retorna um dicionário com a contagem de cada palavra (ignorando maiúsculas/minúsculas).\n\nExemplo:\n  contar_palavras("o gato e o gato") → {"o": 2, "gato": 2, "e": 1}\n  contar_palavras("Python é incrível") → {"python": 1, "é": 1, "incrível": 1}',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'intermediario',
    category: 'Dicionários',
    language: 'python',
    starterCode:
      'def contar_palavras(frase):\n    """\n    Retorna um dicionário {palavra: contagem}.\n    Ignore maiúsculas/minúsculas.\n    frase: str\n    """\n    # Seu código aqui\n    pass\n\nresult = contar_palavras("o gato e o gato")\nfor palavra, count in sorted(result.items()):\n    print(f"{palavra}: {count}")\n',
    solution:
      'def contar_palavras(frase):\n    contagem = {}\n    for palavra in frase.lower().split():\n        contagem[palavra] = contagem.get(palavra, 0) + 1\n    return contagem\n\nresult = contar_palavras("o gato e o gato")\nfor palavra, count in sorted(result.items()):\n    print(f"{palavra}: {count}")\n',
    hints: [
      'Use .lower().split() para obter lista de palavras em minúsculas.',
      'Use dict.get(chave, 0) para acessar um valor com valor padrão 0 se a chave não existir.',
      'Incremente a contagem: contagem[palavra] = contagem.get(palavra, 0) + 1.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'e: 1\ngato: 2\no: 2', description: 'Contagem de "o gato e o gato"' },
    ],
  },
  {
    id: 'py-m-04',
    title: 'Fatorial Recursivo',
    description:
      'Implemente a função fatorial de forma recursiva. O fatorial de n (n!) é o produto de todos os inteiros positivos de 1 até n.\n\nRegras:\n  - fatorial(0) = 1\n  - fatorial(1) = 1\n  - fatorial(n) = n * fatorial(n-1)\n\nExemplo:\n  fatorial(5) → 120\n  fatorial(0) → 1\n  fatorial(10) → 3628800',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'intermediario',
    category: 'Recursão',
    language: 'python',
    starterCode:
      'def fatorial(n):\n    """\n    Calcula o fatorial de n de forma recursiva.\n    n: int >= 0\n    Retorna int\n    """\n    # Caso base: fatorial(0) == 1\n    # Caso recursivo: n * fatorial(n-1)\n    pass\n\nprint(fatorial(5))\nprint(fatorial(0))\nprint(fatorial(10))\n',
    solution:
      'def fatorial(n):\n    if n == 0:\n        return 1\n    return n * fatorial(n - 1)\n\nprint(fatorial(5))\nprint(fatorial(0))\nprint(fatorial(10))\n',
    hints: [
      'Toda função recursiva precisa de um caso base que não chama a si mesma.',
      'O caso base do fatorial é: fatorial(0) = 1.',
      'O caso recursivo é: retorne n multiplicado por fatorial(n-1).',
    ],
    testCases: [
      { inputs: [], expectedOutput: '120\n1\n3628800', description: 'Fatorial de 5, 0 e 10' },
    ],
  },
  {
    id: 'py-m-05',
    title: 'Números Primos',
    description:
      'Crie uma função que verifica se um número é primo. Um número é primo se for maior que 1 e divisível apenas por 1 e por ele mesmo.\n\nExemplo:\n  is_primo(2) → True\n  is_primo(7) → True\n  is_primo(9) → False\n  is_primo(1) → False\n\nDica de otimização: você só precisa verificar divisores até a raiz quadrada do número.',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'intermediario',
    category: 'Matemática',
    language: 'python',
    starterCode:
      'def is_primo(n):\n    """\n    Retorna True se n for primo, False caso contrário.\n    n: int\n    """\n    # Seu código aqui\n    pass\n\nprint(is_primo(2))\nprint(is_primo(7))\nprint(is_primo(9))\nprint(is_primo(1))\n',
    solution:
      'def is_primo(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_primo(2))\nprint(is_primo(7))\nprint(is_primo(9))\nprint(is_primo(1))\n',
    hints: [
      'Números menores que 2 não são primos.',
      'Se n for divisível por qualquer número entre 2 e √n, não é primo.',
      'Use int(n**0.5) + 1 como limite superior do range para verificar divisores.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'True\nTrue\nFalse\nFalse', description: 'Verifica 2, 7, 9 e 1' },
    ],
  },

  // ─── PYTHON – Avançado ────────────────────────────────────────────────────
  {
    id: 'py-a-01',
    title: 'Busca Binária',
    description:
      'Implemente a busca binária em uma lista ordenada. A busca binária divide o espaço de busca pela metade a cada passo, sendo muito mais eficiente que a busca linear.\n\nRetorne o índice do elemento se encontrado, ou -1 se não encontrado.\n\nExemplo:\n  busca_binaria([1, 3, 5, 7, 9, 11], 7) → 3\n  busca_binaria([1, 3, 5, 7, 9, 11], 4) → -1\n  busca_binaria([2, 4, 6, 8], 2) → 0',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'avancado',
    category: 'Algoritmos',
    language: 'python',
    starterCode:
      'def busca_binaria(lista, alvo):\n    """\n    Busca alvo na lista ordenada usando busca binária.\n    Retorna o índice do alvo ou -1 se não encontrado.\n    lista: list[int] (ordenada)\n    alvo: int\n    """\n    esquerda = 0\n    direita = len(lista) - 1\n    # Seu código aqui\n    pass\n\nprint(busca_binaria([1, 3, 5, 7, 9, 11], 7))\nprint(busca_binaria([1, 3, 5, 7, 9, 11], 4))\nprint(busca_binaria([2, 4, 6, 8], 2))\n',
    solution:
      'def busca_binaria(lista, alvo):\n    esquerda = 0\n    direita = len(lista) - 1\n    while esquerda <= direita:\n        meio = (esquerda + direita) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            esquerda = meio + 1\n        else:\n            direita = meio - 1\n    return -1\n\nprint(busca_binaria([1, 3, 5, 7, 9, 11], 7))\nprint(busca_binaria([1, 3, 5, 7, 9, 11], 4))\nprint(busca_binaria([2, 4, 6, 8], 2))\n',
    hints: [
      'Mantenha dois ponteiros: esquerda e direita. A cada iteração, calcule o meio.',
      'Se lista[meio] < alvo, o alvo está na metade direita: atualize esquerda = meio + 1.',
      'Se lista[meio] > alvo, o alvo está na metade esquerda: atualize direita = meio - 1.',
      'Pare quando esquerda > direita (não encontrado) ou quando lista[meio] == alvo.',
    ],
    testCases: [
      { inputs: [], expectedOutput: '3\n-1\n0', description: 'Busca binária em listas ordenadas' },
    ],
  },
  {
    id: 'py-a-02',
    title: 'Ordenação por Bolha',
    description:
      'Implemente o algoritmo de ordenação Bubble Sort. Ele compara pares adjacentes e troca os elementos fora de ordem, repetindo até a lista estar ordenada.\n\nRetorne a lista ordenada em ordem crescente.\n\nExemplo:\n  bubble_sort([64, 34, 25, 12, 22, 11, 90]) → [11, 12, 22, 25, 34, 64, 90]\n  bubble_sort([5, 1, 4, 2, 8]) → [1, 2, 4, 5, 8]\n  bubble_sort([1]) → [1]',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'avancado',
    category: 'Algoritmos',
    language: 'python',
    starterCode:
      'def bubble_sort(lista):\n    """\n    Ordena a lista usando Bubble Sort.\n    Retorna a lista ordenada em ordem crescente.\n    lista: list[int]\n    """\n    # Faça uma cópia para não modificar a original\n    arr = lista[:]\n    n = len(arr)\n    # Seu código aqui\n    pass\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))\nprint(bubble_sort([5, 1, 4, 2, 8]))\n',
    solution:
      'def bubble_sort(lista):\n    arr = lista[:]\n    n = len(arr)\n    for i in range(n):\n        trocou = False\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n                trocou = True\n        if not trocou:\n            break\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22, 11, 90]))\nprint(bubble_sort([5, 1, 4, 2, 8]))\n',
    hints: [
      'Use dois loops aninhados: o externo conta as passagens, o interno compara pares adjacentes.',
      'Troque arr[j] e arr[j+1] se arr[j] > arr[j+1].',
      'Otimize usando uma flag: se nenhuma troca ocorreu em uma passagem, a lista já está ordenada.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '[11, 12, 22, 25, 34, 64, 90]\n[1, 2, 4, 5, 8]',
        description: 'Bubble Sort em duas listas',
      },
    ],
  },
  {
    id: 'py-a-03',
    title: 'Anagramas',
    description:
      'Crie uma função que recebe duas strings e verifica se são anagramas uma da outra. Dois textos são anagramas se contêm exatamente as mesmas letras, apenas em ordem diferente (ignore espaços e maiúsculas).\n\nExemplo:\n  anagrama("listen", "silent") → True\n  anagrama("hello", "world") → False\n  anagrama("Astronomer", "Moon starer") → True\n  anagrama("rat", "car") → False',
    subject: 'python',
    subjectLabel: 'Python',
    subjectEmoji: '🐍',
    difficulty: 'avancado',
    category: 'Strings',
    language: 'python',
    starterCode:
      'def anagrama(a, b):\n    """\n    Retorna True se a e b forem anagramas, False caso contrário.\n    Ignore espaços e maiúsculas/minúsculas.\n    a, b: str\n    """\n    # Seu código aqui\n    pass\n\nprint(anagrama("listen", "silent"))\nprint(anagrama("hello", "world"))\nprint(anagrama("Astronomer", "Moon starer"))\n',
    solution:
      'def anagrama(a, b):\n    limpar = lambda s: sorted(s.lower().replace(" ", ""))\n    return limpar(a) == limpar(b)\n\nprint(anagrama("listen", "silent"))\nprint(anagrama("hello", "world"))\nprint(anagrama("Astronomer", "Moon starer"))\n',
    hints: [
      'Remova espaços e converta para minúsculas antes de comparar.',
      'Ordene os caracteres de ambas as strings e compare — se iguais, são anagramas.',
      'Use sorted() que funciona em strings: sorted("hello") retorna uma lista de chars ordenados.',
    ],
    testCases: [
      { inputs: [], expectedOutput: 'True\nFalse\nTrue', description: 'Verifica anagramas variados' },
    ],
  },

  // ─── LÓGICA – Iniciante ───────────────────────────────────────────────────
  {
    id: 'log-i-01',
    title: 'Calculadora Simples',
    description:
      'Crie uma função que recebe dois números e uma operação ("+", "-", "*", "/") e retorna o resultado.\n\nSe a operação for inválida, retorne None.\nSe houver divisão por zero, retorne None.\n\nExemplo:\n  calculadora(10, 5, "+") → 15\n  calculadora(10, 5, "-") → 5\n  calculadora(10, 5, "*") → 50\n  calculadora(10, 5, "/") → 2.0',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'python',
    starterCode:
      'def calculadora(a, b, operacao):\n    """\n    Realiza a operação entre a e b.\n    Retorna None para operação inválida ou divisão por zero.\n    """\n    # Seu código aqui\n    pass\n\nprint(calculadora(10, 5, "+"))\nprint(calculadora(10, 5, "-"))\nprint(calculadora(10, 5, "*"))\nprint(calculadora(10, 5, "/"))\n',
    solution:
      'def calculadora(a, b, operacao):\n    if operacao == "+":\n        return a + b\n    elif operacao == "-":\n        return a - b\n    elif operacao == "*":\n        return a * b\n    elif operacao == "/":\n        if b == 0:\n            return None\n        return a / b\n    return None\n\nprint(calculadora(10, 5, "+"))\nprint(calculadora(10, 5, "-"))\nprint(calculadora(10, 5, "*"))\nprint(calculadora(10, 5, "/"))\n',
    hints: [
      'Use if/elif para verificar cada operação.',
      'Para divisão, verifique se b == 0 antes de dividir.',
    ],
    testCases: [
      { inputs: [], expectedOutput: '15\n5\n50\n2.0', description: 'Quatro operações básicas' },
    ],
  },
  {
    id: 'log-i-02',
    title: 'Tabela de Multiplicação',
    description:
      'Crie uma função que imprime a tabuada de um número de 1 a 10.\n\nExemplo para tabuada(3):\n3 x 1 = 3\n3 x 2 = 6\n...\n3 x 10 = 30',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'iniciante',
    category: 'Loops',
    language: 'python',
    starterCode:
      'def tabuada(n):\n    """\n    Imprime a tabuada de n de 1 a 10.\n    n: int\n    """\n    # Seu código aqui\n    pass\n\ntabuada(3)\n',
    solution:
      'def tabuada(n):\n    for i in range(1, 11):\n        print(f"{n} x {i} = {n * i}")\n\ntabuada(3)\n',
    hints: [
      'Use range(1, 11) para iterar de 1 a 10.',
      'Use f-strings para formatar a saída: f"{n} x {i} = {n * i}".',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30',
        description: 'Tabuada do 3',
      },
    ],
  },
  {
    id: 'log-i-03',
    title: 'Média de Notas',
    description:
      'Crie uma função que recebe uma lista de notas (0 a 10) e retorna a média arredondada para 1 casa decimal, junto com o conceito:\n- Média >= 7: "Aprovado"\n- Média >= 5: "Recuperação"\n- Média < 5: "Reprovado"\n\nRetorne uma tupla (media, conceito).\n\nExemplo:\n  media_notas([8, 9, 7, 6]) → (7.5, "Aprovado")\n  media_notas([5, 4, 6, 5]) → (5.0, "Recuperação")\n  media_notas([3, 2, 4, 1]) → (2.5, "Reprovado")',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'python',
    starterCode:
      'def media_notas(notas):\n    """\n    Retorna (media, conceito) com base nas notas.\n    notas: list[float]\n    """\n    # Seu código aqui\n    pass\n\nprint(media_notas([8, 9, 7, 6]))\nprint(media_notas([5, 4, 6, 5]))\nprint(media_notas([3, 2, 4, 1]))\n',
    solution:
      'def media_notas(notas):\n    media = round(sum(notas) / len(notas), 1)\n    if media >= 7:\n        conceito = "Aprovado"\n    elif media >= 5:\n        conceito = "Recuperação"\n    else:\n        conceito = "Reprovado"\n    return (media, conceito)\n\nprint(media_notas([8, 9, 7, 6]))\nprint(media_notas([5, 4, 6, 5]))\nprint(media_notas([3, 2, 4, 1]))\n',
    hints: [
      'Use sum(notas) / len(notas) para calcular a média.',
      'Use round(valor, 1) para arredondar para 1 casa decimal.',
      'Retorne uma tupla: return (media, conceito).',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: "(7.5, 'Aprovado')\n(5.0, 'Recuperação')\n(2.5, 'Reprovado')",
        description: 'Média e conceito de três turmas',
      },
    ],
  },
  {
    id: 'log-i-04',
    title: 'Contagem Regressiva',
    description:
      'Crie uma função que imprime uma contagem regressiva de n até 0, e ao final imprime "Lançamento!".\n\nExemplo para contagem_regressiva(5):\n5\n4\n3\n2\n1\n0\nLançamento!',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'iniciante',
    category: 'Loops',
    language: 'python',
    starterCode:
      'def contagem_regressiva(n):\n    """\n    Imprime contagem de n até 0 e depois "Lançamento!".\n    n: int >= 0\n    """\n    # Seu código aqui\n    pass\n\ncontagem_regressiva(5)\n',
    solution:
      'def contagem_regressiva(n):\n    for i in range(n, -1, -1):\n        print(i)\n    print("Lançamento!")\n\ncontagem_regressiva(5)\n',
    hints: [
      'Use range(n, -1, -1) para contar de n até 0 (inclusive).',
      'Após o loop, imprima "Lançamento!".',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '5\n4\n3\n2\n1\n0\nLançamento!',
        description: 'Contagem regressiva de 5',
      },
    ],
  },
  {
    id: 'log-i-05',
    title: 'Classificar Triângulo',
    description:
      'Crie uma função que recebe os três lados de um triângulo e retorna seu tipo:\n- "Equilátero": todos os lados iguais\n- "Isósceles": dois lados iguais\n- "Escaleno": todos os lados diferentes\n- "Inválido": se não formar um triângulo (a soma de dois lados deve ser maior que o terceiro)\n\nExemplo:\n  triangulo(3, 3, 3) → "Equilátero"\n  triangulo(5, 5, 3) → "Isósceles"\n  triangulo(3, 4, 5) → "Escaleno"\n  triangulo(1, 2, 10) → "Inválido"',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'python',
    starterCode:
      'def triangulo(a, b, c):\n    """\n    Retorna o tipo do triângulo com base nos três lados.\n    """\n    # Primeiro verifique se é válido\n    # Depois classifique\n    pass\n\nprint(triangulo(3, 3, 3))\nprint(triangulo(5, 5, 3))\nprint(triangulo(3, 4, 5))\nprint(triangulo(1, 2, 10))\n',
    solution:
      'def triangulo(a, b, c):\n    if a + b <= c or a + c <= b or b + c <= a:\n        return "Inválido"\n    if a == b == c:\n        return "Equilátero"\n    elif a == b or b == c or a == c:\n        return "Isósceles"\n    else:\n        return "Escaleno"\n\nprint(triangulo(3, 3, 3))\nprint(triangulo(5, 5, 3))\nprint(triangulo(3, 4, 5))\nprint(triangulo(1, 2, 10))\n',
    hints: [
      'Verifique a validade: a soma de quaisquer dois lados deve ser maior que o terceiro.',
      'Use a == b == c para verificar se todos são iguais.',
      'Para isósceles, verifique se qualquer par de lados é igual.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: 'Equilátero\nIsósceles\nEscaleno\nInválido',
        description: 'Classifica quatro triângulos',
      },
    ],
  },

  // ─── LÓGICA – Intermediário ────────────────────────────────────────────────
  {
    id: 'log-m-01',
    title: 'Sequência de Fibonacci',
    description:
      'Crie uma função que retorna uma lista com os primeiros n termos da sequência de Fibonacci.\n\nFibonacci: cada número é a soma dos dois anteriores.\n  F(0) = 0, F(1) = 1, F(2) = 1, F(3) = 2, F(4) = 3, ...\n\nExemplo:\n  fibonacci(8) → [0, 1, 1, 2, 3, 5, 8, 13]\n  fibonacci(1) → [0]\n  fibonacci(3) → [0, 1, 1]',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'intermediario',
    category: 'Sequências',
    language: 'python',
    starterCode:
      'def fibonacci(n):\n    """\n    Retorna lista com os primeiros n termos de Fibonacci.\n    n: int >= 1\n    """\n    # Seu código aqui\n    pass\n\nprint(fibonacci(8))\nprint(fibonacci(1))\nprint(fibonacci(3))\n',
    solution:
      'def fibonacci(n):\n    if n == 1:\n        return [0]\n    seq = [0, 1]\n    for _ in range(2, n):\n        seq.append(seq[-1] + seq[-2])\n    return seq\n\nprint(fibonacci(8))\nprint(fibonacci(1))\nprint(fibonacci(3))\n',
    hints: [
      'Comece com a lista [0, 1] (caso base).',
      'A cada iteração, adicione a soma dos dois últimos elementos: seq[-1] + seq[-2].',
      'Trate o caso especial n == 1 retornando [0].',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '[0, 1, 1, 2, 3, 5, 8, 13]\n[0]\n[0, 1, 1]',
        description: 'Fibonacci com n=8, 1 e 3',
      },
    ],
  },
  {
    id: 'log-m-02',
    title: 'Jogo de Adivinhação',
    description:
      'Crie uma função que simula um jogo de adivinhação. A função recebe uma lista de tentativas (números inteiros) e o número secreto, e retorna quantas tentativas foram necessárias para acertar. Retorne -1 se nenhuma tentativa acertou.\n\nPara cada tentativa, as regras são:\n- Se tentativa > secreto: "Muito alto"\n- Se tentativa < secreto: "Muito baixo"\n- Se tentativa == secreto: "Acertou!"\n\nExemplo:\n  adivinhar([50, 25, 37, 42], 42) → 4\n  adivinhar([10, 20], 30) → -1',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'intermediario',
    category: 'Loops',
    language: 'python',
    starterCode:
      'def adivinhar(tentativas, secreto):\n    """\n    Simula o jogo de adivinhação com as tentativas fornecidas.\n    Retorna o número de tentativas até acertar, ou -1 se errou todas.\n    """\n    # Seu código aqui\n    pass\n\nprint(adivinhar([50, 25, 37, 42], 42))\nprint(adivinhar([10, 20], 30))\n',
    solution:
      'def adivinhar(tentativas, secreto):\n    for i, t in enumerate(tentativas, 1):\n        if t > secreto:\n            print("Muito alto")\n        elif t < secreto:\n            print("Muito baixo")\n        else:\n            print("Acertou!")\n            return i\n    return -1\n\nprint(adivinhar([50, 25, 37, 42], 42))\nprint(adivinhar([10, 20], 30))\n',
    hints: [
      'Use enumerate(tentativas, 1) para obter o índice 1-based junto com o valor.',
      'Retorne o índice quando a tentativa for igual ao segredo.',
      'Se o loop terminar sem acertar, retorne -1.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: 'Muito alto\nMuito baixo\nMuito baixo\nAcertou!\n4\nMuito baixo\nMuito baixo\n-1',
        description: 'Jogo com acerto na 4ª tentativa e sem acerto',
      },
    ],
  },
  {
    id: 'log-m-03',
    title: 'Matriz Transposta',
    description:
      'Crie uma função que recebe uma matriz (lista de listas) e retorna sua transposta. A transposta de uma matriz é obtida trocando linhas por colunas.\n\nExemplo:\n  Entrada:\n  [[1, 2, 3],\n   [4, 5, 6]]\n\n  Saída:\n  [[1, 4],\n   [2, 5],\n   [3, 6]]',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'intermediario',
    category: 'Matrizes',
    language: 'python',
    starterCode:
      'def transposta(matriz):\n    """\n    Retorna a transposta da matriz.\n    matriz: list[list[int]]\n    """\n    # Seu código aqui\n    pass\n\nm = [[1, 2, 3], [4, 5, 6]]\nresult = transposta(m)\nfor linha in result:\n    print(linha)\n',
    solution:
      'def transposta(matriz):\n    linhas = len(matriz)\n    colunas = len(matriz[0])\n    result = []\n    for j in range(colunas):\n        nova_linha = []\n        for i in range(linhas):\n            nova_linha.append(matriz[i][j])\n        result.append(nova_linha)\n    return result\n\nm = [[1, 2, 3], [4, 5, 6]]\nresult = transposta(m)\nfor linha in result:\n    print(linha)\n',
    hints: [
      'A transposta de uma matriz m×n é uma matriz n×m.',
      'O elemento [i][j] da original vira [j][i] na transposta.',
      'Itere pelas colunas da original para construir as linhas da transposta.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput: '[1, 4]\n[2, 5]\n[3, 6]',
        description: 'Transposta de matriz 2x3',
      },
    ],
  },

  // ─── LÓGICA – Avançado ────────────────────────────────────────────────────
  {
    id: 'log-a-01',
    title: 'Torre de Hanói',
    description:
      'Implemente a solução recursiva para o problema da Torre de Hanói. Dado n discos e três pinos (origem, auxiliar, destino), mova todos os discos do pino de origem para o pino de destino.\n\nRegras:\n- Mova apenas um disco por vez\n- Nunca coloque um disco maior sobre um menor\n\nImprima cada movimento no formato: "Mover disco X de A para B"\n\nExemplo para hanoi(3, "A", "C", "B"):\nMover disco 1 de A para C\nMover disco 2 de A para B\nMover disco 1 de C para B\nMover disco 3 de A para C\nMover disco 1 de B para A\nMover disco 2 de B para C\nMover disco 1 de A para C',
    subject: 'logica',
    subjectLabel: 'Lógica',
    subjectEmoji: '🧠',
    difficulty: 'avancado',
    category: 'Recursão',
    language: 'python',
    starterCode:
      'def hanoi(n, origem, destino, auxiliar):\n    """\n    Resolve Torre de Hanói para n discos.\n    n: int (número de discos)\n    origem: str (pino de origem)\n    destino: str (pino de destino)\n    auxiliar: str (pino auxiliar)\n    """\n    # Caso base: n == 1\n    # Caso recursivo:\n    #   1. Mover n-1 discos de origem para auxiliar\n    #   2. Mover disco n de origem para destino\n    #   3. Mover n-1 discos de auxiliar para destino\n    pass\n\nhanoi(3, "A", "C", "B")\n',
    solution:
      'def hanoi(n, origem, destino, auxiliar):\n    if n == 1:\n        print(f"Mover disco 1 de {origem} para {destino}")\n        return\n    hanoi(n - 1, origem, auxiliar, destino)\n    print(f"Mover disco {n} de {origem} para {destino}")\n    hanoi(n - 1, auxiliar, destino, origem)\n\nhanoi(3, "A", "C", "B")\n',
    hints: [
      'O caso base é n=1: apenas mova o disco diretamente.',
      'Para n discos: (1) mova os n-1 menores para o auxiliar, (2) mova o maior para o destino, (3) mova os n-1 do auxiliar para o destino.',
      'A recursão troca os papéis de auxiliar e destino.',
    ],
    testCases: [
      {
        inputs: [],
        expectedOutput:
          'Mover disco 1 de A para C\nMover disco 2 de A para B\nMover disco 1 de C para B\nMover disco 3 de A para C\nMover disco 1 de B para A\nMover disco 2 de B para C\nMover disco 1 de A para C',
        description: 'Torre de Hanói com 3 discos',
      },
    ],
  },

  // ─── JAVASCRIPT – Iniciante ───────────────────────────────────────────────
  {
    id: 'js-i-01',
    title: 'Saudação Personalizada',
    description:
      'Crie uma função JavaScript que recebe um nome e retorna uma saudação personalizada.\n\nSe o nome estiver vazio ou não for passado, retorne "Olá, Visitante!".\n\nExemplo:\n  saudacao("Maria") → "Olá, Maria!"\n  saudacao("") → "Olá, Visitante!"\n  saudacao() → "Olá, Visitante!"',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'iniciante',
    category: 'Funções',
    language: 'javascript',
    starterCode:
      'function saudacao(nome) {\n  // Se nome for vazio ou undefined, use "Visitante"\n  // Retorne "Olá, [nome]!"\n}\n\nconsole.log(saudacao("Maria"));\nconsole.log(saudacao(""));\nconsole.log(saudacao());\n',
    solution:
      'function saudacao(nome) {\n  const n = nome && nome.trim() !== "" ? nome : "Visitante";\n  return `Olá, ${n}!`;\n}\n\nconsole.log(saudacao("Maria"));\nconsole.log(saudacao(""));\nconsole.log(saudacao());\n',
    hints: [
      'Use um parâmetro padrão ou verifique se nome é falsy.',
      'Template literals usam crase e ${variavel} para interpolação.',
    ],
    testCases: [],
  },
  {
    id: 'js-i-02',
    title: 'Filtrar Pares',
    description:
      'Crie uma função JavaScript que recebe um array de números e retorna um novo array contendo apenas os números pares.\n\nExemplo:\n  filtrarPares([1, 2, 3, 4, 5, 6]) → [2, 4, 6]\n  filtrarPares([1, 3, 5]) → []\n  filtrarPares([0, 2, 4]) → [0, 2, 4]',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'iniciante',
    category: 'Arrays',
    language: 'javascript',
    starterCode:
      'function filtrarPares(numeros) {\n  // Retorne um array apenas com números pares\n  // Dica: use .filter()\n}\n\nconsole.log(filtrarPares([1, 2, 3, 4, 5, 6]));\nconsole.log(filtrarPares([1, 3, 5]));\nconsole.log(filtrarPares([0, 2, 4]));\n',
    solution:
      'function filtrarPares(numeros) {\n  return numeros.filter(n => n % 2 === 0);\n}\n\nconsole.log(filtrarPares([1, 2, 3, 4, 5, 6]));\nconsole.log(filtrarPares([1, 3, 5]));\nconsole.log(filtrarPares([0, 2, 4]));\n',
    hints: [
      'Use o método .filter() dos arrays.',
      'n % 2 === 0 verifica se n é par.',
    ],
    testCases: [],
  },
  {
    id: 'js-i-03',
    title: 'Capitalizar Primeira Letra',
    description:
      'Crie uma função JavaScript que recebe uma string e retorna ela com a primeira letra de cada palavra em maiúscula (title case).\n\nExemplo:\n  titleCase("olá mundo") → "Olá Mundo"\n  titleCase("aprendendo javascript") → "Aprendendo Javascript"\n  titleCase("") → ""',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'iniciante',
    category: 'Strings',
    language: 'javascript',
    starterCode:
      'function titleCase(texto) {\n  // Capitalize a primeira letra de cada palavra\n  // Dica: use .split(), .map() e .join()\n}\n\nconsole.log(titleCase("olá mundo"));\nconsole.log(titleCase("aprendendo javascript"));\n',
    solution:
      'function titleCase(texto) {\n  if (!texto) return "";\n  return texto\n    .split(" ")\n    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))\n    .join(" ");\n}\n\nconsole.log(titleCase("olá mundo"));\nconsole.log(titleCase("aprendendo javascript"));\n',
    hints: [
      'Divida a string em palavras com .split(" ").',
      'Para cada palavra, use .charAt(0).toUpperCase() + .slice(1).',
      'Junte as palavras de volta com .join(" ").',
    ],
    testCases: [],
  },

  // ─── JAVASCRIPT – Intermediário ────────────────────────────────────────────
  {
    id: 'js-m-01',
    title: 'Agrupar por Propriedade',
    description:
      'Crie uma função JavaScript que agrupa um array de objetos por uma propriedade especificada.\n\nExemplo:\n  const pessoas = [\n    { nome: "Ana", cidade: "SP" },\n    { nome: "Bob", cidade: "RJ" },\n    { nome: "Bia", cidade: "SP" }\n  ];\n  agruparPor(pessoas, "cidade") → {\n    "SP": [{ nome: "Ana", cidade: "SP" }, { nome: "Bia", cidade: "SP" }],\n    "RJ": [{ nome: "Bob", cidade: "RJ" }]\n  }',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'intermediario',
    category: 'Arrays',
    language: 'javascript',
    starterCode:
      'function agruparPor(array, propriedade) {\n  // Agrupe os objetos do array pela propriedade fornecida\n  // Retorne um objeto onde cada chave é um valor da propriedade\n}\n\nconst pessoas = [\n  { nome: "Ana", cidade: "SP" },\n  { nome: "Bob", cidade: "RJ" },\n  { nome: "Bia", cidade: "SP" }\n];\nconst resultado = agruparPor(pessoas, "cidade");\nconsole.log(JSON.stringify(resultado, null, 2));\n',
    solution:
      'function agruparPor(array, propriedade) {\n  return array.reduce((acc, item) => {\n    const chave = item[propriedade];\n    if (!acc[chave]) {\n      acc[chave] = [];\n    }\n    acc[chave].push(item);\n    return acc;\n  }, {});\n}\n\nconst pessoas = [\n  { nome: "Ana", cidade: "SP" },\n  { nome: "Bob", cidade: "RJ" },\n  { nome: "Bia", cidade: "SP" }\n];\nconst resultado = agruparPor(pessoas, "cidade");\nconsole.log(JSON.stringify(resultado, null, 2));\n',
    hints: [
      'Use .reduce() para acumular os grupos em um objeto.',
      'Acesse o valor da propriedade com item[propriedade].',
      'Se a chave ainda não existir no acumulador, crie um array vazio para ela.',
    ],
    testCases: [],
  },
  {
    id: 'js-m-02',
    title: 'Debounce',
    description:
      'Implemente uma função debounce em JavaScript. O debounce garante que uma função só seja chamada depois que um certo tempo passou desde a última invocação.\n\nA função debounce(fn, delay) retorna uma nova função que:\n- Espera "delay" milissegundos após a última chamada antes de executar fn\n- Cancela execuções agendadas anteriores se for chamada novamente dentro do delay\n\nExemplo:\n  const buscar = debounce((termo) => console.log("Buscando:", termo), 300);\n  buscar("p");    // cancelado\n  buscar("py");   // cancelado\n  buscar("pyt");  // executado após 300ms: "Buscando: pyt"',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'intermediario',
    category: 'Funções',
    language: 'javascript',
    starterCode:
      'function debounce(fn, delay) {\n  // Retorne uma nova função que executa fn\n  // apenas após "delay" ms sem novas chamadas\n  let timeoutId;\n  return function(...args) {\n    // Seu código aqui\n  };\n}\n\n// Teste manual\nconst log = debounce((msg) => console.log("Executado:", msg), 100);\nlog("a");\nlog("b");\nlog("c"); // Somente este deve ser executado\n',
    solution:
      'function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst log = debounce((msg) => console.log("Executado:", msg), 100);\nlog("a");\nlog("b");\nlog("c");\n',
    hints: [
      'Use clearTimeout para cancelar o timeout anterior.',
      'Use setTimeout para agendar a execução com o delay.',
      'Guarde o ID do timeout em uma variável fora da função retornada (closure).',
    ],
    testCases: [],
  },

  // ─── JAVASCRIPT – Avançado ────────────────────────────────────────────────
  {
    id: 'js-a-01',
    title: 'Promise em Cadeia',
    description:
      'Implemente uma função que simula operações assíncronas encadeadas usando Promises.\n\nCrie a função processarDados(dados) que:\n1. Valida os dados (rejeita se dados for null/undefined)\n2. Formata os dados (converte para maiúsculas)\n3. Salva os dados (adiciona prefixo "SALVO:")\n4. Retorna o resultado final\n\nExemplo:\n  processarDados("hello")\n    → resolve com "SALVO:HELLO"\n  processarDados(null)\n    → rejeita com "Dados inválidos"',
    subject: 'javascript',
    subjectLabel: 'JavaScript',
    subjectEmoji: '🌐',
    difficulty: 'avancado',
    category: 'Promises',
    language: 'javascript',
    starterCode:
      'function validar(dados) {\n  return new Promise((resolve, reject) => {\n    if (dados == null) reject("Dados inválidos");\n    else resolve(dados);\n  });\n}\n\nfunction formatar(dados) {\n  return Promise.resolve(dados.toUpperCase());\n}\n\nfunction salvar(dados) {\n  return Promise.resolve("SALVO:" + dados);\n}\n\nfunction processarDados(dados) {\n  // Encadeie validar → formatar → salvar usando .then()\n}\n\nprocessarDados("hello").then(console.log).catch(console.error);\nprocessarDados(null).then(console.log).catch(console.error);\n',
    solution:
      'function validar(dados) {\n  return new Promise((resolve, reject) => {\n    if (dados == null) reject("Dados inválidos");\n    else resolve(dados);\n  });\n}\n\nfunction formatar(dados) {\n  return Promise.resolve(dados.toUpperCase());\n}\n\nfunction salvar(dados) {\n  return Promise.resolve("SALVO:" + dados);\n}\n\nfunction processarDados(dados) {\n  return validar(dados)\n    .then(formatar)\n    .then(salvar);\n}\n\nprocessarDados("hello").then(console.log).catch(console.error);\nprocessarDados(null).then(console.log).catch(console.error);\n',
    hints: [
      'Use .then() para encadear Promises: cada .then() recebe o resultado da anterior.',
      'Retorne a Promise encadeada para que o chamador possa usar .then()/.catch().',
      'Você pode passar funções diretamente ao .then(): .then(formatar).then(salvar).',
    ],
    testCases: [],
  },

  // ─── SQL – Iniciante ──────────────────────────────────────────────────────
  {
    id: 'sql-i-01',
    title: 'Selecionar Todos os Clientes',
    description:
      'Escreva uma consulta SQL que seleciona todos os registros da tabela "clientes", ordenados pelo nome em ordem alfabética.\n\nEstrutura da tabela clientes:\n  id INTEGER, nome TEXT, email TEXT, cidade TEXT\n\nExemplo de resultado esperado:\n  id | nome  | email         | cidade\n  1  | Ana   | ana@email.com | SP\n  3  | Bob   | bob@email.com | RJ\n  2  | Carla | carla@...     | MG',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'iniciante',
    category: 'SELECT',
    language: 'sql',
    starterCode:
      '-- Selecione todos os registros da tabela clientes\n-- Ordene pelo nome em ordem alfabética (A-Z)\nSELECT\n  -- seu código aqui\nFROM clientes\nORDER BY -- coluna de ordenação\n;',
    solution:
      'SELECT *\nFROM clientes\nORDER BY nome ASC\n;',
    hints: [
      'Use SELECT * para selecionar todas as colunas.',
      'Use ORDER BY nome para ordenar pelo nome.',
      'ASC é a ordenação padrão (A-Z), mas pode ser omitido.',
    ],
    testCases: [],
  },
  {
    id: 'sql-i-02',
    title: 'Filtrar por Cidade',
    description:
      'Escreva uma consulta SQL que retorna apenas os clientes que moram em "São Paulo" (cidade = "São Paulo").\n\nMostre apenas as colunas: nome e email.\n\nOrdenar por nome crescente.\n\nEstrutura:\n  clientes(id, nome, email, cidade)',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'iniciante',
    category: 'WHERE',
    language: 'sql',
    starterCode:
      '-- Selecione nome e email dos clientes de São Paulo\n-- Ordene por nome\nSELECT\n  -- colunas\nFROM clientes\nWHERE -- condição\nORDER BY nome\n;',
    solution:
      "SELECT nome, email\nFROM clientes\nWHERE cidade = 'São Paulo'\nORDER BY nome\n;",
    hints: [
      "Use WHERE cidade = 'São Paulo' para filtrar.",
      'Especifique as colunas desejadas no SELECT: nome, email.',
      "Strings em SQL usam aspas simples: 'São Paulo'.",
    ],
    testCases: [],
  },
  {
    id: 'sql-i-03',
    title: 'Contar Registros',
    description:
      'Escreva uma consulta SQL que conta quantos clientes existem em cada cidade. Ordene pelo número de clientes em ordem decrescente.\n\nResultado esperado:\n  cidade     | total\n  São Paulo  | 45\n  Rio de...  | 32\n  ...',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'iniciante',
    category: 'GROUP BY',
    language: 'sql',
    starterCode:
      '-- Conte clientes por cidade\n-- Ordene pelo total decrescente\nSELECT\n  cidade,\n  COUNT(*) AS total\nFROM clientes\nGROUP BY -- agrupar por qual coluna?\nORDER BY -- ordenar por total, decrescente\n;',
    solution:
      'SELECT\n  cidade,\n  COUNT(*) AS total\nFROM clientes\nGROUP BY cidade\nORDER BY total DESC\n;',
    hints: [
      'Use GROUP BY cidade para agrupar os registros por cidade.',
      'COUNT(*) conta todos os registros de cada grupo.',
      'Use ORDER BY total DESC para ordenar do maior para o menor.',
    ],
    testCases: [],
  },

  // ─── SQL – Intermediário ───────────────────────────────────────────────────
  {
    id: 'sql-m-01',
    title: 'JOIN Entre Tabelas',
    description:
      'Escreva uma consulta SQL que une as tabelas "pedidos" e "clientes" para mostrar:\n- nome do cliente\n- data do pedido\n- valor do pedido\n\nApenas pedidos com valor maior que 100. Ordene pelo valor decrescente.\n\nEstrutura:\n  clientes(id, nome, email)\n  pedidos(id, cliente_id, data, valor)',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'intermediario',
    category: 'JOIN',
    language: 'sql',
    starterCode:
      '-- Una clientes com pedidos\n-- Filtre pedidos > 100\n-- Ordene pelo valor decrescente\nSELECT\n  c.nome,\n  p.data,\n  p.valor\nFROM pedidos p\n  -- JOIN aqui\nWHERE -- condição de valor\nORDER BY p.valor DESC\n;',
    solution:
      'SELECT\n  c.nome,\n  p.data,\n  p.valor\nFROM pedidos p\n  INNER JOIN clientes c ON p.cliente_id = c.id\nWHERE p.valor > 100\nORDER BY p.valor DESC\n;',
    hints: [
      'Use INNER JOIN clientes c ON p.cliente_id = c.id.',
      'Prefixe as colunas com o alias da tabela: c.nome, p.valor.',
      'A condição WHERE vem depois do JOIN.',
    ],
    testCases: [],
  },
  {
    id: 'sql-m-02',
    title: 'Subconsulta com IN',
    description:
      'Escreva uma consulta que retorna os nomes dos clientes que fizeram pelo menos um pedido.\n\nUse uma subconsulta com IN (não use JOIN).\n\nEstrutura:\n  clientes(id, nome, email)\n  pedidos(id, cliente_id, data, valor)',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'intermediario',
    category: 'Subconsultas',
    language: 'sql',
    starterCode:
      '-- Retorne nomes de clientes que fizeram pedidos\n-- Use uma subconsulta com IN\nSELECT nome\nFROM clientes\nWHERE id IN (\n  -- subconsulta aqui\n)\nORDER BY nome\n;',
    solution:
      'SELECT nome\nFROM clientes\nWHERE id IN (\n  SELECT DISTINCT cliente_id\n  FROM pedidos\n)\nORDER BY nome\n;',
    hints: [
      'A subconsulta deve retornar os cliente_id distintos da tabela pedidos.',
      'Use SELECT DISTINCT cliente_id FROM pedidos.',
      'A consulta externa filtra clientes cujo id está nessa lista.',
    ],
    testCases: [],
  },

  // ─── SQL – Avançado ───────────────────────────────────────────────────────
  {
    id: 'sql-a-01',
    title: 'Window Functions',
    description:
      'Escreva uma consulta que usa Window Function para calcular o ranking de vendas por vendedor dentro de cada região.\n\nPara cada venda, mostre:\n- nome do vendedor\n- regiao\n- valor\n- rank dentro da região (1 = maior venda da região)\n\nEstrutura:\n  vendas(id, vendedor, regiao, valor)',
    subject: 'sql',
    subjectLabel: 'SQL',
    subjectEmoji: '🗄️',
    difficulty: 'avancado',
    category: 'Window Functions',
    language: 'sql',
    starterCode:
      '-- Use RANK() OVER (PARTITION BY ... ORDER BY ...) \nSELECT\n  vendedor,\n  regiao,\n  valor,\n  RANK() OVER (\n    -- PARTITION BY e ORDER BY aqui\n  ) AS ranking\nFROM vendas\nORDER BY regiao, ranking\n;',
    solution:
      'SELECT\n  vendedor,\n  regiao,\n  valor,\n  RANK() OVER (\n    PARTITION BY regiao\n    ORDER BY valor DESC\n  ) AS ranking\nFROM vendas\nORDER BY regiao, ranking\n;',
    hints: [
      'PARTITION BY regiao reinicia o ranking para cada região.',
      'ORDER BY valor DESC dentro do OVER ordena do maior para o menor.',
      'RANK() atribui o mesmo rank para valores iguais, pulando o próximo.',
    ],
    testCases: [],
  },

  // ─── HTML/CSS – Iniciante ─────────────────────────────────────────────────
  {
    id: 'html-i-01',
    title: 'Cartão de Perfil',
    description:
      'Crie um cartão de perfil em HTML com:\n- Uma foto de perfil (use uma imagem placeholder)\n- Nome do usuário em destaque\n- Uma breve bio\n- Dois links sociais\n\nO cartão deve ter uma aparência limpa e centralizada na página.\n\nUse apenas HTML (sem CSS externo). Use estilos inline ou a tag <style>.',
    subject: 'html-css',
    subjectLabel: 'HTML/CSS',
    subjectEmoji: '🎨',
    difficulty: 'iniciante',
    category: 'HTML',
    language: 'html',
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Cartão de Perfil</title>\n  <style>\n    /* Estilos aqui */\n    body {\n      font-family: Arial, sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      background: #f0f2f5;\n    }\n  </style>\n</head>\n<body>\n  <!-- Crie um div.cartao com foto, nome, bio e links sociais -->\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Cartão de Perfil</title>\n  <style>\n    body {\n      font-family: Arial, sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      background: #f0f2f5;\n    }\n    .cartao {\n      background: white;\n      border-radius: 16px;\n      padding: 2rem;\n      text-align: center;\n      box-shadow: 0 4px 20px rgba(0,0,0,0.1);\n      max-width: 300px;\n      width: 100%;\n    }\n    .cartao img {\n      width: 100px;\n      height: 100px;\n      border-radius: 50%;\n      object-fit: cover;\n      margin-bottom: 1rem;\n    }\n    .cartao h2 { margin: 0 0 0.5rem; color: #1a1a2e; }\n    .cartao p { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }\n    .links a {\n      display: inline-block;\n      margin: 0 0.25rem;\n      padding: 0.4rem 1rem;\n      background: #6366f1;\n      color: white;\n      border-radius: 8px;\n      text-decoration: none;\n      font-size: 0.85rem;\n    }\n  </style>\n</head>\n<body>\n  <div class="cartao">\n    <img src="https://picsum.photos/100" alt="Foto de perfil">\n    <h2>Ana Silva</h2>\n    <p>Desenvolvedora Full Stack apaixonada por código limpo e boas práticas.</p>\n    <div class="links">\n      <a href="#">GitHub</a>\n      <a href="#">LinkedIn</a>\n    </div>\n  </div>\n</body>\n</html>\n',
    hints: [
      'Use border-radius: 50% para deixar a foto redonda.',
      'Use box-shadow para criar um efeito de elevação no cartão.',
      'Centralize o conteúdo com display: flex; justify-content: center no body.',
    ],
    testCases: [],
  },
  {
    id: 'html-i-02',
    title: 'Lista de Tarefas Estática',
    description:
      'Crie uma lista de tarefas em HTML/CSS com:\n- Um título "Minhas Tarefas"\n- Pelo menos 5 itens de tarefa\n- Tarefas concluídas com texto tachado e cor cinza\n- Tarefas pendentes normais\n- Use classes CSS para estilizar os estados\n\nNão é necessário JavaScript — apenas HTML e CSS estáticos.',
    subject: 'html-css',
    subjectLabel: 'HTML/CSS',
    subjectEmoji: '🎨',
    difficulty: 'iniciante',
    category: 'CSS',
    language: 'html',
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Lista de Tarefas</title>\n  <style>\n    body { font-family: Arial, sans-serif; max-width: 500px; margin: 2rem auto; padding: 0 1rem; }\n    /* Adicione estilos para .tarefa, .concluida, etc */\n  </style>\n</head>\n<body>\n  <h1>✅ Minhas Tarefas</h1>\n  <!-- Crie uma lista com ul e li, usando classes para tarefas concluídas -->\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Lista de Tarefas</title>\n  <style>\n    body { font-family: Arial, sans-serif; max-width: 500px; margin: 2rem auto; padding: 0 1rem; background: #f9f9f9; }\n    h1 { color: #333; }\n    ul { list-style: none; padding: 0; }\n    .tarefa {\n      background: white;\n      border: 1px solid #e0e0e0;\n      border-radius: 8px;\n      padding: 0.75rem 1rem;\n      margin-bottom: 0.5rem;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n    }\n    .tarefa::before { content: "⬜"; }\n    .concluida { color: #999; text-decoration: line-through; background: #f5f5f5; }\n    .concluida::before { content: "✅"; }\n  </style>\n</head>\n<body>\n  <h1>✅ Minhas Tarefas</h1>\n  <ul>\n    <li class="tarefa concluida">Estudar HTML</li>\n    <li class="tarefa concluida">Aprender CSS</li>\n    <li class="tarefa">Aprender JavaScript</li>\n    <li class="tarefa">Fazer projeto pessoal</li>\n    <li class="tarefa">Publicar no GitHub</li>\n  </ul>\n</body>\n</html>\n',
    hints: [
      'Use a classe .concluida para tarefas completas.',
      'text-decoration: line-through cria o efeito de texto tachado.',
      'O seletor .tarefa::before pode adicionar um ícone antes de cada item.',
    ],
    testCases: [],
  },

  // ─── HTML/CSS – Intermediário ──────────────────────────────────────────────
  {
    id: 'html-m-01',
    title: 'Layout Flexbox: Menu de Navegação',
    description:
      'Crie um menu de navegação responsivo usando Flexbox com:\n- Logo à esquerda\n- Links de navegação ao centro\n- Botão de CTA à direita ("Começar Grátis")\n- Em telas pequenas (< 600px): logo e botão lado a lado, links abaixo\n- Hover effects nos links\n- Cor de fundo escura (#1a1a2e)',
    subject: 'html-css',
    subjectLabel: 'HTML/CSS',
    subjectEmoji: '🎨',
    difficulty: 'intermediario',
    category: 'Flexbox',
    language: 'html',
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Menu de Navegação</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: Arial, sans-serif; }\n    /* Estilize o nav com Flexbox */\n  </style>\n</head>\n<body>\n  <nav>\n    <div class="logo">🚀 MeuSite</div>\n    <ul class="links">\n      <li><a href="#">Início</a></li>\n      <li><a href="#">Sobre</a></li>\n      <li><a href="#">Serviços</a></li>\n      <li><a href="#">Contato</a></li>\n    </ul>\n    <button class="cta">Começar Grátis</button>\n  </nav>\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Menu de Navegação</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: Arial, sans-serif; }\n    nav {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      background: #1a1a2e;\n      padding: 1rem 2rem;\n      flex-wrap: wrap;\n      gap: 1rem;\n    }\n    .logo { color: white; font-weight: bold; font-size: 1.2rem; }\n    .links {\n      display: flex;\n      list-style: none;\n      gap: 1.5rem;\n      flex: 1;\n      justify-content: center;\n    }\n    .links a {\n      color: #ccc;\n      text-decoration: none;\n      transition: color 0.2s;\n    }\n    .links a:hover { color: #6366f1; }\n    .cta {\n      background: #6366f1;\n      color: white;\n      border: none;\n      padding: 0.5rem 1.25rem;\n      border-radius: 8px;\n      cursor: pointer;\n      font-size: 0.9rem;\n      transition: background 0.2s;\n    }\n    .cta:hover { background: #4f46e5; }\n    @media (max-width: 600px) {\n      nav { flex-direction: column; align-items: flex-start; }\n      .links { flex-direction: column; gap: 0.5rem; }\n    }\n  </style>\n</head>\n<body>\n  <nav>\n    <div class="logo">🚀 MeuSite</div>\n    <ul class="links">\n      <li><a href="#">Início</a></li>\n      <li><a href="#">Sobre</a></li>\n      <li><a href="#">Serviços</a></li>\n      <li><a href="#">Contato</a></li>\n    </ul>\n    <button class="cta">Começar Grátis</button>\n  </nav>\n</body>\n</html>\n',
    hints: [
      'Use display: flex; justify-content: space-between no nav para espaçar os elementos.',
      'Use flex: 1 nos links para centralizá-los entre logo e botão.',
      'Use @media (max-width: 600px) para responsividade.',
    ],
    testCases: [],
  },
  {
    id: 'html-m-02',
    title: 'Grid de Produtos',
    description:
      'Crie um grid de produtos usando CSS Grid com:\n- 3 colunas em desktop, 2 em tablet (< 768px), 1 em mobile (< 480px)\n- Cada card de produto deve ter: imagem, nome, preço e botão "Comprar"\n- Pelo menos 6 produtos\n- Efeito de hover que eleva o card (transform: translateY)\n- Tema claro e limpo',
    subject: 'html-css',
    subjectLabel: 'HTML/CSS',
    subjectEmoji: '🎨',
    difficulty: 'intermediario',
    category: 'CSS Grid',
    language: 'html',
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Grid de Produtos</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: Arial, sans-serif; padding: 2rem; background: #f0f2f5; }\n    h1 { text-align: center; margin-bottom: 2rem; color: #1a1a2e; }\n    /* Crie o grid de produtos aqui */\n  </style>\n</head>\n<body>\n  <h1>🛍️ Nossos Produtos</h1>\n  <div class="grid">\n    <!-- Adicione pelo menos 6 cards de produtos -->\n  </div>\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Grid de Produtos</title>\n  <style>\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n    body { font-family: Arial, sans-serif; padding: 2rem; background: #f0f2f5; }\n    h1 { text-align: center; margin-bottom: 2rem; color: #1a1a2e; }\n    .grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 1.5rem;\n      max-width: 1000px;\n      margin: 0 auto;\n    }\n    .card {\n      background: white;\n      border-radius: 12px;\n      overflow: hidden;\n      box-shadow: 0 2px 10px rgba(0,0,0,0.08);\n      transition: transform 0.2s, box-shadow 0.2s;\n    }\n    .card:hover {\n      transform: translateY(-6px);\n      box-shadow: 0 8px 24px rgba(0,0,0,0.15);\n    }\n    .card img { width: 100%; height: 180px; object-fit: cover; }\n    .card-body { padding: 1rem; }\n    .card-body h3 { color: #1a1a2e; margin-bottom: 0.5rem; }\n    .card-body .preco { color: #6366f1; font-size: 1.2rem; font-weight: bold; margin-bottom: 0.75rem; }\n    .card-body button {\n      width: 100%;\n      padding: 0.6rem;\n      background: #6366f1;\n      color: white;\n      border: none;\n      border-radius: 8px;\n      cursor: pointer;\n      font-size: 0.9rem;\n    }\n    .card-body button:hover { background: #4f46e5; }\n    @media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }\n    @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }\n  </style>\n</head>\n<body>\n  <h1>🛍️ Nossos Produtos</h1>\n  <div class="grid">\n    <div class="card"><img src="https://picsum.photos/300/180?1" alt="Produto 1"><div class="card-body"><h3>Fone Bluetooth</h3><p class="preco">R$ 299,90</p><button>Comprar</button></div></div>\n    <div class="card"><img src="https://picsum.photos/300/180?2" alt="Produto 2"><div class="card-body"><h3>Smartwatch</h3><p class="preco">R$ 599,90</p><button>Comprar</button></div></div>\n    <div class="card"><img src="https://picsum.photos/300/180?3" alt="Produto 3"><div class="card-body"><h3>Teclado Mecânico</h3><p class="preco">R$ 450,00</p><button>Comprar</button></div></div>\n    <div class="card"><img src="https://picsum.photos/300/180?4" alt="Produto 4"><div class="card-body"><h3>Mouse Gamer</h3><p class="preco">R$ 189,90</p><button>Comprar</button></div></div>\n    <div class="card"><img src="https://picsum.photos/300/180?5" alt="Produto 5"><div class="card-body"><h3>Monitor 24"</h3><p class="preco">R$ 1.299,00</p><button>Comprar</button></div></div>\n    <div class="card"><img src="https://picsum.photos/300/180?6" alt="Produto 6"><div class="card-body"><h3>Webcam HD</h3><p class="preco">R$ 230,00</p><button>Comprar</button></div></div>\n  </div>\n</body>\n</html>\n',
    hints: [
      'Use display: grid; grid-template-columns: repeat(3, 1fr) para 3 colunas iguais.',
      'Adicione @media queries para ajustar o número de colunas.',
      'Use transition no card e transform: translateY(-6px) no hover.',
    ],
    testCases: [],
  },

  // ─── HTML/CSS – Avançado ──────────────────────────────────────────────────
  {
    id: 'html-a-01',
    title: 'Animação CSS: Loader',
    description:
      'Crie um loader (indicador de carregamento) animado usando apenas CSS. O loader deve ser um spinner circular com:\n- Dois arcos sobrepostos em cores diferentes\n- Animação de rotação contínua e suave\n- Texto "Carregando..." abaixo\n- Centralizado na tela\n- Use @keyframes e animation para as animações',
    subject: 'html-css',
    subjectLabel: 'HTML/CSS',
    subjectEmoji: '🎨',
    difficulty: 'avancado',
    category: 'Animações',
    language: 'html',
    starterCode:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>CSS Loader</title>\n  <style>\n    body {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      background: #1a1a2e;\n      flex-direction: column;\n      gap: 1rem;\n    }\n    /* Crie o spinner com @keyframes */\n  </style>\n</head>\n<body>\n  <div class="spinner"></div>\n  <p class="texto">Carregando...</p>\n</body>\n</html>\n',
    solution:
      '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>CSS Loader</title>\n  <style>\n    body {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n      background: #1a1a2e;\n      flex-direction: column;\n      gap: 1.5rem;\n    }\n    .spinner {\n      width: 60px;\n      height: 60px;\n      border-radius: 50%;\n      border: 6px solid rgba(99, 102, 241, 0.2);\n      border-top-color: #6366f1;\n      border-right-color: #a78bfa;\n      animation: girar 0.8s linear infinite;\n    }\n    @keyframes girar {\n      to { transform: rotate(360deg); }\n    }\n    .texto {\n      color: #a0aec0;\n      font-family: Arial, sans-serif;\n      font-size: 0.9rem;\n      animation: piscar 1.2s ease-in-out infinite;\n    }\n    @keyframes piscar {\n      0%, 100% { opacity: 1; }\n      50% { opacity: 0.4; }\n    }\n  </style>\n</head>\n<body>\n  <div class="spinner"></div>\n  <p class="texto">Carregando...</p>\n</body>\n</html>\n',
    hints: [
      'Use border-radius: 50% para tornar o elemento circular.',
      'Use border com cor transparente nos lados e colorida no topo: border-top-color.',
      '@keyframes girar { to { transform: rotate(360deg); } } cria a rotação.',
      'animation: girar 0.8s linear infinite aplica a animação continuamente.',
    ],
    testCases: [],
  },

  // ─── C – Iniciante ────────────────────────────────────────────────────────
  {
    id: 'c-i-01',
    title: 'Hello World com printf',
    description:
      'Escreva um programa em C que imprime "Hello, World!" na tela usando printf.\n\nO programa já tem a estrutura main(). Adicione o printf correto dentro dela.\n\nSaída esperada:\nHello, World!',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'iniciante',
    category: 'Entrada e Saída',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    // Imprima "Hello, World!" aqui\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n',
    hints: [
      'Use printf("...\\n") para imprimir texto seguido de uma quebra de linha.',
      'Inclua a biblioteca <stdio.h> para usar printf.',
      'O programa precisa retornar 0 ao final do main.',
    ],
    testCases: [
      { expectedOutput: 'Hello, World!', description: 'Imprime Hello, World!' },
    ],
  },
  {
    id: 'c-i-02',
    title: 'Soma de Dois Inteiros',
    description:
      'Crie um programa em C que declara duas variáveis inteiras, atribui valores a elas e imprime a soma.\n\nUse: a = 15, b = 27\n\nSaída esperada:\nA soma de 15 e 27 é 42',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'iniciante',
    category: 'Variáveis',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int a = 15;\n    int b = 27;\n    // Calcule a soma e imprima o resultado\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nint main() {\n    int a = 15;\n    int b = 27;\n    int soma = a + b;\n    printf("A soma de %d e %d é %d\\n", a, b, soma);\n    return 0;\n}\n',
    hints: [
      'Declare uma terceira variável int soma para guardar o resultado.',
      'Use %d no printf para imprimir inteiros.',
      'printf("A soma de %d e %d é %d\\n", a, b, soma);',
    ],
    testCases: [
      { expectedOutput: 'A soma de 15 e 27 é 42', description: 'Soma de 15 + 27 = 42' },
    ],
  },
  {
    id: 'c-i-03',
    title: 'Percorrendo um Array',
    description:
      'Crie um programa em C que declara um array de 5 inteiros e imprime cada elemento em uma linha separada.\n\nArray: {10, 20, 30, 40, 50}\n\nSaída esperada:\n10\n20\n30\n40\n50',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'iniciante',
    category: 'Arrays',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int numeros[5] = {10, 20, 30, 40, 50};\n    // Percorra o array e imprima cada elemento\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nint main() {\n    int numeros[5] = {10, 20, 30, 40, 50};\n    for (int i = 0; i < 5; i++) {\n        printf("%d\\n", numeros[i]);\n    }\n    return 0;\n}\n',
    hints: [
      'Use um loop for com índice i de 0 a 4.',
      'Acesse cada elemento com numeros[i].',
      'Use printf("%d\\n", numeros[i]) para imprimir cada valor.',
    ],
    testCases: [
      { expectedOutput: '10\n20\n30\n40\n50', description: 'Imprime os 5 elementos do array' },
    ],
  },
  {
    id: 'c-i-04',
    title: 'Par ou Ímpar em C',
    description:
      'Crie um programa em C que verifica se o número 17 é par ou ímpar e imprime o resultado.\n\nSaída esperada:\n17 é ímpar',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'iniciante',
    category: 'Condicionais',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nint main() {\n    int numero = 17;\n    // Verifique se é par ou ímpar e imprima o resultado\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nint main() {\n    int numero = 17;\n    if (numero % 2 == 0) {\n        printf("%d é par\\n", numero);\n    } else {\n        printf("%d é ímpar\\n", numero);\n    }\n    return 0;\n}\n',
    hints: [
      'Use o operador % para obter o resto da divisão por 2.',
      'Se numero % 2 == 0, o número é par; caso contrário, é ímpar.',
      'Use printf com %d para incluir o valor da variável na mensagem.',
    ],
    testCases: [
      { expectedOutput: '17 é ímpar', description: 'Verifica se 17 é par ou ímpar' },
    ],
  },

  // ─── C – Intermediário ────────────────────────────────────────────────────
  {
    id: 'c-m-01',
    title: 'Ponteiros em C',
    description:
      'Crie um programa em C que usa ponteiros para trocar o valor de duas variáveis.\n\nDeclare a=5 e b=10, troque os valores usando ponteiros e imprima antes e depois.\n\nSaída esperada:\nAntes: a=5, b=10\nDepois: a=10, b=5',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'intermediario',
    category: 'Ponteiros',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nvoid trocar(int *x, int *y) {\n    // Troque os valores apontados por x e y\n}\n\nint main() {\n    int a = 5, b = 10;\n    printf("Antes: a=%d, b=%d\\n", a, b);\n    trocar(&a, &b);\n    printf("Depois: a=%d, b=%d\\n", a, b);\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nvoid trocar(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 5, b = 10;\n    printf("Antes: a=%d, b=%d\\n", a, b);\n    trocar(&a, &b);\n    printf("Depois: a=%d, b=%d\\n", a, b);\n    return 0;\n}\n',
    hints: [
      'Use *x para acessar o valor apontado pelo ponteiro x.',
      'Guarde o valor de *x em uma variável temporária antes de sobrescrever.',
      'A função recebe ponteiros (&a, &b) para modificar as variáveis originais.',
    ],
    testCases: [
      { expectedOutput: 'Antes: a=5, b=10\nDepois: a=10, b=5', description: 'Troca valores com ponteiros' },
    ],
  },
  {
    id: 'c-m-02',
    title: 'Struct: Cadastro de Produto',
    description:
      'Crie um programa em C que define uma struct Produto com campos: nome (char[50]) e preco (float). Crie um produto, preencha os campos e imprima.\n\nProduto: nome="Teclado", preco=149.90\n\nSaída esperada:\nProduto: Teclado\nPreço: R$ 149.90',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'intermediario',
    category: 'Structs',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n#include <string.h>\n\n// Defina a struct Produto aqui\n\nint main() {\n    // Crie uma variável do tipo Produto, preencha e imprima\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char nome[50];\n    float preco;\n} Produto;\n\nint main() {\n    Produto p;\n    strcpy(p.nome, "Teclado");\n    p.preco = 149.90;\n    printf("Produto: %s\\n", p.nome);\n    printf("Preço: R$ %.2f\\n", p.preco);\n    return 0;\n}\n',
    hints: [
      'Use typedef struct { ... } NomeTipo; para definir a struct.',
      'Use strcpy(destino, origem) para copiar strings em C.',
      'Use %.2f no printf para imprimir float com 2 casas decimais.',
    ],
    testCases: [
      { expectedOutput: 'Produto: Teclado\nPreço: R$ 149.90', description: 'Imprime dados do produto' },
    ],
  },
  {
    id: 'c-m-03',
    title: 'Fatorial com Recursão',
    description:
      'Crie uma função recursiva em C que calcula o fatorial de um número inteiro.\n\nFatorial(n) = n * (n-1) * ... * 1, e Fatorial(0) = 1.\n\nCalcule e imprima o fatorial de 6.\n\nSaída esperada:\nFatorial de 6 = 720',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'intermediario',
    category: 'Recursão',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nlong fatorial(int n) {\n    // Implemente a função recursiva\n}\n\nint main() {\n    printf("Fatorial de 6 = %ld\\n", fatorial(6));\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nlong fatorial(int n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    }\n    return n * fatorial(n - 1);\n}\n\nint main() {\n    printf("Fatorial de 6 = %ld\\n", fatorial(6));\n    return 0;\n}\n',
    hints: [
      'O caso base da recursão é: se n == 0 ou n == 1, retorne 1.',
      'O caso recursivo é: return n * fatorial(n - 1).',
      'Use long para suportar valores maiores de fatorial.',
    ],
    testCases: [
      { expectedOutput: 'Fatorial de 6 = 720', description: 'Fatorial de 6 é 720' },
    ],
  },

  // ─── C – Avançado ─────────────────────────────────────────────────────────
  {
    id: 'c-a-01',
    title: 'Lista Encadeada em C',
    description:
      'Implemente uma lista encadeada simples em C. A lista deve suportar inserção no início e impressão de todos os elementos.\n\nInsira os valores 30, 20, 10 (nessa ordem) e imprima a lista.\n\nSaída esperada:\n10 -> 20 -> 30 -> NULL',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'avancado',
    category: 'Estruturas de Dados',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct No {\n    int valor;\n    struct No *proximo;\n} No;\n\nNo* inserir_inicio(No *cabeca, int valor) {\n    // Crie um novo nó e insira no início da lista\n}\n\nvoid imprimir_lista(No *cabeca) {\n    // Percorra e imprima cada nó\n}\n\nint main() {\n    No *lista = NULL;\n    lista = inserir_inicio(lista, 30);\n    lista = inserir_inicio(lista, 20);\n    lista = inserir_inicio(lista, 10);\n    imprimir_lista(lista);\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct No {\n    int valor;\n    struct No *proximo;\n} No;\n\nNo* inserir_inicio(No *cabeca, int valor) {\n    No *novo = (No*)malloc(sizeof(No));\n    novo->valor = valor;\n    novo->proximo = cabeca;\n    return novo;\n}\n\nvoid imprimir_lista(No *cabeca) {\n    No *atual = cabeca;\n    while (atual != NULL) {\n        printf("%d -> ", atual->valor);\n        atual = atual->proximo;\n    }\n    printf("NULL\\n");\n}\n\nint main() {\n    No *lista = NULL;\n    lista = inserir_inicio(lista, 30);\n    lista = inserir_inicio(lista, 20);\n    lista = inserir_inicio(lista, 10);\n    imprimir_lista(lista);\n    return 0;\n}\n',
    hints: [
      'Use malloc(sizeof(No)) para alocar memória para o novo nó.',
      'O novo nó deve apontar para a cabeça atual antes de se tornar a nova cabeça.',
      'No loop de impressão, avance com atual = atual->proximo até NULL.',
    ],
    testCases: [
      { expectedOutput: '10 -> 20 -> 30 -> NULL', description: 'Imprime lista encadeada' },
    ],
  },
  {
    id: 'c-a-02',
    title: 'Ordenação Bubble Sort em C',
    description:
      'Implemente o algoritmo Bubble Sort em C para ordenar um array de inteiros em ordem crescente.\n\nArray inicial: {64, 34, 25, 12, 22, 11, 90}\n\nSaída esperada:\nArray ordenado: 11 12 22 25 34 64 90',
    subject: 'c',
    subjectLabel: 'Linguagem C',
    subjectEmoji: '⚙️',
    difficulty: 'avancado',
    category: 'Ordenação',
    language: 'c',
    starterCode:
      '#include <stdio.h>\n\nvoid bubble_sort(int arr[], int n) {\n    // Implemente o Bubble Sort\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = 7;\n    bubble_sort(arr, n);\n    printf("Array ordenado:");\n    for (int i = 0; i < n; i++) {\n        printf(" %d", arr[i]);\n    }\n    printf("\\n");\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n\nvoid bubble_sort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = 7;\n    bubble_sort(arr, n);\n    printf("Array ordenado:");\n    for (int i = 0; i < n; i++) {\n        printf(" %d", arr[i]);\n    }\n    printf("\\n");\n    return 0;\n}\n',
    hints: [
      'Use dois loops aninhados: o externo controla as passagens, o interno compara adjacentes.',
      'Na passagem i, os últimos i elementos já estão na posição correta (reduza o inner loop).',
      'Para trocar dois elementos, use uma variável temporária.',
    ],
    testCases: [
      { expectedOutput: 'Array ordenado: 11 12 22 25 34 64 90', description: 'Bubble sort em 7 elementos' },
    ],
  },

  // ─── JAVA – Iniciante ─────────────────────────────────────────────────────
  {
    id: 'java-i-01',
    title: 'Hello World em Java',
    description:
      'Escreva um programa Java que imprime "Olá, Mundo!" na tela usando System.out.println.\n\nSaída esperada:\nOlá, Mundo!',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'iniciante',
    category: 'Entrada e Saída',
    language: 'java',
    starterCode:
      'public class Main {\n    public static void main(String[] args) {\n        // Imprima "Olá, Mundo!" aqui\n    }\n}\n',
    solution:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, Mundo!");\n    }\n}\n',
    hints: [
      'Use System.out.println("...") para imprimir texto com quebra de linha.',
      'O método main deve ser public static void e receber String[] args.',
    ],
    testCases: [
      { expectedOutput: 'Olá, Mundo!', description: 'Imprime Olá, Mundo!' },
    ],
  },
  {
    id: 'java-i-02',
    title: 'Soma e Média de Inteiros',
    description:
      'Crie um programa Java que declara um array de inteiros {5, 10, 15, 20, 25}, calcula a soma e a média, e imprime ambos.\n\nSaída esperada:\nSoma: 75\nMédia: 15.0',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'iniciante',
    category: 'Arrays',
    language: 'java',
    starterCode:
      'public class Main {\n    public static void main(String[] args) {\n        int[] numeros = {5, 10, 15, 20, 25};\n        // Calcule a soma e a média, depois imprima\n    }\n}\n',
    solution:
      'public class Main {\n    public static void main(String[] args) {\n        int[] numeros = {5, 10, 15, 20, 25};\n        int soma = 0;\n        for (int n : numeros) {\n            soma += n;\n        }\n        double media = (double) soma / numeros.length;\n        System.out.println("Soma: " + soma);\n        System.out.println("Média: " + media);\n    }\n}\n',
    hints: [
      'Use um for-each (for (int n : numeros)) para percorrer o array.',
      'Faça cast para double antes de dividir: (double) soma / numeros.length.',
      'Use System.out.println("Soma: " + soma) para imprimir.',
    ],
    testCases: [
      { expectedOutput: 'Soma: 75\nMédia: 15.0', description: 'Soma e média do array' },
    ],
  },
  {
    id: 'java-i-03',
    title: 'Classe e Objeto: Pessoa',
    description:
      'Crie uma classe Pessoa com atributos nome (String) e idade (int), um construtor e um método apresentar() que imprime uma apresentação.\n\nCrie um objeto Pessoa("Ana", 28) e chame apresentar().\n\nSaída esperada:\nOlá, meu nome é Ana e tenho 28 anos.',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'iniciante',
    category: 'OOP',
    language: 'java',
    starterCode:
      'class Pessoa {\n    String nome;\n    int idade;\n\n    // Crie o construtor\n\n    // Crie o método apresentar()\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pessoa p = new Pessoa("Ana", 28);\n        p.apresentar();\n    }\n}\n',
    solution:
      'class Pessoa {\n    String nome;\n    int idade;\n\n    Pessoa(String nome, int idade) {\n        this.nome = nome;\n        this.idade = idade;\n    }\n\n    void apresentar() {\n        System.out.println("Olá, meu nome é " + nome + " e tenho " + idade + " anos.");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pessoa p = new Pessoa("Ana", 28);\n        p.apresentar();\n    }\n}\n',
    hints: [
      'O construtor tem o mesmo nome da classe e não tem tipo de retorno.',
      'Use this.nome = nome; para distinguir o atributo do parâmetro.',
      'O método apresentar() não retorna nada (void).',
    ],
    testCases: [
      { expectedOutput: 'Olá, meu nome é Ana e tenho 28 anos.', description: 'Método apresentar da classe Pessoa' },
    ],
  },
  {
    id: 'java-i-04',
    title: 'ArrayList: Lista de Nomes',
    description:
      'Crie um programa Java que usa ArrayList<String> para armazenar os nomes ["Carlos", "Beatriz", "Diego"], depois imprima cada nome em uma linha.\n\nSaída esperada:\nCarlos\nBeatriz\nDiego',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'iniciante',
    category: 'Coleções',
    language: 'java',
    starterCode:
      'import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> nomes = new ArrayList<>();\n        // Adicione os nomes e imprima cada um\n    }\n}\n',
    solution:
      'import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> nomes = new ArrayList<>();\n        nomes.add("Carlos");\n        nomes.add("Beatriz");\n        nomes.add("Diego");\n        for (String nome : nomes) {\n            System.out.println(nome);\n        }\n    }\n}\n',
    hints: [
      'Use nomes.add("...") para inserir elementos no ArrayList.',
      'Use um for-each para percorrer a lista: for (String nome : nomes).',
      'System.out.println(nome) imprime cada elemento com quebra de linha.',
    ],
    testCases: [
      { expectedOutput: 'Carlos\nBeatriz\nDiego', description: 'Imprime os três nomes' },
    ],
  },

  // ─── JAVA – Intermediário ─────────────────────────────────────────────────
  {
    id: 'java-m-01',
    title: 'Herança: Animal e Cachorro',
    description:
      'Crie uma classe base Animal com atributo nome e método emitirSom() que imprime "..." e uma subclasse Cachorro que sobrescreve emitirSom() para imprimir "Au au!".\n\nCrie um Cachorro("Rex") e chame emitirSom().\n\nSaída esperada:\nRex diz: Au au!',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'intermediario',
    category: 'Herança',
    language: 'java',
    starterCode:
      'class Animal {\n    String nome;\n\n    Animal(String nome) {\n        this.nome = nome;\n    }\n\n    void emitirSom() {\n        System.out.println(nome + " diz: ...");\n    }\n}\n\n// Crie a classe Cachorro que herda de Animal\n\npublic class Main {\n    public static void main(String[] args) {\n        Cachorro c = new Cachorro("Rex");\n        c.emitirSom();\n    }\n}\n',
    solution:
      'class Animal {\n    String nome;\n\n    Animal(String nome) {\n        this.nome = nome;\n    }\n\n    void emitirSom() {\n        System.out.println(nome + " diz: ...");\n    }\n}\n\nclass Cachorro extends Animal {\n    Cachorro(String nome) {\n        super(nome);\n    }\n\n    @Override\n    void emitirSom() {\n        System.out.println(nome + " diz: Au au!");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Cachorro c = new Cachorro("Rex");\n        c.emitirSom();\n    }\n}\n',
    hints: [
      'Use extends para que Cachorro herde de Animal.',
      'Chame super(nome) no construtor de Cachorro para inicializar o atributo herdado.',
      'Use @Override antes do método para indicar que está sobrescrevendo.',
    ],
    testCases: [
      { expectedOutput: 'Rex diz: Au au!', description: 'Cachorro emite seu som' },
    ],
  },
  {
    id: 'java-m-02',
    title: 'Interface: Forma Geométrica',
    description:
      'Crie uma interface Forma com método calcularArea() (double). Implemente a classe Retangulo (largura e altura) e a classe Circulo (raio). Imprima as áreas.\n\nRetangulo(4, 5) → 20.0\nCirculo(3) → 28.27 (use Math.PI)\n\nSaída esperada:\nÁrea do retângulo: 20.0\nÁrea do círculo: 28.27',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'intermediario',
    category: 'Interfaces',
    language: 'java',
    starterCode:
      'interface Forma {\n    double calcularArea();\n}\n\n// Implemente Retangulo e Circulo\n\npublic class Main {\n    public static void main(String[] args) {\n        Forma r = new Retangulo(4, 5);\n        Forma c = new Circulo(3);\n        System.out.println("Área do retângulo: " + r.calcularArea());\n        System.out.printf("Área do círculo: %.2f%n", c.calcularArea());\n    }\n}\n',
    solution:
      'interface Forma {\n    double calcularArea();\n}\n\nclass Retangulo implements Forma {\n    double largura, altura;\n\n    Retangulo(double largura, double altura) {\n        this.largura = largura;\n        this.altura = altura;\n    }\n\n    @Override\n    public double calcularArea() {\n        return largura * altura;\n    }\n}\n\nclass Circulo implements Forma {\n    double raio;\n\n    Circulo(double raio) {\n        this.raio = raio;\n    }\n\n    @Override\n    public double calcularArea() {\n        return Math.PI * raio * raio;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Forma r = new Retangulo(4, 5);\n        Forma c = new Circulo(3);\n        System.out.println("Área do retângulo: " + r.calcularArea());\n        System.out.printf("Área do círculo: %.2f%n", c.calcularArea());\n    }\n}\n',
    hints: [
      'Use implements para que a classe implemente a interface.',
      'Math.PI retorna o valor de pi (3.14159...).',
      'Use System.out.printf("%.2f%n", valor) para formatar com 2 casas decimais.',
    ],
    testCases: [
      { expectedOutput: 'Área do retângulo: 20.0\nÁrea do círculo: 28.27', description: 'Áreas de retângulo e círculo' },
    ],
  },
  {
    id: 'java-m-03',
    title: 'HashMap: Contagem de Palavras',
    description:
      'Crie um programa Java que conta a frequência de cada palavra em uma frase usando HashMap.\n\nFrase: "java é legal java é poderoso"\n\nSaída esperada (em ordem de inserção):\njava: 2\né: 2\nlegal: 1\npoderoso: 1',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'intermediario',
    category: 'Coleções',
    language: 'java',
    starterCode:
      'import java.util.HashMap;\nimport java.util.LinkedHashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        String frase = "java é legal java é poderoso";\n        String[] palavras = frase.split(" ");\n        LinkedHashMap<String, Integer> contagem = new LinkedHashMap<>();\n        // Conte as palavras e imprima o resultado\n    }\n}\n',
    solution:
      'import java.util.LinkedHashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        String frase = "java é legal java é poderoso";\n        String[] palavras = frase.split(" ");\n        LinkedHashMap<String, Integer> contagem = new LinkedHashMap<>();\n        for (String palavra : palavras) {\n            contagem.put(palavra, contagem.getOrDefault(palavra, 0) + 1);\n        }\n        for (String chave : contagem.keySet()) {\n            System.out.println(chave + ": " + contagem.get(chave));\n        }\n    }\n}\n',
    hints: [
      'Use getOrDefault(chave, 0) para obter o valor atual ou 0 se não existir.',
      'LinkedHashMap mantém a ordem de inserção das chaves.',
      'Itere com for (String chave : contagem.keySet()) para percorrer as chaves.',
    ],
    testCases: [
      { expectedOutput: 'java: 2\né: 2\nlegal: 1\npoderoso: 1', description: 'Contagem de frequência de palavras' },
    ],
  },

  // ─── JAVA – Avançado ──────────────────────────────────────────────────────
  {
    id: 'java-a-01',
    title: 'Pilha Genérica em Java',
    description:
      'Implemente uma classe genérica Pilha<T> com métodos push(item), pop() e peek(). Use ArrayList internamente.\n\nCrie uma pilha de inteiros, empilhe 1, 2, 3, chame peek() e pop(), e imprima os resultados.\n\nSaída esperada:\nTopo: 3\nRemovido: 3\nNovo topo: 2',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'avancado',
    category: 'Generics',
    language: 'java',
    starterCode:
      'import java.util.ArrayList;\n\nclass Pilha<T> {\n    private ArrayList<T> itens = new ArrayList<>();\n\n    // Implemente push, pop e peek\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pilha<Integer> pilha = new Pilha<>();\n        pilha.push(1);\n        pilha.push(2);\n        pilha.push(3);\n        System.out.println("Topo: " + pilha.peek());\n        System.out.println("Removido: " + pilha.pop());\n        System.out.println("Novo topo: " + pilha.peek());\n    }\n}\n',
    solution:
      'import java.util.ArrayList;\n\nclass Pilha<T> {\n    private ArrayList<T> itens = new ArrayList<>();\n\n    public void push(T item) {\n        itens.add(item);\n    }\n\n    public T pop() {\n        if (itens.isEmpty()) throw new RuntimeException("Pilha vazia");\n        return itens.remove(itens.size() - 1);\n    }\n\n    public T peek() {\n        if (itens.isEmpty()) throw new RuntimeException("Pilha vazia");\n        return itens.get(itens.size() - 1);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Pilha<Integer> pilha = new Pilha<>();\n        pilha.push(1);\n        pilha.push(2);\n        pilha.push(3);\n        System.out.println("Topo: " + pilha.peek());\n        System.out.println("Removido: " + pilha.pop());\n        System.out.println("Novo topo: " + pilha.peek());\n    }\n}\n',
    hints: [
      'Use <T> após o nome da classe para torná-la genérica.',
      'push adiciona ao final do ArrayList; pop remove o último elemento.',
      'peek retorna o último elemento sem removê-lo: itens.get(itens.size() - 1).',
    ],
    testCases: [
      { expectedOutput: 'Topo: 3\nRemovido: 3\nNovo topo: 2', description: 'Pilha genérica com push/pop/peek' },
    ],
  },
  {
    id: 'java-a-02',
    title: 'Streams: Filtrar e Transformar',
    description:
      'Use a API de Streams do Java para processar uma lista de números [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]:\n- Filtre apenas os pares\n- Eleve ao quadrado\n- Imprima cada resultado\n\nSaída esperada:\n4\n16\n36\n64\n100',
    subject: 'java',
    subjectLabel: 'Java',
    subjectEmoji: '☕',
    difficulty: 'avancado',
    category: 'Streams',
    language: 'java',
    starterCode:
      'import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        // Use streams para filtrar pares, elevar ao quadrado e imprimir\n    }\n}\n',
    solution:
      'import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);\n        numeros.stream()\n               .filter(n -> n % 2 == 0)\n               .map(n -> n * n)\n               .forEach(System.out::println);\n    }\n}\n',
    hints: [
      'Chame .stream() na lista para criar um Stream.',
      'Use .filter(n -> n % 2 == 0) para manter apenas os pares.',
      'Use .map(n -> n * n) para elevar ao quadrado e .forEach(System.out::println) para imprimir.',
    ],
    testCases: [
      { expectedOutput: '4\n16\n36\n64\n100', description: 'Pares ao quadrado via streams' },
    ],
  },

  // ─── ALGORITMOS – Iniciante ───────────────────────────────────────────────
  {
    id: 'algo-i-01',
    title: 'Busca Linear',
    description:
      'Implemente a busca linear: percorra uma lista e retorne o índice do elemento procurado, ou -1 se não encontrado.\n\nExemplo:\n  busca_linear([4, 2, 7, 1, 9], 7) → 2\n  busca_linear([4, 2, 7, 1, 9], 5) → -1',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'iniciante',
    category: 'Busca',
    language: 'python',
    starterCode:
      'def busca_linear(lista, alvo):\n    """\n    Retorna o índice do alvo na lista, ou -1 se não encontrado.\n    """\n    # Seu código aqui\n    pass\n\nprint(busca_linear([4, 2, 7, 1, 9], 7))\nprint(busca_linear([4, 2, 7, 1, 9], 5))\n',
    solution:
      'def busca_linear(lista, alvo):\n    for i in range(len(lista)):\n        if lista[i] == alvo:\n            return i\n    return -1\n\nprint(busca_linear([4, 2, 7, 1, 9], 7))\nprint(busca_linear([4, 2, 7, 1, 9], 5))\n',
    hints: [
      'Percorra a lista com um loop for usando range(len(lista)).',
      'Compare cada elemento com o alvo usando ==.',
      'Se o alvo não for encontrado após o loop, retorne -1.',
    ],
    testCases: [
      { expectedOutput: '2\n-1', description: 'Busca linear: encontrado e não encontrado' },
    ],
  },
  {
    id: 'algo-i-02',
    title: 'Contagem de Ocorrências',
    description:
      'Implemente uma função que conta quantas vezes um elemento aparece em uma lista.\n\nExemplo:\n  contar([1, 2, 3, 2, 4, 2], 2) → 3\n  contar(["a", "b", "a", "c"], "a") → 2',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'iniciante',
    category: 'Contagem',
    language: 'python',
    starterCode:
      'def contar(lista, elemento):\n    """\n    Retorna quantas vezes elemento aparece em lista.\n    """\n    # Seu código aqui\n    pass\n\nprint(contar([1, 2, 3, 2, 4, 2], 2))\nprint(contar(["a", "b", "a", "c"], "a"))\n',
    solution:
      'def contar(lista, elemento):\n    contador = 0\n    for item in lista:\n        if item == elemento:\n            contador += 1\n    return contador\n\nprint(contar([1, 2, 3, 2, 4, 2], 2))\nprint(contar(["a", "b", "a", "c"], "a"))\n',
    hints: [
      'Use uma variável contador inicializada com 0.',
      'Incremente o contador cada vez que encontrar o elemento.',
      'Não use a função count() embutida — implemente manualmente.',
    ],
    testCases: [
      { expectedOutput: '3\n2', description: 'Conta ocorrências de 2 e "a"' },
    ],
  },
  {
    id: 'algo-i-03',
    title: 'Ordenação por Seleção (Selection Sort)',
    description:
      'Implemente o Selection Sort: a cada iteração, encontre o menor elemento e coloque-o na posição correta.\n\nExemplo:\n  selection_sort([64, 25, 12, 22, 11]) → [11, 12, 22, 25, 64]\n\nRetorne a lista ordenada.',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'iniciante',
    category: 'Ordenação',
    language: 'python',
    starterCode:
      'def selection_sort(lista):\n    """\n    Ordena a lista usando Selection Sort e retorna ela.\n    """\n    arr = lista[:]\n    # Implemente o selection sort em arr\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))\n',
    solution:
      'def selection_sort(lista):\n    arr = lista[:]\n    n = len(arr)\n    for i in range(n):\n        min_idx = i\n        for j in range(i + 1, n):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr\n\nprint(selection_sort([64, 25, 12, 22, 11]))\n',
    hints: [
      'Para cada posição i, encontre o índice do menor elemento no restante da lista.',
      'Troque o elemento na posição i com o menor encontrado.',
      'Use arr[i], arr[min_idx] = arr[min_idx], arr[i] para trocar em Python.',
    ],
    testCases: [
      { expectedOutput: '[11, 12, 22, 25, 64]', description: 'Selection sort ordena a lista' },
    ],
  },
  {
    id: 'algo-i-04',
    title: 'Verificar Palíndromo',
    description:
      'Implemente uma função que verifica se uma string é um palíndromo (lida da mesma forma nos dois sentidos), ignorando maiúsculas/minúsculas.\n\nExemplo:\n  palindromo("radar") → True\n  palindromo("Python") → False\n  palindromo("Arara") → True',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'iniciante',
    category: 'Strings',
    language: 'python',
    starterCode:
      'def palindromo(texto):\n    """\n    Retorna True se texto é palíndromo, False caso contrário.\n    Ignore diferença de maiúsculas/minúsculas.\n    """\n    # Seu código aqui\n    pass\n\nprint(palindromo("radar"))\nprint(palindromo("Python"))\nprint(palindromo("Arara"))\n',
    solution:
      'def palindromo(texto):\n    s = texto.lower()\n    return s == s[::-1]\n\nprint(palindromo("radar"))\nprint(palindromo("Python"))\nprint(palindromo("Arara"))\n',
    hints: [
      'Converta o texto para minúsculas com .lower() antes de comparar.',
      'Compare a string com sua versão invertida: s == s[::-1].',
      'Retorne True se forem iguais, False caso contrário.',
    ],
    testCases: [
      { expectedOutput: 'True\nFalse\nTrue', description: 'Verifica radar, Python e Arara' },
    ],
  },

  // ─── ALGORITMOS – Intermediário ───────────────────────────────────────────
  {
    id: 'algo-m-01',
    title: 'Busca Binária',
    description:
      'Implemente a busca binária em uma lista ordenada. Retorne o índice do elemento ou -1 se não encontrado.\n\nA busca binária é O(log n) — muito mais rápida que a linear para listas grandes.\n\nExemplo:\n  busca_binaria([1, 3, 5, 7, 9, 11, 13], 7) → 3\n  busca_binaria([1, 3, 5, 7, 9, 11, 13], 6) → -1',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'intermediario',
    category: 'Busca',
    language: 'python',
    starterCode:
      'def busca_binaria(lista, alvo):\n    """\n    Busca binária em lista ordenada.\n    Retorna o índice ou -1.\n    """\n    # Seu código aqui\n    pass\n\nprint(busca_binaria([1, 3, 5, 7, 9, 11, 13], 7))\nprint(busca_binaria([1, 3, 5, 7, 9, 11, 13], 6))\n',
    solution:
      'def busca_binaria(lista, alvo):\n    esq, dir = 0, len(lista) - 1\n    while esq <= dir:\n        meio = (esq + dir) // 2\n        if lista[meio] == alvo:\n            return meio\n        elif lista[meio] < alvo:\n            esq = meio + 1\n        else:\n            dir = meio - 1\n    return -1\n\nprint(busca_binaria([1, 3, 5, 7, 9, 11, 13], 7))\nprint(busca_binaria([1, 3, 5, 7, 9, 11, 13], 6))\n',
    hints: [
      'Mantenha dois ponteiros: esq (início) e dir (fim) do intervalo atual.',
      'Calcule o meio com (esq + dir) // 2.',
      'Se o elemento do meio for menor que o alvo, mova esq para meio+1; se maior, dir para meio-1.',
    ],
    testCases: [
      { expectedOutput: '3\n-1', description: 'Busca binária: encontrado (índice 3) e não encontrado' },
    ],
  },
  {
    id: 'algo-m-02',
    title: 'Merge Sort',
    description:
      'Implemente o Merge Sort, um algoritmo de ordenação eficiente com complexidade O(n log n).\n\nDivida a lista ao meio, ordene cada metade recursivamente e depois mescle.\n\nExemplo:\n  merge_sort([38, 27, 43, 3, 9, 82, 10]) → [3, 9, 10, 27, 38, 43, 82]',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'intermediario',
    category: 'Ordenação',
    language: 'python',
    starterCode:
      'def merge_sort(lista):\n    """\n    Retorna a lista ordenada usando Merge Sort.\n    """\n    if len(lista) <= 1:\n        return lista\n    # Divida, ordene recursivamente e mescle\n    pass\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))\n',
    solution:
      'def merge_sort(lista):\n    if len(lista) <= 1:\n        return lista\n    meio = len(lista) // 2\n    esquerda = merge_sort(lista[:meio])\n    direita = merge_sort(lista[meio:])\n    return mesclar(esquerda, direita)\n\ndef mesclar(a, b):\n    resultado = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            resultado.append(a[i])\n            i += 1\n        else:\n            resultado.append(b[j])\n            j += 1\n    resultado.extend(a[i:])\n    resultado.extend(b[j:])\n    return resultado\n\nprint(merge_sort([38, 27, 43, 3, 9, 82, 10]))\n',
    hints: [
      'O caso base é quando a lista tem 0 ou 1 elemento (já está ordenada).',
      'Divida a lista ao meio e chame merge_sort recursivamente em cada metade.',
      'A função mesclar combina duas listas ordenadas comparando elemento a elemento.',
    ],
    testCases: [
      { expectedOutput: '[3, 9, 10, 27, 38, 43, 82]', description: 'Merge sort ordena a lista' },
    ],
  },
  {
    id: 'algo-m-03',
    title: 'Dois Ponteiros: Par com Soma Alvo',
    description:
      'Dado um array ordenado, encontre dois números que somam ao alvo usando a técnica de dois ponteiros. Retorne os índices.\n\nExemplo:\n  dois_ponteiros([1, 2, 3, 4, 6], 6) → (1, 3)  # 2 + 4 = 6\n  dois_ponteiros([1, 3, 5, 7, 9], 10) → (1, 3)  # 3 + 7 = 10',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'intermediario',
    category: 'Dois Ponteiros',
    language: 'python',
    starterCode:
      'def dois_ponteiros(arr, alvo):\n    """\n    Retorna uma tupla (i, j) com os índices dos dois números que somam ao alvo.\n    O array está ordenado.\n    """\n    # Seu código aqui\n    pass\n\nprint(dois_ponteiros([1, 2, 3, 4, 6], 6))\nprint(dois_ponteiros([1, 3, 5, 7, 9], 10))\n',
    solution:
      'def dois_ponteiros(arr, alvo):\n    esq = 0\n    dir = len(arr) - 1\n    while esq < dir:\n        soma = arr[esq] + arr[dir]\n        if soma == alvo:\n            return (esq, dir)\n        elif soma < alvo:\n            esq += 1\n        else:\n            dir -= 1\n    return None\n\nprint(dois_ponteiros([1, 2, 3, 4, 6], 6))\nprint(dois_ponteiros([1, 3, 5, 7, 9], 10))\n',
    hints: [
      'Use um ponteiro no início (esq=0) e outro no fim (dir=len-1).',
      'Se a soma for menor que o alvo, avance esq; se maior, recue dir.',
      'Pare quando os ponteiros se cruzarem ou a soma for encontrada.',
    ],
    testCases: [
      { expectedOutput: '(1, 3)\n(1, 3)', description: 'Dois ponteiros encontram pares com soma alvo' },
    ],
  },

  // ─── ALGORITMOS – Avançado ────────────────────────────────────────────────
  {
    id: 'algo-a-01',
    title: 'Algoritmo de Dijkstra (Simplificado)',
    description:
      'Implemente o algoritmo de Dijkstra para encontrar o menor caminho de um nó origem a todos os outros em um grafo ponderado.\n\nGrafo: A→B:1, A→C:4, B→C:2, B→D:5, C→D:1\n\nDistâncias a partir de A:\nA: 0\nB: 1\nC: 3\nD: 4',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'avancado',
    category: 'Grafos',
    language: 'python',
    starterCode:
      'import heapq\n\ndef dijkstra(grafo, origem):\n    """\n    Retorna um dict com a menor distância da origem a cada nó.\n    grafo: dict {no: [(vizinho, peso), ...]}\n    """\n    # Seu código aqui\n    pass\n\ngrafo = {\n    "A": [("B", 1), ("C", 4)],\n    "B": [("C", 2), ("D", 5)],\n    "C": [("D", 1)],\n    "D": []\n}\ndist = dijkstra(grafo, "A")\nfor no in sorted(dist):\n    print(f"{no}: {dist[no]}")\n',
    solution:
      'import heapq\n\ndef dijkstra(grafo, origem):\n    dist = {no: float("inf") for no in grafo}\n    dist[origem] = 0\n    fila = [(0, origem)]\n    while fila:\n        custo_atual, no_atual = heapq.heappop(fila)\n        if custo_atual > dist[no_atual]:\n            continue\n        for vizinho, peso in grafo[no_atual]:\n            novo_custo = custo_atual + peso\n            if novo_custo < dist[vizinho]:\n                dist[vizinho] = novo_custo\n                heapq.heappush(fila, (novo_custo, vizinho))\n    return dist\n\ngrafo = {\n    "A": [("B", 1), ("C", 4)],\n    "B": [("C", 2), ("D", 5)],\n    "C": [("D", 1)],\n    "D": []\n}\ndist = dijkstra(grafo, "A")\nfor no in sorted(dist):\n    print(f"{no}: {dist[no]}")\n',
    hints: [
      'Inicialize todas as distâncias com infinito, exceto a origem (0).',
      'Use heapq (min-heap) para sempre processar o nó com menor custo primeiro.',
      'Para cada vizinho, calcule o novo custo e atualize se for menor que o registrado.',
    ],
    testCases: [
      { expectedOutput: 'A: 0\nB: 1\nC: 3\nD: 4', description: 'Dijkstra no grafo A→B→C→D' },
    ],
  },
  {
    id: 'algo-a-02',
    title: 'Programação Dinâmica: Subsequência Comum Máxima',
    description:
      'Implemente o algoritmo LCS (Longest Common Subsequence) usando programação dinâmica.\n\nRetorne o tamanho da maior subsequência comum entre duas strings.\n\nExemplo:\n  lcs("ABCBDAB", "BDCAB") → 4  # "BCAB" ou "BDAB"\n  lcs("AGGTAB", "GXTXAYB") → 4  # "GTAB"',
    subject: 'algoritmos',
    subjectLabel: 'Algoritmos',
    subjectEmoji: '🔢',
    difficulty: 'avancado',
    category: 'Programação Dinâmica',
    language: 'python',
    starterCode:
      'def lcs(s1, s2):\n    """\n    Retorna o tamanho da Longest Common Subsequence entre s1 e s2.\n    """\n    # Seu código aqui\n    pass\n\nprint(lcs("ABCBDAB", "BDCAB"))\nprint(lcs("AGGTAB", "GXTXAYB"))\n',
    solution:
      'def lcs(s1, s2):\n    m, n = len(s1), len(s2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if s1[i - 1] == s2[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]\n\nprint(lcs("ABCBDAB", "BDCAB"))\nprint(lcs("AGGTAB", "GXTXAYB"))\n',
    hints: [
      'Crie uma tabela 2D dp de tamanho (m+1) x (n+1) inicializada com 0.',
      'Se os caracteres coincidem: dp[i][j] = dp[i-1][j-1] + 1.',
      'Se não coincidem: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    ],
    testCases: [
      { expectedOutput: '4\n4', description: 'LCS de dois pares de strings' },
    ],
  },

  // ─── ESTRUTURAS DE DADOS – Iniciante ─────────────────────────────────────
  {
    id: 'eds-i-01',
    title: 'Pilha (Stack) com Lista',
    description:
      'Implemente uma pilha usando uma lista Python. A pilha segue o princípio LIFO (Last In, First Out).\n\nCrie funções: empilhar(pilha, item), desempilhar(pilha) e topo(pilha).\n\nExemplo:\n  pilha = []\n  empilhar(pilha, 1)\n  empilhar(pilha, 2)\n  empilhar(pilha, 3)\n  topo(pilha) → 3\n  desempilhar(pilha) → 3\n  topo(pilha) → 2',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'iniciante',
    category: 'Pilha',
    language: 'python',
    starterCode:
      'def empilhar(pilha, item):\n    # Adicione item ao topo da pilha\n    pass\n\ndef desempilhar(pilha):\n    # Remova e retorne o item do topo\n    pass\n\ndef topo(pilha):\n    # Retorne o item do topo sem remover\n    pass\n\npilha = []\nempilhar(pilha, 1)\nempilhar(pilha, 2)\nempilhar(pilha, 3)\nprint(topo(pilha))\nprint(desempilhar(pilha))\nprint(topo(pilha))\n',
    solution:
      'def empilhar(pilha, item):\n    pilha.append(item)\n\ndef desempilhar(pilha):\n    return pilha.pop()\n\ndef topo(pilha):\n    return pilha[-1]\n\npilha = []\nempilhar(pilha, 1)\nempilhar(pilha, 2)\nempilhar(pilha, 3)\nprint(topo(pilha))\nprint(desempilhar(pilha))\nprint(topo(pilha))\n',
    hints: [
      'Use list.append() para adicionar ao topo da pilha.',
      'Use list.pop() para remover e retornar o último elemento.',
      'Para ver o topo sem remover, acesse pilha[-1].',
    ],
    testCases: [
      { expectedOutput: '3\n3\n2', description: 'Pilha LIFO com topo e desempilhar' },
    ],
  },
  {
    id: 'eds-i-02',
    title: 'Fila (Queue) com Deque',
    description:
      'Implemente uma fila usando collections.deque. A fila segue o princípio FIFO (First In, First Out).\n\nCrie funções: enfileirar(fila, item) e desenfileirar(fila).\n\nEnfileire 10, 20, 30 e depois desenfileire dois elementos.\n\nSaída esperada:\nDesenfileirado: 10\nDesenfileirado: 20\nFila restante: deque([30])',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'iniciante',
    category: 'Fila',
    language: 'python',
    starterCode:
      'from collections import deque\n\ndef enfileirar(fila, item):\n    # Adicione item ao final da fila\n    pass\n\ndef desenfileirar(fila):\n    # Remova e retorne o item do início da fila\n    pass\n\nfila = deque()\nenfileirar(fila, 10)\nenfileirar(fila, 20)\nenfileirar(fila, 30)\nprint("Desenfileirado:", desenfileirar(fila))\nprint("Desenfileirado:", desenfileirar(fila))\nprint("Fila restante:", fila)\n',
    solution:
      'from collections import deque\n\ndef enfileirar(fila, item):\n    fila.append(item)\n\ndef desenfileirar(fila):\n    return fila.popleft()\n\nfila = deque()\nenfileirar(fila, 10)\nenfileirar(fila, 20)\nenfileirar(fila, 30)\nprint("Desenfileirado:", desenfileirar(fila))\nprint("Desenfileirado:", desenfileirar(fila))\nprint("Fila restante:", fila)\n',
    hints: [
      'deque.append() adiciona ao final (enfileirar).',
      'deque.popleft() remove do início — operação O(1) para deque.',
      'Fila FIFO: quem entra primeiro sai primeiro.',
    ],
    testCases: [
      { expectedOutput: 'Desenfileirado: 10\nDesenfileirado: 20\nFila restante: deque([30])', description: 'Fila FIFO com deque' },
    ],
  },
  {
    id: 'eds-i-03',
    title: 'Dicionário como HashMap',
    description:
      'Use um dicionário Python como hashmap para armazenar a frequência de letras em uma string.\n\nConte a frequência de cada letra em "programacao" (sem contar espaços) e imprima em ordem alfabética.\n\nSaída esperada:\na: 3\nc: 1\ng: 1\nm: 1\no: 2\np: 1\nr: 2',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'iniciante',
    category: 'Hashmap',
    language: 'python',
    starterCode:
      '# Conte a frequência de letras em "programacao"\ntexto = "programacao"\n\n# Crie um dicionário de frequências\n# Imprima em ordem alfabética\n',
    solution:
      'texto = "programacao"\nfreq = {}\nfor letra in texto:\n    freq[letra] = freq.get(letra, 0) + 1\nfor letra in sorted(freq):\n    print(f"{letra}: {freq[letra]}")\n',
    hints: [
      'Use dict.get(chave, 0) para obter o valor ou 0 se a chave não existir.',
      'Atualize com freq[letra] = freq.get(letra, 0) + 1.',
      'Use sorted(freq) para iterar as chaves em ordem alfabética.',
    ],
    testCases: [
      { expectedOutput: 'a: 3\nc: 1\ng: 1\nm: 1\no: 2\np: 1\nr: 2', description: 'Frequência de letras em programacao' },
    ],
  },
  {
    id: 'eds-i-04',
    title: 'Lista Encadeada Simples em Python',
    description:
      'Implemente uma lista encadeada simples em Python com classe No e ListaEncadeada.\n\nA lista deve suportar:\n- append(valor): insere no final\n- imprimir(): imprime todos os valores separados por " -> "\n\nInsira 1, 2, 3 e imprima.\n\nSaída esperada:\n1 -> 2 -> 3',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'iniciante',
    category: 'Lista Encadeada',
    language: 'python',
    starterCode:
      'class No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.proximo = None\n\nclass ListaEncadeada:\n    def __init__(self):\n        self.cabeca = None\n\n    def append(self, valor):\n        # Insira um novo nó no final da lista\n        pass\n\n    def imprimir(self):\n        # Imprima os valores separados por " -> "\n        pass\n\nlista = ListaEncadeada()\nlista.append(1)\nlista.append(2)\nlista.append(3)\nlista.imprimir()\n',
    solution:
      'class No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.proximo = None\n\nclass ListaEncadeada:\n    def __init__(self):\n        self.cabeca = None\n\n    def append(self, valor):\n        novo = No(valor)\n        if self.cabeca is None:\n            self.cabeca = novo\n            return\n        atual = self.cabeca\n        while atual.proximo is not None:\n            atual = atual.proximo\n        atual.proximo = novo\n\n    def imprimir(self):\n        valores = []\n        atual = self.cabeca\n        while atual is not None:\n            valores.append(str(atual.valor))\n            atual = atual.proximo\n        print(" -> ".join(valores))\n\nlista = ListaEncadeada()\nlista.append(1)\nlista.append(2)\nlista.append(3)\nlista.imprimir()\n',
    hints: [
      'No append, percorra até o último nó (onde proximo é None) e adicione o novo nó.',
      'No imprimir, colete os valores em uma lista e use " -> ".join() para formatar.',
      'Trate o caso especial em que a lista está vazia (cabeca is None).',
    ],
    testCases: [
      { expectedOutput: '1 -> 2 -> 3', description: 'Lista encadeada com 3 elementos' },
    ],
  },

  // ─── ESTRUTURAS DE DADOS – Intermediário ──────────────────────────────────
  {
    id: 'eds-m-01',
    title: 'Árvore Binária de Busca: Inserção e Busca',
    description:
      'Implemente uma Árvore Binária de Busca (BST) com métodos inserir(valor) e buscar(valor).\n\nInsira os valores [5, 3, 7, 1, 4, 6, 8] e verifique buscas.\n\nSaída esperada:\nBuscando 4: True\nBuscando 9: False',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'intermediario',
    category: 'Árvore Binária',
    language: 'python',
    starterCode:
      'class No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.esq = None\n        self.dir = None\n\nclass BST:\n    def __init__(self):\n        self.raiz = None\n\n    def inserir(self, valor):\n        # Insira o valor na BST\n        pass\n\n    def buscar(self, valor):\n        # Retorne True se o valor está na BST, False caso contrário\n        pass\n\nbst = BST()\nfor v in [5, 3, 7, 1, 4, 6, 8]:\n    bst.inserir(v)\nprint("Buscando 4:", bst.buscar(4))\nprint("Buscando 9:", bst.buscar(9))\n',
    solution:
      'class No:\n    def __init__(self, valor):\n        self.valor = valor\n        self.esq = None\n        self.dir = None\n\nclass BST:\n    def __init__(self):\n        self.raiz = None\n\n    def _inserir(self, no, valor):\n        if no is None:\n            return No(valor)\n        if valor < no.valor:\n            no.esq = self._inserir(no.esq, valor)\n        elif valor > no.valor:\n            no.dir = self._inserir(no.dir, valor)\n        return no\n\n    def inserir(self, valor):\n        self.raiz = self._inserir(self.raiz, valor)\n\n    def _buscar(self, no, valor):\n        if no is None:\n            return False\n        if valor == no.valor:\n            return True\n        elif valor < no.valor:\n            return self._buscar(no.esq, valor)\n        else:\n            return self._buscar(no.dir, valor)\n\n    def buscar(self, valor):\n        return self._buscar(self.raiz, valor)\n\nbst = BST()\nfor v in [5, 3, 7, 1, 4, 6, 8]:\n    bst.inserir(v)\nprint("Buscando 4:", bst.buscar(4))\nprint("Buscando 9:", bst.buscar(9))\n',
    hints: [
      'Na inserção, se o valor for menor que o nó atual, vá para a esquerda; se maior, para a direita.',
      'A inserção recursiva retorna o nó (modificado ou criado) e o atribui ao pai.',
      'Na busca, retorne False quando o nó for None (não encontrado).',
    ],
    testCases: [
      { expectedOutput: 'Buscando 4: True\nBuscando 9: False', description: 'BST com inserção e busca' },
    ],
  },
  {
    id: 'eds-m-02',
    title: 'Grafo: Busca em Largura (BFS)',
    description:
      'Implemente a Busca em Largura (BFS) em um grafo não-dirigido representado como lista de adjacência.\n\nImprima os nós visitados a partir do nó "A".\n\nGrafo: A-B, A-C, B-D, C-D, D-E\n\nSaída esperada:\nA B C D E',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'intermediario',
    category: 'Grafos',
    language: 'python',
    starterCode:
      'from collections import deque\n\ndef bfs(grafo, inicio):\n    """\n    Realiza BFS e retorna a lista de nós visitados em ordem.\n    """\n    # Seu código aqui\n    pass\n\ngrafo = {\n    "A": ["B", "C"],\n    "B": ["A", "D"],\n    "C": ["A", "D"],\n    "D": ["B", "C", "E"],\n    "E": ["D"]\n}\nresultado = bfs(grafo, "A")\nprint(" ".join(resultado))\n',
    solution:
      'from collections import deque\n\ndef bfs(grafo, inicio):\n    visitados = []\n    vistos = {inicio}\n    fila = deque([inicio])\n    while fila:\n        no = fila.popleft()\n        visitados.append(no)\n        for vizinho in grafo[no]:\n            if vizinho not in vistos:\n                vistos.add(vizinho)\n                fila.append(vizinho)\n    return visitados\n\ngrafo = {\n    "A": ["B", "C"],\n    "B": ["A", "D"],\n    "C": ["A", "D"],\n    "D": ["B", "C", "E"],\n    "E": ["D"]\n}\nresultado = bfs(grafo, "A")\nprint(" ".join(resultado))\n',
    hints: [
      'Use um deque como fila e um set para rastrear nós já vistos.',
      'Adicione os vizinhos não visitados à fila e ao set de vistos.',
      'Processe sempre o nó do início da fila (popleft).',
    ],
    testCases: [
      { expectedOutput: 'A B C D E', description: 'BFS a partir de A no grafo dado' },
    ],
  },
  {
    id: 'eds-m-03',
    title: 'Heap: Fila de Prioridade',
    description:
      'Use o módulo heapq do Python para implementar uma fila de prioridade. Insira tarefas com prioridades e processe na ordem correta (menor número = maior prioridade).\n\nTarefas: (3, "email"), (1, "reunião"), (2, "relatório")\n\nSaída esperada:\nProcessando: reunião\nProcessando: relatório\nProcessando: email',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'intermediario',
    category: 'Heap',
    language: 'python',
    starterCode:
      'import heapq\n\n# Crie uma fila de prioridade com as tarefas\n# e processe na ordem de prioridade\ntarefas = [(3, "email"), (1, "reunião"), (2, "relatório")]\n',
    solution:
      'import heapq\n\ntarefas = [(3, "email"), (1, "reunião"), (2, "relatório")]\nheapq.heapify(tarefas)\nwhile tarefas:\n    prioridade, nome = heapq.heappop(tarefas)\n    print(f"Processando: {nome}")\n',
    hints: [
      'Use heapq.heapify(lista) para transformar a lista em um heap.',
      'heapq.heappop() retorna e remove o menor elemento do heap.',
      'Tuplas são comparadas pelo primeiro elemento, então (prioridade, nome) funciona.',
    ],
    testCases: [
      { expectedOutput: 'Processando: reunião\nProcessando: relatório\nProcessando: email', description: 'Fila de prioridade processa na ordem correta' },
    ],
  },

  // ─── ESTRUTURAS DE DADOS – Avançado ──────────────────────────────────────
  {
    id: 'eds-a-01',
    title: 'Trie: Autocompletar',
    description:
      'Implemente uma Trie (árvore de prefixos) com métodos inserir(palavra) e buscar_prefixo(prefixo) que retorna todas as palavras com aquele prefixo.\n\nInsira: ["banana", "bandeira", "bando", "barco", "carro"]\nBusca por "ban" → ["banana", "bandeira", "bando"]',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'avancado',
    category: 'Trie',
    language: 'python',
    starterCode:
      'class NoTrie:\n    def __init__(self):\n        self.filhos = {}\n        self.fim_de_palavra = False\n\nclass Trie:\n    def __init__(self):\n        self.raiz = NoTrie()\n\n    def inserir(self, palavra):\n        # Insira a palavra na Trie\n        pass\n\n    def buscar_prefixo(self, prefixo):\n        # Retorne lista de todas as palavras com este prefixo\n        pass\n\ntrie = Trie()\npalavras = ["banana", "bandeira", "bando", "barco", "carro"]\nfor p in palavras:\n    trie.inserir(p)\nprint(trie.buscar_prefixo("ban"))\n',
    solution:
      'class NoTrie:\n    def __init__(self):\n        self.filhos = {}\n        self.fim_de_palavra = False\n\nclass Trie:\n    def __init__(self):\n        self.raiz = NoTrie()\n\n    def inserir(self, palavra):\n        no = self.raiz\n        for letra in palavra:\n            if letra not in no.filhos:\n                no.filhos[letra] = NoTrie()\n            no = no.filhos[letra]\n        no.fim_de_palavra = True\n\n    def _coletar(self, no, prefixo, resultado):\n        if no.fim_de_palavra:\n            resultado.append(prefixo)\n        for letra, filho in no.filhos.items():\n            self._coletar(filho, prefixo + letra, resultado)\n\n    def buscar_prefixo(self, prefixo):\n        no = self.raiz\n        for letra in prefixo:\n            if letra not in no.filhos:\n                return []\n            no = no.filhos[letra]\n        resultado = []\n        self._coletar(no, prefixo, resultado)\n        return resultado\n\ntrie = Trie()\npalavras = ["banana", "bandeira", "bando", "barco", "carro"]\nfor p in palavras:\n    trie.inserir(p)\nprint(trie.buscar_prefixo("ban"))\n',
    hints: [
      'Na inserção, percorra letra a letra criando nós filhos quando necessário.',
      'Marque o último nó como fim_de_palavra = True.',
      'Em buscar_prefixo, navegue até o nó do prefixo e depois colete todas as palavras a partir dele recursivamente.',
    ],
    testCases: [
      { expectedOutput: "['banana', 'bandeira', 'bando']", description: 'Trie retorna palavras com prefixo "ban"' },
    ],
  },
  {
    id: 'eds-a-02',
    title: 'Union-Find (Disjoint Set)',
    description:
      'Implemente a estrutura Union-Find com path compression e union by rank.\n\nUse para detectar se dois elementos estão no mesmo conjunto.\n\nOperações: union(0,1), union(1,2), union(3,4)\nConsultas: mesmo_conjunto(0,2) → True, mesmo_conjunto(0,3) → False\n\nSaída esperada:\nTrue\nFalse',
    subject: 'estruturas-de-dados',
    subjectLabel: 'Estruturas de Dados',
    subjectEmoji: '🗂️',
    difficulty: 'avancado',
    category: 'Union-Find',
    language: 'python',
    starterCode:
      'class UnionFind:\n    def __init__(self, n):\n        self.pai = list(range(n))\n        self.rank = [0] * n\n\n    def encontrar(self, x):\n        # Implemente com path compression\n        pass\n\n    def unir(self, x, y):\n        # Implemente com union by rank\n        pass\n\n    def mesmo_conjunto(self, x, y):\n        return self.encontrar(x) == self.encontrar(y)\n\nuf = UnionFind(5)\nuf.unir(0, 1)\nuf.unir(1, 2)\nuf.unir(3, 4)\nprint(uf.mesmo_conjunto(0, 2))\nprint(uf.mesmo_conjunto(0, 3))\n',
    solution:
      'class UnionFind:\n    def __init__(self, n):\n        self.pai = list(range(n))\n        self.rank = [0] * n\n\n    def encontrar(self, x):\n        if self.pai[x] != x:\n            self.pai[x] = self.encontrar(self.pai[x])\n        return self.pai[x]\n\n    def unir(self, x, y):\n        rx, ry = self.encontrar(x), self.encontrar(y)\n        if rx == ry:\n            return\n        if self.rank[rx] < self.rank[ry]:\n            rx, ry = ry, rx\n        self.pai[ry] = rx\n        if self.rank[rx] == self.rank[ry]:\n            self.rank[rx] += 1\n\n    def mesmo_conjunto(self, x, y):\n        return self.encontrar(x) == self.encontrar(y)\n\nuf = UnionFind(5)\nuf.unir(0, 1)\nuf.unir(1, 2)\nuf.unir(3, 4)\nprint(uf.mesmo_conjunto(0, 2))\nprint(uf.mesmo_conjunto(0, 3))\n',
    hints: [
      'Path compression: ao encontrar a raiz, faça todos os nós do caminho apontarem direto para ela.',
      'Union by rank: sempre conecte a árvore menor (menor rank) à maior.',
      'Dois elementos estão no mesmo conjunto se têm a mesma raiz (encontrar retorna o mesmo valor).',
    ],
    testCases: [
      { expectedOutput: 'True\nFalse', description: 'Union-Find detecta conjuntos corretamente' },
    ],
  },

  // ─── BACKEND com PYTHON – Iniciante ──────────────────────────────────────
  {
    id: 'back-i-01',
    title: 'Simular Resposta JSON',
    description:
      'Crie uma função que simula um endpoint de API retornando um dicionário Python como resposta JSON.\n\nA função get_usuario(id) deve retornar um dict com dados do usuário. Use json.dumps para serializar.\n\nExemplo:\n  get_usuario(1) → {"id": 1, "nome": "Alice", "email": "alice@email.com"}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'iniciante',
    category: 'API',
    language: 'python',
    starterCode:
      'import json\n\ndef get_usuario(id):\n    """\n    Retorna um dict simulando dados de um usuário.\n    """\n    # Seu código aqui\n    pass\n\nresposta = get_usuario(1)\nprint(json.dumps(resposta, ensure_ascii=False))\n',
    solution:
      'import json\n\ndef get_usuario(id):\n    usuarios = {\n        1: {"id": 1, "nome": "Alice", "email": "alice@email.com"},\n        2: {"id": 2, "nome": "Bob", "email": "bob@email.com"},\n    }\n    return usuarios.get(id, {"erro": "Usuário não encontrado"})\n\nresposta = get_usuario(1)\nprint(json.dumps(resposta, ensure_ascii=False))\n',
    hints: [
      'Use um dicionário interno para simular um banco de dados de usuários.',
      'dict.get(chave, valor_padrão) retorna o valor ou um padrão se não encontrar.',
      'json.dumps(dict) converte o dicionário para string JSON.',
    ],
    testCases: [
      { expectedOutput: '{"id": 1, "nome": "Alice", "email": "alice@email.com"}', description: 'Retorna dados do usuário 1 em JSON' },
    ],
  },
  {
    id: 'back-i-02',
    title: 'Processar Dados de Requisição',
    description:
      'Simule o processamento de dados de uma requisição POST. Crie uma função processar_cadastro(dados) que valida e processa um dicionário de cadastro.\n\nValidações:\n- nome não pode ser vazio\n- email deve conter "@"\n- idade deve ser >= 18\n\nRetorne {"sucesso": True, "mensagem": "Cadastro realizado!"} ou {"sucesso": False, "erro": "..."}.',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'iniciante',
    category: 'Validação',
    language: 'python',
    starterCode:
      'def processar_cadastro(dados):\n    """\n    Valida e processa os dados de cadastro.\n    dados: dict com "nome", "email", "idade"\n    Retorna dict com "sucesso" e "mensagem" ou "erro".\n    """\n    # Seu código aqui\n    pass\n\nprint(processar_cadastro({"nome": "Carlos", "email": "carlos@mail.com", "idade": 25}))\nprint(processar_cadastro({"nome": "", "email": "x@y.com", "idade": 20}))\nprint(processar_cadastro({"nome": "Ana", "email": "invalido", "idade": 30}))\n',
    solution:
      'def processar_cadastro(dados):\n    if not dados.get("nome"):\n        return {"sucesso": False, "erro": "Nome não pode ser vazio"}\n    if "@" not in dados.get("email", ""):\n        return {"sucesso": False, "erro": "Email inválido"}\n    if dados.get("idade", 0) < 18:\n        return {"sucesso": False, "erro": "Idade mínima é 18 anos"}\n    return {"sucesso": True, "mensagem": "Cadastro realizado!"}\n\nprint(processar_cadastro({"nome": "Carlos", "email": "carlos@mail.com", "idade": 25}))\nprint(processar_cadastro({"nome": "", "email": "x@y.com", "idade": 20}))\nprint(processar_cadastro({"nome": "Ana", "email": "invalido", "idade": 30}))\n',
    hints: [
      'Use dados.get("campo", valor_padrão) para acessar campos com segurança.',
      'Verifique se "@" está no email com o operador in.',
      'Retorne cedo (return) quando encontrar um erro de validação.',
    ],
    testCases: [
      {
        expectedOutput:
          "{'sucesso': True, 'mensagem': 'Cadastro realizado!'}\n{'sucesso': False, 'erro': 'Nome não pode ser vazio'}\n{'sucesso': False, 'erro': 'Email inválido'}",
        description: 'Validação de cadastro: sucesso, nome vazio e email inválido',
      },
    ],
  },
  {
    id: 'back-i-03',
    title: 'CRUD em Memória: Produtos',
    description:
      'Implemente um CRUD simples em memória para gerenciar produtos. Use uma lista como "banco de dados".\n\nFunções necessárias:\n- criar_produto(nome, preco): adiciona à lista e retorna o produto com id\n- listar_produtos(): retorna todos\n- deletar_produto(id): remove por id\n\nDemonstre criando dois produtos, listando e deletando um.',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'iniciante',
    category: 'CRUD',
    language: 'python',
    starterCode:
      'produtos = []\nproximo_id = 1\n\ndef criar_produto(nome, preco):\n    # Crie e adicione o produto à lista\n    pass\n\ndef listar_produtos():\n    # Retorne todos os produtos\n    pass\n\ndef deletar_produto(id):\n    # Remova o produto com o id informado\n    pass\n\ncriar_produto("Notebook", 2500.00)\ncriar_produto("Mouse", 89.90)\nprint("Produtos:", listar_produtos())\ndeletar_produto(1)\nprint("Após deletar id=1:", listar_produtos())\n',
    solution:
      'produtos = []\nproximo_id = 1\n\ndef criar_produto(nome, preco):\n    global proximo_id\n    produto = {"id": proximo_id, "nome": nome, "preco": preco}\n    produtos.append(produto)\n    proximo_id += 1\n    return produto\n\ndef listar_produtos():\n    return produtos\n\ndef deletar_produto(id):\n    global produtos\n    produtos = [p for p in produtos if p["id"] != id]\n\ncriar_produto("Notebook", 2500.00)\ncriar_produto("Mouse", 89.90)\nprint("Produtos:", listar_produtos())\ndeletar_produto(1)\nprint("Após deletar id=1:", listar_produtos())\n',
    hints: [
      'Use global para modificar variáveis globais dentro de funções.',
      'Use list comprehension para filtrar: [p for p in produtos if p["id"] != id].',
      'Incremente proximo_id após cada criação para garantir IDs únicos.',
    ],
    testCases: [
      {
        expectedOutput:
          "Produtos: [{'id': 1, 'nome': 'Notebook', 'preco': 2500.0}, {'id': 2, 'nome': 'Mouse', 'preco': 89.9}]\nApós deletar id=1: [{'id': 2, 'nome': 'Mouse', 'preco': 89.9}]",
        description: 'CRUD em memória: criar, listar e deletar produto',
      },
    ],
  },
  {
    id: 'back-i-04',
    title: 'Roteamento Básico Simulado',
    description:
      'Simule um roteador HTTP simples usando um dicionário de rotas em Python. Crie uma função rotear(metodo, caminho, dados) que despacha para o handler correto.\n\nRotas:\n- GET /produtos → lista produtos\n- POST /produtos → adiciona produto\n\nSaída esperada ao chamar as duas rotas:\n[]\n{"id": 1, "nome": "Caneta", "preco": 3.5}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'iniciante',
    category: 'Roteamento',
    language: 'python',
    starterCode:
      'import json\n\nbanco = []\n_id = 1\n\ndef handler_get_produtos(dados):\n    return banco\n\ndef handler_post_produtos(dados):\n    global _id\n    produto = {"id": _id, "nome": dados["nome"], "preco": dados["preco"]}\n    banco.append(produto)\n    _id += 1\n    return produto\n\n# Crie o dicionário de rotas e a função rotear(metodo, caminho, dados=None)\n\nprint(json.dumps(rotear("GET", "/produtos"), ensure_ascii=False))\nprint(json.dumps(rotear("POST", "/produtos", {"nome": "Caneta", "preco": 3.5}), ensure_ascii=False))\n',
    solution:
      'import json\n\nbanco = []\n_id = 1\n\ndef handler_get_produtos(dados):\n    return banco\n\ndef handler_post_produtos(dados):\n    global _id\n    produto = {"id": _id, "nome": dados["nome"], "preco": dados["preco"]}\n    banco.append(produto)\n    _id += 1\n    return produto\n\nrotas = {\n    ("GET", "/produtos"): handler_get_produtos,\n    ("POST", "/produtos"): handler_post_produtos,\n}\n\ndef rotear(metodo, caminho, dados=None):\n    handler = rotas.get((metodo, caminho))\n    if handler:\n        return handler(dados)\n    return {"erro": "Rota não encontrada"}\n\nprint(json.dumps(rotear("GET", "/produtos"), ensure_ascii=False))\nprint(json.dumps(rotear("POST", "/produtos", {"nome": "Caneta", "preco": 3.5}), ensure_ascii=False))\n',
    hints: [
      'Use uma tupla (metodo, caminho) como chave do dicionário de rotas.',
      'O valor de cada rota é a função handler correspondente.',
      'Chame handler(dados) para despachar a requisição.',
    ],
    testCases: [
      { expectedOutput: '[]\n{"id": 1, "nome": "Caneta", "preco": 3.5}', description: 'Roteamento GET e POST para /produtos' },
    ],
  },

  // ─── BACKEND com PYTHON – Intermediário ───────────────────────────────────
  {
    id: 'back-m-01',
    title: 'Middleware: Logger de Requisições',
    description:
      'Implemente um sistema de middleware onde cada requisição passa por um logger antes de chegar ao handler.\n\nO logger deve imprimir "[LOG] METODO /caminho" e depois chamar o próximo handler.\n\nSaída esperada:\n[LOG] GET /usuarios\n{"usuarios": ["Alice", "Bob"]}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'intermediario',
    category: 'Middleware',
    language: 'python',
    starterCode:
      'import json\n\ndef logger_middleware(handler):\n    """\n    Retorna uma função que loga e depois chama handler.\n    """\n    def wrapper(metodo, caminho, dados=None):\n        # Imprima o log e chame o handler\n        pass\n    return wrapper\n\ndef get_usuarios(metodo, caminho, dados=None):\n    return {"usuarios": ["Alice", "Bob"]}\n\nendpoint = logger_middleware(get_usuarios)\nresposta = endpoint("GET", "/usuarios")\nprint(json.dumps(resposta, ensure_ascii=False))\n',
    solution:
      'import json\n\ndef logger_middleware(handler):\n    def wrapper(metodo, caminho, dados=None):\n        print(f"[LOG] {metodo} {caminho}")\n        return handler(metodo, caminho, dados)\n    return wrapper\n\ndef get_usuarios(metodo, caminho, dados=None):\n    return {"usuarios": ["Alice", "Bob"]}\n\nendpoint = logger_middleware(get_usuarios)\nresposta = endpoint("GET", "/usuarios")\nprint(json.dumps(resposta, ensure_ascii=False))\n',
    hints: [
      'Middleware é um padrão decorator: uma função que recebe um handler e retorna outro.',
      'A função wrapper deve logar e depois chamar o handler original.',
      'Use f-string para formatar a mensagem de log.',
    ],
    testCases: [
      { expectedOutput: '[LOG] GET /usuarios\n{"usuarios": ["Alice", "Bob"]}', description: 'Middleware loga e repassa ao handler' },
    ],
  },
  {
    id: 'back-m-02',
    title: 'Paginação de Resultados',
    description:
      'Implemente uma função paginar(itens, pagina, por_pagina) que retorna uma fatia da lista e metadados de paginação.\n\nExemplo com 10 itens, página 2, 3 por página:\npaginar(lista, 2, 3) → {"dados": [4,5,6], "pagina": 2, "total_paginas": 4, "total_itens": 10}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'intermediario',
    category: 'API',
    language: 'python',
    starterCode:
      'import math\n\ndef paginar(itens, pagina, por_pagina):\n    """\n    Retorna dict com dados paginados e metadados.\n    pagina começa em 1.\n    """\n    # Seu código aqui\n    pass\n\nlista = list(range(1, 11))\nresultado = paginar(lista, 2, 3)\nprint(resultado)\n',
    solution:
      'import math\n\ndef paginar(itens, pagina, por_pagina):\n    total_itens = len(itens)\n    total_paginas = math.ceil(total_itens / por_pagina)\n    inicio = (pagina - 1) * por_pagina\n    fim = inicio + por_pagina\n    dados = itens[inicio:fim]\n    return {\n        "dados": dados,\n        "pagina": pagina,\n        "total_paginas": total_paginas,\n        "total_itens": total_itens,\n    }\n\nlista = list(range(1, 11))\nresultado = paginar(lista, 2, 3)\nprint(resultado)\n',
    hints: [
      'O índice inicial é (pagina - 1) * por_pagina.',
      'Use math.ceil(total / por_pagina) para calcular o número de páginas.',
      'Fatie a lista com itens[inicio:fim].',
    ],
    testCases: [
      {
        expectedOutput: "{'dados': [4, 5, 6], 'pagina': 2, 'total_paginas': 4, 'total_itens': 10}",
        description: 'Paginação: página 2 de 4, 3 itens por página',
      },
    ],
  },
  {
    id: 'back-m-03',
    title: 'Cache Simples com Decorador',
    description:
      'Implemente um decorador cache_simples que memoriza o resultado de uma função para evitar recalcular.\n\nA função fibonacci_lento(n) calcula Fibonacci sem otimização. Com o cache, chamadas repetidas devem retornar o resultado armazenado.\n\nSaída esperada:\n55\n55\nCache: {10: 55}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'intermediario',
    category: 'Cache',
    language: 'python',
    starterCode:
      'def cache_simples(func):\n    """\n    Decorador que armazena resultados em um dict.\n    """\n    armazenado = {}\n    def wrapper(*args):\n        # Retorne do cache se disponível, senão calcule e armazene\n        pass\n    wrapper.cache = armazenado\n    return wrapper\n\n@cache_simples\ndef fibonacci_lento(n):\n    if n <= 1:\n        return n\n    return fibonacci_lento(n - 1) + fibonacci_lento(n - 2)\n\nprint(fibonacci_lento(10))\nprint(fibonacci_lento(10))\nprint("Cache:", fibonacci_lento.cache)\n',
    solution:
      'def cache_simples(func):\n    armazenado = {}\n    def wrapper(*args):\n        if args in armazenado:\n            return armazenado[args]\n        resultado = func(*args)\n        armazenado[args] = resultado\n        return resultado\n    wrapper.cache = armazenado\n    return wrapper\n\n@cache_simples\ndef fibonacci_lento(n):\n    if n <= 1:\n        return n\n    return fibonacci_lento(n - 1) + fibonacci_lento(n - 2)\n\nprint(fibonacci_lento(10))\nprint(fibonacci_lento(10))\nprint("Cache:", fibonacci_lento.cache)\n',
    hints: [
      'Use args como chave do dicionário (tuplas são hashable).',
      'Verifique if args in armazenado antes de calcular.',
      'Armazene o resultado com armazenado[args] = resultado.',
    ],
    testCases: [
      { expectedOutput: '55\n55\nCache: {(10,): 55}', description: 'Cache memoriza resultado de fibonacci(10)' },
    ],
  },

  // ─── BACKEND com PYTHON – Avançado ────────────────────────────────────────
  {
    id: 'back-a-01',
    title: 'API REST Simulada com Flask-like',
    description:
      'Implemente um mini-framework de roteamento inspirado no Flask. Use um dicionário de rotas com métodos HTTP e paths. Suporte GET e POST.\n\nCrie rotas para /itens (GET lista, POST cria). Demonstre com chamadas e imprima as respostas JSON.\n\nSaída esperada:\n[]\n{"id": 1, "nome": "Livro"}\n[{"id": 1, "nome": "Livro"}]',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'avancado',
    category: 'Framework',
    language: 'python',
    starterCode:
      'import json\n\nclass MiniApp:\n    def __init__(self):\n        self._rotas = {}\n\n    def rota(self, metodo, caminho):\n        """Decorador para registrar rotas."""\n        def decorator(func):\n            self._rotas[(metodo.upper(), caminho)] = func\n            return func\n        return decorator\n\n    def request(self, metodo, caminho, dados=None):\n        """Simula uma requisição HTTP."""\n        # Implemente o despacho para o handler correto\n        pass\n\napp = MiniApp()\nitens = []\n_id = 1\n\n# Registre as rotas GET /itens e POST /itens\n\nprint(json.dumps(app.request("GET", "/itens"), ensure_ascii=False))\nprint(json.dumps(app.request("POST", "/itens", {"nome": "Livro"}), ensure_ascii=False))\nprint(json.dumps(app.request("GET", "/itens"), ensure_ascii=False))\n',
    solution:
      'import json\n\nclass MiniApp:\n    def __init__(self):\n        self._rotas = {}\n\n    def rota(self, metodo, caminho):\n        def decorator(func):\n            self._rotas[(metodo.upper(), caminho)] = func\n            return func\n        return decorator\n\n    def request(self, metodo, caminho, dados=None):\n        handler = self._rotas.get((metodo.upper(), caminho))\n        if handler is None:\n            return {"erro": "404 Não encontrado"}\n        return handler(dados)\n\napp = MiniApp()\nitens = []\n_id = 1\n\n@app.rota("GET", "/itens")\ndef listar_itens(dados):\n    return itens\n\n@app.rota("POST", "/itens")\ndef criar_item(dados):\n    global _id\n    item = {"id": _id, "nome": dados["nome"]}\n    itens.append(item)\n    _id += 1\n    return item\n\nprint(json.dumps(app.request("GET", "/itens"), ensure_ascii=False))\nprint(json.dumps(app.request("POST", "/itens", {"nome": "Livro"}), ensure_ascii=False))\nprint(json.dumps(app.request("GET", "/itens"), ensure_ascii=False))\n',
    hints: [
      'O decorador rota() registra a função no dicionário _rotas com chave (METODO, caminho).',
      'request() busca o handler no dicionário e o chama com os dados.',
      'Use global _id dentro do handler POST para incrementar o contador.',
    ],
    testCases: [
      {
        expectedOutput: '[]\n{"id": 1, "nome": "Livro"}\n[{"id": 1, "nome": "Livro"}]',
        description: 'Mini-framework Flask-like com GET e POST',
      },
    ],
  },
  {
    id: 'back-a-02',
    title: 'Autenticação com JWT Simulado',
    description:
      'Simule autenticação JWT usando base64 e HMAC. Crie funções gerar_token(payload, secret) e verificar_token(token, secret).\n\nO token deve ter formato header.payload.assinatura (simplificado).\n\nSaída esperada:\nToken gerado com sucesso\nPayload: {"user": "admin", "role": "admin"}',
    subject: 'backend',
    subjectLabel: 'Backend com Python',
    subjectEmoji: '🖥️',
    difficulty: 'avancado',
    category: 'Autenticação',
    language: 'python',
    starterCode:
      'import base64\nimport hmac\nimport hashlib\nimport json\n\ndef gerar_token(payload, secret):\n    """\n    Gera um token JWT simplificado: header.payload.assinatura\n    """\n    # Seu código aqui\n    pass\n\ndef verificar_token(token, secret):\n    """\n    Verifica o token e retorna o payload se válido, None se inválido.\n    """\n    # Seu código aqui\n    pass\n\nsecret = "minha_chave_secreta"\npayload = {"user": "admin", "role": "admin"}\ntoken = gerar_token(payload, secret)\nresult = verificar_token(token, secret)\nif result:\n    print("Token gerado com sucesso")\n    print("Payload:", json.dumps(result, ensure_ascii=False))\n',
    solution:
      'import base64\nimport hmac\nimport hashlib\nimport json\n\ndef gerar_token(payload, secret):\n    header = base64.urlsafe_b64encode(json.dumps({"alg": "HS256"}).encode()).decode()\n    payload_enc = base64.urlsafe_b64encode(json.dumps(payload, ensure_ascii=False).encode()).decode()\n    msg = f"{header}.{payload_enc}"\n    assinatura = hmac.new(secret.encode(), msg.encode(), hashlib.sha256).hexdigest()\n    return f"{msg}.{assinatura}"\n\ndef verificar_token(token, secret):\n    partes = token.split(".")\n    if len(partes) != 3:\n        return None\n    header, payload_enc, assinatura = partes\n    msg = f"{header}.{payload_enc}"\n    esperado = hmac.new(secret.encode(), msg.encode(), hashlib.sha256).hexdigest()\n    if not hmac.compare_digest(assinatura, esperado):\n        return None\n    return json.loads(base64.urlsafe_b64decode(payload_enc + "=="))\n\nsecret = "minha_chave_secreta"\npayload = {"user": "admin", "role": "admin"}\ntoken = gerar_token(payload, secret)\nresult = verificar_token(token, secret)\nif result:\n    print("Token gerado com sucesso")\n    print("Payload:", json.dumps(result, ensure_ascii=False))\n',
    hints: [
      'Use base64.urlsafe_b64encode() para codificar header e payload.',
      'Use hmac.new(secret, mensagem, sha256).hexdigest() para gerar a assinatura.',
      'Na verificação, use hmac.compare_digest() para comparar assinaturas de forma segura.',
    ],
    testCases: [
      {
        expectedOutput: 'Token gerado com sucesso\nPayload: {"user": "admin", "role": "admin"}',
        description: 'Geração e verificação de JWT simulado',
      },
    ],
  },
];
