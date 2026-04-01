import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-java',
  moduleId: 'java',
  title: 'Projeto Livre: Sistema de Notas com Array',
  description:
    'Crie um sistema de notas usando arrays e classes Java — similar ao que é usado em sistemas de gestão escolar corporativos.',
  order: 10,
  estimatedMinutes: 35,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-java',
    title: 'Sistema de Gestão de Notas',
    language: 'java',
    scenario:
      'Uma escola precisa de um sistema para processar as notas de uma turma. O sistema calcula a média da turma, encontra a maior e menor nota, e conta quantos alunos foram aprovados (média >= 7).',
    objective:
      'Criar uma classe SistemadeNotas que processa um array de notas e exibe estatísticas completas da turma.',
    requirements: [
      'Criar classe SistemaDeNotas com array de notas fixo',
      'Calcular e exibir a media da turma: "Media da turma: <valor>"',
      'Encontrar e exibir a maior e menor nota: "Maior nota: <valor>" e "Menor nota: <valor>"',
      'Contar e exibir aprovados (nota >= 7): "Aprovados: <qtd>"',
    ],
    starterCode:
      'public class SistemaDeNotas {\n    public static void main(String[] args) {\n        double[] notas = {8.5, 6.0, 9.0, 4.5, 7.5, 8.0, 5.5, 10.0};\n\n        // Calcule a media, maior, menor e qtd aprovados\n        // Exiba os resultados\n    }\n}\n',
    solution:
      'public class SistemaDeNotas {\n    public static void main(String[] args) {\n        double[] notas = {8.5, 6.0, 9.0, 4.5, 7.5, 8.0, 5.5, 10.0};\n        double soma = 0, maior = notas[0], menor = notas[0];\n        int aprovados = 0;\n        for (double nota : notas) {\n            soma += nota;\n            if (nota > maior) maior = nota;\n            if (nota < menor) menor = nota;\n            if (nota >= 7) aprovados++;\n        }\n        System.out.println("Media da turma: " + (soma / notas.length));\n        System.out.println("Maior nota: " + maior);\n        System.out.println("Menor nota: " + menor);\n        System.out.println("Aprovados: " + aprovados);\n    }\n}',
    hints: [
      'Use for (double nota : notas) para percorrer o array.',
      'Inicialize maior = notas[0] e menor = notas[0] antes do loop.',
      'Incremente aprovados++ quando nota >= 7.',
    ],
    testCases: [
      { description: 'Média 7.375; Maior 10.0; Menor 4.5; Aprovados 5', inputs: [], expectedOutput: '' },
    ],
  },
};
