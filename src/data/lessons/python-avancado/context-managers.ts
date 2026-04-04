import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'context-managers',
  moduleId: 'python-avancado',
  title: 'Context Managers',
  description: 'Aprenda a gerenciar recursos como arquivos, conexoes e locks de forma segura e elegante usando context managers e a instrucao with.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content: '## O Problema: Recursos que Precisam ser Liberados\n\nMuitos recursos precisam ser explicitamente liberados apos o uso: arquivos devem ser fechados, conexoes de banco encerradas, locks liberados. Se uma excecao ocorre antes da liberacao, o recurso fica preso — um leak.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'problema_sem_context.py',
        code: `# PROBLEMA: e se uma excecao ocorrer antes do close()?
arquivo = open('dados.txt', 'r')
# --- se qualquer coisa der errado aqui ---
conteudo = arquivo.read()
# --- o arquivo nunca e fechado! ---
arquivo.close()  # pode nao ser executado

# Solucao manual com try/finally (verbosa)
arquivo = open('dados.txt', 'r')
try:
    conteudo = arquivo.read()
    # processar conteudo...
finally:
    arquivo.close()  # SEMPRE executado, mesmo com excecao

# O mesmo problema ocorre com outros recursos:
# - conexoes de banco de dados
# - locks de threading
# - transacoes
# - conexoes de rede
# - arquivos temporarios`,
        description: 'try/finally garante limpeza, mas e verboso. Context managers automatizam isso.',
      },
    },
    {
      type: 'text',
      content: '## A instrucao with\n\nO `with` statement automatiza o padrao try/finally. Ele garante que a limpeza aconteca ao sair do bloco, seja por conclusao normal ou por excecao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'with_statement.py',
        code: `# Com context manager: limpo, seguro, idiomatico
with open('dados.txt', 'r', encoding='utf-8') as arquivo:
    conteudo = arquivo.read()
# arquivo.close() e chamado automaticamente aqui, sempre

# Multiplos context managers em uma linha (Python 3.1+)
with open('entrada.txt', 'r') as entrada, open('saida.txt', 'w') as saida:
    for linha in entrada:
        saida.write(linha.upper())
# ambos os arquivos sao fechados automaticamente

# Escrevendo e lendo um arquivo
with open('exemplo.txt', 'w', encoding='utf-8') as f:
    f.write("linha 1\\n")
    f.write("linha 2\\n")
    f.write("linha 3\\n")

with open('exemplo.txt', 'r', encoding='utf-8') as f:
    linhas = f.readlines()

print(f"Total de linhas: {len(linhas)}")  # 3

# Context managers com threading
import threading
lock = threading.Lock()

# Sem with: propenso a deadlock se excecao ocorrer
lock.acquire()
# codigo critico...
lock.release()  # pode nao ser executado!

# Com with: sempre libera o lock
with lock:
    # codigo critico...
    pass  # lock liberado automaticamente ao sair`,
        description: 'with garante execucao do cleanup mesmo com excecoes, eliminando try/finally verboso.',
      },
    },
    {
      type: 'text',
      content: '## Protocolo __enter__ e __exit__\n\nQualquer objeto que implemente `__enter__` e `__exit__` pode ser usado com `with`. O Python chama esses metodos automaticamente ao entrar e sair do bloco.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'protocolo_context.py',
        code: `class ConexaoBanco:
    def __init__(self, host, porta):
        self.host = host
        self.porta = porta
        self.conexao = None

    def __enter__(self):
        """Executado ao entrar no bloco with."""
        print(f"Conectando a {self.host}:{self.porta}...")
        self.conexao = f"conexao_simulada_{self.host}"
        print("Conexao estabelecida!")
        return self  # retorna o objeto para o 'as'

    def __exit__(self, tipo_exc, valor_exc, traceback):
        """Executado ao sair do bloco with.

        Parametros:
        - tipo_exc: tipo da excecao (None se nao houve)
        - valor_exc: instancia da excecao (None se nao houve)
        - traceback: objeto traceback (None se nao houve)

        Retorne True para suprimir a excecao.
        Retorne False (ou None) para propagar.
        """
        if tipo_exc:
            print(f"Erro durante operacao: {valor_exc}")
        print("Fechando conexao...")
        self.conexao = None
        return False  # nao suprime excecoes

    def executar(self, query):
        if not self.conexao:
            raise RuntimeError("Sem conexao ativa")
        print(f"Executando: {query}")
        return [{"id": 1, "nome": "Alice"}]

# Uso normal
with ConexaoBanco("localhost", 5432) as db:
    resultado = db.executar("SELECT * FROM usuarios")
    print(resultado)
# Conectando... Executando... Fechando conexao...

# Mesmo com excecao, __exit__ e chamado
try:
    with ConexaoBanco("localhost", 5432) as db:
        resultado = db.executar("SELECT * FROM dados")
        raise ValueError("Algo deu errado!")
except ValueError:
    print("Excecao capturada apos __exit__")`,
        description: '__enter__ recebe o objeto para o "as". __exit__ recebe info da excecao e decide se a suprime.',
      },
    },
    {
      type: 'text',
      content: '## contextlib.contextmanager\n\nPara context managers simples, o decorator `@contextmanager` da `contextlib` e muito mais conveniente que implementar `__enter__`/`__exit__`. Use `yield` para separar a parte de entrada da saida.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'contextlib_manager.py',
        code: `from contextlib import contextmanager
import time

# Tudo antes do yield = __enter__
# O yield fornece o valor para o 'as'
# Tudo depois do yield (no finally) = __exit__

@contextmanager
def medir_tempo(descricao):
    """Context manager para medir tempo de um bloco."""
    inicio = time.perf_counter()
    try:
        yield  # sem valor: 'with medir_tempo(...):' sem 'as'
    finally:
        fim = time.perf_counter()
        print(f"[TEMPO] {descricao}: {fim - inicio:.4f}s")

with medir_tempo("processamento pesado"):
    total = sum(i ** 2 for i in range(1_000_000))

@contextmanager
def diretorio_temporario():
    """Cria e depois remove um diretorio temporario."""
    import tempfile
    import shutil
    tmpdir = tempfile.mkdtemp()
    print(f"Diretorio criado: {tmpdir}")
    try:
        yield tmpdir  # fornece o caminho para o 'as'
    finally:
        shutil.rmtree(tmpdir)
        print(f"Diretorio removido: {tmpdir}")

with diretorio_temporario() as tmpdir:
    caminho = f"{tmpdir}/arquivo.txt"
    with open(caminho, 'w') as f:
        f.write("conteudo temporario")
    print(f"Arquivo criado em: {caminho}")
# diretorio e tudo dentro e removido automaticamente`,
        description: '@contextmanager transforma um generator em context manager. O yield divide entrada e saida.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Sempre coloque o codigo de limpeza no bloco finally apos o yield. Se voce nao usar try/finally, uma excecao no bloco with impedira a limpeza de ser executada.',
    },
    {
      type: 'text',
      content: '## Casos de Uso Praticos\n\nContext managers sao usados em muitos cenarios alem de arquivos: transacoes de banco, redirect de stdout, supressao de excecoes, profiling, e muito mais.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'context_managers_praticos.py',
        code: `from contextlib import contextmanager, suppress
import io
import sys

# 1. Suprimir excecoes especificas (contextlib.suppress)
with suppress(FileNotFoundError):
    open('arquivo_que_nao_existe.txt')
print("Continuou sem erro!")  # excecao foi suprimida

# 2. Redirecionar stdout
@contextmanager
def capturar_output():
    """Captura tudo que seria impresso no terminal."""
    buffer = io.StringIO()
    antigo = sys.stdout
    sys.stdout = buffer
    try:
        yield buffer
    finally:
        sys.stdout = antigo

with capturar_output() as output:
    print("Esta mensagem vai para o buffer")
    print("E esta tambem!")

conteudo = output.getvalue()
print(f"Capturado: {repr(conteudo)}")

# 3. Transacao simulada
@contextmanager
def transacao(banco):
    """Commit se tudo OK, rollback se excecao."""
    banco.begin()
    try:
        yield banco
        banco.commit()
        print("Transacao confirmada (commit)")
    except Exception as e:
        banco.rollback()
        print(f"Transacao revertida (rollback): {e}")
        raise

# 4. Configuracao temporaria
@contextmanager
def configuracao_temporaria(objeto, **kwargs):
    """Altera atributos e restaura ao sair."""
    originais = {k: getattr(objeto, k) for k in kwargs}
    for k, v in kwargs.items():
        setattr(objeto, k, v)
    try:
        yield objeto
    finally:
        for k, v in originais.items():
            setattr(objeto, k, v)`,
        description: 'Context managers encapsulam qualquer padrao setup/teardown, nao apenas abertura de arquivos.',
      },
    },
  ],
  challenges: [
    {
      id: 'pyav-ctx-c1',
      title: 'Context Manager de Transacao Simulada',
      description: 'Implemente uma classe "BancoSimulado" com metodos begin(), commit(), rollback() e inserir(tabela, dados). Depois implemente um context manager "transacao(banco)" usando @contextmanager que: inicia a transacao com begin(), faz commit() se o bloco executar sem erro, faz rollback() se uma excecao ocorrer (e relanca a excecao). Teste com um bloco bem-sucedido e um com erro.',
      language: 'python',
      starterCode: `from contextlib import contextmanager

class BancoSimulado:
    def __init__(self):
        self.tabelas = {}
        self._em_transacao = False
        self._pendentes = []

    def begin(self):
        self._em_transacao = True
        self._pendentes = []
        print("[DB] Transacao iniciada")

    def inserir(self, tabela, dados):
        if not self._em_transacao:
            raise RuntimeError("Sem transacao ativa")
        self._pendentes.append((tabela, dados))
        print(f"[DB] Pendente: INSERT INTO {tabela} {dados}")

    def commit(self):
        # Aplique os pendentes em self.tabelas e limpe
        pass

    def rollback(self):
        # Descarte os pendentes e encerre a transacao
        pass

@contextmanager
def transacao(banco):
    # Implemente o context manager aqui
    pass

banco = BancoSimulado()

# Teste 1: transacao bem-sucedida
print("=== Teste 1: Sucesso ===")
with transacao(banco) as db:
    db.inserir("usuarios", {"nome": "Alice"})
    db.inserir("usuarios", {"nome": "Bob"})
print("Tabelas:", banco.tabelas)

# Teste 2: transacao com erro
print("\\n=== Teste 2: Erro ===")
try:
    with transacao(banco) as db:
        db.inserir("pedidos", {"item": "livro"})
        raise ValueError("Estoque insuficiente!")
except ValueError:
    pass
print("Tabelas apos rollback:", banco.tabelas)
`,
      solution: `from contextlib import contextmanager

class BancoSimulado:
    def __init__(self):
        self.tabelas = {}
        self._em_transacao = False
        self._pendentes = []

    def begin(self):
        self._em_transacao = True
        self._pendentes = []
        print("[DB] Transacao iniciada")

    def inserir(self, tabela, dados):
        if not self._em_transacao:
            raise RuntimeError("Sem transacao ativa")
        self._pendentes.append((tabela, dados))
        print(f"[DB] Pendente: INSERT INTO {tabela} {dados}")

    def commit(self):
        for tabela, dados in self._pendentes:
            if tabela not in self.tabelas:
                self.tabelas[tabela] = []
            self.tabelas[tabela].append(dados)
        self._pendentes = []
        self._em_transacao = False
        print("[DB] Commit realizado")

    def rollback(self):
        self._pendentes = []
        self._em_transacao = False
        print("[DB] Rollback realizado")

@contextmanager
def transacao(banco):
    banco.begin()
    try:
        yield banco
        banco.commit()
    except Exception as e:
        banco.rollback()
        raise

banco = BancoSimulado()

print("=== Teste 1: Sucesso ===")
with transacao(banco) as db:
    db.inserir("usuarios", {"nome": "Alice"})
    db.inserir("usuarios", {"nome": "Bob"})
print("Tabelas:", banco.tabelas)

print("\\n=== Teste 2: Erro ===")
try:
    with transacao(banco) as db:
        db.inserir("pedidos", {"item": "livro"})
        raise ValueError("Estoque insuficiente!")
except ValueError:
    pass
print("Tabelas apos rollback:", banco.tabelas)`,
      hints: [
        'Em commit(), itere self._pendentes e adicione cada item a self.tabelas',
        'Em rollback(), apenas limpe self._pendentes e defina _em_transacao como False',
        'No context manager: begin() antes do yield, commit() apos o yield, rollback() no except',
        'Use try/except/raise para propagar a excecao apos o rollback',
      ],
    },
  ],
};
