import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'otimizando-solucoes',
  moduleId: 'resolucao-problemas',
  title: 'Quando Otimizar e Como Melhorar Solucoes',
  description:
    'Aprenda o principio "make it work, make it right, make it fast" -- por que otimizacao prematura e prejudicial, quando a performance realmente importa, e como refatorar codigo para torna-lo mais limpo e eficiente.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## A rascunho, a revisao e a versao final\n\nQuando um escritor precisa entregar um artigo, ele nao escreve a versao perfeita de uma vez. Ele segue tres fases:\n\n1. **Rascunho:** escreve tudo que sabe sobre o assunto, sem se preocupar com elegancia. O objetivo e colocar as ideias no papel e ter algo funcionando.\n2. **Revisao:** relê o texto, melhora a estrutura, remove repeticoes, corrige o raciocinio. O objetivo e fazer certo.\n3. **Polimento:** ajusta o vocabulario, cuida do ritmo das frases, refina os detalhes. So nesta fase ele se preocupa com o "como soa".\n\nProgramacao profissional funciona exatamente assim. O mantra e:\n\n> **"Make it work. Make it right. Make it fast."**\n> (Faca funcionar. Faca certo. Faca rapido.)\n\nEssa sequencia importa. Voce nao pula etapas.\n\n**Por que nao comecar otimizando?** Porque voce esta otimizando codigo que talvez precise ser jogado fora. Se voce nao entende o problema ainda, pode estar otimizando a solucao errada. Donald Knuth, um dos maiores cientistas da computacao de todos os tempos, disse: **"Otimizacao prematura e a raiz de todos os males."**\n\nPrimeiro faca o programa funcionar corretamente. Depois -- e so depois -- se o programa for lento ou ineficiente, voce otimiza.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A pergunta que voce deve fazer ANTES de otimizar: "Isso esta causando um problema real para o usuario?" Se a resposta for nao, nao otimize. Codigo mais simples e mais facil de ler, manter e depurar. Um programa que roda em 0.1 segundo versus 0.01 segundo: nenhum usuario vai notar. Otimize apenas quando houver um problema real de performance que impacta a experiencia.',
    },
    {
      type: 'text',
      content:
        '## Legibilidade primeiro: o codigo e lido muito mais do que e escrito\n\nUm codigo que so voce entende e um codigo a metade funcionando. Porque em duas semanas voce mesmo nao vai entender o que escreveu.\n\nConsidere estas duas versoes do mesmo calculo:\n\n**Versao obscura:**\n```python\nr = [x for x in d if x > t and x < t * 2]\nm = sum(r) / len(r) if r else 0\n```\n\n**Versao legivel:**\n```python\nvalores_validos = [valor for valor in dados if valor > limite_minimo and valor < limite_maximo]\nmedia_valores_validos = sum(valores_validos) / len(valores_validos) if valores_validos else 0\n```\n\nAs duas fazem a mesma coisa. Mas a segunda e lida em segundos; a primeira exige decifracao.\n\n**Principios de legibilidade:**\n- Nomes de variaveis descrevem o que armazenam: `media_notas` e melhor que `m`\n- Funcoes tem nomes de verbos: `calcular_media()`, nao `media()`\n- Uma funcao faz uma coisa: se voce precisar de "e" para explicar o que a funcao faz, ela faz demais\n- Comentarios explicam o "por que", nao o "o que" -- o codigo ja diz o que faz\n\n**Quando o codigo e legivel, otimizar fica mais facil.** Voce ve claramente onde esta o gargalo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Evolucao de um codigo: fase 1 (funciona), fase 2 (certo), fase 3 (eficiente)\n\n# =============================================\n# FASE 1: Faz funcionar -- codigo direto, sem elegancia\n# Objetivo: verificar se um numero e primo\n# =============================================\ndef e_primo_v1(n):\n    """Versao 1: funciona, mas verifica divisoes desnecessarias.\"\"\"\n    if n < 2:\n        return False\n    for i in range(2, n):  # Verifica TODOS os numeros ate n-1\n        if n % i == 0:\n            return False\n    return True\n\n# =============================================\n# FASE 2: Faz certo -- melhora a logica, mais legivel\n# =============================================\ndef e_primo_v2(n):\n    """Versao 2: trata casos especiais e usa logica mais clara.\"\"\"\n    if n < 2:\n        return False\n    if n == 2:\n        return True   # 2 e o unico primo par\n    if n % 2 == 0:\n        return False  # Pares maiores que 2 nunca sao primos\n    for i in range(3, n, 2):  # So verifica impares -- metade do trabalho\n        if n % i == 0:\n            return False\n    return True\n\n# =============================================\n# FASE 3: Faz rapido -- otimizacao matematica\n# Insight: se n nao tem divisores ate sqrt(n), e primo\n# =============================================\nimport math\n\ndef e_primo_v3(n):\n    """Versao 3: so verifica ate a raiz quadrada de n -- muito mais rapido.\"\"\"\n    if n < 2:\n        return False\n    if n == 2:\n        return True\n    if n % 2 == 0:\n        return False\n    limite = int(math.sqrt(n)) + 1  # A otimizacao: parar na raiz quadrada\n    for i in range(3, limite, 2):\n        if n % i == 0:\n            return False\n    return True\n\n\n# Comparacao de desempenho:\nimport time\n\nn_teste = 999983  # Um numero primo grande\n\nfor nome, func in [("v1", e_primo_v1), ("v2", e_primo_v2), ("v3", e_primo_v3)]:\n    inicio = time.time()\n    resultado = func(n_teste)\n    fim = time.time()\n    print(f"{nome}: {resultado} | tempo: {(fim - inicio) * 1000:.2f}ms")',
        filename: 'evolucao_primo.py',
        description:
          'A evolucao de um algoritmo em 3 fases. A v1 funciona. A v2 e mais correta e legivel. A v3 e a mais eficiente -- e so nessa fase a otimizacao matematica (raiz quadrada) entra. Rode e compare os tempos: a v3 e dezenas de vezes mais rapida que a v1 para numeros grandes.',
      },
    },
    {
      type: 'text',
      content:
        '## Tecnicas simples de refatoracao\n\nRefatorar e melhorar a estrutura interna do codigo sem mudar o que ele faz. E como reformar uma casa sem mudar o endereco.\n\n**Tecnica 1: Extrair funcoes**\nSe voce tem um bloco de codigo com mais de 5-7 linhas dentro de um loop ou condicional, provavelmente ele merece virar uma funcao com um nome descritivo.\n\n**Tecnica 2: Eliminar duplicacao**\nSe o mesmo bloco aparece duas vezes, extraia para uma funcao (principio DRY).\n\n**Tecnica 3: Renomear para clareza**\nUm bom rename pode eliminar a necessidade de um comentario inteiro. `x` vira `velocidade_media_kmh`; `f` vira `encontrou_resultado`.\n\n**Tecnica 4: Simplificar condicionais**\nCondicionais aninhados demais (if dentro de if dentro de if) sao dificeis de seguir. Use retorno antecipado (early return):\n\n```python\n# Complexo:\ndef processar(usuario):\n    if usuario is not None:\n        if usuario.ativo:\n            if usuario.idade >= 18:\n                return "Pode acessar"\n\n# Simples (early return):\ndef processar(usuario):\n    if usuario is None: return "Sem usuario"\n    if not usuario.ativo: return "Usuario inativo"\n    if usuario.idade < 18: return "Menor de idade"\n    return "Pode acessar"\n```\n\n**Tecnica 5: Escolher a estrutura de dados certa**\nUsar uma lista quando deveria usar um conjunto (set), ou um loop onde um dicionario serviria -- essas escolhas impactam a performance e a legibilidade ao mesmo tempo.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Antes de otimizar, meça. Use time.time() para cronometrar blocos de codigo ou a biblioteca timeit para medicoes precisas. So assim voce sabe se a otimizacao realmente fez diferenca -- e qual parte do codigo e o verdadeiro gargalo. Otimizar a parte errada e perda de tempo.',
    },
  ],
  challenges: [
    {
      id: 'opt-c1',
      title: 'Refatorando codigo desnecessariamente repetitivo',
      description:
        'O codigo abaixo funciona, mas esta mal escrito: tem codigo duplicado, variaveis com nomes ruins e faz tudo em um so bloco. Refatore-o para que fique legivel, sem duplicacao e bem organizado em funcoes. O resultado final deve ser identico.',
      language: 'python',
      starterCode:
        '# Codigo que funciona mas precisa de refatoracao\n# Ele calcula estatisticas de vendas de 3 meses\n\nm1 = [1200, 850, 1100, 950, 1300]\nm2 = [980, 1150, 800, 1250, 900]\nm3 = [1400, 1100, 1350, 900, 1200]\n\n# Mes 1\ns1 = 0\nfor x in m1:\n    s1 += x\na1 = s1 / len(m1)\nma1 = m1[0]\nmi1 = m1[0]\nfor x in m1:\n    if x > ma1: ma1 = x\n    if x < mi1: mi1 = x\nprint(f"Mes 1: media={a1:.0f}, max={ma1}, min={mi1}")\n\n# Mes 2\ns2 = 0\nfor x in m2:\n    s2 += x\na2 = s2 / len(m2)\nma2 = m2[0]\nmi2 = m2[0]\nfor x in m2:\n    if x > ma2: ma2 = x\n    if x < mi2: mi2 = x\nprint(f"Mes 2: media={a2:.0f}, max={ma2}, min={mi2}")\n\n# Mes 3\ns3 = 0\nfor x in m3:\n    s3 += x\na3 = s3 / len(m3)\nma3 = m3[0]\nmi3 = m3[0]\nfor x in m3:\n    if x > ma3: ma3 = x\n    if x < mi3: mi3 = x\nprint(f"Mes 3: media={a3:.0f}, max={ma3}, min={mi3}")\n',
      solution:
        'def analisar_vendas(vendas, nome_mes):\n    """Calcula e exibe media, maximo e minimo de uma lista de vendas.\"\"\"\n    soma = sum(vendas)\n    media = soma / len(vendas)\n    maximo = max(vendas)\n    minimo = min(vendas)\n    print(f"{nome_mes}: media={media:.0f}, max={maximo}, min={minimo}")\n\n\nvendas_mes1 = [1200, 850, 1100, 950, 1300]\nvendas_mes2 = [980, 1150, 800, 1250, 900]\nvendas_mes3 = [1400, 1100, 1350, 900, 1200]\n\nanalisar_vendas(vendas_mes1, "Mes 1")\nanalisar_vendas(vendas_mes2, "Mes 2")\nanalisar_vendas(vendas_mes3, "Mes 3")',
      hints: [
        'Observe que o bloco que calcula media, maximo e minimo se repete identico 3 vezes. Esse e o padrao para extrair para uma funcao.',
        'Crie a funcao analisar_vendas(vendas, nome_mes) que recebe a lista e o nome do mes. Dentro dela, calcule e imprima as 3 estatisticas.',
        'Voce pode usar as funcoes built-in do Python: sum(), max() e min() para tornar o codigo ainda mais simples e legivel.',
      ],
    },
    {
      id: 'opt-c2',
      title: 'Identificando o gargalo e otimizando',
      description:
        'A funcao abaixo verifica se dois textos sao anagramas (formados pelas mesmas letras, como "amor" e "roma"). A versao atual funciona, mas e lenta para textos longos porque usa uma abordagem ineficiente. Identifique o gargalo, implemente a versao eficiente, e compare as abordagens nos comentarios.',
      language: 'python',
      starterCode:
        '# Versao lenta: verifica anagramas comparando listas ordenadas\n# Esta versao e correta mas pode ser melhorada\nimport time\n\ndef sao_anagramas_lento(texto1, texto2):\n    """Versao lenta: ordena os caracteres e compara.\n    Funciona, mas tem overhead de ordenacao.\"\"\"\n    if len(texto1) != len(texto2):\n        return False\n    letras1 = sorted(texto1.lower().replace(" ", ""))\n    letras2 = sorted(texto2.lower().replace(" ", ""))\n    return letras1 == letras2\n\n\ndef sao_anagramas_rapido(texto1, texto2):\n    """Versao rapida: use um dicionario para contar a frequencia\n    de cada letra em cada texto. Se as frequencias forem iguais,\n    os textos sao anagramas.\n    Dica: crie um dict vazio, percorra cada letra do texto1\n    incrementando o contador, percorra texto2 decrementando.\n    Se ao final todos os valores forem 0, sao anagramas.\"\"\"\n    # Seu codigo aqui\n    pass\n\n\n# Testes\npares = [\n    ("amor", "roma"),\n    ("listen", "silent"),\n    ("python", "typhon"),\n    ("hello", "world"),\n]\n\nfor t1, t2 in pares:\n    lento = sao_anagramas_lento(t1, t2)\n    rapido = sao_anagramas_rapido(t1, t2)\n    print(f"({t1}, {t2}): lento={lento}, rapido={rapido}")\n',
      solution:
        'import time\n\ndef sao_anagramas_lento(texto1, texto2):\n    if len(texto1) != len(texto2):\n        return False\n    letras1 = sorted(texto1.lower().replace(" ", ""))\n    letras2 = sorted(texto2.lower().replace(" ", ""))\n    return letras1 == letras2\n\n\ndef sao_anagramas_rapido(texto1, texto2):\n    """Versao rapida: conta frequencia de letras com dicionario.\"\"\"\n    t1 = texto1.lower().replace(" ", "")\n    t2 = texto2.lower().replace(" ", "")\n\n    if len(t1) != len(t2):\n        return False\n\n    contagem = {}\n\n    # Incrementa para cada letra do texto1\n    for letra in t1:\n        contagem[letra] = contagem.get(letra, 0) + 1\n\n    # Decrementa para cada letra do texto2\n    for letra in t2:\n        contagem[letra] = contagem.get(letra, 0) - 1\n\n    # Se todos os valores sao 0, os textos sao anagramas\n    for valor in contagem.values():\n        if valor != 0:\n            return False\n    return True\n\n\npares = [\n    ("amor", "roma"),\n    ("listen", "silent"),\n    ("python", "typhon"),\n    ("hello", "world"),\n]\n\nfor t1, t2 in pares:\n    lento = sao_anagramas_lento(t1, t2)\n    rapido = sao_anagramas_rapido(t1, t2)\n    print(f"({t1}, {t2}): lento={lento}, rapido={rapido}")',
      hints: [
        'Para a versao rapida: crie um dicionario chamado contagem = {}. Para cada letra do texto1, incremente o contador: contagem[letra] = contagem.get(letra, 0) + 1.',
        'Para texto2, faca o inverso: decremente o contador para cada letra: contagem[letra] = contagem.get(letra, 0) - 1.',
        'Ao final, verifique se todos os valores no dicionario sao 0. Se algum for diferente de 0, ha uma letra a mais ou a menos, portanto nao sao anagramas.',
      ],
    },
  ],
};
