import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'estruturas-de-repeticao',
  moduleId: 'logica',
  title: 'Estruturas de Repeticao',
  description:
    'Domine os lacos de repeticao ENQUANTO, PARA e REPITA/ATE. Aprenda a usar contadores, acumuladores e sentinelas para controlar a execucao dos seus algoritmos.',
  order: 7,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Imagine escrever \"Eu vou estudar\" no quadro 100 vezes. Cansativo, ne? Estruturas de repeticao fazem o computador repetir tarefas automaticamente!\n\n## Por que precisamos de repeticao?\n\nMuitas tarefas do dia a dia envolvem repeticao: somar numeros, ler dados de uma lista, contar itens. Escrever a mesma instrucao varias vezes seria impraticavel. As **estruturas de repeticao** (tambem chamadas de lacos ou loops) permitem executar um bloco de instrucoes multiplas vezes de forma automatica.\n\nExistem tres tipos principais de lacos:\n\n| Estrutura | Quando usar | Teste da condicao |\n|---|---|---|\n| ENQUANTO | Quando nao sabemos quantas vezes repetir | Antes de executar |\n| PARA | Quando sabemos exatamente quantas vezes repetir | Controlado por contador |\n| REPITA/ATE | Quando queremos executar pelo menos uma vez | Depois de executar |\n\nVamos estudar cada uma delas em detalhes.',
    },
    {
      type: 'text',
      content:
        '## ENQUANTO (while): repita enquanto for verdadeiro\n\nO laco **ENQUANTO** verifica a condicao **antes** de executar o bloco. Se a condicao ja for falsa no inicio, o bloco nunca e executado.\n\n```\nENQUANTO condicao FACA\n    instrucoes\nFIM ENQUANTO\n```\n\nConceitos importantes que acompanham os lacos:\n\n- **Contador**: variavel que conta quantas vezes o laco executou (ex: `contador <- contador + 1`)\n- **Acumulador**: variavel que acumula valores a cada repeticao (ex: `soma <- soma + numero`)\n- **Sentinela**: valor especial que indica o fim da entrada de dados (ex: digitar 0 para parar)\n\nO sentinela e muito usado com ENQUANTO: o usuario vai digitando valores ate informar um valor especial que encerra o laco.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO:\n# ============================\n# ALGORITMO SomaComSentinela\n#   soma <- 0\n#   contador <- 0\n#   ESCREVA "Digite numeros (0 para encerrar):"\n#   LEIA numero\n#   ENQUANTO numero <> 0 FACA\n#     soma <- soma + numero\n#     contador <- contador + 1\n#     LEIA numero\n#   FIM ENQUANTO\n#   SE contador > 0 ENTAO\n#     media <- soma / contador\n#     ESCREVA "Soma: ", soma\n#     ESCREVA "Quantidade: ", contador\n#     ESCREVA "Media: ", media\n#   SENAO\n#     ESCREVA "Nenhum numero digitado"\n#   FIM SE\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nsoma = 0\ncontador = 0\n\nprint("Digite numeros (0 para encerrar):")\nnumero = int(input("Numero: "))\n\nwhile numero != 0:\n    soma = soma + numero\n    contador = contador + 1\n    numero = int(input("Numero: "))\n\nif contador > 0:\n    media = soma / contador\n    print("Soma: " + str(soma))\n    print("Quantidade: " + str(contador))\n    print("Media: " + str(media))\nelse:\n    print("Nenhum numero digitado")',
        filename: 'soma_com_sentinela.py',
        description:
          'Exemplo de laco ENQUANTO com sentinela (valor 0 encerra), acumulador (soma) e contador. Note que o numero e lido antes do laco e novamente dentro do laco para verificar a condicao.',
      },
    },
    {
      type: 'text',
      content:
        '## PARA (for): repeticao controlada por contador\n\nO laco **PARA** e usado quando sabemos exatamente quantas vezes queremos repetir. Ele controla automaticamente o incremento do contador.\n\n```\nPARA variavel DE inicio ATE fim PASSO incremento FACA\n    instrucoes\nFIM PARA\n```\n\nQuando o PASSO nao e informado, assume-se incremento de 1.\n\n## REPITA/ATE (do-while): execute pelo menos uma vez\n\nO laco **REPITA/ATE** e diferente dos outros porque a condicao e verificada **depois** de executar o bloco. Isso garante que as instrucoes sao executadas pelo menos uma vez.\n\n```\nREPITA\n    instrucoes\nATE condicao\n```\n\nEm Python, nao existe um do-while nativo, mas podemos simula-lo com `while True` e `break`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# PSEUDOCODIGO - LACO PARA:\n# ============================\n# ALGORITMO Tabuada\n#   LEIA numero\n#   PARA i DE 1 ATE 10 FACA\n#     resultado <- numero * i\n#     ESCREVA numero, " x ", i, " = ", resultado\n#   FIM PARA\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON:\n# ============================\nnumero = int(input("Digite um numero para a tabuada: "))\n\nfor i in range(1, 11):\n    resultado = numero * i\n    print(str(numero) + " x " + str(i) + " = " + str(resultado))\n\n\n# ============================\n# PSEUDOCODIGO - REPITA/ATE:\n# ============================\n# ALGORITMO MenuComValidacao\n#   REPITA\n#     ESCREVA "1 - Jogar"\n#     ESCREVA "2 - Opcoes"\n#     ESCREVA "3 - Sair"\n#     LEIA opcao\n#     SE opcao < 1 OU opcao > 3 ENTAO\n#       ESCREVA "Opcao invalida! Tente novamente."\n#     FIM SE\n#   ATE opcao >= 1 E opcao <= 3\n# FIM ALGORITMO\n\n# ============================\n# EQUIVALENTE EM PYTHON (simulando REPITA/ATE):\n# ============================\nwhile True:\n    print("1 - Jogar")\n    print("2 - Opcoes")\n    print("3 - Sair")\n    opcao = int(input("Escolha: "))\n    if 1 <= opcao <= 3:\n        break\n    print("Opcao invalida! Tente novamente.")\n\nprint("Voce escolheu a opcao " + str(opcao))',
        filename: 'para_e_repita.py',
        description:
          'Dois exemplos: o laco PARA gera a tabuada com contador automatico. O REPITA/ATE valida a entrada do usuario, garantindo que o menu seja exibido pelo menos uma vez. Em Python, simulamos REPITA/ATE com while True + break.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cuidado com lacos infinitos! Sempre garanta que a condicao do ENQUANTO sera falsa em algum momento, que o PARA tem um limite definido, ou que o REPITA/ATE tera sua condicao de saida satisfeita. Um laco infinito trava o programa e pode congelar o computador.',
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Lacos de repeticao em Python\n\nVeja como cada estrutura de repeticao e escrita em Python:\n\n**PARA (for):** `for i in range(inicio, fim):` — repete do inicio ate fim-1\n- `range(10)` — de 0 a 9\n- `range(1, 11)` — de 1 a 10\n- `range(1, 11, 2)` — de 1 a 10, de 2 em 2 (impares)\n\n**ENQUANTO (while):** `while condicao:` — repete enquanto a condicao for verdadeira\n\n**Acumulador:** `soma = soma + numero` ou `soma += numero` (mesmo resultado)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'lacos_python.py',
        code: `# ENQUANTO (while) com sentinela
soma = 0
quantidade = 0

numero = int(input("Numero (0 para sair): "))

while numero != 0:        # Enquanto o numero nao for 0
    soma = soma + numero  # Acumula na soma
    quantidade += 1       # Conta quantos numeros foram digitados
    numero = int(input("Numero (0 para sair): "))  # Proximo numero

print("Soma:", soma)
print("Quantidade:", quantidade)

# PARA (for) com range
numero = int(input("Digite um numero para a tabuada: "))

print("Tabuada do", numero)
for i in range(1, 11):       # i vai de 1 ate 10
    resultado = numero * i
    print(numero, "x", i, "=", resultado)

# range(1, 11, 2) geraria: 1, 3, 5, 7, 9 (pares de 2 em 2)`,
        description: 'while repete enquanto condicao verdadeira. for com range controla quantas vezes repete.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Cuidado com o loop infinito no while! Sempre garanta que algo dentro do while vai mudar a condicao para False eventualmente. No exemplo do sentinela, o usuario precisa digitar 0 para sair — sem isso, o programa ficaria rodando para sempre.',
    },
  ],
  challenges: [
    {
      id: 'er-c1',
      title: 'Somar numeros ate digitar 0',
      description:
        'Escreva um programa que leia numeros inteiros do usuario ate que ele digite 0 (sentinela). Ao final, exiba a soma de todos os numeros digitados e a quantidade de numeros lidos (sem contar o zero).',
      language: 'python',
      starterCode: '# Soma com sentinela\n# Leia numeros ate o usuario digitar 0\n# Exiba a soma total e a quantidade de numeros\n\nsoma = 0\nquantidade = 0\n\n# Use um laco while para ler numeros\n# O laco deve parar quando o usuario digitar 0\n\n# Exiba os resultados\n',
      solution: 'soma = 0\nquantidade = 0\n\nnumero = int(input("Digite um numero (0 para sair): "))\n\nwhile numero != 0:\n    soma = soma + numero\n    quantidade = quantidade + 1\n    numero = int(input("Digite um numero (0 para sair): "))\n\nprint("Soma total: " + str(soma))\nprint("Quantidade de numeros: " + str(quantidade))',
      hints: [
        'Leia o primeiro numero antes do laco while.',
        'Dentro do laco, acumule o valor em soma e incremente quantidade, depois leia o proximo numero.',
        'O laco deve continuar enquanto numero != 0.',
      ],
    },
    {
      id: 'er-c2',
      title: 'Tabuada de multiplicacao',
      description:
        'Escreva um programa que leia um numero e exiba a tabuada completa dele (de 1 a 10). Use um laco for. Cada linha deve mostrar no formato: "N x I = R" (onde N e o numero, I e o multiplicador e R e o resultado).',
      language: 'python',
      starterCode: '# Tabuada de multiplicacao\nnumero = int(input("Digite um numero: "))\n\n# Use um laco for com range(1, 11)\n# Exiba cada linha no formato: "N x I = R"\n',
      solution: 'numero = int(input("Digite um numero: "))\n\nprint("Tabuada do " + str(numero) + ":")\nfor i in range(1, 11):\n    resultado = numero * i\n    print(str(numero) + " x " + str(i) + " = " + str(resultado))',
      hints: [
        'Use range(1, 11) para gerar os numeros de 1 a 10.',
        'Dentro do laco, calcule resultado = numero * i.',
        'Use concatenacao de strings com str() para formatar a saida.',
      ],
    },
    {
      id: 'er-c3',
      title: 'Fatorial de um numero',
      description:
        'Escreva um programa que leia um numero inteiro positivo e calcule seu fatorial. O fatorial de N (escrito N!) e o produto de todos os inteiros de 1 ate N. Exemplo: 5! = 5 x 4 x 3 x 2 x 1 = 120. Considere que 0! = 1.',
      language: 'python',
      starterCode: '# Calculo de fatorial\nnumero = int(input("Digite um numero: "))\n\n# Calcule o fatorial usando um laco for\n# Lembre-se: 0! = 1\n\n# Exiba o resultado\n',
      solution: 'numero = int(input("Digite um numero: "))\n\nfatorial = 1\n\nfor i in range(1, numero + 1):\n    fatorial = fatorial * i\n\nprint("O fatorial de " + str(numero) + " e: " + str(fatorial))',
      hints: [
        'Inicialize a variavel fatorial com 1 (nao com 0, senao a multiplicacao sempre daria 0).',
        'Use range(1, numero + 1) para percorrer de 1 ate o numero.',
        'Se o numero for 0, o range(1, 1) nao executa nenhuma iteracao, e fatorial continua sendo 1, o que esta correto.',
      ],
    },
  ],
};
