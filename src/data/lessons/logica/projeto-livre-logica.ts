import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-logica',
  moduleId: 'logica',
  title: 'Projeto Livre: Calculadora com Menu',
  description:
    'Crie uma calculadora interativa com menu de opções usando while, if/elif e operações matemáticas.',
  order: 12,
  estimatedMinutes: 25,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-logica',
    title: 'Calculadora Interativa com Menu',
    language: 'python',
    scenario:
      'Um professor de matemática pediu um programa simples para demonstrar operações básicas em sala de aula. O programa deve mostrar um menu, executar a operação escolhida e perguntar se deseja continuar.',
    objective:
      'Criar uma calculadora que exibe um menu com 4 operações, executa a operação escolhida com dois números e exibe o resultado.',
    requirements: [
      'Ler a opção do menu (1-Soma, 2-Subtração, 3-Multiplicação, 4-Divisão)',
      'Ler dois números (a e b)',
      'Calcular e exibir o resultado com o texto "Resultado: <valor>"',
      'Para divisão, se b for 0, exibir "Erro: divisao por zero"',
    ],
    starterCode:
      '# Calculadora com Menu\nopcao = int(input("Opcao (1-Soma 2-Sub 3-Mult 4-Div): "))\na = float(input("Numero A: "))\nb = float(input("Numero B: "))\n\n# Use if/elif para cada operacao\n# Calcule e exiba: print("Resultado:", resultado)\n',
    solution:
      'opcao = int(input("Opcao (1-Soma 2-Sub 3-Mult 4-Div): "))\na = float(input("Numero A: "))\nb = float(input("Numero B: "))\nif opcao == 1:\n    print("Resultado:", a + b)\nelif opcao == 2:\n    print("Resultado:", a - b)\nelif opcao == 3:\n    print("Resultado:", a * b)\nelif opcao == 4:\n    if b == 0:\n        print("Erro: divisao por zero")\n    else:\n        print("Resultado:", a / b)\nelse:\n    print("Opcao invalida")',
    hints: [
      'Use int(input(...)) para ler a opção como inteiro.',
      'Use if opcao == 1: ... elif opcao == 2: ... etc.',
      'Para divisão, verifique se b == 0 antes de dividir.',
    ],
    testCases: [
      {
        description: 'Opção 1 (Soma): 10 + 5 = 15.0',
        inputs: ['1', '10', '5'],
        expectedOutput: 'Opcao (1-Soma 2-Sub 3-Mult 4-Div): 1\nNumero A: 10\nNumero B: 5\nResultado: 15.0',
      },
      {
        description: 'Opção 3 (Multiplicação): 4 × 3 = 12.0',
        inputs: ['3', '4', '3'],
        expectedOutput: 'Opcao (1-Soma 2-Sub 3-Mult 4-Div): 3\nNumero A: 4\nNumero B: 3\nResultado: 12.0',
      },
      {
        description: 'Opção 4 (Divisão por zero) → erro',
        inputs: ['4', '10', '0'],
        expectedOutput: 'Opcao (1-Soma 2-Sub 3-Mult 4-Div): 4\nNumero A: 10\nNumero B: 0\nErro: divisao por zero',
      },
    ],
  },
};
