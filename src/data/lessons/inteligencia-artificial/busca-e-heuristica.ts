import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'busca-e-heuristica',
  moduleId: 'inteligencia-artificial',
  title: 'Algoritmos de Busca e Heuristica',
  description: 'Aprenda como agentes de IA encontram solucoes: busca em largura, profundidade, busca gulosa e o algoritmo A*.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## Como a IA Resolve Problemas?\n\nUm dos desafios fundamentais da IA e resolver problemas que exigem **sequencias de decisoes** — encontrar o caminho mais curto, resolver um cubo magico ou planejar jogadas num jogo.\n\nPara isso usamos **algoritmos de busca**: formas sistematicas de explorar um espaco de possibilidades ate encontrar a solucao.\n\nCada abordagem tem suas vantagens:\n- **Busca exaustiva** — tenta tudo (lenta)\n- **Busca heuristica** — usa estimativas para ir na direcao certa\n- **A*** — combina custo real + estimativa (otima)',
    },
    {
      type: 'text',
      content: '## Busca em Largura (BFS)\n\nA **Busca em Largura** explora todos os nos de uma camada antes de ir para a proxima.\n\n**Garantias:** Encontra sempre o **caminho mais curto** (em numero de passos).\n**Desvantagem:** Pode usar muita memoria em grafos grandes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'from collections import deque\n\ndef bfs(grafo, inicio, destino):\n    fila = deque([[inicio]])\n    visitados = set([inicio])\n\n    while fila:\n        caminho = fila.popleft()\n        no_atual = caminho[-1]\n\n        if no_atual == destino:\n            return caminho\n\n        for vizinho in grafo.get(no_atual, []):\n            if vizinho not in visitados:\n                visitados.add(vizinho)\n                fila.append(caminho + [vizinho])\n\n    return None\n\ngrafo = {\n    \'A\': [\'B\', \'C\'],\n    \'B\': [\'D\', \'E\'],\n    \'C\': [\'F\'],\n    \'D\': [], \'E\': [], \'F\': []\n}\n\ncaminho = bfs(grafo, \'A\', \'F\')\nprint("Caminho encontrado:", caminho)\n# [\'A\', \'C\', \'F\']',
        filename: 'bfs.py',
        description: 'Busca em Largura encontrando o caminho mais curto num grafo.',
      },
    },
    {
      type: 'text',
      content: '## Algoritmo A* — A Busca Inteligente\n\nO **A*** combina:\n\n- **g(n)** — custo real do caminho percorrido\n- **h(n)** — heuristica: estimativa do custo restante\n- **f(n) = g(n) + h(n)** — prioridade de exploracao\n\nSempre expande o no com menor `f(n)`. Se a heuristica for admissivel, garante o caminho otimo.\n\nUsado em: GPS, jogos, planejamento de robos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'import heapq\n\ndef astar(grafo, inicio, destino, heuristica):\n    fila = [(heuristica[inicio], 0, inicio, [inicio])]\n    visitados = set()\n\n    while fila:\n        f, g, no, caminho = heapq.heappop(fila)\n\n        if no in visitados:\n            continue\n        visitados.add(no)\n\n        if no == destino:\n            return caminho, g\n\n        for vizinho, custo in grafo.get(no, []):\n            if vizinho not in visitados:\n                g_novo = g + custo\n                f_novo = g_novo + heuristica[vizinho]\n                heapq.heappush(fila, (f_novo, g_novo, vizinho, caminho + [vizinho]))\n\n    return None, float(\'inf\')\n\ngrafo = {\n    \'A\': [(\'B\', 1), (\'C\', 4)],\n    \'B\': [(\'C\', 2), (\'D\', 5)],\n    \'C\': [(\'D\', 1)],\n    \'D\': []\n}\nh = {\'A\': 4, \'B\': 3, \'C\': 1, \'D\': 0}\n\ncaminho, custo = astar(grafo, \'A\', \'D\', h)\nprint(f"Caminho: {caminho}, Custo: {custo}")',
        filename: 'astar.py',
        description: 'Implementacao do A* com heuristica para encontrar o caminho otimo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'O A* e usado no GPS do seu celular para calcular rotas. A heuristica tipica e a distancia em linha reta ate o destino, que nunca superestima o custo real pelas ruas.',
    },
  ],
};
