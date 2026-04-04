import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'diagramas-e-fluxogramas',
  moduleId: 'estrutura-pensamento',
  title: 'Diagramas e Fluxogramas',
  description:
    'Aprenda a desenhar fluxogramas para visualizar a logica do seu programa antes de escrever codigo, e entenda como os simbolos representam diferentes tipos de instrucoes.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Por que desenhar antes de codar?\n\nArquitetos nao comecam a construir uma casa sem uma planta. Engenheiros nao fabricam um aviao sem um projeto detalhado. Por que desenvolvedores tentariam escrever sistemas complexos sem um diagrama?\n\nUm **fluxograma** e a planta baixa do seu programa. Ele mostra, de forma visual, o caminho que os dados percorrem e as decisoes que o programa toma. Quando voce desenha o fluxograma antes de codar:\n\n- Voce identifica erros de logica ANTES de perder tempo codando algo errado\n- Voce ve claramente todos os caminhos possiveis (e os casos que esqueceu)\n- Fica mais facil explicar o programa para outras pessoas\n- O codigo flui naturalmente a partir do diagrama\n\n### Os simbolos do fluxograma\n\nFluxogramas tem uma linguagem padrao com simbolos especificos:\n\n```\n  ( INICIO / FIM )     <- Ovalo: ponto de inicio ou termino do fluxo\n  [   PROCESSO   ]     <- Retangulo: uma operacao ou calculo\n  < DECISAO (S/N) >    <- Losango: uma pergunta com duas saidas (Sim/Nao)\n       |                <- Seta: direcao do fluxo\n```\n\nCada simbolo tem um proposito claro. Misturar os simbolos e como misturar a sintaxe de uma linguagem de programacao -- o resultado sera confuso.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'bash',
        code: '# Fluxograma: verificar se um numero eh par ou impar\n#\n#          ( INICIO )\n#               |\n#               v\n#       [ Receber numero ]\n#               |\n#               v\n#   < numero % 2 == 0 ? >\n#       /           \\\n#    SIM             NAO\n#     |               |\n#     v               v\n# [ Exibir "Par" ] [ Exibir "Impar" ]\n#     |               |\n#     +-------+-------+\n#             |\n#             v\n#          ( FIM )',
        filename: 'fluxograma_par_impar.txt',
        description:
          'Este fluxograma em texto representa a logica de verificar par ou impar. O losango (<>) representa a decisao, e as setas SIM e NAO mostram os dois caminhos possiveis.',
      },
    },
    {
      type: 'text',
      content:
        '## Lendo e escrevendo fluxogramas\n\nVamos analisar um fluxograma mais complexo: o processo de login em um sistema.\n\n```\n( INICIO )\n     |\n     v\n[ Usuario digita email e senha ]\n     |\n     v\n< Email existe no sistema? >\n  |             |\n NAO            SIM\n  |              |\n  v              v\n[ Exibir    < Senha esta correta? >\n "Email nao    |              |\n encontrado" ] NAO            SIM\n  |              |              |\n  v              v              v\n( FIM )  [ Incrementar   [ Fazer login ]\n          tentativas ]   [ Redirecionar ]\n               |                |\n               v                v\n     < 3 tentativas? >       ( FIM )\n          |        |\n         SIM       NAO\n          |        |\n          v        v\n  [ Bloquear    ( FIM )\n    conta ]\n       |\n       v\n    ( FIM )\n```\n\nPerceba o que o fluxograma revela:\n- Ha dois pontos de decisao\n- Ha quatro caminhos possiveis ate o FIM\n- O bloqueio de conta foi pensado antes de codar\n- E facil ver que nos esquecemos de tratar "3 tentativas" antes de fazer o fluxograma completo\n\nIsso e o valor real do fluxograma: **ele forca voce a pensar em todos os caminhos**, incluindo os casos de erro que geralmente sao esquecidos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Implementacao direta do fluxograma de login\n# Cada bloco do fluxograma vira uma parte do codigo\n\n# Dados simulados do sistema\nusuarios_cadastrados = {\n    "ana@email.com": "senha123",\n    "carlos@email.com": "abc456",\n}\n\ndef fazer_login(email, senha):\n    tentativas = 0\n    max_tentativas = 3\n\n    # [ DECISAO 1: Email existe? ]\n    if email not in usuarios_cadastrados:\n        print("Erro: email nao encontrado.")\n        return False\n\n    # Loop de tentativas (o losango "3 tentativas?" vira um while)\n    while tentativas < max_tentativas:\n\n        # [ DECISAO 2: Senha correta? ]\n        if usuarios_cadastrados[email] == senha:\n            print("Login realizado com sucesso! Bem-vindo,", email)\n            return True\n        else:\n            tentativas = tentativas + 1\n            restantes = max_tentativas - tentativas\n            if restantes > 0:\n                print("Senha incorreta.", restantes, "tentativas restantes.")\n\n    # [ Bloquear conta ] - executado apos 3 tentativas\n    print("Conta bloqueada por excesso de tentativas. Contate o suporte.")\n    return False\n\n# Testando os caminhos do fluxograma\nprint("--- Teste 1: email inexistente ---")\nfazer_login("zé@email.com", "123")\n\nprint("--- Teste 2: senha errada 3 vezes ---")\nfazer_login("ana@email.com", "errada")\n\nprint("--- Teste 3: login correto ---")\nfazer_login("carlos@email.com", "abc456")',
        filename: 'fluxograma_login.py',
        description:
          'Observe como cada bloco do fluxograma vira uma parte do codigo: o losango vira um if/else, o loop de tentativas vira um while, e cada retangulo vira uma instrucao. O fluxograma foi o mapa, o codigo e o territorio.',
      },
    },
    {
      type: 'text',
      content:
        '## Dicas para fazer bons fluxogramas\n\n**1. Comece sempre com um INICIO e termine com um FIM**\nFluxogramas sem inicio e fim claro criam confusao sobre o escopo do processo.\n\n**2. Um losango, duas saidas**\nCada decisao (losango) deve ter exatamente dois caminhos: Sim e Nao. Se voce tem mais de duas opcoes, use losangos encadeados.\n\n**3. Setas nunca ficam sem destino**\nTodo caminho deve terminar em um FIM ou retornar para um ponto anterior (loop).\n\n**4. Niveis de detalhe**\nNao tente colocar tudo em um diagrama so. Faca um fluxograma de alto nivel primeiro, depois detalhe cada bloco que precisar.\n\n**5. Use linguagem simples nos blocos**\nDentro dos retangulos e losangos, escreva em linguagem natural, nao em codigo. Ex: "Calcular imposto" em vez de "imposto = valor * 0.12".\n\n### Fluxograma vs. Pseudocodigo\n\n| | Fluxograma | Pseudocodigo |\n|---|---|---|\n| Formato | Visual/grafico | Texto estruturado |\n| Pontos fortes | Ver o fluxo e loops | Escrever logica detalhada |\n| Melhor para | Decisoes complexas | Algoritmos detalhados |\n| Ferramenta | Papel, Miro, draw.io | Qualquer editor de texto |\n\nUse os dois juntos para os melhores resultados.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Voce nao precisa de ferramenta especial para fazer fluxogramas. Um papel e uma caneta funcionam perfeitamente. O habito de desenhar o fluxo antes de codar e muito mais valioso do que a ferramenta usada. Muitos desenvolvedores senioris ainda preferem papel e quadro branco a qualquer software de diagramacao.',
    },
  ],
  challenges: [
    {
      id: 'fluxograma-c1',
      title: 'Implementando um Fluxograma como Codigo',
      description:
        'O fluxograma abaixo descreve um sistema de classificacao de temperaturas. Implemente-o em Python:\nINICIO -> Receber temperatura -> temp < 0? (SIM: "Abaixo de zero") (NAO: temp <= 15? (SIM: "Frio") (NAO: temp <= 25? (SIM: "Agradavel") (NAO: "Quente"))) -> FIM.\nTeste com: -5, 10, 22, 35.',
      language: 'python',
      starterCode:
        '# Implemente o fluxograma de classificacao de temperatura\n#\n# Fluxograma:\n# INICIO\n#   |-> Receber temperatura\n#   |-> temp < 0?  -> SIM: "Abaixo de zero"\n#                 -> NAO: temp <= 15? -> SIM: "Frio"\n#                                     -> NAO: temp <= 25? -> SIM: "Agradavel"\n#                                                         -> NAO: "Quente"\n# FIM\n\ndef classificar_temperatura(temp):\n    # Implemente a logica do fluxograma aqui\n    # Use if / elif / else para cada losango do fluxograma\n    pass\n\n# Teste com os quatro valores\ntemperaturas = [-5, 10, 22, 35]\nfor t in temperaturas:\n    resultado = classificar_temperatura(t)\n    print(t, "graus ->", resultado)\n',
      solution:
        'def classificar_temperatura(temp):\n    if temp < 0:\n        return "Abaixo de zero"\n    elif temp <= 15:\n        return "Frio"\n    elif temp <= 25:\n        return "Agradavel"\n    else:\n        return "Quente"\n\ntemperaturas = [-5, 10, 22, 35]\nfor t in temperaturas:\n    resultado = classificar_temperatura(t)\n    print(t, "graus ->", resultado)',
      hints: [
        'Cada losango do fluxograma vira um if ou elif no codigo. Siga a ordem do fluxograma de cima para baixo.',
        'Use if temp < 0, elif temp <= 15, elif temp <= 25 e else para cobrir todos os caminhos.',
        'Use "return" dentro de cada bloco para retornar a classificacao correspondente.',
      ],
    },
    {
      id: 'fluxograma-c2',
      title: 'Criando uma Arvore de Decisao para Recomendacao',
      description:
        'Crie uma arvore de decisao (sequencia de if/elif/else) que recomenda um tipo de exercicio baseado em respostas. Regras: se tem equipamento E tempo >= 45 min -> "Musculacao completa"; se tem equipamento E tempo < 45 min -> "Treino rapido com pesos"; se nao tem equipamento E tempo >= 30 min -> "Corrida ou caminhada"; se nao tem equipamento E tempo < 30 min -> "Exercicios corporais em casa".',
      language: 'python',
      starterCode:
        '# Arvore de decisao para recomendacao de exercicio\n# Duas perguntas: tem_equipamento (True/False) e tempo_disponivel (minutos)\n\ndef recomendar_exercicio(tem_equipamento, tempo_disponivel):\n    # Implemente a arvore de decisao:\n    # tem_equipamento?\n    #   SIM -> tempo >= 45?\n    #             SIM -> "Musculacao completa"\n    #             NAO -> "Treino rapido com pesos"\n    #   NAO -> tempo >= 30?\n    #             SIM -> "Corrida ou caminhada"\n    #             NAO -> "Exercicios corporais em casa"\n    pass\n\n# Teste todos os 4 caminhos da arvore:\nprint(recomendar_exercicio(True, 60))   # Musculacao completa\nprint(recomendar_exercicio(True, 30))   # Treino rapido com pesos\nprint(recomendar_exercicio(False, 45))  # Corrida ou caminhada\nprint(recomendar_exercicio(False, 20))  # Exercicios corporais em casa\n',
      solution:
        'def recomendar_exercicio(tem_equipamento, tempo_disponivel):\n    if tem_equipamento:\n        if tempo_disponivel >= 45:\n            return "Musculacao completa"\n        else:\n            return "Treino rapido com pesos"\n    else:\n        if tempo_disponivel >= 30:\n            return "Corrida ou caminhada"\n        else:\n            return "Exercicios corporais em casa"\n\nprint(recomendar_exercicio(True, 60))\nprint(recomendar_exercicio(True, 30))\nprint(recomendar_exercicio(False, 45))\nprint(recomendar_exercicio(False, 20))',
      hints: [
        'Comece com "if tem_equipamento:" para a primeira decisao da arvore. Dentro desse bloco, faca outra decisao com if/else para o tempo.',
        'No bloco "else:" (quando nao tem equipamento), repita a logica de decisao por tempo: if tempo_disponivel >= 30.',
        'Arvores de decisao sao ifs aninhados: um if dentro de outro. Cada nivel da arvore e um nivel de indentacao no codigo.',
      ],
    },
  ],
};
