import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'operadores',
  moduleId: 'python',
  title: 'Operadores',
  description: 'Aprenda a usar operadores aritmeticos, de comparacao e logicos em Python.',
  order: 1,
  type: 'lesson',
  estimatedMinutes: 12,
  sections: [
    {
      type: 'text',
      content: 'Operadores sao simbolos que dizem ao Python para realizar alguma operacao com valores. Existem varios tipos de operadores, e voce vai usar todos eles o tempo todo!\n\nVamos comecar pelos **operadores aritmeticos**, que sao os mais intuitivos.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'aritmeticos.py',
        code: `# Operadores aritmeticos
a = 10
b = 3

print(a + b)   # Soma: 13
print(a - b)   # Subtracao: 7
print(a * b)   # Multiplicacao: 30
print(a / b)   # Divisao: 3.333...
print(a // b)  # Divisao inteira: 3
print(a % b)   # Resto da divisao: 1
print(a ** b)  # Potencia: 1000`,
        description: 'Os 7 operadores aritmeticos do Python.',
      },
    },
    {
      type: 'text',
      content: 'Os **operadores de comparacao** comparam dois valores e retornam True ou False (verdadeiro ou falso).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'comparacao.py',
        code: `idade = 18

print(idade == 18)   # Igual a: True
print(idade != 21)   # Diferente de: True
print(idade > 16)    # Maior que: True
print(idade < 21)    # Menor que: True
print(idade >= 18)   # Maior ou igual: True
print(idade <= 17)   # Menor ou igual: False`,
        description: 'Comparacoes retornam valores booleanos (True/False).',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: 'Cuidado! Um erro muito comum e confundir = (atribuicao) com == (comparacao). O simbolo = guarda um valor na variavel. O simbolo == compara dois valores.',
    },
    {
      type: 'text',
      content: 'Os **operadores logicos** combinam condicoes. Sao eles: **and** (e), **or** (ou) e **not** (nao).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'logicos.py',
        code: `idade = 20
tem_carteira = True

# and: ambas as condicoes precisam ser True
pode_dirigir = idade >= 18 and tem_carteira
print(pode_dirigir)  # True

# or: pelo menos uma condicao precisa ser True
tem_desconto = idade < 12 or idade > 60
print(tem_desconto)  # False

# not: inverte o valor
print(not True)   # False
print(not False)  # True`,
        description: 'Operadores logicos combinam condicoes verdadeiras e falsas.',
      },
    },
  ],
  challenges: [
    {
      id: 'op-c1',
      title: 'Calculadora Basica',
      description: 'Receba dois numeros e exiba o resultado de todas as operacoes aritmeticas: soma, subtracao, multiplicacao, divisao, divisao inteira, resto e potencia.',
      language: 'python',
      starterCode: `a = 15
b = 4

# Exiba o resultado de cada operacao aritmetica entre a e b
# Use print() para mostrar cada resultado com uma descricao
`,
      solution: `a = 15
b = 4

print(f"Soma: {a + b}")
print(f"Subtracao: {a - b}")
print(f"Multiplicacao: {a * b}")
print(f"Divisao: {a / b}")
print(f"Divisao inteira: {a // b}")
print(f"Resto: {a % b}")
print(f"Potencia: {a ** b}")`,
      hints: [
        'Os operadores aritmeticos sao: +, -, *, /, //, %, **',
        'Use f-strings para exibir o nome da operacao junto com o resultado',
        'Divisao inteira (//) descarta a parte decimal, e % retorna o resto',
      ],
    },
    {
      id: 'op-c2',
      title: 'Verificador de Maioridade',
      description: 'Dada uma variavel idade, use operadores de comparacao para verificar: se a pessoa e maior de idade (>= 18), se e menor que 13, e se a idade e exatamente 18. Imprima o resultado de cada comparacao.',
      language: 'python',
      starterCode: `idade = 18

# Verifique se a pessoa e maior de idade (>= 18)

# Verifique se e menor que 13

# Verifique se a idade e exatamente 18

# Verifique se a idade e diferente de 21
`,
      solution: `idade = 18

print(f"Maior de idade: {idade >= 18}")
print(f"Menor que 13: {idade < 13}")
print(f"Tem exatamente 18: {idade == 18}")
print(f"Diferente de 21: {idade != 21}")`,
      hints: [
        'Operadores de comparacao retornam True ou False',
        'Use == para comparar igualdade (nao confunda com = de atribuicao)',
        'Use != para verificar se dois valores sao diferentes',
      ],
    },
    {
      id: 'op-c3',
      title: 'Sistema de Acesso ao Cinema',
      description: 'Crie variaveis para idade e acompanhado (bool). Usando operadores logicos, verifique: 1) Se pode entrar sozinho (idade >= 18), 2) Se pode entrar acompanhado (idade < 18 e acompanhado == True), 3) Se tem direito a meia-entrada (idade < 12 ou idade >= 60).',
      language: 'python',
      starterCode: `idade = 15
acompanhado = True

# Verifique se pode entrar sozinho (maior de 18)

# Verifique se pode entrar acompanhado (menor de 18 AND acompanhado)

# Verifique se tem meia-entrada (menor de 12 OR maior/igual a 60)
`,
      solution: `idade = 15
acompanhado = True

pode_sozinho = idade >= 18
print(f"Pode entrar sozinho: {pode_sozinho}")

pode_acompanhado = idade < 18 and acompanhado
print(f"Pode entrar acompanhado: {pode_acompanhado}")

meia_entrada = idade < 12 or idade >= 60
print(f"Tem meia-entrada: {meia_entrada}")`,
      hints: [
        'Use "and" quando AMBAS as condicoes precisam ser verdadeiras',
        'Use "or" quando PELO MENOS UMA condicao precisa ser verdadeira',
        'Armazene o resultado em variaveis para deixar o codigo mais legivel',
      ],
    },
  ],
};
