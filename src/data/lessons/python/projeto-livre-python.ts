import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-python',
  moduleId: 'python',
  title: 'Projeto Livre: Analisador de Vendas',
  description:
    'Analise dados de vendas da semana usando listas, loops e funções Python.',
  order: 13,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-python',
    title: 'Analisador de Vendas Semanais',
    language: 'python',
    scenario:
      'Uma empresa de e-commerce precisa de um script que analise as vendas dos últimos 7 dias. O script deve calcular estatísticas e identificar o melhor dia de venda.',
    objective:
      'Dado os valores de venda de 7 dias em uma lista, calcular e exibir: total, média, maior e menor venda.',
    requirements: [
      'Usar uma lista com 7 valores de venda (definidos no código, não com input)',
      'Calcular e exibir o total com "Total:", a media com "Media:"',
      'Exibir a maior venda com "Maior:" e a menor com "Menor:"',
      'Exibir o índice (1-7) do dia com maior venda: "Melhor dia: <numero>"',
    ],
    starterCode:
      '# Analisador de Vendas Semanais\nvendas = [1200, 850, 2100, 1750, 900, 3200, 1400]\n\n# Calcule e exiba:\n# Total, Media, Maior, Menor\n# Melhor dia (indice 1 a 7)\n',
    solution:
      'vendas = [1200, 850, 2100, 1750, 900, 3200, 1400]\ntotal = sum(vendas)\nmedia = total / len(vendas)\nmaior = max(vendas)\nmenor = min(vendas)\nmelhor_dia = vendas.index(maior) + 1\nprint("Total:", total)\nprint("Media:", media)\nprint("Maior:", maior)\nprint("Menor:", menor)\nprint("Melhor dia:", melhor_dia)',
    hints: [
      'Use sum(vendas) para o total, max() e min() para maior e menor.',
      'A média é total / len(vendas).',
      'vendas.index(max(vendas)) retorna o índice (começa em 0), some +1 para o dia.',
    ],
    testCases: [
      {
        description: 'Total correto: 11400',
        inputs: [],
        expectedOutput: 'Total: 11400\nMedia: 1628.5714285714287\nMaior: 3200\nMenor: 850\nMelhor dia: 6',
      },
    ],
  },
};
