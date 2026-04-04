import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'principios-solid',
  moduleId: 'arquitetura-software',
  title: 'Os 5 Principios SOLID',
  description: 'Aprenda os 5 principios SOLID que guiam o design orientado a objetos e tornam seu codigo mais flexivel, testavel e facil de manter.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: '## O que sao os Principios SOLID?\n\nSOLID e um acronimo para 5 principios de design orientado a objetos definidos por Robert C. Martin (conhecido como "Uncle Bob"). Eles foram criados para tornar o software mais **facil de entender, manter e estender** ao longo do tempo.\n\nOs 5 principios sao:\n- **S** — Single Responsibility Principle (Principio da Responsabilidade Unica)\n- **O** — Open/Closed Principle (Principio Aberto/Fechado)\n- **L** — Liskov Substitution Principle (Principio da Substituicao de Liskov)\n- **I** — Interface Segregation Principle (Principio da Segregacao de Interfaces)\n- **D** — Dependency Inversion Principle (Principio da Inversao de Dependencia)\n\nNao e necessario memorizar as definicoes formais. O importante e entender o problema que cada principio resolve.',
    },
    {
      type: 'text',
      content: '## S — Single Responsibility Principle\n\n**"Uma classe deve ter um, e apenas um, motivo para mudar."**\n\nNa pratica: cada classe deve fazer **uma coisa so**. Se uma classe faz varias coisas, quando qualquer uma delas precisar mudar, voce vai mexer na classe inteira — arriscando quebrar as outras responsabilidades.\n\nImagine uma classe `Relatorio` que busca dados do banco, calcula estatisticas E gera um PDF. Se o formato do PDF mudar, voce mexe na mesma classe que tem logica de banco de dados. Isso e perigoso e desnecessario.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'single_responsibility.py',
        code: `# VIOLACAO do SRP: a classe Usuario faz coisas demais
class UsuarioRuim:
    def __init__(self, nome, email):
        self.nome = nome
        self.email = email

    def salvar_no_banco(self):
        # Responsabilidade 1: persistencia de dados
        print(f"Salvando {self.nome} no banco de dados...")

    def enviar_email_boas_vindas(self):
        # Responsabilidade 2: comunicacao por email
        print(f"Enviando email para {self.email}...")

    def gerar_relatorio_pdf(self):
        # Responsabilidade 3: geracao de relatorios
        print(f"Gerando PDF do usuario {self.nome}...")

# Se o formato do PDF mudar, precisamos mexer na classe Usuario
# Se o banco de dados mudar, idem
# Tres motivos para a classe mudar = viola SRP


# SEGUINDO o SRP: cada classe tem uma responsabilidade
class Usuario:
    def __init__(self, nome, email):
        self.nome = nome
        self.email = email

class UsuarioRepositorio:
    # Responsabilidade unica: salvar e buscar usuarios
    def salvar(self, usuario):
        print(f"Salvando {usuario.nome} no banco de dados...")

    def buscar_por_email(self, email):
        print(f"Buscando usuario com email {email}...")

class ServicoEmail:
    # Responsabilidade unica: enviar emails
    def enviar_boas_vindas(self, usuario):
        print(f"Enviando email de boas-vindas para {usuario.email}...")

class GeradorDeRelatorio:
    # Responsabilidade unica: gerar relatorios
    def gerar_pdf_usuario(self, usuario):
        print(f"Gerando PDF do usuario {usuario.nome}...")

# Uso: cada parte pode mudar independentemente
usuario = Usuario("Ana", "ana@email.com")
repositorio = UsuarioRepositorio()
servico_email = ServicoEmail()

repositorio.salvar(usuario)
servico_email.enviar_boas_vindas(usuario)`,
        description: 'SRP: cada classe tem um unico motivo para mudar. Mudancas no banco nao afetam o codigo de email.',
      },
    },
    {
      type: 'text',
      content: '## O — Open/Closed Principle\n\n**"Entidades de software devem ser abertas para extensao, mas fechadas para modificacao."**\n\nNa pratica: voce deve conseguir **adicionar comportamentos novos** sem alterar o codigo que ja funciona. Isso evita quebrar funcionalidades existentes toda vez que algo novo e adicionado.\n\nA solucao tipica e usar heranca ou composicao: defina uma interface ou classe base, e adicione novas funcionalidades criando novas classes, sem tocar nas existentes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'open_closed.py',
        code: `# VIOLACAO do OCP: para adicionar novo desconto, precisamos modificar a funcao
def calcular_desconto_ruim(tipo_cliente, valor):
    if tipo_cliente == "regular":
        return valor * 0.05
    elif tipo_cliente == "vip":
        return valor * 0.15
    elif tipo_cliente == "senior":      # Adicionamos isso depois...
        return valor * 0.20
    # Toda vez que um novo tipo surge, modificamos esta funcao = viola OCP


# SEGUINDO o OCP: cada novo tipo e uma nova classe, sem modificar o existente
class CalculadorDesconto:
    def calcular(self, valor):
        raise NotImplementedError

class DescontoRegular(CalculadorDesconto):
    def calcular(self, valor):
        return valor * 0.05

class DescontoVip(CalculadorDesconto):
    def calcular(self, valor):
        return valor * 0.15

class DescontoSenior(CalculadorDesconto):
    # Adicionamos esta classe sem modificar as anteriores!
    def calcular(self, valor):
        return valor * 0.20

class DescontoEstudante(CalculadorDesconto):
    # Mais um tipo novo: so criamos mais uma classe
    def calcular(self, valor):
        return valor * 0.10

# A funcao que usa o desconto nao muda nunca
def aplicar_desconto(calculador: CalculadorDesconto, valor):
    desconto = calculador.calcular(valor)
    return valor - desconto

# Uso
valor_compra = 200.0
print(aplicar_desconto(DescontoVip(), valor_compra))      # 170.0
print(aplicar_desconto(DescontoSenior(), valor_compra))   # 160.0
print(aplicar_desconto(DescontoEstudante(), valor_compra)) # 180.0`,
        description: 'OCP: adicionamos novos tipos de desconto criando novas classes, sem alterar o codigo ja existente.',
      },
    },
    {
      type: 'text',
      content: '## L — Liskov Substitution Principle\n\n**"Subclasses devem poder substituir suas classes pai sem quebrar o sistema."**\n\nSe voce tem uma funcao que aceita um objeto do tipo `Animal`, ela deve funcionar corretamente com qualquer subclasse de `Animal` (como `Cachorro` ou `Gato`) sem surpresas.\n\nViolar este principio geralmente significa que a heranca foi usada de forma errada. O exemplo classico e o Retangulo/Quadrado: matematicamente um quadrado e um retangulo, mas no codigo isso pode causar problemas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'liskov.py',
        code: `# VIOLACAO do LSP: Quadrado herda de Retangulo mas quebra o comportamento esperado
class Retangulo:
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

class Quadrado(Retangulo):
    # Quadrado tenta forcar largura == altura
    def __init__(self, lado):
        super().__init__(lado, lado)

    def set_largura(self, largura):
        self.largura = largura
        self.altura = largura  # Quebra a logica do Retangulo!

# Funcao que espera um Retangulo
def testar_retangulo(retangulo):
    retangulo.set_largura = lambda l: setattr(retangulo, 'largura', l)
    # Para um retangulo 4x5, esperamos area = 20
    retangulo.largura = 4
    retangulo.altura = 5
    assert retangulo.area() == 20  # OK para Retangulo, mas Quadrado quebraria!


# SEGUINDO o LSP: heranca apenas quando o comportamento e genuinamente compativel
class Forma:
    def area(self):
        raise NotImplementedError

class Retangulo(Forma):
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

class Quadrado(Forma):
    # Quadrado NÃO herda de Retangulo, herda da abstração Forma
    def __init__(self, lado):
        self.lado = lado

    def area(self):
        return self.lado ** 2

# Funcao que aceita qualquer Forma - funciona com ambas sem surpresas
def imprimir_area(forma: Forma):
    print(f"Area: {forma.area()}")

imprimir_area(Retangulo(4, 5))   # Area: 20
imprimir_area(Quadrado(4))       # Area: 16
# Sem surpresas! Qualquer Forma funciona corretamente`,
        description: 'LSP: subclasses devem funcionar em qualquer lugar que o tipo pai e esperado, sem comportamentos inesperados.',
      },
    },
    {
      type: 'text',
      content: '## I — Interface Segregation Principle\n\n**"Clientes nao devem ser forcados a depender de interfaces que nao usam."**\n\nNa pratica: e melhor ter varias interfaces pequenas e especificas do que uma interface grande e generica. Nao force uma classe a implementar metodos que ela nao precisa.\n\nImagine uma interface `Trabalhador` com metodos `trabalhar()`, `comer()` e `dormir()`. Um robo trabalhador precisaria implementar `comer()` e `dormir()` mesmo sem precisar deles — isso e violacao do ISP.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'interface_segregation.py',
        code: `# VIOLACAO do ISP: interface grande que forca implementacoes desnecessarias
class Trabalhador:
    def trabalhar(self):
        raise NotImplementedError

    def comer(self):
        raise NotImplementedError

    def dormir(self):
        raise NotImplementedError

class Humano(Trabalhador):
    def trabalhar(self):
        print("Trabalhando...")

    def comer(self):
        print("Comendo...")

    def dormir(self):
        print("Dormindo...")

class Robo(Trabalhador):
    def trabalhar(self):
        print("Processando tarefas...")

    def comer(self):
        # Robo nao come! Forcado a implementar algo sem sentido
        raise Exception("Robos nao comem!")

    def dormir(self):
        # Robo nao dorme! Idem
        raise Exception("Robos nao dormem!")


# SEGUINDO o ISP: interfaces menores e especificas
class Trabalhavel:
    def trabalhar(self):
        raise NotImplementedError

class SerVivo:
    def comer(self):
        raise NotImplementedError

    def dormir(self):
        raise NotImplementedError

class Humano(Trabalhavel, SerVivo):
    # Humano implementa TUDO que faz sentido para ele
    def trabalhar(self):
        print("Trabalhando...")

    def comer(self):
        print("Comendo...")

    def dormir(self):
        print("Dormindo...")

class Robo(Trabalhavel):
    # Robo implementa APENAS o que faz sentido para ele
    def trabalhar(self):
        print("Processando tarefas...")

# Funcao so exige o que realmente precisa
def iniciar_turno(trabalhador: Trabalhavel):
    trabalhador.trabalhar()

iniciar_turno(Humano())  # OK
iniciar_turno(Robo())    # OK, sem metodos forcados`,
        description: 'ISP: interfaces pequenas e especificas. Cada classe implementa apenas o que realmente usa.',
      },
    },
    {
      type: 'text',
      content: '## D — Dependency Inversion Principle\n\n**"Modulos de alto nivel nao devem depender de modulos de baixo nivel. Ambos devem depender de abstracoes."**\n\nNa pratica: seu codigo de negocio nao deve depender diretamente de detalhes de implementacao (como MySQL, SendGrid, sistema de arquivos). Em vez disso, deve depender de **abstracoes** (interfaces).\n\nIsso torna o codigo muito mais facil de testar (podemos usar implementacoes falsas nos testes) e de trocar (podemos mudar de MySQL para PostgreSQL sem alterar as regras de negocio).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'dependency_inversion.py',
        code: `# VIOLACAO do DIP: logica de negocio depende diretamente do MySQL
class BancoDadosMySQL:
    def salvar(self, dados):
        print(f"Salvando no MySQL: {dados}")

class ServicoDeRelatorio:
    def __init__(self):
        # Dependencia direta de implementacao concreta!
        self.banco = BancoDadosMySQL()

    def gerar_relatorio(self, dados):
        # Para trocar para PostgreSQL, precisamos alterar esta classe
        self.banco.salvar(dados)


# SEGUINDO o DIP: dependa de abstracoes, nao de implementacoes
class BancoDeDados:
    # Abstracao (interface): define o contrato
    def salvar(self, dados):
        raise NotImplementedError

    def buscar(self, id_registro):
        raise NotImplementedError

class BancoDadosMySQL(BancoDeDados):
    # Implementacao concreta MySQL
    def salvar(self, dados):
        print(f"[MySQL] Salvando: {dados}")

    def buscar(self, id_registro):
        print(f"[MySQL] Buscando id={id_registro}")
        return {"id": id_registro, "dados": "resultado MySQL"}

class BancoDadosPostgres(BancoDeDados):
    # Implementacao concreta Postgres
    def salvar(self, dados):
        print(f"[PostgreSQL] Salvando: {dados}")

    def buscar(self, id_registro):
        print(f"[PostgreSQL] Buscando id={id_registro}")
        return {"id": id_registro, "dados": "resultado Postgres"}

class BancoDadosFalso(BancoDeDados):
    # Implementacao falsa para testes (sem banco de dados real!)
    def __init__(self):
        self.dados_salvos = []

    def salvar(self, dados):
        self.dados_salvos.append(dados)

    def buscar(self, id_registro):
        return {"id": id_registro, "dados": "dados de teste"}

class ServicoDeRelatorio:
    def __init__(self, banco: BancoDeDados):
        # Recebe a dependencia de fora (injecao de dependencia)
        self.banco = banco

    def gerar_relatorio(self, dados):
        self.banco.salvar(dados)
        print("Relatorio gerado com sucesso!")

# Em producao: usa MySQL
servico_prod = ServicoDeRelatorio(BancoDadosMySQL())
servico_prod.gerar_relatorio({"titulo": "Relatorio Mensal"})

# Para trocar para Postgres: so muda o argumento!
servico_pg = ServicoDeRelatorio(BancoDadosPostgres())
servico_pg.gerar_relatorio({"titulo": "Relatorio Mensal"})

# Nos testes: usa implementacao falsa (sem banco real!)
banco_falso = BancoDadosFalso()
servico_teste = ServicoDeRelatorio(banco_falso)
servico_teste.gerar_relatorio({"titulo": "Dado de Teste"})
print(f"Dados salvos no teste: {banco_falso.dados_salvos}")`,
        description: 'DIP: injete as dependencias de fora. Assim voce pode trocar MySQL por Postgres ou usar um banco falso em testes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Dos 5 principios, o mais impactante para iniciantes e o S (responsabilidade unica) e o D (inversao de dependencia). Comece aplicando estes dois e seu codigo ja vai melhorar muito. Os outros sao naturalmente incorporados conforme a experiencia aumenta.',
    },
  ],
  challenges: [
    {
      id: 'solid-challenge-1',
      title: 'Corrigir Violacao de Single Responsibility',
      description: 'A classe Pedido abaixo viola o principio SRP: ela calcula o total, valida dados, salva no banco e envia email, tudo ao mesmo tempo. Reestruture o codigo criando classes separadas: Pedido (so dados), CalculadorPedido, ValidadorPedido, PedidoRepositorio e NotificadorPedido.',
      language: 'python',
      starterCode: `# Classe que viola SRP - separe as responsabilidades
class Pedido:
    def __init__(self, cliente, itens):
        self.cliente = cliente
        self.itens = itens  # lista de {"nome": str, "preco": float, "qtd": int}

    def calcular_total(self):
        total = 0
        for item in self.itens:
            total += item["preco"] * item["qtd"]
        return total

    def validar(self):
        if not self.cliente:
            raise ValueError("Cliente obrigatorio")
        if not self.itens:
            raise ValueError("Pedido sem itens")
        return True

    def salvar_no_banco(self):
        print(f"Salvando pedido de {self.cliente} no banco...")
        print(f"Total: R\${self.calcular_total():.2f}")

    def enviar_confirmacao_email(self):
        total = self.calcular_total()
        print(f"Enviando email para {self.cliente}: pedido confirmado, total R\${total:.2f}")

# Crie as classes separadas e use-as aqui:
# pedido = Pedido("Ana", [...])
# calculador = CalculadorPedido()
# validador = ValidadorPedido()
# repositorio = PedidoRepositorio()
# notificador = NotificadorPedido()
`,
      solution: `# Solucao: cada classe tem uma unica responsabilidade

# 1. Dados do pedido (so dados, sem logica)
class Pedido:
    def __init__(self, cliente, itens):
        self.cliente = cliente
        self.itens = itens  # lista de {"nome": str, "preco": float, "qtd": int}

# 2. Calculos relacionados ao pedido
class CalculadorPedido:
    def calcular_total(self, pedido):
        total = 0
        for item in pedido.itens:
            total += item["preco"] * item["qtd"]
        return total

    def calcular_desconto(self, pedido, percentual):
        total = self.calcular_total(pedido)
        return total * (percentual / 100)

# 3. Validacao do pedido
class ValidadorPedido:
    def validar(self, pedido):
        if not pedido.cliente:
            raise ValueError("Cliente obrigatorio")
        if not pedido.itens:
            raise ValueError("Pedido sem itens")
        return True

# 4. Persistencia do pedido
class PedidoRepositorio:
    def salvar(self, pedido, total):
        print(f"Salvando pedido de {pedido.cliente} no banco...")
        print(f"Total: R\${total:.2f}")

# 5. Notificacao
class NotificadorPedido:
    def enviar_confirmacao(self, pedido, total):
        print(f"Enviando email para {pedido.cliente}: pedido confirmado, total R\${total:.2f}")

# Coordenacao
def processar_pedido(cliente, itens):
    pedido = Pedido(cliente, itens)
    calculador = CalculadorPedido()
    validador = ValidadorPedido()
    repositorio = PedidoRepositorio()
    notificador = NotificadorPedido()

    validador.validar(pedido)
    total = calculador.calcular_total(pedido)
    repositorio.salvar(pedido, total)
    notificador.enviar_confirmacao(pedido, total)

itens = [
    {"nome": "Notebook", "preco": 3500.0, "qtd": 1},
    {"nome": "Mouse", "preco": 80.0, "qtd": 2},
]
processar_pedido("Ana", itens)
`,
      hints: [
        'Identifique quantas "razoes para mudar" a classe original tem: calculo, validacao, banco, email = 4 razoes diferentes.',
        'Crie uma classe para cada responsabilidade. A classe Pedido deve ter apenas os dados (atributos).',
        'A funcao processar_pedido orquestra todas as classes: cria o pedido, valida, calcula, salva e notifica.',
      ],
    },
    {
      id: 'solid-challenge-2',
      title: 'Aplicar Dependency Inversion',
      description: 'O sistema de notificacao abaixo depende diretamente de EmailSMTP. Aplique o DIP: crie uma abstracao Notificador, faca EmailSMTP e SMSNotificador implementarem essa abstracao, e injete a dependencia no ServicoDeAlerta. Por fim, crie um NotificadorFalso para testes.',
      language: 'python',
      starterCode: `# Sistema que viola DIP - aplique a inversao de dependencia

class EmailSMTP:
    def enviar(self, destinatario, mensagem):
        print(f"[SMTP] Email para {destinatario}: {mensagem}")

class ServicoDeAlerta:
    def __init__(self):
        # Dependencia direta! Dificil de testar, dificil de trocar.
        self.notificador = EmailSMTP()

    def alertar_usuario(self, usuario, mensagem):
        self.notificador.enviar(usuario["email"], mensagem)

# Tarefa:
# 1. Crie a classe base Notificador com metodo enviar(destinatario, mensagem)
# 2. Faca EmailSMTP herdar de Notificador
# 3. Crie SMSNotificador que tambem herda de Notificador
# 4. Modifique ServicoDeAlerta para receber o notificador no __init__
# 5. Crie NotificadorFalso para usar em testes (guarda mensagens numa lista)
# 6. Demonstre usando os tres tipos de notificador
`,
      solution: `# Solucao: Dependency Inversion aplicado

# 1. Abstracao (interface/classe base)
class Notificador:
    def enviar(self, destinatario, mensagem):
        raise NotImplementedError

# 2. Implementacao concreta de Email
class EmailSMTP(Notificador):
    def enviar(self, destinatario, mensagem):
        print(f"[SMTP] Email para {destinatario}: {mensagem}")

# 3. Nova implementacao de SMS - sem alterar nada existente
class SMSNotificador(Notificador):
    def enviar(self, destinatario, mensagem):
        print(f"[SMS] Mensagem para {destinatario}: {mensagem}")

# 4. Implementacao falsa para testes
class NotificadorFalso(Notificador):
    def __init__(self):
        self.mensagens_enviadas = []

    def enviar(self, destinatario, mensagem):
        self.mensagens_enviadas.append({
            "destinatario": destinatario,
            "mensagem": mensagem
        })
        print(f"[TESTE] Notificacao registrada para {destinatario}")

# 5. Servico de alerta agora depende da abstracao, nao da implementacao
class ServicoDeAlerta:
    def __init__(self, notificador: Notificador):
        # Recebe qualquer implementacao de Notificador
        self.notificador = notificador

    def alertar_usuario(self, usuario, mensagem):
        self.notificador.enviar(usuario["email"], mensagem)

# Uso em producao com Email
usuario = {"nome": "Ana", "email": "ana@email.com"}
servico_email = ServicoDeAlerta(EmailSMTP())
servico_email.alertar_usuario(usuario, "Sua senha foi alterada.")

# Uso em producao com SMS (sem mudar ServicoDeAlerta!)
servico_sms = ServicoDeAlerta(SMSNotificador())
servico_sms.alertar_usuario(usuario, "Codigo de verificacao: 4521")

# Uso em testes (sem enviar email/SMS real!)
notificador_falso = NotificadorFalso()
servico_teste = ServicoDeAlerta(notificador_falso)
servico_teste.alertar_usuario(usuario, "Mensagem de teste")
print(f"Notificacoes registradas: {notificador_falso.mensagens_enviadas}")
`,
      hints: [
        'Comece criando a classe Notificador com um metodo enviar() que levanta NotImplementedError.',
        'Faca EmailSMTP e SMSNotificador herdarem de Notificador e implementarem o metodo enviar().',
        'No ServicoDeAlerta, mude o __init__ para receber um notificador como parametro: def __init__(self, notificador: Notificador)',
      ],
    },
  ],
};
