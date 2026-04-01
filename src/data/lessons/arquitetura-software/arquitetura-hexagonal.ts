import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'arquitetura-hexagonal',
  moduleId: 'arquitetura-software',
  title: 'Arquitetura Hexagonal: Ports & Adapters',
  description: 'Aprenda a separar a logica de negocio da infraestrutura usando Ports & Adapters, tornando seu sistema testavel, flexivel e facil de evoluir.',
  order: 7,
  estimatedMinutes: 35,
  sections: [
    {
      type: 'text',
      content: '## O problema: logica de negocio presa na infraestrutura\n\nImagine um sistema de notificacoes onde a regra de negocio ("notificar o usuario quando um pedido for aprovado") esta misturada diretamente com o codigo que envia emails via SMTP. O que acontece quando voce precisa:\n- Adicionar envio por SMS?\n- Testar as regras sem disparar emails reais?\n- Trocar de provedor de email?\n\nVoce precisaria mexer no coracao do sistema toda vez. Isso e o acoplamento entre logica de negocio e infraestrutura — um dos maiores inimigos da manutencao.\n\nA **Arquitetura Hexagonal** (tambem chamada de Ports & Adapters), criada por Alistair Cockburn em 2005, resolve exatamente esse problema. A ideia central e: **o nucleo de negocio nao deve saber como ele e chamado nem como ele chama outros sistemas.**',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'A arquitetura e chamada de "hexagonal" nao por ter 6 lados importantes, mas porque o hexagono e uma boa forma para desenhar o nucleo no centro com multiplas conexoes ao redor. O nome tecnico e Ports & Adapters, que descreve melhor o mecanismo.',
    },
    {
      type: 'text',
      content: '## Ports & Adapters: o mecanismo\n\nA arquitetura e dividida em tres camadas:\n\n**1. Nucleo de dominio (o hexagono)**\nContem toda a logica de negocio. Nao tem imports de frameworks, bancos de dados, HTTP ou qualquer infraestrutura. E puro Python (ou qualquer linguagem).\n\n**2. Ports (interfaces/contratos)**\nSao as "portas" do hexagono — contratos que definem como o nucleo se comunica com o mundo externo. Ha dois tipos:\n- **Driving ports** (primarias): como o mundo externo aciona o nucleo (ex: interface de um use case que uma API REST chama)\n- **Driven ports** (secundarias): como o nucleo aciona o mundo externo (ex: interface de repositorio que o nucleo usa para salvar dados)\n\n**3. Adapters (implementacoes)**\nSao as implementacoes concretas das ports. Conectam o nucleo ao mundo real:\n- Adapter de banco de dados (implementa o repositorio port)\n- Adapter de email (implementa o notificador port)\n- Adapter de API REST (chama o use case port)\n- Adapter de testes (implementacao falsa para testes)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'ports_adapters_notificacao.py',
        code: `# Arquitetura Hexagonal: servico de notificacao com Ports & Adapters

# ============================================================
# PORTS (interfaces — o contrato que o nucleo define)
# ============================================================

class NotificadorPort:
    """Port secundaria: como o nucleo envia notificacoes."""
    def enviar(self, destinatario: str, mensagem: str) -> bool:
        raise NotImplementedError

class PedidoRepositorioPort:
    """Port secundaria: como o nucleo busca e salva pedidos."""
    def buscar(self, pedido_id: int) -> dict:
        raise NotImplementedError

    def atualizar_status(self, pedido_id: int, status: str):
        raise NotImplementedError


# ============================================================
# NUCLEO DE DOMINIO (logica pura, zero imports de infra)
# ============================================================

class ServicoAprovacaoPedido:
    """
    Nucleo de negocio: logica de aprovacao de pedidos.
    Nao sabe se a notificacao vai por email, SMS ou nenhum canal.
    Nao sabe se o banco e MySQL, Postgres ou memoria.
    """
    def __init__(self, repositorio: PedidoRepositorioPort, notificador: NotificadorPort):
        self.repositorio = repositorio
        self.notificador = notificador

    def aprovar(self, pedido_id: int) -> dict:
        pedido = self.repositorio.buscar(pedido_id)
        if not pedido:
            raise ValueError(f"Pedido {pedido_id} nao encontrado")
        if pedido["status"] != "pendente":
            raise ValueError(f"Pedido {pedido_id} nao esta pendente")

        # Regra de negocio: aprovar e notificar
        self.repositorio.atualizar_status(pedido_id, "aprovado")
        mensagem = f"Seu pedido #{pedido_id} foi aprovado! Total: R\${pedido['total']:.2f}"
        self.notificador.enviar(pedido["email_cliente"], mensagem)

        return {"pedido_id": pedido_id, "status": "aprovado"}


# ============================================================
# ADAPTERS (implementacoes concretas das ports)
# ============================================================

# Adapter 1: Email real
class EmailSMTPAdapter(NotificadorPort):
    def __init__(self, servidor_smtp):
        self.servidor = servidor_smtp

    def enviar(self, destinatario: str, mensagem: str) -> bool:
        # Em producao: conectaria ao SMTP real
        print(f"[SMTP] Enviando email para {destinatario}: {mensagem}")
        return True

# Adapter 2: SMS
class SMSAdapter(NotificadorPort):
    def __init__(self, api_key):
        self.api_key = api_key

    def enviar(self, destinatario: str, mensagem: str) -> bool:
        print(f"[SMS] Enviando para {destinatario}: {mensagem}")
        return True

# Adapter 3: Falso (para testes)
class NotificadorFakeAdapter(NotificadorPort):
    def __init__(self):
        self.notificacoes = []

    def enviar(self, destinatario: str, mensagem: str) -> bool:
        self.notificacoes.append({"para": destinatario, "mensagem": mensagem})
        return True

# Adapter 4: Repositorio em memoria (para testes)
class PedidoRepositorioMemoria(PedidoRepositorioPort):
    def __init__(self):
        self._dados = {
            1: {"id": 1, "status": "pendente", "total": 250.0, "email_cliente": "ana@email.com"},
            2: {"id": 2, "status": "aprovado", "total": 80.0, "email_cliente": "bruno@email.com"},
        }

    def buscar(self, pedido_id: int) -> dict:
        return self._dados.get(pedido_id)

    def atualizar_status(self, pedido_id: int, status: str):
        if pedido_id in self._dados:
            self._dados[pedido_id]["status"] = status


# ============================================================
# COMPOSICAO: conecta nucleo com adapters
# ============================================================

# Em producao: usa email real
repositorio = PedidoRepositorioMemoria()
notificador_email = EmailSMTPAdapter("smtp.empresa.com")
servico_prod = ServicoAprovacaoPedido(repositorio, notificador_email)
resultado = servico_prod.aprovar(1)
print(f"Resultado producao: {resultado}")

# Para trocar para SMS: so muda o adapter!
notificador_sms = SMSAdapter("api-key-123")
servico_sms = ServicoAprovacaoPedido(repositorio, notificador_sms)

# Em testes: usa adapters falsos, sem infraestrutura real
notificador_fake = NotificadorFakeAdapter()
servico_teste = ServicoAprovacaoPedido(PedidoRepositorioMemoria(), notificador_fake)
servico_teste.aprovar(1)
print(f"Notificacoes capturadas no teste: {notificador_fake.notificacoes}")`,
        description: 'O nucleo de negocio (ServicoAprovacaoPedido) nao sabe nada sobre email ou banco. Os adapters conectam o nucleo ao mundo real.',
      },
    },
    {
      type: 'text',
      content: '## Trocar infraestrutura sem tocar na logica\n\nO maior beneficio pratico da arquitetura hexagonal e a capacidade de **trocar toda a infraestrutura sem alterar uma linha da logica de negocio**.\n\nExemplos reais:\n- **Banco de dados**: comecar com SQLite em desenvolvimento, usar PostgreSQL em producao, e usar um dicionario em memoria nos testes — o nucleo nao muda.\n- **Fila de mensagens**: comecar com RabbitMQ, migrar para Kafka — o nucleo so conhece o port, nao o adapter.\n- **Autenticacao**: trocar de JWT para OAuth — o adapter muda, o nucleo nao.\n\nIsso tambem torna os testes muito mais rapidos e confiables: voce testa a logica de negocio com adapters em memoria, sem precisar de banco de dados, servidor de email ou qualquer infraestrutura externa.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Uma regra simples para saber se voce esta aplicando bem: o nucleo de dominio nunca deve ter "import" de bibliotecas de infraestrutura (sqlalchemy, requests, smtplib, boto3, etc.). Se tiver, a logica de negocio esta vazando para a camada errada.',
    },
  ],
  challenges: [
    {
      id: 'hexagonal-challenge-1',
      title: 'Repositorio de Produtos com Dois Adapters',
      description: 'Implemente um sistema de gerenciamento de produtos usando arquitetura hexagonal. Crie a port ProdutoRepositorioPort e dois adapters: ProdutoRepositorioMemoria e ProdutoRepositorioArquivo. O nucleo ServicoEstoque deve funcionar identicamente com qualquer um dos dois adapters.',
      language: 'python',
      starterCode: `# Implemente a arquitetura hexagonal para gerenciamento de estoque
import json

# --- PORT (interface) ---
class ProdutoRepositorioPort:
    def salvar(self, produto: dict) -> dict:
        """Salva produto e retorna com ID gerado."""
        raise NotImplementedError

    def buscar(self, produto_id: int) -> dict:
        """Retorna o produto ou None se nao existir."""
        raise NotImplementedError

    def listar_todos(self) -> list:
        """Retorna lista de todos os produtos."""
        raise NotImplementedError

    def atualizar_estoque(self, produto_id: int, quantidade: int):
        """Atualiza a quantidade em estoque."""
        raise NotImplementedError


# --- NUCLEO DE DOMINIO ---
class ServicoEstoque:
    def __init__(self, repositorio: ProdutoRepositorioPort):
        self.repositorio = repositorio

    def cadastrar_produto(self, nome: str, preco: float, estoque: int) -> dict:
        # TODO: valide que preco > 0 e estoque >= 0
        # salve e retorne o produto
        pass

    def registrar_venda(self, produto_id: int, quantidade: int) -> dict:
        # TODO: busque o produto, verifique se ha estoque suficiente,
        # atualize o estoque e retorne o produto atualizado
        pass

    def produtos_com_estoque_baixo(self, limite: int = 5) -> list:
        # TODO: retorne produtos com estoque <= limite
        pass


# --- ADAPTER 1: Em memoria ---
class ProdutoRepositorioMemoria(ProdutoRepositorioPort):
    # TODO: implemente usando um dicionario Python
    pass


# --- ADAPTER 2: Em arquivo JSON ---
class ProdutoRepositorioArquivo(ProdutoRepositorioPort):
    def __init__(self, caminho_arquivo: str):
        self.caminho = caminho_arquivo
        # TODO: implemente usando json.load/json.dump

    pass


# Teste: o ServicoEstoque deve funcionar igual com os dois adapters
# adapter = ProdutoRepositorioMemoria()
# servico = ServicoEstoque(adapter)
# p1 = servico.cadastrar_produto("Notebook", 3500.0, 10)
# servico.registrar_venda(p1["id"], 8)
# print(servico.produtos_com_estoque_baixo())
`,
      solution: `import json
import os

# --- PORT ---
class ProdutoRepositorioPort:
    def salvar(self, produto: dict) -> dict:
        raise NotImplementedError

    def buscar(self, produto_id: int) -> dict:
        raise NotImplementedError

    def listar_todos(self) -> list:
        raise NotImplementedError

    def atualizar_estoque(self, produto_id: int, quantidade: int):
        raise NotImplementedError


# --- NUCLEO DE DOMINIO ---
class ServicoEstoque:
    def __init__(self, repositorio: ProdutoRepositorioPort):
        self.repositorio = repositorio

    def cadastrar_produto(self, nome: str, preco: float, estoque: int) -> dict:
        if preco <= 0:
            raise ValueError("Preco deve ser maior que zero")
        if estoque < 0:
            raise ValueError("Estoque nao pode ser negativo")
        produto = {"nome": nome, "preco": preco, "estoque": estoque}
        return self.repositorio.salvar(produto)

    def registrar_venda(self, produto_id: int, quantidade: int) -> dict:
        produto = self.repositorio.buscar(produto_id)
        if not produto:
            raise ValueError(f"Produto {produto_id} nao encontrado")
        if produto["estoque"] < quantidade:
            raise ValueError(f"Estoque insuficiente: tem {produto['estoque']}, pediu {quantidade}")
        novo_estoque = produto["estoque"] - quantidade
        self.repositorio.atualizar_estoque(produto_id, novo_estoque)
        produto["estoque"] = novo_estoque
        return produto

    def produtos_com_estoque_baixo(self, limite: int = 5) -> list:
        return [p for p in self.repositorio.listar_todos() if p["estoque"] <= limite]


# --- ADAPTER 1: Em memoria ---
class ProdutoRepositorioMemoria(ProdutoRepositorioPort):
    def __init__(self):
        self._dados = {}
        self._contador = 0

    def salvar(self, produto: dict) -> dict:
        self._contador += 1
        produto["id"] = self._contador
        self._dados[self._contador] = produto.copy()
        return self._dados[self._contador]

    def buscar(self, produto_id: int) -> dict:
        return self._dados.get(produto_id)

    def listar_todos(self) -> list:
        return list(self._dados.values())

    def atualizar_estoque(self, produto_id: int, quantidade: int):
        if produto_id in self._dados:
            self._dados[produto_id]["estoque"] = quantidade


# --- ADAPTER 2: Em arquivo JSON ---
class ProdutoRepositorioArquivo(ProdutoRepositorioPort):
    def __init__(self, caminho_arquivo: str):
        self.caminho = caminho_arquivo
        if not os.path.exists(caminho_arquivo):
            self._salvar_arquivo({"proximo_id": 1, "produtos": {}})

    def _carregar_arquivo(self) -> dict:
        with open(self.caminho, "r") as f:
            dados = json.load(f)
        # Converte chaves de string para int
        dados["produtos"] = {int(k): v for k, v in dados["produtos"].items()}
        return dados

    def _salvar_arquivo(self, dados: dict):
        with open(self.caminho, "w") as f:
            json.dump(dados, f, indent=2)

    def salvar(self, produto: dict) -> dict:
        dados = self._carregar_arquivo()
        novo_id = dados["proximo_id"]
        produto["id"] = novo_id
        dados["produtos"][novo_id] = produto
        dados["proximo_id"] += 1
        self._salvar_arquivo(dados)
        return produto

    def buscar(self, produto_id: int) -> dict:
        dados = self._carregar_arquivo()
        return dados["produtos"].get(produto_id)

    def listar_todos(self) -> list:
        dados = self._carregar_arquivo()
        return list(dados["produtos"].values())

    def atualizar_estoque(self, produto_id: int, quantidade: int):
        dados = self._carregar_arquivo()
        if produto_id in dados["produtos"]:
            dados["produtos"][produto_id]["estoque"] = quantidade
            self._salvar_arquivo(dados)


# --- DEMONSTRACAO: mesmo nucleo, dois adapters ---
print("=== Adapter em Memoria ===")
servico_mem = ServicoEstoque(ProdutoRepositorioMemoria())
p1 = servico_mem.cadastrar_produto("Notebook", 3500.0, 10)
p2 = servico_mem.cadastrar_produto("Mouse", 80.0, 3)
servico_mem.registrar_venda(p1["id"], 8)
print(f"Estoque baixo: {servico_mem.produtos_com_estoque_baixo()}")

print("\\n=== Adapter em Arquivo ===")
servico_arq = ServicoEstoque(ProdutoRepositorioArquivo("produtos.json"))
p3 = servico_arq.cadastrar_produto("Teclado", 150.0, 4)
print(f"Produto salvo: {p3}")
print(f"Estoque baixo: {servico_arq.produtos_com_estoque_baixo()}")
`,
      hints: [
        'Comece pelo nucleo ServicoEstoque: escreva a logica sem pensar em como os dados sao salvos. Use apenas os metodos do ProdutoRepositorioPort.',
        'O ProdutoRepositorioMemoria e o mais simples: use um dicionario Python com um contador para gerar IDs.',
        'O ProdutoRepositorioArquivo precisa ler e escrever o arquivo a cada operacao. Use json.load para ler e json.dump para escrever.',
      ],
    },
  ],
};
