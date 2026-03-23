import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-c',
  moduleId: 'c',
  title: 'Projeto: Calculadora com Funções em C',
  description:
    'Construa uma calculadora completa em C, do zero, usando funções, switch e tratamento de entrada — do jeito que é feito em sistemas embarcados.',
  order: 12,
  estimatedMinutes: 40,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-c',
    title: 'Calculadora Modular em C',
    language: 'c',
    scenario:
      'Uma empresa de eletrônica precisa de um firmware de calculadora básica para um microcontrolador. Você vai implementar cada operação como uma função separada e um menu interativo em C.',
    objective:
      'Construir uma calculadora em C com funções para cada operação aritmética e menu interativo usando switch.',
    steps: [
      {
        id: 'gp-c-s1',
        title: 'Função main e operações básicas',
        description:
          'Crie um programa C que lê dois números e realiza adição, subtração, multiplicação e divisão, exibindo cada resultado.',
        starterCode:
          '#include <stdio.h>\n\nint main() {\n    float a, b;\n    printf("Numero A: ");\n    scanf("%f", &a);\n    printf("Numero B: ");\n    scanf("%f", &b);\n\n    // Calcule e exiba:\n    // "Soma: <resultado>"\n    // "Subtracao: <resultado>"\n    // "Multiplicacao: <resultado>"\n    // "Divisao: <resultado>" (verifique b != 0)\n\n    return 0;\n}\n',
        solution:
          '#include <stdio.h>\n\nint main() {\n    float a, b;\n    printf("Numero A: ");\n    scanf("%f", &a);\n    printf("Numero B: ");\n    scanf("%f", &b);\n    printf("Soma: %.2f\\n", a + b);\n    printf("Subtracao: %.2f\\n", a - b);\n    printf("Multiplicacao: %.2f\\n", a * b);\n    if (b != 0)\n        printf("Divisao: %.2f\\n", a / b);\n    else\n        printf("Divisao: erro (divisao por zero)\\n");\n    return 0;\n}',
        hints: [
          'Use scanf("%f", &a) para ler floats.',
          'printf("Soma: %.2f\\n", a + b) formata com 2 casas decimais.',
          'Verifique if (b != 0) antes de dividir.',
        ],
        testCases: [
          { description: 'a=10, b=4 → Soma 14.00, Sub 6.00, Mult 40.00, Div 2.50', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-c-s2',
        title: 'Extrair funções para cada operação',
        description:
          'Refatore o código criando funções separadas: float somar(float a, float b), subtrair(), multiplicar() e dividir(). Chame cada uma no main.',
        starterCode:
          '#include <stdio.h>\n\n// Declare e implemente as 4 funcoes aqui\nfloat somar(float a, float b) {\n    // Retorne a + b\n}\n\nfloat subtrair(float a, float b) { /* ... */ }\nfloat multiplicar(float a, float b) { /* ... */ }\nfloat dividir(float a, float b) { /* ... retorne 0 se b==0 */ }\n\nint main() {\n    float a = 10, b = 4;\n    printf("Soma: %.2f\\n", somar(a, b));\n    printf("Subtracao: %.2f\\n", subtrair(a, b));\n    printf("Multiplicacao: %.2f\\n", multiplicar(a, b));\n    printf("Divisao: %.2f\\n", dividir(a, b));\n    return 0;\n}\n',
        solution:
          '#include <stdio.h>\n\nfloat somar(float a, float b) { return a + b; }\nfloat subtrair(float a, float b) { return a - b; }\nfloat multiplicar(float a, float b) { return a * b; }\nfloat dividir(float a, float b) {\n    if (b == 0) return 0;\n    return a / b;\n}\n\nint main() {\n    float a = 10, b = 4;\n    printf("Soma: %.2f\\n", somar(a, b));\n    printf("Subtracao: %.2f\\n", subtrair(a, b));\n    printf("Multiplicacao: %.2f\\n", multiplicar(a, b));\n    printf("Divisao: %.2f\\n", dividir(a, b));\n    return 0;\n}',
        hints: [
          'float somar(float a, float b) { return a + b; }',
          'Cada função recebe dois floats e retorna um float.',
        ],
        testCases: [
          { description: 'a=10, b=4 → Soma 10.00, Sub 6.00, Mult 40.00, Div 2.50', inputs: [], expectedOutput: '' },
        ],
      },
      {
        id: 'gp-c-s3',
        title: 'Menu interativo com switch',
        description:
          'Adicione um menu interativo com switch: o usuário escolhe a operação (1-4), informa os números e o resultado é exibido. Opção inválida exibe mensagem de erro.',
        starterCode:
          '#include <stdio.h>\n\nfloat somar(float a, float b) { return a + b; }\nfloat subtrair(float a, float b) { return a - b; }\nfloat multiplicar(float a, float b) { return a * b; }\nfloat dividir(float a, float b) { return (b != 0) ? a / b : 0; }\n\nint main() {\n    int opcao;\n    float a, b;\n    printf("1-Soma 2-Sub 3-Mult 4-Div\\n");\n    printf("Opcao: ");\n    scanf("%d", &opcao);\n    printf("A: "); scanf("%f", &a);\n    printf("B: "); scanf("%f", &b);\n\n    // Use switch(opcao) para chamar a funcao certa\n    // Exiba: "Resultado: <valor>"\n    // Default: "Opcao invalida"\n\n    return 0;\n}\n',
        solution:
          '#include <stdio.h>\n\nfloat somar(float a, float b) { return a + b; }\nfloat subtrair(float a, float b) { return a - b; }\nfloat multiplicar(float a, float b) { return a * b; }\nfloat dividir(float a, float b) { return (b != 0) ? a / b : 0; }\n\nint main() {\n    int opcao;\n    float a, b;\n    printf("1-Soma 2-Sub 3-Mult 4-Div\\n");\n    printf("Opcao: ");\n    scanf("%d", &opcao);\n    printf("A: "); scanf("%f", &a);\n    printf("B: "); scanf("%f", &b);\n    switch(opcao) {\n        case 1: printf("Resultado: %.2f\\n", somar(a, b)); break;\n        case 2: printf("Resultado: %.2f\\n", subtrair(a, b)); break;\n        case 3: printf("Resultado: %.2f\\n", multiplicar(a, b)); break;\n        case 4: printf("Resultado: %.2f\\n", dividir(a, b)); break;\n        default: printf("Opcao invalida\\n");\n    }\n    return 0;\n}',
        hints: [
          'switch(opcao) { case 1: ... break; case 2: ... break; default: ... }',
          'Não esqueça do break; em cada case.',
        ],
        testCases: [
          { description: 'Opcao 1, A=10, B=3 → Resultado: 13.00', inputs: [], expectedOutput: '' },
        ],
      },
    ],
  },
};
