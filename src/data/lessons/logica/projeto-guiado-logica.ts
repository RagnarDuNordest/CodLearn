import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-logica',
  moduleId: 'logica',
  title: 'Projeto: Validador de Formulário',
  description:
    'Aplique pensamento computacional, estruturas de decisão e repetição construindo um validador de cadastro real, passo a passo.',
  order: 11,
  estimatedMinutes: 30,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-logica',
    title: 'Validador de Cadastro de Usuário',
    language: 'python',
    scenario:
      'Uma startup de tecnologia precisa de um sistema de cadastro que valide os dados do usuário antes de criar a conta. Você foi contratado como desenvolvedor júnior para implementar as validações usando Python.',
    objective:
      'Construir um programa que valide nome, idade e confirme o cadastro de um usuário, com mensagens claras de erro ou sucesso para cada campo.',
    steps: [
      {
        id: 'gp-logica-s1',
        title: 'Validar o nome',
        description:
          'Comece pedindo o nome do usuário. Se tiver 2 ou mais caracteres, exiba "Nome valido". Se não, exiba "Nome invalido: muito curto".',
        starterCode:
          '# Etapa 1: Validar o nome\nnome = input("Nome: ")\n\n# Se len(nome) >= 2, exiba "Nome valido"\n# Caso contrario, exiba "Nome invalido: muito curto"\n',
        solution:
          'nome = input("Nome: ")\nif len(nome) >= 2:\n    print("Nome valido")\nelse:\n    print("Nome invalido: muito curto")',
        hints: [
          'Use len(nome) para saber o tamanho do nome.',
          'Estrutura: if len(nome) >= 2: ... else: ...',
        ],
        testCases: [
          {
            description: 'Nome "Ana" é válido',
            inputs: ['Ana'],
            expectedOutput: 'Nome: Ana\nNome valido',
          },
          {
            description: 'Nome "A" é muito curto',
            inputs: ['A'],
            expectedOutput: 'Nome: A\nNome invalido: muito curto',
          },
        ],
      },
      {
        id: 'gp-logica-s2',
        title: 'Validar a idade',
        description:
          'Agora adicione a validação de idade. Leia a idade como inteiro. Se estiver entre 1 e 120, exiba "Idade valida". Caso contrário, exiba "Idade invalida".',
        starterCode:
          '# Etapa 2: Nome + Idade\nnome = input("Nome: ")\nif len(nome) >= 2:\n    print("Nome valido")\nelse:\n    print("Nome invalido: muito curto")\n\nidade = int(input("Idade: "))\n# Valide a idade (1 a 120)\n',
        solution:
          'nome = input("Nome: ")\nif len(nome) >= 2:\n    print("Nome valido")\nelse:\n    print("Nome invalido: muito curto")\nidade = int(input("Idade: "))\nif 1 <= idade <= 120:\n    print("Idade valida")\nelse:\n    print("Idade invalida")',
        hints: [
          'Use int(input("Idade: ")) para ler a idade como número inteiro.',
          'Você pode checar o intervalo com: if 1 <= idade <= 120',
        ],
        testCases: [
          {
            description: 'Nome "Lucas", idade 25 — tudo válido',
            inputs: ['Lucas', '25'],
            expectedOutput: 'Nome: Lucas\nNome valido\nIdade: 25\nIdade valida',
          },
          {
            description: 'Nome "Pedro", idade 200 — inválida',
            inputs: ['Pedro', '200'],
            expectedOutput: 'Nome: Pedro\nNome valido\nIdade: 200\nIdade invalida',
          },
        ],
      },
      {
        id: 'gp-logica-s3',
        title: 'Confirmar ou rejeitar o cadastro',
        description:
          'Agora combine tudo: se o nome E a idade forem válidos, exiba "Cadastro realizado com sucesso!". Se algum campo for inválido, exiba "Cadastro rejeitado.".',
        starterCode:
          '# Etapa 3: Validacao completa\nnome = input("Nome: ")\nidade = int(input("Idade: "))\n\nnome_valido = len(nome) >= 2\nidade_valida = 1 <= idade <= 120\n\n# Se nome_valido E idade_valida, cadastro OK\n# Caso contrario, cadastro rejeitado\n',
        solution:
          'nome = input("Nome: ")\nidade = int(input("Idade: "))\nnome_valido = len(nome) >= 2\nidade_valida = 1 <= idade <= 120\nif nome_valido and idade_valida:\n    print("Cadastro realizado com sucesso!")\nelse:\n    print("Cadastro rejeitado.")',
        hints: [
          'Salve o resultado das validações em variáveis booleanas: nome_valido = len(nome) >= 2',
          'Use o operador "and" para verificar se os dois são verdadeiros.',
        ],
        testCases: [
          {
            description: 'Dados válidos → cadastro realizado',
            inputs: ['Carla', '22'],
            expectedOutput: 'Nome: Carla\nIdade: 22\nCadastro realizado com sucesso!',
          },
          {
            description: 'Idade inválida → cadastro rejeitado',
            inputs: ['Carla', '0'],
            expectedOutput: 'Nome: Carla\nIdade: 0\nCadastro rejeitado.',
          },
          {
            description: 'Nome muito curto → cadastro rejeitado',
            inputs: ['X', '30'],
            expectedOutput: 'Nome: X\nIdade: 30\nCadastro rejeitado.',
          },
        ],
      },
    ],
  },
};
