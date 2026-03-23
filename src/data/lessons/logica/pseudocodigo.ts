import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'pseudocodigo',
  moduleId: 'logica',
  title: 'Pseudocodigo',
  description:
    'Aprenda a escrever pseudocodigo para planejar a logica dos seus programas antes de codificar, e veja como converter pseudocodigo para Python.',
  order: 2,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        'Pseudocodigo e como escrever uma receita em portugues antes de cozinhar. Voce planeja os passos em linguagem humana, sem regras de programacao!\n\n## O que e pseudocodigo?\n\n**Pseudocodigo** e uma forma de escrever algoritmos usando linguagem natural estruturada, parecida com um programa real, mas sem seguir a sintaxe rigorosa de nenhuma linguagem de programacao especifica.\n\nO nome ja diz tudo: "pseudo" significa falso, e "codigo" significa codigo. Ou seja, e um "falso codigo" — parece codigo, mas nao e executavel por nenhum computador. Ele serve como um **rascunho da logica**.\n\n### Vantagens do pseudocodigo\n\n- **Foco na logica**: voce se preocupa apenas com a solucao, sem se preocupar com regras de sintaxe\n- **Facil de entender**: qualquer pessoa consegue ler, mesmo quem nao sabe programar\n- **Independente de linguagem**: o mesmo pseudocodigo pode ser convertido para Python, C, Java ou qualquer outra linguagem\n- **Evita erros**: planejar antes de codar reduz bugs e retrabalho',
    },
    {
      type: 'text',
      content:
        '## Palavras-chave do pseudocodigo\n\nNo pseudocodigo em portugues, usamos palavras-chave para representar as acoes do programa:\n\n| Palavra-chave | Significado | Equivalente em Python |\n|---|---|---|\n| ALGORITMO / FIM ALGORITMO | Delimita o inicio e fim do programa | - |\n| LEIA variavel | Recebe dados do usuario | input() |\n| ESCREVA valor | Exibe algo na tela | print() |\n| variavel <- valor | Atribui um valor a variavel | variavel = valor |\n| SE condicao ENTAO | Verifica uma condicao | if condicao: |\n| SENAO | Caminho alternativo | else: |\n| SENAO SE condicao ENTAO | Condicao adicional | elif condicao: |\n| ENQUANTO condicao FACA | Repete enquanto for verdadeiro | while condicao: |\n| PARA i DE inicio ATE fim FACA | Repete um numero fixo de vezes | for i in range(inicio, fim+1): |\n| FIM SE / FIM ENQUANTO / FIM PARA | Fecha um bloco | (indentacao) |\n\n### Estrutura basica de um algoritmo em pseudocodigo\n\n```\nALGORITMO NomeDoAlgoritmo\n  // Declaracoes e instrucoes\n  LEIA dados\n  // Processamento\n  resultado <- calculo\n  // Saida\n  ESCREVA resultado\nFIM ALGORITMO\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO CalculadoraSimples\n#   ESCREVA "Digite o primeiro numero:"\n#   LEIA num1\n#   ESCREVA "Digite o segundo numero:"\n#   LEIA num2\n#   ESCREVA "Digite a operacao (+, -, *, /):"\n#   LEIA operacao\n#   SE operacao = "+" ENTAO\n#     resultado <- num1 + num2\n#   SENAO SE operacao = "-" ENTAO\n#     resultado <- num1 - num2\n#   SENAO SE operacao = "*" ENTAO\n#     resultado <- num1 * num2\n#   SENAO SE operacao = "/" ENTAO\n#     SE num2 != 0 ENTAO\n#       resultado <- num1 / num2\n#     SENAO\n#       ESCREVA "Erro: divisao por zero!"\n#     FIM SE\n#   FIM SE\n#   ESCREVA "Resultado: ", resultado\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nnum1 = float(input("Digite o primeiro numero: "))\nnum2 = float(input("Digite o segundo numero: "))\noperacao = input("Digite a operacao (+, -, *, /): ")\n\nif operacao == "+":\n    resultado = num1 + num2\nelif operacao == "-":\n    resultado = num1 - num2\nelif operacao == "*":\n    resultado = num1 * num2\nelif operacao == "/":\n    if num2 != 0:\n        resultado = num1 / num2\n    else:\n        print("Erro: divisao por zero!")\n        resultado = None\nelse:\n    print("Operacao invalida!")\n    resultado = None\n\nif resultado is not None:\n    print("Resultado:", resultado)',
        filename: 'pseudocodigo_calculadora.py',
        description:
          'Exemplo completo de conversao de pseudocodigo para Python. Note como LEIA vira input(), ESCREVA vira print(), SE/ENTAO vira if, SENAO SE vira elif, e o operador de atribuicao <- vira =.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Ao escrever pseudocodigo, nao se preocupe em ser perfeito. O objetivo e organizar sua logica de forma clara. Diferentes programadores podem escrever pseudocodigos ligeiramente diferentes para o mesmo problema, e isso e perfeitamente normal!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO ContarPares\n#   ESCREVA "Digite o limite:"\n#   LEIA limite\n#   contador <- 0\n#   PARA i DE 1 ATE limite FACA\n#     SE i % 2 = 0 ENTAO\n#       ESCREVA i, " e par"\n#       contador <- contador + 1\n#     FIM SE\n#   FIM PARA\n#   ESCREVA "Total de pares encontrados: ", contador\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nlimite = int(input("Digite o limite: "))\ncontador = 0\n\nfor i in range(1, limite + 1):\n    if i % 2 == 0:\n        print(i, "e par")\n        contador = contador + 1\n\nprint("Total de pares encontrados:", contador)',
        filename: 'pseudocodigo_contar_pares.py',
        description:
          'Exemplo com laco PARA e condicao SE. O PARA i DE 1 ATE limite vira for i in range(1, limite + 1) em Python. Note que em Python o range nao inclui o ultimo valor, por isso somamos 1.',
      },
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Tabela de traducao: Pseudocodigo → Python\n\nUse esta tabela como referencia para converter pseudocodigo para Python:\n\n| Pseudocodigo | Python |\n|---|---|\n| `ALGORITMO Nome` | (sem equivalente — apenas escreva o codigo) |\n| `LEIA variavel` | `variavel = input("mensagem")` |\n| `LEIA variavel` (inteiro) | `variavel = int(input("mensagem"))` |\n| `LEIA variavel` (decimal) | `variavel = float(input("mensagem"))` |\n| `ESCREVA "texto"` | `print("texto")` |\n| `ESCREVA "texto", variavel` | `print("texto", variavel)` |\n| `variavel <- expressao` | `variavel = expressao` |\n| `SE cond ENTAO ... FIM SE` | `if cond:` (com indentacao) |\n| `SENAO SE cond ENTAO` | `elif cond:` |\n| `SENAO` | `else:` |\n| `PARA i DE 1 ATE 10 FACA` | `for i in range(1, 11):` |\n| `ENQUANTO cond FACA` | `while cond:` |\n| `FIM PARA / FIM ENQUANTO` | (fim da indentacao) |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'pseudocodigo_para_python.py',
        code: `# PSEUDOCODIGO:
# ALGORITMO CalcularIMC
#   LEIA peso
#   LEIA altura
#   imc <- peso / (altura * altura)
#   SE imc < 18.5 ENTAO
#     ESCREVA "Abaixo do peso"
#   SENAO SE imc < 25 ENTAO
#     ESCREVA "Peso normal"
#   SENAO SE imc < 30 ENTAO
#     ESCREVA "Sobrepeso"
#   SENAO
#     ESCREVA "Obesidade"
#   FIM SE
#   ESCREVA "Seu IMC e: ", imc
# FIM ALGORITMO

# TRADUCAO PARA PYTHON:
peso = float(input("Digite seu peso (kg): "))      # LEIA peso
altura = float(input("Digite sua altura (m): "))   # LEIA altura

imc = peso / (altura * altura)                     # imc <- ...

if imc < 18.5:            # SE imc < 18.5 ENTAO
    print("Abaixo do peso")
elif imc < 25:            # SENAO SE imc < 25 ENTAO
    print("Peso normal")
elif imc < 30:            # SENAO SE imc < 30 ENTAO
    print("Sobrepeso")
else:                     # SENAO
    print("Obesidade")

print("Seu IMC e:", round(imc, 2))  # round() arredonda: round(3.14159, 2) = 3.14`,
        description: 'LEIA vira input()+conversao, ESCREVA vira print(), SE/SENAO SE/SENAO vira if/elif/else.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'A funcao round(numero, casas) arredonda um numero para a quantidade de casas decimais desejada. Exemplo: round(3.14159, 2) retorna 3.14. round(7.567, 0) retorna 8.0.',
    },
  ],
  challenges: [
    {
      id: 'ps-c1',
      title: 'Converter pseudocodigo: calculadora de IMC',
      description:
        'Converta o pseudocodigo abaixo para Python. O algoritmo calcula o Indice de Massa Corporal (IMC) e classifica o resultado. Pseudocodigo: LEIA peso e altura, calcule imc = peso / (altura * altura), classifique com SE/SENAO SE.',
      language: 'python',
      starterCode: '# PSEUDOCODIGO:\n# ALGORITMO CalcularIMC\n#   ESCREVA "Digite seu peso (kg):"\n#   LEIA peso\n#   ESCREVA "Digite sua altura (m):"\n#   LEIA altura\n#   imc <- peso / (altura * altura)\n#   SE imc < 18.5 ENTAO\n#     ESCREVA "Abaixo do peso"\n#   SENAO SE imc < 25 ENTAO\n#     ESCREVA "Peso normal"\n#   SENAO SE imc < 30 ENTAO\n#     ESCREVA "Sobrepeso"\n#   SENAO\n#     ESCREVA "Obesidade"\n#   FIM SE\n#   ESCREVA "Seu IMC e: ", imc\n# FIM ALGORITMO\n\n# Converta para Python abaixo:\n',
      solution: 'peso = float(input("Digite seu peso (kg): "))\naltura = float(input("Digite sua altura (m): "))\n\nimc = peso / (altura * altura)\n\nif imc < 18.5:\n    print("Abaixo do peso")\nelif imc < 25:\n    print("Peso normal")\nelif imc < 30:\n    print("Sobrepeso")\nelse:\n    print("Obesidade")\n\nprint("Seu IMC e:", round(imc, 2))',
      hints: [
        'LEIA vira input() em Python. Use float() para converter o texto em numero decimal.',
        'O operador de atribuicao <- do pseudocodigo vira = em Python.',
        'SE/ENTAO vira if, SENAO SE vira elif, SENAO vira else.',
      ],
    },
    {
      id: 'ps-c2',
      title: 'Escrever pseudocodigo para tabuada',
      description:
        'Primeiro, escreva o pseudocodigo como comentarios e depois implemente em Python: um programa que recebe um numero e exibe a tabuada completa (de 1 a 10) desse numero. Use o laco PARA no pseudocodigo.',
      language: 'python',
      starterCode: '# Escreva o pseudocodigo como comentarios:\n# ALGORITMO Tabuada\n#   (complete o pseudocodigo aqui)\n#\n#\n#\n# FIM ALGORITMO\n\n# Agora implemente em Python:\n',
      solution: '# PSEUDOCODIGO:\n# ALGORITMO Tabuada\n#   ESCREVA "Digite um numero:"\n#   LEIA numero\n#   ESCREVA "Tabuada do ", numero\n#   PARA i DE 1 ATE 10 FACA\n#     resultado <- numero * i\n#     ESCREVA numero, " x ", i, " = ", resultado\n#   FIM PARA\n# FIM ALGORITMO\n\n# PYTHON:\nnumero = int(input("Digite um numero: "))\n\nprint("Tabuada do", numero)\n\nfor i in range(1, 11):\n    resultado = numero * i\n    print(numero, "x", i, "=", resultado)',
      hints: [
        'No pseudocodigo, use PARA i DE 1 ATE 10 FACA para repetir 10 vezes.',
        'Em Python, o laco PARA vira for i in range(1, 11). Lembre-se: range nao inclui o limite superior.',
        'Dentro do laco, calcule resultado = numero * i e exiba com print().',
      ],
    },
    {
      id: 'ps-c3',
      title: 'Converter Python para pseudocodigo',
      description:
        'O codigo Python abaixo calcula o fatorial de um numero. Sua tarefa e escrever o pseudocodigo equivalente como comentarios acima do codigo. Depois, rode o programa para confirmar que funciona.',
      language: 'python',
      starterCode: '# Escreva o pseudocodigo equivalente aqui:\n# ALGORITMO Fatorial\n#   (complete o pseudocodigo)\n#\n#\n#\n#\n# FIM ALGORITMO\n\n# Codigo Python (nao altere):\nnumero = int(input("Digite um numero: "))\nfatorial = 1\n\nfor i in range(1, numero + 1):\n    fatorial = fatorial * i\n\nprint("O fatorial de", numero, "e:", fatorial)\n',
      solution: '# PSEUDOCODIGO:\n# ALGORITMO Fatorial\n#   ESCREVA "Digite um numero:"\n#   LEIA numero\n#   fatorial <- 1\n#   PARA i DE 1 ATE numero FACA\n#     fatorial <- fatorial * i\n#   FIM PARA\n#   ESCREVA "O fatorial de ", numero, " e: ", fatorial\n# FIM ALGORITMO\n\n# Codigo Python:\nnumero = int(input("Digite um numero: "))\nfatorial = 1\n\nfor i in range(1, numero + 1):\n    fatorial = fatorial * i\n\nprint("O fatorial de", numero, "e:", fatorial)',
      hints: [
        'input() em Python corresponde a LEIA no pseudocodigo.',
        'O laco for i in range(1, numero + 1) corresponde a PARA i DE 1 ATE numero FACA.',
        'A atribuicao fatorial = fatorial * i vira fatorial <- fatorial * i no pseudocodigo.',
      ],
    },
  ],
};
