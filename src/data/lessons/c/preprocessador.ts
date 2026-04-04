import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'preprocessador',
  moduleId: 'c',
  title: 'Pre-processador em C',
  description: 'Domine as diretivas do pre-processador: #include, #define, macros, compilacao condicional e include guards.',
  order: 10,
  type: 'lesson',
  estimatedMinutes: 16,
  sections: [
    {
      type: 'text',
      content: 'O pre-processador e como um **assistente que prepara tudo antes da compilacao**: copia bibliotecas, substitui constantes e organiza o codigo. Imagine que antes de comecar a cozinhar (compilar), alguem ja separou todos os ingredientes, mediu as quantidades e deixou tudo pronto na bancada. Esse e o trabalho do pre-processador!\n\nO **pre-processador** e a primeira etapa da compilacao em C. Antes do compilador analisar seu codigo, o pre-processador processa todas as linhas que comecam com **#** (diretivas). Ele faz substituicoes de texto, inclui arquivos e controla quais trechos de codigo serao compilados.\n\nAs diretivas mais importantes sao:\n- **#include** — inclui o conteudo de outro arquivo\n- **#define** — define constantes e macros\n- **#ifdef / #ifndef / #endif** — compilacao condicional\n- **#if / #elif / #else** — condicoes mais complexas',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'O pre-processador pode parecer um tema avancado, mas na verdade voce ja usa ele desde o primeiro programa em C! Todo #include que voce escreveu e uma diretiva de pre-processador. Agora voce vai entender o que acontece por tras das cortinas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'include_basico.c',
        code: `#include <stdio.h>    // Biblioteca do SISTEMA (busca em /usr/include)
#include <stdlib.h>   // Funcoes como malloc, atoi, exit
#include <string.h>   // Funcoes de string: strlen, strcpy, strcmp
#include <math.h>     // Funcoes matematicas: sqrt, pow, sin

// #include "meu_header.h"  // Arquivo LOCAL (busca no diretorio do projeto)

// Diferenca importante:
// <arquivo.h>  -> busca nos diretorios do sistema
// "arquivo.h"  -> busca primeiro no diretorio atual, depois no sistema

int main() {
    printf("strlen(\\"Ola\\") = %lu\\n", strlen("Ola"));
    printf("sqrt(144) = %.0f\\n", sqrt(144));
    printf("pow(2, 10) = %.0f\\n", pow(2, 10));

    return 0;
}
// Compilar com: gcc include_basico.c -o include_basico -lm`,
        description: 'Use <> para headers do sistema e "" para headers do seu projeto. O pre-processador substitui o #include pelo conteudo do arquivo.',
      },
    },
    {
      type: 'text',
      content: '**#define** serve para criar **constantes** e **macros**. Constantes sao valores fixos substituidos antes da compilacao. Macros sao como "funcoes" do pre-processador que fazem substituicao de texto:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'define_macros.c',
        code: `#include <stdio.h>

// === CONSTANTES ===
#define PI 3.14159
#define MAX_ALUNOS 50
#define NOME_APP "MeuPrograma"
#define VERSAO 2

// === MACROS (funcoes do pre-processador) ===
#define QUADRADO(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define ABS(x) ((x) < 0 ? -(x) : (x))

// Macro multi-linha com barra invertida
#define PRINT_SEPARADOR() \\
    printf("================================\\n")

int main() {
    printf("%s v%d\\n", NOME_APP, VERSAO);
    PRINT_SEPARADOR();

    printf("PI = %f\\n", PI);
    printf("Max alunos: %d\\n", MAX_ALUNOS);

    PRINT_SEPARADOR();

    int a = 7, b = 3;
    printf("QUADRADO(%d) = %d\\n", a, QUADRADO(a));
    printf("MAX(%d, %d) = %d\\n", a, b, MAX(a, b));
    printf("MIN(%d, %d) = %d\\n", a, b, MIN(a, b));
    printf("ABS(-15) = %d\\n", ABS(-15));

    // Area do circulo usando constante e macro
    float raio = 5.0;
    printf("\\nArea do circulo (raio %.1f): %.2f\\n",
           raio, PI * QUADRADO(raio));

    return 0;
}`,
        description: 'Constantes com #define nao usam = nem ;. Macros devem ter parenteses ao redor dos parametros para evitar erros.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Sempre coloque parenteses** nos parametros de macros! Sem eles, `QUADRADO(3+1)` viraria `3+1*3+1 = 7` em vez de `(3+1)*(3+1) = 16`. Escreva `((x) * (x))` e nao `x * x`.',
    },
    {
      type: 'text',
      content: '**Include guards** protegem um header de ser incluido mais de uma vez, o que causaria erros de "redefinicao". Todo arquivo `.h` profissional deve ter include guards:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'include_guards.c',
        code: `// === Arquivo: matematica.h ===
#ifndef MATEMATICA_H    // Se MATEMATICA_H NAO esta definido...
#define MATEMATICA_H    // ...defina MATEMATICA_H

// Constantes
#define PI 3.14159
#define E  2.71828

// Prototipos de funcoes
double area_circulo(double raio);
double area_retangulo(double largura, double altura);
double hipotenusa(double a, double b);

#endif  // Fim do guard MATEMATICA_H


// === Arquivo: matematica.c ===
// #include "matematica.h"
// #include <math.h>
//
// double area_circulo(double raio) {
//     return PI * raio * raio;
// }
//
// double area_retangulo(double largura, double altura) {
//     return largura * altura;
// }
//
// double hipotenusa(double a, double b) {
//     return sqrt(a * a + b * b);
// }


// === Arquivo: main.c ===
// #include "matematica.h"  // Pode incluir varias vezes sem erro!
// #include "matematica.h"  // O guard impede a redefinicao
//
// int main() {
//     printf("Area: %.2f\\n", area_circulo(5.0));
//     return 0;
// }`,
        description: 'Include guards usam #ifndef/#define/#endif para evitar inclusoes duplicadas. O nome do guard segue o padrao NOME_DO_ARQUIVO_H.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Alguns compiladores suportam **#pragma once** como alternativa aos include guards tradicionais. Apesar de nao ser padrao C, e amplamente aceito por gcc, clang e MSVC.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'compilacao_condicional.c',
        code: `#include <stdio.h>

// Definir para ativar modo debug (comente para desativar)
#define DEBUG
#define VERSAO 3
#define PLATAFORMA_LINUX

// === #ifdef / #ifndef ===
#ifdef DEBUG
    #define LOG(msg) printf("[DEBUG] %s\\n", msg)
#else
    #define LOG(msg)  // Em release, LOG nao faz nada
#endif

// === #if / #elif / #else ===
#if VERSAO == 1
    #define SAUDACAO "Bem-vindo a versao 1.0 (beta)"
#elif VERSAO == 2
    #define SAUDACAO "Bem-vindo a versao 2.0 (estavel)"
#elif VERSAO >= 3
    #define SAUDACAO "Bem-vindo a versao 3.0 (avancada)"
#else
    #define SAUDACAO "Versao desconhecida"
#endif

// === Compilacao por plataforma ===
#ifdef PLATAFORMA_LINUX
    #define LIMPAR_TELA "clear"
#else
    #define LIMPAR_TELA "cls"
#endif

int main() {
    printf("%s\\n", SAUDACAO);

    LOG("Programa iniciado");
    LOG("Carregando configuracoes...");

    int resultado = 42;
    LOG("Processamento concluido");

    printf("Resultado: %d\\n", resultado);

    #ifdef DEBUG
    printf("\\n[INFO] Modo debug ativo\\n");
    printf("[INFO] Comando limpar tela: %s\\n", LIMPAR_TELA);
    #endif

    // Voce tambem pode usar #undef para remover uma definicao
    #undef DEBUG
    // A partir daqui, DEBUG nao existe mais

    return 0;
}`,
        description: 'Compilacao condicional permite incluir/excluir codigo baseado em definicoes. Perfeito para debug, plataformas e versoes.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content: 'Voce pode definir macros na linha de comando do compilador sem alterar o codigo: `gcc -DDEBUG -DVERSAO=3 programa.c -o programa`. Isso e muito usado em projetos reais para builds diferentes.',
    },
  ],
  challenges: [
    {
      id: 'preprocessador-c1',
      title: 'Header com Include Guards',
      description: 'Crie o conteudo de um arquivo header "utils.h" com include guards. O header deve declarar: uma constante TAM_MAX (100), uma constante PI (3.14159), e prototipos para 3 funcoes: int maior(int a, int b), int menor(int a, int b), e double area_circulo(double raio). Depois, implemente as funcoes e use-as no main.',
      language: 'c',
      starterCode: `// Simule o conteudo de "utils.h" aqui (com include guards)


// Agora implemente as funcoes declaradas no header

// Implemente: int maior(int a, int b)

// Implemente: int menor(int a, int b)

// Implemente: double area_circulo(double raio)

#include <stdio.h>

int main() {
    // Teste as funcoes e use as constantes
    // Exiba os resultados

    return 0;
}`,
      solution: `// Simulando o conteudo de "utils.h" (com include guards)
#ifndef UTILS_H
#define UTILS_H

#define TAM_MAX 100
#define PI 3.14159

int maior(int a, int b);
int menor(int a, int b);
double area_circulo(double raio);

#endif

// Implementacao das funcoes
#include <stdio.h>

int maior(int a, int b) {
    return (a > b) ? a : b;
}

int menor(int a, int b) {
    return (a < b) ? a : b;
}

double area_circulo(double raio) {
    return PI * raio * raio;
}

int main() {
    int x = 15, y = 23;
    printf("Maior entre %d e %d: %d\\n", x, y, maior(x, y));
    printf("Menor entre %d e %d: %d\\n", x, y, menor(x, y));
    printf("TAM_MAX = %d\\n", TAM_MAX);

    double r = 5.0;
    printf("Area do circulo (raio %.1f): %.2f\\n", r, area_circulo(r));

    return 0;
}`,
      hints: [
        'Include guards seguem o padrao: #ifndef NOME_H, #define NOME_H, ... conteudo ..., #endif.',
        'Constantes com #define nao usam = nem ;. Ex: #define PI 3.14159',
        'Prototipos sao apenas a assinatura da funcao seguida de ;. A implementacao vem separada.',
      ],
    },
    {
      id: 'preprocessador-c2',
      title: 'Macros MAX, MIN e CLAMP',
      description: 'Crie macros usando #define para: MAX(a,b) que retorna o maior valor, MIN(a,b) que retorna o menor valor, e CLAMP(valor, minimo, maximo) que limita um valor entre minimo e maximo. Crie tambem uma macro SWAP(a,b,tipo) que troca os valores de duas variaveis. Teste todas com diferentes tipos de dados.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Defina a macro MAX(a, b)

// Defina a macro MIN(a, b)

// Defina a macro CLAMP(valor, minimo, maximo)
// CLAMP deve retornar: minimo se valor < minimo,
//                      maximo se valor > maximo,
//                      valor caso contrario

// Defina a macro SWAP(a, b, tipo)
// Use uma variavel temporaria do tipo especificado

int main() {
    // Teste MAX e MIN com inteiros
    int a = 10, b = 25;

    // Teste CLAMP com um valor fora dos limites

    // Teste SWAP com dois inteiros

    return 0;
}`,
      solution: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))
#define CLAMP(valor, minimo, maximo) \\
    (MIN(MAX((valor), (minimo)), (maximo)))

#define SWAP(a, b, tipo) do { \\
    tipo _temp = (a);              \\
    (a) = (b);                     \\
    (b) = _temp;                   \\
} while(0)

int main() {
    int a = 10, b = 25;
    printf("MAX(%d, %d) = %d\\n", a, b, MAX(a, b));
    printf("MIN(%d, %d) = %d\\n", a, b, MIN(a, b));

    float x = 3.5, y = 7.2;
    printf("MAX(%.1f, %.1f) = %.1f\\n", x, y, MAX(x, y));

    printf("\\nCLAMP(150, 0, 100) = %d\\n", CLAMP(150, 0, 100));
    printf("CLAMP(-20, 0, 100) = %d\\n", CLAMP(-20, 0, 100));
    printf("CLAMP(50, 0, 100) = %d\\n", CLAMP(50, 0, 100));

    printf("\\nAntes do SWAP: a=%d, b=%d\\n", a, b);
    SWAP(a, b, int);
    printf("Depois do SWAP: a=%d, b=%d\\n", a, b);

    printf("\\nAntes do SWAP: x=%.1f, y=%.1f\\n", x, y);
    SWAP(x, y, float);
    printf("Depois do SWAP: x=%.1f, y=%.1f\\n", x, y);

    return 0;
}`,
      hints: [
        'Use o operador ternario: ((a) > (b) ? (a) : (b)) para MAX.',
        'CLAMP pode ser definido como MIN(MAX(valor, minimo), maximo) usando as outras macros.',
        'Para SWAP, use do { tipo temp = (a); (a) = (b); (b) = temp; } while(0) para seguranca.',
      ],
    },
    {
      id: 'preprocessador-c3',
      title: 'Compilacao Condicional: Debug e Release',
      description: 'Crie um programa que se comporta diferente nos modos DEBUG e RELEASE. Defina uma macro LOG(msg) que imprime mensagens com prefixo "[DEBUG]" quando DEBUG esta definido, e nao faz nada em release. Defina uma macro ASSERT(condicao, msg) que verifica condicoes em modo debug. Use #if para exibir informacoes de versao diferentes.',
      language: 'c',
      starterCode: `#include <stdio.h>

// Defina DEBUG para ativar modo debug (comente para release)
#define DEBUG
#define VERSAO_MAJOR 2
#define VERSAO_MINOR 1

// Defina a macro LOG(msg) condicionalmente

// Defina a macro ASSERT(condicao, msg)
// Em debug: verifica a condicao e imprime msg se falsa
// Em release: nao faz nada

// Use #if para definir VERSAO_TEXTO baseado em VERSAO_MAJOR

int main() {
    printf("=== %s ===\\n", VERSAO_TEXTO);

    // Use LOG para registrar passos do programa
    // Use ASSERT para verificar condicoes

    int valor = 42;
    // Teste LOG e ASSERT aqui

    return 0;
}`,
      solution: `#include <stdio.h>
#include <stdlib.h>

#define DEBUG
#define VERSAO_MAJOR 2
#define VERSAO_MINOR 1

#ifdef DEBUG
    #define LOG(msg) printf("[DEBUG] %s\\n", msg)
    #define ASSERT(condicao, msg) \\
        if (!(condicao)) { \\
            printf("[ASSERT FALHOU] %s\\n", msg); \\
            printf("  Arquivo: %s, Linha: %d\\n", __FILE__, __LINE__); \\
        }
#else
    #define LOG(msg)
    #define ASSERT(condicao, msg)
#endif

#if VERSAO_MAJOR >= 3
    #define VERSAO_TEXTO "App v3+ (Nova Geracao)"
#elif VERSAO_MAJOR == 2
    #define VERSAO_TEXTO "App v2.x (Estavel)"
#elif VERSAO_MAJOR == 1
    #define VERSAO_TEXTO "App v1.x (Legado)"
#else
    #define VERSAO_TEXTO "App (Versao Desconhecida)"
#endif

int main() {
    printf("=== %s ===\\n", VERSAO_TEXTO);

    #ifdef DEBUG
    printf("[INFO] Modo: DEBUG\\n");
    #else
    printf("[INFO] Modo: RELEASE\\n");
    #endif

    LOG("Programa iniciado");

    int valor = 42;
    ASSERT(valor > 0, "Valor deve ser positivo");
    ASSERT(valor < 100, "Valor deve ser menor que 100");
    ASSERT(valor == 0, "Valor deve ser zero");

    LOG("Processamento concluido");

    printf("\\nResultado final: %d\\n", valor);

    LOG("Programa encerrado");

    return 0;
}`,
      hints: [
        'Use #ifdef DEBUG para definir LOG com printf e #else para definir LOG vazio.',
        'ASSERT pode usar if (!(condicao)) { printf(msg); } dentro do #ifdef DEBUG.',
        '__FILE__ e __LINE__ sao macros predefinidas que mostram o arquivo e a linha atual.',
      ],
    },
  ],
};
