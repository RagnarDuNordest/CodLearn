import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'event-driven',
  moduleId: 'arquitetura-software',
  title: 'Arquitetura Orientada a Eventos',
  description: 'Entenda como sistemas desacoplados se comunicam por meio de eventos, aprenda os padroes Pub/Sub e filas, e saiba quando essa abordagem resolve problemas reais.',
  order: 8,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## O que e arquitetura orientada a eventos?\n\nImagine que voce faz um pedido em um e-commerce. Assim que o pedido e confirmado, varias coisas precisam acontecer: o estoque deve ser reservado, um email de confirmacao deve ser enviado, o sistema de logistica deve ser acionado e o relatorio de vendas deve ser atualizado.\n\nVoce poderia fazer isso de forma **sincrona**: o endpoint que confirma o pedido chama diretamente o estoque, depois o email, depois a logistica, depois o relatorio. Funciona — mas cria um acoplamento forte: qualquer um desses sistemas fora do ar derruba a confirmacao do pedido inteiro.\n\nA **arquitetura orientada a eventos** resolve isso: quando o pedido e confirmado, o sistema publica um evento "pedido_confirmado". Os outros sistemas **escutam** esse evento de forma independente. O servico de confirmacao de pedido nao sabe quem vai reagir, nem quando, nem em qual ordem.',
    },
    {
      type: 'text',
      content: '## Eventos vs chamadas diretas: desacoplamento temporal\n\n**Chamadas diretas (acoplamento forte):**\n- A e manda uma mensagem para B e espera a resposta\n- A precisa saber o endereco de B (URL, metodo, contrato)\n- Se B esta fora do ar, A falha\n- A e B precisam estar disponiveis ao mesmo tempo\n\n**Eventos (desacoplamento temporal):**\n- A publica um evento em um canal central\n- B, C e D escutam o canal e reagem quando conveniente\n- A nao sabe quem vai reagir (pode ser ninguem, pode ser 10 sistemas)\n- Se B esta fora do ar, o evento fica na fila ate B se recuperar\n- A e B nao precisam estar disponiveis simultaneamente\n\nO desacoplamento temporal e o principal beneficio: o produtor do evento nao espera pelos consumidores.',
    },
    {
      type: 'text',
      content: '## Pub/Sub: publicadores, subscribers e topicos\n\nO padrao **Publish/Subscribe** (Pub/Sub) organiza a comunicacao por eventos em tres elementos:\n\n**Publicador (Publisher):** publica eventos em um topico sem saber quem vai receber.\n\n**Topico:** canal nomeado onde os eventos sao depositados. Ex: "pedido.confirmado", "usuario.cadastrado", "pagamento.aprovado".\n\n**Subscriber:** qualquer sistema que assina um topico. Pode haver zero, um ou muitos subscribers para o mesmo topico.\n\n**Caracteristica-chave do Pub/Sub:** e broadcast. Se nenhum subscriber estiver inscrito, o evento se perde. Se cinco subscribers estiverem inscritos, todos recebem uma copia.\n\nExemplos de uso: notificacoes em tempo real, sincronizacao entre microservicos, logs centralizados.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'pubsub_simples.py',
        code: `# Implementacao de Pub/Sub em Python puro
# Em producao: RabbitMQ, Apache Kafka, Google Pub/Sub, AWS SNS

class EventBus:
    """Canal central de eventos. Conecta publicadores e subscribers."""

    def __init__(self):
        self._subscribers = {}  # topico -> lista de handlers

    def subscribe(self, topico: str, handler):
        """Registra um handler para um topico."""
        if topico not in self._subscribers:
            self._subscribers[topico] = []
        self._subscribers[topico].append(handler)
        print(f"[BUS] Novo subscriber em '{topico}': {handler.__name__}")

    def publish(self, topico: str, evento: dict):
        """Publica um evento. Todos os subscribers do topico sao notificados."""
        print(f"\\n[BUS] Publicando evento em '{topico}': {evento}")
        handlers = self._subscribers.get(topico, [])
        if not handlers:
            print(f"[BUS] Nenhum subscriber para '{topico}'")
            return
        for handler in handlers:
            handler(evento)


# --- PUBLICADOR: Servico de Pedidos ---
class ServicoPedidos:
    def __init__(self, bus: EventBus):
        self.bus = bus

    def confirmar_pedido(self, pedido_id: int, cliente_email: str, total: float):
        # Logica de negocio: confirmar pedido
        print(f"\\n[PEDIDOS] Pedido #{pedido_id} confirmado. Total: R\${total:.2f}")

        # Publica evento: nao sabe quem vai reagir
        self.bus.publish("pedido.confirmado", {
            "pedido_id": pedido_id,
            "cliente_email": cliente_email,
            "total": total,
        })

        # Retorna imediatamente, sem esperar os outros sistemas
        return {"status": "confirmado", "pedido_id": pedido_id}


# --- SUBSCRIBERS: cada sistema reage de forma independente ---

def handler_email_confirmacao(evento: dict):
    """Subscriber 1: envia email de confirmacao."""
    print(f"[EMAIL] Enviando confirmacao para {evento['cliente_email']}: "
          f"Pedido #{evento['pedido_id']} confirmado!")

def handler_reserva_estoque(evento: dict):
    """Subscriber 2: reserva itens no estoque."""
    print(f"[ESTOQUE] Reservando itens para pedido #{evento['pedido_id']}")

def handler_logistica(evento: dict):
    """Subscriber 3: agenda coleta com transportadora."""
    print(f"[LOGISTICA] Agendando coleta para pedido #{evento['pedido_id']}")

def handler_analytics(evento: dict):
    """Subscriber 4: registra no sistema de analytics."""
    print(f"[ANALYTICS] Venda de R\${evento['total']:.2f} registrada")


# --- CONFIGURACAO DO SISTEMA ---
bus = EventBus()

# Cada sistema se inscreve nos topicos de seu interesse
bus.subscribe("pedido.confirmado", handler_email_confirmacao)
bus.subscribe("pedido.confirmado", handler_reserva_estoque)
bus.subscribe("pedido.confirmado", handler_logistica)
bus.subscribe("pedido.confirmado", handler_analytics)

# --- EXECUCAO ---
servico = ServicoPedidos(bus)

# Confirmar um pedido dispara TODOS os subscribers automaticamente
resultado = servico.confirmar_pedido(101, "ana@email.com", 350.00)
print(f"\\n[RESULTADO] {resultado}")

# Adicionar um novo subscriber e trivial: nenhum codigo existente muda
def handler_cupom_fidelidade(evento: dict):
    """Subscriber 5 (adicionado depois): gera cupom de fidelidade."""
    if evento["total"] > 300:
        print(f"[FIDELIDADE] Gerando cupom 10% para {evento['cliente_email']}")

bus.subscribe("pedido.confirmado", handler_cupom_fidelidade)
servico.confirmar_pedido(102, "bruno@email.com", 500.00)`,
        description: 'EventBus central: publicadores nao sabem quem escuta. Adicionar novos subscribers nao requer alterar o publicador.',
      },
    },
    {
      type: 'text',
      content: '## Filas: produtores, consumidores e processamento assincrono\n\nEnquanto Pub/Sub e broadcast (todos os subscribers recebem o evento), **filas** funcionam com o padrao de competicao: varios consumidores disputam as mensagens da fila, mas **cada mensagem e processada por apenas um consumidor**.\n\n**Fila (Queue):**\n- Produtor envia uma tarefa para a fila\n- A tarefa fica na fila ate um consumidor estar disponivel\n- O consumidor processa e confirma (acknowledge) a mensagem\n- Se o consumidor falhar, a mensagem volta para a fila\n\n**Casos de uso:**\n- Processamento de pagamentos (cada pagamento processado uma vez)\n- Envio em massa de emails (distribuir o trabalho entre varios workers)\n- Processamento de imagens (redimensionar, converter)\n- Tarefas demoradas que nao podem bloquear a resposta HTTP\n\n**Quando usar eventos vs filas:**\n- Eventos/Pub/Sub: notificacoes, sincronizacao, nao importa quantos reagem\n- Filas: tarefas que devem ser executadas exatamente uma vez, com garantia de entrega',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'A arquitetura orientada a eventos resolve acoplamento, mas cria nova complexidade: como debugar um fluxo que passa por 5 sistemas via eventos? Como garantir que todos os subscribers processaram? Como lidar com eventos fora de ordem? Ferramentas como distributed tracing (Jaeger, Zipkin) e event sourcing ajudam, mas a observabilidade precisa ser planejada.',
    },
  ],
  challenges: [
    {
      id: 'event-driven-challenge-1',
      title: 'Implementar Sistema de Pub/Sub com Simulacao de Pedido',
      description: 'Implemente um EventBus completo com suporte a subscribe e publish, e simule o ciclo de vida de um pedido publicando eventos em sequencia: "pedido.criado", "pagamento.aprovado" e "pedido.enviado". Cada evento deve ter ao menos dois subscribers reagindo.',
      language: 'python',
      starterCode: `# Implemente o EventBus e simule o ciclo de vida de um pedido

class EventBus:
    def __init__(self):
        # TODO: estrutura para guardar subscribers por topico
        pass

    def subscribe(self, topico: str, handler):
        # TODO: registrar handler para o topico
        pass

    def publish(self, topico: str, evento: dict):
        # TODO: chamar todos os handlers registrados para o topico
        pass


# --- HANDLERS para "pedido.criado" ---
def ao_criar_pedido_email(evento):
    # TODO: simular envio de email "Recebemos seu pedido"
    pass

def ao_criar_pedido_reservar_estoque(evento):
    # TODO: simular reserva de estoque
    pass


# --- HANDLERS para "pagamento.aprovado" ---
def ao_aprovar_pagamento_confirmar(evento):
    # TODO: simular confirmacao do pedido
    pass

def ao_aprovar_pagamento_nota_fiscal(evento):
    # TODO: simular emissao de nota fiscal
    pass


# --- HANDLERS para "pedido.enviado" ---
def ao_enviar_pedido_email(evento):
    # TODO: simular email com codigo de rastreio
    pass

def ao_enviar_pedido_atualizar_status(evento):
    # TODO: simular atualizacao de status no banco
    pass


# --- CONFIGURACAO E SIMULACAO ---
bus = EventBus()

# TODO: registre os handlers nos topicos corretos

# TODO: simule o ciclo de vida completo de um pedido:
# 1. Pedido criado (pedido_id=42, cliente="Ana", total=199.90)
# 2. Pagamento aprovado (pedido_id=42, metodo="cartao", valor=199.90)
# 3. Pedido enviado (pedido_id=42, rastreio="BR123456789")
`,
      solution: `# Solucao: EventBus completo com simulacao de ciclo de vida

class EventBus:
    def __init__(self):
        self._subscribers = {}

    def subscribe(self, topico: str, handler):
        if topico not in self._subscribers:
            self._subscribers[topico] = []
        self._subscribers[topico].append(handler)

    def publish(self, topico: str, evento: dict):
        print(f"\\n--- Evento: '{topico}' ---")
        print(f"    Dados: {evento}")
        handlers = self._subscribers.get(topico, [])
        if not handlers:
            print("    (nenhum subscriber)")
        for handler in handlers:
            handler(evento)


# --- HANDLERS para "pedido.criado" ---
def ao_criar_pedido_email(evento):
    print(f"[EMAIL] Ola! Recebemos seu pedido #{evento['pedido_id']}. Total: R\${evento['total']:.2f}")

def ao_criar_pedido_reservar_estoque(evento):
    print(f"[ESTOQUE] Reservando itens para pedido #{evento['pedido_id']}")


# --- HANDLERS para "pagamento.aprovado" ---
def ao_aprovar_pagamento_confirmar(evento):
    print(f"[PEDIDOS] Pedido #{evento['pedido_id']} confirmado apos pagamento via {evento['metodo']}")

def ao_aprovar_pagamento_nota_fiscal(evento):
    print(f"[FISCAL] Emitindo nota fiscal de R\${evento['valor']:.2f} para pedido #{evento['pedido_id']}")


# --- HANDLERS para "pedido.enviado" ---
def ao_enviar_pedido_email(evento):
    print(f"[EMAIL] Seu pedido #{evento['pedido_id']} foi enviado! Rastreio: {evento['rastreio']}")

def ao_enviar_pedido_atualizar_status(evento):
    print(f"[BANCO] Atualizando status do pedido #{evento['pedido_id']} para 'enviado'")


# --- CONFIGURACAO ---
bus = EventBus()
bus.subscribe("pedido.criado", ao_criar_pedido_email)
bus.subscribe("pedido.criado", ao_criar_pedido_reservar_estoque)
bus.subscribe("pagamento.aprovado", ao_aprovar_pagamento_confirmar)
bus.subscribe("pagamento.aprovado", ao_aprovar_pagamento_nota_fiscal)
bus.subscribe("pedido.enviado", ao_enviar_pedido_email)
bus.subscribe("pedido.enviado", ao_enviar_pedido_atualizar_status)


# --- SIMULACAO DO CICLO DE VIDA COMPLETO ---
print("====== SIMULACAO: ciclo de vida do pedido #42 ======")

# Passo 1: cliente finaliza o checkout
bus.publish("pedido.criado", {
    "pedido_id": 42,
    "cliente": "Ana",
    "email": "ana@email.com",
    "total": 199.90,
})

# Passo 2: gateway de pagamento confirma
bus.publish("pagamento.aprovado", {
    "pedido_id": 42,
    "metodo": "cartao",
    "valor": 199.90,
})

# Passo 3: logistica despacha o pedido
bus.publish("pedido.enviado", {
    "pedido_id": 42,
    "rastreio": "BR123456789",
    "transportadora": "Correios",
})

print("\\n====== Ciclo completo! ======")
`,
      hints: [
        'O EventBus precisa de um dicionario que mapeia topico -> lista de handlers. No subscribe, acrescente o handler a essa lista.',
        'No publish, percorra a lista de handlers para o topico e chame cada um passando o evento como argumento.',
        'Simule os tres eventos em sequencia: "pedido.criado", "pagamento.aprovado" e "pedido.enviado". Cada um com dados relevantes no dicionario.',
      ],
    },
  ],
};
