import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-um-sistema',
  moduleId: 'pensamento-sistemas',
  title: 'O que e um Sistema',
  description: 'Entenda o que e um sistema, seus componentes fundamentais e como pensar em sistemas em vez de linhas de codigo isoladas',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que e um Sistema?\n\nUm sistema e um conjunto de partes interconectadas que trabalham juntas para atingir um objetivo. Antes de escrever uma linha de codigo, engenheiros de software pensam em sistemas — quais sao as entradas, saidas, componentes e fronteiras do que estao construindo.\n\n### Os 4 elementos de todo sistema\n\n**(1) Entradas (Inputs)**\nTudo que o sistema recebe do mundo externo: dados do usuario, requisicoes HTTP, eventos do teclado, dados de sensores, mensagens de outros sistemas.\n\n**(2) Saidas (Outputs)**\nTudo que o sistema produz: uma tela renderizada, um email enviado, um registro no banco de dados, uma resposta HTTP, um arquivo gerado.\n\n**(3) Componentes (Processamento)**\nAs partes internas que transformam entradas em saidas: modulos, classes, funcoes, servicos, bancos de dados, filas. Cada componente tem uma responsabilidade especifica.\n\n**(4) Fronteiras (Boundaries)**\nO que esta dentro do sistema e o que esta fora. A fronteira define onde sua responsabilidade termina e a de outro sistema comeca.\n\n**(5) Estado**\nA "memoria" do sistema: o que ele lembra entre uma operacao e outra. Um carrinho de compras tem estado (os itens adicionados). Uma calculadora sem historico nao tem estado entre calculos.',
    },
    {
      type: 'text',
      content:
        '## Sistemas do cotidiano\n\nAntes de aprender a construir sistemas de software, observe sistemas ao seu redor. Eles tem exatamente os mesmos elementos.\n\n### Geladeira\n- **Entradas:** temperatura externa, abertura da porta, calor dos alimentos\n- **Saidas:** ar frio, consumo de energia eletrica\n- **Componentes:** compressor, gas refrigerante, termostato, display de temperatura\n- **Fronteiras:** a geladeira nao controla a temperatura da cozinha — apenas o seu interior\n- **Estado:** temperatura atual interna\n\n### Semaforo\n- **Entradas:** temporizador, sensores de presenca de veiculos, comandos manuais do operador\n- **Saidas:** luzes acesas (verde, amarelo, vermelho)\n- **Componentes:** controlador logico, lampadass/LEDs, sensores, temporizadores\n- **Fronteiras:** o semaforo controla um cruzamento — nao a via inteira\n- **Estado:** qual luz esta acesa, quanto tempo resta no ciclo atual\n\n### Site de e-commerce (Amazon, Mercado Livre)\n- **Entradas:** busca do usuario, clique em produto, dados do cartao, endereco de entrega\n- **Saidas:** pagina de resultados, pagina do produto, confirmacao de pedido, email de rastreamento\n- **Componentes:** sistema de busca, catalogo de produtos, carrinho, sistema de pagamento, sistema de logistica\n- **Fronteiras:** o site nao dirige o caminhao de entrega — ele passa o pedido para o sistema de logistica\n- **Estado:** carrinho do usuario, status do pedido, estoque disponivel',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Pensar em sistemas e uma habilidade antes de ser uma tecnica. Quando voce se deparar com um problema, pergunte: quais sao as entradas? Quais saidas sao esperadas? Quais componentes precisam existir? Onde estao as fronteiras? Essa pergunta vai guiar toda a sua arquitetura.',
    },
    {
      type: 'text',
      content:
        '## Pensar em linhas de codigo vs. pensar em sistemas\n\nInicantes tendem a pensar em codigo de forma linear: "primeiro faco X, depois Y, depois Z". Isso funciona para scripts pequenos, mas falha catastroficamente em sistemas maiores.\n\n### Pensamento linear (problematico)\n```\n1. Recebo o email do usuario\n2. Verifico se o email existe\n3. Envio o email de boas-vindas\n4. Salvo no banco\n5. Mostro confirmacao\n```\nEsse pensamento mistura tudo: validacao, comunicacao, persistencia, interface — tudo em sequencia rigida.\n\n### Pensamento sistemico (correto)\n```\nComponente 1: Validador de dados\n  - Entrada: dados brutos do formulario\n  - Saida: dados validados OU lista de erros\n\nComponente 2: Repositorio de usuarios\n  - Entrada: dados validados\n  - Saida: usuario criado OU erro de duplicidade\n\nComponente 3: Servico de notificacao\n  - Entrada: usuario criado\n  - Saida: email enviado OU erro de envio\n\nComponente 4: Interface de resposta\n  - Entrada: resultado de cada componente\n  - Saida: mensagem de sucesso ou erro para o usuario\n```\nCada componente tem responsabilidade clara. Se o servico de email falhar, o usuario ainda foi criado. Se o banco falhar, nao enviamos email em vao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Pensamento LINEAR — tudo misturado, fragil\ndef cadastrar_usuario_linear(nome, email, senha):\n    # Validacao misturada com logica de negocio\n    if "@" not in email:\n        print("Email invalido")\n        return\n    if len(senha) < 8:\n        print("Senha muito curta")\n        return\n    # Banco de dados misturado com notificacao\n    banco.inserir("usuarios", {"nome": nome, "email": email, "senha": senha})\n    email_service.enviar(email, "Bem-vindo!", "Seu cadastro foi realizado.")\n    print("Cadastro realizado!")\n\n\n# Pensamento SISTEMICO — componentes com responsabilidades claras\ndef validar_dados_de_cadastro(nome, email, senha):\n    """Componente 1: so valida, nao faz mais nada"""\n    erros = []\n    if "@" not in email:\n        erros.append("Email invalido")\n    if len(senha) < 8:\n        erros.append("Senha deve ter pelo menos 8 caracteres")\n    if len(nome) < 2:\n        erros.append("Nome muito curto")\n    return erros  # lista vazia = tudo ok\n\ndef salvar_usuario_no_banco(nome, email, senha):\n    """Componente 2: so persiste, nao valida nem notifica"""\n    usuario_id = banco.inserir("usuarios", {"nome": nome, "email": email, "senha": senha})\n    return usuario_id\n\ndef notificar_novo_usuario(email, nome):\n    """Componente 3: so notifica, nao sabe de banco nem validacao"""\n    mensagem = f"Ola {nome}, seu cadastro foi realizado com sucesso!"\n    return email_service.enviar(email, "Bem-vindo!", mensagem)\n\ndef cadastrar_usuario(nome, email, senha):\n    """Orquestrador: coordena os componentes na ordem certa"""\n    erros = validar_dados_de_cadastro(nome, email, senha)\n    if erros:\n        return {"sucesso": False, "erros": erros}\n\n    usuario_id = salvar_usuario_no_banco(nome, email, senha)\n    notificar_novo_usuario(email, nome)\n    return {"sucesso": True, "usuario_id": usuario_id}',
        filename: 'linear_vs_sistemico.py',
        description:
          'No pensamento linear, tudo esta misturado numa unica funcao — mudar qualquer coisa quebra tudo. No pensamento sistemico, cada funcao tem uma unica responsabilidade. Isso facilita testes, reutilizacao e manutencao.',
      },
    },
  ],
  challenges: [
    {
      id: 'sistemas-c1',
      title: 'Descreva o Caixa Eletronico como Sistema',
      description:
        'Um caixa eletronico (ATM) e um sistema com entradas, saidas, componentes e fronteiras bem definidas. Usando o template fornecido, identifique cada elemento desse sistema. Depois, implemente uma funcao Python que simula o nucleo do ATM: verificar saldo e realizar saque. Pense nos componentes necessarios antes de escrever codigo.',
      language: 'python',
      starterCode:
        '# PARTE 1: Analise o sistema ATM preenchendo os comentarios\n# Entradas do sistema ATM:\n# - ?\n# - ?\n# - ?\n\n# Saidas do sistema ATM:\n# - ?\n# - ?\n# - ?\n\n# Componentes internos:\n# - ?\n# - ?\n# - ?\n\n# Fronteiras (o que o ATM NAO faz, delegando para outros sistemas):\n# - ?\n# - ?\n\n# Estado do sistema:\n# - ?\n# - ?\n\n\n# PARTE 2: Implemente os componentes principais\n# O sistema tem 3 componentes com responsabilidades separadas\n\ndef verificar_autenticacao(conta_id, senha, banco_de_dados):\n    """Componente 1: autentica o usuario\n    Entrada: id da conta, senha, dados do banco\n    Saida: True se autenticado, False caso contrario\n    """\n    # Implemente aqui\n    pass\n\ndef consultar_saldo(conta_id, banco_de_dados):\n    """Componente 2: retorna o saldo atual\n    Entrada: id da conta, dados do banco\n    Saida: saldo em reais (float) ou None se conta nao existe\n    """\n    # Implemente aqui\n    pass\n\ndef realizar_saque(conta_id, valor, banco_de_dados):\n    """Componente 3: realiza o saque se houver saldo\n    Entrada: id da conta, valor a sacar, dados do banco\n    Saida: dicionario com {"sucesso": bool, "saldo_restante": float, "mensagem": str}\n    """\n    # Implemente aqui\n    pass\n\n\n# Banco de dados simulado (estado do sistema)\nbanco_de_dados = {\n    "conta_001": {"senha": "1234", "saldo": 1500.00, "titular": "Ana"},\n    "conta_002": {"senha": "5678", "saldo": 300.00, "titular": "Bruno"},\n}\n\n# Teste seus componentes aqui\n',
      solution:
        '# PARTE 1: Analise do sistema ATM\n# Entradas do sistema ATM:\n# - Cartao bancario (numero da conta)\n# - Senha digitada pelo usuario\n# - Valor desejado para saque ou deposito\n\n# Saidas do sistema ATM:\n# - Dinheiro fisico dispensado\n# - Comprovante impresso ou digital\n# - Mensagem de erro ou confirmacao na tela\n\n# Componentes internos:\n# - Leitor de cartao (identificacao)\n# - Modulo de autenticacao (valida senha)\n# - Gerenciador de conta (consulta/atualiza saldo)\n# - Dispensador de cedulas (controla dinheiro fisico)\n\n# Fronteiras (o que o ATM NAO faz, delegando para outros sistemas):\n# - Nao decide as regras de credito (delega para o banco)\n# - Nao fabrica dinheiro (o estoque e gerenciado por outro sistema)\n\n# Estado do sistema:\n# - Sessao atual (conta autenticada ou nao)\n# - Quantidade de cedulas disponivel no cofre\n\n\n# PARTE 2: Implementacao dos componentes\n\ndef verificar_autenticacao(conta_id, senha, banco_de_dados):\n    """Componente 1: autentica o usuario"""\n    if conta_id not in banco_de_dados:\n        return False\n    conta = banco_de_dados[conta_id]\n    return conta["senha"] == senha\n\ndef consultar_saldo(conta_id, banco_de_dados):\n    """Componente 2: retorna o saldo atual"""\n    if conta_id not in banco_de_dados:\n        return None\n    return banco_de_dados[conta_id]["saldo"]\n\ndef realizar_saque(conta_id, valor, banco_de_dados):\n    """Componente 3: realiza o saque se houver saldo"""\n    if conta_id not in banco_de_dados:\n        return {"sucesso": False, "saldo_restante": 0, "mensagem": "Conta nao encontrada"}\n    saldo_atual = banco_de_dados[conta_id]["saldo"]\n    if valor <= 0:\n        return {"sucesso": False, "saldo_restante": saldo_atual, "mensagem": "Valor invalido"}\n    if valor > saldo_atual:\n        return {"sucesso": False, "saldo_restante": saldo_atual, "mensagem": "Saldo insuficiente"}\n    banco_de_dados[conta_id]["saldo"] -= valor\n    novo_saldo = banco_de_dados[conta_id]["saldo"]\n    return {"sucesso": True, "saldo_restante": novo_saldo, "mensagem": f"Saque de R${valor:.2f} realizado com sucesso"}\n\n\n# Banco de dados simulado\nbanco_de_dados = {\n    "conta_001": {"senha": "1234", "saldo": 1500.00, "titular": "Ana"},\n    "conta_002": {"senha": "5678", "saldo": 300.00, "titular": "Bruno"},\n}\n\n# Testes\nprint(verificar_autenticacao("conta_001", "1234", banco_de_dados))  # True\nprint(verificar_autenticacao("conta_001", "9999", banco_de_dados))  # False\nprint(consultar_saldo("conta_001", banco_de_dados))                 # 1500.0\nprint(realizar_saque("conta_001", 200, banco_de_dados))             # sucesso, saldo 1300\nprint(realizar_saque("conta_002", 500, banco_de_dados))             # falha, saldo insuficiente\n',
      hints: [
        'Comece pela analise textual antes de escrever codigo. O que entra no ATM? O que sai? Essa reflexao vai guiar a implementacao.',
        'Cada funcao deve fazer UMA coisa: verificar_autenticacao nao acessa saldo, realizar_saque nao verifica senha. Componentes separados!',
        'O banco_de_dados e o "estado" do sistema — e o que persiste entre operacoes. A funcao realizar_saque deve modificar esse estado.',
      ],
    },
  ],
};
