import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'clean-code',
  moduleId: 'arquitetura-software',
  title: 'Clean Code: Escrevendo Codigo que Outros Entendem',
  description: 'Aprenda os principios do Clean Code: nomes descritivos, funcoes pequenas, comentarios uteis e refatoracao — tecnicas para escrever codigo que qualquer desenvolvedor consegue entender e manter.',
  order: 4,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content: '## Codigo e Lido Muito Mais do que Escrito\n\nRobert C. Martin, no livro "Clean Code", observou que a proporcao de leitura para escrita de codigo e de **10 para 1**: para cada linha nova que voce escreve, voce le 10 linhas de codigo existente. Isso significa que **codigo legivel economiza muito mais tempo do que codigo rapido de escrever**.\n\nCodigo ruim nao e so dificil de ler — ele e caro. Estudos mostram que desenvolvedores gastam mais de **70% do tempo lendo codigo**, e codigo confuso pode multiplicar por 3 ou 4 o tempo necessario para uma tarefa simples.\n\nClean Code e uma disciplina: um conjunto de habitos e praticas que, com o tempo, tornam-se naturais. Nao e perfeccionismo — e profissionalismo.',
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: '"Sempre que voce escrever codigo, imagine que o proximo desenvolvedor que vai le-lo e um psicotico violento que sabe onde voce mora." — citacao humoristica, mas o ponto e serio: escreva codigo para humanos, nao para maquinas.',
    },
    {
      type: 'text',
      content: '## Regra 1: Nomes Descritivos\n\nO principio mais impactante do Clean Code e simples: **use nomes que revelem a intencao**. Um bom nome elimina a necessidade de um comentario explicativo.\n\n**Regras para bons nomes:**\n- O nome deve responder: "o que isso faz?" ou "o que isso representa?"\n- Evite abreviacoes (exceto as universalmente conhecidas como `id`, `url`, `db`)\n- Variaveis booleanas devem comecar com `is_`, `has_`, `can_`, `should_`\n- Funcoes devem comecar com verbos: `get_`, `calculate_`, `validate_`, `create_`\n- Colecoes devem ter nomes no plural: `users`, `orders`, `items`\n- Evite nomes de uma letra, exceto em loops curtos (`i`, `j`)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'nomes_ruins_vs_bons.py',
        code: `# NOMES RUINS: o que este codigo faz? Impossivel saber sem ler tudo.

def proc(lst, n):
    r = []
    for x in lst:
        if x[2] > n:
            r.append(x)
    return r

def calc(a, b, c):
    t = a * b
    if c:
        t = t * 0.9
    return t

d = {"n": "Ana", "s": 5000, "a": 3}
flag = d["s"] > 4000


# NOMES BONS: o codigo se documenta sozinho.

def filtrar_produtos_acima_do_preco(produtos, preco_minimo):
    produtos_filtrados = []
    for produto in produtos:
        preco_do_produto = produto[2]
        if preco_do_produto > preco_minimo:
            produtos_filtrados.append(produto)
    return produtos_filtrados

def calcular_preco_final(preco_unitario, quantidade, aplicar_desconto):
    total = preco_unitario * quantidade
    if aplicar_desconto:
        total = total * 0.9  # 10% de desconto
    return total

funcionario = {"nome": "Ana", "salario": 5000, "anos_de_empresa": 3}
is_salario_alto = funcionario["salario"] > 4000

# Agora voce consegue entender o codigo sem precisar de comentarios explicativos!
# O nome diz TUDO sobre o que a variavel/funcao faz.`,
        description: 'Nomes ruins forcam o leitor a decifrar o codigo. Nomes bons tornam o codigo autoexplicativo.',
      },
    },
    {
      type: 'text',
      content: '## Regra 2: Funcoes Pequenas com Uma Unica Responsabilidade\n\nUma funcao deve fazer **uma coisa, e faze-la bem**. Funcoes grandes sao dificeis de entender, testar e reutilizar.\n\n**Sinais de que uma funcao esta grande demais:**\n- Voce precisa rolar a tela para ver a funcao inteira\n- A funcao tem mais de 20 linhas\n- A funcao usa os termos "e" ou "ou" no nome (indica que faz mais de uma coisa)\n- Voce usa comentarios para separar "secoes" dentro da funcao (cada secao deveria ser sua propria funcao)\n- A funcao tem muitos niveis de indentacao (ifs dentro de ifs dentro de fors)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'funcoes_grandes_vs_pequenas.py',
        code: `# FUNCAO GRANDE: faz muitas coisas ao mesmo tempo

def processar_pedido_e_enviar_confirmacao(pedido_dict):
    # Secao 1: validacao (deveria ser outra funcao)
    if not pedido_dict.get("cliente"):
        print("Erro: cliente invalido")
        return False
    if not pedido_dict.get("itens"):
        print("Erro: pedido sem itens")
        return False
    for item in pedido_dict["itens"]:
        if item["quantidade"] <= 0:
            print(f"Erro: quantidade invalida para {item['nome']}")
            return False

    # Secao 2: calculo (deveria ser outra funcao)
    total = 0
    for item in pedido_dict["itens"]:
        subtotal = item["preco"] * item["quantidade"]
        total += subtotal
    if total > 1000:
        total = total * 0.95  # desconto de 5%

    # Secao 3: aplicar ao pedido (deveria ser outra funcao)
    pedido_dict["total"] = total
    pedido_dict["status"] = "confirmado"

    # Secao 4: notificacao (definitivamente outra funcao)
    cliente = pedido_dict["cliente"]
    print(f"Email enviado para {cliente}: pedido confirmado, total R\${total:.2f}")
    return True


# FUNCOES PEQUENAS: cada funcao tem um proposito claro

def validar_pedido(pedido):
    """Valida se o pedido tem todos os dados necessarios."""
    if not pedido.get("cliente"):
        return False, "Cliente invalido"
    if not pedido.get("itens"):
        return False, "Pedido sem itens"
    for item in pedido["itens"]:
        if item["quantidade"] <= 0:
            return False, f"Quantidade invalida para {item['nome']}"
    return True, None

def calcular_total_do_pedido(itens):
    """Calcula o total dos itens, sem logica de desconto."""
    return sum(item["preco"] * item["quantidade"] for item in itens)

def aplicar_desconto_por_volume(total):
    """Aplica desconto de 5% para pedidos acima de R$1000."""
    LIMITE_DESCONTO = 1000
    PERCENTUAL_DESCONTO = 0.05
    if total > LIMITE_DESCONTO:
        return total * (1 - PERCENTUAL_DESCONTO)
    return total

def confirmar_pedido(pedido, total_final):
    """Marca o pedido como confirmado com o total calculado."""
    pedido["total"] = total_final
    pedido["status"] = "confirmado"

def notificar_cliente(cliente, total):
    """Envia notificacao de confirmacao para o cliente."""
    print(f"Email enviado para {cliente}: pedido confirmado, total R\${total:.2f}")

def processar_pedido(pedido):
    """Coordena o processamento: valida, calcula, confirma e notifica."""
    valido, erro = validar_pedido(pedido)
    if not valido:
        print(f"Erro: {erro}")
        return False

    total_bruto = calcular_total_do_pedido(pedido["itens"])
    total_final = aplicar_desconto_por_volume(total_bruto)
    confirmar_pedido(pedido, total_final)
    notificar_cliente(pedido["cliente"], total_final)
    return True

# Agora posso testar cada parte isoladamente!
pedido_teste = {
    "cliente": "ana@email.com",
    "itens": [
        {"nome": "Notebook", "preco": 3500.0, "quantidade": 1},
        {"nome": "Mouse", "preco": 80.0, "quantidade": 2},
    ]
}
processar_pedido(pedido_teste)`,
        description: 'Funcoes pequenas sao faceis de entender, testar e reutilizar. O nome de cada funcao documenta o que ela faz.',
      },
    },
    {
      type: 'text',
      content: '## Regra 3: Comentarios — Explique o POR QUE, nao o O QUE\n\nComentarios nao devem repetir o que o codigo ja diz claramente. Um comentario ruim e ruido que polui o codigo. Um comentario bom explica a **intencao** ou o **raciocinio** por tras de uma decisao que o codigo em si nao consegue expressar.\n\n**Comentarios ruins** (descricao do que o codigo faz — o codigo ja diz isso):\n```python\ni += 1  # incrementa i\nif user.is_active:  # se o usuario esta ativo\n```\n\n**Comentarios bons** (explicam o POR QUE, contexto ou decisoes nao obvias):\n```python\n# Usamos Fibonacci para calcular os intervalos de retry, nao intervals fixos,\n# porque o sistema externo fica sobrecarregado com tentativas simultaneas\n\n# ATENCAO: este limite de 100 foi definido pelo contrato com o banco (clausula 3.2)\n# Nao aumente sem aprovacao juridica\n```',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'comentarios_bons_vs_ruins.py',
        code: `# COMENTARIOS RUINS: so repetem o que o codigo ja diz

def calcular_imposto(salario):
    # verifica se o salario e maior que 6000
    if salario > 6000:
        imposto = salario * 0.275  # calcula 27.5% de imposto
    # senao verifica se e maior que 3000
    elif salario > 3000:
        imposto = salario * 0.15   # calcula 15% de imposto
    else:
        imposto = 0                # imposto e zero
    return imposto  # retorna o imposto


# COMENTARIOS BONS: explicam o POR QUE e o contexto

# Tabela do IRPF 2024 - Instrucao Normativa RFB n. 2.178/2024
# Atualizar os limites todo ano no inicio do exercicio fiscal
FAIXA_IMPOSTO_ALTO = 6000    # R$ 6.000,00 - faixa 27,5%
FAIXA_IMPOSTO_MEDIO = 3000   # R$ 3.000,00 - faixa 15%
ALIQUOTA_ALTA = 0.275
ALIQUOTA_MEDIA = 0.15

def calcular_imposto(salario):
    # Calculo simplificado do IRPF (sem deducoes para exemplo didatico)
    # Para calculo completo, consulte tabela progressiva oficial
    if salario > FAIXA_IMPOSTO_ALTO:
        return salario * ALIQUOTA_ALTA
    elif salario > FAIXA_IMPOSTO_MEDIO:
        return salario * ALIQUOTA_MEDIA
    return 0


def calcular_intervalo_retry(tentativa):
    # Usamos backoff exponencial (nao intervalo fixo) porque tentativas
    # simultaneas de muitos clientes sobrecarregariam o servico externo.
    # A formula 2^tentativa da: 2s, 4s, 8s, 16s... (maximo 60s)
    return min(2 ** tentativa, 60)


def hash_senha(senha):
    # NUNCA armazene senhas em texto puro.
    # Usamos bcrypt com work_factor=12 conforme recomendacao OWASP 2024.
    # Nao reduza o work_factor sem revisar as implicacoes de seguranca.
    import hashlib
    return hashlib.sha256(senha.encode()).hexdigest()`,
        description: 'Bons comentarios explicam o raciocinio, referenciam documentos ou alertam sobre armadilhas. Nomes bons eliminam a necessidade de comentarios que descrevem o que o codigo faz.',
      },
    },
    {
      type: 'text',
      content: '## Regra 4: Refatoracao — Melhorar sem Mudar o Comportamento\n\n**Refatorar** e melhorar a estrutura interna do codigo sem alterar seu comportamento externo. E como organizar a gaveta de roupas: o guarda-roupa continua tendo as mesmas roupas, mas agora esta organizado e facil de usar.\n\n**Quando refatorar:**\n- Antes de adicionar uma nova funcionalidade (prepare o terreno)\n- Quando entender melhor um problema do que quando escreveu o codigo\n- Quando voce tem testes que garantem que o comportamento nao vai quebrar\n\n**Como refatorar de forma segura:**\n1. Garanta que voce tem testes (ou escreva alguns antes)\n2. Faca pequenas mudancas de cada vez\n3. Rode os testes apos cada mudanca\n4. Commite frequentemente\n\n**Tecnicas comuns de refatoracao:**\n- **Extrair funcao**: pegar um bloco de codigo e criar uma funcao separada\n- **Renomear**: dar nomes mais descritivos\n- **Remover duplicacao**: substituir codigo repetido por uma funcao reutilizavel\n- **Simplificar condicionais**: substituir ifs complexos por nomes mais claros',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'A regra do escoteiro se aplica ao codigo: "deixe o acampamento mais limpo do que voce encontrou". Sempre que mexer em um arquivo, tente deixar o codigo um pouco mais legivel do que estava. Pequenas melhorias constantes transformam um codebase inteiro ao longo do tempo.',
    },
  ],
  challenges: [
    {
      id: 'cleancode-challenge-1',
      title: 'Renomear Variaveis e Funcoes com Nomes Descritivos',
      description: 'O codigo abaixo usa nomes terriveis: variaveis de uma letra, abreviacoes crípticas e funcoes sem sentido. Renomeie TUDO para que o codigo se torne autoexplicativo, sem alterar a logica. Use nomes em ingles ou portugues simples sem acentos.',
      language: 'python',
      starterCode: `# Renomeie todas as variaveis e funcoes para nomes descritivos
# Nao altere a logica, apenas os nomes

def proc(lst, v):
    r = 0
    c = 0
    for x in lst:
        if x >= v:
            r += x
            c += 1
    if c == 0:
        return 0
    return r / c

def chk(u):
    if u["t"] == "adm":
        return True
    if u["a"] >= 18 and u["s"] == "ativo":
        return True
    return False

def fmt(n, p, q):
    t = p * q
    s = f"{n}: {q} x R\${p:.2f} = R\${t:.2f}"
    return s

# Dados de exemplo (renomeie tambem)
u1 = {"nm": "Ana", "t": "adm", "a": 25, "s": "ativo"}
u2 = {"nm": "Bruno", "t": "usr", "a": 16, "s": "ativo"}
u3 = {"nm": "Carla", "t": "usr", "a": 30, "s": "inativo"}

nums = [10, 25, 5, 40, 15, 3, 50]
lim = 20

print(proc(nums, lim))
print(chk(u1))
print(chk(u2))
print(fmt("Notebook", 3500.0, 2))
`,
      solution: `# Solucao: nomes completamente descritivos

def calcular_media_acima_do_limite(numeros, limite_minimo):
    soma_dos_aprovados = 0
    quantidade_aprovados = 0
    for numero in numeros:
        if numero >= limite_minimo:
            soma_dos_aprovados += numero
            quantidade_aprovados += 1
    if quantidade_aprovados == 0:
        return 0
    return soma_dos_aprovados / quantidade_aprovados

def usuario_tem_acesso(usuario):
    is_administrador = usuario["tipo"] == "adm"
    if is_administrador:
        return True
    is_maior_de_idade = usuario["idade"] >= 18
    is_conta_ativa = usuario["status"] == "ativo"
    if is_maior_de_idade and is_conta_ativa:
        return True
    return False

def formatar_linha_de_item(nome_produto, preco_unitario, quantidade):
    total_do_item = preco_unitario * quantidade
    linha_formatada = f"{nome_produto}: {quantidade} x R\$\{preco_unitario:.2f} = R\$\{total_do_item:.2f}"
    return linha_formatada

# Dados de exemplo com nomes descritivos
usuario_administrador = {"nome": "Ana", "tipo": "adm", "idade": 25, "status": "ativo"}
usuario_menor_de_idade = {"nome": "Bruno", "tipo": "usr", "idade": 16, "status": "ativo"}
usuario_inativo = {"nome": "Carla", "tipo": "usr", "idade": 30, "status": "inativo"}

lista_de_numeros = [10, 25, 5, 40, 15, 3, 50]
limite_para_media = 20

print(calcular_media_acima_do_limite(lista_de_numeros, limite_para_media))
print(usuario_tem_acesso(usuario_administrador))   # True (admin)
print(usuario_tem_acesso(usuario_menor_de_idade))  # False (menor)
print(usuario_tem_acesso(usuario_inativo))          # False (inativo)
print(formatar_linha_de_item("Notebook", 3500.0, 2))
`,
      hints: [
        'Para a funcao proc: ela filtra numeros acima de um valor e calcula a media deles. Pense em nomes que descrevam isso.',
        'Para a funcao chk: ela verifica se um usuario tem permissao de acesso. Use is_ para variaveis booleanas.',
        'Para as variaveis dos usuarios: expanda todas as abreviacoes. "t" provavelmente e "tipo", "a" e "idade", "s" e "status".',
      ],
    },
    {
      id: 'cleancode-challenge-2',
      title: 'Refatorar Funcao Longa em Funcoes Menores',
      description: 'A funcao gerar_relatorio_de_vendas abaixo e longa e faz multiplas coisas. Refatore-a extraindo funcoes menores: calcular_totais_por_vendedor(), encontrar_melhor_vendedor(), formatar_linha_vendedor(), e imprimir_relatorio(). A saida final deve ser identica.',
      language: 'python',
      starterCode: `# Refatore esta funcao longa em funcoes menores

def gerar_relatorio_de_vendas(vendas):
    # Secao 1: calcular totais por vendedor
    totais = {}
    for venda in vendas:
        vendedor = venda["vendedor"]
        valor = venda["valor"]
        if vendedor not in totais:
            totais[vendedor] = 0
        totais[vendedor] += valor

    # Secao 2: encontrar o melhor vendedor
    melhor_vendedor = None
    maior_total = 0
    for vendedor, total in totais.items():
        if total > maior_total:
            maior_total = total
            melhor_vendedor = vendedor

    # Secao 3: imprimir relatorio
    print("=" * 40)
    print("   RELATORIO DE VENDAS")
    print("=" * 40)
    for vendedor, total in sorted(totais.items()):
        destaque = " <<< MELHOR" if vendedor == melhor_vendedor else ""
        print(f"  {vendedor:<20} R\$\{total:>8.2f}{destaque}")
    print("-" * 40)
    total_geral = sum(totais.values())
    print(f"  {'TOTAL GERAL':<20} R\$\{total_geral:>8.2f}")
    print("=" * 40)
    print(f"  Melhor vendedor: {melhor_vendedor} (R\$\{maior_total:.2f})")

# Dados de teste
vendas = [
    {"vendedor": "Ana", "valor": 3500},
    {"vendedor": "Bruno", "valor": 2800},
    {"vendedor": "Ana", "valor": 1200},
    {"vendedor": "Carla", "valor": 5100},
    {"vendedor": "Bruno", "valor": 900},
    {"vendedor": "Carla", "valor": 800},
]

gerar_relatorio_de_vendas(vendas)
`,
      solution: `# Solucao: funcoes menores e focadas

def calcular_totais_por_vendedor(vendas):
    """Agrupa e soma as vendas por vendedor."""
    totais = {}
    for venda in vendas:
        vendedor = venda["vendedor"]
        if vendedor not in totais:
            totais[vendedor] = 0
        totais[vendedor] += venda["valor"]
    return totais

def encontrar_melhor_vendedor(totais):
    """Retorna o nome e total do vendedor com maior volume."""
    melhor_vendedor = max(totais, key=totais.get)
    return melhor_vendedor, totais[melhor_vendedor]

def formatar_linha_vendedor(nome, total, is_melhor):
    """Formata uma linha do relatorio para um vendedor."""
    destaque = " <<< MELHOR" if is_melhor else ""
    return f"  {nome:<20} R\$\{total:>8.2f}{destaque}"

def imprimir_relatorio(totais, melhor_vendedor, melhor_total):
    """Imprime o relatorio completo de vendas."""
    print("=" * 40)
    print("   RELATORIO DE VENDAS")
    print("=" * 40)
    for nome, total in sorted(totais.items()):
        linha = formatar_linha_vendedor(nome, total, nome == melhor_vendedor)
        print(linha)
    print("-" * 40)
    total_geral = sum(totais.values())
    print(f"  {'TOTAL GERAL':<20} R\$\{total_geral:>8.2f}")
    print("=" * 40)
    print(f"  Melhor vendedor: {melhor_vendedor} (R\$\{melhor_total:.2f})")

def gerar_relatorio_de_vendas(vendas):
    """Coordena a geracao do relatorio de vendas."""
    totais = calcular_totais_por_vendedor(vendas)
    melhor_vendedor, melhor_total = encontrar_melhor_vendedor(totais)
    imprimir_relatorio(totais, melhor_vendedor, melhor_total)

# Dados de teste
vendas = [
    {"vendedor": "Ana", "valor": 3500},
    {"vendedor": "Bruno", "valor": 2800},
    {"vendedor": "Ana", "valor": 1200},
    {"vendedor": "Carla", "valor": 5100},
    {"vendedor": "Bruno", "valor": 900},
    {"vendedor": "Carla", "valor": 800},
]

gerar_relatorio_de_vendas(vendas)
# Saida identica, mas agora cada parte e testavel e reutilizavel!
# Posso testar calcular_totais_por_vendedor() sem precisar imprimir nada
`,
      hints: [
        'Comece identificando os comentarios que marcam "secoes" na funcao original — cada secao e uma funcao candidata.',
        'calcular_totais_por_vendedor deve retornar o dicionario de totais sem fazer nenhum print.',
        'Para encontrar_melhor_vendedor, use max(totais, key=totais.get) para encontrar a chave com o maior valor.',
      ],
    },
  ],
};
