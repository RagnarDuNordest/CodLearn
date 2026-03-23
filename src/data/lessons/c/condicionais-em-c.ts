import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'condicionais-em-c',
  moduleId: 'c',
  title: 'Condicionais em C',
  description: 'Aprenda a usar if, else if, else e switch em C.',
  order: 3,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Condicionais sao como **placas de sinalizacao em uma estrada**: dependendo da condicao (ex: "esta chovendo?"), voce toma um caminho ou outro. O programa avalia uma pergunta e decide o que fazer com base na resposta.\n\nCondicionais em C funcionam de forma similar ao Python, mas usam **chaves {}** para delimitar blocos em vez de indentacao.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Se voce ja sabe usar if/else em Python, parabens -- voce ja sabe a logica! Em C, a unica diferenca e que usamos chaves {} em vez de indentacao e escrevemos else if em vez de elif. Voce vai pegar o jeito rapidamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'condicional.c',
        code: `#include <stdio.h>

int main() {
    float nota = 7.5;

    if (nota >= 7.0) {
        printf("Aprovado!\\n");
    } else if (nota >= 5.0) {
        printf("Recuperacao.\\n");
    } else {
        printf("Reprovado.\\n");
    }

    return 0;
}`,
        description: 'Em C usamos else if (duas palavras) ao inves de elif.',
      },
    },
    {
      type: 'text',
      content: 'C tambem tem o **switch/case**, que e util quando voce quer comparar uma variavel com varios valores fixos:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'c',
        filename: 'switch_case.c',
        code: `#include <stdio.h>

int main() {
    int opcao = 2;

    switch (opcao) {
        case 1:
            printf("Voce escolheu Jogar\\n");
            break;
        case 2:
            printf("Voce escolheu Opcoes\\n");
            break;
        case 3:
            printf("Voce escolheu Sair\\n");
            break;
        default:
            printf("Opcao invalida!\\n");
    }

    return 0;
}`,
        description: 'O break e necessario para evitar que os casos seguintes sejam executados.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Nunca esqueca do **break** no switch! Sem ele, o C executa todos os cases seguintes (isso se chama "fall-through").',
    },
  ],
  challenges: [
    {
      id: 'condicionais-c1',
      title: 'Classificador de Notas',
      description: 'Crie um programa que classifica a nota de um aluno. Declare float nota = 7.5 e use if/else if/else para imprimir: "Excelente" (>= 9), "Bom" (>= 7), "Regular" (>= 5), ou "Insuficiente" (< 5).',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    float nota = 7.5;

    // Use if / else if / else para classificar a nota:
    // >= 9.0 -> "Excelente"
    // >= 7.0 -> "Bom"
    // >= 5.0 -> "Regular"
    // < 5.0  -> "Insuficiente"

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    float nota = 7.5;

    printf("Nota: %.1f - ", nota);

    if (nota >= 9.0) {
        printf("Excelente\\n");
    } else if (nota >= 7.0) {
        printf("Bom\\n");
    } else if (nota >= 5.0) {
        printf("Regular\\n");
    } else {
        printf("Insuficiente\\n");
    }

    return 0;
}`,
      hints: [
        'Comece verificando a maior faixa (>= 9.0) e va descendo.',
        'Use else if para encadear as condicoes.',
        'Lembre-se de usar >= e nao > para incluir o limite.',
      ],
    },
    {
      id: 'condicionais-c2',
      title: 'Menu com Switch',
      description: 'Crie um menu de restaurante usando switch/case. Declare int opcao = 2. As opcoes sao: 1-Pizza (R$35.00), 2-Hamburguer (R$28.00), 3-Salada (R$22.00). Imprima o item escolhido e o preco. Use default para opcao invalida.',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    int opcao = 2;

    printf("=== CARDAPIO ===\\n");
    printf("1. Pizza\\n");
    printf("2. Hamburguer\\n");
    printf("3. Salada\\n");
    printf("================\\n");

    // Use switch/case para a opcao escolhida
    // Imprima o item e o preco
    // Nao esqueca do break e do default!

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    int opcao = 2;

    printf("=== CARDAPIO ===\\n");
    printf("1. Pizza\\n");
    printf("2. Hamburguer\\n");
    printf("3. Salada\\n");
    printf("================\\n");

    switch (opcao) {
        case 1:
            printf("Voce escolheu: Pizza - R$35.00\\n");
            break;
        case 2:
            printf("Voce escolheu: Hamburguer - R$28.00\\n");
            break;
        case 3:
            printf("Voce escolheu: Salada - R$22.00\\n");
            break;
        default:
            printf("Opcao invalida!\\n");
    }

    return 0;
}`,
      hints: [
        'Use switch(opcao) e cada case com o numero correspondente.',
        'Coloque break; no final de cada case para evitar fall-through.',
        'O default trata qualquer valor que nao seja 1, 2 ou 3.',
      ],
    },
    {
      id: 'condicionais-c3',
      title: 'Classificador de IMC',
      description: 'Calcule o IMC (peso / altura^2) de uma pessoa. Declare float peso = 70.0 e float altura = 1.75. Classifique: Abaixo do peso (< 18.5), Normal (18.5-24.9), Sobrepeso (25.0-29.9), Obesidade (>= 30.0).',
      language: 'c',
      starterCode: `#include <stdio.h>

int main() {
    float peso = 70.0;
    float altura = 1.75;

    // Calcule o IMC: peso / (altura * altura)
    // Classifique usando if/else if/else:
    // < 18.5  -> "Abaixo do peso"
    // < 25.0  -> "Normal"
    // < 30.0  -> "Sobrepeso"
    // >= 30.0 -> "Obesidade"

    return 0;
}`,
      solution: `#include <stdio.h>

int main() {
    float peso = 70.0;
    float altura = 1.75;
    float imc = peso / (altura * altura);

    printf("Peso: %.1f kg\\n", peso);
    printf("Altura: %.2f m\\n", altura);
    printf("IMC: %.1f\\n", imc);

    if (imc < 18.5) {
        printf("Classificacao: Abaixo do peso\\n");
    } else if (imc < 25.0) {
        printf("Classificacao: Normal\\n");
    } else if (imc < 30.0) {
        printf("Classificacao: Sobrepeso\\n");
    } else {
        printf("Classificacao: Obesidade\\n");
    }

    return 0;
}`,
      hints: [
        'A formula do IMC e: peso / (altura * altura).',
        'Use parenteses para garantir que a multiplicacao aconteca primeiro.',
        'Armazene o resultado em uma variavel float antes de comparar.',
      ],
    },
  ],
};
