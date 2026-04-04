import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'padroes-e-reutilizacao',
  moduleId: 'resolucao-problemas',
  title: 'Reconhecendo Padroes e Reutilizando Solucoes',
  description:
    'Aprenda a enxergar padroes repetidos no seu codigo e na realidade, extrair esses padroes em funcoes reutilizaveis, e aplicar o principio DRY para escrever codigo mais limpo e poderoso.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O molho base que serve para tudo\n\nUm chef experiente de cozinha italiana sabe um segredo: varios pratos diferentes compartilham o mesmo molho base -- o soffritto. E uma mistura de azeite, alho e cebola dourados. Com esse mesmo molho base, voce pode fazer molho de tomate para macarrao, base para risoto, caldo para sopa e ate recheio para pizza.\n\nO chef nao prepara o soffritto do zero para cada prato. Ele reconhece que e o mesmo processo e aproveita -- ou faz uma porcao grande e reutiliza.\n\nIsso e exatamente o que um bom programador faz com o codigo.\n\nQuando voce escreve o mesmo bloco de codigo (ou algo muito parecido) duas, tres, quatro vezes em lugares diferentes, voce esta ignorando um padrao. E o codigo esta pedindo para ser transformado em uma **funcao reutilizavel**.\n\n### O principio DRY: Don\'t Repeat Yourself\n\n**DRY** (Nao Se Repita) e um dos principios mais fundamentais da programacao. Ele diz: **cada pedaco de conhecimento ou logica deve ter uma unica representacao no sistema.**\n\nQuando voce repete codigo, voce cria problemas:\n- Se precisar corrigir um bug, tem que corrigir em varios lugares\n- Se esquecer de atualizar um dos lugares, o programa fica inconsistente\n- O codigo fica maior, mais dificil de ler e manter\n\nO oposto do DRY e chamado de **WET**: Write Everything Twice (Escreva Tudo Duas Vezes). Codigo WET e um sinal de que voce nao reconheceu o padrao.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra dos tres: se voce escreveu o mesmo codigo uma vez, ok. Duas vezes, preste atencao. Tres vezes? Pare imediatamente e extraia uma funcao. Esse e o momento em que voce claramente identificou um padrao que merece ser reutilizado.',
    },
    {
      type: 'text',
      content:
        '## Padroes comuns que todo programador deve reconhecer\n\nExistem alguns padroes que aparecem em quase todo programa. Reconhece-los e como aprender as notas musicais: depois que voce as conhece, consegue ler qualquer musica.\n\n**Padrao 1: Acumulacao**\nUsado quando voce precisa somar, concatenar ou acumular valores ao longo de uma lista.\n```\ntotal = 0\nfor item in lista:\n    total = total + item\n```\n\n**Padrao 2: Contagem**\nUsado quando voce precisa contar quantos elementos satisfazem uma condicao.\n```\ncontador = 0\nfor item in lista:\n    if condicao(item):\n        contador = contador + 1\n```\n\n**Padrao 3: Busca de maximo/minimo**\nUsado para encontrar o maior ou menor valor.\n```\nmaior = lista[0]\nfor item in lista:\n    if item > maior:\n        maior = item\n```\n\n**Padrao 4: Filtragem**\nUsado quando voce quer selecionar apenas os elementos que satisfazem uma condicao.\n```\nselecionados = []\nfor item in lista:\n    if condicao(item):\n        selecionados.append(item)\n```\n\nVeja como esses padroes se repetem em todo tipo de programa -- vendas, notas, estoque, temperatura. A estrutura e sempre a mesma; so o contexto muda.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ANTES: codigo WET (repetido, sem reconhecer o padrao)\n# Imagine que voce precisa calcular a media de vendas, a media de notas\n# e a media de temperaturas. Sem reconhecer o padrao:\n\nvendas = [1200, 850, 1500, 920, 1100]\nsoma_vendas = 0\nfor v in vendas:\n    soma_vendas += v\nmedia_vendas = soma_vendas / len(vendas)\nprint(f"Media de vendas: {media_vendas:.2f}")\n\nnotas = [7.5, 8.0, 6.5, 9.0, 5.5]\nsoma_notas = 0\nfor n in notas:\n    soma_notas += n\nmedia_notas = soma_notas / len(notas)\nprint(f"Media de notas: {media_notas:.2f}")\n\ntemperaturas = [28.5, 30.1, 27.8, 31.2, 29.0]\nsoma_temp = 0\nfor t in temperaturas:\n    soma_temp += t\nmedia_temp = soma_temp / len(temperaturas)\nprint(f"Media de temperaturas: {media_temp:.2f}")\n\n# ^^^ 15 linhas de logica repetida. Se tiver um bug, corrijo em 3 lugares!\n\nprint("\\n--- DEPOIS: codigo DRY (padrao extraido para funcao) ---\\n")\n\n# DEPOIS: codigo DRY -- padrao de acumulacao extraido em uma funcao\ndef calcular_media(valores, rotulo):\n    """Padrao de acumulacao + divisao, reutilizavel para qualquer lista.\"\"\"\n    soma = 0\n    for v in valores:\n        soma += v\n    media = soma / len(valores)\n    print(f"Media de {rotulo}: {media:.2f}")\n    return media\n\n# Agora 3 linhas fazem o mesmo que 15!\ncalcular_media([1200, 850, 1500, 920, 1100], "vendas")\ncalcular_media([7.5, 8.0, 6.5, 9.0, 5.5], "notas")\ncalcular_media([28.5, 30.1, 27.8, 31.2, 29.0], "temperaturas")\n# Se tiver um bug, corrijo em 1 unico lugar!',
        filename: 'dry_vs_wet.py',
        description:
          'Comparacao direta entre codigo WET (repetido, 15 linhas) e codigo DRY (reutilizavel, 3 linhas de uso). O padrao de acumulacao foi extraido para a funcao calcular_media() e agora pode ser usado com qualquer lista e qualquer contexto.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Usando os 4 padroes fundamentais em um sistema de estoque\n\nprodutos = [\n    {"nome": "Camisa",   "preco": 59.90,  "quantidade": 15},\n    {"nome": "Calca",    "preco": 129.90, "quantidade": 3},\n    {"nome": "Tenis",    "preco": 249.90, "quantidade": 0},\n    {"nome": "Bone",     "preco": 39.90,  "quantidade": 8},\n    {"nome": "Jaqueta",  "preco": 189.90, "quantidade": 1},\n]\n\n# PADRAO 1: Acumulacao -- valor total em estoque\ndef valor_total_estoque(produtos):\n    total = 0\n    for p in produtos:\n        total += p["preco"] * p["quantidade"]  # preco * quantidade\n    return total\n\n# PADRAO 2: Contagem -- quantos produtos estao em falta\ndef contar_em_falta(produtos):\n    contador = 0\n    for p in produtos:\n        if p["quantidade"] == 0:\n            contador += 1\n    return contador\n\n# PADRAO 3: Busca de maximo -- produto mais caro\ndef produto_mais_caro(produtos):\n    mais_caro = produtos[0]\n    for p in produtos:\n        if p["preco"] > mais_caro["preco"]:\n            mais_caro = p\n    return mais_caro\n\n# PADRAO 4: Filtragem -- produtos com estoque baixo (menos de 5)\ndef estoque_baixo(produtos, minimo=5):\n    selecionados = []\n    for p in produtos:\n        if p["quantidade"] < minimo and p["quantidade"] > 0:\n            selecionados.append(p)\n    return selecionados\n\n\n# Usando todos os padroes:\nprint(f"Valor total em estoque: R${valor_total_estoque(produtos):.2f}")\nprint(f"Produtos em falta: {contar_em_falta(produtos)}")\nmc = produto_mais_caro(produtos)\nprint(f"Produto mais caro: {mc[\'nome\']} (R${mc[\'preco\']:.2f})")\nprint("Produtos com estoque baixo:")\nfor p in estoque_baixo(produtos):\n    print(f"  - {p[\'nome\']}: apenas {p[\'quantidade\']} unidade(s)")',
        filename: 'padroes_estoque.py',
        description:
          'Os 4 padroes fundamentais aplicados a um sistema de estoque real. Cada padrao e uma funcao reutilizavel com nome descritivo. Repare como o codigo e facil de ler: o nome da funcao ja explica o que ela faz.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Como nomear suas funcoes: um bom nome de funcao e como um titulo de capitulo de livro -- quem le ja sabe o que vai encontrar. Use verbos + substantivos: calcular_media(), contar_aprovados(), encontrar_maximo(), filtrar_inativos(). Evite nomes vagos como fazer_coisa() ou processar(). Um nome claro e metade da documentacao.',
    },
  ],
  challenges: [
    {
      id: 'pr-c1',
      title: 'Identificando e extraindo um padrao repetido',
      description:
        'O codigo abaixo calcula o total de pontos de tres jogadores de formas diferentes mas identicas. Identifique o padrao repetido e refatore: crie uma funcao calcular_total_pontos(rodadas) que recebe uma lista de pontos por rodada e retorna o total. Use-a para os tres jogadores.',
      language: 'python',
      starterCode:
        '# Codigo WET -- mesmo padrao repetido 3 vezes\n# Jogador 1\nrodadas_ana = [8, 5, 10, 7, 9]\ntotal_ana = 0\nfor pontos in rodadas_ana:\n    total_ana += pontos\nprint(f"Ana: {total_ana} pontos")\n\n# Jogador 2\nrodadas_bruno = [6, 9, 4, 8, 7]\ntotal_bruno = 0\nfor pontos in rodadas_bruno:\n    total_bruno += pontos\nprint(f"Bruno: {total_bruno} pontos")\n\n# Jogador 3\nrodadas_carla = [10, 10, 8, 9, 10]\ntotal_carla = 0\nfor pontos in rodadas_carla:\n    total_carla += pontos\nprint(f"Carla: {total_carla} pontos")\n\n# Seu desafio: transforme o codigo acima em codigo DRY\n# Crie a funcao calcular_total_pontos(rodadas) e use-a\n# para calcular o total dos 3 jogadores\n\n# def calcular_total_pontos(rodadas):\n#     ...\n',
      solution:
        '# Funcao reutilizavel que extrai o padrao de acumulacao\ndef calcular_total_pontos(rodadas):\n    """Calcula o total de pontos somando todas as rodadas."""\n    total = 0\n    for pontos in rodadas:\n        total += pontos\n    return total\n\n\n# Codigo DRY: mesma logica, sem repeticao\nrodadas_ana   = [8, 5, 10, 7, 9]\nrodadas_bruno = [6, 9, 4, 8, 7]\nrodadas_carla = [10, 10, 8, 9, 10]\n\nprint(f"Ana: {calcular_total_pontos(rodadas_ana)} pontos")\nprint(f"Bruno: {calcular_total_pontos(rodadas_bruno)} pontos")\nprint(f"Carla: {calcular_total_pontos(rodadas_carla)} pontos")',
      hints: [
        'Observe que o codigo dos 3 jogadores e identico, so muda o nome da variavel. Isso e exatamente o que a funcao vai abstrair -- o nome da variavel some e vira um parametro.',
        'Crie a funcao: def calcular_total_pontos(rodadas): com um loop que acumula os pontos e retorna o total no final.',
        'Substitua cada bloco repetido por uma chamada a funcao: calcular_total_pontos(rodadas_ana). A funcao recebe a lista e devolve o total.',
      ],
    },
    {
      id: 'pr-c2',
      title: 'Implementando o padrao de acumulacao condicional',
      description:
        'Implemente tres funcoes que usam padroes diferentes para analisar uma lista de vendas diarias (em reais): (1) somar_acima_de(vendas, minimo) que soma apenas as vendas acima de um valor minimo; (2) contar_abaixo_de(vendas, limite) que conta quantas vendas ficaram abaixo do limite; (3) media_filtrada(vendas, minimo) que calcula a media apenas das vendas acima do minimo.',
      language: 'python',
      starterCode:
        '# Vendas diarias da semana (em reais)\nvendas = [450.0, 1200.0, 380.0, 890.0, 1500.0, 220.0, 975.0]\n\n# Padrao de acumulacao condicional\ndef somar_acima_de(vendas, minimo):\n    """Soma apenas as vendas acima do valor minimo.\"\"\"\n    # Use o padrao: total = 0, for v in vendas, if v > minimo, total += v\n    pass\n\n# Padrao de contagem condicional\ndef contar_abaixo_de(vendas, limite):\n    """Conta quantas vendas ficaram abaixo do limite.\"\"\"\n    # Use o padrao: contador = 0, for v in vendas, if v < limite, contador += 1\n    pass\n\n# Combinando padroes: filtragem + acumulacao + contagem\ndef media_filtrada(vendas, minimo):\n    """Calcula a media apenas das vendas acima do minimo.\"\"\"\n    # Dica: use somar_acima_de() e count the elements above minimo\n    pass\n\n\n# Teste suas funcoes:\nprint(f"Vendas: {vendas}")\nprint(f"Total de vendas acima de R$500: R${somar_acima_de(vendas, 500):.2f}")\nprint(f"Dias com vendas abaixo de R$400: {contar_abaixo_de(vendas, 400)}")\nprint(f"Media das vendas acima de R$500: R${media_filtrada(vendas, 500):.2f}")\n',
      solution:
        'vendas = [450.0, 1200.0, 380.0, 890.0, 1500.0, 220.0, 975.0]\n\ndef somar_acima_de(vendas, minimo):\n    """Soma apenas as vendas acima do valor minimo.\"\"\"\n    total = 0\n    for v in vendas:\n        if v > minimo:\n            total += v\n    return total\n\ndef contar_abaixo_de(vendas, limite):\n    """Conta quantas vendas ficaram abaixo do limite.\"\"\"\n    contador = 0\n    for v in vendas:\n        if v < limite:\n            contador += 1\n    return contador\n\ndef media_filtrada(vendas, minimo):\n    """Calcula a media apenas das vendas acima do minimo.\"\"\"\n    total = 0\n    quantidade = 0\n    for v in vendas:\n        if v > minimo:\n            total += v\n            quantidade += 1\n    if quantidade == 0:\n        return 0\n    return total / quantidade\n\n\nprint(f"Vendas: {vendas}")\nprint(f"Total de vendas acima de R$500: R${somar_acima_de(vendas, 500):.2f}")\nprint(f"Dias com vendas abaixo de R$400: {contar_abaixo_de(vendas, 400)}")\nprint(f"Media das vendas acima de R$500: R${media_filtrada(vendas, 500):.2f}")',
      hints: [
        'Para somar_acima_de: comece com total = 0. No loop, verifique if v > minimo antes de somar. Retorne total no final.',
        'Para contar_abaixo_de: comece com contador = 0. No loop, verifique if v < limite antes de incrementar. Retorne contador.',
        'Para media_filtrada: acumule a soma E a quantidade de elementos que passam no filtro. A media e soma / quantidade. Atencao ao caso onde quantidade == 0 para evitar divisao por zero.',
      ],
    },
  ],
};
