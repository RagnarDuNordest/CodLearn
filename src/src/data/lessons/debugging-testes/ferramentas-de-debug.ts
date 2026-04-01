import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'ferramentas-de-debug',
  moduleId: 'debugging-testes',
  title: 'Ferramentas de Debug',
  description: 'Domine o uso de debuggers, breakpoints e ferramentas de inspecao para investigar bugs de forma eficiente',
  order: 2,
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Ferramentas de Debug\n\nPrints sao uteis, mas debuggers sao muito mais poderosos. Um debugger permite pausar a execucao do programa, inspecionar variaveis e avancar linha por linha — sem modificar o codigo.\n\n### O modulo pdb (Python Debugger)\n\nPython vem com um debugger embutido chamado `pdb`. Para usa-lo, basta inserir uma linha no codigo:\n\n```python\nimport pdb; pdb.set_trace()  # Python 3.6 e anterior\n# ou simplesmente:\nbreakpoint()  # Python 3.7+\n```\n\nQuando o programa chega nessa linha, ele pausa e abre um prompt interativo.\n\n### Comandos essenciais do pdb\n\n| Comando | Atalho | O que faz |\n|---------|--------|-----------|\n| `next` | `n` | Executa a proxima linha (sem entrar em funcoes) |\n| `step` | `s` | Entra dentro da proxima funcao |\n| `continue` | `c` | Continua ate o proximo breakpoint |\n| `print var` | `p var` | Imprime o valor de uma variavel |\n| `list` | `l` | Mostra o codigo ao redor da linha atual |\n| `where` | `w` | Mostra o stack trace atual |\n| `quit` | `q` | Encerra o debugger |',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Usando breakpoint() para debugar\n\ndef calcular_fatorial(n):\n    if n < 0:\n        raise ValueError("Fatorial nao definido para negativos")\n    if n == 0 or n == 1:\n        return 1\n    \n    resultado = 1\n    breakpoint()  # <- programa pausa aqui\n    for i in range(2, n + 1):\n        resultado *= i  # Inspecione resultado e i a cada iteracao\n    return resultado\n\n# Ao executar, voce vera o prompt (Pdb):\n# > exemplo.py(11)calcular_fatorial()\n# -> for i in range(2, n + 1):\n# (Pdb) p n           <- imprime n\n# 5\n# (Pdb) p resultado   <- imprime resultado\n# 1\n# (Pdb) n             <- proxima linha\n# (Pdb) p i           <- imprime i\n# 2\n# (Pdb) p resultado   <- resultado apos primeira iteracao\n# 2\n# (Pdb) c             <- continua ate o fim\n\nprint(calcular_fatorial(5))  # 120\n\n# IMPORTANTE: remova o breakpoint() antes de fazer commit!',
        filename: 'usando_pdb.py',
        description:
          'O breakpoint() pausa a execucao e abre o prompt do pdb. Use n para avancar linha por linha e p variavel para inspecionar valores em tempo real.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content:
        'No VS Code, voce nao precisa do pdb: clique na margem esquerda do editor para adicionar um breakpoint visual, depois use F5 para iniciar o debug. E muito mais intuitivo e permite inspecionar todas as variaveis em um painel lateral.',
    },
    {
      type: 'text',
      content:
        '## Debugger no VS Code\n\nO VS Code tem um debugger visual integrado para Python, JavaScript, TypeScript e outras linguagens:\n\n**Para configurar (Python):**\n1. Instale a extensao "Python" da Microsoft\n2. Clique na margem esquerda de qualquer linha para adicionar um breakpoint (ponto vermelho)\n3. Pressione `F5` ou va em Run > Start Debugging\n4. O programa pausa no breakpoint e voce pode:\n   - Ver todas as variaveis no painel "Variables"\n   - Inspecionar o call stack em "Call Stack"\n   - Adicionar expressoes para monitorar em "Watch"\n   - Avancar com `F10` (next), `F11` (step into), `F5` (continue)\n\n## Logging: debug sem pausar o programa\n\nPara problemas em producao (onde voce nao pode usar um debugger interativo), use logging:\n\n```python\nimport logging\n\nlogging.basicConfig(\n    level=logging.DEBUG,\n    format=\'%(asctime)s %(levelname)s %(message)s\'\n)\n\ndef processar_pedido(pedido_id, valor):\n    logging.debug(f"Iniciando processamento: pedido={pedido_id}, valor={valor}")\n    # ... logica ...\n    logging.info(f"Pedido {pedido_id} processado com sucesso")\n```',
    },
    {
      type: 'text',
      content:
        '## Prints vs Logging: Qual Usar?\n\n**Prints de debug** funcionam, mas sao uma gambiarra — voce precisa lembrar de remover antes do commit, e eles aparecem para todos os usuarios em producao.\n\n**Logging** e a abordagem profissional: voce controla o nivel de detalhe (`DEBUG`, `INFO`, `WARNING`, `ERROR`) e pode silenciar os logs de debug em producao com uma configuracao.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# ANTES: Debug com prints — funciona mas e gambiarra\ndef calcular_desconto_v1(preco, cupom):\n    print("preco:", preco)   # debug temporario\n    print("cupom:", cupom)   # debug temporario\n    descontos = {"PROMO10": 0.10, "PROMO20": 0.20}\n    desconto = descontos[cupom]\n    print("desconto:", desconto)  # debug temporario\n    return preco * (1 - desconto)\n\n# DEPOIS: Logging estruturado — profissional e controlavel\nimport logging\nlogging.basicConfig(level=logging.DEBUG)\n\ndef calcular_desconto_v2(preco, cupom):\n    logging.debug(f"Calculando desconto: preco={preco}, cupom={cupom}")\n    descontos = {"PROMO10": 0.10, "PROMO20": 0.20}\n    \n    if cupom not in descontos:\n        logging.warning(f"Cupom invalido recebido: {cupom}")\n        return preco\n    \n    desconto = descontos[cupom]\n    resultado = preco * (1 - desconto)\n    logging.debug(f"Desconto {desconto*100}% aplicado -> preco final: {resultado}")\n    return resultado\n\ncalcular_desconto_v2(100, "PROMO10")\n# Em producao: logging.basicConfig(level=logging.WARNING)\n# Os logs DEBUG ficam silenciosos, WARNING e ERROR continuam aparecendo',
        filename: 'prints_vs_logging.py',
        description:
          'Com logging, voce controla a verbosidade sem alterar o codigo: level=DEBUG mostra tudo durante desenvolvimento, level=WARNING silencia mensagens de debug em producao.',
      },
    },
  ],
  challenges: [
    {
      id: 'debug-tools-c1',
      title: 'Simule o Debugger com Prints',
      description:
        'O codigo abaixo tem um bug — o fatorial esta retornando resultados errados. Adicione prints estrategicos para simular o que um debugger faria: inspecione as variaveis em cada iteracao e identifique onde o calculo vai errado.',
      language: 'python',
      starterCode:
        '# Funcao com bug — use prints para inspecionar o estado interno\ndef calcular_fatorial(n):\n    resultado = 0  # Bug: deveria comecar em 1\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado\n\n# Adicione prints dentro do loop para ver resultado e i a cada iteracao\n# Voce deve ver onde o calculo comeca a dar errado\n# Depois corrija o bug\n\nprint(calcular_fatorial(5))   # Esperado: 120\nprint(calcular_fatorial(4))   # Esperado: 24\nprint(calcular_fatorial(1))   # Esperado: 1\n',
      solution:
        '# Versao com prints de debug para entender o problema\ndef calcular_fatorial_debug(n):\n    resultado = 0  # Bug aqui\n    for i in range(1, n + 1):\n        resultado *= i\n        print(f"  i={i}, resultado={resultado}")\n    return resultado\n\nprint("--- Debug de fatorial(5) ---")\nprint(calcular_fatorial_debug(5))\n# i=1, resultado=0  <- ja errou: 0 * 1 = 0, nunca sai do zero\n# i=2, resultado=0\n# ... sempre zero\n# Conclusao: comecar com 0 faz tudo ser zero na multiplicacao\n\n# Versao corrigida\ndef calcular_fatorial(n):\n    resultado = 1  # Correcao: elemento neutro da multiplicacao e 1\n    for i in range(1, n + 1):\n        resultado *= i\n    return resultado\n\nprint(calcular_fatorial(5))   # 120\nprint(calcular_fatorial(4))   # 24\nprint(calcular_fatorial(1))   # 1\n',
      hints: [
        'Adicione um print dentro do for: print(f"i={i}, resultado={resultado}") para ver o valor a cada passo',
        'Observe o que acontece na primeira iteracao: resultado = 0 * 1 = ?',
        'O elemento neutro da multiplicacao e 1 (qualquer numero vezes 1 permanece o mesmo)',
      ],
    },
  ],
};
