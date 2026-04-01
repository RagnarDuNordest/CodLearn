import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'async-await',
  moduleId: 'concorrencia',
  title: 'Async e Await',
  description: 'Domine programacao assincrona com async/await, event loop e asyncio.gather para executar multiplas coroutines concorrentemente',
  order: 2,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content:
        '## O Event Loop: o coracao do asyncio\n\nO **event loop** e o mecanismo central da programacao assincrona em Python. Ele funciona como um gerenciador de tarefas que:\n\n1. Mantém uma fila de coroutines prontas para executar\n2. Executa uma coroutine ate ela chegar em um `await`\n3. Enquanto a coroutine aguarda (ex: resposta de rede), executa outra\n4. Quando a operacao pendente termina, retorna a coroutine original\n\n```\nEvent Loop:\n  [coroutine A] -> await network -> pausa A\n  [coroutine B] -> executa B\n  [coroutine B] -> await disk   -> pausa B\n  [coroutine C] -> executa C\n  [rede respondeu] -> retoma A\n  ...\n```\n\nTudo isso acontece em **uma unica thread** — sem GIL, sem overhead de troca de contexto entre threads. Por isso asyncio escala para milhares de conexoes simultaneas.',
    },
    {
      type: 'text',
      content:
        '## async def e await: fundamentos\n\n### async def\nDefine uma **coroutine function**. Ao ser chamada, nao executa imediatamente — retorna um objeto coroutine que precisa ser aguardado.\n\n### await\nSo pode ser usado dentro de funcoes `async def`. Suspende a coroutine atual ate que a expressao awaitable seja concluida, permitindo que o event loop execute outras coroutines enquanto espera.\n\n### Awaitables\nSao objetos que podem ser usados com `await`:\n- **Coroutines**: retornadas por `async def`\n- **Tasks**: criadas com `asyncio.create_task()`\n- **Futures**: representam resultados futuros de operacoes de baixo nivel\n\n### asyncio.run()\nPonto de entrada: cria o event loop, executa uma coroutine e fecha o loop.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import asyncio\nimport time\n\n# --- Funcao async basica ---\nasync def saudacao(nome, delay):\n    print(f"Ola, {nome}!")\n    await asyncio.sleep(delay)  # NAO bloqueia — cede controle ao event loop\n    print(f"Ate logo, {nome}!")\n    return f"Conversa com {nome} concluida"\n\n# --- Executar uma unica coroutine ---\nasync def exemplo_simples():\n    resultado = await saudacao("Ana", 1)\n    print(resultado)\n\nasyncio.run(exemplo_simples())\n\n\n# --- Diferenca entre sync e async sleep ---\ndef demo_bloqueante():\n    print("Inicio bloqueante")\n    time.sleep(2)   # BLOQUEIA a thread inteira — nada mais executa\n    print("Fim bloqueante")\n\nasync def demo_assincrona():\n    print("Inicio assincrono")\n    await asyncio.sleep(2)  # cede controle — event loop pode rodar outras tarefas\n    print("Fim assincrono")\n\n\n# --- async def nao executa ao ser chamada ---\nasync def main():\n    coroutine_obj = saudacao("Bob", 1)  # retorna objeto coroutine — NAO executou!\n    print(type(coroutine_obj))  # <class \'coroutine\'>\n\n    resultado = await coroutine_obj  # AGORA executa\n    print(resultado)\n\nasyncio.run(main())\n\n\n# --- Funcao async pode ter try/except/finally normalmente ---\nasync def buscar_com_timeout(url, timeout):\n    try:\n        print(f"Buscando {url}...")\n        await asyncio.wait_for(asyncio.sleep(5), timeout=timeout)\n        return f"Dados de {url}"\n    except asyncio.TimeoutError:\n        print(f"Timeout ao buscar {url}")\n        return None\n    finally:\n        print(f"Limpeza apos busca de {url}")\n\nasyncio.run(buscar_com_timeout("api.exemplo.com", timeout=2))',
        filename: 'async_await_basico.py',
        description:
          'Fundamentos de async/await. A funcao async nao executa ao ser chamada — retorna um objeto coroutine. O await suspende a coroutine atual sem bloquear o event loop.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Nunca use time.sleep() dentro de funcoes async — isso bloqueia o event loop inteiro e derrota o proposito do asyncio. Sempre use await asyncio.sleep(). Da mesma forma, operacoes de I/O sincronas (requests, open() em arquivos grandes) bloqueiam o event loop.',
    },
    {
      type: 'text',
      content:
        '## asyncio.gather: concorrencia real\n\n`asyncio.gather(*coroutines)` executa multiplas coroutines **concorrentemente** — todas iniciam quase ao mesmo tempo e o event loop alterna entre elas durante os awaits.\n\n### asyncio.gather vs await sequencial\n\n```python\n# SEQUENCIAL — total ~3s (1 + 1 + 1)\nresult1 = await tarefa(1)\nresult2 = await tarefa(1)\nresult3 = await tarefa(1)\n\n# CONCORRENTE — total ~1s\nresult1, result2, result3 = await asyncio.gather(\n    tarefa(1), tarefa(1), tarefa(1)\n)\n```\n\n### asyncio.create_task vs gather\n\n`create_task()` agenda uma coroutine para executar imediatamente no event loop (sem precisar de await naquele momento). Util quando voce quer iniciar uma tarefa e continuar fazendo outras coisas antes de esperar o resultado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import asyncio\nimport time\n\n# Simula busca de dados de uma API (sem biblioteca real)\nasync def buscar_api(endpoint, delay):\n    print(f"  Iniciando requisicao para {endpoint}")\n    await asyncio.sleep(delay)  # simula latencia de rede\n    dados = {"endpoint": endpoint, "status": "ok", "itens": delay * 10}\n    print(f"  Resposta recebida de {endpoint} ({delay}s)")\n    return dados\n\n\n# --- Sequencial: aguarda um por vez ---\nasync def buscar_sequencial():\n    inicio = time.time()\n    r1 = await buscar_api("/usuarios", 1.0)\n    r2 = await buscar_api("/produtos", 1.5)\n    r3 = await buscar_api("/pedidos", 0.8)\n    print(f"Sequencial: {time.time() - inicio:.1f}s")  # ~3.3s\n    return [r1, r2, r3]\n\n\n# --- Concorrente com gather: todas ao mesmo tempo ---\nasync def buscar_concorrente():\n    inicio = time.time()\n    resultados = await asyncio.gather(\n        buscar_api("/usuarios", 1.0),\n        buscar_api("/produtos", 1.5),\n        buscar_api("/pedidos", 0.8),\n    )\n    print(f"Concorrente: {time.time() - inicio:.1f}s")  # ~1.5s (maior delay)\n    return resultados  # lista na mesma ordem das coroutines\n\n\n# --- gather com tratamento de erros ---\nasync def buscar_com_falha(endpoint, falhar=False):\n    await asyncio.sleep(0.5)\n    if falhar:\n        raise ConnectionError(f"Falha ao conectar em {endpoint}")\n    return f"Dados de {endpoint}"\n\nasync def buscar_tolerante_a_falhas():\n    # return_exceptions=True: excecoes viram resultados ao inves de propagar\n    resultados = await asyncio.gather(\n        buscar_com_falha("/api/a"),\n        buscar_com_falha("/api/b", falhar=True),\n        buscar_com_falha("/api/c"),\n        return_exceptions=True\n    )\n    for r in resultados:\n        if isinstance(r, Exception):\n            print(f"Erro: {r}")\n        else:\n            print(f"Sucesso: {r}")\n\n\n# --- create_task: inicia tarefa sem await imediato ---\nasync def com_create_task():\n    # Inicia a tarefa no background imediatamente\n    tarefa = asyncio.create_task(buscar_api("/background", 2))\n\n    # Faz outras coisas enquanto a tarefa roda\n    print("Fazendo outras operacoes...")\n    await asyncio.sleep(0.5)\n    print("Ainda fazendo operacoes...")\n    await asyncio.sleep(0.5)\n\n    # Agora espera o resultado\n    resultado = await tarefa\n    print(f"Tarefa background concluida: {resultado}")\n\n\nasync def main():\n    print("=== Sequencial ===")\n    await buscar_sequencial()\n\n    print("\\n=== Concorrente ===")\n    await buscar_concorrente()\n\n    print("\\n=== Tolerante a falhas ===")\n    await buscar_tolerante_a_falhas()\n\n    print("\\n=== create_task ===")\n    await com_create_task()\n\nasyncio.run(main())',
        filename: 'asyncio_gather.py',
        description:
          'asyncio.gather executa coroutines concorrentemente — todas iniciam quase ao mesmo tempo. return_exceptions=True permite tratar falhas individuais sem cancelar as demais.',
      },
    },
    {
      type: 'text',
      content:
        '## Async vs Threads: quando escolher cada um\n\n| Criterio | asyncio | threading |\n|---|---|---|\n| Modelo | Cooperativo (await cede) | Preemptivo (SO decide) |\n| Thread | Uma thread | Uma por tarefa |\n| Escalabilidade | Milhares de tarefas | Centenas (custo por thread) |\n| Seguranca | Sem race conditions em coroutines | Requer locks |\n| Bibliotecas | Precisa de libs async (aiohttp, asyncpg) | Funciona com qualquer lib |\n| Debugging | Stacktrace claro | Stacktrace confuso |\n\n### Regra pratica\n- **asyncio**: nova base de codigo, bibliotecas async disponiveis, alta concorrencia\n- **threading**: integracao com libs existentes que nao tem versao async, codigo legado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import asyncio\nimport time\n\n# --- Simulando download de multiplas URLs com asyncio ---\n# (Em producao: usar aiohttp ao inves de asyncio.sleep)\n\nasync def download_url(url, tamanho_kb):\n    """Simula download de uma URL com aiohttp."""\n    print(f"Iniciando download: {url}")\n    # Em producao: async with aiohttp.ClientSession() as session:\n    #                  async with session.get(url) as response:\n    #                      return await response.read()\n    await asyncio.sleep(tamanho_kb / 1000)  # simula velocidade de rede\n    conteudo = f"<html>Conteudo de {url} ({tamanho_kb}KB)</html>"\n    print(f"Concluido: {url} ({tamanho_kb}KB)")\n    return conteudo\n\nasync def download_paralelo(urls_e_tamanhos):\n    """Baixa todas as URLs concorrentemente e retorna os resultados."""\n    inicio = time.time()\n\n    tarefas = [\n        download_url(url, tamanho)\n        for url, tamanho in urls_e_tamanhos\n    ]\n\n    resultados = await asyncio.gather(*tarefas)\n\n    tempo_total = time.time() - inicio\n    tamanho_total = sum(t for _, t in urls_e_tamanhos)\n\n    print(f"\\n{len(urls_e_tamanhos)} downloads em {tempo_total:.2f}s")\n    print(f"vs sequencial estimado: {tamanho_total/1000:.2f}s")\n    print(f"Speedup: {(tamanho_total/1000) / tempo_total:.1f}x")\n\n    return resultados\n\n\nurls = [\n    ("https://exemplo.com/pagina1", 500),\n    ("https://exemplo.com/pagina2", 300),\n    ("https://api.servico.com/dados", 800),\n    ("https://cdn.site.com/assets", 1200),\n    ("https://banco.dados.com/query", 200),\n]\n\nasyncio.run(download_paralelo(urls))\n\n# Com aiohttp real, o codigo seria identico — apenas a implementacao\n# de download_url mudaria para usar a sessao HTTP real',
        filename: 'download_paralelo_asyncio.py',
        description:
          'Padrao de download paralelo com asyncio. Em producao substitua asyncio.sleep por aiohttp — a estrutura com gather permanece identica.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Use asyncio.Semaphore para limitar o numero de coroutines concorrentes: "async with asyncio.Semaphore(10):" garante que no maximo 10 downloads ocorram ao mesmo tempo, evitando sobrecarregar servidores ou esgotar conexoes.',
    },
  ],
  challenges: [
    {
      id: 'async-c1',
      title: 'Download Paralelo com asyncio.gather',
      description:
        'Implemente a funcao buscar_todos(endpoints) que recebe uma lista de endpoints e retorna os dados de todos eles concorrentemente usando asyncio.gather. A funcao buscar_endpoint ja esta implementada — voce so precisa chamar todas em paralelo. O resultado deve ser uma lista de dicionarios na mesma ordem dos endpoints.',
      language: 'python',
      starterCode:
        'import asyncio\nimport time\n\n# Funcao ja implementada — simula chamada a uma API\nasync def buscar_endpoint(endpoint):\n    delays = {\n        "/usuarios": 1.0,\n        "/produtos": 0.8,\n        "/pedidos": 1.2,\n        "/relatorios": 0.5,\n        "/configuracoes": 0.3,\n    }\n    delay = delays.get(endpoint, 0.5)\n    await asyncio.sleep(delay)\n    return {"endpoint": endpoint, "dados": f"resultado de {endpoint}", "tempo": delay}\n\n\nasync def buscar_todos(endpoints):\n    # TODO: implemente usando asyncio.gather\n    # Deve retornar lista de resultados na mesma ordem dos endpoints\n    pass\n\n\nasync def main():\n    endpoints = ["/usuarios", "/produtos", "/pedidos", "/relatorios", "/configuracoes"]\n\n    inicio = time.time()\n    resultados = await buscar_todos(endpoints)\n    tempo = time.time() - inicio\n\n    for r in resultados:\n        print(f"{r[\'endpoint\']}: {r[\'dados\']}")\n\n    print(f"\\nTempo total: {tempo:.1f}s")\n    print(f"Correto (< 1.5s): {tempo < 1.5}")  # deve ser True com gather\n\nasyncio.run(main())\n',
      solution:
        'import asyncio\nimport time\n\n# Funcao ja implementada — simula chamada a uma API\nasync def buscar_endpoint(endpoint):\n    delays = {\n        "/usuarios": 1.0,\n        "/produtos": 0.8,\n        "/pedidos": 1.2,\n        "/relatorios": 0.5,\n        "/configuracoes": 0.3,\n    }\n    delay = delays.get(endpoint, 0.5)\n    await asyncio.sleep(delay)\n    return {"endpoint": endpoint, "dados": f"resultado de {endpoint}", "tempo": delay}\n\n\nasync def buscar_todos(endpoints):\n    coroutines = [buscar_endpoint(ep) for ep in endpoints]\n    resultados = await asyncio.gather(*coroutines)\n    return list(resultados)\n\n\nasync def main():\n    endpoints = ["/usuarios", "/produtos", "/pedidos", "/relatorios", "/configuracoes"]\n\n    inicio = time.time()\n    resultados = await buscar_todos(endpoints)\n    tempo = time.time() - inicio\n\n    for r in resultados:\n        print(f"{r[\'endpoint\']}: {r[\'dados\']}")\n\n    print(f"\\nTempo total: {tempo:.1f}s")\n    print(f"Correto (< 1.5s): {tempo < 1.5}")  # deve ser True com gather\n\nasyncio.run(main())\n',
      hints: [
        'Crie uma lista de coroutines com list comprehension: [buscar_endpoint(ep) for ep in endpoints]',
        'Passe a lista para gather usando unpacking: await asyncio.gather(*lista_de_coroutines)',
        'gather retorna os resultados na mesma ordem das coroutines — nao precisa ordenar depois',
      ],
    },
  ],
};
