import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-guiado-python',
  moduleId: 'python',
  title: 'Projeto: Gerenciador de Produtos',
  description:
    'Use tudo que aprendeu em Python: variáveis, listas, dicionários, funções e condicionais para construir um sistema de cadastro de produtos de estoque.',
  order: 12,
  estimatedMinutes: 35,
  type: 'guided-project',
  sections: [],
  guidedProject: {
    id: 'gp-python',
    title: 'Sistema de Estoque de Produtos',
    language: 'python',
    scenario:
      'Uma pequena loja contratou você para criar um sistema de controle de estoque. O sistema deve cadastrar produtos com nome, preço e quantidade, calcular o valor total e alertar quando o estoque estiver baixo.',
    objective:
      'Construir um programa que cadastra um produto, calcula valor total em estoque, aplica desconto e verifica o nível de estoque.',
    steps: [
      {
        id: 'gp-python-s1',
        title: 'Cadastrar produto e exibir informações',
        description:
          'Leia o nome do produto, o preço (float) e a quantidade (int). Exiba cada informação formatada.',
        starterCode:
          '# Etapa 1: Cadastrar produto\nnome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\n\n# Exiba:\n# "Produto: <nome>"\n# "Preco: R$ <preco>"\n# "Quantidade: <qtd>"\n',
        solution:
          'nome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\nprint("Produto:", nome)\nprint("Preco: R$", preco)\nprint("Quantidade:", quantidade)',
        hints: [
          'Use float() para o preço e int() para a quantidade.',
          'print("Preco: R$", preco) junta o texto com o valor automaticamente.',
        ],
        testCases: [
          {
            description: 'Exibe dados do produto corretamente',
            inputs: ['Smartphone', '1500.0', '10'],
            expectedOutput: 'Produto: Smartphone\nPreco: 1500.0\nQuantidade: 10\nProduto: Smartphone\nPreco: R$ 1500.0\nQuantidade: 10',
          },
        ],
      },
      {
        id: 'gp-python-s2',
        title: 'Calcular valor total e aplicar desconto',
        description:
          'Calcule o valor total (preco × quantidade), aplique 10% de desconto e exiba os três valores: "Total:", "Desconto:" e "Total com desconto:".',
        starterCode:
          '# Etapa 2: Calculos de estoque\nnome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\nprint("Produto:", nome)\nprint("Preco: R$", preco)\nprint("Quantidade:", quantidade)\n\n# Calcule:\ntotal = preco * quantidade\ndesconto = total * 0.1\ntotal_com_desconto = total - desconto\n\n# Exiba os 3 valores\n',
        solution:
          'nome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\nprint("Produto:", nome)\nprint("Preco: R$", preco)\nprint("Quantidade:", quantidade)\ntotal = preco * quantidade\ndesconto = total * 0.1\ntotal_com_desconto = total - desconto\nprint("Total:", total)\nprint("Desconto:", desconto)\nprint("Total com desconto:", total_com_desconto)',
        hints: [
          'total = preco * quantidade',
          'desconto = total * 0.1  (10% do total)',
          'total_com_desconto = total - desconto',
        ],
        testCases: [
          {
            description: 'Smartphone: R$ 1500.0 × 10 → total 15000.0, desconto 1500.0',
            inputs: ['Smartphone', '1500.0', '10'],
            expectedOutput: 'Produto: Smartphone\nPreco: 1500.0\nQuantidade: 10\nProduto: Smartphone\nPreco: R$ 1500.0\nQuantidade: 10\nTotal: 15000.0\nDesconto: 1500.0\nTotal com desconto: 13500.0',
          },
        ],
      },
      {
        id: 'gp-python-s3',
        title: 'Verificar nível de estoque',
        description:
          'Adicione uma verificação: se quantidade < 5, exiba "Estoque: Baixo - Reposicao necessaria". Se entre 5 e 20, "Estoque: Normal". Se > 20, "Estoque: Alto".',
        starterCode:
          '# Etapa 3: Verificar estoque\nnome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\nprint("Produto:", nome)\nprint("Preco: R$", preco)\nprint("Quantidade:", quantidade)\ntotal = preco * quantidade\ndesconto = total * 0.1\ntotal_com_desconto = total - desconto\nprint("Total:", total)\nprint("Desconto:", desconto)\nprint("Total com desconto:", total_com_desconto)\n\n# Verifique o nivel de estoque com if/elif/else\n',
        solution:
          'nome = input("Produto: ")\npreco = float(input("Preco: "))\nquantidade = int(input("Quantidade: "))\nprint("Produto:", nome)\nprint("Preco: R$", preco)\nprint("Quantidade:", quantidade)\ntotal = preco * quantidade\ndesconto = total * 0.1\ntotal_com_desconto = total - desconto\nprint("Total:", total)\nprint("Desconto:", desconto)\nprint("Total com desconto:", total_com_desconto)\nif quantidade < 5:\n    print("Estoque: Baixo - Reposicao necessaria")\nelif quantidade <= 20:\n    print("Estoque: Normal")\nelse:\n    print("Estoque: Alto")',
        hints: [
          'Use if quantidade < 5: ... elif quantidade <= 20: ... else: ...',
          'Os três casos cobrem todos os valores possíveis de quantidade.',
        ],
        testCases: [
          {
            description: 'Qtd 10 → Estoque Normal',
            inputs: ['Notebook', '3000.0', '10'],
            expectedOutput: 'Produto: Notebook\nPreco: 3000.0\nQuantidade: 10\nProduto: Notebook\nPreco: R$ 3000.0\nQuantidade: 10\nTotal: 30000.0\nDesconto: 3000.0\nTotal com desconto: 27000.0\nEstoque: Normal',
          },
          {
            description: 'Qtd 3 → Estoque Baixo',
            inputs: ['Tablet', '800.0', '3'],
            expectedOutput: 'Produto: Tablet\nPreco: 800.0\nQuantidade: 3\nProduto: Tablet\nPreco: R$ 800.0\nQuantidade: 3\nTotal: 2400.0\nDesconto: 240.0\nTotal com desconto: 2160.0\nEstoque: Baixo - Reposicao necessaria',
          },
        ],
      },
    ],
  },
};
