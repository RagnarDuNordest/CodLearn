import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'variaveis-e-tipos-em-c',
  moduleId: 'c',
  title: 'Variaveis e Tipos em C',
  description: 'Entenda como declarar variaveis e os tipos de dados em C.',
  order: 1,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Imagine que variaveis sao como **caixas de diferentes tamanhos** em um deposito. Em Python, as caixas se ajustam automaticamente ao que voce coloca dentro. Em C, voce precisa escolher o tamanho certo da caixa antes de usar: uma caixa pequena para um caractere, uma media para um numero inteiro, uma grande para um numero decimal com muita precisao.\n\nEm C, diferente do Python, voce **precisa declarar o tipo** de cada variavel antes de usa-la. Isso porque C precisa saber exatamente quanta memoria reservar.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'No comeco, ter que declarar tipos pode parecer trabalhoso comparado com Python. Mas isso te da um superpoder: voce sabe exatamente quanta memoria seu programa usa e o compilador te avisa quando voce tenta colocar o tipo errado! Com o tempo, isso vira natural.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'variaveis.c',
        code: `#include <stdio.h>

int main() {
    int idade = 20;
    float altura = 1.75;
    double pi = 3.14159265358979;
    char letra = 'A';

    printf("Idade: %d\\n", idade);
    printf("Altura: %.2f\\n", altura);
    printf("Pi: %.10f\\n", pi);
    printf("Letra: %c\\n", letra);

    return 0;
}`,
        description: 'Cada tipo usa um especificador de formato diferente no printf.',
      },
    },
    {
      type: 'text',
      content: 'Os principais tipos em C:\n\n**int** — Numeros inteiros (4 bytes): -2 bilhoes a +2 bilhoes\n\n**float** — Decimais com precisao simples (4 bytes)\n\n**double** — Decimais com precisao dupla (8 bytes)\n\n**char** — Um unico caractere (1 byte)\n\nOs especificadores de formato sao: **%d** (int), **%f** (float/double), **%c** (char), **%s** (string).',
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Variaveis nao inicializadas em C contem "lixo de memoria" — valores aleatorios! Sempre inicialize suas variaveis.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'sizeof_exemplo.c',
        code: `#include <stdio.h>

int main() {
    printf("int: %lu bytes\\n", sizeof(int));
    printf("float: %lu bytes\\n", sizeof(float));
    printf("double: %lu bytes\\n", sizeof(double));
    printf("char: %lu bytes\\n", sizeof(char));
    return 0;
}`,
        description: 'sizeof() mostra quantos bytes cada tipo ocupa na memoria.',
      },
    },
  ],
  challenges: [
    {
      id: 'variaveis-c1',
      title: 'Ficha do Aluno',
      description: 'Declare variaveis para armazenar o nome (char[]), a idade (int), a altura (float) e a nota final (double) de um aluno. Atribua valores e imprima tudo formatado usando os especificadores corretos.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    // Declare as variaveis:
    // - nome (char array)
    // - idade (int)
    // - altura (float)
    // - nota (double)
    // Atribua valores e imprima cada uma

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    char nome[] = "Carlos";
    int idade = 21;
    float altura = 1.78;
    double nota = 8.75;

    printf("Nome: %s\\n", nome);
    printf("Idade: %d anos\\n", idade);
    printf("Altura: %.2f m\\n", altura);
    printf("Nota final: %.2f\\n", nota);

    return 0;
}`,
      hints: [
        'Para strings em C, use char nome[] = "texto";',
        'Use %s para strings, %d para int, %f para float e double.',
        'Use %.2f para limitar a duas casas decimais.',
      ],
    },
    {
      id: 'variaveis-c2',
      title: 'Tamanho dos Tipos',
      description: 'Crie um programa que mostra o tamanho em bytes de cada tipo basico usando sizeof(). Imprima o tamanho de int, float, double, char e long.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    // Use sizeof() para mostrar o tamanho de cada tipo
    // Tipos: int, float, double, char, long

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    printf("Tamanho dos tipos em C:\\n");
    printf("int: %lu bytes\\n", sizeof(int));
    printf("float: %lu bytes\\n", sizeof(float));
    printf("double: %lu bytes\\n", sizeof(double));
    printf("char: %lu bytes\\n", sizeof(char));
    printf("long: %lu bytes\\n", sizeof(long));

    return 0;
}`,
      hints: [
        'sizeof() retorna o tamanho em bytes de um tipo.',
        'Use o especificador %lu para imprimir o resultado de sizeof.',
        'A sintaxe e: sizeof(tipo) — por exemplo, sizeof(int).',
      ],
    },
    {
      id: 'variaveis-c3',
      title: 'Conversao de Temperatura',
      description: 'Declare uma variavel float para temperatura em Celsius (ex: 36.5). Converta para Fahrenheit usando a formula F = C * 9/5 + 32 e imprima ambos os valores com uma casa decimal.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    // Declare a temperatura em Celsius
    // Converta para Fahrenheit: F = C * 9.0/5.0 + 32.0
    // Imprima ambos os valores

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    float celsius = 36.5;
    float fahrenheit = celsius * 9.0 / 5.0 + 32.0;

    printf("Temperatura: %.1f C\\n", celsius);
    printf("Temperatura: %.1f F\\n", fahrenheit);

    return 0;
}`,
      hints: [
        'Use float para armazenar temperaturas com decimais.',
        'Na formula, use 9.0 e 5.0 (com ponto) para evitar divisao inteira.',
        'Use %.1f para mostrar uma casa decimal.',
      ],
    },
  ],
};
