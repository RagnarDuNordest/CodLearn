import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'recursao',
  moduleId: 'algoritmos',
  title: 'Recursao',
  description: 'Entenda recursao, a tecnica em que uma funcao chama a si mesma para resolver problemas.',
  order: 3,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Imagine bonecas russas (matrioshkas): voce abre uma e encontra outra menor dentro, ate chegar na menor de todas. Isso e **recursao**! Uma funcao que chama a si mesma com um problema cada vez menor, ate chegar num caso simples que ela sabe resolver.\n\nRecursao pode parecer magica no inicio, mas vamos ver passo a passo como funciona.',
    },
    {
      type: 'text',
      content: '**Recursao** e quando uma funcao chama a si mesma para resolver um problema menor. Toda funcao recursiva precisa de dois elementos essenciais:\n\n1. **Caso base** — a condicao que PARA a recursao (a menor boneca russa, que nao tem outra dentro)\n2. **Caso recursivo** — a chamada da funcao a si mesma com um problema menor (abrir a proxima boneca)\n\nSe voce esquecer o caso base, a funcao vai se chamar infinitamente e o programa vai travar! Isso se chama "estouro de pilha" (stack overflow).\n\nMas o que e essa "pilha"? Quando uma funcao chama outra (ou a si mesma), o computador empilha cada chamada na memoria. E como uma pilha de pratos — a ultima chamada e resolvida primeiro. Quando o caso base e atingido, as chamadas vao sendo resolvidas de volta, uma por uma.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao se preocupe se recursao parecer confusa no inicio — e normal! Todo programador passa por isso. A dica e: confie que a chamada recursiva vai resolver o subproblema, e foque no caso base e no que cada chamada faz.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fatorial.py',
        code: 'def fatorial(n):\n    # Caso base: fatorial de 0 ou 1 e 1\n    if n <= 1:\n        return 1\n    # Caso recursivo: n * fatorial do anterior\n    return n * fatorial(n - 1)\n\n# Como funciona fatorial(5)?\n# fatorial(5) = 5 * fatorial(4)\n# fatorial(4) = 4 * fatorial(3)\n# fatorial(3) = 3 * fatorial(2)\n# fatorial(2) = 2 * fatorial(1)\n# fatorial(1) = 1  <-- caso base! Para aqui.\n# Agora volta: 2*1=2, 3*2=6, 4*6=24, 5*24=120\n\nprint(fatorial(5))   # 120\nprint(fatorial(0))   # 1\nprint(fatorial(10))  # 3628800',
        description: 'Fatorial: o exemplo classico de recursao. Cada chamada reduz o problema ate chegar no caso base.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'contagem_regressiva.py',
        code: 'def contagem_regressiva(n):\n    if n <= 0:\n        print("Lancou!")\n        return\n    print(n)\n    contagem_regressiva(n - 1)\n\ncontagem_regressiva(5)\n# 5\n# 4\n# 3\n# 2\n# 1\n# Lancou!',
        description: 'Exemplo simples: contagem regressiva usando recursao. Cada chamada diminui n em 1.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Cuidado! Toda recursao PRECISA de um caso base. Sem ele, a funcao se chama infinitamente e causa um erro de "estouro de pilha" (stack overflow). O Python limita recursao a aproximadamente 1000 chamadas por padrao.',
    },
    {
      type: 'text',
      content: 'A recursao e usada em muitos algoritmos importantes: busca binaria, ordenacao (Merge Sort, Quick Sort), percorrer arvores e grafos, e resolver problemas como Torres de Hanoi. Muitos problemas que parecem complexos ficam elegantes com recursao!\n\nA regra de ouro: se voce consegue dividir um problema grande em versoes menores do mesmo problema, recursao pode ser a solucao ideal.',
    },
  ],
  challenges: [
    {
      id: 'recursao-challenge-1',
      title: 'Fibonacci Recursivo',
      description:
        'Implemente a sequencia de Fibonacci usando recursao. Na sequencia de Fibonacci, cada numero e a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13, 21... A funcao deve retornar o n-esimo termo (comecando do 0).',
      language: 'python',
      starterCode: 'def fibonacci(n):\n    # Implemente a sequencia de Fibonacci recursivamente\n    # fibonacci(0) = 0\n    # fibonacci(1) = 1\n    # fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)\n    pass\n\n# Testes\nprint(fibonacci(0))   # 0\nprint(fibonacci(1))   # 1\nprint(fibonacci(6))   # 8\nprint(fibonacci(10))  # 55\nprint(fibonacci(15))  # 610',
      solution: 'def fibonacci(n):\n    # Caso base\n    if n == 0:\n        return 0\n    if n == 1:\n        return 1\n    # Caso recursivo\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\n# Testes\nprint(fibonacci(0))   # 0\nprint(fibonacci(1))   # 1\nprint(fibonacci(6))   # 8\nprint(fibonacci(10))  # 55\nprint(fibonacci(15))  # 610',
      hints: [
        'Os casos base sao: fibonacci(0) = 0 e fibonacci(1) = 1.',
        'O caso recursivo e: fibonacci(n) = fibonacci(n-1) + fibonacci(n-2).',
        'Cuidado: para valores grandes de n, essa versao fica lenta porque recalcula os mesmos valores muitas vezes.',
      ],
    },
    {
      id: 'recursao-challenge-2',
      title: 'Soma dos Digitos',
      description:
        'Escreva uma funcao recursiva que calcula a soma de todos os digitos de um numero inteiro positivo. Por exemplo, soma_digitos(1234) = 1 + 2 + 3 + 4 = 10.',
      language: 'python',
      starterCode: 'def soma_digitos(n):\n    # Calcule a soma dos digitos de n recursivamente\n    # Dica: n % 10 retorna o ultimo digito\n    #        n // 10 remove o ultimo digito\n    pass\n\n# Testes\nprint(soma_digitos(1234))    # 10\nprint(soma_digitos(9))       # 9\nprint(soma_digitos(999))     # 27\nprint(soma_digitos(12345))   # 15\nprint(soma_digitos(100))     # 1',
      solution: 'def soma_digitos(n):\n    # Caso base: numero com um unico digito\n    if n < 10:\n        return n\n    # Caso recursivo: ultimo digito + soma dos restantes\n    return (n % 10) + soma_digitos(n // 10)\n\n# Testes\nprint(soma_digitos(1234))    # 10\nprint(soma_digitos(9))       # 9\nprint(soma_digitos(999))     # 27\nprint(soma_digitos(12345))   # 15\nprint(soma_digitos(100))     # 1',
      hints: [
        'O caso base e quando n tem um unico digito (n < 10), retorne o proprio n.',
        'Use n % 10 para obter o ultimo digito e n // 10 para remover o ultimo digito.',
        'O caso recursivo e: (ultimo digito) + soma_digitos(numero sem o ultimo digito).',
      ],
    },
    {
      id: 'recursao-challenge-3',
      title: 'Verificar Palindromo Recursivamente',
      description:
        'Um palindromo e uma palavra ou frase que se le da mesma forma de traz para frente, como "arara" ou "ovo". Implemente uma funcao recursiva que verifica se uma string e um palindromo. Dica: uma string e palindromo se o primeiro e ultimo caracteres sao iguais E o meio tambem e palindromo!',
      language: 'python',
      starterCode: 'def e_palindromo(texto):\n    # Caso base 1: string vazia ou com 1 caractere\n    # sempre e palindromo\n    \n    # Caso base 2: primeiro e ultimo caracteres diferentes\n    # NAO e palindromo\n    \n    # Caso recursivo: verifique o meio da string\n    pass\n\n# Testes\nprint(e_palindromo("arara"))    # True\nprint(e_palindromo("ovo"))      # True\nprint(e_palindromo("python"))   # False\nprint(e_palindromo("a"))        # True\nprint(e_palindromo(""))         # True\nprint(e_palindromo("racecar"))  # True\nprint(e_palindromo("hello"))    # False',
      solution: 'def e_palindromo(texto):\n    # Caso base: string vazia ou com 1 caractere\n    if len(texto) <= 1:\n        return True\n    \n    # Se primeiro e ultimo sao diferentes, nao e palindromo\n    if texto[0] != texto[-1]:\n        return False\n    \n    # Caso recursivo: verifica o meio (sem o primeiro e ultimo)\n    return e_palindromo(texto[1:-1])\n\n# Testes\nprint(e_palindromo("arara"))    # True\nprint(e_palindromo("ovo"))      # True\nprint(e_palindromo("python"))   # False\nprint(e_palindromo("a"))        # True\nprint(e_palindromo(""))         # True\nprint(e_palindromo("racecar"))  # True\nprint(e_palindromo("hello"))    # False',
      hints: [
        'O caso base e quando a string tem 0 ou 1 caractere — sempre e palindromo!',
        'Verifique se texto[0] (primeiro) e texto[-1] (ultimo) sao iguais. Se nao forem, retorne False.',
        'O caso recursivo e: e_palindromo(texto[1:-1]) — verifique o meio da string, sem o primeiro e ultimo caracteres.',
      ],
    },
  ],
};
