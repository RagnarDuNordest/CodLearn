import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'tabelas-hash',
  moduleId: 'estruturas',
  title: 'Tabelas Hash',
  description: 'Aprenda sobre tabelas hash, funcoes de hashing, tratamento de colisoes e como implementar sua propria tabela hash.',
  order: 4,
  estimatedMinutes: 22,
  sections: [
    {
      type: 'text',
      content: 'Uma **tabela hash** (ou **hash table**) e uma estrutura de dados que armazena pares **chave-valor** e permite acesso extremamente rapido: em media **O(1)** para busca, insercao e remocao.\n\nO segredo esta na **funcao hash**: ela transforma uma chave (como uma string ou numero) em um **indice** de um array interno. Assim, em vez de procurar sequencialmente, voce vai direto para a posicao correta.\n\nExemplo do dia a dia: imagine um armario com gavetas numeradas. Uma funcao hash e como uma regra que diz \"o nome Joao vai na gaveta 3\". Quando voce precisa do dado do Joao, vai direto na gaveta 3 sem abrir as outras.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'conceito_hash.py',
        code: `# Em Python, dicionarios (dict) sao tabelas hash!
# Eles usam funcoes hash internamente para armazenar dados

# Criando um dicionario (tabela hash nativa)
alunos = {}

# Inserindo pares chave-valor (O(1) em media)
alunos["Ana"] = 9.5
alunos["Bruno"] = 8.0
alunos["Carlos"] = 7.5

# Buscando por chave (O(1) em media)
print(alunos["Ana"])      # 9.5
print(alunos["Bruno"])    # 8.0

# Verificando se uma chave existe (O(1) em media)
print("Ana" in alunos)    # True
print("Diana" in alunos)  # False

# Removendo um par chave-valor
del alunos["Carlos"]
print(alunos)  # {'Ana': 9.5, 'Bruno': 8.0}

# A funcao hash() do Python mostra o hash de um objeto
print(hash("Ana"))     # Um numero inteiro (varia a cada execucao)
print(hash("Bruno"))   # Outro numero inteiro
print(hash(42))        # 42 (inteiros sao seu proprio hash)`,
        description: 'O dicionario do Python e a implementacao mais comum de tabela hash que usamos no dia a dia.',
      },
    },
    {
      type: 'text',
      content: 'Um problema das tabelas hash sao as **colisoes**: quando duas chaves diferentes geram o **mesmo indice** pela funcao hash. Por exemplo, se a funcao hash de \"Ana\" e \"Zara\" ambas resultam no indice 3, temos uma colisao.\n\nA tecnica mais comum de resolver colisoes e o **encadeamento (chaining)**: cada posicao do array armazena uma **lista** de pares chave-valor. Se duas chaves caem no mesmo indice, ambas ficam na lista daquela posicao.\n\nOutra tecnica e o **enderecamento aberto**: quando ha colisao, procuramos a proxima posicao vazia no array.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'tabela_hash.py',
        code: `class TabelaHash:
    def __init__(self, tamanho=10):
        self.tamanho = tamanho
        # Cada posicao e uma lista (encadeamento para colisoes)
        self.tabela = [[] for _ in range(tamanho)]

    def _hash(self, chave):
        """Funcao hash simples: soma dos codigos ASCII % tamanho."""
        if isinstance(chave, int):
            return chave % self.tamanho
        # Para strings: soma dos valores ASCII
        return sum(ord(c) for c in str(chave)) % self.tamanho

    def inserir(self, chave, valor):
        """Insere ou atualiza um par chave-valor."""
        indice = self._hash(chave)
        # Verifica se a chave ja existe para atualizar
        for i, (c, v) in enumerate(self.tabela[indice]):
            if c == chave:
                self.tabela[indice][i] = (chave, valor)
                return
        # Chave nova: adiciona na lista
        self.tabela[indice].append((chave, valor))

    def buscar(self, chave):
        """Busca um valor pela chave. Retorna None se nao encontrar."""
        indice = self._hash(chave)
        for c, v in self.tabela[indice]:
            if c == chave:
                return v
        return None

    def remover(self, chave):
        """Remove um par chave-valor. Retorna True se removeu."""
        indice = self._hash(chave)
        for i, (c, v) in enumerate(self.tabela[indice]):
            if c == chave:
                self.tabela[indice].pop(i)
                return True
        return False

# Testando nossa tabela hash
tabela = TabelaHash()
tabela.inserir("Ana", 9.5)
tabela.inserir("Bruno", 8.0)
tabela.inserir("Carlos", 7.5)

print(tabela.buscar("Ana"))     # 9.5
print(tabela.buscar("Bruno"))   # 8.0
print(tabela.buscar("Diana"))   # None

tabela.remover("Carlos")
print(tabela.buscar("Carlos"))  # None`,
        description: 'Implementacao de tabela hash com encadeamento usando listas para tratar colisoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'A qualidade da **funcao hash** e fundamental para o desempenho. Uma funcao hash ruim pode colocar muitos elementos no mesmo indice, transformando a busca O(1) em O(n). Uma boa funcao hash distribui os valores uniformemente entre as posicoes disponiveis.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'aplicacoes_dict.py',
        code: `# Aplicacao pratica: contando frequencia de palavras
def contar_palavras(texto):
    """Conta quantas vezes cada palavra aparece no texto."""
    frequencia = {}  # Dicionario = tabela hash
    palavras = texto.lower().split()

    for palavra in palavras:
        if palavra in frequencia:
            frequencia[palavra] += 1
        else:
            frequencia[palavra] = 1

    return frequencia

texto = "o gato viu o rato e o rato viu o gato"
resultado = contar_palavras(texto)
print(resultado)
# {'o': 4, 'gato': 2, 'viu': 2, 'rato': 2, 'e': 1}

# Aplicacao pratica: detectando duplicatas com set
# Sets em Python tambem usam hashing internamente!
def tem_duplicatas(lista):
    """Verifica se ha elementos duplicados usando set."""
    vistos = set()
    for item in lista:
        if item in vistos:   # Busca O(1) no set
            return True
        vistos.add(item)
    return False

print(tem_duplicatas([1, 2, 3, 4, 5]))     # False
print(tem_duplicatas([1, 2, 3, 2, 5]))     # True`,
        description: 'Dicionarios e sets do Python sao baseados em hashing e tem muitas aplicacoes praticas.',
      },
    },
  ],
  challenges: [
    {
      id: 'hash-challenge-1',
      title: 'Implementar uma Tabela Hash com Put, Get e Remove',
      description:
        'Implemente a classe TabelaHash com os metodos: inserir(chave, valor) para adicionar/atualizar, buscar(chave) para encontrar um valor, e remover(chave) para deletar um par. Use encadeamento (listas) para tratar colisoes.',
      language: 'python',
      starterCode: `class TabelaHash:
    def __init__(self, tamanho=10):
        self.tamanho = tamanho
        self.tabela = [[] for _ in range(tamanho)]

    def _hash(self, chave):
        # Calcule o indice: soma dos ASCII da chave % tamanho
        pass

    def inserir(self, chave, valor):
        # Insira ou atualize o par chave-valor
        pass

    def buscar(self, chave):
        # Retorne o valor associado a chave, ou None se nao existir
        pass

    def remover(self, chave):
        # Remova o par chave-valor. Retorne True se removeu, False se nao encontrou
        pass

# Testes
tabela = TabelaHash()
tabela.inserir("nome", "Alice")
tabela.inserir("idade", 25)
tabela.inserir("cidade", "Sao Paulo")
print(tabela.buscar("nome"))     # Alice
print(tabela.buscar("idade"))    # 25
tabela.inserir("idade", 26)      # Atualiza o valor
print(tabela.buscar("idade"))    # 26
tabela.remover("cidade")
print(tabela.buscar("cidade"))   # None`,
      solution: `class TabelaHash:
    def __init__(self, tamanho=10):
        self.tamanho = tamanho
        self.tabela = [[] for _ in range(tamanho)]

    def _hash(self, chave):
        return sum(ord(c) for c in str(chave)) % self.tamanho

    def inserir(self, chave, valor):
        indice = self._hash(chave)
        for i, (c, v) in enumerate(self.tabela[indice]):
            if c == chave:
                self.tabela[indice][i] = (chave, valor)
                return
        self.tabela[indice].append((chave, valor))

    def buscar(self, chave):
        indice = self._hash(chave)
        for c, v in self.tabela[indice]:
            if c == chave:
                return v
        return None

    def remover(self, chave):
        indice = self._hash(chave)
        for i, (c, v) in enumerate(self.tabela[indice]):
            if c == chave:
                self.tabela[indice].pop(i)
                return True
        return False

# Testes
tabela = TabelaHash()
tabela.inserir("nome", "Alice")
tabela.inserir("idade", 25)
tabela.inserir("cidade", "Sao Paulo")
print(tabela.buscar("nome"))     # Alice
print(tabela.buscar("idade"))    # 25
tabela.inserir("idade", 26)      # Atualiza o valor
print(tabela.buscar("idade"))    # 26
tabela.remover("cidade")
print(tabela.buscar("cidade"))   # None`,
      hints: [
        'A funcao hash pode usar sum(ord(c) for c in str(chave)) % self.tamanho para calcular o indice.',
        'Para inserir, primeiro verifique se a chave ja existe na lista daquele indice. Se sim, atualize o valor. Se nao, adicione um novo par.',
        'Para remover, encontre o par com a chave correta e use pop(i) para remove-lo da lista.',
      ],
    },
    {
      id: 'hash-challenge-2',
      title: 'Contar Frequencia de Palavras com Dicionario',
      description:
        'Implemente a funcao contar_frequencia(texto) que recebe uma string de texto e retorna um dicionario onde as chaves sao as palavras (em minusculo) e os valores sao quantas vezes cada palavra aparece.',
      language: 'python',
      starterCode: `def contar_frequencia(texto):
    # Converta o texto para minusculo
    # Separe em palavras usando split()
    # Conte a frequencia de cada palavra em um dicionario
    # Retorne o dicionario
    pass

# Testes
texto1 = "Python e legal e Python e poderoso"
print(contar_frequencia(texto1))
# {'python': 2, 'e': 3, 'legal': 1, 'poderoso': 1}

texto2 = "o rato roeu a roupa do rei de roma"
print(contar_frequencia(texto2))
# {'o': 1, 'rato': 1, 'roeu': 1, 'a': 1, 'roupa': 1, 'do': 1, 'rei': 1, 'de': 1, 'roma': 1}`,
      solution: `def contar_frequencia(texto):
    frequencia = {}
    palavras = texto.lower().split()

    for palavra in palavras:
        if palavra in frequencia:
            frequencia[palavra] += 1
        else:
            frequencia[palavra] = 1

    return frequencia

# Testes
texto1 = "Python e legal e Python e poderoso"
print(contar_frequencia(texto1))
# {'python': 2, 'e': 3, 'legal': 1, 'poderoso': 1}

texto2 = "o rato roeu a roupa do rei de roma"
print(contar_frequencia(texto2))
# {'o': 1, 'rato': 1, 'roeu': 1, 'a': 1, 'roupa': 1, 'do': 1, 'rei': 1, 'de': 1, 'roma': 1}`,
      hints: [
        'Use texto.lower().split() para obter uma lista de palavras em minusculo.',
        'Para cada palavra, verifique se ja esta no dicionario. Se sim, incremente. Se nao, inicie com 1.',
        'O operador "in" em dicionarios verifica se uma chave existe em O(1).',
      ],
    },
    {
      id: 'hash-challenge-3',
      title: 'Detectar Duplicatas com Set',
      description:
        'Implemente a funcao encontrar_duplicatas(lista) que recebe uma lista de numeros e retorna uma lista com todos os elementos que aparecem mais de uma vez. Use um set para otimizar a busca. A lista retornada nao deve conter duplicatas.',
      language: 'python',
      starterCode: `def encontrar_duplicatas(lista):
    # Use sets para encontrar elementos duplicados
    # Retorne uma lista com os valores que aparecem mais de uma vez
    # Cada valor duplicado deve aparecer apenas uma vez no resultado
    pass

# Testes
print(encontrar_duplicatas([1, 2, 3, 2, 4, 5, 1]))  # [2, 1]
print(encontrar_duplicatas([10, 20, 30]))             # []
print(encontrar_duplicatas([5, 5, 5, 5]))             # [5]
print(encontrar_duplicatas([1, 2, 3, 4, 5, 3, 2]))   # [3, 2]`,
      solution: `def encontrar_duplicatas(lista):
    vistos = set()
    duplicatas = set()

    for item in lista:
        if item in vistos:
            duplicatas.add(item)
        else:
            vistos.add(item)

    return list(duplicatas)

# Testes
print(encontrar_duplicatas([1, 2, 3, 2, 4, 5, 1]))  # [1, 2]
print(encontrar_duplicatas([10, 20, 30]))             # []
print(encontrar_duplicatas([5, 5, 5, 5]))             # [5]
print(encontrar_duplicatas([1, 2, 3, 4, 5, 3, 2]))   # [2, 3]`,
      hints: [
        'Use dois sets: um para elementos ja vistos e outro para duplicatas encontradas.',
        'Para cada elemento, se ele ja esta nos "vistos", adicione aos "duplicatas". Senao, adicione aos "vistos".',
        'No final, converta o set de duplicatas para lista com list().',
      ],
    },
  ],
};
