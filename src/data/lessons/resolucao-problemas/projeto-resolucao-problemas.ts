import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'projeto-resolucao-problemas',
  moduleId: 'resolucao-problemas',
  title: 'Projeto: Resolvendo um Problema Real Passo a Passo',
  description:
    'Aplique toda a metodologia de resolucao de problemas aprendida no modulo para construir, do zero, um sistema completo de calculo de notas com estatisticas -- seguindo cada etapa: entender, decompor, resolver, depurar e otimizar.',
  order: 5,
  type: 'lesson',
  estimatedMinutes: 40,
  sections: [
    {
      type: 'text',
      content:
        '## O projeto final: metodologia em acao\n\nNeste projeto voce vai construir um **calculador de notas com estatisticas** -- um programa real que um professor poderia usar para analisar o desempenho de uma turma.\n\nMas o mais importante nao e o programa em si. E o **processo**. Vamos aplicar rigorosamente cada etapa da metodologia que estudamos:\n\n1. **Entender o problema** antes de escrever uma linha de codigo\n2. **Decompor** em subproblemas independentes\n3. **Resolver** cada parte usando padroes conhecidos\n4. **Depurar** sistematicamente com prints estrategicos\n5. **Otimizar** apenas onde faz sentido, sem sacrificar legibilidade\n\nEste e o workflow que programadores profissionais usam em todo projeto. Quando voce interiorizar essa sequencia, vai resolver qualquer problema de forma sistematica -- mesmo os que nunca viu antes.',
    },
    {
      type: 'text',
      content:
        '## Etapa 1: Entendendo o problema\n\nAntes de abrir o editor, vamos responder as tres perguntas fundamentais:\n\n**Quais sao as entradas?**\n- Uma lista de nomes de alunos\n- Uma lista de notas correspondentes (floats de 0.0 a 10.0)\n- O criterio de aprovacao (nota minima para passar)\n\n**Qual e a saida esperada?**\n- Para cada aluno: nome, nota e status (Aprovado/Reprovado)\n- Estatisticas da turma: media, maior nota, menor nota\n- Quantidade de aprovados e reprovados\n- Porcentagem de aprovacao\n\n**Quais sao as restricoes?**\n- A turma tem pelo menos 1 aluno\n- Notas estao entre 0.0 e 10.0\n- O criterio padrao de aprovacao e nota >= 6.0 (mas pode mudar)\n\n**Reescrevendo o problema com nossas proprias palavras:**\n> "Dado um conjunto de alunos com suas notas, exiba o status de cada um e um resumo estatistico da turma, incluindo media, extremos e taxa de aprovacao."\n\nProblema entendido. Agora decompomos.\n\n## Etapa 2: Decompondo em subproblemas\n\nO problema maior pode ser dividido em funcoes independentes:\n- `calcular_media(notas)` → retorna a media\n- `encontrar_maior(notas)` → retorna a maior nota\n- `encontrar_menor(notas)` → retorna a menor nota\n- `classificar_aluno(nota, minimo)` → retorna "Aprovado" ou "Reprovado"\n- `gerar_relatorio(nomes, notas, minimo)` → usa todas as anteriores e exibe tudo\n\nCada funcao resolve um subproblema simples e pode ser testada individualmente.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Etapa 3: Resolvendo cada subproblema com padroes conhecidos\n\n# Subproblema 1: media (padrao de acumulacao)\ndef calcular_media(notas):\n    """Retorna a media das notas. Assume lista nao-vazia.\"\"\"\n    soma = 0\n    for nota in notas:\n        soma += nota\n    return soma / len(notas)\n\n# Subproblema 2: maior nota (padrao de busca de maximo)\ndef encontrar_maior(notas):\n    """Retorna o maior valor da lista de notas.\"\"\"\n    maior = notas[0]\n    for nota in notas:\n        if nota > maior:\n            maior = nota\n    return maior\n\n# Subproblema 3: menor nota (padrao de busca de minimo)\ndef encontrar_menor(notas):\n    """Retorna o menor valor da lista de notas.\"\"\"\n    menor = notas[0]\n    for nota in notas:\n        if nota < menor:\n            menor = nota\n    return menor\n\n# Subproblema 4: classificar um aluno\ndef classificar_aluno(nota, minimo=6.0):\n    """Retorna o status do aluno com base na nota minima.\"\"\"\n    if nota >= minimo:\n        return "Aprovado"\n    return "Reprovado"\n\n# Subproblema 5: contar aprovados (padrao de contagem condicional)\ndef contar_aprovados(notas, minimo=6.0):\n    """Conta quantos alunos foram aprovados.\"\"\"\n    contador = 0\n    for nota in notas:\n        if nota >= minimo:\n            contador += 1\n    return contador\n\n# Subproblema 6: gerar relatorio completo (combina todos os anteriores)\ndef gerar_relatorio(nomes, notas, minimo=6.0):\n    """Gera o relatorio completo da turma.\"\"\"\n    print("=" * 45)\n    print("       RELATORIO DE DESEMPENHO DA TURMA")\n    print("=" * 45)\n\n    # Status individual de cada aluno\n    print("\\nDesempenho individual:")\n    print("-" * 45)\n    for nome, nota in zip(nomes, notas):  # zip junta as duas listas\n        status = classificar_aluno(nota, minimo)\n        simbolo = "✓" if status == "Aprovado" else "✗"\n        print(f"  {simbolo} {nome:<15} {nota:.1f}  {status}")\n\n    # Estatisticas da turma\n    print("\\nEstatisticas da turma:")\n    print("-" * 45)\n    media = calcular_media(notas)\n    maior = encontrar_maior(notas)\n    menor = encontrar_menor(notas)\n    aprovados = contar_aprovados(notas, minimo)\n    reprovados = len(notas) - aprovados\n    taxa = (aprovados / len(notas)) * 100\n\n    print(f"  Media da turma:    {media:.2f}")\n    print(f"  Maior nota:        {maior:.1f}")\n    print(f"  Menor nota:        {menor:.1f}")\n    print(f"  Aprovados:         {aprovados} ({taxa:.1f}%)")\n    print(f"  Reprovados:        {reprovados}")\n    print(f"  Criterio:          nota >= {minimo:.1f}")\n    print("=" * 45)\n\n\n# Dados de exemplo\nnomes = ["Ana Silva", "Bruno Costa", "Carla Lima",\n         "Diego Neto", "Elena Souza", "Fabio Dias"]\nnotas = [8.5, 5.0, 7.0, 9.5, 4.5, 6.0]\n\ngerar_relatorio(nomes, notas)',
        filename: 'calculadora_notas.py',
        description:
          'O sistema completo construido passo a passo. Cada funcao resolve um subproblema isolado usando os padroes que estudamos (acumulacao, busca de maximo, contagem). A funcao principal gerar_relatorio() combina tudo. Repare como o codigo e facil de ler porque cada funcao tem nome descritivo e faz apenas uma coisa.',
      },
    },
    {
      type: 'text',
      content:
        '## Etapa 4: Depuracao e Etapa 5: Otimizacao\n\n### Como depurar o sistema\n\nCom o codigo dividido em funcoes, depurar fica simples: teste cada funcao isoladamente antes de integrar.\n\n```python\n# Testes unitarios manuais -- teste cada peca antes de montar\nprint(calcular_media([8.0, 6.0, 4.0]))  # Esperado: 6.0\nprint(encontrar_maior([3, 7, 1, 9, 4])) # Esperado: 9\nprint(encontrar_menor([3, 7, 1, 9, 4])) # Esperado: 1\nprint(classificar_aluno(5.9))            # Esperado: Reprovado\nprint(classificar_aluno(6.0))            # Esperado: Aprovado\nprint(contar_aprovados([5, 6, 7, 4, 8])) # Esperado: 3\n```\n\nSe algum teste falhar, voce sabe exatamente qual funcao tem o problema -- sem precisar examinar 100 linhas de codigo.\n\n### Otimizacoes que fazem sentido aqui\n\nPara uma turma de 30 alunos, o codigo ja e rapido o suficiente. Mas ha otimizacoes de **legibilidade** que valem a pena:\n\n- Python tem funcoes built-in `sum()`, `max()`, `min()` -- usar elas torna o codigo mais pythonico e reduz chance de bugs\n- A funcao `zip()` junta duas listas elegantemente\n- f-strings com formatacao (`:15`, `:.2f`) alinham a saida automaticamente\n\nOtimizacoes de **performance** so seriam necessarias se a turma tivesse milhoes de alunos -- o que e improvavel. Aqui a legibilidade ganha da performance.',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'O maior aprendizado deste modulo: resolver problemas e um processo, nao um talento. Voce nao precisa "ser inteligente" para programar bem. Voce precisa seguir o processo: entender o problema completamente, dividir em partes, resolver cada parte com padroes conhecidos, testar cada parte, e otimizar onde necessario. Todo programador experiente usa exatamente essa sequencia -- ela funciona para problemas de qualquer tamanho e complexidade.',
    },
  ],
  challenges: [
    {
      id: 'proj-c1',
      title: 'Construindo o calculador de notas completo',
      description:
        'Implemente o sistema de calculo de notas seguindo a metodologia completa. Voce deve criar todas as funcoes necessarias e gerar um relatorio com: (1) status individual de cada aluno, (2) media da turma, (3) maior e menor nota, (4) quantidade de aprovados e taxa de aprovacao. Use os dados fornecidos no codigo inicial.',
      language: 'python',
      starterCode:
        '# Projeto: Calculador de Notas com Estatisticas\n# Siga a metodologia: Entender -> Decompor -> Resolver -> Testar\n\n# DADOS DA TURMA\nnomes = [\n    "Alice Ferreira", "Bruno Oliveira", "Carla Mendes",\n    "Daniel Rocha", "Elena Santos", "Fabio Torres",\n    "Gabriela Lima", "Henrique Dias"\n]\nnotas = [9.0, 5.5, 7.5, 8.0, 4.0, 6.5, 7.0, 5.0]\nCRITERIO_APROVACAO = 6.0\n\n# 1. Implemente: calcular_media(notas)\n# Retorna a media aritmetica da lista de notas\n\n# 2. Implemente: encontrar_maior(notas) e encontrar_menor(notas)\n# Retornam o maior e o menor valor da lista\n\n# 3. Implemente: classificar_aluno(nota, minimo)\n# Retorna "Aprovado" se nota >= minimo, senao "Reprovado"\n\n# 4. Implemente: contar_aprovados(notas, minimo)\n# Retorna quantos alunos foram aprovados\n\n# 5. Implemente: gerar_relatorio(nomes, notas, minimo)\n# Exibe o status de cada aluno e as estatisticas da turma\n\n# 6. Chame gerar_relatorio com os dados acima\n',
      solution:
        'nomes = [\n    "Alice Ferreira", "Bruno Oliveira", "Carla Mendes",\n    "Daniel Rocha", "Elena Santos", "Fabio Torres",\n    "Gabriela Lima", "Henrique Dias"\n]\nnotas = [9.0, 5.5, 7.5, 8.0, 4.0, 6.5, 7.0, 5.0]\nCRITERIO_APROVACAO = 6.0\n\n\ndef calcular_media(notas):\n    soma = 0\n    for nota in notas:\n        soma += nota\n    return soma / len(notas)\n\n\ndef encontrar_maior(notas):\n    maior = notas[0]\n    for nota in notas:\n        if nota > maior:\n            maior = nota\n    return maior\n\n\ndef encontrar_menor(notas):\n    menor = notas[0]\n    for nota in notas:\n        if nota < menor:\n            menor = nota\n    return menor\n\n\ndef classificar_aluno(nota, minimo=6.0):\n    if nota >= minimo:\n        return "Aprovado"\n    return "Reprovado"\n\n\ndef contar_aprovados(notas, minimo=6.0):\n    contador = 0\n    for nota in notas:\n        if nota >= minimo:\n            contador += 1\n    return contador\n\n\ndef gerar_relatorio(nomes, notas, minimo=6.0):\n    print("=" * 45)\n    print("   RELATORIO DE DESEMPENHO DA TURMA")\n    print("=" * 45)\n    print("\\nDesempenho individual:")\n    for nome, nota in zip(nomes, notas):\n        status = classificar_aluno(nota, minimo)\n        print(f"  {nome:<18} {nota:.1f}  {status}")\n    media = calcular_media(notas)\n    maior = encontrar_maior(notas)\n    menor = encontrar_menor(notas)\n    aprovados = contar_aprovados(notas, minimo)\n    reprovados = len(notas) - aprovados\n    taxa = (aprovados / len(notas)) * 100\n    print("\\nEstatisticas:")\n    print(f"  Media da turma:  {media:.2f}")\n    print(f"  Maior nota:      {maior:.1f}")\n    print(f"  Menor nota:      {menor:.1f}")\n    print(f"  Aprovados:       {aprovados} ({taxa:.1f}%)")\n    print(f"  Reprovados:      {reprovados}")\n    print("=" * 45)\n\n\ngerar_relatorio(nomes, notas, CRITERIO_APROVACAO)',
      hints: [
        'Comece pelas funcoes mais simples: calcular_media usa o padrao de acumulacao (soma = 0, for nota in notas, soma += nota, return soma / len(notas)).',
        'Para encontrar_maior e encontrar_menor: comece com maior = notas[0], percorra a lista com for, use if para atualizar quando encontrar algo maior/menor.',
        'Para gerar_relatorio: use zip(nomes, notas) para percorrer as duas listas juntas. Chame as outras funcoes para calcular as estatisticas e use print() para formatar a saida.',
      ],
    },
    {
      id: 'proj-c2',
      title: 'Adicionando histograma de distribuicao',
      description:
        'Expanda o calculador de notas adicionando uma funcao gerar_histograma(notas) que exibe a distribuicao das notas em faixas: [0-2), [2-4), [4-6), [6-8), [8-10]. Para cada faixa, exiba quantos alunos estao nela e uma barra visual feita de asteriscos (* repetido pelo numero de alunos). Use as notas fornecidas.',
      language: 'python',
      starterCode:
        '# Expansao do calculador: histograma de distribuicao\n# As faixas sao: 0-1.9, 2-3.9, 4-5.9, 6-7.9, 8-10\n\nnotas = [9.0, 5.5, 7.5, 8.0, 4.0, 6.5, 7.0, 5.0, 3.5, 8.5, 6.0, 9.5]\n\ndef gerar_histograma(notas):\n    """Exibe a distribuicao das notas em faixas com barra visual.\n    \n    Faixas:\n    0.0 - 1.9  |***  (numero de alunos nessa faixa)\n    2.0 - 3.9  |*\n    4.0 - 5.9  |****\n    6.0 - 7.9  |***\n    8.0 - 10.0 |***\n    \"\"\"\n    # Defina as faixas como uma lista de tuplas: (nome_faixa, minimo, maximo)\n    faixas = [\n        ("0.0 - 1.9", 0.0, 2.0),\n        ("2.0 - 3.9", 2.0, 4.0),\n        ("4.0 - 5.9", 4.0, 6.0),\n        ("6.0 - 7.9", 6.0, 8.0),\n        ("8.0 - 10.0", 8.0, 10.1),  # 10.1 para incluir nota 10\n    ]\n\n    print("\\nHistograma de distribuicao:")\n    print("-" * 35)\n\n    # Para cada faixa:\n    # 1. Conte quantas notas estao nela (padrao de contagem condicional)\n    # 2. Exiba o nome da faixa, a contagem e uma barra de asteriscos\n    # Formato: "0.0 - 1.9  | ** (2 alunos)"\n    pass\n\n\ngerar_histograma(notas)\n',
      solution:
        'notas = [9.0, 5.5, 7.5, 8.0, 4.0, 6.5, 7.0, 5.0, 3.5, 8.5, 6.0, 9.5]\n\ndef gerar_histograma(notas):\n    faixas = [\n        ("0.0 - 1.9", 0.0, 2.0),\n        ("2.0 - 3.9", 2.0, 4.0),\n        ("4.0 - 5.9", 4.0, 6.0),\n        ("6.0 - 7.9", 6.0, 8.0),\n        ("8.0 - 10.0", 8.0, 10.1),\n    ]\n\n    print("\\nHistograma de distribuicao:")\n    print("-" * 35)\n\n    for nome_faixa, minimo, maximo in faixas:\n        # Padrao de contagem condicional\n        quantidade = 0\n        for nota in notas:\n            if nota >= minimo and nota < maximo:\n                quantidade += 1\n\n        # Barra visual com asteriscos\n        barra = "*" * quantidade\n        plural = "aluno" if quantidade == 1 else "alunos"\n        print(f"  {nome_faixa}  | {barra:<10} ({quantidade} {plural})")\n\n    print("-" * 35)\n\n\ngerar_histograma(notas)',
      hints: [
        'Para cada faixa, use o padrao de contagem condicional: contador = 0, for nota in notas, if nota >= minimo and nota < maximo: contador += 1.',
        'Para a barra visual: use multiplicacao de string. "*" * 3 produz "***". Entao barra = "*" * quantidade gera a barra automaticamente.',
        'Para percorrer as faixas, use: for nome_faixa, minimo, maximo in faixas: -- isso desempacota cada tupla da lista diretamente em tres variaveis.',
      ],
    },
  ],
};
