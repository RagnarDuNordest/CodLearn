import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'fluxo-de-dados',
  moduleId: 'pensamento-sistemas',
  title: 'Fluxo de Dados',
  description: 'Como dados fluem entre componentes: comunicacao sincrona, assincrona, filas e pipelines',
  order: 2,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Como dados se movem em um sistema\n\nEm qualquer sistema, dados precisam viajar de um componente para outro. Entender como esse fluxo funciona e fundamental para projetar sistemas que funcionam corretamente sob carga, sem perda de dados e com comportamento previsivel.\n\n### Do usuario ao banco: rastreando um dado\n\nQuando voce clica em "Comprar" numa loja online, seu dado percorre um caminho:\n\n```\n[Browser do usuario]\n       ↓  (1) Requisicao HTTP com dados do pedido\n[Servidor Web / API]\n       ↓  (2) Validacao e transformacao\n[Servico de Pedidos]\n       ↓  (3) Gravacao no banco\n[Banco de Dados]\n       ↓  (4) Confirmacao de volta\n[Servico de Pedidos]\n       ↓  (5) Evento "pedido criado" publicado\n[Fila de Mensagens]\n       ↓  (6) Consumido por servicos interessados\n[Servico de Email] [Servico de Estoque] [Servico de Logistica]\n```\n\nCada seta e uma transferencia de dados. Cada transferencia pode falhar. Cada passo pode ser sincrono ou assincrono.',
    },
    {
      type: 'text',
      content:
        '## Sincrono vs Assincrono\n\nEssa e uma das decisoes mais importantes no design de sistemas.\n\n### Comunicacao Sincrona\nO componente A chama o componente B e **espera** pela resposta antes de continuar.\n\n```\nA → chama B → espera... → recebe resposta → continua\n```\n\n**Vantagens:** simples de entender, resultado imediato, facil de depurar.\n**Desvantagens:** se B estiver lento, A fica bloqueado. Se B cair, A falha tambem.\n\n**Quando usar:** quando voce precisa da resposta para continuar (ex: validar dados, consultar saldo).\n\n### Comunicacao Assincrona\nO componente A envia uma mensagem para B e **nao espera** — continua trabalhando. B processa quando puder.\n\n```\nA → envia mensagem para fila → continua fazendo outras coisas\nB → le da fila quando disponivel → processa → resultado vai para outra fila\n```\n\n**Vantagens:** A nao fica bloqueado, sistema aguenta picos de carga, B pode cair e recuperar depois.\n**Desvantagens:** mais complexo, resultado nao e imediato, mais dificil de depurar.\n\n**Quando usar:** quando a operacao pode demorar (ex: enviar email, processar imagem, gerar relatorio).\n\n### Filas: o buffer entre produtor e consumidor\nUma fila e um componente que armazena mensagens temporariamente. O **produtor** coloca dados na fila. O **consumidor** retira e processa. A fila desacopla os dois — eles nao precisam estar ativos ao mesmo tempo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Simulacao de um pipeline de dados com fila\n# Produtor → Fila → Consumidor\n\nfrom collections import deque\nimport time\n\n# A fila: estrutura que desacopla produtor e consumidor\nfila_de_pedidos = deque()\n\n\n# PRODUTOR: gera dados e coloca na fila\ndef produtor_de_pedidos(fila, lista_de_pedidos):\n    """Recebe pedidos e os coloca na fila para processamento"""\n    for pedido in lista_de_pedidos:\n        print(f"[Produtor] Pedido recebido: {pedido[\'id\']} — colocando na fila")\n        fila.append(pedido)  # nao espera processamento!\n    print(f"[Produtor] Todos os {len(lista_de_pedidos)} pedidos estao na fila")\n\n\n# CONSUMIDOR: retira dados da fila e processa\ndef consumidor_de_pedidos(fila):\n    """Processa pedidos da fila um por um"""\n    pedidos_processados = []\n    while fila:  # enquanto houver pedidos na fila\n        pedido = fila.popleft()  # retira o mais antigo\n        resultado = processar_pedido(pedido)\n        pedidos_processados.append(resultado)\n    return pedidos_processados\n\n\n# TRANSFORMACAO: a logica de processamento de um item\ndef processar_pedido(pedido):\n    """Transforma um pedido bruto em um pedido processado"""\n    print(f"[Consumidor] Processando pedido {pedido[\'id\']}...")\n    total = sum(item["preco"] * item["quantidade"] for item in pedido["itens"])\n    return {\n        "pedido_id": pedido["id"],\n        "cliente": pedido["cliente"],\n        "total": total,\n        "status": "confirmado"\n    }\n\n\n# Simulando o fluxo\npedidos_chegando = [\n    {"id": "P001", "cliente": "Ana", "itens": [{"preco": 25.0, "quantidade": 2}]},\n    {"id": "P002", "cliente": "Bruno", "itens": [{"preco": 10.0, "quantidade": 5}, {"preco": 8.0, "quantidade": 1}]},\n    {"id": "P003", "cliente": "Carla", "itens": [{"preco": 100.0, "quantidade": 1}]},\n]\n\n# Produtor coloca na fila\nprodutor_de_pedidos(fila_de_pedidos, pedidos_chegando)\nprint(f"\\nItens na fila: {len(fila_de_pedidos)}")\n\n# Consumidor processa da fila\nresultados = consumidor_de_pedidos(fila_de_pedidos)\nprint(f"\\nResultados:")\nfor r in resultados:\n    print(f"  {r[\'pedido_id\']} — {r[\'cliente\']} — R${r[\'total\']:.2f} — {r[\'status\']}")',
        filename: 'pipeline_produtor_consumidor.py',
        description:
          'O produtor nao sabe nada sobre o consumidor — ele apenas coloca pedidos na fila. O consumidor nao sabe de onde os pedidos vieram — ele apenas processa o que encontra na fila. A fila e o buffer que os desacopla completamente.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'Pipelines de dados seguem sempre o mesmo padrao: Fonte → Transformacao → Destino. Em sistemas reais, o ETL (Extract, Transform, Load) que alimenta data warehouses segue exatamente esse padrao. O Apache Kafka, usado por LinkedIn e Netflix, e essencialmente um sistema de filas distribuidas de alta performance.',
    },
    {
      type: 'text',
      content:
        '## Eventos: notificando sem depender\n\nAlem de filas, sistemas modernos usam **eventos** para comunicacao. Quando algo acontece, o componente publica um evento. Outros componentes "ouvem" eventos que lhes interessam.\n\n```\nServico de Pedidos\n    → publica evento: {"tipo": "pedido_criado", "pedido_id": "P001"}\n\nServico de Email    → ouve "pedido_criado" → envia confirmacao ao cliente\nServico de Estoque  → ouve "pedido_criado" → reserva os produtos\nServico de Fraude   → ouve "pedido_criado" → analisa comportamento suspeito\n```\n\nO Servico de Pedidos nao sabe quantos servicos estao ouvindo. Voce pode adicionar um novo servico (ex: Servico de Fidelidade) sem mudar nada no Servico de Pedidos — ele apenas comeca a ouvir os eventos.\n\nEssa e a base da **arquitetura orientada a eventos** — um dos padroes mais poderosos para sistemas que precisam ser extensiveis.',
    },
  ],
  challenges: [
    {
      id: 'fluxo-dados-c1',
      title: 'Implemente um Pipeline de Processamento de Logs',
      description:
        'Voce precisa processar logs de um servidor web. Os logs chegam como strings brutas, precisam ser parseados, filtrados (apenas erros) e formatados para armazenamento. Implemente um pipeline com 3 estagios: parse → filtro → formatacao. Cada estagio e uma funcao que transforma a entrada e passa adiante.',
      language: 'python',
      starterCode:
        '# Pipeline de processamento de logs\n# Fluxo: logs_brutos → parse → filtro → formatacao → logs_processados\n\n# Logs brutos que chegam do servidor\nlogs_brutos = [\n    "2026-03-28 10:01:15 INFO Requisicao GET /home concluida em 45ms",\n    "2026-03-28 10:01:22 ERROR Falha ao conectar ao banco de dados: timeout",\n    "2026-03-28 10:01:35 INFO Requisicao POST /login concluida em 120ms",\n    "2026-03-28 10:01:41 ERROR Arquivo de configuracao nao encontrado: config.json",\n    "2026-03-28 10:01:55 WARNING Memoria em 85% de uso",\n    "2026-03-28 10:02:03 ERROR Servico de email indisponivel",\n]\n\n\n# ESTAGIO 1: Parsear — transformar string bruta em dicionario estruturado\ndef parsear_log(linha_bruta):\n    """Transforma "2026-03-28 10:01:15 ERROR mensagem" em dict\n    Retorna: {"data": str, "hora": str, "nivel": str, "mensagem": str}\n    Dica: use linha_bruta.split(" ", 3) para separar em no maximo 4 partes\n    """\n    # Implemente aqui\n    pass\n\n\n# ESTAGIO 2: Filtrar — manter apenas logs de erro\ndef filtrar_apenas_erros(logs_parseados):\n    """Recebe lista de dicts, retorna apenas os com nivel == "ERROR" """\n    # Implemente aqui\n    pass\n\n\n# ESTAGIO 3: Formatar — converter para formato de armazenamento\ndef formatar_para_armazenamento(logs_filtrados):\n    """Converte cada log em formato legivel para relatorio\n    Formato: "[DATA HORA] ERRO: mensagem"\n    Exemplo: "[2026-03-28 10:01:22] ERRO: Falha ao conectar ao banco..."\n    """\n    # Implemente aqui\n    pass\n\n\n# PIPELINE: conecta os tres estagios\ndef executar_pipeline(logs_brutos):\n    """Executa o pipeline completo: parse → filtro → formatacao"""\n    # Implemente conectando os tres estagios\n    pass\n\n\n# Teste\nlogs_processados = executar_pipeline(logs_brutos)\nprint("Logs de erro encontrados:")\nfor log in logs_processados:\n    print(" ", log)\n# Esperado: apenas as 3 linhas de ERROR formatadas\n',
      solution:
        '# ESTAGIO 1: Parsear\ndef parsear_log(linha_bruta):\n    partes = linha_bruta.split(" ", 3)  # separa em 4 partes: data, hora, nivel, mensagem\n    return {\n        "data": partes[0],\n        "hora": partes[1],\n        "nivel": partes[2],\n        "mensagem": partes[3]\n    }\n\n\n# ESTAGIO 2: Filtrar\ndef filtrar_apenas_erros(logs_parseados):\n    return [log for log in logs_parseados if log["nivel"] == "ERROR"]\n\n\n# ESTAGIO 3: Formatar\ndef formatar_para_armazenamento(logs_filtrados):\n    resultado = []\n    for log in logs_filtrados:\n        linha_formatada = f"[{log[\'data\']} {log[\'hora\']}] ERRO: {log[\'mensagem\']}"\n        resultado.append(linha_formatada)\n    return resultado\n\n\n# PIPELINE: conecta os tres estagios\ndef executar_pipeline(logs_brutos):\n    # Estagio 1: transformar cada linha bruta em dict\n    logs_parseados = [parsear_log(linha) for linha in logs_brutos]\n\n    # Estagio 2: filtrar apenas erros\n    apenas_erros = filtrar_apenas_erros(logs_parseados)\n\n    # Estagio 3: formatar para armazenamento\n    logs_formatados = formatar_para_armazenamento(apenas_erros)\n\n    return logs_formatados\n\n\n# Teste\nlogs_brutos = [\n    "2026-03-28 10:01:15 INFO Requisicao GET /home concluida em 45ms",\n    "2026-03-28 10:01:22 ERROR Falha ao conectar ao banco de dados: timeout",\n    "2026-03-28 10:01:35 INFO Requisicao POST /login concluida em 120ms",\n    "2026-03-28 10:01:41 ERROR Arquivo de configuracao nao encontrado: config.json",\n    "2026-03-28 10:01:55 WARNING Memoria em 85% de uso",\n    "2026-03-28 10:02:03 ERROR Servico de email indisponivel",\n]\n\nlogs_processados = executar_pipeline(logs_brutos)\nprint("Logs de erro encontrados:")\nfor log in logs_processados:\n    print(" ", log)\n# [2026-03-28 10:01:22] ERRO: Falha ao conectar ao banco de dados: timeout\n# [2026-03-28 10:01:41] ERRO: Arquivo de configuracao nao encontrado: config.json\n# [2026-03-28 10:02:03] ERRO: Servico de email indisponivel\n',
      hints: [
        'Use linha_bruta.split(" ", 3) — o segundo argumento limita o numero de divisoes, entao "2026-03-28 10:01:22 ERROR mensagem longa" divide em exatamente 4 partes.',
        'A funcao filtrar_apenas_erros pode ser uma list comprehension: [log for log in logs if log["nivel"] == "ERROR"]',
        'O pipeline e a composicao dos estagios: resultado1 = estagio1(entrada); resultado2 = estagio2(resultado1); resultado3 = estagio3(resultado2). Cada funcao transforma e passa adiante.',
      ],
    },
  ],
};
