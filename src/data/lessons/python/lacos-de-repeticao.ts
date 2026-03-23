import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lacos-de-repeticao',
  moduleId: 'python',
  title: 'Lacos de Repeticao (for/while)',
  description: 'Aprenda a repetir acoes automaticamente usando for e while.',
  order: 3,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Imagine que voce quer imprimir os numeros de 1 a 100. Escrever 100 linhas de print() seria terrivel, nao? Os **lacos de repeticao** resolvem isso: eles repetem um bloco de codigo quantas vezes voce precisar.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'for_basico.py',
        code: `# O laco for repete para cada item de uma sequencia
for i in range(1, 6):
    print(f"Numero: {i}")

# Saida:
# Numero: 1
# Numero: 2
# Numero: 3
# Numero: 4
# Numero: 5`,
        description: 'range(1, 6) gera numeros de 1 ate 5 (o 6 nao entra).',
      },
    },
    {
      type: 'text',
      content: 'Voce pode usar `range()` com dois argumentos para controlar o inicio e o fim, ou com tres argumentos para definir o passo. Veja um exemplo pratico usando um laco for:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'tabuada.py',
        code: `# Tabuada do 7
numero = 7
for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} x {i} = {resultado}")`,
        description: 'Exemplo pratico: gerando a tabuada de qualquer numero.',
      },
    },
    {
      type: 'text',
      content: 'O laco **while** repete enquanto uma condicao for verdadeira:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'while_exemplo.py',
        code: `# Contagem regressiva
contagem = 5
while contagem > 0:
    print(contagem)
    contagem -= 1  # Diminui 1 a cada repeticao
print("Fogo!")

# Saida: 5, 4, 3, 2, 1, Fogo!`,
        description: 'O while continua executando enquanto a condicao for True.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Cuidado com **loops infinitos**! Se a condicao do while nunca se tornar False, o programa fica travado para sempre. Sempre garanta que algo dentro do loop muda a condicao.',
    },
    {
      type: 'text',
      content: '## Controlando o Laco com break e continue\n\nDuas palavras-chave especiais permitem controlar o fluxo dentro de um laco:\n\n- **`break`** — Interrompe o laco imediatamente e sai dele por completo\n- **`continue`** — Pula o restante da iteracao atual e vai para a proxima',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'break_continue.py',
        code: `# break: para o laco imediatamente
for i in range(1, 100):
    if i == 5:
        break
    print(i)
# Imprime: 1, 2, 3, 4

# continue: pula para a proxima repeticao
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
# Imprime: 1, 2, 4, 5`,
        description: 'break encerra o laco e continue pula a iteracao atual.',
      },
    },
  ],
  challenges: [
    {
      id: 'lac-c1',
      title: 'Tabuada Completa',
      description: 'Dado um numero, imprima a tabuada dele de 1 a 10 usando um laco for. Cada linha deve mostrar a multiplicacao completa (ex: "7 x 3 = 21").',
      language: 'python',
      starterCode: `numero = 7

# Use um laco for com range para imprimir a tabuada de 1 a 10
# Formato: "7 x 1 = 7", "7 x 2 = 14", etc.
`,
      solution: `numero = 7

for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} x {i} = {resultado}")`,
      hints: [
        'Use range(1, 11) para gerar numeros de 1 ate 10',
        'Dentro do laco, multiplique o numero pela variavel do laco',
        'Use f-string para formatar a saida: f"{numero} x {i} = {resultado}"',
      ],
    },
    {
      id: 'lac-c2',
      title: 'Somador de Numeros',
      description: 'Use um laco for para calcular a soma de todos os numeros de 1 ate N (onde N e dado). Imprima a soma total ao final.',
      language: 'python',
      starterCode: `n = 100

# Use um laco for para somar todos os numeros de 1 ate n
# Dica: crie uma variavel soma antes do laco

# Imprima o resultado final
`,
      solution: `n = 100

soma = 0
for i in range(1, n + 1):
    soma += i

print(f"A soma de 1 ate {n} e: {soma}")`,
      hints: [
        'Crie uma variavel soma = 0 antes do laco para acumular os valores',
        'Use range(1, n + 1) para incluir o proprio n na soma',
        'Dentro do laco, use soma += i para adicionar cada numero',
      ],
    },
    {
      id: 'lac-c3',
      title: 'Filtro de Numeros Pares',
      description: 'Use um laco for para percorrer os numeros de 1 a 20. Imprima apenas os numeros pares usando continue para pular os impares. Ao final, imprima quantos numeros pares foram encontrados.',
      language: 'python',
      starterCode: `# Percorra os numeros de 1 a 20
# Use continue para pular os numeros impares
# Imprima apenas os pares
# Conte quantos pares existem e imprima ao final
`,
      solution: `contador = 0

for i in range(1, 21):
    if i % 2 != 0:
        continue
    print(i)
    contador += 1

print(f"Total de numeros pares: {contador}")`,
      hints: [
        'Um numero e impar quando i % 2 != 0 (o resto da divisao por 2 nao e zero)',
        'Use continue para pular para a proxima iteracao quando o numero for impar',
        'Crie um contador antes do laco e incremente-o a cada numero par encontrado',
      ],
    },
  ],
};
