import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'comprehensions-e-generators',
  moduleId: 'python-avancado',
  title: 'Comprehensions e Generators',
  description: 'Domine list comprehensions, dict/set comprehensions e generators para escrever codigo Python mais idiomatico e eficiente.',
  order: 0,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## List Comprehensions\n\nList comprehensions sao uma forma concisa e expressiva de criar listas em Python. Em vez de um loop for tradicional, voce escreve a logica em uma unica linha.\n\nA sintaxe basica e: `[expressao for item in iteravel]`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'list_comprehension_basica.py',
        code: `# Forma tradicional com loop
quadrados_loop = []
for n in range(1, 11):
    quadrados_loop.append(n ** 2)

# Com list comprehension (muito mais limpo)
quadrados = [n ** 2 for n in range(1, 11)]
print(quadrados)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Transformando strings
nomes = ['alice', 'bob', 'carol']
nomes_maiusculos = [nome.upper() for nome in nomes]
print(nomes_maiusculos)
# ['ALICE', 'BOB', 'CAROL']

# Extraindo dados de objetos
usuarios = [
    {'nome': 'Alice', 'idade': 30},
    {'nome': 'Bob', 'idade': 25},
    {'nome': 'Carol', 'idade': 35},
]
idades = [u['idade'] for u in usuarios]
print(idades)  # [30, 25, 35]`,
        description: 'List comprehensions substituem loops simples de forma muito mais legivel.',
      },
    },
    {
      type: 'text',
      content: '## Comprehensions com Condicoes\n\nVoce pode adicionar um filtro `if` ao final para incluir apenas os itens que satisfazem uma condicao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'comprehension_filtro.py',
        code: `numeros = range(1, 21)

# Apenas os pares
pares = [n for n in numeros if n % 2 == 0]
print(pares)
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Filtrando strings por tamanho
palavras = ['Python', 'e', 'uma', 'linguagem', 'incrivel', 'e', 'versatil']
palavras_longas = [p for p in palavras if len(p) > 3]
print(palavras_longas)
# ['Python', 'linguagem', 'incrivel', 'versatil']

# Combinando transformacao e filtro
# Quadrados dos impares entre 1 e 20
quadrados_impares = [n ** 2 for n in range(1, 21) if n % 2 != 0]
print(quadrados_impares)
# [1, 9, 25, 49, 81, 121, 169, 225, 289, 361]

# if/else DENTRO da expressao (ternario)
resultado = ['par' if n % 2 == 0 else 'impar' for n in range(1, 6)]
print(resultado)
# ['impar', 'par', 'impar', 'par', 'impar']`,
        description: 'O if no final filtra itens. O if/else antes do for e uma expressao ternaria que transforma cada item.',
      },
    },
    {
      type: 'text',
      content: '## Comprehensions Aninhadas\n\nPode-se aninhar loops dentro de comprehensions para trabalhar com estruturas multidimensionais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'comprehension_aninhada.py',
        code: `# Achatar (flatten) uma matriz
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
plana = [num for linha in matriz for num in linha]
print(plana)
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Produto cartesiano
cores = ['vermelho', 'azul']
tamanhos = ['P', 'M', 'G']
combinacoes = [(cor, tam) for cor in cores for tam in tamanhos]
print(combinacoes)
# [('vermelho', 'P'), ('vermelho', 'M'), ('vermelho', 'G'),
#  ('azul', 'P'), ('azul', 'M'), ('azul', 'G')]

# Transpor uma matriz (linha vira coluna)
matriz_3x2 = [[1, 2, 3], [4, 5, 6]]
transposta = [[linha[i] for linha in matriz_3x2] for i in range(3)]
print(transposta)
# [[1, 4], [2, 5], [3, 6]]`,
        description: 'Comprehensions aninhadas seguem a mesma ordem dos loops for equivalentes.',
      },
    },
    {
      type: 'text',
      content: '## Dict e Set Comprehensions\n\nO mesmo conceito se aplica a dicionarios e conjuntos, usando `{}` ao inves de `[]`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dict_set_comprehension.py',
        code: `# Dict comprehension: {chave: valor for ...}
nomes = ['alice', 'bob', 'carol']
tamanhos = {nome: len(nome) for nome in nomes}
print(tamanhos)
# {'alice': 5, 'bob': 3, 'carol': 5}

# Invertendo um dicionario (chave <-> valor)
original = {'a': 1, 'b': 2, 'c': 3}
invertido = {v: k for k, v in original.items()}
print(invertido)
# {1: 'a', 2: 'b', 3: 'c'}

# Filtrando um dicionario
estoque = {'maca': 50, 'banana': 0, 'laranja': 30, 'uva': 0}
disponivel = {fruta: qtd for fruta, qtd in estoque.items() if qtd > 0}
print(disponivel)
# {'maca': 50, 'laranja': 30}

# Set comprehension: elimina duplicatas automaticamente
texto = 'python e uma linguagem de programacao'
letras_unicas = {letra for letra in texto if letra != ' '}
print(sorted(letras_unicas))
# ['a', 'c', 'd', 'e', 'g', 'h', 'i', 'l', 'm', 'n', 'o', 'p', 'r', 't', 'u']`,
        description: 'Dict comprehensions criam dicionarios; set comprehensions criam conjuntos sem duplicatas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Use comprehensions quando a logica couber em uma linha e for facil de ler. Se precisar de mais de um if/else ou logica complexa, um loop for explicito e mais legivel.',
    },
    {
      type: 'text',
      content: '## Generator Expressions: Lazy Evaluation\n\nGenerator expressions tem a mesma sintaxe de list comprehensions, mas com `()` ao inves de `[]`. A diferenca fundamental: eles nao criam a lista inteira na memoria — calculam cada valor sob demanda (lazy evaluation).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'generator_expression.py',
        code: `import sys

# List comprehension: cria TUDO na memoria de uma vez
lista = [n ** 2 for n in range(1_000_000)]
print(f"Lista ocupa: {sys.getsizeof(lista):,} bytes")
# Lista ocupa: 8,448,728 bytes (8 MB!)

# Generator expression: calcula um por vez, sem guardar tudo
gen = (n ** 2 for n in range(1_000_000))
print(f"Generator ocupa: {sys.getsizeof(gen):,} bytes")
# Generator ocupa: 200 bytes (quase nada!)

# Iterando sobre o generator (consome um valor por vez)
gen_soma = (n ** 2 for n in range(1, 6))
for valor in gen_soma:
    print(valor, end=' ')
# 1 4 9 16 25

# Generators funcionam diretamente em sum(), max(), min()
total = sum(n ** 2 for n in range(1, 11))
print(f"\\nSoma dos quadrados: {total}")  # 385

maior = max(len(palavra) for palavra in ['python', 'java', 'javascript'])
print(f"Maior tamanho: {maior}")  # 10`,
        description: 'Generators economizam memoria drasticamente ao processar grandes volumes de dados.',
      },
    },
    {
      type: 'text',
      content: '## Funcoes Geradoras com yield\n\nPara generators mais complexos, use a palavra-chave `yield` dentro de uma funcao. Cada chamada de `next()` executa ate o proximo `yield` e pausa ali.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'yield_generator.py',
        code: `# Funcao geradora basica
def contar_ate(n):
    print("Iniciando contador...")
    for i in range(1, n + 1):
        print(f"  Prestes a gerar {i}")
        yield i
        print(f"  Retomando apos {i}")
    print("Contador finalizado")

gen = contar_ate(3)
print(next(gen))  # Iniciando... Prestes a gerar 1 -> imprime 1
print(next(gen))  # Retomando apos 1... Prestes a gerar 2 -> imprime 2
print(next(gen))  # Retomando apos 2... Prestes a gerar 3 -> imprime 3

# Caso de uso real: lendo arquivo enorme linha a linha
def ler_linhas_csv(caminho):
    """Le um CSV gigante sem carregar tudo na memoria."""
    with open(caminho, 'r', encoding='utf-8') as f:
        cabecalho = f.readline().strip().split(',')
        for linha in f:
            valores = linha.strip().split(',')
            yield dict(zip(cabecalho, valores))

# Processamento em pipeline: cada linha processada uma por vez
def filtrar_ativos(registros):
    for registro in registros:
        if registro.get('status') == 'ativo':
            yield registro

def extrair_nomes(registros):
    for registro in registros:
        yield registro['nome'].upper()

# Pipeline: ler -> filtrar -> transformar (sem carregar o arquivo todo)
# pipeline = extrair_nomes(filtrar_ativos(ler_linhas_csv('dados.csv')))
# for nome in pipeline:
#     print(nome)`,
        description: 'yield pausa a execucao e retorna um valor. Na proxima chamada, retoma de onde parou.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Generators sao descartaveis: uma vez esgotados, nao podem ser reiniciados. Para reutilizar, crie um novo generator. Use `list(gen)` para materializar todos os valores quando precisar da lista completa.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'generator_avancado.py',
        code: `# yield from: delega para outro iteravel
def numeros_pares(limite):
    yield from range(0, limite + 1, 2)

def numeros_impares(limite):
    yield from range(1, limite + 1, 2)

def todos_numeros(limite):
    yield from numeros_pares(limite)
    yield from numeros_impares(limite)

print(list(todos_numeros(6)))
# [0, 2, 4, 6, 1, 3, 5]

# Generator infinito (com itertools seria mais simples, mas didatico)
def fibonacci():
    """Generator infinito da sequencia de Fibonacci."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Pegar os primeiros 10 Fibonacci
fib = fibonacci()
primeiros_10 = [next(fib) for _ in range(10)]
print(primeiros_10)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Usando islice para limitar um generator infinito
from itertools import islice
fib2 = fibonacci()
ate_100 = list(islice(fib2, 0, None))  # Nao use isso em generator infinito!
primeiros_20 = list(islice(fibonacci(), 20))
print(primeiros_20[-1])  # 4181`,
        description: 'yield from delega iteracao. Generators infinitos sao seguros pois calculam sob demanda.',
      },
    },
  ],
  challenges: [
    {
      id: 'pyav-comp-c1',
      title: 'Pipeline de Dados com Generators',
      description: 'Implemente um pipeline de processamento de dados usando generators. Crie tres generators encadeados: (1) gerar_registros(n) que gera n dicionarios com campos id, valor e categoria; (2) filtrar_por_categoria(registros, categoria) que filtra apenas os da categoria indicada; (3) calcular_imposto(registros, taxa) que adiciona o campo imposto = valor * taxa a cada registro. Encadeie os tres para processar sem carregar tudo na memoria.',
      language: 'python',
      starterCode: `# Generator 1: gera registros simulados
def gerar_registros(n):
    # Gere n dicionarios com id (1..n), valor (id * 10.0)
    # e categoria alternando entre 'A' e 'B'
    pass

# Generator 2: filtra por categoria
def filtrar_por_categoria(registros, categoria):
    # Produza apenas os registros onde categoria == categoria
    pass

# Generator 3: adiciona imposto
def calcular_imposto(registros, taxa):
    # Para cada registro, adicione chave 'imposto' = valor * taxa
    # Produza o registro modificado
    pass

# Monte o pipeline e imprima os resultados
# Filtre categoria 'A' e aplique taxa de 0.1
pipeline = calcular_imposto(
    filtrar_por_categoria(gerar_registros(10), 'A'),
    taxa=0.1
)

for registro in pipeline:
    print(registro)
`,
      solution: `def gerar_registros(n):
    categorias = ['A', 'B']
    for i in range(1, n + 1):
        yield {
            'id': i,
            'valor': i * 10.0,
            'categoria': categorias[i % 2]
        }

def filtrar_por_categoria(registros, categoria):
    for registro in registros:
        if registro['categoria'] == categoria:
            yield registro

def calcular_imposto(registros, taxa):
    for registro in registros:
        registro['imposto'] = round(registro['valor'] * taxa, 2)
        yield registro

pipeline = calcular_imposto(
    filtrar_por_categoria(gerar_registros(10), 'A'),
    taxa=0.1
)

for registro in pipeline:
    print(registro)`,
      hints: [
        'Use yield dentro de cada funcao para torna-la um generator',
        'Encadeie generators passando um como argumento do outro',
        'Para alternar categorias: categorias = ["A", "B"] e use i % 2 como indice',
        'Voce pode modificar o dicionario antes de fazer yield sem copiar',
      ],
    },
    {
      id: 'pyav-comp-c2',
      title: 'Comprehensions Avancadas',
      description: 'Use comprehensions para resolver tres problemas: (1) Dado uma lista de frases, crie um dict onde a chave e a frase e o valor e a contagem de vogais nela. (2) Dado uma lista de listas de numeros, crie uma lista plana apenas com os numeros primos. (3) Dado dois dicionarios de estoque, crie um terceiro com os itens que aparecem nos dois e o valor sendo a soma dos estoques.',
      language: 'python',
      starterCode: `frases = ['Python e incrivel', 'Generators sao poderosos', 'Comprehensions economizam codigo']
vogais = set('aeiouAEIOU')

# 1. Dict: frase -> contagem de vogais
contagem_vogais = {}  # substitua por dict comprehension

print("1:", contagem_vogais)

# 2. Lista plana de primos
grupos = [[2, 3, 4, 5], [6, 7, 8, 9], [10, 11, 12, 13]]

def eh_primo(n):
    if n < 2:
        return False
    return all(n % i != 0 for i in range(2, int(n**0.5) + 1))

primos = []  # substitua por list comprehension

print("2:", primos)

# 3. Intersecao de estoques
estoque_a = {'maca': 10, 'banana': 5, 'laranja': 8}
estoque_b = {'banana': 3, 'laranja': 12, 'uva': 7}

intersecao = {}  # substitua por dict comprehension

print("3:", intersecao)
`,
      solution: `frases = ['Python e incrivel', 'Generators sao poderosos', 'Comprehensions economizam codigo']
vogais = set('aeiouAEIOU')

# 1. Dict: frase -> contagem de vogais
contagem_vogais = {frase: sum(1 for c in frase if c in vogais) for frase in frases}
print("1:", contagem_vogais)

# 2. Lista plana de primos
grupos = [[2, 3, 4, 5], [6, 7, 8, 9], [10, 11, 12, 13]]

def eh_primo(n):
    if n < 2:
        return False
    return all(n % i != 0 for i in range(2, int(n**0.5) + 1))

primos = [n for grupo in grupos for n in grupo if eh_primo(n)]
print("2:", primos)

# 3. Intersecao de estoques
estoque_a = {'maca': 10, 'banana': 5, 'laranja': 8}
estoque_b = {'banana': 3, 'laranja': 12, 'uva': 7}

intersecao = {k: estoque_a[k] + estoque_b[k] for k in estoque_a if k in estoque_b}
print("3:", intersecao)`,
      hints: [
        'Para contar vogais em uma frase: sum(1 for c in frase if c in vogais)',
        'Para achatar listas aninhadas: [item for sublista in lista for item in sublista]',
        'Para intersecao de dicts: itere pelas chaves de um e verifique se existe no outro com "in"',
      ],
    },
  ],
};
