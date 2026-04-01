import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'nomenclatura-e-clareza',
  moduleId: 'boas-praticas',
  title: 'Nomenclatura e Clareza',
  description: 'Como nomear variaveis, funcoes e classes de forma que o codigo se explique sozinho',
  order: 0,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Nomenclatura e Clareza\n\nCodigo e lido muito mais vezes do que e escrito. Um nome claro elimina a necessidade de comentarios.\n\n### Regras de ouro\n\n**(1) Nomes descrevem PROPOSITO, nao tipo**\nNao nomeie variaveis pelo que elas sao (`string`, `lista`, `numero`) — nomeie pelo que representam no dominio do problema.\n\n**(2) Funcoes sao verbos, classes sao substantivos**\nFuncoes fazem algo: `calcular_media`, `buscar_usuario`, `validar_email`. Classes representam conceitos: `GerenciadorDeUsuarios`, `RelatorioMensal`.\n\n**(3) Booleanos sao perguntas**\nVariaveis booleanas devem soar como perguntas de sim/nao: `is_active`, `has_permission`, `email_verificado`, `usuario_logado`.\n\n**(4) Evite abreviacoes exceto as universais**\nAbreviacoes aceitaveis: `id`, `url`, `http`, `html`, `pdf`, `api`. Abreviacoes ruins: `mgr`, `calc`, `tmp`, `chk`, `lst`, `ret`.\n\n**(5) Seja consistente**\nEscolha um padrao e siga em todo o projeto. Se voce usa `buscar_` para operacoes de leitura, use sempre `buscar_`. Se usa `usuario`, nao altere para `user` no meio do codigo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Ruim                              # Bom\nd = 7                               # dias_para_vencimento = 7\n\ndef calc(x, y):                      # def calcular_media(notas, pesos):\n    pass                            #     pass\n\nclass Mgr:                          # class GerenciadorDeUsuarios:\n    pass                            #     pass\n\nlis = []                            # usuarios_ativos = []\n\ndef chk(u):                         # def usuario_tem_permissao(usuario):\n    pass                            #     pass\n\ntmp = get()                         # produto_atual = buscar_produto(id)\n\nflag = True                         # email_verificado = True\n\ndata2 = proc()                      # relatorio_mensal = gerar_relatorio()\n\nn = len(itens)                      # total_de_itens = len(itens)\n\nret = calc()                        # preco_final = calcular_preco_com_desconto()',
        filename: 'nomes_bons_vs_ruins.py',
        description:
          'Dez pares de nomes ruins versus nomes bons. Em cada par, o nome ruim usa abreviacoes, letras soltas ou e generico demais. O nome bom descreve exatamente o que a variavel ou funcao representa no contexto do negocio.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Teste do corredor: se voce mostrar o nome de uma variavel para um colega no corredor, ele consegue adivinhar para que serve sem ver o contexto? Se nao, o nome esta ruim.',
    },
    {
      type: 'text',
      content:
        '## Convencoes por linguagem e contexto\n\n### Python\n- **Variaveis e funcoes:** `snake_case` — `usuarios_ativos`, `calcular_media`\n- **Classes:** `PascalCase` — `GerenciadorDeUsuarios`, `RelatorioMensal`\n- **Constantes:** `UPPER_SNAKE_CASE` — `MAX_TENTATIVAS`, `TIMEOUT_SEGUNDOS`\n\nExemplos:\n```python\n# Variaveis\nusuarios_ativos = []\ntotal_de_pedidos = 0\nemail_verificado = True\n\n# Funcoes\ndef calcular_preco_com_desconto(preco, desconto):\n    pass\n\ndef buscar_usuario_por_email(email):\n    pass\n\n# Classes\nclass GerenciadorDePedidos:\n    pass\n\n# Constantes\nMAX_TENTATIVAS_LOGIN = 3\nTIMEOUT_REQUISICAO = 30  # segundos\n```\n\n### Nomes a evitar\nNomes genericos tornam o codigo incompreensivel: `data`, `info`, `result`, `temp`, `value`, `obj`, `item`. Eles so sao aceitaveis quando o contexto e absolutamente claro — por exemplo, em uma funcao de 3 linhas que processa um valor generico de entrada.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ANTES — nomes que nao comunicam nada\ndef proc(lst, d):\n    r = []\n    for x in lst:\n        tmp = x * d\n        if chk(x):\n            r.append(tmp)\n    return r\n\ndef chk(x):\n    return x > 0\n\n\n# DEPOIS — nomes que contam a historia\ndef aplicar_desconto_a_produtos_validos(produtos, percentual_desconto):\n    produtos_com_desconto = []\n    for preco_original in produtos:\n        preco_com_desconto = preco_original * percentual_desconto\n        if produto_tem_preco_valido(preco_original):\n            produtos_com_desconto.append(preco_com_desconto)\n    return produtos_com_desconto\n\ndef produto_tem_preco_valido(preco):\n    return preco > 0',
        filename: 'antes_depois_nomenclatura.py',
        description:
          'A funcao "proc" e completamente opaca — impossivel saber o que faz sem ler cada linha. A versao renomeada conta a historia completa so pela assinatura: aplica desconto a produtos validos, verificando se o preco e positivo.',
      },
    },
  ],
  challenges: [
    {
      id: 'nomenclatura-c1',
      title: 'Renomeie Este Codigo',
      description:
        'A funcao abaixo usa nomes de variaveis terriveis — letras soltas, abreviacoes e nomes enganosos. Renomeie todas as variaveis, parametros e a propria funcao para que o codigo se explique sozinho, sem alterar a logica.',
      language: 'python',
      starterCode:
        '# Funcao com nomes ruins — renomeie tudo para maxima clareza\ndef proc(a, b, lst):\n    r = 0\n    cnt = 0\n    for x in lst:\n        if x > a:\n            r = r + x\n            cnt = cnt + 1\n    if cnt == 0:\n        return 0\n    avg = r / cnt\n    if avg > b:\n        flag = True\n    else:\n        flag = False\n    return flag\n\n# Exemplos de uso (nao altere a logica, so os nomes):\nresult = proc(10, 50, [5, 15, 20, 8, 30])\nprint(result)  # True\n',
      solution:
        '# Verifica se a media dos valores acima do minimo supera o limite esperado\ndef media_dos_valores_acima_do_minimo_supera_limite(valor_minimo, limite_de_media, lista_de_valores):\n    soma_dos_validos = 0\n    quantidade_de_validos = 0\n    for valor in lista_de_valores:\n        if valor > valor_minimo:\n            soma_dos_validos = soma_dos_validos + valor\n            quantidade_de_validos = quantidade_de_validos + 1\n    if quantidade_de_validos == 0:\n        return 0\n    media_dos_validos = soma_dos_validos / quantidade_de_validos\n    if media_dos_validos > limite_de_media:\n        media_supera_limite = True\n    else:\n        media_supera_limite = False\n    return media_supera_limite\n\n# Exemplos de uso:\nresultado = media_dos_valores_acima_do_minimo_supera_limite(10, 50, [5, 15, 20, 8, 30])\nprint(resultado)  # True\n',
      hints: [
        'Pense no que a variavel REPRESENTA, nao no seu tipo. "r" acumula o que? "cnt" conta o que?',
        'Funcoes devem ser verbos: calcular_, verificar_, buscar_. O que esta funcao verifica?',
        'Leia o codigo em voz alta — se soar estranho, o nome esta errado. "proc a b lst" nao significa nada.',
      ],
    },
    {
      id: 'nomenclatura-c2',
      title: 'Encontre os Nomes Ruins',
      description:
        'O modulo abaixo tem 8 problemas de nomenclatura — alguns obvios, outros sutis. Identifique cada problema nos comentarios indicados e proponha um nome melhor com justificativa.',
      language: 'python',
      starterCode:
        '# Modulo de gestao de usuarios — encontre os 8 problemas de nomenclatura\n\nclass Mgr:  # PROBLEMA 1: ?\n    def __init__(self):\n        self.data = []  # PROBLEMA 2: ?\n        self.tmp = None  # PROBLEMA 3: ?\n\n    def add(self, nome, email, ativo):  # PROBLEMA 4: ?\n        u = {  # PROBLEMA 5: ?\n            "nome": nome,\n            "email": email,\n            "ativo": ativo\n        }\n        self.data.append(u)\n\n    def get_list(self):  # PROBLEMA 6: ?\n        # Retorna apenas usuarios com ativo=False\n        return [x for x in self.data if not x["ativo"]]  # PROBLEMA 7: ?\n\n    def chk_email(self, e):  # PROBLEMA 8: ?\n        return "@" in e and "." in e\n',
      solution:
        '# PROBLEMA 1: "Mgr" e abreviacao — deveria ser "GerenciadorDeUsuarios"\n# PROBLEMA 2: "data" e generico — e uma lista de usuarios, deveria ser "usuarios"\n# PROBLEMA 3: "tmp" e generico — se armazena o ultimo usuario acessado, use "ultimo_usuario_acessado"\n# PROBLEMA 4: "add" e abreviacao e falta contexto — deveria ser "adicionar_usuario"\n# PROBLEMA 5: "u" e letra solta — representa um usuario, deveria ser "novo_usuario"\n# PROBLEMA 6: "get_list" e generico — retorna usuarios INATIVOS, deveria ser "listar_usuarios_inativos"\n# PROBLEMA 7: "x" e letra solta no loop — representa um usuario, deveria ser "usuario"\n# PROBLEMA 8: "chk_email" usa abreviacao — deveria ser "email_e_valido"\n\nclass GerenciadorDeUsuarios:\n    def __init__(self):\n        self.usuarios = []\n        self.ultimo_usuario_acessado = None\n\n    def adicionar_usuario(self, nome, email, ativo):\n        novo_usuario = {\n            "nome": nome,\n            "email": email,\n            "ativo": ativo\n        }\n        self.usuarios.append(novo_usuario)\n\n    def listar_usuarios_inativos(self):\n        return [usuario for usuario in self.usuarios if not usuario["ativo"]]\n\n    def email_e_valido(self, email):\n        return "@" in email and "." in email\n',
      hints: [
        'Procure abreviacoes: qualquer nome com menos de 4 letras provavelmente e uma abreviacao',
        'Nomes como "data", "list", "get_list" sao muito genericos — o que especificamente eles representam?',
        'Cuidado com nomes que mentem: "get_list" que retorna so inativos e um nome enganoso — o nome deveria revelar o filtro',
      ],
    },
  ],
};
