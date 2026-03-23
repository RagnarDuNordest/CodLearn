import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes-e-modularizacao',
  moduleId: 'logica',
  title: 'Funcoes e Modularizacao',
  description:
    'Aprenda a criar funcoes para organizar, reutilizar e simplificar seu codigo. Entenda parametros, retorno de valores e o conceito de escopo.',
  order: 9,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## O problema do codigo repetido\n\nImagine que voce esta fazendo um programa de escola e precisa calcular a media de um aluno em 5 lugares diferentes do codigo:\n\n```\nmedia = (nota1 + nota2 + nota3) / 3\n```\n\nSe voce copiar essa linha 5 vezes e depois descobrir que a formula mudou (agora e ponderada), vai ter que alterar em 5 lugares. Esqueceu um? Bug.\n\nA solucao e criar uma **funcao**: um bloco de codigo com nome proprio que voce "chama" quando precisar. Muda em um lugar, funciona em todos.\n\n## O que e uma funcao?\n\nUma funcao e como uma **maquina**: voce coloca algo (entrada), ela processa e devolve algo (saida).\n\n- **Nome**: identifica a funcao\n- **Parametros (inputs)**: os dados que ela recebe para trabalhar\n- **Corpo**: o codigo que ela executa\n- **Retorno (output)**: o resultado que ela devolve\n\nFuncoes que voce ja usa sem saber: `print()`, `len()`, `type()`, `int()`, `float()` — sao todas funcoes!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Sem funcao: codigo repetido e fragil\nnota1_turmaA = 7.0\nnota2_turmaA = 8.5\nnota3_turmaA = 9.0\nmedia_turmaA = (nota1_turmaA + nota2_turmaA + nota3_turmaA) / 3\n\nnota1_turmaB = 6.5\nnota2_turmaB = 7.0\nnota3_turmaB = 8.0\nmedia_turmaB = (nota1_turmaB + nota2_turmaB + nota3_turmaB) / 3\n\nprint(f"Media A: {media_turmaA:.2f}")  # 8.17\nprint(f"Media B: {media_turmaB:.2f}")  # 7.17\n\nprint("---")\n\n# COM funcao: limpo, reutilizavel e facil de mudar\ndef calcular_media(n1, n2, n3):\n    return (n1 + n2 + n3) / 3\n\nmedia_A = calcular_media(7.0, 8.5, 9.0)\nmedia_B = calcular_media(6.5, 7.0, 8.0)\n\nprint(f"Media A: {media_A:.2f}")  # 8.17\nprint(f"Media B: {media_B:.2f}")  # 7.17\n# Se a formula mudar, altero SO a funcao!',
        filename: 'sem_vs_com_funcao.py',
        description:
          'A versao com funcao e menor, mais legivel e mais facil de manter. Isso se chama DRY (Dont Repeat Yourself — nao se repita), um dos principios fundamentais da programacao.',
      },
    },
    {
      type: 'text',
      content:
        '## Como criar uma funcao em Python\n\nA estrutura basica e:\n\n```python\ndef nome_da_funcao(parametro1, parametro2):\n    # corpo da funcao\n    resultado = parametro1 + parametro2\n    return resultado\n```\n\n- `def` — palavra-chave que inicia a definicao da funcao\n- `nome_da_funcao` — nome que voce escolhe (use snake_case: palavras com underscore)\n- `(parametro1, parametro2)` — dados de entrada (pode ser vazio `()`)\n- `:` — obrigatorio apos o parenteses\n- **Indentacao** — o corpo e indentado (4 espacos)\n- `return` — devolve o resultado (sem return, a funcao retorna `None`)\n\n### Funcao sem parametros e sem retorno\nA funcao mais simples possivel: faz algo, mas nao recebe nem devolve nada.\n\n### Funcao com parametros\nRecebe dados para trabalhar — como ingredientes de uma receita.\n\n### Funcao com retorno\nDevolve um resultado que voce pode guardar em uma variavel.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# 3 tipos de funcoes\n\n# 1. Sem parametros e sem retorno (faz algo, nao precisa de input)\ndef saudar():\n    print("Ola, bem-vindo ao CodLearn!")\n\nsaudar()   # Ola, bem-vindo ao CodLearn!\nsaudar()   # chame quantas vezes quiser\n\nprint("---")\n\n# 2. Com parametros, sem retorno (recebe dados, processa, mas nao devolve)\ndef saudar_pessoa(nome, periodo):\n    print(f"Boa {periodo}, {nome}!")\n\nsaudar_pessoa("Raphael", "tarde")   # Boa tarde, Raphael!\nsaudar_pessoa("Maria", "manha")     # Boa manha, Maria!\n\nprint("---")\n\n# 3. Com parametros E com retorno (recebe, processa e devolve)\ndef calcular_desconto(preco, percentual):\n    desconto = preco * (percentual / 100)\n    preco_final = preco - desconto\n    return preco_final\n\npreco_camisa = calcular_desconto(100.0, 20)   # 20% de desconto\npreco_tenis  = calcular_desconto(250.0, 15)   # 15% de desconto\n\nprint(f"Camisa: R$ {preco_camisa:.2f}")   # R$ 80.00\nprint(f"Tenis:  R$ {preco_tenis:.2f}")   # R$ 212.50',
        filename: 'tipos_de_funcao.py',
        description:
          'Funcoes com return sao as mais poderosas: voce pode guardar o resultado em uma variavel e usar em calculos. Funcoes sem return retornam None automaticamente (util para acoes como print, salvar arquivo, etc.).',
      },
    },
    {
      type: 'text',
      content:
        '## Parametros: obrigatorios, padrao e multiplos\n\nVoce pode tornar parametros **opcionais** definindo um valor padrao (default). Se o usuario nao informar, o padrao e usado.\n\n```python\ndef saudar(nome, mensagem="Bem-vindo!"):\n    print(f"{mensagem}, {nome}!")\n\nsaudar("Ana")              # usa o padrao: "Bem-vindo!, Ana!"\nsaudar("Carlos", "Oi")     # substitui o padrao: "Oi, Carlos!"\n```\n\n**Regra**: parametros com padrao sempre vem DEPOIS dos sem padrao.\n\nVoce tambem pode retornar **multiplos valores** em Python usando virgula:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Parametros com valor padrao (default)\ndef calcular_juros(capital, taxa=0.02, meses=12):\n    """Calcula juros simples. Taxa em decimal (0.02 = 2%)\"\"\"\n    juros = capital * taxa * meses\n    total = capital + juros\n    return total\n\n# Usando so o obrigatorio (usa os defaults: 2% por 12 meses)\nprint(f"R$ {calcular_juros(1000):.2f}")          # R$ 1240.00\n\n# Especificando a taxa (usa o default de meses)\nprint(f"R$ {calcular_juros(1000, 0.05):.2f}")    # R$ 1600.00\n\n# Especificando tudo\nprint(f"R$ {calcular_juros(1000, 0.03, 6):.2f}") # R$ 1180.00\n\nprint("---")\n\n# Retornando multiplos valores\ndef min_max(lista):\n    """Retorna o menor e o maior valor de uma lista\"\"\"\n    menor = lista[0]\n    maior = lista[0]\n    for valor in lista:\n        if valor < menor:\n            menor = valor\n        if valor > maior:\n            maior = valor\n    return menor, maior   # retorna dois valores!\n\nnotas = [7.5, 9.0, 5.5, 8.0, 6.5]\nmenor, maior = min_max(notas)  # desempacota os dois retornos\nprint(f"Menor nota: {menor}, Maior nota: {maior}")',
        filename: 'parametros_avancados.py',
        description:
          'As aspas triplas """ logo apos o def sao a docstring — a documentacao da funcao. Descreva o que ela faz, os parametros e o que retorna. Uma boa docstring vale mais que um comentario.',
      },
    },
    {
      type: 'text',
      content:
        '## Escopo: onde as variaveis vivem\n\nEscopo define **onde** uma variavel existe e pode ser acessada. E um conceito fundamental que evita muitos bugs.\n\n### Escopo local\nVariaveis criadas **dentro** de uma funcao so existem dentro dela. Quando a funcao termina, elas somem.\n\n### Escopo global\nVariaveis criadas **fora** de qualquer funcao existem em todo o programa.\n\n### A regra geral\nFuncoes podem **ler** variaveis globais, mas **nao devem modifica-las** diretamente. O correto e passar como parametro e retornar o novo valor. Isso torna o codigo previsivel e facil de testar.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Escopo: onde as variaveis vivem\n\nempresa = "CodLearn"   # variavel GLOBAL — existe em todo o programa\n\ndef mostrar_info(produto, preco):\n    # produto e preco sao LOCAIS — so existem dentro desta funcao\n    descricao = f"{produto}: R$ {preco:.2f}"  # local tambem\n    print(f"[{empresa}] {descricao}")  # pode LER a global\n    return descricao\n\nresultado = mostrar_info("Curso Python", 97.00)\nprint(resultado)\n\n# print(descricao)  # ERRO! descricao nao existe fora da funcao\n\nprint("---")\n\n# Boas praticas: passe dados como parametro, nao use global\ntaxa_global = 0.1  # ruim: a funcao depende de uma variavel externa\n\ndef preco_com_taxa_ruim(preco):\n    return preco * (1 + taxa_global)  # dependencia escondida!\n\ndef preco_com_taxa_certo(preco, taxa):  # bom: tudo que a funcao precisa esta nos parametros\n    return preco * (1 + taxa)\n\nprint(preco_com_taxa_ruim(100))          # 110.0\nprint(preco_com_taxa_certo(100, 0.1))   # 110.0 — mesmo resultado, mas mais claro',
        filename: 'escopo.py',
        description:
          'Funcoes com dependencias escondidas (que dependem de variaveis globais nao declaradas nos parametros) sao dificeis de testar e de entender. Sempre passe como parametro tudo que a funcao precisa.',
      },
    },
    {
      type: 'text',
      content:
        '## Funcoes que chamam funcoes (composicao)\n\nUm dos poderes das funcoes e que voce pode construir funcoes complexas **combinando funcoes simples**. Isso se chama composicao de funcoes.\n\nCada funcao faz uma coisa bem feita → voce combina para resolver problemas maiores.\n\nIsso e o principio do **divide and conquer** (dividir para conquistar): quebre o problema grande em problemas menores, resolva cada um com uma funcao, combine.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Composicao de funcoes: construindo solucoes complexas\n\n# Funcoes pequenas e especializadas\ndef calcular_subtotal(preco, quantidade):\n    return preco * quantidade\n\ndef aplicar_desconto(valor, percentual):\n    return valor * (1 - percentual / 100)\n\ndef calcular_frete(subtotal):\n    if subtotal >= 150:\n        return 0.0     # frete gratis acima de R$150\n    elif subtotal >= 80:\n        return 15.0\n    else:\n        return 25.0\n\ndef calcular_total(subtotal, frete):\n    return subtotal + frete\n\n# Combinando todas para resolver o problema completo\ndef processar_pedido(preco, qtd, desconto_pct):\n    subtotal = calcular_subtotal(preco, qtd)\n    subtotal_com_desconto = aplicar_desconto(subtotal, desconto_pct)\n    frete = calcular_frete(subtotal_com_desconto)\n    total = calcular_total(subtotal_com_desconto, frete)\n    \n    print(f"Subtotal:  R$ {subtotal:.2f}")\n    print(f"Desconto:  -{desconto_pct}%  → R$ {subtotal_com_desconto:.2f}")\n    print(f"Frete:     R$ {frete:.2f}")\n    print(f"Total:     R$ {total:.2f}")\n    return total\n\nprint("=== Pedido 1 ===")\nprocessar_pedido(preco=45.00, qtd=4, desconto_pct=10)\n\nprint()\nprint("=== Pedido 2 ===")\nprocessar_pedido(preco=200.00, qtd=1, desconto_pct=5)',
        filename: 'composicao_funcoes.py',
        description:
          'Cada funcao tem uma responsabilidade unica (Single Responsibility Principle). Sao faceis de testar individualmente e de combinar. Se a logica de frete mudar, voce altera so calcular_frete() e todo o resto continua funcionando.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Como saber quando criar uma funcao? Regra pratica: se voce copiou um bloco de codigo mais de uma vez, crie uma funcao. Se voce precisou pensar muito para entender um trecho, extraia para uma funcao com um bom nome. Nomes descritivos como calcular_desconto() sao documentacao gratuita!',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Funcoes devem fazer UMA coisa bem feita. Uma funcao chamada processar_dados_calcular_preco_enviar_email_e_salvar_no_banco() e um sinal de alerta: esta fazendo coisas demais. Quebre em funcoes menores e especializadas.',
    },
  ],
  challenges: [
    {
      id: 'fm-c1',
      title: 'Verificador de numero par/impar',
      description:
        'Crie uma funcao chamada eh_par(numero) que retorna True se o numero for par e False se for impar. Depois use-a para classificar todos os numeros de 1 a 10.',
      language: 'python',
      starterCode: '# Crie a funcao eh_par(numero)\ndef eh_par(numero):\n    pass  # substitua por return ...\n\n# Teste individualmente\nprint(eh_par(4))    # True\nprint(eh_par(7))    # False\nprint(eh_par(0))    # True\nprint(eh_par(-3))   # False\n\n# Use a funcao para classificar todos os numeros de 1 a 10\nfor n in range(1, 11):\n    tipo = "par" if eh_par(n) else "impar"\n    print(f"{n} eh {tipo}")\n',
      solution: 'def eh_par(numero):\n    return numero % 2 == 0\n\nprint(eh_par(4))\nprint(eh_par(7))\nprint(eh_par(0))\nprint(eh_par(-3))\n\nfor n in range(1, 11):\n    tipo = "par" if eh_par(n) else "impar"\n    print(f"{n} eh {tipo}")',
      hints: [
        'Um numero e par se o resto da divisao por 2 for 0: numero % 2 == 0',
        'Essa expressao ja retorna True ou False, entao: return numero % 2 == 0',
        'range(1, 11) gera os numeros de 1 ate 10 (11 nao incluido)',
        'if eh_par(n) ... else ... usa sua funcao na condicao diretamente',
      ],
    },
    {
      id: 'fm-c2',
      title: 'Calculadora de fatorial',
      description:
        'Crie uma funcao fatorial(n) que calcula o fatorial de um numero usando um loop (n! = 1 * 2 * 3 * ... * n). Para n < 0, retorne None.',
      language: 'python',
      starterCode: 'def fatorial(n):\n    if n < 0:\n        return None  # fatorial nao definido para negativos\n    \n    resultado = 1\n    # Use um loop para multiplicar de 1 ate n\n    # ...\n    \n    return resultado\n\nprint(fatorial(0))   # 1  (por definicao, 0! = 1)\nprint(fatorial(1))   # 1\nprint(fatorial(5))   # 120  (1*2*3*4*5)\nprint(fatorial(10))  # 3628800\n',
      solution: 'def fatorial(n):\n    if n < 0:\n        return None\n    resultado = 1\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado\n\nprint(fatorial(0))\nprint(fatorial(1))\nprint(fatorial(5))\nprint(fatorial(10))',
      hints: [
        'Comece com resultado = 1 (nao 0, porque estaremos multiplicando)',
        'Use for i in range(1, n + 1): para iterar de 1 ate n (n incluido)',
        'Dentro do loop: resultado *= i (multiplica o acumulador por i)',
        'fatorial(0) deve retornar 1 — o loop range(1, 1) nao executa, entao resultado fica 1. Correto!',
      ],
    },
    {
      id: 'fm-c3',
      title: 'Sistema de notas com funcoes',
      description:
        'Implemente as 3 funcoes do sistema de notas: calcular_media(notas) que retorna a media de uma lista, obter_conceito(media) que retorna A/B/C/D/F, e esta_aprovado(media, frequencia) que retorna True se media >= 6.0 E frequencia >= 75.',
      language: 'python',
      starterCode: '# Sistema de notas usando composicao de funcoes\n\ndef calcular_media(notas):\n    """Recebe uma lista de notas e retorna a media"""\n    pass\n\ndef obter_conceito(media):\n    """Retorna o conceito (A/B/C/D/F) baseado na media"""\n    # A: >= 9.0, B: >= 7.5, C: >= 6.0, D: >= 4.0, F: abaixo de 4.0\n    pass\n\ndef esta_aprovado(media, frequencia):\n    """Aprovado se media >= 6.0 E frequencia >= 75"""\n    pass\n\ndef gerar_boletim(nome, notas, frequencia):\n    media = calcular_media(notas)\n    conceito = obter_conceito(media)\n    aprovado = esta_aprovado(media, frequencia)\n    situacao = "APROVADO" if aprovado else "REPROVADO"\n    print(f"Aluno: {nome}")\n    print(f"Notas: {notas}")\n    print(f"Media: {media:.1f} | Conceito: {conceito}")\n    print(f"Frequencia: {frequencia}%")\n    print(f"Situacao: {situacao}")\n\ngerar_boletim("Ana",    [9.5, 8.0, 9.0, 7.5], 90)\nprint()\ngerar_boletim("Carlos", [5.0, 4.5, 6.0, 5.5], 70)\n',
      solution: 'def calcular_media(notas):\n    return sum(notas) / len(notas)\n\ndef obter_conceito(media):\n    if media >= 9.0:\n        return "A"\n    elif media >= 7.5:\n        return "B"\n    elif media >= 6.0:\n        return "C"\n    elif media >= 4.0:\n        return "D"\n    else:\n        return "F"\n\ndef esta_aprovado(media, frequencia):\n    return media >= 6.0 and frequencia >= 75\n\ndef gerar_boletim(nome, notas, frequencia):\n    media = calcular_media(notas)\n    conceito = obter_conceito(media)\n    aprovado = esta_aprovado(media, frequencia)\n    situacao = "APROVADO" if aprovado else "REPROVADO"\n    print(f"Aluno: {nome}")\n    print(f"Notas: {notas}")\n    print(f"Media: {media:.1f} | Conceito: {conceito}")\n    print(f"Frequencia: {frequencia}%")\n    print(f"Situacao: {situacao}")\n\ngerar_boletim("Ana",    [9.5, 8.0, 9.0, 7.5], 90)\nprint()\ngerar_boletim("Carlos", [5.0, 4.5, 6.0, 5.5], 70)',
      hints: [
        'calcular_media: use sum(notas) para somar todos e len(notas) para a quantidade',
        'obter_conceito: use if/elif/else com as faixas de nota em ordem decrescente',
        'esta_aprovado: retorne a expressao booleana diretamente: return media >= 6.0 and frequencia >= 75',
        'gerar_boletim ja esta pronta — voce so precisa implementar as 3 funcoes acima',
      ],
    },
  ],
};
