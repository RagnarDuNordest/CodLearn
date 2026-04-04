import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'debug-integrado',
  moduleId: 'vscode',
  title: 'Debug Integrado',
  description: 'Use o debugger do VS Code com breakpoints, watch, call stack e debug console. Configure o launch.json para Python e JavaScript',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 30,
  sections: [
    {
      type: 'text',
      content:
        '## Debug: pare de usar print() para tudo\n\nO debugger integrado do VS Code e uma das funcionalidades mais poderosas e subutilizadas. Em vez de adicionar `print()` em todo lugar para entender o que o codigo faz, voce pode pausar a execucao em qualquer linha e inspecionar TUDO.\n\n### Conceitos fundamentais\n\n**(1) Breakpoint**\nUm ponto de parada. Quando o programa chega a uma linha com breakpoint, a execucao pausa e voce pode inspecionar o estado. Adicione/remova clicando na margem esquerda do editor (lado esquerdo dos numeros de linha) ou com `F9`.\n\n**(2) Step Over (F10)**\nExecuta a linha atual e para na proxima, sem entrar dentro de funcoes chamadas. Use para navegar pelo fluxo principal.\n\n**(3) Step Into (F11)**\nEntra dentro da funcao que esta sendo chamada na linha atual. Use quando quiser entender o que uma funcao faz por dentro.\n\n**(4) Step Out (Shift+F11)**\nExecuta o restante da funcao atual e volta para quem a chamou. Use quando voce entrou em uma funcao mas nao quer continuar linha por linha.\n\n**(5) Continue (F5)**\nRetoma a execucao ate o proximo breakpoint (ou ate o programa terminar).\n\n**(6) Restart (Ctrl+Shift+F5) / Stop (Shift+F5)**\nReinicia ou para a sessao de debug.\n\n### Paineis do Debug\n\n- **Variables** — mostra todas as variaveis no escopo atual, organizadas por local, closure e global\n- **Watch** — adicione expressoes para monitorar em tempo real (ex: `len(lista)`, `usuario.nome`)\n- **Call Stack** — mostra a pilha de chamadas: por onde o codigo passou para chegar ate aqui\n- **Breakpoints** — lista todos os breakpoints com opcao de habilitar/desabilitar individualmente\n- **Debug Console** — terminal interativo durante o debug: execute qualquer expressao Python/JS no contexto atual',
    },
    {
      type: 'code',
      codeExample: {
        language: 'javascript',
        code: '// Arquivo: .vscode/launch.json\n// Configuracao de debug para JavaScript (Node.js) e Python\n{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Python: Arquivo Atual",\n      "type": "debugpy",\n      "request": "launch",\n      "program": "${file}",\n      "console": "integratedTerminal",\n      "justMyCode": true\n    },\n    {\n      "name": "Python: Com Argumentos",\n      "type": "debugpy",\n      "request": "launch",\n      "program": "${file}",\n      "args": ["--input", "dados.csv", "--saida", "resultado.json"],\n      "console": "integratedTerminal"\n    },\n    {\n      "name": "Node.js: Arquivo Atual",\n      "type": "node",\n      "request": "launch",\n      "program": "${file}",\n      "console": "integratedTerminal"\n    },\n    {\n      "name": "Node.js: servidor.js",\n      "type": "node",\n      "request": "launch",\n      "program": "${workspaceFolder}/servidor.js",\n      "env": {\n        "NODE_ENV": "development",\n        "PORT": "3000"\n      },\n      "console": "integratedTerminal"\n    }\n  ]\n}',
        filename: '.vscode/launch.json',
        description:
          'Arquivo launch.json com 4 configuracoes de debug: Python simples, Python com argumentos de linha de comando, Node.js arquivo atual e Node.js servidor com variaveis de ambiente. Crie este arquivo em uma pasta ".vscode" na raiz do projeto.',
      },
    },
    {
      type: 'text',
      content:
        '## Tecnicas avancadas de debug\n\n### Breakpoints condicionais\nClique com o botao direito em um breakpoint > "Edit Breakpoint" para adicionar uma condicao. O programa so pausa se a condicao for verdadeira. Exemplo: `i == 50` para pausar apenas na 50a iteracao de um loop.\n\n### Logpoints\nClique com o botao direito na margem > "Add Logpoint". Em vez de pausar, imprime uma mensagem no Debug Console. E como um `print()` temporario que nao modifica o codigo.\n\n### Watch expressions\nNo painel Watch, clique no "+" para adicionar expressoes como:\n- `len(lista_de_usuarios)` — monitora o tamanho de uma lista\n- `usuario["email"].split("@")[1]` — expressao complexa avaliada em tempo real\n- `total > limite` — expressao booleana para verificar condicoes\n\n### Debug Console interativo\nDurante uma pausa, o Debug Console funciona como um REPL no contexto atual. Voce pode:\n- Inspecionar variaveis: digite o nome e pressione Enter\n- Modificar valores: `usuario["ativo"] = True`\n- Chamar funcoes: `calcular_total(itens, desconto=0.15)`\n- Executar codigo arbitrario para testar hipoteses\n\n### Dica: justMyCode\nA opcao `"justMyCode": true` no launch.json faz o debugger pular o interior das bibliotecas instaladas (como numpy, requests) e focar apenas no seu codigo. Desabilite se precisar depurar codigo de biblioteca.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Exemplo de codigo com bug para praticar debug\n# Tente encontrar o bug sem executar — depois use o debugger para confirmar\n\ndef calcular_media_ponderada(notas, pesos):\n    """Calcula a media ponderada de notas com seus respectivos pesos."""\n    if len(notas) != len(pesos):\n        raise ValueError("Notas e pesos devem ter o mesmo tamanho")\n    \n    soma_ponderada = 0\n    soma_pesos = 0\n    \n    for i in range(len(notas)):\n        soma_ponderada += notas[i] * pesos[i]\n        soma_pesos += pesos[i]\n    \n    return soma_ponderada / soma_pesos\n\n\ndef classificar_aluno(media):\n    """Retorna a classificacao do aluno com base na media."""\n    if media >= 9.0:\n        return "Excelente"\n    elif media >= 7.0:\n        return "Bom"\n    elif media >= 5.0:\n        return "Regular"\n    else:\n        return "Insuficiente"\n\n\n# Testando as funcoes\nnotas_turma = [\n    {"nome": "Ana",    "notas": [8, 9, 7],   "pesos": [1, 2, 1]},\n    {"nome": "Bruno",  "notas": [6, 5, 8],   "pesos": [1, 2, 1]},\n    {"nome": "Carlos", "notas": [10, 10, 9], "pesos": [1, 2, 1]},\n]\n\nfor aluno in notas_turma:\n    media = calcular_media_ponderada(aluno["notas"], aluno["pesos"])\n    classificacao = classificar_aluno(media)\n    print(f"{aluno[\'nome\']}: media={media:.2f}, classificacao={classificacao}")\n\n# Para debugar: coloque um breakpoint na linha "media = calcular_media_ponderada..."\n# Use F10 (step over) para ver o valor de "media" antes de classificar\n# Use F11 (step into) para entrar na funcao e ver o loop',
        filename: 'debug_exemplo.py',
        description:
          'Codigo de exemplo para praticar o debugger. Coloque um breakpoint no loop principal, use Step Over e Step Into para entender o fluxo, e use o painel Watch para monitorar "soma_ponderada" e "soma_pesos" a cada iteracao.',
      },
    },
  ],
  challenges: [
    {
      id: 'vscode-debug-c1',
      title: 'Encontre o Bug com o Debugger',
      description:
        'A funcao abaixo tem um bug que faz ela retornar resultados errados em alguns casos. Analise o codigo, identifique o bug e corrija-o. Documente nos comentarios onde voce colocaria os breakpoints e o que observaria no painel Watch para encontrar o problema.',
      language: 'python',
      starterCode:
        '# Encontre e corrija o bug nesta funcao\n# Documente: onde colocaria breakpoints e o que observaria no Watch\n\n# Breakpoint 1: linha ?\n# Watch expression: ?\n# O que procurar: ?\n\ndef encontrar_segundo_maior(numeros):\n    """Retorna o segundo maior numero da lista."""\n    if len(numeros) < 2:\n        return None\n    \n    maior = numeros[0]\n    segundo_maior = numeros[0]  # BUG: inicializacao errada\n    \n    for numero in numeros[1:]:\n        if numero > maior:\n            segundo_maior = maior\n            maior = numero\n        elif numero > segundo_maior:\n            segundo_maior = numero\n    \n    return segundo_maior\n\n\n# Testes para verificar\nprint(encontrar_segundo_maior([3, 1, 4, 1, 5, 9, 2, 6]))  # Esperado: 6\nprint(encontrar_segundo_maior([10, 10, 10]))                # Esperado: 10\nprint(encontrar_segundo_maior([5, 5, 3, 2]))               # Esperado: 5 (errado com bug!)\nprint(encontrar_segundo_maior([1, 2]))                     # Esperado: 1\n',
      solution:
        '# Bug encontrado e corrigido\n# Breakpoint 1: linha "for numero in numeros[1:]:" para ver o estado inicial\n# Watch expression: "segundo_maior", "maior", "numero" — monitorar a cada iteracao\n# O que procurar: quando "maior" e "segundo_maior" comecam iguais, e um numero\n# igual ao maior aparece, "elif numero > segundo_maior" e False, entao o segundo\n# maior nunca e atualizado para o caso de duplicatas no topo\n\ndef encontrar_segundo_maior(numeros):\n    """Retorna o segundo maior numero da lista."""\n    if len(numeros) < 2:\n        return None\n    \n    # Correcao: inicializar com menos infinito para tratar todos os casos\n    maior = float(\'-inf\')\n    segundo_maior = float(\'-inf\')\n    \n    for numero in numeros:\n        if numero > maior:\n            segundo_maior = maior\n            maior = numero\n        elif numero > segundo_maior:\n            segundo_maior = numero\n    \n    if segundo_maior == float(\'-inf\'):\n        return None\n    return segundo_maior\n\n\n# Testes verificados\nprint(encontrar_segundo_maior([3, 1, 4, 1, 5, 9, 2, 6]))  # 6\nprint(encontrar_segundo_maior([10, 10, 10]))                # 10\nprint(encontrar_segundo_maior([5, 5, 3, 2]))               # 5\nprint(encontrar_segundo_maior([1, 2]))                     # 1\n',
      hints: [
        'Coloque um breakpoint na linha do for e adicione "segundo_maior" e "maior" no painel Watch — observe como os valores mudam para a lista [5, 5, 3, 2]',
        'O problema esta na inicializacao: quando "segundo_maior" começa igual a "maior", o elif nunca atualiza segundo_maior para numeros iguais ao maior',
        'A correcao classica e inicializar com float("-inf") para que qualquer numero da lista seja maior que o valor inicial',
      ],
    },
  ],
};
