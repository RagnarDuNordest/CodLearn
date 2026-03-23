import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arquivos',
  moduleId: 'python',
  title: 'Manipulacao de Arquivos',
  description: 'Aprenda a ler e escrever arquivos de texto e CSV com Python.',
  order: 10,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'Ate agora, todos os dados dos nossos programas se perdiam ao fechar o programa. Com **arquivos**, podemos **salvar** e **ler** dados de forma permanente.\n\nPython torna o trabalho com arquivos muito simples usando a funcao **open()** e o gerenciador de contexto **with**, que garante que o arquivo seja fechado corretamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'escrever_arquivo.py',
        code: `# Escrevendo em um arquivo (modo "w" - write)
# Se o arquivo nao existir, ele sera criado
# Se ja existir, o conteudo anterior sera APAGADO
with open("notas.txt", "w") as arquivo:
    arquivo.write("Diario de Notas\\n")
    arquivo.write("================\\n")
    arquivo.write("Matematica: 8.5\\n")
    arquivo.write("Portugues: 7.0\\n")
    arquivo.write("Historia: 9.0\\n")

print("Arquivo criado com sucesso!")

# Adicionando ao arquivo (modo "a" - append)
# Adiciona no final sem apagar o conteudo existente
with open("notas.txt", "a") as arquivo:
    arquivo.write("Ciencias: 8.0\\n")

print("Nota adicionada!")`,
        description: 'O modo "w" cria ou sobrescreve o arquivo. O modo "a" adiciona ao final sem apagar.',
      },
    },
    {
      type: 'text',
      content: 'Para **ler** um arquivo, abra-o no modo `"r"` (read). O Python oferece tres formas de leitura:\n\n- **`read()`** — Le o conteudo inteiro do arquivo como uma unica string\n- **`readlines()`** — Le todas as linhas e retorna uma lista, onde cada item e uma linha\n- **`enumerate(iteravel, inicio)`** — Itera retornando pares `(indice, valor)`, util para numerar linhas\n- **`.strip()`** — Remove espacos e quebras de linha do inicio e fim de uma string\n- **`.split(separador)`** — Divide uma string em uma lista usando o separador informado',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'ler_arquivo.py',
        code: `# Lendo o arquivo inteiro
with open("notas.txt", "r") as arquivo:
    conteudo = arquivo.read()
    print(conteudo)

# Lendo linha por linha com readlines()
print("--- Lendo linha por linha ---")
with open("notas.txt", "r") as arquivo:
    linhas = arquivo.readlines()
    for i, linha in enumerate(linhas, 1):
        print(f"Linha {i}: {linha.strip()}")

# Iterando diretamente (mais eficiente para arquivos grandes)
print("\\n--- Iterando diretamente ---")
with open("notas.txt", "r") as arquivo:
    for linha in arquivo:
        if ":" in linha:
            materia, nota = linha.strip().split(": ")
            print(f"  {materia} -> {nota}")`,
        description: 'read() le tudo de uma vez, readlines() retorna uma lista, e for itera linha por linha.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Sempre use **with open()** ao trabalhar com arquivos! O with garante que o arquivo sera fechado corretamente, mesmo se ocorrer um erro. Sem o with, voce precisaria chamar arquivo.close() manualmente, e esquecer disso pode causar perda de dados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'arquivo_pratico.py',
        code: `# Exemplo pratico: salvando e carregando uma lista de tarefas

def salvar_tarefas(tarefas, nome_arquivo):
    with open(nome_arquivo, "w") as arquivo:
        for tarefa in tarefas:
            arquivo.write(tarefa + "\\n")
    print(f"{len(tarefas)} tarefas salvas!")

def carregar_tarefas(nome_arquivo):
    try:
        with open(nome_arquivo, "r") as arquivo:
            tarefas = [linha.strip() for linha in arquivo if linha.strip()]
        print(f"{len(tarefas)} tarefas carregadas!")
        return tarefas
    except FileNotFoundError:
        print("Arquivo nao encontrado. Criando lista vazia.")
        return []

# Salvando tarefas
minhas_tarefas = [
    "Estudar Python",
    "Fazer exercicios",
    "Ler documentacao",
    "Praticar projetos"
]
salvar_tarefas(minhas_tarefas, "tarefas.txt")

# Carregando tarefas
tarefas = carregar_tarefas("tarefas.txt")
for i, tarefa in enumerate(tarefas, 1):
    print(f"{i}. {tarefa}")`,
        description: 'Combinar funcoes com arquivos permite criar programas que salvam dados permanentemente.',
      },
    },
    {
      type: 'text',
      content: '## Arquivos CSV\n\nArquivos **CSV** (Comma-Separated Values) armazenam dados tabulares em texto simples. Cada linha representa um registro e os valores sao separados por virgulas. E um formato amplamente usado para trocar dados entre planilhas e programas.\n\n- **`",".join(lista)`** — Une os elementos de uma lista em uma unica string separada por virgulas\n- **`readline()`** — Le apenas a proxima linha do arquivo (util para pular o cabecalho)\n- **`float(valor)`** e **`int(valor)`** — Convertem strings para numeros ao ler dados do CSV',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'csv_basico.py',
        code: `# Escrevendo um arquivo CSV (valores separados por virgula)
alunos = [
    ["Nome", "Nota1", "Nota2", "Media"],
    ["Ana", "8.5", "7.0", "7.75"],
    ["Bruno", "6.0", "8.0", "7.0"],
    ["Carla", "9.0", "9.5", "9.25"]
]

with open("alunos.csv", "w") as arquivo:
    for linha in alunos:
        arquivo.write(",".join(linha) + "\\n")
print("CSV criado!")

# Lendo o arquivo CSV
print("\\n--- Dados do CSV ---")
with open("alunos.csv", "r") as arquivo:
    cabecalho = arquivo.readline().strip().split(",")
    print(f"Colunas: {cabecalho}")

    for linha in arquivo:
        dados = linha.strip().split(",")
        nome = dados[0]
        media = float(dados[3])
        situacao = "Aprovado" if media >= 7 else "Reprovado"
        print(f"{nome}: media {media} - {situacao}")`,
        description: 'Arquivos CSV armazenam dados tabulares. Cada linha e um registro e valores sao separados por virgula.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Para projetos mais complexos com CSV, use o modulo **csv** do Python: import csv. Ele lida automaticamente com casos especiais como virgulas dentro de valores e aspas.',
    },
  ],
  challenges: [
    {
      id: 'file-c1',
      title: 'Diario Pessoal',
      description: 'Crie um programa que funciona como um diario pessoal. Crie uma funcao escrever_entrada(arquivo, texto) que adiciona uma nova entrada ao arquivo com a data atual (pode ser fixa como "2024-01-15"). Crie outra funcao ler_diario(arquivo) que le e exibe todas as entradas. Escreva pelo menos 3 entradas e depois exiba o diario completo.',
      language: 'python',
      starterCode: `def escrever_entrada(nome_arquivo, texto):
    # Abra o arquivo em modo append
    # Escreva a data e o texto
    pass

def ler_diario(nome_arquivo):
    # Abra o arquivo em modo leitura
    # Exiba todo o conteudo
    pass

# Escreva pelo menos 3 entradas
# Depois leia e exiba o diario completo
`,
      solution: `def escrever_entrada(nome_arquivo, texto):
    with open(nome_arquivo, "a") as arquivo:
        arquivo.write(f"[2024-01-15] {texto}\\n")
    print("Entrada adicionada!")

def ler_diario(nome_arquivo):
    try:
        with open(nome_arquivo, "r") as arquivo:
            conteudo = arquivo.read()
            if conteudo:
                print("=== Meu Diario ===")
                print(conteudo)
            else:
                print("O diario esta vazio.")
    except FileNotFoundError:
        print("Diario nao encontrado.")

escrever_entrada("diario.txt", "Hoje comecei a estudar arquivos em Python!")
escrever_entrada("diario.txt", "Aprendi sobre os modos r, w e a.")
escrever_entrada("diario.txt", "Consegui criar meu primeiro programa com arquivos!")

ler_diario("diario.txt")`,
      hints: [
        'Use o modo "a" (append) para nao apagar entradas anteriores',
        'Adicione uma data antes do texto usando f-string',
        'Na funcao de leitura, trate FileNotFoundError caso o arquivo nao exista ainda',
      ],
    },
    {
      id: 'file-c2',
      title: 'Contador de Palavras',
      description: 'Crie um programa que le um arquivo de texto e conta: o numero total de linhas, o numero total de palavras e o numero total de caracteres (sem contar espacos). Crie primeiro o arquivo com um texto de pelo menos 3 linhas, depois faca a contagem.',
      language: 'python',
      starterCode: `# Primeiro, crie um arquivo de texto com pelo menos 3 linhas
# Depois, crie uma funcao que conta linhas, palavras e caracteres

def contar_estatisticas(nome_arquivo):
    # Leia o arquivo e conte:
    # - Total de linhas
    # - Total de palavras
    # - Total de caracteres (sem espacos)
    pass

# Crie o arquivo e chame a funcao
`,
      solution: `# Criando o arquivo de texto
with open("texto.txt", "w") as arquivo:
    arquivo.write("Python e uma linguagem incrivel.\\n")
    arquivo.write("Com ela podemos criar programas poderosos.\\n")
    arquivo.write("Aprender Python abre muitas portas no mercado.\\n")
    arquivo.write("Pratique todos os dias para evoluir!\\n")

def contar_estatisticas(nome_arquivo):
    try:
        with open(nome_arquivo, "r") as arquivo:
            linhas = arquivo.readlines()

        total_linhas = len(linhas)
        total_palavras = 0
        total_caracteres = 0

        for linha in linhas:
            palavras = linha.split()
            total_palavras += len(palavras)
            total_caracteres += len(linha.replace(" ", "").strip())

        print(f"Estatisticas do arquivo '{nome_arquivo}':")
        print(f"  Linhas: {total_linhas}")
        print(f"  Palavras: {total_palavras}")
        print(f"  Caracteres (sem espacos): {total_caracteres}")
    except FileNotFoundError:
        print(f"Arquivo '{nome_arquivo}' nao encontrado!")

contar_estatisticas("texto.txt")`,
      hints: [
        'Use readlines() para obter uma lista de linhas e len() para contar',
        'Use split() em cada linha para obter as palavras e contar com len()',
        'Para caracteres sem espaco, use replace(" ", "") antes de contar',
      ],
    },
    {
      id: 'file-c3',
      title: 'Leitor de CSV de Produtos',
      description: 'Crie um arquivo CSV com dados de produtos (nome, categoria, preco, quantidade). Depois, leia o CSV e: exiba todos os produtos formatados, calcule o valor total do estoque (preco * quantidade de cada produto), e encontre o produto mais caro.',
      language: 'python',
      starterCode: `# Crie um arquivo CSV com pelo menos 5 produtos
# Colunas: Nome, Categoria, Preco, Quantidade

# Depois leia o CSV e:
# 1. Exiba os produtos formatados
# 2. Calcule o valor total do estoque
# 3. Encontre o produto mais caro
`,
      solution: `# Criando o arquivo CSV
with open("produtos.csv", "w") as arquivo:
    arquivo.write("Nome,Categoria,Preco,Quantidade\\n")
    arquivo.write("Notebook,Eletronicos,3500.00,10\\n")
    arquivo.write("Mouse,Eletronicos,89.90,50\\n")
    arquivo.write("Cadeira,Moveis,899.00,15\\n")
    arquivo.write("Mesa,Moveis,1200.00,8\\n")
    arquivo.write("Fone,Eletronicos,259.90,30\\n")

# Lendo e processando o CSV
print("=== Catalogo de Produtos ===\\n")
valor_total_estoque = 0
produto_mais_caro = ""
maior_preco = 0

with open("produtos.csv", "r") as arquivo:
    cabecalho = arquivo.readline()  # Pula o cabecalho

    for linha in arquivo:
        dados = linha.strip().split(",")
        nome = dados[0]
        categoria = dados[1]
        preco = float(dados[2])
        quantidade = int(dados[3])
        valor_estoque = preco * quantidade

        print(f"{nome} ({categoria}) - R$ {preco:.2f} x {quantidade} = R$ {valor_estoque:.2f}")

        valor_total_estoque += valor_estoque
        if preco > maior_preco:
            maior_preco = preco
            produto_mais_caro = nome

print(f"\\nValor total do estoque: R$ {valor_total_estoque:.2f}")
print(f"Produto mais caro: {produto_mais_caro} (R$ {maior_preco:.2f})")`,
      hints: [
        'Use readline() primeiro para pular o cabecalho do CSV',
        'Use split(",") para separar os valores de cada linha',
        'Converta preco para float e quantidade para int antes de calcular',
      ],
    },
  ],
};
