import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'dicionarios-e-tuplas',
  moduleId: 'python',
  title: 'Dicionarios e Tuplas',
  description: 'Aprenda a usar dicionarios para armazenar pares chave-valor e tuplas para dados imutaveis.',
  order: 7,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'Um **dicionario** e uma colecao de pares **chave-valor**. Imagine um dicionario real: voce procura uma palavra (chave) e encontra seu significado (valor). Em Python, dicionarios sao extremamente uteis para organizar dados relacionados.\n\nJa uma **tupla** e parecida com uma lista, mas com uma diferenca fundamental: ela e **imutavel** — uma vez criada, nao pode ser alterada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dicionario_basico.py',
        code: `# Criando dicionarios
pessoa = {
    "nome": "Ana",
    "idade": 25,
    "cidade": "Sao Paulo"
}

# Acessando valores pela chave
print(pessoa["nome"])    # Ana
print(pessoa["idade"])   # 25

# Usando get() - mais seguro (nao da erro se a chave nao existir)
print(pessoa.get("email", "Nao informado"))  # Nao informado

# Adicionando e modificando
pessoa["email"] = "ana@email.com"  # Adiciona nova chave
pessoa["idade"] = 26               # Modifica valor existente

print(pessoa)`,
        description: 'Dicionarios sao criados com chaves {} e acessados pela chave usando colchetes ou get().',
      },
    },
    {
      type: 'text',
      content: '## Metodos de Dicionario\n\nDicionarios possuem metodos que facilitam o acesso aos seus dados:\n\n- **`.keys()`** — Retorna todas as chaves do dicionario\n- **`.values()`** — Retorna todos os valores do dicionario\n- **`.items()`** — Retorna pares (chave, valor), ideal para iterar\n- **`del`** — Remove uma chave e seu valor do dicionario',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dicionario_metodos.py',
        code: `aluno = {
    "nome": "Carlos",
    "nota1": 8.5,
    "nota2": 7.0,
    "nota3": 9.0
}

# Metodos uteis
print(aluno.keys())    # dict_keys(['nome', 'nota1', 'nota2', 'nota3'])
print(aluno.values())  # dict_values(['Carlos', 8.5, 7.0, 9.0])
print(aluno.items())   # dict_items([('nome', 'Carlos'), ...])

# Iterando sobre o dicionario
for chave, valor in aluno.items():
    print(f"{chave}: {valor}")

# Verificando se uma chave existe
if "nome" in aluno:
    print(f"Aluno: {aluno['nome']}")

# Removendo uma chave
del aluno["nota3"]
print(aluno)`,
        description: 'Os metodos keys(), values() e items() permitem acessar partes do dicionario.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Use o metodo get() ao inves de colchetes quando nao tiver certeza se a chave existe. Com colchetes, voce recebe um erro KeyError. Com get(), voce pode definir um valor padrao.',
    },
    {
      type: 'text',
      content: '## Dicionarios Aninhados\n\nDicionarios podem conter outros dicionarios como valores, criando estruturas de dados hierarquicas. Para acessar um dado aninhado, basta encadear os colchetes: `dicionario["chave1"]["chave2"]`.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dicionario_aninhado.py',
        code: `# Dicionarios aninhados (dicionario dentro de dicionario)
escola = {
    "turma_a": {
        "professor": "Maria",
        "alunos": 30,
        "sala": 101
    },
    "turma_b": {
        "professor": "Joao",
        "alunos": 25,
        "sala": 102
    }
}

# Acessando dados aninhados
print(escola["turma_a"]["professor"])  # Maria
print(escola["turma_b"]["alunos"])     # 25

# Iterando sobre dicionario aninhado
for turma, info in escola.items():
    print(f"{turma}: Prof. {info['professor']}, {info['alunos']} alunos")`,
        description: 'Dicionarios podem conter outros dicionarios, criando estruturas de dados complexas.',
      },
    },
    {
      type: 'text',
      content: '## Tuplas em Python\n\nUma **tupla** e criada com parenteses `()` e funciona como uma lista imutavel. Por ser imutavel, tuplas sao mais rapidas e seguras para dados que nao devem mudar.\n\nUm recurso poderoso das tuplas e o **desempacotamento**: voce pode atribuir cada elemento a uma variavel em uma unica instrucao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'tuplas.py',
        code: `# Criando tuplas
coordenada = (10, 20)
cores_rgb = (255, 128, 0)
pessoa = ("Ana", 25, "Sao Paulo")

# Acessando elementos (igual lista)
print(coordenada[0])  # 10
print(pessoa[1])      # 25

# Tuplas sao IMUTAVEIS - isso gera erro:
# coordenada[0] = 30  # TypeError!

# Desempacotamento de tuplas (tuple unpacking)
nome, idade, cidade = pessoa
print(f"{nome} tem {idade} anos e mora em {cidade}")

# Desempacotamento com *
numeros = (1, 2, 3, 4, 5)
primeiro, *meio, ultimo = numeros
print(primeiro)  # 1
print(meio)      # [2, 3, 4]
print(ultimo)    # 5`,
        description: 'Tuplas sao imutaveis e ideais para dados que nao devem mudar, como coordenadas.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Quando usar cada um? Use **listas** quando precisar modificar os dados (adicionar, remover). Use **tuplas** para dados fixos, como coordenadas ou retorno de funcoes com multiplos valores. Use **dicionarios** quando precisar associar chaves a valores, como um cadastro.',
    },
  ],
  challenges: [
    {
      id: 'dict-c1',
      title: 'Agenda Telefonica',
      description: 'Crie um dicionario representando uma agenda telefonica com pelo menos 3 contatos (nome como chave, telefone como valor). Depois, faca o seguinte: adicione um novo contato, remova um contato existente, e imprima todos os contatos formatados como "Nome: Telefone".',
      language: 'python',
      starterCode: `# Crie um dicionario com pelo menos 3 contatos
# Formato: {"nome": "telefone"}
agenda = {}

# Adicione um novo contato

# Remova um contato

# Imprima todos os contatos formatados
`,
      solution: `agenda = {
    "Ana": "(11) 99999-1111",
    "Bruno": "(11) 99999-2222",
    "Carla": "(11) 99999-3333"
}

# Adicionando novo contato
agenda["Daniel"] = "(11) 99999-4444"

# Removendo um contato
del agenda["Bruno"]

# Imprimindo todos os contatos
for nome, telefone in agenda.items():
    print(f"{nome}: {telefone}")`,
      hints: [
        'Crie o dicionario com chaves {} usando "nome": "telefone"',
        'Para adicionar: agenda["novo_nome"] = "telefone"',
        'Para remover: del agenda["nome"] ou agenda.pop("nome")',
      ],
    },
    {
      id: 'dict-c2',
      title: 'Media de Notas dos Alunos',
      description: 'Crie um dicionario onde cada chave e o nome de um aluno e o valor e uma lista de notas. Calcule e imprima a media de cada aluno, e ao final indique qual aluno teve a maior media.',
      language: 'python',
      starterCode: `# Crie um dicionario com 3 alunos e suas notas (lista de numeros)
alunos = {}

# Calcule a media de cada aluno e imprima

# Encontre e imprima o aluno com a maior media
`,
      solution: `alunos = {
    "Ana": [8.0, 7.5, 9.0],
    "Bruno": [6.5, 7.0, 8.0],
    "Carla": [9.5, 9.0, 10.0]
}

melhor_aluno = ""
melhor_media = 0

for nome, notas in alunos.items():
    media = sum(notas) / len(notas)
    print(f"{nome}: media = {media:.1f}")
    if media > melhor_media:
        melhor_media = media
        melhor_aluno = nome

print(f"\\nMelhor aluno: {melhor_aluno} (media: {melhor_media:.1f})")`,
      hints: [
        'Use sum(notas) / len(notas) para calcular a media de cada lista de notas',
        'Itere com for nome, notas in alunos.items()',
        'Use variaveis auxiliares para guardar o melhor aluno e a melhor media',
      ],
    },
    {
      id: 'dict-c3',
      title: 'Desempacotamento de Coordenadas',
      description: 'Crie uma lista de tuplas representando coordenadas (x, y) de pontos. Depois, use desempacotamento para iterar sobre as coordenadas, calcule a distancia de cada ponto ate a origem (0, 0) e imprima o resultado. A formula da distancia e: raiz quadrada de (x**2 + y**2).',
      language: 'python',
      starterCode: `# Crie uma lista de tuplas com coordenadas (x, y)
pontos = [(3, 4), (6, 8), (1, 1), (5, 12)]

# Para cada ponto, desempacote x e y
# Calcule a distancia ate a origem: (x**2 + y**2) ** 0.5
# Imprima o ponto e a distancia
`,
      solution: `pontos = [(3, 4), (6, 8), (1, 1), (5, 12)]

for x, y in pontos:
    distancia = (x**2 + y**2) ** 0.5
    print(f"Ponto ({x}, {y}) - Distancia da origem: {distancia:.2f}")`,
      hints: [
        'Use for x, y in pontos: para desempacotar cada tupla automaticamente',
        'A distancia ate a origem e calculada com (x**2 + y**2) ** 0.5',
        'Use f-string com :.2f para formatar o resultado com 2 casas decimais',
      ],
    },
  ],
};
