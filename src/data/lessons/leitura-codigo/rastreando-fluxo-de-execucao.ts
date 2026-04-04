import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'rastreando-fluxo-de-execucao',
  moduleId: 'leitura-codigo',
  title: 'Rastreando o Fluxo de Execucao',
  description: 'Aprenda a seguir o caminho dos dados pelo codigo como um detetive',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O que e fluxo de execucao?\n\nO codigo nao executa sempre de cima para baixo. Quando ha funcoes, condicionais e loops, o computador pode pular para qualquer parte do arquivo. Entender exatamente qual linha executa apos qual e o que chamamos de **rastrear o fluxo de execucao**.\n\nPense no computador como um cursor invisivel que se move pelo codigo. Seu trabalho e simular mentalmente onde esse cursor esta a cada momento.\n\n### O que e "tracing" (rastreamento)?\n\nTracking e a tecnica de seguir um valor especifico atraves do codigo. Voce escolhe uma entrada — por exemplo, a lista `[1, 5, 2, 8, 3]` — e acompanha o que acontece com ela em cada passo.\n\nComo fazer:\n1. Escolha um valor de entrada concreto\n2. Execute cada linha MENTALMENTE, calculando os resultados\n3. Registre o estado de cada variavel apos cada linha\n4. Continue ate chegar ao retorno ou ao final\n\nIsso parece lento, mas e a tecnica mais eficaz para entender codigo desconhecido.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'def processar_numeros(valores):\n    resultado = 0\n    maiores = []\n\n    for v in valores:\n        if v > 3:\n            maiores.append(v)\n\n    for m in maiores:\n        resultado += m\n\n    if len(maiores) > 0:\n        media = resultado / len(maiores)\n    else:\n        media = 0\n\n    return media\n\n# Entrada: [1, 5, 2, 8, 3]\n#\n# Tracing passo a passo:\n# resultado = 0, maiores = []\n# Loop 1: v=1  -> 1 > 3? Nao. maiores = []\n# Loop 1: v=5  -> 5 > 3? Sim. maiores = [5]\n# Loop 1: v=2  -> 2 > 3? Nao. maiores = [5]\n# Loop 1: v=8  -> 8 > 3? Sim. maiores = [5, 8]\n# Loop 1: v=3  -> 3 > 3? Nao. maiores = [5, 8]\n# Loop 2: m=5  -> resultado = 0 + 5 = 5\n# Loop 2: m=8  -> resultado = 5 + 8 = 13\n# len(maiores) = 2 > 0? Sim. media = 13 / 2 = 6.5\n# Retorno: 6.5',
        filename: 'processar_numeros.py',
        description:
          'Veja como o tracing revela que a funcao filtra os numeros maiores que 3 e calcula a media deles. Sem o tracing, voce poderia pensar que ela calcula a media de todos os numeros.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use print() estrategicamente. Coloque um print no inicio de cada funcao: print(f"entrou em calcular_media com {valores}"). Isso revela o fluxo real de execucao — muito melhor do que adivinhar. Depois de confirmar seu entendimento, remova os prints.',
    },
    {
      type: 'text',
      content:
        '## Rastreando ramificacoes condicionais\n\nQuando o codigo tem `if/else`, voce precisa rastrear AMBOS os caminhos. Pergunte:\n\n- O que acontece quando a condicao e **verdadeira**?\n- O que acontece quando e **falsa**?\n- Quais sao os **casos extremos**? (lista vazia, None, numero negativo, zero)\n\nOs bugs mais comuns ficam exatamente nos casos extremos — as situacoes que o desenvolvedor original nao testou bem.\n\n### Dica: rastreie com valores extremos\n\nDepois de rastrear com um valor normal, sempre teste com:\n- **Lista vazia:** `[]`\n- **Um unico elemento:** `[42]`\n- **Valores negativos:** `[-1, -5]`\n- **Zero:** `[0]`\n\nSe o comportamento parecer errado em qualquer desses casos, voce encontrou um bug potencial.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'def classificar_nota(pontos):\n    if pontos < 0 or pontos > 100:\n        return "invalido"\n\n    if pontos >= 90:\n        conceito = "A"\n    elif pontos >= 80:\n        conceito = "B"\n    elif pontos >= 70:\n        conceito = "C"\n    elif pontos >= 60:\n        conceito = "D"\n    else:\n        conceito = "F"\n\n    if pontos >= 60:\n        situacao = "aprovado"\n    else:\n        situacao = "reprovado"\n\n    return f"{conceito} ({situacao})"\n\n# Tracing com 3 entradas diferentes:\n#\n# Entrada 1: pontos = 85\n# 85 < 0? Nao. 85 > 100? Nao. Continua.\n# 85 >= 90? Nao. 85 >= 80? Sim. conceito = "B"\n# 85 >= 60? Sim. situacao = "aprovado"\n# Retorno: "B (aprovado)"\n#\n# Entrada 2: pontos = 55\n# 55 < 0? Nao. 55 > 100? Nao. Continua.\n# Nenhum elif acima de 60 bate. conceito = "F"\n# 55 >= 60? Nao. situacao = "reprovado"\n# Retorno: "F (reprovado)"\n#\n# Entrada 3: pontos = -5\n# -5 < 0? Sim! Retorno imediato: "invalido"\n# (o resto do codigo nao executa)',
        filename: 'classificar_nota.py',
        description:
          'Rastreando a mesma funcao com 3 entradas diferentes, percebemos que o primeiro if age como uma "guard clause" — bloqueia entradas invalidas antes de qualquer logica.',
      },
    },
  ],
  challenges: [
    {
      id: 'fluxo-c1',
      title: 'Trace Este Codigo',
      description:
        'Para a entrada [3, 7, 1, 9, 4, 2], qual e o valor de cada variavel ao final de cada iteracao? Preencha a tabela de rastreamento nos comentarios sem executar o codigo.',
      language: 'python',
      starterCode:
        'def encontrar_segundo_maior(nums):\n    maior = nums[0]\n    segundo = None\n\n    for n in nums[1:]:\n        if n > maior:\n            segundo = maior\n            maior = n\n        elif segundo is None or n > segundo:\n            if n != maior:\n                segundo = n\n\n    return segundo\n\n# Entrada: [3, 7, 1, 9, 4, 2]\n#\n# Estado inicial: maior = 3, segundo = None\n#\n# Iteracao | n | n > maior? | segundo | maior\n# ---------|---|------------|---------|------\n#    1     | ? |     ?      |    ?    |   ?\n#    2     | ? |     ?      |    ?    |   ?\n#    3     | ? |     ?      |    ?    |   ?\n#    4     | ? |     ?      |    ?    |   ?\n#    5     | ? |     ?      |    ?    |   ?\n#\n# Retorno: ???\n',
      solution:
        'def encontrar_segundo_maior(nums):\n    maior = nums[0]\n    segundo = None\n\n    for n in nums[1:]:\n        if n > maior:\n            segundo = maior\n            maior = n\n        elif segundo is None or n > segundo:\n            if n != maior:\n                segundo = n\n\n    return segundo\n\n# Entrada: [3, 7, 1, 9, 4, 2]\n#\n# Estado inicial: maior = 3, segundo = None\n#\n# Iteracao | n | n > maior? | segundo | maior\n# ---------|---|------------|---------|------\n#    1     | 7 |    Sim     |    3    |   7\n#    2     | 1 |    Nao     |    3    |   7   (1 < 3, segundo nao muda)\n#    3     | 9 |    Sim     |    7    |   9\n#    4     | 4 |    Nao     |    7    |   9   (4 < 7, segundo nao muda)\n#    5     | 2 |    Nao     |    7    |   9   (2 < 7, segundo nao muda)\n#\n# Retorno: 7  (o segundo maior e 7)\n',
      hints: [
        'Comece com o estado inicial: maior = 3 (primeiro elemento), segundo = None. O loop começa no segundo elemento.',
        'A cada iteracao, verifique a condicao: n > maior? Se sim, segundo recebe o antigo maior, e maior recebe n.',
        'Se n nao e maior que maior, verifique o elif: n e maior que segundo? (e diferente de maior?) Se sim, segundo recebe n.',
      ],
    },
    {
      id: 'fluxo-c2',
      title: 'O Que Esta Funcao Retorna?',
      description:
        'Para cada funcao e entrada abaixo, determine o valor de retorno SEM executar o codigo. Escreva sua resposta e a justificativa nos comentarios.',
      language: 'python',
      starterCode:
        '# Funcao 1\ndef dobrar_pares(lista):\n    return [x * 2 for x in lista if x % 2 == 0]\n\n# dobrar_pares([1, 2, 3, 4, 5]) retorna: ???\n# dobrar_pares([1, 3, 5]) retorna: ???\n\n\n# Funcao 2\ndef contar_vogais(texto):\n    vogais = "aeiouAEIOU"\n    return sum(1 for c in texto if c in vogais)\n\n# contar_vogais("programacao") retorna: ???\n# contar_vogais("xyz") retorna: ???\n\n\n# Funcao 3\ndef inverter_dicionario(d):\n    return {v: k for k, v in d.items()}\n\n# inverter_dicionario({"a": 1, "b": 2}) retorna: ???\n# inverter_dicionario({}) retorna: ???\n',
      solution:
        '# Funcao 1\ndef dobrar_pares(lista):\n    return [x * 2 for x in lista if x % 2 == 0]\n\n# dobrar_pares([1, 2, 3, 4, 5]) retorna: [4, 8]\n# Justificativa: filtra pares (2 e 4) e dobra cada um: 2*2=4, 4*2=8\n#\n# dobrar_pares([1, 3, 5]) retorna: []\n# Justificativa: nenhum elemento e par, entao o filtro remove todos\n\n\n# Funcao 2\ndef contar_vogais(texto):\n    vogais = "aeiouAEIOU"\n    return sum(1 for c in texto if c in vogais)\n\n# contar_vogais("programacao") retorna: 5\n# Justificativa: vogais em "programacao" = o, a, a, a, o -> 5 vogais\n#\n# contar_vogais("xyz") retorna: 0\n# Justificativa: nenhuma letra de "xyz" esta na string de vogais\n\n\n# Funcao 3\ndef inverter_dicionario(d):\n    return {v: k for k, v in d.items()}\n\n# inverter_dicionario({"a": 1, "b": 2}) retorna: {1: "a", 2: "b"}\n# Justificativa: cada par chave-valor e invertido: chave vira valor e vice-versa\n#\n# inverter_dicionario({}) retorna: {}\n# Justificativa: dicionario vazio nao tem pares para inverter, retorna vazio\n',
      hints: [
        'Na Funcao 1, leia o list comprehension em duas partes: a condicao "if x % 2 == 0" filtra, e "x * 2" transforma o que passou.',
        'Na Funcao 2, "sum(1 for c in texto if c in vogais)" e equivalente a contar quantos caracteres do texto estao na string de vogais.',
        'Na Funcao 3, ".items()" retorna pares (chave, valor). O comprehension os inverte: {valor: chave}.',
      ],
    },
  ],
};
