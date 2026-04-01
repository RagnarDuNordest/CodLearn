import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'codigo-limpo-na-pratica',
  moduleId: 'boas-praticas',
  title: 'Codigo Limpo na Pratica',
  description: 'As regras mais importantes de Clean Code aplicadas em codigo real',
  order: 4,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Codigo Limpo na Pratica\n\nClean Code nao e sobre estetica — e sobre velocidade de manutencao. Codigo limpo e modificado com confianca.\n\n### As regras mais impactantes\n\n**(1) DRY — Don\'t Repeat Yourself**\nTodo conhecimento deve ter uma representacao unica no sistema. Se voce duplica logica, qualquer mudanca precisa ser feita em todos os lugares — e voce vai esquecer um.\n\n**(2) YAGNI — You Aren\'t Gonna Need It**\nNao implemente funcionalidades "para uso futuro". Codigo que ninguem usa tem custo: precisa ser lido, entendido, testado e mantido.\n\n**(3) Comentarios explicam POR QUE, nao O QUE**\nSe o codigo precisa de comentario para explicar o que faz, o problema e o codigo — nao a falta de comentario. Comentarios validos explicam decisoes nao obvias.\n\n**(4) Trate erros onde eles ocorrem**\nNao deixe erros silenciosos. Um erro ignorado agora e um bug dificil de debugar depois.\n\n**(5) Evite numeros magicos**\nUm numero sozinho no codigo nao comunica nada. `3` pode ser o limite de tentativas, dias de prazo, ou maximo de itens. Sempre nomeie.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# DRY: violacao e correcao\n\n# RUIM — validacao de email duplicada em 3 funcoes\ndef registrar_usuario(nome, email, senha):\n    if "@" not in email or "." not in email:  # validacao copiada\n        raise ValueError("Email invalido")\n    # ... logica de registro\n\ndef atualizar_email(usuario_id, novo_email):\n    if "@" not in novo_email or "." not in novo_email:  # copiada de novo\n        raise ValueError("Email invalido")\n    # ... logica de atualizacao\n\ndef convidar_usuario(email_convidado):\n    if "@" not in email_convidado or "." not in email_convidado:  # terceira copia\n        raise ValueError("Email invalido")\n    # ... logica de convite\n\n\n# BOM — validacao em um unico lugar, chamada em todos\ndef email_e_valido(email: str) -> bool:\n    return "@" in email and "." in email\n\ndef registrar_usuario(nome, email, senha):\n    if not email_e_valido(email):\n        raise ValueError("Email invalido")\n    # ... logica de registro\n\ndef atualizar_email(usuario_id, novo_email):\n    if not email_e_valido(novo_email):\n        raise ValueError("Email invalido")\n    # ... logica de atualizacao\n\ndef convidar_usuario(email_convidado):\n    if not email_e_valido(email_convidado):\n        raise ValueError("Email invalido")\n    # ... logica de convite\n\n\n# YAGNI: nao adicione parametros "para uso futuro"\n# RUIM\ndef enviar_email(destinatario, assunto, corpo, modo_turbo=False):  # modo_turbo nao existe ainda\n    # if modo_turbo:  # nunca sera usado\n    #     ...\n    pass\n\n# BOM\ndef enviar_email(destinatario, assunto, corpo):  # so o necessario agora\n    pass',
        filename: 'dry_yagni.py',
        description:
          'DRY em acao: a validacao de email extraida para uma funcao evita que uma mudanca na regra (adicionar verificacao de TLD, por exemplo) precise ser replicada em 3 lugares. YAGNI: parametros "para uso futuro" aumentam a complexidade sem nenhum beneficio atual.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra dos 3: se voce escreve o mesmo codigo pela terceira vez, e hora de extrair uma funcao. Uma ou duas vezes pode ser coincidencia. Tres vezes e duplicacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import time\n\n# COMENTARIOS RUINS vs BONS\n\n# Ruim: comenta O QUE (obvio pelo codigo)\ni = i + 1  # incrementa i\n\n# Ruim: codigo morto comentado (apague, o Git guarda o historico)\n# usuarios = buscar_todos()\nusuarios = buscar_ativos()\n\n# Ruim: repeticao do codigo em portugues\nif usuario.ativo:  # se usuario estiver ativo\n    pass\n\n\n# Bom: explica POR QUE (decisao nao obvia)\ntime.sleep(0.5)  # API do banco tem rate limit de 2 req/s\n\n# Bom: explica decisao de design\n# Usamos lista em vez de set para preservar ordem de insercao\n# Sets nao garantem ordem em Python < 3.7\nhistorico = []\n\n# Bom: documenta casos especiais de compatibilidade\n# Retorna None (nao raise) para manter compatibilidade com v1 da API\n# Clients antigos verificam "if resultado is None" — nao podem tratar excecao\ndef buscar_usuario(id: int):\n    pass\n\n# Bom: TODO com contexto e prazo\n# TODO: remover apos migracao para nova API de pagamentos (prazo: jun/2025)\nresultado = api_legada.processar(dados)',
        filename: 'comentarios_bons_ruins.py',
        description:
          'A regra e simples: se o comentario descreve o que o codigo faz, o codigo deveria ser mais claro. Se o comentario explica uma decisao, restricao ou efeito colateral nao obvio, e um comentario valioso.',
      },
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# NUMEROS MAGICOS: eliminacao com constantes nomeadas\n\n# RUIM\ndef verificar_tentativas(tentativas, status):\n    if tentativas > 3:\n        time.sleep(60)\n        if status == 2:\n            enviar_alerta()\n\n\n# BOM: cada numero tem um nome que explica seu significado\nMAX_TENTATIVAS = 3\nPAUSA_ENTRE_TENTATIVAS = 60  # segundos\nSTATUS_CRITICO = 2\n\ndef verificar_tentativas(tentativas, status):\n    if tentativas > MAX_TENTATIVAS:\n        time.sleep(PAUSA_ENTRE_TENTATIVAS)\n        if status == STATUS_CRITICO:\n            enviar_alerta()\n\n\n# Outro exemplo: constantes de negocio\nIDADE_MINIMA_PARA_COMPRA = 18\nDESCONTO_FIDELIDADE = 0.15        # 15%\nPRAZO_ENTREGA_EXPRESS = 2         # dias uteis\nMAX_ITENS_NO_CARRINHO = 50\n\ndef calcular_frete(dias_entrega, total):\n    if dias_entrega <= PRAZO_ENTREGA_EXPRESS:\n        frete = total * 0.05\n    else:\n        frete = total * 0.02\n    return frete\n\nimport time',
        filename: 'numeros_magicos.py',
        description:
          'Constantes nomeadas servem como documentacao automatica. Quando o desconto de fidelidade mudar de 15% para 20%, voce muda em um lugar so — e o nome torna claro o que voce esta mudando.',
      },
    },
  ],
  challenges: [
    {
      id: 'limpo-c1',
      title: 'Elimine a Duplicacao',
      description:
        'O modulo abaixo tem 3 funcoes que compartilham 60% do codigo (mesma validacao, mesmo tratamento de erro, logica central diferente). Refatore extraindo o codigo compartilhado para uma funcao auxiliar, mantendo o comportamento identico.',
      language: 'python',
      starterCode:
        '# Tres funcoes com muita duplicacao — refatore eliminando o codigo repetido\n\ndef calcular_imposto_pf(cpf, salario_mensal):\n    if not cpf or len(cpf) != 11:\n        raise ValueError("CPF invalido")\n    if salario_mensal is None or salario_mensal < 0:\n        raise ValueError("Salario invalido")\n    # Logica especifica PF\n    base = salario_mensal * 12\n    if base <= 28559.70:\n        return base * 0.075\n    return base * 0.15\n\ndef calcular_imposto_pj(cnpj, faturamento_anual):\n    if not cnpj or len(cnpj) != 14:\n        raise ValueError("CNPJ invalido")\n    if faturamento_anual is None or faturamento_anual < 0:\n        raise ValueError("Faturamento invalido")\n    # Logica especifica PJ\n    if faturamento_anual <= 360000:\n        return faturamento_anual * 0.06\n    return faturamento_anual * 0.135\n\ndef calcular_imposto_mei(cpf, faturamento_anual):\n    if not cpf or len(cpf) != 11:\n        raise ValueError("CPF invalido")\n    if faturamento_anual is None or faturamento_anual < 0:\n        raise ValueError("Faturamento invalido")\n    # Logica especifica MEI\n    if faturamento_anual > 81000:\n        raise ValueError("MEI nao pode faturar acima de R$81.000/ano")\n    return faturamento_anual * 0.05\n',
      solution:
        'CPF_LENGTH = 11\nCNPJ_LENGTH = 14\n\ndef validar_documento(documento, tamanho_esperado, nome_documento):\n    if not documento or len(documento) != tamanho_esperado:\n        raise ValueError(f"{nome_documento} invalido")\n\ndef validar_valor_financeiro(valor, nome_campo):\n    if valor is None or valor < 0:\n        raise ValueError(f"{nome_campo} invalido")\n\ndef calcular_imposto_pf(cpf, salario_mensal):\n    validar_documento(cpf, CPF_LENGTH, "CPF")\n    validar_valor_financeiro(salario_mensal, "Salario")\n    base = salario_mensal * 12\n    if base <= 28559.70:\n        return base * 0.075\n    return base * 0.15\n\ndef calcular_imposto_pj(cnpj, faturamento_anual):\n    validar_documento(cnpj, CNPJ_LENGTH, "CNPJ")\n    validar_valor_financeiro(faturamento_anual, "Faturamento")\n    if faturamento_anual <= 360000:\n        return faturamento_anual * 0.06\n    return faturamento_anual * 0.135\n\ndef calcular_imposto_mei(cpf, faturamento_anual):\n    validar_documento(cpf, CPF_LENGTH, "CPF")\n    validar_valor_financeiro(faturamento_anual, "Faturamento")\n    if faturamento_anual > 81000:\n        raise ValueError("MEI nao pode faturar acima de R$81.000/ano")\n    return faturamento_anual * 0.05\n',
      hints: [
        'Identifique o que e igual nas 3 funcoes: a validacao do documento e a validacao do valor financeiro',
        'Extraia o codigo comum para funcoes auxiliares: validar_documento() e validar_valor_financeiro()',
        'As 3 funcoes originais devem chamar as auxiliares — a logica especifica de cada uma fica intacta',
      ],
    },
    {
      id: 'limpo-c2',
      title: 'Codigo Limpo ou Nao?',
      description:
        'Os 5 trechos abaixo podem ou nao violar principios de Clean Code. Para cada um, responda nos comentarios: e codigo limpo? Se nao, qual e o problema e como corrigiria?',
      language: 'python',
      starterCode:
        '# Trecho 1: limpo ou nao?\ndef calcular(x):\n    return x * 1.1\n# Avaliacao: ___\n\n# Trecho 2: limpo ou nao?\n# Verifica se a lista nao esta vazia antes de processar\nif len(lista) > 0:\n    processar(lista)\n# Avaliacao: ___\n\n# Trecho 3: limpo ou nao?\nMAX_CONEXOES = 10\nTIMEOUT_SEGUNDOS = 30\n\ndef criar_pool():\n    return Pool(max_connections=MAX_CONEXOES, timeout=TIMEOUT_SEGUNDOS)\n# Avaliacao: ___\n\n# Trecho 4: limpo ou nao?\ndef processar_pedido(pedido):\n    # Valida pedido\n    if not pedido.get("items"):\n        return None\n    # Calcula total\n    total = sum(i["preco"] for i in pedido["items"])\n    # Aplica desconto\n    if total > 100:\n        total = total * 0.9\n    # Salva no banco\n    db.save(pedido)\n    return total\n# Avaliacao: ___\n\n# Trecho 5: limpo ou nao?\nresultado = [x for x in dados if x > 0 and x % 2 == 0 and x < 1000]\n# Avaliacao: ___\n',
      solution:
        '# Trecho 1: NAO e limpo\n# Problema: numero magico (1.1) e nome generico (calcular, x)\n# Correcao:\nALIQUOTA_IMPOSTO = 1.10  # 10% de imposto\ndef calcular_preco_com_imposto(preco_base):\n    return preco_base * ALIQUOTA_IMPOSTO\n\n# Trecho 2: NAO e limpo (mas e sutil)\n# Problema: o comentario descreve O QUE o codigo faz, que ja e obvio\n# Alem disso, "len(lista) > 0" pode ser simplificado para "if lista:"\n# Correcao: remover o comentario e simplificar a condicao\nif lista:\n    processar(lista)\n\n# Trecho 3: E limpo\n# Constantes nomeadas, nome de funcao descritivo, sem duplicacao\n# Nada a corrigir — este e um exemplo de codigo limpo\n\n# Trecho 4: NAO e limpo\n# Problema: os comentarios "# Valida", "# Calcula", "# Aplica", "# Salva"\n# sao uma bandeira vermelha — cada secao deveria ser uma funcao separada\n# Alem disso, numero magico (100, 0.9) e nome generico (processar_pedido faz tudo)\n# Correcao: extrair validar_pedido(), calcular_total(), aplicar_desconto(), salvar_pedido()\n\n# Trecho 5: NAO e limpo\n# Problema: condicao complexa na list comprehension — dificil de ler rapidamente\n# Correcao: extrair para uma funcao com nome descritivo\ndef numero_e_valido_para_relatorio(numero):\n    return numero > 0 and numero % 2 == 0 and numero < 1000\n\nresultado = [x for x in dados if numero_e_valido_para_relatorio(x)]\n',
      hints: [
        'Para identificar numeros magicos: todo numero literal no codigo sem um nome associado e suspeito',
        'Comentarios que descrevem O QUE o codigo faz sao codigo mal escrito disfarfado de documentacao',
        'Uma funcao com comentarios separando secoes internas (# Valida, # Calcula, # Salva) viola SRP',
      ],
    },
  ],
};
