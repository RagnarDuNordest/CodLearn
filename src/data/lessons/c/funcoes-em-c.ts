import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes-em-c',
  moduleId: 'c',
  title: 'Funcoes em C',
  description: 'Aprenda a criar e usar funcoes na linguagem C.',
  order: 5,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Funcoes sao como **maquinas especializadas em uma fabrica**: cada uma recebe materiais (parametros), faz um trabalho especifico (processamento), e devolve um produto pronto (retorno). Em vez de repetir o mesmo processo toda vez, voce chama a maquina pelo nome e ela faz tudo sozinha.\n\nEm C, funcoes precisam declarar o **tipo de retorno** e o **tipo de cada parametro**. Se a funcao nao retorna nada, usamos **void**.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Funcoes sao a chave para escrever codigo organizado e reutilizavel! Se voce ja criou funcoes em Python, vai ver que em C a logica e a mesma. A diferenca e que C pede que voce declare os tipos -- mas isso ajuda a evitar erros antes mesmo de rodar o programa.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'funcoes.c',
        code: `#include <stdio.h>

// Funcao que retorna um int
int somar(int a, int b) {
    return a + b;
}

// Funcao que nao retorna nada (void)
void saudacao(char nome[]) {
    printf("Ola, %s!\\n", nome);
}

int main() {
    int resultado = somar(5, 3);
    printf("Soma: %d\\n", resultado);  // 8

    saudacao("Raphael");
    return 0;
}`,
        description: 'Funcoes em C declaram tipos de retorno e parametros explicitamente.',
      },
    },
    {
      type: 'text',
      content: 'Em C, as funcoes precisam ser **declaradas antes de serem usadas**. Voce pode fazer isso de duas formas: definindo a funcao antes do main, ou usando um **prototipo**:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'prototipo.c',
        code: `#include <stdio.h>

// Prototipo (declaracao antecipada)
float calcular_media(float notas[], int tamanho);

int main() {
    float notas[] = {8.0, 7.5, 9.0, 6.5};
    float media = calcular_media(notas, 4);
    printf("Media: %.1f\\n", media);
    return 0;
}

// Implementacao da funcao (pode ficar depois do main)
float calcular_media(float notas[], int tamanho) {
    float soma = 0;
    for (int i = 0; i < tamanho; i++) {
        soma += notas[i];
    }
    return soma / tamanho;
}`,
        description: 'Prototipos permitem definir a funcao depois do main.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Em C, parametros sao passados por **valor** (uma copia). Para modificar a variavel original, voce precisa usar ponteiros (proximo modulo!).',
    },
  ],
  challenges: [
    {
      id: 'funcoes-c1',
      title: 'Funcoes Matematicas',
      description: 'Crie tres funcoes: uma para calcular o quadrado de um numero (int), uma para calcular o cubo (int), e uma para verificar se um numero e par (retorna int: 1 para par, 0 para impar). Teste todas no main.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Crie a funcao: int quadrado(int n)

// Crie a funcao: int cubo(int n)

// Crie a funcao: int eh_par(int n)

int main() {
    int num = 5;

    // Teste as funcoes com o numero 5
    // Imprima os resultados

    return 0;
}`,
      solution: `#include <stdio.h>

int quadrado(int n) {
    return n * n;
}

int cubo(int n) {
    return n * n * n;
}

int eh_par(int n) {
    return n % 2 == 0;
}

int main() {
    int num = 5;

    printf("Numero: %d\\n", num);
    printf("Quadrado: %d\\n", quadrado(num));
    printf("Cubo: %d\\n", cubo(num));

    if (eh_par(num)) {
        printf("%d e par\\n", num);
    } else {
        printf("%d e impar\\n", num);
    }

    return 0;
}`,
      hints: [
        'Cada funcao deve declarar o tipo de retorno (int) e o tipo do parametro.',
        'Para verificar se e par, use o operador resto: n % 2 == 0.',
        'Defina as funcoes antes do main ou use prototipos.',
      ],
    },
    {
      id: 'funcoes-c2',
      title: 'Calculadora com Funcoes',
      description: 'Crie quatro funcoes (somar, subtrair, multiplicar, dividir) que recebem dois floats e retornam float. Na funcao dividir, verifique se o divisor e zero antes de dividir. Teste todas no main.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Crie as funcoes:
// float somar(float a, float b)
// float subtrair(float a, float b)
// float multiplicar(float a, float b)
// float dividir(float a, float b)

int main() {
    float x = 10.0, y = 3.0;

    // Teste todas as funcoes e imprima os resultados

    return 0;
}`,
      solution: `#include <stdio.h>

float somar(float a, float b) {
    return a + b;
}

float subtrair(float a, float b) {
    return a - b;
}

float multiplicar(float a, float b) {
    return a * b;
}

float dividir(float a, float b) {
    if (b == 0) {
        printf("Erro: divisao por zero!\\n");
        return 0;
    }
    return a / b;
}

int main() {
    float x = 10.0, y = 3.0;

    printf("%.1f + %.1f = %.2f\\n", x, y, somar(x, y));
    printf("%.1f - %.1f = %.2f\\n", x, y, subtrair(x, y));
    printf("%.1f * %.1f = %.2f\\n", x, y, multiplicar(x, y));
    printf("%.1f / %.1f = %.2f\\n", x, y, dividir(x, y));

    return 0;
}`,
      hints: [
        'Todas as funcoes recebem float e retornam float.',
        'Na funcao dividir, use if (b == 0) para verificar divisao por zero.',
        'Use %.2f no printf para mostrar duas casas decimais.',
      ],
    },
    {
      id: 'funcoes-c3',
      title: 'Funcao com Prototipo',
      description: 'Declare o prototipo de uma funcao float calcular_media(float a, float b, float c) antes do main. Implemente a funcao depois do main. No main, calcule e imprima a media de tres notas.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Declare o prototipo da funcao aqui

int main() {
    float nota1 = 8.5, nota2 = 7.0, nota3 = 9.5;

    // Chame a funcao e imprima a media

    return 0;
}

// Implemente a funcao aqui (depois do main)`,
      solution: `#include <stdio.h>

float calcular_media(float a, float b, float c);

int main() {
    float nota1 = 8.5, nota2 = 7.0, nota3 = 9.5;
    float media = calcular_media(nota1, nota2, nota3);

    printf("Notas: %.1f, %.1f, %.1f\\n", nota1, nota2, nota3);
    printf("Media: %.2f\\n", media);

    return 0;
}

float calcular_media(float a, float b, float c) {
    return (a + b + c) / 3.0;
}`,
      hints: [
        'O prototipo e a assinatura da funcao seguida de ponto-e-virgula.',
        'Exemplo: float calcular_media(float a, float b, float c);',
        'A implementacao depois do main tem o corpo completo da funcao.',
      ],
    },
  ],
};
