import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'escalabilidade-basica',
  moduleId: 'pensamento-sistemas',
  title: 'Escalabilidade Basica',
  description: 'Entenda o que significa escalar um sistema, como identificar gargalos e as tecnicas basicas para resolve-los',
  order: 5,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O Que E Escalabilidade\n\nUm sistema escalavel consegue lidar com mais carga sem degradar proporcionalmente a performance ou o custo.\n\nEscalar nao e apenas "colocar um servidor maior". E entender onde o sistema vai quebrar antes que ele quebre.\n\n### Escala Vertical vs Horizontal\n\n**Escala Vertical (Scale Up)**\nAdicionar mais recursos ao mesmo servidor: mais CPU, mais RAM, SSD mais rapido.\n- Simples de implementar\n- Tem limite fisico (nao ha servidor infinito)\n- Ponto unico de falha\n\n**Escala Horizontal (Scale Out)**\nAdicionar mais servidores e distribuir a carga entre eles.\n- Potencialmente ilimitado\n- Mais complexo (como dividir o trabalho? como sincronizar estado?)\n- Mais resiliente a falhas\n\n### O Que E Um Gargalo?\n\nUm gargalo e o componente mais lento do sistema — o ponto que limita a capacidade do todo. De nada adianta ter um processador ultra rapido se o banco de dados responde lentamente.\n\n> "A corrente e tao forte quanto seu elo mais fraco."',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Identificando gargalos com medicao de tempo\nimport time\n\ndef buscar_produtos_com_gargalo(categoria, todos_produtos):\n    """Versao lenta: busca linear O(n)"""\n    t0 = time.time()\n    resultado = []\n    for produto in todos_produtos:  # percorre TODOS os produtos\n        if produto["categoria"] == categoria:\n            resultado.append(produto)\n    t1 = time.time()\n    print(f"Busca linear: {(t1-t0)*1000:.2f}ms para {len(todos_produtos)} produtos")\n    return resultado\n\ndef construir_indice(produtos):\n    """Pre-processa uma vez, busca rapida sempre"""\n    indice = {}  # categoria -> lista de produtos\n    for produto in produtos:\n        cat = produto["categoria"]\n        if cat not in indice:\n            indice[cat] = []\n        indice[cat].append(produto)\n    return indice\n\ndef buscar_produtos_rapido(categoria, indice):\n    """Versao rapida: lookup O(1) no indice"""\n    t0 = time.time()\n    resultado = indice.get(categoria, [])\n    t1 = time.time()\n    print(f"Busca por indice: {(t1-t0)*1000:.4f}ms")\n    return resultado\n\n# Simulacao com 100.000 produtos\nimport random\nprodutos = [\n    {"id": i, "nome": f"Produto {i}", "categoria": random.choice(["A","B","C","D"])}\n    for i in range(100_000)\n]\n\nbuscar_produtos_com_gargalo("A", produtos)\n# Busca linear: ~50ms para 100000 produtos\n\nindice = construir_indice(produtos)\nbuscar_produtos_rapido("A", indice)\n# Busca por indice: ~0.01ms — 5000x mais rapido',
        filename: 'gargalo_busca.py',
        description:
          'A busca linear O(n) e um gargalo classico. Construir um indice (dicionario por categoria) transforma O(n) em O(1). Meca antes de otimizar — otimizacao sem medicao e chute.',
      },
    },
    {
      type: 'text',
      content:
        '## Cache: A Solucao Para Gargalos de Leitura\n\nSe o gargalo e uma operacao lenta que e repetida frequentemente com os mesmos parametros, **cache** resolve.\n\nCache armazena o resultado de uma operacao cara para reusar sem recalcular.\n\n```python\n# Sem cache: chama API externa a cada requisicao (lento)\ndef buscar_cambio(moeda):\n    return api_externa.get(f"/cambio/{moeda}")  # 200ms cada chamada\n\n# Com cache: reusar resultado por 60 segundos\ncache = {}\ndef buscar_cambio_com_cache(moeda):\n    agora = time.time()\n    if moeda in cache:\n        valor, timestamp = cache[moeda]\n        if agora - timestamp < 60:  # valido por 60 segundos\n            return valor  # 0ms\n    resultado = api_externa.get(f"/cambio/{moeda}")  # 200ms\n    cache[moeda] = (resultado, agora)\n    return resultado\n```\n\n### Quando NAO usar cache\n- Dados que mudam com muita frequencia\n- Dados que precisam ser sempre exatos (saldo bancario)\n- Quando o custo de invalidar o cache e maior que o custo de recalcular',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Cache invalido e pior que sem cache — voce serve dados errados com confianca. Sempre defina: por quanto tempo o cache e valido? O que dispara a invalidacao?',
    },
  ],
  challenges: [
    {
      id: 'escala-c1',
      title: 'Identifique e Resolva o Gargalo',
      description:
        'O sistema abaixo verifica se um usuario tem permissao para acessar um recurso. Em producao com 10.000 usuarios e 100 recursos, a funcao verificar_acesso e chamada milhares de vezes por segundo e esta lenta. Identifique o gargalo e otimize.',
      language: 'python',
      starterCode:
        '# Sistema com gargalo — otimize a funcao verificar_acesso\n\n# Dados do sistema (simulando banco de dados)\npermissoes = [\n    {"usuario_id": 1, "recurso": "admin"},\n    {"usuario_id": 1, "recurso": "relatorios"},\n    {"usuario_id": 2, "recurso": "relatorios"},\n    {"usuario_id": 3, "recurso": "admin"},\n    # ... imagine 10.000 entradas aqui\n]\n\ndef verificar_acesso_lento(usuario_id, recurso):\n    """Busca linear — O(n) a cada chamada"""\n    for permissao in permissoes:\n        if permissao["usuario_id"] == usuario_id and permissao["recurso"] == recurso:\n            return True\n    return False\n\n# Esta funcao e chamada milhares de vezes por segundo\n# Cada chamada percorre TODAS as permissoes\n\n# TODO: Crie uma estrutura de dados melhor e uma funcao verificar_acesso_rapido\n# Dica: como voce organizaria as permissoes para busca O(1)?\n\nprint(verificar_acesso_lento(1, "admin"))     # True\nprint(verificar_acesso_lento(2, "admin"))     # False\nprint(verificar_acesso_lento(1, "relatorios")) # True\n',
      solution:
        '# Solucao: construir um set de (usuario_id, recurso) para lookup O(1)\n\npermissoes_lista = [\n    {"usuario_id": 1, "recurso": "admin"},\n    {"usuario_id": 1, "recurso": "relatorios"},\n    {"usuario_id": 2, "recurso": "relatorios"},\n    {"usuario_id": 3, "recurso": "admin"},\n]\n\n# Pre-processa UMA VEZ na inicializacao\n# Transforma lista em set de tuplas para lookup O(1)\npermissoes_indice = {\n    (p["usuario_id"], p["recurso"])\n    for p in permissoes_lista\n}\n# Resultado: {(1, "admin"), (1, "relatorios"), (2, "relatorios"), (3, "admin")}\n\ndef verificar_acesso_rapido(usuario_id, recurso):\n    """Lookup O(1) — independente do numero de permissoes"""\n    return (usuario_id, recurso) in permissoes_indice\n\n# Teste\nprint(verificar_acesso_rapido(1, "admin"))      # True\nprint(verificar_acesso_rapido(2, "admin"))      # False\nprint(verificar_acesso_rapido(1, "relatorios")) # True\n\n# Com 10.000 permissoes:\n# verificar_acesso_lento: percorre ate 10.000 entradas por chamada\n# verificar_acesso_rapido: acesso direto, sempre constante\n\n# NOTA: o custo foi pago UMA VEZ na construcao do set\n# Todas as consultas subsequentes sao O(1)\n',
      hints: [
        'A busca linear percorre toda a lista ate encontrar ou desistir. O que acontece com 10.000 entradas e 1.000 chamadas/segundo?',
        'Um set em Python tem lookup O(1). Voce pode armazenar tuplas (usuario_id, recurso) em um set para verificar pertencimento instantaneamente.',
        'O truque: pague o custo de construir o indice UMA VEZ na inicializacao. Todas as consultas futuras serao O(1).',
      ],
    },
  ],
};
