import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'primeiro-programa-em-c',
  moduleId: 'c',
  title: 'Seu Primeiro Programa em C',
  description: 'Escreva e entenda seu primeiro programa na linguagem C.',
  order: 0,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Imagine que voce escreveu uma carta em portugues, mas o destinatario so entende japones. Voce precisaria de um tradutor para converter sua carta, certo? E exatamente isso que acontece na programacao em C!\n\nVoce escreve o programa em uma linguagem que faz sentido para humanos (o codigo em C), e um programa chamado **compilador** traduz tudo para a linguagem que o computador entende (zeros e uns). Esse processo de traducao se chama **compilacao**.\n\nA linguagem **C** e uma das mais importantes da historia da computacao. Sistemas operacionais como Linux e Windows, bancos de dados e ate o proprio Python foram escritos em C! Para Engenharia da Computacao, C e essencial porque permite controlar o hardware diretamente.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao se assuste com a quantidade de linhas! A estrutura de um programa em C e sempre a mesma, e logo voce vai escrever isso sem nem pensar. Vamos entender cada parte com calma.',
    },
    {
      type: 'text',
      content: 'Antes de ver o codigo, vamos entender alguns termos importantes:\n\n**Biblioteca** — E como uma caixa de ferramentas pronta. Em vez de criar tudo do zero, voce "pega emprestado" funcoes que outras pessoas ja fizeram. Por exemplo, a funcao para imprimir texto na tela ja existe dentro de uma biblioteca chamada `stdio.h`.\n\n**Funcao** — E um bloco de codigo que faz uma tarefa especifica. Pense como uma receita: voce chama pelo nome e ela executa os passos. A funcao `printf` por exemplo, tem a tarefa de imprimir texto na tela.\n\n**Compilar** — Traduzir seu codigo C para linguagem de maquina (zeros e uns), criando um programa executavel que o computador consegue rodar.',
    },
    {
      type: 'text',
      content: 'Agora que voce ja conhece os termos, vamos ver o programa mais classico da programacao: o "Ola, mundo!"',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'ola.c',
        code: '#include <stdio.h>\n\nint main() {\n    printf("Ola, mundo!\\n");\n    return 0;\n}',
        description: 'O classico "Hello World" em C. Todo programador do mundo comecou por aqui!',
      },
    },
    {
      type: 'text',
      content: 'Vamos entender cada linha do programa:\n\n**#include <stdio.h>** — Essa linha diz ao compilador: "vou usar funcoes de entrada e saida". A palavra `stdio` vem de **st**andar**d** **i**nput/**o**utput (entrada/saida padrao). E a biblioteca que contem o `printf`.\n\n**int main()** — A funcao principal do programa. Todo programa em C comeca a executar a partir daqui. O `int` na frente significa que essa funcao vai retornar um numero inteiro ao final.\n\n**printf("Ola, mundo!\\n")** — Chama a funcao `printf` para imprimir o texto na tela. O `\\n` no final e um caractere especial que pula para a proxima linha (como apertar Enter).\n\n**return 0** — Indica que o programa terminou com sucesso. E como dizer "missao cumprida!" para o sistema operacional.\n\nRepare que cada instrucao termina com **ponto-e-virgula (;)**. Em C, isso e obrigatorio — e como o ponto final de uma frase.',
    },
    {
      type: 'comparison',
      comparison: {
        python: {
          language: 'python',
          code: 'print("Ola, mundo!")',
          filename: 'ola.py',
        },
        c: {
          language: 'c',
          code: '#include <stdio.h>\n\nint main() {\n    printf("Ola, mundo!\\n");\n    return 0;\n}',
          filename: 'ola.c',
        },
        explanation: 'Em Python, uma unica linha basta. Em C, precisamos de mais estrutura: incluir a biblioteca (stdio.h), definir a funcao main, usar ponto-e-virgula no final de cada instrucao e adicionar o \\n para pular de linha. Parece mais trabalhoso, mas essa estrutura da a voce mais controle sobre o programa!',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'C e uma linguagem **compilada**. Isso significa que voce precisa traduzir seu codigo para um executavel antes de rodar. Para compilar e executar, use os comandos: gcc ola.c -o ola && ./ola. O **gcc** e o compilador mais usado para C.',
    },
  ],
  challenges: [
    {
      id: 'primeiro-programa-c1',
      title: 'Apresentacao Pessoal',
      description: 'Use printf para imprimir seu nome, sua idade e seu curso, cada um em uma linha separada. Use \\n para pular linhas. Lembre-se: cada printf imprime uma parte do texto, e \\n cria uma nova linha.',
      language: 'c',
      starterCode: '#include <stdio.h>\n\nint main() {\n    // Imprima seu nome, idade e curso em linhas separadas\n    // Use printf e \\n para cada linha\n\n    return 0;\n}',
      solution: '#include <stdio.h>\n\nint main() {\n    printf("Nome: Maria Silva\\n");\n    printf("Idade: 20 anos\\n");\n    printf("Curso: Engenharia da Computacao\\n");\n    return 0;\n}',
      hints: [
        'Use uma chamada de printf para cada linha de informacao.',
        'Lembre-se de colocar \\n no final de cada string para pular de linha, como vimos na licao.',
        'O formato e: printf("Texto aqui\\n"); — nao esqueca do ponto-e-virgula no final!',
      ],
    },
    {
      id: 'primeiro-programa-c2',
      title: 'Cartao de Visita Formatado',
      description: 'Crie um cartao de visita usando printf com uma borda feita de asteriscos (*). O cartao deve ter uma linha de asteriscos em cima e embaixo, e no meio seu nome e email. Cada printf imprime uma linha do cartao.',
      language: 'c',
      starterCode: '#include <stdio.h>\n\nint main() {\n    // Crie um cartao de visita formatado assim:\n    // **************************\n    // * Nome: Seu Nome         *\n    // * Email: seu@email.com   *\n    // **************************\n\n    return 0;\n}',
      solution: '#include <stdio.h>\n\nint main() {\n    printf("**************************\\n");\n    printf("* Nome: Maria Silva      *\\n");\n    printf("* Email: maria@email.com *\\n");\n    printf("**************************\\n");\n    return 0;\n}',
      hints: [
        'Cada printf imprime uma linha do cartao. Voce vai precisar de 4 chamadas de printf.',
        'Use espacos para alinhar o texto dentro do cartao e manter o formato bonito.',
        'Nao esqueca do \\n no final de cada printf para pular de linha.',
      ],
    },
    {
      id: 'primeiro-programa-c3',
      title: 'Compilacao e Execucao',
      description: 'Escreva um programa que imprime as 3 etapas para compilar e executar um programa em C usando o gcc. Cada etapa deve estar numerada. Use o que aprendemos: printf e \\n.',
      language: 'c',
      starterCode: '#include <stdio.h>\n\nint main() {\n    // Imprima as etapas para compilar e executar:\n    // 1. Escrever o codigo (.c)\n    // 2. Compilar com gcc\n    // 3. Executar o programa\n\n    return 0;\n}',
      solution: '#include <stdio.h>\n\nint main() {\n    printf("Como compilar um programa em C:\\n");\n    printf("1. Escrever o codigo no arquivo .c\\n");\n    printf("2. Compilar com: gcc programa.c -o programa\\n");\n    printf("3. Executar com: ./programa\\n");\n    return 0;\n}',
      hints: [
        'Use um printf para o titulo e um para cada etapa — total de 4 chamadas de printf.',
        'Lembre-se de usar \\n para quebrar as linhas, como aprendemos na licao.',
        'O comando de compilacao e: gcc arquivo.c -o executavel. Depois executa com ./executavel.',
      ],
    },
  ],
};
