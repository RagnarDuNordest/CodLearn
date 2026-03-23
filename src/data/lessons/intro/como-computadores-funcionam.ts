import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'como-computadores-funcionam',
  moduleId: 'intro',
  title: 'Como Computadores Funcionam',
  description:
    'Entenda os componentes basicos de um computador, a diferenca entre hardware e software, e como um programa e executado passo a passo.',
  order: 1,
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content:
        'Voce usa o computador todos os dias, mas ja parou para pensar como ele funciona? E como uma cozinha: tem o processador (o chef), a memoria RAM (a bancada) e o disco (a despensa)!\n\n## Hardware vs Software\n\nPara entender como computadores funcionam, precisamos comecar separando duas coisas fundamentais:\n\n- **Hardware** e tudo aquilo que voce pode tocar: o teclado, o mouse, a tela, os componentes internos. E a parte fisica do computador.\n- **Software** e tudo aquilo que voce nao pode tocar: os programas, aplicativos, o sistema operacional. E a parte logica — as instrucoes que dizem ao hardware o que fazer.\n\nPense assim: o hardware e como o corpo humano (cerebro, maos, olhos), e o software e como os pensamentos e instrucoes que fazem o corpo agir. Um sem o outro nao tem muita utilidade.',
    },
    {
      type: 'text',
      content:
        '## Os principais componentes\n\nDentro de um computador, tres componentes sao essenciais para entender como tudo funciona:\n\n### CPU (Processador)\nA CPU e o **cerebro** do computador. E ela quem executa as instrucoes do programa, fazendo calculos e tomando decisoes. Quando voce roda um programa, e a CPU que le cada instrucao e a executa. CPUs modernas conseguem executar bilhoes de instrucoes por segundo!\n\n### RAM (Memoria)\nA RAM e a **memoria de curto prazo** do computador. Quando voce abre um programa, ele e carregado do disco para a RAM, porque a RAM e muito mais rapida. Porem, quando o computador e desligado, tudo que estava na RAM desaparece. E como a mesa de trabalho onde voce coloca os materiais que esta usando no momento.\n\n### Armazenamento (HD/SSD)\nO armazenamento e a **memoria de longo prazo**. E onde ficam salvos seus arquivos, programas instalados e o sistema operacional. Diferente da RAM, os dados no armazenamento permanecem mesmo quando o computador e desligado. E como um armario onde voce guarda tudo que nao esta usando agora, mas vai precisar depois.',
    },
    {
      type: 'text',
      content:
        '## Como um programa e executado\n\nQuando voce clica duas vezes em um programa para abri-lo, varias coisas acontecem nos bastidores:\n\n1. O programa esta salvo no **armazenamento** (HD ou SSD).\n2. O sistema operacional copia o programa para a **RAM**, que e muito mais rapida.\n3. A **CPU** comeca a ler e executar as instrucoes do programa, uma por uma.\n4. Se o programa precisa salvar algo, os dados voltam para o **armazenamento**.\n\nIsso acontece em fracoes de segundo, tao rapido que parece instantaneo para nos.',
    },
    {
      type: 'text',
      content:
        '## O modelo: Entrada → Processamento → Saida\n\nQuase todo programa de computador segue um modelo simples que pode ser resumido em tres etapas:\n\n- **Entrada (Input)**: o programa recebe dados. Pode ser algo que voce digita no teclado, um clique do mouse, um arquivo, ou dados da internet.\n- **Processamento**: o programa faz algo com esses dados — calcula, compara, organiza, transforma.\n- **Saida (Output)**: o programa mostra o resultado. Pode ser um texto na tela, um som, uma imagem, ou dados salvos em um arquivo.\n\nPor exemplo: quando voce usa uma calculadora no computador, voce **digita os numeros** (entrada), a calculadora **faz a conta** (processamento), e o **resultado aparece na tela** (saida).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Entrada: o usuario digita seu nome\nnome = input("Qual e o seu nome? ")\n\n# Processamento: criamos uma mensagem personalizada\nmensagem = "Seja bem-vindo(a), " + nome + "!"\n\n# Saida: exibimos a mensagem na tela\nprint(mensagem)',
        filename: 'entrada_processamento_saida.py',
        description:
          'Este programa demonstra o fluxo Entrada → Processamento → Saida. Ele pede o nome do usuario, cria uma mensagem de boas-vindas e a exibe na tela.',
      },
    },
    {
      type: 'callout',
      content:
        'No fundo, tudo dentro do computador e apenas eletricidade! Os componentes eletronicos trabalham com dois estados: ligado e desligado (representados por 1 e 0). A partir dessas combinacoes simples de "ligado" e "desligado", o computador consegue realizar tudo o que conhecemos — de jogos a inteligencia artificial.',
      calloutType: 'info',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa entender tudo de uma vez! Esses conceitos ficam mais claros conforme voce avanca.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Usando Python para ilustrar conceitos\n\nNos exercicios a seguir, vamos usar Python para fixar o que aprendemos. Voce so precisa saber duas coisas por enquanto:\n\n- **`print("texto")`** — Exibe uma mensagem na tela\n- **Calculos:** voce pode usar `+`, `-`, `*`, `/` diretamente. Ex: `print(3 * 8)` exibe `24`\n- **Variaveis:** `nome = valor` guarda um valor. Ex: `bits_por_byte = 8`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'conceitos.py',
        code: `# Exibindo informacoes
print("Hardware: Teclado")
print("Software: Navegador")

# Fazendo calculos simples
bits_por_byte = 8
kb = 1024

# Calcule: 4 bytes = quantos bits?
bytes_val = 4
bits = bytes_val * bits_por_byte
print("4 bytes =", bits, "bits")  # 4 bytes = 32 bits`,
        description: 'print() exibe texto. Variaveis guardam valores. Use * para multiplicar.',
      },
    },
  ],
  challenges: [
    {
      id: 'ccf-c1',
      title: 'Hardware ou Software?',
      description:
        'Use print() para exibir 3 exemplos de hardware e 3 exemplos de software do seu computador ou celular. Cada linha deve comecar com "Hardware:" ou "Software:". Esse exercicio pratica o uso de print() e fixa a diferenca entre os dois conceitos da aula.',
      language: 'python',
      starterCode: '# Exiba 3 exemplos de hardware (componentes fisicos)\nprint("Hardware: Teclado")\n# Continue com mais 2 exemplos de hardware\n\n\n# Exiba 3 exemplos de software (programas)\nprint("Software: Navegador")\n# Continue com mais 2 exemplos de software\n\n',
      solution:
        'print("Hardware: Teclado")\nprint("Hardware: Mouse")\nprint("Hardware: Tela")\nprint("Software: Navegador")\nprint("Software: Editor de texto")\nprint("Software: Sistema operacional")',
      hints: [
        'Hardware e tudo que voce pode tocar fisicamente: teclado, mouse, tela, processador, memoria.',
        'Software e tudo que e programa ou instrucao: navegador, Word, Windows, Android, jogos.',
        'Use print("Hardware: ...") para cada componente fisico e print("Software: ...") para cada programa.',
      ],
      testCases: [
        {
          description: 'Exibe 3 hardwares e 3 softwares na ordem correta',
          expectedOutput: 'Hardware: Teclado\nHardware: Mouse\nHardware: Tela\nSoftware: Navegador\nSoftware: Editor de texto\nSoftware: Sistema operacional',
        },
      ],
    },
    {
      id: 'ccf-c2',
      title: 'Entrada - Processamento - Saida',
      description:
        'Simule o fluxo Entrada → Processamento → Saida usando variaveis com valores fixos. O programa ja tem a "Entrada" definida (o preco de um produto e o desconto). Voce deve completar o "Processamento" (calcular o preco final) e a "Saida" (exibir o resultado com print()).',
      language: 'python',
      starterCode: '# ENTRADA: valores ja definidos no programa\npreco = 100\ndesconto = 20\n\n# PROCESSAMENTO: calcule o preco final\n# preco_final = preco - desconto\n\n\n# SAIDA: exiba o preco original, o desconto e o preco final\nprint("Preco original:", preco)\n# Exiba tambem o desconto e o preco final\n\n',
      solution:
        'preco = 100\ndesconto = 20\npreco_final = preco - desconto\nprint("Preco original:", preco)\nprint("Desconto:", desconto)\nprint("Preco final:", preco_final)',
      hints: [
        'Para calcular o preco final, subtraia o desconto do preco: preco_final = preco - desconto.',
        'Use print("Desconto:", desconto) para exibir o valor do desconto.',
        'Use print("Preco final:", preco_final) para exibir o resultado. O Python exibe o valor da variavel automaticamente.',
      ],
      testCases: [
        {
          description: 'Calcula e exibe preco original, desconto e preco final corretamente',
          expectedOutput: 'Preco original: 100\nDesconto: 20\nPreco final: 80',
        },
      ],
    },
    {
      id: 'ccf-c3',
      title: 'Calculando memoria',
      description:
        'Use variaveis e print() para calcular e exibir informacoes de memoria. O computador tem 8 GB de RAM. Sabendo que 1 GB = 1024 MB e 1 MB = 1024 KB, calcule quantos MB e quantos KB esse computador tem. Exiba os resultados.',
      language: 'python',
      starterCode: '# O computador tem 8 GB de RAM\ngb = 8\n\n# Calcule quantos MB esse computador tem (1 GB = 1024 MB)\nmb = \n\n# Calcule quantos KB (1 MB = 1024 KB)\nkb = \n\n# Exiba os resultados\nprint("Memoria em GB:", gb)\n# Exiba tambem em MB e KB\n\n',
      solution:
        'gb = 8\nmb = gb * 1024\nkb = mb * 1024\nprint("Memoria em GB:", gb)\nprint("Memoria em MB:", mb)\nprint("Memoria em KB:", kb)',
      hints: [
        'Para converter GB em MB, multiplique por 1024: mb = gb * 1024.',
        'Para converter MB em KB, multiplique por 1024 novamente: kb = mb * 1024.',
        'Use print("Memoria em MB:", mb) para exibir o resultado em MB, e o mesmo padrao para KB.',
      ],
      testCases: [
        {
          description: 'Calcula e exibe memoria em GB, MB e KB corretamente',
          expectedOutput: 'Memoria em GB: 8\nMemoria em MB: 8192\nMemoria em KB: 8388608',
        },
      ],
    },
  ],
};
