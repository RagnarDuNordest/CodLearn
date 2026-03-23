import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'algoritmos-e-fluxogramas',
  moduleId: 'logica',
  title: 'Algoritmos e Fluxogramas',
  description:
    'Entenda o que sao algoritmos, aprenda os simbolos de fluxogramas e como representar a logica de um programa de forma visual antes de escrever codigo.',
  order: 1,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content:
        'Antes de escrever codigo, e muito util desenhar o \"mapa\" da solucao. Fluxogramas sao mapas visuais que mostram cada passo e decisao do programa!\n\n## O que e um algoritmo?\n\nUm **algoritmo** e uma sequencia finita de passos bem definidos e ordenados para resolver um problema ou realizar uma tarefa. Todo algoritmo tem tres caracteristicas essenciais:\n\n1. **Entrada**: os dados que o algoritmo recebe para processar\n2. **Processamento**: as operacoes e decisoes realizadas com os dados\n3. **Saida**: o resultado final produzido pelo algoritmo\n\nVoce ja usa algoritmos o tempo todo sem perceber! Uma receita de bolo e um algoritmo. As instrucoes de montagem de um movel sao um algoritmo. O caminho que voce faz de casa ate o trabalho e um algoritmo.\n\nA diferenca e que, na programacao, os algoritmos precisam ser **extremamente precisos**, porque o computador segue as instrucoes ao pe da letra. Ele nao "adivinha" o que voce quis dizer.',
    },
    {
      type: 'text',
      content:
        '## Simbolos de fluxograma\n\nUm **fluxograma** e a representacao visual de um algoritmo. Ele usa simbolos geometricos conectados por setas para mostrar o fluxo de execucao. Os principais simbolos sao:\n\n| Simbolo | Forma | Significado |\n|---|---|---|\n| Inicio/Fim | **Oval** | Marca o inicio ou o fim do algoritmo |\n| Processo | **Retangulo** | Representa uma acao, calculo ou atribuicao |\n| Decisao | **Losango** | Representa uma condicao (sim/nao, verdadeiro/falso) |\n| Entrada/Saida | **Paralelogramo** | Leitura de dados ou exibicao de resultados |\n| Seta | **Linha com ponta** | Indica a direcao do fluxo de execucao |\n\nAs **regras basicas** para criar um fluxograma sao:\n- Todo fluxograma comeca com um simbolo de INICIO e termina com FIM\n- As setas indicam a ordem de execucao\n- Do losango (decisao) sempre saem dois caminhos: SIM e NAO\n- O fluxo deve ser claro e sem ambiguidades',
    },
    {
      type: 'text',
      content:
        '## Exemplo de fluxograma: par ou impar\n\nVeja como representar o algoritmo para verificar se um numero e par ou impar:\n\n```\n  [INICIO]\n     |\n     v\n  /Leia numero/\n     |\n     v\n  <numero % 2 == 0?>\n   /              \\\n  SIM             NAO\n  |                |\n  v                v\n/Exiba:          /Exiba:\n "Par"/           "Impar"/\n  |                |\n  v                v\n  [FIM]          [FIM]\n```\n\nLendo o fluxograma: comecamos no INICIO, lemos um numero do usuario, verificamos se o resto da divisao por 2 e zero. Se SIM, exibimos "Par". Se NAO, exibimos "Impar". Em ambos os casos, terminamos no FIM.\n\n## Exemplo: calcular media de duas notas\n\n```\n  [INICIO]\n     |\n     v\n  /Leia nota1/\n     |\n     v\n  /Leia nota2/\n     |\n     v\n  [media = (nota1 + nota2) / 2]\n     |\n     v\n  <media >= 7?>\n   /          \\\n  SIM         NAO\n  |            |\n  v            v\n/Exiba:      /Exiba:\n"Aprovado"/  "Reprovado"/\n  |            |\n  v            v\n  [FIM]      [FIM]\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Algoritmo: Verificar se um numero e par ou impar\n# (implementacao do fluxograma acima)\n\nnumero = int(input("Digite um numero: "))\n\nif numero % 2 == 0:\n    print(numero, "e par")\nelse:\n    print(numero, "e impar")',
        filename: 'par_ou_impar.py',
        description:
          'O operador % (modulo) retorna o resto da divisao. Se o resto da divisao por 2 for zero, o numero e par. Caso contrario, e impar. Compare com o fluxograma acima!',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Fluxogramas sao otimos para planejar a logica antes de escrever o codigo. Em empresas de tecnologia, equipes usam fluxogramas e diagramas para discutir solucoes antes de comecar a programar. Isso evita retrabalho e erros logicos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Algoritmo: Calcular media de duas notas\n# (implementacao do segundo fluxograma)\n\nnota1 = float(input("Digite a primeira nota: "))\nnota2 = float(input("Digite a segunda nota: "))\n\nmedia = (nota1 + nota2) / 2\n\nprint("Media:", media)\n\nif media >= 7:\n    print("Situacao: Aprovado")\nelse:\n    print("Situacao: Reprovado")',
        filename: 'calcular_media.py',
        description:
          'Cada etapa do fluxograma se traduz diretamente em linhas de codigo. A entrada (paralelogramo) vira input(), o processo (retangulo) vira a formula, a decisao (losango) vira if/else, e a saida vira print().',
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
      content: '## Implementando algoritmos em Python\n\nFluxogramas e algoritmos sao representados em Python assim:\n\n**Entrada de dados (LEIA):** `variavel = input("mensagem")`. Para numero inteiro: `int(input("..."))`. Para decimal: `float(input("..."))`\n\n**Decisao (SE...ENTAO...SENAO):**\n```\nif condicao:\n    # codigo se verdadeiro\nelif outra_condicao:\n    # outra opcao  \nelse:\n    # caso contrario\n```\n\n**Exibir (ESCREVA):** `print("mensagem")` ou `print("texto", variavel)`\n\n**Operadores de comparacao:** `>` (maior), `<` (menor), `>=` (maior ou igual), `<=` (menor ou igual), `==` (igual), `!=` (diferente)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'fluxograma_para_python.py',
        code: `# Fluxograma: verificar se numero e positivo, negativo ou zero
# [INICIO] -> [LEIA numero] -> <numero > 0?> -> ...

# Traduzindo para Python:

numero = int(input("Digite um numero: "))  # LEIA numero

if numero > 0:               # SE numero > 0 ENTAO
    print("Positivo")        #   ESCREVA "Positivo"
elif numero < 0:             # SENAO SE numero < 0 ENTAO
    print("Negativo")        #   ESCREVA "Negativo"
else:                        # SENAO
    print("Zero")            #   ESCREVA "Zero"

# Outro exemplo: desconto por valor de compra
valor = float(input("Valor da compra: R$ "))

if valor > 500:
    percentual = 15
elif valor >= 200:
    percentual = 10
else:
    percentual = 0

desconto = valor * percentual / 100
valor_final = valor - desconto

print("Desconto:", percentual, "%")
print("Valor final: R$", valor_final)`,
        description: 'int(input()) le um inteiro, float(input()) le decimal. if/elif/else tomam decisoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'REGRA DE OURO: sempre que usar input() para fazer calculos, converta o tipo! Use int(input(...)) para inteiros e float(input(...)) para decimais. Sem a conversao, Python vai tratar o valor como texto e nao conseguira fazer calculos.',
    },
  ],
  challenges: [
    {
      id: 'af-c1',
      title: 'Positivo, negativo ou zero',
      description:
        'Crie um algoritmo em Python que leia um numero do usuario e verifique se ele e positivo (maior que zero), negativo (menor que zero) ou igual a zero. Exiba a mensagem correspondente. Pense no fluxograma: INICIO -> Leia numero -> Decisao (numero > 0?) -> Se sim: "Positivo". Se nao: outra decisao (numero < 0?) -> Se sim: "Negativo", se nao: "Zero" -> FIM.',
      language: 'python',
      starterCode: '# Algoritmo: verificar se numero e positivo, negativo ou zero\n# Fluxograma:\n# [INICIO] -> /Leia numero/ -> <numero > 0?>\n#   SIM -> "Positivo"\n#   NAO -> <numero < 0?>\n#     SIM -> "Negativo"\n#     NAO -> "Zero"\n# [FIM]\n\nnumero = int(input("Digite um numero: "))\n\n# Implemente a logica aqui\n',
      solution: 'numero = int(input("Digite um numero: "))\n\nif numero > 0:\n    print("O numero e positivo")\nelif numero < 0:\n    print("O numero e negativo")\nelse:\n    print("O numero e zero")',
      hints: [
        'Use if para verificar se o numero e maior que zero (positivo).',
        'Use elif para verificar se o numero e menor que zero (negativo).',
        'Se nao e positivo nem negativo, so pode ser zero. Use else para esse caso.',
      ],
    },
    {
      id: 'af-c2',
      title: 'Calculadora de desconto',
      description:
        'Crie um algoritmo que calcule o desconto em uma compra. As regras sao: compras acima de R$ 500 ganham 15% de desconto, compras entre R$ 200 e R$ 500 ganham 10%, e compras abaixo de R$ 200 nao tem desconto. Exiba o valor original, o desconto aplicado e o valor final.',
      language: 'python',
      starterCode: '# Algoritmo: calcular desconto baseado no valor da compra\n# Regras:\n# - Acima de R$ 500: 15% de desconto\n# - Entre R$ 200 e R$ 500: 10% de desconto\n# - Abaixo de R$ 200: sem desconto\n\nvalor = float(input("Digite o valor da compra: R$ "))\n\n# Determine o percentual de desconto\n\n# Calcule o valor do desconto\n\n# Calcule o valor final\n\n# Exiba os resultados\n',
      solution: 'valor = float(input("Digite o valor da compra: R$ "))\n\nif valor > 500:\n    percentual = 15\nelif valor >= 200:\n    percentual = 10\nelse:\n    percentual = 0\n\ndesconto = valor * percentual / 100\nvalor_final = valor - desconto\n\nprint("Valor original: R$", valor)\nprint("Desconto:", percentual, "%")\nprint("Valor do desconto: R$", desconto)\nprint("Valor final: R$", valor_final)',
      hints: [
        'Comece com if valor > 500 para verificar a faixa de maior desconto.',
        'Use elif valor >= 200 para a faixa intermediaria. Se chegou aqui, ja sabemos que valor <= 500.',
        'Calcule o desconto multiplicando o valor pelo percentual e dividindo por 100.',
      ],
    },
  ],
};
