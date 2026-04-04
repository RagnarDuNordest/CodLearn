import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'pensamento-computacional',
  moduleId: 'logica',
  title: 'Pensamento Computacional',
  description:
    'Aprenda os 4 pilares do pensamento computacional e como aplicar essa forma de pensar para resolver qualquer problema de forma estruturada.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        '## O que e pensamento computacional?\n\nImagine que voce recebeu uma caixa enorme de LEGO toda misturada e precisa montar um castelo. Parece impossivel, certo? Mas se voce separar as pecas por cor, identificar padroes nas instrucoes, ignorar detalhes que nao importam e seguir o passo a passo, tudo fica muito mais simples.\n\nO **pensamento computacional** funciona exatamente assim: e uma forma de **resolver problemas** dividindo-os em partes menores e organizadas. E nao se preocupe -- voce nao precisa saber programar para usar essa habilidade! Ela serve para qualquer area da vida.\n\nVamos ver juntos os **4 pilares** que formam essa abordagem poderosa.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O pensamento computacional nao exige um computador! Voce pode pratica-lo no papel, no quadro branco ou ate mentalmente. O importante e desenvolver o habito de pensar de forma estruturada antes de comecar a resolver qualquer problema.',
    },
    {
      type: 'text',
      content:
        '## Os 4 pilares do pensamento computacional\n\n### 1. Decomposicao\n\nDecomposicao e a capacidade de **dividir um problema complexo em partes menores** e mais faceis de resolver. Em vez de tentar resolver tudo de uma vez, voce quebra o problema em pedacos gerenciaveis.\n\n**Analogia:** Pense em como voce limpa a casa. Voce nao pensa \"vou limpar a casa inteira agora\". Voce divide: primeiro a cozinha, depois o banheiro, depois o quarto. Cada parte e mais facil de resolver sozinha.\n\n**Exemplo do dia a dia - Receita de bolo:**\n- Problema: "Fazer um bolo"\n- Decomposicao: (1) Separar os ingredientes, (2) Misturar os secos, (3) Misturar os liquidos, (4) Combinar tudo, (5) Colocar na forma, (6) Assar, (7) Decorar\n\n### 2. Reconhecimento de padroes\n\nE a habilidade de **identificar similaridades ou tendencias** em dados ou problemas. Quando voce reconhece um padrao, pode reaproveitar solucoes que ja funcionaram antes.\n\n**Exemplo:** Se voce percebe que toda segunda-feira o transito esta ruim, voce identifica um padrao e pode sair mais cedo nesse dia.\n\n### 3. Abstracao\n\nAbstracao significa **focar no que e importante** e ignorar detalhes irrelevantes. E como criar um mapa: voce nao precisa desenhar cada arvore e cada pedra, apenas as ruas e referencias importantes.\n\n**Exemplo:** Ao dar instrucoes para alguem chegar a sua casa, voce nao descreve a cor de cada predio no caminho. Voce menciona apenas os pontos de referencia essenciais.\n\n### 4. Design de algoritmos\n\nE a criacao de um **plano passo a passo** para resolver o problema. Um algoritmo e uma sequencia clara e ordenada de instrucoes que leva a solucao.\n\n**Exemplo:** Um GPS cria um algoritmo (rota) para voce chegar ao destino: "Siga em frente 200m, vire a direita, siga 500m, vire a esquerda..."',
    },
    {
      type: 'text',
      content:
        '## Exemplo pratico: organizando uma viagem\n\nVamos aplicar os 4 pilares para organizar uma viagem:\n\n**1. Decomposicao** - Dividir em tarefas menores:\n- Escolher o destino\n- Definir as datas\n- Reservar hospedagem\n- Comprar passagens\n- Planejar o roteiro\n- Fazer as malas\n\n**2. Reconhecimento de padroes:**\n- "Sempre que viajo, preciso de documentos, roupas e itens de higiene" (padrao para fazer malas)\n- "Destinos de praia precisam de roupas leves; montanha precisa de roupas quentes" (padrao para escolher o que levar)\n\n**3. Abstracao:**\n- Para escolher o destino, focar em: orcamento, clima e preferencias. Ignorar detalhes como "qual restaurante vou jantar no terceiro dia"\n\n**4. Design de algoritmo:**\n- Passo 1: Definir orcamento disponivel\n- Passo 2: Pesquisar destinos dentro do orcamento\n- Passo 3: Verificar disponibilidade nas datas desejadas\n- Passo 4: Reservar hospedagem e transporte\n- Passo 5: Montar roteiro dia a dia\n- Passo 6: Preparar bagagem conforme o destino',
    },
    {
      type: 'text',
      content:
        '## Vendo os pilares em codigo\n\nAgora vamos ver um exemplo simples em Python que mostra os pilares do pensamento computacional na pratica. Nao se preocupe se voce ainda nao conhece Python -- vamos explicar cada linha com comentarios detalhados!\n\nO objetivo e calcular a media de notas de uma turma e dizer quem foi aprovado. Veja como **decompomos** o problema em etapas claras:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo: Decompondo o problema de calcular a media de uma turma\n# Em vez de resolver tudo de uma vez, decompomos em etapas:\n\n# Etapa 1: Coletar as notas (criamos uma lista com 5 valores)\n# Em Python, colchetes [] criam uma lista -- como uma caixinha\n# que guarda varios valores de uma vez\nnotas = [7.5, 8.0, 6.5, 9.0, 5.5]\n\n# Etapa 2: Calcular a soma de todas as notas\n# Comecamos com soma valendo 0\nsoma = 0\n# A linha abaixo percorre cada nota da lista, uma por uma\n# E como pegar cada nota de dentro da caixinha e somar\nfor nota in notas:\n    soma = soma + nota  # Acumula cada nota na variavel soma\n\n# Etapa 3: Calcular a media\n# len(notas) retorna quantas notas temos na lista (neste caso, 5)\nmedia = soma / len(notas)\n\n# Etapa 4: Exibir o resultado\n# print() mostra uma mensagem na tela\nprint("Notas da turma:", notas)\nprint("Soma total:", soma)\nprint("Media da turma:", media)\n\n# Etapa 5: Classificar cada aluno (reconhecimento de padrao)\n# O padrao e: nota >= 7 significa aprovado, caso contrario reprovado\nfor nota in notas:\n    if nota >= 7:         # Se a nota for maior ou igual a 7...\n        print(nota, "- Aprovado")\n    else:                 # Caso contrario...\n        print(nota, "- Reprovado")',
        filename: 'pensamento_computacional.py',
        description:
          'Veja como decompomos o problema em 5 etapas claras. Cada etapa resolve uma parte pequena do problema. Nao se preocupe em decorar os comandos Python agora -- o importante e entender a logica por tras de cada etapa!',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Nao se preocupe se o codigo Python ainda parece estranho! Neste modulo de logica, o foco e entender a FORMA DE PENSAR, nao a linguagem em si. Voce vai aprender Python em detalhes no proximo modulo. Por enquanto, leia os comentarios e foque na logica.',
    },
    {
      type: 'text',
      content: '## Como implementar em Python\n\nNos exercicios desta licao, voce vai escrever Python. Aqui esta o essencial:\n\n**Variaveis** guardam valores: `preco = 200.00`, `percentual = 15`\n\n**Calculos:** use `+`, `-`, `*`, `/`. Para calcular desconto: `desconto = preco * percentual / 100`\n\n**Exibir:** `print("Preco:", valor)` ou com f-string: `print(f"Preco: {valor}")`\n\n**Listas (vetores):** `notas = [7.5, 8.0, 9.0]`. Percorra com `for item in lista:`\n\n**Loop for:** `for i in range(8):` repete 8 vezes (de 0 a 7)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'python_essencial.py',
        code: `# Decomposicao em Python:

# Etapa 1: Definir os valores
preco = 200.00
percentual = 15

# Etapa 2: Calcular o desconto
desconto = preco * percentual / 100

# Etapa 3: Calcular o preco final
preco_final = preco - desconto

# Etapa 4: Exibir os resultados
print("Preco original: R$", preco)
print("Desconto:", percentual, "%")
print("Valor do desconto: R$", desconto)
print("Preco final: R$", preco_final)

# Loop (laco de repeticao):
numero = 2
for i in range(8):   # Repete 8 vezes (i vai de 0 a 7)
    print("Termo", i + 1, ":", numero)
    numero = numero * 3  # Multiplica por 3 a cada vez`,
        description: 'Variaveis guardam valores, calculos usam * e /, print() exibe resultados, for repete.',
      },
    },
  ],
  challenges: [
    {
      id: 'pc-c1',
      title: 'Decompondo um problema real',
      description:
        'Aplique a decomposicao para resolver o seguinte problema: calcular o preco final de um produto com desconto. O produto custa R$ 200 e tem 15% de desconto. Decomponha em etapas e calcule o preco final.',
      language: 'python',
      starterCode: '# Problema: Calcular o preco final de um produto com desconto\n# Decomponha em etapas:\n\n# O preco original do produto\npreco = 200.00\n\n# O percentual de desconto\npercentual = 15\n\n# Etapa 1: Calcular o valor do desconto\n# Dica: multiplique o preco pelo percentual e divida por 100\n\n# Etapa 2: Calcular o preco final (preco menos o desconto)\n\n# Etapa 3: Exibir os valores usando print()\n# Exiba o preco original, o desconto e o preco final\n',
      solution: '# O preco original do produto\npreco = 200.00\n\n# O percentual de desconto\npercentual = 15\n\n# Etapa 1: Calcular o valor do desconto\ndesconto = preco * percentual / 100\n\n# Etapa 2: Calcular o preco final\npreco_final = preco - desconto\n\n# Etapa 3: Exibir os valores\nprint("Preco original: R$", preco)\nprint("Desconto:", percentual, "%")\nprint("Valor do desconto: R$", desconto)\nprint("Preco final: R$", preco_final)',
      hints: [
        'Para calcular o desconto, multiplique o preco pelo percentual e divida por 100: preco * percentual / 100.',
        'O preco final e o preco original menos o valor do desconto.',
        'Use print() para exibir os resultados. Exemplo: print("Texto", variavel).',
      ],
    },
    {
      id: 'pc-c2',
      title: 'Identificando padroes em sequencias',
      description:
        'Observe a sequencia de numeros e identifique o padrao para calcular os proximos valores. A sequencia comeca com [2, 6, 18, 54, ...]. Descubra o padrao (cada numero e multiplicado por 3) e complete o programa para gerar os 8 primeiros termos da sequencia.',
      language: 'python',
      starterCode: '# Sequencia: 2, 6, 18, 54, ...\n# Padrao identificado: cada numero e multiplicado por ?\n\nnumero = 2\ntermos = 8\n\n# Use um laco para gerar os primeiros termos da sequencia\n# Dica: identifique por qual valor cada numero e multiplicado\n# O comando "for i in range(termos)" repete o bloco\n# de codigo abaixo dele um total de "termos" vezes (8 vezes)\n',
      solution: '# Sequencia: 2, 6, 18, 54, ...\n# Padrao identificado: cada numero e multiplicado por 3\n\nnumero = 2\ntermos = 8\n\n# range(termos) gera os numeros 0, 1, 2, ..., 7\n# Ou seja, o bloco abaixo repete 8 vezes\nfor i in range(termos):\n    print("Termo", i + 1, ":", numero)\n    numero = numero * 3',
      hints: [
        'Observe: 2 * 3 = 6, 6 * 3 = 18, 18 * 3 = 54. O padrao e multiplicar por 3!',
        'Use um laco for com range(termos) para repetir o processo. range(8) repete 8 vezes.',
        'A cada repeticao, exiba o numero atual com print() e depois multiplique-o por 3.',
      ],
    },
  ],
};
