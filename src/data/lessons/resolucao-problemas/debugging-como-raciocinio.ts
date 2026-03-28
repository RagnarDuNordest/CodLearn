import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'debugging-como-raciocinio',
  moduleId: 'resolucao-problemas',
  title: 'Debugging como Forma de Raciocinio',
  description:
    'Debugging nao e so corrigir erros -- e uma habilidade de investigacao e raciocinio. Aprenda a ler mensagens de erro, rastrear bugs com prints, usar o metodo da biseccao e pensar como um detetive ao depurar codigo.',
  order: 3,
  estimatedMinutes: 25,
  sections: [
    {
      type: 'text',
      content:
        '## O detetive e os pistas\n\nImagine Sherlock Holmes chegando a uma cena do crime. Ele nao chuta quem e o culpado. Ele observa sistematicamente cada detalhe: o pe de uma mesa arranhado, a posicao de um copo, a hora em que uma luz foi apagada. Ele forma hipoteses, testa cada uma, elimina as que nao batem com a evidencia, e afunila ate chegar a unica explicacao possivel.\n\nUm programador depurando codigo e exatamente isso: um detetive.\n\nO **bug** e o crime. A **mensagem de erro** e a primeira pista. O **comportamento inesperado** do programa sao as evidencias. E voce precisa rastrear a causa raiz -- nao apenas o sintoma.\n\nA maioria dos iniciantes ve uma mensagem de erro e entra em panico ou desiste. Mas a mensagem de erro e sua melhor amiga. Ela esta te dizendo exatamente onde olhar. Aprender a ler mensagens de erro e uma das habilidades mais valiosas que um programador pode ter.\n\n### Debugging nao e sinal de fracasso\n\nAte os programadores mais experientes do mundo escrevem codigo com bugs. A diferenca entre um iniciante e um profissional nao e "quem escreve codigo sem bugs" -- e **quem encontra e corrige bugs mais rapido**. Debugging e uma habilidade que se treina.',
    },
    {
      type: 'text',
      content:
        '## Lendo mensagens de erro em Python\n\nO Python e um dos interpretadores mais amigaveis quando se trata de erros. Ele te da um **traceback** -- uma trilha de migalhas de pao que mostra exatamente onde o programa quebrou e por que.\n\nVeja a anatomia de um traceback:\n\n```\nTraceback (most recent call last):\n  File "programa.py", line 8, in <module>\n    resultado = calcular(notas)\n  File "programa.py", line 3, in calcular\n    media = soma / total\nZeroDivisionError: division by zero\n```\n\nComo ler isso:\n- **Ultima linha:** o TIPO do erro e a MENSAGEM. Sempre leia de baixo para cima.\n- **"line 3, in calcular":** o erro aconteceu na linha 3, dentro da funcao `calcular`\n- **"line 8, in module":** a funcao foi chamada a partir da linha 8\n- **ZeroDivisionError:** voce tentou dividir por zero\n\n**Os erros mais comuns em Python:**\n\n- `SyntaxError`: voce escreveu a sintaxe errada (esqueceu `:`, fechou parentese errado, etc)\n- `NameError`: voce usou uma variavel que nao foi definida ainda\n- `TypeError`: voce usou um tipo errado (tentar somar string com numero, por exemplo)\n- `IndexError`: voce tentou acessar um indice que nao existe na lista\n- `ZeroDivisionError`: divisao por zero\n- `IndentationError`: indentacao incorreta (blocos mal alinhados)\n\nCada mensagem de erro e uma **pista especifica**. Nao ignore-as -- decore seus nomes.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplos dos erros mais comuns e como identifica-los\n\n# ERRO 1: NameError -- variavel nao definida\n# O Python nao sabe o que e "total_vendas" porque nunca foi criada\n# total = total_vendas / 5  # NameError: name \'total_vendas\' is not defined\n\n# CORRECAO: defina a variavel antes de usar\ntotal_vendas = 500.0\ntotal = total_vendas / 5\nprint(f"Sem NameError: {total}")\n\n# ERRO 2: TypeError -- operacao com tipos incompativeis\n# idade = "25"\n# proxima = idade + 1   # TypeError: can only concatenate str to str, not int\n\n# CORRECAO: converta o tipo com int() ou str()\nidade = "25"\nproxima = int(idade) + 1  # int() converte string para inteiro\nprint(f"Sem TypeError: {proxima}")\n\n# ERRO 3: IndexError -- indice fora dos limites\nnota = [7.5, 8.0, 6.5]\n# print(nota[3])  # IndexError: list index out of range\n# (a lista tem indices 0, 1, 2 -- o indice 3 nao existe)\n\n# CORRECAO: verifique o tamanho antes ou use o indice correto\nprint(f"Ultimo elemento: {nota[len(nota) - 1]}")  # ou nota[-1]\n\n# ERRO 4: ZeroDivisionError -- divisao por zero\nnumeros = []\n# media = sum(numeros) / len(numeros)  # ZeroDivisionError se lista vazia\n\n# CORRECAO: verifique antes de dividir\nif len(numeros) > 0:\n    media = sum(numeros) / len(numeros)\nelse:\n    media = 0\nprint(f"Sem ZeroDivisionError: media = {media}")',
        filename: 'erros_comuns.py',
        description:
          'Os 4 erros mais comuns em Python com exemplos comentados de como cada um acontece e como corrigi-lo. Descomente as linhas de erro para ver as mensagens do Python e pratique lendo cada uma.',
      },
    },
    {
      type: 'text',
      content:
        '## Tecnicas de debugging: do basico ao avancado\n\n### Tecnica 1: Print debugging\n\nA tecnica mais simples e mais usada: adicionar `print()` em pontos estrategicos do codigo para ver o que esta acontecendo em cada etapa.\n\nPense como um medico monitorando um paciente: voce mede a temperatura em varios momentos do dia para ver quando ela muda. No codigo, voce printa o valor das variaveis em varios pontos para ver onde o valor inesperado aparece.\n\n```python\ndef calcular(lista):\n    print(f"[DEBUG] Entrei com lista: {lista}")  # pista 1\n    soma = 0\n    for item in lista:\n        soma += item\n        print(f"[DEBUG] Depois de {item}, soma = {soma}")  # pista 2\n    resultado = soma / len(lista)\n    print(f"[DEBUG] Resultado final: {resultado}")  # pista 3\n    return resultado\n```\n\n### Tecnica 2: Rubber duck debugging (pato de borracha)\n\nExplique o seu codigo, linha por linha, para um objeto inanimado -- um pato de borracha, uma caneca, o que tiver na mesa. O ato de verbalizar o raciocinio forca seu cerebro a processar a logica de um angulo diferente. Voce vai encontrar o bug no meio da explicacao.\n\nIsso funciona porque quando programamos, nossa mente "preenche lacunas" e ve o que acha que escreveu, nao o que realmente escreveu. Falar em voz alta quebra esse automatismo.\n\n### Tecnica 3: Metodo da biseccao\n\nQuando o bug esta em algum lugar de um codigo longo e voce nao sabe onde, use a biseccao (igual a busca binaria!):\n\n1. Ponha um print no MEIO do codigo\n2. Se o valor la ja esta errado: o bug esta na PRIMEIRA metade\n3. Se o valor la ainda esta certo: o bug esta na SEGUNDA metade\n4. Repita dividindo ao meio ate isolar a linha exata\n\nEssa tecnica garante que voce encontra o bug em no maximo log2(N) passos, onde N e o numero de linhas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Demonstracao de debugging sistematico com print\n# Vamos simular um programa com bug e encontra-lo passo a passo\n\ndef calcular_desconto(preco, percentual):\n    """Calcula o preco final apos desconto.\"\"\"\n    print(f"  [DEBUG] preco={preco}, percentual={percentual}")  # pista 1\n\n    desconto = preco * percentual  # BUG AQUI: faltou dividir por 100!\n    print(f"  [DEBUG] desconto calculado={desconto}")  # pista 2 -- vai revelar o bug\n\n    preco_final = preco - desconto\n    print(f"  [DEBUG] preco_final={preco_final}")  # pista 3\n\n    return preco_final\n\n\nprint("=== Testando com preco=100 e desconto de 10% ===")\nresultado = calcular_desconto(100, 10)\nprint(f"Resultado: R${resultado}")\nprint("Esperado: R$90.00 (10% de 100 = 10, 100 - 10 = 90)")\nprint()\n\n# Os prints revelam o problema:\n# desconto calculado=1000 <- MUITO alto! 100 * 10 sem dividir por 100\n# Corrija a linha: desconto = preco * percentual / 100\n\nprint("=== Versao corrigida ===")\ndef calcular_desconto_correto(preco, percentual):\n    desconto = preco * percentual / 100  # CORRECAO: dividir por 100\n    preco_final = preco - desconto\n    return preco_final\n\nprint(f"Resultado corrigido: R${calcular_desconto_correto(100, 10):.2f}")\nprint(f"Outro teste: R$200 com 15% = R${calcular_desconto_correto(200, 15):.2f}")',
        filename: 'debugging_sistematico.py',
        description:
          'Demonstracao do print debugging em acao. Os prints revelam exatamente onde o valor comeca a sair errado. Rode o codigo e observe a saida: o valor "desconto calculado=1000" e a pista que denuncia o bug -- faltou dividir por 100.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'Ao adicionar prints de debug, use um prefixo padrao como [DEBUG] ou >>> para facilitar a limpeza depois. Assim voce encontra e remove todos os prints de debug antes de entregar o codigo. Outra boa pratica: escreva um teste simples antes de comecar a debugar -- um caso onde voce sabe qual deve ser a saida. Assim voce tem um "paciente de controle" para comparar.',
    },
  ],
  challenges: [
    {
      id: 'dbg-c1',
      title: 'Encontre e corrija o bug',
      description:
        'O codigo abaixo deveria calcular a media das notas de uma turma e mostrar quantos alunos foram aprovados (nota >= 6.0). Mas ele tem tres bugs. Use o que voce aprendeu (leia a mensagem de erro, adicione prints de debug, aplique o metodo da biseccao) para encontrar e corrigir todos os tres.',
      language: 'python',
      starterCode:
        '# Este codigo tem 3 bugs. Encontre-os e corrija!\n# Dica: rode o codigo, leia a mensagem de erro, adicione prints\n\ndef analisar_turma(notas):\n    soma = 0\n    aprovados = 0\n\n    for nota in notas:\n        soma = soma + nota\n        if nota >= 6.0:\n            aprovados = aprovados + 1\n\n    media = soma / len(notas)\n    return media, aprovados\n\n\n# Bug 1: esta lista tem um erro de tipo\nnotas_turma = [7.5, 8.0, "6.5", 9.0, 5.5, 4.0, 7.0]\n\n# Bug 2: chamada incorreta da funcao\nmedia, aprovados = analisar_turma(notas_turma)\n\n# Bug 3: a mensagem de porcentagem esta errada\ntotal = len(notas_turma)\nporcentagem = aprovados * total / 100  # Bug aqui!\n\nprint(f"Media da turma: {media:.2f}")\nprint(f"Aprovados: {aprovados} de {total}")\nprint(f"Taxa de aprovacao: {porcentagem:.1f}%")\n',
      solution:
        '# Bug 1 corrigido: "6.5" virou 6.5 (float, nao string)\n# Bug 2: a chamada ja estava certa -- o problema era o Bug 1\n# Bug 3 corrigido: porcentagem = aprovados / total * 100\n\ndef analisar_turma(notas):\n    soma = 0\n    aprovados = 0\n\n    for nota in notas:\n        soma = soma + nota\n        if nota >= 6.0:\n            aprovados = aprovados + 1\n\n    media = soma / len(notas)\n    return media, aprovados\n\n\n# Bug 1 corrigido: 6.5 como float, nao string\nnotas_turma = [7.5, 8.0, 6.5, 9.0, 5.5, 4.0, 7.0]\n\nmedia, aprovados = analisar_turma(notas_turma)\n\ntotal = len(notas_turma)\n# Bug 3 corrigido: divisao por total, nao multiplicacao\nporcentagem = aprovados / total * 100\n\nprint(f"Media da turma: {media:.2f}")\nprint(f"Aprovados: {aprovados} de {total}")\nprint(f"Taxa de aprovacao: {porcentagem:.1f}%")',
      hints: [
        'Bug 1: rode o codigo e leia o TypeError. Ele menciona que nao consegue somar str e float. Procure na lista notas_turma um valor entre aspas que nao deveria estar.',
        'Bug 3: a formula da porcentagem esta errada. Porcentagem e (parte / total) * 100. Revise a ordem das operacoes na linha do calculo.',
        'Depois de corrigir o Bug 1, a saida deve mostrar: Media=6.79, Aprovados=5 de 7, Taxa=71.4%.',
      ],
    },
    {
      id: 'dbg-c2',
      title: 'Rastreando a execucao com prints de debug',
      description:
        'O codigo abaixo tem uma funcao que deveria inverter uma lista (ex: [1,2,3] vira [3,2,1]) mas esta produzindo um resultado errado. Use prints de debug para rastrear o que acontece a cada iteracao do loop e identificar onde o algoritmo quebra. Depois corrija o bug.',
      language: 'python',
      starterCode:
        '# Esta funcao deveria inverter a lista mas ha um bug no algoritmo\n# Adicione prints de debug dentro do loop para ver o que acontece\n# a cada iteracao e encontrar onde o erro ocorre\n\ndef inverter_lista(lista):\n    n = len(lista)\n    for i in range(n):  # Bug: deveria ser range(n // 2)\n        # Troca o elemento da posicao i com o da posicao (n-1-i)\n        temp = lista[i]\n        lista[i] = lista[n - 1 - i]\n        lista[n - 1 - i] = temp\n        # Adicione um print aqui para ver o estado da lista a cada passo\n    return lista\n\n\nminha_lista = [1, 2, 3, 4, 5]\nprint(f"Original: {minha_lista}")\nresultado = inverter_lista(minha_lista)\nprint(f"Resultado: {resultado}")\nprint(f"Esperado: [5, 4, 3, 2, 1]")\n',
      solution:
        'def inverter_lista(lista):\n    n = len(lista)\n    # Correcao: range(n // 2) -- so precisa trocar ate o meio\n    # Se for range(n), as trocas sao desfeitas na segunda metade!\n    for i in range(n // 2):\n        temp = lista[i]\n        lista[i] = lista[n - 1 - i]\n        lista[n - 1 - i] = temp\n        print(f"  [DEBUG] passo {i}: lista = {lista}")\n    return lista\n\n\nminha_lista = [1, 2, 3, 4, 5]\nprint(f"Original: {minha_lista}")\nresultado = inverter_lista(minha_lista)\nprint(f"Resultado: {resultado}")\nprint(f"Esperado: [5, 4, 3, 2, 1]")',
      hints: [
        'Adicione print(f"passo {i}: lista = {lista}") dentro do loop para ver a lista apos cada troca.',
        'Observe a saida dos prints. Voce vai notar que nas primeiras iteracoes a inversao funciona, mas depois as trocas sao desfeitas.',
        'O bug e no range(): range(n) faz o loop passar pelo meio e desfaz as trocas que ja foram feitas. Mude para range(n // 2) -- so troque ate a metade.',
      ],
    },
  ],
};
