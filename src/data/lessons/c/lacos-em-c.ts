import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lacos-em-c',
  moduleId: 'c',
  title: 'Lacos de Repeticao em C',
  description: 'Aprenda a usar for, while e do-while em C.',
  order: 4,
  type: 'lesson',
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Lacos de repeticao sao como uma **esteira de fabrica**: o mesmo processo se repete automaticamente ate que uma condicao diga "pare". Em vez de escrever a mesma instrucao 100 vezes, voce escreve uma vez e o laco cuida do resto.\n\nOs lacos em C sao parecidos com os do Python, mas a sintaxe do **for** e bem diferente. O for em C tem tres partes: inicializacao, condicao e incremento.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'O for em C parece mais complicado que o for do Python no inicio, mas ele e muito poderoso! Com as tres partes (inicio, condicao, incremento), voce tem controle total do laco em uma unica linha. Depois de escrever alguns, vai achar ate mais intuitivo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'for_loop.c',
        code: `#include <stdio.h>

int main() {
    // for (inicio; condicao; incremento)
    for (int i = 1; i <= 5; i++) {
        printf("Numero: %d\\n", i);
    }

    // Tabuada do 7
    for (int i = 1; i <= 10; i++) {
        printf("7 x %d = %d\\n", i, 7 * i);
    }

    return 0;
}`,
        description: 'O for em C: inicializa, verifica a condicao, executa o bloco e incrementa.',
      },
    },
    {
      type: 'text',
      content: '## while e do-while\n\nAlm do `for`, C oferece mais dois tipos de laco:\n\n- **`while`** — Verifica a condicao **antes** de executar o bloco. Se a condicao for falsa desde o inicio, o bloco nunca executa\n- **`do-while`** — Executa o bloco **ao menos uma vez** e so entao verifica a condicao. E exclusivo de C (Python nao tem equivalente direto)\n\nO `do-while` e especialmente util para **menus interativos**, onde voce quer exibir as opcoes pelo menos uma vez antes de verificar a escolha do usuario.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'while_dowhile.c',
        code: `#include <stdio.h>

int main() {
    // while: verifica ANTES de executar
    int contagem = 5;
    while (contagem > 0) {
        printf("%d\\n", contagem);
        contagem--;
    }
    printf("Fogo!\\n");

    // do-while: executa PELO MENOS UMA VEZ
    int opcao;
    do {
        printf("Digite 0 para sair: ");
        scanf("%d", &opcao);
    } while (opcao != 0);

    return 0;
}`,
        description: 'do-while e exclusivo de C e garante pelo menos uma execucao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'O do-while e muito usado para menus! Ele mostra o menu pelo menos uma vez e repete ate o usuario escolher sair.',
    },
  ],
  challenges: [
    {
      id: 'lacos-c1',
      title: 'Tabuada Completa',
      description: 'Use um laco for para imprimir a tabuada de um numero (ex: 5). Imprima de 5 x 1 = 5 ate 5 x 10 = 50.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int numero = 5;

    printf("Tabuada do %d:\\n", numero);

    // Use um for para imprimir a tabuada de 1 a 10
    // Formato: "5 x 1 = 5"

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int numero = 5;

    printf("Tabuada do %d:\\n", numero);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", numero, i, numero * i);
    }

    return 0;
}`,
      hints: [
        'O laco for deve ir de i = 1 ate i <= 10.',
        'O resultado de cada linha e numero * i.',
        'Use %d tres vezes no printf para mostrar os valores.',
      ],
    },
    {
      id: 'lacos-c2',
      title: 'Triangulo de Asteriscos',
      description: 'Use lacos for aninhados para imprimir um triangulo de asteriscos com 5 linhas. A primeira linha tem 1 asterisco, a segunda tem 2, e assim por diante.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int linhas = 5;

    // Imprima o seguinte padrao:
    // *
    // **
    // ***
    // ****
    // *****

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int linhas = 5;

    for (int i = 1; i <= linhas; i++) {
        for (int j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }

    return 0;
}`,
      hints: [
        'Use dois for: o externo controla as linhas, o interno os asteriscos.',
        'Na linha i, voce deve imprimir i asteriscos.',
        'Depois de cada linha de asteriscos, use printf("\\n") para pular de linha.',
      ],
    },
    {
      id: 'lacos-c3',
      title: 'Contagem Regressiva com While',
      description: 'Use um laco while para fazer uma contagem regressiva de 10 ate 1, imprimindo cada numero. Ao final, imprima "Lancamento!" usando do-while para garantir que a mensagem final sempre aparece.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int contagem = 10;

    // Use while para contar de 10 ate 1
    // Use do-while para imprimir "Lancamento!" ao final

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int contagem = 10;

    while (contagem > 0) {
        printf("%d...\\n", contagem);
        contagem--;
    }

    int lancou = 0;
    do {
        printf("Lancamento!\\n");
        lancou = 1;
    } while (lancou == 0);

    return 0;
}`,
      hints: [
        'O while continua enquanto contagem > 0. Nao esqueca de decrementar!',
        'Use contagem-- dentro do while para diminuir o valor a cada iteracao.',
        'O do-while executa o bloco pelo menos uma vez, ideal para a mensagem final.',
      ],
    },
  ],
};
