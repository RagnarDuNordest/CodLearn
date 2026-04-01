import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'documentando-o-pensamento',
  moduleId: 'estrutura-pensamento',
  title: 'Documentando seu Raciocinio',
  description:
    'Aprenda a escrever pseudocodigo eficaz, comentar codigo de forma util e documentar seu raciocinio antes de comecar a programar -- habitos que separam desenvolvedores bons de excelentes.',
  order: 4,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## Por que documentar antes de codar?\n\nExiste uma citacao famosa na engenharia de software: "O codigo e lido muito mais vezes do que escrito." Voce vai reler seu proprio codigo daqui a 6 meses e nao vai lembrar por que fez as escolhas que fez. Seu colega vai tentar entender o que voce escreveu sem ter estado presente quando voce pensou na solucao.\n\nDocumentar o raciocinio e como deixar uma carta para o futuro: para voce mesmo, para seus colegas, e para qualquer pessoa que precisar manter o codigo.\n\n### O problema do codigo sem documentacao\n\nVeja este codigo real encontrado em um sistema em producao:\n\n```python\ndef f(x, y, z):\n    a = x * 0.0625\n    b = y * a\n    if z == 1:\n        return b * 1.15\n    return b\n```\n\nPerguntas que surgem imediatamente:\n- O que essa funcao faz?\n- O que sao x, y e z?\n- Por que 0.0625? Por que 1.15? Por que z == 1?\n\nMeses depois, nem o proprio autor consegue responder rapidamente. Isso e um custo real para a empresa e para o time.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Boa documentacao nao e sobre escrever muito -- e sobre escrever o que nao esta obvio. Um comentario que diz "soma dois numeros" antes de "resultado = a + b" e inutil. Um comentario que diz "0.0625 = 1/16, fracao padrao do setor X definida pela norma ABNT Y" e valioso. Comente o POR QUE, nao o O QUE.',
    },
    {
      type: 'text',
      content:
        '## Pseudocodigo: a ponte entre a ideia e o codigo\n\n**Pseudocodigo** e uma descricao estruturada de um algoritmo em linguagem natural, usando uma estrutura parecida com codigo mas sem seguir a sintaxe exata de nenhuma linguagem.\n\nE o rascunho antes da versao final.\n\n### Pseudocodigo ruim vs. bom\n\n**Pseudocodigo ruim** (muito vago):\n```\n1. Pegar as notas\n2. Calcular\n3. Mostrar resultado\n```\n\n**Pseudocodigo bom** (especifico o suficiente para virar codigo):\n```\nINICIO\n  RECEBER nota1, nota2, nota3\n  media = (nota1 + nota2 + nota3) / 3\n  SE media >= 7.0 ENTAO\n    situacao = "Aprovado"\n  SENAO SE media >= 5.0 ENTAO\n    situacao = "Recuperacao"\n  SENAO\n    situacao = "Reprovado"\n  FIM SE\n  EXIBIR "Media:", media\n  EXIBIR "Situacao:", situacao\nFIM\n```\n\nPerceba: o pseudocodigo bom e quase diretamente traduzivel para Python. Cada linha mapeia para uma instrucao real.\n\n### Comentarios: bons vs. ruins\n\n**Comentario inutil** (repete o que o codigo ja diz):\n```python\n# Soma a e b\nresultado = a + b\n```\n\n**Comentario util** (explica o porque e o contexto):\n```python\n# WORKAROUND: a API retorna preco em centavos, dividimos por 100\n# para converter para reais. Ver issue #342 para contexto.\npreco_reais = preco_centavos / 100\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# DOCUMENTACAO ANTES DO CODIGO\n#\n# Problema: calcular o salario liquido de um funcionario\n#\n# PSEUDOCODIGO:\n#   RECEBER salario_bruto, horas_extras, dependentes\n#   calcular valor das horas extras (hora_extra = salario_bruto / 220 * 1.5)\n#   total_bruto = salario_bruto + (horas_extras * hora_extra)\n#   calcular INSS (tabela simplificada):\n#     SE total_bruto <= 1412: inss = 7.5%\n#     SE total_bruto <= 2666: inss = 9%\n#     SENAO: inss = 12%\n#   desconto_dependente = 189.59 por dependente (valor tabela IRRF 2024)\n#   base_irrf = total_bruto - inss - (dependentes * 189.59)\n#   calcular IRRF sobre base_irrf (tabela simplificada)\n#   salario_liquido = total_bruto - inss - irrf\n#   EXIBIR resumo do holerite\n\ndef calcular_holerite(salario_bruto, horas_extras, dependentes):\n    # Calculo de horas extras: hora normal * 1.5 (adicional de 50%)\n    # 220 = horas mensais padrao da CLT brasileira\n    valor_hora = salario_bruto / 220\n    valor_horas_extras = horas_extras * valor_hora * 1.5\n    total_bruto = salario_bruto + valor_horas_extras\n\n    # INSS: aliquota depende da faixa salarial (tabela simplificada)\n    if total_bruto <= 1412:\n        inss = total_bruto * 0.075   # 7.5% - faixa 1\n    elif total_bruto <= 2666:\n        inss = total_bruto * 0.09    # 9.0% - faixa 2\n    else:\n        inss = total_bruto * 0.12    # 12.0% - faixa 3\n\n    # Deducao por dependente no IRRF: R$ 189.59 por dependente\n    # (valor oficial da tabela IRRF para 2024)\n    deducao_dependentes = dependentes * 189.59\n    base_irrf = total_bruto - inss - deducao_dependentes\n\n    # IRRF simplificado: 0% ate 2824, 7.5% acima disso\n    if base_irrf <= 2824:\n        irrf = 0\n    else:\n        irrf = (base_irrf - 2824) * 0.075\n\n    salario_liquido = total_bruto - inss - irrf\n\n    # Exibir holerite\n    print("=== HOLERITE ===")\n    print("Salario bruto:     R$", round(salario_bruto, 2))\n    print("Horas extras:      R$", round(valor_horas_extras, 2))\n    print("Total bruto:       R$", round(total_bruto, 2))\n    print("Desconto INSS:    -R$", round(inss, 2))\n    print("Desconto IRRF:    -R$", round(irrf, 2))\n    print("Salario liquido:   R$", round(salario_liquido, 2))\n\ncalcular_holerite(3000.00, 8, 2)',
        filename: 'holerite_documentado.py',
        description:
          'Veja como o pseudocodigo no topo guiou cada parte da implementacao. Os comentarios explicam o porque dos numeros magicos (220 horas CLT, 189.59 valor IRRF) -- sem eles, esses numeros seriam completamente opacos.',
      },
    },
    {
      type: 'text',
      content:
        '## Comentando codigo de forma profissional\n\nExiste uma hierarquia de documentacao em codigo profissional:\n\n### 1. Docstring da funcao (o que, para quem, exemplos)\n```python\ndef calcular_imc(peso_kg, altura_m):\n    """\n    Calcula o Indice de Massa Corporal (IMC).\n\n    Args:\n        peso_kg: Peso da pessoa em quilogramas (ex: 70.5)\n        altura_m: Altura da pessoa em metros (ex: 1.75)\n\n    Returns:\n        IMC calculado como float. Classificacao:\n        < 18.5: abaixo do peso\n        18.5 - 24.9: peso normal\n        >= 25: acima do peso\n    """\n    return peso_kg / (altura_m ** 2)\n```\n\n### 2. Comentarios de bloco (explicam uma secao do codigo)\n```python\n# Normalizar os dados antes de processar:\n# A API retorna strings com espacos, precisamos limpar\nfor item in dados_brutos:\n    item = item.strip().lower()\n```\n\n### 3. Comentarios de linha (apenas para casos nao obvios)\n```python\ndef calcular_juros(principal, taxa, meses):\n    return principal * (1 + taxa) ** meses  # juros compostos\n```\n\n**O que NUNCA comentar:**\n- Coisas obvias que o proprio codigo ja diz\n- Codigo desativado (delete, nao comente)\n- Datas e nomes de quem escreveu (isso e funcao do git)',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Antes de escrever qualquer funcao, escreva a docstring primeiro. Isso forca voce a pensar: o que essa funcao recebe? O que ela retorna? Quais sao os casos especiais? Se voce nao consegue escrever a docstring claramente, voce ainda nao entendeu o suficiente o problema para comecar a codar.',
    },
  ],
  challenges: [
    {
      id: 'documentacao-c1',
      title: 'Pseudocodigo Antes da Implementacao',
      description:
        'Voce deve criar um programa que verifica se um ano e bissexto. As regras sao: um ano e bissexto se for divisivel por 4; EXCETO se for divisivel por 100, nao e bissexto; EXCETO se for divisivel por 400, entao e bissexto. Primeiro complete o pseudocodigo nos comentarios, depois implemente a funcao.',
      language: 'python',
      starterCode:
        '# PSEUDOCODIGO (complete antes de implementar):\n#\n# FUNCAO verificar_bissexto(ano):\n#   SE _____________________________ ENTAO\n#     RETORNAR True  (divisivel por 400: sempre bissexto)\n#   SENAO SE _____________________________ ENTAO\n#     RETORNAR False (divisivel por 100 mas nao 400: nao bissexto)\n#   SENAO SE _____________________________ ENTAO\n#     RETORNAR True  (divisivel por 4 mas nao por 100: bissexto)\n#   SENAO\n#     RETORNAR False (nao divisivel por 4: nao bissexto)\n#   FIM SE\n# FIM FUNCAO\n\ndef verificar_bissexto(ano):\n    # Implemente baseado no pseudocodigo acima\n    pass\n\n# Casos de teste com respostas esperadas:\nprint(verificar_bissexto(2000))  # True  (divisivel por 400)\nprint(verificar_bissexto(1900))  # False (divisivel por 100, nao por 400)\nprint(verificar_bissexto(2024))  # True  (divisivel por 4, nao por 100)\nprint(verificar_bissexto(2023))  # False (nao divisivel por 4)\n',
      solution:
        '# PSEUDOCODIGO:\n#\n# FUNCAO verificar_bissexto(ano):\n#   SE ano % 400 == 0 ENTAO\n#     RETORNAR True\n#   SENAO SE ano % 100 == 0 ENTAO\n#     RETORNAR False\n#   SENAO SE ano % 4 == 0 ENTAO\n#     RETORNAR True\n#   SENAO\n#     RETORNAR False\n#   FIM SE\n# FIM FUNCAO\n\ndef verificar_bissexto(ano):\n    # Ordem importa: verificar 400 antes de 100, e 100 antes de 4\n    if ano % 400 == 0:\n        return True   # sempre bissexto\n    elif ano % 100 == 0:\n        return False  # divisivel por 100 mas nao por 400\n    elif ano % 4 == 0:\n        return True   # bissexto padrao\n    else:\n        return False  # nao bissexto\n\nprint(verificar_bissexto(2000))\nprint(verificar_bissexto(1900))\nprint(verificar_bissexto(2024))\nprint(verificar_bissexto(2023))',
      hints: [
        'A ordem das condicoes e crucial: verifique divisao por 400 primeiro, depois por 100, depois por 4. Inverter a ordem dara resultados errados.',
        'Use o operador % (modulo) para verificar divisibilidade: "ano % 400 == 0" significa que o ano e divisivel por 400.',
        'Complete o pseudocodigo com as condicoes corretas antes de implementar. Isso ajuda a ver a logica sem se preocupar com a sintaxe Python.',
      ],
    },
    {
      id: 'documentacao-c2',
      title: 'Adicionando Comentarios Uteis a Codigo Existente',
      description:
        'O codigo abaixo funciona, mas esta completamente sem documentacao. Adicione: (1) uma docstring explicando o que a funcao faz, recebe e retorna; (2) comentarios de bloco explicando cada secao; (3) comentarios de linha explicando os numeros magicos. Nao mude a logica, apenas adicione documentacao.',
      language: 'python',
      starterCode:
        '# Adicione documentacao a este codigo sem mudar a logica\n\ndef processar_pedido(itens, cupom, estado):\n    total = 0\n    for item in itens:\n        total = total + item["preco"] * item["quantidade"]\n\n    if cupom == "DESCONTO10":\n        total = total * 0.90\n    elif cupom == "DESCONTO20":\n        total = total * 0.80\n\n    if estado == "SP" or estado == "RJ":\n        frete = total * 0.05\n    elif estado == "SC" or estado == "PR" or estado == "RS":\n        frete = total * 0.07\n    else:\n        frete = total * 0.10\n\n    if total >= 200:\n        frete = 0\n\n    return total + frete\n\npedido = [\n    {"preco": 50.00, "quantidade": 2},\n    {"preco": 30.00, "quantidade": 1},\n]\nresultado = processar_pedido(pedido, "DESCONTO10", "SP")\nprint("Total do pedido: R$", resultado)\n',
      solution:
        'def processar_pedido(itens, cupom, estado):\n    """\n    Calcula o valor total de um pedido incluindo desconto de cupom e frete.\n\n    Args:\n        itens: Lista de dicionarios com "preco" e "quantidade" de cada item.\n        cupom: Codigo do cupom de desconto. Aceita "DESCONTO10" ou "DESCONTO20".\n               Qualquer outro valor e ignorado (sem desconto).\n        estado: Sigla do estado de entrega (ex: "SP", "RJ", "SC").\n                Usado para calcular a taxa de frete regional.\n\n    Returns:\n        Valor total do pedido (subtotal - desconto + frete) como float.\n        Frete e gratuito para pedidos com subtotal acima de R$ 200.\n    """\n    # Calcular subtotal: soma de (preco * quantidade) de todos os itens\n    total = 0\n    for item in itens:\n        total = total + item["preco"] * item["quantidade"]\n\n    # Aplicar desconto do cupom ao subtotal\n    # DESCONTO10 reduz 10% (fator 0.90), DESCONTO20 reduz 20% (fator 0.80)\n    if cupom == "DESCONTO10":\n        total = total * 0.90\n    elif cupom == "DESCONTO20":\n        total = total * 0.80\n\n    # Calcular frete por regiao:\n    # Sudeste (SP, RJ): 5% do total\n    # Sul (SC, PR, RS): 7% do total\n    # Demais estados:  10% do total\n    if estado == "SP" or estado == "RJ":\n        frete = total * 0.05\n    elif estado == "SC" or estado == "PR" or estado == "RS":\n        frete = total * 0.07\n    else:\n        frete = total * 0.10\n\n    # Frete gratis para pedidos acima de R$ 200 (politica de fidelidade)\n    if total >= 200:\n        frete = 0\n\n    return total + frete\n\npedido = [\n    {"preco": 50.00, "quantidade": 2},\n    {"preco": 30.00, "quantidade": 1},\n]\nresultado = processar_pedido(pedido, "DESCONTO10", "SP")\nprint("Total do pedido: R$", resultado)',
      hints: [
        'A docstring fica logo apos "def processar_pedido(...):" entre tres aspas duplas. Explique o que a funcao faz, o que cada parametro significa e o que ela retorna.',
        'Adicione comentarios de bloco (linha comecando com #) antes de cada secao: antes do loop, antes dos cupons e antes do frete.',
        'Para os numeros como 0.90, 0.05, 0.07, 200: explique o que significam (0.90 = 10% de desconto, 200 = limite para frete gratis, etc.).',
      ],
    },
  ],
};
