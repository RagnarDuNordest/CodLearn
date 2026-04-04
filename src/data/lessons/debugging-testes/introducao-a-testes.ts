import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'introducao-a-testes',
  moduleId: 'debugging-testes',
  title: 'Introducao a Testes',
  description: 'Entenda por que escrever testes e um investimento, nao um custo, e como testes automatizados aumentam sua confianca no codigo',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## Por Que Escrever Testes?\n\nTodo desenvolvedor testa o codigo — a questao e se voce faz isso manualmente toda vez ou automatiza uma vez e roda infinitamente.\n\nSem testes automatizados, cada mudanca no codigo exige que voce revalide tudo manualmente. Com testes, voce executa um comando e sabe em segundos se quebrou algo.\n\n### O que e um teste automatizado?\n\nUm teste e um trecho de codigo que:\n1. Chama uma funcao com entradas conhecidas\n2. Verifica se a saida e a esperada\n3. Reporta sucesso ou falha automaticamente\n\n```python\n# Codigo que queremos testar\ndef calcular_media(notas):\n    return sum(notas) / len(notas)\n\n# Teste manual (o que voce provavelmente faz hoje)\nresultado = calcular_media([8, 6, 10])\nprint(resultado)  # Voce olha e decide se esta certo\n\n# Teste automatizado\ndef test_calcular_media():\n    assert calcular_media([8, 6, 10]) == 8.0\n    assert calcular_media([10, 10]) == 10.0\n    assert calcular_media([0, 0, 0]) == 0.0\n    # Se algum assert falhar, o teste falha com mensagem clara\n```\n\n### Os tres tipos principais de testes\n\n**Testes unitarios** — testam uma funcao ou classe isoladamente. Sao rapidos, especificos e faceis de escrever. A maioria dos testes devem ser unitarios.\n\n**Testes de integracao** — testam como multiplos modulos funcionam juntos (ex: funcao + banco de dados). Sao mais lentos mas verificam a colaboracao entre partes.\n\n**Testes end-to-end (E2E)** — simulam o usuario completo (ex: abrir browser, clicar em botao, verificar resultado). Sao os mais lentos mas mais proximos da realidade.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Piramide de testes: muitos testes unitarios (base), alguns de integracao (meio), poucos E2E (topo). Testes unitarios sao baratos de escrever e rapidos de executar — invista principalmente neles.',
    },
    {
      type: 'text',
      content:
        '## O Que Testar?\n\nNao precisa testar tudo — mas ha casos que sempre merecem um teste:\n\n**1. O caminho feliz (happy path)**\nO caso normal onde tudo funciona como esperado.\n\n**2. Casos extremos (edge cases)**\n- Lista vazia, string vazia, zero\n- Valor maximo e minimo\n- Entradas com caracteres especiais\n\n**3. Casos de erro**\n- Entrada invalida deve gerar a excecao correta\n- Funcao deve tratar casos inesperados graciosamente\n\n**4. Regressoes**\nSempre que voce corrigir um bug, escreva um teste que teria detectado aquele bug. Isso previne que o bug volte no futuro.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo completo: funcao com testes para varios cenarios\n\ndef calcular_imc(peso_kg, altura_m):\n    """Calcula o Indice de Massa Corporal.\n    \n    Args:\n        peso_kg: peso em quilogramas (deve ser positivo)\n        altura_m: altura em metros (deve ser positivo)\n    \n    Returns:\n        float: valor do IMC\n    \n    Raises:\n        ValueError: se peso ou altura forem invalidos\n    """\n    if peso_kg <= 0:\n        raise ValueError(f"Peso deve ser positivo, recebeu: {peso_kg}")\n    if altura_m <= 0:\n        raise ValueError(f"Altura deve ser positiva, recebeu: {altura_m}")\n    return peso_kg / (altura_m ** 2)\n\n\n# Testes para a funcao acima (usando apenas assert, sem framework)\ndef testar_calcular_imc():\n    # 1. Caminho feliz — valores normais\n    resultado = calcular_imc(70, 1.75)\n    assert abs(resultado - 22.86) < 0.01, f"Esperado ~22.86, obteve {resultado}"\n\n    # 2. Valores extremos\n    resultado_baixo = calcular_imc(40, 1.50)\n    assert resultado_baixo > 0\n\n    # 3. Casos de erro\n    try:\n        calcular_imc(-10, 1.75)\n        assert False, "Deveria ter lancado ValueError"\n    except ValueError as e:\n        assert "positivo" in str(e)\n\n    try:\n        calcular_imc(70, 0)\n        assert False, "Deveria ter lancado ValueError"\n    except ValueError:\n        pass  # Esperado\n\n    print("Todos os testes passaram!")\n\ntestar_calcular_imc()',
        filename: 'testes_manuais.py',
        description:
          'Testes com assert simples sem framework. Cada teste verifica um cenario diferente: caminho feliz, casos extremos e tratamento de erros. Mesmo sem pytest, esse padrao ja e muito melhor que nenhum teste.',
      },
    },
    {
      type: 'callout',
      calloutType: 'info',
      content:
        'TDD (Test Driven Development): alguns desenvolvedores escrevem o teste ANTES do codigo. O ciclo e: escrever teste que falha -> escrever codigo minimo para passar -> refatorar. Isso garante que voce sempre tem um teste e que o codigo foi realmente testado desde o inicio.',
    },
  ],
  challenges: [
    {
      id: 'testes-c1',
      title: 'Escreva os Testes',
      description:
        'A funcao abaixo ja esta implementada e funcionando. Sua tarefa e escrever testes para ela, cobrindo: o caminho feliz, pelo menos dois casos extremos e o caso de erro (entrada invalida).',
      language: 'python',
      starterCode:
        '# Funcao implementada — escreva testes para ela\ndef calcular_desconto(preco, percentual):\n    """Calcula o preco apos aplicar um desconto.\n    \n    Args:\n        preco: preco original (deve ser positivo)\n        percentual: percentual de desconto de 0 a 100\n    \n    Returns:\n        float: preco com desconto aplicado\n    \n    Raises:\n        ValueError: se preco for negativo ou percentual fora de 0-100\n    """\n    if preco < 0:\n        raise ValueError("Preco nao pode ser negativo")\n    if not (0 <= percentual <= 100):\n        raise ValueError("Percentual deve estar entre 0 e 100")\n    return preco * (1 - percentual / 100)\n\n# Escreva pelo menos 5 testes usando assert:\n# 1. Caminho feliz (ex: preco=100, desconto=10% -> 90.0)\n# 2. Sem desconto (percentual=0)\n# 3. Desconto total (percentual=100)\n# 4. Erro: preco negativo deve levantar ValueError\n# 5. Erro: percentual invalido (ex: 150) deve levantar ValueError\n\ndef testar_calcular_desconto():\n    # Seu codigo aqui\n    pass\n\ntestar_calcular_desconto()\nprint("Testes concluidos")\n',
      solution:
        'def calcular_desconto(preco, percentual):\n    if preco < 0:\n        raise ValueError("Preco nao pode ser negativo")\n    if not (0 <= percentual <= 100):\n        raise ValueError("Percentual deve estar entre 0 e 100")\n    return preco * (1 - percentual / 100)\n\ndef testar_calcular_desconto():\n    # 1. Caminho feliz\n    assert calcular_desconto(100, 10) == 90.0, "10% de desconto em 100 deve ser 90"\n    assert calcular_desconto(200, 25) == 150.0, "25% de desconto em 200 deve ser 150"\n    \n    # 2. Sem desconto\n    assert calcular_desconto(100, 0) == 100.0, "0% de desconto nao deve mudar o preco"\n    \n    # 3. Desconto total\n    assert calcular_desconto(100, 100) == 0.0, "100% de desconto deve resultar em 0"\n    \n    # 4. Preco negativo deve gerar erro\n    try:\n        calcular_desconto(-50, 10)\n        assert False, "Deveria ter lancado ValueError para preco negativo"\n    except ValueError as e:\n        assert "negativo" in str(e).lower()\n    \n    # 5. Percentual invalido deve gerar erro\n    try:\n        calcular_desconto(100, 150)\n        assert False, "Deveria ter lancado ValueError para percentual > 100"\n    except ValueError as e:\n        assert "percentual" in str(e).lower() or "0" in str(e)\n    \n    # 6. Caso extremo: percentual negativo\n    try:\n        calcular_desconto(100, -10)\n        assert False, "Deveria ter lancado ValueError para percentual negativo"\n    except ValueError:\n        pass\n    \n    print("Todos os testes passaram!")\n\ntestar_calcular_desconto()\nprint("Testes concluidos")\n',
      hints: [
        'Comece com o caso mais simples: assert calcular_desconto(100, 10) == 90.0',
        'Para testar que um erro e lancado, use try/except: try: calcular_desconto(-1, 10) / assert False, "devia erro" / except ValueError: pass',
        'Casos extremos importantes: 0% (sem desconto) e 100% (desconto total)',
      ],
    },
  ],
};
