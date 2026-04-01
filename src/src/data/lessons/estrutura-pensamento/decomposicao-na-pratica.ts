import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'decomposicao-na-pratica',
  moduleId: 'estrutura-pensamento',
  title: 'Decomposicao na Pratica',
  description:
    'Aprenda a quebrar problemas grandes em partes gerenciaveis usando o pensamento top-down, e descubra quando parar de decompor para comecaar a construir.',
  order: 1,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## Por que decomposicao e a habilidade mais importante?\n\nImagine que voce chegou em uma cozinha industrial e o chef te disse: "Prepare o jantar para 50 pessoas." Se voce pensar nisso como uma tarefa unica, a ansiedade vai paralisar voce.\n\nMas se voce pensar assim:\n1. Defina o menu\n2. Faca a lista de ingredientes\n3. Separe os ingredientes por prato\n4. Prepare as entradas\n5. Prepare os pratos principais\n6. Prepare as sobremesas\n7. Monte os pratos e sirva\n\nDe repente, o jantar para 50 pessoas virou **7 tarefas menores**, cada uma executavel por uma pessoa, em paralelo se necessario. Isso e decomposicao: transformar o esmagador em gerenciavel.\n\n### O segredo do pensamento top-down\n\nO pensamento **top-down** (de cima para baixo) começa no nivel mais alto e abstrato e vai descendo ate chegar nos detalhes concretos.\n\n- **Nivel 1 (topo):** "Criar um site de e-commerce"\n- **Nivel 2:** "Cadastro de usuarios", "Vitrine de produtos", "Carrinho de compras", "Pagamento"\n- **Nivel 3:** "Formulario de cadastro", "Validacao de email", "Envio de email de confirmacao"\n- **Nivel 4 (detalhes):** "Verificar se o email tem o formato correto", "Checar se o email ja existe no banco"\n\nCada nivel decompoe o anterior em partes mais especificas.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Uma regra pratica para saber se ja decompos o suficiente: se voce consegue descrever a tarefa em uma unica frase de acao clara (ex: "somar dois numeros e retornar o resultado"), entao chegou no nivel certo para comecar a escrever codigo.',
    },
    {
      type: 'text',
      content:
        '## Exemplo completo: Construindo um site do zero\n\nVamos aplicar decomposicao top-down para construir um site pessoal:\n\n### Nivel 1 - O problema inteiro:\n"Criar um site pessoal profissional"\n\n### Nivel 2 - Grandes modulos:\n- **Pagina inicial** (home)\n- **Pagina Sobre Mim**\n- **Portfolio de projetos**\n- **Formulario de contato**\n\n### Nivel 3 - Detalhes de cada modulo:\n**Portfolio de projetos:**\n- Listar todos os projetos\n- Para cada projeto: mostrar titulo, descricao, tecnologias usadas, link\n- Filtrar projetos por tecnologia\n- Ordenar por data\n\n**Formulario de contato:**\n- Campo de nome\n- Campo de email\n- Campo de mensagem\n- Botao de envio\n- Validacao dos campos\n- Feedback de sucesso ou erro\n\n### Nivel 4 - Tarefas implementaveis:\n**"Validacao dos campos":**\n- Verificar se o nome nao esta vazio\n- Verificar se o email tem formato valido\n- Verificar se a mensagem tem pelo menos 10 caracteres\n- Se tudo OK, habilitar botao de envio\n- Se algum erro, mostrar mensagem especifica\n\nPerceba: chegamos em tarefas que um desenvolvedor consegue implementar diretamente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo de decomposicao: calcular o total de uma compra\n#\n# Problema: "Calcular o total de uma compra com desconto e frete"\n#\n# Decomposicao em funcoes (cada funcao resolve uma parte):\n\n# PARTE 1: Calcular subtotal dos itens\ndef calcular_subtotal(itens):\n    # itens e uma lista de precos: ex. [29.90, 49.90, 15.00]\n    total = 0\n    for preco in itens:\n        total = total + preco\n    return total\n\n# PARTE 2: Calcular desconto\ndef calcular_desconto(subtotal, percentual):\n    return subtotal * percentual / 100\n\n# PARTE 3: Calcular frete\ndef calcular_frete(subtotal):\n    # Frete gratis para compras acima de R$ 100\n    if subtotal >= 100:\n        return 0\n    else:\n        return 15.90\n\n# PARTE 4: Calcular total final (une todas as partes)\ndef calcular_total(itens, desconto_pct):\n    subtotal = calcular_subtotal(itens)        # chama parte 1\n    desconto = calcular_desconto(subtotal, desconto_pct)  # chama parte 2\n    frete = calcular_frete(subtotal)           # chama parte 3\n    total = subtotal - desconto + frete\n    return total\n\n# Testando com uma compra real\ncarrinho = [29.90, 49.90, 35.00]\ndesconto = 10  # 10% de desconto\n\nresultado = calcular_total(carrinho, desconto)\nprint("Total da compra: R$", resultado)',
        filename: 'decomposicao_compra.py',
        description:
          'Cada funcao resolve UMA parte do problema. A funcao principal "calcular_total" simplesmente une as partes. Essa e a essencia da decomposicao: dividir para conquistar.',
      },
    },
    {
      type: 'text',
      content:
        '## Quando parar de decompor?\n\nDecomposicao demais pode ser tao prejudicial quanto decomposicao de menos. Voce chegou no nivel certo quando:\n\n**Sinais de que pode parar:**\n- A tarefa cabe em uma funcao de no maximo 20 linhas\n- A tarefa tem uma entrada e uma saida claras\n- Voce consegue nomear a tarefa com um verbo de acao preciso: "calcular", "validar", "buscar", "salvar"\n- Voce consegue testar a tarefa isoladamente\n\n**Sinais de que precisa decompor mais:**\n- A tarefa tem mais de um verbo principal: "calcular E salvar E enviar email"\n- Voce precisa de varios paragrafos para explicar o que a tarefa faz\n- A tarefa depende de muitas condicoes diferentes\n- A tarefa faz sentido decomposta em "primeiro... depois... por fim..."\n\n**Regra pratica:** Se voce disse "E" ao descrever a tarefa, provavelmente ela pode ser dividida. "Calcular o total E aplicar desconto" = duas tarefas.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Decomposicao e iterativa: voce decompoe, tenta implementar, descobre que uma parte ainda e grande demais, e decompoe de novo. Nao tente fazer a decomposicao perfeita antes de comecar. Uma boa decomposicao inicial ja e suficiente para dar o primeiro passo.',
    },
  ],
  challenges: [
    {
      id: 'decomposicao-c1',
      title: 'Decompondo uma Calculadora de Notas',
      description:
        'Um professor precisa calcular a situacao de cada aluno. As regras sao: media das 3 provas; se media >= 7.0 esta aprovado; se media entre 5.0 e 6.9 esta em recuperacao; se media < 5.0 esta reprovado. Decomponha o problema em partes e implemente cada parte separadamente usando funcoes.',
      language: 'python',
      starterCode:
        '# Decomposicao do problema:\n# Parte 1: calcular a media de 3 notas\n# Parte 2: classificar a situacao com base na media\n# Parte 3: exibir o resultado completo\n\n# Implemente cada parte como uma funcao:\n\ndef calcular_media(nota1, nota2, nota3):\n    # Retorna a media das tres notas\n    pass  # substitua "pass" pelo seu codigo\n\ndef classificar_situacao(media):\n    # Retorna "Aprovado", "Recuperacao" ou "Reprovado"\n    pass  # substitua "pass" pelo seu codigo\n\ndef exibir_resultado(nota1, nota2, nota3):\n    # Usa as funcoes acima para mostrar o resultado completo\n    pass  # substitua "pass" pelo seu codigo\n\n# Teste com estes alunos:\nexibir_resultado(8.0, 7.5, 9.0)  # deve ser Aprovado\nexibir_resultado(5.5, 6.0, 6.5)  # deve ser Recuperacao\nexibir_resultado(4.0, 3.5, 5.0)  # deve ser Reprovado\n',
      solution:
        'def calcular_media(nota1, nota2, nota3):\n    soma = nota1 + nota2 + nota3\n    return soma / 3\n\ndef classificar_situacao(media):\n    if media >= 7.0:\n        return "Aprovado"\n    elif media >= 5.0:\n        return "Recuperacao"\n    else:\n        return "Reprovado"\n\ndef exibir_resultado(nota1, nota2, nota3):\n    media = calcular_media(nota1, nota2, nota3)\n    situacao = classificar_situacao(media)\n    print("Notas:", nota1, nota2, nota3)\n    print("Media:", media)\n    print("Situacao:", situacao)\n    print("---")\n\nexibir_resultado(8.0, 7.5, 9.0)\nexibir_resultado(5.5, 6.0, 6.5)\nexibir_resultado(4.0, 3.5, 5.0)',
      hints: [
        'Em "calcular_media", some as tres notas e divida por 3. Use "return" para devolver o resultado.',
        'Em "classificar_situacao", use if/elif/else: se media >= 7 retorna "Aprovado", se >= 5 retorna "Recuperacao", senao retorna "Reprovado".',
        'Em "exibir_resultado", chame as duas funcoes anteriores: media = calcular_media(...) e situacao = classificar_situacao(media).',
      ],
    },
    {
      id: 'decomposicao-c2',
      title: 'Calculando o Total de um Carrinho de Compras',
      description:
        'Decomponha o calculo do total de um carrinho de compras. Voce tem uma lista de tuplas (nome, preco, quantidade). Precisar calcular: subtotal de cada item (preco * quantidade), total geral, e verificar se ganhou frete gratis (total >= 150 tem frete gratis, senao frete de R$ 19.90).',
      language: 'python',
      starterCode:
        '# Carrinho de compras: lista de (nome, preco, quantidade)\ncarrinho = [\n    ("Camiseta", 49.90, 2),\n    ("Tenis", 189.90, 1),\n    ("Meia", 12.90, 3),\n]\n\n# PARTE 1: calcular subtotal de um item (preco * quantidade)\ndef calcular_subtotal_item(preco, quantidade):\n    pass\n\n# PARTE 2: calcular total de todos os itens\ndef calcular_total_itens(carrinho):\n    # dica: percorra o carrinho com "for item in carrinho:"\n    # cada item e uma tupla: item[0]=nome, item[1]=preco, item[2]=quantidade\n    pass\n\n# PARTE 3: calcular o frete (gratis se total >= 150, senao R$ 19.90)\ndef calcular_frete(total):\n    pass\n\n# PARTE 4: exibir o resumo completo\ndef exibir_resumo(carrinho):\n    pass\n\nexibir_resumo(carrinho)\n',
      solution:
        'carrinho = [\n    ("Camiseta", 49.90, 2),\n    ("Tenis", 189.90, 1),\n    ("Meia", 12.90, 3),\n]\n\ndef calcular_subtotal_item(preco, quantidade):\n    return preco * quantidade\n\ndef calcular_total_itens(carrinho):\n    total = 0\n    for item in carrinho:\n        subtotal = calcular_subtotal_item(item[1], item[2])\n        total = total + subtotal\n    return total\n\ndef calcular_frete(total):\n    if total >= 150:\n        return 0\n    else:\n        return 19.90\n\ndef exibir_resumo(carrinho):\n    print("=== Resumo do Carrinho ===")\n    for item in carrinho:\n        subtotal = calcular_subtotal_item(item[1], item[2])\n        print(item[0], "x", item[2], "= R$", subtotal)\n    total = calcular_total_itens(carrinho)\n    frete = calcular_frete(total)\n    print("Subtotal: R$", total)\n    print("Frete: R$", frete)\n    print("Total final: R$", total + frete)\n\nexibir_resumo(carrinho)',
      hints: [
        'Em "calcular_subtotal_item", retorne preco * quantidade.',
        'Em "calcular_total_itens", use um loop "for item in carrinho:" e acesse item[1] (preco) e item[2] (quantidade).',
        'Em "exibir_resumo", chame todas as funcoes anteriores e use print() para mostrar cada linha do resumo.',
      ],
    },
  ],
};
