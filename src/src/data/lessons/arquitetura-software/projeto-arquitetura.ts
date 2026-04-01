import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-arquitetura',
  moduleId: 'arquitetura-software',
  title: 'Projeto: Construindo um Sistema Bem Arquitetado',
  description: 'Aplique SOLID, Clean Code e MVC para construir do zero um sistema de biblioteca com livros, usuarios e emprestimos — tomando decisoes arquiteturais conscientes a cada passo.',
  order: 5,
  estimatedMinutes: 45,
  sections: [
    {
      type: 'text',
      content: '## O Projeto: Sistema de Biblioteca\n\nVamos construir um sistema de gerenciamento de biblioteca que controla **livros**, **usuarios** e **emprestimos**. Este e um exemplo classico que aparece em cursos de arquitetura porque tem complexidade suficiente para exigir boas decisoes estruturais, mas e simples o bastante para entender completamente.\n\n**Requisitos do sistema:**\n- Cadastrar livros com titulo, autor, ISBN e quantidade de exemplares\n- Cadastrar usuarios com nome, email e numero de matricula\n- Realizar emprestimos de livros para usuarios\n- Devolver livros e registrar a data de devolucao\n- Listar emprestimos ativos de um usuario\n- Verificar disponibilidade de um livro\n\n**Decisoes arquiteturais que vamos tomar:**\n1. Separar modelos de dados (Model) da logica de persistencia (Repositorio)\n2. Criar servicos para regras de negocio complexas\n3. Usar um controller para coordenar o fluxo\n4. Aplicar SRP: cada classe tem uma responsabilidade\n5. Aplicar DIP: servicos recebem repositorios como dependencia',
    },
    {
      type: 'text',
      content: '## Decisao 1: Os Modelos de Dados\n\nO primeiro passo e definir as entidades do sistema. Seguindo o SRP, os modelos devem conter apenas os dados e as **regras que pertencem diretamente a eles** — sem logica de banco de dados, sem logica de apresentacao.\n\n**Por que separar modelo de repositorio?**\nSe misturarmos, a classe `Livro` saberia como salvar a si mesma no banco. Mas e se mudarmos de banco? Teriamos que alterar a classe `Livro`. Com a separacao, a classe `Livro` nunca muda por causa de mudancas no banco de dados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'modelos.py',
        code: `# MODELOS: dados e regras que pertencem a cada entidade
from datetime import datetime, timedelta

class Livro:
    """Representa um livro no acervo da biblioteca."""

    def __init__(self, isbn, titulo, autor, total_exemplares=1):
        self.isbn = isbn
        self.titulo = titulo
        self.autor = autor
        self.total_exemplares = total_exemplares
        self.exemplares_disponiveis = total_exemplares

    @property
    def esta_disponivel(self):
        # Regra que pertence ao Livro: saber se tem exemplares
        return self.exemplares_disponiveis > 0

    def registrar_emprestimo(self):
        # Regra do Livro: nao pode emprestar mais do que tem
        if not self.esta_disponivel:
            raise ValueError(f"Livro '{self.titulo}' sem exemplares disponiveis")
        self.exemplares_disponiveis -= 1

    def registrar_devolucao(self):
        if self.exemplares_disponiveis >= self.total_exemplares:
            raise ValueError("Todos os exemplares ja estao disponiveis")
        self.exemplares_disponiveis += 1

    def __str__(self):
        return f"[{self.isbn}] {self.titulo} - {self.autor} ({self.exemplares_disponiveis}/{self.total_exemplares} disp.)"


class Usuario:
    """Representa um usuario cadastrado na biblioteca."""

    LIMITE_EMPRESTIMOS = 3  # Regra de negocio: max 3 livros por vez

    def __init__(self, matricula, nome, email):
        self.matricula = matricula
        self.nome = nome
        self.email = email
        self.emprestimos_ativos = 0

    @property
    def pode_pegar_emprestado(self):
        return self.emprestimos_ativos < self.LIMITE_EMPRESTIMOS

    def registrar_emprestimo(self):
        if not self.pode_pegar_emprestado:
            raise ValueError(f"{self.nome} ja tem {self.LIMITE_EMPRESTIMOS} emprestimos ativos")
        self.emprestimos_ativos += 1

    def registrar_devolucao(self):
        if self.emprestimos_ativos <= 0:
            raise ValueError(f"{self.nome} nao tem emprestimos ativos")
        self.emprestimos_ativos -= 1

    def __str__(self):
        return f"[{self.matricula}] {self.nome} ({self.emprestimos_ativos} emprestimos ativos)"


class Emprestimo:
    """Representa um emprestimo especifico de um livro para um usuario."""

    PRAZO_DEVOLUCAO_DIAS = 14  # Regra: 14 dias para devolver

    def __init__(self, id_emprestimo, livro: Livro, usuario: Usuario):
        self.id = id_emprestimo
        self.livro = livro
        self.usuario = usuario
        self.data_emprestimo = datetime.now()
        self.data_prevista_devolucao = self.data_emprestimo + timedelta(days=self.PRAZO_DEVOLUCAO_DIAS)
        self.data_devolucao_real = None

    @property
    def esta_ativo(self):
        return self.data_devolucao_real is None

    @property
    def esta_atrasado(self):
        if not self.esta_ativo:
            return False
        return datetime.now() > self.data_prevista_devolucao

    def registrar_devolucao(self):
        if not self.esta_ativo:
            raise ValueError("Este emprestimo ja foi encerrado")
        self.data_devolucao_real = datetime.now()

    def __str__(self):
        status = "ATIVO" if self.esta_ativo else "DEVOLVIDO"
        atraso = " (ATRASADO!)" if self.esta_atrasado else ""
        return f"Emprestimo #{self.id}: {self.livro.titulo} -> {self.usuario.nome} [{status}{atraso}]"`,
        description: 'Modelos com regras proprias: Livro controla exemplares, Usuario controla limite, Emprestimo controla prazo.',
      },
    },
    {
      type: 'text',
      content: '## Decisao 2: Os Repositorios\n\nRepositorios sao responsaveis por **persistir e recuperar dados**. Eles encapsulam o "onde" e o "como" os dados sao guardados. Em producao, falariam com um banco de dados real. Para este exemplo, usaremos dicionarios em memoria.\n\n**Por que essa separacao importa?** Amanha, se precisarmos migrar de dicionarios em memoria para SQLite, depois para PostgreSQL, depois para uma API REST — a logica de negocio nao muda. So os repositorios mudam. Isso e o Principio da Inversao de Dependencia (DIP) em acao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'repositorios.py',
        code: `# REPOSITORIOS: responsabilidade de persistir e recuperar dados

class LivroRepositorio:
    """Gerencia o armazenamento e busca de livros."""

    def __init__(self):
        self._livros = {}  # Em producao: seria um banco de dados

    def adicionar(self, livro: Livro):
        if livro.isbn in self._livros:
            raise ValueError(f"Livro com ISBN {livro.isbn} ja cadastrado")
        self._livros[livro.isbn] = livro

    def buscar_por_isbn(self, isbn) -> Livro:
        return self._livros.get(isbn)

    def buscar_por_titulo(self, titulo_parcial):
        titulo_lower = titulo_parcial.lower()
        return [l for l in self._livros.values()
                if titulo_lower in l.titulo.lower()]

    def listar_todos(self):
        return list(self._livros.values())

    def listar_disponiveis(self):
        return [l for l in self._livros.values() if l.esta_disponivel]


class UsuarioRepositorio:
    """Gerencia o armazenamento e busca de usuarios."""

    def __init__(self):
        self._usuarios = {}
        self._por_email = {}

    def adicionar(self, usuario: Usuario):
        if usuario.matricula in self._usuarios:
            raise ValueError(f"Matricula {usuario.matricula} ja cadastrada")
        if usuario.email in self._por_email:
            raise ValueError(f"Email {usuario.email} ja cadastrado")
        self._usuarios[usuario.matricula] = usuario
        self._por_email[usuario.email] = usuario

    def buscar_por_matricula(self, matricula) -> Usuario:
        return self._usuarios.get(matricula)

    def buscar_por_email(self, email) -> Usuario:
        return self._por_email.get(email)

    def listar_todos(self):
        return list(self._usuarios.values())


class EmprestimoRepositorio:
    """Gerencia o armazenamento e busca de emprestimos."""

    def __init__(self):
        self._emprestimos = {}
        self._proximo_id = 1

    def adicionar(self, emprestimo: Emprestimo):
        self._emprestimos[emprestimo.id] = emprestimo

    def criar_proximo_id(self):
        id_atual = self._proximo_id
        self._proximo_id += 1
        return id_atual

    def buscar_por_id(self, id_emprestimo) -> Emprestimo:
        return self._emprestimos.get(id_emprestimo)

    def buscar_ativos_por_usuario(self, matricula_usuario):
        return [e for e in self._emprestimos.values()
                if e.usuario.matricula == matricula_usuario and e.esta_ativo]

    def buscar_ativos_por_livro(self, isbn_livro):
        return [e for e in self._emprestimos.values()
                if e.livro.isbn == isbn_livro and e.esta_ativo]

    def listar_todos_ativos(self):
        return [e for e in self._emprestimos.values() if e.esta_ativo]`,
        description: 'Repositorios encapsulam a persistencia. Trocar de dicionario para banco de dados so afeta estas classes.',
      },
    },
    {
      type: 'text',
      content: '## Decisao 3: O Servico e o Controller\n\nO **Servico** contem as regras de negocio que envolvem **multiplas entidades** — coisas que nao pertencem exclusivamente ao Livro nem ao Usuario, mas ao processo de emprestimo em si.\n\nO **Controller** (ou uma funcao principal) faz a **orquestracao**: recebe comandos, chama o servico, e exibe resultados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'servico_e_controller.py',
        code: `# SERVICO: regras de negocio que envolvem multiplas entidades

class ServicoDeBiblioteca:
    """Coordena as operacoes de emprestimo respeitando todas as regras."""

    def __init__(self,
                 livro_repo: LivroRepositorio,
                 usuario_repo: UsuarioRepositorio,
                 emprestimo_repo: EmprestimoRepositorio):
        # DIP: recebe as dependencias de fora (injecao de dependencia)
        self.livros = livro_repo
        self.usuarios = usuario_repo
        self.emprestimos = emprestimo_repo

    def realizar_emprestimo(self, matricula_usuario, isbn_livro):
        """Realiza um emprestimo verificando todas as regras de negocio."""
        usuario = self.usuarios.buscar_por_matricula(matricula_usuario)
        if not usuario:
            raise ValueError(f"Usuario com matricula {matricula_usuario} nao encontrado")

        livro = self.livros.buscar_por_isbn(isbn_livro)
        if not livro:
            raise ValueError(f"Livro com ISBN {isbn_livro} nao encontrado")

        # As regras de negocio ficam nos modelos (SRP)
        # O servico apenas orquestra e trata os erros
        usuario.registrar_emprestimo()  # levanta erro se limite atingido
        livro.registrar_emprestimo()    # levanta erro se sem exemplares

        id_novo = self.emprestimos.criar_proximo_id()
        emprestimo = Emprestimo(id_novo, livro, usuario)
        self.emprestimos.adicionar(emprestimo)
        return emprestimo

    def realizar_devolucao(self, id_emprestimo):
        """Registra a devolucao de um emprestimo."""
        emprestimo = self.emprestimos.buscar_por_id(id_emprestimo)
        if not emprestimo:
            raise ValueError(f"Emprestimo #{id_emprestimo} nao encontrado")

        emprestimo.registrar_devolucao()
        emprestimo.livro.registrar_devolucao()
        emprestimo.usuario.registrar_devolucao()
        return emprestimo

    def listar_emprestimos_do_usuario(self, matricula_usuario):
        usuario = self.usuarios.buscar_por_matricula(matricula_usuario)
        if not usuario:
            raise ValueError(f"Usuario {matricula_usuario} nao encontrado")
        return self.emprestimos.buscar_ativos_por_usuario(matricula_usuario)


# CONTROLLER / DEMONSTRACAO: monta o sistema e mostra tudo funcionando

def demonstrar_sistema():
    # Montagem do sistema (composicao das dependencias)
    livro_repo = LivroRepositorio()
    usuario_repo = UsuarioRepositorio()
    emprestimo_repo = EmprestimoRepositorio()
    servico = ServicoDeBiblioteca(livro_repo, usuario_repo, emprestimo_repo)

    # Cadastrar livros
    livro_repo.adicionar(Livro("978-0-13-235088-4", "Clean Code", "Robert C. Martin", 2))
    livro_repo.adicionar(Livro("978-0-13-110362-7", "The C Programming Language", "Kernighan & Ritchie", 1))
    livro_repo.adicionar(Livro("978-0-20-161622-4", "The Pragmatic Programmer", "Hunt & Thomas", 3))

    # Cadastrar usuarios
    usuario_repo.adicionar(Usuario("2024001", "Ana Silva", "ana@universidade.edu"))
    usuario_repo.adicionar(Usuario("2024002", "Bruno Costa", "bruno@universidade.edu"))

    print("=== ACERVO DISPONIVEL ===")
    for livro in livro_repo.listar_todos():
        print(f"  {livro}")

    print("\\n=== REALIZANDO EMPRESTIMOS ===")
    emp1 = servico.realizar_emprestimo("2024001", "978-0-13-235088-4")
    print(f"  OK: {emp1}")

    emp2 = servico.realizar_emprestimo("2024001", "978-0-20-161622-4")
    print(f"  OK: {emp2}")

    emp3 = servico.realizar_emprestimo("2024002", "978-0-13-235088-4")
    print(f"  OK: {emp3}")

    print("\\n=== TENTATIVA COM ERRO ===")
    try:
        # Livro com 1 exemplar ja emprestado
        servico.realizar_emprestimo("2024002", "978-0-13-110362-7")
        livro_repo.adicionar(Livro("978-0-13-110362-7", "The C Programming Language", "", 1))
        emp_extra = servico.realizar_emprestimo("2024002", "978-0-13-110362-7")
    except ValueError as e:
        print(f"  Erro esperado: {e}")

    print("\\n=== EMPRESTIMOS DA ANA ===")
    for emp in servico.listar_emprestimos_do_usuario("2024001"):
        print(f"  {emp}")

    print("\\n=== REALIZANDO DEVOLUCAO ===")
    devolvido = servico.realizar_devolucao(emp1.id)
    print(f"  Devolvido: {devolvido}")

    print("\\n=== ACERVO APOS DEVOLUCAO ===")
    for livro in livro_repo.listar_todos():
        print(f"  {livro}")

demonstrar_sistema()`,
        description: 'Servico com DIP: recebe repositorios no construtor. Controller monta tudo e demonstra o fluxo completo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Note como cada decisao arquitetural se justifica: Livro e Usuario tem suas proprias regras (SRP). O ServicoDeBiblioteca recebe repositorios no construtor, nao os cria (DIP). Os repositorios podem ser trocados por versoes com banco de dados real sem alterar o servico (OCP). Este e o resultado de aplicar SOLID conscientemente.',
    },
  ],
  challenges: [
    {
      id: 'projeto-challenge-1',
      title: 'Implementar os Modelos Book e User Limpos',
      description: 'Implemente do zero as classes Book e User para um sistema de biblioteca, aplicando Clean Code e SRP. Book deve ter: isbn, title, author, year, total_copies, available_copies, propriedade is_available, metodos checkout() e checkin() com validacoes. User deve ter: user_id, name, email, max_loans=5, active_loans=0, propriedade can_borrow, metodos borrow() e return_book() com validacoes. Escreva nomes descritivos em ingles simples.',
      language: 'python',
      starterCode: `# Implemente as classes Book e User com Clean Code e SRP

class Book:
    # Atributos: isbn, title, author, year, total_copies, available_copies
    # Propriedade: is_available (bool)
    # Metodos: checkout(), checkin()
    # Validacoes: checkout falha se nao ha copias; checkin falha se todas disponíveis
    pass

class User:
    # Atributos: user_id, name, email, max_loans=5, active_loans=0
    # Propriedade: can_borrow (bool)
    # Metodos: borrow(), return_book()
    # Validacoes: borrow falha se atingiu max_loans; return_book falha se nao tem emprestimos
    pass

# Ao final, este codigo deve funcionar:
# book = Book("978-123", "Clean Code", "Robert Martin", 2008, total_copies=2)
# user = User("U001", "Ana Silva", "ana@email.com")
# print(book.is_available)   # True
# print(user.can_borrow)     # True
# user.borrow()
# book.checkout()
# print(book)  # deve mostrar 1/2 copias
# print(user)  # deve mostrar 1 emprestimo ativo
# book.checkin()
# user.return_book()
`,
      solution: `class Book:
    def __init__(self, isbn, title, author, year, total_copies=1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.year = year
        self.total_copies = total_copies
        self.available_copies = total_copies

    @property
    def is_available(self):
        return self.available_copies > 0

    def checkout(self):
        """Registra a retirada de um exemplar do acervo."""
        if not self.is_available:
            raise ValueError(f"No available copies of '{self.title}'")
        self.available_copies -= 1

    def checkin(self):
        """Registra a devolucao de um exemplar ao acervo."""
        if self.available_copies >= self.total_copies:
            raise ValueError(f"All copies of '{self.title}' are already in the library")
        self.available_copies += 1

    def __str__(self):
        return (f"[{self.isbn}] {self.title} by {self.author} ({self.year}) "
                f"- {self.available_copies}/{self.total_copies} available")

    def __repr__(self):
        return f"Book(isbn={self.isbn!r}, title={self.title!r})"


class User:
    def __init__(self, user_id, name, email, max_loans=5):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.max_loans = max_loans
        self.active_loans = 0

    @property
    def can_borrow(self):
        return self.active_loans < self.max_loans

    def borrow(self):
        """Registra que o usuario pegou mais um livro emprestado."""
        if not self.can_borrow:
            raise ValueError(
                f"{self.name} has reached the loan limit ({self.max_loans} books)"
            )
        self.active_loans += 1

    def return_book(self):
        """Registra a devolucao de um livro pelo usuario."""
        if self.active_loans <= 0:
            raise ValueError(f"{self.name} has no active loans to return")
        self.active_loans -= 1

    def __str__(self):
        return (f"[{self.user_id}] {self.name} <{self.email}> "
                f"- {self.active_loans}/{self.max_loans} loans active")

    def __repr__(self):
        return f"User(user_id={self.user_id!r}, name={self.name!r})"


# Demonstracao
book = Book("978-123", "Clean Code", "Robert Martin", 2008, total_copies=2)
user = User("U001", "Ana Silva", "ana@email.com")

print(book)
print(user)
print(f"Book available: {book.is_available}")   # True
print(f"User can borrow: {user.can_borrow}")    # True

user.borrow()
book.checkout()

print("\\nAfter checkout:")
print(book)
print(user)

book.checkin()
user.return_book()

print("\\nAfter return:")
print(book)
print(user)

# Testando validacoes
book2 = Book("978-456", "Rare Book", "Author", 2020, total_copies=1)
book2.checkout()
try:
    book2.checkout()  # Deve lancar erro
except ValueError as e:
    print(f"\\nExpected error: {e}")
`,
      hints: [
        'A propriedade is_available deve retornar available_copies > 0. Use o decorator @property.',
        'O metodo checkout() deve verificar if not self.is_available antes de decrementar available_copies.',
        'A propriedade can_borrow deve ser active_loans < max_loans. Lembre de inicializar active_loans = 0 no __init__.',
      ],
    },
    {
      id: 'projeto-challenge-2',
      title: 'Implementar o Loan Controller com Separacao Adequada',
      description: 'Com os modelos Book e User do desafio anterior, implemente: (1) LoanRepository com dicionario interno, metodos add_loan(), get_by_id(), get_active_loans_for_user(), get_active_loans_for_book(), (2) class Loan com id, book, user, loan_date, due_date (14 dias), return_date, propriedades is_active e is_overdue, metodo complete_return(), (3) class LibraryService com __init__(book_repo, user_repo, loan_repo) e metodos lend_book(user_id, isbn) e return_book(loan_id).',
      language: 'python',
      starterCode: `from datetime import datetime, timedelta

# Use as classes Book e User do desafio anterior (assume que estao disponíveis)
# Implemente:

class Loan:
    LOAN_PERIOD_DAYS = 14
    # Atributos: id, book, user, loan_date, due_date, return_date
    # Propriedades: is_active, is_overdue
    # Metodo: complete_return()
    pass

class LoanRepository:
    # Metodos: add_loan(loan), get_by_id(loan_id), get_active_loans_for_user(user_id),
    #          get_active_loans_for_book(isbn), next_id (property ou metodo)
    pass

class BookRepository:
    def __init__(self):
        self._books = {}
    def add(self, book):
        self._books[book.isbn] = book
    def get_by_isbn(self, isbn):
        return self._books.get(isbn)

class UserRepository:
    def __init__(self):
        self._users = {}
    def add(self, user):
        self._users[user.user_id] = user
    def get_by_id(self, user_id):
        return self._users.get(user_id)

class LibraryService:
    # __init__ recebe book_repo, user_repo, loan_repo (DIP)
    # lend_book(user_id, isbn): valida, chama book.checkout() e user.borrow(), cria e salva Loan
    # return_book(loan_id): valida, chama loan.complete_return(), book.checkin(), user.return_book()
    pass

# Ao final, demonstre o sistema funcionando:
# book_repo, user_repo, loan_repo = BookRepository(), UserRepository(), LoanRepository()
# service = LibraryService(book_repo, user_repo, loan_repo)
# ...cadastre livros e usuarios, realize emprestimos e devolucoes
`,
      solution: `from datetime import datetime, timedelta

class Book:
    def __init__(self, isbn, title, author, year, total_copies=1):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.year = year
        self.total_copies = total_copies
        self.available_copies = total_copies

    @property
    def is_available(self):
        return self.available_copies > 0

    def checkout(self):
        if not self.is_available:
            raise ValueError(f"No available copies of '{self.title}'")
        self.available_copies -= 1

    def checkin(self):
        self.available_copies += 1

    def __str__(self):
        return f"[{self.isbn}] {self.title} ({self.available_copies}/{self.total_copies} avail)"

class User:
    def __init__(self, user_id, name, email, max_loans=5):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.max_loans = max_loans
        self.active_loans = 0

    @property
    def can_borrow(self):
        return self.active_loans < self.max_loans

    def borrow(self):
        if not self.can_borrow:
            raise ValueError(f"{self.name} has reached the loan limit")
        self.active_loans += 1

    def return_book(self):
        if self.active_loans <= 0:
            raise ValueError(f"{self.name} has no active loans")
        self.active_loans -= 1

    def __str__(self):
        return f"[{self.user_id}] {self.name} ({self.active_loans} active loans)"

class Loan:
    LOAN_PERIOD_DAYS = 14

    def __init__(self, loan_id, book: Book, user: User):
        self.id = loan_id
        self.book = book
        self.user = user
        self.loan_date = datetime.now()
        self.due_date = self.loan_date + timedelta(days=self.LOAN_PERIOD_DAYS)
        self.return_date = None

    @property
    def is_active(self):
        return self.return_date is None

    @property
    def is_overdue(self):
        return self.is_active and datetime.now() > self.due_date

    def complete_return(self):
        if not self.is_active:
            raise ValueError(f"Loan #{self.id} is already closed")
        self.return_date = datetime.now()

    def __str__(self):
        status = "ACTIVE" if self.is_active else "RETURNED"
        overdue_flag = " [OVERDUE]" if self.is_overdue else ""
        return f"Loan #{self.id}: {self.book.title} -> {self.user.name} [{status}{overdue_flag}]"

class LoanRepository:
    def __init__(self):
        self._loans = {}
        self._next_id = 1

    def next_id(self):
        current = self._next_id
        self._next_id += 1
        return current

    def add_loan(self, loan: Loan):
        self._loans[loan.id] = loan

    def get_by_id(self, loan_id) -> Loan:
        return self._loans.get(loan_id)

    def get_active_loans_for_user(self, user_id):
        return [l for l in self._loans.values()
                if l.user.user_id == user_id and l.is_active]

    def get_active_loans_for_book(self, isbn):
        return [l for l in self._loans.values()
                if l.book.isbn == isbn and l.is_active]

    def get_all_active(self):
        return [l for l in self._loans.values() if l.is_active]

class BookRepository:
    def __init__(self):
        self._books = {}
    def add(self, book):
        self._books[book.isbn] = book
    def get_by_isbn(self, isbn):
        return self._books.get(isbn)
    def list_all(self):
        return list(self._books.values())

class UserRepository:
    def __init__(self):
        self._users = {}
    def add(self, user):
        self._users[user.user_id] = user
    def get_by_id(self, user_id):
        return self._users.get(user_id)

class LibraryService:
    def __init__(self,
                 book_repo: BookRepository,
                 user_repo: UserRepository,
                 loan_repo: LoanRepository):
        self.books = book_repo
        self.users = user_repo
        self.loans = loan_repo

    def lend_book(self, user_id, isbn):
        user = self.users.get_by_id(user_id)
        if not user:
            raise ValueError(f"User '{user_id}' not found")
        book = self.books.get_by_isbn(isbn)
        if not book:
            raise ValueError(f"Book '{isbn}' not found")
        # Regras nos modelos; servico so orquestra
        user.borrow()
        book.checkout()
        loan = Loan(self.loans.next_id(), book, user)
        self.loans.add_loan(loan)
        return loan

    def return_book(self, loan_id):
        loan = self.loans.get_by_id(loan_id)
        if not loan:
            raise ValueError(f"Loan #{loan_id} not found")
        loan.complete_return()
        loan.book.checkin()
        loan.user.return_book()
        return loan

# Demonstracao completa
book_repo = BookRepository()
user_repo = UserRepository()
loan_repo = LoanRepository()
service = LibraryService(book_repo, user_repo, loan_repo)

book_repo.add(Book("978-001", "Clean Code", "Robert Martin", 2008, total_copies=2))
book_repo.add(Book("978-002", "Design Patterns", "Gang of Four", 1994, total_copies=1))
user_repo.add(User("U001", "Ana Silva", "ana@email.com"))
user_repo.add(User("U002", "Bruno Costa", "bruno@email.com"))

print("=== LENDING BOOKS ===")
loan1 = service.lend_book("U001", "978-001")
loan2 = service.lend_book("U002", "978-001")
loan3 = service.lend_book("U001", "978-002")
print(loan1)
print(loan2)
print(loan3)

print("\\n=== BOOK STATUS ===")
for book in book_repo.list_all():
    print(f"  {book}")

print("\\n=== RETURNING A BOOK ===")
returned = service.return_book(loan1.id)
print(f"  Returned: {returned}")
print(f"  Book status: {book_repo.get_by_isbn('978-001')}")

print("\\n=== ANA'S ACTIVE LOANS ===")
for loan in loan_repo.get_active_loans_for_user("U001"):
    print(f"  {loan}")
`,
      hints: [
        'Loan.__init__ deve calcular due_date = loan_date + timedelta(days=14). Initialize return_date = None.',
        'LibraryService.lend_book deve: (1) buscar user e book, (2) chamar user.borrow() e book.checkout(), (3) criar Loan e salvar no repositorio.',
        'LibraryService.return_book deve: (1) buscar o loan pelo id, (2) chamar loan.complete_return(), (3) chamar loan.book.checkin() e loan.user.return_book().',
      ],
    },
  ],
};
