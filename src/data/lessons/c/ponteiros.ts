import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'ponteiros',
  moduleId: 'c',
  title: 'Ponteiros',
  description: 'Entenda ponteiros — o conceito mais importante (e temido!) de C.',
  order: 6,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content: 'Ponteiros sao o conceito mais importante de C e essencial para Engenharia da Computacao. Mas nao se assuste — vamos usar uma analogia simples!\n\nImagine que a **memoria do computador** e uma rua com casas numeradas. Cada casa tem um **endereco** (numero) e guarda um **valor** (quem mora la). Um **ponteiro** e como um papel onde voce anotou o endereco de uma casa.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'ponteiros_basico.c',
        code: `#include <stdio.h>

int main() {
    int idade = 20;
    int *ptr = &idade;  // ptr guarda o ENDERECO de idade

    printf("Valor de idade: %d\\n", idade);       // 20
    printf("Endereco de idade: %p\\n", &idade);    // 0x7fff...
    printf("Valor de ptr: %p\\n", ptr);            // mesmo endereco
    printf("Valor apontado por ptr: %d\\n", *ptr); // 20

    // Modificando o valor ATRAVES do ponteiro
    *ptr = 25;
    printf("Agora idade = %d\\n", idade);  // 25!

    return 0;
}`,
        description: '& pega o endereco de uma variavel. * acessa o valor no endereco.',
      },
    },
    {
      type: 'text',
      content: 'Dois operadores essenciais:\n\n**&** (operador de endereco) — Retorna o endereco de memoria de uma variavel.\n\n**\\*** (operador de desreferencia) — Acessa o valor guardado no endereco apontado.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'ponteiros_funcao.c',
        code: `#include <stdio.h>

// Sem ponteiro: nao modifica o original
void tentarMudar(int x) {
    x = 100;
}

// Com ponteiro: modifica o original!
void mudarDeVerdade(int *ptr) {
    *ptr = 100;
}

int main() {
    int numero = 42;

    tentarMudar(numero);
    printf("Apos tentarMudar: %d\\n", numero);  // 42 (nao mudou!)

    mudarDeVerdade(&numero);
    printf("Apos mudarDeVerdade: %d\\n", numero); // 100 (mudou!)

    return 0;
}`,
        description: 'Ponteiros permitem que funcoes modifiquem variaveis externas (passagem por referencia).',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Nunca use um ponteiro sem inicializar! Acessar um endereco invalido causa **Segmentation Fault** — o programa trava. Inicialize ponteiros com NULL se nao tiver um endereco valido ainda.',
    },
    {
      type: 'text',
      content: '## Ponteiros e Arrays\n\nEm C, o nome de um array **ja e um ponteiro** para o seu primeiro elemento. Isso significa que `numeros` e `&numeros[0]` sao equivalentes.\n\nIsso permite usar **aritmetica de ponteiros** para navegar pelos elementos: somar 1 ao ponteiro avanca `sizeof(tipo)` bytes na memoria, indo para o proximo elemento. Por exemplo, `*(ptr + 1)` acessa o segundo elemento do array.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'ponteiros_arrays.c',
        code: `#include <stdio.h>

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int *ptr = numeros;  // Array JA E um ponteiro!

    printf("Primeiro: %d\\n", *ptr);       // 10
    printf("Segundo: %d\\n", *(ptr + 1));  // 20
    printf("Terceiro: %d\\n", *(ptr + 2)); // 30

    // ptr + 1 pula sizeof(int) bytes na memoria
    return 0;
}`,
        description: 'Arrays em C sao ponteiros para o primeiro elemento!',
      },
    },
  ],
  challenges: [
    {
      id: 'ponteiros-c1',
      title: 'Trocar Valores com Ponteiros',
      description: 'Crie uma funcao void trocar(int *a, int *b) que troca os valores de duas variaveis usando ponteiros. No main, declare duas variaveis, imprima antes e depois da troca.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Crie a funcao void trocar(int *a, int *b)
// que troca os valores usando uma variavel temporaria

int main() {
    int x = 10, y = 20;

    printf("Antes: x = %d, y = %d\\n", x, y);

    // Chame a funcao trocar passando os enderecos

    printf("Depois: x = %d, y = %d\\n", x, y);

    return 0;
}`,
      solution: `#include <stdio.h>

void trocar(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;

    printf("Antes: x = %d, y = %d\\n", x, y);
    trocar(&x, &y);
    printf("Depois: x = %d, y = %d\\n", x, y);

    return 0;
}`,
      hints: [
        'A funcao recebe ponteiros (int *a, int *b) para modificar os originais.',
        'Use uma variavel temporaria: int temp = *a; *a = *b; *b = temp;',
        'Ao chamar a funcao, passe os enderecos com &: trocar(&x, &y);',
      ],
    },
    {
      id: 'ponteiros-c2',
      title: 'Soma de Array com Ponteiros',
      description: 'Crie uma funcao int soma_array(int *arr, int tamanho) que usa aritmetica de ponteiros para somar todos os elementos de um array. Use *(arr + i) ao inves de arr[i].',
      language: 'c',
      starterCode: `#include <stdio.h>

// Crie a funcao int soma_array(int *arr, int tamanho)
// Use aritmetica de ponteiros: *(arr + i)

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int tamanho = 5;

    // Chame a funcao e imprima a soma

    return 0;
}`,
      solution: `#include <stdio.h>

int soma_array(int *arr, int tamanho) {
    int soma = 0;
    for (int i = 0; i < tamanho; i++) {
        soma += *(arr + i);
    }
    return soma;
}

int main() {
    int numeros[] = {10, 20, 30, 40, 50};
    int tamanho = 5;

    int resultado = soma_array(numeros, tamanho);
    printf("Soma dos elementos: %d\\n", resultado);

    return 0;
}`,
      hints: [
        '*(arr + i) acessa o elemento na posicao i do array.',
        'Ao passar um array para funcao, ele ja e um ponteiro (nao precisa de &).',
        'Use um laco for para iterar de 0 ate tamanho - 1.',
      ],
    },
    {
      id: 'ponteiros-c3',
      title: 'Ponteiro e Endereco',
      description: 'Declare tres variaveis (int, float, char) e tres ponteiros correspondentes. Imprima: o valor de cada variavel, o endereco de cada variavel (usando &), e o valor acessado via ponteiro (usando *).',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    // Declare as variaveis e os ponteiros
    // int idade e int *ptr_idade
    // float peso e float *ptr_peso
    // char letra e char *ptr_letra

    // Imprima: valor, endereco e valor via ponteiro

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int idade = 25;
    float peso = 72.5;
    char letra = 'C';

    int *ptr_idade = &idade;
    float *ptr_peso = &peso;
    char *ptr_letra = &letra;

    printf("=== int ===\\n");
    printf("Valor: %d\\n", idade);
    printf("Endereco: %p\\n", (void *)&idade);
    printf("Via ponteiro: %d\\n", *ptr_idade);

    printf("\\n=== float ===\\n");
    printf("Valor: %.1f\\n", peso);
    printf("Endereco: %p\\n", (void *)&peso);
    printf("Via ponteiro: %.1f\\n", *ptr_peso);

    printf("\\n=== char ===\\n");
    printf("Valor: %c\\n", letra);
    printf("Endereco: %p\\n", (void *)&letra);
    printf("Via ponteiro: %c\\n", *ptr_letra);

    return 0;
}`,
      hints: [
        'Declare o ponteiro com *: int *ptr = &variavel;',
        'Use %p para imprimir enderecos de memoria.',
        'Para acessar o valor via ponteiro, use *ptr (desreferencia).',
      ],
    },
  ],
};
