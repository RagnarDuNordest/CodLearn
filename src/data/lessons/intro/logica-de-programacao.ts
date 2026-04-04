import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'logica-de-programacao',
  moduleId: 'intro',
  title: 'Logica de Programacao',
  description:
    'Aprenda os fundamentos da logica algoritmica, como criar fluxogramas e pseudocodigo, e como transformar suas ideias em instrucoes que o computador pode executar.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Antes de aprender qualquer linguagem, e importante pensar de forma logica. E como aprender a pensar antes de falar: primeiro organiza as ideias, depois escolhe as palavras!\n\n## O que e logica de programacao?\n\nAntes de escrever qualquer codigo, todo programador precisa aprender a **pensar de forma logica**. Logica de programacao e a capacidade de organizar instrucoes em uma sequencia clara e ordenada para resolver um problema.\n\nImagine que voce precisa ensinar um robo a fazer um sanduiche. Voce nao pode simplesmente dizer "faca um sanduiche" — precisa detalhar cada passo:\n\n1. Pegue duas fatias de pao\n2. Coloque o presunto sobre a primeira fatia\n3. Coloque o queijo sobre o presunto\n4. Coloque a segunda fatia por cima\n\nIsso e um **algoritmo**: uma sequencia finita de passos bem definidos para resolver um problema. Programar e, essencialmente, escrever algoritmos em uma linguagem que o computador entende.\n\nA logica de programacao e a base de tudo. Se voce dominar essa habilidade, aprender qualquer linguagem de programacao se torna muito mais facil, porque a logica e a mesma — so muda a forma de escrever.',
    },
    {
      type: 'text',
      content:
        '## Fluxogramas: visualizando a logica\n\nUm **fluxograma** e uma forma visual de representar um algoritmo. Ele usa simbolos geometricos conectados por setas para mostrar o fluxo de execucao. Os principais simbolos sao:\n\n```\n  ┌─────────────┐\n  │  INICIO/FIM  │   ← Oval: marca o inicio ou fim\n  └─────────────┘\n\n  ┌─────────────┐\n  │  Processamento│   ← Retangulo: uma acao ou calculo\n  └─────────────┘\n\n       /\\           \n      /  \\          ← Losango: decisao (sim/nao)\n     / ?? \\\n    /______\\\n\n  ┌─────────────┐\n  │ Entrada/Saida│   ← Paralelogramo: entrada ou saida de dados\n  └─────────────┘\n```\n\nVeja um exemplo de fluxograma para verificar se uma pessoa e maior de idade:\n\n```\n  [INICIO]\n     |\n     v\n  /Leia idade/\n     |\n     v\n  <idade >= 18?>\n   /         \\\n  SIM        NAO\n  |            |\n  v            v\n/Exiba:     /Exiba:\n "Maior"/    "Menor"/\n  |            |\n  v            v\n  [FIM]      [FIM]\n```\n\nFluxogramas sao otimos para planejar a logica antes de escrever o codigo. Eles ajudam a visualizar caminhos alternativos e garantir que nenhum caso foi esquecido.',
    },
    {
      type: 'text',
      content:
        '## Pseudocodigo: escrevendo a logica passo a passo\n\nO **pseudocodigo** e uma forma de escrever algoritmos usando linguagem natural estruturada, parecida com um programa de verdade, mas sem seguir a sintaxe rigorosa de nenhuma linguagem especifica. E como um rascunho do seu codigo.\n\nAs vantagens do pseudocodigo sao:\n- **Foco na logica**: voce se preocupa com a solucao, nao com a sintaxe\n- **Facil de entender**: qualquer pessoa consegue ler, mesmo sem saber programar\n- **Facil de converter**: depois de pronto, e so traduzir para qualquer linguagem\n\nNo pseudocodigo, usamos palavras-chave em portugues para representar as acoes:\n\n| Conceito | Pseudocodigo | Significado |\n|---|---|---|\n| Entrada | LEIA variavel | Receber dados do usuario |\n| Saida | ESCREVA valor | Mostrar algo na tela |\n| Atribuicao | variavel ← valor | Guardar um valor |\n| Decisao | SE condicao ENTAO | Fazer algo se a condicao for verdadeira |\n| Repeticao | ENQUANTO condicao FACA | Repetir enquanto a condicao for verdadeira |\n| Repeticao | PARA i DE 1 ATE n FACA | Repetir um numero determinado de vezes |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO VerificarIdade\n#   LEIA idade\n#   SE idade >= 18 ENTAO\n#     ESCREVA "Voce e maior de idade"\n#   SENAO\n#     ESCREVA "Voce e menor de idade"\n#   FIM SE\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nidade = int(input("Digite sua idade: "))\n\nif idade >= 18:\n    print("Voce e maior de idade")\nelse:\n    print("Voce e menor de idade")',
        filename: 'pseudocodigo_para_python_01.py',
        description:
          'Comparacao direta entre pseudocodigo e Python. Note como a estrutura logica e identica — so muda a forma de escrever. LEIA vira input(), ESCREVA vira print(), SE/ENTAO vira if, SENAO vira else.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO SomaNumeros\n#   soma ← 0\n#   PARA i DE 1 ATE 5 FACA\n#     LEIA numero\n#     soma ← soma + numero\n#   FIM PARA\n#   ESCREVA "A soma total e: ", soma\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nsoma = 0\n\nfor i in range(1, 6):\n    numero = int(input(f"Digite o {i}o numero: "))\n    soma = soma + numero\n\nprint("A soma total e:", soma)',
        filename: 'pseudocodigo_para_python_02.py',
        description:
          'Exemplo com laco de repeticao. O PARA/DE/ATE do pseudocodigo vira for/in range() em Python. A variavel acumuladora "soma" comeca em zero e vai somando cada numero digitado.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO MediaComValidacao\n#   LEIA nota1\n#   LEIA nota2\n#   media ← (nota1 + nota2) / 2\n#   SE media >= 7 ENTAO\n#     ESCREVA "Aprovado com media ", media\n#   SENAO SE media >= 5 ENTAO\n#     ESCREVA "Recuperacao com media ", media\n#   SENAO\n#     ESCREVA "Reprovado com media ", media\n#   FIM SE\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nnota1 = float(input("Digite a primeira nota: "))\nnota2 = float(input("Digite a segunda nota: "))\n\nmedia = (nota1 + nota2) / 2\n\nif media >= 7:\n    print(f"Aprovado com media {media:.1f}")\nelif media >= 5:\n    print(f"Recuperacao com media {media:.1f}")\nelse:\n    print(f"Reprovado com media {media:.1f}")',
        filename: 'pseudocodigo_para_python_03.py',
        description:
          'Exemplo com multiplas decisoes encadeadas. O SENAO SE do pseudocodigo vira elif em Python. Este algoritmo calcula a media de duas notas e classifica o aluno em aprovado, recuperacao ou reprovado.',
      },
    },
    {
      type: 'callout',
      content:
        'Sempre comece resolvendo o problema no papel antes de abrir o editor de codigo! Escreva o pseudocodigo ou desenhe um fluxograma primeiro. Isso evita erros logicos e economiza muito tempo. Programadores profissionais passam mais tempo pensando na solucao do que digitando codigo.',
      calloutType: 'tip',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa entender tudo de uma vez! Esses conceitos ficam mais claros conforme voce avanca.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Traduzindo para Python\n\nAgora que voce entendeu a logica, vamos ver como escrever isso em Python — a linguagem que vamos usar nos exercicios desta licao.\n\n**Ler dados do usuario:** use `input("mensagem")`. Para converter para numero inteiro, envolva com `int()`. Para numero decimal, use `float()`.\n\n**Tomar decisoes:** use `if`, `else` e `elif`. O codigo que pertence ao bloco deve ter 4 espacos de indentacao.\n\n**Exibir resultados:** use `print("texto")` para mostrar mensagens na tela.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'python_basico.py',
        code: `# Lendo dados do usuario
nome = input("Qual e o seu nome? ")   # Lê um texto
idade = int(input("Qual e a sua idade? "))  # Lê e converte para inteiro

print("Ola, " + nome + "!")
print("Voce tem " + str(idade) + " anos")

# Tomando decisoes
if idade >= 18:
    print("Voce e maior de idade")    # 4 espacos de indentacao!
else:
    print("Voce e menor de idade")

# Para mais de duas opcoes, use elif:
if idade < 12:
    print("Crianca")
elif idade < 18:
    print("Adolescente")
else:
    print("Adulto")`,
        description: 'Em Python: input() le texto, int() converte para numero, if/elif/else tomam decisoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Lembre: a INDENTACAO (4 espacos no inicio da linha) e obrigatoria em Python! Ela define quais linhas pertencem ao bloco if ou else. Se voce esquecer, o Python vai dar erro.',
    },
  ],
  challenges: [
    {
      id: 'lp-c1',
      title: 'Verificar se e maior de idade',
      description:
        'Escreva um programa que leia a idade de uma pessoa e diga se ela e "maior de idade" (18 anos ou mais) ou "menor de idade". Esse e exatamente o exemplo que vimos na aula! O pseudocodigo ja esta escrito para voce — converta para Python.',
      language: 'python',
      starterCode: '# Pseudocodigo:\n# ALGORITMO VerificarIdade\n#   LEIA idade\n#   SE idade >= 18 ENTAO\n#     ESCREVA "Maior de idade"\n#   SENAO\n#     ESCREVA "Menor de idade"\n#   FIM SE\n# FIM ALGORITMO\n\n# Agora escreva em Python:\nidade = int(input("Digite sua idade: "))\n\n# Complete: use if e else para verificar a idade\n',
      solution:
        'idade = int(input("Digite sua idade: "))\n\nif idade >= 18:\n    print("Maior de idade")\nelse:\n    print("Menor de idade")',
      hints: [
        'Em Python, SE vira "if" e SENAO vira "else". Use dois pontos (:) no final de cada um.',
        'A condicao e: if idade >= 18:',
        'Use print() para exibir a mensagem. Nao esqueca de indentar (4 espacos) o que fica dentro do if e do else.',
      ],
      testCases: [
        {
          description: 'Pessoa com 20 anos e maior de idade',
          inputs: ['20'],
          expectedOutput: 'Digite sua idade: 20\nMaior de idade',
        },
        {
          description: 'Pessoa com 15 anos e menor de idade',
          inputs: ['15'],
          expectedOutput: 'Digite sua idade: 15\nMenor de idade',
        },
        {
          description: 'Pessoa com exatamente 18 anos e maior de idade',
          inputs: ['18'],
          expectedOutput: 'Digite sua idade: 18\nMaior de idade',
        },
      ],
    },
    {
      id: 'lp-c2',
      title: 'Aprovado ou reprovado',
      description:
        'Crie um programa que leia a nota de um aluno e exiba "Aprovado" se a nota for maior ou igual a 7, ou "Reprovado" caso contrario. Pense no fluxograma: Inicio → Leia nota → Decisao (nota >= 7?) → Se sim, exibe "Aprovado" → Se nao, exibe "Reprovado" → Fim.',
      language: 'python',
      starterCode: '# Fluxograma:\n# [INICIO]\n#   → /Leia nota/\n#   → <nota >= 7?>\n#     SIM → /Exiba "Aprovado"/ → [FIM]\n#     NAO → /Exiba "Reprovado"/ → [FIM]\n\n# Escreva em Python:\nnota = float(input("Digite a nota do aluno: "))\n\n# Verifique se o aluno foi aprovado ou reprovado\n# Use if e else\n',
      solution:
        'nota = float(input("Digite a nota do aluno: "))\n\nif nota >= 7:\n    print("Aprovado")\nelse:\n    print("Reprovado")',
      hints: [
        'Use float(input(...)) para aceitar notas com decimal, como 6.5 ou 8.0.',
        'A condicao e simples: if nota >= 7:',
        'Se a nota for 7 ou mais, exibe "Aprovado". Caso contrario (else), exibe "Reprovado".',
      ],
      testCases: [
        {
          description: 'Nota 8.0 resulta em Aprovado',
          inputs: ['8.0'],
          expectedOutput: 'Digite a nota do aluno: 8.0\nAprovado',
        },
        {
          description: 'Nota 5.0 resulta em Reprovado',
          inputs: ['5.0'],
          expectedOutput: 'Digite a nota do aluno: 5.0\nReprovado',
        },
        {
          description: 'Nota exatamente 7.0 resulta em Aprovado',
          inputs: ['7.0'],
          expectedOutput: 'Digite a nota do aluno: 7.0\nAprovado',
        },
      ],
    },
    {
      id: 'lp-c3',
      title: 'Calculadora simples',
      description:
        'Crie um programa que leia dois numeros inteiros e exiba a soma, a subtracao, a multiplicacao e a divisao entre eles. Use print() para mostrar cada resultado. Esse exercicio pratica entrada de dados e operacoes basicas — sem decisoes, apenas calculos!',
      language: 'python',
      starterCode: '# Algoritmo:\n# ALGORITMO Calculadora\n#   LEIA numero1\n#   LEIA numero2\n#   ESCREVA "Soma: ", numero1 + numero2\n#   ESCREVA "Subtracao: ", numero1 - numero2\n#   ESCREVA "Multiplicacao: ", numero1 * numero2\n#   ESCREVA "Divisao: ", numero1 / numero2\n# FIM ALGORITMO\n\n# Escreva em Python:\nnumero1 = int(input("Digite o primeiro numero: "))\nnumero2 = int(input("Digite o segundo numero: "))\n\n# Calcule e exiba a soma\nprint("Soma:", numero1 + numero2)\n\n# Calcule e exiba a subtracao\n\n# Calcule e exiba a multiplicacao\n\n# Calcule e exiba a divisao\n',
      solution:
        'numero1 = int(input("Digite o primeiro numero: "))\nnumero2 = int(input("Digite o segundo numero: "))\n\nprint("Soma:", numero1 + numero2)\nprint("Subtracao:", numero1 - numero2)\nprint("Multiplicacao:", numero1 * numero2)\nprint("Divisao:", numero1 / numero2)',
      hints: [
        'Use int(input(...)) para ler numeros inteiros. O int() converte o texto digitado para numero.',
        'Para exibir o resultado, use print() com dois argumentos separados por virgula: print("Soma:", numero1 + numero2)',
        'Os operadores sao: + para soma, - para subtracao, * para multiplicacao, / para divisao.',
      ],
      testCases: [
        {
          description: 'Calculadora com 10 e 5: soma=15, sub=5, mult=50, div=2.0',
          inputs: ['10', '5'],
          expectedOutput: 'Digite o primeiro numero: 10\nDigite o segundo numero: 5\nSoma: 15\nSubtracao: 5\nMultiplicacao: 50\nDivisao: 2.0',
        },
      ],
    },
  ],
};
