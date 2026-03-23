import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'compilacao',
  moduleId: 'c',
  title: 'Compilacao e o Processo de Build',
  description: 'Entenda como seu codigo C vira um programa executavel.',
  order: 8,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Compilar e como **traduzir um livro**: o compilador le seu codigo em C (escrito em "portugues" para programadores) e traduz para a linguagem que o computador entende (zeros e uns). Assim como um tradutor profissional precisa entender bem os dois idiomas, o compilador conhece tanto C quanto linguagem de maquina.\n\nQuando voce escreve um programa em C, o computador nao entende diretamente o seu codigo. Ele precisa ser **compilado** — transformado em linguagem de maquina. Esse processo tem 4 etapas:',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Entender o processo de compilacao vai te ajudar muito a decifrar mensagens de erro! Em vez de ficar perdido quando o gcc mostrar um erro, voce vai saber exatamente em qual etapa o problema aconteceu.',
    },
    {
      type: 'text',
      content: '**1. Pre-processamento** — Processa diretivas como #include e #define\n\n**2. Compilacao** — Transforma o codigo C em codigo Assembly\n\n**3. Montagem (Assembly)** — Transforma Assembly em codigo de maquina (objeto)\n\n**4. Linkagem** — Junta todos os arquivos objeto e bibliotecas no executavel final',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'compilar.c',
        code: `// Para compilar e executar:
// gcc programa.c -o programa
// ./programa

// Flags uteis do gcc:
// gcc -Wall programa.c -o programa   (mostra avisos)
// gcc -g programa.c -o programa      (modo debug)
// gcc -O2 programa.c -o programa     (otimizado)

#include <stdio.h>

#define PI 3.14159  // Diretiva de pre-processamento

int main() {
    printf("PI = %f\\n", PI);
    return 0;
}`,
        description: 'gcc e o compilador mais usado. Flags como -Wall ajudam a encontrar erros.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Python e **interpretado** — o codigo roda linha por linha. C e **compilado** — todo o codigo e convertido em executavel antes de rodar. Isso torna C muito mais rapido!',
    },
    {
      type: 'text',
      content: '## Arquivos Header (.h)\n\nEm projetos maiores, o codigo e dividido em multiplos arquivos. Os **arquivos header** (`.h`) contem apenas as **declaracoes** (prototipos de funcoes, constantes, tipos), enquanto os arquivos `.c` contem as **implementacoes**.\n\n- **`#include "arquivo.h"`** — Inclui um header local (entre aspas, busca na pasta do projeto)\n- **`#ifndef / #define / #endif`** — Sao as **include guards**: evitam que o mesmo header seja incluido mais de uma vez, o que causaria erros de declaracao duplicada\n- Para compilar multiplos arquivos: `gcc main.c matematica.c -o programa`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'headers.c',
        code: `// Arquivo: matematica.h (header)
#ifndef MATEMATICA_H
#define MATEMATICA_H

int somar(int a, int b);
int multiplicar(int a, int b);

#endif

// Arquivo: matematica.c (implementacao)
// #include "matematica.h"
//
// int somar(int a, int b) { return a + b; }
// int multiplicar(int a, int b) { return a * b; }

// Arquivo: main.c
// #include "matematica.h"
// int main() {
//     printf("%d\\n", somar(2, 3));
//     return 0;
// }

// Compilar: gcc main.c matematica.c -o programa`,
        description: 'Headers (.h) contem declaracoes. Arquivos .c contem implementacoes.',
      },
    },
  ],
  challenges: [
    {
      id: 'compilacao-c1',
      title: 'Corrigir Erros de Compilacao',
      description: 'O programa abaixo tem 3 erros de compilacao. Identifique e corrija todos: falta do #include, ponto-e-virgula ausente e tipo de retorno errado no main.',
      language: 'c',
      starterCode: `// Este programa tem 3 erros. Corrija todos!

void main() {
    printf("Corrigindo erros!\\n")
    printf("Programa corrigido com sucesso!\\n");
}`,
      solution: `#include <stdio.h>

int main() {
    printf("Corrigindo erros!\\n");
    printf("Programa corrigido com sucesso!\\n");
    return 0;
}`,
      hints: [
        'Para usar printf, voce precisa incluir a biblioteca stdio.h.',
        'Toda instrucao em C deve terminar com ponto-e-virgula (;).',
        'A funcao main deve retornar int, nao void, e ter return 0 no final.',
      ],
    },
    {
      id: 'compilacao-c2',
      title: 'Programa com Define e Include',
      description: 'Crie um programa que usa #define para criar constantes PI (3.14159) e RAIO (5). Calcule e imprima a area do circulo (PI * RAIO * RAIO) e o perimetro (2 * PI * RAIO).',
      language: 'c',
      starterCode: `#include <stdio.h>

// Use #define para criar as constantes PI e RAIO

int main() {
    // Calcule a area: PI * RAIO * RAIO
    // Calcule o perimetro: 2 * PI * RAIO
    // Imprima ambos os resultados

    return 0;
}`,
      solution: `#include <stdio.h>

#define PI 3.14159
#define RAIO 5

int main() {
    double area = PI * RAIO * RAIO;
    double perimetro = 2 * PI * RAIO;

    printf("Raio: %d\\n", RAIO);
    printf("Area do circulo: %.2f\\n", area);
    printf("Perimetro do circulo: %.2f\\n", perimetro);

    return 0;
}`,
      hints: [
        '#define nao usa = nem ; -> Ex: #define PI 3.14159',
        'Constantes com #define sao substituidas pelo pre-processador antes da compilacao.',
        'Use double para armazenar os resultados com precisao decimal.',
      ],
    },
    {
      id: 'compilacao-c3',
      title: 'Programa Multi-Funcao com Prototipo',
      description: 'Crie um programa com: um prototipo de funcao, a funcao main, e a implementacao da funcao. A funcao deve se chamar void exibir_info(char nome[], int versao) e imprimir o nome do programa e sua versao. Simule a organizacao de um projeto real.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Declare o prototipo da funcao aqui

int main() {
    printf("=== Simulando organizacao de projeto ===\\n");

    // Chame a funcao exibir_info com nome e versao

    printf("=== Fim do programa ===\\n");
    return 0;
}

// Implemente a funcao aqui`,
      solution: `#include <stdio.h>

void exibir_info(char nome[], int versao);

int main() {
    printf("=== Simulando organizacao de projeto ===\\n");

    exibir_info("MeuPrograma", 1);
    exibir_info("BibliotecaUtil", 3);

    printf("=== Fim do programa ===\\n");
    return 0;
}

void exibir_info(char nome[], int versao) {
    printf("Programa: %s (versao %d)\\n", nome, versao);
}`,
      hints: [
        'O prototipo e: void exibir_info(char nome[], int versao);',
        'A implementacao vem depois do main com o corpo da funcao entre chaves.',
        'Use %s para imprimir o nome e %d para a versao no printf.',
      ],
    },
  ],
};
