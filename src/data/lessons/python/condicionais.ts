import { Lesson } from '@/types/lesson';

export const lesson: Lesson = {
  id: 'condicionais',
  moduleId: 'python',
  title: 'Condicionais (if/elif/else)',
  description: 'Aprenda a fazer seu programa tomar decisoes com base em condicoes.',
  order: 2,
  type: 'lesson',
  estimatedMinutes: 18,
  sections: [
    {
      type: 'callout',
      calloutType: 'info',
      content: '**O que voce vai aprender:** Como fazer seu programa "escolher" o que fazer dependendo da situacao. Isso e o que torna programas inteligentes — eles nao fazem sempre a mesma coisa.',
    },
    {
      type: 'text',
      content:
        '## Por que condicionais existem?\n\nTodo aplicativo que voce usa toma decisoes o tempo todo:\n\n- **Instagram:** "O usuario esta logado? Mostra o feed. Senao, mostra a tela de login."\n- **Spotify:** "O usuario tem premium? Toca sem anuncio. Senao, coloca anuncio."\n- **Nubank:** "O limite e suficiente? Aprova o pagamento. Senao, recusa."\n- **iFood:** "O restaurante esta aberto? Mostra disponivel. Senao, mostra fechado."\n\nSem condicionais, todo programa faria sempre a mesma coisa independente de qualquer situacao. **Condicionais sao o que da inteligencia ao seu programa.**',
    },
    {
      type: 'text',
      content:
        '## Analogia: O porteiro da balada\n\nImagine um porteiro de uma balada com uma lista de regras:\n\n1. Tem mais de 18 anos? **Pode entrar.**\n2. Tem entre 15 e 17 anos e acompanhado dos pais? **Pode entrar.**\n3. Tem menos de 15? **Nao pode entrar.**\n\nO porteiro verifica cada regra em ordem. Assim que encontra uma que se encaixa, toma a decisao e para de verificar as outras.\n\nO `if/elif/else` do Python funciona exatamente assim.',
    },
    {
      type: 'text',
      content:
        '## A estrutura basica: if e else\n\nAntes de ver o codigo, entenda a logica em portugues:\n\n```\nSE (condicao for verdadeira):\n    execute este bloco\nSENAO:\n    execute este outro bloco\n```\n\nEm Python:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `nota = 8.5

# IF verifica se a condicao e verdadeira
if nota >= 7:
    # Este codigo so executa se "nota >= 7" for True
    print("Aprovado!")
else:
    # Este codigo so executa se "nota >= 7" for False
    print("Reprovado.")

# Saida: Aprovado!`,
        filename: 'if_else_basico.py',
        description: 'O if verifica a condicao. Se for True, executa o bloco. O else executa quando a condicao e False.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**A regra mais importante do Python:** Os espacos no inicio da linha (indentacao) **nao sao opcionais**. O Python usa esses espacos para saber o que pertence ao if e o que pertence ao else. Use sempre 4 espacos (ou 1 Tab). Se a indentacao estiver errada, o Python vai dar erro ou fazer a coisa errada.',
    },
    {
      type: 'text',
      content:
        '## Erro de indentacao — o mais comum dos iniciantes\n\nVeja a diferenca entre codigo correto e codigo com erro de indentacao:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `# ERRADO — sem indentacao (gera IndentationError)
# if nota >= 7:
# print("Aprovado!")  # Python nao sabe que isso e parte do if

# CORRETO — 4 espacos em tudo dentro do bloco
nota = 8.5
if nota >= 7:
    print("Aprovado!")    # 4 espacos — pertence ao if
    print("Parabens!")    # 4 espacos — mesmo nivel, mesmo bloco
print("Fim do programa")  # 0 espacos — fora do if, SEMPRE executa`,
        filename: 'indentacao.py',
        description: 'Indentacao incorreta e o erro mais comum. Sempre use 4 espacos em tudo dentro de um bloco if.',
      },
    },
    {
      type: 'text',
      content:
        '## Multiplas opcoes com elif\n\nQuando voce tem mais de duas opcoes, use **elif** (abreviacao de "else if" — "senao se"). O Python verifica cada condicao em ordem e executa apenas o primeiro bloco cujo condicao for True:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `nota = 6.5

if nota >= 9:
    print("Conceito A — Excelente!")
elif nota >= 7:
    # So chega aqui se nota >= 9 for False
    print("Conceito B — Bom!")
elif nota >= 5:
    # So chega aqui se nota >= 7 tambem for False
    print("Conceito C — Regular")
else:
    # Chegou aqui: nenhuma condicao acima foi True
    print("Conceito D — Reprovado")

# Saida: Conceito C — Regular
# Python verificou na ordem e parou no primeiro elif que foi True`,
        filename: 'elif_exemplo.py',
        description: 'elif verifica multiplas condicoes em sequencia. Apenas o primeiro bloco verdadeiro executa.',
      },
    },
    {
      type: 'callout',
      calloutType: 'warning',
      content: '**Erro critico: = vs ==**\n\nEm Python:\n- `=` ATRIBUI um valor: `nota = 7` significa "coloque 7 na variavel nota"\n- `==` COMPARA dois valores: `nota == 7` significa "nota e igual a 7?"\n\nDentro do if, voce SEMPRE usa `==`. Usar `=` onde deveria ser `==` e um dos erros mais traicoeiros — pode nao dar mensagem de erro mas faz o programa fazer coisas completamente erradas.',
    },
    {
      type: 'text',
      content:
        '## Operadores de comparacao\n\nEsses sao todos os operadores que voce pode usar em condicoes:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `idade = 20
nome = "Ana"

# Comparadores numericos
print(idade > 18)     # True  — maior que
print(idade < 18)     # False — menor que
print(idade >= 18)    # True  — maior ou igual a
print(idade <= 18)    # False — menor ou igual a
print(idade == 20)    # True  — igual (DOIS sinais de igual!)
print(idade != 25)    # True  — diferente de

# Comparadores de texto
print(nome == "Ana")  # True
print(nome == "ana")  # False — Python diferencia maiusculas de minusculas!`,
        filename: 'operadores_comparacao.py',
        description: 'Todos os operadores de comparacao. Lembre: == para comparar, = para atribuir.',
      },
    },
    {
      type: 'text',
      content:
        '## Combinando condicoes: and, or, not\n\nAs vezes uma decisao depende de mais de uma coisa ao mesmo tempo:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `idade = 20
tem_ingresso = True

# AND — as DUAS condicoes precisam ser True
if idade >= 18 and tem_ingresso:
    print("Pode entrar no show!")
# Ambas sao True, entao imprime

# OR — pelo menos UMA condicao precisa ser True
saldo = 500.0
limite_cartao = 1000.0
valor = 700.0

if saldo >= valor or limite_cartao >= valor:
    print("Pagamento aprovado!")
# Saldo e menor, mas limite e suficiente — OR aprova

# NOT — inverte o valor
pagamento_efetuado = False

if not pagamento_efetuado:
    print("Aguardando pagamento...")
else:
    print("Pagamento confirmado!")`,
        filename: 'condicoes_compostas.py',
        description: 'and exige ambas verdadeiras, or exige pelo menos uma, not inverte o valor booleano.',
      },
    },
    {
      type: 'text',
      content:
        '## Formatando numeros em f-strings\n\nDentro de f-strings, use `:` dentro das chaves para controlar como o numero aparece:',
    },
    {
      type: 'code',
      codeExample: {
        language: 'python',
        code: `valor_compra = 1847.3333
desconto_pct = 0.15

if valor_compra > 1000:
    desconto = valor_compra * desconto_pct
    valor_final = valor_compra - desconto
    # :.2f = sempre 2 casas decimais (ideal para R$)
    # :.0f = sem casas decimais (ideal para %)
    print(f"Desconto de {desconto_pct * 100:.0f}%: R\${desconto:.2f}")
    print(f"Valor final: R\${valor_final:.2f}")
else:
    print(f"Valor: R\${valor_compra:.2f} (sem desconto)")

# Saida:
# Desconto de 15%: R$277.10
# Valor final: R$1570.23`,
        filename: 'formatacao_condicional.py',
        description: ':.2f formata com 2 casas decimais, :.0f sem casas decimais. Essencial para exibir valores financeiros.',
      },
    },
    {
      type: 'callout',
      calloutType: 'tip',
      content: '**Regra de ouro para dinheiro:** Sempre use `{valor:.2f}` ao exibir valores em Reais. Sem formatacao, `1500.5` aparece como `1500.5`. Com formatacao aparece como `1500.50` — muito mais profissional.',
    },
  ],
  challenges: [
    {
      id: 'cond-c1',
      title: 'Positivo, Negativo ou Zero',
      description: 'Dado um numero, verifique se ele e positivo (maior que 0), negativo (menor que 0) ou zero e imprima a mensagem correspondente.\n\nUse if/elif/else.',
      language: 'python',
      starterCode: `numero = -5

# Verifique se o numero e positivo, negativo ou zero
# Use if, elif e else
`,
      solution: `numero = -5

if numero > 0:
    print("O numero e positivo")
elif numero < 0:
    print("O numero e negativo")
else:
    print("O numero e zero")`,
      hints: [
        'Um numero positivo e maior que 0 (numero > 0), negativo e menor que 0 (numero < 0).',
        'Use elif para a segunda condicao em vez de outro if.',
        'O else cobre o caso restante (zero), sem precisar de condicao.',
      ],
      testCases: [
        { description: 'Numero negativo (-5)', expectedOutput: 'O numero e negativo' },
        { description: 'Numero positivo: altere numero = 8', expectedOutput: 'O numero e positivo' },
        { description: 'Numero zero: altere numero = 0', expectedOutput: 'O numero e zero' },
      ],
    },
    {
      id: 'cond-c2',
      title: 'Classificador de Faixa Etaria',
      description: 'Dada uma idade, classifique a pessoa em uma das faixas abaixo e imprima a classificacao:\n\n- 0 a 11 anos: "Crianca"\n- 12 a 17 anos: "Adolescente"\n- 18 a 59 anos: "Adulto"\n- 60 anos ou mais: "Idoso"',
      language: 'python',
      starterCode: `idade = 25

# Classifique usando if/elif/else
# Dica: comece verificando da menor faixa para a maior
`,
      solution: `idade = 25

if idade <= 11:
    print("Crianca")
elif idade <= 17:
    print("Adolescente")
elif idade <= 59:
    print("Adulto")
else:
    print("Idoso")`,
      hints: [
        'Comece verificando se idade <= 11 (crianca).',
        'Se essa condicao falhou, ja sabemos que idade >= 12. Entao elif idade <= 17 cobre 12 a 17.',
        'O else final cobre todos os casos de 60 para cima.',
      ],
      testCases: [
        { description: 'Adulto (25 anos)', expectedOutput: 'Adulto' },
        { description: 'Crianca: altere idade = 8', expectedOutput: 'Crianca' },
        { description: 'Adolescente: altere idade = 15', expectedOutput: 'Adolescente' },
        { description: 'Idoso: altere idade = 70', expectedOutput: 'Idoso' },
      ],
    },
    {
      id: 'cond-c3',
      title: 'Calculadora de Desconto por Valor',
      description: 'Uma loja da descontos conforme o valor da compra:\n- Acima de R$500: 20% de desconto\n- De R$200 a R$500: 10% de desconto\n- Abaixo de R$200: sem desconto\n\nCalcule e exiba o desconto e o valor final com 2 casas decimais.',
      language: 'python',
      starterCode: `valor_compra = 350.0

# Determine o percentual de desconto com if/elif/else
# Depois calcule o valor do desconto e o valor final
# Exiba as tres linhas formatadas com :.2f
`,
      solution: `valor_compra = 350.0

if valor_compra > 500:
    desconto = 0.20
elif valor_compra >= 200:
    desconto = 0.10
else:
    desconto = 0

valor_desconto = valor_compra * desconto
valor_final = valor_compra - valor_desconto

print(f"Desconto: {desconto * 100:.0f}%")
print(f"Valor do desconto: R\${valor_desconto:.2f}")
print(f"Valor final: R\${valor_final:.2f}")`,
      hints: [
        'Primeiro determine o percentual de desconto (0.20, 0.10 ou 0) com if/elif/else.',
        'Depois calcule: valor_desconto = valor_compra * desconto',
        'Use :.2f no f-string para mostrar valores com 2 casas decimais.',
      ],
      testCases: [
        {
          description: 'Compra de R$350 — desconto de 10%',
          expectedOutput: 'Desconto: 10%\nValor do desconto: R$35.00\nValor final: R$315.00',
        },
        {
          description: 'Compra de R$600 — desconto de 20%: altere valor_compra = 600',
          expectedOutput: 'Desconto: 20%\nValor do desconto: R$120.00\nValor final: R$480.00',
        },
        {
          description: 'Compra de R$100 — sem desconto: altere valor_compra = 100',
          expectedOutput: 'Desconto: 0%\nValor do desconto: R$0.00\nValor final: R$100.00',
        },
      ],
    },
  ],
};
