import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'o-que-e-debugging',
  moduleId: 'debugging-testes',
  title: 'O Que E Debugging',
  description: 'Entenda o que e debugging, por que bugs existem e como pensar de forma sistematica para encontrar e corrigir erros',
  order: 0,
  estimatedMinutes: 20,
  sections: [
    {
      type: 'text',
      content:
        '## O Que E Debugging\n\nDebugging e o processo de encontrar e corrigir erros (bugs) no codigo. A palavra vem de 1947, quando a programadora Grace Hopper encontrou uma mariposa real presa em um rele do computador Harvard Mark II — ela literalmente removeu um "bug" da maquina.\n\nHoje, "bug" e qualquer comportamento incorreto de um programa: o codigo roda, mas faz a coisa errada.\n\n### Tipos de erros\n\n**Erros de sintaxe (Syntax Errors)**\nO codigo nao obedece as regras da linguagem — o interpretador nem chega a executar.\n```python\nif x = 10:   # Erro: deveria ser ==\n    print(x)\n```\n\n**Erros de execucao (Runtime Errors)**\nO codigo tem sintaxe correta, mas falha durante a execucao.\n```python\nlista = [1, 2, 3]\nprint(lista[10])  # IndexError: indice fora do alcance\n```\n\n**Erros de logica (Logic Errors)**\nO codigo roda sem erros, mas produz resultado errado. Esses sao os mais dificeis de encontrar.\n```python\n# Queremos a media de tres numeros\ndef calcular_media(a, b, c):\n    return a + b + c / 3  # Erro de logica: divisao so se aplica ao c\n    # Correto: return (a + b + c) / 3\n```',
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'A maioria dos bugs vem de suposicoes erradas. Quando voce diz "deveria funcionar", pergunte: "o que eu estou assumindo que pode estar errado?"',
    },
    {
      type: 'text',
      content:
        '## O Processo de Debugging\n\nDebugging eficaz segue um processo, nao e tentativa e erro aleatoria:\n\n**1. Reproduza o bug**\nAntes de qualquer coisa, confirme que consegue reproduzir o problema de forma consistente. Se o bug e intermitente, identifique as condicoes que o provocam.\n\n**2. Isole o problema**\nRedua o codigo ao minimo necessario para reproduzir o bug. Elimine tudo o que nao e relevante. Quanto menor o codigo, mais facil de analisar.\n\n**3. Formule hipoteses**\nBaseado nos sintomas, pense: "o que poderia causar isso?" Liste as causas possiveis antes de sair modificando o codigo.\n\n**4. Teste cada hipotese**\nVerifique uma hipotese por vez. Se voce muda tres coisas de uma vez e o bug desaparece, voce nao sabe qual das tres foi a causa.\n\n**5. Corrija e verifique**\nApos corrigir, confirme que o bug foi resolvido E que voce nao introduziu novos problemas.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo: debugging de uma funcao com bug de logica\n\n# Versao com bug — calcular desconto progressivo\ndef calcular_preco_final(preco, quantidade):\n    if quantidade >= 10:\n        desconto = 0.20\n    elif quantidade >= 5:\n        desconto = 0.10\n    else:\n        desconto = 0\n    return preco * desconto  # BUG: deveria ser preco * (1 - desconto)\n\n# Testando para encontrar o bug\npreco = 100.0\nquantidade = 3\nresultado = calcular_preco_final(preco, quantidade)\nprint(f"Preco final para {quantidade} unidades: R${resultado}")\n# Saida: R$0.0 — claramente errado! Esperavamos R$100.0\n\n# Adicionando print temporario para debug\ndef calcular_preco_final_debug(preco, quantidade):\n    if quantidade >= 10:\n        desconto = 0.20\n    elif quantidade >= 5:\n        desconto = 0.10\n    else:\n        desconto = 0\n    print(f"[DEBUG] preco={preco}, desconto={desconto}, calculo={preco * desconto}")\n    return preco * desconto\n\ncalcular_preco_final_debug(100.0, 3)\n# [DEBUG] preco=100.0, desconto=0, calculo=0.0\n# Agora fica claro: quando desconto=0, preco*desconto=0\n# A formula correta e preco * (1 - desconto)\n\n# Versao corrigida\ndef calcular_preco_final_correto(preco, quantidade):\n    if quantidade >= 10:\n        desconto = 0.20\n    elif quantidade >= 5:\n        desconto = 0.10\n    else:\n        desconto = 0\n    return preco * (1 - desconto)\n\nprint(calcular_preco_final_correto(100.0, 3))   # 100.0\nprint(calcular_preco_final_correto(100.0, 5))   # 90.0\nprint(calcular_preco_final_correto(100.0, 10))  # 80.0',
        filename: 'debug_exemplo.py',
        description:
          'Processo completo de debugging: identificar o bug pelo resultado inesperado, adicionar prints temporarios para inspecionar o estado interno, identificar a causa raiz e corrigir.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content:
        'Remova todos os prints de debug antes de fazer commit. Prints temporarios sao uma ferramenta de trabalho, nao devem ir para o codigo final.',
    },
  ],
  challenges: [
    {
      id: 'debugging-c1',
      title: 'Encontre o Bug de Logica',
      description:
        'A funcao abaixo deveria calcular quantos numeros pares existem em uma lista. Ela roda sem erros, mas retorna o resultado errado. Encontre e corrija o bug.',
      language: 'python',
      starterCode:
        '# Esta funcao tem um bug de logica — encontre e corrija\ndef contar_pares(numeros):\n    contador = 0\n    for numero in numeros:\n        if numero % 2 == 1:  # Esta linha tem o bug\n            contador += 1\n    return contador\n\n# Testes — todos deveriam passar apos a correcao\nprint(contar_pares([1, 2, 3, 4, 5, 6]))  # Esperado: 3\nprint(contar_pares([1, 3, 5, 7]))          # Esperado: 0\nprint(contar_pares([2, 4, 6, 8]))          # Esperado: 4\nprint(contar_pares([]))                    # Esperado: 0\n',
      solution:
        'def contar_pares(numeros):\n    contador = 0\n    for numero in numeros:\n        if numero % 2 == 0:  # Correcao: == 0 para verificar par, nao == 1\n            contador += 1\n    return contador\n\n# Testes\nprint(contar_pares([1, 2, 3, 4, 5, 6]))  # 3\nprint(contar_pares([1, 3, 5, 7]))          # 0\nprint(contar_pares([2, 4, 6, 8]))          # 4\nprint(contar_pares([]))                    # 0\n',
      hints: [
        'Execute o codigo e observe: para a lista [2, 4, 6, 8] ele retorna 0, quando deveria retornar 4',
        'Um numero e PAR quando o resto da divisao por 2 e igual a ZERO (numero % 2 == 0)',
        'A condicao atual testa se o numero e impar (resto == 1), nao par',
      ],
    },
    {
      id: 'debugging-c2',
      title: 'Tres Bugs, Uma Funcao',
      description:
        'A funcao abaixo tem tres bugs: um de sintaxe, um de execucao e um de logica. Identifique e corrija todos os tres.',
      language: 'python',
      starterCode:
        '# Esta funcao tem 3 bugs — identifique cada tipo e corrija\ndef calcular_estatisticas(numeros):\n    total = sum(numeros)\n    media = total / len(numeros)  # Bug de execucao: e se a lista for vazia?\n    \n    maior = numeros[0]\n    for n in numeros:\n        if n > maior\n            maior = n  # Bug de sintaxe: falta dois pontos na linha acima\n    \n    # Bug de logica: esta contando quantos sao MAIORES que a media\n    # mas deveria contar quantos sao MENORES que a media\n    abaixo_da_media = sum(1 for n in numeros if n > media)\n    \n    return {\n        "media": media,\n        "maior": maior,\n        "abaixo_da_media": abaixo_da_media\n    }\n\nprint(calcular_estatisticas([10, 20, 30, 5, 15]))\n# Media esperada: 16.0\n# Maior esperado: 30\n# Abaixo da media esperado: 2 (os numeros 10 e 5)\n',
      solution:
        'def calcular_estatisticas(numeros):\n    if not numeros:  # Correcao do bug de execucao: tratar lista vazia\n        return {"media": 0, "maior": None, "abaixo_da_media": 0}\n    \n    total = sum(numeros)\n    media = total / len(numeros)\n    \n    maior = numeros[0]\n    for n in numeros:\n        if n > maior:  # Correcao do bug de sintaxe: adicionado dois pontos\n            maior = n\n    \n    # Correcao do bug de logica: n < media para contar os MENORES\n    abaixo_da_media = sum(1 for n in numeros if n < media)\n    \n    return {\n        "media": media,\n        "maior": maior,\n        "abaixo_da_media": abaixo_da_media\n    }\n\nprint(calcular_estatisticas([10, 20, 30, 5, 15]))\n# {"media": 16.0, "maior": 30, "abaixo_da_media": 2}\nprint(calcular_estatisticas([]))\n# {"media": 0, "maior": None, "abaixo_da_media": 0}\n',
      hints: [
        'Bug de sintaxe: leia cada linha em voz alta buscando elementos faltando (dois pontos, parenteses, aspas)',
        'Bug de execucao: o que acontece se voce chamar a funcao com uma lista vazia? Teste: calcular_estatisticas([])',
        'Bug de logica: leia o comentario e compare com o codigo — "abaixo da media" significa n < media, nao n > media',
      ],
    },
  ],
};
