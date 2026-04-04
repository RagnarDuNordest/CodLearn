import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'operadores-em-c',
  moduleId: 'c',
  title: 'Operadores em C',
  description: 'Conheca os operadores aritmeticos, de comparacao e logicos em C.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Os operadores sao como **ferramentas em uma oficina**: cada um faz um trabalho diferente. Voce tem a chave de fenda (soma), o martelo (subtracao), a furadeira (multiplicacao), e assim por diante. Em C, alem das ferramentas que voce ja conhece do Python, existem algumas novas, como ++ e -- (incremento e decremento).\n\nOs operadores em C sao similares aos do Python, mas com algumas diferencas importantes. Vamos ver cada tipo.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Se voce ja sabe operadores em Python, vai aprender os de C rapidinho! A logica e a mesma, so mudam alguns simbolos. O ++ e -- sao exclusivos de C e vao se tornar seus melhores amigos nos lacos de repeticao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'aritmeticos.c',
        code: `#include <stdio.h>

int main() {
    int a = 10, b = 3;

    printf("Soma: %d\\n", a + b);      // 13
    printf("Subtracao: %d\\n", a - b);  // 7
    printf("Multiplicacao: %d\\n", a * b); // 30
    printf("Divisao: %d\\n", a / b);    // 3 (inteira!)
    printf("Resto: %d\\n", a % b);      // 1

    // Incremento e decremento (exclusivo do C!)
    a++;  // a = a + 1 -> a vira 11
    b--;  // b = b - 1 -> b vira 2
    printf("a: %d, b: %d\\n", a, b);

    return 0;
}`,
        description: 'Divisao entre inteiros em C resulta em inteiro! 10/3 = 3, nao 3.33.',
      },
    },
    {
      type: 'text',
      content: 'Os **operadores logicos** em C usam simbolos diferentes do Python:\n\n**&&** (and) — E logico\n\n**||** (or) — OU logico\n\n**!** (not) — NAO logico',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'logicos.c',
        code: `#include <stdio.h>

int main() {
    int idade = 20;
    int tem_carteira = 1;  // 1 = true, 0 = false

    if (idade >= 18 && tem_carteira) {
        printf("Pode dirigir!\\n");
    }

    if (idade < 12 || idade > 60) {
        printf("Tem desconto!\\n");
    }

    if (!tem_carteira) {
        printf("Sem carteira.\\n");
    }

    return 0;
}`,
        description: 'Em C, usamos && (and), || (or) e ! (not) ao inves de palavras.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Em C nao existe o tipo bool por padrao (ate C99). Usamos int: 0 significa falso e qualquer outro valor significa verdadeiro.',
    },
  ],
  challenges: [
    {
      id: 'operadores-c1',
      title: 'Calculadora Basica',
      description: 'Crie uma calculadora que declara duas variaveis inteiras (a = 15, b = 4) e imprime o resultado de todas as operacoes aritmeticas: soma, subtracao, multiplicacao, divisao inteira e resto da divisao.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int a = 15, b = 4;

    // Imprima o resultado de:
    // Soma (+), Subtracao (-), Multiplicacao (*)
    // Divisao inteira (/), Resto (%)

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int a = 15, b = 4;

    printf("a = %d, b = %d\\n", a, b);
    printf("Soma: %d + %d = %d\\n", a, b, a + b);
    printf("Subtracao: %d - %d = %d\\n", a, b, a - b);
    printf("Multiplicacao: %d * %d = %d\\n", a, b, a * b);
    printf("Divisao inteira: %d / %d = %d\\n", a, b, a / b);
    printf("Resto: %d %% %d = %d\\n", a, b, a % b);

    return 0;
}`,
      hints: [
        'Use %d para imprimir inteiros no printf.',
        'Para imprimir o simbolo % no printf, use %% (dois sinais de porcentagem).',
        'Divisao entre inteiros em C descarta a parte decimal: 15/4 = 3.',
      ],
    },
    {
      id: 'operadores-c2',
      title: 'Verificador de Idade',
      description: 'Declare uma variavel int idade = 17 e uma variavel int tem_autorizacao = 1. Use operadores logicos para verificar: (1) se a pessoa pode dirigir (idade >= 18), (2) se pode entrar com autorizacao (idade >= 16 E tem autorizacao), (3) se tem desconto (idade < 12 OU idade > 65).',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int idade = 17;
    int tem_autorizacao = 1;

    // Verifique e imprima:
    // 1. Pode dirigir? (idade >= 18)
    // 2. Pode entrar com autorizacao? (idade >= 16 && tem_autorizacao)
    // 3. Tem desconto? (idade < 12 || idade > 65)

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int idade = 17;
    int tem_autorizacao = 1;

    if (idade >= 18) {
        printf("Pode dirigir!\\n");
    } else {
        printf("Nao pode dirigir.\\n");
    }

    if (idade >= 16 && tem_autorizacao) {
        printf("Pode entrar com autorizacao!\\n");
    } else {
        printf("Nao pode entrar.\\n");
    }

    if (idade < 12 || idade > 65) {
        printf("Tem desconto!\\n");
    } else {
        printf("Nao tem desconto.\\n");
    }

    return 0;
}`,
      hints: [
        'Use && para E logico e || para OU logico.',
        'Em C, qualquer valor diferente de 0 e verdadeiro.',
        'Use if/else para mostrar mensagens diferentes dependendo do resultado.',
      ],
    },
    {
      id: 'operadores-c3',
      title: 'Incremento e Decremento',
      description: 'Declare uma variavel int contador = 10. Use os operadores ++ e -- para: incrementar 3 vezes (imprimindo o valor a cada passo) e depois decrementar 2 vezes (imprimindo tambem). Mostre o valor final.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int contador = 10;
    printf("Valor inicial: %d\\n", contador);

    // Incremente 3 vezes, imprimindo a cada passo
    // Decremente 2 vezes, imprimindo a cada passo
    // Imprima o valor final

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int contador = 10;
    printf("Valor inicial: %d\\n", contador);

    contador++;
    printf("Apos 1o incremento: %d\\n", contador);
    contador++;
    printf("Apos 2o incremento: %d\\n", contador);
    contador++;
    printf("Apos 3o incremento: %d\\n", contador);

    contador--;
    printf("Apos 1o decremento: %d\\n", contador);
    contador--;
    printf("Apos 2o decremento: %d\\n", contador);

    printf("Valor final: %d\\n", contador);

    return 0;
}`,
      hints: [
        'Use contador++ para incrementar em 1 e contador-- para decrementar em 1.',
        'Imprima o valor apos cada operacao para acompanhar as mudancas.',
        'O valor final deve ser 11 (10 + 3 - 2).',
      ],
    },
  ],
};
