import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'como-pensar-como-dev',
  moduleId: 'estrutura-pensamento',
  title: 'Como Pensar Como um Desenvolvedor',
  description:
    'Descubra a diferenca entre o pensamento humano comum e o pensamento computacional, e aprenda a abordagem sistematica que todo desenvolvedor usa para resolver problemas complexos.',
  order: 0,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que faz um desenvolvedor pensar diferente?\n\nQuando voce pede um prato em um restaurante, voce nao pensa em cada detalhe: o cozinheiro que prepara, a temperatura do fogo, o tempo exato de cada ingrediente. Voce so pensa no resultado: "quero uma pizza margherita".\n\nO desenvolvedor de software pensa exatamente ao contrario. Ele precisa **descrever cada passo com tanta precisao** que uma maquina -- que nao tem intuicao, bom senso ou experiencia de vida -- consiga executar.\n\nIsso e a essencia do pensamento computacional: transformar problemas vagos em instrucoes precisas, ordenadas e sem ambiguidade.\n\n### O humano pensa assim:\n- "Vai la na cozinha e pega alguma coisa pra comer."\n\n### O computador precisa de:\n- Va ate a cozinha.\n- Abra a geladeira.\n- Veja o que tem disponivel.\n- Se tiver fruta, pegue a fruta.\n- Se nao tiver fruta, verifique se tem po.\n- Se tiver po, faca uma torrada.\n- Feche a geladeira.\n- Volte para a sala.\n\nA diferenca parece ridicula, mas e exatamente essa precisao que separa o codigo que funciona do codigo que trava.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Voce nao precisa saber programar para pensar como desenvolvedor. Essa habilidade e anterior ao codigo -- e uma forma de encarar problemas. Muitos grandes engenheiros de software dizem que a parte mais dificil do trabalho nao e escrever codigo, e entender exatamente qual problema precisa ser resolvido.',
    },
    {
      type: 'text',
      content:
        '## As tres grandes ferramentas do pensamento de dev\n\n### 1. Quebre o problema em pedacos (Decomposicao)\n\nImagine que voce foi contratado para construir uma casa. Nenhum construtor experiente chega na obra e comeca a empilhar tijolos sem plano. Ele divide o projeto em fases: fundacao, estrutura, alvenaria, instalacoes, acabamento.\n\nDa mesma forma, um desenvolvedor nunca ataca um sistema inteiro de uma vez. Ele pergunta: **"Quais sao as partes desse problema?"**\n\n**Exemplo:** Criar um aplicativo de delivery:\n- Modulo de cadastro de restaurantes\n- Modulo de cardapio\n- Modulo de pedidos\n- Modulo de pagamento\n- Modulo de entrega\n- Modulo de avaliacoes\n\nCada modulo e um problema menor, muito mais facil de resolver.\n\n### 2. Identifique o que entra e o que sai (Entradas e Saidas)\n\nTodo problema computacional e uma **transformacao**: algo entra, algo e processado, algo sai.\n\nPense em um GPS:\n- **Entrada:** endereco de destino + sua localizacao atual\n- **Processamento:** calculo da melhor rota\n- **Saida:** instrucoes passo a passo\n\nAntes de escrever qualquer codigo, o desenvolvedor pergunta: "O que esse sistema recebe? O que ele deve produzir?"\n\n### 3. Siga uma abordagem sistematica (Algoritmo)\n\nUm algoritmo e simplesmente uma receita -- uma sequencia de passos que, seguida corretamente, resolve um problema especifico.\n\nUma receita de bolo e um algoritmo:\n1. Pre-aquecer o forno a 180 graus\n2. Misturar os ingredientes secos\n3. Adicionar os liquidos\n4. Bater por 5 minutos\n5. Colocar na forma untada\n6. Assar por 40 minutos\n7. Deixar esfriar\n\nPerceba: a **ordem importa**. Se voce esqueceu de pre-aquecer o forno e so lembrou na etapa 6, o resultado sera diferente. Algoritmos sao sensíveis a sequencia.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo: Pensando como dev para calcular o preco final de uma compra\n#\n# PASSO 1: Identificar entradas e saidas\n# Entrada: preco do produto, percentual de desconto\n# Saida: preco final apos desconto\n#\n# PASSO 2: Quebrar o problema em etapas\n# Etapa A - receber os dados de entrada\n# Etapa B - calcular o valor do desconto\n# Etapa C - subtrair o desconto do preco original\n# Etapa D - mostrar o resultado\n#\n# PASSO 3: Escrever o codigo seguindo as etapas\n\n# Etapa A: dados de entrada\npreco_original = 150.00   # preco em reais\ndesconto_pct = 20         # percentual de desconto (20%)\n\n# Etapa B: calcular o valor do desconto\nvalor_desconto = preco_original * desconto_pct / 100\n\n# Etapa C: calcular o preco final\npreco_final = preco_original - valor_desconto\n\n# Etapa D: mostrar o resultado\nprint("Preco original: R$", preco_original)\nprint("Desconto aplicado:", desconto_pct, "%")\nprint("Voce economiza: R$", valor_desconto)\nprint("Preco final: R$", preco_final)',
        filename: 'pensar_como_dev.py',
        description:
          'Veja como o pensamento de dev aparece antes do codigo: identificamos entradas e saidas, decompomos em etapas, e so entao escrevemos cada linha. Essa sequencia de raciocinio e mais valiosa do que memorizar comandos.',
      },
    },
    {
      type: 'text',
      content:
        '## Diferenca entre pensamento humano e computacional\n\n| Aspecto | Pensamento Humano | Pensamento Computacional |\n|---|---|---|\n| Instrucoes | Vagas e contextuais | Precisas e explicitas |\n| Ordem | Flexivel | Rigidamente sequencial |\n| Ambiguidade | Tolerada | Inaceitavel |\n| Intuicao | Presente | Inexistente |\n| Adaptacao | Natural | Requer programacao explicita |\n\nIsso nao significa que o pensamento computacional e superior ao humano -- eles sao complementares. O humano define **o que** quer resolver; o pensamento computacional descreve **como** resolver de forma que qualquer agente (humano ou maquina) possa executar sem adivinhar.\n\n### A mentalidade do desenvolvedor na pratica\n\n**Antes de codar, o desenvolvedor pergunta:**\n1. Qual e o problema real que preciso resolver?\n2. Quais sao as entradas que o sistema vai receber?\n3. Qual e a saida esperada?\n4. Quais sao os casos especiais (e se a entrada for invalida?)?\n5. Consigo quebrar isso em partes menores?\n\nDesenvolver esse habito de perguntar antes de agir e o que diferencia um programador iniciante de um profissional experiente.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Antes de abrir o editor de codigo, tente escrever no papel (ou num arquivo de texto) o que o programa deve fazer, quais dados ele recebe e o que ele deve produzir. Esse habito simples evita horas de retrabalho e e usado por desenvolvedores de todos os niveis de experiencia.',
    },
  ],
  challenges: [
    {
      id: 'dev-mindset-c1',
      title: 'Organizando os Passos em Ordem Correta',
      description:
        'Um desenvolvedor iniciante escreveu os passos para calcular a media de tres notas, mas colocou tudo fora de ordem e sem clareza. Reescreva o programa de forma organizada: primeiro defina as notas, depois some, depois calcule a media e por fim exiba o resultado com print().',
      language: 'python',
      starterCode:
        '# Problema: calcular a media de tres notas e dizer se o aluno foi aprovado\n# Notas do aluno: 6.0, 8.5, 7.0\n# Aprovado se media >= 7.0\n\n# ORGANIZE os passos abaixo na ordem correta:\n# - Calcular a soma das notas\n# - Definir as tres notas\n# - Verificar se foi aprovado ou reprovado\n# - Calcular a media (soma / quantidade de notas)\n# - Exibir a media com print()\n\n# Escreva o codigo aqui:\n',
      solution:
        '# Passo 1: Definir as tres notas\nnota1 = 6.0\nnota2 = 8.5\nnota3 = 7.0\n\n# Passo 2: Calcular a soma\nsoma = nota1 + nota2 + nota3\n\n# Passo 3: Calcular a media\nmedia = soma / 3\n\n# Passo 4: Exibir a media\nprint("Media do aluno:", media)\n\n# Passo 5: Verificar aprovacao\nif media >= 7.0:\n    print("Resultado: Aprovado")\nelse:\n    print("Resultado: Reprovado")',
      hints: [
        'Comece sempre pelos dados de entrada -- defina as variaveis nota1, nota2 e nota3 primeiro.',
        'Soma as tres notas em uma variavel chamada "soma", depois divida por 3 para obter a media.',
        'Use if/else para verificar: se media >= 7.0, imprima "Aprovado"; caso contrario, "Reprovado".',
      ],
    },
    {
      id: 'dev-mindset-c2',
      title: 'Identificando Entradas e Saidas',
      description:
        'Voce precisa criar um programa que converte temperatura de Celsius para Fahrenheit. Antes de codar, identifique a entrada e a saida nos comentarios, depois implemente. A formula e: fahrenheit = (celsius * 9/5) + 32. Teste com 0, 100 e 37 graus Celsius.',
      language: 'python',
      starterCode:
        '# Problema: converter temperatura de Celsius para Fahrenheit\n#\n# ENTRADA: (complete aqui o que o programa recebe)\n# ___________________________________________________\n#\n# SAIDA: (complete aqui o que o programa deve produzir)\n# ___________________________________________________\n#\n# FORMULA: fahrenheit = (celsius * 9/5) + 32\n\n# Agora implemente o programa para as tres temperaturas:\ntemp_celsius_1 = 0\ntemp_celsius_2 = 100\ntemp_celsius_3 = 37\n\n# Calcule e exiba o equivalente em Fahrenheit para cada uma\n',
      solution:
        '# Problema: converter temperatura de Celsius para Fahrenheit\n#\n# ENTRADA: temperatura em graus Celsius (um numero decimal)\n# SAIDA: temperatura equivalente em graus Fahrenheit\n#\n# FORMULA: fahrenheit = (celsius * 9/5) + 32\n\n# Temperaturas para converter\ntemp_celsius_1 = 0\ntemp_celsius_2 = 100\ntemp_celsius_3 = 37\n\n# Conversao e exibicao para cada temperatura\nfahrenheit_1 = (temp_celsius_1 * 9 / 5) + 32\nprint(temp_celsius_1, "graus Celsius =", fahrenheit_1, "graus Fahrenheit")\n\nfahrenheit_2 = (temp_celsius_2 * 9 / 5) + 32\nprint(temp_celsius_2, "graus Celsius =", fahrenheit_2, "graus Fahrenheit")\n\nfahrenheit_3 = (temp_celsius_3 * 9 / 5) + 32\nprint(temp_celsius_3, "graus Celsius =", fahrenheit_3, "graus Fahrenheit")',
      hints: [
        'A entrada e a temperatura em Celsius (um numero). A saida e a temperatura em Fahrenheit (outro numero).',
        'Para cada temperatura, aplique a formula: fahrenheit = (celsius * 9 / 5) + 32.',
        'Use print() para exibir cada resultado no formato "X graus Celsius = Y graus Fahrenheit".',
      ],
    },
  ],
};
