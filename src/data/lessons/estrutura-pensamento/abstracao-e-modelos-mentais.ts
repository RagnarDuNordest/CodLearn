import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'abstracao-e-modelos-mentais',
  moduleId: 'estrutura-pensamento',
  title: 'Abstracao e Modelos Mentais',
  description:
    'Entenda como a abstracao esconde complexidade desnecessaria, como criar modelos mentais eficazes e a diferenca entre interface (o que algo faz) e implementacao (como algo faz).',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O que e abstracao?\n\nVoce dirige um carro sem entender exatamente como o motor de combustao interna funciona. Voce usa um microondas sem saber a fisica das ondas eletromagneticas. Voce assiste Netflix sem compreender os protocolos de streaming de video.\n\nIsso e **abstracao**: a capacidade de **usar algo sem precisar entender todos os seus detalhes internos**.\n\nNa programacao, abstracao e uma das ferramentas mais poderosas. Ela permite que voce construa sistemas complexos sem precisar pensar em tudo ao mesmo tempo.\n\n### A analogia do controle remoto\n\nPense no controle remoto da sua TV. Ele tem botoes claros: volume+, volume-, canal+, canal-, ligar/desligar. Voce nao precisa saber:\n- Qual frequencia de radio o controle emite\n- Como o sensor da TV decodifica o sinal\n- Como o circuito interno processa o comando\n- Qual chip esta dentro do controle\n\nVoce so precisa saber: **pressionar o botao certo produz o efeito desejado**.\n\nNa programacao, uma funcao e exatamente como um controle remoto. Voce pressiona (chama) a funcao com os parametros certos e ela produz o resultado. Voce nao precisa entender como ela faz internamente.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Abstracao nao e simplificacao superficial -- e escolha inteligente. Voce precisa saber O QUE uma funcao faz (sua interface) sem necessariamente saber COMO ela faz (sua implementacao). Essa separacao e o que permite que grandes times trabalhem em paralelo: cada time conhece a interface do outro, mas pode mudar a implementacao sem quebrar nada.',
    },
    {
      type: 'text',
      content:
        '## Interface vs. Implementacao\n\nEssa e uma das distincoes mais importantes em toda a engenharia de software.\n\n**Interface** = o contrato publico. O que voce promete fazer, quais dados aceita, o que devolve.\n\n**Implementacao** = os detalhes internos. Como voce cumpre a promessa.\n\n### Exemplo: calcular imposto\n\n**Interface (o contrato):**\n- Nome: `calcular_imposto`\n- Recebe: valor da venda (numero)\n- Retorna: valor do imposto (numero)\n- Regra: imposto e 12% do valor\n\n**Implementacao (os detalhes):**\n```\nretorno = valor * 0.12\n```\n\nAmanha, o governo muda a aliquota para 15%. Voce so muda a implementacao. Todos que usam `calcular_imposto` continuam usando exatamente igual -- a interface nao mudou.\n\n### O modelo mental do carro\n\nUm motorista tem este modelo mental do carro:\n- Acelerar: pisar no acelerador\n- Frear: pisar no freio\n- Virar: girar o volante\n- Ligar: girar a chave ou apertar o botao\n\nEle **ignora deliberadamente:**\n- Sistema de injecao de combustivel\n- Funcionamento do diferencial\n- Calculo do ABS nas rodas\n- Circuito eletrico do alternador\n\nO modelo mental e um mapa simplificado da realidade. Um bom modelo mental inclui tudo que voce precisa saber para usar algo, e exclui tudo que nao precisa.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo: abstracao em acao\n# Criamos uma "caixa preta" chamada calcular_preco_final\n# O usuario da funcao so precisa saber:\n#   - o que colocar (preco, categoria, quantidade)\n#   - o que vai receber (preco final calculado)\n# Ele NAO precisa saber como a logica funciona internamente\n\ndef calcular_desconto_por_categoria(categoria):\n    # Implementacao interna -- detalhes que o usuario nao precisa ver\n    descontos = {\n        "eletronico": 5,\n        "roupa": 15,\n        "alimento": 0,\n        "livro": 10\n    }\n    # Retorna o desconto da categoria, ou 0 se nao encontrar\n    return descontos.get(categoria, 0)\n\ndef calcular_desconto_por_quantidade(quantidade):\n    # Implementacao interna\n    if quantidade >= 10:\n        return 20   # 20% de desconto para 10+ unidades\n    elif quantidade >= 5:\n        return 10   # 10% de desconto para 5-9 unidades\n    else:\n        return 0    # sem desconto\n\n# INTERFACE PUBLICA: o que o usuario da funcao ve e usa\n# Ele nao precisa conhecer as duas funcoes acima\ndef calcular_preco_final(preco, categoria, quantidade):\n    desc_cat = calcular_desconto_por_categoria(categoria)\n    desc_qtd = calcular_desconto_por_quantidade(quantidade)\n    # O maior desconto prevalece\n    desconto_total = max(desc_cat, desc_qtd)\n    fator = 1 - (desconto_total / 100)\n    return preco * fator * quantidade\n\n# Uso: simples, sem precisar entender a logica interna\ntotal = calcular_preco_final(50.00, "roupa", 3)\nprint("Total a pagar: R$", total)\n\ntotal2 = calcular_preco_final(25.00, "livro", 8)\nprint("Total a pagar: R$", total2)',
        filename: 'abstracao_exemplo.py',
        description:
          'Veja como "calcular_preco_final" esconde toda a logica interna. Quem usa a funcao so precisa fornecer preco, categoria e quantidade. As regras de desconto ficam encapsuladas dentro -- isso e abstracao em acao.',
      },
    },
    {
      type: 'text',
      content:
        '## Criando modelos mentais eficazes\n\nUm modelo mental e uma representacao simplificada de como algo funciona. Quando voce aprende algo novo, voce constroi um modelo mental sobre ele.\n\n**Modelo mental ruim:** tentar memorizar cada detalhe de implementacao\n**Modelo mental bom:** entender o comportamento geral e os casos de uso principais\n\n### Como construir um bom modelo mental:\n\n**1. Comece pela interface:** O que essa coisa recebe? O que ela produz?\n\n**2. Identifique as regras principais:** Quais sao os 3-5 comportamentos essenciais?\n\n**3. Crie uma analogia:** Com o que do mundo real isso se parece?\n\n**4. Teste o modelo:** Consigo prever o comportamento em situacoes novas?\n\n### Exemplo: modelo mental de uma lista em Python\n\n**Interface:** aceita qualquer tipo de dado, pode crescer e diminuir\n\n**Regras principais:**\n- Adicionar no final: `lista.append(item)`\n- Acessar por posicao: `lista[0]` e o primeiro\n- Tamanho: `len(lista)`\n- Percorrer: `for item in lista:`\n\n**Analogia:** Uma pilha de pratos onde voce pode adicionar ou remover qualquer prato pelo indice\n\nCom esse modelo, voce consegue usar listas em 90% dos casos sem precisar consultar documentacao.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Quando voce aprender uma nova funcao, biblioteca ou conceito, treine criar um modelo mental em 3 perguntas: (1) O que isso recebe? (2) O que isso faz/produz? (3) Com o que isso se parece no mundo real? Esse habito acelera muito o aprendizado e a retencao.',
    },
  ],
  challenges: [
    {
      id: 'abstracao-c1',
      title: 'Criando um Modelo Simplificado de Conta Bancaria',
      description:
        'Crie um modelo simplificado de uma conta bancaria usando funcoes. A conta tem saldo inicial. O usuario da conta so precisa saber: depositar(valor), sacar(valor) e ver_saldo(). Os detalhes internos (como validar o saque, como atualizar o saldo) devem ficar dentro das funcoes -- isso e abstracao.',
      language: 'python',
      starterCode:
        '# Modelo simplificado de conta bancaria\n# Interface que o usuario ve: depositar, sacar, ver_saldo\n# Os detalhes ficam escondidos dentro das funcoes\n\n# Saldo da conta (variavel global para este exemplo)\nsaldo = 1000.00\n\ndef ver_saldo():\n    # Exibe o saldo atual formatado\n    pass\n\ndef depositar(valor):\n    # Regras internas (abstrai-las):\n    # - valor deve ser positivo\n    # - adiciona ao saldo\n    # - exibe confirmacao\n    pass\n\ndef sacar(valor):\n    # Regras internas (abstrai-las):\n    # - valor deve ser positivo\n    # - nao pode sacar mais que o saldo\n    # - subtrai do saldo\n    # - exibe confirmacao ou erro\n    pass\n\n# Teste -- o usuario usa apenas estas chamadas simples:\nver_saldo()\ndepositar(500.00)\nsacar(200.00)\nsacar(2000.00)  # deve mostrar mensagem de saldo insuficiente\nver_saldo()\n',
      solution:
        'saldo = 1000.00\n\ndef ver_saldo():\n    global saldo\n    print("Saldo atual: R$", saldo)\n\ndef depositar(valor):\n    global saldo\n    if valor <= 0:\n        print("Erro: o valor do deposito deve ser positivo.")\n        return\n    saldo = saldo + valor\n    print("Deposito de R$", valor, "realizado com sucesso.")\n\ndef sacar(valor):\n    global saldo\n    if valor <= 0:\n        print("Erro: o valor do saque deve ser positivo.")\n        return\n    if valor > saldo:\n        print("Erro: saldo insuficiente. Saldo atual: R$", saldo)\n        return\n    saldo = saldo - valor\n    print("Saque de R$", valor, "realizado com sucesso.")\n\nver_saldo()\ndepositar(500.00)\nsacar(200.00)\nsacar(2000.00)\nver_saldo()',
      hints: [
        'Use "global saldo" no inicio de cada funcao que modifica o saldo para acessar a variavel global.',
        'Em "sacar", primeiro verifique se "valor > saldo" antes de subtrair. Se sim, imprima uma mensagem de erro e use "return" para sair da funcao.',
        'A beleza da abstracao: quem chama "sacar(200)" nao precisa saber como a validacao funciona por dentro.',
      ],
    },
    {
      id: 'abstracao-c2',
      title: 'Identificando o que Ignorar: Modelo de Contato',
      description:
        'Voce precisa criar um sistema simples de agenda de contatos. Uma pessoa real tem dezenas de atributos (altura, cor dos olhos, historico medico, etc.), mas para uma agenda, so importam alguns. Crie uma funcao que cria um contato simplificado e outra que exibe os dados relevantes -- pratique identificar o que manter e o que ignorar.',
      language: 'python',
      starterCode:
        '# Modelo mental de um contato na agenda:\n# Uma pessoa real tem MUITOS atributos.\n# Para uma agenda, escolhemos APENAS os relevantes.\n\n# IDENTIFICAR O QUE MANTER (interface do modelo):\n# - nome (obrigatorio)\n# - telefone (obrigatorio)\n# - email (opcional)\n# - categoria: "trabalho", "familia", "amigo" (opcional, padrao "outro")\n\n# IGNORAR (nao precisamos disso numa agenda simples):\n# - altura, peso, data de nascimento completa, endereco, historico, etc.\n\ndef criar_contato(nome, telefone, email="", categoria="outro"):\n    # Retorna um dicionario com os dados do contato\n    # Dica: dicionario em Python: {"chave": valor, ...}\n    pass\n\ndef exibir_contato(contato):\n    # Exibe os dados do contato de forma organizada\n    # Dica: acesse com contato["nome"], contato["telefone"], etc.\n    pass\n\ndef buscar_por_categoria(contatos, categoria):\n    # Retorna uma lista com todos os contatos da categoria informada\n    pass\n\n# Crie alguns contatos e teste as funcoes:\nc1 = criar_contato("Ana Silva", "11 99999-0001", "ana@email.com", "trabalho")\nc2 = criar_contato("Carlos Souza", "11 98888-0002", categoria="familia")\nc3 = criar_contato("Beatriz Lima", "11 97777-0003", "bea@email.com", "trabalho")\n\nexibir_contato(c1)\nexibir_contato(c2)\n\ntodos = [c1, c2, c3]\ntrabalhadores = buscar_por_categoria(todos, "trabalho")\nprint("Contatos de trabalho:", len(trabalhadores))\n',
      solution:
        'def criar_contato(nome, telefone, email="", categoria="outro"):\n    return {\n        "nome": nome,\n        "telefone": telefone,\n        "email": email,\n        "categoria": categoria\n    }\n\ndef exibir_contato(contato):\n    print("Nome:", contato["nome"])\n    print("Telefone:", contato["telefone"])\n    if contato["email"]:\n        print("Email:", contato["email"])\n    print("Categoria:", contato["categoria"])\n    print("---")\n\ndef buscar_por_categoria(contatos, categoria):\n    resultado = []\n    for contato in contatos:\n        if contato["categoria"] == categoria:\n            resultado.append(contato)\n    return resultado\n\nc1 = criar_contato("Ana Silva", "11 99999-0001", "ana@email.com", "trabalho")\nc2 = criar_contato("Carlos Souza", "11 98888-0002", categoria="familia")\nc3 = criar_contato("Beatriz Lima", "11 97777-0003", "bea@email.com", "trabalho")\n\nexibir_contato(c1)\nexibir_contato(c2)\n\ntodos = [c1, c2, c3]\ntrabalhadores = buscar_por_categoria(todos, "trabalho")\nprint("Contatos de trabalho:", len(trabalhadores))',
      hints: [
        'Em "criar_contato", retorne um dicionario: return {"nome": nome, "telefone": telefone, "email": email, "categoria": categoria}.',
        'Em "exibir_contato", acesse os valores com contato["nome"], contato["telefone"] etc. Use um if para mostrar email apenas se ele nao for vazio.',
        'Em "buscar_por_categoria", crie uma lista vazia, percorra os contatos com for e adicione ao resultado os que tem a categoria correta com resultado.append(contato).',
      ],
    },
  ],
};
