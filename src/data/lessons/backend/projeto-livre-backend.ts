import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-livre-backend',
  moduleId: 'backend',
  title: 'Projeto Livre: Processamento de Pedidos',
  description:
    'Implemente a lógica de processamento de pedidos de um e-commerce: calcule subtotais, aplique descontos e gere o resumo do pedido.',
  order: 7,
  estimatedMinutes: 30,
  type: 'free-project',
  sections: [],
  freeProject: {
    id: 'fp-backend',
    title: 'Processador de Pedidos de E-commerce',
    language: 'python',
    scenario:
      'Você está implementando o módulo de checkout de um e-commerce. O sistema recebe uma lista de itens do carrinho e precisa calcular o total, aplicar desconto por volume e gerar um resumo.',
    objective:
      'Processar um carrinho de compras: calcular subtotal por item, total geral, aplicar 15% de desconto se total > 500, e exibir o resumo.',
    requirements: [
      'Calcular subtotal de cada item: quantidade × preço',
      'Calcular total geral de todos os itens',
      'Se total > 500: aplicar 15% de desconto e exibir "Desconto: <valor>"',
      'Exibir "Total: <valor>" e "Total final: <valor>"',
    ],
    starterCode:
      '# Processador de Pedidos\ncarrinho = [\n    {"nome": "Camiseta", "preco": 89.90, "qtd": 2},\n    {"nome": "Calca", "preco": 159.90, "qtd": 1},\n    {"nome": "Tenis", "preco": 249.90, "qtd": 1},\n]\n\n# Calcule o total\n# Aplique desconto se necessario\n# Exiba o resumo\n',
    solution:
      'carrinho = [\n    {"nome": "Camiseta", "preco": 89.90, "qtd": 2},\n    {"nome": "Calca", "preco": 159.90, "qtd": 1},\n    {"nome": "Tenis", "preco": 249.90, "qtd": 1},\n]\ntotal = 0\nfor item in carrinho:\n    subtotal = item["preco"] * item["qtd"]\n    total += subtotal\nprint("Total:", total)\nif total > 500:\n    desconto = total * 0.15\n    total_final = total - desconto\n    print("Desconto:", desconto)\nelse:\n    total_final = total\nprint("Total final:", total_final)',
    hints: [
      'Percorra o carrinho com for item in carrinho:',
      'subtotal = item["preco"] * item["qtd"]',
      'Acumule o total com total += subtotal',
      'Se total > 500: desconto = total * 0.15',
    ],
    testCases: [
      {
        description: 'Total 589.6; desconto 88.44; total final 501.16',
        inputs: [],
        expectedOutput: 'Total: 589.6\nDesconto: 88.44\nTotal final: 501.16000000000003',
      },
    ],
  },
};
