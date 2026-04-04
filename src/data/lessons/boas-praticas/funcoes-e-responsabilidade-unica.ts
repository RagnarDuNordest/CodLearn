import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes-e-responsabilidade-unica',
  moduleId: 'boas-praticas',
  title: 'Funcoes e Responsabilidade Unica',
  description: 'Como escrever funcoes pequenas, previsiveis e reutilizaveis',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Funcoes e o Principio da Responsabilidade Unica\n\nUma funcao deve fazer UMA coisa, fazer bem, e ser obvia pelo nome.\n\n### Sinais de que uma funcao faz demais\n\n**(1) O nome tem "e"**\n`buscar_e_salvar`, `validar_e_enviar`, `calcular_e_formatar` — quando voce precisa de "e" no nome, e porque esta fazendo duas coisas.\n\n**(2) Tem mais de 20 linhas**\nNao e uma regra absoluta, mas funcoes longas geralmente misturam responsabilidades. Se passou de 20 linhas, pergunte: "isso poderia ser dividido?"\n\n**(3) Voce precisa de comentarios para explicar secoes diferentes**\nSe voce escreve `# Validar dados` e `# Salvar no banco` dentro da mesma funcao, cada secao deveria ser uma funcao separada.\n\n**(4) Tem mais de 3 parametros**\nMais de 3 parametros e sinal de que a funcao esta tentando fazer muita coisa, ou que os parametros deveriam ser agrupados em um objeto/dataclass.\n\n**(5) E dificil de testar isoladamente**\nSe para testar a funcao voce precisa de um banco de dados, de um servidor de email E de um arquivo de configuracao ao mesmo tempo, ela esta fazendo demais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ANTES: funcao "deus" que faz tudo\ndef processar_pedido(pedido_id, usuario_id, itens, endereco, cupom):\n    # Validar entrada\n    if not pedido_id or not usuario_id:\n        raise ValueError("IDs invalidos")\n    if not itens:\n        raise ValueError("Pedido sem itens")\n    if not endereco.get("cep"):\n        raise ValueError("Endereco sem CEP")\n\n    # Buscar dados do banco\n    import sqlite3\n    conn = sqlite3.connect("app.db")\n    usuario = conn.execute(\n        "SELECT * FROM usuarios WHERE id = ?", (usuario_id,)\n    ).fetchone()\n    if not usuario:\n        raise ValueError("Usuario nao encontrado")\n\n    # Calcular total\n    total = sum(item["preco"] * item["quantidade"] for item in itens)\n    if cupom == "DESCONTO10":\n        total = total * 0.9\n    if total < 0:\n        raise ValueError("Total invalido")\n\n    # Formatar resposta\n    pedido = {\n        "id": pedido_id,\n        "usuario": usuario["nome"],\n        "total": round(total, 2),\n        "status": "confirmado"\n    }\n\n    # Salvar no banco\n    conn.execute(\n        "INSERT INTO pedidos (id, usuario_id, total, status) VALUES (?,?,?,?)",\n        (pedido_id, usuario_id, total, "confirmado")\n    )\n    conn.commit()\n\n    # Enviar email\n    import smtplib\n    smtp = smtplib.SMTP("smtp.gmail.com")\n    smtp.sendmail("sistema@loja.com", usuario["email"],\n                  f"Pedido {pedido_id} confirmado! Total: R${total:.2f}")\n    smtp.quit()\n\n    return pedido\n\n\n# DEPOIS: seis funcoes focadas de 5-8 linhas cada\ndef validar_dados_do_pedido(pedido_id, usuario_id, itens, endereco):\n    if not pedido_id or not usuario_id:\n        raise ValueError("IDs invalidos")\n    if not itens:\n        raise ValueError("Pedido sem itens")\n    if not endereco.get("cep"):\n        raise ValueError("Endereco sem CEP")\n\ndef buscar_usuario(conn, usuario_id):\n    usuario = conn.execute(\n        "SELECT * FROM usuarios WHERE id = ?", (usuario_id,)\n    ).fetchone()\n    if not usuario:\n        raise ValueError("Usuario nao encontrado")\n    return usuario\n\ndef calcular_total_com_cupom(itens, cupom):\n    total = sum(item["preco"] * item["quantidade"] for item in itens)\n    if cupom == "DESCONTO10":\n        total = total * 0.9\n    return round(total, 2)\n\ndef montar_resposta_do_pedido(pedido_id, usuario, total):\n    return {\n        "id": pedido_id,\n        "usuario": usuario["nome"],\n        "total": total,\n        "status": "confirmado"\n    }\n\ndef salvar_pedido_no_banco(conn, pedido_id, usuario_id, total):\n    conn.execute(\n        "INSERT INTO pedidos (id, usuario_id, total, status) VALUES (?,?,?,?)",\n        (pedido_id, usuario_id, total, "confirmado")\n    )\n    conn.commit()\n\ndef enviar_email_confirmacao(email_destinatario, pedido_id, total):\n    import smtplib\n    smtp = smtplib.SMTP("smtp.gmail.com")\n    smtp.sendmail("sistema@loja.com", email_destinatario,\n                  f"Pedido {pedido_id} confirmado! Total: R${total:.2f}")\n    smtp.quit()\n\ndef processar_pedido(pedido_id, usuario_id, itens, endereco, cupom):\n    validar_dados_do_pedido(pedido_id, usuario_id, itens, endereco)\n    import sqlite3\n    conn = sqlite3.connect("app.db")\n    usuario = buscar_usuario(conn, usuario_id)\n    total = calcular_total_com_cupom(itens, cupom)\n    salvar_pedido_no_banco(conn, pedido_id, usuario_id, total)\n    enviar_email_confirmacao(usuario["email"], pedido_id, total)\n    return montar_resposta_do_pedido(pedido_id, usuario, total)',
        filename: 'funcoes_srp.py',
        description:
          'A funcao "deus" de 50 linhas mistura 6 responsabilidades: validacao, busca no banco, calculo, formatacao, persistencia e envio de email. Cada uma dessas vira uma funcao de 5-8 linhas com nome claro. A funcao coordenadora final le como um sumario executivo do processo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra pratica: se voce esta escrevendo um comentario como "# Agora vamos validar..." ou "# Salvar no banco...", esse bloco deveria ser uma funcao separada.',
    },
    {
      type: 'text',
      content:
        '## Parametros e valores de retorno\n\n### Regra 1: maximo 3 parametros\nSe uma funcao precisa de mais de 3 parametros, algo esta errado. Solucoes:\n- Agrupe em um dicionario ou dataclass: `criar_usuario(dados_usuario)` em vez de `criar_usuario(nome, email, senha, cpf, telefone)`\n- Divida a funcao em partes menores\n\n### Regra 2: evite parametros de saida\nParametros de saida sao listas ou objetos passados para a funcao para serem modificados. Isso cria acoplamento oculto.\n```python\n# Ruim: parametro de saida — modifica a lista passada\ndef adicionar_impostos(produtos, resultado):\n    for p in produtos:\n        resultado.append(p["preco"] * 1.12)\n\n# Bom: retorna uma nova lista\ndef calcular_precos_com_imposto(produtos):\n    return [p["preco"] * 1.12 for p in produtos]\n```\n\n### Regra 3: separacao comando/consulta\nUma funcao deve FAZER algo (comando) OU RETORNAR algo (consulta), nao ambos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Ruim: faz E retorna ao mesmo tempo (viola separacao comando/consulta)\ndef adicionar_e_obter_total(lista, item):\n    lista.append(item)          # comando: modifica estado\n    return sum(lista)           # consulta: retorna informacao\n\n# Problema: o chamador nao sabe que a lista foi modificada\nresultado = adicionar_e_obter_total(minha_lista, 42)\n# minha_lista foi alterada silenciosamente!\n\n\n# Bom: separados — cada funcao faz UMA coisa\ndef adicionar_item(lista, item):\n    lista.append(item)          # so faz — nao retorna nada util\n\ndef calcular_total(lista):\n    return sum(lista)           # so retorna — nao altera estado\n\n# Uso explicito e previsivel:\nadicionar_item(minha_lista, 42)\ntotal_atual = calcular_total(minha_lista)\n# Sem surpresas — cada chamada tem um proposito obvio',
        filename: 'separacao_comando_consulta.py',
        description:
          'A separacao comando/consulta torna o codigo previsivel. Quando uma funcao tanto modifica estado quanto retorna um valor, o chamador precisa saber dos dois efeitos. Funcoes separadas eliminam essa ambiguidade.',
      },
    },
  ],
  challenges: [
    {
      id: 'funcoes-c1',
      title: 'Quebre Esta Funcao',
      description:
        'A funcao abaixo faz 5 coisas diferentes: valida entrada, busca usuario no banco, calcula desconto, formata resposta e registra log. Divida-a em funcoes focadas com responsabilidade unica, mais uma funcao coordenadora que chama todas elas na ordem certa.',
      language: 'python',
      starterCode:
        '# Quebre esta funcao em partes com responsabilidade unica\ndef aplicar_desconto_para_usuario(usuario_id, valor_compra, codigo_cupom):\n    # Validar entrada\n    if not usuario_id or usuario_id <= 0:\n        raise ValueError("ID de usuario invalido")\n    if valor_compra <= 0:\n        raise ValueError("Valor de compra deve ser positivo")\n    if not codigo_cupom or len(codigo_cupom) < 3:\n        raise ValueError("Codigo de cupom invalido")\n\n    # Buscar usuario no banco\n    import sqlite3\n    conn = sqlite3.connect("app.db")\n    usuario = conn.execute(\n        "SELECT id, nome, email, nivel FROM usuarios WHERE id = ?",\n        (usuario_id,)\n    ).fetchone()\n    if not usuario:\n        raise ValueError("Usuario nao encontrado")\n\n    # Calcular desconto\n    desconto = 0.0\n    if codigo_cupom == "VIP20" and usuario["nivel"] == "vip":\n        desconto = 0.20\n    elif codigo_cupom == "NOVO10":\n        desconto = 0.10\n    elif codigo_cupom == "FIDELIDADE15" and usuario["nivel"] in ("gold", "vip"):\n        desconto = 0.15\n    valor_final = round(valor_compra * (1 - desconto), 2)\n\n    # Formatar resposta\n    resposta = {\n        "usuario": usuario["nome"],\n        "valor_original": valor_compra,\n        "desconto_aplicado": f"{int(desconto * 100)}%",\n        "valor_final": valor_final\n    }\n\n    # Registrar log\n    import datetime\n    timestamp = datetime.datetime.now().isoformat()\n    print(f"[{timestamp}] Desconto aplicado: usuario={usuario_id}, cupom={codigo_cupom}, final={valor_final}")\n\n    return resposta\n',
      solution:
        'import sqlite3\nimport datetime\n\ndef validar_dados_de_desconto(usuario_id, valor_compra, codigo_cupom):\n    if not usuario_id or usuario_id <= 0:\n        raise ValueError("ID de usuario invalido")\n    if valor_compra <= 0:\n        raise ValueError("Valor de compra deve ser positivo")\n    if not codigo_cupom or len(codigo_cupom) < 3:\n        raise ValueError("Codigo de cupom invalido")\n\ndef buscar_usuario_por_id(conn, usuario_id):\n    usuario = conn.execute(\n        "SELECT id, nome, email, nivel FROM usuarios WHERE id = ?",\n        (usuario_id,)\n    ).fetchone()\n    if not usuario:\n        raise ValueError("Usuario nao encontrado")\n    return usuario\n\ndef calcular_percentual_de_desconto(codigo_cupom, nivel_usuario):\n    if codigo_cupom == "VIP20" and nivel_usuario == "vip":\n        return 0.20\n    if codigo_cupom == "NOVO10":\n        return 0.10\n    if codigo_cupom == "FIDELIDADE15" and nivel_usuario in ("gold", "vip"):\n        return 0.15\n    return 0.0\n\ndef montar_resposta_de_desconto(usuario, valor_original, percentual_desconto):\n    valor_final = round(valor_original * (1 - percentual_desconto), 2)\n    return {\n        "usuario": usuario["nome"],\n        "valor_original": valor_original,\n        "desconto_aplicado": f"{int(percentual_desconto * 100)}%",\n        "valor_final": valor_final\n    }\n\ndef registrar_log_de_desconto(usuario_id, codigo_cupom, valor_final):\n    timestamp = datetime.datetime.now().isoformat()\n    print(f"[{timestamp}] Desconto aplicado: usuario={usuario_id}, cupom={codigo_cupom}, final={valor_final}")\n\ndef aplicar_desconto_para_usuario(usuario_id, valor_compra, codigo_cupom):\n    validar_dados_de_desconto(usuario_id, valor_compra, codigo_cupom)\n    conn = sqlite3.connect("app.db")\n    usuario = buscar_usuario_por_id(conn, usuario_id)\n    percentual = calcular_percentual_de_desconto(codigo_cupom, usuario["nivel"])\n    resposta = montar_resposta_de_desconto(usuario, valor_compra, percentual)\n    registrar_log_de_desconto(usuario_id, codigo_cupom, resposta["valor_final"])\n    return resposta\n',
      hints: [
        'Procure blocos separados por linha em branco — cada um provavelmente e uma funcao separada',
        'O nome da funcao coordenadora deve ser valido para descrever cada sub-funcao individualmente',
        'A funcao coordenadora deve ler como um sumario executivo: validar, buscar, calcular, formatar, registrar',
      ],
    },
    {
      id: 'funcoes-c2',
      title: 'Quantos Problemas Voce Encontra?',
      description:
        'A funcao abaixo tem 4 violacoes do Principio da Responsabilidade Unica. Liste cada problema nos comentarios indicados, explique por que e uma violacao e como corrigiria.',
      language: 'python',
      starterCode:
        '# Encontre os 4 problemas de responsabilidade nesta funcao\n\ndef registrar_venda(produto_nome, preco, quantidade, desconto, cliente_email,\n                   historico_vendas):  # PROBLEMA 1: ?\n    # Validar e calcular\n    if preco <= 0 or quantidade <= 0:  # PROBLEMA 2: ?\n        raise ValueError("Valores invalidos")\n    total = preco * quantidade\n    if desconto > 0:\n        total = total * (1 - desconto)\n    total = round(total, 2)\n\n    # Montar registro e salvar\n    registro = {"produto": produto_nome, "total": total, "email": cliente_email}\n    historico_vendas.append(registro)  # PROBLEMA 3: ?\n\n    # Enviar confirmacao\n    print(f"Email enviado para {cliente_email}: Venda de {produto_nome} = R${total}")  # PROBLEMA 4: ?\n\n    return total  # retorna o total E modifica historico_vendas\n',
      solution:
        '# PROBLEMA 1: a funcao tem 6 parametros — mais de 3 indica que esta fazendo coisas demais\n# Correcao: agrupar em objetos — registrar_venda(dados_produto, dados_cliente)\n\n# PROBLEMA 2: a funcao mistura responsabilidades de validacao com calculo\n# Sao duas coisas distintas: validar_dados_da_venda() e calcular_total_com_desconto()\n# A funcao registrar_venda nao deveria validar — deveria apenas registrar\n\n# PROBLEMA 3: parametro de saida — "historico_vendas" e modificado dentro da funcao\n# O chamador nao espera que a lista seja alterada silenciosamente\n# Correcao: a funcao deve retornar o registro e o chamador decide o que fazer com ele\n# def registrar_venda(...) -> dict:  retorna o registro, nao modifica lista externa\n\n# PROBLEMA 4: viola separacao comando/consulta — a funcao tanto modifica estado\n# (adiciona ao historico) quanto retorna um valor (total), e ainda tem efeito colateral\n# de enviar email. Sao tres responsabilidades em uma funcao.\n# Correcao: separar em calcular_total(), registrar_no_historico(), enviar_confirmacao()\n\n# Versao corrigida com responsabilidades separadas:\ndef validar_dados_da_venda(preco, quantidade):\n    if preco <= 0 or quantidade <= 0:\n        raise ValueError("Valores invalidos")\n\ndef calcular_total_com_desconto(preco, quantidade, desconto):\n    total = preco * quantidade\n    if desconto > 0:\n        total = total * (1 - desconto)\n    return round(total, 2)\n\ndef montar_registro_de_venda(produto_nome, total, cliente_email):\n    return {"produto": produto_nome, "total": total, "email": cliente_email}\n\ndef enviar_confirmacao_de_venda(cliente_email, produto_nome, total):\n    print(f"Email enviado para {cliente_email}: Venda de {produto_nome} = R${total}")\n',
      hints: [
        'Conte os parametros — 6 parametros sao um sinal forte de que a funcao faz coisas demais',
        'Procure pela violacao de comando/consulta: a funcao modifica a lista E retorna um valor?',
        'Um parametro que e modificado dentro da funcao (parametro de saida) e sempre uma violacao de SRP',
      ],
    },
  ],
};
