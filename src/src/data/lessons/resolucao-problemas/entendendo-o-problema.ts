import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'entendendo-o-problema',
  moduleId: 'resolucao-problemas',
  title: 'Entendendo o Problema Antes de Codificar',
  description:
    'Aprenda por que entender o problema profundamente antes de escrever qualquer codigo e a habilidade mais importante de um programador -- e como fazer isso de forma sistematica.',
  order: 0,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O erro mais comum de todo programador iniciante\n\nVoce recebe um problema. Seus dedos cocem. Voce abre o editor e comeca a digitar codigo imediatamente.\n\nParece produtivo, certo? Mas e exatamente aqui que a maioria dos iniciantes -- e ate profissionais experientes -- perde horas de trabalho.\n\n**Codificar sem entender o problema e como construir uma casa sem planta.**\n\nVoce faz muito esforco, coloca tijolo por tijolo, mas la pelo meio da obra descobre que o quarto ficou pequeno demais, a porta abre para o lado errado, e a cozinha nao tem janela. Ai voce precisa demolir e comecar tudo de novo.\n\nO mesmo acontece com codigo: voce escreve 50 linhas, testa, e percebe que resolveu o problema errado. Ai voce apaga tudo e recomeца. Frustrate? Com certeza. Evitavel? Completamente.\n\n### Por que isso acontece?\n\nNosso cerebro quer acao. Quando vemos um problema, queremos resolve-lo imediatamente. Isso e instinto. Mas programacao exige um passo contraintuitivo: **antes de agir, pare e pense**.\n\nOs melhores programadores do mundo gastam a maior parte do tempo **pensando** e uma parte menor **digitando**. O codigo e apenas a expressao final de um raciocinio bem feito.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Regra pratica: antes de escrever qualquer linha de codigo, consegua responder claramente estas tres perguntas: (1) Quais sao as ENTRADAS do problema? (2) Qual deve ser a SAIDA esperada? (3) Existem RESTRICOES ou casos especiais que preciso considerar? Se voce nao consegue responder as tres, ainda nao entendeu o problema o suficiente.',
    },
    {
      type: 'text',
      content:
        '## A analogia do medico e do advogado\n\nPense em dois profissionais que nao podem errar no entendimento do problema:\n\n**O medico:** Quando voce chega ao consultorio com dor de cabeca, um bom medico nao sai logo receitando remedios. Ele faz perguntas: Ha quanto tempo voce tem essa dor? A dor e constante ou vem em crises? Voce dormiu mal? Tomou algo? Depois ele examina, analisa os sintomas e so entao diagnostica e prescreve. Um medico apressado que receita sem entender os sintomas pode machucar o paciente.\n\n**O advogado:** Antes de assinar qualquer documento em nome de um cliente, um bom advogado le o contrato palavra por palavra. Ele identifica as partes envolvidas (quem sao as entradas?), o que cada parte deve fazer (qual e o processo?), e quais sao as penalidades e excecoes (quais sao as restricoes?). Um advogado descuidado que assina sem ler pode custar uma fortuna ao cliente.\n\nVoce, programador, precisa ter a mesma disciplina. Antes de codificar, **diagnostique** o problema com cuidado.\n\n## Como ler um problema de forma sistematica\n\nSiga estes 5 passos sempre que receber um problema:\n\n**Passo 1 - Leia uma vez por completo sem fazer nada.** So leia. Entenda o contexto geral.\n\n**Passo 2 - Identifique as entradas.** O que o programa vai receber? Numeros? Texto? Uma lista? Varios valores?\n\n**Passo 3 - Identifique a saida esperada.** O que o programa deve produzir ao final? Um numero? Uma mensagem? Uma lista ordenada?\n\n**Passo 4 - Identifique as restricoes.** Os numeros podem ser negativos? A lista pode estar vazia? Ha um limite de tamanho?\n\n**Passo 5 - Reescreva o problema com suas proprias palavras.** Se voce consegue explicar o problema como se fosse ensinar a um amigo, voce o entendeu.',
    },
    {
      type: 'text',
      content:
        '## Exemplo pratico: clarificando um problema vago\n\nVamos pegar um enunciado real e aplicar os 5 passos.\n\n**Enunciado original (vago):**\n> "Crie um programa que calcule o resultado para uma turma."\n\nEsse enunciado e horrivel. O que e "resultado"? Para qual turma? Como se calcula?\n\n**Aplicando os 5 passos:**\n\n**Passo 1 (leitura geral):** Ok, e sobre uma turma de alunos. Parece envolver notas.\n\n**Passo 2 (entradas):** Quais dados recebo? Preciso perguntar: sao as notas dos alunos? Quantos alunos? As notas sao de 0 a 10?\n\n**Passo 3 (saida):** O que devo mostrar? So a media da turma? O status de cada aluno (aprovado/reprovado)? Os dois?\n\n**Passo 4 (restricoes):** Qual e a nota minima para aprovacao? E se um aluno nao fez prova? Pode ter lista vazia?\n\n**Passo 5 (reescrita):** Depois de esclarecer tudo, o problema ficou assim:\n> "Receba uma lista de notas (numeros de 0.0 a 10.0) de N alunos. Calcule a media da turma. Para cada aluno, exiba a nota e se ele foi aprovado (nota >= 6.0) ou reprovado. A lista tera pelo menos 1 aluno."\n\nAgora sim! Temos entradas claras, saida clara e restricoes definidas. **Isso e um problema que podemos resolver.**',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Problema clarificado:\n# Entradas: lista de notas de alunos (floats entre 0.0 e 10.0)\n# Saida: media da turma + status de cada aluno\n# Restricao: nota >= 6.0 significa aprovado, lista tem ao menos 1 elemento\n\n# Veja como o entendimento do problema guia CADA linha do codigo:\n\n# As entradas que identificamos:\nnotas = [7.5, 5.0, 8.0, 4.5, 9.0, 6.0]\n\n# Calculo da saida 1: media da turma\nsoma = 0\nfor nota in notas:\n    soma = soma + nota\nmedia = soma / len(notas)  # len() conta quantos elementos ha na lista\n\nprint("=== Resultado da Turma ===")\nprint(f"Media da turma: {media:.1f}")  # :.1f formata com 1 casa decimal\nprint()\n\n# Saida 2: status de cada aluno (restricao: nota >= 6.0)\nprint("--- Status individual ---")\nfor i, nota in enumerate(notas):  # enumerate da o indice E o valor\n    if nota >= 6.0:  # A restricao que identificamos\n        status = "Aprovado"\n    else:\n        status = "Reprovado"\n    print(f"Aluno {i + 1}: nota {nota} -> {status}")',
        filename: 'turma_resultado.py',
        description:
          'Veja como cada linha do codigo reflete uma decisao tomada ANTES de codificar: as entradas viram variaveis, a saida vira o que printamos, e as restricoes viram os ifs. O codigo e apenas a traducao do entendimento.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Tecnica do "rubber duck" (pato de borracha): explique o problema em voz alta para um objeto inanimado -- um pato de borracha, uma caneta, qualquer coisa. O ato de verbalizar forca seu cerebro a organizar o raciocinio. Programadores profissionais usam essa tecnica o tempo todo. Se voce travar explicando, e porque ainda nao entendeu o problema completamente.',
    },
  ],
  challenges: [
    {
      id: 'ep-c1',
      title: 'Identificando entradas, saidas e restricoes',
      description:
        'Leia o seguinte enunciado e implemente o programa com base nas entradas, saidas e restricoes que voce consegue identificar: "Um supermercado quer saber o total da compra de um cliente. O cliente comprou 3 produtos. Cada produto tem um nome, uma quantidade e um preco unitario. Exiba o subtotal de cada produto (quantidade * preco) e o total geral da compra."',
      language: 'python',
      starterCode:
        '# Entradas identificadas: nome, quantidade e preco de 3 produtos\n# Saida esperada: subtotal de cada produto e total geral\n# Restricao: subtotal = quantidade * preco\n\n# Produto 1\nnome1 = "Arroz"\nquantidade1 = 2\npreco1 = 5.50\n\n# Produto 2\nnome2 = "Feijao"\nquantidade2 = 1\npreco2 = 8.00\n\n# Produto 3\nnome3 = "Oleo"\nquantidade3 = 1\npreco3 = 6.75\n\n# Calcule o subtotal de cada produto e o total geral\n# Use print() para exibir cada subtotal e o total\n',
      solution:
        '# Produto 1\nnome1 = "Arroz"\nquantidade1 = 2\npreco1 = 5.50\nsubtotal1 = quantidade1 * preco1\n\n# Produto 2\nnome2 = "Feijao"\nquantidade2 = 1\npreco2 = 8.00\nsubtotal2 = quantidade2 * preco2\n\n# Produto 3\nnome3 = "Oleo"\nquantidade3 = 1\npreco3 = 6.75\nsubtotal3 = quantidade3 * preco3\n\n# Total geral\ntotal = subtotal1 + subtotal2 + subtotal3\n\nprint("=== Compra do Cliente ===")\nprint(f"{nome1}: {quantidade1} x R${preco1:.2f} = R${subtotal1:.2f}")\nprint(f"{nome2}: {quantidade2} x R${preco2:.2f} = R${subtotal2:.2f}")\nprint(f"{nome3}: {quantidade3} x R${preco3:.2f} = R${subtotal3:.2f}")\nprint(f"Total geral: R${total:.2f}")',
      hints: [
        'Identifique as entradas: nome, quantidade e preco de cada produto. Cada uma vira uma variavel.',
        'O subtotal de cada produto e quantidade * preco. Faca esse calculo para cada um dos 3 produtos.',
        'O total geral e a soma dos tres subtotais. Use print() com f-strings para exibir: f"Produto: R${valor:.2f}"',
      ],
    },
    {
      id: 'ep-c2',
      title: 'Reescrevendo um problema complexo de forma simples',
      description:
        'O enunciado a seguir e confuso e vago. Seu desafio e implementar um programa que resolva o que o enunciado REALMENTE quer dizer: "Preciso saber sobre os numeros que o usuario tem. Faca algo util com eles." -- Na pratica, isso significa: dada a lista de numeros abaixo, calcule e exiba o maior valor, o menor valor e a media aritmetica.',
      language: 'python',
      starterCode:
        '# Enunciado clarificado:\n# Entradas: uma lista de numeros\n# Saidas: o maior valor, o menor valor e a media\n# Restricoes: a lista tem pelo menos 1 elemento\n\nnumeros = [14, 7, 23, 5, 18, 11, 30, 2]\n\n# Encontre o maior numero\n# Dica: comece assumindo que o primeiro numero e o maior\n# e compare com cada um dos outros\n\n# Encontre o menor numero\n# Dica: mesma logica, mas para o menor\n\n# Calcule a media\n# Dica: soma de todos dividido pela quantidade\n\n# Exiba os resultados\n',
      solution:
        'numeros = [14, 7, 23, 5, 18, 11, 30, 2]\n\n# Encontrar o maior\nmaior = numeros[0]  # Assume que o primeiro e o maior\nfor n in numeros:\n    if n > maior:\n        maior = n\n\n# Encontrar o menor\nmenor = numeros[0]  # Assume que o primeiro e o menor\nfor n in numeros:\n    if n < menor:\n        menor = n\n\n# Calcular a media\nsoma = 0\nfor n in numeros:\n    soma = soma + n\nmedia = soma / len(numeros)\n\nprint(f"Numeros: {numeros}")\nprint(f"Maior: {maior}")\nprint(f"Menor: {menor}")\nprint(f"Media: {media:.2f}")',
      hints: [
        'Para o maior: comece com maior = numeros[0]. Percorra a lista e sempre que encontrar um numero maior que "maior", atualize "maior".',
        'Para o menor: mesma logica -- comece com menor = numeros[0] e atualize sempre que encontrar algo menor.',
        'Para a media: some todos os numeros com um loop for e divida pelo total de elementos: len(numeros).',
      ],
    },
  ],
};
