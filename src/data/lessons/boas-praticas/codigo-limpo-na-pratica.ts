import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'codigo-limpo-na-pratica',
  moduleId: 'boas-praticas',
  title: 'Codigo Limpo na Pratica',
  description: 'Aplique os principios DRY, YAGNI e outras tecnicas para escrever codigo que e facil de ler, manter e evoluir',
  order: 4,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## Os tres principios fundamentais\n\n### DRY — Don\'t Repeat Yourself\n\n**"Todo conhecimento deve ter uma representacao unica, inequivoca e autoritativa em um sistema."**\n\nQuando voce duplica codigo, cria um problema: quando precisar mudar, vai ter que encontrar e mudar em todos os lugares. E vai esquecer um. Isso vai causar um bug.\n\n```python\n# RUIM — calculo de desconto duplicado em 3 lugares\ndef calcular_total_pedido(preco, qtd):\n    desconto = preco * qtd * 0.10  # 10% de desconto\n    return preco * qtd - desconto\n\ndef calcular_fatura(preco, qtd):\n    desconto = preco * qtd * 0.10  # mesma logica copiada\n    return preco * qtd - desconto\n\n# BOM — logica em um unico lugar\nDESCONTO_PADRAO = 0.10\n\ndef calcular_desconto(subtotal):\n    return subtotal * DESCONTO_PADRAO\n\ndef calcular_total_pedido(preco, qtd):\n    subtotal = preco * qtd\n    return subtotal - calcular_desconto(subtotal)\n\ndef calcular_fatura(preco, qtd):\n    subtotal = preco * qtd\n    return subtotal - calcular_desconto(subtotal)\n```\n\n### YAGNI — You Aren\'t Gonna Need It\n\n**"Nao implemente algo so porque voce acha que vai precisar no futuro."**\n\nCodigo que ninguem usa tem custo: precisa ser lido, entendido, testado e mantido. Implemente quando houver necessidade real, nao quando houver possibilidade hipotetica.\n\nExemplos de violacoes do YAGNI:\n- "Vou deixar esse parametro configuravel por via das duvidas"\n- "Vou criar esse sistema de plugins caso queiram adicionar mais tarde"\n- "Vou adicionar suporte a multiplos bancos de dados, nunca se sabe"\n\n### KISS — Keep It Simple, Stupid\n\n**"A simplicidade deve ser um objetivo central do design."**\n\nSe duas solucoes funcionam, escolha a mais simples. Codigo simples e mais facil de ler, testar e manter do que codigo "inteligente".',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# NUMEROS MAGICOS — um dos erros mais comuns\n\n# RUIM — o que significa cada numero?\ndef calcular_imposto(salario):\n    if salario <= 1903.98:\n        return 0\n    elif salario <= 2826.65:\n        return salario * 0.075 - 142.80\n    elif salario <= 3751.05:\n        return salario * 0.15 - 354.80\n    else:\n        return salario * 0.275 - 869.36\n\n\n# BOM — constantes nomeadas explicam o significado\nFAIXA_ISENTA = 1903.98\nFAIXA_7_5_PORCENTO = 2826.65\nFAIXA_15_PORCENTO = 3751.05\n\nALIQUOTA_7_5 = 0.075\nALIQUOTA_15 = 0.15\nALIQUOTA_27_5 = 0.275\n\nDEDUCAO_7_5 = 142.80\nDEDUCAO_15 = 354.80\nDEDUCAO_27_5 = 869.36\n\ndef calcular_imposto(salario):\n    if salario <= FAIXA_ISENTA:\n        return 0\n    elif salario <= FAIXA_7_5_PORCENTO:\n        return salario * ALIQUOTA_7_5 - DEDUCAO_7_5\n    elif salario <= FAIXA_15_PORCENTO:\n        return salario * ALIQUOTA_15 - DEDUCAO_15\n    else:\n        return salario * ALIQUOTA_27_5 - DEDUCAO_27_5',
        filename: 'numeros_magicos.py',
        description:
          'Numeros magicos sao valores numericos diretamente no codigo sem contexto. A versao com constantes se auto-documenta: agora e claro que 0.075 e a aliquota de 7.5% e 142.80 e a deducao correspondente.',
      },
    },
    {
      type: 'text',
      content:
        '## Comentarios: quando usar e quando nao usar\n\n**O codigo deve se auto-documentar. Comentarios devem explicar o PORQUE, nao o O QUE.**\n\n```python\n# RUIM — comentario que repete o codigo\ni = i + 1  # incrementa i em 1\nif usuario.ativo:  # verifica se usuario esta ativo\n    enviar_email(usuario)  # envia email para o usuario\n\n# BOM — comentario que explica decisao nao obvias\n# Multiplicamos por 1.1 para adicionar margem de seguranca de 10%\n# conforme especificado no documento de requisitos #RF-042\ncapacidade_maxima = capacidade_nominal * 1.1\n\n# Usamos a API legada aqui porque a nova API ainda nao suporta\n# autenticacao por certificado (issue #2341 no tracker)\nresultado = api_legada.autenticar(certificado)\n```\n\n### Tipos de comentarios validos\n\n1. **Explicacoes de regra de negocio:** "desconto de 10% para clientes ha mais de 2 anos (regra definida pelo time comercial)"\n2. **Alertas sobre armadilhas:** "nao usar cache aqui — dados precisam ser em tempo real para auditoria"\n3. **TODO com contexto:** `# TODO: remover apos migracao para nova API (prazo: abril/2025)`\n4. **Docstrings publicas:** funcoes publicas de bibliotecas devem ter docstring\n\n### Tipos de comentarios ruins\n\n1. **Comentarios que repetem o codigo** (como acima)\n2. **Codigo comentado:** apague o codigo morto, o Git guarda o historico\n3. **Comentarios desatualizados:** um comentario errado e pior que nenhum',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# EARLY RETURN — elimina niveis de indentacao e facilita a leitura\n\n# RUIM — piramide da morte (arrow anti-pattern)\ndef processar_pagamento(pedido):\n    if pedido is not None:\n        if pedido.get("valor") > 0:\n            if pedido.get("cliente"):\n                if pedido["cliente"].get("cartao_ativo"):\n                    # logica real fica 4 niveis abaixo\n                    resultado = cobrar_cartao(pedido)\n                    return resultado\n                else:\n                    return {"erro": "Cartao inativo"}\n            else:\n                return {"erro": "Sem cliente"}\n        else:\n            return {"erro": "Valor invalido"}\n    else:\n        return {"erro": "Pedido nulo"}\n\n\n# BOM — early return: valide primeiro, codigo feliz por ultimo\ndef processar_pagamento(pedido):\n    if pedido is None:\n        return {"erro": "Pedido nulo"}\n    if not pedido.get("valor") or pedido["valor"] <= 0:\n        return {"erro": "Valor invalido"}\n    if not pedido.get("cliente"):\n        return {"erro": "Sem cliente"}\n    if not pedido["cliente"].get("cartao_ativo"):\n        return {"erro": "Cartao inativo"}\n\n    # Aqui chegamos apenas se tudo esta OK\n    return cobrar_cartao(pedido)',
        filename: 'early_return.py',
        description:
          'Early Return (retorno antecipado) inverte a condicao: em vez de "se valido, faca X", diga "se invalido, retorne erro". O codigo principal fica no nivel mais raso, sem indentacao excessiva.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A regra do escoteiro: "Deixe o acampamento mais limpo do que encontrou." Quando voce modifica um arquivo, melhore um pouco o que ja estava la — renomeie uma variavel confusa, remova um comentario desatualizado, extraia uma funcao pequena. Nao precisa refatorar tudo, so deixe um pouco melhor.',
    },
  ],
  challenges: [
    {
      id: 'limpo-c1',
      title: 'Aplique DRY e Early Return',
      description:
        'O codigo abaixo tem tres problemas: (1) calculo duplicado em dois lugares, (2) numero magico sem nome, (3) indentacao excessiva. Aplique DRY, nomeie a constante e use early return para simplificar.',
      language: 'python',
      starterCode:
        '# Codigo com problemas — aplique DRY, constante nomeada e early return\n\ndef desconto_cliente_vip(preco, quantidade):\n    resultado = None\n    if preco is not None:\n        if quantidade is not None:\n            if quantidade > 0:\n                subtotal = preco * quantidade\n                # 15% de desconto para VIP\n                desconto = subtotal * 0.15\n                resultado = subtotal - desconto\n    return resultado\n\ndef desconto_black_friday(preco, quantidade):\n    resultado = None\n    if preco is not None:\n        if quantidade is not None:\n            if quantidade > 0:\n                subtotal = preco * quantidade\n                # 15% de desconto — mesmo percentual copiado\n                desconto = subtotal * 0.15\n                resultado = subtotal - desconto\n    return resultado\n\nprint(desconto_cliente_vip(100, 3))    # 255.0\nprint(desconto_black_friday(200, 2))   # 340.0\n',
      solution:
        'DESCONTO_ESPECIAL = 0.15  # usado tanto para VIP quanto Black Friday\n\ndef calcular_com_desconto(preco, quantidade, percentual_desconto):\n    subtotal = preco * quantidade\n    return subtotal * (1 - percentual_desconto)\n\ndef desconto_cliente_vip(preco, quantidade):\n    if preco is None or quantidade is None:\n        return None\n    if quantidade <= 0:\n        return None\n    return calcular_com_desconto(preco, quantidade, DESCONTO_ESPECIAL)\n\ndef desconto_black_friday(preco, quantidade):\n    if preco is None or quantidade is None:\n        return None\n    if quantidade <= 0:\n        return None\n    return calcular_com_desconto(preco, quantidade, DESCONTO_ESPECIAL)\n\nprint(desconto_cliente_vip(100, 3))    # 255.0\nprint(desconto_black_friday(200, 2))   # 340.0',
      hints: [
        'DRY: o calculo "subtotal * 0.15" aparece duas vezes — extraia para uma funcao "calcular_com_desconto".',
        'Constante: 0.15 e um numero magico — crie DESCONTO_ESPECIAL = 0.15 acima das funcoes.',
        'Early Return: em vez de "se valido, faca X", diga "se invalido, retorne None" e remova os niveis de indentacao.',
      ],
    },
  ],
};
