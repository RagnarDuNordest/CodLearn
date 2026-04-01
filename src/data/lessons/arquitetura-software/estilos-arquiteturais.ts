import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'estilos-arquiteturais',
  moduleId: 'arquitetura-software',
  title: 'Estilos Arquiteturais: Monolito, Microservicos e Serverless',
  description: 'Conhea os tres principais estilos arquiteturais modernos, entenda seus trade-offs e aprenda a escolher o mais adequado para cada contexto.',
  order: 6,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Estilos Arquiteturais: por que isso importa?\n\nAntes de escrever uma linha de codigo, um arquiteto precisa responder: **como este sistema vai ser organizado em alto nivel?** A resposta define tudo: como o time trabalha, como o sistema escala, como os deploys acontecem e quanto custa operar.\n\nOs tres estilos mais discutidos hoje sao:\n- **Monolito**: um unico sistema coeso e integrado\n- **Microservicos**: varios servicos pequenos e independentes\n- **Serverless**: funcoes executadas sob demanda na nuvem\n\nNao existe um estilo superior. Cada um tem um contexto onde brilha e contextos onde causa dor.',
    },
    {
      type: 'text',
      content: '## Monolito: simples, coeso, direto ao ponto\n\nUm monolito e um sistema onde **todo o codigo roda como uma unica unidade**. O backend, a logica de negocio e o acesso ao banco estao todos no mesmo processo.\n\n**Quando usar:**\n- Times pequenos (1 a 10 desenvolvedores)\n- Produto em fase inicial: voce ainda nao sabe o que o sistema vai precisar ser\n- Dominio ainda nao esta bem entendido: separar cedo demais cria fronteiras erradas\n\n**Pros:**\n- Simples de desenvolver e testar localmente\n- Uma unica base de codigo, um unico deploy\n- Chamadas entre modulos sao chamadas de funcao (rapidas e simples)\n- Facil de fazer refactoring: voce ve o impacto inteiro\n\n**Contras:**\n- Escala como um todo: nao da para escalar so a parte que precisa\n- Um bug pode derrubar tudo\n- Com o tempo, pode virar um "monolito big ball of mud" se nao houver disciplina\n- Conflitos de merge frequentes em times grandes',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'monolito_estruturado.py',
        code: `# Monolito bem estruturado: modulos separados, mas rodando no mesmo processo
# A estrutura interna e organizada, mesmo sendo um unico sistema

# modulo: usuarios
class UsuarioServico:
    def __init__(self, repositorio):
        self.repositorio = repositorio

    def registrar(self, nome, email):
        usuario = {"nome": nome, "email": email, "ativo": True}
        self.repositorio.salvar(usuario)
        return usuario

# modulo: pedidos
class PedidoServico:
    def __init__(self, repositorio, usuario_servico):
        self.repositorio = repositorio
        self.usuario_servico = usuario_servico

    def criar_pedido(self, usuario_id, itens):
        # Chamada direta entre modulos: rapida e simples
        usuario = self.usuario_servico.repositorio.buscar(usuario_id)
        if not usuario or not usuario["ativo"]:
            raise ValueError("Usuario invalido ou inativo")
        pedido = {"usuario_id": usuario_id, "itens": itens, "status": "criado"}
        self.repositorio.salvar(pedido)
        return pedido

# modulo: pagamentos
class PagamentoServico:
    def processar(self, pedido, valor):
        print(f"Processando pagamento de R\${valor:.2f} para pedido {pedido}")
        return {"status": "aprovado", "valor": valor}

# Ponto de entrada unico: um processo, tudo junto
class AplicacaoMonolito:
    def __init__(self):
        # Todos os servicos inicializados juntos no mesmo processo
        self.usuario_servico = UsuarioServico(RepositorioMemoria())
        self.pedido_servico = PedidoServico(RepositorioMemoria(), self.usuario_servico)
        self.pagamento_servico = PagamentoServico()

class RepositorioMemoria:
    def __init__(self):
        self._dados = {}
        self._contador = 0

    def salvar(self, entidade):
        self._contador += 1
        entidade["id"] = self._contador
        self._dados[self._contador] = entidade
        return entidade

    def buscar(self, id_entidade):
        return self._dados.get(id_entidade)

# Deploy: python app.py — um processo, tudo funcionando
app = AplicacaoMonolito()`,
        description: 'Monolito bem estruturado com modulos separados internamente. Um deploy, um processo, chamadas diretas entre modulos.',
      },
    },
    {
      type: 'text',
      content: '## Microservicos: independencia com complexidade\n\nNa arquitetura de microservicos, o sistema e dividido em **servicos pequenos e independentes**, cada um com sua propria base de codigo, banco de dados e processo de deploy.\n\n**Cada servico:**\n- Tem uma responsabilidade clara e limitada\n- Pode ser deployado sem afetar os outros\n- Pode ser escrito em linguagens diferentes\n- Se comunica via API HTTP (REST/gRPC) ou mensageria\n\n**Pros:**\n- Escala independente: o servico de busca pode ter mais recursos que o de autenticacao\n- Times autonomos: cada time cuida do seu servico\n- Falha isolada: se o servico de recomendacao cai, o checkout ainda funciona\n- Tecnologias diferentes por servico\n\n**Contras:**\n- Complexidade operacional enorme: monitoramento, rede, discovery, autenticacao entre servicos\n- Comunicacao via rede e mais lenta e pode falhar\n- Transacoes distribuidas sao muito dificeis\n- Requer maturidade de infraestrutura (containers, orquestracao, CI/CD)\n\n**Regra de ouro:** nao comece com microservicos. Comece com um monolito bem estruturado e extraia servicos quando a necessidade for clara.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'microservicos_comunicacao.py',
        code: `# Simulacao de comunicacao entre microservicos via HTTP
# Na pratica, cada classe abaixo seria um processo/container separado

import json

# --- SERVICO DE USUARIOS (porta 8001) ---
class ServicoUsuarios:
    """Responsabilidade unica: gerenciar usuarios. Deploy independente."""

    def __init__(self):
        self._usuarios = {
            1: {"id": 1, "nome": "Ana", "email": "ana@email.com", "ativo": True}
        }

    def get_usuario(self, usuario_id):
        # GET /usuarios/{id}
        usuario = self._usuarios.get(usuario_id)
        if not usuario:
            return {"erro": "Usuario nao encontrado"}, 404
        return usuario, 200


# --- SERVICO DE PEDIDOS (porta 8002) ---
class ServicoPedidos:
    """Responsabilidade unica: gerenciar pedidos. Deploy independente."""

    def __init__(self, cliente_usuarios):
        self._pedidos = {}
        self._contador = 0
        self.cliente_usuarios = cliente_usuarios  # cliente HTTP para o servico de usuarios

    def criar_pedido(self, usuario_id, itens):
        # Comunicacao via rede: mais lenta, pode falhar
        usuario, status = self.cliente_usuarios.get_usuario(usuario_id)
        if status != 200:
            return {"erro": "Usuario invalido"}, 400
        if not usuario["ativo"]:
            return {"erro": "Usuario inativo"}, 400

        self._contador += 1
        pedido = {"id": self._contador, "usuario_id": usuario_id, "itens": itens}
        self._pedidos[self._contador] = pedido
        return pedido, 201


# --- CLIENTE HTTP (abstrai a comunicacao de rede) ---
class ClienteServicoUsuarios:
    """Abstrai as chamadas HTTP para o servico de usuarios."""

    def __init__(self, servico_usuarios):
        # Em producao: seria requests.get("http://usuarios-service:8001/usuarios/{id}")
        self.servico = servico_usuarios

    def get_usuario(self, usuario_id):
        return self.servico.get_usuario(usuario_id)


# Simulando os dois servicos rodando
servico_usuarios = ServicoUsuarios()
cliente_usuarios = ClienteServicoUsuarios(servico_usuarios)
servico_pedidos = ServicoPedidos(cliente_usuarios)

# Criando um pedido: ServicoPedidos chama ServicoUsuarios via "rede"
pedido, status = servico_pedidos.criar_pedido(1, [{"produto": "Livro", "qtd": 2}])
print(f"Status: {status}, Pedido: {pedido}")
# O ponto critico: se ServicoUsuarios estiver fora, ServicoPedidos falha
# Em microservicos, voce precisa lidar com isso (circuit breaker, retry, fallback)`,
        description: 'Microservicos se comunicam via rede. Cada servico e independente, mas a comunicacao adiciona latencia e possibilidade de falha.',
      },
    },
    {
      type: 'text',
      content: '## Serverless: funcoes sob demanda\n\nNo modelo serverless, voce nao gerencia servidores. Voce escreve **funcoes** que sao executadas em resposta a **eventos** (requisicao HTTP, mensagem em fila, upload de arquivo) e paga apenas pelo tempo de execucao.\n\n**Caracteristicas:**\n- Escala automatica: de zero a milhares de execucoes em segundos\n- Sem gerenciamento de infraestrutura\n- Modelo de cobranca por execucao (nao por servidor rodando 24h)\n\n**Casos de uso ideais:**\n- Processamento de eventos: redimensionar imagem no upload\n- APIs com trafego muito variavel\n- Tarefas agendadas (cron jobs)\n- Backends simples com picos imprevistos\n\n**Limitacoes importantes:**\n- **Cold start**: a primeira execucao apos um periodo inativo e mais lenta (a funcao precisa ser carregada)\n- Execucao tem limite de tempo (ex: 15 minutos no AWS Lambda)\n- Estado nao persiste entre execucoes: cada chamada comeca do zero\n- Dificulta testes locais e debugging\n- Pode ser caro para workloads constantes e previsivos',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'serverless_funcoes.py',
        code: `# Modelo serverless: funcoes estateless ativadas por eventos
# Cada funcao e independente, sem estado entre execucoes

# --- FUNCAO 1: Processamento de novo usuario ---
def lambda_novo_usuario(event, context):
    """
    Ativada por: POST /usuarios
    Evento: {"nome": "Ana", "email": "ana@email.com"}
    """
    dados = event.get("body", {})
    nome = dados.get("nome")
    email = dados.get("email")

    if not nome or not email:
        return {"statusCode": 400, "body": {"erro": "Nome e email sao obrigatorios"}}

    # Salva no banco (a funcao nao guarda estado; o banco sim)
    usuario_id = salvar_usuario_banco(nome, email)

    # Publica evento para outras funcoes processarem
    publicar_evento("usuario_criado", {"id": usuario_id, "email": email})

    return {"statusCode": 201, "body": {"id": usuario_id, "mensagem": "Usuario criado"}}


# --- FUNCAO 2: Envio de email de boas-vindas ---
def lambda_email_boas_vindas(event, context):
    """
    Ativada por: evento 'usuario_criado' na fila
    Completamente separada da criacao do usuario
    """
    usuario = event.get("detail", {})
    email = usuario.get("email")

    enviar_email(email, "Bem-vindo!", "Sua conta foi criada com sucesso.")
    return {"status": "email_enviado", "destinatario": email}


# --- FUNCAO 3: Geracao de relatorio (agendada) ---
def lambda_relatorio_diario(event, context):
    """
    Ativada por: cron - todo dia as 08:00
    Nao recebe input do usuario, age sobre o estado do banco
    """
    # Cada execucao comeca do zero: sem cache, sem estado em memoria
    usuarios_novos = contar_usuarios_ultimas_24h()
    pedidos_hoje = contar_pedidos_hoje()

    relatorio = {
        "data": "2026-03-29",
        "novos_usuarios": usuarios_novos,
        "pedidos": pedidos_hoje,
    }

    salvar_relatorio(relatorio)
    return {"status": "relatorio_gerado", "dados": relatorio}


# Funcoes auxiliares (simuladas)
def salvar_usuario_banco(nome, email):
    print(f"[DB] Salvando {nome} <{email}>")
    return 42  # ID gerado

def publicar_evento(tipo, dados):
    print(f"[EVENTO] {tipo}: {dados}")

def enviar_email(dest, assunto, corpo):
    print(f"[EMAIL] Para: {dest} | {assunto}")

def contar_usuarios_ultimas_24h():
    return 17

def contar_pedidos_hoje():
    return 83

def salvar_relatorio(dados):
    print(f"[DB] Relatorio salvo: {dados}")

# Simulando execucao das funcoes
print("=== Criando usuario ===")
resp = lambda_novo_usuario({"body": {"nome": "Ana", "email": "ana@co.com"}}, {})
print(resp)

print("\\n=== Enviando email ===")
lambda_email_boas_vindas({"detail": {"email": "ana@co.com"}}, {})

print("\\n=== Relatorio diario ===")
lambda_relatorio_diario({}, {})`,
        description: 'Funcoes serverless sao estateless: cada execucao comeca do zero. O estado persiste apenas em bancos externos.',
      },
    },
    {
      type: 'text',
      content: '## Como escolher o estilo certo\n\nA decisao depende de tres fatores principais:\n\n**1. Tamanho e maturidade do time**\n- Time pequeno e iniciante: monolito. Microservicos exigem disciplina de infraestrutura que consome tempo valioso.\n- Time grande com squads autonomas: microservicos permitem que cada time trabalhe de forma independente.\n\n**2. Estagio do produto**\n- Pre-product market fit (ainda validando): monolito. Voce vai mudar muito o dominio; fronteiras de microservicos erradas custariam caro para corrigir.\n- Produto maduro com dominios bem definidos: considere extrair servicos quando fizer sentido.\n\n**3. Natureza do workload**\n- Trafego previsivel e constante: monolito ou microservicos dedicados.\n- Trafego muito variavel com picos imprevistos: serverless se encaixa bem.\n- Processamento de eventos assincronos (imagens, emails, relatorios): serverless e excelente.\n\n**Regra pratica:** comece simples. Monolito bem estruturado e mais facil de manter do que microservicos mal projetados. Evolua a arquitetura quando a necessidade for real, nao hipotetica.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Martin Fowler tem uma frase famosa: "Nao comece com microservicos. Comece com um monolito, e extraia microservicos quando as fronteiras ficarem claras." A maioria das startups que tentaram microservicos desde o inicio voltou para o monolito depois de sentir a complexidade operacional.',
    },
  ],
  challenges: [
    {
      id: 'estilos-challenge-1',
      title: 'Modelar a Decisao Arquitetural',
      description: 'Dado dois cenarios diferentes, voce deve criar uma classe DecisaoArquitetural que modela a escolha e justifica o motivo em comentarios. Cenario A: startup de 3 pessoas validando um produto de e-commerce. Cenario B: empresa com 200 devs e 50 servicos diferentes que precisam escalar independentemente.',
      language: 'python',
      starterCode: `# Modele a decisao arquitetural para cada cenario
# Use comentarios explicando o raciocinio

class DecisaoArquitetural:
    def __init__(self, cenario, estilo_escolhido, justificativas, riscos):
        self.cenario = cenario
        self.estilo_escolhido = estilo_escolhido  # 'monolito' | 'microservicos' | 'serverless'
        self.justificativas = justificativas  # lista de strings
        self.riscos = riscos  # lista de strings

    def resumo(self):
        print(f"Cenario: {self.cenario}")
        print(f"Estilo: {self.estilo_escolhido}")
        print("Justificativas:")
        for j in self.justificativas:
            print(f"  + {j}")
        print("Riscos aceitos:")
        for r in self.riscos:
            print(f"  - {r}")
        print()

# TODO: Instancie DecisaoArquitetural para os dois cenarios abaixo:

# Cenario A: Startup early-stage
# - Time de 3 pessoas
# - Produto ainda sendo validado com usuarios reais
# - Sem infraestrutura dedicada
# - Prazo curto para MVP
decisao_startup = None  # substitua por DecisaoArquitetural(...)

# Cenario B: Empresa grande
# - 200 desenvolvedores em 20 squads
# - 50 dominios diferentes (pagamentos, logistica, catalogo, etc.)
# - Cada area precisa escalar e deployar de forma independente
# - Ja possui infraestrutura de containers e orquestracao
decisao_empresa = None  # substitua por DecisaoArquitetural(...)

# Quando correto:
# decisao_startup.resumo()
# decisao_empresa.resumo()
`,
      solution: `# Solucao: modelando decisoes arquiteturais com justificativas claras

class DecisaoArquitetural:
    def __init__(self, cenario, estilo_escolhido, justificativas, riscos):
        self.cenario = cenario
        self.estilo_escolhido = estilo_escolhido
        self.justificativas = justificativas
        self.riscos = riscos

    def resumo(self):
        print(f"Cenario: {self.cenario}")
        print(f"Estilo escolhido: {self.estilo_escolhido.upper()}")
        print("Justificativas:")
        for j in self.justificativas:
            print(f"  + {j}")
        print("Riscos aceitos:")
        for r in self.riscos:
            print(f"  - {r}")
        print()


# Cenario A: startup early-stage escolhe MONOLITO
decisao_startup = DecisaoArquitetural(
    cenario="Startup de 3 pessoas validando e-commerce MVP",
    estilo_escolhido="monolito",
    justificativas=[
        "Time pequeno: microservicos exigiriam infraestrutura que consumiria tempo de produto",
        "Dominio ainda nao esta bem entendido: fronteiras erradas seriam caras de corrigir",
        "Velocidade de iteracao: um unico deploy acelera o ciclo de feedback",
        "Custo operacional baixo: um servidor ao inves de dezenas de servicos",
        "Mais facil de contratar: qualquer desenvolvedor Python/Django/FastAPI se adapta",
    ],
    riscos=[
        "Se o produto crescer muito rapidamente, pode ser necessario extrair servicos depois",
        "Toda a aplicacao para se um bug critico for deployado",
        "Com o tempo, exige disciplina para nao virar codigo espaguete",
    ],
)

# Cenario B: empresa grande escolhe MICROSERVICOS
decisao_empresa = DecisaoArquitetural(
    cenario="Empresa com 200 devs e 50 dominios distintos",
    estilo_escolhido="microservicos",
    justificativas=[
        "20 squads autonomas: cada time pode deployar sem depender dos outros",
        "Escala independente: servico de busca precisa de mais recursos que o de autenticacao",
        "Isolamento de falhas: problema no servico de recomendacao nao derruba o checkout",
        "Dominios bem definidos apos anos de produto: fronteiras sao claras",
        "Infraestrutura ja existe: Kubernetes, CI/CD por servico, monitoramento centralizado",
    ],
    riscos=[
        "Complexidade operacional alta: requer SRE e DevOps dedicados",
        "Transacoes distribuidas sao complexas: requer sagas ou eventos compensatorios",
        "Latencia de rede entre servicos adiciona overhead",
        "Debugging distribuido e muito mais dificil que em monolito",
    ],
)

decisao_startup.resumo()
decisao_empresa.resumo()
`,
      hints: [
        'Para a startup, pense nos fatores: quantas pessoas estao no time? O dominio esta estavel? O foco e velocidade ou escala?',
        'Para a empresa grande, pense: cada time precisa deployar de forma independente? Os dominios sao bem delimitados? Ha infraestrutura para suportar microservicos?',
        'Nao esqueça de listar os riscos que voce esta ACEITANDO com a decisao, nao apenas os beneficios. Toda escolha tem trade-offs.',
      ],
    },
  ],
};
