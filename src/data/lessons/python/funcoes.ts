import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'funcoes',
  moduleId: 'python',
  title: 'Funcoes',
  description: 'Aprenda a criar funcoes para organizar e reutilizar seu codigo.',
  order: 4,
  estimatedMinutes: 15,
  sections: [
    {
      type: 'text',
      content: 'Uma **funcao** e um bloco de codigo que executa uma tarefa especifica. Voce ja usou funcoes antes: print() e input() sao funcoes embutidas do Python!\n\nA grande vantagem de criar suas proprias funcoes e poder **reutilizar codigo** sem precisar reescrever tudo.',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'funcao_basica.py',
        code: `# Definindo uma funcao com def
def saudacao(nome):
    print(f"Ola, {nome}! Bem-vindo ao CodLearn!")

# Chamando a funcao
saudacao("Raphael")
saudacao("Maria")

# Saida:
# Ola, Raphael! Bem-vindo ao CodLearn!
# Ola, Maria! Bem-vindo ao CodLearn!`,
        description: 'Use def para criar uma funcao. O valor entre parenteses e o parametro.',
      },
    },
    {
      type: 'text',
      content: 'Funcoes podem **retornar** valores usando a palavra **return**. Isso permite usar o resultado da funcao em outras partes do codigo:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'funcao_return.py',
        code: `def calcular_area(base, altura):
    area = base * altura
    return area

# Usando o valor retornado
resultado = calcular_area(5, 3)
print(f"A area e: {resultado}")  # A area e: 15

# Parametros com valores padrao
def potencia(base, expoente=2):
    return base ** expoente

print(potencia(5))     # 25 (usa expoente=2)
print(potencia(5, 3))  # 125 (usa expoente=3)`,
        description: 'return envia um valor de volta para quem chamou a funcao.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: 'Principio DRY: "Don\'t Repeat Yourself" (Nao se repita). Se voce esta copiando e colando o mesmo codigo, provavelmente deveria criar uma funcao!',
    },
    {
      type: 'text',
      content: '## Funcoes Embutidas Uteis\n\nPython fornece funcoes prontas que voce pode usar dentro das suas funcoes:\n\n- **`sum(lista)`** — Soma todos os elementos de uma lista numerica\n- **`len(lista)`** — Retorna a quantidade de elementos de uma lista\n\nCombinando essas funcoes, voce consegue calcular a media de uma lista de notas com apenas uma linha. Veja um exemplo completo:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        filename: 'exemplo_pratico.py',
        code: `def calcular_media(notas):
    soma = sum(notas)
    media = soma / len(notas)
    return media

def verificar_aprovacao(media):
    if media >= 7:
        return "Aprovado"
    elif media >= 5:
        return "Recuperacao"
    else:
        return "Reprovado"

# Usando as funcoes juntas
minhas_notas = [8.0, 6.5, 9.0, 7.5]
media = calcular_media(minhas_notas)
situacao = verificar_aprovacao(media)
print(f"Media: {media:.1f} - {situacao}")`,
        description: 'Funcoes pequenas e focadas tornam o codigo mais organizado.',
      },
    },
  ],
  challenges: [
    {
      id: 'func-c1',
      title: 'Verificador de Par ou Impar',
      description: 'Crie uma funcao chamada "eh_par" que receba um numero inteiro e retorne True se for par ou False se for impar. Teste a funcao com pelo menos 3 numeros diferentes.',
      language: 'python',
      starterCode: `# Crie a funcao eh_par que recebe um numero
# e retorna True se for par, False se for impar


# Teste a funcao com diferentes numeros
# print(eh_par(4))   # True
# print(eh_par(7))   # False
# print(eh_par(0))   # True
`,
      solution: `def eh_par(numero):
    return numero % 2 == 0

print(eh_par(4))   # True
print(eh_par(7))   # False
print(eh_par(0))   # True`,
      hints: [
        'Um numero e par quando o resto da divisao por 2 e zero (numero % 2 == 0)',
        'Use return para retornar True ou False diretamente',
        'A expressao numero % 2 == 0 ja retorna um booleano, nao precisa de if',
      ],
    },
    {
      id: 'func-c2',
      title: 'Calculadora de Fatorial',
      description: 'Crie uma funcao chamada "fatorial" que receba um numero inteiro positivo e retorne o fatorial dele. O fatorial de N e o produto de todos os numeros de 1 ate N (ex: 5! = 5 x 4 x 3 x 2 x 1 = 120). O fatorial de 0 e 1.',
      language: 'python',
      starterCode: `# Crie a funcao fatorial que recebe um numero
# e retorna o fatorial dele
# Lembre-se: 0! = 1 e 5! = 120


# Teste com diferentes valores
# print(fatorial(0))   # 1
# print(fatorial(5))   # 120
# print(fatorial(3))   # 6
`,
      solution: `def fatorial(n):
    resultado = 1
    for i in range(1, n + 1):
        resultado *= i
    return resultado

print(fatorial(0))   # 1
print(fatorial(5))   # 120
print(fatorial(3))   # 6`,
      hints: [
        'Comece com resultado = 1 (pois 0! = 1 e multiplicar por 1 nao muda nada)',
        'Use um laco for com range(1, n + 1) para multiplicar todos os numeros',
        'Dentro do laco, use resultado *= i para ir multiplicando',
      ],
    },
    {
      id: 'func-c3',
      title: 'Conversor de Temperatura',
      description: 'Crie duas funcoes: "celsius_para_fahrenheit" e "fahrenheit_para_celsius". A formula e: F = C * 9/5 + 32. Teste ambas as funcoes e use uma para verificar a outra (converter ida e volta deve retornar o valor original).',
      language: 'python',
      starterCode: `# Crie a funcao celsius_para_fahrenheit
# Formula: F = C * 9/5 + 32


# Crie a funcao fahrenheit_para_celsius
# Formula: C = (F - 32) * 5/9


# Teste as funcoes
# print(celsius_para_fahrenheit(100))  # 212.0
# print(fahrenheit_para_celsius(212))  # 100.0

# Teste de ida e volta (converter e converter de volta)
`,
      solution: `def celsius_para_fahrenheit(celsius):
    return celsius * 9/5 + 32

def fahrenheit_para_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

print(f"100C = {celsius_para_fahrenheit(100)}F")
print(f"212F = {fahrenheit_para_celsius(212)}C")
print(f"0C = {celsius_para_fahrenheit(0)}F")
print(f"32F = {fahrenheit_para_celsius(32)}C")

# Teste ida e volta
original = 37.5
convertido = celsius_para_fahrenheit(original)
volta = fahrenheit_para_celsius(convertido)
print(f"Original: {original}C -> {convertido}F -> {volta}C")`,
      hints: [
        'Para Celsius para Fahrenheit: multiplique por 9/5 e some 32',
        'Para Fahrenheit para Celsius: subtraia 32 e multiplique por 5/9',
        'Use return para retornar o valor calculado em cada funcao',
      ],
    },
  ],
};
