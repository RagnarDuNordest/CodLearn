import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-intro',
  moduleId: 'intro',
  title: 'Projeto: Calculadora de IMC',
  description:
    'Projeto livre — voce recebe o enunciado e os requisitos, mas a solucao e sua! Construa uma calculadora de IMC (Indice de Massa Corporal) usando tudo que aprendeu no modulo.',
  order: 6,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-intro',
    title: 'Calculadora de IMC',
    language: 'python',
    scenario:
      'Uma clinica de saude quer automatizar o calculo de IMC dos pacientes. Voce foi contratado para criar um programa que receba o nome, peso (kg) e altura (m) do paciente, calcule o IMC e classifique o resultado. A formula do IMC e: peso / (altura * altura).',
    objective:
      'Criar um programa Python que calcule o IMC de um paciente e exiba a classificacao de acordo com os valores: IMC < 18.5 → "Abaixo do peso", 18.5 a 24.9 → "Peso normal", 25.0 a 29.9 → "Sobrepeso", >= 30.0 → "Obesidade".',
    requirements: [
      'Ler o nome do paciente com input() e exibir "Paciente: <nome>"',
      'Ler o peso em kg e a altura em metros com float(input(...))',
      'Calcular o IMC com a formula: imc = peso / (altura * altura)',
      'Exibir o IMC com duas casas decimais usando round(imc, 2)',
      'Classificar o IMC: < 18.5 "Abaixo do peso", 18.5 a 24.9 "Peso normal", 25.0 a 29.9 "Sobrepeso", >= 30.0 "Obesidade"',
      'Exibir "IMC: <valor>" e "Classificacao: <categoria>"',
    ],
    starterCode:
      '# Calculadora de IMC\n# Leia nome, peso e altura\n# Calcule o IMC (peso / altura^2)\n# Classifique e exiba o resultado\n\n',
    solution:
      'nome = input("Nome do paciente: ")\nprint("Paciente:", nome)\npeso = float(input("Peso (kg): "))\naltura = float(input("Altura (m): "))\nimc = peso / (altura * altura)\nimc = round(imc, 2)\nprint("IMC:", imc)\nif imc < 18.5:\n    print("Classificacao: Abaixo do peso")\nelif imc < 25:\n    print("Classificacao: Peso normal")\nelif imc < 30:\n    print("Classificacao: Sobrepeso")\nelse:\n    print("Classificacao: Obesidade")',
    hints: [
      'Comece lendo as entradas: nome = input("Nome do paciente: "), depois peso e altura com float(input(...)).',
      'A formula do IMC e: imc = peso / (altura * altura). Use parenteses para a multiplicacao.',
      'Para arredondar, use round(imc, 2) antes de exibir.',
      'Para classificar, use if/elif/else. elif significa "senao se" em Python.',
      'Os limites sao: < 18.5 → Abaixo do peso, entre 18.5 e 24.9 → Peso normal, entre 25 e 29.9 → Sobrepeso, >= 30 → Obesidade.',
    ],
    testCases: [
      {
        description: 'Paciente com peso normal (IMC 22.86)',
        inputs: ['Lucas', '70', '1.75'],
        expectedOutput: 'Nome do paciente: Lucas\nPaciente: Lucas\nPeso (kg): 70\nAltura (m): 1.75\nIMC: 22.86\nClassificacao: Peso normal',
      },
      {
        description: 'Paciente com sobrepeso (IMC 27.78)',
        inputs: ['Paula', '90', '1.80'],
        expectedOutput: 'Nome do paciente: Paula\nPaciente: Paula\nPeso (kg): 90\nAltura (m): 1.80\nIMC: 27.78\nClassificacao: Sobrepeso',
      },
      {
        description: 'Paciente abaixo do peso (IMC 17.14)',
        inputs: ['Pedro', '48', '1.67'],
        expectedOutput: 'Nome do paciente: Pedro\nPaciente: Pedro\nPeso (kg): 48\nAltura (m): 1.67\nIMC: 17.21\nClassificacao: Abaixo do peso',
      },
    ],
  },
};
