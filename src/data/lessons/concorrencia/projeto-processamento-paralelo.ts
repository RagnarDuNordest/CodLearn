import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-processamento-paralelo',
  moduleId: 'concorrencia',
  title: 'Projeto: Processamento Paralelo',
  description: 'Compare e aplique threads, multiprocessing e async em um pipeline de processamento real, escolhendo a abordagem certa para cada tipo de tarefa',
  order: 5,
  estimatedMinutes: 60,
  sections: [
    {
      type: 'text',
      content: '## Projeto: Pipeline de Processamento\n\nVoce tem 20 "arquivos" para processar. Cada arquivo passa por tres etapas:\n1. **Download** (I/O-bound: espera rede) — 1 segundo por arquivo\n2. **Analise** (CPU-bound: calculo intenso) — 0.5 segundos por arquivo\n3. **Upload** (I/O-bound: espera rede) — 0.5 segundos por arquivo\n\nTotal sequencial: 20 * 2s = 40 segundos\n\n### A estrategia\n- Para I/O-bound (download/upload): **async** ou **threads**\n- Para CPU-bound (analise): **multiprocessing**\n- Combinar os dois com um pipeline Producer-Consumer',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import asyncio\nimport time\nfrom multiprocessing import Pool\nfrom concurrent.futures import ThreadPoolExecutor\n\n# Simulando as tres etapas\nasync def baixar_arquivo(nome: str) -> dict:\n    """I/O-bound: simula download."""\n    await asyncio.sleep(1.0)  # nao bloqueia o event loop\n    return {"nome": nome, "dados": f"conteudo de {nome}"}\n\ndef analisar_arquivo(arquivo: dict) -> dict:\n    """CPU-bound: simula analise pesada."""\n    time.sleep(0.5)  # bloqueia — roda em processo separado\n    return {**arquivo, "resultado": len(arquivo["dados"]) * 42}\n\nasync def fazer_upload(arquivo: dict) -> str:\n    """I/O-bound: simula upload."""\n    await asyncio.sleep(0.5)\n    return f"Upload de {arquivo[\'nome\']} concluido"\n\nasync def processar_com_pipeline(nomes: list[str]) -> list:\n    """Pipeline: async para I/O + multiprocessing para CPU."""\n    # Fase 1: download de todos em paralelo (async)\n    t0 = time.time()\n    arquivos = await asyncio.gather(*[baixar_arquivo(n) for n in nomes])\n    print(f"Downloads: {time.time()-t0:.1f}s ({len(arquivos)} arquivos)")\n\n    # Fase 2: analise em paralelo (multiprocessing)\n    t0 = time.time()\n    loop = asyncio.get_event_loop()\n    with Pool(4) as pool:\n        analisados = await loop.run_in_executor(\n            None, pool.map, analisar_arquivo, arquivos\n        )\n    print(f"Analise: {time.time()-t0:.1f}s")\n\n    # Fase 3: upload de todos em paralelo (async)\n    t0 = time.time()\n    resultados = await asyncio.gather(*[fazer_upload(a) for a in analisados])\n    print(f"Uploads: {time.time()-t0:.1f}s")\n    return resultados\n\nif __name__ == "__main__":\n    nomes = [f"arquivo_{i}" for i in range(20)]\n    resultados = asyncio.run(processar_com_pipeline(nomes))\n    print(f"Total: {len(resultados)} arquivos processados")',
        filename: 'pipeline_paralelo.py',
        description: 'Pipeline hibrido: asyncio.gather para downloads e uploads em paralelo (I/O-bound), Pool.map para analise em processos separados (CPU-bound). Total: ~3.5s em vez de 40s sequencial.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Regra pratica: I/O-bound (rede, disco, banco) use async ou threads. CPU-bound (calculos, processamento de dados) use multiprocessing. Nunca o contrario — threading nao acelera CPU-bound por causa do GIL.',
    },
  ],
  challenges: [
    {
      id: 'pipeline-c1',
      title: 'Implemente o Pipeline Completo',
      description: 'Implemente um pipeline que processa 10 URLs: busca cada URL com async, processa o resultado (CPU-bound) com ThreadPoolExecutor.map, e salva o resultado. Compare o tempo com a versao sequencial.',
      language: 'python',
      starterCode: 'import asyncio\nimport time\nfrom concurrent.futures import ThreadPoolExecutor\n\n# Simulacoes\nasync def buscar_url(url: str) -> dict:\n    await asyncio.sleep(0.3)  # simula latencia de rede\n    return {"url": url, "tamanho": len(url) * 1000}\n\ndef processar_dado(dado: dict) -> dict:\n    time.sleep(0.2)  # simula CPU-bound\n    return {**dado, "palavras": dado["tamanho"] // 5}\n\ndef salvar_resultado(resultado: dict) -> str:\n    return f"Salvo: {resultado[\'url\']}"\n\nurls = [f"https://exemplo.com/pagina/{i}" for i in range(10)]\n\n# Versao sequencial (referencia)\nt0 = time.time()\nfor url in urls:\n    dado = asyncio.run(buscar_url(url))\n    processado = processar_dado(dado)\n    salvar_resultado(processado)\nprint(f"Sequencial: {time.time()-t0:.1f}s")\n\n# TODO: implemente versao paralela\n# 1. Use asyncio.gather para buscar todas as URLs de uma vez\n# 2. Use ThreadPoolExecutor para processar em paralelo\n# 3. Salve todos os resultados\nasync def pipeline_paralelo(urls: list[str]) -> list:\n    # TODO\n    pass\n\nresultados = asyncio.run(pipeline_paralelo(urls))\nprint(f"Paralelo: {len(resultados)} resultados")\n',
      solution: 'import asyncio\nimport time\nfrom concurrent.futures import ThreadPoolExecutor\n\nasync def buscar_url(url: str) -> dict:\n    await asyncio.sleep(0.3)\n    return {"url": url, "tamanho": len(url) * 1000}\n\ndef processar_dado(dado: dict) -> dict:\n    time.sleep(0.2)\n    return {**dado, "palavras": dado["tamanho"] // 5}\n\ndef salvar_resultado(resultado: dict) -> str:\n    return f"Salvo: {resultado[\'url\']}"\n\nurls = [f"https://exemplo.com/pagina/{i}" for i in range(10)]\n\nt0 = time.time()\nfor url in urls:\n    dado = asyncio.run(buscar_url(url))\n    processado = processar_dado(dado)\n    salvar_resultado(processado)\nprint(f"Sequencial: {time.time()-t0:.1f}s")  # ~5.0s\n\nasync def pipeline_paralelo(urls: list[str]) -> list:\n    # Fase 1: buscar todas as URLs em paralelo (I/O-bound)\n    dados = await asyncio.gather(*[buscar_url(u) for u in urls])\n\n    # Fase 2: processar em paralelo com thread pool (CPU-bound simulado)\n    loop = asyncio.get_event_loop()\n    with ThreadPoolExecutor(max_workers=4) as executor:\n        processados = list(await loop.run_in_executor(\n            executor, lambda: list(map(processar_dado, dados))\n        ))\n\n    # Fase 3: salvar todos\n    resultados = [salvar_resultado(p) for p in processados]\n    return resultados\n\nt0 = time.time()\nresultados = asyncio.run(pipeline_paralelo(urls))\nprint(f"Paralelo: {time.time()-t0:.1f}s")  # ~0.5s\nprint(f"Resultados: {len(resultados)}")\n',
      hints: [
        'Use asyncio.gather(*[buscar_url(u) for u in urls]) para buscar todas as URLs ao mesmo tempo',
        'Para o processamento, use loop.run_in_executor(executor, ...) para nao bloquear o event loop',
        'O resultado esperado e: sequencial ~5s, paralelo ~0.5s (10x mais rapido)',
      ],
    },
  ],
};
