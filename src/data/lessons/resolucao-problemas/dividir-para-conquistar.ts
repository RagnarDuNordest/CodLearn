import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'dividir-para-conquistar',
  moduleId: 'resolucao-problemas',
  title: 'Dividir para Conquistar',
  description:
    'Aprenda a estrategia mais poderosa da computacao: quebrar problemas grandes em problemas menores ate que cada pedaco seja facil de resolver -- e como isso aparece em algoritmos reais.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O quarto bagunçado e a gaveta por gaveta\n\nImagine que voce chega em casa e o quarto esta um caos total: roupas no chao, livros espalhados, cabos embaralhados, papeis por todo lado. Se voce pensar "vou limpar o quarto inteiro agora", a tarefa parece paralisante. Voce nem sabe por onde comecar.\n\nMas e se voce pensar assim:\n\n- Problema: "limpar o quarto"\n- Subproblema 1: organizar as roupas\n- Subproblema 2: organizar os livros\n- Subproblema 3: separar os cabos\n- Subproblema 4: descartar os papeis desnecessarios\n\nAgora cada tarefa parece possivel. Voce resolve cada uma de forma independente e, ao final, o quarto inteiro esta organizado.\n\nIsso e **dividir para conquistar**: quebrar um problema grande em subproblemas menores, resolver cada subproblema de forma independente, e combinar as solucoes para resolver o problema original.\n\n### Por que essa estrategia e tao poderosa?\n\nPorque problemas pequenos sao mais faceis de entender, testar e depurar. Se algo der errado, voce sabe exatamente em qual parte do problema o erro esta. E porque subproblemas frequentemente se repetem -- voce pode reutilizar a solucao.\n\nEssa ideia esta no coracao de algoritmos classicos como **merge sort**, **binary search**, e ate na forma como o proprio Python funciona internamente.',
    },
    {
      type: 'text',
      content:
        '## A lista telefonica e a busca binaria\n\nAntes dos smartphones, as pessoas usavam listas telefonicas -- livros grossos com milhares de nomes em ordem alfabetica. Se voce queria achar o numero do "Silva, Roberto", como fazia?\n\nVoce nao comecava da pagina 1. Voce abria o livro no meio. Se a pagina mostrava nomes com "M", voce sabia que "Silva" estava na metade de baixo. Entao voce pegava essa metade e abria no meio dela. E repetia isso ate achar a pagina certa.\n\nIsso e **busca binaria** -- um algoritmo classico de dividir para conquistar:\n\n1. Olhe para o elemento do meio da lista\n2. Se e o que voce procura: achou!\n3. Se o que voce procura e menor: descarte a metade de cima e repita no que sobrou\n4. Se o que voce procura e maior: descarte a metade de baixo e repita no que sobrou\n\n**Por que isso e genial?** Em uma lista com 1.000 elementos, uma busca linear (checar um por um) pode precisar de ate 1.000 verificacoes. A busca binaria precisa de no maximo **10** verificacoes (log2 de 1000 ≈ 10). Em uma lista com 1 bilhao de elementos: busca linear = 1 bilhao de passos; busca binaria = apenas **30 passos**.\n\nDividir o problema pela metade a cada vez e extraordinariamente eficiente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Busca Binaria: dividir para conquistar em acao\n# Problema: encontrar um numero em uma lista ORDENADA\n# Estrategia: a cada passo, eliminamos METADE das possibilidades\n\ndef busca_binaria(lista, alvo):\n    """Busca o valor \'alvo\' na lista ordenada.\n    Retorna o indice se encontrar, ou -1 se nao encontrar.\"\"\"\n    inicio = 0              # Comecamos do inicio da lista\n    fim = len(lista) - 1    # Ate o final da lista\n    passos = 0              # Contador para mostrar a eficiencia\n\n    while inicio <= fim:\n        passos += 1\n        meio = (inicio + fim) // 2  # Pega o indice do meio\n        print(f"  Passo {passos}: verificando indice {meio}, valor {lista[meio]}")\n\n        if lista[meio] == alvo:\n            print(f"  Encontrado em {passos} passo(s)!")\n            return meio\n        elif lista[meio] < alvo:\n            inicio = meio + 1  # Descarta metade inferior\n            print(f"  {alvo} > {lista[meio]}: descartando metade inferior")\n        else:\n            fim = meio - 1    # Descarta metade superior\n            print(f"  {alvo} < {lista[meio]}: descartando metade superior")\n\n    return -1  # Nao encontrado\n\n\n# Lista ordenada com 16 elementos\nnumeros = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 81, 90, 103, 117, 134, 150]\n\nprint("Buscando o numero 72:")\nresultado = busca_binaria(numeros, 72)\nprint(f"Resultado: indice {resultado}\\n")\n\nprint("Buscando o numero 5:")\nresultado = busca_binaria(numeros, 5)\nprint(f"Resultado: indice {resultado}")',
        filename: 'busca_binaria.py',
        description:
          'A busca binaria em acao. Em uma lista de 16 elementos, ela encontra qualquer valor em no maximo 4 passos. Observe como a cada passo ela "divide" o espaco de busca pela metade -- isso e dividir para conquistar.',
      },
    },
    {
      type: 'text',
      content:
        '## Pensamento recursivo: a funcao que chama a si mesma\n\nDividir para conquistar leva naturalmente a um conceito poderoso: **recursao**. Uma funcao recursiva e uma funcao que resolve um problema chamando a si mesma com uma versao menor do mesmo problema.\n\nPense em bonecas russas (matryoshkas): voce abre uma boneca e encontra outra menor dentro. Abre essa e tem outra ainda menor. Ate chegar na menor de todas, que nao abre mais.\n\nEm codigo, recursao funciona assim:\n- **Caso base:** a versao mais simples do problema, que voce resolve diretamente (a menor boneca)\n- **Caso recursivo:** dividir o problema em algo menor e chamar a funcao novamente\n\nO exemplo classico e calcular a soma de todos os numeros de 1 ate N:\n- soma(5) = 5 + soma(4)\n- soma(4) = 4 + soma(3)\n- soma(3) = 3 + soma(2)\n- soma(2) = 2 + soma(1)\n- soma(1) = 1 ← caso base, nao divide mais\n\nEntao o Python volta calculando: 1, 2+1=3, 3+3=6, 4+6=10, 5+10=**15**.\n\nCada chamada resolve uma versao menor do mesmo problema -- isso e dividir para conquistar na sua forma mais pura.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Recursao: dividir para conquistar de forma elegante\n\n# Versao iterativa (loop): soma de 1 ate n\ndef soma_iterativa(n):\n    """Soma todos os numeros de 1 ate n usando um loop."""\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\n# Versao recursiva: mesma logica, outro estilo\ndef soma_recursiva(n):\n    """Soma de 1 ate n usando recursao (dividir para conquistar).\n    Caso base: se n == 1, a soma e apenas 1.\n    Caso recursivo: soma(n) = n + soma(n-1)\n    \"\"\"\n    if n == 1:       # CASO BASE: problema minimo, resolve direto\n        return 1\n    return n + soma_recursiva(n - 1)  # DIVIDE: resolve n-1 e combina\n\n\n# Encontrar o maior valor em uma lista usando divisao\ndef maior_valor(lista, inicio, fim):\n    """Encontra o maior valor entre lista[inicio] e lista[fim].\n    Divide a lista ao meio, encontra o maior em cada metade,\n    e retorna o maior dos dois.\"\"\"\n    if inicio == fim:   # Caso base: lista com 1 elemento\n        return lista[inicio]\n\n    meio = (inicio + fim) // 2\n    maior_esquerda = maior_valor(lista, inicio, meio)    # Divide\n    maior_direita  = maior_valor(lista, meio + 1, fim)   # Divide\n\n    if maior_esquerda >= maior_direita:  # Combina\n        return maior_esquerda\n    return maior_direita\n\n\n# Testando tudo\nprint("Soma iterativa de 1 a 10:", soma_iterativa(10))\nprint("Soma recursiva de 1 a 10:", soma_recursiva(10))\n\nnumeros = [34, 7, 23, 90, 15, 62, 8]\nresultado = maior_valor(numeros, 0, len(numeros) - 1)\nprint(f"Maior valor em {numeros}: {resultado}")',
        filename: 'dividir_conquistar.py',
        description:
          'Tres exemplos do mesmo principio: soma iterativa vs recursiva (mesmos resultados, estilos diferentes) e busca do maior valor por divisao. Repare como a versao recursiva "pensa" o problema de forma diferente: divide ate nao poder mais, resolve o minimo, e combina de volta.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Sempre que um problema parecer enorme e intimidador, faca esta pergunta: "Qual e a versao mais simples desse problema que eu consigo resolver?" Essa versao simples e o seu caso base. Depois pense: "Como eu transformo o problema grande nessa versao simples, um passo por vez?" Isso e tudo que voce precisa para dividir para conquistar.',
    },
  ],
  challenges: [
    {
      id: 'dc-c1',
      title: 'Soma dividida: resolvendo por partes',
      description:
        'Implemente uma funcao que calcule a soma de todos os numeros em uma lista usando a abordagem de dividir para conquistar: divida a lista ao meio, calcule a soma de cada metade recursivamente, e some os dois resultados. Use a lista [3, 7, 2, 9, 4, 6, 1, 8].',
      language: 'python',
      starterCode:
        '# Abordagem: dividir a lista ao meio, somar cada metade, combinar\ndef soma_dividida(lista, inicio, fim):\n    # Caso base: lista com apenas 1 elemento\n    # Se inicio == fim, a soma e apenas lista[inicio]\n    \n    # Caso recursivo:\n    # 1. Calcule o indice do meio: meio = (inicio + fim) // 2\n    # 2. Some a metade esquerda: soma_dividida(lista, inicio, meio)\n    # 3. Some a metade direita: soma_dividida(lista, meio + 1, fim)\n    # 4. Retorne a soma dos dois resultados\n    pass\n\n\nnumeros = [3, 7, 2, 9, 4, 6, 1, 8]\nresultado = soma_dividida(numeros, 0, len(numeros) - 1)\nprint(f"Soma de {numeros}: {resultado}")\nprint(f"Verificacao com sum(): {sum(numeros)}")\n',
      solution:
        'def soma_dividida(lista, inicio, fim):\n    # Caso base: lista com apenas 1 elemento\n    if inicio == fim:\n        return lista[inicio]\n\n    # Caso recursivo: divide e conquista\n    meio = (inicio + fim) // 2\n    soma_esquerda = soma_dividida(lista, inicio, meio)\n    soma_direita  = soma_dividida(lista, meio + 1, fim)\n    return soma_esquerda + soma_direita\n\n\nnumeros = [3, 7, 2, 9, 4, 6, 1, 8]\nresultado = soma_dividida(numeros, 0, len(numeros) - 1)\nprint(f"Soma de {numeros}: {resultado}")\nprint(f"Verificacao com sum(): {sum(numeros)}")',
      hints: [
        'O caso base e quando inicio == fim -- a lista tem so um elemento e a soma e simplesmente lista[inicio].',
        'Para dividir: meio = (inicio + fim) // 2. Chame soma_dividida para a metade esquerda (inicio ate meio) e para a direita (meio+1 ate fim).',
        'Para conquistar (combinar): retorne soma_esquerda + soma_direita. As duas metades ja foram resolvidas recursivamente.',
      ],
    },
    {
      id: 'dc-c2',
      title: 'Encontrando o maximo com divisao',
      description:
        'Implemente uma funcao que encontre o maior valor em uma lista usando dividir para conquistar: divida a lista ao meio, encontre o maior de cada metade, e retorne o maior entre os dois. Teste com a lista [42, 17, 83, 6, 55, 29, 91, 14].',
      language: 'python',
      starterCode:
        '# Abordagem: dividir a lista ao meio, encontrar o maximo de cada metade\n# e retornar o maior dos dois maximos\n\ndef maximo_dividido(lista, inicio, fim):\n    # Caso base: quando ha apenas 1 elemento\n    # (inicio == fim), ele mesmo e o maximo\n    \n    # Caso recursivo:\n    # 1. Encontre o meio\n    # 2. Encontre o maximo da metade esquerda\n    # 3. Encontre o maximo da metade direita\n    # 4. Compare os dois maximos e retorne o maior\n    pass\n\n\nnumeros = [42, 17, 83, 6, 55, 29, 91, 14]\nresultado = maximo_dividido(numeros, 0, len(numeros) - 1)\nprint(f"Lista: {numeros}")\nprint(f"Maior valor encontrado: {resultado}")\nprint(f"Verificacao com max(): {max(numeros)}")\n',
      solution:
        'def maximo_dividido(lista, inicio, fim):\n    # Caso base: lista com 1 elemento\n    if inicio == fim:\n        return lista[inicio]\n\n    # Divida ao meio\n    meio = (inicio + fim) // 2\n\n    # Encontre o maximo de cada metade\n    max_esquerda = maximo_dividido(lista, inicio, meio)\n    max_direita  = maximo_dividido(lista, meio + 1, fim)\n\n    # Combine: retorne o maior dos dois\n    if max_esquerda >= max_direita:\n        return max_esquerda\n    return max_direita\n\n\nnumeros = [42, 17, 83, 6, 55, 29, 91, 14]\nresultado = maximo_dividido(numeros, 0, len(numeros) - 1)\nprint(f"Lista: {numeros}")\nprint(f"Maior valor encontrado: {resultado}")\nprint(f"Verificacao com max(): {max(numeros)}")',
      hints: [
        'Caso base: se inicio == fim, a lista tem so um elemento -- retorne lista[inicio] diretamente.',
        'Divida calculando o meio: meio = (inicio + fim) // 2. Chame a funcao para cada metade.',
        'Para combinar: compare max_esquerda e max_direita com um if e retorne o maior. Isso e o "conquista" do dividir para conquistar.',
      ],
    },
  ],
};
