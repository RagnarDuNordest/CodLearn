import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-c',
  moduleId: 'c',
  title: 'Projeto Livre: Cadastro de Alunos com Structs',
  description:
    'Crie um sistema de cadastro de alunos usando structs, arrays e funções em C — o tipo de programa escrito no mercado para sistemas embarcados e desktop.',
  order: 13,
  estimatedMinutes: 35,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-c',
    title: 'Sistema de Cadastro de Alunos',
    language: 'c',
    scenario:
      'Uma faculdade precisa de um sistema simples em C para cadastrar alunos, calcular suas médias e exibir a situação (Aprovado/Reprovado). O sistema deve funcionar para até 5 alunos.',
    objective:
      'Criar uma struct Aluno com nome, nota1, nota2, media. Preencher um array de 3 alunos, calcular a media de cada um e exibir a situação.',
    requirements: [
      'Definir struct Aluno { char nome[50]; float nota1, nota2, media; char situacao[15]; }',
      'Criar array de 3 alunos com dados fixos (sem scanf)',
      'Calcular media = (nota1 + nota2) / 2 para cada aluno',
      'Se media >= 7: situacao = "Aprovado", caso contrário "Reprovado"',
      'Exibir: "Nome: <nome> | Media: <media> | <situacao>"',
    ],
    starterCode:
      '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char nome[50];\n    float nota1;\n    float nota2;\n    float media;\n    char situacao[15];\n} Aluno;\n\nint main() {\n    Aluno alunos[3];\n\n    // Preencha os dados dos 3 alunos\n    // alunos[0]: "Ana", 8.0, 7.5\n    // alunos[1]: "Pedro", 5.0, 6.0\n    // alunos[2]: "Carla", 9.5, 8.0\n\n    // Calcule a media e situacao de cada aluno\n\n    // Exiba os resultados\n\n    return 0;\n}\n',
    solution:
      '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char nome[50];\n    float nota1;\n    float nota2;\n    float media;\n    char situacao[15];\n} Aluno;\n\nint main() {\n    Aluno alunos[3];\n    strcpy(alunos[0].nome, "Ana");   alunos[0].nota1 = 8.0; alunos[0].nota2 = 7.5;\n    strcpy(alunos[1].nome, "Pedro"); alunos[1].nota1 = 5.0; alunos[1].nota2 = 6.0;\n    strcpy(alunos[2].nome, "Carla"); alunos[2].nota1 = 9.5; alunos[2].nota2 = 8.0;\n    for (int i = 0; i < 3; i++) {\n        alunos[i].media = (alunos[i].nota1 + alunos[i].nota2) / 2;\n        if (alunos[i].media >= 7)\n            strcpy(alunos[i].situacao, "Aprovado");\n        else\n            strcpy(alunos[i].situacao, "Reprovado");\n        printf("Nome: %s | Media: %.1f | %s\\n",\n            alunos[i].nome, alunos[i].media, alunos[i].situacao);\n    }\n    return 0;\n}',
    hints: [
      'Use strcpy(alunos[0].nome, "Ana") para definir strings em structs.',
      'Percorra com for (int i = 0; i < 3; i++) { ... }',
      'alunos[i].media = (alunos[i].nota1 + alunos[i].nota2) / 2;',
    ],
    testCases: [
      { description: 'Ana média 7.75 → Aprovada; Pedro média 5.5 → Reprovado; Carla média 8.75 → Aprovada', inputs: [], expectedOutput: '' },
    ],
  },
};
