import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'domain-driven-design',
  moduleId: 'arquitetura-software',
  title: 'Domain-Driven Design: modelando o negocio no codigo',
  description: 'Aprenda a criar sistemas cujo codigo fala a linguagem do negocio, usando linguagem ubiqua, entidades, objetos de valor e agregados para modelar dominios complexos.',
  order: 9,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: '## O problema: codigo que nao fala a linguagem do negocio\n\nImagine conversar com o dono de uma padaria sobre o sistema dele. Ele fala em "pedidos", "clientes", "fichas de producao", "estoque de ingredientes". Quando voce abre o codigo, encontra `tabela_A`, `registros_B`, `calcular_X`, `processar_Y`. Ninguem consegue entender o que o codigo faz sem traduzir mentalmente.\n\n**Domain-Driven Design (DDD)** e uma abordagem para modelar software onde o codigo reflete diretamente o vocabulario e as regras do negocio. Foi sistematizado por Eric Evans no livro "Domain-Driven Design" (2003).\n\nO objetivo central: **o codigo deve ser lido por um desenvolvedor e por um especialista do negocio e ambos devem entender o mesmo sistema.**',
    },
    {
      type: 'text',
      content: '## Linguagem Ubiqua: um vocabulario compartilhado\n\n**Linguagem ubiqua** e o vocabulario comum entre desenvolvedores e especialistas do negocio. O mesmo termo usado nas reunioes, nos emails, nos documentos — e no codigo.\n\nSe o departamento de logistica fala em "romaneio de entrega", o codigo tem uma classe `RomaneioEntrega`. Se o financeiro fala em "nota de debito", existe `NotaDebito` no sistema. Sem traducoes, sem mapeamentos mentais.\n\n**Beneficios praticos:**\n- Reunioes com o cliente se tornam especificacoes diretas de comportamento\n- Bugs sao mais faceis de comunicar ("o Pedido nao esta calculando o Desconto corretamente")\n- Novos desenvolvedores entendem o sistema ao entender o negocio\n- O codigo documenta as regras de negocio, nao apenas a logica tecnica',
    },
    {
      type: 'text',
      content: '## Entidades vs Objetos de Valor\n\nDois blocos fundamentais do DDD:\n\n**Entidade:** tem **identidade unica** que persiste ao longo do tempo. Dois objetos com os mesmos atributos ainda sao entidades diferentes se tiverem IDs diferentes.\n- Exemplos: Cliente (ID 1 e ID 2 sao clientes diferentes, mesmo com o mesmo nome), Pedido, Produto\n- Identidade: geralmente um ID gerado pelo sistema ou pelo negocio\n\n**Objeto de Valor (Value Object):** definido pelos seus **valores**, nao por identidade. Dois objetos com os mesmos valores sao equivalentes.\n- Exemplos: Endereco (rua, cidade, CEP), Dinheiro (valor, moeda), CPF, intervalo de datas\n- Imutavel: se o endereco muda, voce cria um novo objeto, nao modifica o existente\n- Sem ID: nao tem sentido perguntar "qual o ID deste CPF?"\n\nA distincao importa porque define como comparar, armazenar e passar esses objetos pelo sistema.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'ddd_pedido_exemplo.py',
        code: `# DDD aplicado a um sistema de pedidos
# Linguagem ubiqua: Pedido, Item, Cliente, Dinheiro, Endereco

from dataclasses import dataclass
from typing import List
from datetime import datetime


# ============================================================
# OBJETOS DE VALOR (imutaveis, definidos por seus valores)
# ============================================================

@dataclass(frozen=True)  # frozen=True torna imutavel
class Dinheiro:
    """Objeto de Valor: valor + moeda. Dois Dinheiro iguais sao equivalentes."""
    valor: float
    moeda: str = "BRL"

    def __post_init__(self):
        if self.valor < 0:
            raise ValueError("Valor monetario nao pode ser negativo")

    def somar(self, outro: 'Dinheiro') -> 'Dinheiro':
        if self.moeda != outro.moeda:
            raise ValueError("Nao e possivel somar moedas diferentes")
        return Dinheiro(self.valor + outro.valor, self.moeda)

    def multiplicar(self, fator: float) -> 'Dinheiro':
        return Dinheiro(self.valor * fator, self.moeda)

    def __str__(self):
        return f"R\${self.valor:.2f}"


@dataclass(frozen=True)
class Endereco:
    """Objeto de Valor: rua, cidade, cep. Sem identidade propria."""
    rua: str
    cidade: str
    estado: str
    cep: str


@dataclass(frozen=True)
class CPF:
    """Objeto de Valor com validacao de formato."""
    numero: str

    def __post_init__(self):
        # Simplificado: apenas verifica formato
        apenas_numeros = self.numero.replace(".", "").replace("-", "")
        if len(apenas_numeros) != 11:
            raise ValueError(f"CPF invalido: {self.numero}")


# ============================================================
# ENTIDADES (tem identidade unica)
# ============================================================

class ItemPedido:
    """Entidade: cada item tem identidade dentro do pedido."""

    def __init__(self, produto_id: int, descricao: str, preco_unitario: Dinheiro, quantidade: int):
        self.produto_id = produto_id
        self.descricao = descricao
        self.preco_unitario = preco_unitario
        self.quantidade = quantidade

    def subtotal(self) -> Dinheiro:
        return self.preco_unitario.multiplicar(self.quantidade)

    def __repr__(self):
        return f"ItemPedido({self.descricao} x{self.quantidade} = {self.subtotal()})"


class Cliente:
    """Entidade: dois clientes com mesmo nome sao diferentes se tiverem IDs diferentes."""

    def __init__(self, id: int, nome: str, cpf: CPF, email: str, endereco: Endereco):
        self.id = id
        self.nome = nome
        self.cpf = cpf
        self.email = email
        self.endereco = endereco

    def __eq__(self, outro):
        # Entidades sao iguais se tiverem o mesmo ID, mesmo que outros campos difiram
        return isinstance(outro, Cliente) and self.id == outro.id

    def __repr__(self):
        return f"Cliente(id={self.id}, nome={self.nome})"


# ============================================================
# AGREGADO: Pedido (raiz do agregado)
# ============================================================

class Pedido:
    """
    Agregado: Pedido e a raiz. Itens so existem dentro de um Pedido.
    Toda modificacao nos itens passa pelo Pedido (fronteira de consistencia).
    """

    def __init__(self, id: int, cliente: Cliente):
        self.id = id
        self.cliente = cliente
        self._itens: List[ItemPedido] = []
        self._status = "aberto"
        self._criado_em = datetime.now()

    def adicionar_item(self, produto_id: int, descricao: str, preco: Dinheiro, qtd: int):
        """Regra de negocio: nao adiciona itens a pedido fechado."""
        if self._status != "aberto":
            raise ValueError(f"Nao e possivel adicionar itens ao pedido {self.id}: status {self._status}")
        if qtd <= 0:
            raise ValueError("Quantidade deve ser maior que zero")
        self._itens.append(ItemPedido(produto_id, descricao, preco, qtd))

    def total(self) -> Dinheiro:
        """Calcula o total como soma dos subtotais de todos os itens."""
        if not self._itens:
            return Dinheiro(0.0)
        total = self._itens[0].subtotal()
        for item in self._itens[1:]:
            total = total.somar(item.subtotal())
        return total

    def fechar(self):
        """Regra de negocio: nao fecha pedido vazio."""
        if not self._itens:
            raise ValueError("Nao e possivel fechar um pedido sem itens")
        self._status = "fechado"

    def cancelar(self):
        if self._status == "fechado":
            raise ValueError("Pedido fechado nao pode ser cancelado")
        self._status = "cancelado"

    @property
    def status(self):
        return self._status

    @property
    def itens(self):
        return list(self._itens)  # copia imutavel: nao permite modificar por fora

    def __repr__(self):
        return f"Pedido(id={self.id}, status={self._status}, total={self.total()})"


# ============================================================
# USO: o codigo fala a linguagem do negocio
# ============================================================

endereco = Endereco("Rua das Flores, 100", "Sao Paulo", "SP", "01310-100")
cpf_ana = CPF("123.456.789-09")
ana = Cliente(1, "Ana Souza", cpf_ana, "ana@email.com", endereco)

pedido = Pedido(1001, ana)
pedido.adicionar_item(5, "Notebook Dell", Dinheiro(3500.00), 1)
pedido.adicionar_item(12, "Mouse sem fio", Dinheiro(80.00), 2)

print(f"Itens: {pedido.itens}")
print(f"Total do pedido: {pedido.total()}")

pedido.fechar()
print(f"Status apos fechar: {pedido.status}")

# Tentativa de adicionar item apos fechar — regra de negocio protegida
try:
    pedido.adicionar_item(3, "Teclado", Dinheiro(150.0), 1)
except ValueError as e:
    print(f"Erro esperado: {e}")`,
        description: 'DDD na pratica: Pedido, Cliente, Item e Dinheiro refletem o vocabulario do negocio. As regras de negocio estao no codigo, nao espalhadas.',
      },
    },
    {
      type: 'text',
      content: '## Agregados: fronteiras de consistencia\n\nUm **agregado** e um grupo de entidades e objetos de valor que devem ser tratados como uma unidade para fins de mudancas de dados.\n\nO agregado tem uma **raiz** (aggregate root): a entidade principal que controla o acesso aos demais objetos do grupo. Voce so pode modificar os objetos internos passando pela raiz.\n\n**Por que isso importa?**\nGarante que as regras de negocio do agregado sejam sempre respeitadas. No exemplo do Pedido: voce nao pode adicionar um Item diretamente sem passar pelo Pedido — porque e o Pedido que sabe se ainda esta aberto, se o limite de itens foi atingido, etc.\n\n**Regras de ouro para definir agregados:**\n- Mantenha-os pequenos: quanto maior o agregado, maior o risco de conflitos de concorrencia\n- Referencie outros agregados apenas por ID: Pedido guarda `cliente_id`, nao uma referencia ao objeto Cliente\n- Cada transacao de banco de dados modifica apenas um agregado',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'DDD e mais uma filosofia de design do que um conjunto rigido de regras. Voce nao precisa usar todos os conceitos em todo projeto. Comece com linguagem ubiqua e a distincao entre entidades e objetos de valor — ja vai mudar como voce pensa sobre o codigo.',
    },
  ],
  challenges: [
    {
      id: 'ddd-challenge-1',
      title: 'Modelar Dominio de Biblioteca com DDD',
      description: 'Modele um sistema de biblioteca usando principios DDD. Implemente: Membro (entidade), Livro (entidade), Emprestimo (agregado raiz com regras de negocio). Regras: um membro nao pode ter mais de 3 emprestimos ativos; um livro so pode ser emprestado se disponivel; devolver atualiza a disponibilidade do livro.',
      language: 'python',
      starterCode: `# Modele o dominio de uma biblioteca com DDD
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import List

# --- OBJETOS DE VALOR ---
@dataclass(frozen=True)
class ISBN:
    """Identificador unico de um livro. Ex: '978-0-13-468599-1'"""
    numero: str
    # TODO: adicione validacao basica (deve ter 10 ou 13 digitos numericos)


# --- ENTIDADES ---
class Livro:
    def __init__(self, id: int, titulo: str, autor: str, isbn: ISBN):
        self.id = id
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self._disponivel = True

    @property
    def disponivel(self):
        return self._disponivel

    def emprestar(self):
        # TODO: levante ValueError se nao estiver disponivel
        pass

    def devolver(self):
        # TODO: marque como disponivel
        pass


class Membro:
    def __init__(self, id: int, nome: str, email: str):
        self.id = id
        self.nome = nome
        self.email = email

    def __eq__(self, outro):
        return isinstance(outro, Membro) and self.id == outro.id


# --- AGREGADO: Emprestimo (raiz) ---
class Emprestimo:
    LIMITE_EMPRESTIMOS_ATIVOS = 3
    DIAS_PRAZO_PADRAO = 14

    def __init__(self, id: int, membro: Membro, livro: Livro,
                 emprestimos_ativos_do_membro: int):
        # TODO: valide que emprestimos_ativos_do_membro < LIMITE_EMPRESTIMOS_ATIVOS
        # TODO: chame livro.emprestar() e guarde a data de devolucao prevista
        pass

    def devolver(self):
        # TODO: chame livro.devolver() e registre a data de devolucao real
        pass

    @property
    def esta_em_atraso(self) -> bool:
        # TODO: retorne True se ainda nao devolvido e passou da data prevista
        pass


# Teste sua implementacao:
# isbn1 = ISBN("9780132350884")
# livro1 = Livro(1, "Clean Code", "Robert Martin", isbn1)
# ana = Membro(1, "Ana", "ana@biblioteca.com")
# emp = Emprestimo(1, ana, livro1, emprestimos_ativos_do_membro=0)
# print(f"Livro disponivel: {livro1.disponivel}")  # False
# emp.devolver()
# print(f"Livro disponivel: {livro1.disponivel}")  # True
`,
      solution: `from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import List, Optional


# --- OBJETOS DE VALOR ---
@dataclass(frozen=True)
class ISBN:
    numero: str

    def __post_init__(self):
        apenas_numeros = self.numero.replace("-", "").replace(" ", "")
        if len(apenas_numeros) not in (10, 13):
            raise ValueError(f"ISBN invalido: {self.numero}. Deve ter 10 ou 13 digitos.")


# --- ENTIDADES ---
class Livro:
    def __init__(self, id: int, titulo: str, autor: str, isbn: ISBN):
        self.id = id
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self._disponivel = True

    @property
    def disponivel(self):
        return self._disponivel

    def emprestar(self):
        if not self._disponivel:
            raise ValueError(f"Livro '{self.titulo}' nao esta disponivel para emprestimo")
        self._disponivel = False

    def devolver(self):
        self._disponivel = True

    def __eq__(self, outro):
        return isinstance(outro, Livro) and self.id == outro.id

    def __repr__(self):
        status = "disponivel" if self._disponivel else "emprestado"
        return f"Livro('{self.titulo}' por {self.autor}, {status})"


class Membro:
    def __init__(self, id: int, nome: str, email: str):
        self.id = id
        self.nome = nome
        self.email = email

    def __eq__(self, outro):
        return isinstance(outro, Membro) and self.id == outro.id

    def __repr__(self):
        return f"Membro(id={self.id}, nome={self.nome})"


# --- AGREGADO: Emprestimo (raiz do agregado) ---
class Emprestimo:
    LIMITE_EMPRESTIMOS_ATIVOS = 3
    DIAS_PRAZO_PADRAO = 14

    def __init__(self, id: int, membro: Membro, livro: Livro,
                 emprestimos_ativos_do_membro: int):
        if emprestimos_ativos_do_membro >= self.LIMITE_EMPRESTIMOS_ATIVOS:
            raise ValueError(
                f"Membro '{membro.nome}' ja tem {self.LIMITE_EMPRESTIMOS_ATIVOS} "
                f"emprestimos ativos. Limite atingido."
            )
        # Regra delegada ao Livro: o Livro sabe se pode ser emprestado
        livro.emprestar()

        self.id = id
        self.membro = membro
        self.livro = livro
        self._data_emprestimo = datetime.now()
        self._data_devolucao_prevista = self._data_emprestimo + timedelta(days=self.DIAS_PRAZO_PADRAO)
        self._data_devolucao_real: Optional[datetime] = None

    def devolver(self):
        if self._data_devolucao_real is not None:
            raise ValueError(f"Emprestimo {self.id} ja foi devolvido")
        self.livro.devolver()
        self._data_devolucao_real = datetime.now()

    @property
    def esta_ativo(self) -> bool:
        return self._data_devolucao_real is None

    @property
    def esta_em_atraso(self) -> bool:
        if not self.esta_ativo:
            return False
        return datetime.now() > self._data_devolucao_prevista

    @property
    def data_prevista(self):
        return self._data_devolucao_prevista

    def __repr__(self):
        status = "ativo" if self.esta_ativo else "devolvido"
        return (f"Emprestimo(id={self.id}, livro='{self.livro.titulo}', "
                f"membro='{self.membro.nome}', status={status})")


# --- SERVICO DE DOMINIO: Biblioteca ---
class Biblioteca:
    """Servico que orquestra os agregados."""

    def __init__(self):
        self._emprestimos: List[Emprestimo] = []
        self._contador = 0

    def _contar_ativos(self, membro: Membro) -> int:
        return sum(1 for e in self._emprestimos if e.membro == membro and e.esta_ativo)

    def realizar_emprestimo(self, membro: Membro, livro: Livro) -> Emprestimo:
        ativos = self._contar_ativos(membro)
        self._contador += 1
        emprestimo = Emprestimo(self._contador, membro, livro, ativos)
        self._emprestimos.append(emprestimo)
        return emprestimo

    def realizar_devolucao(self, emprestimo_id: int):
        for emp in self._emprestimos:
            if emp.id == emprestimo_id:
                emp.devolver()
                return emp
        raise ValueError(f"Emprestimo {emprestimo_id} nao encontrado")

    def listar_emprestimos_ativos(self, membro: Membro) -> List[Emprestimo]:
        return [e for e in self._emprestimos if e.membro == membro and e.esta_ativo]


# --- DEMONSTRACAO ---
isbn1 = ISBN("9780132350884")
isbn2 = ISBN("9780201633610")
isbn3 = ISBN("9780596517748")

livro1 = Livro(1, "Clean Code", "Robert Martin", isbn1)
livro2 = Livro(2, "The Pragmatic Programmer", "Hunt & Thomas", isbn2)
livro3 = Livro(3, "Learning Python", "Mark Lutz", isbn3)

ana = Membro(1, "Ana", "ana@biblioteca.com")
biblioteca = Biblioteca()

print("=== Realizando emprestimos ===")
emp1 = biblioteca.realizar_emprestimo(ana, livro1)
emp2 = biblioteca.realizar_emprestimo(ana, livro2)
print(f"{emp1}")
print(f"{emp2}")
print(f"Livro1 disponivel: {livro1.disponivel}")  # False

print("\\n=== Devolvendo livro ===")
biblioteca.realizar_devolucao(emp1.id)
print(f"Livro1 disponivel apos devolucao: {livro1.disponivel}")  # True

print("\\n=== Emprestimos ativos de Ana ===")
for e in biblioteca.listar_emprestimos_ativos(ana):
    print(f"  {e}")
`,
      hints: [
        'Comece pelo Livro: ele deve saber se esta disponivel e gerenciar seu proprio estado. O metodo emprestar() levanta ValueError se ja estiver emprestado.',
        'O Emprestimo (agregado raiz) recebe o numero de emprestimos ativos do membro como parametro — ele nao busca essa informacao sozinho. Isso mantem o agregado simples.',
        'A classe Biblioteca e um servico de dominio que orquestra: conta os emprestimos ativos do membro antes de criar o Emprestimo e passa esse numero para o construtor.',
      ],
    },
  ],
};
