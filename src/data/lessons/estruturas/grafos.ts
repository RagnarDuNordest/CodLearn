import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'grafos',
  moduleId: 'estruturas',
  title: 'Grafos',
  description: 'Aprenda sobre grafos, representacoes com lista e matriz de adjacencia, e os algoritmos de busca BFS e DFS.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 28,
  sections: [
    {
      type: 'text',
      content: 'Um **grafo** e uma estrutura de dados composta por **vertices** (nos) conectados por **arestas** (ligacoes). Grafos modelam relacoes entre objetos e estao em toda parte:\n\n- **Redes sociais**: pessoas sao vertices, amizades sao arestas\n- **Mapas e GPS**: cidades sao vertices, estradas sao arestas\n- **Internet**: paginas sao vertices, links sao arestas\n\nTipos de grafos:\n\n- **Nao direcionado**: arestas funcionam nos dois sentidos (amizade no Facebook)\n- **Direcionado (digrafo)**: arestas tem direcao (seguir no Instagram)\n- **Ponderado**: arestas tem peso/custo (distancia entre cidades)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'grafo_lista_adjacencia.py',
        code: `# Representacao com Lista de Adjacencia
# Cada vertice armazena uma lista dos seus vizinhos
# Mais eficiente em memoria para grafos esparsos

class Grafo:
    def __init__(self):
        self.adjacencias = {}  # Dicionario: vertice -> lista de vizinhos

    def adicionar_vertice(self, vertice):
        """Adiciona um vertice ao grafo."""
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        """Adiciona uma aresta nao direcionada."""
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)  # Nao direcionado

    def mostrar(self):
        """Exibe o grafo."""
        for vertice in self.adjacencias:
            vizinhos = self.adjacencias[vertice]
            print(f"{vertice} -> {vizinhos}")

# Criando um grafo de cidades
grafo = Grafo()
grafo.adicionar_aresta("SP", "RJ")
grafo.adicionar_aresta("SP", "BH")
grafo.adicionar_aresta("RJ", "BH")
grafo.adicionar_aresta("BH", "Brasilia")

grafo.mostrar()
# SP -> ['RJ', 'BH']
# RJ -> ['SP', 'BH']
# BH -> ['SP', 'RJ', 'Brasilia']
# Brasilia -> ['BH']`,
        description: 'A lista de adjacencia usa um dicionario onde cada chave e um vertice e o valor e a lista dos seus vizinhos.',
      },
    },
    {
      type: 'text',
      content: 'Existem duas formas principais de representar grafos:\n\n**Lista de Adjacencia**: cada vertice armazena uma lista dos seus vizinhos. Usa menos memoria e e mais eficiente para grafos **esparsos** (poucos arestas). Acesso aos vizinhos e rapido.\n\n**Matriz de Adjacencia**: uma tabela onde a posicao [i][j] indica se ha aresta entre os vertices i e j. Usa mais memoria (n x n), mas permite verificar rapidamente se dois vertices estao conectados. Melhor para grafos **densos** (muitas arestas).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'grafo_matriz.py',
        code: `# Representacao com Matriz de Adjacencia
# Uma tabela n x n onde 1 indica aresta e 0 indica ausencia

class GrafoMatriz:
    def __init__(self, vertices):
        self.vertices = vertices
        self.n = len(vertices)
        # Indice de cada vertice
        self.indice = {v: i for i, v in enumerate(vertices)}
        # Matriz n x n inicializada com zeros
        self.matriz = [[0] * self.n for _ in range(self.n)]

    def adicionar_aresta(self, origem, destino):
        """Adiciona aresta nao direcionada."""
        i = self.indice[origem]
        j = self.indice[destino]
        self.matriz[i][j] = 1
        self.matriz[j][i] = 1  # Nao direcionado

    def tem_aresta(self, origem, destino):
        """Verifica se existe aresta entre dois vertices."""
        i = self.indice[origem]
        j = self.indice[destino]
        return self.matriz[i][j] == 1

    def mostrar(self):
        """Exibe a matriz de adjacencia."""
        print("   ", "  ".join(self.vertices))
        for i, v in enumerate(self.vertices):
            linha = "  ".join(str(x) for x in self.matriz[i])
            print(f"{v}  {linha}")

# Exemplo
vertices = ["A", "B", "C", "D"]
grafo = GrafoMatriz(vertices)
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")

grafo.mostrar()
#     A  B  C  D
# A   0  1  1  0
# B   1  0  0  1
# C   1  0  0  1
# D   0  1  1  0

print(grafo.tem_aresta("A", "B"))  # True
print(grafo.tem_aresta("A", "D"))  # False`,
        description: 'A matriz de adjacencia representa conexoes em uma tabela bidimensional de 0s e 1s.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Lista de Adjacencia vs Matriz de Adjacencia:**\n\n- **Memoria**: Lista usa O(V + E), Matriz usa O(V^2). Para grafos esparsos, a lista e muito mais eficiente.\n- **Verificar aresta**: Matriz e O(1), Lista e O(grau do vertice).\n- **Listar vizinhos**: Lista e O(grau), Matriz e O(V).\n\nNa pratica, a **lista de adjacencia** e a mais usada porque a maioria dos grafos reais sao esparsos.',
    },
    {
      type: 'text',
      content: '## Algoritmos de Busca em Grafos\n\nExistem dois algoritmos fundamentais para percorrer um grafo e visitar todos os seus vertices:\n\n- **BFS — Busca em Largura (Breadth-First Search)**: usa uma **fila** (`deque`). Explora todos os vizinhos de um vertice antes de ir para os vertices mais distantes — nivel por nivel. Ideal para encontrar o **caminho mais curto** em grafos nao ponderados\n- **DFS — Busca em Profundidade (Depth-First Search)**: usa uma **pilha** (ou recursao). Vai o mais fundo possivel por um caminho antes de voltar e explorar outros. Ideal para verificar **conectividade** e detectar **ciclos**\n\nAmbos usam um `set` de vertices visitados para evitar processar o mesmo vertice mais de uma vez.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bfs_dfs.py',
        code: `from collections import deque

class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def bfs(self, inicio):
        """Busca em Largura (Breadth-First Search).
        Visita todos os vizinhos de um vertice antes de ir mais fundo.
        Usa uma FILA (queue) para controlar a ordem."""
        visitados = set()
        fila = deque([inicio])
        visitados.add(inicio)
        ordem = []

        while fila:
            vertice = fila.popleft()  # Remove do inicio da fila
            ordem.append(vertice)

            for vizinho in self.adjacencias[vertice]:
                if vizinho not in visitados:
                    visitados.add(vizinho)
                    fila.append(vizinho)

        return ordem

    def dfs(self, inicio):
        """Busca em Profundidade (Depth-First Search).
        Vai o mais fundo possivel antes de voltar.
        Usa uma PILHA (stack) para controlar a ordem."""
        visitados = set()
        pilha = [inicio]
        ordem = []

        while pilha:
            vertice = pilha.pop()  # Remove do topo da pilha
            if vertice not in visitados:
                visitados.add(vertice)
                ordem.append(vertice)

                for vizinho in self.adjacencias[vertice]:
                    if vizinho not in visitados:
                        pilha.append(vizinho)

        return ordem

# Criando o grafo
#    A --- B
#    |     |
#    C --- D --- E

grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")
grafo.adicionar_aresta("D", "E")

print("BFS a partir de A:", grafo.bfs("A"))
# BFS: ['A', 'B', 'C', 'D', 'E']  (nivel por nivel)

print("DFS a partir de A:", grafo.dfs("A"))
# DFS: ['A', 'C', 'D', 'E', 'B']  (vai fundo primeiro)`,
        description: 'BFS usa fila e explora nivel por nivel. DFS usa pilha e vai o mais fundo possivel antes de voltar.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Quando usar BFS vs DFS:**\n\n- **BFS** e ideal para encontrar o **caminho mais curto** (em grafos nao ponderados), pois explora nivel por nivel.\n- **DFS** e ideal para verificar **conectividade**, detectar **ciclos** e explorar todos os caminhos possiveis.\n\nLembre-se: BFS usa **fila** (primeiro a entrar, primeiro a sair) e DFS usa **pilha** (ultimo a entrar, primeiro a sair).',
    },
  ],
  challenges: [
    {
      id: 'grafos-challenge-1',
      title: 'Implementar Grafo com Lista de Adjacencia',
      description:
        'Implemente a classe Grafo com os metodos: adicionar_vertice(vertice), adicionar_aresta(origem, destino) para grafo nao direcionado, vizinhos(vertice) que retorna a lista de vizinhos, e tem_aresta(origem, destino) que verifica se dois vertices estao conectados.',
      language: 'python',
      starterCode: `class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        # Adicione o vertice ao grafo (se ainda nao existir)
        pass

    def adicionar_aresta(self, origem, destino):
        # Adicione aresta nao direcionada (nos dois sentidos)
        pass

    def vizinhos(self, vertice):
        # Retorne a lista de vizinhos do vertice
        # Retorne lista vazia se o vertice nao existir
        pass

    def tem_aresta(self, origem, destino):
        # Retorne True se existir aresta entre origem e destino
        pass

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
print(grafo.vizinhos("A"))          # ['B', 'C']
print(grafo.vizinhos("B"))          # ['A', 'D']
print(grafo.tem_aresta("A", "B"))   # True
print(grafo.tem_aresta("A", "D"))   # False
print(grafo.vizinhos("E"))          # []`,
      solution: `class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def vizinhos(self, vertice):
        if vertice in self.adjacencias:
            return self.adjacencias[vertice]
        return []

    def tem_aresta(self, origem, destino):
        if origem in self.adjacencias:
            return destino in self.adjacencias[origem]
        return False

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
print(grafo.vizinhos("A"))          # ['B', 'C']
print(grafo.vizinhos("B"))          # ['A', 'D']
print(grafo.tem_aresta("A", "B"))   # True
print(grafo.tem_aresta("A", "D"))   # False
print(grafo.vizinhos("E"))          # []`,
      hints: [
        'Use um dicionario onde cada chave e um vertice e o valor e uma lista de vizinhos.',
        'Para grafos nao direcionados, ao adicionar aresta de A para B, adicione tambem de B para A.',
        'Lembre-se de verificar se o vertice existe antes de acessar seus vizinhos.',
      ],
    },
    {
      id: 'grafos-challenge-2',
      title: 'Implementar BFS (Busca em Largura)',
      description:
        'Implemente o metodo bfs(inicio) na classe Grafo que realiza uma busca em largura a partir do vertice de inicio. O metodo deve retornar uma lista com os vertices na ordem em que foram visitados. Use uma fila (deque) e um set de visitados.',
      language: 'python',
      starterCode: `from collections import deque

class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def bfs(self, inicio):
        # Implemente a busca em largura (BFS)
        # Retorne uma lista com a ordem de visitacao
        # Use deque como fila e set para controlar visitados
        pass

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")
grafo.adicionar_aresta("D", "E")

print(grafo.bfs("A"))  # ['A', 'B', 'C', 'D', 'E']`,
      solution: `from collections import deque

class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def bfs(self, inicio):
        visitados = set()
        fila = deque([inicio])
        visitados.add(inicio)
        ordem = []

        while fila:
            vertice = fila.popleft()
            ordem.append(vertice)

            for vizinho in self.adjacencias[vertice]:
                if vizinho not in visitados:
                    visitados.add(vizinho)
                    fila.append(vizinho)

        return ordem

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")
grafo.adicionar_aresta("D", "E")

print(grafo.bfs("A"))  # ['A', 'B', 'C', 'D', 'E']`,
      hints: [
        'Crie uma fila com deque([inicio]) e um set de visitados com o vertice inicial ja marcado.',
        'Em cada iteracao, remova o primeiro da fila com popleft(), adicione na ordem e explore seus vizinhos.',
        'So adicione vizinhos na fila se eles ainda nao foram visitados. Marque como visitado ao adicionar na fila, nao ao remover.',
      ],
    },
    {
      id: 'grafos-challenge-3',
      title: 'Encontrar Caminho Entre Dois Vertices',
      description:
        'Implemente o metodo encontrar_caminho(inicio, fim) que retorna uma lista representando o caminho entre dois vertices. Use BFS para garantir o caminho mais curto. Retorne uma lista vazia se nao houver caminho.',
      language: 'python',
      starterCode: `from collections import deque

class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def encontrar_caminho(self, inicio, fim):
        # Use BFS para encontrar o caminho mais curto
        # Retorne uma lista com os vertices do caminho
        # Retorne [] se nao houver caminho
        pass

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")
grafo.adicionar_aresta("D", "E")

print(grafo.encontrar_caminho("A", "E"))  # ['A', 'B', 'D', 'E'] ou ['A', 'C', 'D', 'E']
print(grafo.encontrar_caminho("A", "C"))  # ['A', 'C']

grafo.adicionar_vertice("Z")  # Vertice isolado
print(grafo.encontrar_caminho("A", "Z"))  # []`,
      solution: `from collections import deque

class Grafo:
    def __init__(self):
        self.adjacencias = {}

    def adicionar_vertice(self, vertice):
        if vertice not in self.adjacencias:
            self.adjacencias[vertice] = []

    def adicionar_aresta(self, origem, destino):
        self.adicionar_vertice(origem)
        self.adicionar_vertice(destino)
        self.adjacencias[origem].append(destino)
        self.adjacencias[destino].append(origem)

    def encontrar_caminho(self, inicio, fim):
        if inicio not in self.adjacencias or fim not in self.adjacencias:
            return []
        if inicio == fim:
            return [inicio]

        visitados = set()
        fila = deque([(inicio, [inicio])])  # (vertice, caminho ate ele)
        visitados.add(inicio)

        while fila:
            vertice, caminho = fila.popleft()

            for vizinho in self.adjacencias[vertice]:
                if vizinho not in visitados:
                    novo_caminho = caminho + [vizinho]
                    if vizinho == fim:
                        return novo_caminho
                    visitados.add(vizinho)
                    fila.append((vizinho, novo_caminho))

        return []  # Nao encontrou caminho

# Testes
grafo = Grafo()
grafo.adicionar_aresta("A", "B")
grafo.adicionar_aresta("A", "C")
grafo.adicionar_aresta("B", "D")
grafo.adicionar_aresta("C", "D")
grafo.adicionar_aresta("D", "E")

print(grafo.encontrar_caminho("A", "E"))  # ['A', 'B', 'D', 'E'] ou ['A', 'C', 'D', 'E']
print(grafo.encontrar_caminho("A", "C"))  # ['A', 'C']

grafo.adicionar_vertice("Z")  # Vertice isolado
print(grafo.encontrar_caminho("A", "Z"))  # []`,
      hints: [
        'Use BFS, mas armazene o caminho junto com cada vertice na fila: (vertice, [caminho]).',
        'Quando encontrar o vertice destino, retorne o caminho acumulado ate ele.',
        'Se a fila esvaziar sem encontrar o destino, retorne uma lista vazia indicando que nao ha caminho.',
      ],
    },
  ],
};
