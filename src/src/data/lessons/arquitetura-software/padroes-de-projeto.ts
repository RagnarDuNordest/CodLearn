import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'padroes-de-projeto',
  moduleId: 'arquitetura-software',
  title: 'Padroes de Projeto (Design Patterns)',
  description: 'Aprenda o que sao design patterns, por que existem, e como usar Singleton, Factory e Observer para resolver problemas recorrentes de forma elegante.',
  order: 2,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: '## O que sao Design Patterns?\n\nDesign Patterns (Padroes de Projeto) sao **solucoes reutilizaveis para problemas comuns** que aparecem no desenvolvimento de software. Eles nao sao codigo pronto para copiar e colar — sao **descricoes de como resolver um problema** de forma que outros desenvolvedores ja provaram funcionar.\n\nA ideia foi popularizada pelo livro "Design Patterns: Elements of Reusable Object-Oriented Software" (1994), escrito por quatro autores conhecidos como "Gang of Four" (GoF). Eles catalogaram 23 padroes divididos em 3 categorias.\n\nPense em design patterns como **vocabulario compartilhado**: quando voce diz "vamos usar um Singleton aqui", todos os desenvolvedores experientes entendem imediatamente o que voce quer dizer — sem precisar explicar tudo do zero.',
    },
    {
      type: 'text',
      content: '## As 3 Categorias de Design Patterns\n\n**Criacionais** — tratam da **criacao de objetos**. O problema: como criar objetos de forma flexivel, sem acoplar o codigo a classes concretas?\n- Exemplos: Singleton, Factory, Abstract Factory, Builder, Prototype\n\n**Estruturais** — tratam de **como objetos se compoem** para formar estruturas maiores. O problema: como organizar objetos e classes para formar estruturas maiores e mais flexiveis?\n- Exemplos: Adapter, Decorator, Facade, Composite, Proxy\n\n**Comportamentais** — tratam de **como objetos se comunicam** e distribuem responsabilidades. O problema: como os objetos interagem e distribuem responsabilidades de forma eficiente?\n- Exemplos: Observer, Strategy, Command, Iterator, Template Method\n\nNesta licao, vamos ver um padrao de cada categoria: Singleton (criacional), e Observer (comportamental), mais Factory (criacional) — os mais usados no dia a dia.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Voce nao precisa memorizar todos os 23 padroes. O mais importante e entender o problema que cada padrao resolve. Com o tempo, voce vai naturalmente reconhecer quando cada um e util.',
    },
    {
      type: 'text',
      content: '## Singleton: Uma Unica Instancia\n\nO **Singleton** garante que uma classe tenha **apenas uma instancia** em toda a aplicacao, e fornece um ponto de acesso global a ela.\n\n**Analogia:** O presidente de uma empresa. Pode existir apenas um ao mesmo tempo. Qualquer departamento que queira falar com "o presidente" vai encontrar sempre a mesma pessoa — nao e criado um novo presidente para cada reuniao.\n\n**Quando usar:** Objetos que devem existir uma unica vez: conexao com banco de dados, gerenciador de configuracoes, sistema de logs. Criar multiplas conexoes com o banco por engano seria um problema serio.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'singleton.py',
        code: `# SINGLETON: garante que so existe uma instancia

class ConfiguracaoDoSistema:
    _instancia = None  # Atributo de classe que guarda a unica instancia

    def __new__(cls):
        # __new__ e chamado ANTES do __init__, na criacao do objeto
        if cls._instancia is None:
            # So cria uma nova instancia se nao existir nenhuma
            cls._instancia = super().__new__(cls)
            cls._instancia.configuracoes = {}
            print("Configuracao criada pela primeira vez.")
        else:
            print("Reutilizando configuracao existente.")
        return cls._instancia

    def definir(self, chave, valor):
        self.configuracoes[chave] = valor

    def obter(self, chave):
        return self.configuracoes.get(chave)


# Demonstracao: sempre a mesma instancia
config1 = ConfiguracaoDoSistema()   # "Configuracao criada pela primeira vez."
config1.definir("debug", True)
config1.definir("versao", "1.0")

config2 = ConfiguracaoDoSistema()   # "Reutilizando configuracao existente."
config2.definir("ambiente", "producao")

# config1 e config2 sao o MESMO objeto!
print(config1 is config2)           # True
print(config1.obter("ambiente"))    # "producao" - config2 modificou a mesma instancia!
print(id(config1) == id(config2))   # True - mesmo endereco de memoria


# Caso de uso classico: conexao com banco de dados
class ConexaoBancoDados:
    _instancia = None

    def __new__(cls, host="localhost", porta=5432):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
            cls._instancia.host = host
            cls._instancia.porta = porta
            cls._instancia.conectado = False
            print(f"Nova conexao com {host}:{porta}")
        return cls._instancia

    def conectar(self):
        if not self.conectado:
            print(f"Conectando em {self.host}:{self.porta}...")
            self.conectado = True

    def executar(self, query):
        if self.conectado:
            print(f"Executando: {query}")

# Multiplas partes do sistema usam a mesma conexao
db1 = ConexaoBancoDados()
db1.conectar()

db2 = ConexaoBancoDados()  # Reutiliza, nao cria nova conexao
db2.executar("SELECT * FROM usuarios")`,
        description: 'Singleton: _instancia = None como atributo de classe. __new__ verifica se ja existe antes de criar.',
      },
    },
    {
      type: 'text',
      content: '## Factory: Fabrica de Objetos\n\nO **Factory** (Fabrica) define uma interface para criar objetos, mas deixa as subclasses ou uma funcao decidir qual classe concreta instanciar. O cliente nao precisa saber qual classe exata esta sendo criada.\n\n**Analogia:** Uma fabrica de carros. Voce pede "um carro economico" ou "um SUV" e a fabrica decide qual modelo especifico criar e como montar. Voce nao precisa saber os detalhes de montagem — so recebe o carro pronto.\n\n**Quando usar:** Quando voce precisa criar objetos mas o tipo exato so e conhecido em tempo de execucao; quando quer desacoplar a criacao do uso.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'factory.py',
        code: `# FACTORY: cria objetos sem expor a logica de criacao

# Hierarquia de classes de pagamento
class Pagamento:
    def processar(self, valor):
        raise NotImplementedError

    def confirmar(self):
        raise NotImplementedError

class PagamentoCartaoCredito(Pagamento):
    def __init__(self, numero_cartao):
        self.numero_cartao = numero_cartao

    def processar(self, valor):
        print(f"Processando R\${valor:.2f} no cartao {self.numero_cartao[-4:]}")

    def confirmar(self):
        print("Pagamento no cartao confirmado!")

class PagamentoPix(Pagamento):
    def __init__(self, chave_pix):
        self.chave_pix = chave_pix

    def processar(self, valor):
        print(f"Gerando QR Code Pix de R\${valor:.2f} para chave {self.chave_pix}")

    def confirmar(self):
        print("Pix confirmado instantaneamente!")

class PagamentoBoleto(Pagamento):
    def __init__(self, cpf):
        self.cpf = cpf

    def processar(self, valor):
        print(f"Gerando boleto de R\${valor:.2f} para CPF {self.cpf}")

    def confirmar(self):
        print("Boleto aguardando pagamento em ate 3 dias uteis.")


# FACTORY: decide qual classe criar baseado em dados de entrada
class FabricaDePagamento:
    @staticmethod
    def criar(tipo, dados):
        """Fabrica que cria o pagamento certo sem expor os detalhes."""
        if tipo == "cartao":
            return PagamentoCartaoCredito(dados["numero"])
        elif tipo == "pix":
            return PagamentoPix(dados["chave"])
        elif tipo == "boleto":
            return PagamentoBoleto(dados["cpf"])
        else:
            raise ValueError(f"Tipo de pagamento desconhecido: {tipo}")


# Uso: o cliente nao precisa saber qual classe concreta foi criada
def finalizar_compra(tipo_pagamento, dados_pagamento, valor):
    pagamento = FabricaDePagamento.criar(tipo_pagamento, dados_pagamento)
    pagamento.processar(valor)
    pagamento.confirmar()

# Tudo funciona com a mesma interface, independente do tipo
finalizar_compra("pix", {"chave": "ana@email.com"}, 150.00)
finalizar_compra("cartao", {"numero": "4111111111111234"}, 299.90)
finalizar_compra("boleto", {"cpf": "123.456.789-00"}, 89.00)

# Para adicionar um novo tipo (ex: criptomoeda), basta:
# 1. Criar a classe PagamentoCripto
# 2. Adicionar o elif na fabrica
# O restante do codigo nao muda!`,
        description: 'Factory: centraliza a logica de criacao. O cliente pede um pagamento por tipo e recebe o objeto correto.',
      },
    },
    {
      type: 'text',
      content: '## Observer: Notificar Varios ao Mesmo Tempo\n\nO **Observer** define uma dependencia um-para-muitos: quando um objeto (o **Subject**) muda de estado, todos os seus dependentes (**Observers**) sao notificados automaticamente.\n\n**Analogia:** Newsletter de um site. Voce se inscreve (subscribe) para receber emails. Quando o site publica um artigo novo, todos os inscritos recebem a notificacao automaticamente. O site nao precisa saber quem sao os inscritos individualmente — so chama "notifique todos".\n\n**Quando usar:** Sistemas de eventos, interfaces graficas, streaming de dados, notificacoes em tempo real, qualquer situacao onde multiplos objetos precisam reagir a mudancas em outro objeto.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'observer.py',
        code: `# OBSERVER: notificacao automatica de multiplos objetos

# Interface do Observer (quem vai ser notificado)
class Observer:
    def atualizar(self, evento, dados):
        raise NotImplementedError

# Interface do Subject (quem gera os eventos)
class Subject:
    def __init__(self):
        self._observers = []

    def inscrever(self, observer: Observer):
        self._observers.append(observer)
        print(f"Observer {observer.__class__.__name__} inscrito.")

    def desinscrever(self, observer: Observer):
        self._observers.remove(observer)

    def notificar(self, evento, dados):
        for observer in self._observers:
            observer.atualizar(evento, dados)


# Subject concreto: sistema de estoque
class EstoqueDeProdutos(Subject):
    def __init__(self):
        super().__init__()
        self.produtos = {}

    def atualizar_estoque(self, produto, quantidade):
        self.produtos[produto] = quantidade
        # Notifica todos os observers automaticamente
        self.notificar("estoque_atualizado", {
            "produto": produto,
            "quantidade": quantidade
        })
        if quantidade < 10:
            self.notificar("estoque_baixo", {
                "produto": produto,
                "quantidade": quantidade
            })


# Observers concretos: diferentes sistemas que reagem ao estoque
class SistemaDeEmail(Observer):
    def atualizar(self, evento, dados):
        if evento == "estoque_baixo":
            print(f"[EMAIL] ALERTA: Estoque baixo de '{dados['produto']}': {dados['quantidade']} unidades!")

class SistemaDeLog(Observer):
    def atualizar(self, evento, dados):
        print(f"[LOG] Evento '{evento}': produto='{dados['produto']}', qtd={dados['quantidade']}")

class SistemaDeDashboard(Observer):
    def atualizar(self, evento, dados):
        if evento == "estoque_atualizado":
            print(f"[DASHBOARD] Grafico atualizado: {dados['produto']} = {dados['quantidade']} unidades")

class SistemaDeReposicao(Observer):
    def atualizar(self, evento, dados):
        if evento == "estoque_baixo":
            print(f"[REPOSICAO] Pedido automatico criado para '{dados['produto']}'!")


# Demonstracao: todos os sistemas reagem automaticamente
estoque = EstoqueDeProdutos()

# Diferentes sistemas se inscrevem
estoque.inscrever(SistemaDeEmail())
estoque.inscrever(SistemaDeLog())
estoque.inscrever(SistemaDeDashboard())
estoque.inscrever(SistemaDeReposicao())

print("\\n--- Atualizando estoque de Notebook ---")
estoque.atualizar_estoque("Notebook", 50)

print("\\n--- Atualizando estoque de Mouse (estoque baixo!) ---")
estoque.atualizar_estoque("Mouse", 5)
# Todos os 4 sistemas sao notificados automaticamente!`,
        description: 'Observer: quando o estoque muda, todos os sistemas inscritos sao notificados automaticamente. Facil de adicionar novos observers.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Voce ja usou o padrao Observer sem saber! Em JavaScript, addEventListener e Observer. Em Python, os signals do Django e Observer. Em React, o useEffect com dependencias e Observer. E um padrao extremamente comum em frameworks modernos.',
    },
  ],
  challenges: [
    {
      id: 'patterns-challenge-1',
      title: 'Singleton para Conexao com Banco',
      description: 'Implemente o padrao Singleton para uma classe GerenciadorDeBanco. Ela deve: ter apenas uma instancia, manter um contador de quantas "queries" foram executadas, ter um metodo executar_query(sql) que incrementa o contador e exibe o SQL, e um metodo estatisticas() que mostra quantas queries foram feitas. Prove que e sempre a mesma instancia criando dois objetos e verificando que o contador e compartilhado.',
      language: 'python',
      starterCode: `# Implemente o Singleton GerenciadorDeBanco

class GerenciadorDeBanco:
    # Implemente o padrao Singleton aqui
    pass

# Ao final, o codigo abaixo deve funcionar:
# db1 = GerenciadorDeBanco()
# db2 = GerenciadorDeBanco()
# db1.executar_query("SELECT * FROM usuarios")
# db1.executar_query("INSERT INTO logs VALUES (?)")
# db2.executar_query("UPDATE produtos SET preco=10")
# db2.estatisticas()  # deve mostrar 3 queries no total
# print(db1 is db2)   # True
`,
      solution: `class GerenciadorDeBanco:
    _instancia = None

    def __new__(cls):
        if cls._instancia is None:
            cls._instancia = super().__new__(cls)
            cls._instancia.total_queries = 0
            cls._instancia.historico = []
            print("[DB] Nova conexao com o banco estabelecida.")
        return cls._instancia

    def executar_query(self, sql):
        self.total_queries += 1
        self.historico.append(sql)
        print(f"[DB] Query #{self.total_queries}: {sql}")

    def estatisticas(self):
        print(f"\\n[DB] === Estatisticas da Conexao ===")
        print(f"[DB] Total de queries executadas: {self.total_queries}")
        print(f"[DB] Historico:")
        for i, query in enumerate(self.historico, 1):
            print(f"[DB]   {i}. {query}")


# Demonstracao
db1 = GerenciadorDeBanco()
db2 = GerenciadorDeBanco()

db1.executar_query("SELECT * FROM usuarios")
db1.executar_query("INSERT INTO logs VALUES (?)")
db2.executar_query("UPDATE produtos SET preco=10")

db2.estatisticas()  # 3 queries, pois db1 e db2 sao o mesmo objeto

print(f"\\ndb1 is db2: {db1 is db2}")   # True
print(f"Mesmo id: {id(db1) == id(db2)}")  # True
`,
      hints: [
        'Defina _instancia = None como atributo de classe (nao de instancia).',
        'Implemente __new__(cls) que verifica se _instancia is None antes de criar.',
        'Inicialize total_queries = 0 e historico = [] dentro do if, na primeira criacao.',
      ],
    },
    {
      id: 'patterns-challenge-2',
      title: 'Observer para Sistema de Notificacoes de Eventos',
      description: 'Implemente o padrao Observer para um sistema de eventos de usuario. Crie: (1) uma classe SistemaDeUsuarios que notifica quando um usuario se cadastra ou faz login, (2) um LogDeAuditoria que registra todos os eventos, (3) um ServicoDeEmail que envia email apenas no cadastro, (4) um SistemaDeAnalytics que conta quantos cadastros e logins aconteceram.',
      language: 'python',
      starterCode: `# Implemente o padrao Observer para eventos de usuario

class Observer:
    def atualizar(self, evento, dados):
        raise NotImplementedError

class Subject:
    def __init__(self):
        self._observers = []

    def inscrever(self, observer):
        self._observers.append(observer)

    def notificar(self, evento, dados):
        for observer in self._observers:
            observer.atualizar(evento, dados)

# Implemente:
# class SistemaDeUsuarios(Subject): com metodos cadastrar(nome, email) e fazer_login(email)
# class LogDeAuditoria(Observer): registra todos os eventos com timestamp simulado
# class ServicoDeEmail(Observer): envia email so no cadastro
# class SistemaDeAnalytics(Observer): conta cadastros e logins, com metodo relatorio()

# Ao final:
# sistema = SistemaDeUsuarios()
# sistema.inscrever(LogDeAuditoria())
# sistema.inscrever(ServicoDeEmail())
# analytics = SistemaDeAnalytics()
# sistema.inscrever(analytics)
# sistema.cadastrar("Ana", "ana@email.com")
# sistema.fazer_login("ana@email.com")
# sistema.cadastrar("Bruno", "bruno@email.com")
# analytics.relatorio()
`,
      solution: `class Observer:
    def atualizar(self, evento, dados):
        raise NotImplementedError

class Subject:
    def __init__(self):
        self._observers = []

    def inscrever(self, observer):
        self._observers.append(observer)

    def notificar(self, evento, dados):
        for observer in self._observers:
            observer.atualizar(evento, dados)

# Subject concreto
class SistemaDeUsuarios(Subject):
    def cadastrar(self, nome, email):
        print(f"[SISTEMA] Cadastrando usuario {nome}...")
        self.notificar("cadastro", {"nome": nome, "email": email})

    def fazer_login(self, email):
        print(f"[SISTEMA] Login de {email}...")
        self.notificar("login", {"email": email})

# Observer 1: registra tudo
class LogDeAuditoria(Observer):
    def __init__(self):
        self.registros = []

    def atualizar(self, evento, dados):
        registro = f"[LOG] Evento='{evento}' | Dados={dados}"
        self.registros.append(registro)
        print(registro)

# Observer 2: reage apenas ao cadastro
class ServicoDeEmail(Observer):
    def atualizar(self, evento, dados):
        if evento == "cadastro":
            print(f"[EMAIL] Boas-vindas enviado para {dados['email']}! Ola {dados['nome']}!")

# Observer 3: conta e analisa
class SistemaDeAnalytics(Observer):
    def __init__(self):
        self.total_cadastros = 0
        self.total_logins = 0

    def atualizar(self, evento, dados):
        if evento == "cadastro":
            self.total_cadastros += 1
        elif evento == "login":
            self.total_logins += 1

    def relatorio(self):
        print(f"\\n[ANALYTICS] === Relatorio ===")
        print(f"[ANALYTICS] Total de cadastros: {self.total_cadastros}")
        print(f"[ANALYTICS] Total de logins: {self.total_logins}")

# Demonstracao
sistema = SistemaDeUsuarios()
sistema.inscrever(LogDeAuditoria())
sistema.inscrever(ServicoDeEmail())
analytics = SistemaDeAnalytics()
sistema.inscrever(analytics)

print("\\n--- Cadastro de Ana ---")
sistema.cadastrar("Ana", "ana@email.com")

print("\\n--- Login de Ana ---")
sistema.fazer_login("ana@email.com")

print("\\n--- Cadastro de Bruno ---")
sistema.cadastrar("Bruno", "bruno@email.com")

analytics.relatorio()
`,
      hints: [
        'SistemaDeUsuarios herda de Subject. Os metodos cadastrar() e fazer_login() devem chamar self.notificar() com o nome do evento e os dados.',
        'Cada Observer implementa atualizar(evento, dados) e usa um if para responder apenas aos eventos que lhe interessam.',
        'SistemaDeAnalytics precisa de dois contadores (total_cadastros e total_logins) inicializados em 0 no __init__.',
      ],
    },
  ],
};
