import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-algoritmos',
  moduleId: 'algoritmos',
  title: 'Projeto Livre: Sistema de Ranking',
  description:
    'Implemente um sistema completo que ordena jogadores por pontuação e exibe o pódio — combinando ordenação e busca.',
  order: 9,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-algoritmos',
    title: 'Ranking de Jogadores',
    language: 'python',
    scenario:
      'Um torneio de games precisa exibir o ranking dos 3 melhores jogadores. Você deve ordenar a lista de pontuações do maior para o menor e exibir o pódio.',
    objective:
      'Ordenar uma lista de pontuações em ordem decrescente (do maior para o menor) e exibir o 1º, 2º e 3º lugar.',
    requirements: [
      'Usar a lista de pontuações fornecida (não usar input)',
      'Ordenar em ordem DECRESCENTE (maior primeiro) sem usar sorted() ou .sort()',
      'Exibir "1o lugar: <valor>", "2o lugar: <valor>", "3o lugar: <valor>"',
    ],
    starterCode:
      '# Sistema de Ranking\npontuacoes = [850, 1200, 400, 950, 1100, 300, 780]\n\n# Ordene em ordem decrescente (maior para menor)\n# Sem usar sorted() ou .sort()\n# Dica: use bubble sort adaptado\n\n# Exiba o podio\n',
    solution:
      'pontuacoes = [850, 1200, 400, 950, 1100, 300, 780]\nn = len(pontuacoes)\nfor i in range(n):\n    for j in range(n - i - 1):\n        if pontuacoes[j] < pontuacoes[j + 1]:\n            pontuacoes[j], pontuacoes[j + 1] = pontuacoes[j + 1], pontuacoes[j]\nprint("1o lugar:", pontuacoes[0])\nprint("2o lugar:", pontuacoes[1])\nprint("3o lugar:", pontuacoes[2])',
    hints: [
      'Adapte o bubble sort para ordem decrescente: troque quando lista[j] < lista[j+1] (ao invés de >).',
      'Após ordenar, o maior estará em pontuacoes[0].',
    ],
    testCases: [
      {
        description: 'Pódio correto: 1200, 1100, 950',
        inputs: [],
        expectedOutput: '1o lugar: 1200\n2o lugar: 1100\n3o lugar: 950',
      },
    ],
  },
};
