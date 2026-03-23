import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'memoria-e-alocacao',
  moduleId: 'c',
  title: 'Memoria e Alocacao Dinamica',
  description: 'Aprenda como a memoria funciona e como alocar memoria dinamicamente.',
  order: 7,
  estimatedMinutes: 18,
  sections: [
    {
      type: 'text',
      content: 'Alocar memoria e como reservar uma mesa no restaurante: voce pede o espaco, usa, e depois libera para outros usarem. Se voce nunca liberar, o restaurante fica lotado e ninguem mais consegue sentar -- isso e o famoso "vazamento de memoria"!\n\nA memoria do programa e dividida em duas partes principais:\n\n**Stack (pilha)** — Memoria automatica, rapida, mas limitada. Variaveis locais ficam aqui. Pense na stack como as mesas do balcao: rapidas de usar, mas tem poucas.\n\n**Heap (monte)** — Memoria que voce controla manualmente. Maior, mas mais lenta. Voce decide quando alocar e quando liberar. Pense no heap como o salao principal do restaurante: muito espaco, mas voce precisa reservar e liberar a mesa.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Nao se preocupe se alocacao dinamica parecer complicada no inicio! E um dos conceitos mais poderosos de C e voce vai dominar com pratica. Cada programa que voce escrever vai te deixar mais confiante.',
    },
    {
      type: 'text',
      content: '## Alocando Memoria com malloc\n\nA funcao **`malloc`** (memory allocate) reserva um bloco de memoria no heap e retorna um ponteiro para ele. Ela requer o cabecalho `<stdlib.h>`.\n\n- **`malloc(tamanho_em_bytes)`** — Aloca o numero de bytes especificado. Nao inicializa o conteudo (tera "lixo" de memoria)\n- **`sizeof(tipo)`** — Retorna o tamanho em bytes de um tipo, garantindo portabilidade\n- **`free(ponteiro)`** — Libera o bloco de memoria alocado. Sempre chame `free` para cada `malloc`\n- O cast `(int *)` converte o ponteiro generico `void *` retornado pelo `malloc` para o tipo correto\n\nSempre verifique se `malloc` retornou `NULL`, o que indica falha na alocacao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'malloc_exemplo.c',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Alocando memoria para 5 inteiros no heap
    int *numeros = (int *)malloc(5 * sizeof(int));

    if (numeros == NULL) {
        printf("Erro: memoria nao alocada!\\n");
        return 1;
    }

    // Usando a memoria alocada
    for (int i = 0; i < 5; i++) {
        numeros[i] = (i + 1) * 10;
    }

    for (int i = 0; i < 5; i++) {
        printf("numeros[%d] = %d\\n", i, numeros[i]);
    }

    // IMPORTANTE: liberar a memoria!
    free(numeros);

    return 0;
}`,
        description: 'malloc aloca memoria e free libera. Sempre libere a memoria que voce alocou!',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Memory leak** (vazamento de memoria) acontece quando voce aloca memoria com malloc mas esquece de liberar com free. O programa vai consumindo mais e mais memoria ate travar!',
    },
    {
      type: 'text',
      content: 'A funcao **`calloc`** (clear allocate) e semelhante ao `malloc`, mas com uma diferenca importante: ela inicializa toda a memoria alocada com zeros automaticamente. Sua assinatura e diferente:\n\n- **`calloc(quantidade, tamanho_por_elemento)`** — Recebe dois argumentos: o numero de elementos e o tamanho de cada um\n- O resultado e equivalente a `malloc(quantidade * tamanho)` seguido de uma inicializacao com zeros',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'calloc_exemplo.c',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // calloc: aloca E inicializa com zeros
    int *notas = (int *)calloc(3, sizeof(int));

    // Com calloc, tudo ja comeca em 0
    printf("notas[0] = %d\\n", notas[0]);  // 0

    notas[0] = 85;
    notas[1] = 92;
    notas[2] = 78;

    free(notas);
    return 0;
}`,
        description: 'calloc funciona como malloc, mas inicializa toda a memoria com zeros.',
      },
    },
    {
      type: 'text',
      content: 'Resumo das funcoes de memoria:\n\n**malloc(tamanho)** — Aloca memoria sem inicializar\n\n**calloc(quantidade, tamanho)** — Aloca e inicializa com zeros\n\n**free(ponteiro)** — Libera memoria alocada\n\n**sizeof(tipo)** — Retorna o tamanho em bytes de um tipo',
    },
  ],
  challenges: [
    {
      id: 'memoria-c1',
      title: 'Array Dinamico',
      description: 'Use malloc para criar um array dinamico de 5 inteiros. Preencha com os valores 10, 20, 30, 40, 50 usando um laco. Imprima todos os valores e libere a memoria com free.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;

    // Aloque memoria para n inteiros com malloc
    // Verifique se a alocacao foi bem-sucedida
    // Preencha com valores: 10, 20, 30, 40, 50
    // Imprima todos os valores
    // Libere a memoria com free

    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;

    int *numeros = (int *)malloc(n * sizeof(int));

    if (numeros == NULL) {
        printf("Erro ao alocar memoria!\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        numeros[i] = (i + 1) * 10;
    }

    printf("Valores do array dinamico:\\n");
    for (int i = 0; i < n; i++) {
        printf("numeros[%d] = %d\\n", i, numeros[i]);
    }

    free(numeros);

    return 0;
}`,
      hints: [
        'Use malloc(n * sizeof(int)) para alocar espaco para n inteiros.',
        'Sempre verifique se malloc retornou NULL (falha na alocacao).',
        'Nao esqueca de chamar free() no final para liberar a memoria.',
      ],
    },
    {
      id: 'memoria-c2',
      title: 'Calloc vs Malloc',
      description: 'Crie dois arrays de 3 inteiros: um com malloc e outro com calloc. Sem atribuir valores, imprima o conteudo de cada array para ver a diferenca (malloc tem lixo, calloc tem zeros). Depois libere ambos.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;

    // Aloque um array com malloc
    // Aloque outro array com calloc
    // Imprima o conteudo de ambos (sem inicializar)
    // Libere ambos com free

    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 3;

    int *arr_malloc = (int *)malloc(n * sizeof(int));
    int *arr_calloc = (int *)calloc(n, sizeof(int));

    if (arr_malloc == NULL || arr_calloc == NULL) {
        printf("Erro ao alocar memoria!\\n");
        return 1;
    }

    printf("Array com malloc (lixo de memoria):\\n");
    for (int i = 0; i < n; i++) {
        printf("arr_malloc[%d] = %d\\n", i, arr_malloc[i]);
    }

    printf("\\nArray com calloc (inicializado com zeros):\\n");
    for (int i = 0; i < n; i++) {
        printf("arr_calloc[%d] = %d\\n", i, arr_calloc[i]);
    }

    free(arr_malloc);
    free(arr_calloc);

    return 0;
}`,
      hints: [
        'malloc(n * sizeof(int)) aloca memoria sem inicializar.',
        'calloc(n, sizeof(int)) aloca E inicializa tudo com zeros.',
        'Lembre-se de liberar os dois arrays com free().',
      ],
    },
    {
      id: 'memoria-c3',
      title: 'Redimensionar Array com Realloc',
      description: 'Aloque um array de 3 inteiros com malloc e preencha com 10, 20, 30. Depois use realloc para expandir para 5 elementos e adicione 40 e 50. Imprima todos os valores e libere a memoria.',
      language: 'c',
      starterCode: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Aloque array de 3 inteiros com malloc
    // Preencha com 10, 20, 30

    // Use realloc para expandir para 5 elementos
    // Adicione 40 e 50 nas posicoes 3 e 4

    // Imprima todos os 5 valores
    // Libere a memoria

    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int *)malloc(3 * sizeof(int));

    if (arr == NULL) {
        printf("Erro ao alocar memoria!\\n");
        return 1;
    }

    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;

    printf("Array original (3 elementos):\\n");
    for (int i = 0; i < 3; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    arr = (int *)realloc(arr, 5 * sizeof(int));

    if (arr == NULL) {
        printf("Erro ao realocar memoria!\\n");
        return 1;
    }

    arr[3] = 40;
    arr[4] = 50;

    printf("\\nArray expandido (5 elementos):\\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    free(arr);

    return 0;
}`,
      hints: [
        'realloc(ptr, novo_tamanho) redimensiona o bloco de memoria.',
        'Os dados antigos sao preservados ao usar realloc.',
        'Sempre verifique se realloc retornou NULL antes de usar.',
      ],
    },
  ],
};
