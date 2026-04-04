import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'mvc-e-camadas',
  moduleId: 'arquitetura-software',
  title: 'Arquitetura em Camadas e MVC',
  description: 'Entenda como separar seu sistema em camadas independentes usando o padrao MVC (Model-View-Controller), o padrao de arquitetura mais usado em frameworks web modernos.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Por que Separar em Camadas?\n\nImagine um restaurante. O **cozinheiro** prepara a comida, o **garcom** serve a mesa, e a **apresentacao do prato** e responsabilidade da brigada de cozinha. Cada um faz sua parte sem precisar saber os detalhes do outro. O garcom nao precisa saber como cozinhar; o cozinheiro nao precisa saber o nome dos clientes.\n\nSoftware bem arquitetado funciona da mesma forma: cada **camada** tem uma responsabilidade clara e se comunica com as outras por interfaces bem definidas.\n\n**Beneficios da arquitetura em camadas:**\n- **Separacao de preocupacoes**: cada camada faz uma coisa bem\n- **Manutenibilidade**: mudar a aparencia nao afeta a logica de negocio\n- **Testabilidade**: voce testa cada camada isoladamente\n- **Reutilizacao**: a mesma logica de negocio pode servir a uma interface web E a uma API mobile\n- **Trabalho em equipe**: diferentes desenvolvedores podem trabalhar em camadas diferentes simultaneamente',
    },
    {
      type: 'text',
      content: '## O Padrao MVC\n\nO **MVC (Model-View-Controller)** e o padrao de arquitetura em camadas mais popular no desenvolvimento web. Ele divide a aplicacao em tres partes com responsabilidades bem definidas:\n\n**Model (Modelo)** — representa os **dados e as regras de negocio**. O Model sabe o que e um Usuario, o que e um Produto, como calcular um desconto, quais validacoes os dados devem passar. Ele nao sabe nada sobre como os dados serao exibidos ou de onde vieram.\n\n**View (Visao)** — responsavel pela **apresentacao** para o usuario. Exibe os dados que recebeu, sem processar nada. Na web, geralmente sao templates HTML. Em uma API, pode ser a serializacao JSON. A View nao tem logica de negocio.\n\n**Controller (Controlador)** — e o **intermediario** que recebe as requisicoes do usuario, consulta o Model para obter ou modificar dados, e decide qual View usar para responder. E o "garcom" do restaurante.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Frameworks web famosos que usam MVC ou variacoes dele: Django (Python), Ruby on Rails (Ruby), Laravel (PHP), Spring MVC (Java), ASP.NET MVC (C#). Aprender MVC e aprender a linguagem que todos esses frameworks falam.',
    },
    {
      type: 'text',
      content: '## A Analogia do Restaurante\n\nVamos expandir a analogia para entender o fluxo completo:\n\n1. O **cliente** (usuario) faz um pedido ao garcom\n2. O **garcom** (Controller) recebe o pedido, anota e leva para a cozinha\n3. A **cozinha** (Model) prepara o prato seguindo a receita, gerencia os ingredientes, aplica as regras culinarias\n4. O **garcom** (Controller) pega o prato pronto e leva para o cliente\n5. A **apresentacao do prato** (View) e como o prato aparece na mesa — a mesma comida pode ser apresentada de formas diferentes\n\nO cliente nunca vai diretamente a cozinha. A cozinha nunca vai diretamente a mesa. Tudo passa pelo garcom, que coordena o fluxo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'mvc_simples.py',
        code: `# ARQUITETURA MVC: sistema simples de gerenciamento de tarefas

# ============================================================
# MODEL: dados e regras de negocio
# ============================================================
class Tarefa:
    def __init__(self, id_tarefa, titulo, descricao=""):
        self.id = id_tarefa
        self.titulo = titulo
        self.descricao = descricao
        self.concluida = False

    def concluir(self):
        self.concluida = True

    def __repr__(self):
        status = "V" if self.concluida else " "
        return f"[{status}] #{self.id} - {self.titulo}"


class TarefaRepositorio:
    """Model de acesso a dados: responsavel por persistir e buscar tarefas."""
    def __init__(self):
        self._tarefas = {}
        self._proximo_id = 1

    def criar(self, titulo, descricao=""):
        tarefa = Tarefa(self._proximo_id, titulo, descricao)
        self._tarefas[self._proximo_id] = tarefa
        self._proximo_id += 1
        return tarefa

    def buscar_por_id(self, id_tarefa):
        return self._tarefas.get(id_tarefa)

    def listar_todas(self):
        return list(self._tarefas.values())

    def listar_pendentes(self):
        return [t for t in self._tarefas.values() if not t.concluida]

    def listar_concluidas(self):
        return [t for t in self._tarefas.values() if t.concluida]


# ============================================================
# VIEW: exibicao (sem logica de negocio, so formatacao)
# ============================================================
class TarefaView:
    """View: responsavel apenas por como os dados sao apresentados ao usuario."""

    def exibir_lista(self, tarefas, titulo="Tarefas"):
        print(f"\\n=== {titulo} ===")
        if not tarefas:
            print("  (nenhuma tarefa)")
        for tarefa in tarefas:
            print(f"  {tarefa}")
        print(f"  Total: {len(tarefas)} tarefa(s)")

    def exibir_tarefa(self, tarefa):
        if tarefa is None:
            print("Tarefa nao encontrada.")
            return
        print(f"\\n--- Detalhes da Tarefa ---")
        print(f"ID: {tarefa.id}")
        print(f"Titulo: {tarefa.titulo}")
        print(f"Descricao: {tarefa.descricao or '(sem descricao)'}")
        print(f"Status: {'Concluida' if tarefa.concluida else 'Pendente'}")

    def exibir_mensagem(self, mensagem):
        print(f">> {mensagem}")

    def exibir_erro(self, erro):
        print(f"!! ERRO: {erro}")


# ============================================================
# CONTROLLER: intermediario entre Model e View
# ============================================================
class TarefaController:
    """Controller: recebe comandos do usuario, aciona Model e escolhe View."""

    def __init__(self, repositorio: TarefaRepositorio, view: TarefaView):
        self.repositorio = repositorio
        self.view = view

    def criar_tarefa(self, titulo, descricao=""):
        if not titulo.strip():
            self.view.exibir_erro("O titulo nao pode estar vazio.")
            return
        tarefa = self.repositorio.criar(titulo, descricao)
        self.view.exibir_mensagem(f"Tarefa criada: '{tarefa.titulo}' (id={tarefa.id})")

    def concluir_tarefa(self, id_tarefa):
        tarefa = self.repositorio.buscar_por_id(id_tarefa)
        if tarefa is None:
            self.view.exibir_erro(f"Tarefa #{id_tarefa} nao encontrada.")
            return
        if tarefa.concluida:
            self.view.exibir_mensagem(f"Tarefa #{id_tarefa} ja estava concluida.")
            return
        tarefa.concluir()
        self.view.exibir_mensagem(f"Tarefa #{id_tarefa} marcada como concluida!")

    def ver_tarefa(self, id_tarefa):
        tarefa = self.repositorio.buscar_por_id(id_tarefa)
        self.view.exibir_tarefa(tarefa)

    def listar_todas(self):
        tarefas = self.repositorio.listar_todas()
        self.view.exibir_lista(tarefas, "Todas as Tarefas")

    def listar_pendentes(self):
        tarefas = self.repositorio.listar_pendentes()
        self.view.exibir_lista(tarefas, "Tarefas Pendentes")


# ============================================================
# USO: montagem e uso do sistema MVC
# ============================================================
repositorio = TarefaRepositorio()
view = TarefaView()
controller = TarefaController(repositorio, view)

controller.criar_tarefa("Estudar arquitetura de software")
controller.criar_tarefa("Praticar MVC", "Implementar um exemplo completo")
controller.criar_tarefa("Rever principios SOLID")
controller.criar_tarefa("")  # Erro: titulo vazio

controller.listar_todas()
controller.concluir_tarefa(1)
controller.concluir_tarefa(99)  # Erro: nao existe

controller.listar_pendentes()
controller.ver_tarefa(2)`,
        description: 'MVC completo: Model gerencia dados e regras, View apenas formata e exibe, Controller coordena o fluxo.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Uma regra pratica: se voce esta escrevendo logica de negocio (calculos, validacoes, regras) dentro da View, algo esta errado. Se voce esta fazendo print() ou formatando strings dentro do Model, algo esta errado. O Controller nunca deve ter logica de negocio complexa — apenas coordenacao.',
    },
    {
      type: 'text',
      content: '## MVC na Pratica: Frameworks Web\n\nNo Django (framework web Python), o MVC e ligeiramente renomeado para MVT (Model-View-Template), mas o conceito e o mesmo:\n\n- `models.py` — o Model (classes que representam o banco de dados e as regras)\n- `templates/*.html` — o Template/View (HTML que exibe os dados)\n- `views.py` — o Controller (funcoes que recebem requisicoes HTTP e retornam respostas)\n- `urls.py` — roteamento (qual URL chama qual controller)\n\nNo Flask, no Rails, no Laravel — a estrutura e sempre a mesma: separar dados, logica e apresentacao. Dominar MVC e dominar a base de qualquer framework web moderno.',
    },
  ],
  challenges: [
    {
      id: 'mvc-challenge-1',
      title: 'Separar Codigo Espaguete em MVC',
      description: 'O codigo abaixo e um sistema de contatos totalmente misturado. Reestruture-o usando MVC: crie a classe Contato (Model), ContatoRepositorio (Model de dados), ContatoView (View com metodos de exibicao), e ContatoController (Controller que coordena tudo). Mantenha a mesma funcionalidade.',
      language: 'python',
      starterCode: `# Codigo espaguete - reestruture em MVC

contatos = []
proximo_id = 1

def adicionar_contato(nome, telefone, email):
    global proximo_id
    if not nome or not telefone:
        print("ERRO: Nome e telefone sao obrigatorios!")
        return
    contato = {"id": proximo_id, "nome": nome, "telefone": telefone, "email": email}
    contatos.append(contato)
    proximo_id += 1
    print(f"Contato '{nome}' adicionado com sucesso!")

def buscar_contato(nome_busca):
    encontrados = [c for c in contatos if nome_busca.lower() in c["nome"].lower()]
    print(f"\\n=== Resultados para '{nome_busca}' ===")
    if not encontrados:
        print("  Nenhum contato encontrado.")
    for c in encontrados:
        print(f"  [{c['id']}] {c['nome']} | Tel: {c['telefone']} | Email: {c['email']}")

def listar_contatos():
    print("\\n=== Todos os Contatos ===")
    if not contatos:
        print("  Agenda vazia.")
    for c in contatos:
        print(f"  [{c['id']}] {c['nome']} | Tel: {c['telefone']}")

# Teste
adicionar_contato("Ana Silva", "11-99999-0001", "ana@email.com")
adicionar_contato("Bruno Costa", "11-99999-0002", "bruno@email.com")
adicionar_contato("", "11-99999-0003", "")  # erro
listar_contatos()
buscar_contato("ana")
`,
      solution: `# Solucao MVC para o sistema de contatos

# ============================================================
# MODEL
# ============================================================
class Contato:
    def __init__(self, id_contato, nome, telefone, email=""):
        self.id = id_contato
        self.nome = nome
        self.telefone = telefone
        self.email = email

class ContatoRepositorio:
    def __init__(self):
        self._contatos = []
        self._proximo_id = 1

    def adicionar(self, nome, telefone, email=""):
        contato = Contato(self._proximo_id, nome, telefone, email)
        self._contatos.append(contato)
        self._proximo_id += 1
        return contato

    def listar_todos(self):
        return list(self._contatos)

    def buscar_por_nome(self, nome_busca):
        return [c for c in self._contatos if nome_busca.lower() in c.nome.lower()]

# ============================================================
# VIEW
# ============================================================
class ContatoView:
    def exibir_lista(self, contatos, titulo="Contatos"):
        print(f"\\n=== {titulo} ===")
        if not contatos:
            print("  (nenhum contato)")
        for c in contatos:
            email_str = f" | Email: {c.email}" if c.email else ""
            print(f"  [{c.id}] {c.nome} | Tel: {c.telefone}{email_str}")

    def exibir_mensagem(self, mensagem):
        print(f">> {mensagem}")

    def exibir_erro(self, erro):
        print(f"!! ERRO: {erro}")

# ============================================================
# CONTROLLER
# ============================================================
class ContatoController:
    def __init__(self, repositorio, view):
        self.repositorio = repositorio
        self.view = view

    def adicionar_contato(self, nome, telefone, email=""):
        if not nome or not telefone:
            self.view.exibir_erro("Nome e telefone sao obrigatorios!")
            return
        contato = self.repositorio.adicionar(nome, telefone, email)
        self.view.exibir_mensagem(f"Contato '{contato.nome}' adicionado!")

    def listar_contatos(self):
        contatos = self.repositorio.listar_todos()
        self.view.exibir_lista(contatos, "Todos os Contatos")

    def buscar_contato(self, nome_busca):
        encontrados = self.repositorio.buscar_por_nome(nome_busca)
        self.view.exibir_lista(encontrados, f"Resultados para '{nome_busca}'")

# Uso
repositorio = ContatoRepositorio()
view = ContatoView()
controller = ContatoController(repositorio, view)

controller.adicionar_contato("Ana Silva", "11-99999-0001", "ana@email.com")
controller.adicionar_contato("Bruno Costa", "11-99999-0002", "bruno@email.com")
controller.adicionar_contato("", "11-99999-0003", "")
controller.listar_contatos()
controller.buscar_contato("ana")
`,
      hints: [
        'Comece criando a classe Contato com atributos id, nome, telefone e email.',
        'Mova toda a logica de dados (lista, adicionar, buscar) para ContatoRepositorio.',
        'A ContatoView deve ter apenas metodos de exibicao (print). O ContatoController faz as validacoes e chama o repositorio e a view.',
      ],
    },
    {
      id: 'mvc-challenge-2',
      title: 'Adicionar Funcionalidade Respeitando MVC',
      description: 'Use o sistema MVC de tarefas da licao como base. Adicione a funcionalidade de "prioridade" respeitando as fronteiras MVC: (1) no Model, adicione o atributo prioridade (alta/media/baixa) a classe Tarefa e um metodo listar_por_prioridade(prioridade) ao repositorio, (2) na View, adicione exibir_lista_com_prioridade(), (3) no Controller, adicione listar_por_prioridade(prioridade). Nao misture responsabilidades.',
      language: 'python',
      starterCode: `# Sistema MVC base para estender com prioridade

class Tarefa:
    def __init__(self, id_tarefa, titulo, prioridade="media"):
        self.id = id_tarefa
        self.titulo = titulo
        self.prioridade = prioridade  # "alta", "media" ou "baixa"
        self.concluida = False

    def concluir(self):
        self.concluida = False

class TarefaRepositorio:
    def __init__(self):
        self._tarefas = {}
        self._proximo_id = 1

    def criar(self, titulo, prioridade="media"):
        tarefa = Tarefa(self._proximo_id, titulo, prioridade)
        self._tarefas[self._proximo_id] = tarefa
        self._proximo_id += 1
        return tarefa

    def listar_todas(self):
        return list(self._tarefas.values())

    def listar_por_prioridade(self, prioridade):
        pass  # Implemente aqui

class TarefaView:
    def exibir_lista(self, tarefas, titulo="Tarefas"):
        print(f"\\n=== {titulo} ===")
        for tarefa in tarefas:
            print(f"  [{tarefa.prioridade.upper()}] {tarefa.titulo}")

    def exibir_lista_com_prioridade(self, tarefas, prioridade):
        pass  # Implemente aqui

class TarefaController:
    def __init__(self, repositorio, view):
        self.repositorio = repositorio
        self.view = view

    def criar_tarefa(self, titulo, prioridade="media"):
        tarefa = self.repositorio.criar(titulo, prioridade)
        print(f">> Tarefa criada: '{tarefa.titulo}' [{tarefa.prioridade}]")

    def listar_todas(self):
        self.view.exibir_lista(self.repositorio.listar_todas(), "Todas as Tarefas")

    def listar_por_prioridade(self, prioridade):
        pass  # Implemente aqui

# Teste
repo = TarefaRepositorio()
view = TarefaView()
ctrl = TarefaController(repo, view)

ctrl.criar_tarefa("Corrigir bug critico", "alta")
ctrl.criar_tarefa("Escrever documentacao", "baixa")
ctrl.criar_tarefa("Revisar pull request", "media")
ctrl.criar_tarefa("Deploy para producao", "alta")

ctrl.listar_todas()
ctrl.listar_por_prioridade("alta")
ctrl.listar_por_prioridade("baixa")
`,
      solution: `class Tarefa:
    def __init__(self, id_tarefa, titulo, prioridade="media"):
        self.id = id_tarefa
        self.titulo = titulo
        self.prioridade = prioridade
        self.concluida = False

    def concluir(self):
        self.concluida = True

class TarefaRepositorio:
    def __init__(self):
        self._tarefas = {}
        self._proximo_id = 1

    def criar(self, titulo, prioridade="media"):
        prioridades_validas = {"alta", "media", "baixa"}
        if prioridade not in prioridades_validas:
            prioridade = "media"
        tarefa = Tarefa(self._proximo_id, titulo, prioridade)
        self._tarefas[self._proximo_id] = tarefa
        self._proximo_id += 1
        return tarefa

    def listar_todas(self):
        return list(self._tarefas.values())

    def listar_por_prioridade(self, prioridade):
        # Logica de filtragem PERTENCE ao model/repositorio
        return [t for t in self._tarefas.values() if t.prioridade == prioridade]

class TarefaView:
    ICONES = {"alta": "(!)", "media": "( )", "baixa": "(v)"}

    def exibir_lista(self, tarefas, titulo="Tarefas"):
        print(f"\\n=== {titulo} ===")
        if not tarefas:
            print("  (nenhuma tarefa)")
            return
        for tarefa in tarefas:
            icone = self.ICONES.get(tarefa.prioridade, "(?)")
            print(f"  {icone} [{tarefa.prioridade.upper()}] #{tarefa.id} {tarefa.titulo}")
        print(f"  Total: {len(tarefas)}")

    def exibir_lista_com_prioridade(self, tarefas, prioridade):
        # View so formata, nao filtra
        titulo = f"Tarefas de Prioridade {prioridade.upper()}"
        self.exibir_lista(tarefas, titulo)

class TarefaController:
    def __init__(self, repositorio, view):
        self.repositorio = repositorio
        self.view = view

    def criar_tarefa(self, titulo, prioridade="media"):
        if not titulo.strip():
            print("!! ERRO: Titulo nao pode ser vazio.")
            return
        tarefa = self.repositorio.criar(titulo, prioridade)
        print(f">> Tarefa criada: '{tarefa.titulo}' [{tarefa.prioridade}]")

    def listar_todas(self):
        self.view.exibir_lista(self.repositorio.listar_todas(), "Todas as Tarefas")

    def listar_por_prioridade(self, prioridade):
        # Controller coordena: busca no model, passa para a view
        tarefas = self.repositorio.listar_por_prioridade(prioridade)
        self.view.exibir_lista_com_prioridade(tarefas, prioridade)

# Teste
repo = TarefaRepositorio()
view = TarefaView()
ctrl = TarefaController(repo, view)

ctrl.criar_tarefa("Corrigir bug critico", "alta")
ctrl.criar_tarefa("Escrever documentacao", "baixa")
ctrl.criar_tarefa("Revisar pull request", "media")
ctrl.criar_tarefa("Deploy para producao", "alta")

ctrl.listar_todas()
ctrl.listar_por_prioridade("alta")
ctrl.listar_por_prioridade("baixa")
`,
      hints: [
        'listar_por_prioridade no repositorio deve filtrar usando list comprehension: [t for t in ... if t.prioridade == prioridade].',
        'exibir_lista_com_prioridade na View deve apenas formatar o titulo e chamar exibir_lista — nao deve filtrar nada.',
        'O Controller em listar_por_prioridade deve chamar o repositorio para filtrar, e passar o resultado para a view exibir.',
      ],
    },
  ],
};
