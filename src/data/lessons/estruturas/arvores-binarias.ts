import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arvores-binarias',
  moduleId: 'estruturas',
  title: 'Arvores Binarias',
  description: 'Aprenda sobre arvores binarias, arvores de busca binaria (BST) e os principais algoritmos de percurso.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: 'Uma **arvore** e uma estrutura de dados hierarquica composta por **nos** conectados por **arestas**. Diferente de listas e arrays que sao lineares, arvores organizam dados de forma ramificada.\n\nTerminologia essencial:\n\n- **Raiz**: o no mais alto da arvore (sem pai)\n- **Nos**: cada elemento da arvore\n- **Filhos**: nos diretamente conectados abaixo de outro no\n- **Folhas**: nos que nao possuem filhos\n- **Altura**: distancia da raiz ate a folha mais profunda\n- **Profundidade**: distancia de um no ate a raiz\n\nUma **arvore binaria** e uma arvore onde cada no tem **no maximo dois filhos**: o filho **esquerdo** e o filho **direito**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'no_arvore.py',
        code: `# Definindo um no de arvore binaria
class No:
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None  # Filho esquerdo
        self.direita = None   # Filho direito

# Criando uma arvore binaria manualmente
#        10
#       /  \\
#      5    15
#     / \\     \\
#    3   7    20

raiz = No(10)
raiz.esquerda = No(5)
raiz.direita = No(15)
raiz.esquerda.esquerda = No(3)
raiz.esquerda.direita = No(7)
raiz.direita.direita = No(20)

print(f"Raiz: {raiz.valor}")                    # 10
print(f"Filho esquerdo: {raiz.esquerda.valor}")  # 5
print(f"Filho direito: {raiz.direita.valor}")    # 15`,
        description: 'Cada no possui um valor e referencias para os filhos esquerdo e direito.',
      },
    },
    {
      type: 'text',
      content: 'Uma **Arvore de Busca Binaria (BST)** e uma arvore binaria com uma regra especial:\n\n- Todos os valores na **subarvore esquerda** sao **menores** que o no atual\n- Todos os valores na **subarvore direita** sao **maiores** que o no atual\n\nEssa propriedade permite buscar valores de forma muito eficiente, similar a busca binaria em arrays ordenados. Em media, a busca, insercao e remocao tem complexidade **O(log n)**.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'bst_inserir_buscar.py',
        code: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None
        self.direita = None

class ArvoreBST:
    def __init__(self):
        self.raiz = None

    def inserir(self, valor):
        """Insere um valor mantendo a propriedade BST."""
        if self.raiz is None:
            self.raiz = No(valor)
        else:
            self._inserir_recursivo(self.raiz, valor)

    def _inserir_recursivo(self, no, valor):
        if valor < no.valor:
            if no.esquerda is None:
                no.esquerda = No(valor)
            else:
                self._inserir_recursivo(no.esquerda, valor)
        else:
            if no.direita is None:
                no.direita = No(valor)
            else:
                self._inserir_recursivo(no.direita, valor)

    def buscar(self, valor):
        """Busca um valor na BST. Retorna True se encontrar."""
        return self._buscar_recursivo(self.raiz, valor)

    def _buscar_recursivo(self, no, valor):
        if no is None:
            return False
        if valor == no.valor:
            return True
        elif valor < no.valor:
            return self._buscar_recursivo(no.esquerda, valor)
        else:
            return self._buscar_recursivo(no.direita, valor)

# Testando a BST
arvore = ArvoreBST()
for v in [10, 5, 15, 3, 7, 20]:
    arvore.inserir(v)

#        10
#       /  \\
#      5    15
#     / \\     \\
#    3   7    20

print(arvore.buscar(7))   # True
print(arvore.buscar(12))  # False
print(arvore.buscar(20))  # True`,
        description: 'Insercao e busca em BST usam recursao, comparando valores para decidir esquerda ou direita.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Na BST, a insercao sempre acontece nas folhas. Ao inserir um valor, descemos pela arvore comparando: se menor, vai para a esquerda; se maior, vai para a direita. Quando encontramos um espaco vazio (None), criamos o novo no ali.',
    },
    {
      type: 'text',
      content: '## Percursos em Arvores\n\nUm **percurso** define a ordem em que os nos de uma arvore sao visitados. Existem tres percursos classicos, todos implementados recursivamente:\n\n- **Em-ordem (in-order)**: esquerda -> no atual -> direita. Em uma BST, retorna os valores em **ordem crescente**\n- **Pre-ordem (pre-order)**: no atual -> esquerda -> direita. Util para **copiar** ou serializar a arvore\n- **Pos-ordem (post-order)**: esquerda -> direita -> no atual. Util para **deletar** a arvore, pois processa os filhos antes do pai',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'percursos.py',
        code: `class No:
    def __init__(self, valor):
        self.valor = valor
        self.esquerda = None
        self.direita = None

def em_ordem(no):
    """Percurso em-ordem (in-order): esquerda -> raiz -> direita.
    Em uma BST, retorna os valores em ordem crescente!"""
    if no is not None:
        em_ordem(no.esquerda)
        print(no.valor, end=' ')
        em_ordem(no.direita)

def pre_ordem(no):
    """Percurso pre-ordem (pre-order): raiz -> esquerda -> direita.
    Util para copiar/serializar a arvore."""
    if no is not None:
        print(no.valor, end=' ')
        pre_ordem(no.esquerda)
        pre_ordem(no.direita)

def pos_ordem(no):
    """Percurso pos-ordem (post-order): esquerda -> direita -> raiz.
    Util para deletar a arvore ou calcular tamanhos."""
    if no is not None:
        pos_ordem(no.esquerda)
        pos_ordem(no.direita)
        print(no.valor, end=' ')

# Montando a arvore
#        10
#       /  \\
#      5    15
#     / \\     \\
#    3   7    20

raiz = No(10)
raiz.esquerda = No(5)
raiz.direita = No(15)
raiz.esquerda.esquerda = No(3)
raiz.esquerda.direita = No(7)
raiz.direita.direita = No(20)

print("Em-ordem:  ", end='')
em_ordem(raiz)     # 3 5 7 10 15 20
print()

print("Pre-ordem: ", end='')
pre_ordem(raiz)    # 10 5 3 7 15 20
print()

print("Pos-ordem: ", end='')
pos_ordem(raiz)    # 3 7 5 20 15 10
print()`,
        description: 'Os tres percursos classicos visitam os nos em ordens diferentes, cada um com suas aplicacoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'O percurso **em-ordem** e especialmente importante em BSTs porque visita os nos em **ordem crescente**. Isso acontece porque sempre visitamos primeiro os menores (esquerda), depois o atual, e depois os maiores (direita).\n\nO percurso **pre-ordem** e util para **copiar** ou **serializar** a arvore. O percurso **pos-ordem** e util para **deletar** a arvore, pois processa os filhos antes do pai.',
    },
  ],
  challenges: [
    {
      id: 'arvores-challenge-1',
      title: 'Entendendo a BST com Dicionarios',
      description:
        'Antes de implementar uma BST real, vamos simular o conceito com dicionarios Python. Crie funcoes que simulam as operacoes de uma BST: inserir em um dicionario de nos, e buscar seguindo a logica esquerda/direita.',
      language: 'python',
      starterCode: `# Vamos simular uma BST usando um dicionario
# Cada no e representado como: {'valor': x, 'esq': None, 'dir': None}

def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    # Insira o valor na BST seguindo a regra:
    # Se valor < no['valor'], va para a esquerda ('esq')
    # Se valor >= no['valor'], va para a direita ('dir')
    # Use um while loop (sem recursao)
    pass

def buscar(raiz, valor):
    # Busque o valor na BST usando while loop
    # Retorne True se encontrar, False caso contrario
    pass

# Testes
raiz = criar_no(10)
inserir(raiz, 5)
inserir(raiz, 15)
inserir(raiz, 3)
inserir(raiz, 7)

print(buscar(raiz, 7))   # True
print(buscar(raiz, 12))  # False
print(buscar(raiz, 3))   # True`,
      solution: `def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    atual = raiz
    while True:
        if valor < atual['valor']:
            if atual['esq'] is None:
                atual['esq'] = criar_no(valor)
                break
            else:
                atual = atual['esq']
        else:
            if atual['dir'] is None:
                atual['dir'] = criar_no(valor)
                break
            else:
                atual = atual['dir']

def buscar(raiz, valor):
    atual = raiz
    while atual is not None:
        if atual['valor'] == valor:
            return True
        elif valor < atual['valor']:
            atual = atual['esq']
        else:
            atual = atual['dir']
    return False

# Testes
raiz = criar_no(10)
inserir(raiz, 5)
inserir(raiz, 15)
inserir(raiz, 3)
inserir(raiz, 7)

print(buscar(raiz, 7))   # True
print(buscar(raiz, 12))  # False
print(buscar(raiz, 3))   # True`,
      hints: [
        'Use while True para percorrer a arvore. Dentro do loop, compare valor com atual["valor"].',
        'Se valor < atual["valor"], va para esq. Se esq e None, insira aqui (break). Se nao, atual = atual["esq"].',
        'Para buscar, percorra com while atual is not None. Se atual["valor"] == valor, retorne True. Va para esq ou dir conforme a comparacao.',
      ],
    },
    {
      id: 'arvores-challenge-2',
      title: 'Minimo e Maximo na BST',
      description:
        'Na BST, o menor valor esta sempre no no mais a ESQUERDA e o maior no mais a DIREITA. Implemente funcoes para encontra-los percorrendo a arvore com while. Use a estrutura de no do desafio anterior (dicionario com "valor", "esq", "dir").',
      language: 'python',
      starterCode: `def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    atual = raiz
    while True:
        if valor < atual['valor']:
            if atual['esq'] is None:
                atual['esq'] = criar_no(valor)
                break
            else:
                atual = atual['esq']
        else:
            if atual['dir'] is None:
                atual['dir'] = criar_no(valor)
                break
            else:
                atual = atual['dir']

def minimo(raiz):
    # O menor valor esta no no mais a ESQUERDA
    # Percorra sempre para esq ate nao poder mais
    pass

def maximo(raiz):
    # O maior valor esta no no mais a DIREITA
    # Percorra sempre para dir ate nao poder mais
    pass

# Montando a arvore:  10, 5, 15, 3, 7, 12, 20
raiz = criar_no(10)
for v in [5, 15, 3, 7, 12, 20]:
    inserir(raiz, v)

print(minimo(raiz))  # 3
print(maximo(raiz))  # 20`,
      solution: `def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    atual = raiz
    while True:
        if valor < atual['valor']:
            if atual['esq'] is None:
                atual['esq'] = criar_no(valor)
                break
            else:
                atual = atual['esq']
        else:
            if atual['dir'] is None:
                atual['dir'] = criar_no(valor)
                break
            else:
                atual = atual['dir']

def minimo(raiz):
    atual = raiz
    while atual['esq'] is not None:
        atual = atual['esq']
    return atual['valor']

def maximo(raiz):
    atual = raiz
    while atual['dir'] is not None:
        atual = atual['dir']
    return atual['valor']

raiz = criar_no(10)
for v in [5, 15, 3, 7, 12, 20]:
    inserir(raiz, v)

print(minimo(raiz))  # 3
print(maximo(raiz))  # 20`,
      hints: [
        'Para o minimo: comece na raiz e va sempre para esq enquanto esq nao for None.',
        'Para o maximo: comece na raiz e va sempre para dir enquanto dir nao for None.',
        'Quando nao puder mais ir para esq (ou dir), voce chegou ao minimo (ou maximo). Retorne atual["valor"].',
      ],
    },
    {
      id: 'arvores-challenge-3',
      title: 'Contar Nos e Verificar Existencia',
      description:
        'Usando a mesma estrutura de dicionarios, implemente: (1) contar_nos(raiz) que conta todos os nos da arvore usando uma fila (lista como fila), e (2) esta_entre(raiz, minimo, maximo) que verifica se existe algum valor na arvore dentro de um intervalo.',
      language: 'python',
      starterCode: `def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    atual = raiz
    while True:
        if valor < atual['valor']:
            if atual['esq'] is None:
                atual['esq'] = criar_no(valor)
                break
            else:
                atual = atual['esq']
        else:
            if atual['dir'] is None:
                atual['dir'] = criar_no(valor)
                break
            else:
                atual = atual['dir']

def contar_nos(raiz):
    # Use uma lista como fila (BFS):
    # fila = [raiz]
    # Enquanto a fila nao estiver vazia:
    #   remova o primeiro no (fila.pop(0))
    #   conte-o
    #   adicione os filhos nao-None na fila
    pass

def esta_entre(raiz, minimo, maximo):
    # Verifique se existe algum valor no intervalo [minimo, maximo]
    # Use a mesma logica de BFS com fila
    pass

raiz = criar_no(10)
for v in [5, 15, 3, 7, 12, 20]:
    inserir(raiz, v)

print(contar_nos(raiz))            # 7
print(esta_entre(raiz, 11, 13))    # True  (tem o 12)
print(esta_entre(raiz, 8, 9))      # False (nao tem nada entre 8 e 9)`,
      solution: `def criar_no(valor):
    return {'valor': valor, 'esq': None, 'dir': None}

def inserir(raiz, valor):
    atual = raiz
    while True:
        if valor < atual['valor']:
            if atual['esq'] is None:
                atual['esq'] = criar_no(valor)
                break
            else:
                atual = atual['esq']
        else:
            if atual['dir'] is None:
                atual['dir'] = criar_no(valor)
                break
            else:
                atual = atual['dir']

def contar_nos(raiz):
    if raiz is None:
        return 0
    fila = [raiz]
    contador = 0
    while fila:
        no = fila.pop(0)
        contador += 1
        if no['esq'] is not None:
            fila.append(no['esq'])
        if no['dir'] is not None:
            fila.append(no['dir'])
    return contador

def esta_entre(raiz, minimo, maximo):
    if raiz is None:
        return False
    fila = [raiz]
    while fila:
        no = fila.pop(0)
        if minimo <= no['valor'] <= maximo:
            return True
        if no['esq'] is not None:
            fila.append(no['esq'])
        if no['dir'] is not None:
            fila.append(no['dir'])
    return False

raiz = criar_no(10)
for v in [5, 15, 3, 7, 12, 20]:
    inserir(raiz, v)

print(contar_nos(raiz))            # 7
print(esta_entre(raiz, 11, 13))    # True
print(esta_entre(raiz, 8, 9))      # False`,
      hints: [
        'Para contar_nos: comece com fila = [raiz] e contador = 0. Em cada iteracao, retire o primeiro no (fila.pop(0)), incremente o contador, e adicione os filhos nao-None na fila.',
        'Para esta_entre: mesma logica de fila. Verifique se minimo <= no["valor"] <= maximo. Se sim, retorne True imediatamente.',
        'A condicao "while fila:" continua enquanto a lista nao estiver vazia.',
      ],
    },
  ],
};
