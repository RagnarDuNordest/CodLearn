import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'algoritmos-gulosos',
  moduleId: 'algoritmos',
  title: 'Algoritmos Gulosos (Greedy)',
  description: 'Aprenda a estrategia gulosa: fazer a melhor escolha local esperando chegar na solucao global.',
  order: 7,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'Um **algoritmo guloso** (greedy) resolve problemas fazendo a **melhor escolha possivel a cada passo**, sem se preocupar com o futuro. A ideia e: se fizermos a melhor decisao local, chegaremos a uma boa solucao global.\n\nNem sempre funciona para todos os problemas, mas quando funciona, e muito eficiente!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'troco_guloso.py',
        code: `# Problema do Troco: dar o menor numero de moedas
# Moedas disponiveis: 1, 5, 10, 25, 50, 100 centavos

def troco_guloso(valor):
    moedas = [100, 50, 25, 10, 5, 1]
    resultado = []

    for moeda in moedas:
        while valor >= moeda:
            resultado.append(moeda)
            valor -= moeda

    return resultado

# Exemplo: troco para 87 centavos
troco = troco_guloso(87)
print(f"Moedas: {troco}")
print(f"Quantidade: {len(troco)} moedas")
# Moedas: [50, 25, 10, 1, 1]
# Quantidade: 5 moedas`,
        description: 'A cada passo, escolhemos a maior moeda possivel. Essa e a estrategia gulosa.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '**Quando o guloso funciona?**\n\nO algoritmo guloso funciona quando o problema tem **escolha gulosa** (a melhor escolha local leva a solucao global) e **subestrutura otima** (a solucao otima contem solucoes otimas dos subproblemas).',
    },
    {
      type: 'text',
      content: 'Um problema classico e a **selecao de atividades**: dado um conjunto de atividades com horario de inicio e fim, selecionar o maximo de atividades que nao se sobreponham.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'selecao_atividades.py',
        code: `def selecionar_atividades(atividades):
    """
    Cada atividade e uma tupla (inicio, fim, nome).
    Estrategia gulosa: ordenar por horario de FIM
    e sempre escolher a proxima que nao conflita.
    """
    # Ordenar por horario de termino
    ordenadas = sorted(atividades, key=lambda a: a[1])

    selecionadas = [ordenadas[0]]
    ultimo_fim = ordenadas[0][1]

    for atividade in ordenadas[1:]:
        inicio = atividade[0]
        if inicio >= ultimo_fim:
            selecionadas.append(atividade)
            ultimo_fim = atividade[1]

    return selecionadas

# Atividades: (inicio, fim, nome)
atividades = [
    (1, 3, "Aula de Python"),
    (2, 5, "Reuniao"),
    (4, 7, "Treino"),
    (1, 8, "Projeto"),
    (5, 9, "Estudo"),
    (8, 10, "Jantar"),
]

resultado = selecionar_atividades(atividades)
print("Atividades selecionadas:")
for a in resultado:
    print(f"  {a[2]}: {a[0]}h - {a[1]}h")
# Aula de Python: 1h - 3h
# Treino: 4h - 7h
# Jantar: 8h - 10h`,
        description: 'Ordenar pelo fim e escolher a proxima sem conflito maximiza as atividades.',
      },
    },
    {
      type: 'text',
      content: 'Outro exemplo classico: a **Mochila Fracionaria**. Temos uma mochila com capacidade limitada e itens com peso e valor. Podemos pegar fracoes dos itens (diferente da mochila 0/1).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'mochila_fracionaria.py',
        code: `def mochila_fracionaria(capacidade, itens):
    """
    itens: lista de (peso, valor, nome)
    Estrategia: ordenar por valor/peso (maior primeiro)
    """
    # Calcular razao valor/peso e ordenar
    itens_com_razao = []
    for peso, valor, nome in itens:
        razao = valor / peso
        itens_com_razao.append((razao, peso, valor, nome))

    itens_com_razao.sort(reverse=True)  # Maior razao primeiro

    valor_total = 0
    peso_restante = capacidade
    mochila = []

    for razao, peso, valor, nome in itens_com_razao:
        if peso_restante >= peso:
            # Pega o item inteiro
            mochila.append((nome, 1.0))
            valor_total += valor
            peso_restante -= peso
        else:
            # Pega uma fracao
            fracao = peso_restante / peso
            mochila.append((nome, fracao))
            valor_total += valor * fracao
            break

    return valor_total, mochila

itens = [
    (10, 60, "Notebook"),   # peso, valor, nome
    (20, 100, "Livros"),
    (30, 120, "Ferramentas"),
]

valor, mochila = mochila_fracionaria(50, itens)
print(f"Valor maximo: R$" + f"{valor:.2f}")
for nome, fracao in mochila:
    print(f"  {nome}: {fracao*100:.0f}%")`,
        description: 'Na mochila fracionaria, a estrategia gulosa de maior valor/peso e sempre otima.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Guloso nem sempre e otimo!**\n\nNo problema do troco com moedas {1, 3, 4}, para valor 6: guloso daria 4+1+1 (3 moedas), mas o otimo e 3+3 (2 moedas). Nesses casos, use **Programacao Dinamica**.',
    },
  ],
  challenges: [
    {
      id: 'gul-c1',
      title: 'Troco em Cedulas',
      description: 'Implemente um algoritmo guloso que calcula o menor numero de cedulas para um valor em reais. Use cedulas de R$100, R$50, R$20, R$10, R$5 e R$2.',
      language: 'python',
      starterCode: 'def menor_cedulas(valor):\n    cedulas = [100, 50, 20, 10, 5, 2]\n    resultado = {}\n\n    # Para cada cedula, calcule quantas cabem no valor\n    # e armazene no dicionario resultado\n\n    return resultado\n\n# Teste com R$187\ntroco = menor_cedulas(187)\nprint("Cedulas necessarias para R$187:")\nfor cedula, qtd in troco.items():\n    print(f"  R${cedula}: {qtd} cedula(s)")\nprint(f"Total de cedulas: {sum(troco.values())}")',
      solution: 'def menor_cedulas(valor):\n    cedulas = [100, 50, 20, 10, 5, 2]\n    resultado = {}\n\n    for cedula in cedulas:\n        if valor >= cedula:\n            quantidade = valor // cedula\n            resultado[cedula] = quantidade\n            valor -= cedula * quantidade\n\n    if valor > 0:\n        resultado["moedas"] = valor\n\n    return resultado\n\n# Teste com R$187\ntroco = menor_cedulas(187)\nprint("Cedulas necessarias para R$187:")\nfor cedula, qtd in troco.items():\n    print(f"  R${cedula}: {qtd} cedula(s)")\nprint(f"Total de cedulas: {sum(troco.values())}")',
      hints: [
        'Use divisao inteira (//) para saber quantas cedulas de cada tipo cabem',
        'Subtraia o valor das cedulas usadas antes de passar para a proxima',
        'Se sobrar valor menor que 2, sao moedas',
      ],
    },
    {
      id: 'gul-c2',
      title: 'Agendador de Tarefas',
      description: 'Voce tem uma lista de tarefas com deadline e duracao. Implemente um algoritmo guloso que agenda o maximo de tarefas possiveis, priorizando as que vencem mais cedo.',
      language: 'python',
      starterCode: `def agendar_tarefas(tarefas):
    """
    tarefas: lista de (nome, deadline, duracao)
    Retorna lista de tarefas agendadas em ordem
    """
    # Ordene as tarefas por deadline

    agendadas = []
    tempo_atual = 0

    # Para cada tarefa, verifique se da tempo de completar
    # antes do deadline

    return agendadas

tarefas = [
    ("Relatorio", 4, 2),    # deadline hora 4, dura 2h
    ("Email", 2, 1),         # deadline hora 2, dura 1h
    ("Reuniao", 6, 3),       # deadline hora 6, dura 3h
    ("Estudo", 8, 2),        # deadline hora 8, dura 2h
    ("Apresentacao", 5, 4),  # deadline hora 5, dura 4h
]

resultado = agendar_tarefas(tarefas)
print("Tarefas agendadas:")
for nome, fim in resultado:
    print(f"  {nome} (termina na hora {fim})")`,
      solution: `def agendar_tarefas(tarefas):
    """
    tarefas: lista de (nome, deadline, duracao)
    Retorna lista de tarefas agendadas em ordem
    """
    # Ordene as tarefas por deadline
    ordenadas = sorted(tarefas, key=lambda t: t[1])

    agendadas = []
    tempo_atual = 0

    for nome, deadline, duracao in ordenadas:
        if tempo_atual + duracao <= deadline:
            tempo_atual += duracao
            agendadas.append((nome, tempo_atual))

    return agendadas

tarefas = [
    ("Relatorio", 4, 2),
    ("Email", 2, 1),
    ("Reuniao", 6, 3),
    ("Estudo", 8, 2),
    ("Apresentacao", 5, 4),
]

resultado = agendar_tarefas(tarefas)
print("Tarefas agendadas:")
for nome, fim in resultado:
    print(f"  {nome} (termina na hora {fim})")`,
      hints: [
        'Ordene por deadline usando sorted() com key=lambda',
        'Mantenha uma variavel tempo_atual que acumula a duracao',
        'Uma tarefa so pode ser agendada se tempo_atual + duracao <= deadline',
      ],
    },
    {
      id: 'gul-c3',
      title: 'Compressao de Intervalos',
      description: 'Dado uma lista de intervalos (inicio, fim), junte os intervalos que se sobrepoem. Por exemplo, (1,3) e (2,5) viram (1,5). Use a estrategia gulosa de ordenar por inicio.',
      language: 'python',
      starterCode: `def juntar_intervalos(intervalos):
    """
    Junta intervalos que se sobrepoem.
    Ex: [(1,3), (2,5), (7,9)] -> [(1,5), (7,9)]
    """
    if not intervalos:
        return []

    # Ordene por inicio

    # Percorra comparando cada intervalo com o anterior
    resultado = []

    return resultado

# Teste
intervalos = [(1, 3), (2, 6), (8, 10), (15, 18), (9, 12)]
juntados = juntar_intervalos(intervalos)
print(f"Original: {intervalos}")
print(f"Juntados: {juntados}")
# Esperado: [(1, 6), (8, 12), (15, 18)]`,
      solution: `def juntar_intervalos(intervalos):
    """
    Junta intervalos que se sobrepoem.
    Ex: [(1,3), (2,5), (7,9)] -> [(1,5), (7,9)]
    """
    if not intervalos:
        return []

    # Ordene por inicio
    ordenados = sorted(intervalos, key=lambda x: x[0])

    resultado = [ordenados[0]]

    for inicio, fim in ordenados[1:]:
        ultimo_inicio, ultimo_fim = resultado[-1]

        if inicio <= ultimo_fim:
            # Sobreposicao: juntar (pegar o maior fim)
            resultado[-1] = (ultimo_inicio, max(ultimo_fim, fim))
        else:
            # Sem sobreposicao: adicionar novo intervalo
            resultado.append((inicio, fim))

    return resultado

# Teste
intervalos = [(1, 3), (2, 6), (8, 10), (15, 18), (9, 12)]
juntados = juntar_intervalos(intervalos)
print(f"Original: {intervalos}")
print(f"Juntados: {juntados}")`,
      hints: [
        'Ordene os intervalos pelo valor de inicio',
        'Compare o inicio do intervalo atual com o fim do ultimo no resultado',
        'Se ha sobreposicao (inicio <= ultimo_fim), atualize o fim com max()',
      ],
    },
  ],
};
