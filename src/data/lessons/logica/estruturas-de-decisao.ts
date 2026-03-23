import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'estruturas-de-decisao',
  moduleId: 'logica',
  title: 'Estruturas de Decisao',
  description:
    'Aprenda a usar estruturas condicionais como SE/ENTAO, SE/SENAO e ESCOLHA/CASO para fazer seu programa tomar decisoes. Veja exemplos em pseudocodigo e Python.',
  order: 6,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Toda decisao segue o padrao: \"Se isso acontecer, faco aquilo. Senao, faco outra coisa.\" Estruturas de decisao permitem que o programa faca escolhas!\n\n## SE/ENTAO: a decisao simples\n\nA estrutura de decisao mais basica e o **SE/ENTAO** (em ingles, if/then). Ela permite que o programa execute um bloco de instrucoes apenas quando uma condicao for verdadeira.\n\nA ideia e simples: "SE uma condicao for verdadeira, ENTAO faca algo."\n\nNo pseudocodigo, escrevemos assim:\n\n```\nSE condicao ENTAO\n    instrucoes\nFIM SE\n```\n\nPor exemplo, imagine que voce quer exibir uma mensagem apenas se o usuario for maior de idade:\n\n```\nSE idade >= 18 ENTAO\n    ESCREVA "Voce e maior de idade"\nFIM SE\n```\n\nSe a condicao `idade >= 18` for falsa, o programa simplesmente pula o bloco e continua normalmente. Nada acontece.',
    },
    {
      type: 'text',
      content:
        '## SE/ENTAO/SENAO: dois caminhos possiveis\n\nMuitas vezes, queremos fazer algo quando a condicao e verdadeira **e outra coisa** quando e falsa. Para isso, usamos o **SE/ENTAO/SENAO** (if/else).\n\n```\nSE condicao ENTAO\n    instrucoes_se_verdadeiro\nSENAO\n    instrucoes_se_falso\nFIM SE\n```\n\nExemplo classico — classificar uma pessoa como maior ou menor de idade:\n\n```\nLEIA idade\nSE idade >= 18 ENTAO\n    ESCREVA "Maior de idade"\nSENAO\n    ESCREVA "Menor de idade"\nFIM SE\n```\n\n## SE encadeado (SENAO SE)\n\nQuando ha mais de dois caminhos possiveis, usamos o **SENAO SE** (elif em Python). Cada condicao e verificada em sequencia, e apenas o primeiro bloco cuja condicao for verdadeira e executado.\n\n```\nSE condicao1 ENTAO\n    instrucoes1\nSENAO SE condicao2 ENTAO\n    instrucoes2\nSENAO SE condicao3 ENTAO\n    instrucoes3\nSENAO\n    instrucoes_padrao\nFIM SE\n```\n\nIsso e muito util para classificacoes. Vamos ver um exemplo pratico com calculo de IMC.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO ClassificarIMC\n#   LEIA peso\n#   LEIA altura\n#   imc <- peso / (altura * altura)\n#   SE imc < 18.5 ENTAO\n#     ESCREVA "Abaixo do peso"\n#   SENAO SE imc < 25 ENTAO\n#     ESCREVA "Peso normal"\n#   SENAO SE imc < 30 ENTAO\n#     ESCREVA "Sobrepeso"\n#   SENAO\n#     ESCREVA "Obesidade"\n#   FIM SE\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\npeso = float(input("Digite seu peso (kg): "))\naltura = float(input("Digite sua altura (m): "))\n\nimc = peso / (altura ** 2)\n\nif imc < 18.5:\n    print("Abaixo do peso")\nelif imc < 25:\n    print("Peso normal")\nelif imc < 30:\n    print("Sobrepeso")\nelse:\n    print("Obesidade")\n\nprint("Seu IMC e: " + str(round(imc, 1)))',
        filename: 'classificar_imc.py',
        description:
          'Exemplo de SE encadeado para classificar o IMC. Cada condicao e verificada em ordem: se a primeira falhar, testa a segunda, e assim por diante. O SENAO final captura todos os casos restantes.',
      },
    },
    {
      type: 'text',
      content:
        '## ESCOLHA/CASO (switch/case)\n\nQuando voce precisa comparar uma variavel com varios valores especificos, o **ESCOLHA/CASO** e mais organizado que varios SE/SENAO SE encadeados.\n\n```\nESCOLHA variavel\n    CASO valor1:\n        instrucoes1\n    CASO valor2:\n        instrucoes2\n    CASO valor3:\n        instrucoes3\n    CASO CONTRARIO:\n        instrucoes_padrao\nFIM ESCOLHA\n```\n\nE ideal para menus de opcoes, dias da semana, meses do ano, etc.\n\nEm Python, a partir da versao 3.10, existe o **match/case** que funciona de forma similar:\n\n```python\nmatch opcao:\n    case 1:\n        print("Opcao 1")\n    case 2:\n        print("Opcao 2")\n    case _:\n        print("Opcao invalida")\n```\n\nPara versoes anteriores do Python, usamos if/elif/else para simular o ESCOLHA/CASO.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO MenuDeOpcoes\n#   ESCREVA "=== Menu ==="\n#   ESCREVA "1 - Somar"\n#   ESCREVA "2 - Subtrair"\n#   ESCREVA "3 - Multiplicar"\n#   ESCREVA "4 - Dividir"\n#   LEIA opcao\n#   LEIA num1\n#   LEIA num2\n#   ESCOLHA opcao\n#     CASO 1:\n#       resultado <- num1 + num2\n#     CASO 2:\n#       resultado <- num1 - num2\n#     CASO 3:\n#       resultado <- num1 * num2\n#     CASO 4:\n#       SE num2 = 0 ENTAO\n#         ESCREVA "Erro: divisao por zero!"\n#       SENAO\n#         resultado <- num1 / num2\n#       FIM SE\n#     CASO CONTRARIO:\n#       ESCREVA "Opcao invalida!"\n#   FIM ESCOLHA\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nprint("=== Menu ===")\nprint("1 - Somar")\nprint("2 - Subtrair")\nprint("3 - Multiplicar")\nprint("4 - Dividir")\n\nopcao = int(input("Escolha uma opcao: "))\nnum1 = float(input("Digite o primeiro numero: "))\nnum2 = float(input("Digite o segundo numero: "))\n\nif opcao == 1:\n    resultado = num1 + num2\n    print("Resultado: " + str(resultado))\nelif opcao == 2:\n    resultado = num1 - num2\n    print("Resultado: " + str(resultado))\nelif opcao == 3:\n    resultado = num1 * num2\n    print("Resultado: " + str(resultado))\nelif opcao == 4:\n    if num2 == 0:\n        print("Erro: divisao por zero!")\n    else:\n        resultado = num1 / num2\n        print("Resultado: " + str(resultado))\nelse:\n    print("Opcao invalida!")',
        filename: 'menu_de_opcoes.py',
        description:
          'Menu de calculadora usando ESCOLHA/CASO em pseudocodigo e if/elif/else em Python. Note o SE/SENAO aninhado dentro do caso de divisao para tratar divisao por zero.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Dica importante: a ordem das condicoes no SE encadeado importa muito! Sempre coloque as condicoes mais restritivas primeiro. Por exemplo, ao classificar notas, comece verificando a maior faixa (>= 9) antes da menor (>= 7). Se inverter, a condicao mais ampla "engole" os casos que deveriam cair em outra faixa.',
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Estruturas de decisao em Python\n\nAgora vamos ver como cada estrutura de decisao se escreve em Python:\n\n**SE simples:** `if condicao:`\n**SE-SENAO:** `if condicao:` + `else:`\n**SE-SENAO SE:** `if condicao:` + `elif outra:` + `else:`\n**SE aninhado:** um `if` dentro de outro `if`\n\nLembre: sempre use `:` no final do `if`/`elif`/`else`, e 4 espacos de indentacao no bloco interno!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'decisoes_python.py',
        code: `# SE com SENAO SE (multiplas faixas)
consumo = int(input("Consumo em kWh: "))

if consumo <= 100:
    valor = consumo * 0.40
elif consumo <= 200:
    valor = consumo * 0.55
elif consumo <= 500:
    valor = consumo * 0.70
else:
    valor = consumo * 0.90

print("Consumo:", consumo, "kWh")
print("Valor: R$", round(valor, 2))

# SE aninhado (if dentro de if)
a = float(input("Lado a: "))
b = float(input("Lado b: "))
c = float(input("Lado c: "))

# Primeiro verifica se e triangulo valido
if a < b + c and b < a + c and c < a + b:
    # Dentro do if, outro if para classificar
    if a == b and b == c:
        print("Equilatero")
    elif a == b or b == c or a == c:
        print("Isosceles")
    else:
        print("Escaleno")
else:
    print("Nao forma triangulo")`,
        description: 'round(valor, 2) arredonda para 2 casas decimais. "and" e "or" combinam condicoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Para combinar condicoes em Python: use "and" (E logico - ambas verdadeiras), "or" (OU logico - pelo menos uma verdadeira) e "not" (negacao). Ex: if a > 0 and b > 0: (so entra se AMBOS forem positivos)',
    },
  ],
  challenges: [
    {
      id: 'ed-c1',
      title: 'Classificar triangulo pelos lados',
      description:
        'Escreva um programa que leia os tres lados de um triangulo e classifique-o como: "Equilatero" (3 lados iguais), "Isosceles" (2 lados iguais) ou "Escaleno" (3 lados diferentes). Antes de classificar, verifique se os lados formam um triangulo valido (cada lado deve ser menor que a soma dos outros dois).',
      language: 'python',
      starterCode: '# Classificador de triangulos\n# Leia os tres lados\na = float(input("Digite o lado a: "))\nb = float(input("Digite o lado b: "))\nc = float(input("Digite o lado c: "))\n\n# Primeiro, verifique se forma um triangulo valido\n# (cada lado deve ser menor que a soma dos outros dois)\n\n# Depois, classifique:\n# - Equilatero: 3 lados iguais\n# - Isosceles: 2 lados iguais\n# - Escaleno: 3 lados diferentes\n',
      solution: 'a = float(input("Digite o lado a: "))\nb = float(input("Digite o lado b: "))\nc = float(input("Digite o lado c: "))\n\nif a < b + c and b < a + c and c < a + b:\n    if a == b and b == c:\n        print("Triangulo Equilatero")\n    elif a == b or b == c or a == c:\n        print("Triangulo Isosceles")\n    else:\n        print("Triangulo Escaleno")\nelse:\n    print("Os lados informados nao formam um triangulo valido")',
      hints: [
        'Para verificar se forma um triangulo, use: a < b + c and b < a + c and c < a + b.',
        'Um triangulo e equilatero quando a == b e b == c (todos iguais).',
        'Para isosceles, basta que dois lados quaisquer sejam iguais: a == b or b == c or a == c.',
      ],
    },
    {
      id: 'ed-c2',
      title: 'Calcular tarifa de energia',
      description:
        'Uma companhia de energia cobra por faixas de consumo em kWh:\n- Ate 100 kWh: R$ 0,40 por kWh\n- De 101 a 200 kWh: R$ 0,55 por kWh\n- De 201 a 500 kWh: R$ 0,70 por kWh\n- Acima de 500 kWh: R$ 0,90 por kWh\nEscreva um programa que leia o consumo e calcule o valor total da conta.',
      language: 'python',
      starterCode: '# Calculadora de tarifa de energia\nconsumo = int(input("Digite o consumo em kWh: "))\n\n# Calcule o valor da conta com base nas faixas:\n# Ate 100 kWh: R$ 0,40 por kWh\n# 101 a 200 kWh: R$ 0,55 por kWh\n# 201 a 500 kWh: R$ 0,70 por kWh\n# Acima de 500 kWh: R$ 0,90 por kWh\n\n# Exiba o consumo e o valor total\n',
      solution: 'consumo = int(input("Digite o consumo em kWh: "))\n\nif consumo <= 100:\n    valor = consumo * 0.40\nelif consumo <= 200:\n    valor = consumo * 0.55\nelif consumo <= 500:\n    valor = consumo * 0.70\nelse:\n    valor = consumo * 0.90\n\nprint("Consumo: " + str(consumo) + " kWh")\nprint("Valor da conta: R$ " + str(round(valor, 2)))',
      hints: [
        'Use if/elif/else para verificar em qual faixa o consumo se encaixa.',
        'Comece verificando a menor faixa (<= 100) e va subindo.',
        'Multiplique o consumo pelo valor unitario da faixa correspondente.',
      ],
    },
    {
      id: 'ed-c3',
      title: 'Menu de calculadora',
      description:
        'Crie uma calculadora com menu de opcoes. O programa deve exibir: 1-Somar, 2-Subtrair, 3-Multiplicar, 4-Dividir. O usuario escolhe a opcao e digita dois numeros. O programa calcula e exibe o resultado. Trate a divisao por zero e opcao invalida.',
      language: 'python',
      starterCode: '# Calculadora com menu\nprint("=== Calculadora ===")\nprint("1 - Somar")\nprint("2 - Subtrair")\nprint("3 - Multiplicar")\nprint("4 - Dividir")\n\nopcao = int(input("Escolha a operacao: "))\nnum1 = float(input("Primeiro numero: "))\nnum2 = float(input("Segundo numero: "))\n\n# Use if/elif/else para cada opcao\n# Lembre-se de tratar divisao por zero na opcao 4\n# Trate tambem opcao invalida\n',
      solution: 'print("=== Calculadora ===")\nprint("1 - Somar")\nprint("2 - Subtrair")\nprint("3 - Multiplicar")\nprint("4 - Dividir")\n\nopcao = int(input("Escolha a operacao: "))\nnum1 = float(input("Primeiro numero: "))\nnum2 = float(input("Segundo numero: "))\n\nif opcao == 1:\n    resultado = num1 + num2\n    print("Resultado: " + str(resultado))\nelif opcao == 2:\n    resultado = num1 - num2\n    print("Resultado: " + str(resultado))\nelif opcao == 3:\n    resultado = num1 * num2\n    print("Resultado: " + str(resultado))\nelif opcao == 4:\n    if num2 == 0:\n        print("Erro: divisao por zero!")\n    else:\n        resultado = num1 / num2\n        print("Resultado: " + str(resultado))\nelse:\n    print("Opcao invalida!")',
      hints: [
        'Use if/elif/else para verificar qual opcao o usuario escolheu (1, 2, 3 ou 4).',
        'Na opcao 4 (dividir), faca um if interno para verificar se num2 == 0 antes de dividir.',
        'Use else no final para tratar qualquer opcao que nao seja 1, 2, 3 ou 4.',
      ],
    },
  ],
};
