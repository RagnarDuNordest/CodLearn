import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-intro',
  moduleId: 'intro',
  title: 'Projeto: Sistema de Notas',
  description:
    'Coloque em pratica tudo que aprendeu no modulo! Voce vai construir um sistema de notas escolar passo a passo, combinando variaveis, entrada de dados, calculos e decisoes.',
  order: 5,
  estimatedMinutes: 25,
  type: 'guided-project',
  sections: [
    {
      type: 'text',
      content: '## Python que voce vai usar neste projeto\n\nNeste projeto voce vai praticar Python basico. Aqui esta um resumo rapido de tudo que precisa:\n\n**Ler dados:** `variavel = input("mensagem")` — le texto do usuario\n**Converter tipos:**\n- `int(input("..."))` — le e converte para numero inteiro\n- `float(input("..."))` — le e converte para numero decimal\n\n**Mostrar resultados:** `print("texto", variavel)` ou `print(f"texto {variavel}")`\n\n**Decisoes:**\n```python\nif condicao:\n    # executa se verdadeiro\nelif outra_condicao:\n    # outra opcao\nelse:\n    # caso contrario\n```\n\n**Calculos:** `+`, `-`, `*`, `/`, `**` (potencia), `%` (resto)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'exemplo_input.py',
        code: `# Como ler e usar dados do usuario
nome = input("Seu nome: ")
print("Ola,", nome)

# Lendo numeros (sempre use int() ou float() com input())
idade = int(input("Sua idade: "))
altura = float(input("Sua altura em metros (ex: 1.75): "))

print("Nome:", nome)
print("Idade:", idade, "anos")
print("Altura:", altura, "m")

# Tomando uma decisao com o valor lido
if idade >= 18:
    print("Voce e maior de idade")
else:
    print("Voce e menor de idade")`,
        description: 'Sempre use int() ou float() quando quiser usar o valor de input() em calculos!',
      },
    },
  ],
  guidedProject: {
    id: 'gp-intro',
    title: 'Sistema de Notas Escolar',
    language: 'python',
    scenario:
      'Uma escola pequena contratou voce como desenvolvedor freelancer. O diretor precisa de um programa simples que receba o nome de um aluno e suas tres notas, calcule a media, e informe automaticamente se o aluno foi aprovado ou reprovado. O criterio de aprovacao e media >= 7.',
    objective:
      'Construir um programa Python que leia o nome do aluno, suas tres notas, calcule a media e exiba o resultado da situacao (Aprovado ou Reprovado).',
    steps: [
      {
        id: 'gp-intro-s1',
        title: 'Ler e exibir o nome do aluno',
        description:
          'Comece pelo começo: leia o nome do aluno com input() e exiba uma mensagem de boas-vindas. O programa deve imprimir "Aluno: <nome>".',
        starterCode:
          '# Etapa 1: Ler o nome do aluno e exibir\n# Use input() para pedir o nome e print() para exibir\n\nnome = input("Nome do aluno: ")\n# Exiba: "Aluno: " seguido do nome\n',
        solution:
          'nome = input("Nome do aluno: ")\nprint("Aluno:", nome)',
        hints: [
          'Use input("Nome do aluno: ") para ler o nome.',
          'Para exibir, use print("Aluno:", nome) — o Python vai juntar o texto com o valor da variavel.',
        ],
        testCases: [
          {
            description: 'Exibe o nome do aluno corretamente',
            inputs: ['Maria'],
            expectedOutput: 'Nome do aluno: Maria\nAluno: Maria',
          },
          {
            description: 'Funciona com outro nome',
            inputs: ['Joao'],
            expectedOutput: 'Nome do aluno: Joao\nAluno: Joao',
          },
        ],
      },
      {
        id: 'gp-intro-s2',
        title: 'Ler as tres notas e calcular a media',
        description:
          'Agora leia as tres notas do aluno (use float para aceitar decimais) e calcule a media. Exiba a media com o texto "Media: <valor>".',
        starterCode:
          '# Etapa 2: Ler 3 notas e calcular a media\nnome = input("Nome do aluno: ")\nprint("Aluno:", nome)\n\n# Leia as 3 notas\nnota1 = float(input("Nota 1: "))\nnota2 = float(input("Nota 2: "))\nnota3 = float(input("Nota 3: "))\n\n# Calcule a media e exiba\nmedia = \nprint("Media:", media)\n',
        solution:
          'nome = input("Nome do aluno: ")\nprint("Aluno:", nome)\nnota1 = float(input("Nota 1: "))\nnota2 = float(input("Nota 2: "))\nnota3 = float(input("Nota 3: "))\nmedia = (nota1 + nota2 + nota3) / 3\nprint("Media:", media)',
        hints: [
          'A formula da media e: (nota1 + nota2 + nota3) / 3',
          'Use parenteses para garantir que a soma acontece antes da divisao.',
          'Guarde o resultado em uma variavel chamada "media" e use print("Media:", media).',
        ],
        testCases: [
          {
            description: 'Calcula media 8.0 para notas 7, 8 e 9',
            inputs: ['Ana', '7', '8', '9'],
            expectedOutput: 'Nome do aluno: Ana\nAluno: Ana\nNota 1: 7\nNota 2: 8\nNota 3: 9\nMedia: 8.0',
          },
          {
            description: 'Calcula media 5.0 para notas 4, 5 e 6',
            inputs: ['Carlos', '4', '5', '6'],
            expectedOutput: 'Nome do aluno: Carlos\nAluno: Carlos\nNota 1: 4\nNota 2: 5\nNota 3: 6\nMedia: 5.0',
          },
        ],
      },
      {
        id: 'gp-intro-s3',
        title: 'Exibir aprovado ou reprovado',
        description:
          'Ultima etapa: use if/else para verificar se a media e >= 7 e exibir "Situacao: Aprovado" ou "Situacao: Reprovado". O sistema esta quase pronto!',
        starterCode:
          '# Etapa 3: Programa completo com situacao\nnome = input("Nome do aluno: ")\nprint("Aluno:", nome)\nnota1 = float(input("Nota 1: "))\nnota2 = float(input("Nota 2: "))\nnota3 = float(input("Nota 3: "))\nmedia = (nota1 + nota2 + nota3) / 3\nprint("Media:", media)\n\n# Verifique a situacao do aluno\n# Se media >= 7, exiba "Situacao: Aprovado"\n# Caso contrario, exiba "Situacao: Reprovado"\n',
        solution:
          'nome = input("Nome do aluno: ")\nprint("Aluno:", nome)\nnota1 = float(input("Nota 1: "))\nnota2 = float(input("Nota 2: "))\nnota3 = float(input("Nota 3: "))\nmedia = (nota1 + nota2 + nota3) / 3\nprint("Media:", media)\nif media >= 7:\n    print("Situacao: Aprovado")\nelse:\n    print("Situacao: Reprovado")',
        hints: [
          'Use if media >= 7: para verificar a aprovacao.',
          'Dentro do if, use print("Situacao: Aprovado"). Dentro do else, print("Situacao: Reprovado").',
          'Nao se esqueca da indentacao (4 espacos) dentro do if e do else.',
        ],
        testCases: [
          {
            description: 'Aluno com media 8.0 e Aprovado',
            inputs: ['Ana', '7', '8', '9'],
            expectedOutput: 'Nome do aluno: Ana\nAluno: Ana\nNota 1: 7\nNota 2: 8\nNota 3: 9\nMedia: 8.0\nSituacao: Aprovado',
          },
          {
            description: 'Aluno com media 5.0 e Reprovado',
            inputs: ['Carlos', '4', '5', '6'],
            expectedOutput: 'Nome do aluno: Carlos\nAluno: Carlos\nNota 1: 4\nNota 2: 5\nNota 3: 6\nMedia: 5.0\nSituacao: Reprovado',
          },
          {
            description: 'Media exatamente 7.0 e Aprovado',
            inputs: ['Julia', '7', '7', '7'],
            expectedOutput: 'Nome do aluno: Julia\nAluno: Julia\nNota 1: 7\nNota 2: 7\nNota 3: 7\nMedia: 7.0\nSituacao: Aprovado',
          },
        ],
      },
    ],
  },
};
