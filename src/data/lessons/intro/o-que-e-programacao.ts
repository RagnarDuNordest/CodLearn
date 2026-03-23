import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-programacao',
  moduleId: 'intro',
  title: 'O que e Programacao?',
  description:
    'Descubra o que significa programar, por que as linguagens de programacao existem e como e o dia a dia de quem trabalha com codigo.',
  order: 0,
  estimatedMinutes: 10,
  sections: [
    {
      type: 'text',
      content:
        'Imagine que voce precisa ensinar alguem a fazer um bolo de chocolate. Voce escreveria uma receita com instrucoes claras e em ordem: primeiro separe os ingredientes, depois misture a farinha com o acucar, em seguida adicione os ovos, e assim por diante. Se a pessoa seguir cada passo corretamente, o resultado sera um bolo delicioso.\n\nProgramar e exatamente isso: escrever uma sequencia de instrucoes para que o computador execute uma tarefa. A diferenca e que, em vez de farinha e ovos, usamos dados, e em vez de portugues, usamos uma linguagem que o computador consegue entender.',
    },
    {
      type: 'text',
      content:
        '## O que sao linguagens de programacao?\n\nOs computadores nao entendem portugues, ingles ou qualquer idioma humano diretamente. Eles so entendem sequencias de zeros e uns (o famoso codigo binario). Mas escrever programas em zeros e uns seria extremamente dificil e tedioso.\n\nPor isso, foram criadas as **linguagens de programacao**. Elas funcionam como um meio-termo: sao simples o suficiente para nos, humanos, escrevermos e lermos, e ao mesmo tempo podem ser traduzidas para a linguagem que o computador entende.\n\nExistem centenas de linguagens de programacao, cada uma com suas vantagens. Neste curso, vamos focar em duas muito importantes: **Python** e **C**. Python e conhecida por ser simples e legivel, otima para quem esta comecando. C e mais proxima do hardware e te da uma compreensao profunda de como o computador funciona.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: 'print("Ola, mundo!")',
        filename: 'ola_mundo.py',
        description:
          'Este e o programa mais classico da programacao. Ele simplesmente exibe a mensagem "Ola, mundo!" na tela. Em Python, a funcao print() e usada para mostrar textos.',
      },
    },
    {
      type: 'text',
      content:
        '## Por que aprender a programar?\n\nProgramar nao e so para quem quer trabalhar com tecnologia. E uma habilidade que desenvolve o **raciocinio logico**, a capacidade de **resolver problemas** e a **criatividade**. Veja algumas razoes para aprender:\n\n- **Automatizar tarefas repetitivas**: em vez de fazer a mesma coisa 100 vezes, voce escreve um programa que faz por voce.\n- **Criar solucoes**: aplicativos, sites, jogos, ferramentas — tudo isso e feito com programacao.\n- **Oportunidades de carreira**: a area de tecnologia e uma das que mais cresce no mundo, com otimos salarios e possibilidade de trabalho remoto.\n- **Entender o mundo digital**: vivemos cercados de tecnologia. Saber programar ajuda a entender como tudo funciona por tras das telas.',
    },
    {
      type: 'text',
      content:
        '## O que um programador faz no dia a dia?\n\nMuita gente imagina um programador digitando codigo freneticamente o dia inteiro, mas a realidade e bem diferente. O dia a dia de quem programa envolve:\n\n- **Entender o problema**: antes de escrever qualquer codigo, e preciso compreender o que precisa ser resolvido.\n- **Planejar a solucao**: pensar na logica e na estrutura antes de comecar a digitar.\n- **Escrever codigo**: sim, essa parte existe, mas e apenas uma fracao do trabalho.\n- **Testar e corrigir erros**: programas raramente funcionam perfeitamente na primeira tentativa. Encontrar e corrigir erros (os famosos "bugs") faz parte da rotina.\n- **Colaborar com outras pessoas**: programadores trabalham em equipe, discutem ideias e revisam o codigo uns dos outros.',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa decorar tudo! Ate programadores experientes consultam documentacao e pesquisam na internet diariamente. O importante e entender os conceitos e saber onde encontrar as respostas quando precisar.',
      calloutType: 'tip',
    },
  ],
  challenges: [
    {
      id: 'oqep-c1',
      title: 'Sua primeira mensagem',
      description:
        'Use a funcao print() para exibir a mensagem "Ola, eu estou aprendendo a programar!" na tela. Lembre-se de que o texto deve estar entre aspas dentro dos parenteses.',
      language: 'python',
      starterCode: '# Exiba a mensagem "Ola, eu estou aprendendo a programar!" na tela\n',
      solution:
        'print("Ola, eu estou aprendendo a programar!")',
      hints: [
        'A funcao print() serve para exibir textos na tela.',
        'O texto que voce quer exibir deve estar entre aspas, dentro dos parenteses: print("seu texto aqui").',
      ],
      testCases: [
        {
          description: 'Exibe a mensagem correta',
          expectedOutput: 'Ola, eu estou aprendendo a programar!',
        },
      ],
    },
    {
      id: 'oqep-c2',
      title: 'Exibindo varias linhas',
      description:
        'Exiba tres mensagens na tela, cada uma em uma linha separada:\n1. "Eu sou um programador!"\n2. "Python e incrivel!"\n3. "Vamos aprender juntos!"',
      language: 'python',
      starterCode: '# Exiba as tres mensagens abaixo, cada uma com seu proprio print()\n# 1. "Eu sou um programador!"\n# 2. "Python e incrivel!"\n# 3. "Vamos aprender juntos!"\n',
      solution:
        'print("Eu sou um programador!")\nprint("Python e incrivel!")\nprint("Vamos aprender juntos!")',
      hints: [
        'Voce precisa usar a funcao print() tres vezes, uma para cada mensagem.',
        'Cada chamada de print() exibe o texto e pula para a proxima linha automaticamente.',
        'Exemplo: print("primeira linha") e depois print("segunda linha") na linha de baixo.',
      ],
      testCases: [
        {
          description: 'Exibe as tres mensagens na ordem correta',
          expectedOutput: 'Eu sou um programador!\nPython e incrivel!\nVamos aprender juntos!',
        },
      ],
    },
    {
      id: 'oqep-c3',
      title: 'Fazendo uma conta simples',
      description:
        'O computador tambem sabe fazer contas! Use print() para exibir o resultado da soma 10 + 25. Atencao: nao coloque a conta entre aspas, senao o Python vai exibir o texto "10 + 25" em vez do resultado.',
      language: 'python',
      starterCode: '# Use print() para exibir o resultado da soma 10 + 25\n# Dica: numeros e contas nao precisam de aspas!\n',
      solution: 'print(10 + 25)',
      hints: [
        'Para exibir o resultado de uma conta, coloque a expressao matematica dentro de print() sem aspas.',
        'Se voce escrever print("10 + 25"), o Python exibe o texto "10 + 25". Sem aspas, ele calcula o resultado: print(10 + 25).',
      ],
      testCases: [
        {
          description: 'Exibe o resultado correto (35)',
          expectedOutput: '35',
        },
      ],
    },
  ],
};
