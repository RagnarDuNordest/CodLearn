import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'lacos-de-repeticao',
  moduleId: 'python',
  title: 'Lacos de Repeticao (for/while)',
  description: 'Aprenda a repetir acoes automaticamente — a ferramenta que elimina trabalho repetitivo.',
  order: 3,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que voce vai aprender:** Como fazer o computador repetir uma acao automaticamente — seja 10 vezes, 1 miliao de vezes ou ate que uma condicao seja atingida. Isso e o que separa programacao de copiar e colar.',
    },
    {
      type: 'text',
      content:
        '## Por que lacos existem?\n\nImagine que o Instagram precisa enviar uma notificacao de aniversario para cada usuario. A plataforma tem 2 bilhoes de usuarios.\n\nSem lacos, um programador teria que escrever:\n```\nenvia_notificacao(usuario1)\nenvia_notificacao(usuario2)\nenvia_notificacao(usuario3)\n... (2 bilhoes de linhas)\n```\n\nCom lacos:\n```python\nfor usuario in todos_os_usuarios:\n    envia_notificacao(usuario)\n```\n\nDuas linhas em vez de 2 bilhoes. **Lacos de repeticao sao como fazer o computador ser seu assistente incansavel.**',
    },
    {
      type: 'text',
      content:
        '## O laco for: repete uma quantidade conhecida de vezes\n\nUse `for` quando voce sabe exatamente quantas vezes quer repetir, ou quando quer percorrer uma lista de itens.\n\nA funcao `range()` gera uma sequencia de numeros:\n- `range(5)` gera: 0, 1, 2, 3, 4 (5 numeros, começa em 0)\n- `range(1, 6)` gera: 1, 2, 3, 4, 5 (começa em 1, para antes do 6)\n- `range(0, 10, 2)` gera: 0, 2, 4, 6, 8 (pula de 2 em 2)',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Exemplo 1: contando de 1 a 5
for i in range(1, 6):
    # i assume o valor de cada numero da sequencia
    print(f"Numero: {i}")
# Saida: Numero: 1, Numero: 2, ..., Numero: 5

# Exemplo 2: tabuada do 7
print("--- Tabuada do 7 ---")
for i in range(1, 11):
    resultado = 7 * i
    print(f"7 x {i} = {resultado}")

# Exemplo 3: so numeros pares (pulo de 2 em 2)
print("Pares de 0 a 10:", end=" ")
for n in range(0, 11, 2):
    print(n, end=" ")  # end=" " impede pular de linha`,
        filename: 'for_basico.py',
        description: 'range(inicio, fim, passo) gera uma sequencia. O valor do fim nunca e incluido.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Pegadinha do range():** O numero final NUNCA e incluido. `range(1, 6)` gera 1, 2, 3, 4, 5 — o 6 nao aparece. Para incluir o numero N, escreva `range(1, N+1)`. Isso confunde todo iniciante na primeira vez.',
    },
    {
      type: 'text',
      content:
        '## Percorrendo listas com for\n\nO `for` e ainda mais poderoso quando voce tem uma lista de itens para processar:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Lista de produtos de um carrinho de compras
produtos = ["Notebook", "Mouse", "Teclado", "Monitor"]
precos = [3500.00, 89.90, 150.00, 899.99]

# Percorrendo a lista de nomes
print("Itens no carrinho:")
for produto in produtos:
    print(f"  - {produto}")

# Somando todos os precos
total = 0
for preco in precos:
    total = total + preco  # Acumula o valor

print(f"Total: R\${total:.2f}")

# Percorrendo com indice (enumerate)
print("Lista numerada:")
for indice, produto in enumerate(produtos, start=1):
    print(f"{indice}. {produto} — R\${precos[indice-1]:.2f}")`,
        filename: 'for_listas.py',
        description: 'for funciona com qualquer lista. enumerate() da o indice e o valor ao mesmo tempo.',
      },
    },
    {
      type: 'text',
      content:
        '## O laco while: repete enquanto uma condicao for verdadeira\n\nUse `while` quando voce nao sabe quantas vezes vai repetir — apenas sabe quando deve parar.\n\nExemplo da vida real: um caixa automatico que fica pedindo a senha ate o usuario acertar (ou ate 3 tentativas).',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# Contagem regressiva (sabemos quando parar: quando chegar a 0)
contagem = 5

while contagem > 0:
    print(f"{contagem}...")
    contagem -= 1  # CRUCIAL: diminui 1 a cada repeticao

print("Lancamento!")
# Saida: 5... 4... 3... 2... 1... Lancamento!

# Acumulando ate atingir uma meta
saldo = 100.0
mes = 0
rendimento = 0.01  # 1% ao mes

while saldo < 200.0:
    saldo = saldo * (1 + rendimento)
    mes += 1

print(f"Saldo dobrou em {mes} meses: R\${saldo:.2f}")`,
        filename: 'while_exemplo.py',
        description: 'while repete enquanto a condicao for True. Lembre de sempre mudar algo que eventualmente tornara a condicao False.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**PERIGO: Loop infinito!** Se a condicao do while nunca se tornar False, o programa fica travado para sempre e voce precisa forcar o fechamento.\n\nSempre garanta que algo dentro do while muda a condicao:\n```python\n# ERRADO — loop infinito!\ncontagem = 5\nwhile contagem > 0:\n    print(contagem)\n    # Esqueceu o contagem -= 1 !\n\n# CORRETO\ncontagem = 5\nwhile contagem > 0:\n    print(contagem)\n    contagem -= 1  # Sempre muda algo!\n```',
    },
    {
      type: 'text',
      content:
        '## Controlando o laco: break e continue\n\nDuas palavras-chave para situacoes especiais dentro de um laco:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# BREAK — interrompe o laco imediatamente e sai
# Util quando voce achou o que procurava
nomes = ["Ana", "Bia", "Carlos", "Diana", "Eduardo"]

busca = "Carlos"
for nome in nomes:
    if nome == busca:
        print(f"Encontrei: {nome}!")
        break  # Para aqui — nao precisa verificar o resto
    print(f"Verificando {nome}...")
# Saida: Verificando Ana... Verificando Bia... Encontrei: Carlos!

print("---")

# CONTINUE — pula para a proxima iteracao
# Util quando voce quer ignorar alguns casos
numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

print("Numeros impares:")
for n in numeros:
    if n % 2 == 0:  # Se for par (resto da divisao por 2 e 0)
        continue    # Pula este numero e vai para o proximo
    print(n, end=" ")  # So chega aqui se for impar
# Saida: 1 3 5 7 9`,
        filename: 'break_continue.py',
        description: 'break para o laco, continue pula a iteracao atual. Use com moderacao — loops simples sao mais faceis de entender.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Quando usar for vs while?**\n- **for**: quando voce sabe quantas vezes repetir, ou tem uma lista para percorrer\n- **while**: quando voce nao sabe quando vai parar — depende de uma condicao\n\nNa duvida, comece com for. E mais seguro (impossivel criar loop infinito acidentalmente).',
    },
  ],
  challenges: [
    {
      id: 'lac-c1',
      title: 'Tabuada Completa',
      description: 'Dado um numero, imprima a tabuada dele de 1 a 10 usando um laco for.\n\nCada linha deve mostrar a multiplicacao completa.\nFormato esperado: "7 x 1 = 7", "7 x 2 = 14", etc.',
      language: 'python',
      starterCode: `numero = 7

# Use um laco for com range(1, 11) para a tabuada de 1 a 10
# Dentro do laco, calcule e imprima cada resultado
`,
      solution: `numero = 7

for i in range(1, 11):
    resultado = numero * i
    print(f"{numero} x {i} = {resultado}")`,
      hints: [
        'Use range(1, 11) para gerar numeros de 1 ate 10 (o 11 nao e incluido).',
        'Dentro do laco, multiplique: resultado = numero * i',
        'Use f-string: f"{numero} x {i} = {resultado}"',
      ],
      testCases: [
        {
          description: 'Tabuada do 7 de 1 a 10',
          expectedOutput: '7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70',
        },
      ],
    },
    {
      id: 'lac-c2',
      title: 'Somatorio de notas',
      description: 'Calcule a media de uma lista de notas usando um laco for.\n\nA lista de notas ja esta criada no codigo. Voce deve:\n1. Somar todas as notas com um laco for\n2. Calcular a media (soma / quantidade de notas)\n3. Imprimir a media com 1 casa decimal\n4. Imprimir "Aprovado" se media >= 7, senao "Reprovado"',
      language: 'python',
      starterCode: `notas = [8.5, 6.0, 9.0, 7.5, 5.5]

# Some todas as notas usando um laco for
total = 0
for nota in notas:
    total = total + nota

# Calcule a media
media = total / len(notas)  # len() retorna a quantidade de itens

# Exiba a media e o resultado
print(f"Media: {media:.1f}")
# Adicione o if para mostrar Aprovado ou Reprovado
`,
      solution: `notas = [8.5, 6.0, 9.0, 7.5, 5.5]

total = 0
for nota in notas:
    total = total + nota

media = total / len(notas)

print(f"Media: {media:.1f}")
if media >= 7:
    print("Aprovado")
else:
    print("Reprovado")`,
      hints: [
        'Use a variavel total para acumular a soma: total = total + nota',
        'len(notas) retorna quantos itens tem na lista (5 neste caso)',
        'Use :.1f para exibir com 1 casa decimal',
      ],
      testCases: [
        {
          description: 'Media das notas',
          expectedOutput: 'Media: 7.3\nAprovado',
        },
      ],
    },
    {
      id: 'lac-c3',
      title: 'Contagem de caracteres',
      description: 'Dado um texto, conte quantas vogais (a, e, i, o, u) ele possui usando um laco for.\n\nO resultado deve ser no formato:\n"O texto tem 5 vogais."',
      language: 'python',
      starterCode: `texto = "Engenharia de Computacao"
vogais = "aeiouAEIOU"  # Maiusculas e minusculas
contagem = 0

# Percorra cada letra do texto com um laco for
# Se a letra estiver em vogais, incremente contagem
for letra in texto:
    pass  # Substitua 'pass' pela sua logica

print(f"O texto tem {contagem} vogais.")
`,
      solution: `texto = "Engenharia de Computacao"
vogais = "aeiouAEIOU"
contagem = 0

for letra in texto:
    if letra in vogais:
        contagem += 1

print(f"O texto tem {contagem} vogais.")`,
      hints: [
        'Use "if letra in vogais" para verificar se a letra e uma vogal.',
        'contagem += 1 e a forma curta de escrever contagem = contagem + 1',
        'O laco "for letra in texto" percorre cada caractere do texto, um por um.',
      ],
      testCases: [
        {
          description: 'Contagem de vogais em "Engenharia de Computacao"',
          expectedOutput: 'O texto tem 10 vogais.',
        },
      ],
    },
  ],
};
