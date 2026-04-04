import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'algoritmos-gulosos-avancados',
  moduleId: 'algoritmos',
  title: 'Algoritmos Gulosos Avancados',
  description: 'Algoritmos de Huffman, Kruskal e Dijkstra — gulosos classicos para compressao, arvores geradoras e caminhos minimos',
  order: 12,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Algoritmos Gulosos: Escolha Local Otima\n\nUm algoritmo guloso sempre faz a escolha que parece melhor no momento, sem olhar para o futuro. Quando a escolha local otima leva ao otimo global, a abordagem gulosa e correta e eficiente.\n\n### Quando gulosos funcionam?\n\nDois criterios (prova formal via teoria de matroids):\n1. **Subestrutura otima**: a solucao otima de um problema contem solucoes otimas dos subproblemas\n2. **Propriedade da escolha gulosa**: existe sempre uma solucao otima que inclui a escolha gulosa\n\n### Algoritmos classicos baseados em guloso\n\n- **Huffman**: compressao de dados — caracteres mais frequentes recebem codigos menores\n- **Kruskal / Prim**: arvore geradora minima de um grafo\n- **Dijkstra**: caminho mais curto (com pesos nao negativos)\n- **Agendamento de tarefas**: maximizar numero de tarefas concluidas',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import heapq\nfrom collections import defaultdict\n\n# --- Algoritmo de Huffman ---\n# Compressao: caracters mais frequentes -> codigos menores\nclass NoHuffman:\n    def __init__(self, char, freq):\n        self.char = char\n        self.freq = freq\n        self.esq = None\n        self.dir = None\n    \n    def __lt__(self, outro):\n        return self.freq < outro.freq  # para o heap\n\ndef construir_huffman(texto: str) -> dict[str, str]:\n    """Retorna o mapa char -> codigo binario."""\n    if not texto:\n        return {}\n    \n    # Contar frequencias\n    freq = defaultdict(int)\n    for c in texto:\n        freq[c] += 1\n    \n    # Heap minimo com nos folha\n    heap = [NoHuffman(c, f) for c, f in freq.items()]\n    heapq.heapify(heap)\n    \n    # Construir arvore: sempre combinar os dois menores\n    while len(heap) > 1:\n        esq = heapq.heappop(heap)  # menor\n        dir = heapq.heappop(heap)  # segundo menor\n        \n        pai = NoHuffman(None, esq.freq + dir.freq)\n        pai.esq = esq\n        pai.dir = dir\n        heapq.heappush(heap, pai)\n    \n    # Gerar codigos percorrendo a arvore\n    codigos = {}\n    def gerar_codigos(no, codigo=""):\n        if no is None:\n            return\n        if no.char is not None:  # folha\n            codigos[no.char] = codigo or "0"  # caso de 1 caractere\n            return\n        gerar_codigos(no.esq, codigo + "0")\n        gerar_codigos(no.dir, codigo + "1")\n    \n    gerar_codigos(heap[0])\n    return codigos\n\ntexto = "aaabbbccd"\ncodigos = construir_huffman(texto)\nprint("Codigos de Huffman:")\nfor char, codigo in sorted(codigos.items()):\n    print(f"  {char!r}: {codigo}\")\n\nbits_huffman = sum(len(codigos[c]) for c in texto)\nbits_ascii = len(texto) * 8\nprint(f"Huffman: {bits_huffman} bits vs ASCII: {bits_ascii} bits")\nprint(f"Reducao: {100 - bits_huffman/bits_ascii*100:.1f}%")\n\n# --- Algoritmo de Kruskal: Arvore Geradora Minima ---\n# Conectar todos os nos com custo minimo (sem ciclos)\nclass UnionFind:\n    def __init__(self, n):\n        self.pai = list(range(n))\n        self.rank = [0] * n\n    \n    def encontrar(self, x):\n        if self.pai[x] != x:\n            self.pai[x] = self.encontrar(self.pai[x])  # path compression\n        return self.pai[x]\n    \n    def unir(self, x, y) -> bool:\n        rx, ry = self.encontrar(x), self.encontrar(y)\n        if rx == ry:\n            return False  # ja conectados — adicionaria ciclo\n        if self.rank[rx] < self.rank[ry]:\n            rx, ry = ry, rx\n        self.pai[ry] = rx\n        if self.rank[rx] == self.rank[ry]:\n            self.rank[rx] += 1\n        return True\n\ndef kruskal(n: int, arestas: list) -> list:\n    """Retorna arestas da AGM. arestas: [(peso, u, v)]."""\n    arestas_ordenadas = sorted(arestas)  # guloso: menor peso primeiro\n    uf = UnionFind(n)\n    agm = []\n    custo = 0\n    \n    for peso, u, v in arestas_ordenadas:\n        if uf.unir(u, v):  # so adiciona se nao cria ciclo\n            agm.append((u, v, peso))\n            custo += peso\n            if len(agm) == n - 1:  # AGM completa\n                break\n    \n    return agm, custo\n\n# Grafo: 5 nos, arestas com pesos\narestas = [\n    (4, 0, 1), (8, 0, 7), (11, 1, 7), (7, 1, 2),\n    (9, 7, 8), (2, 7, 6), (6, 8, 6), (1, 6, 5),\n    (2, 2, 5), (4, 2, 3), (14, 3, 5), (10, 3, 4)\n]\nagm, custo = kruskal(9, arestas)\nprint(f"\\nAGM (Kruskal): custo total = {custo}")\nfor u, v, w in agm:\n    print(f"  {u} -- {v} (peso {w})")',
        filename: 'algoritmos_gulosos.py',
        description: 'Huffman: heap minimo para construir arvore de compressao, codigos mais curtos para chars mais frequentes. Kruskal: Union-Find com path compression para AGM, ordenar arestas e adicionar sem criar ciclos.',
      },
    },
    {
      type: 'text',
      content: '## Dijkstra: Caminho Mais Curto\n\nDijkstra e guloso: sempre expande o no com menor distancia conhecida.\n\n```python\nimport heapq\n\ndef dijkstra(grafo: dict, origem: int) -> dict:\n    dist = {no: float("inf") for no in grafo}\n    dist[origem] = 0\n    heap = [(0, origem)]  # (distancia, no)\n    \n    while heap:\n        d, u = heapq.heappop(heap)\n        if d > dist[u]:\n            continue  # ja processamos com distancia menor\n        for v, peso in grafo[u]:\n            nova_dist = dist[u] + peso\n            if nova_dist < dist[v]:\n                dist[v] = nova_dist\n                heapq.heappush(heap, (nova_dist, v))\n    \n    return dist\n\n# Grafo como lista de adjacencia\ngrafo = {\n    0: [(1, 4), (2, 1)],\n    1: [(3, 1)],\n    2: [(1, 2), (3, 5)],\n    3: []\n}\ndist = dijkstra(grafo, 0)\n# 0->0: 0, 0->1: 3 (via 2), 0->2: 1, 0->3: 4 (via 2->1)\n```\n\n**Complexidade**: O((V + E) log V) com heap binario\n\n**Limitacao**: nao funciona com pesos negativos (use Bellman-Ford nesses casos).',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Como saber se um problema pode ser resolvido com guloso? Se remover a escolha gulosa da solucao otima e substituir por outra escolha resulta em solucao igual ou pior, entao a escolha gulosa e sempre segura. Quando nao e obvio, considere programacao dinamica — ela sempre funciona para problemas com subestrutura otima, ao custo de mais memoria.',
    },
  ],
  challenges: [
    {
      id: 'guloso-c1',
      title: 'Agendamento de Tarefas',
      description: 'Dado um conjunto de tarefas, cada uma com inicio e fim, encontre o maximo de tarefas nao sobrepostas que cabem na agenda. Algoritmo guloso: sempre escolha a tarefa que termina mais cedo (e que nao conflita com a ultima selecionada).',
      language: 'python',
      starterCode: 'def max_tarefas(tarefas: list[tuple[int, int]]) -> list[tuple[int, int]]:\n    """\n    tarefas: lista de (inicio, fim)\n    Retorna: subset maximo de tarefas sem sobreposicao\n    Algoritmo: ordene por tempo de fim, selecione guloso\n    """\n    # TODO: ordenar tarefas pelo tempo de fim\n    \n    selecionadas = []\n    ultimo_fim = -1  # fim da ultima tarefa selecionada\n    \n    for inicio, fim in tarefas:  # tarefas ja ordenadas por fim\n        # TODO: selecionar se nao conflita com a ultima\n        # (inicio >= ultimo_fim)\n        pass\n    \n    return selecionadas\n\n# Testes\ntarefas = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]\nresultado = max_tarefas(tarefas)\nprint(f"Tarefas selecionadas: {len(resultado)}")\nprint(resultado)\n# Esperado: 4 tarefas — [(1,4), (5,7), (8,11), (12,14)]\n',
      solution: 'def max_tarefas(tarefas: list[tuple[int, int]]) -> list[tuple[int, int]]:\n    """\n    Seleciona o maximo de tarefas nao sobrepostas.\n    Estrategia gulosa: sempre escolha a que termina mais cedo.\n    """\n    # Guloso: ordenar por tempo de fim (menor primeiro)\n    tarefas_ord = sorted(tarefas, key=lambda t: t[1])\n    \n    selecionadas = []\n    ultimo_fim = -1\n    \n    for inicio, fim in tarefas_ord:\n        if inicio >= ultimo_fim:  # nao conflita\n            selecionadas.append((inicio, fim))\n            ultimo_fim = fim\n    \n    return selecionadas\n\ntarefas = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9), (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]\nresultado = max_tarefas(tarefas)\nprint(f"Tarefas selecionadas: {len(resultado)}")\nprint(resultado)\n# [(1, 4), (5, 7), (8, 11), (12, 14)] — 4 tarefas\n\n# Por que funciona?\n# Intuitivo: escolher a que termina mais cedo deixa mais espaco para as proximas.\n# Prova: se substituirmos a escolha gulosa por qualquer outra que termine depois,\n# o espaco restante e menor ou igual — logo nao conseguimos mais tarefas.\n',
      hints: [
        'Ordene por tempo de fim: tarefas.sort(key=lambda t: t[1])',
        'A condicao para selecionar: inicio >= ultimo_fim (nao sobreposicao)',
        'Atualize ultimo_fim = fim ao selecionar cada tarefa',
        'A prova de correcao: qualquer outra escolha no inicio deixa menos espaco — a que termina mais cedo e sempre tao boa quanto qualquer alternativa',
      ],
    },
  ],
};
