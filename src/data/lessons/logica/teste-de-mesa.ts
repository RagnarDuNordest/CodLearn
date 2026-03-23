import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'teste-de-mesa',
  moduleId: 'logica',
  title: 'Teste de Mesa e Depuracao',
  description:
    'Aprenda a executar algoritmos passo a passo no papel (teste de mesa), construir tabelas de rastreamento e usar tecnicas de depuracao para encontrar e corrigir erros logicos.',
  order: 10,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        'Teste de mesa e como ser um detetive do seu proprio codigo: voce acompanha cada passo anotando os valores para descobrir se o resultado esta correto!\n\n## O que e teste de mesa?\n\nO **teste de mesa** (tambem chamado de dry run ou trace table) e uma tecnica em que voce executa um algoritmo **manualmente, passo a passo**, anotando o valor de cada variavel em uma tabela. E como ser o computador: voce le cada instrucao e atualiza os valores no papel.\n\nPor que fazer teste de mesa?\n\n- **Encontrar erros logicos**: bugs que nao causam erro de sintaxe mas produzem resultados errados\n- **Entender o fluxo**: visualizar exatamente o que acontece em cada passo\n- **Validar antes de programar**: testar se seu pseudocodigo esta correto antes de codificar\n\nA tabela de teste de mesa tem uma coluna para cada variavel e uma coluna para a saida (o que seria exibido na tela). Cada linha representa um passo da execucao.',
    },
    {
      type: 'text',
      content:
        '## Como fazer um teste de mesa\n\nSiga estes passos:\n\n1. **Liste todas as variaveis** do algoritmo como colunas da tabela\n2. **Adicione uma coluna "Saida"** para o que seria exibido na tela\n3. **Execute cada linha** do algoritmo na ordem\n4. **Atualize a tabela** sempre que uma variavel mudar de valor\n5. **Anote a saida** sempre que uma instrucao ESCREVA for executada\n\nExemplo — Teste de mesa do algoritmo de soma de 1 a N:\n\n```\nALGORITMO SomaDe1aN\n  N <- 4\n  soma <- 0\n  PARA i DE 1 ATE N FACA\n    soma <- soma + i\n  FIM PARA\n  ESCREVA soma\nFIM ALGORITMO\n```\n\n| Passo | N | soma | i | Saida |\n|-------|---|------|---|-------|\n| 1     | 4 |  -   | - |       |\n| 2     | 4 |  0   | - |       |\n| 3     | 4 |  0   | 1 |       |\n| 4     | 4 |  1   | 1 |       |\n| 5     | 4 |  1   | 2 |       |\n| 6     | 4 |  3   | 2 |       |\n| 7     | 4 |  3   | 3 |       |\n| 8     | 4 |  6   | 3 |       |\n| 9     | 4 |  6   | 4 |       |\n| 10    | 4 | 10   | 4 |       |\n| 11    | 4 | 10   | - | 10    |\n\nO resultado final e 10, que e correto: 1 + 2 + 3 + 4 = 10.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# ALGORITMO COM ERRO LOGICO:\n# ============================\n# Objetivo: contar quantos numeros pares existem no vetor\n# Teste de mesa revela o erro!\n\nnumeros = [3, 8, 12, 5, 20]\ncontador = 0\n\nfor i in range(len(numeros)):\n    if numeros[i] % 2 == 0:\n        contador = contador + 1\n    else:\n        contador = 0  # ERRO! Reseta o contador nos impares\n\nprint("Quantidade de pares: " + str(contador))\n\n# Teste de mesa:\n# | Passo | i | numeros[i] | par? | contador |\n# |-------|---|------------|------|----------|\n# | 1     | 0 | 3          | Nao  | 0        | <- resetou (era 0)\n# | 2     | 1 | 8          | Sim  | 1        |\n# | 3     | 2 | 12         | Sim  | 2        |\n# | 4     | 3 | 5          | Nao  | 0        | <- RESETOU! Perdeu a contagem\n# | 5     | 4 | 20         | Sim  | 1        |\n# Saida: 1 (ERRADO! Deveria ser 3)\n\n# ============================\n# VERSAO CORRIGIDA:\n# ============================\nnumeros2 = [3, 8, 12, 5, 20]\ncontador2 = 0\n\nfor i in range(len(numeros2)):\n    if numeros2[i] % 2 == 0:\n        contador2 = contador2 + 1\n    # Remover o else que resetava o contador!\n\nprint("Quantidade de pares (correto): " + str(contador2))',
        filename: 'teste_de_mesa_erro.py',
        description:
          'Exemplo de como o teste de mesa revela um erro logico. O else resetava o contador a cada numero impar, perdendo a contagem. A correcao e simplesmente remover o else.',
      },
    },
    {
      type: 'text',
      content:
        '## Tecnicas de depuracao (debugging)\n\nAlem do teste de mesa no papel, existem tecnicas que voce pode usar diretamente no codigo para encontrar erros:\n\n### Print debugging\nA tecnica mais simples: adicionar comandos `print()` em pontos estrategicos do codigo para visualizar o valor das variaveis durante a execucao.\n\n```python\n# Adicionando prints de depuracao\nfor i in range(len(lista)):\n    print("[DEBUG] i=" + str(i) + " valor=" + str(lista[i]))\n    # ... resto do codigo\n```\n\n### Dicas para encontrar erros logicos\n\n1. **Compare o esperado com o obtido**: execute com valores conhecidos e verifique se a saida e a esperada\n2. **Teste os limites**: teste com o menor e o maior valor possivel, com zero, com negativos\n3. **Divida e conquiste**: se o programa e grande, teste cada parte separadamente\n4. **Leia o erro de tras para frente**: quando algo da errado, comece pelo resultado e va voltando ate achar onde o erro comecou\n5. **Explique para alguem**: as vezes, so de explicar o codigo em voz alta, voce descobre o erro (tecnica do "pato de borracha")',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ============================\n# EXEMPLO: PRINT DEBUGGING\n# ============================\n# Programa com erro: deveria calcular a media,\n# mas esta dando resultado errado\n\nnotas = [8.0, 7.5, 9.0, 6.5]\nsoma = 0\n\nfor i in range(len(notas)):\n    soma = notas[i]  # ERRO: deveria ser soma = soma + notas[i]\n    print("[DEBUG] i=" + str(i) + " nota=" + str(notas[i]) + " soma=" + str(soma))\n\nmedia = soma / len(notas)\nprint("[DEBUG] soma final=" + str(soma) + " media=" + str(media))\nprint("Media: " + str(media))\n\n# Saida do debug:\n# [DEBUG] i=0 nota=8.0 soma=8.0\n# [DEBUG] i=1 nota=7.5 soma=7.5    <- Soma diminuiu! Nao acumulou\n# [DEBUG] i=2 nota=9.0 soma=9.0\n# [DEBUG] i=3 nota=6.5 soma=6.5\n# [DEBUG] soma final=6.5 media=1.625\n# Media: 1.625 (ERRADO! Deveria ser 7.75)\n\n# O debug mostra que soma nao esta acumulando!\n# Correcao: trocar "soma = notas[i]" por "soma = soma + notas[i]"',
        filename: 'print_debugging.py',
        description:
          'Print debugging em acao: os prints revelam que a variavel soma nao esta acumulando os valores. O erro e que faltou somar ao valor anterior (soma = soma + notas[i]).',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Sempre faca o teste de mesa com valores simples e pequenos. Nao tente testar com vetores de 100 elementos — use 3 ou 4 valores que cubram os casos principais (pares e impares, positivos e negativos, etc.). Depois que confirmar que a logica funciona, teste no computador com mais dados.',
    },
    {
      type: 'callout',
      content:
        'Logica de programacao e a base de tudo! Se voce entender bem, aprender qualquer linguagem fica muito mais facil.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Teste de mesa em Python: acompanhando variaveis\n\nPara fazer o teste de mesa de um codigo Python, voce rastreia o valor de cada variavel a cada passo. Veja como interpretar os comandos:\n\n- `for i in range(len(lista))` — percorre os indices 0, 1, 2, ... ate o tamanho da lista menos 1\n- `lista[i]` — acessa o elemento na posicao i (começa em 0!)\n- `resultado = valores[i]` — atribui o valor do elemento i à variavel resultado\n- `lista[i] % 2 == 0` — verifica se o numero e par (resto da divisao por 2 igual a 0)\n- `soma = soma + numero` ou `soma += numero` — acumula valores\n\nDica: use `print()` para mostrar o valor das variaveis e depurar seu codigo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'teste_de_mesa.py',
        code: `# Programa para analisar - qual o valor final de resultado?
valores = [2, 5, 3, 8]
resultado = 0

# Trace o teste de mesa manualmente antes de rodar!
# | Passo | i | valores[i] | condicao        | resultado |
# |-------|---|------------|-----------------|-----------|
# |   0   | 0 |     2      | 2 > 0? SIM      |     2     |
# |   1   | 1 |     5      | 5 > 2? SIM      |     5     |
# |   2   | 2 |     3      | 3 > 5? NAO      |     5     |
# |   3   | 3 |     8      | 8 > 5? SIM      |     8     |

for i in range(len(valores)):  # i = 0, 1, 2, 3
    if valores[i] > resultado:
        resultado = valores[i]

print("O maior valor e:", resultado)  # 8

# Depurando com print (util para fazer o teste de mesa):
valores2 = [2, 5, 3, 8]
maximo = 0
for i in range(len(valores2)):
    print(f"  i={i}, valores[{i}]={valores2[i]}, maximo={maximo}", end=" ")
    if valores2[i] > maximo:
        maximo = valores2[i]
        print(f"-> maximo atualizado para {maximo}")
    else:
        print("-> sem mudanca")`,
        description: 'range(len(lista)) gera indices 0, 1, 2,... Use print() para depurar e fazer teste de mesa.',
      },
    },
  ],
  challenges: [
    {
      id: 'tm-c1',
      title: 'Executar teste de mesa',
      description:
        'O programa abaixo calcula algo com um vetor. Execute o teste de mesa mentalmente (ou no papel) e depois adicione um print ao final que exiba o valor correto de "resultado". O algoritmo percorre o vetor e faz operacoes com um acumulador. Descubra qual sera o valor final de "resultado" e exiba-o.',
      language: 'python',
      starterCode: '# Execute o teste de mesa e descubra o valor final de resultado\nvalores = [2, 5, 3, 8]\nresultado = 0\n\nfor i in range(len(valores)):\n    if valores[i] > resultado:\n        resultado = valores[i]\n\n# Qual o valor de resultado ao final?\n# Faca o teste de mesa:\n# | Passo | i | valores[i] | resultado |\n# |-------|---|------------|-----------|\n# | ...   |...|    ...     |    ...    |\n\n# Adicione um print exibindo o resultado e o que ele representa\n',
      solution: '# Teste de mesa:\n# | Passo | i | valores[i] | resultado |\n# |-------|---|------------|-----------|\n# | 0     | 0 | 2          | 2         |\n# | 1     | 1 | 5          | 5         |\n# | 2     | 2 | 3          | 5         |\n# | 3     | 3 | 8          | 8         |\n\nvalores = [2, 5, 3, 8]\nresultado = 0\n\nfor i in range(len(valores)):\n    if valores[i] > resultado:\n        resultado = valores[i]\n\nprint("O maior valor do vetor e: " + str(resultado))',
      hints: [
        'Acompanhe o valor de resultado a cada iteracao: ele so muda quando valores[i] > resultado.',
        'Na primeira iteracao, 2 > 0, entao resultado vira 2. Na segunda, 5 > 2, resultado vira 5.',
        'O algoritmo esta encontrando o maior valor do vetor. O resultado final e 8.',
      ],
    },
    {
      id: 'tm-c2',
      title: 'Encontrar e corrigir erro logico',
      description:
        'O programa abaixo deveria calcular a soma dos numeros pares de uma lista, mas esta dando resultado errado. Use print debugging ou teste de mesa para encontrar o erro e corrigi-lo.',
      language: 'python',
      starterCode: '# Este programa deveria somar apenas os numeros pares\n# Resultado esperado: 2 + 4 + 6 + 8 + 10 = 30\n# Mas esta dando resultado errado. Encontre e corrija o erro!\n\nnumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsoma_pares = 0\n\nfor i in range(len(numeros)):\n    if numeros[i] % 2 == 0:\n        soma_pares = soma_pares + 1  # Aqui tem algo errado!\n\nprint("Soma dos pares: " + str(soma_pares))\n',
      solution: 'numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsoma_pares = 0\n\nfor i in range(len(numeros)):\n    if numeros[i] % 2 == 0:\n        soma_pares = soma_pares + numeros[i]  # Corrigido: soma o valor, nao 1\n\nprint("Soma dos pares: " + str(soma_pares))',
      hints: [
        'O programa esta somando 1 a cada par encontrado em vez de somar o valor do numero.',
        'Troque "soma_pares = soma_pares + 1" por "soma_pares = soma_pares + numeros[i]".',
        'O erro comum e confundir contador (somar 1) com acumulador (somar o valor). Aqui queremos acumular.',
      ],
    },
    {
      id: 'tm-c3',
      title: 'Prever saida de programa',
      description:
        'Analise o programa abaixo e, sem executa-lo, preveja qual sera a saida. Depois, adicione um comentario com a saida prevista e execute para verificar se voce acertou. O programa usa lacos aninhados e condicionais.',
      language: 'python',
      starterCode: '# Analise e preveja a saida deste programa\n# Depois adicione um comentario com sua previsao\n\nresultado = ""\nfor i in range(1, 5):\n    for j in range(1, i + 1):\n        if j % 2 == 0:\n            resultado = resultado + "* "\n        else:\n            resultado = resultado + str(j) + " "\n    resultado = resultado + "\\n"\n\nprint(resultado)\n\n# Sua previsao da saida:\n# (escreva aqui em comentarios o que voce acha que sera impresso)\n# Dica: faca o teste de mesa com i e j\n',
      solution: '# Teste de mesa:\n# i=1: j=1 (impar) -> "1 "\n# i=2: j=1 (impar) -> "1 ", j=2 (par) -> "* "\n# i=3: j=1 (impar) -> "1 ", j=2 (par) -> "* ", j=3 (impar) -> "3 "\n# i=4: j=1 (impar) -> "1 ", j=2 (par) -> "* ", j=3 (impar) -> "3 ", j=4 (par) -> "* "\n\n# Previsao da saida:\n# 1\n# 1 *\n# 1 * 3\n# 1 * 3 *\n\nresultado = ""\nfor i in range(1, 5):\n    for j in range(1, i + 1):\n        if j % 2 == 0:\n            resultado = resultado + "* "\n        else:\n            resultado = resultado + str(j) + " "\n    resultado = resultado + "\\n"\n\nprint(resultado)',
      hints: [
        'O laco externo (i) vai de 1 a 4. O laco interno (j) vai de 1 ate i.',
        'Quando j e par, imprime "* ". Quando j e impar, imprime o valor de j.',
        'Faca o teste de mesa: i=1 gera "1", i=2 gera "1 *", i=3 gera "1 * 3", i=4 gera "1 * 3 *".',
      ],
    },
  ],
};
