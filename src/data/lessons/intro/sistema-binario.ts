import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'sistema-binario',
  moduleId: 'intro',
  title: 'O Sistema Binario',
  description:
    'Aprenda como os computadores representam numeros, textos e tudo mais usando apenas zeros e uns, e entenda os conceitos de bits, bytes e o sistema de base 2.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content:
        'O computador so entende dois numeros: 0 e 1! E como uma lampada que so pode estar ligada ou desligada. Parece limitado, mas com combinacoes de zeros e uns, ele faz tudo!\n\n## O que e o sistema binario?\n\nNo nosso dia a dia, usamos o **sistema decimal** (base 10) para contar. Ele usa dez digitos: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9. Quando chegamos ao 9 e queremos continuar, combinamos digitos: 10, 11, 12... Usamos base 10 provavelmente porque temos 10 dedos nas maos!\n\nJa os computadores usam o **sistema binario** (base 2), que tem apenas dois digitos: **0** e **1**. Por que? Porque os circuitos eletronicos so conseguem estar em dois estados: desligado (0) ou ligado (1). E como um interruptor de luz — so pode estar ligado ou desligado, nao existe meio-termo.\n\nEntao, para representar qualquer informacao, o computador combina sequencias de zeros e uns. Parece limitado, mas com combinacoes suficientes, da para representar qualquer coisa!',
    },
    {
      type: 'text',
      content:
        '## Contando em binario\n\nVamos comparar como contamos nos dois sistemas:\n\n| Decimal (base 10) | Binario (base 2) |\n|---|---|\n| 0 | 0 |\n| 1 | 1 |\n| 2 | 10 |\n| 3 | 11 |\n| 4 | 100 |\n| 5 | 101 |\n| 6 | 110 |\n| 7 | 111 |\n| 8 | 1000 |\n\nPerceba que no binario, "10" nao significa dez — significa **dois**! Assim como no decimal cada posicao vale 10 vezes mais que a anterior (unidades, dezenas, centenas), no binario cada posicao vale **2 vezes** mais: 1, 2, 4, 8, 16, 32...\n\nPor exemplo, o numero binario **1101** e calculado assim:\n- 1 × 8 = 8\n- 1 × 4 = 4\n- 0 × 2 = 0\n- 1 × 1 = 1\n- Total: 8 + 4 + 0 + 1 = **13** em decimal',
    },
    {
      type: 'text',
      content:
        '## Bits e Bytes\n\nAgora que voce sabe o que sao zeros e uns no computador, vamos aprender os nomes corretos:\n\n- **Bit**: e a menor unidade de informacao em um computador. Um unico 0 ou 1. A palavra "bit" vem de "**b**inary dig**it**" (digito binario).\n- **Byte**: e um grupo de **8 bits**. Por exemplo: 01001010 e um byte.\n\nPor que 8 bits? Porque com 8 bits conseguimos representar 256 valores diferentes (de 0 a 255), o que e suficiente para representar todas as letras do alfabeto, numeros, pontuacao e varios simbolos.\n\nA partir do byte, usamos prefixos para quantidades maiores:\n- 1 **Kilobyte** (KB) = 1.024 bytes (aproximadamente mil bytes)\n- 1 **Megabyte** (MB) = 1.024 KB (aproximadamente um milhao de bytes)\n- 1 **Gigabyte** (GB) = 1.024 MB (aproximadamente um bilhao de bytes)\n- 1 **Terabyte** (TB) = 1.024 GB (aproximadamente um trilhao de bytes)',
    },
    {
      type: 'callout',
      content:
        '1 byte = 8 bits = 256 valores possiveis (de 0 a 255). Esse numero 256 aparece com frequencia na programacao e na computacao. Sempre que voce vir ele, lembre-se: e porque 2 elevado a 8 e igual a 256!',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content:
        '## Como o computador representa numeros\n\nVoce ja viu que os computadores usam binario para representar numeros. Na pratica, o computador reserva uma quantidade fixa de bits para cada numero:\n\n- Com **8 bits** (1 byte), podemos representar numeros de 0 a 255.\n- Com **16 bits** (2 bytes), de 0 a 65.535.\n- Com **32 bits** (4 bytes), de 0 a mais de 4 bilhoes.\n\nPara numeros negativos, o computador usa tecnicas especiais, como reservar o primeiro bit para indicar se o numero e positivo ou negativo. Mas nao se preocupe com isso agora — o importante e entender que tudo se resume a combinacoes de zeros e uns.',
    },
    {
      type: 'text',
      content:
        '## Como o computador representa texto\n\nSe o computador so entende numeros, como ele consegue trabalhar com letras e textos? A resposta e simples: cada caractere recebe um **numero correspondente** em uma tabela padronizada.\n\nA tabela mais classica e a **ASCII** (American Standard Code for Information Interchange). Nela, cada letra, numero e simbolo tem um codigo numerico. Por exemplo:\n\n- A letra **A** maiuscula = 65\n- A letra **a** minuscula = 97\n- O numero **0** (como caractere) = 48\n- O espaco em branco = 32\n\nEntao, quando voce digita "Ola", o computador armazena internamente algo como: **79 108 97** (os codigos de O, l, a). E cada um desses numeros e guardado em binario!',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: '# Convertendo numeros decimais para binario\nprint(bin(13))    # Resultado: 0b1101\nprint(bin(255))   # Resultado: 0b11111111\n\n# Descobrindo o codigo ASCII de caracteres\nprint(ord("A"))   # Resultado: 65\nprint(ord("a"))   # Resultado: 97\nprint(ord("0"))   # Resultado: 48\n\n# Vendo a letra em binario\ncodigo = ord("A")           # 65\nbinario = bin(codigo)       # 0b1000001\nprint(f"A letra A em binario e: {binario}")',
        filename: 'binario_e_ascii.py',
        description:
          'Em Python, a funcao bin() converte um numero decimal para sua representacao binaria, e a funcao ord() retorna o codigo numerico (ASCII) de um caractere.',
      },
    },
    {
      type: 'text',
      content:
        '## Por que o binario importa?\n\nVoce pode estar pensando: "Se as linguagens de programacao ja cuidam disso tudo para mim, por que preciso saber sobre binario?"\n\nEntender o sistema binario e importante porque:\n\n- **Ajuda a entender limites**: por que uma imagem tem um tamanho maximo? Por que um programa trava quando um numero fica grande demais? A resposta esta nos bits.\n- **Facilita o aprendizado de conceitos avancados**: topicos como redes de computadores, seguranca digital e manipulacao de dados ficam muito mais claros.\n- **Melhora sua intuicao como programador**: saber o que acontece por baixo dos panos faz de voce um profissional mais completo e capaz de resolver problemas que outros nao conseguem.\n\nVoce nao precisa fazer conversoes de binario de cabeca no dia a dia, mas ter essa base solida vai fazer toda a diferenca na sua jornada como programador.',
    },
    {
      type: 'callout',
      content:
        'Voce nao precisa entender tudo de uma vez! Esses conceitos ficam mais claros conforme voce avanca.',
      calloutType: 'tip',
    },
    {
      type: 'text',
      content: '## Python e o Sistema Binario\n\nPython tem funcoes prontas para trabalhar com diferentes bases numericas. Voce pode converter numeros entre decimal, binario, octal e hexadecimal diretamente!\n\n- **`bin(numero)`** — Converte decimal para binario (retorna string com prefixo `0b`)\n- **`int(string, base)`** — Converte de uma base para decimal. Ex: `int("101", 2)` converte binario 101 para decimal\n- **Operadores aritmeticos:** `+`, `-`, `*`, `/` (divisao), `//` (divisao inteira), `%` (resto), `**` (potencia)\n- Para calcular bits/bytes: `bytes = bits // 8` e `bits = bytes * 8`',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'binario_python.py',
        code: `# Convertendo decimal para binario
print(bin(10))    # 0b1010
print(bin(42))    # 0b101010
print(bin(255))   # 0b11111111

# O prefixo "0b" indica binario - faz parte do resultado!

# Convertendo binario para decimal
print(int("1010", 2))   # 10
print(int("101010", 2)) # 42

# Calculos com bits e bytes
bits = 40
bytes_resultado = bits // 8  # Divisao inteira: quantos bytes cabem?
print("40 bits =", bytes_resultado, "bytes")  # 5

# Multiplicando KB por bytes
kb = 2
bytes_em_kb = kb * 1024
print("2 KB =", bytes_em_kb, "bytes")  # 2048`,
        description: 'bin() converte para binario. int(string, base) converte de volta para decimal.',
      },
    },
  ],
  challenges: [
    {
      id: 'sb-c1',
      title: 'Convertendo decimal para binario',
      description:
        'Use a funcao bin() do Python para converter os numeros 10, 42 e 255 para binario. Exiba cada resultado usando print(). A funcao bin() recebe um numero inteiro e retorna sua representacao em binario.',
      language: 'python',
      starterCode: '# Converta e exiba os seguintes numeros em binario:\n# 10, 42 e 255\n# Use a funcao bin() dentro de print()\n',
      solution:
        'print(bin(10))\nprint(bin(42))\nprint(bin(255))',
      hints: [
        'A funcao bin() converte um numero decimal para binario. Exemplo: bin(5) retorna "0b101".',
        'O prefixo "0b" indica que o numero esta em binario. Isso e normal em Python.',
        'Basta usar print(bin(10)), print(bin(42)) e print(bin(255)).',
      ],
      testCases: [
        {
          description: 'Converte 10, 42 e 255 para binario',
          expectedOutput: '0b1010\n0b101010\n0b11111111',
        },
      ],
    },
    {
      id: 'sb-c2',
      title: 'Calculando bits e bytes',
      description:
        'Use variaveis e print() para responder: quantos bytes tem um arquivo de 40 bits? E quantos bytes tem 2 KB? Lembre-se: 1 byte = 8 bits e 1 KB = 1024 bytes. Esse exercicio usa so multiplicacao e divisao — nada de funcoes novas!',
      language: 'python',
      starterCode: '# 1 byte = 8 bits\nbits_por_byte = 8\n\n# Calcule: um arquivo de 40 bits tem quantos bytes?\nbits = 40\nbytes_resultado = \nprint("40 bits =", bytes_resultado, "bytes")\n\n# 1 KB = 1024 bytes\n# Calcule: 2 KB tem quantos bytes?\nkb = 2\nbytes_em_kb = \nprint("2 KB =", bytes_em_kb, "bytes")\n',
      solution:
        'bits_por_byte = 8\nbits = 40\nbytes_resultado = bits / bits_por_byte\nprint("40 bits =", bytes_resultado, "bytes")\nkb = 2\nbytes_em_kb = kb * 1024\nprint("2 KB =", bytes_em_kb, "bytes")',
      hints: [
        'Para converter bits em bytes, divida pelo numero de bits por byte: bytes = bits / 8.',
        'Para converter KB em bytes, multiplique por 1024: bytes = kb * 1024.',
        'Use a variavel bits_por_byte que ja esta definida no codigo: bytes_resultado = bits / bits_por_byte.',
      ],
      testCases: [
        {
          description: 'Calcula 40 bits em bytes (5.0) e 2 KB em bytes (2048)',
          expectedOutput: '40 bits = 5.0 bytes\n2 KB = 2048 bytes',
        },
      ],
    },
    {
      id: 'sb-c3',
      title: 'Descobrindo o codigo ASCII',
      description:
        'Use a funcao ord() para descobrir e exibir o codigo ASCII das seguintes letras: "A", "Z", "a", "z". Depois, use a funcao chr() para descobrir qual caractere corresponde ao codigo 33. Exiba todos os resultados com print().',
      language: 'python',
      starterCode: '# Descubra o codigo ASCII das letras:\n# "A", "Z", "a", "z"\n# Use a funcao ord()\n\n\n# Descubra qual caractere tem o codigo 33\n# Use a funcao chr()\n',
      solution:
        'print(ord("A"))\nprint(ord("Z"))\nprint(ord("a"))\nprint(ord("z"))\nprint(chr(33))',
      hints: [
        'A funcao ord() retorna o codigo numerico (ASCII) de um caractere. Exemplo: ord("A") retorna 65.',
        'A funcao chr() faz o inverso: recebe um numero e retorna o caractere correspondente. Exemplo: chr(65) retorna "A".',
        'O caractere com codigo 33 e o ponto de exclamacao (!).',
      ],
      testCases: [
        {
          description: 'Exibe codigos ASCII de A, Z, a, z e o caractere do codigo 33',
          expectedOutput: '65\n90\n97\n122\n!',
        },
      ],
    },
  ],
};
