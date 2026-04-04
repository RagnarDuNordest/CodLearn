import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'algoritmos-em-grafos',
  moduleId: 'algoritmos',
  title: 'Algoritmos em Grafos: BFS, DFS e Caminhos',
  description: 'Aprenda a percorrer grafos com BFS e DFS e a encontrar o caminho mais curto com Dijkstra.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 28,
  sections: [
    {
      type: 'text',
      content: '**Grafos** sao estruturas que representam conexoes entre elementos. Estao em todo lugar: redes sociais (amigos conectados), mapas (cidades ligadas por estradas), internet (paginas com links) e muito mais.\n\nUm grafo e formado por:\n- **Vertices (nos)** — os elementos (ex: cidades, pessoas)\n- **Arestas** — as conexoes entre eles (ex: estradas, amizades)\n\nPodemos representar um grafo em Python usando um **dicionario de listas de adjacencia**: cada chave e um vertice e o valor e a lista de vizinhos.\n\nExistem dois algoritmos fundamentais para percorrer grafos: **BFS** (Busca em Largura) e **DFS** (Busca em Profundidade).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'grafo_representacao.py',
        code: `# Representando um grafo com dicionario (lista de adjacencia)
#
#   A --- B --- D
#   |     |
#   C --- E --- F
#

grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

# Cada vertice aponta para seus vizinhos
print(grafo['A'])  # ['B', 'C'] — A esta conectado a B e C
print(grafo['E'])  # ['B', 'C', 'F'] — E esta conectado a B, C e F`,
        description: 'Grafos sao representados como dicionarios onde cada vertice mapeia para seus vizinhos.',
      },
    },
    {
      type: 'text',
      content: '## BFS — Busca em Largura\n\nA **Busca em Largura (BFS)** explora todos os vizinhos de um vertice antes de ir para os vizinhos dos vizinhos — nivel por nivel. Usa uma **fila** para controlar a ordem de visita:\n\n- **`deque`** (do modulo `collections`) — Fila eficiente com insercao e remocao O(1) em ambas as extremidades\n- **`fila.popleft()`** — Remove e retorna o primeiro elemento da fila (FIFO — primeiro a entrar, primeiro a sair)\n- **`fila.append(vizinho)`** — Adiciona ao final da fila\n- **`set()`** — Conjunto usado para marcar vertices ja visitados e evitar processar o mesmo vertice duas vezes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bfs_largura.py',
        code: `from collections import deque

# BFS — Busca em Largura (Breadth-First Search)
# Explora TODOS os vizinhos primeiro, depois os vizinhos dos vizinhos
# Usa uma FILA (queue) — primeiro a entrar, primeiro a sair

def bfs(grafo, inicio):
    visitados = set()
    fila = deque([inicio])
    visitados.add(inicio)
    ordem = []

    while fila:
        vertice = fila.popleft()  # Remove do inicio da fila
        ordem.append(vertice)

        for vizinho in grafo[vertice]:
            if vizinho not in visitados:
                visitados.add(vizinho)
                fila.append(vizinho)  # Adiciona ao final da fila

    return ordem

grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

print(bfs(grafo, 'A'))  # ['A', 'B', 'C', 'D', 'E', 'F']
# Nivel 0: A
# Nivel 1: B, C (vizinhos de A)
# Nivel 2: D, E (vizinhos de B e C)
# Nivel 3: F (vizinho de E)`,
        description: 'BFS usa uma fila para explorar nivel por nivel. Ideal para encontrar o caminho mais curto!',
      },
    },
    {
      type: 'text',
      content: '## DFS — Busca em Profundidade\n\nA **Busca em Profundidade (DFS)** vai o mais fundo possivel por um caminho antes de voltar e explorar outros. Pode ser implementada de duas formas:\n\n- **Iterativa com pilha**: usa uma lista como pilha — **`pilha.pop()`** remove do topo (LIFO — ultimo a entrar, primeiro a sair)\n- **`reversed(lista)`** — Itera a lista na ordem inversa, util para controlar a ordem de exploracao dos vizinhos\n- **Recursiva**: a propria pilha de chamadas do Python faz o papel da pilha, tornando o codigo mais elegante. Recebe `visitados` como parametro para compartilhar o estado entre chamadas',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dfs_profundidade.py',
        code: `# DFS — Busca em Profundidade (Depth-First Search)
# Vai o mais FUNDO possivel antes de voltar
# Pode usar uma PILHA (stack) ou RECURSAO

# Versao iterativa com pilha
def dfs_iterativo(grafo, inicio):
    visitados = set()
    pilha = [inicio]
    ordem = []

    while pilha:
        vertice = pilha.pop()  # Remove do TOPO da pilha
        if vertice not in visitados:
            visitados.add(vertice)
            ordem.append(vertice)
            # Adiciona vizinhos na pilha (invertidos para ordem alfabetica)
            for vizinho in reversed(grafo[vertice]):
                if vizinho not in visitados:
                    pilha.append(vizinho)

    return ordem

# Versao recursiva (mais elegante)
def dfs_recursivo(grafo, vertice, visitados=None):
    if visitados is None:
        visitados = set()
    visitados.add(vertice)
    print(vertice, end=' ')

    for vizinho in grafo[vertice]:
        if vizinho not in visitados:
            dfs_recursivo(grafo, vizinho, visitados)

grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

print(dfs_iterativo(grafo, 'A'))  # ['A', 'B', 'D', 'E', 'C', 'F']
print()
dfs_recursivo(grafo, 'A')        # A B D E C F
print()`,
        description: 'DFS vai o mais fundo possivel antes de retroceder. Usa pilha ou recursao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'BFS vs DFS: Use **BFS** quando precisar do caminho mais curto (menor numero de arestas). Use **DFS** quando precisar explorar todos os caminhos, detectar ciclos ou resolver labirintos. BFS usa fila (FIFO), DFS usa pilha (LIFO) ou recursao.',
    },
    {
      type: 'text',
      content: 'Para encontrar o **caminho mais curto** entre dois vertices (em grafos sem peso), usa-se BFS com uma modificacao: em vez de guardar apenas o vertice na fila, guardamos **tuplas `(vertice, caminho)`**, onde `caminho` e a lista de vertices percorridos ate aqui. Como o BFS explora nivel por nivel, o primeiro caminho que chegar ao destino e garantidamente o mais curto.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bfs_caminho_curto.py',
        code: `from collections import deque

# BFS para encontrar o CAMINHO MAIS CURTO entre dois vertices
def caminho_mais_curto(grafo, inicio, destino):
    if inicio == destino:
        return [inicio]

    visitados = set([inicio])
    fila = deque([(inicio, [inicio])])  # (vertice, caminho ate aqui)

    while fila:
        vertice, caminho = fila.popleft()

        for vizinho in grafo[vertice]:
            if vizinho not in visitados:
                novo_caminho = caminho + [vizinho]
                if vizinho == destino:
                    return novo_caminho
                visitados.add(vizinho)
                fila.append((vizinho, novo_caminho))

    return None  # Nao ha caminho

grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

print(caminho_mais_curto(grafo, 'A', 'F'))  # ['A', 'B', 'E', 'F']
print(caminho_mais_curto(grafo, 'A', 'D'))  # ['A', 'B', 'D']
print(caminho_mais_curto(grafo, 'D', 'F'))  # ['D', 'B', 'E', 'F']`,
        description: 'BFS garante o caminho mais curto em grafos sem peso nas arestas.',
      },
    },
    {
      type: 'text',
      content: '## Algoritmo de Dijkstra\n\nQuando as arestas tem **pesos** (distancias, custos), o BFS simples nao garante o caminho mais curto. O **algoritmo de Dijkstra** resolve isso usando uma **fila de prioridade** que sempre processa o vertice com menor custo acumulado:\n\n- **`heapq`** — Modulo do Python que implementa uma fila de prioridade (min-heap): o menor elemento sempre sai primeiro\n- **`heapq.heappop(fila)`** — Remove e retorna o elemento de menor valor da fila em O(log n)\n- **`heapq.heappush(fila, item)`** — Insere um item mantendo a propriedade do heap em O(log n)\n- **`float(\'inf\')`** — Representa infinito, usado como distancia inicial para todos os vertices (qualquer caminho real sera menor)\n- O grafo ponderado e representado como `vertice -> [(vizinho, peso), ...]`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dijkstra_basico.py',
        code: `import heapq

# Dijkstra — Caminho mais curto em grafos COM PESO nas arestas
# Cada aresta tem um "custo" (distancia, tempo, etc.)

def dijkstra(grafo, inicio):
    # Distancias iniciais: infinito para todos
    distancias = {v: float('inf') for v in grafo}
    distancias[inicio] = 0
    # Fila de prioridade: (distancia, vertice)
    fila = [(0, inicio)]

    while fila:
        dist_atual, vertice = heapq.heappop(fila)

        # Se ja encontramos um caminho melhor, pula
        if dist_atual > distancias[vertice]:
            continue

        for vizinho, peso in grafo[vertice]:
            nova_dist = dist_atual + peso
            if nova_dist < distancias[vizinho]:
                distancias[vizinho] = nova_dist
                heapq.heappush(fila, (nova_dist, vizinho))

    return distancias

# Grafo com pesos: vertice -> [(vizinho, peso), ...]
grafo_pesos = {
    'A': [('B', 4), ('C', 2)],
    'B': [('A', 4), ('D', 3), ('E', 1)],
    'C': [('A', 2), ('E', 5)],
    'D': [('B', 3)],
    'E': [('B', 1), ('C', 5), ('F', 2)],
    'F': [('E', 2)]
}

resultado = dijkstra(grafo_pesos, 'A')
print(resultado)
# {'A': 0, 'B': 4, 'C': 2, 'D': 7, 'E': 5, 'F': 7}
# Caminho mais curto de A para F custa 7 (A->B->E->F = 4+1+2)`,
        description: 'Dijkstra encontra o caminho mais curto em grafos com pesos usando fila de prioridade.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'BFS e DFS parecem complicados no inicio, mas a logica central e simples: BFS usa uma FILA (primeiro a entrar, primeiro a sair) e explora em camadas. DFS usa uma PILHA (ultimo a entrar, primeiro a sair) e vai fundo antes de voltar. Se voce entender essa diferenca, o resto e so detalhes de implementacao.',
    },
    {
      type: 'text',
      content: '## Quando usar BFS vs DFS?\n\n**Use BFS quando:**\n- Voce quer o **caminho mais curto** (em grafos sem peso)\n- Voce quer explorar por **nivel** (ex: conexoes de 1 grau, 2 graus, etc. numa rede social)\n- Voce quer encontrar o **mais proximo**\n\n**Use DFS quando:**\n- Voce quer saber se um caminho **existe** (sem se importar se e o mais curto)\n- Voce quer detectar **ciclos**\n- Voce quer explorar todos os caminhos possiveis\n\n**Importante:** Nos desafios abaixo, voce vai precisar de uma estrutura de grafo. Use o dicionario que aprendemos: `grafo = { "A": ["B", "C"], "B": ["A", "D"], ... }`. Comece sempre marcando vertices visitados com um set para evitar loops infinitos!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bfs_template.py',
        code: `# Template BFS — memorize este padrao!
from collections import deque

def bfs(grafo, inicio):
    visitados = set()       # Para nao visitar o mesmo vertice 2x
    fila = deque([inicio])  # Comeca com o vertice inicial
    visitados.add(inicio)
    ordem = []

    while fila:
        vertice = fila.popleft()  # Remove da frente da fila
        ordem.append(vertice)

        for vizinho in grafo[vertice]:
            if vizinho not in visitados:
                visitados.add(vizinho)
                fila.append(vizinho)  # Adiciona no fim

    return ordem

# Exemplo
grafo = {
    "A": ["B", "C"],
    "B": ["A", "D", "E"],
    "C": ["A", "F"],
    "D": ["B"],
    "E": ["B"],
    "F": ["C"]
}
print(bfs(grafo, "A"))  # ['A', 'B', 'C', 'D', 'E', 'F']`,
        description: 'Padrao BFS: fila (deque) + set de visitados. Sempre adicione no visitados ANTES de colocar na fila.',
      },
    },
  ],
  challenges: [
    {
      id: 'grafos-challenge-1',
      title: 'Caminho Mais Curto com BFS',
      description:
        'Implemente uma funcao que usa BFS para encontrar o caminho mais curto entre dois vertices em um grafo. A funcao deve retornar uma lista com os vertices do caminho, ou None se nao houver caminho.',
      language: 'python',
      starterCode: `from collections import deque

def caminho_bfs(grafo, inicio, destino):
    # Use BFS para encontrar o caminho mais curto
    # Dica: guarde o caminho junto com cada vertice na fila
    # Retorne a lista do caminho ou None se nao existir
    pass

# Testes
grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

print(caminho_bfs(grafo, 'A', 'F'))  # ['A', 'B', 'E', 'F'] ou ['A', 'C', 'E', 'F']
print(caminho_bfs(grafo, 'A', 'D'))  # ['A', 'B', 'D']
print(caminho_bfs(grafo, 'D', 'C'))  # ['D', 'B', 'A', 'C'] ou outro de tamanho 4

# Grafo desconectado
grafo2 = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C']
}
print(caminho_bfs(grafo2, 'A', 'D'))  # None (nao ha caminho)`,
      solution: `from collections import deque

def caminho_bfs(grafo, inicio, destino):
    if inicio == destino:
        return [inicio]

    visitados = set([inicio])
    fila = deque([(inicio, [inicio])])

    while fila:
        vertice, caminho = fila.popleft()

        for vizinho in grafo[vertice]:
            if vizinho not in visitados:
                novo_caminho = caminho + [vizinho]
                if vizinho == destino:
                    return novo_caminho
                visitados.add(vizinho)
                fila.append((vizinho, novo_caminho))

    return None

# Testes
grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C', 'F'],
    'F': ['E']
}

print(caminho_bfs(grafo, 'A', 'F'))  # ['A', 'B', 'E', 'F'] ou ['A', 'C', 'E', 'F']
print(caminho_bfs(grafo, 'A', 'D'))  # ['A', 'B', 'D']
print(caminho_bfs(grafo, 'D', 'C'))  # ['D', 'B', 'A', 'C'] ou outro de tamanho 4

# Grafo desconectado
grafo2 = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C']
}
print(caminho_bfs(grafo2, 'A', 'D'))  # None (nao ha caminho)`,
      hints: [
        'Use uma fila de tuplas (vertice, caminho) onde caminho e uma lista de vertices visitados ate aqui.',
        'Para cada vizinho nao visitado, crie um novo caminho: caminho + [vizinho].',
        'Se o vizinho for o destino, retorne o novo caminho imediatamente. Se a fila esvaziar, retorne None.',
      ],
    },
    {
      id: 'grafos-challenge-2',
      title: 'Detectar Ciclo com DFS',
      description:
        'Implemente uma funcao que usa DFS para detectar se um grafo nao-direcionado possui ciclos. Um ciclo existe quando e possivel voltar a um vertice ja visitado por um caminho diferente (sem contar o vertice pai).',
      language: 'python',
      starterCode: `def tem_ciclo(grafo):
    # Use DFS para detectar ciclos em um grafo nao-direcionado
    # Dica: durante a DFS, se encontrar um vizinho ja visitado
    # que NAO e o pai do vertice atual, ha um ciclo
    pass

# Testes
# Grafo COM ciclo: A-B-E-C-A
grafo_com_ciclo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C']
}
print(tem_ciclo(grafo_com_ciclo))  # True

# Grafo SEM ciclo (arvore)
grafo_sem_ciclo = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B']
}
print(tem_ciclo(grafo_sem_ciclo))  # False

# Grafo com vertice isolado
grafo_isolado = {
    'A': ['B'],
    'B': ['A'],
    'C': []
}
print(tem_ciclo(grafo_isolado))  # False`,
      solution: `def tem_ciclo(grafo):
    visitados = set()

    def dfs(vertice, pai):
        visitados.add(vertice)
        for vizinho in grafo[vertice]:
            if vizinho not in visitados:
                if dfs(vizinho, vertice):
                    return True
            elif vizinho != pai:
                # Encontrou um vertice ja visitado que nao e o pai
                return True
        return False

    # Verificar cada componente (pode ter vertices desconectados)
    for vertice in grafo:
        if vertice not in visitados:
            if dfs(vertice, None):
                return True
    return False

# Testes
# Grafo COM ciclo: A-B-E-C-A
grafo_com_ciclo = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['B', 'C']
}
print(tem_ciclo(grafo_com_ciclo))  # True

# Grafo SEM ciclo (arvore)
grafo_sem_ciclo = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B']
}
print(tem_ciclo(grafo_sem_ciclo))  # False

# Grafo com vertice isolado
grafo_isolado = {
    'A': ['B'],
    'B': ['A'],
    'C': []
}
print(tem_ciclo(grafo_isolado))  # False`,
      hints: [
        'Use DFS recursiva passando o vertice atual e o vertice pai (de onde viemos).',
        'Se encontrar um vizinho ja visitado que NAO e o pai, ha um ciclo.',
        'Nao esqueca de tratar grafos desconectados: inicie DFS de cada vertice nao visitado.',
      ],
    },
    {
      id: 'grafos-challenge-3',
      title: 'Encontrar Componentes Conectados',
      description:
        'Implemente uma funcao que encontra todos os componentes conectados de um grafo. Um componente conectado e um grupo de vertices onde todos estao ligados entre si (direta ou indiretamente). Retorne uma lista de listas, onde cada sublista e um componente.',
      language: 'python',
      starterCode: `def componentes_conectados(grafo):
    # Encontre todos os grupos de vertices conectados
    # Dica: para cada vertice nao visitado, faca BFS ou DFS
    # e colete todos os vertices alcancaveis
    pass

# Testes
# 3 componentes: {A,B,C}, {D,E}, {F}
grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B'],
    'D': ['E'],
    'E': ['D'],
    'F': []
}
resultado = componentes_conectados(grafo)
print(len(resultado))  # 3
print(sorted([sorted(c) for c in resultado]))
# [['A', 'B', 'C'], ['D', 'E'], ['F']]

# 1 componente (tudo conectado)
grafo2 = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B']
}
print(len(componentes_conectados(grafo2)))  # 1`,
      solution: `from collections import deque

def componentes_conectados(grafo):
    visitados = set()
    componentes = []

    for vertice in grafo:
        if vertice not in visitados:
            # BFS para encontrar todos os vertices deste componente
            componente = []
            fila = deque([vertice])
            visitados.add(vertice)

            while fila:
                v = fila.popleft()
                componente.append(v)

                for vizinho in grafo[v]:
                    if vizinho not in visitados:
                        visitados.add(vizinho)
                        fila.append(vizinho)

            componentes.append(componente)

    return componentes

# Testes
# 3 componentes: {A,B,C}, {D,E}, {F}
grafo = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B'],
    'D': ['E'],
    'E': ['D'],
    'F': []
}
resultado = componentes_conectados(grafo)
print(len(resultado))  # 3
print(sorted([sorted(c) for c in resultado]))
# [['A', 'B', 'C'], ['D', 'E'], ['F']]

# 1 componente (tudo conectado)
grafo2 = {
    'A': ['B'],
    'B': ['A', 'C'],
    'C': ['B']
}
print(len(componentes_conectados(grafo2)))  # 1`,
      hints: [
        'Mantenha um set de "visitados" global. Para cada vertice nao visitado, inicie uma BFS/DFS.',
        'Colete todos os vertices alcancaveis a partir desse vertice — esse e um componente.',
        'Adicione o componente a lista de componentes e continue para o proximo vertice nao visitado.',
      ],
    },
  ],
};
