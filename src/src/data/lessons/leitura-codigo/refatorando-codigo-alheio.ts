import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'refatorando-codigo-alheio',
  moduleId: 'leitura-codigo',
  title: 'Refatorando Codigo de Outras Pessoas',
  description: 'Como melhorar codigo que voce nao escreveu sem quebrar nada',
  order: 4,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## A regra numero um da refatoracao\n\nNunca refatore codigo que voce nao entende completamente. Esse e o erro mais comum — e o mais perigoso.\n\nAquele bloco de codigo que parece inutilizado pode estar tratando um caso extremo rarissimo que acontece apenas em producao. Aquela variavel com nome estranho pode ter um motivo historico. Aquele `if` aparentemente redundante pode estar protegendo contra um bug que ja custou horas de depuracao.\n\n### Antes de mudar qualquer coisa:\n\n**Passo 1 — Entenda completamente**\nVoce consegue explicar o que o codigo faz para um colega? Se nao, nao refatore ainda.\n\n**Passo 2 — Identifique os casos extremos**\nQuais entradas especiais o codigo trata? Lista vazia? None? Numero negativo? Esses casos sao o que mais importa.\n\n**Passo 3 — Escreva (ou verifique) os testes ANTES**\nSe nao existem testes, escreva-os antes de mudar qualquer coisa. Testes documentam o comportamento esperado e alertam quando voce quebra algo.\n\n**Passo 4 — Faca mudancas pequenas e incrementais**\nNao refatore tudo de uma vez. Mude uma coisa, teste. Mude outra, teste.\n\n**Passo 5 — Teste apos cada mudanca**\nNao acumule mudancas. Cada mudanca individual deve ser verificada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Funcao original: funciona, mas e dificil de ler\ndef proc(d, t):\n    r = []\n    for i in range(len(d)):\n        x = d[i]\n        if x["s"] == 1:\n            if x["v"] >= t:\n                r.append(x)\n    if len(r) == 0:\n        return None\n    b = r[0]\n    for i in range(1, len(r)):\n        if r[i]["v"] > b["v"]:\n            b = r[i]\n    return b',
        filename: 'antes_refatoracao.py',
        description:
          'Esta funcao funciona, mas e quase ilegivel: nomes de variavel de uma letra (d, t, r, x, b, i), logica aninhada, loop manual onde range+len nao e necessario. Antes de refatorar, entenda completamente o que ela faz.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A regra de ouro da refatoracao: o comportamento externo nao deve mudar. Se a funcao retornava 42 para a entrada [1,2,3], ela deve continuar retornando 42 apos a refatoracao. Qualquer mudanca de comportamento e um bug introduzido, nao uma melhoria.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ETAPA 1: Renomear variaveis (mais seguro)\ndef proc(dados, threshold):\n    resultado = []\n    for i in range(len(dados)):\n        item = dados[i]\n        if item["s"] == 1:\n            if item["v"] >= threshold:\n                resultado.append(item)\n    if len(resultado) == 0:\n        return None\n    melhor = resultado[0]\n    for i in range(1, len(resultado)):\n        if resultado[i]["v"] > melhor["v"]:\n            melhor = resultado[i]\n    return melhor\n\n\n# ETAPA 2: Modernizar loops (depois de entender a logica)\ndef proc(dados, threshold):\n    resultado = []\n    for item in dados:              # elimina range(len())\n        if item["s"] == 1 and item["v"] >= threshold:\n            resultado.append(item)\n    if not resultado:               # Pythonica: "if not lista"\n        return None\n    melhor = resultado[0]\n    for item in resultado[1:]:\n        if item["v"] > melhor["v"]:\n            melhor = item\n    return melhor\n\n\n# ETAPA 3: Extrair sub-funcoes e renomear a principal\ndef filtrar_ativos_acima_do_limite(itens, limite_minimo):\n    return [\n        item for item in itens\n        if item["status"] == 1 and item["valor"] >= limite_minimo\n    ]\n\ndef encontrar_maior_valor(itens):\n    if not itens:\n        return None\n    return max(itens, key=lambda item: item["valor"])\n\ndef buscar_melhor_item_ativo(dados, threshold):\n    candidatos = filtrar_ativos_acima_do_limite(dados, threshold)\n    return encontrar_maior_valor(candidatos)',
        filename: 'depois_refatoracao.py',
        description:
          'A refatoracao em 3 etapas progressivas. Perceba que o comportamento final e identico — mas agora qualquer desenvolvedor entende o que buscar_melhor_item_ativo faz so pelo nome.',
      },
    },
    {
      type: 'text',
      content:
        '## Movimentos seguros de refatoracao\n\nNem toda refatoracao tem o mesmo risco. Aqui estao os movimentos do mais seguro para o mais arriscado:\n\n**Renomear variavel** (risco quase zero)\nMuda apenas a legibilidade. Ferramentas de IDE fazem isso automaticamente em todos os lugares.\n\n**Extrair funcao** (risco baixo)\nSe voce verificar todos os pontos de chamada e nao mudar a interface, e seguro.\n\n**Simplificar condicao** (risco medio)\nVerifique com casos extremos. `if x > 0 and x < 10` e `if 0 < x < 10` sao equivalentes, mas `if not x` vs `if x == 0` podem nao ser.\n\n**Remover codigo morto** (risco medio-alto)\nSo remova codigo que voce tem CERTEZA que e inalcancavel. Codigo comentado as vezes esta ali por um motivo.',
    },
  ],
  challenges: [
    {
      id: 'refatorar-c1',
      title: 'Refatore Esta Funcao',
      description:
        'Refatore a funcao abaixo para melhorar a legibilidade sem mudar o comportamento. Os casos de teste devem continuar passando.',
      language: 'python',
      starterCode:
        'def calc(l, d):\n    t = 0\n    for i in range(len(l)):\n        x = l[i]\n        if x > 0:\n            t = t + x\n    if t == 0:\n        return 0\n    r = t\n    if d == "p":\n        r = t * 1.1\n    elif d == "g":\n        r = t * 1.2\n    elif d == "m":\n        r = t * 0.9\n    return round(r, 2)\n\n# Casos de teste (devem continuar funcionando apos refatoracao):\n# calc([10, -5, 20, 0, 15], "p") deve retornar 49.5\n# calc([10, -5, 20, 0, 15], "g") deve retornar 54.0\n# calc([10, -5, 20, 0, 15], "m") deve retornar 40.5\n# calc([-1, -2, -3], "p")        deve retornar 0\n# calc([], "p")                  deve retornar 0\n',
      solution:
        'def calcular_total_com_desconto(precos, categoria):\n    """Soma os precos positivos e aplica multiplicador por categoria."""\n    total_positivos = sum(p for p in precos if p > 0)\n\n    if total_positivos == 0:\n        return 0\n\n    multiplicadores = {\n        "p": 1.1,   # pequeno: acrescimo de 10%\n        "g": 1.2,   # grande: acrescimo de 20%\n        "m": 0.9,   # medio: desconto de 10%\n    }\n\n    multiplicador = multiplicadores.get(categoria, 1.0)\n    return round(total_positivos * multiplicador, 2)\n\n# Casos de teste (agora com funcao renomeada):\n# calcular_total_com_desconto([10, -5, 20, 0, 15], "p") -> 49.5\n# calcular_total_com_desconto([10, -5, 20, 0, 15], "g") -> 54.0\n# calcular_total_com_desconto([10, -5, 20, 0, 15], "m") -> 40.5\n# calcular_total_com_desconto([-1, -2, -3], "p")        -> 0\n# calcular_total_com_desconto([], "p")                  -> 0\n',
      hints: [
        'Comece entendendo o que calc faz: soma apenas os positivos de uma lista, depois aplica um multiplicador por categoria ("p", "g", "m").',
        'Renomeie: l -> precos, d -> categoria, t -> total_positivos, r -> resultado. So isso ja melhora muito a legibilidade.',
        'O bloco if/elif para categoria pode ser substituido por um dicionario de multiplicadores: {"p": 1.1, "g": 1.2, "m": 0.9}.',
      ],
    },
    {
      id: 'refatorar-c2',
      title: 'O Que Esta Mudanca Quebrou?',
      description:
        'Compare a funcao original com a versao "refatorada". Identifique o que mudou e como isso quebra um caso especifico.',
      language: 'python',
      starterCode:
        '# VERSAO ORIGINAL\ndef calcular_desconto(preco, cupom):\n    if cupom == "DESCONTO10":\n        desconto = preco * 0.10\n    elif cupom == "DESCONTO20":\n        desconto = preco * 0.20\n    else:\n        desconto = 0\n\n    preco_final = preco - desconto\n    if preco_final < 0:\n        preco_final = 0\n    return round(preco_final, 2)\n\n\n# VERSAO "REFATORADA"\ndef calcular_desconto_v2(preco, cupom):\n    descontos = {"DESCONTO10": 0.10, "DESCONTO20": 0.20}\n    desconto = descontos.get(cupom, 0)\n    return round(preco - preco * desconto, 2)\n\n\n# PERGUNTA:\n# Em qual caso de entrada calcular_desconto_v2 se comporta diferente\n# da versao original? Qual e o impacto?\n#\n# Caso que quebra:\n# ???\n#\n# Por que e um bug:\n# ???\n#\n# Como corrigir:\n# ???\n',
      solution:
        '# VERSAO ORIGINAL\ndef calcular_desconto(preco, cupom):\n    if cupom == "DESCONTO10":\n        desconto = preco * 0.10\n    elif cupom == "DESCONTO20":\n        desconto = preco * 0.20\n    else:\n        desconto = 0\n\n    preco_final = preco - desconto\n    if preco_final < 0:\n        preco_final = 0\n    return round(preco_final, 2)\n\n\n# VERSAO "REFATORADA"\ndef calcular_desconto_v2(preco, cupom):\n    descontos = {"DESCONTO10": 0.10, "DESCONTO20": 0.20}\n    desconto = descontos.get(cupom, 0)\n    return round(preco - preco * desconto, 2)\n\n\n# PERGUNTA:\n# Em qual caso de entrada calcular_desconto_v2 se comporta diferente?\n#\n# Caso que quebra:\n# calcular_desconto(-50, "DESCONTO10")    -> original retorna 0\n# calcular_desconto_v2(-50, "DESCONTO10") -> retorna -45.0\n#\n# Por que e um bug:\n# A versao original tem uma guard "if preco_final < 0: preco_final = 0"\n# que garante que o preco nunca seja negativo (protege contra precos invalidos).\n# A versao refatorada removeu essa protecao silenciosamente.\n# Em producao, um preco negativo pode causar estorno incorreto, bug contabil\n# ou explorar uma vulnerabilidade de seguranca.\n#\n# Como corrigir:\n# def calcular_desconto_v2(preco, cupom):\n#     descontos = {"DESCONTO10": 0.10, "DESCONTO20": 0.20}\n#     desconto = descontos.get(cupom, 0)\n#     preco_final = preco - preco * desconto\n#     return round(max(0, preco_final), 2)  # preserva a protecao contra negativo\n',
      hints: [
        'Compare as duas funcoes linha por linha. O que existe na original que nao existe na v2?',
        'Foque no bloco "if preco_final < 0" — ele existe por algum motivo. O que acontece se preco for negativo?',
        'Teste mentalmente: calcular_desconto(-50, "DESCONTO10"). Trace cada versao e compare os resultados.',
      ],
    },
  ],
};
